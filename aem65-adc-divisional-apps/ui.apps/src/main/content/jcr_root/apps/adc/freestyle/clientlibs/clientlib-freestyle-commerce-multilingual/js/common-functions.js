if (typeof getStorageKey === 'function') {
  getStorageKey = (key) => {
    let { 'x-country-code': countryCode } = getPageDataAttributes();
    countryCode = countryCode?.toLowerCase();

    return !!countryCode && key.indexOf(`_${countryCode}`) === -1 ? `${key}_${countryCode}` : key;
  };
}

if (typeof getLocalAuthContextName === 'function') {
  getLocalAuthContextName = () => getMultilingualLocalStorageKey(commonConst.AUTH_LOCAL_STORAGE);
}

if (typeof getLocalCommerceContextName === 'function') {
  getLocalCommerceContextName = () => getMultilingualLocalStorageKey(commonConst.COMMERCE_LOCAL_STORAGE);
}

typeof setSessionValues === 'function' && setSessionValues();
