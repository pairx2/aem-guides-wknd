import {all} from 'redux-saga/effects';
import authenticationModuleSaga from '../modules/Authentication/redux/sagas/index';
import translationModuleSaga from '../modules/Translation/redux/sagas';
import formModuleSaga from '../modules/Form/redux/sagas';
import cartModuleSaga from '../modules/Cart/redux/sagas/index';
import productModuleSaga from '../modules/Product/redux/sagas/index';
import myAccountModuleSaga from '../modules/MyAccount/redux/sagas/index';
import OrderIdRequestModuleSaga from '../modules/Confirmation/redux/sagas';
import addressVerificationModuleSaga from '../modules/Address/redux/sagas';
import getResultsSaga from '../modules/Search/redux/sagas';
import paymentModuleSaga from '../modules/Payment/redux/sagas';
import sickFundModuleSaga from '../modules/SickFund/redux/sagas';
import responsiveGridModuleSaga from '../modules/Generic/components/ResponsiveGrid/redux/sagas';
import newsletterSubscriptionSaga from '../modules/NewsletterSignup/redux/sagas';
import myPlusServiceCancellationModuleSaga from '../modules/PlusServiceCancellation/redux/sagas';
import offlineToOnlineModuleSaga from '../modules/OfflineToOnline/redux/sagas';

export function* rootSaga() {
	yield all([
		authenticationModuleSaga(),
		translationModuleSaga(),
		formModuleSaga(),
		cartModuleSaga(),
		productModuleSaga(),
		myAccountModuleSaga(),
		OrderIdRequestModuleSaga(),
		addressVerificationModuleSaga(),
		getResultsSaga(),
		paymentModuleSaga(),
		sickFundModuleSaga(),
		responsiveGridModuleSaga(),
		newsletterSubscriptionSaga(),
		myPlusServiceCancellationModuleSaga(),
		offlineToOnlineModuleSaga()
	]);
}