import React from 'react';
import {connect} from 'react-redux';
import {closeModalAction} from '../../../Modal/redux/actions';
import PropTypes from 'prop-types';
import Icon from '../../../Generic/components/Icon/Icon';
import Carousel from '../../../Carousel/components/Carousel';
import ProductImage from './ProductImage';
import VideoCarouselItem from '../../../Carousel/components/VideoCarousel/VideoCarouselItem';
import ProductImageCarouselControl from './ProductImageCarouselControl';
import CarouselControlBlueOrbs from '../../../Carousel/components/CarouselControlBlueOrbs';

const mapDispatchToProps = {
	closeModal: closeModalAction
};
const ImageModal = (props) =>  {

	const closeModalfn = () => {
		props.closeModal();
	};
	const productItems = props.productItems?.map((product, index) => ({...product, id: index+1}));
	const isModalOpen = true;
	return <div className="mw-100 mh-100 p-0 mt-0">
		<Carousel controlPosition={'bottom'} controlComponentDesktop={ProductImageCarouselControl}
					  controlComponentMobile={CarouselControlBlueOrbs} items={productItems}>
			{productItems.length && productItems?.map((item) =>
				<>
					{!item.videoId && <ProductImage image={item} key={item.id} isModalOpen={isModalOpen}/>}
					{item.videoId && <VideoCarouselItem video={item}/>}
				</>
			)}
		</Carousel>
		<Icon image={'close-icon'} size={Icon.SIZE.LARGE} className='adc-cartlist__delete-icon' onClick={()=>closeModalfn()}/>
	</div>;
};
ImageModal.propTypes = {
	closeModal: PropTypes.func,
	productItems:PropTypes.array
};
export default connect(null, mapDispatchToProps)(ImageModal);