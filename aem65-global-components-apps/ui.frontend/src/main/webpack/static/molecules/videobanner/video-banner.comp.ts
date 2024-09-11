
(function () {
    'use-strict';
   
  const namespace = 'video-banner';
  
  

  const attributes = {
    controls: 'data-controls',
    muted: 'data-muted',
    loop: 'data-loop',
    autoplay: 'data-autoplay',
    playerType: 'data-playertype',
    playIcon: 'data-playicon',
    pauseIcon: 'data-pauseicon',
    fallbackImgSrc: 'data-fallbackimgsrc',
    videType: 'data-videtype',
    plyText:'data-playtext',
    pauseText:'data-pausetext',
    mobileAutoplay:'data-mobileautoplay'
  };

  const selectors = {
    self: `[data-js-component="${namespace}"]`,
    videoBannerSection: `m-${namespace}`,
    atomVideoPlayer:'a-video__player',
    atomVideo:'.a-video',
    html5videoSelector: 'video.a-video__player-source',
    iframeVideoSelector: 'iframe.a-video__player-source',
    videoPlayBtn: `.m-${namespace}__icon-btn > div.button`,
    videoElm: `.m-${namespace} video`,
    videoLimeLightPlayerEml: 'iframe.a-video__player-source',
    atomDamVideo:'a-video__dom-video',
    limeLightVideoPlayer:'limeLight-video.a-video__player-source',
    abtIcon:'.abt-icon',
    abtBtnText:'a.btn span',
    playIconDiv:`.m-${namespace}__icon-btn`
  };


    class VideoBannerComp {
        
        public elem: HTMLElement;
        public PLAY: string;
        public PAUSE: string;
        public videoHTML5Player: HTMLVideoElement | null | any;
        public videoIFramePalyer: HTMLIFrameElement | null;
        public videoPlayElem: HTMLElement | null;
        public videoEml: HTMLVideoElement | null;
        public videoLLPlayer: HTMLElement | null;
        public videoPlayControlDiv: HTMLElement | null;
        public _this: any;

        private _autoPlay:boolean;
        public _videoPlayingState: boolean;
        private _playerType:string;
        private _playerControls:string;
        private _playText:string;
        private _pauseText:string;
        private _playIcon:string;
        private _pauseIcon:string;
        private _ISloop: boolean;


        constructor(elem: HTMLElement) {
            if (!elem) {
                throw new Error('Video banner element is required');
            }
            this._this = this;
            this.elem = elem;
            this._autoPlay = this.elem?.getAttribute(attributes.autoplay) == 'true' ?? false;
            this._ISloop = this.elem?.getAttribute(attributes.loop) == 'true' ?? false;
            this._videoPlayingState = false;
            this._playerType = this.elem?.getAttribute(attributes.playerType);
            this._playerControls = this.elem?.getAttribute(attributes.controls);
            this.PLAY =  'play';
            this.PAUSE = 'pause';
            this._playText = this.elem?.getAttribute(attributes.plyText);
            this._pauseText = this.elem?.getAttribute(attributes.pauseText);
            this._playIcon = this.elem?.getAttribute(attributes.playIcon);
            this._pauseIcon = this.elem?.getAttribute(attributes.pauseIcon);
            this.videoHTML5Player = this.elem.querySelector(selectors.html5videoSelector);
            this.videoIFramePalyer = this.elem.querySelector(selectors.iframeVideoSelector);
            this.videoPlayElem = this.elem.querySelector(selectors.videoPlayBtn);
            this.videoEml = this.elem.querySelector(selectors.videoElm);
            this.videoLLPlayer = this.elem.querySelector(selectors.videoLimeLightPlayerEml);
            this.videoPlayControlDiv = this.elem.querySelector(selectors.playIconDiv);

            var currentThis = this;

            this.init(this, elem);
            this.bindEvents(this);
            setTimeout(function () {
                document.querySelectorAll(`.${selectors.videoBannerSection} .`+selectors.limeLightVideoPlayer)?.forEach(function (source) {
                    currentThis.bindLimeLightVideo(source);
                    currentThis.videoLLloop(source);
                });
                document.querySelectorAll(`.${selectors.videoBannerSection} .brightCove-video`)?.forEach(function (source:any) {
                  if (!source?.id) return
                    let videoID = source?.querySelector('video')?.getAttribute('id');
                    let videoIn = (window as any)?.videojs(videoID);
                    const myPlayerPoster = videoIn?.poster() ?? '';
                    let posterImg = source?.closest(selectors.atomVideo);
                    const posterImgSRC = posterImg?.getAttribute(attributes.fallbackImgSrc);
                   
                    if (!videoIn || !videoID || videoIn == null) return;
                    myPlayerPoster == '' && posterImgSRC && $(posterImg?.querySelector('.vjs-poster'))?.css('background-image:', `url('${posterImg?.getAttribute(attributes.fallbackImgSrc)}')`);
                    myPlayerPoster == '' && posterImgSRC && $(posterImg?.querySelector('video'))?.attr('poster', posterImg?.getAttribute(attributes.fallbackImgSrc));
                    videoIn?.on('loadedmetadata', function () {
                        currentThis?.metaLoad(source, 'brightCove',videoID);
                    });
                    
                    videoIn?.on('error', function (el) {
                        const element = el.target;
                        const videJS = element?.closest('.brightCove-video');
                       let timer =  setTimeout(() => {
                        videJS?.removeClass('vjs-waiting');
                           posterImgSRC &&  videJS?.css('background-image:', `url('${posterImg?.getAttribute(attributes.fallbackImgSrc)}')`);
                           videJS?.removeClass('vjs-loading-spinner');
                           clearTimeout(timer);
                        }, 10);
                    });
                    if (posterImg?.getAttribute(attributes.loop) !== 'true' ){
                        videoIn?.on('ended', function () {
                            currentThis.playOrPauseVideo(currentThis.PAUSE);
                        });
                    }
                });
                document.querySelectorAll(`.${selectors.videoBannerSection} .`+selectors.atomDamVideo)?.forEach(function (video:HTMLVideoElement) {
                    $(video).on('loadedmetadata', function () {
                        video.classList.contains('a-video__dom-video') && currentThis.metaLoad(video, 'dam');
                    });
                    video?.setAttribute('preload','auto');
                    currentThis.videoDamControls(video);
                });
            }, 1100);
           
        }
        private metaLoad (video:HTMLVideoElement, type: 'brightCove' | 'LLM' | 'dam', sourceID?:string):any {
            switch (type) {
                case 'dam':
                    // ones DAM video metaData is available 
                    const fallbackImgSrc = video.closest(selectors.atomVideo).getAttribute(attributes.fallbackImgSrc) ?? null;
                    video?.setAttribute('poster', ''); // fallback image removed only for DAM type
                    $(video?.closest('.'+selectors.videoBannerSection))?.addClass('video-available').find(selectors.playIconDiv)?.removeClass('d-none');
                    break;
                case 'LLM':
                     // ones LLM video metaData is available 
                    if (sourceID){
                        const LLMclosestVideoAtom = $('#'+sourceID).closest('.'+selectors.videoBannerSection);
                        const posterDiv = LLMclosestVideoAtom?.find('.vjs-poster');
                        LLMclosestVideoAtom?.addClass('video-available')?.find(selectors.playIconDiv)?.removeClass('d-none');
                        posterDiv?.removeClass('vjs-hidden d-block');
                        posterDiv?.css({'background-image': `url("${$('#'+sourceID+' video')?.attr('poster') ?? posterDiv.find(selectors.atomVideo).attr('poster')}"`, 'background-size':'cover','display': ''});
                    }
                   break;
                case 'brightCove':
                    // ones brightCove video metaData is available 
                    if ($(`#${sourceID}`)?.length == 0) return
                    sourceID && $(`#${sourceID}`)?.closest('.'+selectors.videoBannerSection)?.addClass('video-available').find(selectors.playIconDiv)?.removeClass('d-none');
                    break;
            
                default:
                    break;
            }
        }

        public init(_this:any, elem:any) {
           
            if (!this._autoPlay && window.innerWidth > 767) {
                this.playOrPauseVideo(_this.PAUSE);
            } else if (this._autoPlay && window.innerWidth > 767) {
                setTimeout(function () {
                    if (_this._playerType == 'embed' ) {
                        _this.playOrPauseVideo(_this.PLAY);
                    }
                   
                }, 1300);
            }
            if (elem.getAttribute(attributes.mobileAutoplay) !== 'true' && window.innerWidth <= 767) {
                this.playOrPauseVideo(_this.PAUSE);
            } else if (elem.getAttribute(attributes.mobileAutoplay) == 'true' && window.innerWidth <= 767) {
                setTimeout(function () {
                    if (_this._playerType == 'embed') {
                            _this.playOrPauseVideo(_this.PLAY);
                    }
                    
                }, 1300);
            }
            
        }

        public bindEvents(_this:any) {
            let _a;
            let _b;
            (_a = this.videoPlayElem) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
                _this.playOrPauseVideo(!this._videoPlayingState ? _this.PLAY : _this.PAUSE);
            }.bind(this));
            
            !this._ISloop &&  (_b = this.videoHTML5Player) === null || _b === void 0 ? void 0 : _b.addEventListener('ended', function(elem) {
                this.currentTime = 0;
                !_this._ISloop &&  _this.playOrPauseBtnToggle(_this.PAUSE);
            }.bind(this));
            this._ISloop && this.videoHTML5Player?.classList?.contains("a-video__dom-video") && _b && this.videoHTML5Player?.setAttribute('loop','true');

        }

        public videoDamControls(video: any) {
            let damVideoControls = (video)?.classList.contains("a-video__dom-video");
            let damControlsEnDi = this._playerControls;
            
            if (damVideoControls && damControlsEnDi === 'true') {
                let player = video;
                setTimeout(function(){
                    (player)?.removeAttribute('controls');
                },500);
            }
            if(video?.closest('.a-video').getAttribute('data-playertype') == 'embed' && video){
                let player = video;
                const videElmDiv = video.closest('.a-video'); 
                this._videoPlayingState = 
                videElmDiv?.getAttribute(attributes.autoplay) == 'true' && window.innerWidth > 767 || 
                videElmDiv?.getAttribute(attributes.mobileAutoplay) == 'true' && window.innerWidth <= 767 ? true : false;
                this.playOrPauseBtnToggle(!this._videoPlayingState ? this.PLAY : this.PAUSE);
                setTimeout(function(){
                    player.currentTime = 0;
                    if(videElmDiv?.getAttribute(attributes.autoplay) == 'true' && window.innerWidth > 767){
                        player.muted = true;
                        player?.play();
                    }
                    if(videElmDiv?.getAttribute(attributes.autoplay) == 'false' && window.innerWidth > 767){
                        player?.pause();
                    }
                    if(videElmDiv?.getAttribute(attributes.mobileAutoplay) == 'true' && window.innerWidth <= 767){
                        player.muted = true;
                        player?.play();
                    }
                    if(videElmDiv?.getAttribute(attributes.mobileAutoplay) == 'false' && window.innerWidth <= 767){
                        player?.pause();
                    }
                    if(videElmDiv?.getAttribute(attributes.autoplay) == 'true' && videElmDiv?.getAttribute(attributes.mobileAutoplay) == 'false' && window.innerWidth <= 767){
                        player?.pause();
                    }
                },250);
            }
            
        
        }

        public playOrPauseVideo(type: string) {
            let videoHTML5PlayerNew = this.elem.querySelector('.a-video__player-source')?.closest('.a-video')?.querySelector('video');
           
            if(this.elem.querySelector('.limeLight-video') !== null){
                let limeID = this.elem.querySelector('.limeLight-video>div')?.getAttribute('id');
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
                    if(this._playerType == 'embed'){
                        if(this.elem.querySelector('.a-video__player-source .vjs-control-bar')){
                            (this.elem.querySelector('.a-video__player-source .vjs-control-bar') as HTMLElement).style.display = 'none';
                        }
                    }
                    if (videoHTML5PlayerNew.closest('.brightCove-video') != null || videoHTML5PlayerNew.closest('.limeLight-video') != null) {
                        videoHTML5PlayerNew.controls = false;
                    }
                    if(this._playerType == 'embed'){
                        videoHTML5PlayerNew.muted = true;
                    }
                    try {
                        let limeLightButton:HTMLButtonElement = this.elem.querySelector('.vjs-limelight-big-play');
                        setTimeout(() => {
                            videoHTML5PlayerNew.play();
                            if(limeLightButton){
                                limeLightButton?.click();
                            } 
                        }, 0);
                    } catch (error) {
                        console.log(error);
                    }
                   
                }

            } 
            try {
                type && this.playOrPauseBtnToggle(type);
            } catch (error) {
                console.log(error);
            }
           
            
        }

        public playOrPauseBtnToggle(type:string ='play') {
            if (!this.videoPlayElem)  return;
                const iconEml = this.videoPlayElem?.querySelector(selectors.abtIcon);
                const aButton = this.videoPlayElem?.querySelector('a.btn');
                const textEml = this.videoPlayElem?.querySelector(selectors.abtBtnText);
                const abtIconStartClass = 'abt-icon';
                // btn 
                const plyIconClass = this._playIcon?.replace(`${abtIconStartClass} `, '') ?? ' abt-icon-play2';
                const pauseIconClass = this._pauseIcon?.replace(`${abtIconStartClass} `, '') ?? ' abt-icon-pause';
                this._pauseIcon || this._playIcon && iconEml.classList.length > 0  ?  iconEml.className = '' : ''; 
                type && this.elem.querySelector('.limeLight-video') && this.blockPosterImage(type)
                if (type == this.PAUSE) {
                    iconEml.classList.add(`${abtIconStartClass}`,`${plyIconClass}`);
                    this._playText ? textEml.innerHTML = this._playText : '';
                    this._playText ? aButton?.setAttribute('title', `${this._playText?.toString()}`) : '';
                    this._videoPlayingState = false;
                } else if (type == this.PLAY) {
                   iconEml.classList.add(`${abtIconStartClass}`,`${pauseIconClass}`);
                   this._pauseText ? textEml.innerHTML = this._pauseText : '';
                   this._playText ? aButton?.setAttribute('title', `${this._playText?.toString()}`) : '';
                   this._videoPlayingState = true;
                }
            
        }
        public blockPosterImage (type: string) {
            const posterDivEml = this.elem?.querySelector('.vjs-poster');
            if (type == this.PAUSE){
                posterDivEml && posterDivEml.classList.add('d-block');
                
            } else if (type == this.PLAY) {
                posterDivEml && posterDivEml.classList.remove('d-block');
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
        public videoLoop() {
            let videoLoopCheck;
            this.elem.querySelectorAll(".video-js").forEach(function (video) {
                videoLoopCheck = video.classList.contains("vjs-ended")
            });
            if (videoLoopCheck) {
                document.querySelectorAll(selectors.self).forEach(function (elem) {
                    let videoElem = elem.querySelector('.global-video')?.closest(".a-video");
                    if (videoElem) {
                        new VideoBannerComp(videoElem as HTMLElement);
                    }
                });
            } else {
                let currentThis = this;
                setTimeout(function () {
                    currentThis.videoLoop();
                }, 1000);
            }
        }

        public bindLimeLightVideo(elem) {
            if (!elem) return
                let currentThis = this;
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
                var LimelightPlayerUtil = (window as any)?.LimelightPlayerUtil; 
                let LLfallBackImageSrc = LLVideoPlayer?.closest('.a-video')?.getAttribute(attributes.fallbackImgSrc) ?? '';
                if (LLVideoParent?.getAttribute('data-playertype') == 'embed'){
                    try {
                        LimelightPlayerUtil.embed({
                            "playerId": LLplayerID,
                            "mediaId": LLmediaID,
                            "playerForm": LLplayerForm,
                            "width": videoLLWidth,
                            "height": videoLLHeight,
                            "autoplay": window.innerWidth > 767 ? LLautoPlay : window.innerWidth <= 767 ? LLMobileautoPlay : LLautoPlay,
                            "muted": LLMuted
                        });
                    } catch (error) {
                        
                    }
                }
                let LLLoop: boolean = LLVideoPlayer?.closest('.a-video')?.getAttribute('data-loop') == 'true' ?  true : false;
              
                if (LLLoop) {
                    LLVideoPlayer?.querySelector('video')?.addEventListener('ended', function () {
                        this.currentTime = 0;
                        this.play();
                    }, false);
                } else {
                    LLVideoPlayer?.querySelector('video')?.addEventListener('ended', function () {
                        this.currentTime = 0;
                        this.pause();
                        currentThis.playOrPauseBtnToggle(currentThis.PAUSE);
                    }, false); 
                }
                if (LLfallBackImageSrc && LLVideoPlayer?.querySelector('.vjs-poster')?.length !==0){
                    $(LLVideoPlayer?.querySelector('.vjs-poster'))?.css({'background-image': `url("${LLfallBackImageSrc}")`,'background-size':'cover', 'display': 'block'});
                    $(LLVideoPlayer?.querySelector('.vjs-poster')).removeClass('vjs-hidden');
                    $(LLVideoPlayer?.querySelector('.vjs-poster')).addClass('d-block');
                }
                const LLMVideo = LLVideoPlayer?.querySelector('video');
                LLMVideo?.addEventListener('loadedmetadata', function () {
                    currentThis.metaLoad(LLMVideo, 'LLM', LLplayerID);
                }, false);
            
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

   
    (function () {
        document.querySelectorAll(selectors.self).forEach(function (elem:any) {
            let videoElem = elem.querySelector(`.${selectors.atomVideoPlayer}`)?.closest(selectors.atomVideo);
            if (videoElem) {
                new VideoBannerComp(videoElem as HTMLElement);
            }
        });
        
    })();
    
})();
