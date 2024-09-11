import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore, mockStoreOrder} from '../../../../../__mocks__/storeMock';
import ResetPassword from '../../../../../modules/Authentication/components/PasswordReset/ResetPassword';
import ResetPasswordForm from '../../../../../modules/Authentication/components/PasswordReset/ResetPasswordForm';


Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props) => {
	const wrapper = shallow(<ResetPassword store={mockStore} {...props} />).dive().dive();
	return wrapper;
};

describe('ResetPassword test suite',() => {
	let props, wrapper;
	const resetPasswordMock = jest.fn();

	beforeEach(() => {
		props = {
			resetPassword: resetPasswordMock ,
			resetPasswordHeading: 'resetPasswordHeadingString',
			backToLogin: 'backToLoginString',
			resetPasswordSubheading: 'resetPasswordSubheadingString',
			backToLoginUrl: 'backToLoginUrlString',
			submitCtaText: 'submitCtaTextString',
			accountLink: 'accountLink'
		};
		wrapper = setup(props);
	});
	describe('render &  props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});
		test('user object',() => {
			expect(typeof wrapper.instance().props.user).toBe('object');
		});

	});
	describe('lifecycle methods check', () => {

		test('propsDidChange',() => {
			const prevProps = {
				resetPassword: resetPasswordMock ,
				resetPasswordHeading: 'a',
				backToLogin: 'b',
				resetPasswordSubheading: 'c',
				backToLoginUrl: 'd',
				submitCtaText: 'e',
				user: {},
				error:{'null':'null'},
				accountLink: 'accountLink'
			};
			const didChange = wrapper.instance().propsDidChange(prevProps);
			expect(didChange).toBe(true);
		});
		test('componentdidUpdate when propsDidChange true',() => {
			const prevProps = {
				resetPassword: resetPasswordMock ,
				resetPasswordHeading: 'a',
				backToLogin: 'b',
				resetPasswordSubheading: 'c',
				backToLoginUrl: 'd',
				submitCtaText: 'e',
				user: {},
				error:'error',
				accountLink: 'accountLink'
			};
			wrapper.instance().componentDidUpdate(prevProps);
		});
		test('componentdidUpdate when propsDidChange false',() => {
			const prevProps = {...wrapper.instance().props};
			wrapper.instance().componentDidUpdate(prevProps);
		});
	});
	describe('method calls',() => {
		test('serverSideErrorHandler',() => {
			const flag = wrapper.instance().state.hasServerSideError;
			wrapper.instance().serverSideErrorHandler(!flag);
			expect(flag).not.toBe(wrapper.instance().state.hasServerSideError);
		});
		test('Submit - password, retypepassword are equal',() => {
			const value = {
				password: 'qw12as34zx56',
				retypepassword: 'qw12as34zx56',
				confirmCode:'123456'
			};
			wrapper.instance().submit(value);
		});
		test('Submit - password, retypepassword are not equal',() => {
			const value = {
				password: '12qw34as56zx',
				retypepassword: 'qw12as34zx56',
				confirmCode:'123456'
			};
			wrapper.instance().submit(value);
		});

	});
	describe('render jsx isEditing state false', () => {
		test('ResetPasswordForm',() => {
			expect(wrapper.containsMatchingElement(<ResetPasswordForm />)).toBeDefined();
		});
		test('ResetPasswordForm props',() => {
			expect(wrapper.props().resetPasswordHeading).toBe(wrapper.instance().props.resetPasswordHeading);
			expect(wrapper.props().resetPasswordSubheading).toBe(wrapper.instance().props.resetPasswordSubheading);
			expect(wrapper.props().backToLogin).toBe(wrapper.instance().props.backToLogin);
			expect(wrapper.props().submitCtaText).toBe(wrapper.instance().props.submitCtaText);
			expect(wrapper.props().backToLoginUrl).toBe(wrapper.instance().props.backToLoginUrl);
			expect(wrapper.props().hasServerSideError).toBe(wrapper.instance().state.hasServerSideError);

		});

	});


});
describe('ResetPassword test suite',() => {
	let props, wrapper;
	const resetPasswordMock = jest.fn();

	beforeEach(() => {
		props = {
			resetPassword: resetPasswordMock ,
			resetPasswordHeading: 'resetPasswordHeadingString',
			backToLogin: 'backToLoginString',
			resetPasswordSubheading: 'resetPasswordSubheadingString',
			backToLoginUrl: 'backToLoginUrlString',
			submitCtaText: 'submitCtaTextString',
			accountLink: 'accountLink'
		};
		wrapper = shallow(<ResetPassword store={mockStoreOrder} {...props} />).dive().dive();
	});
	describe('render &  props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});
	});
	describe('lifecycle methods check', () => {

		test('propsDidChange',() => {
			const prevProps = {
				resetPassword: resetPasswordMock ,
				resetPasswordHeading: 'a',
				backToLogin: 'b',
				resetPasswordSubheading: 'c',
				backToLoginUrl: 'd',
				submitCtaText: 'e',
				user: {},
				error:{'null':'null'},
				accountLink: 'accountLink'
			};
			const didChange = wrapper.instance().propsDidChange(prevProps);
			expect(didChange).toBe(true);
		});
		test('componentdidUpdate when propsDidChange true',() => {
			const prevProps = {
				resetPassword: resetPasswordMock ,
				resetPasswordHeading: 'a',
				backToLogin: 'b',
				resetPasswordSubheading: 'c',
				backToLoginUrl: 'd',
				submitCtaText: 'e',
				user: {},
				error:null,
				accountLink: 'accountLink'
			};
			wrapper.instance().componentDidUpdate(prevProps);
		});
		test('componentdidUpdate when propsDidChange false',() => {
			const prevProps = {...wrapper.instance().props};
			wrapper.instance().componentDidUpdate(prevProps);
		});
	});


});