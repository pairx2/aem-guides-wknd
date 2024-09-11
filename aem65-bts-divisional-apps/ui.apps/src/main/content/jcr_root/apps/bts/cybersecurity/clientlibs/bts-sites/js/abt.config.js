/**
 * @module
 * @desc Configuration Module
 */

(function(ABT){

    ABT.Config = (function(){
        const REQUEST_HEADERS = {
            'Content-Type': 'application/json'
        };
        const AEM_CONFIG = {};

        // SET API ENDPOINTS
        const ENDPOINTS = {
            RESEND_OTP              : '/api/public/profile/otp',
            LOGOUT                  : '/api/private/profile/logout',
            UPDATE_PROFILE          : '/api/private/profile/update-profile-info',
            CREATE_SESSION_COOKIE   : '/api/private/profile/session',
            EXTEND_TOKEN            : '/api/private/profile/extend-session',
            LIST_FAVORITES          : '/api/private/profile/favorites',
            GET_DOCUMENT_DETAILS    : '/api/private/lookup/getdocument',
            GET_PRODUCTS_LIST       : '/api/private/search/sitesearch',
            UPDATE_USER      		: '/api/private/profile/admin/update-user',
            USER_GROUPS				: '/api/private/profile/admin/usergroups',
            ADD_NEW_USER			: '/api/private/registration/register-new',
            GET_ACTIVE_PROD_LIST    : '/api/private/products',
            EXPORT_USER_REPORT      : '/api/private/profile/search-users',
            PROFILE_LOGIN           :  '/api/public/profile/login',
            DOWNLOAD_DOCUMENT       :  '/api/private/lookup/getdocument?enable=true',
            REACTIVATE_USER			: '/api/private/profile/deactivate-account',
            USER_NOTIFICATIONS      : '/api/private/notification/user-notifications',
            PRODUCT_METADATA        : '/api/private/getproductmetadata',
            VSI_METADATA            : '/api/private/getVSIMetadata'
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
                const name = headerElm.getAttribute('name');
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
                
                // if complete URL with host, skip prepending Base-URL
                if(ENDPOINTS[endpoint].includes('//') || endpoint === 'CREATE_SESSION_COOKIE') {
                    continue;
                }

                // Prepend Base URL
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

})(window.ABT || (window.ABT = {}));

