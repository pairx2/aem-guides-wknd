import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {call, put, select, take, takeEvery} from 'redux-saga/effects';
import {
	DEACTIVATE_PLUS_SERVICE_REQUEST,
	deactivatePlusServiceRequestSuccess,
	deactivatePlusServiceRequestFailure,
	DELETE_PLUS_SERVICE_REQUEST,
	deletePlusServiceRequestSuccess,
	deletePlusServiceRequestFailure,
	DOWNLOAD_INVOICE_REQUEST,
	downloadInvoiceRequestFailure,
	POST_IMAGE_REQUEST,
	postImageProgressUpdate,
	postImageRequestSuccess,
	downloadInvoiceRequestSuccess,
	postImageRequestFailure,
	REACTIVATE_PLUS_SERVICE_REQUEST,
	reactivatePlusServiceRequestSuccess,
	reactivatePlusServiceRequestFailure,
	UPDATE_PLUS_SERVICE_REQUEST,
	updatePlusServicePaymentRequestSuccess,
	updatePlusServiceRequestSuccess,
	UPDATE_PLUS_SERVICE_PAYMENT_REQUEST,
	REACTIVATE_PLUS_SERVICE_REQUEST_FAILURE,
	REACTIVATE_PLUS_SERVICE_REQUEST_SUCCESS
} from '../../../../../modules/MyAccount/redux/actions/orders.action';
import {getCsrfToken} from '../../../../../modules/Authentication/api/registration.api';
import {_getJwtToken} from '../../../../../modules/Cart/redux/sagas/cart.saga';
import {getInvoice, cancelOrDeactivateSubscription} from '../../../../../modules/MyAccount/api/orders.api';
import {OPEN_MODAL_ACTION} from '../../../../../modules/Modal/redux/actions';
import {i18nLabels} from '../../../../../utils/translationUtils';
import {ghostOrdersDeactivateFailure, GHOST_ORDERS_DEACTIVATE} from '../../../../../modules/MyAccount/redux/actions/get_ghost_orders.action';
import ordersSaga from '../../../../../modules/MyAccount/redux/sagas/orders.saga';
import * as saga from '../../../../../modules/MyAccount/redux/sagas/orders.saga';
import {sagaDataHandling} from '../../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../../api/graphql.config';
import {buildReactivatePlusServiceSchema} from '../../../../../modules/MyAccount/schemas/reactivate_plus_service.schema';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});
jest.mock('../../../../../utils/endpointUrl.js');

describe('deactivatePlusServiceSaga saga success caes in try block', () => {
	const payload = {
		deactivateSubsData : 'Active',
		orderId : 'DEBAAAAAIS'
	};
	const data ={
		'Status Code' : 200,
		'message' : 'Status updated successfully'
	};
	const iterator = saga.deactivatePlusServiceSaga({payload});
	test('jwtToken testing', () => {
		const actualToken = iterator.next().value;
		const expectedToken = call(_getJwtToken);
		expect(actualToken).toEqual(expectedToken);
	});
	test('cancelOrDeactivateSubscription testing', () => {
		const token = '8ac7a49f71aabf0e0171ba97acb923d2';
		const expectedYield = call(cancelOrDeactivateSubscription, 'Active', token, 'DEBAAAAAIS');
		const actualYield = iterator.next(token).value;
		expect(actualYield).toEqual(expectedYield);
	});
	test('deactivatePlusServiceRequestSuccess testing in if block', () => {
		const actualYield = iterator.next({data}).value;
		const expectedYield = put(deactivatePlusServiceRequestSuccess({'Status Code': 200, 'message': 'Status updated successfully'}));
		expect(actualYield).toEqual(expectedYield);
	});
	test('OPEN_MODAL_ACTION testing in if block', () => {
		const actualYield = iterator.next().value;
		const expectedYield = put({
			type: OPEN_MODAL_ACTION,
			payload: {
				heading: i18nLabels.X_YOU_DEACTIVATED_YOUR_PLUS_SERVICE,
				contentID: 'plusServiceUpdatedConfirmationModal',
				props: {
					paragraph_1: i18nLabels.SHAME_THAT_YOU_MADE_THIS_DECISION,
					paragraph_2: i18nLabels.YOU_CAN_SET_UP_AGAIN
				}
			}
		});
		expect(actualYield).toEqual(expectedYield);
		expect(iterator.next().done).toBeFalsy();
	});
});

