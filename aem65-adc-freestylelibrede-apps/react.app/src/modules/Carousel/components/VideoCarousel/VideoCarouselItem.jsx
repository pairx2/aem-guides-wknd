import React, {useState} from 'react';
import Rectangle from '../../../Generic/components/Rectangle/Rectangle';
import {Title} from '../../../Generic/components/Title/Title';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {openModalAction} from '../../../Modal/redux/actions';
import Icon from '../../../Generic/components/Icon/Icon';
import {VIDEO_PLAY_OPTION} from '../../../../utils/enums';
import ReactPlayer from 'react-player';
import {PATHS} from '../../../../utils/endpointUrl';

const mapDispatchToProps = {
	openModalAction
};

const playVideo = (videoId, openModalAction) => {
	openModalAction({
		contentID: 'videoModal',
		props: {
			videoId: videoId,
		},
		className: 'adc-modal-video'
	});
};

const VideoCarouselItem = ({video, openModalAction}) => {
	const {videoId, title, titleSize, titleTextColor, thumbnailImage, videoPlayOption} = video;
	const videoImage = thumbnailImage || PATHS.Youtube_Image(videoId, 0);
	const [isVisible, setVisibility] = useState(true);
	return (
		<div className={'adc-video-carousel__item'}>
			<Rectangle ar={0.6}>
				<if condition={videoPlayOption === VIDEO_PLAY_OPTION.DISPLAY_ON_MODAL}>
					<div className={'p-relative h-100 adc-video-carousel__item--image'} style={{backgroundImage: `url(${videoImage})`}}>
						<div className={'adc-video-carousel__item--thumb c-pointer'}>
							<Icon className={'adc-video-carousel__item--thumb-icon'} onClick={() => playVideo(videoId, openModalAction)}/>
						</div>
						{title && <Title text={title} color={titleTextColor} size={titleSize} isCentered className={'adc-video-carousel__item--title w-100'}/>}
					</div>
				</if>
				<else>
					<ReactPlayer light={videoImage} playing controls url={'https://www.youtube.com/watch?v=' + videoId} width="100%" height="100%"
						onPlay = {() =>setVisibility(false)}/>
					{isVisible && title && <Title text={title} color={titleTextColor} size={titleSize} isCentered className={'adc-video-carousel__item--title w-100'}/>}
				</else>
			</Rectangle>
		</div>
	);
};

VideoCarouselItem.propTypes = {
	video: PropTypes.shape({
		videoId: PropTypes.string,
		title: PropTypes.string,
		titleTextColor: PropTypes.string,
		titleSize: PropTypes.string,
		thumbnailImage: PropTypes.string,
		videoPlayOption: PropTypes.string,
	}),
	openModalAction: PropTypes.any
};

VideoCarouselItem.defaultProps = {};

export default connect(null, mapDispatchToProps)(VideoCarouselItem);
