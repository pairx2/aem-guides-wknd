import React from 'react';
import PropTypes from 'prop-types';

const CartRowImage = (props) => {
	const {image, url, name} = props;
	return (
		<a href={url}>
			<img className="img-fluid cart-row-image lazyload" alt={name} data-src={image}/>
		</a>
	);
};
CartRowImage.propTypes = {
	image: PropTypes.string,
	url: PropTypes.string,
	name: PropTypes.string,
};
export default CartRowImage;