describe('deactivatePlusServiceSaga test failure saga in try block', () => {
	const payload = {
		deactivateSubsData : 'Active',
		orderId : 'DEBAAAAAIS'
	};
	const iterator = saga.deactivatePlusServiceSaga({payload});
	const token = '8ac7a49f71aabf0e0171ba97acb923d2';
	const data ={
		'Status Code' : 201,
		'error' : 'error'
	};
	iterator.next();
	iterator.next(token);
	test('deactivatePlusServiceRequestFailure testing in else block', () => {
		const actualYield = iterator.next({data}).value;
		const expectedYield = put(deactivatePlusServiceRequestFailure('error'));
		expect(actualYield).toEqual(expectedYield);
	});
	test('OPEN_MODAL_ACTION in else part testing in else block', () => {
		const actualYield = iterator.next().value;
		const expectedYield = put({
			type: OPEN_MODAL_ACTION,
			payload: {
				heading: i18nLabels.SUBSCRIPTION_ERROR,
				contentID: 'plusServiceSubscriptionFailed',
				props: {
					paragraph_1: i18nLabels.ORDER_STATUS_UPDATE_FAILED,
				}
			}
		});
		expect(actualYield).toEqual(expectedYield);
		expect(iterator.next().done).toBeTruthy();
	});
});

describe('deactivatePlusServiceSaga test failure in catch block', () => {
	const payload = {
		deactivateSubsData : 'Active',
		orderId : 'DEBAAAAAIS'
	};
	const iterator = saga.deactivatePlusServiceSaga({payload});
	test('cancelOrDeactivateSubscription testing', () => {
		iterator.next();
		expect(
			iterator.throw('product not found').value).
			toEqual(put(deactivatePlusServiceRequestFailure('product not found')));
	});
});

describe('deletePlusServiceSaga saga success caes in try block', () => {
	const payload = {
		cancelSubsData : 'Active',
		orderId : 'DEBAAAAAIS'
	};
	const data ={
		'Status Code' : 200,
		'message' : 'Status updated successfully'
	};
	const iterator = saga.deletePlusServiceSaga({payload});
	test('jwtToken testing', () => {
		const actualToken = iterator.next().value;
		const expectedToken = call(_getJwtToken);
		expect(actualToken).toEqual(expectedToken);
	});
	test('cancelOrDeactivateSubscription testing', () => {
		const token = '8ac7a49f71aabf0e0171ba97acb923d2';
		const expectedYield = call(cancelOrDeactivateSubscription, 'Active', token, 'DEBAAAAAIS');
		const actualYield = iterator.next(token).value;
		expect(actualYield).toEqual(expectedYield);
	});
	test('deactivatePlusServiceRequestSuccess testing in if block', () => {
		const actualYield = iterator.next({data}).value;
		const expectedYield = put(deletePlusServiceRequestSuccess({'Status Code': 200, 'message': 'Status updated successfully'}));
		expect(actualYield).toEqual(expectedYield);
	});
	test('OPEN_MODAL_ACTION testing in if block', () => {
		const actualYield = iterator.next().value;
		const expectedYield = put({
			type: OPEN_MODAL_ACTION,
			payload: {
				heading: i18nLabels.X_YOU_DELETED_YOUR_PLUS_SERVICE,
				contentID: 'plusServiceUpdatedConfirmationModal',
				props: {
					paragraph_1: i18nLabels.SHAME_THAT_YOU_MADE_THIS_DECISION,
					paragraph_2: i18nLabels.YOU_CAN_SET_UP_AGAIN
				}
			}
		});
		expect(actualYield).toEqual(expectedYield);
		expect(iterator.next().done).toBeFalsy();
	});

});

