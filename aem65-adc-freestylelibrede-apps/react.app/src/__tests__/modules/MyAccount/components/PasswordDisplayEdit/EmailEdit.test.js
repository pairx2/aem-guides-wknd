import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import EmailEdit from '../../../../../modules/MyAccount/components/PasswordDisplayEdit/EmailEdit';
import {Provider} from 'react-redux';
import {mockStore} from '../../../../../__mocks__/storeMock';


Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props= {}) => {
	const wrapper = shallow(<EmailEdit store= {mockStore} {...props}/>).dive().dive().dive().dive().dive().dive().dive().dive().dive().dive().dive();
	return wrapper;
};

const setupTwo = (props= {}) => {
	const wrapper = shallow(<EmailEdit store= {mockStore} {...props}/>);
	return wrapper;
};

describe('EmailEdit component Test Suite', () => {
	let props, wrapper;
	const cancelEmailEditStateMock= jest.fn();
	const updateEmailRequestMock= jest.fn();

	beforeEach(() => {
		props= {
			cancelEmailEditState: cancelEmailEditStateMock,
			isLoading: true,
			currentUserEmail: 'currentUserEmail',
			updateEmailRequest: updateEmailRequestMock,
			emailError: null
		};
		wrapper= setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('updateEmail function call in form tag', () => {
		const formTag= wrapper.find('form').simulate('submit');
		expect(formTag).toBeDefined();

		const updateEmailRequestMockCallCount = updateEmailRequestMock.mock.calls.length;
		expect(updateEmailRequestMockCallCount).toBeDefined();
	});
	test('cancelEmailEditState function call check in action property of Button', () => {
		const actionProp= wrapper.props().children[7].props.children[0].props.children.props.action;
		expect(typeof actionProp).toBe('function');

		actionProp(false);
		const cancelEmailEditStateMockCallCount= cancelEmailEditStateMock.mock.calls.length;
		expect(cancelEmailEditStateMockCallCount).toBeDefined();
	});

});

describe('EmailEdit component Test Suite', () => {
	let props, wrapper;
	const cancelEmailEditStateMock= jest.fn();
	const updateEmailRequestMock= jest.fn();

	beforeEach(() => {
		props= {
			cancelEmailEditState: cancelEmailEditStateMock,
			isLoading: true,
			currentUserEmail: 'currentUserEmail',
			updateEmailRequest: updateEmailRequestMock,
			emailError: 'emailError'
		};
		wrapper= setupTwo(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('validateNewPasswordMatch function with different values', () => {
		const validateFunc = wrapper.dive().dive().dive().instance().props.validate;
		expect(typeof validateFunc).toBe('function');

		const values1= {Password: 'Password'};
		expect(validateFunc(values1)).toBeDefined();

		const values2= {newEmail: 'newEmail@mail.com'};
		expect(validateFunc(values2)).toBeDefined();

		const values3= {RepeatNewEmail: 'RepeatNewEmail@mail.com'};
		expect(validateFunc(values3)).toBeDefined();

		const values4= {newEmail: 'newEmail@mail.com', RepeatNewEmail: 'RepeatNewEmail@mail.com'};
		expect(validateFunc(values4)).toBeDefined();
	});

	test('validateFraudEmails function with different values', () => {

		const validateFunc = wrapper.dive().dive().dive().instance().props.validate;

		const values= {newEmail: 'newEmail0@test.com', RepeatNewEmail: 'newEmail1@test.com'};
		expect(validateFunc(values)).toBeDefined();
	});

	test('validateemail function with different values', () => {
		const validateFunc = wrapper.dive().dive().dive().instance().props.validate;
		expect(typeof validateFunc).toBe('function');

		const values1= {newEmail: 'newEmail', RepeatNewEmail: 'RepeatNewEmail'};
		expect(validateFunc(values1)).toBeDefined();
	});

});

describe('EmailEdit component Test Suite with mount', () => {
	let props, wrapper;
	const cancelEmailEditStateMock= jest.fn();
	const updateEmailRequestMock= jest.fn();

	beforeEach(() => {
		props= {
			cancelEmailEditState: cancelEmailEditStateMock,
			isLoading: true,
			currentUserEmail: 'currentUserEmail',
			updateEmailRequest: updateEmailRequestMock,
			emailError: 'emailError'
		};
		wrapper= mount(<Provider store= {mockStore}><EmailEdit {...props} /></Provider>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('form render & onSubmit',() => {
		wrapper.find('input').at(0).instance().value="hello@test0.com";
		wrapper.find('input').at(0).simulate('change');
		wrapper.find('input').at(1).instance().value="hello@test0.com";
		wrapper.find('input').at(1).simulate('change');
		const formTag = wrapper.find('form');
		formTag.simulate('submit');
		const updateEmailRequestMockCount = updateEmailRequestMock.mock.calls.length;
		expect(updateEmailRequestMockCount).toBeDefined();
	});
});