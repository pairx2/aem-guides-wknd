import {call, takeLatest} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../../api/graphql.config';
import {buildSetUnitMeasurementSchema} from '../../../../../modules/MyAccount/schemas/set_measurement.schema';
import {SET_MEASURMENT_REQUEST, setMeasurmentRequestSuccess, setMeasurmentRequestFailure} from '../../../../../modules/MyAccount/redux/actions/set_measurment.action';
import {_getCartId} from '../../../../../modules/Cart/redux/sagas/cart.saga';
import setMeasurmentUnitSagas from '../../../../../modules/MyAccount/redux/sagas/set_measurment.saga';
import * as saga from '../../../../../modules/MyAccount/redux/sagas/set_measurment.saga';
jest.mock('../../../../../utils/endpointUrl.js');
jest.mock('../../../../../utils/siteData.js');

describe('setMeasurmentUnitSaga saga', () => {
	const payload = {};
	const iterator = saga.setMeasurmentUnitSaga({payload});
	test('call _getCartId', () => {
		const actualYield = iterator.next().value;
		const expectedYield = call(_getCartId, false, false, true);
		expect(actualYield).toEqual(expectedYield);
	});
	test('call sagaDataHandling', () => {
		const cartId = '1234';
		const actualYield = iterator.next({cartId}).value;
		const expectedYield =  call(
			sagaDataHandling,
			Mutation,
			buildSetUnitMeasurementSchema(cartId, payload),
			setMeasurmentRequestSuccess,
			setMeasurmentRequestFailure
		);
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('setMeasurmentUnitSagas saga ', () => {
	const iterator = setMeasurmentUnitSagas();
	test('get setMeasurmentUnitSagas -> setMeasurmentUnitSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeLatest(SET_MEASURMENT_REQUEST, saga.setMeasurmentUnitSaga);
		expect(actualYield).toEqual(expectedYield);
	});
});