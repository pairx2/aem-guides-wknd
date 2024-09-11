import React from 'react';
import I18n from '../../../Translation/components/I18n';
import Icon from '../../../Generic/components/Icon/Icon';
import PropTypes from 'prop-types';
import {ORDER_TYPES, PAYMENT_TYPES} from '../../../../utils/enums';
import {i18nLabels} from '../../../../utils/translationUtils';
import ReimbursementServiceDetails from '../CurrentOrderOverview/ReimbursementServiceDetails';

const PaymentDetails = ({paymentDetails, orderType, serviceData, productData, ghostOrders}) => {
	return (
		<div className="row pb-4">
			<div className="col-12 col-lg-6 offset-lg-6">
				<hr className="adc-border-bottom m-0 mb-3" />
				<h3 className="adc-order-hist__subs__desc-heading font-weight-600 m-0 pb-3"><I18n
					text={i18nLabels.PAYMENT_METHOD_LABEL} suffix={':'} /></h3>
				<if condition={paymentDetails}>
					<div className="d-flex pb-2 align-items-center">
						<if condition={PAYMENT_TYPES.OPEN_INVOICE === paymentDetails.paymentMethodType}>
							<div className="pr-2">
								<Icon image="open_invoice_blue" size={Icon.SIZE.LARGE} />
							</div>
							<div className="ml-auto pl-2"><I18n text={i18nLabels.OPEN_INVOICE_PAYMENT} /></div>
						</if>
						<elseif condition={PAYMENT_TYPES.CREDIT_CARD === paymentDetails.paymentMethodType}>
							<div className="pr-2">
								<Icon image={'visa_mc_amex'} size={Icon.SIZE.LARGE} />
							</div>
							<div className="ml-auto pl-2">{'**** **** ****'} {paymentDetails?.card?.last4Digits || '****'}</div>
						</elseif>
						<elseif condition={PAYMENT_TYPES.SOFORT === paymentDetails.paymentMethodType}>
							<div className="pr-2">
								<Icon image={'klarna'} size={Icon.SIZE.LARGE} />
							</div>
							<div className="ml-auto pl-2"><I18n text={i18nLabels.SOFORT}/></div>
						</elseif>
						<elseif condition={PAYMENT_TYPES.PAYPAL === paymentDetails.paymentMethodType}>
							<div className="pr-2">
								<Icon image={'paypal'} size={Icon.SIZE.LARGE} />
							</div>
							<div className="ml-auto pl-2"><I18n text={i18nLabels.PAYPAL}/></div>
						</elseif>
						<else>
							<div className="pr-2">
								<Icon image={'open_invoice_blue'} size={Icon.SIZE.LARGE} />
							</div>
							<div className="ml-auto pl-2">{paymentDetails.paymentMethodType}</div>
						</else>
					</div>
				</if>
			</div>
			{orderType === ORDER_TYPES.RX &&
				<ReimbursementServiceDetails isPaymentDetails={true} serviceData={serviceData} productData={productData} ghostOrders={ghostOrders} />
			}
		</div>
	);
};

PaymentDetails.propTypes = {
	paymentDetails: PropTypes.object,
	orderType: PropTypes.oneOf(Object.values(ORDER_TYPES)),
	serviceData: PropTypes.array,
	productData: PropTypes.array,
	ghostOrders: PropTypes.array
};


export default PaymentDetails;