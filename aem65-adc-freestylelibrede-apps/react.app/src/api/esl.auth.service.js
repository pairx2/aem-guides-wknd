import axios from "axios";
import { getAxiosEslCallOptions, getServiceEndPoint, httpRequestMethod, eslParams, cognitoParams } from "../utils/endpointUrl";
import { deleteCookie, setCookie } from "../utils/cookieUtils";

const IS_SOCIAL_LOGIN_ACTIVE = 'isSocialLoginActive';
const LS = window.localStorage;
export const ESL_SERVICE_ENDPOINT = {
  LOGIN: '/api/public/profile/login',
  EXTEND_SESSION: '/api/public/profile/extend-session',
  LOGOUT: '/api/private/profile/logout',
  OFFLINE_TO_ONLINE: '/api/public/lookup/user',
  REGISTER_USER: '/api/public/registration/register-user',
  CONFIRM_OFFLINE_CUSTOMER: '/api/public/profile/verify-account'
};

const serviceResponseKey = {
  ID_TOKEN: "id_token",
  JWT_TOKEN: "claims_token",
  REFRESH_TOKEN: "refresh_token",
  SUB: "sub",
  EXPIRY_IN: "expiry_in",
  EMAIL: "email",
  FIRST_NAME: "firstName",
  LAST_NAME: "lastName",
  USERNAME: "username",
  LOGIN_ATTEMPT: "loginAttempt",
  REQUEST_ID: "requestId",
  VERIFIED: "verified",
  CSA_USER_ID: 'csaUserId'
};
const storageKey = {
  SEPARATOR: ".",
  IDENTITY: "identity",
  ID_TOKEN: "idToken",
  JWT_TOKEN: "jwtToken",
  REFRESH_TOKEN: "refreshToken",
  USER_DATA: "userData",
  SUB: "sub",
  EXPIRY_IN: "expiryIn"
};
export const intervalTime = 60000;

const throwErrorText = {
  INVALID_REQUEST: "Identity: Invalid Request",
  SIGN_OUT_SUCCESS: "Identity: Sign out successful",
  INVALID_TOKEN: "Identity: Invalid Token"
}


const SOCIAL_PROVIDER = {
	RESPONSE_TYPE: 'code',
  FACEBOOK: {
    PROVIDER: 'Facebook',
    SCOPE: ['email', 'openid', 'profile', 'aws.cognito.signin.user.admin'].join(' '),
  },
  GOOGLE: {
    PROVIDER: 'Google',
    SCOPE:  ['email', 'openid', 'profile', 'aws.cognito.signin.user.admin'].join(' ')
  }
}

const isEslAuthenticationEnable = () => {
  try {
      return (getServiceEndPoint(eslParams.ENABLE_ESL_AUTHENTICATION) && !getIsSocialLoginActiveFromSS());
  } catch (error) {
    return false;
  }
}


const isSocialLoginEnable = getServiceEndPoint(eslParams.ENABLE_ESL_SOCIAL_LOGIN) ? getServiceEndPoint(eslParams.ENABLE_ESL_SOCIAL_LOGIN) : false;

const identityAuthentication = async (loginData, isDisableRecaptcha , headerCode , codeSocial) => {
  let headers = {}
  if (isDisableRecaptcha && headerCode) {
		headers = { "x-secret-header": headerCode }
  }
  if (codeSocial) {
    headers = { ...headers ,  "x-code-token" : codeSocial}
    loginData='';   
  }
    const options = {
    ...getAxiosEslCallOptions(
      ESL_SERVICE_ENDPOINT.LOGIN,
      httpRequestMethod.POST,
      null,
      headers
    ),
    data: loginData,
  };
  const userData = await axios.request(options).then(response => {
    if (response?.status == 200) {
      if (response?.data?.errorCode) {
        let error = { "errorCode": response?.data?.response?.i18nMessageKey, "errorMsg": response?.data?.response?.statusReason };
        throw (error);
      } else {
        const userInfo = _saveIdentityInfo(response?.data?.response);
        return userInfo;
      }
    } else {
      throw (throwErrorText.INVALID_REQUEST);
    }
  }).catch(error => {
    deleteIdentityInfo();
    throw (error);
  });
  return userData;
};

