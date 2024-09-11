import React from 'react';
import { sendFormData, getErrorMessage } from "../../common/api";
import { flattenObject } from "../../common/apiToLocal";
import EditMailing from './editMailing';

class MailingAddress extends React.Component {
    constructor() {
        super();
        const jsonData = this.getJSONData();
        this.state = {
            showEdit: false,
            jsonData: {
                initialDataURL: "",
                mainHeadLabel: "",
                subHeadLabel: "",
                contentHead: "",
                changeShippingAddressLabel: "",
                footerNote: "",
                ...jsonData
            },
            profileApiData: {},
        }
    }

    setShowEdit = (flag = false) => {
        this.setState({
            showEdit: flag
        })
    }

    getJSONData = () => {
        return window.jsonData || {};
    }

    getProfileData = async () => {
        const { initialDataURL = "" } = this.state.jsonData;
        const data = {
            "headers":{
                "x-id-token":ABBOTT.cookie('x-id-token'),
            },
            "method": "GET"
        };
        return await sendFormData(initialDataURL, "",data).then(results => {
            return results;
        });
    }

    setProfileData=(data)=>{
        this.setState({profileApiData:data});
        
    }

    async componentDidMount() {
        const { status = "", errorCode = "", response = {} } = await this.getProfileData();
       
        if (status && errorCode === 0) {

            const { addresses = [], userInfo = {}, contacts = [] } = response;
            const fields = flattenObject({ addresses, userInfo });
            const finalData = fields.reduce((acc, { name, value }) => {
                acc[name] = value;
                return acc;
            }, {})
             console.log(finalData);
            this.setState({
                profileApiData: finalData,
            })
            if(ABBOTT.cookie("profile")){
      
            let lc = ABBOTT.cookie("profile");
            let lp = JSON.parse(lc);
            lp.firstName = response.userInfo.firstName;
            lp.lastName = response.userInfo.lastName;
            let cookieConfig = {
                path: '/',
                domain: 'similac.com'
            };
            ABBOTT.removeCookie("profile");
            ABBOTT.cookie("profile", JSON.stringify(lp), cookieConfig);
            ABBOTT.updatePageElements();
        }
        }
    }
    formatPhoneNumber=(phoneNumberString) =>{
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
        if (match) {
          var intlCode = (match[1] ? '+1 ' : '')
          return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
        }
        return null
    }
    render() {
        const {
            jsonData: {
                mainHeadLabel = "",
                subHeadLabel = "",
                contentHead = "",
                changeShippingAddressLabel = "",
                footerNote = ""
            },
            showEdit,
            profileApiData
        } = this.state;

        const {firstName="",lastName="",lineOne="",lineTwo="",city="",state="",zipCode="",country="",number=""} = profileApiData;
        const fullName = String(`${firstName} ${lastName}`).trim();
        const cityStateZip = String(`${city?city+",":""} ${state} ${zipCode}`).trim();
        return (
            <>
                {showEdit ? <EditMailing setProfileData={this.setProfileData} setShowEdit={this.setShowEdit} data={window.jsonEditMailingAddress || {}} initData={profileApiData}/> :
                    <>
                        <p class="profile__title">{mainHeadLabel}</p>
                        <p class="profile__sub-title">{subHeadLabel}</p>
                        <div class="personal-info__item">
                            <p class="personal-info__item-name">{contentHead}</p>
                            {fullName?<p class="personal-info__item-value mb-0">{fullName}</p>:null}
                            {lineOne?<p class="personal-info__item-value mb-0">{lineOne}</p>:null} 
                            {lineTwo?<p class="personal-info__item-value mb-0">{lineTwo}</p>:null}
                            {cityStateZip?<p class="personal-info__item-value mb-0">{cityStateZip}</p>:null}
                            {country?<p class="personal-info__item-value mb-0">{country}</p>:null}
                            {number?<p class="personal-info__item-value mb-0">T: {formatPhoneNumber(number)}</p>:null}

                        </div>
                        <div class="personal-info__edit" style={{ marginTop: "1.25rem" }}>
                            <div class="personal-info__edit-link" onClick={()=>{ this.setShowEdit(true);  ABBOTT.gtm.buildAndPush.formTracking('edit-address', 'click', 'edit-address_change-shipping-address');}}>{changeShippingAddressLabel}</div>
                        </div>
                        <p className="personal-info__item-note" dangerouslySetInnerHTML={{ __html: footerNote }}></p>
                    </>
                }
            </>
        )
    }
}

export default MailingAddress;