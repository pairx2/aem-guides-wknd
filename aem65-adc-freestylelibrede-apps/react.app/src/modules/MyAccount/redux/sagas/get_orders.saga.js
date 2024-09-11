import {call, put, select, takeLeading, takeEvery} from 'redux-saga/effects';
import {
	GET_CURRENT_ORDERS_REQUEST,
	GET_ORDERS_REQUEST,
	GET_ORDERS_RXMC_REQUEST,
	GET_ALL_ORDERS_REQUEST,
	getCurrentOrdersRequestFailure,
	getOrdersByPageNumberSuccess,
	getCurrentOrdersRequestSuccess,
	getOrdersRequestFailure,
	getOrdersRequestSuccess,
	getOrdersByRxmcRequestSuccess,
	getOrdersByRxmcRequestFailure,
	getCurrentOrdersRequest,
	getAllOrdersRequestSuccess,
	getAllOrdersRequestFailure
} from '../actions/get_orders.action';
import {getOrders, getOrdersByRxmc, processDeliveries, getAllOrders} from '../../api/get_orders.api';
import {_getJwtToken} from '../../../Cart/redux/sagas/cart.saga';
import {ORDER_TYPES,ORDER_TYPES_STATUS} from '../../../../utils/enums';

export const GetOrdersReducer = state => state.myAccountModuleReducer.GetOrdersReducer;
export const OrderUpdateReducer = state => state.myAccountModuleReducer.OrderUpdateReducer;
export function* getOrdersSaga({payload}) {
	try {
		const jwtToken = yield call(_getJwtToken);
		const delay = time => new Promise(resolve => setTimeout(resolve, time));
		if(payload.timeDelay) yield call(delay, 1000);
		const orders = yield call(getOrders, jwtToken, payload);
		const orderHistoryType = payload['orderHistoryType'];
		if (orders) {
			yield put(getOrdersByPageNumberSuccess(processDeliveries(orders?.data || {}),orderHistoryType));
			//As now pagination is in place & we are storing previous order data also
			//it might be the scenario that duplicate orders may come if user toggles between the
			//pagination
			const {orders: previousOrders} = yield select(GetOrdersReducer);
			if (!payload.timeDelay && previousOrders && previousOrders?.[orderHistoryType]?.orderList) {
				const previousOrderIDs = new Set(previousOrders[orderHistoryType].orderList.map(prevOrder => prevOrder.orderId));
				const combinedOrders = [
					...previousOrders?.[orderHistoryType]?.orderList,
					...orders?.data?.orderList.filter(order => !previousOrderIDs.has(order.orderId))
				];
				const orderData = Object.assign({}, {
					...orders?.data,
					orderList:[...combinedOrders]
				});
				yield put(getOrdersRequestSuccess(processDeliveries(orderData || {}),orderHistoryType));
			} else {
				yield put(getOrdersRequestSuccess(processDeliveries(orders?.data || {}),orderHistoryType));
				if(payload.timeDelay && payload.orderHistoryType) yield put(getCurrentOrdersRequest(orderHistoryType));
			}
		}
		else {
			yield put(getOrdersRequestFailure('error fetching orders'));
		}
	} catch (e) {
		yield put(getOrdersRequestFailure(e));
	}
}
export const mergeReimbursment = (data) => {
	const mergedDelivarables = [];
	const mergedShipments = [];
	const mergedServiceInfo = [];
	data?.orderList?.map(order => {
		mergedDelivarables.push(...order.productData);
		mergedShipments.push(...(order.deliveryDetails ? order.deliveryDetails: []));
		mergedServiceInfo.push(...(order.serviceData ? order.serviceData : []));
	});
	const mergedOrder = Object.assign([], [{
		...data?.orderList[0],
		deliveryDetails: mergedShipments,
		productData: mergedDelivarables,
		serviceData: mergedServiceInfo
	}]);
	const orderData = Object.assign({}, {
		...data,
		orderList:[...mergedOrder]
	});
	return processDeliveries(orderData);
};

