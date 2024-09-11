import {call, put} from 'redux-saga/effects';
import {getJwtToken} from '../api/authentication.service';

function* sagaDataHandling(fn, schema, onSuccess, onFailure, withoutToken) {
	try {
		let jwtToken;
		try {
			jwtToken = withoutToken ? undefined : yield call(getJwtToken);
		} catch {
			jwtToken = undefined;
		}
		const {data} = yield call(fn, schema, jwtToken);
		if (data && onSuccess) {
			yield put(onSuccess(data));
			return data;
		}
	} catch (e) {		
		if (onFailure) {
			let errorCodes = [];
			if(e.graphQLErrors && e.graphQLErrors.length > 0) {
				errorCodes = e.graphQLErrors.map(err => err.code);
			} else if(e.networkError){
				errorCodes.push(e.networkError.statusCode);
			}
			yield put(onFailure({
				error: e.message.includes('GraphQL error')?e.message.split('GraphQL error: ')[1]:e.message,
				errorCodes: errorCodes
			}));
		}
	}
}

export {
	sagaDataHandling
};
