(function () {
    'use strict';
    class AlertBanner {
        private elem: HTMLElement;
        private wrapperElem: HTMLElement;
        private contentElem: HTMLElement;
		private getSiteConsentStatus: any;
		private consentStatus: string;
        private displayNone: string;        
        private contentCollapsed: string;
        private callApiMethod: string;
        private trustDialogStatus: string;
        public trustArcId: string;
        private trustArcSelfValue: string;
        public PrivacyManagerObj: any;

        constructor(elem: HTMLElement) {
            if (!elem) {
                throw new Error('Alert banner element is required');
            }
            this.elem = elem;
            this.wrapperElem = this.elem.closest('.m-alert-banner');
            this.contentElem = this.elem.querySelector('.m-alert-banner__content');
			this.consentStatus = "denied";
            this.displayNone = "d-none";
            this.contentCollapsed = "content-collapsed";
            this.callApiMethod = "getConsent";
            this.getSiteConsentStatus = {};
            this.trustDialogStatus = "trustDialogStatus";
            this.trustArcId = document.getElementById('cmpidField') ?  document.getElementById('cmpidField').value : null;
            this.trustArcSelfValue = document.getElementById('selfValue') ?  document.getElementById('selfValue').value : "";
            this.PrivacyManagerObj = {};
            this.init();
            this.attachEvents();
        }
		
		// collapse the alert banner
        private collpaseAlertBanner(this) {
                this.elem.querySelector('.m-collapse').classList.add(this.displayNone);
				this.elem.querySelector('.m-expand').classList.remove(this.displayNone);
				this.elem.querySelector('.m-alert-banner__content__para').classList.add(this.displayNone);
				this.elem.querySelector('.m-alert-banner__content__title').classList.add(this.contentCollapsed);

        }
		//Expand the alert banner
        private expandAlertBanner(this) {
            this.elem.querySelector('.m-expand').classList.add(this.displayNone);
            this.elem.querySelector('.m-collapse').classList.remove(this.displayNone);
            this.elem.querySelector('.m-alert-banner__content__para').classList.remove(this.displayNone);
            this.elem.querySelector('.m-alert-banner__content__title').classList.remove(this.contentCollapsed);
        }
		// Enable cookie button click function
		private enableCookieBtnClick(){
			document.getElementById('teconsent') && document.getElementById('teconsent').querySelector('a').click();
		}
		
		// Get consent status and show alert banner
		public getConsentStatusNDecide(e){
            if(typeof e.data == "string"){   
                let consentData;
                try {
                    consentData = JSON.parse(e.data);   
                    if (consentData && consentData.PrivacyManagerAPI) {
                    var cData = window.PrivacyManagerAPI && window.PrivacyManagerAPI.callApi("getConsentDecision",window.location.host);
                        if(cData){ 
                            if(cData.source == "asserted" && cData.consentDecision == 1) {
                                document.querySelector('.m-alert-banner').classList.remove("d-none");
                            } else{
                                document.querySelector('.m-alert-banner').classList.add("d-none");
                            }
                        } else {
                            // call Privacy manager API again if its undefined
                            var countInterval = 0;
                            var checkTAstatus = setInterval(function(){
                                countInterval++; 
                            var cData = window.PrivacyManagerAPI && window.PrivacyManagerAPI.callApi("getConsentDecision",window.location.host);
                            if(cData){
                                clearInterval(checkTAstatus);
                                if(cData.source == "asserted" && cData.consentDecision == 1) {
                                    document.querySelector('.m-alert-banner').classList.remove("d-none");
                                } else{
                                    document.querySelector('.m-alert-banner').classList.add("d-none");
                                }
                            }
                            if(countInterval > 20) {
                                clearInterval(checkTAstatus);
                            }                           
                            },500);
                        }
                    }
                }   
                catch (error) {
                    return false;
                }  
            }
        }
        
        
		
        // attach the defined events on call of component
        private attachEvents() {
         this.contentElem.querySelector('button').addEventListener('click',this.enableCookieBtnClick.bind(this));         
         this.elem.querySelector('.m-collapse').addEventListener('click', this.collpaseAlertBanner.bind(this));
         this.elem.querySelector('.m-expand').addEventListener('click', this.expandAlertBanner.bind(this));
        }

        init() {
            var selfValue = "";
            if(this.trustArcSelfValue.trim().length){
                selfValue = this.trustArcSelfValue.trim();
            } else {
                selfValue = window.location.host;
            }          
            this.PrivacyManagerObj = {
                PrivacyManagerAPI:
                {
                    action: "getConsent",
                    timestamp: new Date().getTime(), self: selfValue
                }
            };
            var consentApiObjectString = JSON.stringify(this.PrivacyManagerObj); 
            window.top.postMessage(consentApiObjectString, "*");
            window.addEventListener("message", this.getConsentStatusNDecide, false);
            this.collpaseAlertBanner();           
        }
    }

    $(function () {
        document.querySelectorAll('[data-js-component="alertbanner"]').forEach((elem: HTMLElement) => {
            new AlertBanner(elem);
        });
    })
})();