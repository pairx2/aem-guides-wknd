import {call, takeLatest, takeEvery} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../utils/sagaDataHandling';
import {Query} from '../../../../api/graphql.config';
import {buildGetCustomerSchema} from '../../schemas/get_customer.schema';
import {GET_CUSTOMER_REQUEST, getCustomerRequestFailure, getCustomerRequestSuccess, GET_CUSTOMER_REQUEST_SUCCESS} from '../actions/customer.action';
import {_getJwtToken} from '../../../Cart/redux/sagas/cart.saga';
import {isRxCheckoutPageType} from '../../../../utils/pageTypeUtils';
import {getServiceEndPoint} from '../../../../utils/endpointUrl';

export function* getCustomerSaga() {
	const token = yield call(_getJwtToken);
	if(token) {
		yield call(
			sagaDataHandling,
			Query,
			buildGetCustomerSchema(),
			getCustomerRequestSuccess,
			getCustomerRequestFailure
		);
	}
}
export function* getCustomerRequestSuccessSaga({payload}) {
	const customer = payload.adcCustomerDetails?.customer || payload.adcCustomerUpdate?.customer;
	if(customer.has_active_reimbursement && isRxCheckoutPageType()) window.location.href = getServiceEndPoint('pdp.product.url');
	yield;
}
export default function* getCustomerSagas() {
	yield takeLatest(GET_CUSTOMER_REQUEST, getCustomerSaga);
	yield takeEvery(GET_CUSTOMER_REQUEST_SUCCESS, getCustomerRequestSuccessSaga);
}