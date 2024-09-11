import React from 'react';
import PropTypes from 'prop-types';
import {i18nLabels} from '../../../../utils/translationUtils';
import I18n from '../../../Translation/components/I18n';
import {formatPrice} from '../../../../utils/pricingUtils';

const CartRowPrice = (props) => {
	const {price, priceColHeading, taxValue} = props;
	return (
		<div className="col-lg-6 col-md-10 px-md-0 pt-4">
			<p className="text-left d-md-none d-sm-block float-left">
				<span className="font-weight-bold">{priceColHeading}</span>
				<span className="adc-cartlist__product-measure"><I18n text={i18nLabels.INCLUDING_VAT} params={[taxValue]}/></span>
			</p>
			<p className="text-right text-lg-left adc-cartlist__cart-price">{formatPrice(price)}</p>
		</div>
	);
};
CartRowPrice.propTypes = {
	price: PropTypes.number,
	priceColHeading: PropTypes.string,
	taxValue: PropTypes.string
};
export default CartRowPrice;