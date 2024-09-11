window.adobeDataLayer = window.adobeDataLayer || [];

window.addAnalytics = window.addAnalytics || {};
window.addAnalytics.fireAnalyticsEvent = (eventName, eventObj) => {
  // format object to push
  const dlObj = {
    "event" : eventName,
    "siteLanguage" : window.getLanguage(),
    ...eventObj
  }
  window.adobeDataLayer.push(dlObj);
}

// formats the lab object for analytics events
window.addAnalytics.getAnalyticsLabProfileObj = () => {
  const selectedLabProfile = window.loadSelectedLabProfiles();
  return {
    "lab" : {
      "labId" : selectedLabProfile?.labProfileId,
      "labType" : (selectedLabProfile?.primary == "true" ? "primary" : "not_primary")
    }
  };
}

// only call when a user is logged in
window.addAnalytics.getAnalyticsUserObj = () => {
  const userRole = localStorage.getItem('role');
  return {
    "user": {
      "userRole": (userRole == "employee" ? "employee" : "customer"),
      "userLoginStatus": "authenticated"
    }
  };
}