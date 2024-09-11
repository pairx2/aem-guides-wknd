/**
 * @module
 * @desc Whitepaper Upload page  
 */

document.addEventListener('DOMContentLoaded', function () {

    if ($('#layout-whitepaper--fetch').length) {
        const whitepaperFetchForm = $('#layout-whitepaper--fetch .formcontainer');

        // Trigger fetch form API by submit click
        if (whitepaperFetchForm?.length) {
            setTimeout(() => {
                whitepaperFetchForm.find('.btn[type="submit"]')?.trigger('click');
            }, 200);
        }
    }

    if ($('#layout-whitepaper--download').length) {
        const whitepaperDownloadForm = $('#layout-whitepaper--download .formcontainer');

        if (whitepaperDownloadForm?.length) {
            whitepaperDownloadForm.find('.o-form-container__success-msg')?.addClass('d-none');
            whitepaperDownloadForm.find('.button .btn[name="delete"]')?.on('click', function () {
                $('#whitepaper--delete-alert-btn')?.length && $('#whitepaper--delete-alert-btn')[0].click();
            });
        }
    }

    if ($('#form-whitepaper--upload .m-file-uploader').length && $('#form-whitepaper--upload .o-form-container__buttons .btn[type="submit"]')?.attr('disabled')?.length) {
        uploadWhitepaperMutation();
    }
});

/**
 * @function
 * @summary: Function to attach mutation observer for file upload from blob to base64
 */
function uploadWhitepaperMutation() {
    // Create an mutation observer to convert blob url to base64
    const observer = new MutationObserver(mutations => {
        mutations.forEach(function (mutation) {
            if (mutation.type === 'attributes') {
                if (mutation?.target?.value?.length && mutation?.target?.value.indexOf('blob:') > -1) {
                    setTimeout(() => {
                        $('#form-whitepaper--upload .o-form-container__buttons .btn[type="submit"]')?.removeAttr('disabled');
                    }, 100);
                } else {
                    $('#form-whitepaper--upload .o-form-container__buttons .btn[type="submit"]')?.attr('disabled', 'disabled');
                    setTimeout(() => {
                        delete window['whitePaperFile'];
                    }, 500);
                }
            }
        });
    });

    // Configuration of the observer:
    const observe = {
        attributes: true,
        childList: false,
        characterData: false,
        attributeFilter: ['value']
    };

    observer.observe(document.querySelector('#form-whitepaper--upload input[name="uploaded-file"]'), observe);
}
