$(function () {
    //js code to remove css property from parent class 
    if ($('.m-card-variation--multitexticon.mob-img--left .m-card-link').length > 0 && isOnPublish()) {
        $('.m-card-variation--multitexticon.mob-img--left .m-card-link').parent().addClass("mob-multitexticon-unset-display");
    }
    if ($('.m-card-variation--multitexticon.mob-img--left').length > 0 && isOnPublish()) {
        $(".m-card-link").each(function () {
            if ($(this).next().hasClass("m-card__body") && window.matchMedia("(max-width: 767px)").matches) {
                var bodyclone = $(this).next().clone(true);
                bodyclone.insertAfter($(this).find(".m-card__media"));
                $(this).next().remove();
            }
        })
    }
});