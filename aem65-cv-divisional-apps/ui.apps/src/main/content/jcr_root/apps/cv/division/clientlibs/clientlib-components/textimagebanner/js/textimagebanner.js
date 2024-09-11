$(document).ready(function () {
  /* youtube video player */
  $(".textimage-yt-modal").each(function () {
    $(this)
      .on("click", function (event) {
        var videoId = $(this).find(".yt-id").val();
        $(".yt-video-modal-textimage")
          .find(".yt-video-player-image")
          .attr("yt-id", videoId);
        var video = $(".yt-video-modal-textimage")
          .find(".yt-video-player-image")
          .attr("id");
        $.getScript("https://www.youtube.com/iframe_api", function () {
          window.YT.ready(function () {
            new window.YT.Player(video, {
              videoId: videoId,
              playerVars: {
                autoplay: 0,
                controls: 1,
                modestbranding: 1,
                disablekb: 0,
              },
            });
          });
        });
      });
  });

  /* Lime light video player */
  $(".limelight-imagetext-video-modal").each(function () {
    $(this)
      .on("click", function (event) {
        event.preventDefault();
        var mediaIdValue = $(this).children(".mediaIdValue").val();
        var playerIdValue = $(this).children(".playerIdValue").val();
        var limelightPlyerIdGenTextImage = "limelight_player_textimage_" + playerIdValue;

        LimelightPlayerUtil.embed({
          "height": 321,
          "width": 540,
          "mediaId": mediaIdValue,
          "playerId": limelightPlyerIdGenTextImage,
          "playerForm": "LVPPlayer"
        });

      });
  });

  $('.o-textimagebanner-section__image-wrapper').each(function () {
    var textImageBanner = $(this).children().find(".bg-img");
    if (textImageBanner.width() > 705) {
      textImageBanner.addClass("center-crop");
      textImageBanner.addClass("w-100");
    } else {
      textImageBanner.addClass("w-100");
    }
  });

});

/* ready function close*/