function rolloutFirstSection() {
    /* ---------------------------------------------- Rollout first section  ------------------------------------------- */
    if (!$('#rolloutFirstSecImg').length)
        $('.m-hero').eq(0).append(`<div id="rolloutFirstSec">
                                    <img src=" " id="rolloutFirstSecImg"/>
                                    <img src="${assetPath}/images/masthead-sensor-one.png" id="rolloutFirstInitialImg"/>
                                    <img src="${assetPath}/images/LibreSense-MastheadDots-one.gif" id="rolloutDotAnime"/> 
                                </div>`)

    addClassOnce('.m-hero', 'rolloutFirstSecWrapper', 0);
    addClassOnce('.m-hero section', 'rolloutFirstSecAnime', 0);

    const rolloutFirstSecImg = $('#rolloutFirstSecImg');
    const rolloutFirstInitialImg = $('#rolloutFirstInitialImg');
    const dotAnimationGif = $('#rolloutDotAnime');
    //get the height, width of the image section wrapper
    const actualHeight = $('.rolloutFirstSecWrapper').height();
    const actualWidth = $('.rolloutFirstSecWrapper').width();
    let leftValue = (actualWidth - 768) + 504 + 'px';
    let leftValueIn = (actualWidth - 768) + 492 + 'px';
    let leftValueDots = (actualWidth - 768) + 303 + 'px';


    let firstimages = [];
    for (let i = 39; i <= 57; i++) {
        let count = pad(i, 5);
        firstimages.push(`${assetPath}/sensor-frames/Move01/Move_01_${count}.png`);
    }
    // TweenMax can tween any property of any object. We use this object to cycle through the array
    let firstobj = { curImg: 0 };

    function FirstSecAnimeUpdate(e) {
        let directionval = e.target.controller().info("scrollDirection")
        FirstSecAnimeUpdateNew(e, directionval, rolloutFirstSecImg, rolloutFirstInitialImg);
    }
    let firstsensorEnd;
    let firstSensrorLength;

    if ($(window).width() > 992) {
        let bottomValue = (((actualHeight - 640) / 2.5) + 192) + 'px';
        let [rightValue, bottomValueDots] = setWidth(actualWidth, actualHeight);
        rolloutFirstSecImg.css({ 'bottom': bottomValue, 'left': rightValue });
        rolloutFirstInitialImg.css({ 'bottom': bottomValue, 'left': rightValue });
        dotAnimationGif.css({ 'bottom': bottomValueDots, 'left': rightValue });
        // create tween

        let sceneDescription = createTween();

        animateFirst({
            Tweens: [
                TweenMax.fromTo('#rolloutFirstSecImg', 0.2, {
                    bottom: bottomValue,
                    left: rightValue,
                    width: 42,
                }, {
                    bottom: -618,
                    width: 270,
                    left: "50%",
                    ease: Sine.easeIn
                }),
                TweenMax.fromTo('#rolloutDotAnime', 0.2, {
                    bottom: bottomValueDots,
                    left: rightValue,
                    width: 600
                }, {
                    bottom: -900,
                    width: 800,
                    left: 700,
                    ease: Sine.easeIn
                })
            ],
            SceneDesc: sceneDescription
        })
    } else if ($(window).width() < 550) {
        let rolloutDotAnimeTop = "309px";
        let rolloutFirstSecImgTop = "483px";
        let rolloutFirstSecImgLeft = "259px";

        // create tween
        firstSensrorLength = $('.rolloutFirstSecAnime .container').height() +
            (($('#graphSectionscroll').height()) / 2) + 268; //NEW: changed from 350  to 268
        if ($(window).width() < 400) {
            rolloutDotAnimeTop = "321px";
            rolloutFirstSecImgTop = "477px";
            rolloutFirstSecImgLeft = "244px";
            firstSensrorLength = 9 + firstSensrorLength; //NEW: added +4 for smaller screen
        }
        firstsensorEnd = 448 + firstSensrorLength;

        animateFirst({
            Tweens: [
                TweenMax.fromTo('#rolloutFirstSecImg', 0.2, {
                    top: rolloutFirstSecImgTop,
                    left: rolloutFirstSecImgLeft,
                    width: "26px",
                }, {
                    top: firstsensorEnd,
                    width: "47%",
                    left: "50%",
                    ease: Sine.easeIn
                }),
                TweenMax.fromTo('#rolloutDotAnime', 0.2, {
                    top: rolloutDotAnimeTop,
                    left: "74px"
                }, {
                    top: firstsensorEnd - 50,
                    left: 10,
                    ease: Sine.easeIn
                })
            ],
            SceneDesc: {
                triggerElement: ".rolloutFirstSecAnime",
                duration: firstSensrorLength,
                offset: 300,
            }
        })
    } else if ($(window).width() > 550 && $(window).width() < 767) {
        leftValue = (actualWidth - 550) + 325 + 'px';
        leftValueIn = (actualWidth - 550) + 314 + 'px';
        leftValueDots = (actualWidth - 550) + 166 + 'px';
        rolloutFirstInitialImg.css({ 'left': leftValueIn })
        dotAnimationGif.css({ 'left': leftValueDots })
        // create tween
        firstSensrorLength = $('.rolloutFirstSecAnime .container').height() +
            ($('#graphSectionscroll').innerHeight());
        firstsensorEnd = 245 + firstSensrorLength;

        animateFirst({
            Tweens: [
                TweenMax.fromTo('#rolloutFirstSecImg', 0.2, {
                    top: 191,
                    left: leftValue,
                    width: "3.5%"
                }, {
                    top: firstsensorEnd,
                    width: "28%",
                    left: "50%",
                    ease: Sine.easeIn
                }),
                TweenMax.fromTo('#rolloutDotAnime', 0.2, {
                    top: "42px",
                    left: leftValueDots,
                    width: 320
                }, {
                    top: firstsensorEnd - 10,
                    width: 700,
                    left: 100,
                    ease: Sine.easeIn
                })
            ],
            SceneDesc: {
                triggerElement: ".rolloutFirstSecAnime",
                triggerHook: 0.43,
                duration: firstSensrorLength,
                offset: 200,
            }
        })
    } else {
        rolloutFirstInitialImg.css({ 'left': leftValueIn })
        dotAnimationGif.css({ 'left': leftValueDots })
        // create tween
        firstSensrorLength = $('.rolloutFirstSecAnime .container').height() +
            ($('#graphSectionscroll').innerHeight() / 2);
        firstsensorEnd = 533 + firstSensrorLength - 76; //NEW: -76

        animateFirst({
            Tweens: [
                TweenMax.fromTo('#rolloutFirstSecImg', 0.2, {
                    top: 235,
                    left: leftValue,
                    width: "3.5%",
                }, {
                    top: firstsensorEnd + 7,
                    width: "34%",
                    left: "50%",
                    ease: Sine.easeIn
                }),
                TweenMax.fromTo('#rolloutDotAnime', 0.2, {
                    top: "50px",
                    left: leftValueDots,
                    width: 400
                }, {
                    top: firstsensorEnd - 10,
                    width: 700,
                    left: 100,
                    ease: Sine.easeIn
                })
            ],
            SceneDesc: {
                triggerElement: ".rolloutFirstSecAnime",
                triggerHook: 0.38,
                duration: firstSensrorLength,
                offset: 350,
            }
        })
    }

    function animateFirst({ Tweens = [], SceneDesc }) {
        scrollAnimate({
            ImgPosObj: firstobj,
            ImgArr: firstimages,
            onUpdate: function () {
                rolloutFirstSecImg.attr("src", firstimages[firstobj.curImg]); // set the image source
                if (firstobj.curImg > 0) {
                    dotAnimationGif.hide()
                } else if (firstobj.curImg == 0) {
                    dotAnimationGif.show()
                }
            },
            Tweens: Tweens,
            SceneDesc: SceneDesc,
            PinElem: ".rolloutFirstSecImg",
            onEnterLeave: FirstSecAnimeUpdate
        })
    }
    /* ---------------------------------------------- Rollout first section  --------------------------------------------- */
}



