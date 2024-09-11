$(document).ready(function () {
    $('.hub2-limeLightVideo').on('click', function (event) {
        event.preventDefault();
        var wrapperValue = $(this).parent();
        wrapperValue.children('#hub2Videooverlay').fadeIn(100);
        var mediaID = $(this).attr('data-mediaId');
        var playerID = "limelight_player_" + $(this).attr('data-playerid');
        var autoplay = false;
        if ($('#videoAutoplayCheck').text() == 'true') {
            autoplay = true;
        }
        LimelightPlayerUtil.embed({
            "mediaId": mediaID,
            "playerForm": "Player",
            "playerId": playerID,
            "autoplay": autoplay
        });
    })
    $('.hub2-limeLightVideo-wrapper .hub2PlayIcon').on('click', function () {
        $(this).parent().find(".hub2-limeLightVideo").trigger('click');
    })


    var ytVideosrc = "";
    $('.hub2-youtubeVideo').on('click', function () {
        if (($(this).siblings('#hub2Videooverlay').find('iframe').attr('src') == '') || ($(this).siblings('#hub2Videooverlay').find('iframe').attr('src') == undefined)) {
            $(this).siblings('#hub2Videooverlay').find('iframe').attr('src', ytVideosrc);
        }
        var wrapperValue = $(this).parent();
        wrapperValue.children('#hub2Videooverlay').fadeIn(100);
    })
    $('.hub2-youtubeembedVideo').on('click', function (event) {
        event.preventDefault();
        var videoHeight = $(this).height();
        var videoWidth = $(this).width();
        var embedContainer = $(this).parent().find('.hub-embededVideo');
        embedContainer.show();
        embedContainer.css('width', videoWidth);
        embedContainer.css('height', videoHeight);
        $(this).hide();
        $(this).parent().find('.hub2PlayIcon.embedIcon').hide();
    })
    $('.hub2-youtubeVideoImage-wrapper .hub2PlayIcon').on('click', function () {
        $(this).parent().find('.hub2-youtubeVideo').trigger('click');
    });
    $('.hub2-youtubeVideoImage-wrapper .hub2PlayIcon.embedIcon').on('click', function () {
        $(this).parent().find('.hub2-youtubeembedVideo').trigger('click');
    });
    $('.hub2-popup-close').on('click', function () {
        ytVideosrc = $(this).siblings('iframe').attr('src');
        $(this).siblings().empty();
        $(this).parent().parent().fadeOut(100);
        $(this).siblings('iframe').attr('src', '');
    });
    $('.hub2-limeLightembedVideo').on('click', function (event) {
        event.preventDefault();
        var videoHeight = $(this).height();
        var videoWidth = $(this).width();
        var embedContainer = $(this).parent().find('.hub-embededVideo');
        embedContainer.show();
        embedContainer.css('width', videoWidth);
        embedContainer.css('height', videoHeight);
        $(this).hide();
        $(this).parent().find('.hub2PlayIcon.embedIcon').hide();
        var mediaID = $(this).attr('data-mediaId');
        var playerID = "limelight_player_" + $(this).attr('data-playerid');
        LimelightPlayerUtil.embed({
            "mediaId": mediaID,
            "playerForm": "Player",
            "playerId": playerID,
            "autoplay": true
        });
    });
    $('.hub2-limeLightVideo-wrapper .hub2PlayIcon.embedIcon').on('click', function () {
        $(this).parent().find('.hub2-limeLightembedVideo').trigger('click');
    })
    $(".video .m-video .global-video-embedDam .play-icon .btn").click(function () {
        $(this).parent().css("z-index","0");
    })
    $(".video .m-video .global-video .play-icon .btn").click(function () {
        $(this).parent().css("z-index","0");
        $(this).parent().parent().find(".vjs-limelight-big-play").click();
    })
})