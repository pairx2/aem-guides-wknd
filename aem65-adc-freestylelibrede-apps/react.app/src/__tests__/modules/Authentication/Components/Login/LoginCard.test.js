import React from 'react';
import Enzyme, {shallow,mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import LoginCard, {resetRecaptcha} from '../../../../../modules/Authentication/components/Login/LoginCard';
import {mockStore} from '../../../../../__mocks__/storeMock';
import {Provider} from 'react-redux';
import {loginFormSuccess} from '../../../../../utils/adobeAnalyticsUtils';

jest.mock('../../../../../utils/endpointUrl.js');

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

describe('LoginCard Component Test Suite', () => {
	let props;
	let wrapper;
	const handleSubmitMock = jest.fn();
	const forgetPwdModalPopupMock = jest.fn();
	beforeEach(() => {
		props = {
			handleSubmit: handleSubmitMock,
			loginSectionText: 'String',
			loginButtonText: 'String',
			forgotPasswordText: 'String',
			forgotPasswordLink: 'String',
			loginErrorCode: 'String',
			errorCode: null,
			isDisableRegistration: true,
			emailTriggerSuccess: true,
			submitting: false,
			isRecaptcha: true,
			ghacId: null,
			forgetPwdModalPopup: forgetPwdModalPopupMock,
			isGreyLoginShowMsg: true
		};
		wrapper = shallow(<LoginCard {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});
describe('LoginCard Component Test Suite', () => {
	let props;
	let wrapper;
	const handleSubmitMock = jest.fn();
	beforeEach(() => {
		props = {
			handleSubmit: handleSubmitMock,
			loginSectionText: 'String',
			loginButtonText: 'String',
			forgotPasswordText: 'String',
			forgotPasswordLink: 'String',
			loginErrorCode: 'String',
			errorCode: 1,
			isDisableRegistration: false,
			isGreyLoginShowMsg:true,
			emailTriggerSuccess: true,
		};
		wrapper = mount(<Provider store= {mockStore}><LoginCard {...props} /></Provider>);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});

describe('LoginCard Component Test Suite', () => {
	let props;
	let wrapper;
	const handleSubmitMock = jest.fn();
	const loginFormSuccessMock = jest.fn();
	beforeEach(() => {
		props = {
			handleSubmit: handleSubmitMock,
			loginSectionText: 'String',
			loginButtonText: 'String',
			forgotPasswordText: 'String',
			forgotPasswordLink: 'String',
			loginErrorCode: 'String',
			errorCode: 1,
			isDisableRegistration: true,
			loginFormSuccess: loginFormSuccessMock
		};
		wrapper = mount(<Provider store= {mockStore}><LoginCard {...props} /></Provider>);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});

describe('resetRecaptcha Test Suite', () => {
	const dispatch = jest.fn();
	resetRecaptcha(null, dispatch);

});

describe('loginFormSuccess Test Suite', () => {	
	loginFormSuccess();
});

