export const SUBSCRIBE_TO_NEWSLETTER = 'SUBSCRIBE_TO_NEWSLETTER';
export const NEWSLETTER_SUBSCRIPTION_SUCCESS = 'NEWSLETTER_SUBSCRIPTION_SUCCESS';
export const NEWSLETTER_SUBSCRIPTION_FAILURE = 'NEWSLETTER_SUBSCRIPTION_FAILURE';
export const CONFIRM_NEWSLETTER_SUBSCRIPTION_REQUEST = 'CONFIRM_NEWSLETTER_SUBSCRIPTION_REQUEST';
export const CONFIRM_NEWSLETTER_SUBSCRIPTION_REQUEST_SUCCESS = 'CONFIRM_NEWSLETTER_SUBSCRIPTION_REQUEST_SUCCESS';
export const CONFIRM_NEWSLETTER_SUBSCRIPTION_REQUEST_FAILURE = 'CONFIRM_NEWSLETTER_SUBSCRIPTION_REQUEST_FAILURE';

export const subscribeToNewsletter = payload => ({
	type: SUBSCRIBE_TO_NEWSLETTER, payload
});

export const newsletterSubscriptionSuccess = payload => ({ 
	type: NEWSLETTER_SUBSCRIPTION_SUCCESS, payload
});

export const newsletterSubscriptionFailure = error => ({
	type: NEWSLETTER_SUBSCRIPTION_FAILURE, error
});

export const confirmNewsLetterSubscriptionRequest = payload => ({
	type: CONFIRM_NEWSLETTER_SUBSCRIPTION_REQUEST, payload
});

export const confirmNewsLetterSubscriptionRequestSuccess = payload => ({
	type: CONFIRM_NEWSLETTER_SUBSCRIPTION_REQUEST_SUCCESS, payload
});

export const confirmNewsLetterSubscriptionRequestFailure = error => ({
	type: CONFIRM_NEWSLETTER_SUBSCRIPTION_REQUEST_FAILURE, error
});