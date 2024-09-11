import {all} from 'redux-saga/effects';
import subscriptionSaga from './subscribe_to_newsletter.saga';

export default function* newsletterSubscriptionSaga() {
	yield all([
		subscriptionSaga()
	]);
}