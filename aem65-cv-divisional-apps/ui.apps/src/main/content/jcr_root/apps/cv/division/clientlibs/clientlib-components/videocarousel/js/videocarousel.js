(function() {
	let VideoCarouselComp = (function() {
		function VideoCarousel(elem) {
			this.elem = elem;
			this.init(elem);
		}
		VideoCarousel.prototype.iframeVideoAppend = function(iframeVideo) {
			let iframeVideoTag = "<iframe width='100%' height='436px' src=" + "'" + $(iframeVideo).attr('data-video-src') + "' > </iframe>";
			if ($(window).width() > 767) {
				$(iframeVideo).closest('.o-video-carousel-container').find('.o-video-screen').html('').append(iframeVideoTag);
				$(iframeVideo).closest('.o-video-card-section').find('.o-video-title:first').find('.o-video-title-heading').text($(iframeVideo).find('.o-video-card-content .o-video-card-content-heading').text())
				$(iframeVideo).closest('.o-video-card-section').find('.o-video-title:first').find('p').text(($(iframeVideo).find('.o-video-card-content p').text()))
			} else {
				let modalID = $(iframeVideo).attr('data-target');
				$(modalID).find('.modal-body').html('').append(iframeVideoTag);
			}
		};
		VideoCarousel.prototype.limeLighVIdeoAppend = function(video) {
			let videoContent = "<div id=" + "'" + $(video).attr('data-player') + "' > </div>";
			if ($(window).width() > 767) {
				$(video).closest('.o-video-carousel-container').find('.o-video-screen').html('').append(videoContent);
				this.bindLimeLightVideo(video);
				$(video).closest('.o-video-card-section').find('.o-video-title:first').find('.o-video-title-heading').text($(video).find('.o-video-card-content .o-video-card-content-heading').text())
				$(video).closest('.o-video-card-section').find('.o-video-title:first').find('p').text(($(video).find('.o-video-card-content p').text()))
			} else {
				let modalID = $(video).attr('data-target');
				$(modalID).find('.modal-body').html('').append(videoContent);
				this.bindLimeLightVideo(video);
			}
		};

		VideoCarousel.prototype.brightCoveVIdeoAppend = function(bcvideo) {
			let s = document.createElement("script");
			let bcVideoContent = '<video-js id="myPlayerID" data-video-id="' + $(bcvideo).attr('data-video-id') + '"  data-account="' + $(bcvideo).attr('data-account') + '" data-player="' + $(bcvideo).attr('data-player-id') + '"data-embed="default" loop controls ></video-js>';
			s.src = "https://players.brightcove.net/" + $(bcvideo).attr('data-account') + "/" + $(bcvideo).attr('data-player-id') + "_default/index.min.js";
			if ($(window).width() > 767) {
				$(bcvideo).closest('.o-video-carousel-container').find('.o-video-screen').html('').append(bcVideoContent).prepend(s);
				$(bcvideo).closest('.o-video-card-section').find('.o-video-title:first').find('.o-video-title-heading').text($(bcvideo).find('.o-video-card-content .o-video-card-content-heading').text())
				$(bcvideo).closest('.o-video-card-section').find('.o-video-title:first').find('p').text(($(bcvideo).find('.o-video-card-content p').text()))
			} else {
				let modalID = $(bcvideo).attr('data-target');
				$(modalID).find('.modal-body').html('').append(bcVideoContent).prepend(s);
			}
		};
		VideoCarousel.prototype.bindLimeLightVideo = function(videoThumb) {
			if (videoThumb) {
				let LLVideoPlayer = videoThumb,
					LLVideoParent = $(LLVideoPlayer)?.closest('.o-video-carousel-container')?.find('.o-video-screen');
				let LLplayerID = $(LLVideoPlayer).attr('data-player'),
					LLmediaID = $(LLVideoPlayer).attr('data-media-id'),
					LLplayerForm = 'Player',
					videoLLHeight = LLVideoParent?.innerHieght;
				// lime light autoplay attr added
				LimelightPlayerUtil.embed({
					"playerId": LLplayerID,
					"mediaId": LLmediaID,
					"playerForm": LLplayerForm,
					"width": '100%',
					"height": videoLLHeight,
				});
			}
		};
		VideoCarousel.prototype.stopVideo = function() {
			let videos = document.querySelectorAll('.modal-video-carousel iframe,.modal-video-carousel video');
			videos.forEach(function(video) {
				if (video.tagName.toLowerCase() === "video") {
					setTimeout(function() {
						video.pause();
						video.currentTime = 0;
					}, 1000)
				} else if (video.tagName.toLowerCase() === "iframe") {
					setTimeout(function() {
						video.remove()
					}, 1000)
				}
			});
		}
		VideoCarousel.prototype.init = function(elem) {
			let slideShow = $(elem).find('.o-video-card-carousel').attr("data-slide-show");
			let slideScroll = $(elem).find('.o-video-card-carousel').attr("data-slide-scroll");
            let leftIcon = $(elem).find('.o-video-card-carousel').attr("data-left-icon");
			let rightIcon = $(elem).find('.o-video-card-carousel').attr("data-right-icon");
			$(elem).find(".slickSlider").slick({
				slidesToShow: parseInt(slideShow),
				infinite: false,
				slidesToScroll: parseInt(slideScroll),
				arrows: true,
				dots: true,
				nextArrow: '<div class="slick-custom-arrow-right '+rightIcon+'"></div>',
				prevArrow: '<div class="slick-custom-arrow-left '+leftIcon+'"></div>',
				responsive: [{
					breakpoint: 1024,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
						dots: true
					}
				}, {
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						dots: true,
						arrows: false
					}
				}]
			});
			let carousel = document.querySelectorAll(".m-videocarousel-popup");
			carousel?.forEach(function(vcarousel) {
				let modalSelector = vcarousel.getAttribute('data-target');
				setTimeout(() => {
					document.querySelector(modalSelector).classList.add('modal-video-carousel');
				}, 500);
			});
            if ($(window).width() > 767) {
				setTimeout(() => {
					elem.querySelectorAll('.o-video-card').forEach(function(card) {
						$(card).removeAttr('data-toggle');
						$(card).removeAttr('data-target');
					});
				}, 1000);
        	}
			let _this = this;
			$(elem).find('.slickSlider').each(function() {
				if ($(this).find('.slick-current').find('.o-video-card').attr('data-video-type') == 'iframe') {
					$(this).find('.slick-current').addClass('active-video');
					_this.iframeVideoAppend($(this).find('.slick-current').find('.o-video-card'));
				} else if($(this).find('.slick-current').find('.o-video-card').attr('data-video-type') == 'brightcove') {
					$(this).find('.slick-current').addClass('active-video');
					_this.brightCoveVIdeoAppend($(this).find('[data-video-type="brightcove"]:first'));
				} else {
					$(this).find('.slick-current').addClass('active-video');
					_this.limeLighVIdeoAppend($(this).find('[data-video-type="limeLight"]:first'));
				}
            	if ($(window).width() > 767) {
                    let maxheight = $(this).find('.slick-active:first-child .o-video-card-content').outerHeight();
                    $(this).find('.slick-active .o-video-card-content').each(function(){
                        if($(this).outerHeight() >= maxheight){
                            maxheight = $(this).outerHeight();
                        }
                    });
                    $(this).find('.slick-active .o-video-card-content').css('height',maxheight);
                }
			});

			$(elem).each(function () {

				if (window.location.href.includes("#")) {
					const [videoID, videoIDVal] = window.location.href.split("#")[1].split("-");
					const videoCarouselID = $(this).attr('id');
				
					if (videoID === videoCarouselID) {
						$(this).find(".slick-slide").each(function() {
							const videoCard = $(this).find('.o-video-card');
							const videoType = videoCard.attr('data-video-type');
							const vd = videoCard.attr("data-unique-id");
				
							if ((videoType === 'brightcove' || videoType === 'iframe') && videoIDVal === vd) {
								$(this).parent().find('.slick-current').not(this).removeClass('active-video');
								$(this).addClass('slick-current active-video');
				
								if (videoType === 'brightcove') {
									_this.brightCoveVIdeoAppend(videoCard);
								} else {
									_this.iframeVideoAppend(videoCard);
								}
				
								const header = document.querySelector('.o-header__sticky-section') || document.querySelector('.o-header-v2-global__sticky-section');
								const menuHeight = header && getComputedStyle(header).position === 'fixed' ? header.clientHeight : 0;
								const scrollTo = $("#" + videoCarouselID).offset().top;
				
								setTimeout(() => {
									$("html, body").animate({
										scrollTop: (scrollTo - menuHeight - 10)
									}, "slow");
								}, 500);
							}
						});
					}
				}
			});


			$(elem).find(".slickSlider").on("afterChange", function (){
                let maxheight = $(this).find('.slick-active.slick-current').find('.o-video-card-content').outerHeight();
                $(this).find('.slick-active .o-video-card-content').each(function(){
                    if($(this).outerHeight() >= maxheight){
                        maxheight = $(this).outerHeight();
                    }
                });
                $(this).find('.slick-active .o-video-card-content').css('height',maxheight);
            });

			
			
			elem.querySelectorAll('.o-video-card').forEach(function(clickVideo) {
				clickVideo.addEventListener('click', function(e) {
					$(clickVideo).closest('.slickSlider').find('.slick-slide').removeClass('active-video');
					$(clickVideo).closest('.slick-slide').addClass('active-video');
					if (this.getAttribute('data-video-type') == 'iframe') {
						_this.iframeVideoAppend(this);
						let position = $(clickVideo).closest('.o-video-carousel-container').find('.o-video-screen').offset().top;
            			let menuHeight = 0;
						if (document.querySelector('.o-header__sticky-section') && getComputedStyle(document.querySelector('.o-header__sticky-section')).position == 'fixed') {
							menuHeight = document.querySelector('.o-header__sticky-section')?.clientHeight;
						}
						if (document.querySelector('.o-header-v2-global__sticky-section') && getComputedStyle(document.querySelector('.o-header-v2-global__sticky-section')).position == 'fixed') {
							menuHeight = document.querySelector('.o-header-v2-global__sticky-section')?.clientHeight;
						}
						if ($(window).width() > 767) {
                            setTimeout(function() {
                                $("html, body").animate({
                                    scrollTop: (position - (menuHeight?menuHeight:0) - 10)
                                }, "slow");
                            }, 500)
						}
						if ($(window).width() < 767) {
								let target = $(clickVideo).attr('data-target');
								let targetSrc = $(clickVideo).attr('data-video-src');
								let videoID = targetSrc.split('/')[4].split('?')[0];
                				$(target).find('iframe').attr('id',`iframe_${videoID}`)
								let targetID = target.replace('#','');
								let iframe_id = `${targetID}_${videoID}`;
								let iframeWidth = 400;
                   				let iframeHeight = ($(target).find('iframe'))?.height();
								$(target).find('iframe').closest('.modal-body').html('<div id='+iframe_id+' sandbox="allow-same-origin allow-scripts allow-popups allow-forms"></div>')
								setTimeout(function() {
									window.YT.ready(function() {
										return new window.YT.Player(iframe_id, {
										width: iframeWidth,
										height: iframeHeight,
										videoId: videoID,
										playerVars: { 'version': 3, 'autoplay': 1, 'playsinline': 1},
										events: {
											'onReady': (event) => {onPlayerReady(event)}
										}
										});
									});
								}, 100)
						}
					} else if (this.getAttribute('data-video-type') == 'brightcove') {
						_this.brightCoveVIdeoAppend(this);
						let position = $(clickVideo).closest('.o-video-carousel-container').find('.o-video-screen').offset().top;
            			let menuHeight = 0;
						if (document.querySelector('.o-header__sticky-section') && getComputedStyle(document.querySelector('.o-header__sticky-section')).position == 'fixed') {
							menuHeight = document.querySelector('.o-header__sticky-section')?.clientHeight;
						}
						if (document.querySelector('.o-header-v2-global__sticky-section') && getComputedStyle(document.querySelector('.o-header-v2-global__sticky-section')).position == 'fixed') {
							menuHeight = document.querySelector('.o-header-v2-global__sticky-section')?.clientHeight;
						}
						if ($(window).width() > 767) {
                            setTimeout(function() {
                                $("html, body").animate({
                                    scrollTop: (position - (menuHeight?menuHeight:0) - 10)
                                }, "slow");
                            }, 500)
						}
						
					}else {
						_this.limeLighVIdeoAppend(this);
						let position = $(clickVideo).closest('.o-video-carousel-container').find('.o-video-screen').offset().top;
						let menuHeight = 0;
						if (document.querySelector('.o-header__sticky-section') && getComputedStyle(document.querySelector('.o-header__sticky-section')).position == 'fixed') {
							menuHeight = document.querySelector('.o-header__sticky-section')?.clientHeight;
						}
						if (document.querySelector('.o-header-v2-global__sticky-section') && getComputedStyle(document.querySelector('.o-header-v2-global__sticky-section')).position == 'fixed') {
							menuHeight = document.querySelector('.o-header-v2-global__sticky-section')?.clientHeight;
						}
						if ($(window).width() > 767) {
                            setTimeout(function() {
                                $("html, body").animate({
                                    scrollTop: (position - (menuHeight?menuHeight:0) - 10)
                                }, "slow");
                            }, 500)
						}
						if ($(window).width() < 767) {
							let targetLimelight = $(clickVideo).attr('data-target');
							console.log($(targetLimelight).find('.vjs-limelight-big-play')[0])
							setTimeout(function() {
								$(targetLimelight).find('.vjs-limelight-big-play')[0]?.click();
								$(targetLimelight).find('.vjs-limelight-big-play')?.click();
							},1000);
						}
					}
					if ($(window).width() > 767) {
						let modalIdentifier = $(clickVideo).attr('data-target');
						$(modalIdentifier).on('show.bs.modal', function(event) {
							return event.preventDefault();
						});
						setTimeout(function() {
							$('.modal-backdrop.show').removeClass('show');
							$('body.modal-open').removeClass('modal-open')
						}, 100)
					}
				});
			});
			let modalID = ($('.m-videocarousel-popup').attr('data-target'));
			setTimeout(function() {
				if ($(window).width() <= 767) {
					$(modalID).removeClass('desktop-view');
				}
				if ($(window).width() > 767) {
					$(modalID).addClass('desktop-view');
				}
			}, 1200)
			document.querySelector('.generic-modal--close')?.addEventListener('click', function() {
				this.stopVideo();
			});
			document.addEventListener("click", (e) => {
				if ((e.target)?.classList.contains("generic-modal") || (e.target)?.classList.contains("abt-icon-cancel")) {
					this.stopVideo();
				}
			});
			function onPlayerReady(event) {
				event.target.setVolume(70);
				event.target.playVideo();
			}
		};
		return VideoCarousel;
	}());
	(function() {
		document.querySelectorAll('[data-js-component="o-video-carousel-section"]').forEach(function(elem) {
			new VideoCarouselComp(elem);
		});
	})();
})();