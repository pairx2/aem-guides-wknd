import {call, put, takeEvery, select} from 'redux-saga/effects';
import {
	VERIFY_ADDRESS_REQUEST,
	verifyAddressRequestFailure,
	verifyAddressRequestSuccess
} from '../actions/verify_address.actions';
import {
	ADDRESS_CHECK_CORRECTED,
	ADDRESS_CHECK_ERROR,
	ADDRESS_CHECK_SUCCESS,
	checkAddress
} from '../../api/addressVerification.api';
import {OPEN_MODAL_ACTION} from '../../../Modal/redux/actions';
import {i18nLabels} from '../../../../utils/translationUtils';
import {USER_SALUTATION, UNDEFINED} from '../../../../utils/enums';
import {isRxCheckoutPageType} from '../../../../utils/pageTypeUtils';

export const getDictionary = state => state.translationModuleReducer.translationReducer.dictionary;

export function* verifyAddressSaga({payload}) {
	const dictionary = yield select(getDictionary);
	const user = {
		...payload.user,
	};
	const AddressStatus = {
		...payload.AddressStatus,
	};
	const shipping = typeof AddressStatus?.isShipping === UNDEFINED ? true : AddressStatus?.isShipping;
	const billing = typeof AddressStatus?.isBilling === UNDEFINED ? true : AddressStatus?.isBilling;

	switch(payload.user.salutation) {
		case dictionary[i18nLabels.SALUTATION_MAN_LABEL]?.toUpperCase():
			user.salutation = USER_SALUTATION.MAN_LABEL;
			break;
		case dictionary[i18nLabels.SALUTATION_WOMAN_LABEL]?.toUpperCase():
			user.salutation = USER_SALUTATION.WOMAN_LABEL;
			break;
		case dictionary[i18nLabels.SALUTATION_OTHER_LABEL]?.toUpperCase():
			user.salutation = '';
			break;
		default:
			user.salutation = undefined;
	}
	const {result, allowSave, addressAllowPM, address, message, rssResultCode, isBlacklisted, isVerified} = yield call(
		checkAddress,
		payload.address,
		user,
		payload.billingAddress,
		payload.shippingAddress,
		shipping,
		billing,
		payload.isOrderUpdate
	);
	switch (result) {
		case ADDRESS_CHECK_SUCCESS:
			yield put(verifyAddressRequestSuccess({
				address: address,
				section: payload.section,
				status: ADDRESS_CHECK_SUCCESS,
				addressAllowPM: addressAllowPM,
				rssResultCode: rssResultCode,
				isBlacklisted: isBlacklisted,
				isVerified: isVerified,
				allowSave: allowSave
			}));
			break;
		case ADDRESS_CHECK_CORRECTED:
			yield put({
				type: OPEN_MODAL_ACTION,
				payload: {
					heading: i18nLabels.DID_YOU_MEAN_THIS_ADDRESS,
					contentID: 'addressVerification',
					props: {
						address: address,
						section: payload.section,
						message: message,
						addressAllowPM: addressAllowPM,
						rssResultCode: rssResultCode,
						isBlacklisted: isBlacklisted,
						isVerified: isVerified
					},
					canModalClose: false
				}
			});
			break;
		case ADDRESS_CHECK_ERROR:
		default:
			yield put(verifyAddressRequestFailure({
				address: address,
				section: payload.section,
				status: ADDRESS_CHECK_ERROR,
				error: rssResultCode,
				message: message,
				allowSave: allowSave
			}));
			if(!isRxCheckoutPageType()){
				yield put({
					type: OPEN_MODAL_ACTION,
					payload: {
						heading: i18nLabels.GENERAL_ERROR,
						contentID: 'generalErrorModal',
						props: {
							errorTitle: i18nLabels.ADDRESS_CHECK_ERROR,
							errorMessage: message
						}
					}
				});
			}
			break;
	}
}
export default function* verifyAddressSagas() {
	yield takeEvery(VERIFY_ADDRESS_REQUEST, verifyAddressSaga);
}
