import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore} from '../../../../../__mocks__/storeMock';
import {
	validatePasswordCharacter,
	validatePasswordLength,
	validatePasswordNumber,
	validatePasswordSymbol,
} from '../../../../../modules/Form/components/PasswordStrengthFinder/PasswordStrengthFinderValidation';
import PasswordStrengthFinder from '../../../../../modules/Form/components/PasswordStrengthFinder/PasswordStrengthFinder';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props) => {
	const wrapper = shallow(<PasswordStrengthFinder store={mockStore} {...props} />);
	return wrapper;
};

describe('PasswordStrengthFinder Component Test Suite', () => {
	let props;
	let wrapper;
	const serverSideErrorHandlerMock =jest.fn();
	beforeEach(() => {
		props = {
			hasServerSideError: true,
			serverSideErrorHandler: serverSideErrorHandlerMock,
			dictionary: {},
			isRegistration: false
		};
		wrapper = setup(props);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	describe('functions check', () => {

		test('handlePasswordChange function call check', () => {
			const event = {
				target: {value: 'Anubhav12@'}
			  };
			wrapper.dive().dive().instance().handlePasswordChange(event);
			const password = event.target.value;
			wrapper.dive().dive().instance().setState({
				colorBar: {
					length: validatePasswordLength(password),
					character: validatePasswordCharacter(password),
					symbol: validatePasswordSymbol(password),
					number: validatePasswordNumber(password)
				}
			});
			expect(serverSideErrorHandlerMock.mock.calls.length).not.toBe(0);
		});
		test('handleConfirmPasswordChange function call check', () => {
			wrapper.dive().dive().instance().handleConfirmPasswordChange();
		});
	});
});
describe('PasswordStrengthFinder Component Test Suite', () => {
	let props;
	let wrapper;
	const serverSideErrorHandlerMock =jest.fn();
	beforeEach(() => {
		props = {
			hasServerSideError: false,
			serverSideErrorHandler: serverSideErrorHandlerMock,
			dictionary: {},
			isRegistration: true
		};
		wrapper = setup(props);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	describe('functions check', () => {

		test('handlePasswordChange function call check', () => {
			const event = {
				target: {value: 'Anubhav12@'}
			  };
			wrapper.dive().dive().instance().handlePasswordChange(event);
			const password = event.target.value;
			wrapper.dive().dive().instance().setState({
				colorBar: {
					length: validatePasswordLength(password),
					character: validatePasswordCharacter(password),
					symbol: validatePasswordSymbol(password),
					number: validatePasswordNumber(password)
				}
			});
			expect(serverSideErrorHandlerMock.mock.calls.length).toBe(0);
		});
		test('handleConfirmPasswordChange function call check', () => {
			wrapper.dive().dive().instance().handleConfirmPasswordChange();
		});
	});
});