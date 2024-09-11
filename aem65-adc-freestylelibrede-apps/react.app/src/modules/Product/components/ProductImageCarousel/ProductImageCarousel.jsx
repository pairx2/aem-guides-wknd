import React from 'react';
import PropTypes from 'prop-types';
import Carousel from '../../../Carousel/components/Carousel';
import ProductImageCarouselControl from './ProductImageCarouselControl';
import CarouselControlBlueOrbs from '../../../Carousel/components/CarouselControlBlueOrbs';
import ProductImage from './ProductImage';
import VideoCarouselItem from '../../../Carousel/components/VideoCarousel/VideoCarouselItem';

const ProductImageCarousel = ({images, videos, productName}) => {
	const productItems = [...images, ...videos].map((product, index) => ({...product, id: index+1}));
	return (
		<Carousel controlPosition={'bottom'} controlComponentDesktop={ProductImageCarouselControl}
					  controlComponentMobile={CarouselControlBlueOrbs} items={productItems}>
			{productItems.map((item) =>
				<>
					{!item.videoId && <ProductImage
								image={item}
								productName={productName}
								key={item.id}
								productItems={productItems}
								isModalOpen={false}/>}
					{item.videoId && <VideoCarouselItem video={item}/>}
				</>
			)}
		</Carousel>
	);
};

ProductImageCarousel.propTypes = {
	images: PropTypes.array,
	videos: PropTypes.array,
	productName: PropTypes.string
};

export default ProductImageCarousel;