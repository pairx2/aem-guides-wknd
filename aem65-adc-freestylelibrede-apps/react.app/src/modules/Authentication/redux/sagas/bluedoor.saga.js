import {call, takeLatest} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../api/graphql.config';
import {buildBluedoorCustomerSchema} from '../schemas/bluedoor.schema';
import {GET_BLUEDOOR_CUSTOMER_REQUEST, getBluedoorCustomerRequestSuccess, getBluedoorCustomerRequestFailure} from '../actions/bluedoor.action';

export function* bluedoorCustomerSaga({payload: {rxmc, health_insurance_number}}) {
	yield call(
		sagaDataHandling,
		Mutation,
		buildBluedoorCustomerSchema(rxmc, health_insurance_number),
		getBluedoorCustomerRequestSuccess,
		getBluedoorCustomerRequestFailure
	);
}

export default function* bluedoorCustomerSagas() {
	yield takeLatest(GET_BLUEDOOR_CUSTOMER_REQUEST, bluedoorCustomerSaga);
}
