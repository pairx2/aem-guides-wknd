$(document).ready(function() {

    $('.text.a-title-green-points ul').append('<button class="btn-readmore"></button>')
    $('.btn-readmore').click(function() {
        if ($(this).hasClass('in-active')) {
            $(this).removeClass('in-active');
            $('.text.a-title-green-points ul li').removeClass('d-block')
        } else {
            $(this).addClass('in-active');
            $('.text.a-title-green-points ul li').addClass('d-block')
        }
    })

});