function rolloutSecondSection() {
    /* ---------------------------------------------- Rollout second section  ------------------------------------------- */
    if (!$('#rolloutSecondSecImg').length)
        $('.m-hero:eq(1)').prepend(`<div id="rolloutSecondSec">
                                        <img src=" " id="rolloutSecondSecImg"/>
                                    </div>`)
    addClassOnce('.m-hero:eq(1)', 'rolloutSecondSecAnime')
  
    /*Commenting this as it is not affecting any animation
    if ($(window).width() < 767) {
        let thirdInitialValue = '-' + $('.rolloutSecondSecAnime .container .m-hero__content').height() + 95 + 'px';
        $('#rolloutThirdInitialImg').css({ top: thirdInitialValue })
    }*/
    let secondimages = [];
    for (let i = 89; i <= 115; i++) {
        let count = pad(i, 5);
        secondimages.push(`${assetPath}/sensor-frames/Move02/Move_02_${count}.png`);
    }
    // TweenMax can tween any property of any object. We use this object to cycle through the array
    let secondobj = { curImg: 0 };

    function SecondSecAnimeUpdate(e) {

        let directionval = e.target.controller().info("scrollDirection")
        SecondSecAnimeUpdateNew(e, directionval);
    }
    // create tween
    if ($(window).width() > 992) {

        animateSecond({
            Tweens: [
                TweenMax.fromTo('#rolloutSecondSecImg', 0.2, {
                    width: "21%",
                    left: "50%",
                    top: "-346"
                }, {
                    top: 499,
                    width: "5%",
                    left: "51%",
                    ease: Sine.easeIn
                })
            ]
        })

    } else if ($(window).width() < 550) {
        animateSecond({
            Tweens: [
                TweenMax.fromTo('#rolloutSecondSecImg', 0.2, {
                    width: "50%",
                    left: "50%",
                    top: "-203px" 
                }, {
                    top: 480, //NEW: 527 to 480
                    width: "12%",
                    left: "99.5%",
                    ease: Sine.easeIn
                })
            ]
        })
    } else if ($(window).width() > 550 && $(window).width() < 767) {
        animateSecond({
            Tweens: [
                TweenMax.fromTo('#rolloutSecondSecImg', 0.2, {
                    width: "28%",
                    left: "50%",
                    top: "-203px"
                }, {
                    top: 227,
                    width: "5.5%",
                    left: "50.5%",
                    ease: Sine.easeIn
                })
            ]
        })

    } else {
        animateSecond({
            Tweens: [
                TweenMax.fromTo('#rolloutSecondSecImg', 0.2, {
                    width: "36%",
                    left: "50%",
                    top: "-296px"
                }, {
                    top: 271,
                    width: "4.5%",
                    left: "50.5%",
                    ease: Sine.easeIn
                })
            ]
        })
    }
    function animateSecond({ Tweens = [] }) {
        scrollAnimate({
            ImgPosObj: secondobj,
            ImgArr: secondimages,
            onUpdate: function () {
                $("#rolloutSecondSecImg").attr("src", secondimages[secondobj.curImg]); // set the image source
            },
            Tweens: Tweens,
            SceneDesc: {
                triggerElement: ".rolloutSecondSecAnime",
                duration: 450,
                offset: -150,
            },
            PinElem: ".rolloutSecondSecImg",
            onEnterLeave: SecondSecAnimeUpdate
        })
    }
    /* ---------------------------------------------- Rollout second section  --------------------------------------------- */
}



function SecondSecAnimeUpdateNew(e, directionval) {
    const rolloutFirstSecImg = $('#rolloutFirstSecImg');
    const rolloutSecondSecImg = $('#rolloutSecondSecImg');
    const loopingSection = $('#looping-sec');
    const glucoseSection = $('#glucose-sec');

    if (e.type == "enter") {
        if (directionval == "REVERSE") {
            rolloutSecondSecImg.show()
            rolloutFirstSecImg.hide()
            if ($(window).width() > 767) {
                loopingSection.hide()
                glucoseSection.hide()
            } else {
                loopingSection.css({ 'visibility': 'hidden' })
                glucoseSection.css({ 'visibility': 'hidden' })
            }
            $('#rolloutThirdInitialImg').hide()
        } else {
            rolloutSecondSecImg.show()
            rolloutFirstSecImg.hide()
            if ($(window).width() > 767) {
                loopingSection.hide()
                glucoseSection.hide()
            } else {
                loopingSection.css({ 'visibility': 'hidden' })
                glucoseSection.css({ 'visibility': 'hidden' })
            }
        }
    } else {
        reverseAnimate(directionval);
    }
}

function reverseAnimate(directionval){
        const rolloutFirstSecImg = $('#rolloutFirstSecImg');
        const rolloutSecondSecImg = $('#rolloutSecondSecImg');
        const loopingSection = $('#looping-sec');
        const glucoseSection = $('#glucose-sec');

    if (directionval == "REVERSE") {
        rolloutSecondSecImg.hide()
        rolloutFirstSecImg.show()

        if ($(window).width() > 767) {
            loopingSection.show()
            glucoseSection.show()
        } else {
            loopingSection.css({ 'visibility': 'visible' })
            glucoseSection.css({ 'visibility': 'visible' })
        }
        if ($(window).width() > 767) {
            setTimeout(function () {
                videoFrame.play()
                videoFrame1.play()
            }, 100)
        } else {
            videoFrame.play()
            videoFrame1.play()
        }
    } else {
        rolloutSecondSecImg.hide()
        rolloutFirstSecImg.hide()
        $('#rolloutThirdInitialImg').show()
    }

}