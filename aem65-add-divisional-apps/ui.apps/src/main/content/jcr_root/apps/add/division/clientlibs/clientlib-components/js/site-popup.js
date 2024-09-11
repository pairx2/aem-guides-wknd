var SiteEnteringPopup = (function () {
    function SiteEnteringPopup(ele) {
        this.container = ele;
        this.api = $("#site-entering-popup-content").attr("data-api-url");
        var languageCode = $("input[name='x-preferred-language']").val().split('_');
        if (languageCode.length > 1) {
            this.siteCountry = languageCode[1].toString().toUpperCase();
        }
        else {
            this.siteCountry = $("input[name='x-country-code']").val().toString().toUpperCase();
        }
        if (null != localStorage.getItem('alreadyVisited')) {
            this.alreadyVisited = localStorage.getItem('alreadyVisited').split(',');
        }
        this.findMyLocation();
    }
    SiteEnteringPopup.generateTemplate = function () {
        var _a, _b, _c;
        var popupContent, templateModalStr = [];
        (_c = (_b = (_a = SiteEnteringPopup.popupContentWrapper.querySelector('.m-popup-content')) === null || _a === void 0 ? void 0 : _a.querySelector('section.a-container')) === null || _b === void 0 ? void 0 : _b.querySelectorAll('div.a-container__column')) === null || _c === void 0 ? void 0 : _c.forEach(function (ele) {
            ele.remove();
            SiteEnteringPopup.popupFooterContent += ele.innerHTML;
        });
        popupContent = SiteEnteringPopup.popupContentWrapper.querySelector('.m-popup-content').innerHTML;
        templateModalStr.push('<div class="modal generic-modal" tabindex="-1" role="dialog" id="' + SiteEnteringPopup.modalId + '" data-js-component="pop-up">');
        templateModalStr.push('<div class="modal-dialog modal-dialog-centered" role="document">');
        templateModalStr.push('<div class="modal-content generic-modal__content">');
        templateModalStr.push('<div class="modal-header generic-modal__header">');
        templateModalStr.push('<span class="generic-modal--close" data-dismiss="modal" aria-label="Close">');
        templateModalStr.push('<i aria-hidden="true" class="abt-icon abt-icon-cancel"></i>');
        templateModalStr.push('</span>');
        templateModalStr.push('</div>');
        templateModalStr.push('<div class="modal-body generic-modal__content-body">');
        templateModalStr.push(popupContent);
        templateModalStr.push('</div>');
        templateModalStr.push('<div class="modal-footer generic-modal__content-footer">' + SiteEnteringPopup.popupFooterContent + '</div>');
        templateModalStr.push('</div>');
        templateModalStr.push('</div>');
        templateModalStr.push('</div>');
        SiteEnteringPopup.template = templateModalStr.join('');
    };
    SiteEnteringPopup.updateModalContent = function () {
        if (!document.querySelector(SiteEnteringPopup.siteEnteringModalId)) {
            SiteEnteringPopup.generateTemplate();
            var parser = new DOMParser(), html = parser.parseFromString(SiteEnteringPopup.template, 'text/html').querySelector('body').childNodes[0];
            if (SiteEnteringPopup.popupContentWrapper.querySelector('img')) {
                html.classList.add('generic-modal--image');
                html.querySelector('img').classList.add('generic-modal__image-link');
                html.querySelector('img').closest('div').classList.add('generic-modal__image');
            }
            var bodyElem = document.querySelector('body');
            bodyElem.appendChild(html);
            bodyElem.querySelector(SiteEnteringPopup.contentmodalId).remove();
        }
    };
    SiteEnteringPopup.prototype.getRequestHeaders = function () {
        var final = {};
        var headers = document.querySelectorAll('[type="hidden"][data-header="true"]');
        headers.forEach(function (header) {
            final[header.name] = header.value;
        });
        return final;
    };
    SiteEnteringPopup.prototype.findMyLocation = function () {
        if (null == this.alreadyVisited || !this.alreadyVisited.includes(this.siteCountry)) {
            fetch(this.api, {
                headers: this.getRequestHeaders()
            }).then(function (resp) { return resp.json(); })
                .then(function (data) {
                    this.showSiteEnterPopup(data);
                }.bind(this));
        }
    };
    SiteEnteringPopup.prototype.showSiteEnterPopup = function (data) {
        var country = data.response.countryCode.toUpperCase();
        if (null == this.alreadyVisited) {
            this.alreadyVisited = [];
        }
        this.alreadyVisited.push(this.siteCountry);
        localStorage.setItem('alreadyVisited', this.alreadyVisited.toString());
        if (country != this.siteCountry) {
            SiteEnteringPopup.updateModalContent();
            $(SiteEnteringPopup.siteEnteringModalId).addClass('show').css('display', 'block');
        }
    };
    SiteEnteringPopup.contentmodalId = '#site-entering-popup-content';
    SiteEnteringPopup.modalId = 'siteEnteringPopupFragmentPath';
    SiteEnteringPopup.siteEnteringModalId = '#' + SiteEnteringPopup.modalId;
    SiteEnteringPopup.popupContentWrapper = document.querySelector(SiteEnteringPopup.contentmodalId);
    SiteEnteringPopup.popupFooterContent = '';
    var closeSelectors = [SiteEnteringPopup.siteEnteringModalId+' .abt-icon-cancel', SiteEnteringPopup.siteEnteringModalId+' .button div[data-dismiss="modal"]'];
    $(document).on('click', closeSelectors.join(','), function(){
        $(SiteEnteringPopup.siteEnteringModalId).removeClass('show').css('display', '');
    });
    return SiteEnteringPopup;
}());


$(function () {
    var wcmmode = $("#site-entering-popup-content").attr("data-wcm-edit-mode");
    var siteEnterPopupRequired = $("#site-entering-popup-content").attr("data-site-entering-popup-required");
    if ('false' == wcmmode && 'true' == siteEnterPopupRequired) {
        new SiteEnteringPopup(HTMLElement);
        $("#site-entering-popup-content").attr("data-site-entering-popup-required", 'false');
    }
});
