import {call, takeEvery} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../api/graphql.config';
import {
	getCustomerRequestFailure,
	getCustomerRequestSuccess,
	UPDATE_CUSTOMER_REQUEST, UPDATE_INSURANCE_REQUEST
} from '../actions/customer.action';
import {buildUpdateCustomerSchema} from '../../schemas/update_customer.schema';
import {buildUpdateInsuranceSchema} from '../../schemas/update_insurance.schema';
import {dottedToDashed} from '../../../../utils/dateUtils';

export function* updateCustomerSaga({payload}) {
	yield call(
		sagaDataHandling,
		Mutation,
		buildUpdateCustomerSchema({
			...payload,
			dob: dottedToDashed(payload.dob)
		}),
		getCustomerRequestSuccess,
		getCustomerRequestFailure
	);
}

export function* updateInsuranceRequest({payload}) {
	payload.dob = dottedToDashed(payload.dob);
	yield call(
		sagaDataHandling,
		Mutation,
		buildUpdateInsuranceSchema(payload),
		getCustomerRequestSuccess,
		getCustomerRequestFailure
	);
}

export default function* updateCustomerSagas() {
	yield takeEvery(UPDATE_CUSTOMER_REQUEST, updateCustomerSaga);
	yield takeEvery(UPDATE_INSURANCE_REQUEST, updateInsuranceRequest);
}
