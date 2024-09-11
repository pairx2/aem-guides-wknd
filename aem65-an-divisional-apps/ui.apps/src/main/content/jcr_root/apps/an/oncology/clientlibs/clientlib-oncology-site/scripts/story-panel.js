$(window).on('load', function () {

    let bgImg = $('#story-panel-bg-img img').attr('src');
    if (bgImg) {
        $('.a-container--story-panel-variation-2').css('background-image', 'url("' + bgImg + '")');
    }

});