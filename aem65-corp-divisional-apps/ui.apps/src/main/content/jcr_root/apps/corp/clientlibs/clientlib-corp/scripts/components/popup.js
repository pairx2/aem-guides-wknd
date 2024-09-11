/**********************************
Popup Experience Fragment
**********************************/

$(document).ready(function () {

    /* Site leaving popup to support container instead of layout container */
    let siteLeavingSection = $('#site-leaving-popup').length && $('#site-leaving-popup').find('.columncontrol .container');//.addClass('a-container');
    if (siteLeavingSection.length && isOnPublish()) {
        siteLeavingSection.replaceWith($('<section class="a-container">' + siteLeavingSection.html() + '</section>'));
        siteLeavingSection.find('.columncontrol__column').addClass('a-container__column');
    }

    // Close the site leaving popup when "Yes" is clicked to confirm the redirect by user
    let siteLeavingModal = $('#site-leaving-popup-content');
    if (siteLeavingModal.length && isOnPublish()) {
        $(document).on('click', "#siteLeavingPopupFragmentPathModal div[data-btn-type='continue'] .btn", function () {
            $("#siteLeavingPopupFragmentPathModal div[data-dismiss='modal']")[0].click();
        });
    }

    // Adding classname for modal which is associated with cards component.
    if (isOnPublish() && $('.container.container--video-popup').length) {
        addClassToModal('.container.container--video-popup', 'modal--video-popup');
    }

    // Adding classname for modal, with the white bordered video popup.
    if (isOnPublish() && $('.video.video-popup--white-border').length) {
        addClassToModal('.video.video-popup--white-border', 'modal--video-popup__white-border');
    }

    // Adding classname for modal, for the no bordered video popup.
    if (isOnPublish() && $('.video.video-popup__no-border').length) {
        addClassToModal('.video.video-popup__no-border', 'modal--video-popup__no-border');
    }

    if (isOnPublish() && $('.m-video .global-video-popup').length) {
        addClassToModal('.m-video .global-video-popup', 'modal--video-popup-article');
    }

});

/**
 * @function
 * Summary: Function to add a class tot he modal
 * Parameter-1: height - {string} - class name string to identify the component
 * Parameter-2: height - {string} - class name to be added to the modal
 */
function addClassToModal(componentClass, modalClass) {
    setTimeout(function () {
        $(componentClass).each(function () {
            let videoModal = $(this).parents('.modal');
            if (videoModal.length) {
                videoModal.addClass(modalClass)
            }
        });
    }, 1000);
}

$(window).on('load', function () {

    // Code to remove the video and reattach to not let the video play in the background when popup is closed
    if (isOnPublish() && $('.modal .video').length) {
        $('.modal .video').each(function () {
            let videoEle = $(this);
            let videoHTML = videoEle.children();
            let modalContainer = videoEle.parents('.modal');
            let modalID = modalContainer.attr('id');
            $(document).find(`[data-target="#${modalID}"]`).on('click', function () {
                videoEle.append(videoHTML);
            });
            modalContainer.on('click', function () {
                // Timeout to let the class "show" be removed if popup is closed
                setTimeout(function () {
                    if (modalContainer.hasClass('show') == false) {
                        videoHTML.remove();
                    }
                }, 150);
            });
        })
    }

    if(isOnPublish() && $('.modal .xfpage').length) {
        $('.modal .xfpage').closest('.modal').addClass('pi-locator');
    }
});