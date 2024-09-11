import React from 'react';
import PropTypes from 'prop-types';
import {i18nLabels} from '../../../../utils/translationUtils';
import I18n from '../../../Translation/components/I18n';
import {formatPrice} from '../../../../utils/pricingUtils';

const MiniCartPricingOverview = props => {
	const {cartPrice, taxValue} = props;
	return (
		<div className="cart-header-dropdown-cart-item cart-header-dropdown-cart-item__total">
			<div className="row align-items-center">
				<div className="col-7">
					<h5 className="cart-header-dropdown-cart-title__total mb-0"><I18n text={i18nLabels.SUBTOTAL}/></h5>
					<p className="cart-header-vat-notice"><I18n text={i18nLabels.INCLUDING_VAT} params={[taxValue]}/></p>
				</div>
				<div className="col-4 pl-0 pl-md-3">
					<h4 className="cart-header-dropdown-cart-price">{formatPrice(cartPrice)}</h4>
				</div>
			</div>
		</div>
	);
};
MiniCartPricingOverview.propTypes = {
	cartPrice: PropTypes.number,
	taxValue: PropTypes.string
};
export default MiniCartPricingOverview;