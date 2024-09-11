class AlertBanner {
  elem;
  wrapperElem;
  contentElem;
  getSiteConsentStatus;
  consentStatus;
  displayNone;
  contentCollapsed;
  callApiMethod;
  trustDialogStatus;
  trustArcId;
  trustArcSelfValue;
  PrivacyManagerObj;

  constructor(elem) {
    if (!elem) {
      throw new Error('Alert banner element is required');
    }
    this.elem = elem;
    this.wrapperElem = this.elem.closest('.m-alert-banner');
    this.contentElem = this.elem.querySelector('.m-alert-banner__content');
    this.consentStatus = 'denied';
    this.displayNone = 'd-none';
    this.contentCollapsed = 'content-collapsed';
    this.callApiMethod = 'getConsent';
    this.getSiteConsentStatus = {};
    this.trustDialogStatus = 'trustDialogStatus';
    this.trustArcId = document.getElementById('cmpidField')
      ? document.getElementById('cmpidField').value
      : null;
    this.trustArcSelfValue = document.getElementById('selfValue')
      ? document.getElementById('selfValue').value
      : '';
    this.PrivacyManagerObj = {};
    this.init();
    this.attachEvents();
  }

  // collapse the alert banner
  collpaseAlertBanner() {
    this.elem.querySelector('.m-collapse').classList.add(this.displayNone);
    this.elem.querySelector('.m-expand').classList.remove(this.displayNone);
    this.elem
      .querySelector('.m-alert-banner__content__para')
      .classList.add(this.displayNone);
    this.elem
      .querySelector('.m-alert-banner__content__title')
      .classList.add(this.contentCollapsed);
  }
  //Expand the alert banner
  expandAlertBanner() {
    this.elem.querySelector('.m-expand').classList.add(this.displayNone);
    this.elem.querySelector('.m-collapse').classList.remove(this.displayNone);
    this.elem
      .querySelector('.m-alert-banner__content__para')
      .classList.remove(this.displayNone);
    this.elem
      .querySelector('.m-alert-banner__content__title')
      .classList.remove(this.contentCollapsed);
  }
  // Enable cookie button click function
  enableCookieBtnClick() {
    document.getElementById('teconsent') &&
      document.getElementById('teconsent').querySelector('a').click();
  }

  // Get consent status and show alert banner
  getConsentStatusNDecide(e) {
    if (typeof e.data == 'string') {
      var consentData = JSON.parse(e.data);
      if (consentData && consentData.PrivacyManagerAPI) {
        var cData =
          window.PrivacyManagerAPI &&
          window.PrivacyManagerAPI.callApi(
            'getConsentDecision',
            window.location.host
          );
        if (cData.source == 'asserted' && cData.consentDecision == 1) {
          document.querySelector('.m-alert-banner').classList.remove('d-none');
          this.collpaseAlertBanner();
        } else {
          document.querySelector('.m-alert-banner').classList.add('d-none');
        }
      }
    }
  }

  //Check if consent change and refresh the page
  consentEventCheck() {
    sessionStorage.setItem(this.trustDialogStatus, 'true');
    var sessionKey = this.trustDialogStatus;
    var consentMethod = this.callApiMethod;
    var cmId = this.trustArcId;
    var checkFrameLoad = setInterval(function () {
      if (
        sessionStorage.getItem(sessionKey) &&
        document.querySelector('.truste_box_overlay').querySelector('iframe')
      ) {
        clearInterval(checkFrameLoad);
        var removeFrameInterval = setInterval(function () {
          if (!document.querySelector('.truste_box_overlay')) {
            clearInterval(removeFrameInterval);
            sessionStorage.removeItem(sessionKey);
            setTimeout(function () {
              var res =
                window.truste &&
                truste.cma.callApi(consentMethod, window.location.host, cmId);
              if (res) {
                window.location.href = location.href;
              }
            }, 1000);
          }
        }, 1500);
      }
    }, 1000);
  }

  // attach the defined events on call of component
  attachEvents() {
    this.contentElem
      .querySelector('button')
      .addEventListener('click', this.enableCookieBtnClick.bind(this));
    this.elem
      .querySelector('.m-collapse')
      .addEventListener('click', this.collpaseAlertBanner.bind(this));
    this.elem
      .querySelector('.m-expand')
      .addEventListener('click', this.expandAlertBanner.bind(this));
    document
      .getElementById('teconsent')
      .addEventListener('click', this.consentEventCheck.bind(this));
  }

  init() {
    var selfValue = '';
    if (this.trustArcSelfValue.trim().length) {
      selfValue = this.trustArcSelfValue.trim();
    } else {
      selfValue = window.location.host;
    }
    this.PrivacyManagerObj = {
      PrivacyManagerAPI: {
        action: 'getConsent',
        timestamp: new Date().getTime(),
        self: selfValue,
      },
    };
    var consentApiObjectString = JSON.stringify(this.PrivacyManagerObj);
    window.top.postMessage(consentApiObjectString, '*');
    window.addEventListener('message', this.getConsentStatusNDecide, false);
    this.collpaseAlertBanner();
  }
}

$(document).ready(function () {
  if ($('#custom_footer').length) {
    var checkAlertBanner = setInterval(function () {
      if (document.querySelector('.m-alert-banner')) {
        clearInterval(checkAlertBanner);
        document
          .querySelectorAll('[data-js-component="alertbanner"]')
          .forEach((elem) => {
            new AlertBanner(elem);
          });
      }
    }, 1000);
  } else {
    document
      .querySelectorAll('[data-js-component="alertbanner"]')
      .forEach((elem) => {
        new AlertBanner(elem);
      });
  }
});
// alert banner component js end here
