import 'isomorphic-unfetch';
import { ApolloClient, gql, InMemoryCache } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { getServiceEndPoint, serviceEndPoints } from '../utils/endpointUrl';
import { uuidv4 } from '../utils/corelationUtils';


const client = (correlationId) => new ApolloClient({

	link: createHttpLink({
		uri: getServiceEndPoint(serviceEndPoints.GRAPHQL_URL) + '/guest',
		includeExtensions: true,
		fetch: (uri, options) => {
			const headers = options.headers || {};
			if (localStorage.getItem('recaptchaValue')) {
				headers["X-ReCaptcha"] = localStorage.getItem('recaptchaValue');
				localStorage.removeItem('recaptchaValue');
			}
			headers["x-correlation-id"] = correlationId;
				headers["correlationId"] = correlationId;
			return fetch(uri, { ...options ,headers})
		}
	}),
	cache: new InMemoryCache(),
	defaultOptions: {
		query: {
			fetchPolicy: 'no-cache',
		}
	}
});

const createClient = (token) => {
	const correlationId = uuidv4();
	return new ApolloClient({
		link: createHttpLink({
			uri: getServiceEndPoint(serviceEndPoints.GRAPHQL_URL) + '/me',
			includeExtensions: true,
			headers: {
				Authorization: `Bearer ${token}`
			},
			fetch: (uri, options) => {
				const headers = options.headers || {};
				if (localStorage.getItem('recaptchaValue')) {
					headers["X-ReCaptcha"] = localStorage.getItem('recaptchaValue');
					localStorage.removeItem('recaptchaValue')
				}
				headers["x-correlation-id"] = correlationId;
				headers["correlationId"] = correlationId;
				return fetch(uri, { ...options, headers })
			}
		}),
		cache: new InMemoryCache(),
		defaultOptions: {
			query: {
				fetchPolicy: 'no-cache',
			}
		}
	});
};

const Query = (schema, token) => {
	const correlationId = uuidv4();
	return (token ? createClient(token) : client(correlationId)).query({
		query: gql`${schema}`
	});
};

const Mutation = (schema, token) => {
	const correlationId = uuidv4();
	return (token ? createClient(token) : client(correlationId)).mutate({
		mutation: gql`${schema}`
	});
};

export { Query, Mutation };