/**
 * @module
 * @desc User Session Management Module
 */

(function (ABT) {

    // DOM related executions
    document.addEventListener('DOMContentLoaded', function () {
		
	    if (document.querySelector('input[value="cybersecadmin"]') == null) {


        const $logoutLink = document.querySelector('.header .o-header-v2-global__section--utility-bottom .m-link-stack__list-item .a-link__text');
        const $sessionModal = document.querySelector('#session-modal');
        const $terminateSessionButton = $sessionModal?.querySelector('#session-modal-terminate .btn');
        const $extendSessionButton = $sessionModal?.querySelector('#session-modal-extend .btn');
        const activityEvents = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];

        // since we are also tracking mousemove activity which can occure more than 100 times in each second,
        // we will put a thresold of maximum 3 occurance in each second
        // and hence will track activity only if below flag (avoidActivityTracking) is set to false
        let pauseActivityTracking = false;

        let inactivityInterval = null;
        let sessionInterval = null;
        let popupInterval = null;

        const INACTIVITY_TIME = $sessionModal?.dataset?.inactivityTime || 8; // in minutes
        const POPUP_TIME = $sessionModal?.dataset?.popupTime || 2; // in minutes

        /**
         * @function
         * @desc find Event Button from Event Path
         * @param {Event} event event-object
         */
        function getEventButton(event) {
            // event path
            const path = event?.path || event?.composedPath?.();

            // find button from event path
            return path?.find(elm => elm.tagName === 'BUTTON');
        }

        /**
         * @function
         * @desc remove session cookie
         * @param {boolean} isCreate if session cookie has to be created or removed. if not passed, it will remove 
         * @return {Promise} Fetch Promise
         */
        function updateSessionCookie(isCreate, eventElm) {
            return ABT.Http({
                method: 'GET',
                url: ABT.Config.endpoints.CREATE_SESSION_COOKIE,
                params: {
                    enable: !!isCreate
                }
            }, eventElm);
        }

        /**
         * @function
         * @desc event handler on logout click
         * @param {Object} response 
         */
        function onLogout(response, isForcedLogout) {
            if (response && response.errorCode === 0) {

                // communicate to other tabs (if any) to logout
                localStorage.setItem('logout', 'do');

                // clear user session info
                localStorage.clear();
                sessionStorage.clear();

                // redirect user to sign in page
                redirectToSignin(isForcedLogout);
            } else {
                // do nothing, API error handling will be done on Platform level
            }
        }

        /**
         * @method
         * @desc makes local storage empty and redirects to home page 
         */
        function logout(elm) {
            // if the button is disabled, do nothing
            if(!elm.classList.contains('disabled')) {
                return ABT.Http({
                    url: ABT.Config.endpoints.LOGOUT,
                    method: 'POST',
                    headers: {
                        'x-id-token': sessionStorage.getItem('id.token')
                    }
                }, elm);
            }
        }

        /**
         * @function
         * @desc initiates logout - first clears session cookies and then session token
         * @param {Event} event Optional user event
         */
        function initLogout(event) {
            event = event || {}; // for object checks
            event?.preventDefault?.(); // depends on calling method
            stopInterval(popupInterval);

            const eventButton = getEventButton(event);

            updateSessionCookie(false, eventButton)
                .then(function(){
                    return logout(eventButton);
                })
                .then(function(response) {
                    onLogout(response, event.isForcedLogout);
                })
                .catch(function(err){
                    // fallback logout
                    localStorage.clear(err);
                    sessionStorage.clear();
                    redirectToSignin(event.isForcedLogout);
                });
        }

        /**
         * @function
         * @desc starts session interval to extend the token if about to expire
         */
        function startSessionInterval() {
            const token = ABT.Utils.getUser('token');

            // if tlen not found, do nothing
            if(!token) {
                return;
            }

            const parsedToken = ABT.Utils.parseJwt(token);
            const tokenExpiry = Math.abs(parsedToken.exp - parsedToken.iat); // in seconds
            const INTERVAL_TIME = (tokenExpiry - 120) * 1000; // in milliseconds

            // stop if already exists
            stopInterval(sessionInterval);

            // set interval
            sessionInterval = setInterval(function() {
                stopInterval(sessionInterval);
                stopInterval(inactivityInterval);
                renewToken();
            }, INTERVAL_TIME);
        }

        /**
         * @function
         * @desc starts inactivity interval
         * @param {Event} event last even by which user was active with
         */
        function startInactivityInterval() {

            // if interval exists, stop if exists
            stopInterval(inactivityInterval);

            // start inactivity interval
            inactivityInterval = setInterval(function () {
                stopInterval(inactivityInterval); // stop inactivity interval
                disableActivityTracking(); // stop inactivity tracking
                $sessionModal.classList.add('show'); // show modal with timer

                //
                startPopupTimer(function() {
                    stopInterval(popupInterval);
                    stopInterval(inactivityInterval);
                    initLogout({isForcedLogout: true});
                });

            }, INACTIVITY_TIME * 60 * 1000);
        }

        /**
         * @function
         * @desc starts popup timer with an onComplete callback option, also runs immediately once
         * @param {fuction} onComplete onComplete Callback
         */
        function startPopupTimer(onComplete) {
            const $minEl = $sessionModal.querySelector('.timer__min');
            const $secEl = $sessionModal.querySelector('.timer__sec');
            let ttl = POPUP_TIME * 60; // in seconds

            // if interval exists, stop
            stopInterval(popupInterval);

            // start popup interval
            popupInterval = setInterval((function intervalRunner() {
                const remainingTime = {
                    min: Math.floor(ttl / 60),
                    sec: ttl % 60
                };

                // update remaining time in timer
                $minEl.innerText = remainingTime.min;
                $secEl.innerText = remainingTime.sec > 9 ? remainingTime.sec : '0' + remainingTime.sec;

                // reduce the timer by 1
                ttl -= 1;

                // on-complete action
                if(ttl < 0) {
                    stopInterval(popupInterval);
                    onComplete();
                }

                //
                return intervalRunner;
            })(), 1000);
        }

        /**
         * @function
         * @desc clears interval if set
         * @param {number} interval interval-id (nullable)
         */
        function stopInterval(interval) {
            if (interval) {
                clearInterval(interval);
            }
        }

        /**
         * @function
         * @desc redirects to signin page based on calling method
         * @param {boolean} isForcedLogout if it is a forced logout, adds a query string to signin page URL
         */
        function redirectToSignin(isForcedLogout) {
            let targetPage = ABT.Config.aemConfig.SIGNIN_PAGE_URL;

            if (isForcedLogout) {
                targetPage += '?type=FL'; // FL => Forced Logout
            }

            !isForcedLogout && history.pushState(null, null, targetPage);

            // Check and delete disclaimer banner cookie on logout
            let countryCode = $('input[type="hidden"][name="x-country-code"]').val();
            let langCode = $('input[type="hidden"][name="x-preferred-language"]').val();
            let fdsBannerCookie = getCookie(`fdsCookies_${countryCode}_${langCode}`);
            fdsBannerCookie && deleteCookie(`fdsCookies_${countryCode}_${langCode}`);

            // redirect
            location.assign(targetPage);
        }

        /**
         * @function
         * @desc starts tracking user activity
         */
        function enableActivityTracking() {
            activityEvents.map(eventType => document.addEventListener(eventType, function(event) {
                
                // ignore event if below flag is set to true
                if (pauseActivityTracking) {
                    return;
                }
                  
                // update localStorage to communicate other tabs about user activity
                const now = Date.now();
                localStorage.setItem('user.resetInactivityInterval', now);

                // act on event in current tab
                startInactivityInterval();

                // stop event tracking now
                pauseActivityTracking = true;

                // after 300 millseconds, allow events again
                setTimeout(function() {
                    pauseActivityTracking = false;
                }, 300);
            }, true));
        }

        /**
         * @function
         * @desc stops tracking user activity
         */
        function disableActivityTracking() {
            activityEvents.map(eventType => document.removeEventListener(eventType, startInactivityInterval, true));
        }

        /**
         * @function
         * @dsec renews the token by calling extend-token API
         */
        function renewToken(event) {
            stopInterval(popupInterval);
            const eventButton = getEventButton(event);

            return ABT.Http({
                method: 'POST',
                url: ABT.Config.endpoints.EXTEND_TOKEN
            }, eventButton)
            .then(onRenewToken)
            .then(() => updateSessionCookie(true, eventButton))
            .then(() => {
                localStorage.setItem('cookie.created_on', Date.now());

                // start session and inactivity intervals
                startSessionInterval();
                startInactivityInterval();

                // enable activity tracking
                enableActivityTracking();
            })
            .catch(() => initLogout(event));
        }

        /**
         * @function
         * @desc handles token extension
         * @param {object} resp API response 
         */
        function onRenewToken(resp) {
            if(!resp.errorCode === 0) {
                return;
            }

            const newToken = resp.response.response.id_token;
            const parsedNewToken = ABT.Utils.parseJwt(newToken);
            const now = Date.now();
            // token TTL = now + token expiry in miliseconds
            const tokenExpiry = new Date(now + Math.abs(parsedNewToken.exp - parsedNewToken.iat) * 1000);

            // update token @todo save this to session storage
            sessionStorage.setItem('id.token', newToken);

            // save in local storage for the sync to other tabs and remove
            localStorage.setItem('id.token', newToken);
            localStorage.removeItem('id.token');

            // set token TTL to be used by other pages
            localStorage.setItem('token.ttl', tokenExpiry.getTime());

            // hide popup
            $sessionModal.classList.remove('show');
        }

        /**
         * @function
         * @desc event handler on localstorage change event
         * @param {Event} event 
         */
        function syncSessionStorage(event) {
            if(!event) { event = window.event; } // ie suq
            if(!event.newValue) return; // do nothing if no value to work with (in case of removal)

            // handle data change
            if(event.key === 'id.token') {
                sessionStorage.setItem('id.token', localStorage.getItem('id.token'));

            } else if (event.key === 'token.ttl' || event.key === 'cookie.created_on') {
                // reset intervals if changed in other tabs
                onSessionUpdateInAnotherTab(event.key);

            } else if (event.key === 'logout') {
                // logout if any other tab has logged out already
                localStorage.clear();
                sessionStorage.clear();

                // redirect user to sign in page
                redirectToSignin();
            }

            // sync on page load
            else if (event.key === 'syncUserInfo') {
                const userInfo = {};

                if(sessionStorage.getItem('id.token')) {
                    userInfo['id.token'] = sessionStorage.getItem('id.token');
                }

                if(sessionStorage.getItem('user')) {
                    userInfo['user'] = sessionStorage.getItem('user');
                }

                // transport info to other tabs, if userInfo object has information to transport
                if(Object.keys(userInfo).length) {
                    // share it for another tab asked for the sessionStorage
                    localStorage.setItem('userInfo.temp', JSON.stringify(userInfo));

                    // the other tab should now have it, so we're done with it.
                    localStorage.removeItem('userInfo.temp'); // <- could do short timeout as well.
                }

            } else if (event.key === 'userInfo.temp') {
                // receive data from another tab
                var data = JSON.parse(event.newValue);
                for (var key in data) {
                    if(data[key] && data[key] !== 'null') {
                        sessionStorage.setItem(key, data[key]);
                    }
                }
            } else if(event.key === 'user.resetInactivityInterval') {
                // user activity tracked on other tab, so reset the Inactivity-Interval
                startInactivityInterval();
            }
        }

        /**
         * @function
         * @desc handles session related changes in localstorage
         * @param {string} type change type
         */
        function onSessionUpdateInAnotherTab(type) {
            
            // if popup opened
            if($sessionModal.classList.contains('show')) {
                // hide popup
                $sessionModal.classList.remove('show');

                // stop popup interval
                stopInterval(popupInterval);

                // start tracking activity
                enableActivityTracking();
            }
            

            if (type === 'token.ttl') {
                // restart inactivity Interval
                startInactivityInterval();
            } else if (type === 'cookie.created_on') {
                // restart sessionInterval
                startSessionInterval();
            }
        }

        /**
         * @function
         * @desc moves data from localstorage to session storage on first page load after login
         */
        function shiftUserInfoPostLogin() {
            if(localStorage.getItem('id.token')) {

                // save user info to session storage and remove from localstorage
                sessionStorage.setItem('id.token', localStorage.getItem('id.token'));
                localStorage.removeItem('id.token');
                
                // prevent saving null for user in session storage
                if(localStorage.getItem('user')) {
                    sessionStorage.setItem('user', localStorage.getItem('user'));
                    localStorage.removeItem('user');
                }

            } else {

                // trigger syncing
                localStorage.setItem('syncUserInfo', 'start');
                localStorage.removeItem('syncUserInfo');
            }
        }

        /**
         * @function
         * @desc check if token is still valid
         */
        function isTokenValid() {
            const tokenExpiry = localStorage.getItem('token.ttl');
            const now = Date.now();
            return tokenExpiry && tokenExpiry > now;
        }

        /**
         * @function
         * @desc if toke is not valid, clear sessionStorage and localStorage
         */
        function validateToken() {
            if(!isTokenValid()) {
                liteLogout();
            }
        }

        /**
         * @function
         * @desc    clears browser storage and redirect to signin
         *          primarily useful when token is invalid but cookies are still valid
         */
        function liteLogout() {
            localStorage.clear();
            sessionStorage.clear();

            const isAuthorPage = window.Granite?.author || location.search.toLowerCase().includes('wcmmode=disabled');
            const isSecurePage = location.href.toLowerCase().includes('/secure/');

            /**
             * Redirect to login page only if:
             * - this is a secure page
             * - this is not already login page (prevent reloads)
             * - this is not authoring page
             */
            if(!isAuthorPage && !ABT.Utils.isLoginPage() && isSecurePage) {
                location.assign(ABT.Config.aemConfig.SIGNIN_PAGE_URL);
            }
        }

        /**
         * @function
         * @desc if token valid and data not synced yet, reload the page in 1 sec
         */
        function checkSyncStatus() {
            
            // if sync could not complete yet
            if(isTokenValid() && !sessionStorage.getItem('id.token')) {
                setTimeout(function() {

                    // if token exists after a second (syncup), reload the page
                    if(sessionStorage.getItem('id.token')) {
                        location.reload();
                        return;
                    }

                    // othersise, do lite logout as API logout will not work without token
                    liteLogout();

                }, 1000);
            }
        }

        /**
         * @method
         * @desc initiate js and attach eventlisteners to selector 
         */
        function init() {
            validateToken();
            window.addEventListener("storage", syncSessionStorage, false);
            shiftUserInfoPostLogin();
            checkSyncStatus();

            const isSessionActive = sessionStorage.getItem('id.token');

            // if session not active, do nothing
            if(!isSessionActive) {
                return;
            }

            // event bindings
            $logoutLink?.addEventListener('click', initLogout);
            $terminateSessionButton?.addEventListener('click', initLogout);
            $extendSessionButton?.addEventListener('click', renewToken);

            // start intervals and activity-tracking
            startSessionInterval();
            startInactivityInterval(); // initialize manually
            enableActivityTracking(); // start watcher
        }

        init();
		
	  }
    });

})(window.ABT || (window.ABT = {}));