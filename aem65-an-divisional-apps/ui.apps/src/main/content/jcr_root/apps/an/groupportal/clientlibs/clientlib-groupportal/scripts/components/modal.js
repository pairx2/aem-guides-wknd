/**********************************
Modal
**********************************/

$(function () {

    // For card with video (with class 'm-card--feature-article'), adding 'modal-var--feature-article-video' class to the modal
    if (isOnPublish() && $('.m-card.m-card--feature-article .m-popup').length) {

        $('.m-card.m-card--feature-article .m-popup').each(function () {
            let modalID = $(this).attr('data-target').split('#')[1];

            setTimeout(function () {
                $('#' + modalID).addClass('modal-var--feature-article-video');
            }, 1000);
        });
    }

});

$(window).on('load', function () {

    // Code to remove the video and reattach to not let the video play in the background when popup is closed
    if ($('.modal .video').length) {
        $('.modal .video').each(function () {
            let videoEle = $(this);
            let videoHTML = videoEle.children();
            let modalContainer = videoEle.parents('.modal');
            let modalID = modalContainer.attr('id');
            videoHTML.remove();
            $(document).find('[data-target="#' + modalID + '"]').on('click', function () {
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

});