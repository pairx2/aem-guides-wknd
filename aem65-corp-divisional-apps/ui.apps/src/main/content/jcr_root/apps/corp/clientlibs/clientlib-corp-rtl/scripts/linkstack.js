// js code to show/hide link stack content for RTL
$(function () {
    if ($('.linkstack--list-type').length > 0 && isOnPublish()) {
        $(".linkstack--list-type .abt-icon-down-arrow").on('click', function () {
            $(this).parents('.linkstack--list-type').find('.m-link-stack--content').toggleClass("d-none");
        })
    }
});