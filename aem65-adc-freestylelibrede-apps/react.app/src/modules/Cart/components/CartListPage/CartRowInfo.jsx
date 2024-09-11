import React from 'react';
import PropTypes from 'prop-types';
import {getUomByKey} from '../../../../utils/currencyMapping';
import I18n from '../../../Translation/components/I18n';
import {getFormattedDate} from '../../../../utils/dateUtils';
import {i18nLabels} from '../../../../utils/translationUtils';

const CartRowInfo = (props) => {
	const {name, uom, pdpLink, isSubscription, deliveryDate, bundle} = props;
	return (
		<div className="adc-cartlist__product-title col-8 pr-5">
			{name}
			<span className="adc-cartlist__product-measure mt-1 d-none d-md-block">
				<I18n text={getUomByKey(uom)}/>
			</span>
			<if condition={isSubscription}>
				<I18n text={i18nLabels.START_DATE}/> {getFormattedDate(new Date(deliveryDate))}<br />
				<if condition={bundle}>
					<I18n text={i18nLabels.SUBSCRIPTION_FREQUENCY(bundle.label)} />{ ` / ${bundle.values[0].quantity} `} <I18n text={i18nLabels.SENSORS} />
				</if>
			</if>
			<a href={pdpLink !== '' ? pdpLink : '#'} className="adc-cartlist__product-link"><I18n text={i18nLabels.VIEW_PRODUCT_DETAILS}/></a>
		</div>
	);
};
CartRowInfo.propTypes = {
	name: PropTypes.string,
	uom: PropTypes.any,
	pdpLink: PropTypes.string,
	isSubscription: PropTypes.bool,
	deliveryDate: PropTypes.string,
	bundle: PropTypes.object
};
export default CartRowInfo;