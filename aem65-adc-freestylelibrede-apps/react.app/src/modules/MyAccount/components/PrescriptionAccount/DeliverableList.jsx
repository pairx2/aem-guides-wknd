import React from 'react';
import PropTypes from 'prop-types';
import Deliverable from './Deliverable';
import Col from '../../../Generic/components/Container/Col';
import { connect } from 'react-redux';
import { openModalAction } from '../../../Modal/redux/actions';
import translate, { i18nLabels } from '../../../../utils/translationUtils';
import LoadingIndicator from '../../../Generic/components/Loading/LoadingIndicator';
import I18n from '../../../Translation/components/I18n';

const mapStateToProps = state => {
	const { customer } = state.myAccountModuleReducer.GetCustomerReducer;
	const { dictionary } = state.translationModuleReducer.translationReducer;
	const { rxmcOrders } = state.myAccountModuleReducer.GetOrdersReducer;
	return { customer, dictionary, rxmcOrders };
};

const mapDispatchToProps = {
	openModalAction
};

export function processDeliverables(order) {
	const deliverables = (order?.deliveryDetails || []).map(delivery => ({
		hasDelivery: true,
		products: delivery.products,
		price: delivery.deliveryTotal,
		orderId: delivery.deliveryOrderId,
		deliveryStatus: delivery.deliveryStatus,
		estimatedDeliveryDate: delivery.estimatedDeliveryDate,
		invoiceIdDetails: delivery.invoiceIdDetails,
		deliveryDetails: delivery,
		productData: order.productData.find(item => {
			return item?.deliveryIdDetails?.some(d => d.deliveryId === delivery.deliveryId)
		})
	}));

	const productByDate = {};

	order?.productData?.map(product => {
		if (product?.deliveryIdDetails?.length <= 0) {
			const productDeliverableDate = `${product?.productRescheduledDueDate || product?.productOriginalDateFrom}_${product?.deliverableStatus?.toLowerCase()}`;
			productByDate[productDeliverableDate] = productByDate[productDeliverableDate] || {};
			const productDeliverableDetail = {
				productSKU: product?.productSKU,
				productQuantity: product?.productQuantity,
				productOriginalDateOfNextShipment: product?.productOriginalDateOfNextShipment,
				productDateOfNextShipment: product?.productDateOfNextShipment,
				productOriginalDateFrom: product?.productOriginalDateFrom,
				productRescheduledDueDate: product?.productRescheduledDueDate,
				productDueDateWindow: product?.productDueDateWindow,
				deliverableNumber: product?.deliverableNumber
			};
			if (Object.entries(productByDate[productDeliverableDate]).length > 0) {
				productByDate[productDeliverableDate].price = productByDate[productDeliverableDate]?.price + parseFloat(product?.deliverableTotal || 0);
				productByDate[productDeliverableDate].products.push(productDeliverableDetail);
			} else {
				productByDate[productDeliverableDate] = {
					hasDelivery: false,
					deliveryStatus: product?.deliverableStatus,
					price: product?.deliverableTotal || 0,
					products: [productDeliverableDetail],
					productData: [productDeliverableDetail],
					deliveryDetails: order?.deliveryDetails
				};
			}
		}
	});
	Object.values(productByDate).forEach(item => {
		deliverables.push(item);
	});
	return {
		...order,
		deliverables
	};
}

export const openChangeDeliveryDateModal = (deliverable, order, customer, dictionary, openModalAction) => {
	const productDeliverable = [];
	let deliverableProduct = {};
	deliverable?.products?.forEach(item => {
		deliverableProduct = {
			sku: item.productSKU,
			deliverable_id: item.deliverableNumber
		};
		productDeliverable.push(deliverableProduct);
	});
	const { productOriginalDateOfNextShipment, productDateOfNextShipment, productOriginalDateFrom, productRescheduledDueDate, productDueDateWindow } = deliverable?.products?.[0];
	openModalAction({
		heading: translate(dictionary, i18nLabels.PERSONALIZED_CHOOSE_NEW_DELIVERY_DATE, [customer?.firstname]),
		contentID: 'changeDeliveryDateModal',
		props: {
			order: order,
			productOriginalDateOfNextShipment: productOriginalDateOfNextShipment,
			productDateOfNextShipment: productDateOfNextShipment,
			productOriginalDateFrom: productOriginalDateFrom,
			productRescheduledDueDate: productRescheduledDueDate,
			productDueDateWindow: productDueDateWindow,
			productDeliverable: productDeliverable
		}
	});
};

const DeliveryList = ({ order, getInvoice, customer, dictionary, openModalAction, showLoader, isOrderAvailable }) => {
	const orderData = processDeliverables(order)?.deliverables;
	const getOldestDate = (deliveryDetailsArray) => {
		let dates;
		dates = Array.isArray(deliveryDetailsArray) ? Math.max(...deliveryDetailsArray.map((e) => e.productOriginalDateFrom)) : deliveryDetailsArray.productOriginalDateFrom;
		return dates;
	};
	const sortedOrders = orderData?.sort((a, b) => {
		const oldestDateA = getOldestDate(a.productData);
		const oldestDateB = getOldestDate(b.productData);
		return oldestDateA - oldestDateB;
	});
	return (<Col>
		<if condition={!showLoader && isOrderAvailable} >
			<div>
				{sortedOrders?.map((deliverable, index) => {
					return <>
						<Deliverable
							key={`deliverable_${order.orderId}`}
							deliverable={deliverable}
							index={index}
							productData={order.productData}
							orderId={order.orderId}
							getInvoice={getInvoice}
							zipCode={order?.deliveryAddress?.zipCode}
							openChangeDeliveryDateModal={() => openChangeDeliveryDateModal(deliverable, order, customer, dictionary, openModalAction)}
						/>
					</>
				}
				)
				}
			</div>
		</if>
		<elseif condition={!isOrderAvailable}>
			<div className={'row d-flex justify-content-center adc-form-group--error'}>
				<I18n text={i18nLabels.NO_ORDER_INFO} />
			</div>
		</elseif>
		<else>
			<div className={'row d-flex justify-content-center'}>
				<LoadingIndicator />
			</div>
		</else>
	</Col>);
};

DeliveryList.propTypes = {
	order: PropTypes.object,
	getInvoice: PropTypes.func,
	openModalAction: PropTypes.any,
	dictionary: PropTypes.object,
	customer: PropTypes.object,
	showLoader: PropTypes.bool,
	isOrderAvailable: PropTypes.bool,
};
export default connect(mapStateToProps, mapDispatchToProps)(DeliveryList);