import React, { useState } from 'react';
import validate from './validate';
import {reduxForm, change} from 'redux-form';
import {connect} from 'react-redux';
import I18n from '../../../Translation/components/I18n';
import PasswordStrengthFinder from '../../../Form/components/PasswordStrengthFinder/PasswordStrengthFinder';
import CheckboxField from '../../../Form/components/GenericFields/CheckboxField';
import {i18nLabels} from '../../../../utils/translationUtils';
import {email, required} from '../../../Form/utils/validationRules';
import EmailField, {fraudDomains } from '../../../Form/components/FormFields/EmailField';
import VoucherField from '../../../Form/components/FormFields/VoucherField';
import RecaptchaField from '../../../Form/components/GenericFields/RecaptchaField';
import PropTypes from 'prop-types';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import {registerOfflineCustomerRequest} from '../../../OfflineToOnline/redux/actions/register_offline_customer.action';
import {OfflineToOnlineRegistrationFormStart} from '../../../../utils/adobeAnalyticsUtils';

const mapStateToProps = state => {
	const {dictionary} = state.translationModuleReducer.translationReducer;
	const {recaptchaValue} = state.form.accountInfoForm?.values || {};
	const { validateOfflineCustomerResponse } = state.offlineToOnlineModuleReducer.offlineToOnlineReducer;
	return {dictionary, recaptchaValue, validateOfflineCustomerResponse};
};

const mapDispatchToProps = {
    updateField: (field, data) => change( "accountInfoForm", field, data ),
	registerOfflineCustomerRequest
}

