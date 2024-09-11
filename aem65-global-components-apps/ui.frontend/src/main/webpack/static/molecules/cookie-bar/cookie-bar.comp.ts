/**
 * Cookie Bar
 */
(function () {
    'use strict';
    class CookieBar {

        public $ele: JQuery<Element>;
        private _btn: JQuery<Element>;

        private siteLang: any;
        private countryName: any;
        private expdays: any;

        constructor(ele) {
            this.$ele = $(ele);
            this._btn = this.$ele.find('.m-cookiebar__btn .a-button');

            //  Fetch country name, language and expiry days on page load
            this.siteLang = $('[name="x-preferred-language"]').val();
            this.countryName = $('[name="x-country-code"]').val();
            this.expdays = $('[name="cookieExpirationTime"]').val();

            //  Hide the cookie bar when the user clicks on 'OK' button
            this._btn.on('click', this.hideCookieBar.bind(this));

            //  Check if the user has already accepted the cookie or not on page load
            this.checkCookie(this.countryName, this.siteLang);

        }

        /**
         * @function
         * @desc Hide cookie bar on the click of 'OK' button
         */

        public hideCookieBar() {
            this.$ele.addClass('hide');


            var cookieObj = {
                fdsCookies: true,
                counLang: this.countryName + "_" + this.siteLang
            }

            //  Call setCookie method based on the expiry days user has entered
            this.setCookie(cookieObj, this.expdays);
        }

        /**
         * @function
         * @desc Method to set the country, language and expiration date 
         */

        public setCookie(cookieObj, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();

            document.cookie = "fdsCookies_" + cookieObj.counLang + '=' + JSON.stringify(cookieObj) + ";" + expires + ";path=/; Secure;";
        }

        /**
         * @function
         * @desc Method to read the cookie that has been set and pass the value/empty if not present
         */

        public getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return '';
        }

        /**
         * @function
         * @desc Method to check the cookie and hide the cookie bar in case the user has previously accepted
         */

        public checkCookie(siteCountry, siteLanguage) {

            var cookiePara = "fdsCookies_" + siteCountry + "_" + siteLanguage,
                cookie = this.getCookie(cookiePara);
            
            if(this.$ele.closest('.cookie-bar-edit').length || !cookie.length) {
                this.$ele.removeClass('hide');  //  Prevent hiding in the edit mode of the page or when the cookie is not set
            }else {
                var cookieData = JSON.parse(cookie);
            }


        }

    }

    document.querySelectorAll('[data-js-component="cookie-bar"]').forEach(function (ele) {
        new CookieBar(ele);
    });

})();