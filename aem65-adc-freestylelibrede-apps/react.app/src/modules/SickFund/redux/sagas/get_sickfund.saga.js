import {call, put, takeLeading} from 'redux-saga/effects';
import {
	GET_SICKFUNDS_REQUEST,
	getSickfundsRequestSuccess,
	getSickfundsRequestFailure,
} from '../actions/get_sickfunds.action';
import {getSickfundList} from '../../api/sickfund.service';
import {_getJwtToken} from '../../../Cart/redux/sagas/cart.saga';

export function* getSickFundSaga() {
	const jwtToken = yield call(_getJwtToken);
	try{
		const {data} = yield call(getSickfundList, jwtToken);
		if(data) {
			yield put(getSickfundsRequestSuccess(data));
		}
	}catch(e){
		yield put(getSickfundsRequestFailure(e));
	}
}

export default function* getSickFundSagas() {
	yield takeLeading(GET_SICKFUNDS_REQUEST, getSickFundSaga);
}