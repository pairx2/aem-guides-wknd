// import React from 'react';

// import { Formik, Form, Field } from "formik";

// import validations from "../common/validations";
// import InputMasker from "../components/InputMasker";
// import InputField from "../components/InputField";
// import Button from "../components/Button";
// import { getLocalStorage } from "../common/localStorageState";

// export default class NotificationPreferences extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//     /**
//          * Method to check the formink validations error
//          * @param {*} prom 
//          * @param {*} errorMessage 
//          */
//     checkError = (prom, errorMessage) => {
//         if (prom instanceof Promise) {
//             return prom.then((result) => {
//                 if (typeof result === "boolean" && result === true) {
//                     return errorMessage;
//                 } else if (typeof result === "string") {
//                     return result;
//                 }
//                 return undefined;
//             });
//         } else if (prom) {
//             return errorMessage;
//         }
//         return undefined;
//     };

//     /**
//      * Method to validate the formink values
//      * @param {*} validateArray 
//      * @param {*} name 
//      * @param {*} values 
//      * @param {*} type 
//      */
//     makeValidations = (validateArray = [], name = "", values, type = "text") => (value) => {
//         let _type = type === "textbox" || typeof type === "undefined" ? "text" : type;
//         for (var item in validateArray) {
//             const { errorType, errorMessage, ...otherErrorData } = validateArray[item];
//             const validationMess =
//                 validations[errorType] && validations[errorType](value, _type, otherErrorData, values);
//             if (validationMess) {
//                 return this.checkError(
//                     validationMess,
//                     errorMessage
//                 );
//             }
//         }
//     };


//     /**
//      * Method on notfication preferences submit 
//      * @param {object} values 
//      * @param {string} channel 
//      */
//     onPreferenceSubmit = async (values, channel) => {
//         let actionPath = this.aemData.actionPath;

//         let formData = {
//             "offerInfo": {
//                 "retailer": this.state.retailer,
//                 "enableDigital": true,
//                 "channel": channel
//             },
//             "category": "digitalOffer"
//         };

//         let offerCode = sessionStorage.getItem("offerCode");

//         if (offerCode && offerCode !== "") {
//             formData.offerInfo.offerCode = offerCode;
//         }

//         if (channel === "sms") {
//             formData.contacts = [
//                 {
//                     "type": "M",
//                     "code": values.code,
//                     "number": String(values.phone).replace(/\D/g, '')
//                 }
//             ];
//         }

//         console.log(formData);

//         return await sendFormData(actionPath, formData).then(success => {
//             console.log(success);
//             window.location.href = this.aemData.myOfferPageUrl + (offerCode && offerCode !== "") ? "#thanksDigital" : "";
//             return success;
//         }, (fail) => console.log(fail));
//     };

//     render() {
//         const { email } = (getLocalStorage("profile") || { email: "sample@gtext.com" });
//         return (
//             <>
//                 {showPreference && <>
//                     <h2 className="font-brandon-bold text-smalt"> {notificationPreferences.title}</h2>
//                     <div className="notification-preferences mx-auto">

//                         <p className="font-roboto-reg text-smalt">
//                             {notificationPreferences.subTitle} </p>

//                         <p className="font-roboto-bold text-smalt">
//                             {notificationPreferences.phoneNumber.title}
//                         </p>
//                         <Formik
//                             initialValues={{ phone: "" }}
//                             enableReinitialize={true}
//                             onSubmit={(values, actions) => {
//                                 if (!actions.isSubmitting) {
//                                     return this.onPreferenceSubmit(values, "sms").then((result) => {
//                                         console.log(result);
//                                         return result;
//                                     }).catch(data => {
//                                         console.log(data);
//                                     });

//                                 }
//                             }}
//                         >
//                             {(validatorObj) => {
//                                 const {
//                                     values, errors, touched, handleChange, handleBlur,
//                                     handleSubmit, isSubmitting } = validatorObj;
//                                 return (
//                                     <Form className="similac-form">
//                                         {notificationPreferences.phoneNumber.fields.map(({ label, name, validations, ...field }, index) => {
//                                             if (field.type === "tel") {
//                                                 return (
//                                                     <>
//                                                         <Field
//                                                             key={name + "tel" + field.type + index}
//                                                             label={label}
//                                                             name={name}
//                                                             type={field.type}
//                                                             validate={this.makeValidations(
//                                                                 validations,
//                                                                 name,
//                                                                 field.type,
//                                                                 values
//                                                             )}
//                                                             as={InputMasker}
//                                                         />
//                                                         <p className="col-12 footnote font-roboto-reg text-grey">{notificationPreferences.phoneNumber.footNote}</p>
//                                                     </>
//                                                 );
//                                             } else if (field.type === "hidden") {
//                                                 return (
//                                                     <Field
//                                                         key={name + "textbox" + field.type + index}
//                                                         type={"text"}
//                                                         style={{ display: "none" }}
//                                                         name={name}
//                                                         value={field.value}
//                                                         as={"input"}
//                                                     />
//                                                 )
//                                             }

//                                             else if (
//                                                 field.type === "button" ||
//                                                 field.type === "submit"
//                                             ) {
//                                                 return (
//                                                     <Button
//                                                         key={field.type + index + name + index}
//                                                         label={label}
//                                                         className={field.btnClassName}
//                                                         {...field}
//                                                     />
//                                                 );
//                                             }

//                                         })}
//                                     </Form>
//                                 );
//                             }}
//                         </Formik>


//                         <div className="divider"><span>or</span></div>

//                         <p className="font-roboto-bold text-smalt">
//                             {notificationPreferences.Email.title}
//                         </p>
//                         <Formik
//                             initialValues={{ email: email }}
//                             enableReinitialize={true}
//                             onSubmit={(values, actions) => {
//                                 if (!actions.isSubmitting) {
//                                     return this.onPreferenceSubmit(values, "email").then((result) => {
//                                         console.log(result);
//                                         return result;
//                                     }).catch(data => {
//                                         console.log(data);
//                                     });

//                                 }
//                             }}
//                         >
//                             {(validatorObj) => {
//                                 const {
//                                     values, errors, touched, handleChange, handleBlur,
//                                     handleSubmit, isSubmitting } = validatorObj;
//                                 return (
//                                     <Form className="similac-form">
//                                         {notificationPreferences.Email.fields.map(({ label, name, validations, disabled, ...field }, index) => {
//                                             if (field.type === "textbox") {
//                                                 return (
//                                                     <>
//                                                         <Field
//                                                             key={name + "textbox" + field.type + index}
//                                                             label={label}
//                                                             name={name}
//                                                             type={
//                                                                 (field.type === "textbox" && "text") || field.type
//                                                             }
//                                                             disabled={disabled}
//                                                             as={InputField}
//                                                         />
//                                                         <p className="col-12 footnote font-roboto-reg text-grey">{notificationPreferences.Email.footNote}</p>
//                                                     </>
//                                                 );
//                                             }
//                                             else if (
//                                                 field.type === "button" ||
//                                                 field.type === "submit"
//                                             ) {
//                                                 return (
//                                                     <Button
//                                                         key={field.type + index + name + index}
//                                                         label={label}
//                                                         className={field.btnClassName}
//                                                         {...field}
//                                                     />
//                                                 );
//                                             }

//                                         })}
//                                     </Form>
//                                 );
//                             }}
//                         </Formik>
//                     </div>
//                 </>
//                 }
//             </>);
//     }
// }