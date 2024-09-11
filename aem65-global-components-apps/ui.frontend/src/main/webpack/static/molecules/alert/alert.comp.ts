(function () {
    'use strict';
    class Alert {
        private elem: HTMLElement;
        private closeIcon: HTMLElement;
        private wrapperElem: HTMLElement;
        private alertType: string;
        private alertExpiryTime: number;
        private alertExpiryDate: number;
        private isNotExperienceFragment: boolean;
        private TIME_BOUND: string;
        private NON_TIME_BOUND: string;
		private headerElem: JQuery<Element>;

        constructor(elem: HTMLElement) {
            if (!elem) {
                throw new Error('Alert element is required');
            }
            this.elem = elem;
            this.closeIcon = this.elem.querySelector('.m-alert__close-icon');
            this.wrapperElem = this.elem.closest('.m-alert--wrapper');
            this.alertType = this.elem.getAttribute('data-alert-type');
            this.alertExpiryTime = this.elem.getAttribute('data-expiry-time') ? Number(this.elem.getAttribute('data-expiry-time')) * 1000 : 0;
            this.alertExpiryDate = !isNaN(Date.parse(this.elem.getAttribute('data-expiry-date')))
                ? new Date(this.elem.getAttribute('data-expiry-date')).getTime() : 0;
            this.isNotExperienceFragment = window.location.pathname.indexOf('experience-fragments') < 0;
            this.TIME_BOUND = 'time-bound';
            this.NON_TIME_BOUND = 'non-time-bound';
            this.headerElem = $('.o-header');
            this.bindEvents();
            this.init();
        }
        private hideAlert() {
            this.elem.classList.remove('m-alert--show');
            this.elem.classList.add('m-alert--hide');
            this.wrapperElem?.classList.add('m-alert--hide');
        }
        private showAlert() {
            this.elem.classList.add('m-alert--show');
        }
        private checkTimeBoundAlert() {
            if (this.alertExpiryDate) {
                const currentTime = new Date().getTime();
                if (currentTime >= this.alertExpiryDate) {
                    this.hideAlert();
                } else {
                    this.showAlert();
                }
            }
            if (this.alertExpiryTime) {
                setTimeout(function() {
                    this.hideAlert();
                }.bind(this), this.alertExpiryTime);
            }
        }
		private adjustHeaderPosition() {
            this.headerElem.css('top', 0);
            this.headerElem.css('transition', 'all 0.3s ease-in-out');
        }
        private getCookie(cname: string) {
            const name = cname + "=";
            const ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1);
                if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
            }
            return '';
        }
        bindEvents() {
            this.closeIcon?.addEventListener('click', function() {
                if (this.isNotExperienceFragment) {
                    document.cookie = this.elem.id + "=true; path=/";
                }
                this.hideAlert();
				this.adjustHeaderPosition();
            }.bind(this));
        }
        init() {
            if (this.alertType === this.TIME_BOUND && (this.alertExpiryTime || this.alertExpiryDate) && this.isNotExperienceFragment) {
                this.checkTimeBoundAlert();
            } else {
                this.alertType = this.NON_TIME_BOUND;
                this.showAlert();
            }
            if (this.getCookie(this.elem.id) && this.isNotExperienceFragment) {
                this.hideAlert();
				this.headerElem.css('top', 0);
            }
        }
    }

    $(function () {
        document.querySelectorAll('[data-js-component="alert"]').forEach((elem: HTMLElement) => {
            new Alert(elem);
        });
    })
})();
