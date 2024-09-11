/**
 * Javascript to move the modal DIV from the link component to the page for proper loading.
 */

(function () {
    'use strict';

    var SITE_EXTERNAL_ID = 'siteLeavingPopupFragmentPathModal';
    var SITE_EXTERNAL_ELEMENT = '#site-leaving-popup-content';
    var SITE_EXTERNAL_ID_ELEMENT = '#' + SITE_EXTERNAL_ID;
    var EXTERNAL_CONTINUE_BUTTON;

 function changeExternalLinkHref() {
        var link = $(this);
        var popup = link.closest('.m-popup');
        var href = popup.data('external-link');
        var target = popup.data('external-target');
        EXTERNAL_CONTINUE_BUTTON.attr('href', href);
        EXTERNAL_CONTINUE_BUTTON.attr('target', target);
    }

	function appendPopupTemplate() {
		var popup = $(this);
		var linkId = popup.attr('data-target').substring(1);
        var linkIdSelector = "#" + linkId;
		var $body = $('body');
        var popupContentWrapper = popup;
        var externalPopup = $body.find(linkIdSelector);

        if (linkId == SITE_EXTERNAL_ID) {
            popup.find('a').on('click', changeExternalLinkHref);
        }

		// if linkId is siteLeavingPopupFragmentPathModal then it is moved to
		// the body end only once for the page.
		if (externalPopup.length > 0) {
			// Already body has it. Lets not add.
			return;
        } else if (linkId == SITE_EXTERNAL_ID) {
            popupContentWrapper = $body.find(SITE_EXTERNAL_ELEMENT);
        }

		var popupFooterContent = '';

		// Remove container from xf-page and add to modal-footer.
		popupContentWrapper.find('.m-popup-content').find('section.a-container').find('div.a-container__column').each(function() {
			$(this).remove();
			popupFooterContent += $(this).html();
		});

		var popupContent = popupContentWrapper.find('.m-popup-content').html();

		var template = $.parseHTML('<div class="modal generic-modal" tabindex="-1" role="dialog" id="' + linkId + '" data-js-component="pop-up">' +
			'<div class="modal-dialog modal-dialog-centered" role="document">' +
				'<div class="modal-content generic-modal__content">' +
					'<div class="modal-header generic-modal__header">' +
						'<span class="generic-modal--close" data-dismiss="modal" aria-label="Close">' +
							'<i aria-hidden="true" class="abt-icon abt-icon-cancel"></i>' +
						'</span>' +
					'</div>' +
					'<div class="modal-body generic-modal__content-body">' +
					popupContent +
					'</div>' +
					'<div class="modal-footer generic-modal__content-footer">' + popupFooterContent + '</div>' +
				'</div>' +
			'</div>' +
		'</div>');

		if (popupContentWrapper.find('img').length > 0) {
			$(template).addClass('generic-modal--image');
			$(template).find('img').addClass('generic-modal__image-link');
			$(template).find('img').parent().addClass('generic-modal__image');
		}

    var eventModalContentUpdated = new Event('modal:content-updated');

		$body.append(template);
		popupContentWrapper.find('.m-popup-content').remove();
		popupContentWrapper.find('.m-popup-content-footer').remove();
    document.dispatchEvent(eventModalContentUpdated);

        if (linkId == SITE_EXTERNAL_ID) {
            $body.find(SITE_EXTERNAL_ELEMENT).remove();
            EXTERNAL_CONTINUE_BUTTON = $('body').find(SITE_EXTERNAL_ID_ELEMENT).find('[data-btn-type="continue"]').find('a');
        }
	}

    $(document).ready(function () {
        $('.m-popup').each(appendPopupTemplate);
    });
})();
