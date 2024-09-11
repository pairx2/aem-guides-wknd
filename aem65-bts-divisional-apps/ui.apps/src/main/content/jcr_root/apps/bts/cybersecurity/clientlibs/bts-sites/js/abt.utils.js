/**
 * @module
 * @desc Utility Module
 */
(function(ABT){

    /**
     * @property
     * @desc Namespaced property for readable Utils
     */
    ABT.Utils = (function(){

        /**
         * @function
         * @desc saves temp data in some HTML dome as dataset
         * @param {Object/String} dataset dataset-key or dataset-object
         * @param {*} value data-value in case of one key
         */
        function saveTempData(dataset, value) {
            const $dataCenter = document.querySelector('.root');

            // works in case of setting one key at a time
            if(typeof dataset === 'string' && value) {
                $dataCenter.dataset[dataset] = value;
                return;
            }

            // works with key-pair object to set multiple items at a time
            if(dataset instanceof Object) {
                for(let key in dataset) {
                    $dataCenter.dataset[key] = dataset[key];
                }
            }
        }

        /**
         * @function
         * @desc fetches temp data
         * @param {String} key data-key
         */
        function fetchTempData(key) {
            const $dataCenter = document.querySelector('.root');

            if(key) {
                return $dataCenter.dataset[key];
            }
        }

        /**
         * @function
         * @desc checks if user is logged in and yes, returns user info in object format
         * @return {Object} User info
         */
        function getUser(key) {
            let userString = sessionStorage.getItem('user') || localStorage.getItem('user');
            let user = null;

            // if user info is malformed, clear it
            if(userString === 'null') {
                userString = null;
                sessionStorage.removeItem('user');
                localStorage.removeItem('user');
            }

            if(userString) {
                user = JSON.parse(userString) || {};
                user.token = sessionStorage.getItem('id.token') || localStorage.getItem('id.token');
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

            return errorMessage || response.statusReason || 'Some error occured, please try again!';
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
            return queryObj[param] || '';
        }

        /**
         * @function
         * @desc change date format
         * @param {String} dateString string having date time value
         * @return {String} formated date
         */
        function formatDate(dateString) {
            if(!dateString){
                return '';
            }

            try {
                let dateValue = new Date(dateString);
                const formatOptions = {
                    month: 'short', 
                    day: '2-digit',
                    year: 'numeric'
                }

                let formatedDate = Intl.DateTimeFormat('en-us', formatOptions).format(dateValue);

                return formatedDate;
            } catch(err) {
                console.error('Could not convert ' + dateString + ' to Date object.');
                return '';
            }
            
        }

        /**
         * @method
         * @desc attach events to multiple elements
         * @param {Object} eleList list of elements to which event is being attached
         * @param {String} event type of event 
         * @param {Function} eventHandler function to call on event  
         */
        function attachEventToElementList(elmList, event, eventHandler) {
            if(!elmList) {
                return;
            }

            elmList.forEach(function(elm) {
                elm.addEventListener(event, eventHandler);
            });
        }

        /**
         * @method
         * @desc add dynamic values in template
         * @param {Object} template html template to be modified
         * @param {Object} variables key value pair for content to replace with dynamic data
         * @param {Boolean} doubleBraces Will placeholders have single brace of double brace
         * @return {String} outputHTML final html generated after replacing it with dynamic values   
         */
        function generateTemplate(template, variables, doubleBraces = false) {
            let outputHTML = template;

            for (let key in variables) {
                const regex = doubleBraces ? new RegExp('\{\{' + key + '\}\}', 'g') : new RegExp('\{' + key + '\}', 'g');
                outputHTML = outputHTML.replace(regex, variables[key]);
            }

            outputHTML = outputHTML.replaceAll('data-href', 'href');

            return outputHTML;
        }

        /**
         * @function
         * @desc parses JWT token
         * @param {String} token token string
         * @return {Object} parset token value in readable format
         */
        function parseJwt (token) {
            if(!token) {
                return {};
            }

            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        
            return JSON.parse(jsonPayload);
        }

        /**
         * @function
         * @desc saves the user preference to browser and database
         * @param {string} type preference-type
         * @param {string} value preference value
         */
        function setUserPreference(type, value) {
            let preferences = localStorage.getItem('preferences');
            preferences = preferences ? JSON.parse(preferences) : {};
            preferences[type] = value;

            // save to browser
            localStorage.setItem('preferences', JSON.stringify(preferences));

            // save to profile
            return ABT.Http({
                url: ABT.Config.endpoints.UPDATE_PROFILE,
                params: {
                    userInfo: {
                        additionalProperties : {
                            data: {
                                preferences: preferences
                            }
                        }
                    }
                } 
            });
        }

        /**
         * @function
         * @desc get user preference by type from browser
         * @param {string} type 
         */
        function getUserPreference(type) {
            let preferences = localStorage.getItem('preferences');
            preferences = preferences ? JSON.parse(preferences) : {};
            let value = preferences[type];

            // set default viewBy value
            if(type === 'preference' && !value) {
                value = 'grid';
            }

            return value;
        }

        /**
         * @function
         * @desc checks if current page is login page
         */
        function isLoginPage() {
            // entire path
            let url = location.href;

            // remove query string
            url = url.split('?')[0];

            // remove hash
            url = url.split('#')[0];

            // validate if login page
            return url === ABT.Config.aemConfig.SIGNIN_PAGE_URL;
        }

        /**
         * @function
         * @desc function to check if page isOnPublish mode
         */
        function isOnPublish() {
            return $(`#wcmMode`).val() === 'false';
        }

        /**
         * @function
         * @desc Convert consent array set to plain Array of consent names that has consent value as true
         * @param {Object[]} consentDataset consent Array with object of consentName and consentValue
         */
        function consentSetToArray(consentDataset) {
            if (consentDataset.length) {
                let consentArray = [];
                for (let consent of consentDataset) {
                    consent.consentValue && consentArray.push(consent.consentName);
                }
                return consentArray;
            } else {
                return [];
            }
        }

        /**
         * @function
         * @desc From the list of checkbox data, filter out the data that match the search field entered value
         * @param {JQuery<HTMLInputElement>} searchField search input field
         * @param {JQuery<HTMLElement>} checkboxOptionsSet options component that has checkboxes configured
         */
        function searchFilterToCheckbox(searchField, checkboxOptionsSet) {
            searchField.on('keyup input', function () {
                let searchText = $(this).val().trim().toLowerCase();
                checkboxOptionsSet.find('.a-checkbox').filter(function() {
                    $(this).toggle($(this).find('.a-checkbox__text').text().trim().toLowerCase().indexOf(searchText) > -1);
                });
            });
        }

        /**
         * @function
         * @desc Function to convert user entered date (YYYY-MM-DD) and local time (HH:MM:SS) to UTC Date in format of (YYYY-MM-DD)
         * @param {string} dateEntered search input field
         * @return {string} return UTC date in YYYY-MM-DD format
         */
        function convertDateToUTC(dateEntered) {
            if (!dateEntered || !dateEntered.length) {
                return "";
            }
            let dateEnteredInDate = new Date(dateEntered);
            let dateEnteredString = `${dateEnteredInDate.getMonth() + 1}-${dateEnteredInDate.getDate()}-${dateEnteredInDate.getFullYear()}`;
            let localCurrentDate = new Date();
            let timeString = `${localCurrentDate.getHours()}:${localCurrentDate.getMinutes()}:${localCurrentDate.getSeconds()}`;
            let UTCTimeString = dateEnteredString + ' ' + timeString;
            let enteredDateToUTC = new Date(UTCTimeString).toUTCString();
            enteredDateToUTC = new Date(enteredDateToUTC.replace(' GMT', ''));
            let UTCDateInYYYYMMDD = `${enteredDateToUTC.getFullYear()}-${("0" + (enteredDateToUTC.getMonth() + 1)).slice(-2)}-${("0" + enteredDateToUTC.getDate()).slice(-2) }`;
            return UTCDateInYYYYMMDD;
        }

        /**
         * @method
         * @desc Insert counter code / update count number in Header
         * @param Count count number
         */
        function displayNotificationCounter(count, headerNotificationLink) {
            if (+count > 0) {
                if (headerNotificationLink.length && headerNotificationLink.find('.a-counter').length == 0) {
                    headerNotificationLink.append(`
                <span class="a-counter"><span class="a-counter--number">${count}</span></span>
              `);
                } else {
                    headerNotificationLink.find('.a-counter--number').text(count);
                }
            } else {
                let counterHTML = headerNotificationLink.find('.a-counter');
                counterHTML.length && counterHTML.remove();
            }
        }

        /**
         * @method
         * @desc Function that can be used to sort customtable data based on any column in ascending/descending order
         * @param colHeading jQuery<HTMLElement> of Column th based on which sorting to be performed
         * @param ascOrder true (default value) for ascending order, false for descending order
         * @param scrollTop true (default value) to scroll the page to the top and remove focus on table column header
         */
        function selectTableColSorting(colHeading, ascOrder = true, scrollTop = true) {
            setTimeout(function () {
                colHeading.trigger('click');
                !ascOrder && colHeading.trigger('click');
                scrollTop && window.scrollTo(0, 0);
            }, 500);
        }

        /**
         * @method
         * @desc Function that can be used to scroll the page to a specific element position
         * @param scrollToEle jQuery<HTMLElement> Element to which page has to be scrolled
         */
        function scrollPageTo(scrollToEle) {
            let headerEle = $('.header .o-header-v2-global .o-header-v2-global__sticky-section');
            let headerHeight = headerEle.length ? headerEle.outerHeight() : 0;

            $('html, body').animate({
                scrollTop: scrollToEle.offset().top - headerHeight
            }, 600);
        }

        /**
         * @method
         * @desc Function convert blob url to base64 string
         * @param blobUrl Blob Url - String
         * @param postBase64ConvertionFunc callback function
         */
        async function convertBlobToBase64(blobUrl, postBase64ConvertionFunc) {
            if (blobUrl?.length) {
                const blobObj = await fetch(blobUrl).then(b => b.blob());
                let fileReaders = new FileReader();
                fileReaders.readAsDataURL(blobObj);
                fileReaders.onloadend = function () {
                    if (typeof postBase64ConvertionFunc == 'function') {
                        postBase64ConvertionFunc(fileReaders.result);
                    }
                }
            }
        }

        // Exposed methods/properties
        return {
            getErrorByCode: getErrorMessageByCode,
            moveFormMessageElm: moveFormMessageElm,
            getUser: getUser,
            getQueryParam: getQueryParam,
            formatDate: formatDate,
            attachEventToElementList: attachEventToElementList,
            generateTemplate: generateTemplate,
            tempData: {
                set: saveTempData,
                get: fetchTempData
            },
            parseJwt: parseJwt,
            userPreference: {
                set: setUserPreference,
                get: getUserPreference
            },
            isLoginPage: isLoginPage,
            isOnPublish: isOnPublish,
            consentSetToArray: consentSetToArray,
            searchFilterToCheckbox: searchFilterToCheckbox,
            convertDateToUTC: convertDateToUTC,
            displayNotificationCounter: displayNotificationCounter,
            selectTableColSorting: selectTableColSorting,
            scrollPageTo: scrollPageTo,
            convertBlobToBase64: convertBlobToBase64
        };
    })();

})(window.ABT || (window.ABT = {}));