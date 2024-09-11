(function (win) {
  if (!win.ABBOTT) {
    win.ABBOTT = {};
  }
  var ABBOTT = win.ABBOTT;
  ABBOTT.videoPlayer = (function () {
    var $wrapper = jQuery(".playVideo");
    var $wrapperEmbed = jQuery(".yt-video-player");
    var videoTitle;

    function replaceWithYT(item) {
      var iframe = item.find("iframe");
      videoTitle = iframe.attr("data-event-label");
      var id = iframe.attr("id");
      if (window.YT) {
        window.YT.ready(function () {
          var ytPlayer1 = new YT.Player(id, {
            events: {
              onStateChange: onPlayerStateChange,
            },
          });
          ytPlayer1.stopVideo();
        });
      }
    }

    function replaceAllWithYT() {
      $wrapperEmbed.each(function (item) {
        replaceWithYT(jQuery(this));
      });
    }

    function playVideo() {
      var $videoPlayer = $(".videoPlayer");
      var $videoPlayerSiblings = $(this).siblings(".videoPlayer");
      jQuery(".playVideo").removeClass("d-none");
      $videoPlayer.addClass("d-none");
      $videoPlayer.find("iframe").attr("src", "");
      $(this).toggleClass("d-none");
      var el = $videoPlayerSiblings.find("iframe");
      var url = el.attr("data-attr");
      var id = el.attr("id");
      url = url + "?autoplay=1&enablejsapi=1";
      $videoPlayerSiblings.toggleClass("d-none");
      el.attr("src", url);
      videoTitle = el.attr("data-event-label");
      ABBOTT.gtm.buildAndPush.formTracking("video", "click", videoTitle);
      var ytPlayer2 = new YT.Player(id, {
        events: {
          onStateChange: onPlayerStateChange,
        },
      });
      ytPlayer2.stopVideo();
    }

    function calculatePercValue(percTime) {
      var PercentageValue = "";
      switch (true) {
        case percTime <= 25: {
          PercentageValue = "25%";
          break;
        }
        case percTime <= 50: {
          PercentageValue = "50%";
          break;
        }
        case percTime <= 75: {
          PercentageValue = "75%";
          break;
        }
        case percTime <= 100: {
          PercentageValue = "100%";
          break;
        }
        default:
          break;
      }
      return PercentageValue;
    }

    function getYoutubePlayPercentage(target) {
      var PercentageValue = "";
      try {
        var videoDuration = target.getDuration();
        var currentTime = target.getCurrentTime();
        var percTime = (currentTime / videoDuration) * 100;
        percTime = Math.round(percTime);
        PercentageValue = calculatePercValue(percTime);
      } catch (err) {}
      return PercentageValue;
    }

    function onPlayerStateChange(event) {
      var playerStatus = event.data;
      var videoPercent;
      switch (playerStatus) {
        case 0: {
          // ended
          videoPercent = getYoutubePlayPercentage(event.target);
          ABBOTT.gtm.buildAndPush.formTracking("video", "complete", videoTitle);
          ABBOTT.gtm.buildAndPush.formTracking(
            "video",
            videoPercent,
            videoTitle
          );
          break;
        }
        case -1: {
          ABBOTT.gtm.buildAndPush.formTracking("video", "click", videoTitle);
          break;
        }
        case 1: {
          ABBOTT.gtm.buildAndPush.formTracking("video", "started", videoTitle);
          break;
        }
        case 2: {
          // paused
          videoPercent = getYoutubePlayPercentage(event.target);
          ABBOTT.gtm.buildAndPush.formTracking("video", "pause", videoTitle);
          ABBOTT.gtm.buildAndPush.formTracking(
            "video",
            videoPercent,
            videoTitle
          );
          break;
        }
        default:
          break;
      }
    }

    if ($wrapperEmbed.length > 0) {
      replaceAllWithYT();
    }

    $wrapper.on("click touchstart", playVideo);
  })();
})(window);
