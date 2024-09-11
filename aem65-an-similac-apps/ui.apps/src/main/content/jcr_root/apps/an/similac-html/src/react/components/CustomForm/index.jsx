import React from "react";
import { Formik, Form, Field } from "formik";
import moment from 'moment';
import { SvgIcon } from "../../common/common";
import InputField from "../InputField";
import InputMasker from "../InputMasker";
import PasswordStrength from "../PasswordStrength";
import Button from "../Button";
import CalendarSet from "../CalendarSet";
import Checkbox from "../Checkbox";
import Radio from "../Radio";
import Dropdown from "../DropdownSet";
import { parseDateDDMMYYYY } from "../../common/validations";
import HtmlTag from "../../components/HtmlTag";
const CustomForm = (props) => {
    return (
        <>
            <Formik
                initialValues={props.initialValues}
                enableReinitialize={true}
                onSubmit={(values, actions) => {
                    if (!actions.isSubmitting) {
                        if(values.birthDate){
                            let birthDate = moment(values.birthDate);
                            let currentDate = moment();
                            if(birthDate > currentDate){
                                values.premature = false;
                                values.weeksEarly = "";
                            }
                        }
                        return props.onSubmitValues(values).then((result) => {
                            return result;
                        }).catch(data => {
                            console.log(data);
                        });
                    }
                }}
            >
                {(validatorObj) => {
                    const {
                        values, errors, touched, handleChange, handleBlur,
                        handleSubmit, isSubmitting } = validatorObj;
                    return (
                        <Form className="similac-form">
                            {props.fields.map(({ label, name, validations, renderOn, ...field }, index) => {
                                const { fieldName = "", value = "", fieldMapped = "" } = (renderOn || {});
                                if (fieldName && values) {
                                    let otherField = values[fieldName];
                                    otherField = typeof (otherField) === "boolean" ? Boolean(otherField).toString() : otherField;
                                    let valueField = typeof (value) === "boolean" ? Boolean(value).toString() : value;

                                    if (otherField !== valueField)
                                        return null;
                                }
                                if (fieldMapped && values) {
                                    const dateValue = values[fieldMapped];
                                    const parsedDate = dateValue && parseDateDDMMYYYY(dateValue);
                                    const dateScenario = parsedDate && (new Date() <= parsedDate) ? true : false;
                                    if (dateScenario || !parsedDate) {
                                      return null;
                                    }
                                  }
                                if (field.type === "textbox") {
                                    return (
                                        <Field
                                            key={name + "textbox" + field.type + index}
                                            label={label}
                                            name={name}
                                            maxLength={field.maxLength}
                                            type={(field.type === "textbox" && "text") || field.type}
                                            validate={props.makeValidations(
                                                validations, name, values, field.type)}
                                            as={InputField}
                                        />
                                    );
                                }
                                else if (field.type === "passwordstrength") {
                                    return (
                                        <Field
                                            key={name + "textbox" + field.type + index}
                                            label={label}
                                            name={name}
                                            isShowPass={field.isShowPass}
                                            type={(() => field.isShowPass ? "text" : "password")()}
                                            icon={<SvgIcon icon={field.isShowPass ? "show" : "hide"} onClick={() => props.showToggle(name)} />}
                                            fieldId="showpasswordField"
                                            iconClickable={true}
                                            maxLength={field.maxLength}
                                            validate={props.makeValidations(
                                                validations,
                                                name,
                                                values,
                                                field.type
                                            )}
                                            passwordStrength = {field.passwordStrength}
                                            as={PasswordStrength}
                                        />
                                    );
                                } else if (field.type === "password") {
                                    return (
                                        <Field
                                            key={name + "textbox" + field.type + index}
                                            label={label}
                                            name={name}
                                            isShowPass={field.isShowPass}
                                            type={(() => field.isShowPass ? "text" : "password")()}
                                            icon={<SvgIcon icon={field.isShowPass ? "show" : "hide"} onClick={() => props.showToggle(name)} />}
                                            fieldId="showpasswordField"
                                            iconClickable={true}
                                            maxLength={field.maxLength}
                                            validate={props.makeValidations(
                                                validations,
                                                name,
                                                values,
                                                field.type
                                            )}
                                            as={InputField}
                                        />
                                    );
                                } else if (field.type === "tel") {
			                      return (
			                        <Field
			                          key={name + "tel" + field.type + index}
			                          label={label}
			                          name={name}
			                          type={field.type}
			                          maxLength={field.maxLength}
			                          validate={props.makeValidations(
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
                                            validate={props.makeValidations(
                                                validations,
                                                name, values,
                                                field.type
                                            )}
                                            as={Checkbox}
                                        />
                                    );
                                } else if (field.type === "calender") {
                                    return (
                                        <Field
                                            key={"calander" + name + index}
                                            label={label}
                                            name={name}
                                            validate={props.makeValidations(
                                                validations,
                                                name, values,
                                                field.type
                                            )}
                                            as={CalendarSet}
                                        />
                                    );
                                } else if (field.type === "radio") {
                                    return (
                                        <Field
                                            key={"radio" + name + index}
                                            label={label}
                                            name={name}
                                            sourceValue={field.sourceValue}
                                            fieldsType={field.fieldType}
                                            validate={props.makeValidations(
                                                validations,
                                                name, values,
                                                field.type
                                            )}
                                            as={Radio}
                                        />
                                    );
                                } else if (field.type === "dropdown") {

                                    return (
                                        <Field
                                            key={"dropdown" + name + index}
                                            label={label}
                                            name={name}
                                            placeholder={field.placeholder}
                                            options={field.sourceValue}
                                            validate={props.makeValidations(
                                                validations,
                                                name, values,
                                                field.type
                                            )}
                                            fetchApi={field.fetchApi}
                                            displayLabelFormat={field.displayLabelFormat}
                                            valueFormat={field.valueFormat}
                                            isSearchable={false}
                                            as={Dropdown}
                                        />
                                    );
                                } else if (field.type === "htmltag") {
                                    return (
                                      <HtmlTag
                                        key={label + field.tagName + index}
                                        label={label}
                                        className={field.className}
                                        tagName={field.tagName}
                                        help={
                                          (field.help && <Help data={field.help} />) || null
                                        }
                                      />
                                    );
                                  }else if (field.type === "hidden") {
                                    return (
                                        <Field
                                            key={name + "textbox" + field.type + index}
                                            type={"text"}
                                            style={{ display: "none" }}
                                            name={name}
                                            value={field.value}
                                            as={"input"}
                                        />
                                    )
                                } else if (
                                    field.type === "button" ||
                                    field.type === "submit"
                                ) {
                                    return (
                                        <Button
                                            key={field.type + index + name + index}
                                            label={label}
											id={field.id}
                                            className={field.btnClassName}
                                            {...field}
                                        />
                                    );
                                }
                                else if (field.type === "cancel") {
                                    return (
                                        <Button
                                            key={field.type + index + name + index}
                                            label={label}
                                            className={field.btnClassName}
                                            parentContext={props.cancel}
                                            {...field}
                                        />
                                    );
                                }
                            })}
                        </Form>
                    );
                }}
            </Formik>
        </>
    );
};
export default CustomForm;