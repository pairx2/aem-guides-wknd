import {call, takeLeading} from 'redux-saga/effects';
import {
	OTP_RESEND_REQUEST,
	otpResendRequestSuccess,
	otpResendRequestFailure
} from '../../../../../modules/MyAccount/redux/actions/otp_confirm_request.action';
import {sagaDataHandling} from '../../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../../api/graphql.config';
import {OtpResendRequestSchema} from '../../../../../modules/MyAccount/schemas/otp_resend_request.schema';
import * as saga from '../../../../../modules/MyAccount/redux/sagas/otp_resend_request.saga';
import OtpResendRequestSagas from '../../../../../modules/MyAccount/redux/sagas/otp_resend_request.saga';
jest.mock('../../../../../utils/endpointUrl.js');


describe('OtpResendRequestSaga saga ', () => {
	const iterator = saga.OtpResendRequestSaga();
	test('call sagaDataHandling', () => {
		const actualToken = iterator.next().value;
		const expectedToken =  call(sagaDataHandling,
			Mutation,
			OtpResendRequestSchema(),
			otpResendRequestSuccess,
			otpResendRequestFailure);
		expect(actualToken).toEqual(expectedToken);
	});
});

describe('OtpResendRequestSagas saga ', () => {
	const iterator = OtpResendRequestSagas();
	test('get OtpResendRequestSagas -> OtpResendRequestSaga', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeLeading(OTP_RESEND_REQUEST, saga.OtpResendRequestSaga);
		expect(actualToken).toEqual(expectedToken);
	});
});