const identityExtendSession = async (claimsToken,refreshToken) => {
  const headers = { "x-id-token": claimsToken || _readFromStorage(storageKey.JWT_TOKEN)  };

  const options = {
    ...getAxiosEslCallOptions(
      ESL_SERVICE_ENDPOINT.EXTEND_SESSION,
      httpRequestMethod.POST,
      null,
      headers
    ),
    data: { "refresh_token": refreshToken || _readFromStorage(storageKey.REFRESH_TOKEN) },
  };
  const userData = await axios.request(options).then(response => {
    if (response?.status == 200) {
      if (response?.data?.errorCode) {
        deleteIdentityInfo();
        let error = { "errorCode": response?.data?.response?.i18nMessageKey, "errorMsg": response?.data?.response?.statusReason };
        throw (error);
      } else {
        let userDataResponse = response?.data?.response;
        if(!userDataResponse?.[serviceResponseKey.REFRESH_TOKEN] && !_readFromStorage(storageKey.REFRESH_TOKEN)  && refreshToken){
          userDataResponse[serviceResponseKey.REFRESH_TOKEN] = refreshToken;
        }
        setCookie('isLoggedIn', true, 1, true, false);
        return _saveIdentityInfo(userDataResponse);
      }
    } else {
      deleteIdentityInfo();
      throw (throwErrorText.INVALID_REQUEST);
    }
  }).catch(error => {
    deleteIdentityInfo();
    throw (error);
  });
  return userData;
};

const _getExpiryTime = (expiryIn = 0) => {
  let expiryTime = Date.now() + ((parseInt(expiryIn) - 5) * 1000); // subtract 5 sec and convert into mx sec 
  return expiryTime;
}

const _geCurrentStorageKey = () => {
  return LS.getItem(storageKey.IDENTITY) ? LS.getItem(storageKey.IDENTITY) : '';
};

const _saveCurrentStorageKey = (value) => {
  if (value) LS.setItem(storageKey.IDENTITY, value);
};

const _removeCurrentStorageKey = () => {
  LS.removeItem(storageKey.IDENTITY);
};

const _saveIdentityInfo = (userInfo) => {
  try {
    _saveCurrentStorageKey(userInfo?.[serviceResponseKey.SUB]);
    _storeIntoStorage(storageKey.ID_TOKEN, userInfo?.[serviceResponseKey.ID_TOKEN]);
    _storeIntoStorage(storageKey.JWT_TOKEN, userInfo?.[serviceResponseKey.JWT_TOKEN]);
    if (userInfo?.[serviceResponseKey.REFRESH_TOKEN]) {
    _storeIntoStorage(storageKey.REFRESH_TOKEN, userInfo?.[serviceResponseKey.REFRESH_TOKEN]);
    }

    const userData = {
      'attributes': {
        email: userInfo?.[serviceResponseKey.EMAIL],
        first_name: userInfo?.[serviceResponseKey.FIRST_NAME],
        last_name: userInfo?.[serviceResponseKey.LAST_NAME],
        login_attempt: userInfo?.[serviceResponseKey.LOGIN_ATTEMPT],
        username: userInfo?.[serviceResponseKey.USERNAME],
        sub: userInfo?.[serviceResponseKey.SUB],
        verified: userInfo?.[serviceResponseKey.VERIFIED],
        csaUserId: userInfo?.[serviceResponseKey.CSA_USER_ID]
      }
    };
    _storeIntoStorage(storageKey.USER_DATA, JSON.stringify(userData));

    const expiryIn = userInfo?.[serviceResponseKey.EXPIRY_IN];
    _storeIntoStorage(storageKey.EXPIRY_IN, _getExpiryTime(expiryIn));
    return _readIdentityAuthenticatedUserData();
  } catch (error) {
    deleteIdentityInfo();
    return false;
  }
};

