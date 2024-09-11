import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginCard from './LoginCard';
import { logInRequest, logOutRequest } from '../../redux/actions/login.action';
import PropTypes from 'prop-types';
import { getHashUrlParameter, getUrlParameter } from '../../../../utils/getParams';
import RegistrationCard from './RegistrationCard';
import { getCurrentAuthenticatedUser } from '../../../../api/authentication.service';
import MessageBanner from '../../../Generic/components/MessageBanner/MessageBanner';
import Row from '../../../Generic/components/Container/Row';
import Col from '../../../Generic/components/Container/Col';
import { i18nLabels } from '../../../../utils/translationUtils';
import { confirmAccountRequest, confirmationEmailTriggerRequest } from '../../redux/actions/registration.action';
import ProgressBar from '../../../Generic/components/ProgressBar/ProgressBar';
import Container from '../../../Generic/components/Container/Container';
import { BOOLEAN_STRING, SUCCESS_CODE } from '../../../../utils/enums';
import ChangeEmailModal from './ChangeEmailModal.jsx';
import { openModalAction } from "../../../Modal/redux/actions";
import { getCookie } from '../../../../utils/cookieUtils';
import { loginFormStart, loginFormSuccess, loginFormError } from '../../../../utils/adobeAnalyticsUtils';
import LoadingIndicator from '../../../Generic/components/Loading/LoadingIndicator';
import { identityImpersonateUser } from '../../../../api/esl.auth.service.js';
import { confirmOfflineCustomerRequest } from '../../../OfflineToOnline/redux/actions/confirm_offline_customer.action';


const mapDispatchToProps = {
	login: logInRequest,
	confirmAccount: confirmAccountRequest,
	confirmationEmailTrigger: confirmationEmailTriggerRequest,
	signOut: logOutRequest,
	openModalAction,
	confirmOfflineCustomerRequest
};

