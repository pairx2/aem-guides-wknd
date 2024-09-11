import React from "react";
import swal from "sweetalert";
import moment from "moment";

import { makeCall } from "../common/api";
import { sendFormData, getErrorMessage, getMessageForReg } from "../common/api";
import { groupFields } from "../common/regFunctions";
import validations from "../common/validations";

import MyInfo from "../components/MyInfo";
import MyChild from "../components/MyChild";
import SmsNotification from "../components/SmsNotification";

export default class PersonalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.aemData = props.aemData;
    this.smsFields = this.aemData.personalInfo.smsNotification.fields ? this.aemData.personalInfo.smsNotification.fields : [];
    this.newUserField = this.smsFields.slice(0,-2);
    // Set default state
    this.state = {
      phone: "",
      profileInfo: {},
      fields: this.newUserField,
      initialValues: {},
      isEditMyInfo: false,
      isChangePassword: false,
      isAddMyBaby: false,
      isEditMyBaby: false,
	    isSMSNotification: false,
      accountNumber: "",
      updateProfileCookie: false,
      message: "",
      smsStatus: "",
      smsServiceOpt: true, //considering user not requested for SMS earlier
      smsAlert: false,
      btnDisabled:false,
      phoneNumLabel: "", //phone number field label placeholder
      editPhoneFields: this.newUserField,
    };
  }

  /**
   * Call on component load
   */
  componentDidMount() {
    this.getProfileInfo();
    if(ABBOTT.utils.getSessionInfo()){
      window.sessionStorage.removeItem("MediaTracking");
    }
  }
  
  componentDidUpdate(){
    $("#pwa_stop_text_alert").click((e) => {
		ABBOTT.gtm.buildAndPush.formTracking(
	        "sms-notification",
	        "click",
	        "personal-info_opt-out-of-sms"
	      );
      swal({
        title: this.aemData.personalInfo.smsNotification.optoutModalBox.modalTitle,
        text: this.aemData.personalInfo.smsNotification.optoutModalBox.modalDescription1+'\n'+'\n'+'\n'+this.aemData.personalInfo.smsNotification.optoutModalBox.modalDescription2,
        className: "similac-modal",
        dangerMode: true,
        buttons: {
          confirm: {
            text: this.aemData.personalInfo.smsNotification.optoutModalBox.modalConfirmButton,
            value: true,
            visible: true,
            className: "",
            closeModal: true
          },
          cancel: {
            text: this.aemData.personalInfo.smsNotification.optoutModalBox.modalCancelButton,
            value: false,
            visible: true,
            className: "",
            closeModal: true,
          }
        }
      }).then(isconfirm => {
        if (isconfirm) {
          	ABBOTT.gtm.buildAndPush.formTracking(
	        "sms-notification",
	        "click",
	        "personal-info_opt-out-of-sms_confirm"
	      	);
          	return this.onSubmitOptOutValues({});
        } else {
          	ABBOTT.gtm.buildAndPush.formTracking(
	        "sms-notification",
	        "click",
	        "personal-info_opt-out-of-sms_cancel"
	      );
        }
      });
    });
    $("#react-form-field-sms-agree").change(function () {
      var ischecked = $(this).is(':checked');
      if (!ischecked) {
        $('.similac-form .checkbox-container').addClass('sms-notify');
      }
      else {
        $('.similac-form .checkbox-container').removeClass('sms-notify');
      }
    });
    //SMS Field click tracking on update
    $("input[type='tel']").click((e) => {
    if(this.state.smsAlert && this.state.smsStatus.toUpperCase() === "PENDING"){
      ABBOTT.gtm.buildAndPush.formTracking(
        "sms-notification",
        "click",
        "personal-info_sms-add-phone-double-opt-in-missed-window"
      );
    } 
    else if(!this.state.smsAlert && this.state.smsStatus.toUpperCase() === "PENDING"){
      ABBOTT.gtm.buildAndPush.formTracking(
        "sms-notification",
        "click",
        "personal-info_sms-add-phone-double-opt-in"
      );
    } 
    else if(this.state.smsStatus.toUpperCase() === "IN"){
      ABBOTT.gtm.buildAndPush.formTracking(
        "sms-notification",
        "click",
        "personal-info_sms-update-phone-current-subscriber"
      );
    } 
    else if(this.state.smsStatus.toUpperCase() === "OUT"){
      ABBOTT.gtm.buildAndPush.formTracking(
        "sms-notification",
        "click",
        "personal-info_sms-opt-back-in-add-phone"
      );
    }  
  });

  // Tracking SMS checkbox for all the scenarios
  $("#react-form-field-sms-agree").click((e) => {
    if(this.state.smsAlert && this.state.smsStatus.toUpperCase() === "PENDING"){
        ABBOTT.gtm.buildAndPush.formTracking(
          "sms-notification",
          "click",
          "personal-info_sms-agree_checkbox-double-opt-in-missed-window"
        );
      } 
      else if(!this.state.smsAlert && this.state.smsStatus.toUpperCase() === "PENDING"){
        ABBOTT.gtm.buildAndPush.formTracking(
          "sms-notification",
          "click",
          "personal-info_sms-notification_checkbox-double-opt-in"
        );
      } 
      else if(this.state.smsStatus.toUpperCase() === "IN"){
        ABBOTT.gtm.buildAndPush.formTracking(
          "sms-notification",
          "click",
          "personal-info_sms-agree_checkbox-current-subscriber"
        );
      } 
      else if(this.state.smsStatus.toUpperCase() === "OUT"){
        ABBOTT.gtm.buildAndPush.formTracking(
          "sms-notification",
          "click",
          "personal-info_sms-opt-back-in-checkbox"
        );
      } 
    });

    if(ABBOTT.utils.getSessionInfo()){
      window.sessionStorage.removeItem("MediaTracking");
    }
  }
  
  /**
   *  Method to get user my profile  information from AWS
   */
  getProfileInfo = () => {
    let ajaxConfig = {
      url: this.aemData.actionPath,
      method: "GET",
      headers: {
        "content-type": "application/json",
        "x-country-code": "US",
        "x-application-id": "similac",
        "x-preferred-language": "en-US",
        "x-id-token": ABBOTT.utils.getSessionInfo()
      }
    };

    makeCall(ajaxConfig).then(
      results => {
        if (results.response?.contacts) {
          var phoneNumber = results.response?.contacts[0]?.number;
          if (phoneNumber) {
            this.setState({ phone: phoneNumber });
          }
        }
        if (results.status) {
          let sortedChildren = [];
          let youngChild, birthDate, childweeks;
          if (results.response.children) {
            sortedChildren = results.response.children
              ?.sort(({ birthDate: b1 = "" }, { birthDate: b2 = "" }) => {
                return new Date(b1) - new Date(b2);
              })
              .filter(({ deleted = false }) => !deleted);

            if (sortedChildren.length) {
              youngChild = sortedChildren[sortedChildren.length - 1];
            }
          }
          if (youngChild) {
            birthDate = moment(youngChild.birthDate).format("MM/DD/YYYY");
            let currentDate = moment();
            let changeBirthDate = birthDate;
            if (currentDate.diff(changeBirthDate, "weeks") > 0) {
              changeBirthDate = moment(changeBirthDate).add(1, "day");
            }

            childweeks = currentDate.diff(changeBirthDate, "weeks");
          }

          let lc = ABBOTT.cookie("profile");
          let lp = JSON.parse(lc);
          let cookieConfig = {
            path: "/",
            domain: "similac.com"
          };

          if (this.state.updateProfileCookie) {
            lp.firstName = results.response.userInfo.firstName;
            lp.lastName = results.response.userInfo.lastName;
            if (youngChild) {
              lp.dob = birthDate;
              lp.weeks = childweeks;
            }
            ABBOTT.removeCookie("profile");
            ABBOTT.cookie("profile", JSON.stringify(lp), cookieConfig);

            ABBOTT.updatePageElements();
          }

           if(lp && lp.userType === "similac-ecom"){
            const { lineOne = "", lineTwo ="", country = "", city = "", state = "", zipCode = "" } = results.response.addresses && results.response.addresses.length > 0 && results.response.addresses[0];
            ABBOTT.cookie("profile", JSON.stringify(
              {...lp, lineOne, lineTwo, country, city, state, zipCode}
              ), cookieConfig);
           } 
          if (results.response.children) {
            results.response.children?.map(child => {  
              const dateSplit = child.birthDate.split('T');
              let newDate = dateSplit[0];
              child.birthDate = moment(newDate).format('MM/DD/YYYY')
              child.premature = child.premature.toString();
              child.isVisible = false;
              if (child.activeChild) {
                if (child.accountNumber !== undefined) {
                  this.setState({
                    accountNumber: child.accountNumber
                  });
                }
              }
              return child;
            });
          }
          //check opt status for users
          if (results.response.optPreferences){
            results.response.optPreferences.forEach((item) =>{
              if((item.channel.toUpperCase() === "DM" && item.status.toUpperCase() !== "IN") ||
              (item.channel.toUpperCase() === "EMAIL" && item.status.toUpperCase() !== "IN")){
                sessionStorage.setItem("setOptStatus", true);
              }
              if(item.channel.toUpperCase() === "SMS") {
                window.sessionStorage.setItem('smsStatus', item.status.toUpperCase());
                this.setState({
                  smsServiceOpt: false
                }); 
               if(item.status.toUpperCase() === "IN"){
                 let smsINFields = this.aemData.personalInfo.smsNotification.fields ? this.aemData.personalInfo.smsNotification.fields : [];
                 smsINFields[2].label = this.aemData.personalInfo.smsNotification.saveChange;
                this.setState({
                  fields: smsINFields,
                  editPhoneFields: smsINFields,
                });
               } 
               if(item.status.toUpperCase() === "PENDING"){
                 //Check SMS Alert window
                const endTime = moment(sessionStorage.getItem('userLastLogin'));
                const startTime = moment(item.date);
                let smsSentHours = parseInt(endTime.diff(startTime,'hours'));
                let smsAlertWindow = document.getElementById('smsAlertWindow') ?  Number(document.getElementById('#smsAlertWindow')) : 48;
                let smsInfiniteWindow = document.getElementById('smsInfiniteWindow') ? Number(document.getElementById('#smsInfiniteWindow')) : 0;
                let smsFieldsArr = this.aemData.personalInfo.smsNotification.fields ? this.aemData.personalInfo.smsNotification.fields : [];
                let requestedSMSField = smsFieldsArr.filter(function(item){
                  return !item.id;
                });
                requestedSMSField[2].label = this.aemData.personalInfo.smsNotification.saveChange;
               if(smsInfiniteWindow || (!smsInfiniteWindow && smsSentHours > smsAlertWindow)){
                  this.setState({
                    smsAlert: true
                  });
                } else {
                  this.setState({
                    smsAlert: false
                  });
                }
                this.setState({
                  fields: requestedSMSField,
                  editPhoneFields: requestedSMSField,
                });
               }
               if(item.status.toUpperCase() === "OUT" ){
                this.setState({
                  fields: this.newUserField,
                  editPhoneFields: this.newUserField,
                });
               }
              }
            });

          }


          this.setState({
            profileInfo: results.response,
            message: ""
          });
          this.smsObjStatus();
        }
        //Remove label if user is new to SMS
        if(this.state.smsServiceOpt){
          window.sessionStorage.setItem('smsStatus', "NOT_SET");
          let phoneFieldLabel = this.state.fields[0].label;
          this.state.fields[0].label = undefined;
          this.setState({
            phoneNumLabel : phoneFieldLabel,
            fields: this.state.fields
          });
        }
       
        if (results.errorCode === 500) {
          const dataValue = getMessageForReg("GEN_ERR");
		  
          $("#template.global-error p").html(dataValue);

          $("#template").show();
        } else {
          this.setState({ formError: getMessageForReg("GEN_ERR") });
        }
      },
      fail => {
        console.log(fail);
      }
    );
  };

  /**
   * Method to set the fomink initial field values
   * @param {*} fields
   * @param {*} userInfon
   */
  setInitialState = (fields, userInfo) => {
    const initialValues = fields
      .filter(({ type }) => {
        switch (type) {
          case "textbox":
          case "text":
          case "tel":
          case "checkbox":
          case "dropdown":
          case "radio":
          case "radio-button":
          case "calender":
          case "hidden":
            return true;
          default:
            return false;
        }
      })
      .reduce((accumulator, field) => {
        return Object.assign(accumulator, {
          [field.name]: userInfo && field.name != "sms-agree"
            ? userInfo[field.name]
            : field.type === "checkbox" && field.name != "sms-agree"
            ? false
            : field.initValue
        });
      }, {});

    return { initialValues };
  };

  /**
   * Method to check the formik validations error
   * @param {*} prom
   * @param {*} errorMessage
   */
  checkError = (prom, errorMessage) => {
    if (prom instanceof Promise) {
      return prom.then(result => {
        if (typeof result === "boolean" && result === true) {
          return errorMessage;
        } else if (typeof result === "string") {
          return result;
        }
        return undefined;
      });
    } else if (prom) {
      return errorMessage;
    }
    return undefined;
  };

  /**
   * Method to validate the formik values
   * @param {*} validateArray
   * @param {*} name
   * @param {*} values
   * @param {*} type
   */
  makeValidations = (
    validateArray = [], 
    name = "",
    values,
    type = "text" 
  ) => value => {
    let _type =
      type === "textbox" || typeof type === "undefined" ? "text" : type;
    for (var item in validateArray) {
      const { errorType, errorMessage, ...otherErrorData } = validateArray[
        item
      ];
      const validationMess =
        validations[errorType] &&
        validations[errorType](value, _type, otherErrorData, values);
      if (validationMess) {
        return this.checkError(validationMess, errorMessage);
      }
    }
  };

  /**
   * Method to show/hide the password text
   * @param {number} id
   */
  showToggle = name => {
    let { fields } = this.state;
    let newFields = {
      fields: fields.map(field => {
        if (field.name === name) {
          field.isShowPass = !field.isShowPass;
        }
        return field;
      })
    };
    this.setState({
      ...newFields
    });
  };

  /**
   * Method to edit the my info section
   */
  editMyInfo = () => {
    const state = this.setInitialState(
      this.aemData.personalInfo.myInfo.fields,
      this.state.profileInfo.userInfo
    );
    const {
      isEditMyInfo,
      isChangePassword,
      isAddMyBaby,
      isEditMyBaby,
    isSMSNotification
    } = this.state;
    if (isEditMyInfo || isChangePassword || isAddMyBaby || isEditMyBaby || isSMSNotification) {
    } else {
      ABBOTT.gtm.buildAndPush.formTracking(
        "edit-preferences",
        "click",
        "personal-info_edit-my-info"
      );
      this.setState({
        isEditMyInfo: true,
        isChangePassword: false,
        isAddMyBaby: false,
        isEditMyBaby: false,
     isSMSNotification: false,
        fields: this.aemData.personalInfo.myInfo.fields,
        ...this.state.profileInfo.children?.map((child, i) => {
          child.isVisible = false;
          return child;
        }),
        ...state
      });
    }
    setTimeout(() => {
      document.getElementsByClassName('btn-removeemail')[0]?.addEventListener("click", ()=>{
        this.removeContactEmailInfo()
      });
    }, 100);
  };
  removeContactEmailInfo = () => {

const {userInfo, addresses, contacts, children, optPreferences, offerPreferenceInfo} = this.state.profileInfo
   var formData = {
    userInfo: {
      ...userInfo,
      contactEmail: "",
    },
    contacts:[...contacts],
    addresses: [...addresses],
    children: [... children],
    optPreferences: [...optPreferences],
    offerPreferenceInfo: {...offerPreferenceInfo},
    category: "profileInfo"
  };
  let data =JSON.stringify({...formData})

     let ajaxConfig = {
       url: this.aemData.personalInfo.myInfo.actionPath,
       method: "POST",
       contentType: "application/json",
       
       headers: {
         "content-type": "application/json",
         "x-country-code": "US",
         "x-application-id": "similac",
         "x-preferred-language": "en-US", 
         "x-id-token": ABBOTT.utils.getSessionInfo()
       },
       data:data,
     };
     
     makeCall(ajaxConfig).then(
       results => {
         if (results.status) {
          this.getProfileInfo();
         }
         if (results.errorCode === 500) {
           const dataValue = getMessageForReg("GEN_ERR");
           $("#template.global-error p").html(dataValue);
 
           $("#template").show();
         } else {
           this.setState({ formError: getMessageForReg("GEN_ERR") });
         }
       },
       fail => {
         console.log(fail);
       }
     );
   }

  /**
   * Method for change the password
   */
  changePassword = () => {
    const state = this.setInitialState(
      this.aemData.personalInfo.password.fields
    );
    const {
      isEditMyInfo,
      isChangePassword,
      isAddMyBaby,
      isEditMyBaby,
    isSMSNotification
    } = this.state;
    if (isEditMyInfo || isChangePassword || isAddMyBaby || isEditMyBaby || isSMSNotification) {
    } else {
      ABBOTT.gtm.buildAndPush.formTracking(
        "edit-preferences",
        "click",
        "personal-info_change-password"
      );
      this.setState({
        isChangePassword: true,
        isEditMyInfo: false,
        isEditMyBaby: false,
        isAddMyBaby: false,
    isSMSNotification: false,
        fields: this.aemData.personalInfo.password.fields,
        ...this.state.profileInfo.children?.map((child, i) => {
          child.isVisible = false;
          return child;
        }),
        ...state
      });
    }
  };

  /**
   * Method to cancel edit my info section
   */
  cancelEditMyInfo = () => {
    if (this.state.isEditMyInfo) {
      ABBOTT.gtm.buildAndPush.formTracking(
        "edit-preferences",
        "click",
        "personal-info_edit-my-info_cancel"
      );
    } else if (this.state.isChangePassword) {
      ABBOTT.gtm.buildAndPush.formTracking(
        "edit-preferences",
        "click",
        "personal-info_change-password_cancel"
      );
    }
    this.setState({
      isEditMyInfo: false,
      isChangePassword: false,
      message: ""
    });
  };

    /**
   * Method to cancel the edit of Phone Number in SMS Notification section
   */
     cancelEditOfPhoneNumber = () => {
      if (this.state.isSMSNotification) {
        if(this.state.smsAlert && this.state.smsStatus.toUpperCase() == "PENDING"){
          ABBOTT.gtm.buildAndPush.formTracking(
            "sms-notification",
            "click",
            "personal-info_sms-cancel-double-opt-in-missed-window"
          );
        } else if(this.state.smsStatus.toUpperCase() == "IN"){
          ABBOTT.gtm.buildAndPush.formTracking(
            "sms-notification",
            "click",
            "personal-info_sms-cancel"
          );
        }else {
        ABBOTT.gtm.buildAndPush.formTracking(
          "sms-notification",
          "click",
          "personal-info_sms-cancel-double-opt-in"
        );
        }
      }
      this.setState({
        isSMSNotification: false,
        btnDisabled: false,
        message: ""
      });
    };
  /**
   * Method to add child info
   */
  addMyBaby = () => {
    const {
      isEditMyInfo,
      isChangePassword,
      isAddMyBaby,
      isEditMyBaby,
    isSMSNotification
    } = this.state;
    if (isEditMyInfo || isChangePassword || isAddMyBaby || isEditMyBaby || isSMSNotification) {
    } else {
      ABBOTT.gtm.buildAndPush.formTracking(
        "edit-preferences",
        "click",
        "personal-info_add-child"
      );
      this.setState({
        isAddMyBaby: true,
        isChangePassword: false,
        isEditMyInfo: false,
        isEditMyBaby: false,
    isSMSNotification: false,
        fields: this.aemData.personalInfo.myBaby.fields,
        ...this.state.profileInfo.children?.map((child, i) => {
          child.isVisible = false;
          return child;
        }),
        ...this.setInitialState(this.aemData.personalInfo.myBaby.fields)
      });
    }
  };

  /**
   * Method to Edit the child info
   * @param {number} index
   */
  editMyBaby = index => {
    const state = this.setInitialState(
      this.aemData.personalInfo.myBaby.fields,
      this.state.profileInfo.children[index]
    );
    const {
      isEditMyInfo,
      isChangePassword,
      isAddMyBaby,
      isEditMyBaby,
	  isSMSNotification
    } = this.state;
    if (isEditMyInfo || isChangePassword || isAddMyBaby || isEditMyBaby || isSMSNotification) {
    } else {
      ABBOTT.gtm.buildAndPush.formTracking(
        "edit-preferences",
        "click",
        "personal-info_edit-baby-profile"
      );
      this.setState({
        isEditMyBaby: true,
        isChangePassword: false,
        isEditMyInfo: false,
        isAddMyBaby: false,
        isSMSNotification: false,
        fields: this.aemData.personalInfo.myBaby.fields,
        ...this.state.profileInfo.children?.map((child, i) => {
          child.isVisible = false;
          if (i === index) {
            child.isVisible = true;
          }
          return child;
        }),
        ...state
      });
    }
  };
  /**
   * Method to cancel Edit child info
   */
  cancelEditMyBaby = () => {
    if (this.state.isEditMyBaby) {
      ABBOTT.gtm.buildAndPush.formTracking(
        "edit-preferences",
        "click",
        "personal-info_edit-baby-profile_cancel"
      );
    } else if (this.state.isAddMyBaby) {
      ABBOTT.gtm.buildAndPush.formTracking(
        "edit-preferences",
        "click",
        "personal-info_add-child_cancel"
      );
    }
    this.setState({
      isEditMyBaby: false,
      isAddMyBaby: false,
      message: "",
      ...this.state.profileInfo.children?.map((child, i) => {
        child.isVisible = false;
        return child;
      })
    });
  };

  /**
   * Method to remove child
   * @param {number} index
   */
  removeMyBaby = index => {
    const {
      isEditMyInfo,
      isChangePassword,
      isAddMyBaby,
      isEditMyBaby,
	  isSMSNotification,
    } = this.state;
    if (isEditMyInfo || isChangePassword || isAddMyBaby || isEditMyBaby || isSMSNotification) {
    } else {
      this.setState({
        fields: this.aemData.personalInfo.myBaby.fields
      });
      ABBOTT.gtm.buildAndPush.formTracking("pop-up", "load", "remove-baby");
      swal({
        title: this.aemData.personalInfo.myBaby.removeModalBox.title,
        text: this.aemData.personalInfo.myBaby.removeModalBox.description,
        className: "similac-modal",
        dangerMode: true,
        buttons: [
          this.aemData.personalInfo.myBaby.removeModalBox.cancelButton,
          this.aemData.personalInfo.myBaby.removeModalBox.submitButton
        ]
      }).then(isconfirm => {
        if (isconfirm) {
          ABBOTT.gtm.buildAndPush.formTracking(
            "pop-up",
            "click",
            "remove-baby_yes"
          );
          this.onSubmitValues({}, index);
        } else {
          ABBOTT.gtm.buildAndPush.formTracking(
            "pop-up",
            "click",
            "remove-baby_no"
          );
        }
      });
    }
  };

