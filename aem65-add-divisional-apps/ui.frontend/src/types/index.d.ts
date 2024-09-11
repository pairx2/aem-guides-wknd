export {};
declare global {
    interface Window {
        addLabProfile?: any;
        removeLabProfile?: any;
        changePrimaryLabProfile?: any;
        getPageDataAttributes?: any;
        getCookie?: any;
        staleLabProfiles?: any;
        lang?: any;
        getLanguage?: any;
        getCountry?: any;
        adobeDataLayer?: any;
        addAnalytics?: any;
        fireAnalyticsEvent?: any;
        loadSelectedLabProfiles?: any;
        showApiError?: any;
    }
}