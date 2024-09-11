import React from 'react';
import { i18nLabels } from '../../../../utils/translationUtils';
import I18n from '../../../Translation/components/I18n';
import Icon from '../../../Generic/components/Icon/Icon';
import { getFormattedDate } from '../../../../utils/dateUtils';
import PropTypes from 'prop-types';
import Button, { BUTTON_OPTIONS } from '../../../Generic/components/Button/Button';
import { SUBSCRIPTION_STATUS, ORDER_TYPES, DELIVERY_STATUSES } from '../../../../utils/enums';
import { getStatus } from '../../../../utils/orderUtils';
import ReturnStatus from '../../../MyAccount/components/OrderHistory/Return/ReturnStatus';


const OrderDeliveryDetails = ({ order, openChangeDeliveryDateModal, changeDeliveryAddress, isAccountOverviewTab, isPlusService }) => {

	const canChangeDelivery = () => order?.serviceData?.[0]?.serviceStatus === SUBSCRIPTION_STATUS.ACTIVE;
	const returnDetails = order.deliveryDetails?.find(delivery =>  delivery.returnDetails !== 'undefined')?.returnDetails;
	
	const getDeliveryDate = () => {
		let updatedDeliveryDate = '';
		if (order.productData?.[0]?.productDateOfNextShipment) {
			updatedDeliveryDate = getFormattedDate(new Date(order.productData?.[0]?.productDateOfNextShipment));
		} else if (order.orderType === ORDER_TYPES.RX && order.productData?.[0]?.productRescheduledDueDate) {
			updatedDeliveryDate = getFormattedDate(new Date(order.productData?.[0]?.productRescheduledDueDate));
		} else {
			updatedDeliveryDate = getFormattedDate(new Date(order.productData?.[0]?.productOriginalDateFrom));
		}
		return updatedDeliveryDate;
	};

	return (
		<>
		<div className='delivery-item adc-title--border-bottom mt-4'>
			<h6 className="mb-3"><I18n
				text={order.currentDeliveryDetails ? i18nLabels.EXPECTED_DELIVERY_DATE : i18nLabels.DELIVERY_PERIOD_STARTS_AT}
				suffix={order.currentDeliveryDetails ? '' : ':'} /></h6>
			<div className={'d-flex justify-content-between align-items-center mb-3' + (!isPlusService || canChangeDelivery() ? ' adc-title--border-bottom' : '')}>
				<p className="m-0">{getDeliveryDate()}</p>
				<div className="delivery-item--status ml-4">
					<p className="m-0 d-flex align-items-center">
						<I18n text={order.orderType === ORDER_TYPES.CPS ? i18nLabels.SCHEDULED : order.orderStatus} />
						<Icon image={getStatus(order.orderType === ORDER_TYPES.CPS ? DELIVERY_STATUSES.SCHEDULED : order.orderStatus)} className={'ml-2'} />
					</p>
				</div>
			</div>
			<div className="delivery-buttons">
				<div className="row">
					<if condition={canChangeDelivery() && order.orderType === ORDER_TYPES.CPS}>
						<div className="col-xl-12 mb-3">
							<Button
								type={BUTTON_OPTIONS.TYPE.BUTTON}
								label={i18nLabels.EDIT_DELIVERY_DATE}
								ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY} hasNoMargin isFullWidth
								action={openChangeDeliveryDateModal}
							/>
						</div>
					</if>
					<if condition={!isPlusService}>
						<div className="col-xl-12">
							<if condition={isAccountOverviewTab && canChangeDelivery() && order.orderType !== ORDER_TYPES.CPO}>
								<Button
									type={BUTTON_OPTIONS.TYPE.BUTTON}
									label={i18nLabels.EDIT_DELIVERY_ADDRESS}
									ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY} hasNoMargin isFullWidth
									action={changeDeliveryAddress}
								/>
							</if>
							<else>
								{order?.currentTrackingNr && <div>
									<I18n text={i18nLabels.TRACKING_LABEL} params={[Buffer.from(order.orderId).toString('base64'),Buffer.from(order?.deliveryAddress.zipCode).toString('base64')]}/>												
								</div>
								}
							</else>
						</div>
					</if>
				</div>
			</div>
		</div>
		<ReturnStatus returnDetails={returnDetails} />
		</>
	);
};
OrderDeliveryDetails.propTypes = {
	order: PropTypes.object,
	openChangeDeliveryDateModal: PropTypes.func,
	isPlusService: PropTypes.bool,
	changeDeliveryAddress: PropTypes.func,
	isAccountOverviewTab: PropTypes.bool
};

OrderDeliveryDetails.defaultProps = {};

export default OrderDeliveryDetails;