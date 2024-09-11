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

  /* Full width if image size more than content inside column control */
  $(".columncontrol .o-textimage-section").each(function () {
    var widthTextImageSection = $(this).width();
    var widthImageWidth = $(this).find(".o-textimage-section__image-wrapper img").width();
    if (widthImageWidth > widthTextImageSection) {
      $(this).find(".o-textimage-section__row").addClass("flex-wrap");
      $(this).find(".o-textimage-section__image-wrapper").addClass("mx-0");
      $(this).find(".o-textimage-section__image-wrapper img").addClass("w-100");
    }
  });

});

/* ready function close*/

$(window).on('load resize', function() {
  $('.o-textimage-section__image-wrapper').each(function () {
    var textImage = $(this).children().find(".o-textimage-section__image");
    var imageCaption = $(this).find(".o-textimage-section__image-caption");
    var imageCaptionVal = $.trim(imageCaption.text());
    var imageColumn = $(this).find(".o-textimage-section__image-column");
    var widthImageVal = $(this).find(".o-textimage-section__image-column img").width();
    var imageCaptionText = $(this).find(".o-textimage-section__image-caption");
    imageCaptionText.css("width", widthImageVal);
    if (textImage.width() > 420) {
      textImage.addClass("m-full-width");
    }
    if (imageCaptionVal === '') {
      imageColumn.addClass("no-caption");
    }

  });

});

/* ready function close*/