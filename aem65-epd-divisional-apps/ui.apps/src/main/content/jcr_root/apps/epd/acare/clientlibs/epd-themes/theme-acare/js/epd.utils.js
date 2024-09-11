/**
 * Utils Class
 */
 
(function(EPD){

    /**
     * @property
     * @desc Namespaced property for readable Utils
     */
    EPD.Utils = (function(){

        /**
         * @function
         * @desc checks if user is logged in and yes, returns user info in object format
         * @return {Object} User info
         */
        function getUser(key) {
            const userString = localStorage.getItem('user');
            let user = null;

            if(userString) {
                user = JSON.parse(userString);
                user.token = localStorage.getItem('id.token');
            }

            if(key && user) {
                return user[key];
            } else {
                return user;
            }
        }

        /**
         * @function
         * @desc moves success & error elements after title in the form
         * @param {HTML_ELEMENT} $form
         */
        function moveFormMessageElm($form) {
            const $container = $form.querySelector('.o-form-container__element');
            const $successElm = $container.querySelector('.o-form-container__success-msg');
            const $errorElm = $container.querySelector('.o-form-container__error-msg');
            const $innerContainer = $container.querySelector('.form-container');
            const $title = $innerContainer.querySelector('.title');

            // move success & error elements after title
            if($title) {
                $title.after($errorElm);
                $title.after($successElm);
            } else {
                $innerContainer.prepend($errorElm);
                $innerContainer.prepend($successElm);
            }
            
        }

        /**
         * @function
         * @desc gets user friendly error message by API response Error Code
         * @param {Object} response response object in case of Error (expects i18nMessageKey & statusReason keys)
         * @return {String} User friendly Error Message
         */
        function getErrorMessageByCode(response) {
            const errorCode = response.i18nMessageKey;
            let errorMessage;

            if(window.Granite && Granite.I18n && Granite.I18n.get) {
                errorMessage = Granite.I18n.get(errorCode);
            }

            return errorMessage || response.statusReason || 'Some problem occured!';
        }

        /**
         * @function
         * @desc gets query param from url
         * @param {String} param name of param for which we want value
         * @param {String} searchQuery query from which param value is to get
         * @return {String} param value from query string
         */
        function getQueryParam(param, searchQuery) {            
            searchQuery = searchQuery || window.location.search || window.location.hash.slice(1);
            const queryList = searchQuery.substr(1).split('&');
            const resetToken = window.location.href.split("?token=")[1];
            let queryObj = {};

            if (!queryList || queryList.length == 0) { 
                return ''; 
            }

            for (let i = 0; i < queryList.length; ++i)
            {
                let query = queryList[i].split('=', 2);
                if (query.length == 1) {
                    queryObj[query[0]] = '';
                } else {
                    queryObj[query[0]] = decodeURIComponent(query[1].replace(/\+/g, ' '));
                }    
            }
            return queryObj[param] || '' || resetToken;
        }

        // Exposed methods/properties
        return {
            getErrorByCode: getErrorMessageByCode,
            moveFormMessageElm: moveFormMessageElm,
            getUser: getUser,
            getQueryParam: getQueryParam
        };
    })();


})(window.EPD || (window.EPD = {}));