import {call, takeEvery} from 'redux-saga/effects';
import {
	CONFIRM_NEWSLETTER_SUBSCRIPTION_REQUEST,
	confirmNewsLetterSubscriptionRequestFailure,
	confirmNewsLetterSubscriptionRequestSuccess,
	newsletterSubscriptionFailure,
	newsletterSubscriptionSuccess,
	SUBSCRIBE_TO_NEWSLETTER
} from '../actions/subscribe_to_newsletter.action';
import {sagaDataHandling} from '../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../api/graphql.config';
import {buildSubscribeToNewsletter} from '../schemas/subcribe_to_newsletter.schema';
import {buildConfirmNewsletterSubscriptionSchema} from '../schemas/confirm_newsletter_subscription';

export function* subscribeToNewsletter({payload}) {
	yield call(
		sagaDataHandling,
		Mutation,
		buildSubscribeToNewsletter(payload.email),
		newsletterSubscriptionSuccess,
		newsletterSubscriptionFailure,
		true
	);
}

export function* confirmNewsletterSubscription({payload: {key}}) {
	yield call(
		sagaDataHandling,
		Mutation,
		buildConfirmNewsletterSubscriptionSchema(key),
		confirmNewsLetterSubscriptionRequestSuccess,
		confirmNewsLetterSubscriptionRequestFailure
	);
}

export default function* subscriptionSaga() {
	yield takeEvery(SUBSCRIBE_TO_NEWSLETTER, subscribeToNewsletter);
	yield takeEvery(CONFIRM_NEWSLETTER_SUBSCRIPTION_REQUEST, confirmNewsletterSubscription);
}