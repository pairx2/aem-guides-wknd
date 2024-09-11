import {call, put, takeLeading, takeEvery} from 'redux-saga/effects';
import {
	CONFIRM_ACCOUNT_REQUEST, confirmAccountRequestFailure, confirmAccountRequestSuccess,
	E_APPLY_REQUEST,
	E_APPLY_REQUEST_FAILURE,
	eApplyRequestFailure,
	eApplyRequestSuccess,
	REGISTRATION_USER_REQUEST,
	REGISTRATION_USER_REQUEST_FAILURE,
	registrationUserRequestFailure,
	registrationUserRequestSuccess,
	confirmationEmailTriggerRequestSuccess,
	CONFIRMATION_EMAIL_TRIGGER_REQUEST,
	confirmationEmailTriggerRequestFailure
} from '../actions/registration.action';
import {getCsrfToken, postEApply, postRegistration} from '../../api/registration.api';
import {OPEN_MODAL_ACTION} from '../../../Modal/redux/actions/index';
import {i18nLabels} from '../../../../utils/translationUtils';
import {sagaDataHandling} from '../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../api/graphql.config';
import {buildConfirmAccountSchema} from '../schemas/confirm_account.schema';
import {setCookie} from '../../../../utils/cookieUtils';
import {getUrlParameter} from '../../../../utils/getParams';
import {buildConfirmationEmailTriggerSchema} from '../schemas/confirmation_email_trigger.schema';

export function* registrationSaga({payload: {key, id}}) {
	yield call(
		sagaDataHandling,
		Mutation,
		buildConfirmAccountSchema(id, key),
		confirmAccountRequestSuccess,
		confirmAccountRequestFailure
	);
}
export function* registrationUserRequestSaga({payload, redirectLink, isCheckout}) {
	try {
		const {data} = yield call(postRegistration, payload);
		if (data.Code === 200) {
			yield put(registrationUserRequestSuccess(data));
			localStorage.setItem('userName',payload.username);
			localStorage.setItem('isSocial',payload.socialLogin);
			if (isCheckout) {
				setCookie('registrationCheckoutFlag', payload?.email, 7);
				setCookie('registrationRedirectLink', getUrlParameter('redirectTo'), 7);
			}

			window.location = redirectLink + '?registrationStatus=true' + '&email='+payload?.email;
		} else {
			yield put(registrationUserRequestFailure(data));
		}

	} catch ({response}) {
		yield put(registrationUserRequestFailure(response));
	}
}
export function* eApplyReqSaga({payload, redirectLink}) {
	try {
		const {data: token} = yield call(getCsrfToken);
		const {data} = yield call(postEApply, payload, token.token);
		if (data.Code === 200) {
			yield put(eApplyRequestSuccess(data));
			window.location = redirectLink;
		} else {
			yield put(eApplyRequestFailure(data));
		}
	} catch ({response}) {
		yield put(eApplyRequestFailure(response));
	}
}
export function* eApplyRequestSaga({error}) {
	if (!error) {
		return;
	}
	let errorMessage = error['Error Message'] || error?.data?.['Error Message'] || error?.['Message'] ;
	if (!errorMessage) {
		if (error?.data && error.data?.[0]) {
			errorMessage = error.data[0].description;
			if (errorMessage?.indexOf('objecthasmissingrequiredproperties') > -1) {
				errorMessage = i18nLabels.MISSING_FIELDS;
			}
		}
	}
	if (error?.event?.token) {
		errorMessage = i18nLabels.RECAPTCHA_VALIDATION_ERROR;
	}
	const errorModalProps = {
		errorMessage: errorMessage
	};
	
	yield put({
		type: OPEN_MODAL_ACTION,
		payload: {
			contentID: 'registrationErrorModal',
			props: errorModalProps
		}
	});
}

export function* confirmationEmailTriggerSaga({email}) {
	yield call(
		sagaDataHandling,
		Mutation,
		buildConfirmationEmailTriggerSchema(email),
		confirmationEmailTriggerRequestSuccess,
		confirmationEmailTriggerRequestFailure
	);
}

export default function* registrationSagas() {
	yield takeEvery(CONFIRM_ACCOUNT_REQUEST, registrationSaga);
	yield takeLeading(REGISTRATION_USER_REQUEST, registrationUserRequestSaga);
	yield takeEvery(E_APPLY_REQUEST, eApplyReqSaga);
	yield takeEvery([REGISTRATION_USER_REQUEST_FAILURE, E_APPLY_REQUEST_FAILURE], eApplyRequestSaga);
	yield takeEvery(CONFIRMATION_EMAIL_TRIGGER_REQUEST, confirmationEmailTriggerSaga);
}