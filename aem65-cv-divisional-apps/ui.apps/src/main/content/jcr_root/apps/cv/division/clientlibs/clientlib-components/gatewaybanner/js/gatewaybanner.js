$(document).ready(function () {

  /* youtube video player */
  $(".yt-modal-open-gatewaybanner").each(function () {
    $(this)
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
  $(".limelight-video-modal").each(function () {
    $(this)
      .on("click", function (event) {
        event.preventDefault();
        var mediaIdValue = $(this).children(".mediaId").val();
        var playerIdValue = $(this).children(".playerId").val();
        var limelightPlyerIdGenValue = "limelight_player_" + playerIdValue;

        LimelightPlayerUtil.embed({
          "height": 321,
          "width": 540,
          "mediaId": mediaIdValue,
          "playerId": limelightPlyerIdGenValue,
          "playerForm": "LVPPlayer"
        });

      });
  });
});



if (window.innerWidth > 767) {
  /* Gateway Banner - panel height fix for each individual comp */
  $('.gatewayBannerComp, .gatewayBannerComp.mac-chrome').each(function () {
    var maxHeight = 0;
    if (maxHeight < $(this).children().find("li").height()) {
      maxHeight = $(this).children().find("li").height();
      var liItem = $(this).children().find("li");
      liItem.each(function () {
        if (maxHeight < $(this).outerHeight()) {
          maxHeight = $(this).outerHeight();

        }
      });
      $(this).children().find("li").height(maxHeight);
    }
  });
}

$('.gatewayBannerComp, .gatewayBannerComp.mac-chrome').each(function () {
  /* Gateway Banner - Height control */
  var checkHeightControl = $(this).children().find(".height-control").val();
  if (checkHeightControl != "true") {
    var gatewaySectionHeight = $(this).children().find(".gateway-container").height();
    var gatewayImageHeight = $(this).children().find(".bg-img");
    gatewayImageHeight.height(gatewaySectionHeight);
    gatewayImageHeight.addClass("center-crop");
  }

  /* Gateway Banner - Show Hide desc on Mobile*/
  if (window.innerWidth < 767) {
    var liItem = $(this).children().find("li");
    liItem.each(function () {
      var checkDisplayMobile = $(this).find(".display-desc-mobile").val();
      if (checkDisplayMobile == "true") {
        var panelDesc = $(this).children().find(".panel-desc");
        panelDesc.addClass("d-block");
      }
    });
  }

});


if (window.innerWidth < 767) {
  $('.gatewayBannerComp .bg-type-image, .gatewayBannerComp.mac-chrome .bg-type-image').each(function () {
    var imgSrc = $(this).find(".img-src").val();
    var bgcolorVal = $(this).find(".bgcolor-val").val();
    if ($(this).next(".gatewayBnrsection-bg-img-mobile").hasClass("hideImage")) {
      $(this).find(".bg-img.hide-img-mobile").css("display", "");
      $(this).find('.gatewayBnrsection-bg').addClass(bgcolorVal);
    } else if ($(this).next(".gatewayBnrsection-bg-img-mobile").hasClass("imageBelowText")) {
      $(this).find(".bg-img.hide-img-mobile").css("display", "");
      $(this).find('.gatewayBnrsection-bg').addClass(bgcolorVal);
      $(this).find(".gatewayBnrsection-bg-img-mobile.imageBelowText").css("display", "block !important");
    } else if ($(this).next(".gatewayBnrsection-bg-img-mobile").hasClass("bg-img-mobile")) {
      $(this).find(".bg-img.hide-img-mobile").attr("src", imgSrc);
      var className = $(this).find('.gatewayBnrsection-bg').attr('class').split(' ')[1];
      $(this).find('.gatewayBnrsection-bg').removeClass(className);
    }
  });
  $('.gatewayBannerComp .bg-type-solidclr, .gatewayBannerComp.mac-chrome .bg-type-solidclr').each(function () {
    var bgcolorVal = $(this).find(".bgcolor-val").val();
    if ($(this).next(".gatewayBnrsection-bg-img-mobile").hasClass("hideImage")) {
      $(this).find(".bg-img.hide-img-mobile").css("display", "none");
      $(this).find('.gatewayBnrsection-bg').addClass(bgcolorVal);
    } else if ($(this).next(".gatewayBnrsection-bg-img-mobile").hasClass("imageBelowText")) {
      $(this).find(".bg-img.hide-img-mobile").css("display", "none");
      $(this).find('.gatewayBnrsection-bg').addClass(bgcolorVal);
      $(this).find(".gatewayBnrsection-bg-img-mobile.imageBelowText").css("display", "block !important");
    } else if ($(this).next(".gatewayBnrsection-bg-img-mobile").hasClass("bg-img-mobile")) {
      //  $(this).find(".bg-img.hide-img-mobile").attr("src",imgSrc);
      $(this).find(".bg-img.hide-img-mobile").css("display", "block");
      var className = $(this).find('.gatewayBnrsection-bg').attr('class').split(' ')[1];
      $(this).find('.gatewayBnrsection-bg').removeClass(className);
    }
  });

}
/* ready function close*/


/* Fix Background image crop on Resize */
if (window.innerWidth < 767) {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $('.gatewayBannerComp, .gatewayBannerComp.mac-chrome').each(function () {
      $(this).find(".bg-img").addClass("resizewidth");
      var bgSecHgt = $(this).find('.gatewayBnrsection-bg').css('height');
      $(this).find(".resizewidth").css('height', bgSecHgt);
      if ($(this).find('.gatewayBnrsection-bg-img-mobile').hasClass('hideImage')) {
        $(this).find('.resizewidth').attr('src', '');
      }
    });
  }
}

/* gateway Banner disable panel logic - */
if ($(".gatewayBannerComp").length) {
  $(".gatewayBannerComp .cards li.bgColorforCard").each(function () {
    if ($(this).find('a[disabled="disabled"]').length) {
      $(this).addClass("disabled");
    }
  });
}