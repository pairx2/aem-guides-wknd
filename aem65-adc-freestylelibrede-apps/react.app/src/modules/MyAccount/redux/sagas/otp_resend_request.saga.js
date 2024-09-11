import {call, takeLeading} from 'redux-saga/effects';
import {
	OTP_RESEND_REQUEST,
	otpResendRequestSuccess,
	otpResendRequestFailure
} from '../actions/otp_confirm_request.action';
import {sagaDataHandling} from '../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../api/graphql.config';
import {OtpResendRequestSchema} from '../../schemas/otp_resend_request.schema';

export function* OtpResendRequestSaga() {
	yield call(
		sagaDataHandling,
		Mutation,
		OtpResendRequestSchema(),
		otpResendRequestSuccess,
		otpResendRequestFailure
	);
}

export default function* OtpResendRequestSagas() {
	yield takeLeading(OTP_RESEND_REQUEST, OtpResendRequestSaga);
}