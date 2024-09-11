import {put, call, takeLatest} from 'redux-saga/effects';
import {
	GET_AVAILABLE_PAYMENT_METHODS_REQUEST, getAvailablePaymentMethodsRequestFailure,
	getAvailablePaymentMethodsRequestSuccess
} from '../actions/get_available_payment_methods.action';
import {getAvailablePaymentMethods} from '../../api/payment.api';
import {_getJwtToken} from '../../../Cart/redux/sagas/cart.saga';
import {OPEN_MODAL_ACTION} from '../../../Modal/redux/actions';
import {i18nLabels} from '../../../../utils/translationUtils';
import {UNDEFINED} from '../../../../utils/enums';

export function* getAvailablePaymentMethodsSaga({payload}) {
	const AddressStatus = {
		...payload.AddressStatus,
	};
	const shipping = typeof AddressStatus?.isShipping === UNDEFINED ? false : AddressStatus?.isShipping;

	try {
		const jwtToken = yield call(_getJwtToken);
		const {methods, resultCode, communicationToken, WebshopMessage, riskcheckAddress, allowSave, blackListed, isVerifed, isAllowSaveCorrected} = yield call(getAvailablePaymentMethods,
			payload.orderType,
			payload.user,
			payload.billingAddress,
			payload.shippingAddress,
			payload.products,
			shipping,
			jwtToken
		);
		if(methods && methods.length > 0 && allowSave && !isAllowSaveCorrected) {
			yield put(getAvailablePaymentMethodsRequestSuccess({
				methods: methods,
				resultCode: resultCode,
				communicationToken: communicationToken,
				riskcheckAddress: riskcheckAddress,
				allowSave: allowSave,
				isBlacklisted: blackListed,
				isVerified: isVerifed
			}));
		} else if (methods && methods.length > 0 && isAllowSaveCorrected) {
			yield put({
				type: OPEN_MODAL_ACTION,
				payload: {
					heading: i18nLabels.DID_YOU_MEAN_THIS_ADDRESS,
					contentID: 'addressVerification',
					props: {
						methods: methods,
						address: riskcheckAddress,
						rssResultCode: resultCode,
						communicationToken: communicationToken,
						isBlacklisted: blackListed,
						isVerified: isVerifed,
						isOrderUpdate: payload.isOrderUpdate
					},
					canModalClose: false
				}
			});
		} else {
			yield put(getAvailablePaymentMethodsRequestFailure({
				error: resultCode,
				communicationToken: communicationToken,
				allowSave: allowSave,
				webShopMessage: WebshopMessage
			}));
		}
	} catch(e) {
		yield put(getAvailablePaymentMethodsRequestFailure(e));
	}
}

export default function* availablePaymentMethodsSaga() {
	yield takeLatest(GET_AVAILABLE_PAYMENT_METHODS_REQUEST, getAvailablePaymentMethodsSaga);
}