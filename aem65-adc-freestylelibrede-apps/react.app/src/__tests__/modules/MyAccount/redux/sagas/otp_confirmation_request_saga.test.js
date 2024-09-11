import {call, takeLatest} from 'redux-saga/effects';
import {
	OTP_CONFIRM_REQUEST,
	otpConfirmRequestSuccess,
	otpConfirmRequestFailure
} from '../../../../../modules/MyAccount/redux/actions/otp_confirm_request.action';
import {sagaDataHandling} from '../../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../../api/graphql.config';
import {OtpConfirmationRequestSchema} from '../../../../../modules/MyAccount/schemas/otp_confirm_request.schema';
import OtpConfirmRequestSagas from '../../../../../modules/MyAccount/redux/sagas/otp_confimation_request.saga';
import * as saga from '../../../../../modules/MyAccount/redux/sagas/otp_confimation_request.saga';

jest.mock('../../../../../utils/endpointUrl.js');
describe('OtpConfirmRequestSagas', () => {
	const payload = {};
	const iterator = saga.OtpConfirmRequestSaga({payload});
	test('OtpConfirmRequestSaga testing', () => {
		const actualYield = iterator.next().value;
		const expectedYield = call(sagaDataHandling,
			Mutation,
			OtpConfirmationRequestSchema(payload),
			otpConfirmRequestSuccess,
			otpConfirmRequestFailure);
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('OtpConfirmRequestSagas saga ', () => {
	const iterator = OtpConfirmRequestSagas();
	test('get OtpConfirmRequestSagas', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeLatest(OTP_CONFIRM_REQUEST, saga.OtpConfirmRequestSaga);
		expect(actualToken).toEqual(expectedToken);
	});
});
