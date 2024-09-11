import React from "react";
import moment from 'moment';

import { SvgIcon } from "../../common/common";
import CustomForm from "../CustomForm";
import { parseDateDDMMYYYY } from "../../common/validations";

const MyChild = (props) => {
    const { aemData, state } = props;
    const visibleChildren = state.profileInfo.children?.filter(child => {
        return child.deleted === false;
    });
    const showValidItems = (field, child) =>{
        let mappedfield = field.renderOn?.fieldMapped;
        let fieldName = child[field.name];
        let renderOn = field.renderOn ? child[field.renderOn.fieldName] === field.renderOn.value : true;
        let renderPremature = true;
        if (mappedfield) {
            let dateValue = child[mappedfield];
            if(dateValue){
            const parsedDate = parseDateDDMMYYYY(dateValue);
            const dateScenario =  (new Date() <= parsedDate) ? true : false;
            renderPremature =  dateScenario ? false: true;
            }
          }
        return  renderPremature && renderOn && fieldName !== "" && fieldName !== undefined; 
    }

    const validateBabyDays = (babyBirthDate) =>{
        const parsedDate = parseDateDDMMYYYY(babyBirthDate);  
      if(babyBirthDate && parsedDate != null){
          let dateDiff  = new Date() - parsedDate;
          let totalDays = Math.ceil(dateDiff/(1000 * 60 * 60 * 24)); 
          if(totalDays > 90){
              return true;
          } 
      }  
      return false;
    }
    return (
        <>
            <div>
                <p className="profile__sub-title">
                    {aemData.myBaby.formTitle}
                </p>
                <p className="personal-info__item-value">
                    {aemData.myBaby.subTitle}
                </p>
                {/* Add child link */}
                {visibleChildren.length < 9 && <div className="personal-info__add" onClick={props.addMyBaby}>
                    <div className="personal-info__add-icon">
                        <SvgIcon icon={"add-border"} />
                    </div>
                    <div className="personal-info__add-link">{aemData.myBaby.addBaby}</div>
                </div>
                }
                {/* add child form  */}
                {state.isAddMyBaby &&
                    <div className="personal-info__form">
                        <p className="personal-info__form-required profile__border-grey">*Required</p>
                        {state.message.text !== "" && <div className={state.message.class}>{state.message.text}</div>}
                        <CustomForm initialValues={state.initialValues} onSubmitValues={props.onSubmitValues}
                            fields={state.fields} makeValidations={props.makeValidations} cancel={props.cancelEditMyBaby} />
                    </div>
                }
                {/* Children info in view mode  */}
                {state.profileInfo.children && state.profileInfo.children.map((child, index) => (
                    <>
                        {!child.isVisible && !child.deleted &&
                            <div className="personal-info__child" key={"personal-info__child" + index}>
                                {/* Edit & remove child links  */}
                                <div className="personal-info__edit profile__border-grey">
                                { (validateBabyDays(child.birthDate) === false ) && <div className="personal-info__edit-link"
                                        onClick={() => props.editMyBaby(index)}>
                                        {aemData.myBaby.editBaby}
                                    </div>
                                }
                                    {(visibleChildren.length !== 1) &&
                                        <div className="personal-info__edit-link"
                                            onClick={() => props.removeMyBaby(index)}>
                                            {aemData.myBaby.removeBaby}
                                        </div>
                                    }
                                </div>
                                {/* view mode child details */}
                                {aemData.myBaby.fields.map((field, fieldindex) => {
                                    if (field.type !== "submit" && field.type !== "cancel") {
                                        const { sourceValue = [] } = field;
                                        const valueDisplay = sourceValue && sourceValue.find(ele => String(ele.value).toLowerCase() === String(child[field.name]).toLowerCase());
                                        return <div className="personal-info__item" key={'personal-info__item' + fieldindex}>
                                            {showValidItems(field, child) &&
                                                <>
                                                    <p className="personal-info__item-name">
                                                        {field.type !== "hidden" && field.label && field.label.replace(/[^A-Z\s']+/gi, '')}
                                                    </p>
                                                    {((field.fieldType === "boolean" || field.type === "checkbox" || field.type === "dropdown") && (field.type !== "hidden")) ?
                                                        <p className="personal-info__item-value">
                                                            {
                                                                valueDisplay ? valueDisplay.label : ""
                                                            }
                                                        </p>
                                                        :
                                                        <p className="personal-info__item-value">
                                                            {
                                                                field.type === "calender" ? moment(child[field.name]).format('MMMM DD, YYYY') : child[field.name]
                                                            }
                                                        </p>
                                                    }
                                                </>
                                            }
                                        </div>
                                    }
                                    return;
                                })
                                }
                            </div>
                        }
                        {/* Edit mode child details */}
                        {(state.isEditMyBaby && child.isVisible) &&
                            <div className="personal-info__form">
                                <p className="personal-info__form-required profile__border-grey">
                                    *Required</p>
                                {state.message.text !== "" && <div className={state.message.class}>{state.message.text}</div>}
                                <CustomForm initialValues={state.initialValues} onSubmitValues={(values) => props.onSubmitValues(values, index)}
                                    fields={state.fields} makeValidations={props.makeValidations} cancel={props.cancelEditMyBaby} />
                            </div>
                        }

                    </>
                ))}

            </div>
        </>
    );
};
export default MyChild;