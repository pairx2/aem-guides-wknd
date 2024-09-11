import axios from 'axios';
import commonConst from '../constants/commonConts';
import {
  bodyDatasets,
  eslConfigDatasets,
  getLocalContextStoreName,
  i18nErrorLookup,
  onAEMauthor,
  redirectUsertoLogin,
} from '../utils/common';

const { httpHeaders } = bodyDatasets();
const { eslEndpoint } = eslConfigDatasets();

const getPageDataAttributes = () => {
const customHttpHeaders = httpHeaders ? JSON.parse(httpHeaders) : {};
  return {
    'x-preferred-language': document.getElementsByName(
      'x-preferred-language'
    )[0]?.value,
    'x-country-code': document.getElementsByName('x-country-code')[0]?.value,
    'x-application-id': document.getElementsByName('x-application-id')[0]
      ?.value,
    'Content-Type': document.getElementsByName('x-content-type')[0]?.value,
    ...customHttpHeaders,
  };
};

const createRecaptha = () =>
  new Promise((res, rej) => {
    if (!document.querySelector('#recaptcha')) {
      const recaptchaScriptSrc = document
        .querySelector('body')
        .getAttribute('data-captcha-script-src');

      if (!recaptchaScriptSrc) {
        throw 'Recaptcha Script Undefined';
      }

      const script = document.createElement('script');
      script.src = recaptchaScriptSrc;
      script.id = 'recaptcha';
      document.head.appendChild(script);
    }

    if (typeof grecaptcha === 'object') {
      res(true);
    } else {
      const recaptchaDomScript = document.querySelector('#recaptcha');
      recaptchaDomScript.addEventListener(
        'load',
        function () {
          res(true);
        },
        { once: true }
      );
    }
  });

const getToken = async () => {
  const isGlobalEnterpriseRecaptchaEnabled = document.getElementsByName("enterpriseRecaptcha").length ? document.getElementsByName("enterpriseRecaptcha")[0].value : false;
  await createRecaptha();
  const recaptchaSiteKey = document
    .querySelector('[data-site-key]')
    .getAttribute('data-site-key');

  return new Promise((res, rej) => {
    if (isGlobalEnterpriseRecaptchaEnabled) {
      grecaptcha.enterprise.ready(() => {
        grecaptcha.enterprise
          .execute(recaptchaSiteKey, {
            action: 'submit',
          })
          .then((token) => {
            return res(token);
          });
      });
    } else {
      grecaptcha.ready(() => {
        grecaptcha
          .execute(recaptchaSiteKey, {
            action: 'submit',
          })
          .then((token) => {
            return res(token);
          });
      });
    }
  });
};

const fetchESLservice = async ({
  service,
  data,
  params,
  withRecaptcha = true,
  withRecaptchaOnHeader = false,
  addAuthHeaders,
  customHeaders,
  fullUrl,
  customMethod,
}) => {
  let authInfo =
    JSON.parse(
      localStorage.getItem(
        getLocalContextStoreName(commonConst.AUTH_LOCAL_STORAGE)
      ) || null
    ) || null;

  let headers = getPageDataAttributes();
  const url = fullUrl || eslEndpoint + service.url;
  const method = customMethod || service.method;

  // Add Auth headers
  if (addAuthHeaders) {
    headers = {
      ...headers,
      'x-id-token': authInfo?.jwtToken?.id_token,
      'x-ecom-token':
        authInfo?.accountInfo?.userInfo?.additionalProperties?.ecommToken,
    };
  }

  // Add any custom header needed
  if (customHeaders) {
    headers = { ...headers, ...customHeaders };
  }

  // If Recaptcha needs to be send in header
  if (withRecaptchaOnHeader) {
    const token = await getToken();
    headers = { ...headers, 'x-captcha-value': token };
  }

  const options = {
    url,
    headers,
    method,
    data,
    params,
  };

  if (withRecaptcha) {
    try {
      const token = await getToken();

      if (!options.data) {
        options.data = {};
      }

      options.data['g-recaptcha-response'] = token;
    } catch (error) {
      throw 'Failed to get Recaptcha token';
    }
  }

  try {
    const res = await axios(options);
    return res;
  } catch (e) {
    const status = e?.response?.status;

    // if unauthorized error, means user is not logged in anymore
    if (status === 401 && !onAEMauthor()) {
      redirectUsertoLogin();
    }

    throw new Error(e);
  }
};

const fetchGPQESLservice = async (service, data, addAuthHeaders) => {
  let authInfo =
    JSON.parse(
      localStorage.getItem(
        getLocalContextStoreName(commonConst.AUTH_LOCAL_STORAGE)
      ) || null
    ) || null;
  let headers = getPageDataAttributes();
  const { url, method } = service;

  // Add Auth headers
  if (addAuthHeaders) {
    headers = {
      ...headers,
      'x-id-token': authInfo?.jwtToken?.id_token,
      'x-ecom-token':
        authInfo?.accountInfo?.userInfo?.additionalProperties?.ecommToken,
    };
  }

  const options = {
    url: eslEndpoint + url,
    headers,
    method,
    data,
  };

  const response = await axios(options);
  if (response?.data?.status) {
    return response;
  }
  throw new Error(i18nErrorLookup(response?.data)?.response?.statusReason);
};

export { fetchESLservice, fetchGPQESLservice, getPageDataAttributes };
