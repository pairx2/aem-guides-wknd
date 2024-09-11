import React from 'react';
import PropTypes from 'prop-types';
import {i18nLabels} from '../../../../utils/translationUtils';
import I18n from '../../../Translation/components/I18n';
import Icon from '../../../Generic/components/Icon/Icon';
import {MAGENTO_PAYMENT_TYPES} from '../../../../utils/enums';
import Row from '../../../Generic/components/Container/Row';
import Col from '../../../Generic/components/Container/Col';

const PaymentMethodInformation = ({paymentMethod: {method, type, last4Digits, expiry,owner}, isHideDisclaimer, isDefaultView, isEnableDesign}) => {
	const defaultView = isDefaultView ? 6 : 12
	return (
		<Row>
			<Col lg={isDefaultView && isEnableDesign ? 12 : defaultView}>
				<h6><I18n text={i18nLabels.PAYMENT_METHOD} suffix={':'} /></h6>
				<div className="d-flex pb-2 align-items-center">
					<if condition={MAGENTO_PAYMENT_TYPES.OPEN_INVOICE === method}>
						<div className="pr-2 mr-2 mr-md-5">
							<Icon image="open_invoice_blue" size={Icon.SIZE.HUGE} />
						</div>
						<div className="ml-auto"><I18n text={i18nLabels.OPEN_INVOICE_PAYMENT} /></div>
					</if>
					<elseif condition={MAGENTO_PAYMENT_TYPES.CREDIT_CARD === method}>
						<div className="pr-2 mr-2 mr-md-5">
							<Icon image={'visa_mc_amex'} size={Icon.SIZE.HUGE} />
						</div>
						<div className="ml-auto"><div className="d-flex"><span className={'masked-credit-card'}>{'**** **** ****'} </span><span className={last4Digits ? '' : 'masked-credit-card'}>{last4Digits || '****'}</span></div><span className={'d-block'}>{expiry}</span></div>
					</elseif>
					<elseif condition={MAGENTO_PAYMENT_TYPES.SOFORT === method}>
						<div className="pr-2 mr-2 mr-md-5">
							<Icon image={'klarna'} size={Icon.SIZE.HUGE} />
						</div>
						<div className="ml-auto"><I18n text={i18nLabels.SOFORT}/></div>
					</elseif>
					<elseif condition={MAGENTO_PAYMENT_TYPES.PAYPAL === method}>
						<div className="pr-2 mr-2 mr-md-5">
							<Icon image={'paypal'} size={Icon.SIZE.HUGE} />
						</div>
						<div className="ml-auto pb-2">{owner}</div>
					</elseif>
					<else>
						<div className="pr-2 mr-2 mr-md-5">
							<Icon image={'open_invoice_blue'} size={Icon.SIZE.HUGE} />
						</div>
						<div className="ml-auto">{type}</div>
					</else>
				</div>
				<if condition={!isHideDisclaimer}>
					<div className={'d-flex align-items-center mb-5'}>
						<Icon image={'info-box'} size={Icon.SIZE.MEDIUM}>
							<div className="adc-tooltipbottom__content adc-paymentMethodInformation__tooltiptop--content p-2">
								<I18n text={i18nLabels.PAYMENT_METHOD_INFORMATION_INFO} />
							</div>
						</Icon>
						<p className={'text-small mb-0 ml-1'}><I18n text={i18nLabels.OPEN_AMOUNT_ARE_DEBITED_AUTOMATICALLY} suffix={'.'}/></p>
					</div>
				</if>
			</Col>
		</Row>
	);
};

PaymentMethodInformation.propTypes = {
	paymentMethod: PropTypes.shape({
		method: PropTypes.string,
		type: PropTypes.string,
		last4Digits: PropTypes.string,
		expiry: PropTypes.string,
		owner: PropTypes.string
	}),
	isHideDisclaimer: PropTypes.bool,
	isDefaultView: PropTypes.bool,
	isEnableDesign: PropTypes.bool
};

export default PaymentMethodInformation;