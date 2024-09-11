import {put, call, takeLatest} from 'redux-saga/effects';
import {
	GET_AVAILABLE_PAYMENT_METHODS_REQUEST, getAvailablePaymentMethodsRequestFailure,
	getAvailablePaymentMethodsRequestSuccess
} from '../../../../../modules/Payment/redux/actions/get_available_payment_methods.action';
import {getAvailablePaymentMethods} from '../../../../../modules/Payment/api/payment.api';
import {_getJwtToken} from '../../../../../modules/Cart/redux/sagas/cart.saga';
import * as saga from '../../../../../modules/Payment/redux/sagas/get_available_payment_methods.saga';
import availablePaymentMethodsSaga from '../../../../../modules/Payment/redux/sagas/get_available_payment_methods.saga';
jest.mock('../../../../../utils/endpointUrl.js');


describe('getAvailablePaymentMethodsSaga saga', () => {
	const payload = {
		orderType : 'orderType',
		user : 'user',
		billingAddress : 'billingAddress',
		shippingAddress : 'shippingAddress',
		products : 'products',
		AddressStatus : 'AddressStatus',
		isOrderUpdate: false
	};
	const shipping = false;
	const token = '8ac7a49f71aabf0e0171ba97acb923d2';
	const iterator = saga.getAvailablePaymentMethodsSaga({payload});
	test('call _getJwtToken', () => {
		const actualYield = iterator.next().value;
		const expectedYield = call(_getJwtToken);
		expect(actualYield).toEqual(expectedYield);
	});
	test('call _getJwtToken', () => {
		const actualYield = iterator.next(token).value;
		const expectedYield = call(getAvailablePaymentMethods,
			payload.orderType,
			payload.user,
			payload.billingAddress,
			payload.shippingAddress,
			payload.products,
			shipping,
			token
		);
		expect(actualYield).toEqual(expectedYield);
	});
	test('put getAvailablePaymentMethodsRequestSuccess', () => {
		const methods = [1,2];
		const resultCode = 400;
		const communicationToken = 'communicationToken';
		const riskcheckAddress = 'riskcheckAddress';
		const allowSave = 'allowSave';
		const blackListed = false;
		const isVerifed = false;
		const actualYield = iterator.next({methods,communicationToken,allowSave,resultCode, blackListed, riskcheckAddress, isVerifed}).value;
		const expectedYield = put(getAvailablePaymentMethodsRequestSuccess({
			methods: methods,
			resultCode: resultCode,
			communicationToken: communicationToken,
			riskcheckAddress: riskcheckAddress,
			allowSave: allowSave,
			isBlacklisted: blackListed,
			isVerified: isVerifed
		}));
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('getAvailablePaymentMethodsSaga saga', () => {
	const payload = {
		orderType : 'orderType',
		user : 'user',
		billingAddress : 'billingAddress',
		shippingAddress : 'shippingAddress',
		products : 'products',
		AddressStatus : 'AddressStatus',
		isOrderUpdate: false
	};
	const token = '8ac7a49f71aabf0e0171ba97acb923d2';
	const iterator = saga.getAvailablePaymentMethodsSaga({payload});
	iterator.next();
	iterator.next(token);
	test('put getAvailablePaymentMethodsRequestFailure', () => {
		const resultCode = 400;
		const communicationToken = 'communicationToken';
		const allowSave = 'allowSave';
		const WebshopMessage = 'webShopMessage';
		const actualYield = iterator.next({communicationToken,allowSave,resultCode, WebshopMessage}).value;
		const expectedYield = put(getAvailablePaymentMethodsRequestFailure({
			error: resultCode,
			communicationToken: communicationToken,
			allowSave: allowSave,
			webShopMessage: WebshopMessage
		}));
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('getAvailablePaymentMethodsSaga saga in catch block', () => {
	const payload = {
		orderType : 'orderType',
		user : 'user',
		billingAddress : 'billingAddress',
		shippingAddress : 'shippingAddress',
		products : 'products',
		AddressStatus : 'AddressStatus'
	};
	const iterator = saga.getAvailablePaymentMethodsSaga({payload});
	const response = {
		code : 'error'
	};
	test('getAvailablePaymentMethodsRequestFailure testing', () => {
		iterator.next();
		expect(
			iterator.throw(response).value).
			toEqual(put(getAvailablePaymentMethodsRequestFailure(response)));
	});
});
describe('availablePaymentMethodsSaga saga ', () => {
	const iterator = availablePaymentMethodsSaga();
	test('get availablePaymentMethodsSaga -> getAvailablePaymentMethodsSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeLatest(GET_AVAILABLE_PAYMENT_METHODS_REQUEST, saga.getAvailablePaymentMethodsSaga);
		expect(actualYield).toEqual(expectedYield);
	});
});