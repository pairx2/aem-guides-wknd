import Auth from '@aws-amplify/auth';
import awsConfig from './aws.config';
import { setCookie, deleteCookie } from '../utils/cookieUtils';
import { identityAuthentication, deleteIdentityInfo, getIdentityAuthenticatedUserData, getIdentityJwtToken, identitySessionSignOut, getIdentityAccessToken, isEslAuthenticationEnable, removeIsSocialLoginActiveFromSS, SOCIAL_PROVIDER ,getProviderEslUrl, setIsSocialLoginActiveFromSS, isSocialLoginEnable} from './esl.auth.service';
import { getServiceEndPoint, eslParams, cognitoParams } from '../utils/endpointUrl';

// Unique credentials in order to work with AWS Amplify
Auth.configure(awsConfig);

const isEslAuthenticationEnvConfigEnable = getServiceEndPoint(eslParams.ENABLE_ESL_AUTHENTICATION) ? getServiceEndPoint(eslParams.ENABLE_ESL_AUTHENTICATION) : false;
// Sign in directly with AWS Amplify
const authenticateUser = (email, password, recaptchaValue, isDisableRecaptcha, headerCode, codeSocial) => new Promise((resolve, reject) => {
	if (isEslAuthenticationEnable()) {
		const loginData = {
			"loginID": email,
			"password": password,
			"reCaptcha": recaptchaValue
		};
		identityAuthentication(loginData, isDisableRecaptcha , headerCode , codeSocial).then(response => {
			setCookie('isLoggedIn', true, 1, true, false);
			resolve(response);
		}).catch(error => {
			deleteCookie('isLoggedIn');
			removeIsSocialLoginActiveFromSS(); // remove sessionStorage key on form render
			deleteIdentityInfo();
			reject(error);
		});
	} else {
		Auth.signIn(email, password, { captcha: recaptchaValue })
			.then(user => {
				//set cookie
				setCookie('isLoggedIn', true, 1, true, false);
				resolve(user);
			})
			.catch(error => {
				deleteCookie('isLoggedIn');
				removeIsSocialLoginActiveFromSS(); // remove sessionStorage key on form render
				reject(error);
			});
	}
});

// Sign out functionality
const signOut = (isGlobalSignout) =>
	new Promise((resolve, reject) => {
		if (isEslAuthenticationEnable()) {
			identitySessionSignOut().then(data =>{ 
				deleteIdentityInfo();
				deleteCookie('isLoggedIn');
				removeIsSocialLoginActiveFromSS(); // remove sessionStorage key on form render
				resolve(data)
			})
			.catch(error => {
				deleteCookie('isLoggedIn');
				deleteIdentityInfo();
				removeIsSocialLoginActiveFromSS(); // remove sessionStorage key on form render
				reject(error);
			});
		} else {
			Auth.signOut(isGlobalSignout ? { global: true } : {})
			.then(data => {
				deleteCookie('isLoggedIn');
				removeIsSocialLoginActiveFromSS(); // remove sessionStorage key on form render
				resolve(data);
			})
			.catch(error => {
				deleteCookie('isLoggedIn');
				removeIsSocialLoginActiveFromSS(); // remove sessionStorage key on form render
				reject(error);
			});
		}
		
	});

const changePassword = (oldPassword, newPassword) =>
	new Promise((resolve, reject) =>
		Auth.currentAuthenticatedUser()
			.then(user => {
				return Auth.changePassword(user, oldPassword, newPassword);
			})
			.then(resolve)
			.catch(reject)
	);

// check if current session is active
const getCurrentAuthenticatedUser = () =>
	new Promise((resolve, reject) => {
		if (isEslAuthenticationEnable()) {
			getIdentityAuthenticatedUserData()
				.then(userData => { 
					resolve(userData); 
				})
				.catch(error => {
					deleteCookie('isLoggedIn');
					removeIsSocialLoginActiveFromSS(); // remove sessionStorage key on form render
					deleteIdentityInfo();
					reject(error);
				});
		} else {
			Auth.currentAuthenticatedUser()
				.then(user => {
					setCookie('isLoggedIn', true, 1, true, false);
					resolve(user);
				})
				.catch(error => {
					deleteCookie('isLoggedIn');
					removeIsSocialLoginActiveFromSS(); // remove sessionStorage key on form render
					reject(error);
				})
		}
	});

const getJwtToken = () =>
	new Promise((resolve, reject) => {
		if (isEslAuthenticationEnable()) {
			getIdentityJwtToken()
				.then(token => { 
					resolve(token);
				})
				.catch(error => {
					deleteCookie('isLoggedIn');
					removeIsSocialLoginActiveFromSS(); // remove sessionStorage key on form render
					deleteIdentityInfo();
					reject(error);
				});
		} else {
			Auth.currentAuthenticatedUser()
				.then(user => resolve(user?.signInUserSession?.idToken?.jwtToken))
				.catch(error => {
					removeIsSocialLoginActiveFromSS(); // remove sessionStorage key on form render
					reject(error)
				});
		}
	}
	);

const getAccessToken = () =>
	new Promise((resolve, reject) =>{
		if (isEslAuthenticationEnable()) {
			getIdentityAccessToken()
					.then(token => { 
						resolve(token);
					})
					.catch(error => {
						deleteCookie('isLoggedIn');
						removeIsSocialLoginActiveFromSS(); // remove sessionStorage key on form render
						deleteIdentityInfo();
						reject(error);
					});
		} else {
			Auth.currentAuthenticatedUser()
				.then(user => resolve(user?.signInUserSession?.accessToken?.jwtToken))
				.catch(error => {
					removeIsSocialLoginActiveFromSS(); // remove sessionStorage key on form render
					reject(error)
				});
		}
	});

// it is necessary to transfer the provider name ('Facebook' or 'Google')
const getSocialResponse = async (provider) => {
	if (provider && isEslAuthenticationEnvConfigEnable) {
		if (isSocialLoginEnable) {
			const providerScope = SOCIAL_PROVIDER?.[provider?.toUpperCase()]?.SCOPE;
			const loginPageURL = getServiceEndPoint('login.page.path');
			window.location = getProviderEslUrl(provider, loginPageURL, providerScope, SOCIAL_PROVIDER.RESPONSE_TYPE);
		} else {
			setIsSocialLoginActiveFromSS();
			const socialResponse = await Auth.federatedSignIn({ provider });
			return socialResponse
		}
	} else {
		const socialResponse = await Auth.federatedSignIn({ provider });
		return socialResponse
	}
}

// all functions are exported
export {
	authenticateUser,
	changePassword,
	signOut,
	getSocialResponse,
	getCurrentAuthenticatedUser,
	getJwtToken,
	getAccessToken
};
