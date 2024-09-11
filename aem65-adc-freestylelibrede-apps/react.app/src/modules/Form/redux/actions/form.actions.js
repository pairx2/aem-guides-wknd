export const FETCH_FRAUD_DOMAIN_REQUEST = 'FETCH_FRAUD_DOMAIN_REQUEST';
export const SET_FRAUD_DOMAIN = 'SET_FRAUD_DOMAIN';
export const FRAUD_DOMAIN_REQUEST_FAILURE = 'FRAUD_DOMAIN_REQUEST_FAILURE';


export const fetchFraudDomainRequest = payload => ({
	type: FETCH_FRAUD_DOMAIN_REQUEST, payload
});

export const setFraudDomain = payload => ({
	type: SET_FRAUD_DOMAIN, payload
});

export const fraudDomainRequestFailure = (error) => ({
	type: FRAUD_DOMAIN_REQUEST_FAILURE, error
});