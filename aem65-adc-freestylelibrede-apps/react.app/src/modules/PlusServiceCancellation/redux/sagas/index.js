import {all} from 'redux-saga/effects';
import plusServiceCancellationSagas from "./plus_service_cancellation.saga";

export default function* myPlusServiceCancellationModuleSaga() {
	yield all([
        plusServiceCancellationSagas()
    	]);
}
