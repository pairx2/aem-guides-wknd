import React from 'react';
import PropsTypes from 'prop-types';
import I18n from '../../../Translation/components/I18n';
import {i18nLabels} from '../../../../utils/translationUtils';
import CouponCodeOrderOverview from './CouponCodeOrderOverview';
import {formatPrice} from '../../../../utils/pricingUtils';

const CartOverviewPricing = (props) => {
	const {
		subTolInTax,
		total,
		shippingType,
		shippingPrice,
		includedTax,
		couponCode,
		couponValue,
	} = props;
	return (
		<>
			<div className="row">
				<div className="col-7"><I18n text={i18nLabels.SUBTOTAL}/></div>
				<div
					className="col-5 text-right">{`${formatPrice(subTolInTax)}`}</div>
			</div>
			<div className="row">
				<div className="col-7">
					{<I18n text={shippingType ? ('shipping_type_' + shippingType) : i18nLabels.SHIPPING_COST}/>}
				</div>
				<div className="col-5 text-right">
					{`${formatPrice(shippingPrice)}`}
				</div>
			</div>
			{couponCode && <CouponCodeOrderOverview
				couponCode={couponCode}
				couponValue={couponValue}
			/>}
			<div className="row adc-cart-summary__cart-total mt-2">
				<div className="col-7"><I18n text={i18nLabels.TOTAL_WITH_TAX_LABEL}/></div>
				<div className="col-5 text-right">{`${formatPrice(total)}`}</div>
			</div>
			<div className="row adc-cart-summary__vat-detail">
				<div className="col-7"><I18n text={i18nLabels.ESTIMATED_TAX_LABEL}/></div>
				<div
					className="col-5 text-right">{`${formatPrice(includedTax)}`}</div>
			</div>
		</>);
};

CartOverviewPricing.propTypes = {
	subTolInTax: PropsTypes.number,
	total: PropsTypes.number,
	includedTax: PropsTypes.number,
	shippingType: PropsTypes.string,
	shippingPrice: PropsTypes.number,
	couponCode: PropsTypes.string,
	couponValue: PropsTypes.number,
};
export default CartOverviewPricing;