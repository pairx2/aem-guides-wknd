import {call, put, takeLeading} from 'redux-saga/effects';
import {
	GET_SICKFUNDS_REQUEST,
	getSickfundsRequestSuccess,
	getSickfundsRequestFailure,
} from '../../../../../modules/SickFund/redux/actions/get_sickfunds.action';
import {getSickfundList} from '../../../../../modules/SickFund/api/sickfund.service';
import {_getJwtToken} from '../../../../../modules/Cart/redux/sagas/cart.saga';
import * as saga from '../../../../../modules/SickFund/redux/sagas/get_sickfund.saga';
import getSickFundSagas from '../../../../../modules/SickFund/redux/sagas/get_sickfund.saga';
jest.mock('../../../../../utils/endpointUrl.js');

describe('getSickFundSaga saga in try block', () => {
	const iterator = saga.getSickFundSaga();
	test('call jwtToken', () => {
		const actualYield = iterator.next().value;
		const expectedYield = call(_getJwtToken);
		expect(actualYield).toEqual(expectedYield);
	});
	test('call getSickfundList', () => {
		const token = '8ac7a49f71aabf0e0171ba97acb923d2';
		const actualYield = iterator.next(token).value;
		const expectedYield = call(getSickfundList, token);
		expect(actualYield).toEqual(expectedYield);
	});
	test('put getSickfundsRequestSuccess', () => {
		const data = {};
		const actualYield = iterator.next({data}).value;
		const expectedYield = put(getSickfundsRequestSuccess(data));
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('getSickFundSaga saga in catch block', () => {
	const iterator = saga.getSickFundSaga();
	const token = '8ac7a49f71aabf0e0171ba97acb923d2';
	const e = {};
	test('getSickFundSaga testing', () => {
		iterator.next();
		iterator.next(token);
		expect(
			iterator.throw(e).value).
			toEqual(put(getSickfundsRequestFailure(e)));
	});
});
describe('getSickFundSagas saga ', () => {
	const iterator = getSickFundSagas();
	test('get getSickFundSagas -> getSickFundSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeLeading(GET_SICKFUNDS_REQUEST, saga.getSickFundSaga);
		expect(actualYield).toEqual(expectedYield);
	});
});