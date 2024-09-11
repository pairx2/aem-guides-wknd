import React from 'react';
import PropTypes from 'prop-types';
import {i18nLabels} from '../../../../utils/translationUtils';
import I18n from '../../../Translation/components/I18n';
import Icon from '../../../Generic/components/Icon/Icon';
import {PAYMENT_TYPES} from '../../../../utils/enums';

export const PaymentInformation = ({order, isDisplayInfo}) => {
	return (
		<div className="adc-payment-title">
			<div className={'d-flex'}>
				<div className="flex-grow-1">
					<h6 className="mt-2"><I18n text={i18nLabels.PAYMENT_METHOD} suffix={':'} /></h6>
				</div>
				<div className="d-flex pb-2 align-items-center">
					<if condition={PAYMENT_TYPES.OPEN_INVOICE === order.paymentDetails.paymentMethodType}>
						<div className="pr-2 mr-2 mr-md-5">
							<Icon image="open_invoice_blue" size={Icon.SIZE.LARGE} />
						</div>
						<div className="ml-auto"><I18n text={i18nLabels.OPEN_INVOICE_PAYMENT} /></div>
					</if>
					<elseif condition={PAYMENT_TYPES.CREDIT_CARD === order.paymentDetails.paymentMethodType}>
						<div className="pr-2 mr-2 mr-md-5">
							<Icon image={'visa_mc_amex'} size={Icon.SIZE.LARGE} />
						</div>
						<div className="ml-auto">
							<div className="d-flex">
								<span className="masked-credit-card">{'***'} </span>
								<span className="">{order?.paymentDetails?.card?.last4Digits || '****'}</span>
							</div>
						</div>
					</elseif>
					<elseif condition={PAYMENT_TYPES.SOFORT === order.paymentDetails.paymentMethodType}>
						<div className="pr-2 mr-2 mr-md-5">
							<Icon image={'klarna'} size={Icon.SIZE.LARGE} />
						</div>
						<div className="ml-auto"><I18n text={i18nLabels.SOFORT}/></div>
					</elseif>
					<elseif condition={PAYMENT_TYPES.PAYPAL === order.paymentDetails.paymentMethodType}>
						<div className="pr-2 mr-2 mr-md-5">
							<Icon image={'paypal'} size={Icon.SIZE.LARGE} />
						</div>
						<div className="ml-auto pb-2"><I18n text={i18nLabels.PAYPAL}/></div>
					</elseif>
					<else>
						<div className="pr-2 mr-2 mr-md-5">
							<Icon image={'open_invoice_blue'} size={Icon.SIZE.LARGE} />
						</div>
						<div className="ml-auto">{order.paymentDetails.paymentMethodType}</div>
					</else>
				</div>
			</div>
			<if condition={isDisplayInfo}>
				<div className="align-middle d-flex mt-1">
					<div className="d-inline-block mr-2">
						<Icon image={'info-box'} size={Icon.SIZE.MEDIUM} className={'align-middle mt-2 mt-md-1'}>
							<div className="adc-tooltipbottom__content adc-paymentInformation__content">
								<I18n text={i18nLabels.PAYMENT_INFORMATION_INFO} />
							</div>
						</Icon>
					</div>
					<div className="d-inline-block adc-plus-service--text mt-2 mb-2">
						<span className="d-block"><I18n text={i18nLabels.PLEASE_SET_PAYMENT_METHOD}/></span>
					</div>
				</div>
			</if>
		</div>
	);
};

PaymentInformation.propTypes = {
	order: PropTypes.object,
	isDisplayInfo: PropTypes.bool
};

