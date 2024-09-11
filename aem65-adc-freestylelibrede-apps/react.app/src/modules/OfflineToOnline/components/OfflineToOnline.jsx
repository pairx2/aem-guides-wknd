import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LastNameField from '../../Form/components/FormFields/LastNameField';
import AccountInfoForm from '../../Authentication/components/Registration/AccountInfoForm';
import IdentificationForm from './IdentificationForm';
import { i18nLabels } from '../../../utils/translationUtils';
import I18n from '../../Translation/components/I18n';
import { validateOfflineCustomerRequest } from '../redux/actions/validate_offline_customer.action';
import { registerOfflineCustomerRequest } from '../redux/actions/register_offline_customer.action';
import LoadingIndicator from '../../Generic/components/Loading/LoadingIndicator';
import { connect } from 'react-redux';
import { OfflineToOnlineIdentificationFormSuccess, OfflineToOnlineIdentificationFormError, OfflineToOnlineRegistrationFormSuccess, OfflineToOnlineRegistrationFormError } from '../../../utils/adobeAnalyticsUtils';

const mapStateToProps = state => {
    const { validateOfflineCustomerResponse } = state.offlineToOnlineModuleReducer.offlineToOnlineReducer;
   const {registerOfflineCustomerResponse, isLoading, error} = state.offlineToOnlineModuleReducer.registerOfflineCustomerReducer;
   const {values: accountInfoFormValues} = state.form.accountInfoForm || {};
    return { accountInfoFormValues, validateOfflineCustomerResponse, isLoading, error, registerOfflineCustomerResponse };
};

