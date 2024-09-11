import 'bootstrap';
export class RedirectConfirmPopup {
    private container: any;
    private static contentmodalId: string = '#site-leaving-popup-content';
    private static modalId: string = 'siteLeavingPopupFragmentPathModal';
    private static redirectModalId: string = '#' + RedirectConfirmPopup.modalId;
    private static continueSelector: string = RedirectConfirmPopup.redirectModalId + ' [data-btn-type="continue"] a';
    private static popupContentWrapper: Element = document.querySelector(RedirectConfirmPopup.contentmodalId);
    private static popupFooterContent: string = '';
    private static template;
    constructor(ele) {
        ele.addEventListener('click', this.onElementClick.bind(this));
        this.container = ele;
    }

    private onElementClick(e) {
        let href = this.container.href || this.container.dataset.redirectUrl;
        e.preventDefault();
        if (href) {
            RedirectConfirmPopup.updateModalContent();
            RedirectConfirmPopup.updateModalPopUpContinueUrl(href);
        }
    }

    private static updateModalPopUpContinueUrl(url) {
        const link = document.querySelector(RedirectConfirmPopup.continueSelector) as HTMLLinkElement;
        if (link) {
            link.href = url;
            $(RedirectConfirmPopup.redirectModalId).modal('show');
        }
    }

    private static generateTemplate() {
        let popupContent,
            templateModalStr = [];

        // Remove container from xf-page and add to modal-footer.
        RedirectConfirmPopup.popupContentWrapper.querySelector('.m-popup-content').querySelector('section.a-container').querySelectorAll('div.a-container__column').forEach(function (ele: HTMLElement) {
            ele.remove();
            RedirectConfirmPopup.popupFooterContent += ele.innerHTML;
        });

        popupContent = RedirectConfirmPopup.popupContentWrapper.querySelector('.m-popup-content').innerHTML;

        templateModalStr.push('<div class="modal generic-modal" tabindex="-1" role="dialog" id="' + RedirectConfirmPopup.modalId + '" data-js-component="pop-up">');
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
        templateModalStr.push('<div class="modal-footer generic-modal__content-footer">' + RedirectConfirmPopup.popupFooterContent + '</div>');
        templateModalStr.push('</div>');
        templateModalStr.push('</div>');
        templateModalStr.push('</div>');

        RedirectConfirmPopup.template = templateModalStr.join('');
    }

    private static updateModalContent() {

        //  If the siteLeavingPopupFragmentPathModal modal is not present only then create the template
        if (!document.querySelector(RedirectConfirmPopup.redirectModalId)) {
            RedirectConfirmPopup.generateTemplate();

            let parser = new DOMParser(),
                html = parser.parseFromString(RedirectConfirmPopup.template, 'text/html').querySelector('body').childNodes[0] as any;

             if (RedirectConfirmPopup.popupContentWrapper.querySelector('img')) {
                html.classList.add('generic-modal--image');
                html.querySelector('img').classList.add('generic-modal__image-link');
                html.querySelector('img').closest('div').classList.add('generic-modal__image');
            }

            let bodyElem = document.querySelector('body');
            bodyElem.appendChild(html);
            bodyElem.querySelector(RedirectConfirmPopup.contentmodalId).remove();
        }
    }

}

$(function () {
    //	Show external popup if 'data-redirect-confirm' is true
    let isRedirectConfirmPopup = document.querySelectorAll('[data-redirect-confirm="true"]');

    isRedirectConfirmPopup.forEach(function (ele) {
        new RedirectConfirmPopup(ele as HTMLElement);
    });
});
