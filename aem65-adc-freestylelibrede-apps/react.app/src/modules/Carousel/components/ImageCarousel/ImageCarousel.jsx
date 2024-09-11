import React from 'react';
import Carousel from '../Carousel';
import ImageCarouselItem from './ImageCarouselItem';
import CarouselControlWhiteOrbs from '../CarouselControlWhiteOrbs';


const ImageCarousel = ({children}) => {
	return (
		<div className={'adc-image-carousel'}>
			<Carousel controlComponentDesktop={CarouselControlWhiteOrbs} withFade={false} canAutoSlide>
				{children?.map((child,i) => <ImageCarouselItem key={child.key} image={child}/>)}
			</Carousel>
		</div>

	);
};
ImageCarousel.propTypes = {};

ImageCarousel.defaultProps = {};

export default ImageCarousel;