function FirstSecAnimeUpdateNew(e, directionval, rolloutFirstSecImg, rolloutFirstInitialImg) {
    const loopingSection = $('#looping-sec');
    const glucoseSection = $('#glucose-sec');

    if (e.type == "enter") {
        rolloutFirstSecImg.show();
        rolloutFirstInitialImg.hide();
        if ($(window).width() > 767) {
            loopingSection.hide();
            glucoseSection.hide();
        } else {
            loopingSection.css({ 'visibility': 'hidden' });
            glucoseSection.css({ 'visibility': 'hidden' });
        }

    } else {
        if (directionval == "REVERSE") {
            rolloutFirstSecImg.hide();
            rolloutFirstInitialImg.show();
            if ($(window).width() > 767) {
                loopingSection.hide()
                glucoseSection.hide()
            } else {
                loopingSection.css({ 'visibility': 'hidden' });
                glucoseSection.css({ 'visibility': 'hidden' });
            }
            dotAnimationGif.show();
        } else {
            ifNotReverse(rolloutFirstInitialImg);

        }
    }
}

function ifNotReverse(rolloutFirstInitialImg){
    const loopingSection = $('#looping-sec');
    const glucoseSection = $('#glucose-sec');
    rolloutFirstInitialImg.show();
    if ($(window).width() > 767) {
        loopingSection.show();
        glucoseSection.show();
    } else {
        loopingSection.css({ 'visibility': 'visible' });
        glucoseSection.css({ 'visibility': 'visible' });
    }

}

function setWidth(actualWidth, actualHeight){
    let rightValue, bottomValueDots;
    if (actualWidth == 1440) {
        rightValue = ((471 - ((actualHeight - 640) / 4)) + 469) + 'px';
        bottomValueDots = '-' + (((actualHeight - 640) / 2.5) + 87) + 'px';

    } else {
        rightValue = ((471 - ((1440 - actualWidth) / 2.1)) + 460) + 'px';
        bottomValueDots = '-' + (((actualHeight - 640) / 2.5) + 89) + 'px';
    }
 return [rightValue, bottomValueDots];
}

function createTween(){
    let sceneDescription = null;
    if ($(window).width() > 1700) {
        sceneDescription = {
            triggerElement: ".rolloutFirstSecAnime",
            triggerHook: 0.4,
            duration: 480,
            offset: 430
        };
    } else {
        sceneDescription = {
            triggerElement: ".rolloutFirstSecAnime",
            duration: 480,
            offset: 400
        };
    }
    return sceneDescription;

}