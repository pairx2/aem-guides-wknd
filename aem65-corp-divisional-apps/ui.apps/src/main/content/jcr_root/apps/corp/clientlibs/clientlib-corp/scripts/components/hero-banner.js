$(document).ready(function () {
    if (isOnPublish()) {
        if ($('.m-hero').length) {
            setTimeout(function () {
                $('.m-hero').each(function () {
                    // To override 6.5 hero component inline display property
                    $(this).css('display', 'block');
                })
            }, 1500)

        }

    }
});