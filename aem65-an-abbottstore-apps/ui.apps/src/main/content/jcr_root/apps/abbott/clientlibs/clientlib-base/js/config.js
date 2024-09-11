(function(ABBOTT){
    ABBOTT.config = (function(){

        // Key-Store
        var KEY = {
            googleCaptcha: jQuery('#siteKey').val()
        };

        /**
         * @function
         * @desc Secret Key providers for 3rd party vendors
         * @param {String} keyName Name of the vendor to get the key
         * @return {String} Key Value 
         */
        function getKey(keyName) {
            if(!KEY[keyName]) {
                console.warn('Key with name ' + keyName + ' not found!');
                return '';
            }

            return KEY[keyName];
        }

        // URL list
        var API_URLs = {
            BASE: jQuery("#store-base-url").val(),
            GRAPH_QL: '/graphql'
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
            if(!baseUrl) {
                return new Error('Base URL not available for the store!!');
            }

            // Get Base URL
            if(endpointName === 'BASE') {
                endpointUrl = baseUrl;
            } else if(API_URLs[endpointName]) {
                endpointUrl = baseUrl + API_URLs[endpointName];
            } else {
                console.warn('Endpoint URL not available');
                endpointUrl = null;
            }

            // final API URL
            return endpointUrl;
        }

        // Exposed assets
        return {
            getEndpointUrl: getEndpointUrl,
            getKey: getKey
        }
        
    })();
})(window.ABBOTT || (window.ABBOTT = {}));
