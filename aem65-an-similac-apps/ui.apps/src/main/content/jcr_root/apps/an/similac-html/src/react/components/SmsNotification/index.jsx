import React from "react";
import CustomForm from "../CustomForm";

const PhoneNumber = (props) => {
    let { aemData, state } = props;
    let smsEnablingTxt = state.smsAlert ? aemData.smsNotification.enablingSmsNotificationsTxtRed+' '+aemData.smsNotification.enablingSmsNotificationsTxt : aemData.smsNotification.enablingSmsNotificationsTxt;
    const formatPhoneNumber = (phoneNumberString) => {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
        if (match) {
            var intlCode = (match[1] ? '+1 ' : '')
            return [intlCode, '', match[2], '-', match[3], '-', match[4]].join('')
        }
        return null
    }
    return (
        <>
            <div className="personal-info__sms-section">
                <p className="profile__sub-title">{aemData.smsNotification.formTitle}</p>
                <h5 class="section-title">{state.smsServiceOpt ? aemData.smsNotification.getTextAlert:aemData.smsNotification.notificationSetting}</h5>
                {(state.smsServiceOpt) && <p class="new-sms" dangerouslySetInnerHTML={{__html:aemData.smsNotification.neverMiss}} />}
                {(state.smsStatus.toUpperCase() == "PENDING") && 
                <>
                <h5 class="enabling-sms">{aemData.smsNotification.enablingSmsNotificationsTxtGreen}</h5>
                <p dangerouslySetInnerHTML={{__html:smsEnablingTxt}} />
                {(state.smsAlert) &&
                    <div class="personal-info__form">
                    <button class="btn btn-primary col-12 col-md-5 col-lg-4 resend-btn" disabled={state.btnDisabled} onClick={props.onSubmitResend}>{aemData.smsNotification.resendSMSText}</button>
                    </div>
                }
                </>
                }
                {/* Text for OPT IN*/}
                {(state.smsStatus.toUpperCase() == "IN") && 
                    <h5 className="enabled-sms" dangerouslySetInnerHTML={{__html:aemData.smsNotification.enabledSmsNotificationsTxt}} />
                }
                {/* Text for OPT OUT*/}
                 {(state.smsStatus.toUpperCase() == "OUT") && 
                    <p class="sms-optout">{aemData.smsNotification.smsNotificaionOptOut}
                    <span>{aemData.smsNotification.optBackClick} <a class="sms-optback" onClick={props.editPhoneNumber}> {aemData.smsNotification.optBackClickTxt}</a><br></br>{aemData.smsNotification.optBackInTxt}</span>
                    </p>
                }
                {(!state.isSMSNotification && !state.smsServiceOpt) &&
                    <>
                    {/* Phone Number Section view mode */}
                    {(state.smsStatus.toUpperCase() == "PENDING" || state.smsStatus.toUpperCase() == "IN") && 
                    <div className="personal-info__item phone__view">
                            <p className="personal-info__item-name">
                                {state.profileInfo.contacts.length > 0 ? aemData.smsNotification.fields[0].label : ""}
                            </p>
                            <p className="personal-info__item-value">
                                {state.profileInfo.contacts.length > 0 ? formatPhoneNumber(props.state.profileInfo.contacts[0].number) : ""}
                            </p>
                        </div>
                        }
                        <div className="sms__edit">
                            {(state.smsStatus.toUpperCase() == "PENDING") && 
                            <button type="button" class="btn btn btn-secondary col-12 col-md-7 col-lg-4" onClick={props.editPhoneNumber}>{aemData.smsNotification.editPhoneNumberLabel}</button>
                            }
                            
                            {(state.smsStatus.toUpperCase() == "IN") &&
                            <button type="button" class="btn btn btn-secondary col-12 col-md-7 col-lg-4" onClick={props.editPhoneNumber}>{aemData.smsNotification.editPhoneNumberLabelOptOut}</button>
                            }   
                        </div>
                        
                    </>
                }

                {/* Phone Number Section edit mode */}
                {(state.smsServiceOpt || state.isSMSNotification) &&
                    <div className={"personal-info__form personal-info__sms-edit-view " + (state.smsStatus.toUpperCase() == "IN" ? "personal-info__smsIn " : "personal-info__smsPending ") + (state.smsServiceOpt ? " new-sms-form" : "")}>
                        {state.message.text !== "" && <div className={state.message.class}>{state.message.text}</div>}
                        <CustomForm initialValues={state.initialValues} onSubmitValues={props.onSubmitValues}
                            showToggle={props.showToggle} fields={state.smsServiceOpt ? props.editPhoneField :state.fields} makeValidations={props.makeValidations}
                            cancel={props.cancelEditOfPhoneNumber} />
                    </div>
                }
            </div>
        </>
    );
};
export default PhoneNumber;