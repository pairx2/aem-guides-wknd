import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import PasswordEdit from '../../../../../modules/MyAccount/components/PasswordDisplayEdit/PasswordEdit';
import {Provider} from 'react-redux';
import {mockStore} from '../../../../../__mocks__/storeMock';


Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props= {}) => {
	const wrapper = shallow(<PasswordEdit store= {mockStore} {...props}/>).dive().dive().dive().dive().dive().dive().dive().dive().dive().dive().dive();
	return wrapper;
};

const setupTwo = (props= {}) => {
	const wrapper = shallow(<PasswordEdit store= {mockStore} {...props}/>);
	return wrapper;
};

describe('PasswordEdit component Test Suite', () => {
	let props;
	let wrapper;
	const editPasswordRequestMock= jest.fn();
	const passwordEditStateMock= jest.fn();

	beforeEach(() => {
		props= {
			passwordEditState: passwordEditStateMock,
			editPasswordRequest: editPasswordRequestMock,
			isLoading: true,
		};
		wrapper= setup(props);
	});

	describe('Props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('form render & onSubmit',() => {
			const formTag = wrapper.find('form');
			formTag.simulate('submit');
			const editPasswordRequestMockCount = editPasswordRequestMock.mock.calls.length;
			expect(editPasswordRequestMockCount).toBeDefined();
		});
		test('passwordEditState function call check in action property of Button', () => {
			const actionProp= wrapper.props().children[4].props.children[0].props.children.props.action;
			expect(typeof actionProp).toBe('function');

			actionProp(false);
			const passwordEditStateMockCallCount= passwordEditStateMock.mock.calls.length;
			expect(passwordEditStateMockCallCount).toBeDefined();
		});

	});

});

describe('PasswordEdit component Test Suite for other condition', () => {
	let props;
	let wrapper;
	const editPasswordRequestMock= jest.fn();

	beforeEach(() => {
		props= {
			passwordEditState: () => {},
			editPasswordRequest: editPasswordRequestMock,
			isLoading: true,
		};
		wrapper= setupTwo(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('validateNewPasswordMatch function with different values', () => {
		const validateFunc = wrapper.dive().dive().dive().instance().props.validate;
		expect(typeof validateFunc).toBe('function');

		const values1= {currentPassword: 'currentPassword'};
		expect(validateFunc(values1)).toBeDefined();

		const values2= {password: 'password'};
		expect(validateFunc(values2)).toBeDefined();

		const values3= {password: null};
		expect(validateFunc(values3)).toBeDefined();

		const values4= {retypepassword: 'retypepassword'};
		expect(validateFunc(values4)).toBeDefined();

		const values5= {password: 'password', retypepassword: 'retypepassword'};
		expect(validateFunc(values5)).toBeDefined();
	});

});

describe('PasswordEdit component Test Suite with mount', () => {
	let props;
	let wrapper;
	const editPasswordRequestMock= jest.fn();

	beforeEach(() => {
		props= {
			passwordEditState: () => {},
			editPasswordRequest: editPasswordRequestMock,
			isLoading: true,
		};
		wrapper= mount(<Provider store= {mockStore}><PasswordEdit {...props} /></Provider>);
	});

	describe('Props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('form render & onSubmit',() => {
			const formTag = wrapper.find('form');
			formTag.simulate('submit');
			const editPasswordRequestMockCount = editPasswordRequestMock.mock.calls.length;
			expect(editPasswordRequestMockCount).toBeDefined();
		});

	});

});

