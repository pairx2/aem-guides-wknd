import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import ForgotPassword from '../../../../../modules/Authentication/components/ForgotPassword/ForgotPassword';
import {mockStoreOrder} from '../../../../../__mocks__/storeMock';


Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props= {}) => {
	const wrapper = shallow(<ForgotPassword store= {mockStoreOrder} {...props}/>).dive().dive();
	return wrapper;
};

describe('ForgotPassword Component Test Suite', () => {
	let props, wrapper;
	const forgotPasswordMock = jest.fn();
	const resetServerSideErrorMock = jest.fn();

	beforeEach(() => {
		props= {
			forgotPasswordHeading: 'forgotPasswordHeading',
			forgotPasswordSubheading: 'forgotPasswordSubheading',
			backToLogin: 'backToLogin',
			backToLoginUrl: 'backToLoginUrl',
			submitCtaText: 'submitCtaText',
			confirmationPageHeading: 'confirmationPageHeading',
			confirmationPageSubheading: 'confirmationPageSubheading',
			forgotPasswordConfirmationImage: 'forgotPasswordConfirmationImage',
			readerInformationalText: 'readerInformationalText',
			forgotPassword: forgotPasswordMock,
			resetServerSideError: resetServerSideErrorMock,
			accountLink: 'accountLink'
		};
		wrapper= setup(props);
	});

	describe('Redux Props', () => {

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('has forgotPasswordHeading as prop and is of type string', () => {
			const forgotPasswordHeadingProp = wrapper.instance().props.forgotPasswordHeading;
			expect(typeof forgotPasswordHeadingProp).toBe('string');
		});

		test('has forgotPasswordSubheading as prop and is of type string', () => {
			const forgotPasswordSubheadingProp = wrapper.instance().props.forgotPasswordSubheading;
			expect(typeof forgotPasswordSubheadingProp).toBe('string');
		});

		test('has backToLogin as prop and is of type string', () => {
			const backToLoginProp = wrapper.instance().props.backToLogin;
			expect(typeof backToLoginProp).toBe('string');
		});

		test('has backToLoginUrl as prop and is of type string', () => {
			const backToLoginUrlProp = wrapper.instance().props.backToLoginUrl;
			expect(typeof backToLoginUrlProp).toBe('string');
		});

		test('has accountLink as prop and is of type string', () => {
			const accountLinkProp = wrapper.instance().props.accountLink;
			expect(typeof accountLinkProp).toBe('string');
		});

		test('has submitCtaText as prop and is of type string', () => {
			const submitCtaTextProp = wrapper.instance().props.submitCtaText;
			expect(typeof submitCtaTextProp).toBe('string');
		});

		test('has confirmationPageHeading as prop and is of type string', () => {
			const confirmationPageHeadingProp = wrapper.instance().props.confirmationPageHeading;
			expect(typeof confirmationPageHeadingProp).toBe('string');
		});

		test('has forgotPasswordConfirmationImage as prop and is of type string', () => {
			const forgotPasswordConfirmationImageProp = wrapper.instance().props.forgotPasswordConfirmationImage;
			expect(typeof forgotPasswordConfirmationImageProp).toBe('string');
		});

		test('has readerInformationalText as prop and is of type string', () => {
			const readerInformationalTextProp = wrapper.instance().props.readerInformationalText;
			expect(typeof readerInformationalTextProp).toBe('string');
		});

		test('has forgotPassword as prop and is of type function', () => {
			const forgotPasswordProp = wrapper.instance().props.forgotPassword;
			expect(typeof forgotPasswordProp).toBe('function');
		});

		test('has resetServerSideError as prop and is of type function', () => {
			const resetServerSideErrorProp = wrapper.instance().props.resetServerSideError;
			expect(typeof resetServerSideErrorProp).toBe('function');
		});
	});

	describe('state check', () => {

		test('state check', () => {
			const stateProp = wrapper.instance().state;
			expect(stateProp).toBeInstanceOf(Object);

			const forgotPwdConfirmProp = wrapper.instance().state.forgotPwdConfirm;
			expect(typeof forgotPwdConfirmProp).toBe('boolean');
			expect(forgotPwdConfirmProp).toBeFalsy();

			const hasServerSideErrorCodeProp = wrapper.instance().state.hasServerSideErrorCode;
			expect(typeof hasServerSideErrorCodeProp).toBe('boolean');
			expect(hasServerSideErrorCodeProp).toBeFalsy();
		});
	});

	describe('Functions check', () => {

		test('has submit as prop and is of type function', () => {
			const submitProp = wrapper.instance().submit;
			expect(typeof submitProp).toBe('function');

			const values= 'values';
			submitProp(values);

			const forgotPasswordMockCallCount = forgotPasswordMock.mock.calls.length;
			expect(forgotPasswordMockCallCount).toBeDefined();
		});

		test('has setForgotPasswordSuccessHandler as prop and is of type function', () => {
			const setForgotPasswordSuccessHandlerProp = wrapper.instance().setForgotPasswordSuccessHandler;
			expect(typeof setForgotPasswordSuccessHandlerProp).toBe('function');

			setForgotPasswordSuccessHandlerProp(true);
			expect(wrapper.instance().state.forgotPwdConfirm).toBeTruthy();

			setForgotPasswordSuccessHandlerProp(false);
			expect(wrapper.instance().state.forgotPwdConfirm).toBeFalsy();
		});

		test('has serverSideErrorHandler as prop and is of type function', () => {
			const serverSideErrorHandlerProp = wrapper.instance().serverSideErrorHandler;
			expect(typeof serverSideErrorHandlerProp).toBe('function');

			serverSideErrorHandlerProp(true);
			expect(wrapper.instance().state.hasServerSideErrorCode).toBeTruthy();

			serverSideErrorHandlerProp(false);
			expect(wrapper.instance().state.hasServerSideErrorCode).toBeFalsy();

			const resetServerSideErrorMockCallCount = resetServerSideErrorMock.mock.calls.length;
			expect(resetServerSideErrorMockCallCount).toBeDefined();
		});

		test('has componentDidUpdate as prop and is of type function when prevProps is true', () => {
			const componentDidUpdateProp = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateProp).toBe('function');

			const prevProps= {isForgotPasswordSuccess: false, error: 'error1'};
			wrapper.instance().componentDidUpdate(prevProps);

			expect(wrapper.instance().state.forgotPwdConfirm).toBeTruthy();
			expect(wrapper.instance().state.hasServerSideErrorCode).toBeTruthy();

			const resetServerSideErrorMockCallCount = resetServerSideErrorMock.mock.calls.length;
			expect(resetServerSideErrorMockCallCount).toBeDefined();
		});

		test('has componentDidUpdate as prop and is of type function when prevProps is false', () => {
			const componentDidUpdateProp = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateProp).toBe('function');

			const prevProps= {isForgotPasswordSuccess: true, error: 'error'};
			wrapper.instance().componentDidUpdate(prevProps);

			expect(wrapper.instance().state.forgotPwdConfirm).toBeFalsy();
			expect(wrapper.instance().state.hasServerSideErrorCode).toBeFalsy();

			const resetServerSideErrorMockCallCount = resetServerSideErrorMock.mock.calls.length;
			expect(resetServerSideErrorMockCallCount).toBe(0);

		});
	});
});

