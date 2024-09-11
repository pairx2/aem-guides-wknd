$(document).ready(function() {
    if ($(window).width() < 992) {
        $('.navbar-collapse').css('box-shadow', '0 2px 4px 0 rgb(0 0 0 / 24%)');
    }
    $(".navbar-toggler").click(function() {
        $('.navbar-collapse').toggle();
        $(this).toggleClass('abt-icon-cancel');
    })
})

$(window).on('resize', () => {
    if ($(window).width() < 992) {
        $('.navbar-collapse').css('box-shadow', '0 2px 4px 0 rgb(0 0 0 / 24%)');
    } else {
        $('.navbar-collapse').css('box-shadow', 'none');
    }
})