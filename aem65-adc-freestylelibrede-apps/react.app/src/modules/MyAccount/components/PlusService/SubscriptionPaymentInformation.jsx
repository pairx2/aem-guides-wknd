import React from 'react';
import PropTypes from 'prop-types';
import {i18nLabels} from '../../../../utils/translationUtils';
import I18n from '../../../Translation/components/I18n';
import {PAYMENT_TYPES} from '../../../../utils/enums';
import Link from '../../../Generic/components/Link/Link';
import Icon from '../../../Generic/components/Icon/Icon';

export const SubscriptionPaymentInformation = ({order, editSubscriptionPayment, isReactivationFlow}) => {
	return (
		<div className={isReactivationFlow ? 'adc-title--border-bottom' : ''}>
			<div className='d-flex'>
				<h6 className={isReactivationFlow ? 'flex-grow-1' : ''}>
					<I18n text={i18nLabels.PAYMENT_METHOD} suffix={':'}/>
				</h6>
				<if condition={isReactivationFlow}>
					<Link action={editSubscriptionPayment}
						  icon={'edit-icon'}
						  label={i18nLabels.CHANGE}
					/>
				</if>
			</div>
			<div className="align-middle d-flex">
				<if condition={PAYMENT_TYPES.OPEN_INVOICE === order.paymentDetails.paymentMethodType}>
					<div className="d-inline-block">
						<Icon image="open_invoice_blue" size={Icon.SIZE.HUGE}/>
					</div>
					<div className="ml-auto"><I18n text={i18nLabels.OPEN_INVOICE_PAYMENT}/></div>
				</if>
				<elseif condition={PAYMENT_TYPES.CREDIT_CARD === order.paymentDetails.paymentMethodType}>
					<div className="d-inline-block">
						<Icon image={'visa_mc_amex'} size={Icon.SIZE.HUGE}/>
					</div>
					<div className="d-inline-block ml-auto d-flex flex-column justify-content-center">
						<span className="adc-plus-service__card-numb align-text-top">{'**** **** ****'} {order?.paymentDetails?.card?.last4Digits || '****'}</span>
					</div>
				</elseif>
				<elseif condition={PAYMENT_TYPES.SOFORT === order.paymentDetails.paymentMethodType}>
					<div className="d-inline-block d-flex flex-column justify-content-center">
						<Icon image={'klarna'} size={Icon.SIZE.HUGE}/>
					</div>
					<div className="ml-auto d-inline-block d-flex flex-column justify-content-center"><I18n text={i18nLabels.SOFORT}/></div>
				</elseif>
				<elseif condition={PAYMENT_TYPES.PAYPAL === order.paymentDetails.paymentMethodType}>
					<div className="d-inline-block d-flex flex-column justify-content-center">
						<Icon image={'paypal'} size={Icon.SIZE.HUGE}/>
					</div>
					<div className="ml-auto d-inline-block d-flex flex-column justify-content-center"><I18n text={i18nLabels.PAYPAL}/></div>
				</elseif>
				<else>
					<div className="d-inline-block d-flex flex-column justify-content-center">
						<Icon image={'open_invoice_blue'} size={Icon.SIZE.HUGE}/>
					</div>
					<div className="ml-auto">{order.paymentDetails.paymentMethodType}</div>
				</else>
			</div>
			<if condition={!isReactivationFlow}>
				<div className="align-middle mt-1">
					<Link className={'text-small'} label={'Zahlungsmethode andern'} icon={'edit-icon'}
						  action={editSubscriptionPayment}/>
				</div>
			</if>
		</div>
	);
};

SubscriptionPaymentInformation.propTypes = {
	order: PropTypes.object,
	editSubscriptionPayment: PropTypes.func,
	isReactivationFlow: PropTypes.bool
};

