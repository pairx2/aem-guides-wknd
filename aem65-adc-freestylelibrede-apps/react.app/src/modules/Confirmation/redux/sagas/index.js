import {all} from 'redux-saga/effects';
import PlaceOrderRequestSagas from './place_order.saga';

export default function* OrderIdRequestModuleSaga() {
	yield all([
		PlaceOrderRequestSagas()
	]);
}