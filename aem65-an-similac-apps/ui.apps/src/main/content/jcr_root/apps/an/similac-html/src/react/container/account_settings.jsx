import * as React from "react";
import ReactDOM from "react-dom";

import { Formik, Form, Field, useFormikContext } from "formik";
import InputMasker from "../components/InputMasker";
import HtmlTag from "../components/HtmlTag";
import validations from "../common/validations";
import Button from "../components/Button";
import Focus from "../components/ErrorMessage/focus";
import FormError from "../components/ErrorMessage/FormError";
import { makeCall, sendFormData, getErrorMessage } from "../common/api";
import { groupFieldsWithConfig } from "../common/regFunctions";
import Checkbox from "../components/Checkbox";
import QRcodeScanner from "../components/QRcodeScanner";

class AccountSettings extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.submitted = false;
    const { formName, fields: flds = [], actionPath } = props.data;
    const { fields = [] } = this.initFieldSate(flds || []);
    const checkNonDoUserCookieValue = window.sessionStorage.getItem("nonDo");

    this.state = {
      phone: "",
      profileInfo: {},
      actionPath,
      fields,
      fieldsType: {},
      initialValues: {},
      formName,
      formError: "",
      accountNumber: "",
      checkNonDoUserCookie: checkNonDoUserCookieValue,
    };
  }

  initFieldSate = (_fields = []) => {
    const fields = _fields.map(item => {
      const _item = this.updateFieldType(item);
      const { name: _name = "", value: _value = "", initValue = "" } = _item;
      const name = _name ? String(_name).trim() : _name;
      const value = initValue ? initValue : _value;
      return {
        ..._item,
        name,
        value
      };
    });
    return {
      fields
    };
  };

  updateFieldType = (item = {}) => {
    const { sourceValue, type, value, fieldType: ft } = item;
    if (ft) {
      return item;
    }
    const _item = { ...item };
    if (type === "checkbox" && typeof sourceValue === "undefined") {
      _item["fieldType"] = typeof true;
    } else if (type === "hidden") {
      _item["fieldType"] = typeof value;
    } else if (sourceValue !== null) {
      if (typeof sourceValue === "object") {
        if (Array.isArray(sourceValue) && sourceValue.length) {
          _item["fieldType"] = typeof sourceValue[0].value;
        } else {
          _item["fieldType"] = "object";
        }
      } else {
        _item["fieldType"] = typeof sourceValue;
      }
    } else {
      _item["fieldType"] = typeof "string";
    }
    return _item;
  };

  setInitialState = fields => {
    const { formName } = this.props.data;

    const initialValues = fields
      .filter(({ type }) => {
        switch (type) {
          case "textbox":
          case "googleApi":
          case "text":
          case "tel":
          case "checkbox":
          case "hidden":
            return true;
          default:
            return false;
        }
      })
      .reduce((accumulator, { name, value, apiFlag }) => {
        let _value = value;

        return Object.assign(accumulator, {
          [name]: _value
        });
      }, {});

    return { initialValues };
  };

  componentDidMount() {
    const { initialValues } = this.setInitialState(this.state.fields);
    this.setState({ initialValues });
    if (ABBOTT.utils.isUserLoggedIn()) {
      this.getProfileInfo(this.state.actionPath);
      setTimeout(() => {
        $("#overlay").css('display', 'none');
      }, 4000);
      $("#pwa_stop_text_alert").click((e) => {
        ABBOTT.gtm.buildAndPush.formTracking(
          "sms-notification",
          "click",
          "pwa_personal-info_add-phone-no_stop-text-alerts"
        );
        $("#pwa-sms-popup").modal("show");
      });
      $(".popupSMSSubmit").click((e) => {
        ABBOTT.gtm.buildAndPush.formTracking(
          "edit-preferences",
          "click",
          "pwa_personal-info_opt-out-of-sms_confirm"
        );
      });
      $(".popupSMSCancel").click((e) => {
        ABBOTT.gtm.buildAndPush.formTracking(
          "edit-preferences",
          "click",
          "pwa_personal-info_opt-out-of-sms_cancel"
        );
      });
      $("#account-text-me-alerts").click((e) => {
        ABBOTT.gtm.buildAndPush.formTracking(
          "sms-notification",
          "click",
          "pwa_personal-info_add-phone-no_text-me-alerts"
        );
      });
      $(".popupSMSCancel").click((e) => {
        $("#pwa-sms-popup").modal("hide");
      });
      $(".popupSMSSubmit").click((e) => {
        //ajax call for opt-out here
        return this.onSubmitOptOutValues({})
      });
      $("#react-form-field-smsselect").click((e) => {
        ABBOTT.gtm.buildAndPush.formTracking(
          "sms-notification",
          "click",
          "pwa_personal-info_sms-notification_checkbox"
        );
      });
      var isAccountTab = window.sessionStorage.getItem('isAccountTab');
      if(isAccountTab){
        $('.nav-tabs a:eq(2)').tab('show');
        window.sessionStorage.setItem("isAccountTab", false);
      }
    }
  }

  componentDidUpdate() {
    $("#react-form-field-smsselect").change(function () {
      var ischecked = $(this).is(':checked');
      if (!ischecked) {
        $('.similac-form .checkbox-container').addClass('sms-notify');
      }
      else {
        $('.similac-form .checkbox-container').removeClass('sms-notify');
      }
    });
  }
  checkLogin() {
    return ABBOTT.cookie("x-id-token");
  }
  
  getProfileInfo = (url) => {
    let ajaxConfig = {
      url: url,
      method: "GET",
      headers: {
        "content-type": "application/json",
        "x-country-code": "US",
        "x-application-id": "similac",
        "x-preferred-language": "en-US",
        "x-id-token": ABBOTT.utils.getSessionInfo()
      }
    };
    $('.nav-tabs a').click(function () {
      $(".accordion__header").each(function (index) {
        if (!$(this).hasClass('collapsed')) {
          $(this).addClass('collapsed');
          $('.accordion__body').removeClass('show');
        }
      })
      //code for expansion of accordion of Scan & Rewards tab
      if ($('#rewards-tab-content .accordion__header').hasClass('collapsed')) {
        $('#rewards-tab-content .accordion__header').removeClass('collapsed');
        $('#rewards-tab-content .accordion__body').addClass('show');
        $('#rewards-tab-content .accordion .minus').show();
        $('#rewards-tab-content .accordion .add').hide();
      }
    });
    $("#rewards-tab-content .accordion .minus").click(function() {
      $('#rewards-tab-content .accordion .minus').hide();
      $('#rewards-tab-content .accordion .add').show();
    });
    $("#rewards-tab-content .accordion .add").click(function() {
      $('#rewards-tab-content .accordion .add').hide();
      $('#rewards-tab-content .accordion .minus').show();
    });
    makeCall(ajaxConfig).then(results => {
      /** Display Camera Scan button for NonDO user only*/
      if (results.response) {
        const cameraIconDiv = $('#savings-camera-btn');
        let scanRewardsButtonLabel = $('#rewardsCameraBtnTxt').val();
        let scanRewardsButtonClass = 'rewardsCameraBtn';
        let scanRewardsFacingMode = `{exact : "environment"}`;
        let scanGtm = 'camera-scan|click|pwa_open-camera-scan-button_rewards-tab';
        const appendPwaScanner = <QRcodeScanner scanButtonLabel={scanRewardsButtonLabel} scanButtonClass={scanRewardsButtonClass} scanFacingMode={scanRewardsFacingMode} scanGtm={scanGtm}/>;
        const qrCodeContainer = $('<div>');
        ReactDOM.render(appendPwaScanner, qrCodeContainer[0]);
        cameraIconDiv.after(qrCodeContainer);
      }

      this.showHideRewards(results);
      $('#account-setting-single-opt-in').hide();
      $('#account-setting-phone').hide();
      $('#account-settings').hide();
      var phoneNumber = results.response?.contacts[0]?.number;
      if (phoneNumber) {
        this.setState({ phone: phoneNumber });
      }
      var optinSMS = results.response.optPreferences.filter(x => x.channel?.includes("SMS"));
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
      if (results.status && results.response.offerPreferenceInfo?.retailer == 'TBUNIVERSAL') {
        if (results.response.contacts?.length > 0) {
          if ((results.response.contacts[0].number != "") && (optinSMSObjStatus.toUpperCase()== 'PENDING' && (optinSMSDate > getLegacyOptStatusDate))) {
            //screen 2 - pending state
            $('#account-setting-single-opt-in').show();
            $('.cmp-container').removeClass('d-none');
            $('#account-settings').hide();
            $('#account-setting-phone').hide();
          }
          else if ((results.response.contacts[0].number != "") && (optinSMSObjStatus == 'OUT') ||
            (results.response.contacts[0].number != "") && (optinSMSDate < getLegacyOptStatusDate) ||
            (results.response.contacts[0].number != "") && (optinSMS.length < 1)
          ) {
            //screen 1 - enter phone number
            this.displayPhoneNumberInputScreen();
          }
          else if ((results.response.contacts[0].number != "") && (optinSMSObjStatus.toUpperCase() == 'IN' && (optinSMSDate > getLegacyOptStatusDate))) {
            //screen 3 - complete state
            $('#account-setting-single-opt-in').hide();
            $('#account-settings').hide();
            $('#account-setting-phone').show();
            $('.cmp-container').removeClass('d-none');
          }
        }
        else {
          //screen 1 - enter phone number
          this.displayPhoneNumberInputScreen();
        }
      }
      if (results.response.children) {
        results.response.children?.map(child => {
          if (child.activeChild && child?.accountNumber !== "" && typeof child?.accountNumber !== "undefined") {
            if (this.state.accountNumber == "") {
              this.setState({
                accountNumber: child.accountNumber
              });
            }
          }
        });
        if(this.state.accountNumber===''){
          $('#rewards-id').hide();
        }
        else{
          $('#rewards-id p').append(' ' + this.state.accountNumber);
        }
      }
    });
  };

  displayPhoneNumberInputScreen = () => {
    $('#account-setting-single-opt-in').hide();
    $('#account-settings').removeClass('d-none');
    $('#account-settings').show();
    $('#account-setting-phone').hide();
  }

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

  makeValidations = (
    validateArray = [],
    name = "",
    type = "text",
    values = {}
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

  onSubmitValues = async values => {
    const { actionPathToUpdateProfile } = this.props.data;
    let formData = {
      "userInfo": {
        "mobileNumber": values && values.phone ? values.phone.replace(/\D/g, '') : "",
      },
      "category": "profileInfo"
    };
    const loginToken = this.checkLogin();

    let _config = {
      headers: {
        "x-id-token": loginToken
      }
    };
    return await sendFormData(actionPathToUpdateProfile, formData, _config).then(success => {
      window.sessionStorage.setItem("isAccountTab", true);
      window.location.reload();
      return success;
    })
  };
  onSubmitOptOutValues = async values => {
    const { actionPathToUpdateProfile } = this.props.data;
    const loginToken = this.checkLogin();

    let _config = {
      headers: {
        "x-id-token": loginToken
      }
    };
    let formData = {
      "userInfo": {
        "mobileNumber": "O" + this.state.phone,
      },
      "category": "profileInfo"
    };
    return await sendFormData(actionPathToUpdateProfile, formData, _config).then(success => {
      window.sessionStorage.setItem("isAccountTab", true);
      window.location.reload();
      return success;
    })
  };

  checkBoxValidation = () => {
    if ($('#react-form-field-smsselect:checked').length > 0) {
      return true;
    }
    return false;
  }

  render() {
    const {
      profileInfo,
      actionPath,
      initialValues,
      fields,
      formName,
      formError
    } = this.state;
    return (
      <div>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          innerRef={this.formRef}
          onSubmit={async (values, actions) => {
            $('.similac-form .checkbox-container').removeClass('sms-notify');
            if (!this.checkBoxValidation()) {
              $('.similac-form .checkbox-container').addClass('sms-notify');
              return false;
            }
            if (!actions.isSubmitting) {
              return this.onSubmitValues(values)
                .then(result => {
                  const { errorCode, response, status } = result;
                  if (errorCode === 0 && status === true) {
                    this.getProfileInfo();
                  } else {
                    const { errorMessage = "Failed to submit" } =
                      getErrorMessage(result) || {};
                    actions.setSubmitting(false);
                    this.setState({ formError: errorMessage });
                  }

                  return result;
                })
                .catch(([jqXHR = {}]) => {

                  const { errorMessage = "Failed to submit" } =
                    getErrorMessage(jqXHR) || {};
                    actions.setSubmitting(false);
                    this.setState({ formError: errorMessage });
                });
            }
          }}
        >
          {({ values, errors, resetForm, setFieldValue }) => {
            return (
              <Form className="similac-form">
                {fields.map(
                  (
                    {
                      label,
                      name,
                      row,
                      validations,
                      className,
                      disabled,
                      spellCheck,
                      mappedField,
                      ...field
                    },
                    index
                  ) => {
                    let _disabled = disabled;
                    if (values[mappedField] && values) {

                      if (name === "other") {
                        if (values[mappedField].value === "Other") {
                          _disabled = false;
                        }
                        else {
                          _disabled = true;
                        }
                      }

                      if (values[mappedField].value != "Other" && values["other"] != "") {
                        setFieldValue("other", "");
                      }
                    }
                    if (field.type === "tel") {
                      return (
                        <Field
                          key={name + "tel" + field.type + index}
                          label={label}
                          name={name}
                          type={field.type}
                          maxLength={field.maxLength}
                          validate={this.makeValidations(
                            validations,
                            name,
                            field.type
                          )}
                          as={InputMasker}
                        />
                      );
                    } else if (field.type === "checkbox") {
                      return (
                        <Field
                          key={name + "checkbox" + label + index}
                          label={label}
                          name={name}
                          type={"checkbox"}
                          imagePath={field.imagePath}
                          fieldsType={field.fieldType}
                          validate={this.makeValidations(
                            validations,
                            name,
                            field.type
                          )}
                          as={Checkbox}
                        />
                      );
                    } else if (field.type === "htmltag") {
                      return (
                        <HtmlTag
                          key={label + field.tagName + index}
                          label={label}
                          className={field.btnClassName}
                          tagName={field.tagName}
                          id={field.id}
                          help={
                            (field.help && <Help data={field.help} />) || null
                          }
                        />
                      );
                    } else if (
                      field.type === "button" ||
                      field.type === "submit"
                    ) {
                      return (
                        <Button
                          key={field.type + index + name + index}
                          label={label}
                          className={field.btnClassName}
                          {...field}
                        />
                      );
                    } else if (field.type === "formError") {
                      return (
                        <FormError
                          key={field.type + index + name + index}
                          name={formName}
                          formError={formError}
                        />
                      );
                    }
                  }
                )}
                <Focus
                  formName={formName}
                  fields={fields}
                  formError={formError}
                />
              </Form>
            );
          }}
        </Formik>
      </div>
    );
  }
  showHideRewards = (results) => {
    let noOfScans = 0;
    let noOfBonusesEarned = 0;
    let activeChildNode = results.response?.children.findIndex(({ activeChild = true }) => activeChild);
    if (typeof activeChildNode !== undefined) {
      noOfScans = results.response?.children[activeChildNode]?.loyaltyScansSinceLastReward;
      noOfBonusesEarned = results.response?.children[activeChildNode]?.loyaltyScanBonusesEarned;
    }
    
    $('#zero-scan').hide();
    $('#one-scan').hide();
    $('#two-scans').hide();
    $('#three-scans').hide();
    $('#four-scans').hide();
    $('#five-scans').hide();

    if (noOfScans === 5 || noOfBonusesEarned === 2) {
       $('#five-scans').show();
       $('.cmp-container').removeClass('d-none');
    } else if (noOfScans === 0 || noOfScans === undefined) {
      $('#zero-scan').show();
      $('.cmp-container').removeClass('d-none');
    } else if (noOfScans === 1) {
      $('#one-scan').show();
      $('.cmp-container').removeClass('d-none');
    } else if (noOfScans === 2) {
      $('#two-scans').show();
      $('.cmp-container').removeClass('d-none');
    } else if (noOfScans === 3) {
      $('#three-scans').show();
      $('.cmp-container').removeClass('d-none');
    } else if (noOfScans === 4) {
      $('#four-scans').show();
      $('.cmp-container').removeClass('d-none');
    } else {
      $('#zero-scan').show();
      $('.cmp-container').removeClass('d-none');
    }
    if (noOfBonusesEarned < 2) {
      let rewardScanLimit = $('#rewardsScanLimit').val();
      if (noOfBonusesEarned === 1 && noOfScans === 0) { 
        $("<div>").addClass("ribbonPWA").html($('#ribbonTxt3').val()).insertBefore( "#rewards-txt" );
        if($('#rewards-tab-content .ribbonPWA').length > 0){$('#rewards-txt p').css({'padding-top':'55px'})}
      } else if (noOfScans >= 1 && noOfScans < rewardScanLimit) {
        $("<div>").addClass("ribbonPWA").html($('#ribbonTxt1').val() + " " + (rewardScanLimit - noOfScans) + " " + $('#ribbonTxt2').val()).insertBefore( "#rewards-txt" );
        if($('#rewards-tab-content .ribbonPWA').length > 0){$('#rewards-txt p').css({'padding-top':'55px'})}
      }
    }
  }
}

export default AccountSettings;