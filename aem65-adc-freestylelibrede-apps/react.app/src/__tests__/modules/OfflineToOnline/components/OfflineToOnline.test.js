import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore} from '../../../../__mocks__/storeMock';
import OfflineToOnline from '../../../../modules/OfflineToOnline/components/OfflineToOnline';
jest.mock('../../../../utils/siteData');
jest.mock('../../../../utils/endpointUrl');

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});
const setup = (props) => {
	const wrapper = shallow(<OfflineToOnline store={mockStore} {...props} />).dive().dive();
	return wrapper;
};



describe('OfflineToOnline component Test Suite', () => {
	let props, wrapper;
    const validateOfflineCustomerRequestMock = jest.fn();
	const registerOfflineCustomerRequestMock = jest.fn();
	beforeEach(() => {
		document.body.innerHTML = `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<title>Test Document</title>
		</head>
		<body>
			<div id="headerTop" style="height: 50px;">
			<div class="offline-registration-success-section" style="margin-top: 500px;">
			</div>
			</div>
		</body>
		</html>`
		props = {
            registrationHeading: "TestString",
            registrationSubheading: "TestString",
            registrationSubheadingDescription: "TestString",
            informationText: "TestString",
            customerNumberRegex: "TestString",
            kvnrRegex: "TestString",
            enableCaptcha: false,
            validateOfflineCustomerRequest: validateOfflineCustomerRequestMock,
            validateOfflineCustomerResponse: {},
			registerOfflineCustomerRequest: registerOfflineCustomerRequestMock,
			registerOfflineCustomerResponse: {},
            isLoading: false,
            error: [],
			formData: { lastName: "Krishna", birthDate: "18.03.1996", customerNumber: "1405250573", kvnrNumber: "K657465432"}
		};
		
		wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('Handle check',() => {
		wrapper.setState({
			dataEnteredForValidation: {
				kvnrNumber: "12345678",
				customerNumber: "1234567889",
				sessionToken: "/6bTlWIHTixuHlGmsXFqb4rZOWKyEhkxHXkfHn8UO1VW8Kh07/EHmXJFLJc+2v9Q/r+ZVBqBFOk="
			}
		})
		wrapper.setProps({
			accountInfoFormValues: 
				{
					firstName: "Artje",
					lastName: "Hauffman",
					birthDate: "01.01.2000",
					prefix: "salutation_selection_man",
					email: "test1247@yopmail.com",
					password: "Test@1234",
					dataProcessingConsentConfirmation: true,
					termsConditionsConfirmation: true,
					privacyPolicyConfirmation: true,
					trainingConfirmation: true,
					newsletterConfirmation: true,
					recaptchaValue: "03AAYGu2TW_-44EkBmizEhwwHNrumL5AWerG8tqHhwpARm15lw6wZbT-UQDuu-3FT4dIOYa_ZfDyhmhDMreaPRlOYQ1N1iZPtdIR8vxqh32xjCM_NBZDpHVNEdOeEgIDY2eJ6Be6Oh1NDD4dCGzIF03GRATFDuvbEgnjgYrOtP5VRxQv5I_PiEZ1kzV_AtgA57URszNU1spXwUByn48icXcpvWLR8-Wi51Ysc8DiVSIxrSlF6b3ubDJ1I7xskbqqBHglENOXSNHwnJ9n35Qd0JS1QqvbHIAXYAGQh8atTY3O7G-sYLdIAy1nVxfsxMGA5dFbYOgZk_9tDHBRXNGPuYqP6BgD4skEbC8VLYpxjmzTfkZqUQnZZrpeNMHM2GTXkJkfEaIRpane0Afkz2D6D1VuH2n6AuhqyoMX5fLSPB6Gs0x6QnghI5T2IL58cjn5iaAm6BSjua9b80qYS431PwTGXo8qDJgkBK2CO_GI7ZDwZ0ld6bDG..."
				  }
		})
		wrapper.instance().handleRegistration({})
		wrapper.instance().onSubmitIdentity({})
	});
	test('Handle check dataEnteredForValidation empty',() => {
		wrapper.setState({
			dataEnteredForValidation: {}
		})
		wrapper.setProps({
			accountInfoFormValues: 
				{
					firstName: "Artje",
					lastName: "Hauffman",
					birthDate: "01.01.2000",
					prefix: "salutation_selection_man",
					email: "test1247@yopmail.com",
					password: "Test@1234",
					dataProcessingConsentConfirmation: true,
					termsConditionsConfirmation: true,
					privacyPolicyConfirmation: true,
					trainingConfirmation: true,
					newsletterConfirmation: true,
					recaptchaValue: "03AAYGu2TW_-44EkBmizEhwwHNrumL5AWerG8tqHhwpARm15lw6wZbT-UQDuu-3FT4dIOYa_ZfDyhmhDMreaPRlOYQ1N1iZPtdIR8vxqh32xjCM_NBZDpHVNEdOeEgIDY2eJ6Be6Oh1NDD4dCGzIF03GRATFDuvbEgnjgYrOtP5VRxQv5I_PiEZ1kzV_AtgA57URszNU1spXwUByn48icXcpvWLR8-Wi51Ysc8DiVSIxrSlF6b3ubDJ1I7xskbqqBHglENOXSNHwnJ9n35Qd0JS1QqvbHIAXYAGQh8atTY3O7G-sYLdIAy1nVxfsxMGA5dFbYOgZk_9tDHBRXNGPuYqP6BgD4skEbC8VLYpxjmzTfkZqUQnZZrpeNMHM2GTXkJkfEaIRpane0Afkz2D6D1VuH2n6AuhqyoMX5fLSPB6Gs0x6QnghI5T2IL58cjn5iaAm6BSjua9b80qYS431PwTGXo8qDJgkBK2CO_GI7ZDwZ0ld6bDG..."
				  }
		})
		wrapper.instance().handleRegistration({})
		wrapper.instance().onSubmitIdentity({})
	});
	test('test componentdidupdate state & props with data', () => {
		wrapper.instance().setState({
			isValidCustomer: false,
			ValidatedData: {
				"status": true,
				"requestId": "d2e809cf-eac3-4386-bce4-47bff0e0b411",
				"response": {
					"ValidateCustomer": true,
					"sessionToken": "/6bTl3EHTixuH13WuBcVb4rDOWKyEhg2GHkTH3oUIStd8Ktx6vMDn77EmcHHvDZxWiP0iHC0egU="
				},
				"errorCode": 0
			},
			registeredData: {
				"status": false,
				"requestId": "4bc65999-52a5-47d1-8744-f97f8199c4b8",
				"response": {
					"statusReason": "Unable to process the request. try again later.",
					"i18nMessageKeyAvailable": true,
					"i18nMessageKey": "500"
				},
				"errorCode": 400
			}
		});
		wrapper.setProps({
			registerOfflineCustomerResponse: {
				"status": false,
				"requestId": "4bc65999-52a5-47d1-8744-f97f8199c4b8",
				"response": {
					"statusReason": "Unable to process the request. try again later.",
					"i18nMessageKeyAvailable": true,
					"i18nMessageKey": "500"
				},
				"errorCode": 400
			},
			validateOfflineCustomerResponse: {
				"status": true,
				"requestId": "d2e809cf-eac3-4386-bce4-47bff0e0b411",
				"response": {
					"ValidateCustomer": true,
					"sessionToken": "/6bTl3EHTixuH13WuBcVb4rDOWKyEhg2GHkTH3oUIStd8Ktx6vMDn77EmcHHvDZxWiP0iHC0egU="
				},
				"errorCode": 0
			}
		});
	});

	test('test componentdidupdate state & props with null values', () => {
		wrapper.setState({
			ValidatedData: null,
			registeredData: null,
			isValidationError : true,
			isValidCustomer: false
		})
		wrapper.setProps({
			registerOfflineCustomerResponse: {
				"status": false,
				"requestId": "4bc65999-52a5-47d1-8744-f97f8199c4b8",
				"response": {
					"statusReason": "Unable to process the request. try again later.",
					"i18nMessageKeyAvailable": true,
					"i18nMessageKey": "500"
				},
				"errorCode": 0
			},
			validateOfflineCustomerResponse: {
				"status": false,
				"requestId": "03defddc-1b16-4b3f-ac45-1320ba370693",
				"response": {
					"statusReason": "You’re already registered, please login instead",
					"i18nMessageKeyAvailable": true,
					"i18nMessageKey": "ACC-CODE-1016"
				},
				"errorCode": 500
			}
		})
	});

	test('test componentdidupdate state & props ', () => {
		wrapper.setState({
			ValidatedData: null,
			registeredData: null,
			isValidationError : true,
			isValidCustomer: false,
		})
		wrapper.setProps({
			registerOfflineCustomerResponse: {
				"status": false,
				"requestId": "4bc65999-52a5-47d1-8744-f97f8199c4b8",
				"response": {
					"statusReason": "Unable to process the request. try again later.",
					"i18nMessageKeyAvailable": true,
					"i18nMessageKey": "500"
				},
				"errorCode": 500
			},
			validateOfflineCustomerResponse: {
				"status": false,
				"requestId": "03defddc-1b16-4b3f-ac45-1320ba370693",
				"response": {
					"statusReason": "You’re already registered, please login instead",
					"i18nMessageKeyAvailable": true,
					"i18nMessageKey": "ACC-CODE-1016"
				},
				"errorCode": 400
			}
		})
	});

	test('test componentdidupdate state & props multiple cases ', () => {
		wrapper.setState({
			ValidatedData: null,
			registeredData: null,
			isValidationError : true,
			isValidCustomer: false,
		})
		wrapper.setProps({
			registerOfflineCustomerResponse: {
				"status": false,
				"requestId": "4bc65999-52a5-47d1-8744-f97f8199c4b8",
				"response": {
					"statusReason": "Unable to process the request. try again later.",
					"i18nMessageKeyAvailable": true,
					"i18nMessageKey": "500"
				},
				"errorCode": 500
			},
			validateOfflineCustomerResponse: {
				"status": false,
				"requestId": "03defddc-1b16-4b3f-ac45-1320ba370693",
				"response": {
					"statusReason": "You’re already registered, please login instead",
					"i18nMessageKeyAvailable": true,
					"i18nMessageKey": "ACC-CODE-1016"
				},
				"errorCode": 0
			}
		})
	});

});
describe('OfflineToOnline component Test Suite', () => {
	let props, wrapper;
    const validateOfflineCustomerRequestMock = jest.fn();
	const registerOfflineCustomerRequestMock = jest.fn();
	beforeEach(() => {
		document.body.innerHTML = ``
		props = {
            registrationHeading: "TestString",
            registrationSubheading: "TestString",
            registrationSubheadingDescription: "TestString",
            informationText: "TestString",
            customerNumberRegex: "TestString",
            kvnrRegex: "TestString",
            enableCaptcha: false,
            validateOfflineCustomerRequest: validateOfflineCustomerRequestMock,
            validateOfflineCustomerResponse: {},
			registerOfflineCustomerRequest: registerOfflineCustomerRequestMock,
			registerOfflineCustomerResponse: {},
            isLoading: false,
            error: [],
			formData: { lastName: "Krishna", birthDate: "18.03.1996", customerNumber: "1405250573", kvnrNumber: "K657465432"}
		};
		
		wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('Handle check',() => {
		wrapper.setState({
			dataEnteredForValidation: {
				kvnrNumber: "12345678",
				customerNumber: "1234567889",
				sessionToken: "/6bTlWIHTixuHlGmsXFqb4rZOWKyEhkxHXkfHn8UO1VW8Kh07/EHmXJFLJc+2v9Q/r+ZVBqBFOk="
			}
		})
		wrapper.setProps({
			accountInfoFormValues: 
				{
					firstName: "Artje",
					lastName: "Hauffman",
					birthDate: "01.01.2000",
					prefix: "salutation_selection_man",
					email: "test1247@yopmail.com",
					password: "Test@1234",
					dataProcessingConsentConfirmation: true,
					termsConditionsConfirmation: true,
					privacyPolicyConfirmation: true,
					trainingConfirmation: true,
					newsletterConfirmation: true,
					recaptchaValue: "03AAYGu2TW_-44EkBmizEhwwHNrumL5AWerG8tqHhwpARm15lw6wZbT-UQDuu-3FT4dIOYa_ZfDyhmhDMreaPRlOYQ1N1iZPtdIR8vxqh32xjCM_NBZDpHVNEdOeEgIDY2eJ6Be6Oh1NDD4dCGzIF03GRATFDuvbEgnjgYrOtP5VRxQv5I_PiEZ1kzV_AtgA57URszNU1spXwUByn48icXcpvWLR8-Wi51Ysc8DiVSIxrSlF6b3ubDJ1I7xskbqqBHglENOXSNHwnJ9n35Qd0JS1QqvbHIAXYAGQh8atTY3O7G-sYLdIAy1nVxfsxMGA5dFbYOgZk_9tDHBRXNGPuYqP6BgD4skEbC8VLYpxjmzTfkZqUQnZZrpeNMHM2GTXkJkfEaIRpane0Afkz2D6D1VuH2n6AuhqyoMX5fLSPB6Gs0x6QnghI5T2IL58cjn5iaAm6BSjua9b80qYS431PwTGXo8qDJgkBK2CO_GI7ZDwZ0ld6bDG..."
				  }
		})
		wrapper.instance().handleRegistration({})
		wrapper.instance().onSubmitIdentity({})
	});
	test('Handle check dataEnteredForValidation empty',() => {
		wrapper.setState({
			dataEnteredForValidation: {}
		})
		wrapper.setProps({
			accountInfoFormValues: 
				{
					firstName: "Artje",
					lastName: "Hauffman",
					birthDate: "01.01.2000",
					prefix: "salutation_selection_man",
					email: "test1247@yopmail.com",
					password: "Test@1234",
					dataProcessingConsentConfirmation: true,
					termsConditionsConfirmation: true,
					privacyPolicyConfirmation: true,
					trainingConfirmation: true,
					newsletterConfirmation: true,
					recaptchaValue: "03AAYGu2TW_-44EkBmizEhwwHNrumL5AWerG8tqHhwpARm15lw6wZbT-UQDuu-3FT4dIOYa_ZfDyhmhDMreaPRlOYQ1N1iZPtdIR8vxqh32xjCM_NBZDpHVNEdOeEgIDY2eJ6Be6Oh1NDD4dCGzIF03GRATFDuvbEgnjgYrOtP5VRxQv5I_PiEZ1kzV_AtgA57URszNU1spXwUByn48icXcpvWLR8-Wi51Ysc8DiVSIxrSlF6b3ubDJ1I7xskbqqBHglENOXSNHwnJ9n35Qd0JS1QqvbHIAXYAGQh8atTY3O7G-sYLdIAy1nVxfsxMGA5dFbYOgZk_9tDHBRXNGPuYqP6BgD4skEbC8VLYpxjmzTfkZqUQnZZrpeNMHM2GTXkJkfEaIRpane0Afkz2D6D1VuH2n6AuhqyoMX5fLSPB6Gs0x6QnghI5T2IL58cjn5iaAm6BSjua9b80qYS431PwTGXo8qDJgkBK2CO_GI7ZDwZ0ld6bDG..."
				  }
		})
		wrapper.instance().handleRegistration({})
		wrapper.instance().onSubmitIdentity({})
	});
	test('test componentdidupdate state & props with data', () => {
		wrapper.instance().setState({
			isValidCustomer: false,
			ValidatedData: {
				"status": true,
				"requestId": "d2e809cf-eac3-4386-bce4-47bff0e0b411",
				"response": {
					"ValidateCustomer": true,
					"sessionToken": "/6bTl3EHTixuH13WuBcVb4rDOWKyEhg2GHkTH3oUIStd8Ktx6vMDn77EmcHHvDZxWiP0iHC0egU="
				},
				"errorCode": 0
			},
			registeredData: {
				"status": false,
				"requestId": "4bc65999-52a5-47d1-8744-f97f8199c4b8",
				"response": {
					"statusReason": "Unable to process the request. try again later.",
					"i18nMessageKeyAvailable": true,
					"i18nMessageKey": "500"
				},
				"errorCode": 400
			}
		});
		wrapper.setProps({
			registerOfflineCustomerResponse: {
				"status": false,
				"requestId": "4bc65999-52a5-47d1-8744-f97f8199c4b8",
				"response": {
					"statusReason": "Unable to process the request. try again later.",
					"i18nMessageKeyAvailable": true,
					"i18nMessageKey": "500"
				},
				"errorCode": 400
			},
			validateOfflineCustomerResponse: {
				"status": true,
				"requestId": "d2e809cf-eac3-4386-bce4-47bff0e0b411",
				"response": {
					"ValidateCustomer": true,
					"sessionToken": "/6bTl3EHTixuH13WuBcVb4rDOWKyEhg2GHkTH3oUIStd8Ktx6vMDn77EmcHHvDZxWiP0iHC0egU="
				},
				"errorCode": 0
			}
		});
	});

	test('test componentdidupdate state & props with null values', () => {
		wrapper.setState({
			ValidatedData: null,
			registeredData: null,
			isValidationError : true,
			isValidCustomer: false
		})
		wrapper.setProps({
			registerOfflineCustomerResponse: {
				"status": false,
				"requestId": "4bc65999-52a5-47d1-8744-f97f8199c4b8",
				"response": {
					"statusReason": "Unable to process the request. try again later.",
					"i18nMessageKeyAvailable": true,
					"i18nMessageKey": "500"
				},
				"errorCode": 0
			},
			validateOfflineCustomerResponse: {
				"status": false,
				"requestId": "03defddc-1b16-4b3f-ac45-1320ba370693",
				"response": {
					"statusReason": "You’re already registered, please login instead",
					"i18nMessageKeyAvailable": true,
					"i18nMessageKey": "ACC-CODE-1016"
				},
				"errorCode": 500
			}
		})
	});

	test('test componentdidupdate state & props ', () => {
		wrapper.setState({
			ValidatedData: null,
			registeredData: null,
			isValidationError : true,
			isValidCustomer: false,
		})
		wrapper.setProps({
			registerOfflineCustomerResponse: {
				"status": false,
				"requestId": "4bc65999-52a5-47d1-8744-f97f8199c4b8",
				"response": {
					"statusReason": "Unable to process the request. try again later.",
					"i18nMessageKeyAvailable": true,
					"i18nMessageKey": "500"
				},
				"errorCode": 500
			},
			validateOfflineCustomerResponse: {
				"status": false,
				"requestId": "03defddc-1b16-4b3f-ac45-1320ba370693",
				"response": {
					"statusReason": "You’re already registered, please login instead",
					"i18nMessageKeyAvailable": true,
					"i18nMessageKey": "ACC-CODE-1016"
				},
				"errorCode": 400
			}
		})
	});

	test('test componentdidupdate state & props multiple cases ', () => {
		wrapper.setState({
			ValidatedData: null,
			registeredData: null,
			isValidationError : true,
			isValidCustomer: false,
		})
		wrapper.setProps({
			registerOfflineCustomerResponse: {
				"status": false,
				"requestId": "4bc65999-52a5-47d1-8744-f97f8199c4b8",
				"response": {
					"statusReason": "Unable to process the request. try again later.",
					"i18nMessageKeyAvailable": true,
					"i18nMessageKey": "500"
				},
				"errorCode": 500
			},
			validateOfflineCustomerResponse: {
				"status": false,
				"requestId": "03defddc-1b16-4b3f-ac45-1320ba370693",
				"response": {
					"statusReason": "You’re already registered, please login instead",
					"i18nMessageKeyAvailable": true,
					"i18nMessageKey": "ACC-CODE-1016"
				},
				"errorCode": 0
			}
		})
	});

});