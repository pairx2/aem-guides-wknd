import {call, put, select, takeLeading, takeEvery} from 'redux-saga/effects';
import {
	GET_CURRENT_ORDERS_REQUEST,
	GET_ORDERS_REQUEST,
	GET_ORDERS_RXMC_REQUEST,	
	getCurrentOrdersRequestSuccess,
	getOrdersRequestFailure,
	getOrdersRequestSuccess,
	getOrdersByPageNumberSuccess,
	getOrdersByRxmcRequestFailure,
	GET_ALL_ORDERS_REQUEST
} from '../../../../../modules/MyAccount/redux/actions/get_orders.action';
import {getOrders, processDeliveries, getOrdersByRxmc} from '../../../../../modules/MyAccount/api/get_orders.api';
import {_getJwtToken} from '../../../../../modules/Cart/redux/sagas/cart.saga';
import getOrdersSagas from '../../../../../modules/MyAccount/redux/sagas/get_orders.saga';
import * as saga from '../../../../../modules/MyAccount/redux/sagas/get_orders.saga';

jest.mock('../../../../../utils/endpointUrl.js');

//getOrdersSagas

describe('getOrdersSagas saga success case in try block without delay', () => {
	const payload = {
		limit: 10,
		pageNumber: 1,
		orderHistoryType: 'RX'
	};
	const iterator = saga.getOrdersSaga({payload});
	test('jwtToken testing', () => {
		const actualToken = iterator.next().value;
		const expectedToken = call(_getJwtToken);
		expect(actualToken).toEqual(expectedToken);
	});
	test('getOrders testing', () => {
		const token = '8ac7a49f71aabf0e0171ba97acb923d2';
		const expectedYield = call(getOrders, token, payload);
		const actualYield = iterator.next(token).value;
		expect(actualYield).toEqual(expectedYield);
	});
	test('getOrdersByPageNumberSuccess', () => {
		const orders = {
			data : {}
		};
		const actualYield = iterator.next({orders}).value;
		const expectedYield = put(getOrdersByPageNumberSuccess(processDeliveries(orders.data), 'RX'));
		expect(actualYield).toEqual(expectedYield);
	});
	test('GetOrdersReducer', () => {
		const orders = {
			data : {}
		};
		const actualYield = iterator.next({orders}).value;
		const expectedYield = select(saga.GetOrdersReducer);
		expect(actualYield).toEqual(expectedYield);
	});
	test('getOrdersRequestSuccess testing in try -> if block', () => {
		const orders = {
			data : {}
		};
		const actualYield = iterator.next({orders}).value;
		const expectedYield = put(getOrdersRequestSuccess(processDeliveries(orders.data), 'RX'));
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('getOrdersSagas saga success case in try block with delay', () => {
	const payload = {
		limit: 10,
		pageNumber: 1,
		timeDelay: true,
		orderHistoryType:'RX'
	};
	const iterator = saga.getOrdersSaga({payload});
	test('jwtToken testing', () => {
		const actualToken = iterator.next().value;
		const expectedToken = call(_getJwtToken);
		expect(actualToken).toEqual(expectedToken);
	});
	test('call delay', () => {
		const token = '8ac7a49f71aabf0e0171ba97acb923d2';
		const delay = time => new Promise(resolve => setTimeout(resolve, time));
		const expectedYield = call(delay, 1000);
		const actualYield = iterator.next(token).value;
		expect(JSON.stringify(actualYield)).toEqual(JSON.stringify(expectedYield));
	});
	test('getOrdersByPageNumberSuccess', () => {
		const orders = {
			data : {}
		};
		const token = '8ac7a49f71aabf0e0171ba97acb923d2';
		const actualYield = iterator.next({orders}).value;
		const expectedYield =  call(getOrders, token, payload);
		expect(actualYield).toEqual(expectedYield);
	});
	test('getOrdersRequestSuccess testing in try -> if block', () => {
		const orders = {
			data : {}
		};
		const actualYield = iterator.next({orders}).value;
		const expectedYield = put(getOrdersByPageNumberSuccess(processDeliveries(orders.data), 'RX'));
		expect(actualYield).toEqual(expectedYield);
	});
	test('getOrdersRequestSuccess testing in try -> if block', () => {
		const orders = {
			data : {}
		};
		const actualYield = iterator.next({orders}).value;
		const expectedYield = select(saga.GetOrdersReducer);
		expect(actualYield).toEqual(expectedYield);
	});
	test('getOrdersRequestSuccess testing in try -> if block', () => {
		const orders = {
			data : {}
		};
		const actualYield = iterator.next({orders}).value;
		const expectedYield = put(getOrdersRequestSuccess(processDeliveries(orders.data), 'RX'));
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('getOrdersSagas saga success caes in try block', () => {
	const payload = {
		limit: 10,
		pageNumber: 1,
		orderHistoryType: 'RX'
	};
	const iterator = saga.getOrdersSaga({payload});
	const token = '8ac7a49f71aabf0e0171ba97acb923d2';
	const orders = {
		data : {}
	};
	iterator.next();
	iterator.next(token);
	iterator.next({orders});
	iterator.next({orders});
	test('getOrdersRequestSuccess testing in try -> if block', () => {
		const orderData = {};
		const actualYield = iterator.next({orderData}).value;
		const expectedYield = put(getOrdersRequestSuccess(processDeliveries(orderData), 'RX'));
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('getOrdersSagas saga success caes in try->else block', () => {
	const payload = {
		limit: 10,
		pageNumber: 1,
		orderHistoryType: 'RX'
	};
	const token = '8ac7a49f71aabf0e0171ba97acb923d2';
	const iterator = saga.getOrdersSaga({payload});
	iterator.next();
	iterator.next(token);
	test('getOrdersRequestFailure testing in try -> if block', () => {
		const actualYield = iterator.next().value;
		const expectedYield = put(getOrdersRequestFailure('error fetching orders'));
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('getOrdersSagas saga in catch block', () => {
	const payload = {
		limit: 10,
		pageNumber: 1,
		orderHistoryType: 'RX'
	};
	const iterator = saga.getOrdersSaga({payload});
	const e = {};
	test('getOrdersSagas testing', () => {
		iterator.next();
		expect(
			iterator.throw(e).value).
			toEqual(put(getOrdersRequestFailure(e)));
	});
});

describe('getCurrentOrdersSaga saga failure case', () => {
	const iterator = saga.getCurrentOrdersSaga('RX');
	test('select GetOrdersReducer testing', () => {
		const actualYield = iterator.next().value;
		const expectedToken = select(saga.GetOrdersReducer);
		expect(actualYield).toEqual(expectedToken);
	});
	test('getCurrentOrdersRequestSuccess testing if currentRMX?.isMultipleRxmc', () => {
		const orders = {
			RX:{
				'orderList' : [{
					'deliveryDetails':[
						{
							'index':1,
							'deliveryId':'SCH-0000089849',
							'deliveryType':'Master',
							'deliveryStatus':'Scheduled',
							'deliveryNumber':null,
							'deliveryTrackingNr':null,
							'invoiceIdDetails':[
								{
									'invoiceId':'a4Z4E0000002qCuUAI',
									'invoiceStatus':null
								}
							],
							'wmsStatus':null,
							'estimatedDeliveryDate':null,
							'productSKU':'S5269856',
							'productQuantity':1,
							'shipmentId':'a4d4E0000000bOsQAI'
						}
					],
					'serviceData':[
						{
							'serviceSKU':'1-71538-01',
							'serviceName':'FreeStyle Libre Sensor Subscription',
							'serviceFromDate':1587945600000,
							'serviceToDate':null,
							'serviceFrequency':'3',
							'serviceDuration':null,
							'serviceProductQuantity':1,
							'serviceStatus':'Active'
						}
					],
					isReimbursedOrder: true,
					isMultipleRxmc: true
				}]
			}
		};
		const expectedYield = undefined;
		const actualYield = iterator.next({orders}).value;
		expect(actualYield).toEqual(expectedYield);
	});
	test('After failure - no calls should happen', () => {
		const token = '8ac7a49f71aabf0e0171ba97acb923d2';
		const expectedYield = undefined;
		const actualYield = iterator.next(token).value;
		expect(actualYield).toEqual(expectedYield);
	});
	test('After failure - no calls should happen', () => {
		const data = {
			'header': {
			  'totalResults': 2,
			  'pageNumber': 1,
			  'totalPages': 1,
			  'resultsPerPage': 10
			},
			'globalConfig': {
			  'commercialReturnGracePeriod': 14.0,
			  'numberofDaysBeforeDueDateChange': 14.0,
			  'numberofDaysAheadDueDateChange': 14.0
			},
			'rxmc': '0000BX',
			'hmmOrderId': null,
			'accountId': '4900202453',
			'orderList': [
			  {
					'index': 1,
					'orderId': 'BuisRSP502',
					'orderDate': 1601474796000,
					'orderTitle': 'Reimbursement',
					'orderType': 'Reimbursement',
					'orderSubtype': null,
					'rxmc': '0000BX',
					'isReimbursedOrder': true,
					'productData': [
				  {
							'index': 1,
							'productSKU': '71969-01',
							'productName': 'FreeStyle Libre 2 Lesegerät, MG/DL',
							'productQuantity': 1,
							'productRescheduledDueDate': null,
							'productOriginalDateFrom': 1602806400000,
							'productDateOfNextShipment': null,
							'productOriginalDateOfNextShipment': null,
							'productDueDateWindow': '14,14',
							'deliverableNumber': 'DLV-000021172',
							'deliverableStatus': 'Scheduled',
							'deliveryIdDetails': [
					  {
									'deliveryId': 'SCH-0000096167'
					  }
							]
				  }
					],
					'serviceData': null,
					'priceBreakdown': {
				  'totalPrice': 5.84,
				  'price': 0.00,
				  'coPay': 5.84,
				  'deliveryCost': 0,
				  'discount': 0,
				  'surcharge': 0
					},
					'paymentDetails': {
				  'paymentMethodType': 'credit_card',
				  'paymentBrand': 'Visa',
				  'card': {
							'last4Digits': '0044'
				  }
					},
					'deliveryDetails': [
				  {
							'index': 1,
							'deliveryId': 'SCH-0000096167',
							'deliveryOrderId': 'DE5000000824',
							'deliveryType': 'Master',
							'deliveryStatus': 'Payment method accepted',
							'deliveryNumber': null,
							'deliveryTotal': 5.84,
							'deliveryTrackingNr': null,
							'wmsStatus': 'Pending shipment',
							'dueDate': 1602806400000,
							'invoiceIdDetails': [

							],
							'returnDetails': null,
							'estimatedDeliveryDate': null,
							'deliveredDate': null,
							'isCommercialReturnAllowed': false,
							'productSKU': '71969-01',
							'productQuantity': 1,
							'shipmentId': 'a4d4E000000AldUQAS'
				  }
					],
					'deliveryAddress': {
				  'salutation': null,
				  'firstName': 'Nik',
				  'lastName': 'Sep02',
				  'city': 'Mainz',
				  'zipCode': '55130',
				  'street': 'Kalkofenweg',
				  'addressInfo': null,
				  'country': 'DE',
				  'countryCode': 'DE',
				  'stateProvince': null,
				  'phoneNumber': '+49 6172728'
					},
					'billingAddress': {
				  'salutation': null,
				  'firstName': 'Nik',
				  'lastName': 'Sep02',
				  'city': 'Mainz',
				  'zipCode': '55130',
				  'street': 'Kalkofenweg',
				  'addressInfo': null,
				  'country': 'DE'
					}
			  },
			  {
					'index': 2,
					'orderId': 'DE500001Uhnt',
					'orderDate': 1601474796000,
					'orderTitle': 'Reimbursement',
					'orderType': 'Reimbursement',
					'orderSubtype': null,
					'rxmc': '0000BX',
					'isReimbursedOrder': true,
					'productData': [
				  {
							'index': 1,
							'productSKU': '71988-01',
							'productName': 'FreeStyle Libre Sensor v2',
							'productQuantity': 5,
							'productRescheduledDueDate': null,
							'productOriginalDateFrom': 1625011200000,
							'productDateOfNextShipment': null,
							'productOriginalDateOfNextShipment': null,
							'productDueDateWindow': '14,14',
							'deliverableNumber': 'DLV-000020694',
							'deliverableStatus': 'Scheduled',
							'deliveryIdDetails': [

							]
				  }
					],
					'serviceData': [
				  {
							'serviceSKU': '1-71988-01',
							'serviceName': 'Freestyle Libre 2 Sensor Subscription',
							'serviceFromDate': 1601424000000,
							'serviceToDate': 1632873600000,
							'serviceFrequency': '3',
							'serviceDuration': null,
							'serviceProductQuantity': 26,
							'serviceStatus': 'Active',
							'productSKUDetails': [
					  {
									'productSKU': '71988-01'
					  }
							]
				  }
					],
					'priceBreakdown': {
				  'totalPrice': 10.00,
				  'price': 0.00,
				  'coPay': 10,
				  'deliveryCost': 0,
				  'discount': 0,
				  'surcharge': 0
					},
					'paymentDetails': {
				  'paymentMethodType': 'credit_card',
				  'paymentBrand': 'Visa',
				  'card': {
							'last4Digits': '0044'
				  }
					},
					'deliveryDetails': [
				  {
							'index': 2,
							'deliveryId': 'SCH-0000095896',
							'deliveryOrderId': 'DE5000000652',
							'deliveryType': 'Master',
							'deliveryStatus': 'Payment method accepted',
							'deliveryNumber': null,
							'deliveryTotal': 0,
							'deliveryTrackingNr': null,
							'wmsStatus': 'Pending shipment',
							'dueDate': 1601424000000,
							'invoiceIdDetails': [

							],
							'returnDetails': null,
							'estimatedDeliveryDate': null,
							'deliveredDate': null,
							'isCommercialReturnAllowed': false,
							'productSKU': '71988-01',
							'productQuantity': 7,
							'shipmentId': 'a4d4E0000005HQhQAM'
				  }
					],
					'deliveryAddress': {
				  'salutation': null,
				  'firstName': 'Nik',
				  'lastName': 'Sep02',
				  'city': 'Mainz',
				  'zipCode': '55130',
				  'street': 'Kalkofenweg',
				  'addressInfo': null,
				  'country': 'DE',
				  'countryCode': 'DE',
				  'stateProvince': null,
				  'phoneNumber': '+49 6172728'
					},
					'billingAddress': {
				  'salutation': null,
				  'firstName': 'Nik',
				  'lastName': 'Sep02',
				  'city': 'Mainz',
				  'zipCode': '55130',
				  'street': 'Kalkofenweg',
				  'addressInfo': null,
				  'country': 'DE'
					}
			  }
			]
		  };
		const expectedYield = undefined;
		const actualYield = iterator.next({data}).value;
		expect(actualYield).toEqual(expectedYield);
	});
	test('No calls should happen after failure', () => {
		const orders = {
			'orderList' : [{
				'deliveryDetails':[
					{
						'index':1,
						'deliveryId':'SCH-0000089849',
						'deliveryType':'Master',
						'deliveryStatus':'Scheduled',
						'deliveryNumber':null,
						'deliveryTrackingNr':null,
						'invoiceIdDetails':[
							{
								'invoiceId':'a4Z4E0000002qCuUAI',
								'invoiceStatus':null
							}
						],
						'wmsStatus':null,
						'estimatedDeliveryDate':null,
						'productSKU':'S5269856',
						'productQuantity':1,
						'shipmentId':'a4d4E0000000bOsQAI'
					}
				],
				'serviceData':[
					{
						'serviceSKU':'1-71538-01',
						'serviceName':'FreeStyle Libre Sensor Subscription',
						'serviceFromDate':1587945600000,
						'serviceToDate':null,
						'serviceFrequency':'3',
						'serviceDuration':null,
						'serviceProductQuantity':1,
						'serviceStatus':'Active'
					}
				],
				isReimbursedOrder: 'true',
				isMultipleRxmc: true
			}]
		};
		const expectedYield = undefined;
		const actualYield = iterator.next({orders}).value;
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('getCurrentOrdersSaga saga success case in try block RX order', () => {
	const orderType = {
		orderType: 'RX',
	};
	const iterator = saga.getCurrentOrdersSaga(orderType);
	test('select GetOrdersReducer testing', () => {
		const actualYield = iterator.next().value;
		const expectedToken = select(saga.GetOrdersReducer);
		expect(actualYield).toEqual(expectedToken);
	});
	test('getCurrentOrdersRequestSuccess testing if currentRMX?.isMultipleRxmc', () => {
		const orders = {
			CP:{
				'orderList' : [{
					'deliveryDetails':[
						{
							'index':1,
							'deliveryId':'SCH-0000089849',
							'deliveryType':'Master',
							'deliveryStatus':'Scheduled',
							'deliveryNumber':null,
							'deliveryTrackingNr':null,
							'invoiceIdDetails':[
								{
									'invoiceId':'a4Z4E0000002qCuUAI',
									'invoiceStatus':null
								}
							],
							'wmsStatus':null,
							'estimatedDeliveryDate':null,
							'productSKU':'S5269856',
							'productQuantity':1,
							'shipmentId':'a4d4E0000000bOsQAI'
						}
					],
					'serviceData':[
						{
							'serviceSKU':'1-71538-01',
							'serviceName':'FreeStyle Libre Sensor Subscription',
							'serviceFromDate':1587945600000,
							'serviceToDate':null,
							'serviceFrequency':'3',
							'serviceDuration':null,
							'serviceProductQuantity':1,
							'serviceStatus':'Active'
						}
					],
					isReimbursedOrder: 'true',
					isMultipleRxmc: true
				}]
			},
			CPS:{
				'orderList' : [{
					'deliveryDetails':[
						{
							'index':1,
							'deliveryId':'SCH-0000089849',
							'deliveryType':'Master',
							'deliveryStatus':'Scheduled',
							'deliveryNumber':null,
							'deliveryTrackingNr':null,
							'invoiceIdDetails':[
								{
									'invoiceId':'a4Z4E0000002qCuUAI',
									'invoiceStatus':null
								}
							],
							'wmsStatus':null,
							'estimatedDeliveryDate':null,
							'productSKU':'S5269856',
							'productQuantity':1,
							'shipmentId':'a4d4E0000000bOsQAI'
						}
					],
					'serviceData':[
						{
							'serviceSKU':'1-71538-01',
							'serviceName':'FreeStyle Libre Sensor Subscription',
							'serviceFromDate':1587945600000,
							'serviceToDate':null,
							'serviceFrequency':'3',
							'serviceDuration':null,
							'serviceProductQuantity':1,
							'serviceStatus':'Active'
						}
					],
					isReimbursedOrder: 'true',
					isMultipleRxmc: true
				}]
			},
			RX:{
				'orderList' : [{
					'deliveryDetails':[
						{
							'index':1,
							'deliveryId':'SCH-0000089849',
							'deliveryType':'Master',
							'deliveryStatus':'Scheduled',
							'deliveryNumber':null,
							'deliveryTrackingNr':null,
							'invoiceIdDetails':[
								{
									'invoiceId':'a4Z4E0000002qCuUAI',
									'invoiceStatus':null
								}
							],
							'wmsStatus':null,
							'estimatedDeliveryDate':null,
							'productSKU':'S5269856',
							'productQuantity':1,
							'shipmentId':'a4d4E0000000bOsQAI'
						}
					],
					'serviceData':[
						{
							'serviceSKU':'1-71538-01',
							'serviceName':'FreeStyle Libre Sensor Subscription',
							'serviceFromDate':1587945600000,
							'serviceToDate':null,
							'serviceFrequency':'3',
							'serviceDuration':null,
							'serviceProductQuantity':1,
							'serviceStatus':'Active'
						}
					],
					isReimbursedOrder: 'true',
					isMultipleRxmc: true
				}]
			},
		};
		const expectedYield = call(_getJwtToken);
		const actualYield = iterator.next({orders}).value;
		expect(actualYield).toEqual(expectedYield);
	});
	test('getOrdersByRxmc', () => {
		const token = '8ac7a49f71aabf0e0171ba97acb923d2';
		const expectedYield = call(getOrdersByRxmc, token, undefined);
		const actualYield = iterator.next(token).value;
		expect(actualYield).toEqual(expectedYield);
	});
	test('mergeReimbursment', () => {
		const data = {
			'header': {
			  'totalResults': 2,
			  'pageNumber': 1,
			  'totalPages': 1,
			  'resultsPerPage': 10
			},
			'globalConfig': {
			  'commercialReturnGracePeriod': 14.0,
			  'numberofDaysBeforeDueDateChange': 14.0,
			  'numberofDaysAheadDueDateChange': 14.0
			},
			'rxmc': '0000BX',
			'hmmOrderId': null,
			'accountId': '4900202453',
			'orderList': [
			  {
					'index': 1,
					'orderId': 'BuisRSP502',
					'orderDate': 1601474796000,
					'orderTitle': 'Reimbursement',
					'orderType': 'Reimbursement',
					'orderSubtype': null,
					'rxmc': '0000BX',
					'isReimbursedOrder': true,
					'productData': [
				  {
							'index': 1,
							'productSKU': '71969-01',
							'productName': 'FreeStyle Libre 2 Lesegerät, MG/DL',
							'productQuantity': 1,
							'productRescheduledDueDate': null,
							'productOriginalDateFrom': 1602806400000,
							'productDateOfNextShipment': null,
							'productOriginalDateOfNextShipment': null,
							'productDueDateWindow': '14,14',
							'deliverableNumber': 'DLV-000021172',
							'deliverableStatus': 'Scheduled',
							'deliveryIdDetails': [
					  {
									'deliveryId': 'SCH-0000096167'
					  }
							]
				  }
					],
					'serviceData': null,
					'priceBreakdown': {
				  'totalPrice': 5.84,
				  'price': 0.00,
				  'coPay': 5.84,
				  'deliveryCost': 0,
				  'discount': 0,
				  'surcharge': 0
					},
					'paymentDetails': {
				  'paymentMethodType': 'credit_card',
				  'paymentBrand': 'Visa',
				  'card': {
							'last4Digits': '0044'
				  }
					},
					'deliveryDetails': [
				  {
							'index': 1,
							'deliveryId': 'SCH-0000096167',
							'deliveryOrderId': 'DE5000000824',
							'deliveryType': 'Master',
							'deliveryStatus': 'Payment method accepted',
							'deliveryNumber': null,
							'deliveryTotal': 5.84,
							'deliveryTrackingNr': null,
							'wmsStatus': 'Pending shipment',
							'dueDate': 1602806400000,
							'invoiceIdDetails': [

							],
							'returnDetails': null,
							'estimatedDeliveryDate': null,
							'deliveredDate': null,
							'isCommercialReturnAllowed': false,
							'productSKU': '71969-01',
							'productQuantity': 1,
							'shipmentId': 'a4d4E000000AldUQAS'
				  }
					],
					'deliveryAddress': {
				  'salutation': null,
				  'firstName': 'Nik',
				  'lastName': 'Sep02',
				  'city': 'Mainz',
				  'zipCode': '55130',
				  'street': 'Kalkofenweg',
				  'addressInfo': null,
				  'country': 'DE',
				  'countryCode': 'DE',
				  'stateProvince': null,
				  'phoneNumber': '+49 6172728'
					},
					'billingAddress': {
				  'salutation': null,
				  'firstName': 'Nik',
				  'lastName': 'Sep02',
				  'city': 'Mainz',
				  'zipCode': '55130',
				  'street': 'Kalkofenweg',
				  'addressInfo': null,
				  'country': 'DE'
					}
			  },
			  {
					'index': 2,
					'orderId': 'DE500001Uhnt',
					'orderDate': 1601474796000,
					'orderTitle': 'Reimbursement',
					'orderType': 'Reimbursement',
					'orderSubtype': null,
					'rxmc': '0000BX',
					'isReimbursedOrder': true,
					'productData': [
				  {
							'index': 1,
							'productSKU': '71988-01',
							'productName': 'FreeStyle Libre Sensor v2',
							'productQuantity': 5,
							'productRescheduledDueDate': null,
							'productOriginalDateFrom': 1625011200000,
							'productDateOfNextShipment': null,
							'productOriginalDateOfNextShipment': null,
							'productDueDateWindow': '14,14',
							'deliverableNumber': 'DLV-000020694',
							'deliverableStatus': 'Scheduled',
							'deliveryIdDetails': [

							]
				  }
					],
					'serviceData': [
				  {
							'serviceSKU': '1-71988-01',
							'serviceName': 'Freestyle Libre 2 Sensor Subscription',
							'serviceFromDate': 1601424000000,
							'serviceToDate': 1632873600000,
							'serviceFrequency': '3',
							'serviceDuration': null,
							'serviceProductQuantity': 26,
							'serviceStatus': 'Active',
							'productSKUDetails': [
					  {
									'productSKU': '71988-01'
					  }
							]
				  }
					],
					'priceBreakdown': {
				  'totalPrice': 10.00,
				  'price': 0.00,
				  'coPay': 10,
				  'deliveryCost': 0,
				  'discount': 0,
				  'surcharge': 0
					},
					'paymentDetails': {
				  'paymentMethodType': 'credit_card',
				  'paymentBrand': 'Visa',
				  'card': {
							'last4Digits': '0044'
				  }
					},
					'deliveryDetails': [
				  {
							'index': 2,
							'deliveryId': 'SCH-0000095896',
							'deliveryOrderId': 'DE5000000652',
							'deliveryType': 'Master',
							'deliveryStatus': 'Payment method accepted',
							'deliveryNumber': null,
							'deliveryTotal': 0,
							'deliveryTrackingNr': null,
							'wmsStatus': 'Pending shipment',
							'dueDate': 1601424000000,
							'invoiceIdDetails': [

							],
							'returnDetails': null,
							'estimatedDeliveryDate': null,
							'deliveredDate': null,
							'isCommercialReturnAllowed': false,
							'productSKU': '71988-01',
							'productQuantity': 7,
							'shipmentId': 'a4d4E0000005HQhQAM'
				  }
					],
					'deliveryAddress': {
				  'salutation': null,
				  'firstName': 'Nik',
				  'lastName': 'Sep02',
				  'city': 'Mainz',
				  'zipCode': '55130',
				  'street': 'Kalkofenweg',
				  'addressInfo': null,
				  'country': 'DE',
				  'countryCode': 'DE',
				  'stateProvince': null,
				  'phoneNumber': '+49 6172728'
					},
					'billingAddress': {
				  'salutation': null,
				  'firstName': 'Nik',
				  'lastName': 'Sep02',
				  'city': 'Mainz',
				  'zipCode': '55130',
				  'street': 'Kalkofenweg',
				  'addressInfo': null,
				  'country': 'DE'
					}
			  }
			]
		  };
		const expectedYield = call(saga.mergeReimbursment, data);
		const actualYield = iterator.next({data}).value;
		expect(actualYield).toEqual(expectedYield);
	});
	test('getCurrentOrdersRequestSuccess', () => {
		const orders = {
			'orderList' : [{
				'deliveryDetails':[
					{
						'index':1,
						'deliveryId':'SCH-0000089849',
						'deliveryType':'Master',
						'deliveryStatus':'Scheduled',
						'deliveryNumber':null,
						'deliveryTrackingNr':null,
						'invoiceIdDetails':[
							{
								'invoiceId':'a4Z4E0000002qCuUAI',
								'invoiceStatus':null
							}
						],
						'wmsStatus':null,
						'estimatedDeliveryDate':null,
						'productSKU':'S5269856',
						'productQuantity':1,
						'shipmentId':'a4d4E0000000bOsQAI'
					}
				],
				'serviceData':[
					{
						'serviceSKU':'1-71538-01',
						'serviceName':'FreeStyle Libre Sensor Subscription',
						'serviceFromDate':1587945600000,
						'serviceToDate':null,
						'serviceFrequency':'3',
						'serviceDuration':null,
						'serviceProductQuantity':1,
						'serviceStatus':'Active'
					}
				],
				isReimbursedOrder: 'true',
				isMultipleRxmc: true
			}]
		};
		const expectedYield = put(getCurrentOrdersRequestSuccess(undefined, 'RX'));
		const actualYield = iterator.next({orders}).value;
		expect(actualYield).toEqual(expectedYield);
	});

});
describe('getCurrentOrdersSaga saga success case in try block - CP order', () => {
	const orderType = {
		orderType: 'CP',
	};
	const iterator = saga.getCurrentOrdersSaga(orderType);
	test('select GetOrdersReducer testing', () => {
		const actualYield = iterator.next().value;
		const expectedToken = select(saga.GetOrdersReducer);
		expect(actualYield).toEqual(expectedToken);
	});
	test('getCurrentOrdersRequestSuccess testing if currentRMX?.isMultipleRxmc', () => {
		const orders = {
			CP:{
				'orderList' : [{
					'deliveryDetails':[
						{
							'index':1,
							'deliveryId':'SCH-0000089849',
							'deliveryType':'Master',
							'deliveryStatus':'Scheduled',
							'deliveryNumber':null,
							'deliveryTrackingNr':null,
							'invoiceIdDetails':[
								{
									'invoiceId':'a4Z4E0000002qCuUAI',
									'invoiceStatus':null
								}
							],
							'wmsStatus':null,
							'estimatedDeliveryDate':null,
							'productSKU':'S5269856',
							'productQuantity':1,
							'shipmentId':'a4d4E0000000bOsQAI'
						}
					],
					'serviceData':[
						{
							'serviceSKU':'1-71538-01',
							'serviceName':'FreeStyle Libre Sensor Subscription',
							'serviceFromDate':1587945600000,
							'serviceToDate':null,
							'serviceFrequency':'3',
							'serviceDuration':null,
							'serviceProductQuantity':1,
							'serviceStatus':'Active'
						}
					],
					isReimbursedOrder: 'true',
					isMultipleRxmc: true
				}]
			},
			CPS:{
				'orderList' : [{
					'deliveryDetails':[
						{
							'index':1,
							'deliveryId':'SCH-0000089849',
							'deliveryType':'Master',
							'deliveryStatus':'Scheduled',
							'deliveryNumber':null,
							'deliveryTrackingNr':null,
							'invoiceIdDetails':[
								{
									'invoiceId':'a4Z4E0000002qCuUAI',
									'invoiceStatus':null
								}
							],
							'wmsStatus':null,
							'estimatedDeliveryDate':null,
							'productSKU':'S5269856',
							'productQuantity':1,
							'shipmentId':'a4d4E0000000bOsQAI'
						}
					],
					'serviceData':[
						{
							'serviceSKU':'1-71538-01',
							'serviceName':'FreeStyle Libre Sensor Subscription',
							'serviceFromDate':1587945600000,
							'serviceToDate':null,
							'serviceFrequency':'3',
							'serviceDuration':null,
							'serviceProductQuantity':1,
							'serviceStatus':'Active'
						}
					],
					isReimbursedOrder: 'true',
					isMultipleRxmc: true
				}]
			},
			RX:{
				'orderList' : [{
					'deliveryDetails':[
						{
							'index':1,
							'deliveryId':'SCH-0000089849',
							'deliveryType':'Master',
							'deliveryStatus':'Scheduled',
							'deliveryNumber':null,
							'deliveryTrackingNr':null,
							'invoiceIdDetails':[
								{
									'invoiceId':'a4Z4E0000002qCuUAI',
									'invoiceStatus':null
								}
							],
							'wmsStatus':null,
							'estimatedDeliveryDate':null,
							'productSKU':'S5269856',
							'productQuantity':1,
							'shipmentId':'a4d4E0000000bOsQAI'
						}
					],
					'serviceData':[
						{
							'serviceSKU':'1-71538-01',
							'serviceName':'FreeStyle Libre Sensor Subscription',
							'serviceFromDate':1587945600000,
							'serviceToDate':null,
							'serviceFrequency':'3',
							'serviceDuration':null,
							'serviceProductQuantity':1,
							'serviceStatus':'Active'
						}
					],
					isReimbursedOrder: 'true',
					isMultipleRxmc: true
				}]
			},
		};
		const expectedYield = put(getCurrentOrdersRequestSuccess(undefined,'CP'));
		const actualYield = iterator.next({orders}).value;
		expect(actualYield).toEqual(expectedYield);
	});
});


describe('getCurrentOrdersSaga saga success caes in try block', () => {
	const iterator = saga.getCurrentOrdersSaga('CP');
	iterator.next();
	test('getCurrentOrdersRequestFailure testing in else block', () => {
		const expectedYield = put(getOrdersRequestFailure(undefined));
		const actualYield = iterator.next(undefined).value;
		expect(actualYield).not.toEqual(expectedYield);
	});
});

describe('getCurrentOrdersSaga saga in catch block', () => {
	const iterator = saga.getCurrentOrdersSaga('CPS');
	const e = {
		'error' : 'error'
	};
	test('getCurrentOrdersSaga testing', () => {
		iterator.next();
		expect(
			iterator.throw(e).value).
			toEqual(put(getOrdersRequestFailure(e)));

	});
});

describe('getOrdersRxmcSaga saga success caes in try block', () => {
	const iterator = saga.getOrdersRxmcSaga();
	test('jwtToken testing', () => {
		const actualToken = iterator.next().value;
		const expectedToken = call(_getJwtToken);
		expect(actualToken).toEqual(expectedToken);
	});
});

describe('getOrdersRxmcSaga saga success caes in try->else block', () => {
	const token = '8ac7a49f71aabf0e0171ba97acb923d2';
	const action = {
		payload : {}
	};
	const iterator = saga.getOrdersRxmcSaga(action);
	iterator.next();
	iterator.next(token);
	test('getOrdersRequestFailure testing in try -> if block', () => {
		const actualYield = iterator.next('error fetching orders').value;
		const expectedYield = put(getOrdersByRxmcRequestFailure('error fetching orders', {}));
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('getOrdersRxmcSaga saga in catch block', () => {
	const action = {
		payload : {}
	};
	const iterator = saga.getOrdersRxmcSaga(action);
	const e = null;
	test('getOrdersByRxmcRequestFailure testing in catch block', () => {
		iterator.next();
		expect(
			iterator.throw(e).value).
			toEqual(put(getOrdersByRxmcRequestFailure(e, {})));

	});
});
describe('mergeReiumbersment', () => {
	const data = {
		'header': {
		  'totalResults': 2,
		  'pageNumber': 1,
		  'totalPages': 1,
		  'resultsPerPage': 10
		},
		'globalConfig': {
		  'commercialReturnGracePeriod': 14.0,
		  'numberofDaysBeforeDueDateChange': 14.0,
		  'numberofDaysAheadDueDateChange': 14.0
		},
		'rxmc': '0000BX',
		'hmmOrderId': null,
		'accountId': '4900202453',
		'orderList': [
		  {
				'index': 1,
				'orderId': 'BuisRSP502',
				'orderDate': 1601474796000,
				'orderTitle': 'Reimbursement',
				'orderType': 'Reimbursement',
				'orderSubtype': null,
				'rxmc': '0000BX',
				'isReimbursedOrder': true,
				'productData': [
			  {
						'index': 1,
						'productSKU': '71969-01',
						'productName': 'FreeStyle Libre 2 Lesegerät, MG/DL',
						'productQuantity': 1,
						'productRescheduledDueDate': null,
						'productOriginalDateFrom': 1602806400000,
						'productDateOfNextShipment': null,
						'productOriginalDateOfNextShipment': null,
						'productDueDateWindow': '14,14',
						'deliverableNumber': 'DLV-000021172',
						'deliverableStatus': 'Scheduled',
						'deliveryIdDetails': [
				  {
								'deliveryId': 'SCH-0000096167'
				  }
						]
			  }
				],
				'serviceData': null,
				'priceBreakdown': {
			  'totalPrice': 5.84,
			  'price': 0.00,
			  'coPay': 5.84,
			  'deliveryCost': 0,
			  'discount': 0,
			  'surcharge': 0
				},
				'paymentDetails': {
			  'paymentMethodType': 'credit_card',
			  'paymentBrand': 'Visa',
			  'card': {
						'last4Digits': '0044'
			  }
				},
				'deliveryDetails': [
			  {
						'index': 1,
						'deliveryId': 'SCH-0000096167',
						'deliveryOrderId': 'DE5000000824',
						'deliveryType': 'Master',
						'deliveryStatus': 'Payment method accepted',
						'deliveryNumber': null,
						'deliveryTotal': 5.84,
						'deliveryTrackingNr': null,
						'wmsStatus': 'Pending shipment',
						'dueDate': 1602806400000,
						'invoiceIdDetails': [

						],
						'returnDetails': null,
						'estimatedDeliveryDate': null,
						'deliveredDate': null,
						'isCommercialReturnAllowed': false,
						'productSKU': '71969-01',
						'productQuantity': 1,
						'shipmentId': 'a4d4E000000AldUQAS'
			  }
				],
				'deliveryAddress': {
			  'salutation': null,
			  'firstName': 'Nik',
			  'lastName': 'Sep02',
			  'city': 'Mainz',
			  'zipCode': '55130',
			  'street': 'Kalkofenweg',
			  'addressInfo': null,
			  'country': 'DE',
			  'countryCode': 'DE',
			  'stateProvince': null,
			  'phoneNumber': '+49 6172728'
				},
				'billingAddress': {
			  'salutation': null,
			  'firstName': 'Nik',
			  'lastName': 'Sep02',
			  'city': 'Mainz',
			  'zipCode': '55130',
			  'street': 'Kalkofenweg',
			  'addressInfo': null,
			  'country': 'DE'
				}
		  },
		  {
				'index': 2,
				'orderId': 'DE500001Uhnt',
				'orderDate': 1601474796000,
				'orderTitle': 'Reimbursement',
				'orderType': 'Reimbursement',
				'orderSubtype': null,
				'rxmc': '0000BX',
				'isReimbursedOrder': true,
				'productData': [
			  {
						'index': 1,
						'productSKU': '71988-01',
						'productName': 'FreeStyle Libre Sensor v2',
						'productQuantity': 5,
						'productRescheduledDueDate': null,
						'productOriginalDateFrom': 1625011200000,
						'productDateOfNextShipment': null,
						'productOriginalDateOfNextShipment': null,
						'productDueDateWindow': '14,14',
						'deliverableNumber': 'DLV-000020694',
						'deliverableStatus': 'Scheduled',
						'deliveryIdDetails': [

						]
			  }
				],
				'serviceData': [
			  {
						'serviceSKU': '1-71988-01',
						'serviceName': 'Freestyle Libre 2 Sensor Subscription',
						'serviceFromDate': 1601424000000,
						'serviceToDate': 1632873600000,
						'serviceFrequency': '3',
						'serviceDuration': null,
						'serviceProductQuantity': 26,
						'serviceStatus': 'Active',
						'productSKUDetails': [
				  {
								'productSKU': '71988-01'
				  }
						]
			  }
				],
				'priceBreakdown': {
			  'totalPrice': 10.00,
			  'price': 0.00,
			  'coPay': 10,
			  'deliveryCost': 0,
			  'discount': 0,
			  'surcharge': 0
				},
				'paymentDetails': {
			  'paymentMethodType': 'credit_card',
			  'paymentBrand': 'Visa',
			  'card': {
						'last4Digits': '0044'
			  }
				},
				'deliveryDetails': [
			  {
						'index': 2,
						'deliveryId': 'SCH-0000095896',
						'deliveryOrderId': 'DE5000000652',
						'deliveryType': 'Master',
						'deliveryStatus': 'Payment method accepted',
						'deliveryNumber': null,
						'deliveryTotal': 0,
						'deliveryTrackingNr': null,
						'wmsStatus': 'Pending shipment',
						'dueDate': 1601424000000,
						'invoiceIdDetails': [

						],
						'returnDetails': null,
						'estimatedDeliveryDate': null,
						'deliveredDate': null,
						'isCommercialReturnAllowed': false,
						'productSKU': '71988-01',
						'productQuantity': 7,
						'shipmentId': 'a4d4E0000005HQhQAM'
			  }
				],
				'deliveryAddress': {
			  'salutation': null,
			  'firstName': 'Nik',
			  'lastName': 'Sep02',
			  'city': 'Mainz',
			  'zipCode': '55130',
			  'street': 'Kalkofenweg',
			  'addressInfo': null,
			  'country': 'DE',
			  'countryCode': 'DE',
			  'stateProvince': null,
			  'phoneNumber': '+49 6172728'
				},
				'billingAddress': {
			  'salutation': null,
			  'firstName': 'Nik',
			  'lastName': 'Sep02',
			  'city': 'Mainz',
			  'zipCode': '55130',
			  'street': 'Kalkofenweg',
			  'addressInfo': null,
			  'country': 'DE'
				}
		  }
		]
	  };
	test('mergeReimbursment call', () => {
		const returnValue = saga.mergeReimbursment(data);
		expect(returnValue).toBeDefined();
	});
});


describe('getOrdersSagas saga takeLeading & takeEvery calls', () => {
	const iterator = getOrdersSagas();
	test('get getOrdersSagas -> GET_ORDERS_REQUEST', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeEvery(GET_ORDERS_REQUEST, saga.getOrdersSaga);
		expect(actualToken).toEqual(expectedToken);
	});
	test('get getOrdersSagas -> GET_CURRENT_ORDERS_REQUEST', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeLeading(GET_CURRENT_ORDERS_REQUEST, saga.getCurrentOrdersSaga);
		expect(actualToken).toEqual(expectedToken);
	});
	test('get getOrdersSagas -> GET_ORDERS_RXMC_REQUEST', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeEvery(GET_ORDERS_RXMC_REQUEST, saga.getOrdersRxmcSaga);
		expect(actualToken).toEqual(expectedToken);
	});
	test('get getOrdersSagas -> GET_ALL_ORDERS_REQUEST', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeEvery(GET_ALL_ORDERS_REQUEST, saga.getAllOrdersSaga);
		expect(actualToken).toEqual(expectedToken);
	});
});