describe('deletePlusServiceSaga test failure saga in try block', () => {
	const payload = {
		cancelSubsData : 'Active',
		orderId : 'DEBAAAAAIS'
	};
	const iterator = saga.deletePlusServiceSaga({payload});
	const token = '8ac7a49f71aabf0e0171ba97acb923d2';
	const data ={
		'Status Code' : 201,
		'error' : 'error'
	};
	iterator.next();
	iterator.next(token);
	test('deletePlusServiceRequestFailure testing in else block', () => {
		const actualYield = iterator.next({data}).value;
		const expectedYield = put(deletePlusServiceRequestFailure('error'));
		expect(actualYield).toEqual(expectedYield);
	});
	test('OPEN_MODAL_ACTION in else part testing in else block', () => {
		const actualYield = iterator.next().value;
		const expectedYield = put({
			type: OPEN_MODAL_ACTION,
			payload: {
				heading: i18nLabels.SUBSCRIPTION_ERROR,
				contentID: 'plusServiceSubscriptionFailed',
				props: {
					paragraph_1: i18nLabels.ORDER_STATUS_UPDATE_FAILED,
				}
			}
		});
		expect(actualYield).toEqual(expectedYield);
		expect(iterator.next().done).toBeTruthy();
	});
});

describe('deletePlusServiceSaga test failure in catch block', () => {
	const payload = {
		cancelSubsData : 'Active',
		orderId : 'DEBAAAAAIS'
	};
	const iterator = saga.deletePlusServiceSaga({payload});
	test('deletePlusServiceRequestFailure testing', () => {
		iterator.next();
		expect(
			iterator.throw('product not found').value).
			toEqual(put(deletePlusServiceRequestFailure('product not found')));
	});
});

