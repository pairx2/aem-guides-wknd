import React from 'react';
import PropTypes from 'prop-types';
import {i18nLabels} from '../../../utils/translationUtils';
import {MAGENTO_PAYMENT_TYPES} from '../../../utils/enums';
import Icon from '../../Generic/components/Icon/Icon';
import I18n from '../../Translation/components/I18n';

const SavedPaymentMethod = ({select, method, token, expiry, last4Digits, isSelected, owner, isWidgetLoading}) => {
	return (<div className={'d-flex align-items-center adc-payment__saved-payment' + (isSelected ? ' selected expanded-disabled' : '') + (isWidgetLoading ? ' cursor-not-allowed' : '')} onClick={!isWidgetLoading ? () => select(token,method) : () => false}>
		{isSelected && <Icon image={'tick-circle'}/>}
		<if condition={MAGENTO_PAYMENT_TYPES.OPEN_INVOICE === method}>
			<div className="pr-4">
				<Icon image="open_invoice_blue" size={Icon.SIZE.LARGE} />
			</div>
			<div className={'flex-grow-1'}>
				<div><I18n text={i18nLabels.OPEN_INVOICE_PAYMENT} /></div>
			</div>
		</if>
		<elseif condition={MAGENTO_PAYMENT_TYPES.CREDIT_CARD === method}>
			<div className="pr-4">
				<Icon image={'visa_mc_amex'} size={Icon.SIZE.LARGE} />
			</div>
			<div className={'flex-grow-1'}>
				<p className={'mb-0'}>{'**'}{last4Digits || '****'} <span className={'ml-3'}>{expiry}</span></p>
			</div>
		</elseif>
		<elseif condition={MAGENTO_PAYMENT_TYPES.SOFORT === method}>
			<div className="pr-4">
				<Icon image={'klarna'} size={Icon.SIZE.LARGE} />
			</div>
			<div className={'flex-grow-1'}>
				<div className="ml-auto pl-2"><I18n text={i18nLabels.SOFORT}/></div>
			</div>
		</elseif>
		<elseif condition={MAGENTO_PAYMENT_TYPES.PAYPAL === method}>
			<div className="pr-4">
				<Icon image={'paypal'} size={Icon.SIZE.LARGE} />
			</div>
			<div className={'flex-grow-1'}>
				<div className="ml-auto pl-2">{owner}</div>
			</div>
		</elseif>
		<else>
			<div className="pr-4">
				<Icon image="open_invoice_blue" size={Icon.SIZE.LARGE} />
			</div>
			<div className={'flex-grow-1'}>
				<div><I18n text={i18nLabels.OPEN_INVOICE_PAYMENT} /></div>
			</div>
		</else>
	</div>);
};

SavedPaymentMethod.propTypes = {
	select: PropTypes.func,
	method: PropTypes.string,
	token: PropTypes.string,
	expiry: PropTypes.string,
	last4Digits: PropTypes.string,
	isSelected: PropTypes.bool,
	owner: PropTypes.string
};

export default SavedPaymentMethod;