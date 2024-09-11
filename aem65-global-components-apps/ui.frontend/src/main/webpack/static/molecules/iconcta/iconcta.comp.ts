(function () {
    class LimelightComp {
        public elem: HTMLElement;
        public videoPlayElem: HTMLElement | null;
        public videoLLPlayer: HTMLElement | null;
        public _this: any;

        constructor(elem: HTMLElement) {
            if (!elem) {
                throw new Error('Video element is required');
            }
            this._this = this;
            this.elem = elem;
            this.videoPlayElem = this.elem.querySelector('.a-video__play-btn');
            this.videoLLPlayer = this.elem.querySelector('.limeLight-video.a-video__player-source');
            this.bindLimeLightVideo();
            let currentThis = this;
            setTimeout(function () {
                currentThis.bindLimeLightVideo();
            }, 200);

        }


        public bindLimeLightVideo() {
            if (this.videoLLPlayer) {
                let LLVideoPlayer = this.videoLLPlayer,
                    LLVideoParent = LLVideoPlayer?.parentElement?.parentElement;
                let LLplayerID = "limelight_player_" + LLVideoPlayer.getAttribute('data-player-ID'),
                    LLmediaID = LLVideoPlayer.getAttribute('data-media-ID'),
                    LLplayerForm = 'Player',
                    LLautoPlay = LLVideoParent?.getAttribute("data-autoplay"),
                    LLMuted = LLVideoParent?.getAttribute("data-muted"),
                    videoLLWidth = LLVideoParent?.offsetWidth,
                    videoLLHeight = videoLLWidth ? videoLLWidth : 0 * 0.56;

                // lime light autoplay attr added
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
        }


    }

    class CloseVideoPopup {

        constructor() {
            this.init();
        }

        public init() {
            var videos = document.querySelectorAll("[data-js-component='iconcta'] iframe, [data-js-component='iconcta'] video");
            Array.prototype.forEach.call(videos, function (video) {
                if (video.tagName.toLowerCase() === "video") {
                    video.pause();
                } else if (video.tagName.toLowerCase() === "iframe") {
                    video.src = "";
                }
            });
        }

    }

    class YouTubeIframe {

        private elem: HTMLElement;

        constructor(elem: HTMLElement) {
            this.elem = elem;
            this.init();
        }

        public init() {
            if ((this.elem).querySelector(".play-icon") != null) {
                let popupId: any = "#" + (this.elem).querySelector(".play-icon")?.getAttribute("id") + "-modal";
                let iframeUrl = document.querySelector(popupId)?.querySelector("iframe")?.getAttribute("data-url");
                document.querySelector(popupId)?.querySelector("iframe")?.setAttribute("src", iframeUrl);
            }
        }

    }

    class BrightCoveVideo {

        private obj: object;
        private elem: HTMLElement;

        constructor(elem: HTMLElement, obj: object) {
            this.elem = elem;
            this.obj = obj;
            this.init(this.obj);
        }

        public init(obj) {
            let playerHTML;
            if (obj.loop) {
                playerHTML = '<video-js id="myPlayerID" data-video-id="' + obj.videoId + '"  data-account="' + obj.accountId + '" data-player="' + obj.playerId + '"data-embed="default" loop controls ></video-js>';
            } else {
                playerHTML = '<video-js id="myPlayerID" data-video-id="' + obj.videoId + '"  data-account="' + obj.accountId + '" data-player="' + obj.playerId + '"data-embed="default" controls ></video-js>';
            }
            var popupId = "#" + (this.elem).querySelector(".play-icon")?.getAttribute("id") + "-modal";

            var popupDiv:any = document.querySelector(popupId);
            if (popupDiv.querySelector(".placeHolder") != null) {
                (popupDiv.querySelector(".placeHolder") as HTMLElement).innerHTML = playerHTML;
                let s:any = document.createElement("script");
                s.src = "https://players.brightcove.net/" + obj.accountId + "/" + obj.playerId + "_default/index.min.js";
                popupDiv.querySelector(".placeHolder")?.appendChild(s);
                s.onload = this.callback(this.elem);
            }
        }

        public callback(_elem) {
            var _this = this;
            setTimeout(() => {
                let myPlayer = bc("myPlayerID");
                myPlayer.on("loadedmetadata", function () {
                    _this.autoPlayBrightCove(_elem);
                });
            }, 500);
        };

        public autoPlayBrightCove(_elem) {
            videojs?.getPlayer("myPlayerID").ready(function () {
                var popupId = "#" + (_elem).querySelector(".play-icon").getAttribute("id") + "-modal";

                var popupDiv:any = document.querySelector(popupId);
                let autoPlay: any = (popupDiv.querySelector(".brightcove-video"))?.getAttribute("data-autoplay");
                let autoPlayData = eval(autoPlay);
                let controls: any = (popupDiv.querySelector(".brightcove-video"))?.getAttribute("data-controls")
                let controlsData = eval(controls);
                let meta: any = popupDiv.querySelector(".brightcove-video")?.getAttribute("data-muted");
                let muteData = eval(meta);
                let myPlayer = this;
                if (autoPlayData) {
                    myPlayer.play();
                }
                if (controlsData) {
                    (document.querySelector("#myPlayerID .vjs-control-bar") as HTMLElement).style.display = "none";
                }
                if (!muteData) {
                    myPlayer.muted(true);
                }
            });
        };

    }


    (function () {

        const brightCovePopUp = document.querySelectorAll(".m-iconcta-popup.brightCove");
        const limeLightPopUp = document.querySelectorAll(".m-iconcta-popup.limeLight");
        const videoURLPopUp = document.querySelectorAll(".m-iconcta-popup.videoURL");
        var iconCTA =  document.querySelectorAll(".m-iconcta-popup");
        iconCTA?.forEach(function (cta) {
			let modalID:any = cta.getAttribute('data-target');
            var timer =  setInterval(()=>{
            	document.querySelector(modalID)?.classList.add('modal-iconcta');
        		clearInterval(timer);
        	},500);

        })

        document.addEventListener("click", (e) => {
            if ((e.target as HTMLElement)?.classList.contains("generic-modal--image") || (e.target as HTMLElement)?.classList.contains("abt-icon-cancel")) {
                new CloseVideoPopup();
            }
        });

        brightCovePopUp.forEach((play) => {
            play.addEventListener("click", function () {
                var popupId = "#" + this.querySelector(".play-icon").getAttribute("id") + "-modal";

                var popupDiv:any = document.querySelector(popupId);
                let accId: any = popupDiv.querySelector(".brightcove-video")?.getAttribute("data-account");
                let playId = popupDiv.querySelector(".brightcove-video")?.getAttribute("data-player");
                let vidId = popupDiv.querySelector(".brightcove-video")?.getAttribute("data-video-id");
                let loopAttr: any = popupDiv.querySelector(".brightcove-video")?.getAttribute("data-loop");
                let loopData = eval(loopAttr);
                let obj = {
                    accountId: accId,
                    playerId: playId,
                    videoId: vidId,
                    loop: loopData,
                };
                new BrightCoveVideo(this, obj);
            });
        });

        limeLightPopUp.forEach((play) => {
            play.addEventListener("click", function () {
                document.querySelectorAll('[data-js-component="iconcta"]').forEach(function (elem) {
                    let videoElem = elem.querySelector(".a-video");
                    if (videoElem) {
                        new LimelightComp(videoElem as HTMLElement);
                    }
                });
            });
        });

        videoURLPopUp.forEach((play) => {
            play.addEventListener("click", function () {
                new YouTubeIframe(this);
            });
        });

        let getCtaElement = document.querySelectorAll('.m-iconcta');
        Array.from(getCtaElement, ele => {
            let htElementele = ele.querySelectorAll('.horizontal-ruler');
            var paraEle = ele.querySelectorAll('.custom-card img+p')
            Array.from(htElementele, function (hrele, index) {
                if (htElementele.length - 1 != index) {
                    hrele.classList.add('horizontal-ruler--romove-border');
                }
            });

            if (paraEle.length > 0 && window.innerWidth > 767) {
                setTimeout(function () {
                    var paraMaxHeight = paraEle[0].clientHeight;
                    paraEle.forEach(function (para) {
                        if (para.clientHeight > paraMaxHeight) {
                            paraMaxHeight = para.clientHeight;
                        }
                    });
                   paraEle.forEach(function (para) {
                        para.setAttribute('style', 'height:' + paraMaxHeight + 'px');
                    });
                }, 1000);
            }
        });

    })();
})();