const _storeIntoStorage = (key, value) => {
  if (_geCurrentStorageKey()) LS.setItem([storageKey.IDENTITY, _geCurrentStorageKey(), key].join(storageKey.SEPARATOR), value);
};

const deleteIdentityInfo = () => {
  deleteCookie('isLoggedIn');
  _removeFromStorage(storageKey.ID_TOKEN);
  _removeFromStorage(storageKey.JWT_TOKEN);
  _removeFromStorage(storageKey.REFRESH_TOKEN);
  _removeFromStorage(storageKey.USER_DATA);
  _removeFromStorage(storageKey.EXPIRY_IN);
  _removeCurrentStorageKey();
};

const _removeFromStorage = (key) => {
  LS.removeItem([storageKey.IDENTITY, _geCurrentStorageKey(), key].join(storageKey.SEPARATOR));
};

const _readFromStorage = (key) => {
  return _geCurrentStorageKey() ? LS.getItem([storageKey.IDENTITY, _geCurrentStorageKey(), key].join(storageKey.SEPARATOR)) : '';
};

const _isTokenActive = () => {
  let endReturn = false;
  if (_readFromStorage(storageKey.EXPIRY_IN) && parseInt(_readFromStorage(storageKey.EXPIRY_IN)) > Date.now()) {
    endReturn = true;
    extendSession = undefined;
    return endReturn;
  }
  return endReturn;
};

const _readIdentityAuthenticatedUserData = () => {
  let userData = JSON.parse(_readFromStorage(storageKey.USER_DATA));
  userData[storageKey.JWT_TOKEN] = _readFromStorage(storageKey.JWT_TOKEN);
  userData[storageKey.ID_TOKEN] = _readFromStorage(storageKey.ID_TOKEN);
  userData[storageKey.REFRESH_TOKEN] = _readFromStorage(storageKey.REFRESH_TOKEN);
  userData[storageKey.EXPIRY_IN] = _readFromStorage(storageKey.EXPIRY_IN);
  return userData;
};

const _signOutRequest = async () => {
  const headers = { 'x-id-token': _readFromStorage(storageKey.ID_TOKEN) }
  const options = {
    ...getAxiosEslCallOptions(
      ESL_SERVICE_ENDPOINT.LOGOUT,
      httpRequestMethod.POST,
      null,
      headers
    )
  };
  const userData = await axios.request(options).then(response => {
    deleteIdentityInfo();
    resolve(throwErrorText.SIGN_OUT_SUCCESS);
  }).catch(error => {
    deleteIdentityInfo();
    reject(error);
  });
  return userData;
};
let extendSession ;
const getIdentityAuthenticatedUserData = () => new Promise((resolve, reject) => {
  try {
    const userData = _readIdentityAuthenticatedUserData();
    if (userData[storageKey.JWT_TOKEN] && userData[storageKey.ID_TOKEN] && userData[storageKey.REFRESH_TOKEN] && userData[storageKey.EXPIRY_IN]) {
      if (_isTokenActive()) {
        resolve(userData);
      } else {
        if (!extendSession) {
          extendSession = identityExtendSession().then(promiseUserData => {
          return promiseUserData
          }).catch((error)=> {
            deleteIdentityInfo();
            reject(throwErrorText.INVALID_TOKEN);
          });
        } 
        extendSession.then((e)=> resolve(e)).catch((error)=> {
          deleteIdentityInfo();
          reject(throwErrorText.INVALID_TOKEN);
        })
       
      }
    } else {
      deleteIdentityInfo();
      reject(throwErrorText.INVALID_TOKEN);
    }
  } catch (error) {
    deleteIdentityInfo();
    reject(error);
  }
});


