import React from 'react';
import { Formik, Form, Field } from "formik";

import validations from "../common/validations";
import InputMasker from "../components/InputMasker";
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";

export default class SelectedNotifications extends React.Component {

    constructor(props) {
        super(props);
    }
    /**
    * Method to check the formink validations error
    * @param {*} prom 
    * @param {*} errorMessage 
    */
    checkError = (prom, errorMessage) => {
        if (prom instanceof Promise) {
            return prom.then((result) => {
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
     * Method to validate the formink values
     * @param {*} validateArray 
     * @param {*} name 
     * @param {*} values 
     * @param {*} type 
     */
    makeValidations = (validateArray = [], name = "", values, type = "text") => (value) => {
        let _type = type === "textbox" || typeof type === "undefined" ? "text" : type;
        for (var item in validateArray) {
            const { errorType, errorMessage, ...otherErrorData } = validateArray[item];
            const validationMess =
                validations[errorType] && validations[errorType](value, _type, otherErrorData, values);
            if (validationMess) {
                return this.checkError(
                    validationMess,
                    errorMessage
                );
            }
        }
    };
    /**
     * Method called on selection update link in notification section.
     * Shows the edit mode for notification 
     */
    updatePreferences = () => {
        this.setState({
            showPreferences: true
        });
    };

    /**
     * Method called on updated preference is submitted
     * @param {object} values 
     */
    onPreferenceSubmit = async (values) => {
        let actionPath = this.aemData.actionPath;
        let channel = values.sms ? "sms" : "email";
        let formData = {
            "offerInfo": {
                "retailer": this.state.profileInfo.offerInfo.offerRetailer,
                "enableDigital": true,
                "channel": channel,
                "offerCode": this.state.profileInfo.offerInfo.offerCode
            },
            "category": "digitalOffer"
        };

        if (channel === "sms") {
            formData.contacts = [
                {
                    "type": "M",
                    "code": values.code,
                    "number": String(values.phone).replace(/\D/g, '')
                }
            ];
        }

        return await sendFormData(actionPath, formData).then(success => {
            this.setState({
                showPreferences: false
            });
            this.getProfileInfo();
            return success;
        }, (fail) => console.log(fail))
    };

    /**
    * Method called on cancel preference update
    */
    cancel = () => {
        this.setState({
            showPreferences: false
        });
    };

    render() {
        return (
            <>
                {/* selected notification */}

                <p className="profile__sub-title">{notificationPreferences.title}</p>
                <p className="font-roboto-reg text-smalt">
                    {notificationPreferences.subTitle}
                </p>
                {!showPreferences && <a className="font-brandon-bold text-tangerine"
                    onClick={this.updatePreferences}>{this.aemData.updateLabel}</a>}
                <div className="d-flex text-smalt my-3">
                    <div className="font-roboto-reg">
                        <p className="mb-0">{notificationPreferences.emailLabel}</p>
                        {!showPreferences && <p className="mb-0">{notificationPreferences.smsLabel}</p>}
                    </div>
                    <div className="font-roboto-bold mx-4">
                        <p className="mb-0">{offerInfo.channel === "email" ?
                            notificationPreferences.yesLabel : notificationPreferences.noLabel}</p>
                        {!showPreferences && <p className="mb-0">{offerInfo.channel === "sms" ?
                            notificationPreferences.yesLabel : notificationPreferences.noLabel}</p>}
                    </div>
                </div>
                {showPreferences &&
                    <div className="row ">
                        <div className="col-12 col-md-10">
                            <Formik
                                initialValues={{
                                    sms: offerInfo.channel === "sms" ? true : false,
                                    phone: ((contacts && contacts[0].number) ? contacts[0].number : "")
                                }}
                                enableReinitialize={true}
                                onSubmit={(values, actions) => {
                                    if (!actions.isSubmitting) {
                                        return this.onPreferenceSubmit(values, "sms").then((result) => {
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
                                            {notificationPreferences.phoneNumber.fields.map(({ label, name, validations, ...field }, index) => {
                                                if (field.type === "tel") {
                                                    return (
                                                        <>
                                                            <Field
                                                                key={name + "tel" + field.type + index}
                                                                label={label}
                                                                name={name}
                                                                type={field.type}
                                                                validate={this.makeValidations(
                                                                    validations,
                                                                    name,
                                                                    field.type,
                                                                    values
                                                                )}
                                                                as={InputMasker}
                                                            />
                                                        </>
                                                    );
                                                } else if (field.type === "checkbox") {
                                                    return (
                                                        <Field
                                                            key={name + "checkbox" + label + index}
                                                            label={label}
                                                            name={name}
                                                            type={"checkbox"}
                                                            validate={this.makeValidations(
                                                                validations,
                                                                name, values,
                                                                field.type
                                                            )}
                                                            as={Checkbox}
                                                        />
                                                    );
                                                } else if (field.type === "hidden") {
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
                                                }

                                                else if (
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
                                                } else if (field.type === "cancel") {
                                                    return (
                                                        <Button
                                                            key={field.type + index + name + index}
                                                            label={label}
                                                            className={field.btnClassName}
                                                            parentContext={this.cancel}
                                                            {...field}
                                                        />
                                                    );
                                                }

                                            })}
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </div>
                    </div>
                }
            </>
        );
    }
}