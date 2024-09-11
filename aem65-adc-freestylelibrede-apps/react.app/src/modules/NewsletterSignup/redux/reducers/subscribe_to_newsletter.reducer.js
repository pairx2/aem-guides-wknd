import {
	NEWSLETTER_SUBSCRIPTION_FAILURE,
	NEWSLETTER_SUBSCRIPTION_SUCCESS,
	SUBSCRIBE_TO_NEWSLETTER,
	CONFIRM_NEWSLETTER_SUBSCRIPTION_REQUEST_FAILURE,
	CONFIRM_NEWSLETTER_SUBSCRIPTION_REQUEST_SUCCESS
} from '../actions/subscribe_to_newsletter.action';


const initialState = {
	isSubscriptionSuccessful: null,
	isLoading: false,
	error: null,
	confirmationStatus: null
};

export const SubscribeToNewsletterReducer = (state = initialState, action) => {
	switch (action.type) {
		case SUBSCRIBE_TO_NEWSLETTER:
			return {
				...state,
				isLoading: true,
				isSubscriptionSuccessful: null,
				error: null
			};
		case NEWSLETTER_SUBSCRIPTION_SUCCESS:
			return {
				...state,
				isLoading: false,
				isSubscriptionSuccessful: true
			};
		case NEWSLETTER_SUBSCRIPTION_FAILURE:
			return {
				...state,
				isSubscriptionSuccessful: false,
				isLoading: false,
				error: 'newsletter_error_' + action.error.errorCodes[0]
			};
		case CONFIRM_NEWSLETTER_SUBSCRIPTION_REQUEST_SUCCESS:
			return {
				...state,
				confirmationStatus: true
			};
		case CONFIRM_NEWSLETTER_SUBSCRIPTION_REQUEST_FAILURE:
			return {
				...state,
				confirmationStatus: false
			};
		default:
			return state;
	}
};