const AccountInfoForm = ({handleGoBack,onSubmit, handleSubmit, accountHeading, accountSubHeadingDescription, accountSubheading, accountRegisterCtaStyle, accountCancelCtastyle, privacyPolicy, termsAndConditions, trainingLink, isEApply, recaptchaValue, isSocialLogin, accountDisclaimer, offlineToOnlineFlag, offlineToOnlineErrorMsg, ...props}) => {
	
	const [formStart, setFormStart] = useState(false)
	
	const privacyPolicyConfirmationChange = (value) => {
		const privacyPolicyValue = value.currentTarget.checked ?? false;
		props.updateField('termsConditionsConfirmation', privacyPolicyValue);
	};
	const handlePreSubmit = async (formData) =>{
		await window?.grecaptcha?.enterprise?.execute().then(function (token){
			formData['recaptchaValue'] = token;
			handleSubmit(formData)
		});
	}

	const handleEvent = () => {
		if(!formStart && offlineToOnlineFlag){
			OfflineToOnlineRegistrationFormStart();
			setFormStart(true)
		}
	}
	
	return (
		<form onClick={handleEvent} onSubmit={handleSubmit(handlePreSubmit)}>
			<div className="container">
				<div className="adc-registration">
			{offlineToOnlineFlag && <div className="adc-registration__heading-offline">
						<h1 className="adc-title adc-title--blue registration-heading">{accountHeading}</h1>
						<h5 className="adc-title adc-title--blue mt-3 registration-subheading">{accountSubheading}</h5>
						<p className="adc-title mt-3 registration-subheading-description">{accountSubHeadingDescription}</p>
					</div>}
			{!offlineToOnlineFlag && <div className="adc-registration__heading">
                        <h1 className="adc-title adc-title--blue text-center">{accountHeading}</h1>
                        <h5 className="adc-title adc-title--blue text-center mt-3">{accountSubheading}</h5>
                    </div> }		
					<div className="row align-items-center px-3 px-md-0 px-sm-0">
						<div className="col-lg-12 col-md-12 col-sm-12">
							<div className={offlineToOnlineFlag ? "row justify-content-md-start" :"row justify-content-md-center"}>
								<div className={offlineToOnlineFlag ? "col-lg-7 col-md-8" :"col-lg-6 col-md-8"}>
									<div className="adc-form-group mb-3">
										<EmailField isDisabled={isSocialLogin} validationRules={[required, email,fraudDomains]}/>
									</div>
									<if condition={!isSocialLogin}>
										<div className="adc-form-group">
											{isEApply ?
												<VoucherField /> :
												<PasswordStrengthFinder isRegistration />}
										</div>
									</if>
									<if condition={accountDisclaimer}>
										<div dangerouslySetInnerHTML={{__html: accountDisclaimer}}/>
									</if>
									<div className="adc-checkboxList">
										<CheckboxField
											name="dataProcessingConsentConfirmation"
											label={i18nLabels.DATA_PROCESSING_CONSENT_LABEL}
											params={['#']}
											validationRules={[required]}
										/>
										<CheckboxField
											name="privacyPolicyConfirmation"
											label={i18nLabels.PRIVACY_POLICY_LINK_LABEL}
											params={[privacyPolicy, termsAndConditions || '#']}
											validationRules={[required]}
											onChange={privacyPolicyConfirmationChange}
										/>
										<div className="invisible height-0">
											<CheckboxField
												name="termsConditionsConfirmation"
												label={i18nLabels.TERMS_CONDITIONS_CONFIRMATION_LABEL}
												params={[termsAndConditions || '#']}
												validationRules={[required]}
											/>
										</div>
										<CheckboxField
											name="trainingConfirmation"
											label={i18nLabels.TRAINING_CONFIRMATION_LABEL}
											params={[trainingLink || '#']}
											validationRules={[required]}
										/>
										<CheckboxField
											name="newsletterConfirmation"
											label={i18nLabels.NEWSLETTER_CONFIRMATION_LABEL}
										/>
									</div>
									<p className="adc-registration--required mt-3 mb-4 text-right">
										<I18n text={i18nLabels.MANDATORY_FIELD} prefix={'* '} />
									</p>
									<div className={'mt-5'}>
										 <RecaptchaField />
									</div>
									{!offlineToOnlineFlag && <div className="adc-registration--submit-btn mt-5">
										<div className="row">
											<div className="col-12 col-md-6">
												<Button
													label={i18nLabels.BACK_CTA_TEXT}
													ctaStyle={accountCancelCtastyle === BUTTON_OPTIONS.STYLE.PRIMARY ? BUTTON_OPTIONS.STYLE.PRIMARY : BUTTON_OPTIONS.STYLE.SECONDARY}
													action={handleGoBack}
													hasNoMargin
													isFullWidth
												/>
											</div>
											<div className="col-12 col-md-6 mt-3 mt-md-0">
												<Button
													label={i18nLabels.REGISTER_CTA_TEXT}
													ctaStyle={accountRegisterCtaStyle === BUTTON_OPTIONS.STYLE.PRIMARY ? BUTTON_OPTIONS.STYLE.PRIMARY : BUTTON_OPTIONS.STYLE.SECONDARY}
													action={handlePreSubmit}
													hasNoMargin
													isFullWidth
													isDisabled={isEApply && !recaptchaValue}/>
											</div>
										</div>
									</div>}
									{offlineToOnlineFlag && <div className="adc-registration--submit-btn mt-5">
										<div className="row">
											<div className="col-12 col-md-6">
												<Button
													label={props.submitButtonLabel}
													ctaStyle={accountCancelCtastyle === BUTTON_OPTIONS.STYLE.PRIMARY ? BUTTON_OPTIONS.STYLE.PRIMARY : BUTTON_OPTIONS.STYLE.SECONDARY}
													action={handlePreSubmit}
													hasNoMargin
													isFullWidth
												/>
											</div>
										</div>
										{offlineToOnlineErrorMsg && <p className='text-danger mt-4'><I18n text={i18nLabels.OFFLINE_TO_ONLINE_REGISTRATION_ERROR} /></p>}
									</div>}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</form >
	);
};

AccountInfoForm.propTypes = {
	handleGoBack: PropTypes.func,
	accountHeading: PropTypes.string,
	accountSubheading: PropTypes.string,
	accountSubHeadingDescription: PropTypes.string,
	accountRegisterCtaStyle: PropTypes.string,
	accountCancelCtastyle: PropTypes.string,
	privacyPolicy: PropTypes.string,
	termsAndConditions: PropTypes.string,
	isEApply: PropTypes.bool,
	recaptchaValue: PropTypes.string,
	isSocialLogin: PropTypes.bool,
	trainingLink: PropTypes.string,
	accountDisclaimer: PropTypes.string,
	offlineToOnlineFlag: PropTypes.bool,
	registerOfflineCustomerRequest: PropTypes.func
};
export default reduxForm({
	form: 'accountInfoForm',
	destroyOnUnmount: false,
	validate
})(connect(mapStateToProps, mapDispatchToProps)(AccountInfoForm));