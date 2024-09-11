$(window).on('load', function () {
    $('.m-card--flavor-icon a.m-card-link').click(
        function() {
            $('.m-card--flavor-icon a.m-card-link').removeClass('active');
            $(this).addClass('active')
        }
    );

    $('.m-card.m-card--flavor-icon a.m-card-link').each(
        function () {
            $(this).removeClass('active');

            if ($(this).attr('href') === window.location.pathname) {
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
        });

});