import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../Generic/components/Icon/Icon';
import {Title} from '../../../Generic/components/Title/Title';
import I18n from '../../../Translation/components/I18n';
import {i18nLabels} from '../../../../utils/translationUtils';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import {ORDER_TYPES} from '../../../../utils/enums';
import {formatPrice} from '../../../../utils/pricingUtils';
import ReimbursementServiceDetails from './ReimbursementServiceDetails';

const OrderCost = ({ghostOrders, order, openCancelForm, isPlusService, showBorder}) => {
	const {priceBreakdown, isReimbursedOrder, serviceData, productData} = order;
	return (
		<div className={'cost-item' + (showBorder ? 'adc-title--border-bottom' : '') + ' mt-4'}>
			<div className={(!isPlusService && !isReimbursedOrder ? 'adc-title--border-bottom' : '') + 'mb-3'}>
				<h6><I18n text={i18nLabels.COST_LABEL} suffix={':'}/></h6>
				<if condition={order.orderType === ORDER_TYPES.CPO || isPlusService}>
					<div className="d-flex justify-content-between align-items-center">
						<p className="cost-item__text mb-0"><I18n text={i18nLabels.SUBTOTAL}/></p>
						<p className="cost-item__text mb-0">{formatPrice(priceBreakdown.price)}</p>
					</div>
				</if>
				<if condition={isReimbursedOrder}>
					<div className="d-flex justify-content-between align-items-center">
						<div>
							<span className="cost-item__text mb-0"><I18n text={i18nLabels.RX_COPAY_LABEL}/></span>
							<Icon image={'info-box'} size={Icon.SIZE.SMALL} className={'align-middle'}>
								<div className="adc-tooltipbottom__content adc-order-cost__content text-left p-2">
									<I18n text={i18nLabels.ORDER_COST_INFO} />
								</div>
							</Icon>
						</div>
						<p className="cost-item__text mb-0">{formatPrice(priceBreakdown.coPay)}</p>
					</div>
					<div className="d-flex justify-content-between align-items-center">
						<p className="cost-item__text mb-0"><I18n text={i18nLabels.OWN_COST_CONTRIBUTION}/></p>
						<p className="cost-item__text mb-0">{formatPrice(priceBreakdown.surcharge)}</p>
					</div>
				</if>
				<div className="d-flex justify-content-between align-items-center">
					<p className="cost-item__text mb-0"><I18n text={i18nLabels.SHIPPING_COST_LABEL}/></p>
					<p className="cost-item__text mb-0">{formatPrice(priceBreakdown.deliveryCost)}</p>
				</div>
				<div className="d-flex justify-content-between align-items-center">
					<p className="cost-item__text mb-0"><I18n text={i18nLabels.DISCOUNT}/></p>
					<p className="cost-item__text mb-0">{formatPrice(priceBreakdown.discount)}</p>
				</div>
				<div className="d-flex justify-content-between mt-2">
					<p><I18n text={i18nLabels.TOTAL_LABEL}/></p>
					<Title size={Title.SIZE.H6} text={`${formatPrice(priceBreakdown.totalPrice)}`}
						   color={Title.COLOR.BLACK}/>
				</div>
				{isReimbursedOrder &&
					<ReimbursementServiceDetails serviceData ={serviceData} productData={productData} ghostOrders={ghostOrders} />
				}
			</div>
			<if condition={!isPlusService}>
				<div className="delivery-buttons">
					<div className="row">
						<div className="col-12 col-md-12 col-xl-6 mb-3 pr-lg-2 pr">
							<if condition={order.orderType === ORDER_TYPES.CPS}>
								<Button
									action={() => openCancelForm(true)}
									type={BUTTON_OPTIONS.TYPE.BUTTON}
									label={i18nLabels.CANCEL}
									ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY}
									hasNoMargin
									isFullWidth
								/>
							</if>
						</div>
					</div>
				</div>
			</if>
		</div>
	);
};
OrderCost.propTypes = {
	order: PropTypes.object,
	openCancelForm: PropTypes.func,
	isPlusService: PropTypes.bool,
	showBorder: PropTypes.bool,
	ghostOrders: PropTypes.array
};

export default OrderCost;