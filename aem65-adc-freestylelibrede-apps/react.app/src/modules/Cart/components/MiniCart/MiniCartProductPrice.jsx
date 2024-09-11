import React from 'react';
import {formatPrice} from '../../../../utils/pricingUtils';
import PropTypes from 'prop-types';

const MiniCartProductPrice = (props) => {
	const {price} = props;
	return (
		<h4 className="cart-header-dropdown-cart-price">{formatPrice(price)}</h4>
	);
};
MiniCartProductPrice.propTypes = {
	price: PropTypes.number
};
export default MiniCartProductPrice;