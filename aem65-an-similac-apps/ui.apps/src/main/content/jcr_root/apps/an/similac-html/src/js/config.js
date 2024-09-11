(function (win) {
  if(!win.ABBOTT){
      win.ABBOTT = {};
  }
  var ABBOTT = win.ABBOTT;
  ABBOTT.config = (function () {
    // URL list
    var API_URLs = {
      BASE: jQuery("#store-base-url").val(),
      STORE: jQuery("#store-name").val(),
      BASESECURE: jQuery("#page-store-url").val(),
      GRAPH_QL: "/graphql",
     //SECRETKEY: jQuery("#x-origin-secret").val(),
    };

    /**
     * @function
     * @desc returns URL based on rules
     * @param {String} endpointName key name from API_URLs object
     * @param {String} store Store name
     * @return {String} Endpoint URL String
     */
    function getEndpointUrl(endpointName) {
      var baseUrl = API_URLs.BASE,
        endpointUrl;

      // Error
      if (!baseUrl) {
        return new Error("Base URL not available for the store!!");
      }

      // Get Base URL
      if (endpointName === "BASE") {
        endpointUrl = baseUrl;
      } else if (API_URLs[endpointName]) {
        endpointUrl = baseUrl + API_URLs[endpointName];
      } else {
        console.warn("Endpoint URL not available");
        endpointUrl = null;
      }

      // final API URL
      return endpointUrl;
    }

    // Exposed assets
    return {
      getEndpointUrl: getEndpointUrl,
      storeName: API_URLs.STORE,
      storeUrl:API_URLs.BASE,
      storeSecureUrl: API_URLs.BASESECURE,
    //  secretKey: API_URLs.SECRETKEY
    };
  })();
})(window);
