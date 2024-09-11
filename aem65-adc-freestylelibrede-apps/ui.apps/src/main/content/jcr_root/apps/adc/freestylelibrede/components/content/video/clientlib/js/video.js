function onYouTubeIframeAPIReady(id, targetElm, playedQuarter, playedHalf, playedThreeQuarter, timer, playBackType) {
    let player;
    let targetTitle = targetElm?.parentElement.getElementsByClassName('vid-title');
    let targetBtn = targetElm?.parentElement.getElementsByClassName('play-button');
    let targetDrillDwn = targetElm?.parentElement.getElementsByClassName('adc-deep-link');
    if(id) {
        player = new YT.Player(id, {
            videoId: targetElm?.parentElement.dataset.vid,
            playerVars: {
                autoplay: 0,
                controls: 1,
                modestbranding: 0,
                showinfo: 0,
                rel: 0,
                loop: 0
            },
            events: {
                onReady: function (e) {
                    targetTitle[0].style.display = 'none';
                    targetBtn[0].style.display = 'none';
                    targetDrillDwn[0].style.display = 'none';
                    e.target.playVideo();
                },
                onStateChange: onPlayerStateChange
                }
        });
        function onPlayerStateChange(e) {
            switch(e.data) {
            case 0:
                clearInterval(timer);
                if(playBackType !== "display-on-modal"){
                    e.target.destroy();
                    targetTitle[0].style.display = 'block';
                    targetBtn[0].style.display = 'block';
                    targetDrillDwn[0].style.display = 'block';
                }
                playedQuarter = false;
                playedHalf = false;
                playedThreeQuarter = false;
                break;
            case 1:
                timer = setInterval(() => check(player, playedQuarter, playedHalf, playedThreeQuarter), 1000);
                break;
            case 2:
                clearInterval(timer);         
                break;
            case -1:
                break;
            }
            if(playBackType === "display-on-modal"){
                targetTitle[0].style.display = 'block';
                targetBtn[0].style.display = 'block';
                targetDrillDwn[0].style.display = 'block';
            }
        }
    }
}  

function check(player, playedQuarter, playedHalf, playedThreeQuarter) {
    let percent = 0;
    const time = player.playerInfo.currentTime;
    const duration = player.playerInfo.duration;
    percent = Math.round(time / duration * 100);
    if(percent > 25 && !playedQuarter){
        playedQuarter = true;
    }else if(percent > 50 && !playedHalf){
        playedHalf = true;
    } else if(percent > 75 && !playedThreeQuarter){
        playedThreeQuarter = true;
    }
}

function thumbnailImage(vplayer, ytThumbBaseURL) {
    const defaultImage = (vplayer[i]?.dataset?.layout == "fullBleed"
        ? ytThumbBaseURL + vplayer[i]?.dataset?.vid + "/maxresdefault.jpg"
        : ytThumbBaseURL + vplayer[i]?.dataset?.vid + "/hqdefault.jpg");
    return vplayer[i]?.dataset?.thumbnail ? vplayer[i]?.dataset?.thumbnail : defaultImage;
}

jQuery(document).ready(function () {
    let vplayer = document.querySelectorAll(".vid-player");
    const playerData = {
        "full-bleed": { width: "100%", height: "480px" },
        "full-width": { width: "100%", height: "360px" },
        "column-width": { width: "350px", height: "197px" }
    };

    if(vplayer.length > 0){
        let tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        let firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    let playBackType;
    let playedQuarter = false;
    let playedHalf = false;
    let playedThreeQuarter = false;
    let timer;    

    for (let i = 0; i < vplayer.length; i++) {

        const ytThumbBaseURL = "https://i3.ytimg.com/vi/",
            thumbImage = thumbnailImage(vplayer, ytThumbBaseURL);
        vplayer[i].style.background =
            "url('" + thumbImage + "')";
        vplayer[i].style.width = playerData[vplayer[i].dataset.layout].width;
        let vplayerButton = vplayer[i].getElementsByClassName("play-button");
        if(vplayerButton.length > 0 ){
            vplayerButton[0].addEventListener("click", function (e) {
                let targetElm = e.currentTarget;
                let iframeSrc =
                    "https://www.youtube.com/embed/" +
                    targetElm.parentElement.dataset.vid +
                    "?enablejsapi=1&amp;controls=1&amp;autoplay=1&amp;modestbranding=1";
                playBackType = targetElm.parentElement.dataset.playback;
                
                if (playBackType === "display-on-modal") {
                    jQuery("#videoModel iframe").attr("src", iframeSrc);
                    jQuery("#videoModel").modal('show');
                    onYouTubeIframeAPIReady('video', targetElm, playedQuarter, playedHalf, playedThreeQuarter, timer, playBackType);
                } else {
                    let divElement = document.createElement("div");
                    divElement.id = "vid-player-wrapper-" + targetElm.parentElement.dataset.vid;
                    divElement.style.height = targetElm.parentElement.style.height;
                    divElement.style.width = targetElm.parentElement.dataset.layout == "full-bleed" ? targetElm.parentElement.style.width : "";
                    targetElm.parentElement.appendChild(divElement);
                    onYouTubeIframeAPIReady(divElement.id, targetElm, playedQuarter, playedHalf, playedThreeQuarter, timer, playBackType);                    
                }
            });
        }
    };

    jQuery('#videoModel').on('hidden.bs.modal', function () {
        clearInterval(timer);
        playedQuarter = false;
        playedHalf = false;
        playedThreeQuarter = false;
        jQuery('#videoModel iframe').removeAttr('src');
    });
});