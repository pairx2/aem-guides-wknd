const getMultilingualLocalStorageKey = (localStorageName) => {
    const { 'x-application-id': applicationId, 'x-country-code': countryCode } = getPageDataAttributes();
  
    return `${localStorageName}-${applicationId}-${countryCode.toLowerCase()}`;
};