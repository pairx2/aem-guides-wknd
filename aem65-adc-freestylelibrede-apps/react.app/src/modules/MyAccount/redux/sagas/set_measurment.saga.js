import {call, takeLatest} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../api/graphql.config';
import {buildSetUnitMeasurementSchema} from '../../schemas/set_measurement.schema';
import {SET_MEASURMENT_REQUEST, setMeasurmentRequestSuccess, setMeasurmentRequestFailure} from '../actions/set_measurment.action';
import {_getCartId} from '../../../Cart/redux/sagas/cart.saga';

export function* setMeasurmentUnitSaga({payload}) {
	const {cartId} = yield call(_getCartId, false, false, true);
	yield call(
		sagaDataHandling,
		Mutation,
		buildSetUnitMeasurementSchema(cartId, payload),
		setMeasurmentRequestSuccess,
		setMeasurmentRequestFailure
	);
}
export default function* setMeasurmentUnitSagas() {
	yield takeLatest(SET_MEASURMENT_REQUEST, setMeasurmentUnitSaga);
}