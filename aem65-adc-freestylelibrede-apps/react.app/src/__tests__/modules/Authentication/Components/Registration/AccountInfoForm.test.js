import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import AccountInfoForm from '../../../../../modules/Authentication/components/Registration/AccountInfoForm';
import {mockStore} from '../../../../../__mocks__/storeMock';
import {Provider} from 'react-redux';
jest.mock('../../../../../utils/endpointUrl');
jest.mock('../../../../../utils/adobeAnalyticsUtils', () => ({
    OfflineToOnlineRegistrationFormStart: jest.fn(),
}));
import { act } from 'react-dom/test-utils';

global.grecaptcha = {
    enterprise: {
        execute: jest.fn().mockResolvedValue('mock-token'),
    },
};

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props) => {
	const wrapper = shallow(<AccountInfoForm store={mockStore} {...props} />);
	return wrapper;
};

describe('AccountInfoForm Component Test Suite with isSocialLogin as false & isEApply is true', () => {
	let props, wrapper;
	const handleGoBackMock = jest.fn();

	beforeEach(() => {
		props = {
			handleGoBack: handleGoBackMock,
			accountHeading: 'accountHeading',
			accountSubheading: 'accountSubheading',
			accountRegisterCtaStyle: 'accountRegisterCtaStyle',
			accountCancelCtastyle: 'accountCancelCtastyle',
			privacyPolicy: 'privacyPolicy',
			termsAndConditions: 'termsAndConditions',
			isEApply: true,
			recaptchaValue: 'recaptchaValue',
			isSocialLogin: false,
			trainingLink: 'trainingLink',
			accountDisclaimer: 'disclaimer text'
		};
		wrapper = setup(props);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});

describe('AccountInfoForm Component Test Suite with isSocialLogin & isEApply both are false', () => {
	let props, wrapper;
	const handleGoBackMock = jest.fn();

	beforeEach(() => {
		props = {
			handleGoBack: handleGoBackMock,
			accountHeading: 'accountHeading',
			accountSubheading: 'accountSubheading',
			accountRegisterCtaStyle: 'secondary',
			accountCancelCtastyle: 'primary',
			privacyPolicy: 'privacyPolicy',
			termsAndConditions: 'termsAndConditions',
			isEApply: false,
			recaptchaValue: null,
			isSocialLogin: false,
			trainingLink: null,
			accountDisclaimer: 'disclaimer text',
			offlineToOnlineFlag: true,
			offlineToOnlineErrorMsg : true
		};
		wrapper = setup(props);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});

describe('AccountInfoForm Component Test Suite with isSocialLogin & isEApply both are false', () => {
	let props, wrapper;
	const handleGoBackMock = jest.fn();

	beforeEach(() => {
		props = {
			handleGoBack: handleGoBackMock,
			accountHeading: 'accountHeading',
			accountSubheading: 'accountSubheading',
			accountRegisterCtaStyle: 'primary',
			accountCancelCtastyle: 'secondary',
			privacyPolicy: 'privacyPolicy',
			termsAndConditions: 'termsAndConditions',
			isEApply: false,
			recaptchaValue: null,
			isSocialLogin: false,
			trainingLink: 'trainingLink',
			accountDisclaimer: 'disclaimer text',
			offlineToOnlineFlag: true,
			offlineToOnlineErrorMsg : true
		};
		wrapper = mount(<Provider store={mockStore}><AccountInfoForm  {...props} /></Provider>);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});

describe('AccountInfoForm Component Test Suite with isSocialLogin & isEApply both are false', () => {
	let props, wrapper;
	const handleGoBackMock = jest.fn();

	beforeEach(() => {
		props = {
			handleGoBack: handleGoBackMock,
			accountHeading: 'accountHeading',
			accountSubheading: 'accountSubheading',
			accountRegisterCtaStyle: 'secondary',
			accountCancelCtastyle: 'secondary',
			privacyPolicy: null,
			termsAndConditions: null,
			isEApply: true,
			recaptchaValue: null,
			isSocialLogin: true,
			trainingLink: null,
			accountDisclaimer: 'disclaimer text'
		};
		wrapper = mount(<Provider store={mockStore}><AccountInfoForm  {...props} /></Provider>);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});

describe('AccountInfoForm Component Test Suite with isSocialLogin & isEApply both are false', () => {
	let props, wrapper;
	const handleGoBackMock = jest.fn();

	beforeEach(() => {
		props = {
			handleGoBack: handleGoBackMock,
			accountHeading: 'accountHeading',
			accountSubheading: 'accountSubheading',
			accountRegisterCtaStyle: 'primary',
			accountCancelCtastyle: 'primary',
			privacyPolicy: 'privacyPolicy',
			termsAndConditions: 'termsAndConditions',
			isEApply: true,
			recaptchaValue: null,
			isSocialLogin: false,
			trainingLink: 'trainingLink',
			accountDisclaimer: 'disclaimer text',
			offlineToOnlineFlag: false
		};
		wrapper = mount(<Provider store={mockStore}><AccountInfoForm  {...props} /></Provider>);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('handleEvent function check when offlineToOnline false', () => {
        const { OfflineToOnlineRegistrationFormStart } = require('../../../../../utils/adobeAnalyticsUtils');
        const form = wrapper.find('form');
 
        act(() => {
            form.simulate('click');
        });
 
        expect(OfflineToOnlineRegistrationFormStart).not.toHaveBeenCalled();
    });

});

describe('AccountInfoForm Component Test Suite with functions check', () => {
	let props, wrapper;
	const handleGoBackMock = jest.fn();
	const handleEventMock = jest.fn();
	const handlePreSubmitMock = jest.fn();
	const privacyPolicyConfirmationChangeMock = jest.fn();
	beforeEach(() => {
		props = {
			handleGoBack: handleGoBackMock,
			privacyPolicyConfirmationChange: privacyPolicyConfirmationChangeMock,
			handlePreSubmit: handlePreSubmitMock,
			handleEvent: handleEventMock,
			accountHeading: 'accountHeading',
			accountSubheading: 'accountSubheading',
			accountRegisterCtaStyle: 'primary',
			accountCancelCtastyle: 'secondary',
			privacyPolicy: 'privacyPolicy',
			termsAndConditions: 'termsAndConditions',
			isEApply: false,
			recaptchaValue: null,
			isSocialLogin: false,
			trainingLink: 'trainingLink',
			accountDisclaimer: 'disclaimer text',
			offlineToOnlineFlag: true,
			offlineToOnlineErrorMsg : true
		};
		wrapper = mount(<Provider store={mockStore}><AccountInfoForm  {...props} /></Provider>);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('handleEvent function check', () => {
        const { OfflineToOnlineRegistrationFormStart } = require('../../../../../utils/adobeAnalyticsUtils');
        const form = wrapper.find('form');
 		act(() => {
            form.simulate('click');
        });
 		expect(OfflineToOnlineRegistrationFormStart).toHaveBeenCalled();
    });

	test('handlePreSubmit function check', async () => {
        const form = wrapper.find('form');
 		act(() => {
            form.simulate('submit', { preventDefault() {} });
        });
    });

});




