$(document).ready(function () {

    $(".m-popup").click(function () {
        const chkMobileDevice = window.matchMedia("(max-width: 767px)");
        chkMobileDevice.addEventListener("change", handleDeviceChange);

        function handleDeviceChange(e) {
            if (e.matches) {
                $('.a-container--thankyou-pop-up').parents('.modal-dialog').css('width', '95%');
            } else {
                $('.a-container--thankyou-pop-up').parents('.modal-dialog').css('width', '55%');
            }
        }

        handleDeviceChange(chkMobileDevice);
    });



});

$(window).on('load',function() {
	$('.a-container--popupentering').parents('.modal-dialog-centered').addClass('modal_image_popup');
    $('.modal_image_popup').find('.button').parents('.columncontrol').css('display', 'none');
    $('.a-container--popup-purple').parents('.modal-dialog-centered').addClass('modal_purple_popup');
});
