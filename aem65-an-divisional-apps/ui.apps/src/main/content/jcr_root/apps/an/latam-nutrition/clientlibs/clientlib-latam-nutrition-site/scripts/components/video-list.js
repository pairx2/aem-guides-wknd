$(window).on('load',function() {
    $('.button.link .m-popup').on('click', function(){
        $('iframe.a-video__player-source').attr('src', '');
        let embedId = $(this).find('a').attr('id');
        $('iframe.a-video__player-source').attr('src', 'https://www.youtube.com/embed/'+embedId);
    });

    $('.a-column-control--video-list .columncontrol__column .image .cmp-image img').on('click', function(){
        $(this).parents('.image').siblings('.button.link').find('.m-popup').click();
    })
});
