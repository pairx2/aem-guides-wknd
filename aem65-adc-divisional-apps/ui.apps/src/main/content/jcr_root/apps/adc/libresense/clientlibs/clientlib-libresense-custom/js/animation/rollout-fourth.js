function rolloutFourthSection() {
    /* ---------------------------------------------- Rollout Fourth section  ------------------------------------------- */
    if(!$('#rolloutFourthSecImg').length) {
        $('.m-hero--text-align-center').append(`<div id="rolloutFourthSec">
                                                    <img src=" " id="rolloutFourthSecImg"/>
                                                    <img src="${assetPath}/images/Lab-on-your-arm-image-sensor.png" id="rolloutFourthInitialImg"/>
                                                </div>`)
    }
    addClassOnce('.m-hero--text-align-center','rolloutFourthSecAnime');

    const rolloutFourthSecImg = $('#rolloutFourthSecImg');
    let Fourthimages = [];
    for (let i = 266; i <= 288; i++) {
        let count = pad(i, 5);
        Fourthimages.push(`${assetPath}/sensor-frames/Move04/Move_04_${count}.png`);
    }
    // TweenMax can tween any property of any object. We use this object to cycle through the array
    let Fourthobj = { curImg: 0 };

    function FourthSecAnimeUpdate(e) {
        let directionval = e.target.controller().info("scrollDirection")
        FourthSecAnimeUpdateNew(e, directionval, rolloutFourthSecImg);
    }
    // create tween
    if ($(window).width() > 992) {
        const fourthSectionTextWidth = $('.m-hero--text-align-center.rolloutFourthSecAnime').width();
        let leftFinalvalue = (fourthSectionTextWidth / 2) + 46 + 'px';
        
        if (fourthSectionTextWidth == 1440) {
            leftFinalvalue = "52.7%" //NEW: 53.7% to 52.7%
        }
        //$('#rolloutFourthInitialImg').css({ left: leftFinalvalue }) //NEW: Removed this line
        
        animateFourth({
            Tweens : [
                TweenMax.fromTo('#rolloutFourthSecImg', 0.2, {
                    width: "17%",
                    left: "42%",
                    top: "-453px"
                }, {
                    top: 484,
                    width: "27px",
                    left: leftFinalvalue,
                    ease: Sine.easeIn
                })
            ]
        });
    } else if ($(window).width() < 550) {
        let rolloutFourthSecImgTop;
        if ($(window).width() < 400) {
            rolloutFourthSecImgTop = "325px"// NEW: changed from 357px to 325px
        } else {
            rolloutFourthSecImgTop = "355px" // NEW: changed from 387px to 355px
        }
        animateFourth({
            Tweens : [
                TweenMax.fromTo('#rolloutFourthSecImg', 0.2, {
                    width: "57%",
                    left: "50%",
                    top: "-334px"
                }, {
                    top: rolloutFourthSecImgTop,
                    width: "5%",
                    left: "64%", //NEW: 63% to 64%
                    ease: Sine.easeIn
                })
            ]
        });
    } else if ($(window).width() > 550 && $(window).width() < 767) {        
        animateFourth({
            Tweens : [
                TweenMax.fromTo('#rolloutFourthSecImg', 0.2, {
                    width: "27%",
                    left: "50%",
                    top: "-354px"
                }, {
                    top: 233,
                    width: "2%",
                    left: "54.5%",
                    ease: Sine.easeIn
                })
            ]
        });
    } else {
        animateFourth({
            Tweens: [
                TweenMax.fromTo('#rolloutFourthSecImg', 0.2, {
                    width: "39%",
                    left: "50%",
                    top: "-544px"
                }, {
                    top: 254,
                    width: "2.5%",
                    left: "54%",
                    ease: Sine.easeIn
                })
            ]
        })
    }

    function animateFourth({Tweens=[]}){
        scrollAnimate({
            ImgPosObj:Fourthobj,
            ImgArr: Fourthimages,
            onUpdate : function () {
                rolloutFourthSecImg.attr("src", Fourthimages[Fourthobj.curImg]); // set the image source
            },
            Tweens : Tweens,
            SceneDesc: {
                triggerElement: ".rolloutFourthSecAnime",
                duration: 450,
                offset: -250,
            },
            PinElem: ".rolloutFourthSecImg",
            onEnterLeave: FourthSecAnimeUpdate
        })
    }
    /* ---------------------------------------------- Rollout Fourth section  --------------------------------------------- */

}



function FourthSecAnimeUpdateNew(e, directionval, rolloutFourthSecImg) {
    const rolloutFourthInitialImg = $('#rolloutFourthInitialImg');

    if (e.type == "enter") {

        rolloutFourthSecImg.show()
        rolloutFourthInitialImg.hide()
        $('#myimg').hide()
    } else {
        if (directionval == "REVERSE") {
            rolloutFourthSecImg.hide()
            $('#myimg').show()
        } else {
            $('#rolloutFourthSecAnime').hide()
            rolloutFourthInitialImg.show()
            rolloutFourthSecImg.hide()
        }
    }
}