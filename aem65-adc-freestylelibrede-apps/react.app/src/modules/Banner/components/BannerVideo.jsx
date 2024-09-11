import React, {Component} from 'react';
import Rectangle from '../../Generic/components/Rectangle/Rectangle';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ReactPlayer from 'react-player';
import {openModalAction} from '../../Modal/redux/actions';
import Icon from '../../Generic/components/Icon/Icon';
import {VIDEO_PLAY_OPTION} from '../../../utils/enums';
import {PATHS} from '../../../utils/endpointUrl';


const mapDispatchToProps = {
	openModalAction
};


export default connect(null, mapDispatchToProps) (class  BannerVideo  extends Component{


	playVideo = (video) => {
		const {openModalAction} = this.props;
		openModalAction({
			contentID: 'videoModal',
			props: {
				videoId: video
			},
			className: 'adc-modal-video'
		});
	};



	state = {
		isVideoPlaying: false,
		videoStarted: false,
		playedQuarter: false,
		playedHalf: false,
		playedThreeQuarter: false
	};

	static propTypes = {
		video: PropTypes.string,
		videoPlayOption: PropTypes.string,
		openModalAction: PropTypes.func,
		image: PropTypes.string
	};

	videoPlay = () => {
		this.setState({
			isVideoPlaying: true, videoStarted: true
		});
	};

	videoStop = () => {
		this.setState({
			isVideoPlaying: false
		});
	};

	handleProgress= (progress) => {
		const {playedQuarter, playedHalf, playedThreeQuarter} = this.state;
		const perValue = progress.played * 100;
		if(Math.round(perValue) > 25 && !playedQuarter){
			this.setState({playedQuarter: true});
		} else if(Math.round(perValue) > 50  && !playedHalf){
			this.setState({playedHalf: true});
		} else if(Math.round(perValue) > 75  && !playedThreeQuarter){
			this.setState({playedThreeQuarter: true});
		}
	};

	render() {
		const {children, video, className, videoPlayOption, image} = this.props;
		const {isVideoPlaying} = this.state;
		const videoImage = image || PATHS.Youtube_Image(video, 0);
		return (
			<div className={'adc-video-carousel__item adc-video-carousel__image'}  style={{backgroundImage: `url(${videoImage})`}} >
				<div
					className={'adc-banner-video' + (children ? ' adc-banner-video--fullBleed' : '') + ` ${className || ''}`}>
					<Rectangle ar={0.65}>
						<if condition={videoPlayOption === VIDEO_PLAY_OPTION.DISPLAY_ON_MODAL}>
							<div className={'adc-video-carousel__item--thumb c-pointer'}>
								<Icon className={'adc-video-carousel__item--thumb-icon'} onClick={() => this.playVideo(video)}/>
							</div>
							{children}
						</if>
						<else>
							<ReactPlayer light={videoImage} playing controls url={'https://www.youtube.com/watch?v=' + video} width="100%" height="100%" onPlay={this.videoPlay}
								onEnded={() => this.videoStop('End')} onPause={this.videoStop} onProgress={this.handleProgress}/>
							<div className={'adc-banner-video_content ' + (isVideoPlaying ? 'adc-banner-video_content--no-text': '')}>
								{children}
							</div>
						</else>
					</Rectangle>
				</div>
			</div>
		);
	}
});
