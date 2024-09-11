import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import PasswordDisplayEdit from '../../../../../modules/MyAccount/components/PasswordDisplayEdit/PasswordDisplayEdit';
import {mockStore, mockStoreOrder} from '../../../../../__mocks__/storeMock';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

const setup = (props= {}) => {
	const wrapper = shallow(<PasswordDisplayEdit store= {mockStore} {...props}/>).dive().dive();
	return wrapper;
};
const setupTwo = (props= {}) => {
	const wrapper = shallow(<PasswordDisplayEdit store= {mockStoreOrder} {...props}/>).dive().dive();
	return wrapper;
};

describe('PasswordDisplayEdit Component Test Suite', () => {

	let props, wrapper;

	beforeEach(() => {
		props= {
			displayHeader: 'displayHeader',
			editHeader: 'editHeader'
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

		test('has displayHeader as prop and is of type string', () => {
			const displayHeaderProp = wrapper.instance().props.displayHeader;
			expect(typeof displayHeaderProp).toBe('string');
		});

		test('has editHeader as prop and is of type string', () => {
			const editHeaderProp = wrapper.instance().props.editHeader;
			expect(typeof editHeaderProp).toBe('string');
		});

		test('has passwordError as prop and is of type string', () => {
			const passwordErrorProp = wrapper.instance().props.passwordError;
			expect(typeof passwordErrorProp).toBe('string');
		});

		test('has emailError as prop and is of type string', () => {
			const emailErrorProp = wrapper.instance().props.emailError;
			expect(typeof emailErrorProp).toBe('string');
		});

		test('has isLoading as prop and is of type boolean', () => {
			const isLoadingProp = wrapper.instance().props.isLoading;
			expect(typeof isLoadingProp).toBe('boolean');
		});

		test('has emailUpdated as prop and is of type boolean', () => {
			const emailUpdatedProp = wrapper.instance().props.emailUpdated;
			expect(typeof emailUpdatedProp).toBe('boolean');
		});

		test('has isEmailLoading as prop and is of type string', () => {
			const isEmailLoadingProp = wrapper.instance().props.isEmailLoading;
			expect(typeof isEmailLoadingProp).toBe('boolean');
		});

		test('has isPasswordUpdated as prop and is of type boolean', () => {
			const isPasswordUpdatedProp = wrapper.instance().props.isPasswordUpdated;
			expect(typeof isPasswordUpdatedProp).toBe('boolean');
		});

		test('has isSocial as prop and is of type boolean', () => {
			const isSocialProp = wrapper.instance().props.isSocial;
			expect(typeof isSocialProp).toBe('boolean');
		});

	});

	describe('state check', () => {

		test('state check', () => {
			const stateCheck = wrapper.instance().state;
			expect(stateCheck).toBeInstanceOf(Object);

			expect(stateCheck.isEditingMock).toBeFalsy();
			expect(stateCheck.isEmailEditingMock).toBeFalsy();
		});
	});

	describe('Functions check', () => {

		test('passwordEditState function call check', () => {
			const passwordEditStateMock = wrapper.instance().passwordEditState;
			expect(typeof passwordEditStateMock).toBe('function');

			passwordEditStateMock(false);
			expect(wrapper.instance().state.isEditing).toBeFalsy();
			passwordEditStateMock(true);
			expect(wrapper.instance().state.isEditing).toBeTruthy();
		});

		test('emailEditState function call check', () => {
			const emailEditStateMock = wrapper.instance().emailEditState;
			expect(typeof emailEditStateMock).toBe('function');

			emailEditStateMock(false);
			expect(wrapper.instance().state.isEditing).toBeFalsy();
		});

		test('componentDidUpdate function call check', () => {
			const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateMock).toBe('function');

			const prevProps = {'isLoading': true, 'isEmailLoading': true};
			wrapper.instance().componentDidUpdate(prevProps);

			expect(wrapper.instance().state.isEditing).toBeFalsy();
		});
		test('setting state for final if block - jsx', () => {
			wrapper.instance().setState({
				isEditing: false,
				isEmailEditing: false
			});
		});
	});

});

describe('PasswordDisplayEdit Component Test Suite', () => {

	let props, wrapper;

	beforeEach(() => {
		props= {
			displayHeader: 'displayHeader',
			editHeader: 'editHeader'
		};
		wrapper= setupTwo(props);
	});

	describe('Render', () => {

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});
	});

	describe('state check', () => {

		test('state check', () => {
			const stateCheck = wrapper.instance().state;
			expect(stateCheck).toBeInstanceOf(Object);

			expect(stateCheck.isEditingMock).toBeFalsy();
			expect(stateCheck.isEmailEditingMock).toBeFalsy();
		});
	});

	describe('Functions check', () => {

		test('componentDidUpdate function call check', () => {
			const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateMock).toBe('function');

			const prevProps = {'isLoading': false, 'isEmailLoading': true};
			wrapper.instance().componentDidUpdate(prevProps);

			expect(wrapper.instance().state.isEditing).toBeFalsy();
		});
	});

});