/**
   * Method for updating the phone number
   */
 editPhoneNumber = () => {
    const state = this.setInitialState(
      this.aemData.personalInfo.smsNotification.fields,
      this.getObjects(this.state.profileInfo.contacts[0],'number',this.state.phone,this.formatPhoneNumber(this.state.phone))
    );
    const {
      isEditMyInfo,
      isChangePassword,
      isAddMyBaby,
      isEditMyBaby,
	  isSMSNotification,
    } = this.state;
    if (isEditMyInfo || isChangePassword || isAddMyBaby || isEditMyBaby || isSMSNotification) {
    } else {
      if(this.state.smsAlert && this.state.smsStatus.toUpperCase() === "PENDING"){
        ABBOTT.gtm.buildAndPush.formTracking(
          "sms-notification",
          "click",
          "personal-info_sms-update-number-double-opt-in-missed-window"
        );
      } else if(!this.state.smsAlert && this.state.smsStatus.toUpperCase() === "PENDING"){
        ABBOTT.gtm.buildAndPush.formTracking(
          "sms-notification",
          "click",
          "personal-info_sms-update-number-double-opt-in"
        );
      } else if(this.state.smsStatus.toUpperCase() === "IN") {
        ABBOTT.gtm.buildAndPush.formTracking(
          "sms-notification",
          "click",
          "personal-info_sms-update-phone-or-opt-out"
        );
      } else if(this.state.smsStatus.toUpperCase() === "OUT") {
        ABBOTT.gtm.buildAndPush.formTracking(
          "sms-notification",
          "click",
          "personal-info_sms-opt-back-in-click-here"
        );
      }  
     
      this.setState({
        isChangePassword: false,
        isEditMyInfo: false,
        isEditMyBaby: false,
        isAddMyBaby: false,
        isSMSNotification: true,
        btnDisabled : true,
        smsServiceOpt: false,
        fields: this.state.editPhoneFields,
         ...this.state.profileInfo.children?.map((child, i) => {
           child.isVisible = false;
           return child;
         }),
        ...state
      });
    } 
  };

   formatPhoneNumber = (phoneNumberString) => {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        var intlCode = (match[1] ? '+1 ' : '');
        return [intlCode, '', match[2], '-', match[3], '-', match[4]].join('');
    }
    return null;
}

   getObjects=(obj, key, val, newVal) =>{
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (i == key && obj[key] == val) {
            obj[key] = newVal;
        }
    }
    return obj;
  }

  onSubmitOptOutValues = async values => {
	let actionPath = this.aemData.personalInfo.smsNotification.actionPath;    
    let _config = {
      headers: {
        "x-id-token": ABBOTT.utils.getSessionInfo()
      }
    };
    let formData = {
      "userInfo": {
        "mobileNumber": "O" + this.state.phone,
      },
      "category": "profileInfo"
    };
    return await sendFormData(actionPath, formData, _config).then(success => {
      window.location.reload();
      return success;
    })
  };

  // Resend SMS if respond window expires
  onSubmitResend = async values => {
    ABBOTT.gtm.buildAndPush.formTracking(
      "sms-notification",
      "click",
      "personal-info_sms-resend-text-double-opt-in"
    );
    let actionPath = this.aemData.personalInfo.smsNotification.actionPath;    
      let _config = {
        headers: {
          "content-type": "application/json",
          "x-country-code": "US",
          "x-application-id": "similac",
          "x-preferred-language": "en-US",
          "x-id-token": ABBOTT.utils.getSessionInfo()
        }
      };
      let formData = {
        "userInfo": {
          "mobileNumber": this.state.phone
        },
        "category": "profileInfo"
      };
      return await sendFormData(actionPath, formData, _config).then(success => {
        window.location.reload();
        return success;
      })
    };

  checkBoxValidation = () => {
    if ($('#react-form-field-sms-agree:checked').length > 0) {
      return true;
    }
    return false;
  }
  
  /**
   * Method on form submit
   * @param {object} values
   * @param {number} childIndex
   */
  onSubmitValues = async (values, childIndex) => {

    let actionPath;
    let customerId = ABBOTT.utils.getMagentoCustomerId();
    let formData;
    // on user name edit
    if (this.state.isEditMyInfo) {
      ABBOTT.gtm.buildAndPush.formTracking(
        "edit-preferences",
        "click",
        "personal-info_edit-my-info_submit"
      );
      actionPath = this.aemData.personalInfo.myInfo.actionPath;
      
      if(this.state.profileInfo.userInfo && this.state.profileInfo.userInfo.contactEmail == undefined){
      delete values.contactEmail;
      }
      formData = {
        userInfo: {
          ...values,
          magentoId: customerId
        },
        category: "profileInfo"
      };
    } else if (this.state.isChangePassword) {
      ABBOTT.gtm.buildAndPush.formTracking(
        "edit-preferences",
        "click",
        "personal-info_change-password_submit"
      );
      // on password change
      actionPath = this.aemData.personalInfo.password.actionPath;
      formData = {
        password: values.CURRENTPASSWORD,
        newPassword: values.CONFIRMPASSWORD
      };
    } else if (this.state.isAddMyBaby) {
      ABBOTT.gtm.buildAndPush.formTracking(
        "edit-preferences",
        "click",
        "personal-info_add-child_submit"
      );
      // on add baby information
      actionPath = this.aemData.personalInfo.myBaby.actionPath;

      let children = this.state.profileInfo.children.map((child, i) => {
        let filteredChild = groupFields(child, this.state.fields);
        return filteredChild.children[0];
      });

      let newChild = groupFields(values, this.state.fields);

      let groupedChild = [];
      groupedChild.push(...children);
      groupedChild.push(...newChild.children);

      if(sessionStorage.getItem("setOptStatus")){
        formData = {
          category: "childInfo",
          children: [...groupedChild],
          offerPreferenceInfo : {
              enableDigital: true,
              product: "strongmoms"
            }
        };
      }else{
        formData = {
          category: "childInfo",
          children: [...groupedChild]
        }
      };
    } else if (this.state.isEditMyBaby) {
      ABBOTT.gtm.buildAndPush.formTracking(
        "edit-preferences",
        "click",
        "personal-info_edit-baby-profile_submit"
      );
      actionPath = this.aemData.personalInfo.myBaby.actionPath;

      let children = this.state.profileInfo.children.map((child, i) => {
        let filteredChild;
        if (childIndex === i) {
          filteredChild = groupFields(values, this.state.fields);
        } else {
          filteredChild = groupFields(child, this.state.fields);
        }
        return filteredChild.children[0];
      });

      let groupedChild = [];
      groupedChild.push(...children);

      formData = {
        category: "childInfo",
        children: [...groupedChild]
      };
    } else if (childIndex >= 0) {
      actionPath = this.aemData.personalInfo.myBaby.actionPath;

      let groupedChild = this.state.profileInfo.children.map((child, i) => {
        if (childIndex === i) {
          child.deleted = true;
        }
        let filteredChild = groupFields(child, this.state.fields);
        return filteredChild.children[0];
      });

      formData = {
        category: "childInfo",
        children: [...groupedChild]
      };
    } else if (this.state.isSMSNotification|| this.state.smsServiceOpt) {
      if(this.state.smsSerivceOpt){
        ABBOTT.gtm.buildAndPush.formTracking(
	        "sms-notification",
	        "click",
	        "personal-info_sms-confirm-new-sign-up"
        );
      } else if(this.state.smsAlert && this.state.smsStatus.toUpperCase() ==="PENDING"){
        ABBOTT.gtm.buildAndPush.formTracking(
	        "sms-notification",
	        "click",
	        "personal-info_sms-save-changes-submit-double-opt-in-missed-window"
        );
      } else if(!this.state.smsAlert && this.state.smsStatus.toUpperCase() ==="PENDING"){
        ABBOTT.gtm.buildAndPush.formTracking(
	        "sms-notification",
	        "click",
	        "personal-info_sms-save-changes-submit-double-opt-in"
        );
      } else if(this.state.smsStatus.toUpperCase() ==="IN"){
        ABBOTT.gtm.buildAndPush.formTracking(
	        "sms-notification",
	        "click",
	        "personal-info_sms-save-changes"
        );
      }
      else if(this.state.smsStatus.toUpperCase() ==="OUT"){
        ABBOTT.gtm.buildAndPush.formTracking(
	        "sms-notification",
	        "click",
	        "personal-info_sms-opt-back-in-text-me-alerts-confirm"
        );
      }
      $('.similac-form .checkbox-container').removeClass('sms-notify');
      if (!this.checkBoxValidation()) {
        $('.similac-form .checkbox-container').addClass('sms-notify');
        return false;
      }
      actionPath = this.aemData.personalInfo.smsNotification.actionPath;
      if(this.state.smsStatus == 'IN'){
        formData = {
          userInfo: {
            "mobileNumber" : values && values.number ? "R"+values.number.replace(/\D/g, '') : "",
          },
          category: "profileInfo"
        };
      }else{
        formData = {
          userInfo: {
            "mobileNumber" : values && values.number ? values.number.replace(/\D/g, '') : "",
          },
          category: "profileInfo"
        };
      }
      
    }
    let ajaxConfig = {
      headers: {
        "x-id-token": ABBOTT.utils.getSessionInfo()
      }
    };
   
    return await sendFormData(actionPath, formData, ajaxConfig).then(
      success => {
        if (success.errorCode) {
          const { errorMessage = getMessageForReg(success.errorCode) } =
            getErrorMessage(success) || {};
          this.setState({
            message: {
              text: errorMessage,
              class: "personal-info__err"
            }
          });
        }
        if (success.status) {
          if (success.errorCode === 0) {
            this.setState({
              message: {
                text: success.response.statusReason,
                class: "personal-info__success"
              }
            });
            //set lable for new user phone update
            if(this.state.smsServiceOpt){
              this.state.fields[0].label = this.state.phoneNumLabel;
              this.setState({
                fields: this.state.fields
              });
            }
            // reload the page if phone number is updated
            if(this.state.isSMSNotification){
              window.location.reload();
            }
            if (this.state.isEditMyInfo) {
              ABBOTT.gtm.buildAndPush.formTracking(
                "edit-preferences",
                "submit",
                "personal-info_edit-my-info_submit"
              );
            } else if (this.state.isChangePassword) {
              ABBOTT.gtm.buildAndPush.formTracking(
                "edit-preferences",
                "submit",
                "personal-info_change-password_submit"
              );
              // add logic to remove cookie after password change and login again
              var cookieConfig = {
                path: '/',
                domain: 'similac.com'
              };
              cookieConfig.expires = -1;
              ABBOTT.removeCookie("profile", cookieConfig);
              ABBOTT.removeCookie("x-id-token", cookieConfig);
              window.location.href = "/rewards/admin/login.html";
            } else if (this.state.isAddMyBaby) {
              ABBOTT.gtm.buildAndPush.formTracking(
                "edit-preferences",
                "submit",
                "personal-info_add-child_submit"
              );
            } else if (this.state.isEditMyBaby) {
              ABBOTT.gtm.buildAndPush.formTracking(
                "edit-preferences",
                "submit",
                "personal-info_edit-baby-profile_submit"
              );
            }
            // added reload for analytics team

            setTimeout(() => {
              if (!this.state.isChangePassword || !this.state.isSMSNotification) {
                this.setState({
                  updateProfileCookie: true
                });
              }
              this.setState({
                isChangePassword: false,
                isEditMyBaby: false,
                isEditMyInfo: false,
                isAddMyBaby: false,
                isSMSNotification: false
              });
              this.getProfileInfo();
            }, 500);
          }
        }
        return success;
      },
      fail => {
        console.log(fail);
      }
    );
  };

  smsObjStatus = () => {
      var optinSMS = this.state.profileInfo.optPreferences.filter(x => x.channel?.includes("SMS"));
      var optinSMSObj;
      var optinSMSDate;
      var optinSMSObjStatus = '';
      var getLegacyOptStatusDate;
      if (optinSMS.length > 0) {
        if (optinSMS.length > 1) {
          var sortedObj = optinSMS.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
          });
          optinSMSObj = sortedObj[0];
        } else {
          optinSMSObj = optinSMS[0];
        }
        getLegacyOptStatusDate = new Date('2023-01-15');
        getLegacyOptStatusDate = getLegacyOptStatusDate.getTime();
        optinSMSDate = new Date(optinSMSObj['date']);
        optinSMSDate = optinSMSDate.getTime();
        optinSMSObjStatus = optinSMSObj['status'];
      }
      if (this.state.profileInfo && this.state.profileInfo.contacts.length > 0 && this.state.profileInfo.contacts[0].number != ""
        && optinSMSDate && optinSMSDate > getLegacyOptStatusDate && (optinSMSObjStatus.toUpperCase() == 'IN' || optinSMSObjStatus.toUpperCase() == 'PENDING' || optinSMSObjStatus.toUpperCase() == 'OUT')) {
        this.setState({smsStatus: optinSMSObjStatus.toUpperCase()});
        return true;
      }
      return false;
  }

  render() {
    return (
      <>
        {ABBOTT.utils.isUserLoggedIn() && (
          <>
            {this.state.profileInfo && (
              <>
                {/* Personal info  */}
                <h1 className="profile__title">{this.aemData.formTitle}</h1>
                {/* My info section */}

                <MyInfo
                  aemData={this.aemData.personalInfo}
                  state={this.state}
                  makeValidations={this.makeValidations}
                  showToggle={this.showToggle}
                  editMyInfo={this.editMyInfo}
                  changePassword={this.changePassword}
                  cancelEditMyInfo={this.cancelEditMyInfo}
                  onSubmitValues={this.onSubmitValues}
                  message={this.state.message}
                />

                {/* SMS Notifications Section */}
                {this.state.profileInfo && this.state.profileInfo.userInfo && this.state.profileInfo.userInfo.userType !== "similac-ecom" && 
                this.state.profileInfo.offerPreferenceInfo?.retailer == 'TBUNIVERSAL' && 
                (this.state.smsStatus || this.state.smsServiceOpt) &&(
                  <SmsNotification
                    aemData={this.aemData.personalInfo}
                    state={this.state}
                    makeValidations={this.makeValidations}
                    showToggle={this.showToggle}
                    editPhoneNumber={this.editPhoneNumber}
                    cancelEditOfPhoneNumber={this.cancelEditOfPhoneNumber}
                    optOutSMS={this.optOut}
                    onSubmitValues={this.onSubmitValues}
                    onSubmitResend = {this.onSubmitResend}
                    message={this.state.message}
                    editPhoneField = {this.state.editPhoneFields}
                  />
                )}

                {/* child section */}
                {this.state.profileInfo.children && (
                  <MyChild
                    aemData={this.aemData.personalInfo}
                    state={this.state}
                    makeValidations={this.makeValidations}
                    addMyBaby={this.addMyBaby}
                    editMyBaby={this.editMyBaby}
                    cancelEditMyBaby={this.cancelEditMyBaby}
                    removeMyBaby={this.removeMyBaby}
                    onSubmitValues={this.onSubmitValues}
                    message={this.state.message}
                  />
                )}
              </>
            )}
          </>
        )}
      </>
    );
  }
}
