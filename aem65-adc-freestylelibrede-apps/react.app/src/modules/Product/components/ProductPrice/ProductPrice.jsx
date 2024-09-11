import React from 'react';
import PropTypes from 'prop-types';

const ProductPrice = ({price, hasReference}) => {
	const getIntegerPart = () => Math.trunc(price);
	const getDecimalPart = () => {
		const decimal = Math.trunc(Math.round((price - getIntegerPart()) * 100));
		return decimal < 10 ? `0${decimal}` : decimal;
	};

	return (
		<>
			<span className="adc-price-detail__checkout adc-price-detail__price">{getIntegerPart()}</span>
			<span className="adc-price-detail__checkout adc-price-detail__subprice mt-2">{getDecimalPart()}</span>
			<span className="adc-price-detail__checkout adc-price-detail__currency">{'€'}</span>
			{hasReference && <span className="adc-price-detail__condition-applied mt-2 mb-4 mb-md-0">{'*'}</span>}
		</>
	);
};
ProductPrice.propTypes = {
	price: PropTypes.number.isRequired,
	hasReference: PropTypes.bool
};

ProductPrice.defaultProps = {
	hasReference: false
};

export default ProductPrice;