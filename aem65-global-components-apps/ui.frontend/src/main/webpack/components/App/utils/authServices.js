import commonConst from '../constants/commonConts';
import { getPageDataAttributes } from '../services/eslService';
import { eslConfigDatasets, isAEMAuthor } from './common';

/**
 * Use the configured ESL url for local testing,
 * otherwise use the current site domain
 */
const getRequiredDomain = () => {
  const { eslEndpoint } = eslConfigDatasets();
  return window.location.hostname === 'localhost' || isAEMAuthor()
    ? eslEndpoint
    : window.location.origin;
};

window.setSession = async (enable) => {
  const authContext = JSON.parse(
    localStorage.getItem(getLocalAuthContextName())
  );

  const idToken = authContext?.jwtToken?.id_token;

  if (idToken) {
    const url = `${getRequiredDomain() + ESL_EPT?.SESSION}?enable=${Boolean(
      enable
    )}`;
    const headers = { ...getPageDataAttributes() };
    headers['x-id-token'] = idToken;

    const requestOptions = {
      method: 'GET',
      headers: {
        ...headers,
      },
    };
    const data = await fetch(url, requestOptions);
    const response = await data.json();

    // If setSession was called on falsy, clean extend session time stamp
    if (!enable) {
      localStorage.removeItem(commonConst.EXTEND_SESSION_TIMESTAMP);
    }

    return response;
  }
};

window.extendSession = async () => {
  const authContext = JSON.parse(
    localStorage.getItem(getLocalAuthContextName())
  );
  const idToken = authContext?.jwtToken?.id_token;
  const refreshToken = authContext?.jwtToken?.refresh_token;

  if (idToken && refreshToken) {
    const url = `${getRequiredDomain() + ESL_EPT?.EXTENDSESSION}`;
    const headers = { ...getPageDataAttributes() };
    headers['x-id-token'] = idToken;

    const requestOptions = {
      method: 'POST',
      headers: {
        ...headers,
      },
      body: JSON.stringify({
        refresh_token: refreshToken,
      }),
    };

    const data = await fetch(url, requestOptions);
    const response = await data.json();

    /*
     * Set timeStamp to be checked after {X} ammount of minutes to keep session open
     */
    localStorage.setItem(commonConst.EXTEND_SESSION_TIMESTAMP, Date.now());

    return response;
  }
};

/**
 * NOTE: `sendExtToken` is an optional parameter because NAV
 * requires extToken to be sent in the header, whereas Gravity does not
 */
window.logoutUser = async ({ sendExtToken } = { sendExtToken: false }) => {
  const authContext = JSON.parse(
    localStorage.getItem(getLocalAuthContextName())
  );
  const idToken = authContext?.jwtToken?.id_token;
  const refreshToken = authContext?.jwtToken?.refresh_token;
  const extToken =
    authContext?.accountInfo?.userInfo?.additionalProperties?.extToken;

  if ((!sendExtToken && idToken) || (sendExtToken && extToken && idToken)) {
    const { eslEndpoint } = eslConfigDatasets();
    const url = `${eslEndpoint + ESL_EPT?.LOGOUT}`;
    const headers = { ...getPageDataAttributes() };
    headers['x-id-token'] = idToken;

    if (sendExtToken) {
      headers['x-ext-token'] = extToken;
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        ...headers,
      },
      body: JSON.stringify({
        refresh_token: refreshToken,
      }),
    };
    try {
      const data = await fetch(url, requestOptions);
      const response = await data.json();

      return response;
    } catch (e) {
      console.error('ERROR: There was an error with logout call: ', e);
    }
  }
};

window.getCustomerCart = async () => {
  const authContext = JSON.parse(
    localStorage.getItem(getLocalAuthContextName())
  );
  const idToken = authContext?.jwtToken?.id_token;
  const ecomToken =
    authContext?.accountInfo?.userInfo?.additionalProperties?.ecommToken;

  if (idToken && ecomToken) {
    const { eslEndpoint } = eslConfigDatasets();
    const url = `${eslEndpoint + ESL_EPT?.GET_CART}`;

    const headers = { ...getPageDataAttributes() };
    headers['x-id-token'] = idToken;
    headers['x-ecom-token'] = ecomToken;

    const requestOptions = {
      method: 'GET',
      headers: {
        ...headers,
      },
    };
    const data = await fetch(url, requestOptions);
    const response = await data.json();
    const cart =
      response?.response?.data?.cart || response?.response?.data?.customerCart;
    const commerceContext = JSON.parse(
      localStorage.getItem(getLocalCommerceContextName())
    );

    if (cart?.id) {
      localStorage.setItem(
        getLocalCommerceContextName(),
        JSON.stringify({
          ...commerceContext,
          cart,
        })
      );
    }

    return response;
  }
};