describe('deactivateGhostOrderSaga saga success caes in try block', () => {
	const payload = {
		deactivateGhostData : 'Active',
		rxmc : '0000XT'
	};

	const iterator = saga.deactivateGhostOrderSaga({payload});
	test('jwtToken testing', () => {

		const actualToken = iterator.next().value;
		const expectedToken = call(_getJwtToken);
		expect(actualToken).toEqual(expectedToken);
	});
	test('cancelOrDeactivateSubscription testing', () => {
		const token = '8ac7a49f71aabf0e0171ba97acb923d2';
		const expectedYield = call(cancelOrDeactivateSubscription, 'Active', token, '0000XT');
		const actualYield = iterator.next(token).value;
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('deactivateGhostOrderSaga test failure saga in try block', () => {
	const payload = {
		deactivateGhostData : {
			'Status' : 'Active',
			'rxmc': 'rxmc',
			'orderId' : ''
		},
		orderId : 'DEBAAAAAIS'
	};
	const iterator = saga.deactivateGhostOrderSaga({payload});
	const token = '8ac7a49f71aabf0e0171ba97acb923d2';
	const data ={
		'Status Code' : 201,
		'error' : 'error'
	};
	iterator.next();
	iterator.next(token);
	test('ghostOrdersDeactivateFailure testing in else block', () => {
		const actualYield = iterator.next({data}).value;
		const expectedYield = put(ghostOrdersDeactivateFailure('error'));
		expect(actualYield).toEqual(expectedYield);
	});
	test('OPEN_MODAL_ACTION in else part testing in else block', () => {
		const actualYield = iterator.next().value;
		const expectedYield = put({
			type: OPEN_MODAL_ACTION,
			payload: {
				heading: i18nLabels.SUBSCRIPTION_ERROR,
				contentID: 'deactivateGhostOrderFailureModal',
				props: {
					paragraph_1: data.message,
				}
			}
		});
		expect(actualYield).toEqual(expectedYield);
		expect(iterator.next().done).toBeTruthy();
	});
});

describe('deactivateGhostOrderSaga test failure in catch block', () => {
	const payload = {
		deactivateGhostData : 'Active',
		orderId : 'DEBAAAAAIS'
	};
	const iterator = saga.deactivateGhostOrderSaga({payload});
	test('ghostOrdersDeactivateFailure testing', () => {
		iterator.next();
		expect(
			iterator.throw('product not found').value).
			toEqual(put(ghostOrdersDeactivateFailure('product not found')));
	});
});

describe('postImageSaga saga ', () => {
	const payload = {
		name : 'name',
		dataUrl : 'https://fakeUrl.com'
	};
	const data = {
		token : '8ac7a49f71aabf0e0171ba97acb923d2'
	};
	const iterator = saga.postImageSaga({payload});
	test('getCsrfToken testing', () => {
		const actualYield = iterator.next().value;
		const expectedYield = call(getCsrfToken);
		expect(actualYield).toEqual(expectedYield);
	});
	test('postImageRequestSuccess testing', () => {
		const result = 'result';
		iterator.next({data});
		iterator.next();
		const actualYield = iterator.next(result).value;
		const expectedYield = put(postImageRequestSuccess(result, payload.name, payload.dataUrl));
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('postImageSaga saga ', () => {
	const payload = {
		name : 'name',
		dataUrl : 'https://fakeUrl.com'
	};
	const data = {
		token : '8ac7a49f71aabf0e0171ba97acb923d2'
	};
	const iterator = saga.postImageSaga({payload});
	const result = 'result';
	 iterator.next();
	 iterator.next({data});
	 iterator.next();
	 iterator.next(result);
	 const err = {};
	test('watchOnProgress testing', () => {
		expect(
			iterator.throw(err).value).
			toEqual(put(postImageRequestFailure(err, payload.name)));
	});
});

describe('getInvoiceSaga saga success caes in try block', () => {
	const payload = {
		orderId : 'DEBAAAAAIS',
		invoiceId : 'a4Z4E0000002qCzUAI',
		index: '1'
	};
	const iterator = saga.getInvoiceSaga({payload});
	test('getOrdersReducer', () => {
		const actualResult = iterator.next().value;
		const expectedResult = select(saga.getOrdersReducer);
		expect(actualResult).toEqual(expectedResult);
	});
	test('getDictionary', () => {
		const invoices = {
			invoiceId : {
				customerInvoice : ''
			}
		};
		const actualResult = iterator.next(invoices).value;
		const expectedResult = select(saga.getDictionary);
		expect(actualResult).toEqual(expectedResult);
	});
	test('get invoices if block -> _getJwtToken', () => {
		const reponse= {
			invoices : {
				invoiceId : {
					customerInvoice : ''
				}
			}
		};
		const actualResult = iterator.next(reponse.invoices).value;
		const expectedResult = call(_getJwtToken);
		expect(actualResult).toEqual(expectedResult);
	});
	test('call invoices', () => {
		const token = '8ac7a49f71aabf0e0171ba97acb923d2';
		const actualResult = iterator.next(token).value;
		const expectedResult = call(getInvoice, token, payload.orderId, payload.invoiceId);
		expect(actualResult).toEqual(expectedResult);
	});
	test('call invoices', () => {
		const status = 200;
		const data = {
			customerInvoice : 'customerInvoice'
		};
		const actualResult = iterator.next({status, data}).value;
		const expectedResult = put(downloadInvoiceRequestSuccess(data, payload.invoiceId));
		expect(actualResult).toEqual(expectedResult);
	});
});

describe('getInvoiceSaga test failure saga in try block -> else block', () => {
	const payload = {
		orderId : 'DEBAAAAAIS',
		invoiceId : 'a4Z4E0000002qCzUAI',
		index: '1'
	};
	const iterator = saga.getInvoiceSaga({payload});
	const token = '8ac7a49f71aabf0e0171ba97acb923d2';
	const data ={
		'Status' : 201,
		'error' : 'error'
	};
	const reponse= {
		invoices : {
			invoiceId : {
				customerInvoice : ''
			}
		}
	};
	iterator.next();
	iterator.next(reponse.invoices).value;
	iterator.next(token);
	test('call invoices', () => {
		const token = '8ac7a49f71aabf0e0171ba97acb923d2';
		const actualResult = iterator.next(token).value;
		const expectedResult = call(getInvoice, token, payload.orderId, payload.invoiceId);
		expect(actualResult).toEqual(expectedResult);
	});
	test('downloadInvoiceRequestFailure testing in try -> else block', () => {
		const actualYield = iterator.next({data}).value;
		const expectedYield = put(downloadInvoiceRequestFailure('error fetching invoice', payload.invoiceId));
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('getInvoiceSaga test failure in catch block', () => {
	const payload = {
		orderId : 'DEBAAAAAIS',
		invoiceId : 'a4Z4E0000002qCzUAI',
		index: '1'
	};
	const iterator = saga.getInvoiceSaga({payload});
	const reponse= {
		invoices : {
			invoiceId : {
				customerInvoice : ''
			}
		}
	};
	iterator.next();
	iterator.next(reponse.invoices).value;
	test('downloadInvoiceRequestFailure testing', () => {
		iterator.next();
		expect(
			iterator.throw('error fetching invoice').value).
			toEqual(put(downloadInvoiceRequestFailure('error fetching invoice', payload.invoiceId)));
	});
});

describe('watchOnProgress saga ', () => {
	const channel = 'channel';
	const name = 'name';
	const iterator = saga.watchOnProgress(channel, name);
	test('get channel', () => {
		const actualResult = iterator.next().value;
		const expectedResult = take(channel);
		expect(actualResult).toEqual(expectedResult);
	});
	test('put postImageProgressUpdate testing', () => {
		const data = undefined;
		const actualResult = iterator.next().value;
		const expectedResult = put(postImageProgressUpdate(data, name));
		expect(actualResult).toEqual(expectedResult);
	});
});

describe('ordersSaga saga takeEvery calls', () => {
	const iterator = ordersSaga();
	test('get ordersSaga -> POST_IMAGE_REQUEST', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeEvery(POST_IMAGE_REQUEST, saga.postImageSaga);
		expect(actualToken).toEqual(expectedToken);
	});
	test('get ordersSaga -> DOWNLOAD_INVOICE_REQUEST', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeEvery(DOWNLOAD_INVOICE_REQUEST, saga.getInvoiceSaga);
		expect(actualToken).toEqual(expectedToken);
	});
	test('get ordersSaga -> DEACTIVATE_PLUS_SERVICE_REQUEST', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeEvery(DEACTIVATE_PLUS_SERVICE_REQUEST, saga.deactivatePlusServiceSaga);
		expect(actualToken).toEqual(expectedToken);
	});
	test('get ordersSaga -> DELETE_PLUS_SERVICE_REQUEST', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeEvery(DELETE_PLUS_SERVICE_REQUEST, saga.deletePlusServiceSaga);
		expect(actualToken).toEqual(expectedToken);
	});
	test('get ordersSaga -> UPDATE_PLUS_SERVICE_REQUEST', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeEvery(UPDATE_PLUS_SERVICE_REQUEST, saga.updatePlusServiceSaga);
		expect(actualToken).toEqual(expectedToken);
	});
	test('get ordersSaga -> REACTIVATE_PLUS_SERVICE_REQUEST', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeEvery(REACTIVATE_PLUS_SERVICE_REQUEST, saga.reactivatePlusServiceSaga);
		expect(actualToken).toEqual(expectedToken);
	});
	test('get ordersSaga -> REACTIVATE_PLUS_SERVICE_REQUEST_SUCCESS', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeEvery(REACTIVATE_PLUS_SERVICE_REQUEST_SUCCESS, saga.reactivatePlusServiceSuccessSaga);
		expect(actualToken).toEqual(expectedToken);
	});
	test('get ordersSaga -> REACTIVATE_PLUS_SERVICE_REQUEST_FAILURE', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeEvery(REACTIVATE_PLUS_SERVICE_REQUEST_FAILURE, saga.reactivatePlusServiceFailureSaga);
		expect(actualToken).toEqual(expectedToken);
	});
	test('get ordersSaga -> UPDATE_PLUS_SERVICE_PAYMENT_REQUEST', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeEvery(UPDATE_PLUS_SERVICE_PAYMENT_REQUEST, saga.updatePlusServicePaymentSaga);
		expect(actualToken).toEqual(expectedToken);
	});
	test('get ordersSaga -> GHOST_ORDERS_DEACTIVATE', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeEvery(GHOST_ORDERS_DEACTIVATE, saga.deactivateGhostOrderSaga);
		expect(actualToken).toEqual(expectedToken);
	});
});

describe('reactivatePlusServiceSaga saga ', () => {
	const payload = {};
	const iterator = saga.reactivatePlusServiceSaga({payload});
	test('get reactivatePlusServiceSaga', () => {
		const actualToken = iterator.next().value;
		const expectedToken =  call(
			sagaDataHandling,
			Mutation,
			buildReactivatePlusServiceSchema(payload),
			reactivatePlusServiceRequestSuccess,
			reactivatePlusServiceRequestFailure
		);
		expect(actualToken).toEqual(expectedToken);
	});
});
describe('reactivatePlusServiceSuccessSaga saga ', () => {
	const iterator = saga.reactivatePlusServiceSuccessSaga();
	test('get reactivatePlusServiceSuccessSaga', () => {
		const actualToken = iterator.next().value;
		const expectedToken =  select(saga.getOrdersReducer);
		expect(actualToken).toEqual(expectedToken);
	});
	test('get reactivatePlusServiceSuccessSaga', () => {
		const reactivateDeliveryDate = 'reactivateDeliveryDate';
		const actualToken = iterator.next(reactivateDeliveryDate).value;
		const expectedYield = put({
			type: OPEN_MODAL_ACTION,
			payload: {
				heading: i18nLabels.PLUS_SERVICE_REACTIVATED,
				contentID: 'plusServiceUpdatedConfirmationModal',
				props: {
					paragraph_1: i18nLabels.PLUS_SERVICE_SUCCESSFULLY_ACTIVATED,
					paragraph_2: i18nLabels.SUPPLY_PERIOD_STARTS_AT_X,
					reactivateDeliveryDate: undefined
				}
			}
		});
		expect(actualToken).toEqual(expectedYield);
		expect(iterator.next().done).toBeFalsy();
	});
});
describe('reactivatePlusServiceFailureSaga saga ', () => {
	const iterator = saga.reactivatePlusServiceFailureSaga();
	test('get reactivatePlusServiceFailureSaga', () => {
		const actualToken = iterator.next().value;
		const expectedYield = put({
			type: OPEN_MODAL_ACTION,
			payload: {
				heading: i18nLabels.PLUS_SERVICE_REACTIVATION_FAILED,
				contentID: 'plusServiceUpdatedConfirmationModal',
				props: {
					paragraph_1: i18nLabels.PLUS_SERVICE_REACTIVATION_FAILED_MESSAGE
				}
			}
		});
		expect(actualToken).toEqual(expectedYield);
		expect(iterator.next().done).toBeTruthy();
	});
});

describe('updatePlusServiceSaga saga ', () => {
	const payload = {};
	const iterator = saga.updatePlusServiceSaga({payload});
	test('get updatePlusServiceSaga', () => {
		const actualToken = iterator.next().value;
		const expectedToken =  put(updatePlusServiceRequestSuccess(payload));
		expect(actualToken).toEqual(expectedToken);
	});
});

describe('updatePlusServicePaymentSaga saga ', () => {
	const payload = {};
	const iterator = saga.updatePlusServicePaymentSaga({payload});
	test('get updatePlusServicePaymentSaga', () => {
		const actualToken = iterator.next().value;
		const expectedToken =  put(updatePlusServicePaymentRequestSuccess(payload));
		expect(actualToken).toEqual(expectedToken);
	});
});