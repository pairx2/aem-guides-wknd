import {call, takeLatest} from 'redux-saga/effects';
import {
	OTP_CONFIRM_REQUEST,
	otpConfirmRequestSuccess,
	otpConfirmRequestFailure
} from '../actions/otp_confirm_request.action';
import {sagaDataHandling} from '../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../api/graphql.config';
import {OtpConfirmationRequestSchema} from '../../schemas/otp_confirm_request.schema';

export function* OtpConfirmRequestSaga({payload}) {
	yield call(
		sagaDataHandling,
		Mutation,
		OtpConfirmationRequestSchema(payload),
		otpConfirmRequestSuccess,
		otpConfirmRequestFailure
	);
}

export default function* OtpConfirmRequestSagas() {
	yield takeLatest(OTP_CONFIRM_REQUEST, OtpConfirmRequestSaga);
}