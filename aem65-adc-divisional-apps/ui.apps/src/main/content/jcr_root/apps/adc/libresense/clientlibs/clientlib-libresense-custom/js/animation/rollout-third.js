function rolloutThirdSection(){
    /* ---------------------------------------------- Rollout Third section  ------------------------------------------- */
    if(!$('#rolloutThirdSecImg').length) {
        $('.m-hero:eq(1)').append(`<div id="rolloutThirdSec">
                                        <img src=" " id="rolloutThirdSecImg"/>
                                        <img src="${assetPath}/images/Fueling-Image-Sensor.png" id="rolloutThirdInitialImg"/>
                                    </div>`)
    }
    addClassOnce('.m-hero:eq(1)','rolloutThirdSecAnime')
    const rolloutThirdSecImg = $('#rolloutThirdSecImg');
    const thirdSectionContentHeight = $('.rolloutThirdSecAnime .container .m-hero__content').height();
    let Thirdimages = [];
    for (let i = 144; i <= 175; i++) {
        let count = pad(i, 5);
        Thirdimages.push(`${assetPath}/sensor-frames/Move03/Move_03_${count}.png`);
    }
    // TweenMax can tween any property of any object. We use this object to cycle through the array
    let Thirdobj = { curImg: 0 };

    let thirdValuePlace;
    let thirdValueDuration;

    function ThirdSecAnimeUpdate(e) {
        let directionval = e.target.controller().info("scrollDirection")
        ThirdSecAnimeUpdateNew(e, directionval, rolloutThirdSecImg);
    }
    if ($(window).width() > 992) {
        // create tween
        animateThird({
            Tweens: [
                TweenMax.fromTo('#rolloutThirdSecImg', 0.2, {
                    width: "5%",
                    left: "51%",
                    top: "499px"
                }, {
                    top: 907,
                    width: "18%",
                    left: "50%",
                    ease: Sine.easeIn
                })
            ],
            SceneDesc: {
                triggerElement: ".rolloutThirdSecAnime",
                duration: 450,
                offset: 400,
            }
        })
    } else if ($(window).width() < 550) {
        thirdValuePlace = 907 + thirdSectionContentHeight + 132 + 'px';
        thirdValueDuration = 450 + thirdSectionContentHeight + 132 + 'px';
        
        animateThird({
            Tweens: [
                TweenMax.fromTo('#rolloutThirdSecImg', 0.2, {
                    width: "12%",
                    left: "99.5%",
                    top: "480px" // NEW: 525px to 480px
                }, {
                    top: thirdValuePlace,
                    width: "53%",
                    left: "50%",
                    ease: Sine.easeIn
                })
            ],
            SceneDesc: {
                triggerElement: ".rolloutThirdSecAnime",
                duration: thirdValueDuration,
                offset: 400,
            }
        });
    } else if ($(window).width() > 550 && $(window).width() < 767) {
        thirdValuePlace = 552 + thirdSectionContentHeight + 132 + 'px';
        thirdValueDuration = 229 + thirdSectionContentHeight + 132 + 'px';
        
        animateThird({
            Tweens: [
                TweenMax.fromTo('#rolloutThirdSecImg', 0.2, {
                    width: "5%",
                    left: "50%",
                    top: "231px"
                }, {
                    top: thirdValuePlace,
                    width: "26%",
                    left: "50%",
                    ease: Sine.easeIn
                })
            ],
            SceneDesc: {
                triggerElement: ".rolloutThirdSecAnime",
                duration: thirdValueDuration,
                offset: 300,
            }
        })
    } else {
        thirdValuePlace = 552 + thirdSectionContentHeight + 132 + 'px';
        thirdValueDuration = 229 + thirdSectionContentHeight + 132 + 'px';
        
        animateThird({
            Tweens: [
                TweenMax.fromTo('#rolloutThirdSecImg', 0.2, {
                    width: "4.5%",
                    left: "51%",
                    top: "274px",
                }, {
                    top: thirdValuePlace,
                    width: "53%",
                    left: "50%",
                    ease: Sine.easeIn
                })
            ],
            SceneDesc: {
                triggerElement: ".rolloutThirdSecAnime",
                duration: thirdValueDuration,
                offset: 400,
            }
        })
    }
    function animateThird({Tweens=[], SceneDesc}){
        scrollAnimate({
            ImgPosObj:Thirdobj,
            ImgArr: Thirdimages,
            onUpdate : function() {
                rolloutThirdSecImg.attr("src", Thirdimages[Thirdobj.curImg]); // set the image source
                if (Thirdobj.curImg > 7) { rolloutThirdSecImg.css({ opacity: 1 }) } else {
                    rolloutThirdSecImg.css({ opacity: 0.7 })
                }
            },
            Tweens : Tweens,
            SceneDesc: SceneDesc,
            PinElem: ".rolloutThirdSecImg",
            onEnterLeave: ThirdSecAnimeUpdate
        })
    }
    /* ---------------------------------------------- Rollout Third section  --------------------------------------------- */

}



function ThirdSecAnimeUpdateNew(e, directionval, rolloutThirdSecImg) {
    const rolloutThirdInitialImg = $('#rolloutThirdInitialImg');

    if (e.type == "enter") {
        rolloutThirdSecImg.show()
        rolloutThirdInitialImg.hide()
        if (directionval == "REVERSE") {
            $("#myimg").hide()

        }
    } else {
        if (directionval == "REVERSE") {
            rolloutThirdSecImg.hide()
            rolloutThirdInitialImg.show()
        } else {
            rolloutThirdSecImg.hide()
            $("#myimg").show()
        }

    }
}