export function* getCurrentOrdersSaga(orderType){
	try {
		const {orders} = yield select(GetOrdersReducer);
		const typeOfOrder = orderType['orderType'];
		const orderedOrders = orders[typeOfOrder]?.orderList.filter(order => order.deliveryDetails !== null);
		if(typeOfOrder === ORDER_TYPES_STATUS.CP){
		      const currentOrder = orderedOrders.find(order => !order?.serviceData?.[0]?.serviceSKU && order?.orderType === ORDER_TYPES.CPO);
			yield put(getCurrentOrdersRequestSuccess(currentOrder,typeOfOrder));
		}
		else if(typeOfOrder === ORDER_TYPES_STATUS.RX){
			let currentOrder = orderedOrders?.find(order => order?.isReimbursedOrder);
			if(currentOrder?.isMultipleRxmc){
				try {
					const jwtToken = yield call(_getJwtToken);
			     const {data} = yield call(getOrdersByRxmc, jwtToken, currentOrder?.rxmc);
					if (data && data?.orderList?.length > 1){
				 currentOrder = yield call(mergeReimbursment, data);
				 currentOrder = currentOrder?.orderList?.[0];
				 }
				}catch(e){
					yield put(getCurrentOrdersRequestFailure(e));
				}
			}
			yield put(getCurrentOrdersRequestSuccess(currentOrder,typeOfOrder));
		}

	} catch (e) {
		yield put(getOrdersRequestFailure(e));
	}
}
export function* getOrdersRxmcSaga(action){
	try {
		const jwtToken = yield call(_getJwtToken);
		const delay = time => new Promise(resolve => setTimeout(resolve, time));
		if(action?.payload?.timeDelay) yield call(delay, 5000);
		const rxmc = action?.payload?.rxmc || action?.payload;
		const {data} = yield call(getOrdersByRxmc, jwtToken, rxmc);
		if (data) {
			//check if multiple rxmc exists
			if(data?.orderList.length > 1){
				const mergedDelivarables = [];
				const mergedShipments = [];
				data?.orderList.map(order => {
					mergedDelivarables.push(...order.productData);
					mergedShipments.push(...(order.deliveryDetails ? order.deliveryDetails: []));
				});
				const mergedOrder = Object.assign([], [{...data.orderList[0], deliveryDetails: mergedShipments,productData: mergedDelivarables}]);
				const orderData = Object.assign({}, {
					...data,
					orderList:[...mergedOrder]
				});
				yield put(getOrdersByRxmcRequestSuccess(processDeliveries(orderData)));
			} else {
				yield put(getOrdersByRxmcRequestSuccess(processDeliveries(data)));
			}
		} else {
			yield put(getOrdersByRxmcRequestFailure('error fetching orders', rxmc));
		}
	} catch (e) {
		yield put(getOrdersByRxmcRequestFailure(e, action?.payload?.rxmc || action?.payload));
	}
}

export function* getAllOrdersSaga({payload}) {
	try {
		const jwtToken = yield call(_getJwtToken);
		const delay = time => new Promise(resolve => setTimeout(resolve, time));
		if(payload.timeDelay) yield call(delay, 1000);
		const {data} = yield call(getAllOrders, jwtToken, payload);
		if (data) {
			yield put(getAllOrdersRequestSuccess(processDeliveries(data)));
		}
		else {
			yield put(getAllOrdersRequestFailure('error fetching orders'));
		}
	} catch (e) {
		yield put(getAllOrdersRequestFailure(e));
	}
}
export default function* getOrdersSagas() {
	yield takeEvery(GET_ORDERS_REQUEST, getOrdersSaga);
	yield takeLeading(GET_CURRENT_ORDERS_REQUEST, getCurrentOrdersSaga);
	yield takeEvery(GET_ORDERS_RXMC_REQUEST, getOrdersRxmcSaga);
	yield takeEvery(GET_ALL_ORDERS_REQUEST, getAllOrdersSaga);
}