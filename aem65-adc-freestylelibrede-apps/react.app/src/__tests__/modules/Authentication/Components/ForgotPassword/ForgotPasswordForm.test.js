import React from 'react';
import ForgotPasswordForm from '../../../../../modules/Authentication/components/ForgotPassword/ForgotPasswordForm';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import {Provider} from 'react-redux';
import {mockStore} from '../../../../../__mocks__/storeMock';
jest.mock('../../../../../utils/endpointUrl.js');
Enzyme.configure({
	adapter: new EnzymeAdapter()
});

describe('ForgotPasswordForm Component Test Suite', () => {
	let props;
	let wrapper;

	beforeEach(() => {
		props = {
			handleSubmit: () => {},
			forgotPasswordHeading: 'forgotPasswordHeading',
			forgotPasswordSubheading: 'forgotPasswordSubheading',
			backToLogin: 'backToLogin',
			backToLoginUrl: 'backToLoginUrl',
			submitCtaText: 'submitCtaText',
			hasServerSideErrorCode: true,
		};
		wrapper = shallow(<ForgotPasswordForm store={mockStore} {...props} />).dive().dive().dive().dive().dive();

	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('has forgotPasswordHeading as prop and is of type string', () => {
		const forgotPasswordHeadingProp = wrapper.props().forgotPasswordHeading;
		expect(typeof forgotPasswordHeadingProp).toBe('string');
	});

	test('has forgotPasswordSubheading as prop and is of type string', () => {
		const forgotPasswordSubheadingProp = wrapper.props().forgotPasswordSubheading;
		expect(typeof forgotPasswordSubheadingProp).toBe('string');
	});

	test('has backToLogin as prop and is of type string', () => {
		const backToLoginProp = wrapper.props().backToLogin;
		expect(typeof backToLoginProp).toBe('string');
	});

	test('has backToLoginUrl as prop and is of type string', () => {
		const backToLoginUrlProp = wrapper.props().backToLoginUrl;
		expect(typeof backToLoginUrlProp).toBe('string');
	});

	test('has submitCtaText as prop and is of type string', () => {
		const submitCtaTextProp = wrapper.props().submitCtaText;
		expect(typeof submitCtaTextProp).toBe('string');
	});

	test('has hasServerSideErrorCode as prop and is of type boolean', () => {
		const hasServerSideErrorCodeProp = wrapper.props().hasServerSideErrorCode;
		expect(typeof hasServerSideErrorCodeProp).toBe('boolean');
	});
	test('has handleSubmit as prop and is of type function', () => {
		const handleSubmitProp = wrapper.props().handleSubmit;
		expect(typeof handleSubmitProp).toBe('function');
	});

});

describe('ForgotPasswordForm Component Test Suite with mount', () => {
	let props;
	let wrapper;

	beforeEach(() => {
		props = {
			handleSubmit: () => {},
			forgotPasswordHeading: 'forgotPasswordHeading',
			forgotPasswordSubheading: 'forgotPasswordSubheading',
			backToLogin: 'backToLogin',
			backToLoginUrl: 'backToLoginUrl',
			submitCtaText: 'submitCtaText',
			hasServerSideErrorCode: true,
		};

		wrapper = mount(<Provider store= {mockStore}><ForgotPasswordForm {...props} /></Provider>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});

