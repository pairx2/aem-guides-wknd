(function(EPD){

    EPD.Config = (function(){
        const REQUEST_HEADERS = {
            'content-type': 'application/json'
        };
        const AEM_CONFIG = {};

        // SET API ENDPOINTS
        const ENDPOINTS = {
            VERIFY_EMAIL: '/api/public/profile/verify-account',
            RESEND_EMAIL: '/api/public/profile/resend-verification-email'
        };

        /**
         * @function
         * Desc sets AEM CONFIGS from DOM Object
         */
        function setAemConfig(){
            let aemInputs = document.querySelectorAll('input[type=hidden][data-config]');

            aemInputs.forEach(function(input) {
                const name = input.getAttribute('name');
                AEM_CONFIG[name] = input.value;
            });
        }

        /**
         * @function
         * @desc Sets API headers for global use from site level configurations
         */
        function setApiHeaders() {
            const headerElms = document.querySelectorAll('input[data-header][type=hidden]');

            // Add configurations from site level settings
            headerElms.forEach(function(headerElm) {
                const name = headerElm.getAttribute('name').slice(2);
                const value = headerElm.value;
                REQUEST_HEADERS[name] = value;
            });
        }

        /**
         * @function
         * @desc prepends BASE URL to Endpoints
         */
        function addBaseUrltoEndpoints() {
            for (let endpoint in ENDPOINTS) {
                ENDPOINTS[endpoint] = AEM_CONFIG.API_BASE + ENDPOINTS[endpoint];
            }
        }

        /**
         * @function
         * @desc gets API headers based or param of all if nothing is passed
         * @param {String} key header-key (optional) 
         * @return {String/Object} key-based header or all the headers
         */
        function getRequestHeader(key) {
            if(key) {
                return REQUEST_HEADERS[key] || '';
            }

            // return all headers if no key is passed
            return REQUEST_HEADERS;
        }

        // DOM related executions
        document.addEventListener('DOMContentLoaded', function() {
            // Update headers for the API requests
            setApiHeaders();

            // get AEM Configts
            setAemConfig();

            // Note: this must be done post setAemConfig()
            addBaseUrltoEndpoints();
        });

        return {
            aemConfig: AEM_CONFIG,
            endpoints: ENDPOINTS,
            getRequestHeader: getRequestHeader
        };
    })();

})(window.EPD || (window.EPD = {}));

