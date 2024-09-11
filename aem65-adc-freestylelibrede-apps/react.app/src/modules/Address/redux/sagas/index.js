import {all} from 'redux-saga/effects';
import verifyAddressSagas from './verify_address.saga';
import updateAddressSagas from './update_address.saga';
import createAddressSagas from './create_address.saga';
import deleteAddressSagas from './delete_address.saga';
import typeaheadAddressSagas from './typeahead_address.saga';


export default function* addressVerificationModuleSaga() {
	yield all([
		verifyAddressSagas(),
		updateAddressSagas(),
		createAddressSagas(),
		deleteAddressSagas(),
		typeaheadAddressSagas(),
	]);
}