/* eslint require-atomic-updates: 0 */
import {call, put, select, takeEvery, takeLatest} from 'redux-saga/effects';
import {
	LOG_IN_REQUEST,
	LOG_OUT_REQUEST,
	LOG_OUT_REQUEST_FAILURE,
	logInRequestFailure,
	logInRequestSuccess,
	logOutRequestFailure,
	logOutRequestSuccess,
	socialLogInRequestSuccess
} from '../actions/login.action';
import {authenticateUser, getCurrentAuthenticatedUser, signOut, getJwtToken} from '../../../../api/authentication.service';
import {deleteAnonymousCartIdFromCache} from '../../../../utils/cachingUtils';
import {getRequiredSiteData} from '../../../../utils/siteData';
import {Query, Mutation} from '../../../../api/graphql.config';
import {getCustomerRequestSuccess} from '../../../MyAccount/redux/actions/customer.action';
import {buildGetCustomerSchema, buildUpdateBluedoorCustomerSchema} from '../../../MyAccount/schemas/get_customer.schema';
import { ErrorCode, SUCCESS_CODE } from '../../../../utils/enums';
import {i18nLabels} from '../../../../utils/translationUtils';
import { eslParams, getServiceEndPoint } from '../../../../utils/endpointUrl';
import { checkEsl, checkException, checkSocialLogin, checkUserDetails, checkWCMLoginPageUrl, handleLogin, recaptchaReset, removeRedirectToAndIsCheckoutItems, setLoginErrorCode, setRedirection, setSocialLogin, setSocialLoginUrl } from '../../../../utils/loginUtils';

export const getRecaptcha = state => state.authenticationModuleReducer;

let isSocialLogin = false;
const LS = window.localStorage;
const SS = window.sessionStorage;

const isEslAuthenticationEnable = getServiceEndPoint(eslParams.ENABLE_ESL_AUTHENTICATION) ? getServiceEndPoint(eslParams.ENABLE_ESL_AUTHENTICATION) : false;
export function* loginRequestSaga({payload: {email, password, recaptchaValue, isDisableRecaptcha, headerCode , socialLoginCode }, loginSuccessLink}) {
	const redirectHashTab = window.location.hash.includes("=") ? "": window.location.hash;
	setRedirection(); //new line
	const isCheckout = LS.getItem('isCheckout');
	try {
		let user;
		try {
			user = yield call(getCurrentAuthenticatedUser);
		} catch (e) {
			if (checkUserDetails(email, password, socialLoginCode, isEslAuthenticationEnable)) {
				user = yield call(authenticateUser, email, password, recaptchaValue , isDisableRecaptcha, headerCode, socialLoginCode);
			}
		} finally {
			if (user) {
				window.location.hash= "";

				isSocialLogin = checkSocialLogin(user);
				try {
				const token = yield call(getJwtToken);
					const {data} = yield call(Query, buildGetCustomerSchema(), token);
					const customer = data?.adcCustomerDetails?.customer;
					const ghacId = sessionStorage.getItem('ghac');
					const magentoSuccessCode = sessionStorage.getItem(SUCCESS_CODE);
					if (customer?.account_type === 0) {
						yield put(logInRequestSuccess(user));
						if(ghacId){
							const {data: bluedoorData} = yield call(Mutation, buildUpdateBluedoorCustomerSchema(ghacId), token);
							sessionStorage.removeItem('ghac');
							sessionStorage.removeItem('insurenceId');
							sessionStorage.removeItem('rxmc');
							yield put(getCustomerRequestSuccess(bluedoorData));
						} else {
							yield put(getCustomerRequestSuccess(data));
						}
						handleLogin(isCheckout, isSocialLogin, customer, loginSuccessLink, redirectHashTab, magentoSuccessCode)
					} else {
						yield call(signOut);
						if (data?.adcCustomerDetails?.customer?.account_type === 1) {
							yield put(logInRequestFailure(i18nLabels.COGNITO_EXCEPTIONS.CustomerOfflineException));
						} else {
							yield put(logInRequestFailure(i18nLabels.COGNITO_EXCEPTIONS.NotAuthorizedException));
						}
					}
				} catch (e) {
					if (isSocialLogin) {
						yield put(socialLogInRequestSuccess(setSocialLogin(user)));
						setSocialLoginUrl(isSocialLogin);
					} else {
						yield call(signOut);
						yield put(logInRequestFailure({
							error: e.message,
							errorCodes: setLoginErrorCode(e)
						}));
					}
				}
			} else if (checkWCMLoginPageUrl()) {
				window.location.href = encodeURI(getRequiredSiteData('loginPageUrl') + `?redirectTo=${window.location.pathname}`);
			}
		}
	} catch (message) {
		let migratedUser = message?.message?.indexOf(ErrorCode.Lambda_ErrorCode_4001) !== -1;
		if(migratedUser) {
			yield put(logInRequestFailure(checkEsl(isEslAuthenticationEnable, message), message.message));
		} else {
			const {isRecaptcha} = yield select(getRecaptcha);
			yield put(logInRequestFailure(checkException(message), message.message));
			recaptchaReset(isRecaptcha);
		}
	}
}

export function* logoutRequestSaga({payload: logoutPageRedirect, isGlobalSignout}) {
	const loginPageURL = getRequiredSiteData('loginPageUrl');
	logoutPageRedirect = logoutPageRedirect || loginPageURL;
	try {
		yield call(signOut,isGlobalSignout);
		deleteAnonymousCartIdFromCache();
		yield put(logOutRequestSuccess());
		if (logoutPageRedirect) {
			window.location = logoutPageRedirect;
			LS.removeItem('otpModal');
			SS.removeItem('techTrainingPopup');
			SS.removeItem('dataConsentModal');
			removeRedirectToAndIsCheckoutItems();	
			LS.removeItem('newPaymentFlow');
		}
	} catch ({message}) {
		yield put(logOutRequestFailure(logoutPageRedirect));
	}
}
export default function* loginSaga() {
	yield takeLatest(LOG_IN_REQUEST, loginRequestSaga);
	yield takeEvery(LOG_OUT_REQUEST, logoutRequestSaga);
	yield takeEvery(LOG_OUT_REQUEST_FAILURE, logoutRequestSaga);
}
