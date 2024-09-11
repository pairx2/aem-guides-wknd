import {cognitoParams, getServiceEndPoint} from '../utils/endpointUrl';

const awsConfig = {
	Auth: {
		identityPoolId: getServiceEndPoint(cognitoParams.IDENTITY_POOL_ID),
		userPoolId: getServiceEndPoint(cognitoParams.USER_POOL_ID),
		userPoolWebClientId: getServiceEndPoint(cognitoParams.APP_CLIENT_ID),
		region: getServiceEndPoint(cognitoParams.REGION),
		google: getServiceEndPoint(cognitoParams.GOOGLE_ID),
		facebook: getServiceEndPoint(cognitoParams.FACEBOOK_ID),
		'oauth': {
			'domain': getServiceEndPoint(cognitoParams.COGNITO_DOMAIN),
			'scope': ['email', 'openid', 'profile', 'aws.cognito.signin.user.admin'],
			'redirectSignIn': getServiceEndPoint(cognitoParams.LOGIN_REDIRECT),
			'redirectSignOut': getServiceEndPoint(cognitoParams.LOGIN_REDIRECT),
			'responseType': 'token'
		},
		'federationTarget': 'COGNITO_USER_POOLS'
	}
};

export default awsConfig;