import React from "react"; 
import CustomForm from "../CustomForm";

const MyInfo = (props) => { 
    let { aemData, state } = props
    
    if(state.profileInfo.userInfo && state.profileInfo.userInfo.contactEmail == undefined){
        aemData.myInfo.fields.forEach((element,index) => {
            if(element.name === "contactEmail"|| element.name === "removeemail" || element.name === "secondaryemailNote"){
                aemData.myInfo.fields.splice(index,1);
            }
        }); 
    } 
    return (
        <>
            <div>
                <p className="profile__sub-title">{aemData.myInfo.formTitle}</p>

                {(state.isEditMyInfo || state.isChangePassword) &&                    
                    <p className="personal-info__form-required" dangerouslySetInnerHTML={{__html:aemData.password.requiredLabel}} />                    
                }
                {/* Edit & change password links */}
                {(!state.isEditMyInfo && !state.isChangePassword) &&
                    <div className="personal-info__edit">
                        <div className="personal-info__edit-link" onClick={props.editMyInfo}>
                            {aemData.myInfo.editMyInfo}</div>
                        <div className="personal-info__edit-link" onClick={props.changePassword}>
                            {aemData.password.changePwd}</div>
                    </div>
                }
                {/* my info view mode */}
                {(!state.isChangePassword) &&
                    <>
                        {/* Strong moms ID */}
                        <div className="personal-info__item">
                            <p className="personal-info__item-name">
                                {state.accountNumber !== "" && aemData.myInfo.strongMomID}
                            </p>
                            <p className="personal-info__item-value">
                                {state.accountNumber}
                            </p>
                        </div>
                        {/* user email Id */}
                        <div className="personal-info__item">
                            <p className="personal-info__item-name">
                                {aemData.myInfo.emailAddress}</p>
                            <p className="personal-info__item-value mb-0">
                                {state.profileInfo.userInfo?.userName}</p>
                            <p className="personal-info__item-note" dangerouslySetInnerHTML={{__html:aemData.myInfo.emailNote}} />
                        </div>
                    </>
                }

                {(!state.isEditMyInfo && !state.isChangePassword) &&
                    <>
                        {aemData.myInfo.fields.map((field, index) => {
                            if (field.type !== "submit" && field.type !== "cancel" && field.type !== "htmltag" && field.name !== "removeemail")
                                return <div className="personal-info__item" key={index}>
                                    <p className="personal-info__item-name">
                                        {field.label && field.label.replace(/[^A-Z\s]+/gi, '')}
                                    </p>
                                    <p className="personal-info__item-value">
                                        {state.profileInfo.userInfo ? state.profileInfo.userInfo[field.name] : ""}
                                    </p>
                                </div>
                            return;
                        })}
                        <div className="personal-info__item">
                            <p className="personal-info__item-name">
                                {aemData.password.label}
                            </p>
                            <p className="personal-info__item-value">
                                {aemData.password.placeholder}
                            </p>
                        </div>
                    </>
                }
                {/* My info and password edit mode */}
                {(state.isEditMyInfo || state.isChangePassword) &&
                    <div className="personal-info__form">
                       {state.message.text !== "" && <div className={state.message.class}>{state.message.text}</div>}
                        <CustomForm initialValues={state.initialValues} onSubmitValues={props.onSubmitValues}
                            showToggle={props.showToggle} fields={state.fields} makeValidations={props.makeValidations}
                            cancel={props.cancelEditMyInfo} />
                    </div>
                }
            </div>
        </>
    );
};
export default MyInfo;