import React from "react";
import moment from 'moment';
import { makeCall, sendFormData, getErrorMessage } from "../common/api";
import { flattenObject } from "../common/apiToLocal";

export default class ChangeProgram extends React.Component {
  constructor(props) {
    super(props);
    this.aemData = props.aemData;
    this.state = {      
      profileInfo: {}      
    };
    this.checkLogin = this.checkLogin.bind(this);
  }
  
  checkLogin() {
    return ABBOTT.cookie("x-id-token");
  }

  /**
   * Call on component load
   */
  componentDidMount() {
    if (ABBOTT.utils.isUserLoggedIn()) {
      this.getProfileInfo();
    }
  }

  /**
     *  Method to get user my profile  information from AWS
     */
  getProfileInfo = () => {
    let ajaxConfigOnLoad  = {
      "url": this.aemData.actionPathGetProfile,
      "method": "GET",
      "headers": {
        "content-type": "application/json",
        "x-country-code": "US",
        "x-application-id": "similac",
        "x-preferred-language": "en-US",
        "x-id-token": ABBOTT.utils.getSessionInfo()
      }
    }

    makeCall(ajaxConfigOnLoad).then(results => {
      const $strongMom_reward = jQuery("#strongmoms");
      const $alimentum_reward = jQuery("#alimentum");
      const $neosure_reward = jQuery("#neosure");
      const $core_banner_image =jQuery(".reward-preference-image-core");
      const $alimentum_banner_image =jQuery(".reward-preference-image-alimentum");
      const $neosure_banner_image =jQuery(".reward-preference-image-neosure");
      
      if (results.status) {   
                
        this.setState({
          profileInfo: results.response,
          preferedProduct:results.response.offerPreferenceInfo.product ? results.response.offerPreferenceInfo.product : 'CORE'
        });
        if(results.response.offerPreferenceInfo.product ==="ALIMENTUM"){
         
          window.sessionStorage.setItem("preferenceType","alimentum");
          $alimentum_banner_image.addClass("show-reward-banner")                    
          $alimentum_reward.hide();
          $neosure_reward.hide();          
        }

        else if(results.response.offerPreferenceInfo.product ==="NEOSURE"){
          
          window.sessionStorage.setItem("preferenceType","neosure");
          $neosure_banner_image.addClass("show-reward-banner")
          $neosure_reward.hide();
        }
        
        else if(results.response.offerPreferenceInfo.product ==="CORE"){
         
          window.sessionStorage.setItem("preferenceType","strongmoms")
          $core_banner_image.addClass("show-reward-banner")
          $strongMom_reward.hide();
        } else {
         
          window.sessionStorage.setItem("preferenceType","strongmoms")
          $core_banner_image.addClass("show-reward-banner")
          $strongMom_reward.hide();
        }
      }
    });
  };
  /**
   * Method on selecting retailer
   * @param {string} value
   */
  selectProgram = (key) => {
    const aemData = this.aemData;
    const { preferenceCenter } = this.aemData; 

    let selectedPragram = preferenceCenter.preferenceCenterList[key].value;
    jQuery(".similac-modal").addClass("confiem-reward");

    swal({

      title: preferenceCenter.confirmationPopup.popupTitile,
      text: preferenceCenter.confirmationPopup.popupContent,
      className: "similac-modal",      
      closeOnClickOutside: false,      
      buttons: {
       
        cancel: {
          text:preferenceCenter.confirmationPopup.confirmationCancelBtn,
          value:false,
          visible:true,
          className:"cancel-rewards"
        },
          confirm: {              
              text: preferenceCenter.confirmationPopup.confirmationSubmitBtn,
              value: "ok",
              visible:true,
              className:"confirm-reward"
          }
          
      }
    }).then(function(value) {
        if (value === "ok") {
            window.open(preferenceCenter.confirmationPopup.submitRedirectPath, "_self");

        } else if (!value) {
          window.open(preferenceCenter.confirmationPopup.cancelRedirectPath, "_self");
        }
    })

  };

  /**
   * Method to select paper offer
   */

  render() {
    const aemData = this.aemData;
    const { preferenceCenter } = this.aemData;   

    return (
      <>
        {aemData && (
          <>
            <h3 className="font-brandon-bold text-smalt mb-4">{preferenceCenter.preferenceCenterTitle}</h3>
            <div className="row">
              {Object.keys(preferenceCenter.preferenceCenterList).map(key => (
                <div id= {preferenceCenter.preferenceCenterList[key].value.toLowerCase()} className="col-12 col-lg-6 col-md-12 mb-2_813 reward-select-card">
                  <div className="row bg-alice-blue py-1_875 pl-3 pl-md-1_875 pl-lg-1_875 pr-0 mx-0 h-100">
                    <div className="col-6 col-md-5 col-lg-4 pl-0">
                      <img
                        src={preferenceCenter.preferenceCenterList[key].imgUrl}
                        className="w-100"
                      />
                    </div>
                    <div className="col-6 col-md-7 col-lg-8 py-1 pl-0 pl-md-3">
                      <p className="font-roboto-bold text-smalt mb-1_25 mb-md-2_625 mb-lg-1_25">
                        {preferenceCenter.preferenceCenterList[key].label}
                      </p>
                      <a
                        className="font-brandon-bold text-tangerine select-program"
                        data-gtm ={preferenceCenter.preferenceCenterList[key].dataGtmLabel}
                        onClick={() =>
                          this.selectProgram(key)
                        }
                      >
                        {preferenceCenter.selectLabel}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
                          
           {<a
              className="font-roboto-reg text-tangerine d-flex mb-2_813 stay-current-program"
              href ={preferenceCenter.stayCurrentProgramPath}
            >
              {preferenceCenter.deSelectLabel}
            </a>}
            
          </>
        )}
      </>
    );
  }
}
