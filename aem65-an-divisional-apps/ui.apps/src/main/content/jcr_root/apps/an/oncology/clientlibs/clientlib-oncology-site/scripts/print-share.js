$(window).on('load', function () {
    $('.a-container--print-share .button.link:first-child').click(
        function () {
            window.print();
        }
    );
    $('.a-container--print-share .button.link ~.button.link').click(
        function () {
            $('#oncology-embed-printshare').show();
        }
    );
    $('#oncology-embed-printshare .share__close').click(
        function () {
            $('#oncology-embed-printshare').hide();
        }
    );
});
