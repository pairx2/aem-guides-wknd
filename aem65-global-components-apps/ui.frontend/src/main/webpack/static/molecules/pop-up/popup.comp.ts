/**
 * PopUp Modal External Link Variation
 */
import 'bootstrap';
import '../../common/site-entering-popup';
(function () {
    'use strict';
    class ExternalLinks {
        constructor() {
            document.querySelectorAll('[data-btn-type="continue"]').forEach(function (btnContinue) {
                btnContinue.addEventListener('click', this.onClickExternalLink);
            }.bind(this));
        }

        /**
        * @function
        * @desc To close the popup modal and remove the backdrop
        */
        onClickExternalLink(e) {
            $('[data-js-component="pop-up"].show .generic-modal--close')[0].click();
        }
    }

    $(document).ready(function () {
        if (!!document.querySelector('[data-js-component="external-link"]')) {
            new ExternalLinks();
        }
    })

})();
