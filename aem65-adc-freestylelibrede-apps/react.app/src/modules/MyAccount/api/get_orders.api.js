import axios from 'axios';
import { getAxiosRestCallOptions, PATHS } from '../../../utils/endpointUrl';

export const FILTER_REMOVE_CHILD_DELIVERIES = delivery => delivery.deliveryType !== 'Child';
export const FILTER_GET_CHILD_DELIVERIES = (delivery) => _delivery => _delivery.deliveryType === 'Child' && _delivery.deliveryOrderId === delivery.deliveryOrderId;
export const REDUCER_INITIAL_OBJECT = (delivery, index) => ({
	...delivery,
	index: index + 1,
	products: [{
		productSKU: delivery.productSKU,
		productQuantity: delivery.productQuantity,
		shipmentId: delivery.shipmentId
	}]
});
export const REDUCER_CONCATENATED_OBJECT = (delivery, deliveryToConcatenate) => ({
	...delivery,
	products: [...delivery.products, {
		productSKU: deliveryToConcatenate.productSKU,
		productQuantity: deliveryToConcatenate.productQuantity,
		shipmentId: deliveryToConcatenate.shipmentId
	}],
	deliveryTotal: parseFloat(delivery.deliveryTotal || 0) + parseFloat(deliveryToConcatenate.deliveryTotal || 0)
});

function getOrders(token, { limit, pageNumber, orderHistoryType }) {
	const options = getAxiosRestCallOptions(PATHS.ORDERS_BY_PAGE(limit, pageNumber, orderHistoryType), token);
	return axios.request(options);
}

function getOrdersByRxmc(token, rxmc) {
	const options = getAxiosRestCallOptions(PATHS.ORDERS_BY_RXMC + rxmc, token);
	return axios.request(options);
}

function processDeliveries(orderData) {
	return {
		...orderData,
		orderList: orderData?.orderList?.sort((a, b) => b.orderDate - a.orderDate).map(order => ({
			...order,
			deliveryDetails: (order.deliveryDetails || []).filter(FILTER_REMOVE_CHILD_DELIVERIES).map((delivery, index) => {
				const deliveriesToConcatenate = order.deliveryDetails.filter(FILTER_GET_CHILD_DELIVERIES(delivery));
				return deliveriesToConcatenate.reduce((deliveryReduce, deliveryToConcatenate) => REDUCER_CONCATENATED_OBJECT(deliveryReduce, deliveryToConcatenate),
					REDUCER_INITIAL_OBJECT(delivery, index));
			}).reverse()
		}))
	};
}

function getAllOrders(token) {
	const options = getAxiosRestCallOptions(PATHS.ORDERS, token);
	return axios.request(options);
}

export { getOrders, getOrdersByRxmc, processDeliveries, getAllOrders };