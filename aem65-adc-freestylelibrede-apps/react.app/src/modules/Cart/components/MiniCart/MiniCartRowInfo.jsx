import React from 'react';
import {getUomByKey} from '../../../../utils/currencyMapping';
import I18n from '../../../Translation/components/I18n';
import {i18nLabels} from '../../../../utils/translationUtils';
import {getFormattedDate} from '../../../../utils/dateUtils';
import PropTypes from 'prop-types';

const MiniCartRowInfo = (props) => {
	const {name, isSubscription, uom, quantity, deliveryDate, bundle} = props;
	return (
		<>
			<h5 className="cart-header-dropdown-cart-title mb-0">{name}</h5>
			<if condition={!isSubscription}>
				<div>
					<p className="cart-header-dropdown-cart-measurement mb-0">
						<I18n text={getUomByKey(uom)}/>
					</p>
					<p className="cart-header-dropdown-cart-quantity mb-0">{Number(quantity)}{'x'}</p>
				</div>
			</if>
			<if condition={isSubscription}>
				<p className="cart-header-dropdown-cart-measurement cart-header-date">
					<I18n text={i18nLabels.START_DATE}/> {deliveryDate && getFormattedDate(new Date(deliveryDate))}<br />
					<if condition={bundle}>
						<I18n text={i18nLabels.SUBSCRIPTION_FREQUENCY(bundle.label)} /><br /> { ` / ${bundle.values[0].quantity} `} <I18n text={i18nLabels.SENSORS} />
					</if>
				</p>
			</if>
		</>
	);
};
MiniCartRowInfo.propTypes = {
	name: PropTypes.string,
	isSubscription: PropTypes.bool,
	uom: PropTypes.number,
	quantity: PropTypes.number,
	deliveryDate: PropTypes.string,
	bundle: PropTypes.object
};
export default MiniCartRowInfo;