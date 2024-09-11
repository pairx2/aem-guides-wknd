import React from 'react';
import {Title} from '../../../Generic/components/Title/Title';
import Carousel from '../Carousel';
import VideoCarouselItem from './VideoCarouselItem';
import CarouselControlBlueOrbs from '../CarouselControlBlueOrbs';
import PropTypes from 'prop-types';
import Button from '../../../Generic/components/Button/Button';

const VideoCarousel = ({heading, sectionHeading, ctaText, ctaStyling, ctaURL, ctaAction, children}) => {
	const videoList = children.map((child, index) => ({ ...child, id: index+1 }));
	return (
		<div className={'adc-video-carousel py-5'}>
			<Title size={Title.SIZE.SECTION} color={Title.COLOR.BLUE} isCentered text={heading || 'Title'}/>
			<p className={'adc-video-carousel__text text-center mb-5'}>{sectionHeading}</p>
			<Carousel className={'pb-5'} controlComponentDesktop={CarouselControlBlueOrbs} controlPosition={'bottom'}
					  itemsToShowDesktop={3} itemsToShowMobile={1} hasArrows>
				{videoList?.map((child) => <VideoCarouselItem key={child.id} video={child}/>)}
			</Carousel>
			<if condition={ctaText}>
				<div className={'text-center mt-3 margin-bottom-30'}>
					<Button ctaStyle={ctaStyling} label={ctaText} href={ctaURL} target={ctaAction}/>
				</div>
			</if>
		</div>
	);
};
VideoCarousel.propTypes = {
	heading: PropTypes.string,
	sectionHeading: PropTypes.string,
	ctaText: PropTypes.string,
	ctaStyling: PropTypes.string,
	ctaURL: PropTypes.string,
	ctaAction: PropTypes.string
};

export default VideoCarousel;