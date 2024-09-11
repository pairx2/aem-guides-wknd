(function () {
    class VideoComp {
        public elem: HTMLElement;
        public PLAY: string;
        public PAUSE: string;
        public videoHTML5Player: HTMLVideoElement | null | any;
        public videoIFramePalyer: HTMLIFrameElement | null;
        public videoPlayElem: HTMLElement | null;
        public videoLLPlayer: HTMLElement | null;
        public _this: any;

        constructor(elem: HTMLElement) {
            if (!elem) {
                throw new Error('Video element is required');
            }
            this._this = this;
            this.elem = elem;
            this.PLAY = 'play';
            this.PAUSE = 'pause';
            this.videoHTML5Player = this.elem.querySelector('video.a-video__player-source');
            this.videoIFramePalyer = this.elem.querySelector('iframe.a-video__player-source');
            this.videoPlayElem = this.elem.querySelector('.a-video__play-btn');
            this.videoLLPlayer = this.elem.querySelector('.limeLight-video.a-video__player-source');

            this.init(this, elem);
           // this.bindLimeLightVideo();
            this.bindEvents(this);
            var currentThis = this;
            
            setTimeout(function () {
                document.querySelectorAll('.limeLight-video.a-video__player-source')?.forEach(function (source) {
                    currentThis.bindLimeLightVideo(source);
                    currentThis.videoLLloop(source);
                });
                document.querySelectorAll('.a-video__player.global-video-embedDam')?.forEach(function (video) {
                    if(video?.innerHTML?.trim() == '' || video?.childElementCount == 0){
                        let damFallBackImgSrc = (video)?.closest('.a-video')?.getAttribute('data-fallbackimgsrc');
                        if (damFallBackImgSrc && damFallBackImgSrc !== ''){
                          $(video)?.addClass('global-video-fallBackImage')?.css({'background-image': `url("${damFallBackImgSrc}"`});   
                        }
                    }
                    let videoEml = video?.querySelector('video');
                    if (videoEml?.innerHTML?.trim() !== '') {
                        currentThis.videoDamControls(videoEml);
                     }
                });
                document.querySelectorAll('iframe.a-video__player-source')?.forEach(function (video) {
                    if((video as HTMLIFrameElement).src.indexOf('youtube') > -1){
                        currentThis.videoIFrameYTControl(video);
                    }
                });

                document.querySelectorAll('.m-video .brightCove-video')?.forEach(function (brightCoveVideo) {
                    const self = brightCoveVideo;
                    const videoId = self?.getAttribute('id');
                    const dataDiv = self.closest('.a-video');
                    const dataPosterURL = dataDiv?.getAttribute('data-fallbackimgsrc');
    
                    if (dataPosterURL) {
                        const myPlayer = (window as any)?.videojs?.getPlayer(videoId);
                        const myPlayerPoster = myPlayer?.poster() ?? '';
                        const bgImage = {'background-image': `url("${dataPosterURL}"`};
                        // set fallback as default & remove if media available as fallback image is not empty
                        $(self).find('.vjs-poster')?.removeClass('vjs-hidden')?.css({'background-size':'var(--video-background-image-size-contain)', 'background-repeat': 'var(--video-background-repeat)', ...(myPlayerPoster == '' ? bgImage: {})});
                        myPlayer?.on("loadedmetadata", function () {
                            // video media available
                            const currentDefaultPoster = myPlayerPoster;
                            currentDefaultPoster && $(self).find('.vjs-poster')?.css({'background-image': `url("${currentDefaultPoster}"`});
                        });
                    }
                   
                });
                
                document.querySelectorAll('.m-video .wistia_embed')?.forEach(function (videoDiv) {
                    const self = videoDiv;
                    const dataDiv = self.closest('.a-video');
                    const dataPosterURL = dataDiv?.getAttribute('data-fallbackimgsrc') ?? '';
                    if (dataPosterURL){
                        // iframe only comes if video is unavailable
                        const iframeCount = $(self)?.find('iframe')?.length ?? 0;
                        const isEmbedOptionTrue = $(self)?.attr('data-wistia-embedOption') == 'true' ? true :false;
                        iframeCount > 0 && isEmbedOptionTrue  && $(self)?.css({'background-image': `url("${dataPosterURL}"`, 'background-size':'var(--video-background-image-size-contain)', 'background-repeat': 'var(--video-background-repeat)', 'background-position': 'center'});
                    }
                });

            }, 1100);
            
            
        }

        public removeURLParameter(parameter: string, sourceURL: string) {
            let result = sourceURL;
            if (sourceURL.split('?')[1]) {
                result = sourceURL.split('?')[0] + '?' + sourceURL.split('?')[1].split('&').filter((val: string) => val.indexOf(parameter) < 0).join('&');
            }
            return result;
        }
        public checkQueryStringParameterExists(parameter: string, sourceURL: string) {
            if ((sourceURL.indexOf('?' + parameter + '=') >= 0) || (sourceURL.indexOf('&' + parameter + '=') >= 0)) return true;
            return false;
        }
        public playOrPauseVideo(type: string) {
            let videoHTML5PlayerNew:any = this.elem.querySelector('.a-video__player-source')?.closest('.a-video')?.querySelector('video');
            if(this.elem.querySelector('.limeLight-video') !== null){
                let limeID:any = this.elem.querySelector('.limeLight-video>div')?.getAttribute('id');
            	videoHTML5PlayerNew = document.querySelector('#'+limeID)?.querySelector('video');
            }
            let controlsData = videoHTML5PlayerNew?.closest('.a-video')?.getAttribute('data-control');
            if (videoHTML5PlayerNew) {
                if(controlsData == 'true'){
                	videoHTML5PlayerNew.controls = true;
                }
                if (type === this.PAUSE) {
                    videoHTML5PlayerNew.pause();
                    videoHTML5PlayerNew.currentTime = 0;
                } else if (type === this.PLAY) {
                    if(this.elem.querySelector('.a-video__player-source')?.closest('.a-video')?.getAttribute('data-playertype') == 'embed'){
                        if(this.elem.querySelector('.a-video__player-source .vjs-control-bar')){
                            (this.elem.querySelector('.a-video__player-source .vjs-control-bar') as HTMLElement).style.display = 'none';
                        }
                    }
                    if(this.elem.querySelector('.a-video__player-source')?.closest('.a-video')?.getAttribute('data-playertype') == 'modal'){
                        if(this.elem.querySelector('.a-video__player-source')?.closest('.a-video')?.getAttribute('data-muted') == 'true'){
                            videoHTML5PlayerNew.muted = true;
                        }
                        if(this.elem.querySelector('.a-video__player-source')?.closest('.a-video')?.getAttribute('data-muted') == 'false'){
                            videoHTML5PlayerNew.muted = false;
                        }
                    }
                    if (videoHTML5PlayerNew.closest('.brightCove-video') != null || videoHTML5PlayerNew.closest('.limeLight-video') != null) {
                        videoHTML5PlayerNew.controls = false;
                    }
                    if(this.elem.querySelector('.a-video__player-source')?.closest('.a-video')?.getAttribute('data-playertype') == 'embed'){
                        videoHTML5PlayerNew.muted = true;
                    }
                    videoHTML5PlayerNew.play();
                    let limeLightButton:any = document.querySelector('.vjs-limelight-big-play');
                    if(limeLightButton){
                        limeLightButton?.click();
                    }
                }

            } else if (this.videoIFramePalyer) {
                // Get the dynamic last index of URL
                let videoUrl= this.videoIFramePalyer.src.split('/');
                let videUrlLength=videoUrl && videoUrl.length;
                let videoID = videoUrl[videUrlLength-1].split('?')[0];
                this.videoIFramePalyer.setAttribute('id',`iframe_${videoID}`)
                if (type === this.PAUSE && this.checkQueryStringParameterExists('autoplay', this.videoIFramePalyer.src)) {
                    this.videoIFramePalyer.src = this.removeURLParameter('autoplay', this.videoIFramePalyer.src);
                } else if (type === this.PLAY && !(this.checkQueryStringParameterExists('autoplay', this.videoIFramePalyer.src)) ) {
                    this.videoIFramePalyer.src += (this.videoIFramePalyer.src.indexOf('?') > -1 ? '&' : '?') + 'autoplay=1';
                }
                if (type === this.PLAY && window.innerWidth <= 767) {
                    let iframeWidth = ((this.videoIFramePalyer).closest('.global-video') as HTMLElement)?.offsetWidth;
                    let iframeHeight = ((this.videoIFramePalyer).closest('.global-video') as HTMLElement)?.offsetHeight;
					let muteData = (this.videoIFramePalyer).closest('.a-video')?.getAttribute('data-muted');
                    let loopData:any = (this.videoIFramePalyer)?.closest('.a-video')?.getAttribute('data-loop');
                    let controlsData:any = (this.videoIFramePalyer)?.closest('.a-video')?.getAttribute('data-controls');
                    if((this.videoIFramePalyer as HTMLIFrameElement)?.src?.indexOf('youtube') > -1){
                        if((this.videoIFramePalyer).closest('.global-video')){
                            ((this.videoIFramePalyer).closest('.global-video') as HTMLElement).innerHTML = '<div id=iframe_'+videoID+' data-muted='+muteData+'></div>';
                        }
                        let iframeID = 'iframe_'+videoID+'';
                        setTimeout(() =>{
                            this.onYouTubeIframeAPIReady(videoID, iframeID, iframeWidth, iframeHeight, loopData, controlsData);
                        },100)
                    }
                }
                
            }
            if (this.videoPlayElem) {
                if (type === this.PAUSE) {
                    this.videoPlayElem.style.display = 'block';
                } else if (type === this.PLAY) {
                    this.videoPlayElem.style.display = 'none';
                }
            }
        }

        public onYouTubeIframeAPIReady(yt_id:any, iframe_id:any, iframe_width:any, iframe_height:any,loopData:any, controlsData:any){
            setTimeout(() =>{
                var player:any;
                var _this = this;
                var controlsValue = 1;
                if(controlsData == 'true'){
                    controlsValue = 0;
                }
                if(loopData == 'true'){
                    window.YT.ready(function() {
                        player = new window.YT.Player(iframe_id, {
                        width: iframe_width,
                        height: iframe_height,
                        videoId: yt_id,
                        playerVars: { 'version': 3, 'autoplay': 1, 'playsinline': 1, 'loop': 1, 'playlist': yt_id, 'controls' :  controlsValue},
                            events: {
                                'onReady': (e:any) => {_this.onPlayerReady(e)}
                            }
                        });
                    });
                } else{
                    window.YT.ready(function() {
                        player = new window.YT.Player(iframe_id, {
                        width: iframe_width,
                        height: iframe_height,
                        videoId: yt_id,
                        playerVars: { 'autoplay': 1, 'playsinline': 1, 'controls' :  controlsValue },
                            events: {
                                'onReady': (e:any) => {_this.onPlayerReady(e)}
                            }
                        });
                    });
                }
            },200)
        }

        public onPlayerReady(event:any) {
            let mute = (event.target.getIframe()).getAttribute('data-muted')
            var playertype = (event.target.getIframe()).closest('.a-video').getAttribute('data-playertype');
            if (mute == 'true') {
                event.target.mute();
            }
            else {
                event.target.unMute();
            }
            if(playertype == 'embed'){
				event.target.mute();
            }
            event.target.setVolume(70);
            event.target.playVideo();
        }

        public bindLimeLightVideo(elem) {
            if (elem) {
                let LLVideoPlayer = elem,
                    LLVideoParent = LLVideoPlayer?.closest('.a-video');
                let LLplayerID = "limelight_player_" + LLVideoPlayer.getAttribute('data-player-ID'),
                    LLmediaID = LLVideoPlayer.getAttribute('data-media-ID'),
                    LLplayerForm = 'Player',
                    LLautoPlay = LLVideoParent?.getAttribute("data-autoplay"),
                    LLMobileautoPlay = LLVideoParent?.getAttribute("data-mobile-autoplay"),
                    LLMuted = LLVideoParent?.getAttribute("data-muted"),
                    videoLLWidth = LLVideoParent?.offsetWidth,
                    videoLLHeight = videoLLWidth ? videoLLWidth : 0 * 0.56;
                
                if (window.innerWidth > 767 && LLVideoParent?.getAttribute('data-playertype') == 'embed') {
                    LimelightPlayerUtil.embed({
                        "playerId": LLplayerID,
                        "mediaId": LLmediaID,
                        "playerForm": LLplayerForm,
                        "width": videoLLWidth,
                        "height": videoLLHeight,
                        "autoplay": LLautoPlay,
                        "muted": LLMuted
                    });
                }
                else if (window.innerWidth <= 767 && LLVideoParent?.getAttribute('data-playertype') == 'embed') {
                    LimelightPlayerUtil.embed({
                        "playerId": LLplayerID,
                        "mediaId": LLmediaID,
                        "playerForm": LLplayerForm,
                        "width": videoLLWidth,
                        "height": videoLLHeight,
                        "autoplay": LLMobileautoPlay,
                        "muted": LLMuted
                    });
                }
                else if (LLVideoParent?.getAttribute('data-playertype') == 'modal' && !LLVideoPlayer?.closest('.modal')?.classList.contains('show')) {
                    setTimeout(() => {
                        if (LLautoPlay || LLMobileautoPlay) {
                            if (LLVideoPlayer.querySelector('video')) {
                                LLVideoPlayer.querySelector('video').muted = true;
                                LLVideoPlayer.querySelector('video').currentTime = 0;
                                LLVideoPlayer.querySelector('video').pause();
                            }
                        }
                    }, 5000);
                }
                else if (window.innerWidth > 767 && LLVideoParent?.getAttribute('data-playertype') == 'modal' && LLVideoPlayer?.closest('.modal')?.classList.contains('show')) {
                    LimelightPlayerUtil.embed({
                        "playerId": LLplayerID,
                        "mediaId": LLmediaID,
                        "playerForm": LLplayerForm,
                        "width": videoLLWidth,
                        "height": videoLLHeight,
                        "autoplay": LLautoPlay,
                        "muted": LLMuted
                    });
                }
                else if (window.innerWidth <= 767 && LLVideoParent?.getAttribute('data-playertype') == 'modal' && LLVideoPlayer?.closest('.modal')?.classList.contains('show')) {
                    LimelightPlayerUtil.embed({
                        "playerId": LLplayerID,
                        "mediaId": LLmediaID,
                        "playerForm": LLplayerForm,
                        "width": videoLLWidth,
                        "height": videoLLHeight,
                        "autoplay": LLMobileautoPlay,
                        "muted": LLMuted
                    });
                }

                let LLLoop: any = LLVideoPlayer?.closest('.a-video')?.getAttribute('data-loop');
                LLLoop = eval(LLLoop)
                if (LLLoop == true) {
                    LLVideoPlayer?.querySelector('video')?.addEventListener('ended', function () {
                        this.currentTime = 0;
                        this.play();
                    }, false);
                }
                
                const LLMVideo = LLVideoPlayer?.querySelector('video');
                const LLMatomDiv = LLMVideo?.closest('.a-video');
                const LLMposterDiv = LLVideoPlayer?.querySelector(".vjs-poster");
                const fallbackPosterPath = LLMatomDiv?.getAttribute('data-fallbackimgsrc');
               
                if (fallbackPosterPath) {
                    LLMposterDiv?.classList.remove('vjs-hidden');
                    $(LLMposterDiv)?.css({'background-image': `url("${fallbackPosterPath}"`, 'background-size':'var(--video-background-image-size-contain)'});
                    LLMVideo?.addEventListener('loadedmetadata', function () {
                        // if player already have poster keep it as is else set custom image
                        const playerPoster =  LLMVideo.getAttribute('poster') ? LLMVideo.getAttribute('poster'): false;
                        $(LLMposterDiv)?.css({'background-image': `url("${playerPoster ?? fallbackPosterPath}"`});
                    });
                }
                if (!LLVideoParent?.querySelector('.vjs-play-control')?.classList.contains("click-handler")) {
                    LLVideoParent?.querySelector('.vjs-play-control')?.classList.add("click-handler");
                    LLVideoParent?.querySelector('.vjs-play-control')?.addEventListener("click", function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        if (this.classList.contains('vjs-paused')) {
                            setTimeout(() => {
                                this.closest('.vjs-limelight').querySelector('video').play();
                                this.classList.add('vjs-playing')
                                this.classList.remove('vjs-paused')
                            }, 1000);
                        }
                    })
                }
                if (!LLVideoParent?.querySelector('.vjs-limelight')?.classList.contains("click-handler")) {
                    LLVideoParent?.querySelector('.vjs-limelight')?.classList.add("click-handler");
                    LLVideoParent?.querySelector('.vjs-limelight')?.addEventListener("click", function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        const ev = new KeyboardEvent('keydown', { 'keyCode': 32, 'which': 32 });
                    });
                }
            }
        }
        public bindEvents(_this:any) {
            let _a;
            (_a = this.videoPlayElem) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
                _this.playOrPauseVideo(_this.PLAY);
            }.bind(this));
        }
        public init(_this:any, elem:any) {
            if (elem.getAttribute('data-autoplay') !== 'true' && window.innerWidth > 767) {
                _this.playOrPauseVideo(_this.PAUSE);
            } else if (elem.getAttribute('data-autoplay') == 'true' && window.innerWidth > 767) {
                setTimeout(function () {
                    if (elem.getAttribute('data-playertype') == 'embed' ) {
                        _this.playOrPauseVideo(_this.PLAY);
                    }
                    if (elem.getAttribute('data-playertype') == 'modal') {
                        if(elem?.querySelector('.limeLight-video') !== null){
                        	_this.playOrPauseVideo(_this.PAUSE);
                         }  
                         if(elem?.querySelector('.limeLight-video') !== null && (elem?.closest('.modal')?.classList.contains('show'))) {
							_this.playOrPauseVideo(_this.PLAY);
                         } 
                         if(elem?.querySelector('.limeLight-video') == null){
							_this.playOrPauseVideo(_this.PLAY);
                         }
                    }
                }, 1300);
            }
            if (elem.getAttribute('data-mobile-autoplay') !== 'true' && window.innerWidth <= 767) {
                _this.playOrPauseVideo(_this.PAUSE);
            } else if (elem.getAttribute('data-mobile-autoplay') == 'true' && window.innerWidth <= 767) {
                
                setTimeout(function () {
                    if (elem.getAttribute('data-playertype') == 'embed' ) {
                            _this.playOrPauseVideo(_this.PLAY);
                    }
                    if (elem.getAttribute('data-playertype') == 'modal') {
                        if(elem?.querySelector('.limeLight-video') !== null){
                        	_this.playOrPauseVideo(_this.PAUSE);
                         }  
                         if(elem?.querySelector('.limeLight-video') !== null && (elem?.closest('.modal')?.classList.contains('show'))) {
							_this.playOrPauseVideo(_this.PLAY);
                         } 
                         if(elem?.querySelector('.limeLight-video') == null){
							_this.playOrPauseVideo(_this.PLAY);
                         }
                    }
                }, 1300);
            }
        }
        public videoLLloop(elem) {
            let LLVideoPlayer:any = elem;
            setTimeout(() => {
                if (LLVideoPlayer?.classList.contains("limeLight-video-wrapper")) {
                    let LLVideoParent = LLVideoPlayer.closest('.a-video');
                    let LLControls = LLVideoParent?.getAttribute("data-controls"),
                        LLLoop = LLVideoParent?.getAttribute("data-loop");
                    if (LLLoop == 'true') {
                        this.videoLoop();
                    }
                    if (LLControls == 'true') {
                        var llControlsDis = LLVideoPlayer?.querySelector('.vjs-control-bar');
                        if(llControlsDis){
                        llControlsDis.style.display = "none";
                        }
                    }
                    if (LLControls == 'false') {
                        var llControlsDis = LLVideoPlayer?.querySelector('.vjs-control-bar');
                        if(llControlsDis){
                        llControlsDis.style.display = "flex";
                        }
                    }
                }
            }, 100);
        }
        public videoDamControls(video:any) {
            let damVideoControls = (video)?.classList.contains("a-video__dom-video");
            let damControlsEnDi = (video)?.closest('.a-video')?.getAttribute('data-controls');

            
            if (damVideoControls) {
                if (damControlsEnDi === 'true') {
                    let player = video;
                    setTimeout(function(){
                        (player)?.removeAttribute('controls');
                    },500);
                }
            }
            if(video?.closest('.a-video').getAttribute('data-playertype') == 'embed'){
                let player = video;
                if(player){
                    setTimeout(function(){
                        player.currentTime = 0;
                        if(video.closest('.a-video')?.getAttribute('data-autoplay') == 'true' && window.innerWidth > 767){
                            player.muted = true;
                            player?.play();
                        }
                        if(video.closest('.a-video')?.getAttribute('data-autoplay') == 'false' && window.innerWidth > 767){
                            player?.pause();
                        }
                        if(video.closest('.a-video')?.getAttribute('data-mobile-autoplay') == 'true' && window.innerWidth <= 767){
                            player.muted = true;
                            player?.play();
                        }
                        if(video.closest('.a-video')?.getAttribute('data-mobile-autoplay') == 'false' && window.innerWidth <= 767){
                            player?.pause();
                        }
                        if(video.closest('.a-video')?.getAttribute('data-autoplay') == 'true' && video.closest('.a-video')?.getAttribute('data-mobile-autoplay') == 'false' && window.innerWidth <= 767){
                            player?.pause();
                        }
                    },250);
                }
            }
            else if(video?.getAttribute('data-playertype') == 'modal'){
                let _this = this;
                let player = this.videoHTML5Player;
                if(player){
                    player.muted = true;
                    setTimeout(function(){
                        _this.playOrPauseVideo(_this.PAUSE)
                        player.currentTime = 0;
                        player.pause();
                        new CloseVideoPopup();
                    },1500)
                }
            }
        
        }
        public videoIFrameYTControl(video:any) {
            if (video.closest('.a-video').getAttribute('data-playertype') == 'embed') {
                if((video.closest('.a-video').getAttribute('data-mobile-autoplay') == 'true' && window.innerWidth <= 767) || (video.closest('.a-video').getAttribute('data-autoplay') == 'true' && window.innerWidth > 767)){
                    // Get the dynamic last index of URL
                    let videoUrl= this.videoIFramePalyer.src.split('/');
                    let videUrlLength=videoUrl && videoUrl.length;
                    let videoID = videoUrl[videUrlLength-1].split('?')[0];
                    let iframeWidth = ((video).closest('.global-video-embedDam') as HTMLElement)?.offsetWidth;
                    let iframeHeight = ((video).closest('.global-video-embedDam') as HTMLElement)?.offsetHeight;
                    let muteData = (video).closest('.a-video')?.getAttribute('data-muted');
                    let loopData:any = (video)?.closest('.a-video')?.getAttribute('data-loop');
                    let controlsData:any = (video)?.closest('.a-video')?.getAttribute('data-controls');
                    if((video).closest('.global-video-embedDam')){
                        ((video).closest('.global-video-embedDam') as HTMLElement).innerHTML = '<div id=iframe_'+videoID+' data-muted='+muteData+'></div>';
                    }

                    video.setAttribute('id',`iframe_${videoID}`)
                    let iframeID = 'iframe_'+videoID+'';
                    setTimeout(() =>{
                        this.onYouTubeIframeAPIReady(videoID, iframeID, iframeWidth , iframeHeight, loopData, controlsData);
                    },100)
                }
            }
        }
        public videoLoop() {
            let videoLoopCheck;
            document.querySelectorAll(".video-js").forEach(function (video) {
                videoLoopCheck = video.classList.contains("vjs-ended")
            });
            if (videoLoopCheck) {
                document.querySelectorAll('[data-js-component="video"]').forEach(function (elem) {
                    let videoElem = elem.querySelector('.global-video')?.closest(".a-video");
                    if (videoElem) {
                        new VideoComp(videoElem as HTMLElement);
                    }
                });
            } else {
                let currentThis = this;
                setTimeout(function () {
                    currentThis.videoLoop();
                }, 1000);
            }
        }
    }
    var tempSrc_1:any;
    class CloseVideoPopup {

        constructor() {
            this.init();
        }

        public init() {
            let videos = document.querySelectorAll('[data-js-component="video"] iframe,[data-js-component="video"] video');
            videos.forEach(function(video:any) {
				if (video.tagName.toLowerCase() === "video") {
					setTimeout(function(){
						video.pause();
                        video.currentTime = 0;
					},1000)
				} else if (video.tagName.toLowerCase() === "iframe") {
                    tempSrc_1 = video.src;
                    var tempSrc = video.src; 
                    setTimeout(function () {
                        if((video as HTMLIFrameElement).src.indexOf('youtube') > -1){
                            video.src = tempSrc.split('?')[0];
                        }
                        else if((video as HTMLIFrameElement).src.indexOf('brightcove') > -1){
                            video.src = tempSrc.split('&')[0];
                        }
                        else{
                            video.src = tempSrc;
                        }
                    }, 1000);
                }
            });
        }
    }

    class YouTubeIframe {
        private elem: HTMLElement;
        constructor(elem: HTMLElement) {
            this.elem= elem;
            this.init();
        }
        public init() {
            if ((this.elem).querySelector(".play-icon") != null) {
                let popupId: any = "#" + (this.elem).querySelector(".play-icon")?.getAttribute("id") + "-modal";
                let iframeUrl = document.querySelector(popupId)?.querySelector("iframe")?.getAttribute("data-url");
                if((this.checkQueryStringParameterExists('autoplay', iframeUrl)) && window.innerWidth <= 767){
                    document.querySelector(popupId)?.querySelector("iframe")?.setAttribute("src", iframeUrl+'&mute=1');
                }
                else{
                    document.querySelector(popupId)?.querySelector("iframe")?.setAttribute("src", iframeUrl);
                }
            }
        }
        public checkQueryStringParameterExists(parameter: string, sourceURL: string) {
            if ((sourceURL.indexOf('?' + parameter + '=') >= 0) || (sourceURL.indexOf('&' + parameter + '=') >= 0)) return true;
            return false;
        }
    }

    class BrightCoveVideo {
        private obj: object;
        private elem: HTMLElement;
        constructor(elem: HTMLElement,obj: object) {
            this.elem= elem;
            this.obj = obj;
            this.init(this.obj);
        }
        public init(obj:any) {
            let playerHTML;
            if (obj.loop) {
                playerHTML = '<video-js id="myPlayerID" data-video-id="' + obj.videoId + '"  data-account="' + obj.accountId + '" data-player="' + obj.playerId + '"data-embed="default" loop controls ></video-js>';
            } else {
                playerHTML = '<video-js id="myPlayerID" data-video-id="' + obj.videoId + '"  data-account="' + obj.accountId + '" data-player="' + obj.playerId + '"data-embed="default" controls ></video-js>';
            }
            var popupId = "#" + (this.elem)?.querySelector(".play-icon")?.getAttribute("id") + "-modal";

			var popupDiv = document.querySelector(popupId);
            if (popupDiv?.querySelector(".placeHolder") != null) {
                (popupDiv?.querySelector(".placeHolder") as HTMLElement).innerHTML = playerHTML;
                let s:any = document.createElement("script");
                s.src = "https://players.brightcove.net/" + obj.accountId + "/" + obj.playerId + "_default/index.min.js";
                popupDiv?.querySelector(".placeHolder")?.appendChild(s);
                s.onload = this.callback(this.elem);
            }
        }

        public callback(_elem:any) {
            var _this = this;
            setTimeout(()=> {
                let myPlayer = bc("myPlayerID");
                if(myPlayer){
                    var popupId = "#" + (_elem).querySelector(".play-icon").getAttribute("id") + "-modal";
                    var popupDiv = document.querySelector(popupId);
                    let autoPlay: any = (popupDiv?.querySelector(".brightCove-video"))?.getAttribute("data-autoplay");
                    let autoPlayData = eval(autoPlay);
                    let mobileAutoPlay: any = (popupDiv?.querySelector(".brightCove-video"))?.getAttribute("data-mobile-autoplay");
                    let mobileAutoPlayData = eval(mobileAutoPlay);
                    let meta: any = popupDiv?.querySelector(".brightCove-video")?.getAttribute("data-muted");
                    let muteData = eval(meta);
                    if (!muteData) {
                        myPlayer.muted(true);
                    }
                    if(autoPlayData || mobileAutoPlayData){
                        _this.autoPlayBrightCove(_elem);
                    }
                    document.querySelectorAll('.generic-modal.generic-modal--image .vjs-poster').forEach(function(modalPoster){
                        modalPoster.addEventListener("click", function () {
                            var cur = this;
                            setTimeout(function(){
                             cur.closest('.video-js').querySelector('video').play();
                            },500);
                        });
                    });
                    document.querySelectorAll('.generic-modal.generic-modal--image .vjs-big-play-button').forEach(function(button){
                        button.addEventListener("click", function () {
                            var cur = this;
                            setTimeout(function(){
                             cur.closest('.video-js').querySelector('video').play();
                            },500);
                        });
                    });
                }
            }, 1200);
        };

        public autoPlayBrightCove(_elem:any) {
            videojs?.getPlayer("myPlayerID").ready(function () {
                var popupId = "#" + (_elem).querySelector(".play-icon").getAttribute("id") + "-modal";

                var popupDiv = document.querySelector(popupId);
                let autoPlay: any = (popupDiv?.querySelector(".brightCove-video"))?.getAttribute("data-autoplay");
                let autoPlayData = eval(autoPlay);
                let mobileAutoPlay: any = (popupDiv?.querySelector(".brightCove-video"))?.getAttribute("data-mobile-autoplay");
                let mobileAutoPlayData = eval(mobileAutoPlay);
                let controls: any = (popupDiv?.querySelector(".brightCove-video"))?.getAttribute("data-controls")
                let controlsData = eval(controls);
                let meta: any = popupDiv?.querySelector(".brightCove-video")?.getAttribute("data-muted");
                let muteData = eval(meta);
                let myPlayer = this;
                if (autoPlayData && window.innerWidth > 767) {
                    myPlayer.play();
                }
                if (mobileAutoPlayData && window.innerWidth <= 767) {
                    myPlayer.play();
                }
                if (controlsData) {
                    (popupDiv?.querySelector(".vjs-control-bar") as HTMLElement).style.display = "none";
                }
                if (!controlsData) {
                    (popupDiv?.querySelector(".vjs-control-bar") as HTMLElement).style.display = "flex";
                }
                if (!muteData) {
                    myPlayer.muted(true);
                }
            });
        };
    }


    (function () {
        loadIframeAPI();
        const brightCovePopUp:any = document.querySelectorAll(".m-video-popup.brightCove");
        const limeLightPopUp = document.querySelectorAll(".m-video-popup.limeLight");
        const videoURLPopUp = document.querySelectorAll(".m-video-popup.videoURL");
		const damPopUp = document.querySelectorAll(".m-video-popup.dam");
        const mVideoPopup = document.querySelectorAll(".m-video-popup");
        mVideoPopup?.forEach(function(video){
           let modalID:any =  video?.getAttribute('data-target');
           let timer = setInterval(() => {
            document.querySelector(modalID)?.classList.add('modal-video-popup');
            clearInterval(timer);
           },100)
        })
       
        let popupId:any;
        setTimeout(function(){
            if(brightCovePopUp && brightCovePopUp.length > 0){
                brightCovePopUp.forEach((play:any) => {
                    let popupIdNew:any = "#" + play.querySelector(".play-icon").getAttribute("id") + "-modal";
    
                    let popupDiv = document.querySelector(popupIdNew);
                    let accId: any = popupDiv?.querySelector(".brightCove-video")?.getAttribute("data-account");
                    let playId = popupDiv?.querySelector(".brightCove-video")?.getAttribute("data-player");
                    let vidId = popupDiv?.querySelector(".brightCove-video")?.getAttribute("data-video-id");
                    let loopAttr: any = popupDiv?.querySelector(".brightCove-video")?.getAttribute("data-loop");
                    let loopData = eval(loopAttr);
                    let obj = {
                        accountId: accId,
                        playerId: playId,
                        videoId: vidId,
                        loop: loopData,
                    };
                    new BrightCoveVideo(popupDiv,obj);
                });
            }
           
            var brightCoveEmbed = document.querySelectorAll('.brightCove-video');
            brightCoveEmbed.forEach(function(video){
                if(!popupId && video){
                   
                    var popupDiv:any = video?.closest('.a-video');
                    let autoPlay: any = (popupDiv)?.getAttribute("data-autoplay");
                    let autoPlayData = eval(autoPlay);
                    let mobileAutoPlay: any = (popupDiv)?.getAttribute("data-mobile-autoplay");
                    let mobileAutoPlayData = eval(mobileAutoPlay);
                    let controls: any = (popupDiv)?.getAttribute("data-controls");
                    let controlsData = eval(controls);
                    let loopAttr: any = popupDiv?.getAttribute("data-loop");
                    let loopData = eval(loopAttr);
                    let myPlayer = popupDiv.querySelector('video');
                    if(myPlayer){
                        if(controlsData && popupDiv?.querySelector(".vjs-control-bar")){
                            (popupDiv?.querySelector(".vjs-control-bar") as HTMLElement).style.display = "none";
                        }
                        if(!controlsData && popupDiv?.querySelector(".vjs-control-bar")){
                            (popupDiv?.querySelector(".vjs-control-bar") as HTMLElement).style.display = "flex";
                        }
                        if (autoPlayData && window.innerWidth > 767) {
                            myPlayer.muted = true;
                            myPlayer.play();
                        }
                        else if(!autoPlayData && window.innerWidth > 767){
                            myPlayer.pause();
                        }
                        if (mobileAutoPlayData && window.innerWidth <= 767) {
                            myPlayer.muted = true;
                            myPlayer.play();
                        }
                        else if(!mobileAutoPlayData && window.innerWidth <= 767){
                            myPlayer.pause();
                        }
                        if(loopData){
                            myPlayer.setAttribute('loop', true);
                        }
                        if(!loopData){
                            myPlayer.removeAttribute('loop');
                        }
                    }
                }
            });

        },1501)
        
        document.querySelector('.generic-modal--close')?.addEventListener('click', function () {
            new CloseVideoPopup();
        });
        document.addEventListener("click", (e:any) => {
            if ((e.target as HTMLElement)?.classList.contains("generic-modal--image") || (e.target as HTMLElement)?.classList.contains("abt-icon-cancel")) {
                new CloseVideoPopup();
            }
        });
		
        damPopUp.forEach((dam:any) => {
            dam.addEventListener("click", function() {
                this.classList.add('clicked-dam')
                var modalId = this.getAttribute('data-target');
                let damPLayer:any  = document.querySelector(modalId).querySelector('video.a-video__player-source');
			    let damVideoControls = (damPLayer)?.classList.contains("a-video__dom-video");
                let damControlsEnDi = (damPLayer)?.parentElement?.parentElement?.getAttribute('data-controls');
            
                if (damVideoControls) {
                  if (damControlsEnDi === 'true') {
                    (damPLayer)?.removeAttribute('controls');
                  }
                }
                if((dam.closest('.a-video')?.getAttribute('data-autoplay') == 'true' && window.innerWidth > 767) || (dam.closest('.a-video')?.getAttribute('data-mobile-autoplay') == 'true' && window.innerWidth <= 767)){ 
                    damPLayer.currentTime = 0;
                    damPLayer.play();
                }
                if((dam.closest('.a-video')?.getAttribute('data-autoplay') == 'false' && window.innerWidth > 767) || (dam.closest('.a-video')?.getAttribute('data-mobile-autoplay') == 'false' && window.innerWidth <= 767)){ 
                    damPLayer.currentTime = 0;
                    damPLayer.pause();
                }
			});
		});
        brightCovePopUp.forEach((play:any) => {
            play.addEventListener("click", function() {
                this.classList.add('clicked-brightCove')
                var popupId = "#" + this.querySelector(".play-icon").getAttribute("id") + "-modal";

                var popupDiv = document.querySelector(popupId);
                let accId: any = popupDiv?.querySelector(".brightCove-video")?.getAttribute("data-account");
                let playId = popupDiv?.querySelector(".brightCove-video")?.getAttribute("data-player");
                let vidId = popupDiv?.querySelector(".brightCove-video")?.getAttribute("data-video-id");
                let loopAttr: any = popupDiv?.querySelector(".brightCove-video")?.getAttribute("data-loop");
                let loopData = eval(loopAttr);
                let muteAttr: any = popupDiv?.querySelector(".brightCove-video")?.getAttribute("data-mute");
                let muteData = eval(muteAttr);
                let obj = {
                    accountId: accId,
                    playerId: playId,
                    videoId: vidId,
                    loop: loopData,
                    mute: muteData
                };
                new BrightCoveVideo(this,obj);
            });
        });
        
        limeLightPopUp.forEach((play:any) => {
            play.addEventListener("click", function(e) {
                e.preventDefault();
                var target = this.getAttribute('data-target');
                this.classList.add('clicked-limeLight');
                document.querySelectorAll(target).forEach(function (elem) {
                    let videoElem = elem.querySelector('.limeLight-video')?.closest(".a-video");
                    if (videoElem) {
                        new VideoComp(videoElem as HTMLElement);
                    }
                });
            });
        });

        videoURLPopUp.forEach((play:any) => {
            play.addEventListener("click", (e:any)  => {
                (e.target as HTMLElement)?.closest('.m-popup')?.classList.add('clicked-iframe');
                if(window.innerWidth > 767){
                	new YouTubeIframe(((e.target as HTMLElement).closest('.m-popup') as HTMLElement));
                }
                else if(window.innerWidth <= 767){
                    let modalID:any =  (e.target as HTMLElement)?.closest('.m-popup')?.getAttribute('data-target');
                    if(tempSrc_1){
                        setTimeout(function () {
                            if (document.querySelector(modalID).querySelector('.a-video').getAttribute('data-playertype') == 'modal') {
                                document.querySelector(modalID).querySelector('.a-video iframe').src = tempSrc_1;
                            }
                        }, 300);
                    }
                    else{
                        if((document.querySelector(modalID).querySelector('.a-video iframe') as HTMLIFrameElement).src.indexOf('youtube') > -1){
						    new VideoComp(document.querySelector(modalID).querySelector('.a-video'));
                        }
                    }
                }
            });
        });
        

        document.querySelectorAll('[data-js-component="video"]').forEach(function (elem:any) {
            let videoElem = elem.querySelector('.a-video__player')?.closest(".a-video");
            if (videoElem) {
                new VideoComp(videoElem as HTMLElement);
            }
        });
        
        function loadIframeAPI() {
            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
        }

    })();
})();