let videoFrame,videoFrame1; 
function graphSection() {
    /*------------------------- graph sec ---------------------------------------------*/
    addClassOnce('.m-hero+.container.a-container--dark .cmp-container .columncontrol .row .col-12.col-md-12.col-lg-12 ','graphsecwrapper')
    addClassOnce('.m-hero+.container.a-container--dark .cmp-container','graphtrigger')
    
    $('.m-hero+.container.a-container--dark .cmp-container').attr('id', 'graphSectionscroll')
    
    if($('#graphVideoWrapper').length) {
        $('#graphVideoWrapper').remove();// removing element first if exists
    }
    if ($(window).width() > 767) {
        $('.m-hero+.container.a-container--dark').append(`<div id="graphVideoWrapper">
                                                            <video id="looping-sec" muted="muted" loop><source src="${assetPath}/Libre_GraphLoop_Desktop.mp4" type="video/mp4">
                                                            </video> <video id="glucose-sec" muted="muted" loop><source src="${assetPath}/Glucose.mp4" type="video/mp4"></video>
                                                        </div>`)
    } else {
        $('.m-hero+.container.a-container--dark').append(`<div id="graphVideoWrapper">
                                                            <video id="looping-sec" muted playsinline loop><source src="${assetPath}/Libre_GraphLoop_Mobile.mp4" type="video/mp4">
                                                            </video> <video id="glucose-sec" muted playsinline loop><source src="${assetPath}/Glucose.mp4" type="video/mp4"></video>
                                                        </div>`)
    }
    videoFrame = $('#looping-sec').get(0);
    videoFrame1 = $('#glucose-sec').get(0);
    if ($(window).width() < 767) {
        videoFrame.play()
        videoFrame1.play()
    }

    function graphupdateBox(e) {
        if (e.type == "enter") {
            if ($(window).width() > 767) {
                setTimeout(function () {
                    videoFrame.play()
                    videoFrame1.play()
                }, 100)
            } else {
                $('#looping-sec').css({ 'visibility': 'visible' })
                $('#glucose-sec').css({ 'visibility': 'visible' })
            }
            setTimeout(function () {
                showText({wrapperElement: ".graphsecwrapper", order:1});
            }, 600)

        } else {
            showText({wrapperElement: ".graphsecwrapper", order:0});
        }
    }


    if ($(window).width() > 767 && $(window).width() < 992) {
        new ScrollMagic.Scene({
            triggerElement: ".graphtrigger",
            duration: "100%",
            offset: 280
        }).on("enter leave", graphupdateBox)
        .addTo(controller);
    } else {
        new ScrollMagic.Scene({
            triggerElement: ".graphtrigger",
            duration: "100%",
            repeat: 20,
            offset: 240
        }).on("enter leave", graphupdateBox)
        .addTo(controller);
    }
    /*------------------------- graph sec ---------------------------------------------*/

}