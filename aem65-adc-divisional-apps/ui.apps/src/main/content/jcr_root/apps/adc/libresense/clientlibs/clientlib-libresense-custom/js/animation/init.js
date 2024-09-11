const pad = function (number, length) {
    let str = "" + number;
    while (str.length < length) {
        str = "0" + str;
    }
    return str;
}
let controller = null;
let isScrollDone = 0;

//Testing browser resize thing
let tweenTargets = [];
let tweenAnimations = [];

const assetPath = "/content/dam/adc/libresense/global"; //Asset path for libresense

function addClassOnce(selector, className, order) {
    if (!$(selector + "." + className).length) {
        if (order != undefined)
            $(selector).eq(0).addClass(className);
        else
            $(selector).addClass(className);
    }
}
function homeAnimation() {

    if (location.pathname.indexOf('home.html') !== -1) {

        if (controller != null) {
            console.log("Reseting animations")
            tweenTargets.forEach(function(target){
                TweenMax.set(`#${target}`, {clearProps: "all"});
            })
            tweenAnimations.forEach(function(timeLineMax){
                timeLineMax.clear();
            })
            controller.destroy(true);
            controller = null;
        }
        controller = new ScrollMagic.Controller();

        clusterSection();

        graphSection();

        rolloutFirstSection();

        rolloutSecondSection();

        rolloutThirdSection();

        rolloutFourthSection();

    }
}

//For adding Tweens to scrollmagic controller
function scrollAnimate({ ImgPosObj, ImgArr, Stagger = 0, onUpdate, Tweens = [],
    SceneDesc, PinElem, onEnterLeave }) {
    let _tween = new TimelineMax().add([
        TweenMax.to(ImgPosObj, 0.2, {
            curImg: ImgArr.length - 1, // animate propery curImg to number of images
            roundProps: "curImg",
            immediateRender: true, // load first image automatically
            ease: Sine.easeIn,
            stagger: Stagger,
            onUpdate: onUpdate
        }),
        ...Tweens
    ])
    new ScrollMagic.Scene(SceneDesc)
        .setTween(_tween)
        .setPin(PinElem)

        .on("enter leave", onEnterLeave)
        .addTo(controller);

    //Storing tweens and its targets to remove later
    Tweens.forEach(function(tween){
        const targets = tween.targets(); //changed according to gsap 3.7.0 API
        for (target of targets){
            tweenTargets.push(target.id)
        }
    })
    tweenAnimations.push(_tween);
}

function scrollAnimation(count, img) {
    $(window).scroll(function () {
        if (isScrollDone == 0) {
            for (let i = 1; i <= 295; i++) {
                count = pad(i, 5);
                img = new Image();
                img.src = `${assetPath}/sensor-explode/LibreSensor_ExplodeView_${count}.jpg`;
            }
            for (let i = 266; i <= 288; i++) {
                count = pad(i, 5);
                img = new Image();
                img.src = `${assetPath}/sensor-frames/Move04/Move_04_${count}.png`;
            }
            isScrollDone = 1
        }
    })
}

//For showing text on scroll
function showText({ wrapperElement, order }) {
    $(`${wrapperElement} .title`).hide()
    $(`${wrapperElement} .text`).hide()
    $(`${wrapperElement} .title`).eq(order).show()
    $(`${wrapperElement} .text`).eq(order).show()
}

$(document).ready(function () {
  if (location.pathname.indexOf('home.html') !== -1) {
    let count;
    let img;

    for (let i = 39; i <= 57; i++) {
        count = pad(i, 5);
        img = new Image();
        img.src = `${assetPath}/sensor-frames/Move01/Move_01_${count}.png`;
    }
    for (let i = 89; i <= 115; i++) {
        count = pad(i, 5);
        img = new Image();
        img.src = `${assetPath}/sensor-frames/Move02/Move_02_${count}.png`;
    }
    for (let i = 144; i <= 175; i++) {
        count = pad(i, 5);
        img = new Image();
        img.src = `${assetPath}/sensor-frames/Move03/Move_03_${count}.png`;
    }
    scrollAnimation(count, img);
    homeAnimation();
  }
});