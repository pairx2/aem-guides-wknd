$(document).ready(function(){
    let arrowUp = $(`<i class="jumplink-arrow-up"></i>`);
    $('#btn-jumplink').append(arrowUp);
    $("#btn-jumplink").hide();

    $(function toTop() {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('#btn-jumplink').fadeIn();
            } else {
                $('#btn-jumplink').fadeOut();
            }
        });

        $('#btn-jumplink').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    });
});