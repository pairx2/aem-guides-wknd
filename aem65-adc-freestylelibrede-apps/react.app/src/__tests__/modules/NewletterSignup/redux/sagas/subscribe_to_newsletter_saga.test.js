import {call, takeEvery} from 'redux-saga/effects';
import {
	CONFIRM_NEWSLETTER_SUBSCRIPTION_REQUEST,
	confirmNewsLetterSubscriptionRequestFailure,
	confirmNewsLetterSubscriptionRequestSuccess,
	newsletterSubscriptionFailure,
	newsletterSubscriptionSuccess,
	SUBSCRIBE_TO_NEWSLETTER
} from '../../../../../modules/NewsletterSignup/redux/actions/subscribe_to_newsletter.action';
import {sagaDataHandling} from '../../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../../api/graphql.config';
import {buildSubscribeToNewsletter} from '../../../../../modules/NewsletterSignup/redux/schemas/subcribe_to_newsletter.schema';
import {buildConfirmNewsletterSubscriptionSchema} from '../../../../../modules/NewsletterSignup/redux/schemas/confirm_newsletter_subscription';
import * as saga from '../../../../../modules/NewsletterSignup/redux/sagas/subscribe_to_newsletter.saga';
import subscriptionSaga from '../../../../../modules/NewsletterSignup/redux/sagas/subscribe_to_newsletter.saga';
jest.mock('../../../../../utils/endpointUrl.js');

describe('subscribeToNewsletter saga', () => {
	const payload = {
		email : 'abc@123.com'
	};
	const iterator = saga.subscribeToNewsletter({payload});
	test('call sagaDataHandling', () => {
		const actualYield = iterator.next().value;
		const expectedYield = call(
			sagaDataHandling,
			Mutation,
			buildSubscribeToNewsletter(payload.email),
			newsletterSubscriptionSuccess,
			newsletterSubscriptionFailure,
			true
		);
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('confirmNewsletterSubscription saga', () => {
	const payload = {
		key : '123'
	};
	const iterator = saga.confirmNewsletterSubscription({payload});
	test('call sagaDataHandling', () => {
		const actualYield = iterator.next().value;
		const expectedYield = call(
			sagaDataHandling,
			Mutation,
			buildConfirmNewsletterSubscriptionSchema(payload.key),
			confirmNewsLetterSubscriptionRequestSuccess,
			confirmNewsLetterSubscriptionRequestFailure
		);
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('subscriptionSaga saga ', () => {
	const iterator = subscriptionSaga();
	test('get subscriptionSaga -> subscribeToNewsletter', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeEvery(SUBSCRIBE_TO_NEWSLETTER, saga.subscribeToNewsletter);
		expect(actualYield).toEqual(expectedYield);
	});
	test('get subscriptionSaga -> confirmNewsletterSubscription', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeEvery(CONFIRM_NEWSLETTER_SUBSCRIPTION_REQUEST, saga.confirmNewsletterSubscription);
		expect(actualYield).toEqual(expectedYield);
	});
});