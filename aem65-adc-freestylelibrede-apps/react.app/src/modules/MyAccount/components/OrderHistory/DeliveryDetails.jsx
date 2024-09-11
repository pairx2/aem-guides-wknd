import React from 'react';
import I18n from '../../../Translation/components/I18n';
import PropTypes from 'prop-types';
import {i18nLabels} from '../../../../utils/translationUtils';
import {formatPrice} from '../../../../utils/pricingUtils';
import {ORDER_TYPES} from '../../../../utils/enums';
import {getCountryName} from '../../../../utils/orderUtils';
import {USER_PREFIX, DELIVERY_STATUSES} from '../../../../utils/enums';

const DeliveryAddress = ({deliveryAddress}) => {
	const {salutation, firstName, lastName, street, zipCode, city, addressInfo, country} = deliveryAddress || {};

	return (<div className="col-12 col-lg-6">
		<if condition={deliveryAddress}>
			<h3 className="adc-order-hist__subs__desc-heading font-weight-600 m-0 pb-4"><I18n
				text={i18nLabels.SHIPPING_ADDRESS_LABEL} suffix={':'}/></h3>
			<div className="adc-order-hist__subs_addr">
				<p className="mb-1">{`${(salutation?.toLowerCase() !== USER_PREFIX.DIVERS && salutation !== USER_PREFIX.HYPHEN) && salutation || ''} ${firstName || ''} ${lastName || ''}`}</p>
				<p className="mb-1">{`${street || ''} ${addressInfo || ''}`}</p>
				<p className="mb-1">{`${zipCode || ''} ${city || ''}, ${getCountryName(country) || ''}`}</p>
			</div>
		</if>
	</div>);
};

DeliveryAddress.propTypes = {
	deliveryAddress: PropTypes.object,
};

const DeliveryDetails = ({deliveryAddress, totalPrice, priceBreakdown, orderType, deliveries}) => {
	const {deliveryCost, price, discount} = priceBreakdown || {};

	const priceBreakdownSum = (type) => {
		let initialPrice = 0;
		deliveries?.filter(status => status?.deliveryStatus !== DELIVERY_STATUSES.CANCELLED)?.map(delivery => {
			delivery?.priceBreakdown?.map(price => {
				initialPrice = initialPrice + price?.[type];
			});
		});
		return initialPrice;
	}
	return (
		<div className="row pb-4">
			<div className="col-12 pb-3">
				<hr className="adc-border-bottom m-0"/>
			</div>
			<DeliveryAddress deliveryAddress={deliveryAddress}/>
			<div className="col-12 col-lg-6">
				<hr className="adc-border-bottom my-3 d-lg-none"/>
				<h3 className="adc-order-hist__subs__desc-heading font-weight-600 m-0 pb-3">
					<I18n text={i18nLabels.COST_LABEL} suffix={':'}/></h3>
				<if condition={orderType === ORDER_TYPES.CPO || orderType === ORDER_TYPES.CPS}>
					<div className="d-flex pb-2">
						<div className="pr-2"><I18n text={i18nLabels.SUBTOTAL}/></div>
						<div className="ml-auto pl-2">{formatPrice(price || 0)}</div>
					</div>
				</if>
				<if condition={orderType === ORDER_TYPES.RX}>
					<div className="d-flex pb-2">
						<div className="pr-2"><I18n text={i18nLabels.RX_COPAY_LABEL}/></div>
						<div className="ml-auto pl-2">{formatPrice(priceBreakdownSum('coPay') || 0)}</div>
					</div>
					<div className="d-flex pb-2">
						<div className="pr-2"><I18n text={i18nLabels.RX_COPAY_EXEMPTION_LABEL}/></div>
						<div className="ml-auto pl-2">{(priceBreakdownSum('coPayExemption') === 0 ? '' : '-') + formatPrice(priceBreakdownSum('coPayExemption') || 0)}</div>
					</div>
					<div className="d-flex pb-3">
						<div className="pr-2"><I18n text={i18nLabels.OWN_COST_CONTRIBUTION}/></div>
						<div className="ml-auto pl-2">{formatPrice(priceBreakdownSum('surcharge') || 0)}</div>
					</div>
				</if>
				<div className="d-flex pb-2">
					<div className="pr-2"><I18n text={i18nLabels.SHIPPING_COST}/></div>
					<div className="ml-auto pl-2">{formatPrice(orderType === ORDER_TYPES.RX ? priceBreakdownSum('deliveryCost') : deliveryCost || 0)}</div>
				</div>
				<div className="d-flex pb-4">
					<div className="pr-2"><I18n text={i18nLabels.DISCOUNT}/></div>
					<div className="ml-auto pl-2">{formatPrice(orderType === ORDER_TYPES.RX ? priceBreakdownSum('discount') : discount || 0)}</div>
				</div>
				<div className="d-flex pb-5">
					<div className="pr-2"><I18n text={i18nLabels.TOTAL_LABEL}/></div>
					<div className="font-weight-bold ml-auto pl-2 lspacing-point3">{formatPrice(orderType === ORDER_TYPES.RX ? priceBreakdownSum('totalPrice') : totalPrice || 0)}</div>
				</div>
			</div>
		</div>
	);
};

DeliveryDetails.propTypes = {
	deliveries: PropTypes.object,
	deliveryAddress: PropTypes.object,
	totalPrice: PropTypes.number,
	priceBreakdown: PropTypes.object,
	orderType: PropTypes.oneOf(Object.values(ORDER_TYPES)),
};

export default DeliveryDetails;