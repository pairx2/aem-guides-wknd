$(function () {
  function initializeLimelightVideo(dataTarget) {
    let playerID = $(dataTarget).find(".limelightPlayerID").val();
    let mediaID = $(dataTarget).find(".limelightMediaID").val();
    let playerForm = "Player";

    let LVPwidth = +$(dataTarget).width();
    let LVPheight = LVPwidth * 0.56;

    LimelightPlayerUtil.embed({
      mediaId: mediaID,
      playerForm: playerForm,
      playerId: playerID,
      width: LVPwidth,
      height: LVPheight,
      autoplay: true,
    });
  }

  $(".story-card-container .story-card a.video-story").each(function () {
    let $videoStory = $(this);
    $videoStory.on("click", function () {
      let dataTarget = $videoStory.attr("data-target");

      if ($videoStory.hasClass("limelightVideo")) {
        initializeLimelightVideo(dataTarget);
      } else if ($videoStory.hasClass("ytVideo")) {
        let videoSource =
          $(this).parent().find(dataTarget).find(".youtubeVideosrc").val() +
          "?autoplay=1";
        $(dataTarget).find("iframe.youtubeVideoFrame").attr("src", videoSource);
      }

      $(".story-container .popupOverlay").fadeIn("fast");
      $(dataTarget).fadeIn("fast");
    });
  });

  $(".story-container .popupClose").each(function () {
    $(this).on("click", function () {
      $(this).parent().fadeOut("fast");
      $(".story-container .popupOverlay").fadeOut("fast");
      if ($(this).parent().hasClass("limelightOverlay")) {
        $(this).next(".limelight-player").empty();
      } else if ($(this).parent().hasClass("youtubeOverlay")) {
        $(this).next(".youtubeVideoFrame").attr("src", "");
      }
    });
  });

});
