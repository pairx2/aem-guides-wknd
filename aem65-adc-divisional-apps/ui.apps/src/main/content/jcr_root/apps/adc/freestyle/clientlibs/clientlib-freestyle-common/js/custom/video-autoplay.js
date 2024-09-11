/**
 * VIDEO - AUTOPLAY BASED ON THE ID
 **/

$(function () {
	
    /**Autoplay brightcove & youtube video based on url parameters - Start**/
    const paramValue = getUrlParameter('guideVideo');
    if(paramValue != ''){

        const videoElement = $('#'+paramValue);
        const videoEleLength = videoElement.length > 0;
        
        /** check active tab **/
        const selectTab = videoElement.closest('.cmp-tabs__tabpanel').attr('id');
        const selectTabindex = $('#'+selectTab+'-tab').index() + 1;
        if (selectTab && selectTab !== "" && videoEleLength) {
            const tabList = videoElement.closest('.cmp-tabs.a-tabs').find('.cmp-tabs__tablist');
            const selectedTabNumber = parseInt(selectTabindex);
            const activateTabLink = selectedTabNumber && tabList.find(`a:nth-child(${selectedTabNumber})`);
            if (activateTabLink.length) {
            $(activateTabLink)[0].click();
            $(activateTabLink).prop('tabindex', '0').addClass("cmp-tabs__tab--active show");
            tabList.find(`a:not(a:nth-child(${selectedTabNumber}))`).prop('tabindex', '-1').removeClass("cmp-tabs__tab--active show");
            }
        }
          
        if(videoEleLength && $('#'+paramValue+' .brightCove-video-wrapper video').length > 0){
            const videoAttribute = videoElement.find('video').attr('id');
            brightcoveAutoplay(videoAttribute);
            animatetoVideo(paramValue);
        }
        else if(videoEleLength && $('#'+paramValue+' iframe').attr('src').indexOf('https://www.youtube.com/')  > -1){
            youtubeAutoplay(paramValue);
            animatetoVideo(paramValue);
        }
    }


    /**Autoplay brightcove & youtube video based on url parameters - End**/

});

function brightcoveAutoplay(getvideoId) {
    const myPlayer = videojs.getPlayer(getvideoId);
    const volumeLevel = 0.7;
    myPlayer.on("loadedmetadata", function () {
        setTimeout(function () {
            const promise = myPlayer.play();
            if (promise !== undefined) {
                promise.then(function () {
                    myPlayer.muted(false);
                    myPlayer.volume(volumeLevel);
                })
                .catch(function (error) {
                    myPlayer.muted(true);
                    myPlayer.play();
                });
            }
        }, 700);
    });
}

function youtubeAutoplay(getyoutubeId) {
    const getvideoAttr = $('#' + getyoutubeId + ' iframe').attr('src');
    const updateSrc = getvideoAttr + '?rel=0&autoplay=1&mute=1';
    setTimeout(function () {
        $('#' + getyoutubeId + ' iframe').attr('src', updateSrc);
    }, 700)
}

function animatetoVideo(getparamVal) {
    setTimeout(function () {
        focusAnimateToId(getparamVal);
    }, 500);
}