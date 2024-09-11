import {call, put, takeLatest} from 'redux-saga/effects';
import {Query} from '../../../../api/graphql.config';
import {getAvailablePaymentMethodsGraphqlSchema} from '../../schemas/adc_get_available_paymentmethods_graphql_schema'
import { getAvailablePaymentMethodsGraphqlRequestSuccess, getAvailablePaymentMethodsGraphqlRequestFailure, GET_AVAILABLE_PAYMENT_METHODS_GRAPHQL_REQUEST} from '../actions/get_available_payment_methods_graphql.action'
import { OPEN_MODAL_ACTION } from '../../../Modal/redux/actions';
import {_getJwtToken} from '../sagas/cart.saga';
import { UNDEFINED } from '../../../../utils/enums';

export function* getAvailablePaymentMethodsGraphqlSaga(payload) {
	const shipping = (typeof payload.payload.AddressStatus.isShipping === UNDEFINED ? false : payload.payload.AddressStatus.isShipping) 
	const jwtToken = yield call(_getJwtToken);
	try {
		const {data} = yield call(Query, getAvailablePaymentMethodsGraphqlSchema(payload.payload.cartId, payload.payload.ssid), jwtToken);
		const adcGetPaymentsData = data?.adcGetAvailablePaymentMethods
		if(adcGetPaymentsData.available_payment_methods && 
			adcGetPaymentsData.available_payment_methods.length>0 &&
			!adcGetPaymentsData.allow_save_corrected
			){
			yield put(getAvailablePaymentMethodsGraphqlRequestSuccess(data))
		}
		else if(adcGetPaymentsData.available_payment_methods && 
			adcGetPaymentsData.available_payment_methods.length>0 &&
			adcGetPaymentsData.allow_save_corrected
			){
				yield put({
					type: OPEN_MODAL_ACTION,
					payload: {
						heading: i18nLabels.DID_YOU_MEAN_THIS_ADDRESS,
						contentID: 'addressVerification',
						props: {
							methods: adcGetPaymentsData.available_payment_methods,
							address: shipping ? adcGetPaymentsData.delivery_address_validation : adcGetPaymentsData.billing_address_validation ,
							rssResultCode: adcGetPaymentsData.arvato_code,
							communicationToken: adcGetPaymentsData.communication_token,
							isBlacklisted: adcGetPaymentsData.is_blacklisted,
							isVerified: adcGetPaymentsData.is_verified,
							isOrderUpdate: payload.isOrderUpdate
						},
						canModalClose: false
					}
				});
		}
		else{
			yield put(getAvailablePaymentMethodsGraphqlRequestFailure(data));
		}
	} 
	catch (error) {
		yield put(getAvailablePaymentMethodsGraphqlRequestFailure(error))
	}

		
};


export default function* getAvailablePaymentMethodsGraphqlSagas() {
	yield takeLatest(GET_AVAILABLE_PAYMENT_METHODS_GRAPHQL_REQUEST, getAvailablePaymentMethodsGraphqlSaga);
}