const mapDispatchToProps = {
    validateOfflineCustomerRequest,
    registerOfflineCustomerRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(class OfflineToOnline extends Component {

    static propTypes = {
        registrationHeading: PropTypes.string,
        registrationSubheading: PropTypes.string,
        registrationSubheadingDescription: PropTypes.string,
        offlineRegistrationSuccessHeading: PropTypes.string,
        offlineRegistrationSuccessSubheading: PropTypes.string,
        informationText: PropTypes.string,
        customerNumberRegex: PropTypes.string,
        kvnrRegex: PropTypes.string,
        enableCaptcha: PropTypes.bool,
        validateOfflineCustomerRequest: PropTypes.func,
        validateOfflineCustomerResponse: PropTypes.object,
        isLoading: PropTypes.bool,
        error: PropTypes.object,
        accountHeading: PropTypes.string,
        accountSubheading: PropTypes.string,
        registerOfflineCustomerRequest: PropTypes.func,
        registerOfflineCustomerResponse: PropTypes.object,
        accountInfoFormValues: PropTypes.object,
        privacyPolicy: PropTypes.string,
        termsAndConditions: PropTypes.string,
        trainingLink: PropTypes.string
    };

   state = {
        formFields: [
            {
                component: LastNameField
            }
        ],
        currentStep: 1,
        grecaptchaResponse: "",
        isLoadingState: false,
        ValidatedData: null,
        registeredData: null,
        isValidationError: false,
        dataEnteredForValidation: {},
        offlineToOnlineErrorMsg: false,
        isRegistrationError: false,
        isValidCustomer: false
    }

    componentDidUpdate = (prevProps, prevState) => {
        const { validateOfflineCustomerResponse, registerOfflineCustomerResponse } = this.props;
        const { isValidCustomer, currentStep } = this.state;
     
        this.handleValidateOfflineCustomer(prevProps, validateOfflineCustomerResponse, isValidCustomer);
        this.handleRegisterOfflineCustomer(prevProps, registerOfflineCustomerResponse);
        this.handleStepChange(prevState, currentStep);
    };
     
    handleValidateOfflineCustomer = (prevProps, validateOfflineCustomerResponse, isValidCustomer) => {
        if (this.shouldValidateCustomer(prevProps, validateOfflineCustomerResponse, isValidCustomer)) {
            if (this.isValidationSuccess(validateOfflineCustomerResponse)) {
                OfflineToOnlineIdentificationFormSuccess();
                this.setState({
                    currentStep: 2,
                    isValidationError: false,
                    ValidatedData: validateOfflineCustomerResponse,
                    isLoadingState: false,
                    isValidCustomer: validateOfflineCustomerResponse?.response?.ValidateCustomer || false
                });
            } else if (this.isValidationError(validateOfflineCustomerResponse)) {
                OfflineToOnlineIdentificationFormError(validateOfflineCustomerResponse?.response?.statusReason);
                this.setState({
                    isValidationError: true,
                    ValidatedData: validateOfflineCustomerResponse,
                    isLoadingState: false
                });
            }
        }
    };
     
    shouldValidateCustomer = (prevProps, validateOfflineCustomerResponse, isValidCustomer) => {
        return (
            prevProps.validateOfflineCustomerResponse?.response?.i18nMessageKey !== validateOfflineCustomerResponse?.response?.i18nMessageKey ||
            (validateOfflineCustomerResponse?.response?.ValidateCustomer === true && !isValidCustomer)
        );
    };
     
    isValidationSuccess = (validateOfflineCustomerResponse) => {
        return validateOfflineCustomerResponse !== null && validateOfflineCustomerResponse?.errorCode === 0;
    };
     
    isValidationError = (validateOfflineCustomerResponse) => {
        return validateOfflineCustomerResponse !== null && (validateOfflineCustomerResponse?.errorCode === 400 || validateOfflineCustomerResponse?.errorCode === 500);
    };
     
    handleRegisterOfflineCustomer = (prevProps, registerOfflineCustomerResponse) => {
        if (prevProps.registerOfflineCustomerResponse?.response?.i18nMessageKey !== registerOfflineCustomerResponse?.response?.i18nMessageKey) {
            if (this.isRegistrationSuccess(registerOfflineCustomerResponse)) {
                OfflineToOnlineRegistrationFormSuccess();
                this.setState({
                    isLoadingState: false,
                    registeredData: registerOfflineCustomerResponse,
                    currentStep: 3,
                    isRegistrationError: false
                });
            } else if (this.isRegistrationError(registerOfflineCustomerResponse)) {
                OfflineToOnlineRegistrationFormError(registerOfflineCustomerResponse?.response?.statusReason);
                this.setState({
                    isLoadingState: false,
                    registeredData: registerOfflineCustomerResponse,
                    isRegistrationError: true
                });
            }
        }
    };
     
    isRegistrationSuccess = (registerOfflineCustomerResponse) => {
        return registerOfflineCustomerResponse !== null && registerOfflineCustomerResponse.errorCode === 0;
    };
     
    isRegistrationError = (registerOfflineCustomerResponse) => {
        return registerOfflineCustomerResponse !== null && (registerOfflineCustomerResponse?.errorCode === 400 || registerOfflineCustomerResponse?.errorCode === 500);
    };
     
    handleStepChange = (prevState, currentStep) => {
        if (prevState.currentStep !== currentStep && currentStep === 3) {
            const sentEmailMsgSection = document.querySelector('.offline-registration-success-section')
            if(sentEmailMsgSection){
                const header = document.querySelector('#headerTop');
                const headerHeight = header ? (header.offsetHeight * 2) : 0;
                const elementPosition = sentEmailMsgSection.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerHeight;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                })
            }
        }
    };

    handleRegistration= (formData) =>{
        const {dataEnteredForValidation} = this.state
        const {validateOfflineCustomerResponse} = this.props
        const {termsConditionsConfirmation, dataProcessingConsentConfirmation, trainingConfirmation, newsletterConfirmation} = this.props.accountInfoFormValues;
        this.setState({isLoadingState:true, isRegistrationError: false })
        dataEnteredForValidation?.kvnrNumber?.length > 0 && ( formData['kvnr'] = dataEnteredForValidation?.kvnrNumber );
        dataEnteredForValidation?.customerNumber?.length > 0 && ( formData['customerId'] = dataEnteredForValidation?.customerNumber );
        formData['sessionToken'] = validateOfflineCustomerResponse?.response?.sessionToken;
        formData['dataProcessingConsentConfirmation'] = dataProcessingConsentConfirmation ? true : false;
        formData['newsletterConfirmation'] = newsletterConfirmation ? true : false;
        formData['termsConditionsConfirmation'] = termsConditionsConfirmation ? true : false;
        formData['trainingConfirmation'] = trainingConfirmation ? true : false;
        this.props.registerOfflineCustomerRequest(formData);
    }

    onSubmitIdentity = async (formData) => {
        this.setState({isLoadingState:true, dataEnteredForValidation: formData, isValidationError: false})
        this.props.validateOfflineCustomerRequest(formData);
    }

    render() {
        const {
            registrationHeading,
            registrationSubheading,
            registrationSubheadingDescription,
            customerNumberRegex,
            informationText,
            offlineRegistrationSuccessHeading,
            offlineRegistrationSuccessSubheading,
            privacyPolicy,
            termsAndConditions,
            trainingLink
        } = this.props;
        const {isLoadingState, isValidationError, isRegistrationError, offlineToOnlineErrorMsg, ValidatedData, registeredData} = this.state;
        const validationErrorCode = isValidationError && ValidatedData?.response["i18nMessageKey"];
        const registrationErrorCode = isRegistrationError && registeredData?.response["i18nMessageKey"];
        return (
            <div>
                {isLoadingState && <LoadingIndicator isOverlay pageLoader />}
                <section className='adc-offline-to-online'>
                    <div className="container py-4 py-md-5 ">
                        <div className="row pt-4 pt-md-5">
                            <div className="col-12 mb-4">
                                    <div className="row align-items-center px-3 px-md-0 px-sm-0">
                                        <div className={`col-lg-12 col-md-12 col-sm-12 `}>
                                            <div className="row">
                                                <if condition={this.state.currentStep === 1}>
                                                    <div className={`col-md-6`}>
                                                        <h2 className="adc-title adc-title--blue registration-heading">{registrationHeading}</h2>
                                                        <p className="adc-title adc-title--blue registration-subheading">{registrationSubheading}</p>
                                                        <p className="registration-subheading-description">{registrationSubheadingDescription}</p>
                                                        <IdentificationForm
                                                            onSubmitIdentity={this.onSubmitIdentity}
                                                            formFields={this.state.formFields}
                                                            informationText={informationText}
                                                            customerNumberValidationRegex={customerNumberRegex}
                                                            customerNumberErrorText={<I18n text={i18nLabels.CUSTOMER_NUMBER_INVALID} />}
                                                        />
                                               
                                                    </div>
                                                </if>

                                                <if condition={this.state.currentStep === 2}>
                                                        <AccountInfoForm  {...this.props} 
                                                         submitButtonLabel={i18nLabels.COMPLETE_REGISTRATION}
                                                         offlineToOnlineFlag={true} 
                                                         onSubmit={this.handleRegistration}
                                                         offlineToOnlineErrorMsg={offlineToOnlineErrorMsg}
                                                         initialValues = {{}}
                                                         privacyPolicy={privacyPolicy}
                                                         termsAndConditions={termsAndConditions}
                                                         trainingLink={trainingLink}
                                                          />
                                                    
                                                </if>

                                                <if condition={this.state.currentStep === 3}>
                                                    <div className="row offline-registration-success-section">
                                                        <div className="col-1 offline-success-icon-alignment">
                                                            <em class="adc-icon adc-icon--large email-sent-success-icon"></em>
                                                        </div>
                                                        <div className="col-7">
                                                            <p className='success-heading-description'>{offlineRegistrationSuccessHeading}</p>
                                                            <p className='success-subheading-description'>{offlineRegistrationSuccessSubheading}</p>
                                                        </div>
                                                    </div>
                                                </if>
                                            </div>
                                           {isValidationError && <p className='validation-error-msg mt-4'><I18n text={'OFFLINE_VALIDATION_ERROR_MSG_' + validationErrorCode} /></p>}
                                           {isRegistrationError && <p className='validation-error-msg mt-4 text-center'><I18n text={'OFFLINE_REGISTRATION_ERROR_MSG_' + registrationErrorCode} /></p>}
                                        </div>
                                    </div>
                             </div>
                        </div>
                    </div>
                </section >
            </div >
        );
    };
});