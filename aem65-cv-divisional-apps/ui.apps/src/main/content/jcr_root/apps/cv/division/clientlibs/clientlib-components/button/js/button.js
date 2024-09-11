$(document).ready(function () {
  /* youtube video player */
  $(".a-btn--yt-video ").each(function () {
    $(this)
      .find("a.a-btn-button")
      .on("click", function (event) {
        var videoId = $(this).find(".yt-id").val();
        $(".yt-video-modal")
          .find(".yt-video-player")
          .attr("yt-id", videoId);
        var video = $(".yt-video-modal")
          .find(".yt-video-player")
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
  $(".a-btn--limelight-video").each(function () {
    $(this)
      .find("a.a-btn-button")
      .on("click", function (event) {
        event.preventDefault();
        var mediaId = $(this).children(".mediaId").val();
        var playerId = $(this).children(".playerId").val();
        var limelightPlyerIdGen = "limelight_player_" + playerId;

        LimelightPlayerUtil.embed({
          "height": 321,
          "width": 540,
          "mediaId": mediaId,
          "playerId": limelightPlyerIdGen,
          "playerForm": "LVPPlayer"
        });

      });
  });

  /* BrightCove player */
  $(".brightcove-video-modal").each(function () {
    $(this)
      .on("click", function (event) {
        event.preventDefault();

        var accountID = $(this).children(".accountID").val();
        var brightVideoID = $(this).children(".brightVideoID").val();
        var brightPlayerID = $(this).children(".brightPlayerID").val();
        let s = document.createElement("script");


        var playerHTML = '<video-js id="myPlayerID" data-video-id="' + brightVideoID + '"  data-account="' + accountID + '" data-player="' + brightPlayerID + '"data-embed="default" loop controls ></video-js>';
        $(".placeHolder").html(playerHTML);
        s.src = "https://players.brightcove.net/" + accountID + "/" + brightPlayerID + "_default/index.min.js";
        $(".placeHolder").append(s);

      });
  });

});

/* ready function close*/