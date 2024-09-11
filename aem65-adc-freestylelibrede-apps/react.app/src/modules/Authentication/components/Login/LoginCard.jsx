import React, { useEffect } from 'react';
import { reduxForm, resetSection } from 'redux-form';
import EmailField from '../../../Form/components/FormFields/EmailField';
import PasswordField from '../../../Form/components/FormFields/PasswordField';
import I18n from '../../../Translation/components/I18n';
import { i18nLabels } from '../../../../utils/translationUtils';
import PropTypes from 'prop-types';
import { validate } from './validation';
import Button, { BUTTON_OPTIONS } from '../../../Generic/components/Button/Button';
import SocialLoginButtons from './SocialLoginButtons';
import Link from '../../../Generic/components/Link/Link';
import RecaptchaField from '../../../Form/components/GenericFields/RecaptchaField';
import { ErrorCode, eslErrorCode } from '../../../../utils/enums';
import { eslParams, getServiceEndPoint } from '../../../../utils/endpointUrl';
import { useSelector } from 'react-redux';

const isEslAuthenticationEnable = getServiceEndPoint(eslParams.ENABLE_ESL_AUTHENTICATION) ? getServiceEndPoint(eslParams.ENABLE_ESL_AUTHENTICATION) : false;
export const resetRecaptcha = (result, dispatch) => dispatch(resetSection('syncValidation', 'recaptchaValue'));
const LoginCard = ({ handleSubmit,onSubmit, emailTriggerSuccess, submitting, loginSectionText, loginButtonText, errorMessage, forgotPasswordText, forgotPasswordLink, isRecaptcha, loginErrorCode, errorCode, isDisableRegistration, ghacId, forgetPwdModalPopup, isGreyLoginShowMsg ,isDisableRecaptcha ,headerCode, isDisableSocialLogin}) => {

	const handlePreSubmit = async (formData) =>{
		await window?.grecaptcha?.enterprise?.execute().then(function (token){
			formData['recaptchaValue'] = token;
			onSubmit(formData)
		});
	}
	return (
		<div className={isDisableRegistration && !ghacId ? 'offset-lg-2 col-lg-8 offset-xl-3 col-xl-6' : 'col-lg-6'}>
			<div className={isDisableRegistration && !ghacId ? '' : 'adc-login__left'}>
				<div className="row justify-content-md-center">
					<div className="col-md-8">
						<form onSubmit={handleSubmit(handlePreSubmit)}>
							<div className="adc-login__left--inner adc-form-group">
								<h5 className="adc-title adc-title--black text-center mb-4">{loginSectionText}</h5>
								<if condition={isGreyLoginShowMsg}>
									<p className={'adc-login__error-text mb-4 infoError-grey-login'}>
										<I18n text={i18nLabels.GREY_LOGIN_SHOW_MESSAGE} />
									</p>
								</if>
								<div className={isGreyLoginShowMsg ? 'grey-login-opacity' : ''}>
									<div className="adc-form-group mb-3">
										<EmailField
											isDisabled={isGreyLoginShowMsg}
										/>
									</div>
									<PasswordField
										isDisabled={isGreyLoginShowMsg}
									/>
									<div className={isGreyLoginShowMsg ? 'text-right mb-4 pb-3 disabled-grey-login-link' : 'text-right mb-4 pb-3'}>
										<Link href={forgotPasswordLink}
											label={forgotPasswordText}
										/>
									</div>
								</div>
								<if condition={loginErrorCode === ErrorCode.Lambda_ErrorCode_4001}>
									{forgetPwdModalPopup(forgotPasswordLink)}
								</if>
								<if condition={isEslAuthenticationEnable}>

									<if condition={loginErrorCode === eslErrorCode.LGN_USER_1003}>
									<p className={'adc-login__error-text mb-4 infoError'}>
										<span class='infoerror-text'></span>
											<I18n text={i18nLabels.RECAPTCHA_ERROR} />
										</p>
									</if>
									<elseif condition={loginErrorCode === eslErrorCode.LGN_USER_1002 || loginErrorCode === eslErrorCode.PM_1020}>
									<p className={'adc-login__error-text mb-4 infoError'}>
										<span class='infoerror-text'></span>
											<I18n text={i18nLabels.COGNITO_EXCEPTIONS.NotAuthorizedException} params={[forgotPasswordLink]} />
										</p>
									</elseif>
									<elseif condition={loginErrorCode === eslErrorCode.LGN_USER_1001}>
									<p className={'adc-login__error-text mb-4 infoError'}>
										<span class='infoerror-text'></span>
											<I18n text={i18nLabels.COGNITO_EXCEPTIONS.UserNotConfirmedException} />
										</p>
									</elseif>
									<elseif condition={loginErrorCode}>
									<p className={'adc-login__error-text mb-4 infoError'}>
										<span class='infoerror-text'></span>
											<I18n text={i18nLabels.ESL_LOGIN_ERROR +  loginErrorCode.toLowerCase()}/>
										</p>
									</elseif>
								</if>
								<elseif condition={isDisableRegistration && !ghacId && loginErrorCode && !errorCode}>
									<p className={'adc-login__error-text mb-4'}>
										<I18n text={i18nLabels.GENERIC_CUTOVER_LOGIN_ERROR_MESSAGE} />
									</p>
								</elseif>
								<elseif condition={loginErrorCode && !errorCode}>
									<p className={'adc-login__error-text mb-4 infoError'}>
										<span class='infoerror-text'></span>
										<I18n text={i18nLabels.COGNITO_EXCEPTIONS[loginErrorCode] || i18nLabels.GENERIC_LOGIN_ERROR}
											params={[forgotPasswordLink]} />
									</p>
								</elseif>
								<elseif condition={emailTriggerSuccess && !errorCode}>
									<p className={'adc-login__error-text mb-4'}>
										<I18n text={i18nLabels.COGNITO_EXCEPTIONS.UserNotConfirmedException} />
									</p>
								</elseif>
								<elseif condition={errorCode}>
									<p className={'adc-login__error-text mb-4'}>
										<I18n text={'magento_error_code_' + errorCode} />
									</p>
								</elseif>
								<div className="adc-login__submit-btn">
									<Button
										className={'ml-0'}
										label={loginButtonText}
										ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
										type={BUTTON_OPTIONS.TYPE.SUBMIT}
										hasNoMargin
										isFullWidth
										isDisabled={submitting || isGreyLoginShowMsg}
									/>
								</div>
								<if condition={!isGreyLoginShowMsg}>
									<if condition={!isDisableRegistration}>
										<if condition={!isDisableSocialLogin}>
											<div className="adc-login__oder-line">
												<span className="adc-login__oder-line--txt"><I18n text={i18nLabels.OR} /></span>
											</div>
											<SocialLoginButtons
												facebookLabel={i18nLabels.LOGIN_WITH_FACEBOOK}
												googleLabel={i18nLabels.LOGIN_WITH_GOOGLE}
											/>
										</if>
									</if>
								</if>
								<if condition={isDisableSocialLogin}>
								<p className={'adc-login__social-message'}>
									<I18n text={i18nLabels.SOCIAL_LOGIN_DISABLED_MESSAGE} />
								</p>
								</if>
								<div className={'mt-4'}>
											<RecaptchaField />
										</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

LoginCard.propTypes = {
	handleSubmit: PropTypes.func,
	loginSectionText: PropTypes.string,
	loginButtonText: PropTypes.string,
	forgotPasswordText: PropTypes.string,
	forgotPasswordLink: PropTypes.string,
	isRecaptcha: PropTypes.bool,
	loginErrorCode: PropTypes.string,
	errorCode: PropTypes.number,
	isDisableRegistration: PropTypes.bool,
	emailTriggerSuccess: PropTypes.bool,
	ghacId: PropTypes.string,
	modalPopup: PropTypes.func,
	isDisableSocialLogin: PropTypes.bool
};

export default reduxForm({
	form: 'syncValidation',
	validate,
	touchOnBlur: false,
	onSubmitSuccess: resetRecaptcha
})(LoginCard);