const getIdentityJwtToken = () => new Promise((resolve, reject) => {
  getIdentityAuthenticatedUserData()
    .then((userData) => {
      resolve(userData[storageKey.JWT_TOKEN]);
    })
    .catch(error => reject(error));
});

const getIdentityAccessToken = () => new Promise((resolve, reject) => {
  getIdentityAuthenticatedUserData()
    .then((userData) => {
      resolve(userData[storageKey.ID_TOKEN]);
    })
    .catch(error => reject(error));
});

const identitySessionSignOut = async () => {
  return await _signOutRequest()
    .then((result) => result)
    .catch((error) => error);
};

const identityImpersonateUser =(claimsToken, refreshToken) => new Promise((resolve, reject) => {
  try {
    deleteIdentityInfo(); //delete exiting session keys
    identityExtendSession(claimsToken,refreshToken).then(userData => {
      resolve(userData);
    }).catch((error)=> {
      reject(throwErrorText.INVALID_TOKEN);
    });
  } catch (error) {
    reject(throwErrorText.INVALID_TOKEN);
  }
});

const getIsSocialLoginActiveFromSS = () => {
  return sessionStorage.getItem(IS_SOCIAL_LOGIN_ACTIVE) ? sessionStorage.getItem(IS_SOCIAL_LOGIN_ACTIVE) : '';
};

const setIsSocialLoginActiveFromSS = () => {
  sessionStorage.setItem(IS_SOCIAL_LOGIN_ACTIVE, true);
};

const removeIsSocialLoginActiveFromSS = () => {
  sessionStorage.removeItem(IS_SOCIAL_LOGIN_ACTIVE);
};
const isAutoIdentityExtendSessionAllowed = () => {
  try {
    if (_geCurrentStorageKey()) {
      let userData = _readIdentityAuthenticatedUserData();
      if (userData[storageKey.JWT_TOKEN] && userData[storageKey.ID_TOKEN] && userData[storageKey.REFRESH_TOKEN] && userData[storageKey.EXPIRY_IN]) {
        if (_readFromStorage(storageKey.EXPIRY_IN) && (parseInt(_readFromStorage(storageKey.EXPIRY_IN)) - Date.now()) < intervalTime ) { // 2 min in milliseconds
          return true;
        }
      }
    }
    return false;
  } catch (error) {
    return false;
  }
}


const getProviderEslUrl = (provider, loginPageURL, providerScope, responseType) => {
	const congintoURL = getServiceEndPoint(cognitoParams.COGNITO_DOMAIN);
	const clientId = getServiceEndPoint(cognitoParams.COGNITO_CLIENT_APP_ID);
	let url = new URL('https://' + congintoURL + '/oauth2/authorize');
	url.searchParams.set('response_type', responseType);
	url.searchParams.set('client_id', clientId);
	url.searchParams.set('scope', providerScope);
	url.searchParams.set('redirect_uri', loginPageURL);
	url.searchParams.set('identity_provider', provider);
	return url.toString();
}

const isImpersonateSession = () => {
  const userData = _readIdentityAuthenticatedUserData();
  return userData?.['attributes']?.csaUserId && userData?.['attributes']?.csaUserId.length > 0;
};

export {
  identityAuthentication,
  deleteIdentityInfo,
  getIdentityAuthenticatedUserData,
  getIdentityJwtToken,
  getIdentityAccessToken,
  identitySessionSignOut,
  identityImpersonateUser,
  isEslAuthenticationEnable,
  getIsSocialLoginActiveFromSS,
  setIsSocialLoginActiveFromSS,
  removeIsSocialLoginActiveFromSS,
  isAutoIdentityExtendSessionAllowed,
  identityExtendSession,
  getProviderEslUrl,
  SOCIAL_PROVIDER,
  isSocialLoginEnable,
  isImpersonateSession
};
