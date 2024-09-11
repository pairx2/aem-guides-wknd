const storeDataSets = () => {
  return document.querySelector("#commerce-config")?.dataset || {};
};
window.storeDataSets = storeDataSets;

const getLocalAuthContextName = () => {
  const { storeView } = bodyDatasets();
  const siteAuthID = document.body.dataset?.siteAuthIdentifier;

  /**
   * @NOTE for determining the value of storeId:
   * - If commerce is ENABLED, use storeView (from the #commerce-config element)
   * - If commerce is DISABLED, look for the data-site-auth-identifier attribute (set via the site properties)
   * - If neither is set, fall back to using `undefined` for compatability purposes
   */
  const storeId = storeView || siteAuthID || undefined;

  return `${commonConst.AUTH_LOCAL_STORAGE}-${storeId}`;
};
window.getLocalAuthContextName = getLocalAuthContextName;

const getLocalCommerceContextName = () => {
  return commonConst.COMMERCE_LOCAL_STORAGE + "undefined";
};
window.getLocalCommerceContextName = getLocalCommerceContextName;

const bodyDatasets = () => {
  return document.querySelector("#commerce-config")?.dataset || {};
};
window.bodyDatasets = bodyDatasets;

const eslConfigDatasets = () => {
  return document.querySelector('#esl-config')?.dataset || {};
};
window.eslConfigDatasets = eslConfigDatasets;

const getLanguage = () => {
  return document.getElementsByName(
    "x-preferred-language"
  )[0]?.value;
}
window.getLanguage = getLanguage;

const getCountry = () => {
  return document.getElementsByName("x-country-code")[0]?.value;
}
window.getCountry = getCountry;

const getPageDataAttributes = () => {
  return {
    "x-preferred-language": getLanguage(),
    "x-country-code": getCountry(),
    "x-application-id":
      document.getElementsByName("x-application-id")[0]?.value,
  };
};
window.getPageDataAttributes = getPageDataAttributes;

const OnNaveCommLogoutSuccess = async (redirect) => {
  logout();
};
window.OnNaveCommLogoutSuccess = OnNaveCommLogoutSuccess;

export { eslConfigDatasets, getPageDataAttributes };
