import React from 'react';
import Image from '../../../Generic/components/Image/Image';
import PropTypes from 'prop-types';


const ImageCarouselItem = ({image}) => {
	const {renditions, title} = image;
	return (
		<div className={'adc-image-carousel__item h-100'}>
			<h2 className={'adc-image-carousel__item-title adc-title adc-title--white  text-center text-lg-left'}>{title}</h2>
			<Image renditions={renditions} className={'h-100'} fit={Image.FIT.COVER} alt={title} />
		</div>

	);
};
ImageCarouselItem.propTypes = {
	image: PropTypes.shape({
		renditions: PropTypes.array,
		title: PropTypes.string
	})
};

ImageCarouselItem.defaultProps = {};

export default ImageCarouselItem;