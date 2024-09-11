import React from 'react';
import translate, {i18nLabels} from '../../../../utils/translationUtils';
import I18n from '../../../Translation/components/I18n';
import {getFormattedDate} from '../../../../utils/dateUtils';
import PropTypes from 'prop-types';
import {ORDER_TYPES} from '../../../../utils/enums';
import {getOrderDescriptionLabel, getOrderImagesPath} from '../../../../utils/orderUtils';
import { For } from '../../../Generic/components/Logic/LogicalComponents';

const getProductImage = (order, products) => {
	const productSkuObj = getProductSKUs(order?.productData);
	const ImageArray = [];
	for(let item of productSkuObj) {
		ImageArray.push(products[item]?.productImage?.[0]);
	}
	return ImageArray;
};

const getProductSKUs = (productData) => {
	const SKUs = [];
	for(let item of productData) {
		if (!SKUs.includes(item?.productSKU)) {
			SKUs.push(item?.productSKU);
		}
	}
	return SKUs;
}

const getOrderDescription = (order,dictionary) => {
	return getOrderDescriptionLabel(order, dictionary);
};

function calculateWeeksBetween(date1, date2) {
	// The number of milliseconds in one week
	const ONE_WEEK = 1000 * 60 * 60 * 24 * 7;
	// Convert both dates to milliseconds
	// Calculate the difference in milliseconds
	const difference_ms = Math.abs(date1 - date2);
	// Convert back to weeks and return hole weeks
	return Math.floor(difference_ms / ONE_WEEK);
}

const getReimbursementDescription = (order) => {
	const serviceData = order?.serviceData?.[0];
	if (!serviceData) return undefined;

	const weeks = calculateWeeksBetween(serviceData.serviceFromDate, serviceData.serviceToDate);

	return `${weeks} Wochen`;
};

const CurrentOrderDetails = ({order, products, dictionary, isCancelFlow, isCancelled, isPlusService, isAccountOverviewTab}) => {
	return (
		<div className={'order-item' + (!isCancelled && !isCancelFlow ? ' adc-title--border-bottom mb-3' : '')}>
			<div className="row align-items-center">
				<div className={isCancelled || isCancelFlow || isPlusService || isAccountOverviewTab ? 'col-4' : 'col-12'}>
					<div className="text-center">
					<if condition={getProductSKUs(order?.productData).length > 0}>
							<For array={getProductSKUs(order?.productData)}>
								{(sku, i) =>
									<img className="adc-order-hist__image img-fluid" src={getOrderImagesPath(sku)}
										alt={order.orderTitle}/>
									}
							</For>
						</if>
					</div>
				</div>
				<div className={isCancelled || isCancelFlow || isPlusService || isAccountOverviewTab ? 'col-8' : 'col-12'}>
					<div className="order-item__content">
						<if condition={!isPlusService}>
							<p className={'m-0 order-item__content--date font-12' + (isCancelFlow ? ' font-weight-600 mb-1' : '')}><I18n text={i18nLabels.ORDER_DATE_LABEL}/> {getFormattedDate(order.orderDate)}</p>
							<p className="order-item__content--order-no font-12">
								<if condition={order.orderType === ORDER_TYPES.RX}>
									<I18n text={i18nLabels.RECEIPT_NUMBER_LABEL}/> {order.rxmc}
								</if>
								<else>
									<I18n text={i18nLabels.ORDER_ID_LABEL}/> {order.orderId}
								</else>
							</p>
							<h5 className={isCancelFlow ? 'mb-3' : ''}><I18n text={order.orderSubtype || order.orderTitle}/></h5>
							<p dangerouslySetInnerHTML={{__html: getOrderDescription(order, dictionary)}}/>
						</if>
						<else>
							<h5 className={isCancelFlow ? 'mb-3' : ''}><I18n text={order.orderSubtype || order.orderTitle}/></h5>
							<p className='text-small mt-3 mb-1'><I18n text={i18nLabels.DELIVERY_PERIOD}/></p>
							<p dangerouslySetInnerHTML={{__html: getOrderDescription(order, dictionary)}}/>
							<if condition={isPlusService && order.isReimbursedOrder}>
								<p className='text-small mt-3 mb-1'><I18n text={i18nLabels.REIMBURSEMENT_VALIDITY_PERIOD}/></p>
								<p dangerouslySetInnerHTML={{__html: getReimbursementDescription(order)}}/>
							</if>
						</else>
					</div>
				</div>
			</div>
		</div>

	);
};
CurrentOrderDetails.propTypes = {
	order: PropTypes.shape({
		orderId: PropTypes.string,
		orderTitle: PropTypes.string,
		orderType: PropTypes.string,
		productData: PropTypes.array,
		orderDate: PropTypes.number,
		isReimbursedOrder: PropTypes.bool,
		rxmc:  PropTypes.string,
		orderSubtype: PropTypes.string
	}),
	products: PropTypes.object,
	dictionary: PropTypes.object,
	isCancelFlow: PropTypes.bool,
	isCancelled: PropTypes.bool,
	isPlusService: PropTypes.bool,
	isAccountOverviewTab: PropTypes.bool
};

CurrentOrderDetails.defaultProps = {};

export default CurrentOrderDetails;
