import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../Generic/components/Icon/Icon';
import I18n from '../../../Translation/components/I18n';
import {i18nLabels} from '../../../../utils/translationUtils';
import {formatPrice} from '../../../../utils/pricingUtils';
import {SHIPPING_TYPES} from '../../../../utils/enums';

const CartPricingOverview = (props) => {
	const {
		shippingPrice,
		totalWithVatPrice,
		EstimatedVATPrice,
		shippingLabel,
		isShippingAddressSet
	} = props;
	const getShippingLabel = (label) => {
		switch (label?.toLowerCase()) {
			case SHIPPING_TYPES.STANDARD_SHIPPING:
				return i18nLabels.STANDARD_SHIPPING_LABEL;
			case SHIPPING_TYPES.EXPRESS_SHIPPING:
				return i18nLabels.EXPRESS_SHIPPING_LABEL;
			default:
				return null;
		}
	};
	return (
		<>
			<div className="row offset-md-6 py-3 border-bottom-dark">
				<div className="col-6 px-md-0 d-flex align-items-center">
					<I18n text={getShippingLabel(shippingLabel) || i18nLabels.SHIPPING_COST}/>
					<Icon image={'info-box'} size={Icon.SIZE.SMALL} className={'ml-md-3'}>
						<div className="adc-tooltipbottom__content">
							<div className="row justify-content-center">
								<div className="col-10 font-weight-bold text-left"><I18n
									text={i18nLabels.SHIPPING_INFO_LABEL}/></div>
							</div>
						</div>
					</Icon>
				</div>
				{isShippingAddressSet ?
					<div className="col-6 text-right pr-3 text-md-left pr-md-0 pl-md-4">{formatPrice(shippingPrice)}</div>
					:
					<div className="col-6 p-0 text-sm-right text-lg-left">
						<I18n text={i18nLabels.ENTER_ADDRESS_TO_SELECT_SHIPPING_METHOD}/>
					</div>
				}
			</div>
			<div className="adc-cartlist__total row offset-md-6 py-3">
				<div className="col-md-6 col-7 px-md-0">
					<p className=" font-weight-bold mb-0"><I18n text={i18nLabels.TOTAL_WITH_VAT}/></p>
					<p className="adc-cartlist__total__subtotal pt-1"><I18n text={i18nLabels.ESTIMATED_VAT_LABEL}/></p>
				</div>
				<div className=" pl-md-3 col-md-6 col-5 text-right text-md-left">
					<p className=" font-weight-bold mb-0 pl-2 pl-sm-5 pl-md-2">{formatPrice(totalWithVatPrice)}</p>
					<p className="adc-cartlist__total__subtotal pt-1 pl-md-2 text-right  text-md-left">
						{formatPrice(EstimatedVATPrice)}
					</p>
				</div>
			</div>

		</>
	);
};
CartPricingOverview.propTypes = {
	shippingLabel: PropTypes.string,
	shippingPrice: PropTypes.number,
	totalWithVatPrice: PropTypes.number,
	EstimatedVATPrice: PropTypes.number,
	isShippingAddressSet: PropTypes.bool,

};

export default CartPricingOverview;