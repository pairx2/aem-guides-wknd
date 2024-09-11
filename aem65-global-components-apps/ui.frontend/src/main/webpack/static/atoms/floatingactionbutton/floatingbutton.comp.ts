(function(){
    'use-strict';
    class FloatinButton{
        public elem: HTMLElement;
        public videoLLPlayer: HTMLElement | null;
        constructor(elem: HTMLElement) {
            let _this = this;
            this.elem = elem;
            this.videoLLPlayer = this.elem.querySelector('.limeLight-video.a-video__player-source');
            this.init(_this,elem);
            this.bindLimeLightVideo();
            this.videoLoop();
			this.videoLLloop();
        }
       public init(_this, elem) {
            let flaotingButton:HTMLElement;
            document.querySelector('.generic-modal--close')?.addEventListener('click', function () {
                _this.stopVideos();
            });
            
            document.addEventListener("click", function(e) {
                if ((e.target as Element)?.classList.contains('generic-modal--image') || (e.target as Element)?.classList.contains('abt-icon-cancel')) {
                    _this.stopVideos();
                }
            });  
            elem.querySelector(".cmp-button__link")?.addEventListener('click',function(e) {
                if (!e.target.closest('a').getAttribute('target') ) {
                elem.querySelector(".a-floatingactionbutton__floating-button")?.closest('.a-floatingactionbutton ')?.classList.remove("a-floatingactionbutton--sticky-button");
                
				}
                let scroll:any = e.target as HTMLElement;
                if(e.target.classList.contains('button-alignment')){
					scroll = e.target?.closest('button');
                }else{
					scroll = e.target;
                }
                
                setTimeout(function() {
                    flaotingButton = scroll;
                }, 300);
            });
            elem.querySelector(".a-floatingactionbutton__floating-button")?.closest('.a-floatingactionbutton ')?.classList.add('a-floatingactionbutton--sticky-button');
            let result = document.querySelector('.abt-icon .right-aligned .floating-btn-text');
            result?.classList.add('icon-text-align');
            setTimeout(function() {
                if (document.querySelector('.a-floatingactionbutton--sticky-button')) {
                    var element:any = document.querySelector('.footer');
                    var position = element.getBoundingClientRect();
                    if(position.top < window.innerHeight && position.bottom >= 0) {
                        var menuTop = window.innerHeight - position.top;
                        document.querySelector('.a-floatingactionbutton--sticky-button')?.setAttribute('style', 'bottom:' + menuTop + 'px');
                    }
                    else{
                        document.querySelector('.a-floatingactionbutton--sticky-button')?.setAttribute('style', 'bottom:0px');
                    }
                }
                document.querySelectorAll('.a-floatingactionbutton__floating-button a[href^="#"]').forEach(anchor => {
                    anchor.addEventListener('click', function (e) {
                        e.preventDefault();
                        setTimeout(() => {
                            let href = this.getAttribute("href");
                            let offsetTop = _this.findPosY(document.querySelector(href));
                            let menuHeight:any = 0;
                            if (document.querySelector('.o-header__sticky-section') && getComputedStyle(document.querySelector('.o-header__sticky-section') as HTMLElement).position == 'fixed') {
                                menuHeight = document.querySelector('.o-header__sticky-section')?.clientHeight;
                            }
                            if (document.querySelector('.o-header-v2-global__sticky-section') && getComputedStyle(document.querySelector('.o-header-v2-global__sticky-section') as HTMLElement).position == 'fixed') {
                                menuHeight = document.querySelector('.o-header-v2-global__sticky-section')?.clientHeight;
                            }
                            if (document.querySelector('.o-header__sticky-section') && getComputedStyle(document.querySelector('.o-header__sticky-section') as HTMLElement).position != 'fixed') {
                                menuHeight = (document.querySelector('.o-header__sticky-section')?.closest('.o-header-v2-global') as HTMLElement)?.clientHeight + 40;
                            }
                             if (document.querySelector('.o-header-v2-global__sticky-section') && getComputedStyle(document.querySelector('.o-header-v2-global__sticky-section') as HTMLElement).position != 'fixed') {
                                menuHeight = (document.querySelector('.o-header-v2-global__sticky-section')?.closest('.o-header-v2-global') as HTMLElement).clientHeight + 40;
                             }
                            _this.smoothScrollTo(0, (offsetTop - (menuHeight?menuHeight:0) - 40), 750);
                        },50);
                    });
                });
                document.addEventListener("scroll", function() {
                    elem.querySelector(".a-floatingactionbutton__floating-button")?.closest('.a-floatingactionbutton ')?.classList.add('a-floatingactionbutton--sticky-button');
                    if(document.querySelector(".a-floatingactionbutton__floating-button .btn-full-width")){
                        (document.querySelector(".a-floatingactionbutton__floating-button .btn-full-width") as HTMLElement).closest('.a-floatingactionbutton ')?.classList.add('a-floatingactionbutton--sticky-button');
                        (document.querySelector(".a-floatingactionbutton__floating-button .btn-full-width") as HTMLElement).style.display = "inline-block";
                    }
                    if (document.querySelector(".a-floatingactionbutton__floating-button .right-aligned button")) {
                        document.querySelector(".a-floatingactionbutton__floating-button .right-aligned button")?.closest('.a-floatingactionbutton ')?.classList.add('a-floatingactionbutton--sticky-button');
                        (document.querySelector(".a-floatingactionbutton__floating-button .right-aligned button") as HTMLElement).style.display = "flex";
                    }
					

                    if (flaotingButton != undefined) {
                        if(!flaotingButton.classList.contains('btn-full-width')){
                        	flaotingButton.style.display = "flex";
                        }
                    }
                    if (document.querySelector('.a-floatingactionbutton--sticky-button')) {
                        let href:any = document.querySelector(".a-floatingactionbutton__floating-button .btn-full-width")?.closest('a')?.getAttribute('href');
                        if(href){
							let element:any = document.querySelector(href);
							let position = element.getBoundingClientRect();
							if(position.top < window.innerHeight) {
								(document.querySelector(".a-floatingactionbutton__floating-button .btn-full-width")?.closest('.a-floatingactionbutton--sticky-button') as HTMLElement).style.display = "none";

							}
							else{
								document.querySelector(".a-floatingactionbutton__floating-button .btn-full-width")?.closest('.a-floatingactionbutton--sticky-button')?.setAttribute('style', 'position: fixed;bottom:0px;width:100%;');
							}
						}
                        let hrefRight:any = document.querySelector(".a-floatingactionbutton__floating-button .right-aligned button")?.closest('a')?.getAttribute('href');
                        if(hrefRight){
							let elementRight:any = document.querySelector(hrefRight);
							let positionRight = elementRight.getBoundingClientRect();
							if(positionRight.top < window.innerHeight && positionRight.bottom >= 0) {
								(document.querySelector(".a-floatingactionbutton__floating-button .right-aligned button") as HTMLElement).style.display = "none";
							}
						}
                    }
                });
                
            },500);
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
		};
        public videoLLloop() {
			let LLVideoPlayer: any = this.videoLLPlayer;
			if (LLVideoPlayer?.classList.contains("limeLight-video-wrapper")) {
				let LLVideoParent = LLVideoPlayer.parentElement?.parentElement;
				let LLControls = LLVideoParent?.getAttribute("data-controls"),
					LLLoop = LLVideoParent?.getAttribute("data-loop");
				if (LLLoop == 'true') {
					this.videoLoop();
				}
				if (LLControls == 'true') {
					let llControlsDis = LLVideoPlayer.find('.vjs-control-bar');
					llControlsDis.style.display = "none";
				}
			}
		};
        public videoLoop() {
			let videoLoopCheck = document.querySelector(".video-js")?.classList.contains("vjs-ended");
			if (videoLoopCheck) {
                document.querySelectorAll('[data-js-component="floatingbutton"]').forEach(function (elem) {
                    
                      new FloatinButton(elem as HTMLElement);
                    
                  });
			} else {
				let currThis = this;
				setTimeout(currThis.videoLoop, 500);
			}
		};
        public stopVideos () {
            let videos = document.querySelectorAll('.modal-float-button iframe,.modal-float-button video');
            videos.forEach(function(video:any) {
				if (video.tagName.toLowerCase() === "video") {
					setTimeout(function(){
						video.pause();
                        video.currentTime = 0;
					},1000)
				} else if (video.tagName.toLowerCase() === "iframe") {
                    let tempSrc = video.src;
                    setTimeout(function(){
                        video.src = "";
                        video.src = tempSrc;
                    },1000)
				}
                else {
                    let src = video.src;
                    video.src = src;
                }
            });
            
        }
        public findPosY(obj:any) {
            var curtop = 0;
            if (obj.offsetParent) {
                while (obj.offsetParent) {
                    curtop += obj.offsetTop
                    obj = obj.offsetParent;
                }
            }
            else if (obj.y)
                curtop += obj.y;
            return curtop;
        }
        public smoothScrollTo = function(endX, endY, duration) {
            let startX = window.scrollX || window.pageXOffset,
            startY = window.scrollY || window.pageYOffset,
            distanceX = endX - startX,
            distanceY = endY - startY,
            startTime = new Date().getTime();
    
            let easeInOutQuart = function(time, from, distance, duration) {
                if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
                return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
            };
    
            let timer = window.setInterval(function() {
                let time = new Date().getTime() - startTime,
                newX = easeInOutQuart(time, startX, distanceX, duration),
                newY = easeInOutQuart(time, startY, distanceY, duration);
                if (time >= duration) {
                    window.clearInterval(timer);
                }
                window.scrollTo(newX, newY);
            }, 1000 / 60); 
        };
    }
    
    (function(){
         var floatingButton =  document.querySelectorAll(".m-floating-popup");
        floatingButton?.forEach(function (cta) {
		let modalID:any = cta.getAttribute('data-target');
            	let timer =  setInterval(()=>{
            	document.querySelector(modalID)?.classList.add('modal-float-button');
        		clearInterval(timer);
        	},500);

        })
        document.querySelectorAll('[data-js-component="floatingbutton"]').forEach(function (elem) {
              new FloatinButton(elem as HTMLElement);
          });
    })();
})();