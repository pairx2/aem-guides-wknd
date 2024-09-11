$(window).on('load', function() {

    var contentmodalId = '#site-entering-popup-content';
    var modalId = 'siteEnteringPopupFragmentPath';
    var siteEnteringModalId = '#' + modalId;
    var popupFooterContent = '';
    var alreadyVisited = [];

    var wcmmode = $("#site-entering-popup-content").attr("data-wcm-edit-mode");
    var countries = $('[name="countryList"]').val()?.split(',');
    if ('false' == wcmmode && countries) {
        SiteEnteringPopup(countries);
    }

    function SiteEnteringPopup(countryList) {
        if (null != localStorage.getItem('alreadyVisited')) {
            alreadyVisited = localStorage.getItem('alreadyVisited').split(',');
        }
        findMyLocation(countryList);
    }

    function generateTemplate() {
        var popupContentWrapper = document.querySelector(contentmodalId);
        let popupContent, templateModalStr = [];
        popupContentWrapper.querySelector('.m-popup-content')?.querySelector('section.a-container')?.querySelectorAll('div.a-container__column').forEach(function (ele) {
            ele.remove();
            popupFooterContent += ele.innerHTML;
        });
        popupContent = popupContentWrapper.querySelector('.m-popup-content').innerHTML;
        templateModalStr.push('<div class="modal generic-modal" tabindex="-1" role="dialog" id="' + modalId + '" data-js-component="pop-up">');
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
        templateModalStr.push('<div class="modal-footer generic-modal__content-footer">' + popupFooterContent + '</div>');
        templateModalStr.push('</div>');
        templateModalStr.push('</div>');
        templateModalStr.push('</div>');
        return templateModalStr.join('');
    }

    function updateModalContent() {
        var popupContentWrapper = document.querySelector(contentmodalId);
        if (!document.querySelector(siteEnteringModalId)) {
            let template = generateTemplate();
            let html = new DOMParser().parseFromString(template, 'text/html').querySelector('body').childNodes[0];
            if (popupContentWrapper.querySelector('img')) {
                html.classList.add('generic-modal--image');
                html.querySelector('img').classList.add('generic-modal__image-link');
                html.querySelector('img').closest('div').classList.add('generic-modal__image');
            }
            let bodyElem = document.querySelector('body');
            bodyElem.appendChild(html);
            bodyElem.querySelector(contentmodalId).remove();
        }
    }

    function getRequestHeaders() {
        let siteCountry = $("input[name='x-country-code']").val().toString().toUpperCase();
        let applicationId = $("input[name='x-application-id']").val().toString();
        let language = $("input[name='x-preferred-language']").val().toString();
        return {
            method: 'GET',
            mode: 'cors',
            headers: {
                "cache-control": "no-cache",
                "Content-Type": "application/json",
                "x-application-id": applicationId,
                "x-country-code": siteCountry,
                "x-preferred-language": language
            }
        };
    }

    function findMyLocation(countryList) {
        let siteCountry = $("input[name='x-country-code']").val().toString().toUpperCase();
        let api = $("#site-entering-popup-content").attr("data-api-url");
        if (null == alreadyVisited || !alreadyVisited.includes(siteCountry)) {
            fetch(api, getRequestHeaders())
                .then(function (resp)
                {
                    return resp.json();
                })
                .then(function (data) {
                    showSiteEnterPopup(data, countryList);
                });
        }
    }

    function showSiteEnterPopup(data, countryList) {
        let siteCountry = $("input[name='x-country-code']").val().toString().toUpperCase();
        let country = data.response.countryCode.toUpperCase();
        if (null == alreadyVisited) {
            alreadyVisited = [];
        }
        alreadyVisited.push(siteCountry);
        localStorage.setItem('alreadyVisited', alreadyVisited.toString());
        if (!countryList.includes(country)) {
            updateModalContent();
            $(siteEnteringModalId).modal("show");
        }
    }

});




