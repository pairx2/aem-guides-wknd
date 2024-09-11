(function () {
	class MedaVideo {
		private elem: HTMLElement;
		private PLAY: string;
		private PAUSE: string;
		private videoHTML5Player: HTMLVideoElement;
		private videoIFramePalyer: HTMLIFrameElement;
		private videoPlayElem: HTMLElement;
		private videoLLPlayer: HTMLElement;

		constructor(elem: HTMLElement) {
			if (!elem) {
				throw new Error('Video element is required');
			}
			this.elem = elem;
			this.PLAY = 'play';
			this.PAUSE = 'pause';
			this.videoHTML5Player = this.elem.querySelector('video.a-video__player-source');
			this.videoIFramePalyer = this.elem.querySelector('iframe.a-video__player-source');
			this.videoPlayElem = this.elem.querySelector('.a-video__play-btn');
			this.videoLLPlayer = this.elem.querySelector('.limeLight-video.a-video__player-source');
			this.bindLimeLightVideo();
			this.bindEvents();
			this.init();
		}
		private removeURLParameter(parameter: string, sourceURL: string) {
			let result = sourceURL;
			if (sourceURL.split('?')[1]) {
				result = sourceURL.split('?')[0] + '?' + sourceURL.split('?')[1].split('&').filter((val: string) => val.indexOf(parameter) < 0).join('&');
			}
			return result;
		}
		private checkQueryStringParameterExists(parameter: string, sourceURL: string) {
			if ((sourceURL.indexOf('?' + parameter + '=') >= 0) || (sourceURL.indexOf('&' + parameter + '=') >= 0))
				return true;
			return false;
		}
		private playOrPauseVideo(type: string) {
			if (this.videoHTML5Player) {
				this.videoHTML5Player.controls = true;
				if (type === this.PAUSE) {
					this.videoHTML5Player.pause();
					this.videoHTML5Player.currentTime = 0;
				} else if (type === this.PLAY) {
					this.videoHTML5Player.play();
				}
			}
			else if (this.videoIFramePalyer) {
				if (type === this.PAUSE && this.checkQueryStringParameterExists('autoplay', this.videoIFramePalyer.src)) {
					// To check if the video is already playing
					this.videoIFramePalyer.src = this.removeURLParameter('autoplay', this.videoIFramePalyer.src);
				} else if (type === this.PLAY) {
					// append autoplay=1 to src string, which will autoplay the video
					this.videoIFramePalyer.src += (this.videoIFramePalyer.src.indexOf('?') > -1 ? '&' : '?') + 'autoplay=1';
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
		private bindLimeLightVideo() {
			if (this.videoLLPlayer) {

				let LLVideoPlayer = this.videoLLPlayer,
					LLVideoParent = LLVideoPlayer.parentElement.parentElement;

				let LLplayerID = "limelight_player_" + LLVideoPlayer.getAttribute('data-player-ID'),
					LLmediaID = LLVideoPlayer.getAttribute('data-media-ID'),
					LLplayerForm = 'Player',
					LLautoPlay = LLVideoParent.getAttribute('data-autoplay'),
					videoLLWidth = LLVideoParent.offsetWidth,
					videoLLHeight = videoLLWidth * 0.56;

				LimelightPlayerUtil.embed({
					"playerId": LLplayerID,
					"mediaId": LLmediaID,
					"playerForm": LLplayerForm,
					"width": videoLLWidth,
					"height": videoLLHeight,
					"autoplay": LLautoPlay
				});
			}
		}
		private bindEvents() {
			// event is attached to play btn & thumbnail image
			this.videoPlayElem?.addEventListener('click', function () {
				this.playOrPauseVideo(this.PLAY);
			}.bind(this));
		}
		private init() {
			if (this.elem.getAttribute('data-autoplay') !== 'true') {
				this.playOrPauseVideo(this.PAUSE);
			} else {
				this.playOrPauseVideo(this.PLAY);
			}
		}
	}
	$(function () {
		document.querySelectorAll('[data-js-component="video"]').forEach(elem => {
			const videoElem = elem.querySelector('.a-video');
			if (videoElem) {
				new MedaVideo(videoElem as HTMLElement);
			}
		});
	});
})()
