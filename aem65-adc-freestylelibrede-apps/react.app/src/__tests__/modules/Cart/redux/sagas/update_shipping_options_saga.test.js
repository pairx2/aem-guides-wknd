import {call, takeLatest} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../../api/graphql.config';
import {buildUpdateShippingOptionsSchema} from '../../../../../modules/Cart/schemas/update_shipping_options_schema';
import {UPDATE_SHIPPING_OPTIONS_REQUEST} from '../../../../../modules/Cart/redux/actions/shipping_options_action';
import {_getCartId} from '../../../../../modules/Cart/redux/sagas/cart.saga';
import {
	getCustomerCartRequestFailure,
	getCustomerCartRequestSuccess
} from '../../../../../modules/Cart/redux/actions/cart.action';
import {isRxCheckoutPageType} from '../../../../../utils/pageTypeUtils';
import updateShippingOptionsSagas from '../../../../../modules/Cart/redux/sagas/update_shipping_options.saga';
import * as saga from '../../../../../modules/Cart/redux/sagas/update_shipping_options.saga';
jest.mock('../../../../../utils/endpointUrl.js');
jest.mock('../../../../../utils/pageTypeUtils');

describe('updateShippingOptionsSaga saga ', () => {
	const payload = {
		carrierCode : 'carrierCode',
		methodCode : 'methodCode'
	};
	const iterator = saga.updateShippingOptionsSaga({payload});
	test('call _getCartId testing', () => {
		const actualToken = iterator.next().value;
		const expectedToken = call(_getCartId);
		expect(actualToken).toEqual(expectedToken);
	});
	test('call sagaDataHandling testing', () => {
		const cartId = '1234';
		const actualToken = iterator.next({cartId}).value;
		const expectedToken = call(
			sagaDataHandling,
			Mutation,
			buildUpdateShippingOptionsSchema(cartId, payload.carrierCode, payload.methodCode),
			isRxCheckoutPageType() ? null : getCustomerCartRequestSuccess,
			getCustomerCartRequestFailure
		);
		expect(actualToken).toEqual(expectedToken);
	});
});
describe('updateShippingOptionsSagas saga ', () => {
	const iterator = updateShippingOptionsSagas();
	test('get updateShippingOptionsSagas -> updateShippingOptionsSaga', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeLatest(UPDATE_SHIPPING_OPTIONS_REQUEST, saga.updateShippingOptionsSaga);
		expect(actualToken).toEqual(expectedToken);
	});
});