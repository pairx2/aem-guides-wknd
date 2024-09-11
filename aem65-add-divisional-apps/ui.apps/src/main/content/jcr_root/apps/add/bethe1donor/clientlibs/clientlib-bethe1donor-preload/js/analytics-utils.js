window.adobeDataLayer = window.adobeDataLayer || [];

window.addAnalytics = window.addAnalytics || {};
window.addAnalytics.fireAnalyticsEvent = (eventName, eventObj) => {
  // format object to push
  const dlObj = {
    category: {
      primaryCategory: eventName,
             },
    eventInfo: eventObj  
  }
  window.adobeDataLayer.event = dlObj;

}