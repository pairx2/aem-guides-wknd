import React from 'react';
import Image from '../../../Generic/components/Image/Image';
import PropTypes from 'prop-types';
import {isIE} from '../../../../utils/browserCompatibilityUtils';

const ProductImageCarouselControl = ({currentIndex, items, goTo}) => {
	const productItems = items.map((product, index) => ({...product, id: index+1}))
	return (
		<div className="adc-product-carousel__control adc-product-carousel__margin">
			{productItems.map((image, index) =>
				<div key={image.id}
						 className={`adc-product-carousel__control-item ${index === currentIndex ? 'active' : ''}`}
						 onClick={() => goTo(index)}>
					<Image fit={ isIE ? Image.FIT.COVER : Image.FIT.CONTAIN} src={image.url} className={'h-100'} alt="Carousel Image" />
				</div>
			)}
		</div>

	);
};
ProductImageCarouselControl.propTypes = {
	currentIndex: PropTypes.number,
	items: PropTypes.array,
	goTo: PropTypes.func,
};

ProductImageCarouselControl.defaultProps = {};

export default ProductImageCarouselControl;