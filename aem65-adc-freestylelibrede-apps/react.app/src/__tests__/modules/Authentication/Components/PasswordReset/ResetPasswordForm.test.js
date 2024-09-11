import React from 'react';
import Enzyme, {shallow,mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore} from '../../../../../__mocks__/storeMock';
import ResetPasswordForm, {resetPasswordFormField} from '../../../../../modules/Authentication/components/PasswordReset/ResetPasswordForm';
import {Provider} from 'react-redux';
jest.mock('../../../../../utils/cachingUtils.js');
jest.mock('../../../../../utils/endpointUrl.js');

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props) => {
	const wrapper = shallow(<ResetPasswordForm store={mockStore} {...props} />).dive().dive();
	return wrapper;
};

describe('resetPasswordFormField Test Suite', () => {
	const dispatch = jest.fn();
	resetPasswordFormField(null, dispatch);

});

describe('ResetPasswordForm test suite',() => {
	let props, wrapper;
	const serverSideErrorHandlerMock = jest.fn();

	beforeEach(() => {
		props = {
			resetPasswordHeading: 'resetPasswordHeadingString',
			backToLogin: 'backToLoginString',
			resetPasswordSubheading: 'resetPasswordSubheadingString',
			backToLoginUrl: 'backToLoginUrlString',
			submitCtaText: 'submitCtaTextString',
			hasServerSideError:true,
			serverSideErrorHandler:serverSideErrorHandlerMock,

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
	});
});
describe('ResetPasswordForm test suite',() => {
	let props, wrapper;
	const serverSideErrorHandlerMock = jest.fn();

	beforeEach(() => {
		props = {
			resetPasswordHeading: 'resetPasswordHeadingString',
			backToLogin: 'backToLoginString',
			resetPasswordSubheading: 'resetPasswordSubheadingString',
			backToLoginUrl: 'backToLoginUrlString',
			submitCtaText: 'submitCtaTextString',
			hasServerSideError:true,
			serverSideErrorHandler:serverSideErrorHandlerMock,

		};
		wrapper = mount(<Provider store={mockStore} ><ResetPasswordForm {...props} /></Provider>);
	});
	describe('render &  props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});
	});
});