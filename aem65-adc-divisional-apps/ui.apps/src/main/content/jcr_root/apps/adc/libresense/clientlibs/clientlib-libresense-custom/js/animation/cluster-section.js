function clusterSection() {
  /*---------------------------------------------- Cluster section -------------------------------------------------- */

  addClassOnce(
    ".m-hero:eq(1)+.container .columncontrol .col-12.col-md-12.col-lg-12",
    "clusterwrapper"
  );
  addClassOnce(".m-hero:eq(1)+.container", "clusterClass");
  if (!$("#imagesequence").length)
    $(".m-hero:eq(1)+.container .clusterwrapper").append(
      '<div id="imagesequence" ><img id="myimg"/></div>'
    );
  $(".m-hero:eq(1)+.container .columncontrol .col-12.col-md-12.col-lg-12").attr(
    "id",
    "clusterid"
  );

  let clusterCount = 295;
  // define images
  let images = [];
  for (let i = 21; i <= clusterCount; i++) {
    let count = pad(i, 5);
    images.push(
      `${assetPath}/sensor-explode/LibreSensor_ExplodeView_${count}.jpg`
    );
  }

  function clusterupdateBox(e) {
    let directionval = e.target.controller().info("scrollDirection");
    clusterupdateBoxNew(e, directionval);
  }

  // TweenMax can tween any property of any object. We use this object to cycle through the array
  let obj = { curImg: 0 };

  // create tween
  let offset = 250, duration = 4500;

  if ($(window).width() > 767 && $(window).width() < 992) {
    duration = 3500;
    offset = 400;
  } else if ($(window).width() > 992) {
    offset = 350;
  }

  let SceneDesc = {
    triggerElement: ".clusterwrapper",
    duration,
    offset
  };

  scrollAnimate({
    ImgPosObj: obj,
    ImgArr: images,
    onUpdate: function () {
      $("#myimg").attr("src", images[obj.curImg]); 
      scrollAnimationUpdate(obj);
    },
    SceneDesc: SceneDesc,
    PinElem: ".clusterwrapper",
    onEnterLeave: clusterupdateBox,
  });
  /* ---------------------------------------------- Cluster section -------------------------------------------------- */
}

function clusterupdateBoxNew(e, directionval) {
  if (e.type == "enter") {
    if ($(window).width() < 550) {
      if (directionval == "REVERSE") {
        $("#clusterid").css({ "padding-top": "50px" });
      } else {
        $("#clusterid").css({ "padding-top": "30px" });
      }
    }
    $("#myimg").css({
      display: "block",
    });
  } else {
    if (directionval == "REVERSE") {
      $("#myimg").hide();
      $("#rolloutThirdSecImg").show();
    } else {
      $("#myimg").hide();
      $("#rolloutFourthSecImg").show();
    }
  }
}

function scrollAnimationUpdate(obj) {
  if (obj.curImg > 78 && obj.curImg < 155) {
    if ($(".clusterwrapper .title").eq(1).length > 0) {
      showText({ wrapperElement: ".clusterwrapper", order: 1 });
    }
  } else if (obj.curImg > 156 && obj.curImg < 234) {
    if ($(".clusterwrapper .title").eq(2).length > 0) {
      showText({ wrapperElement: ".clusterwrapper", order: 2 });
    }
  } else if (obj.curImg > 234) {
    if ($(".clusterwrapper .title").eq(3).length > 0) {
      showText({ wrapperElement: ".clusterwrapper", order: 3 });
    }
  } else if (obj.curImg < 78) {
    showText({ wrapperElement: ".clusterwrapper", order: 0 });
  }
}