const mapStateToProps = state => {
	const { error, errorCode, confirmationStatus, isRecaptcha, emailTriggerSuccess, loggedIn, errorMsgAA } = state.authenticationModuleReducer;
	const { confirmEmailStatus } = state.myAccountModuleReducer.EmailUpdateReducer;
	const { email } = state.form?.syncValidation?.values || '';
	const {confirmOfflineCustomerResponse} = state.offlineToOnlineModuleReducer.confirmOfflineCustomerReducer;
	return { error, errorCode, confirmationStatus, confirmEmailStatus, isRecaptcha, email, emailTriggerSuccess, loggedIn, errorMsgAA, confirmOfflineCustomerResponse };
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(
	class LoginForm extends Component {
		state = {
			isCheckingAuthStatus: true,
			showChangeEmailModel: false,
			confirmationDetails: {},
			currentStep: 2,
			steps: [
				{ title: i18nLabels.CHECKOUT_PROCESS.SHOPPING_CART },
				{ title: i18nLabels.CHECKOUT_PROCESS.LOGIN },
				{ title: i18nLabels.CHECKOUT_PROCESS.CASHBOX }
			],
			rxSteps: [
				{ title: i18nLabels.CHECKOUT_PROCESS.RECIPE },
				{ title: i18nLabels.CHECKOUT_PROCESS.LOGIN },
				{ title: i18nLabels.CHECKOUT_PROCESS.CASHBOX }
			],
			blueDoor: false,
			isTrackingCalled: false,
			isTrackingErrorCalled: false,
			isLoading: false,
			confirmOfflineCustomerData: null
		};

		static propTypes = {
			loginSectionText: PropTypes.string,
			createAccount: PropTypes.string,
			signUpHeading: PropTypes.string,
			loginHeading: PropTypes.string,
			loginSubHeading: PropTypes.string,
			loginSuccessLink: PropTypes.string,
			loginButtonText: PropTypes.string,
			forgotPasswordText: PropTypes.string,
			forgotPasswordLink: PropTypes.string,
			createAccountLink: PropTypes.string,
			error: PropTypes.string,
			errorCode: PropTypes.number,
			login: PropTypes.func,
			confirmAccount: PropTypes.func,
			confirmationStatus: PropTypes.any,
			confirmEmailStatus: PropTypes.any,
			emailTriggerSuccess: PropTypes.bool,
			isRecaptcha: PropTypes.bool,
			isDisableRegistration: PropTypes.bool,
			signOut: PropTypes.func,
			isGreyLoginShowMsg: PropTypes.bool,
			loggedIn: PropTypes.bool,
			errorMsgAA: PropTypes.string,
			isDisableRecaptcha: PropTypes.bool,
			headerCode: PropTypes.string,
			emailID: PropTypes.string,
            passwordID: PropTypes.string,
            submitButtonID: PropTypes.string,
			isDisableSocialLogin: PropTypes.bool,
			confirmOfflineCustomerRequest: PropTypes.func
		};
		forgetPwdModal = value => {
			const { openModalAction } = this.props;
			openModalAction({
				contentID: 'forgetPasswordModal',
				heading: i18nLabels.FORGET_PASSWORD_MODAL_HEADING,
				canModalClose: true,
				showModalCloseIcon: true,
				props: {
					forgetPasswordLink: value
				}
			});
		}

		accountConfirmation = (confirmationDetails, activateEmail, isLoggedIn) => {
			const { confirmAccount, signOut } = this.props;
			if (confirmationDetails) {
				if (activateEmail === '1') {
					if (isLoggedIn) {
						const redirectURL = window.location.href;
						signOut(window.location.href);
						window.location.replace(redirectURL);
						return;
					}
					this.setState({ isCheckingAuthStatus: false, showChangeEmailModel: true, confirmationDetails: confirmationDetails });
				} else {
					confirmAccount(confirmationDetails);
				}
			}
		}

		componentDidMount() {
			const { confirmOfflineCustomerRequest } = this.props;
			const key = getUrlParameter('key');
			const id = getUrlParameter('id');
			const accountActivationKey = getUrlParameter('accountActivationKey');
			const type = getUrlParameter('type') ?? 0;
			const confirmationDetails = this.getConfirmationDetails(key, id, type);
			const activateEmail = getUrlParameter('activateEmail');
			const ghacId = sessionStorage.getItem('ghac');
			const isLoggedIn = getCookie('isLoggedIn');
			const claimsToken= getHashUrlParameter('claims_token');
			const refreshToken= getHashUrlParameter('refresh_token');
			const socialLoginCode = getUrlParameter('socialcode');
			if (socialLoginCode) {
				this.setState({ isTrackingErrorCalled: false, isLoading: true });
				this.props.login({socialLoginCode});
			}
			if (claimsToken && refreshToken) {
				identityImpersonateUser(claimsToken,refreshToken).then((response)=>{
					if (response) {
						this.props.login({})
					}				
				}).catch((e)=> e);
			}
			if (ghacId) {
				this.setState({ blueDoor: true });
			}
			this.accountConfirmation(confirmationDetails, activateEmail, isLoggedIn);
			const redirectTo = this.getRedirectTo();
			activateEmail !== '1' && !claimsToken && !refreshToken && getCurrentAuthenticatedUser()
				.then(() => {
					if (redirectTo) {
						window.location = redirectTo;
					}
				})
				.catch(() => this.setState({ isCheckingAuthStatus: false }));
			if (accountActivationKey){
				confirmOfflineCustomerRequest(accountActivationKey);
			}
		}
		componentDidUpdate(prevProps) {
			const { error, email, confirmationEmailTrigger, loggedIn, errorMsgAA, confirmOfflineCustomerResponse } = this.props;
			if (error !== prevProps.error && error === i18nLabels.COGNITO_EXCEPTIONS.UserNotConfirmedException) {
				confirmationEmailTrigger(email);
			}
			if (!this.state.isTrackingCalled && this.props.email !== undefined) {
				loginFormStart();
				this.setState({ isTrackingCalled: true });
			}

			if (loggedIn) {
				loginFormSuccess();
			}
			if (error) {

				if (errorMsgAA && !this.state.isTrackingErrorCalled) {
					loginFormError(errorMsgAA);
					this.setState({ isTrackingErrorCalled: true, isLoading: false });
				}
				if (this.state.isLoading) {
					this.setState({ isLoading: false });
					window?.grecaptcha?.enterprise?.reset();
				}
			}
			if(prevProps.confirmOfflineCustomerResponse !== confirmOfflineCustomerResponse && confirmOfflineCustomerResponse !== null){
				this.setState({confirmOfflineCustomerData: confirmOfflineCustomerResponse,  isCheckingAuthStatus: false});
			}

		}
		getRedirectTo = () => {
			return getUrlParameter('redirectTo');
		};

		getConfirmationDetails = (key, id, type) => {
			if (key && id) return { key, id, type };
		};

		submit = values => {
			const {isDisableRecaptcha,headerCode} = this.props;
			const loginPayload = {...values, isDisableRecaptcha, headerCode}
			this.setState({ isTrackingErrorCalled: false, isLoading: true });
			let redirectTo = this.getRedirectTo();
			const urlSplitParam = '.html&';
			const { loginSuccessLink, login } = this.props;
			if (redirectTo?.indexOf(urlSplitParam) !== -1) {
				redirectTo = redirectTo?.split(urlSplitParam)[0] + '.html?' + redirectTo?.split(urlSplitParam)[1];
			}
			login(loginPayload, redirectTo ? redirectTo : loginSuccessLink);
		};

		resetBluedoorFlag = () => {
			this.setState({ blueDoor: false });
		}

		render() {
			const {
				loginHeading,
				loginSubHeading,
				loginSectionText,
				createAccount,
				loginButtonText,
				forgotPasswordText,
				forgotPasswordLink,
				signUpHeading,
				createAccountLink,
				error,
				errorCode,
				confirmationStatus,
				confirmEmailStatus,
				isRecaptcha,
				isDisableRegistration,
				emailTriggerSuccess,
				isGreyLoginShowMsg,
				isDisableRecaptcha,
				headerCode,
				emailID,
                passwordID,
                submitButtonID,
				isDisableSocialLogin,
				confirmOfflineCustomerResponse
			} = this.props;
			const { isCheckingAuthStatus, steps, rxSteps, currentStep, blueDoor, showChangeEmailModel, confirmationDetails, isLoading, confirmOfflineCustomerData } = this.state;
			const redirectTo = this.getRedirectTo();
			const isCheckout = getUrlParameter('isCheckout');
			const isRxCheckout = getUrlParameter('isRxCheckout');
			const ghacId = sessionStorage.getItem('ghac');
			const confirmed = getUrlParameter('confirmationStatus');
			const magentoSuccessCode = sessionStorage.getItem(SUCCESS_CODE);
			const socialError = window.location.hash?.includes('error') || window.location.hash?.includes('error_description');
			const offlineResponseCode = confirmOfflineCustomerResponse && confirmOfflineCustomerResponse?.response?.i18nMessageKey
			return (
				<>
					{showChangeEmailModel &&
						<>
							<ChangeEmailModal confirmationDetails={confirmationDetails} />
						</>
					}
					{isLoading &&
						<LoadingIndicator isOverlay pageLoader/>
					}
					{!isCheckingAuthStatus &&
						<>
							<div className="container">
								<if condition={isCheckout || isRxCheckout}>
									<Container className={'mt-5'}>
										<ProgressBar steps={isRxCheckout ? rxSteps : steps} currentStep={currentStep} />
									</Container>
								</if>
								<div className="adc-login">
									<div className="adc-login__heading mt-5">
										<h1 className="adc-login__heading--title adc-title adc-title--blue text-center">{loginHeading}
											<span className={'adc-icon-container'}><i
												className="adc-icon adc-icon--lock adc-icon--medium ml-md-2" /></span>
										</h1>
										<h5 className="adc-title adc-title--blue text-center">{loginSubHeading}</h5>
									</div>
									<if condition={blueDoor}>
										<MessageBanner className={'mb-5'} icon={MessageBanner.ICON.SUCCESS} color={MessageBanner.COLOR.GREEN} description={i18nLabels.BLUEDOOR_REDIRECT_SUCCESS} canClose onCloseAction={() => this.resetBluedoorFlag()} />
									</if>
									<if condition={socialError}>
										<MessageBanner className={'mb-5'} icon={MessageBanner.ICON.FAILURE} color={MessageBanner.COLOR.RED} description={i18nLabels.SOCIAL_LOGIN_ERROR} canClose />
									</if>
									<Row>
										<Col width={10} offset={1}>
											<if condition={confirmationStatus === true || confirmed === "true" && magentoSuccessCode }>
												<MessageBanner className={'mb-5'} icon={MessageBanner.ICON.SUCCESS} color={MessageBanner.COLOR.GREEN} description={'magento_res_code_'+magentoSuccessCode} canClose />
											</if>
											<if condition={confirmOfflineCustomerResponse !== null && confirmOfflineCustomerData} > 
												<if condition={ confirmOfflineCustomerResponse?.status === true}>
													<MessageBanner className={'mb-5'} icon={MessageBanner.ICON.SUCCESS} color={MessageBanner.COLOR.GREEN} description={i18nLabels.CONFIRMATION_SUCCESS} canClose />
												</if>
												<elseif condition={confirmOfflineCustomerResponse?.status === false && offlineResponseCode}>
													<MessageBanner className={'mb-5'} icon={MessageBanner.ICON.FAILURE} color={MessageBanner.COLOR.RED} description={'offline_verification_msg_'+offlineResponseCode} canClose />
												</elseif>
											</if>
											<if condition={getUrlParameter('registrationStatus') === BOOLEAN_STRING.TRUE}>
												<MessageBanner className={'mb-5'} icon={MessageBanner.ICON.SUCCESS} color={MessageBanner.COLOR.GREEN} description={i18nLabels.REGISTRATION_SUCCESS} params={[getUrlParameter('email')]} canClose />
											</if>
											<if condition={confirmEmailStatus === true}>
												<MessageBanner className={'mb-5'} icon={MessageBanner.ICON.SUCCESS} color={MessageBanner.COLOR.GREEN} description={i18nLabels.EMAIL_UPDATED_SUCCESSFULLY} canClose />
											</if>
											<elseif condition={confirmEmailStatus === false}>
												<MessageBanner className={'mb-5'} icon={MessageBanner.ICON.FAILURE} color={MessageBanner.COLOR.RED} description={i18nLabels.CONFIRMATION_FAILURE_EMAIL} canClose />
											</elseif>
											<elseif condition={getUrlParameter('resetPasswordSuccess') === BOOLEAN_STRING.TRUE}>
												<MessageBanner className={'mb-5'} icon={MessageBanner.ICON.SUCCESS} color={MessageBanner.COLOR.GREEN} description={i18nLabels.RESET_PASSWORD_SUCCESS_MESSAGE} canClose />
											</elseif>
											<elseif condition={getUrlParameter('resetEmailLinkSuccess') === BOOLEAN_STRING.TRUE}>
												<MessageBanner className={'mb-5'} icon={MessageBanner.ICON.SUCCESS} color={MessageBanner.COLOR.GREEN} description={i18nLabels.RESET_EMAIL_LINK_SUCCESS_MESSAGE} canClose />
											</elseif>
										</Col>
									</Row>
									<div className="row">
										<LoginCard
											loginErrorCode={error}
											errorCode={errorCode}
											emailTriggerSuccess={emailTriggerSuccess}
											loginSectionText={loginSectionText}
											loginButtonText={loginButtonText}
											forgotPasswordText={forgotPasswordText}
											forgotPasswordLink={forgotPasswordLink}
											isRecaptcha={isRecaptcha}
											onSubmit={this.submit}
											isDisableRegistration={isDisableRegistration}
											ghacId={ghacId}
											forgetPwdModalPopup={this.forgetPwdModal}
											isDisableRecaptcha={isDisableRecaptcha}
											headerCode={headerCode}
                                          	isGreyLoginShowMsg={isGreyLoginShowMsg}
											emailID={emailID}
											passwordID={passwordID}
											submitButtonID={submitButtonID}
											isDisableSocialLogin={isDisableSocialLogin}
										/>
										{(!isDisableRegistration || ghacId) && <RegistrationCard
											signUpHeading={signUpHeading}
											createAccountLink={createAccountLink + (redirectTo && isCheckout === BOOLEAN_STRING.TRUE ? ('?redirectTo=' + redirectTo) : '')}
											createAccount={createAccount}
											isDisableRegistration={isDisableRegistration}
											isDisableSocialLogin={isDisableSocialLogin}
										/>}
									</div>
								</div>
							</div>
						</>
					}
				</>
			)
		}
	});