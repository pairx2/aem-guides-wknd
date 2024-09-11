import React, { useEffect } from 'react';
import {reduxForm} from 'redux-form';
import PropsTypes from 'prop-types';
import I18n from '../../../Translation/components/I18n';
import {connect, useSelector} from 'react-redux';
import {validate} from '../Login/validation';
import EmailField from '../../../Form/components/FormFields/EmailField';
import Link from '../../../Generic/components/Link/Link';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import RecaptchaField from '../../../Form/components/GenericFields/RecaptchaField';
import { i18nLabels } from '../../../../utils/translationUtils';
import { RECAPTCHA_VALIDATION_ERROR_CODE } from '../../../../utils/enums';

const mapStateToProps = state => {
	const {errorCode} = state.authenticationModuleReducer;
	return {errorCode};
};
const ForgotPasswordForm = ({handleSubmit,onSubmit, forgotPasswordHeading, forgotPasswordSubheading, backToLogin, backToLoginUrl, submitCtaText, hasServerSideErrorCode,errorCode}) => {
	const handlePreSubmit = async (formData) =>{
		await window?.grecaptcha?.enterprise?.execute().then(function (token){
			onSubmit(formData)
		});
	}
	return (
		<div className="container">
			<div className="adc-passwordreset">
				<div className="adc-passwordreset__heading">
					<h1 className="adc-title adc-passwordreset__title-heading adc-title--blue pt-4 text-center">{forgotPasswordHeading}</h1>
				</div>
				<div className="row justify-content-center align-items-center">
					<div className="adc-passwordreset__sub-heading col-12 col-md-10 col-xl-8">
						<h5 className="adc-title adc-title--blue text-center">{forgotPasswordSubheading}</h5>
					</div>
				</div>
				<div className="row justify-content-center align-items-center mt-4">
					<div className="col-lg-5 col-md-10 col-12 px-xl-5">
						<form onSubmit={handleSubmit(handlePreSubmit)} className="mx-3">
							<EmailField/>
							<div className="mt-1">
								{hasServerSideErrorCode && errorCode !==RECAPTCHA_VALIDATION_ERROR_CODE && <span className="adc-form-group--error mt-4">
									<I18n text={'magento_error_code_' + errorCode}/>
								</span>
								}
								{hasServerSideErrorCode && errorCode ===RECAPTCHA_VALIDATION_ERROR_CODE && <span className="adc-form-group--error mt-4">
									<I18n text={i18nLabels.RECAPTCHA_VALIDATION_ERROR}/>
								</span>
								}
							</div>
							<div className="mt-4">
								<Button
									label={submitCtaText}
									type={BUTTON_OPTIONS.TYPE.SUBMIT}
									ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
									size={BUTTON_OPTIONS.SIZE.LARGE}
									isFullWidth
									hasNoMargin
									className={'ml-0 lspacing'}
								/>
							</div>
							<div className="row justify-content-center my-3">
								<Link href={backToLoginUrl}
									  hasNoMargin
									  label={backToLogin}
									  className="font-13"
								/>
							</div>
							<div className={'mt-4'}>
											<RecaptchaField />
										</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

ForgotPasswordForm.propTypes = {
	handleSubmit: PropsTypes.func,
	forgotPasswordHeading: PropsTypes.string,
	forgotPasswordSubheading: PropsTypes.string,
	backToLogin: PropsTypes.string,
	backToLoginUrl: PropsTypes.string,
	submitCtaText: PropsTypes.string,
	hasServerSideErrorCode: PropsTypes.bool,
	errorCode: PropsTypes.number
};
export default connect(mapStateToProps, null)(reduxForm({
	form: 'ForgotPasswordForm',
	validate,
})(ForgotPasswordForm));