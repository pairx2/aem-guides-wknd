/**********************************
Modal
**********************************/

$(function () {

    // For card with video (with class 'm-card--feature-article'), adding 'modal-var--feature-article-video' class to the modal
    if (isOnPublish() && $('.m-card.m-card--feature-article .m-popup').length) {

        $('.m-card.m-card--feature-article .m-popup').each(function () {
            let modalID = $(this).attr('data-target').split('#')[1];

            setTimeout(function () {
                $(`#${modalID}`).addClass('modal-var--feature-article-video');
            }, 1000);
        });
    }

    // For HCP page auth popup
    if (isOnPublish() && $('.container.container--hcp-auth').length) {
        setTimeout(function () {
            $('.container.container--hcp-auth').each(function () {
                let modal = $(this).parents('.modal');
                if (modal.length) {
                    modal.addClass('modal--hcp-auth');
                }
            });
        }, 1000);
    }
    //Close the site leaving popup when "OK" is clicked to confirm the redirect by user
    let siteLeavingModal = $('#site-entering-popup-content');
    if (siteLeavingModal.length && isOnPublish()) {
        $(document).on('click', "#siteLeavingPopupFragmentPathModal div[data-btn-type='continue'] .btn", function () {
            $("#siteLeavingPopupFragmentPathModal div[data-dismiss='modal']")[0].click();
        });
    }
});

function attachEventsFunction() {
    // Setting interval to check whether the hcp modal and it's contents 
    // are loaded are not. Once added attaching events to it and clearing the interval.
    let timer = setInterval(function () {
        if ($('.modal.modal--hcp-auth').length) {
            $('#auth-popup-handler-btn')[0].click();
            $('#btn--continue').on('click', function (e) {
                e.preventDefault();
                createCookie('hcpCookie', true, 30);
                $('.modal--hcp-auth .modal-header .generic-modal--close')[0].click();
            });

            $('#btn--return').on('click', function (e) {
                e.preventDefault();
                $('.modal--hcp-auth .modal-header .generic-modal--close')[0].click();
                if (document.referrer != '') {
                    window.location = document.referrer;
                } else {
                    window.location.href = "/";
                }

            });
            clearInterval(timer);
        }
    }, 200);
}

$(window).on('load', function () {

    // Code to remove the video and reattach to not let the video play in the background when popup is closed
    if ($('.modal .video').length) {
        $('.modal .video').each(function () {
            let videoEle = $(this);
            let videoHTML = videoEle.children();
            let modalContainer = videoEle.parents('.modal');
            let modalID = modalContainer.attr('id');
            videoHTML.remove();
            $(document).find(`[data-target="#${modalID}"]`).on('click', function () {
                videoEle.append(videoHTML);
            });
            modalContainer.on('click', function () {
                // Timeout to let the class "show" be removed if popup is closed
                setTimeout(function () {
                    if (!modalContainer.hasClass('show')) {
                        videoHTML.remove();
                    }
                }, 150);
            });
        });
    }
    if (isOnPublish()) {
        // Auth modal code for HCP and it's child pages.
        if (window.location.pathname.indexOf('/hcp') > -1) {
            if (readCookie('hcpCookie') == null && $('#auth-popup-handler-btn').length) {
                attachEventsFunction();
            }
        }
    }
});