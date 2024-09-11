const commonConst = {
  AUTH_LOCAL_STORAGE: "authInfo",
  COMMERCE_LOCAL_STORAGE: "commerceInfo",
  RESENT_EMAIL_STORAGE: "resendEmailVerification",
  SESSION_EXPIRED_MODAL: "session-expired-modal",
  EXTEND_SESSION_TIMESTAMP: "extend-session-time-stamp",
};
window.commonConst = commonConst;

const ESL_EPT = {
  SESSION: "/api/private/profile/session",
  EXTENDSESSION: "/api/private/profile/extend-session",
  GET_CART: "/api/private/order/cart",
  LOGOUT: "/api/private/profile/logout",
  SEARCH: "/quality/api/private/search/sitesearch",
  VERIFY: "/api/public/profile/verify-account",
  LOGIN: "/api/public/profile/login",
  RESEND_OTP: "/api/public/profile/login",
  LAB_PROFILE: "/api/private/lookup/laboratories",
  UPDATE_PROFILE: "/api/private/profile/update-profile-info",
  RESOURCE_USERS: "/api/private/profile/admin/resource-users",
  MY_INSTRUMENTS: "/quality/api/private/productcatalog",
  PINNING: "/quality/api/private/productcatalog",
  NICKNAMES: "/quality/api/private/productcatalog",
  ENTITLEMENTS_SERVICEPLAN: "/quality/api/private/productcatalog",
  SCORE_GSR_INSTRUMENTMAINTENANCE: "/quality/api/private/events",
  METRICS_GSR_UPTIME: "/quality/api/private/events",
  TICKET_DETAILS: "/quality/api/private/ticket",
  INSTRUMENT_TICKETS: "/quality/api/private/productcatalog",
  DOWNLOADS_JOB: "/quality/api/private/jobs",
  TICKET_COMMENTS: "/quality/api/private/ticket",
  USER_NOTIFICATIONS: "/api/private/notification/user-notifications",
  USER_SUBSCRIPTIONS: "/api/private/notification/user-preferences",
  SEARCH_USERS: "/api/private/profile/search-users",
  LAB_INCIDENTS: "/quality/api/private/productcatalog",
  FSR_DOWNLOAD: "/quality/api/private/lookup/getdocument",
  GET_CONTACTS: "/quality/api/private/ticket",
  SIGNED_URL: "/api/private/profile/signed-url",
  TICKET_OPERATIONHOUURS: "/quality/api/private/ticket",
  i18n: {
    method: 'GET',
    url: '/api/public/lookup/referencedata',
    queryParams: {
      referenceType: 'i18Message',
    },
  },
  i18nCountry: {
    method: 'GET',
    url: '/api/public/lookup/referencedata',
    queryParams: {
      referenceType: 'country',
    },
  }
};
window.ESL_EPT = ESL_EPT;

export { commonConst, ESL_EPT };