import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore, mockStoreOrder} from '../../../../../__mocks__/storeMock';

import Greeting from '../../../../../modules/MyAccount/components/Greeting/Greeting';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props = {}) => {
	const wrapper = shallow(<Greeting store={mockStore} {...props} />).dive().dive();
	return wrapper;
};

const setupTwo = (props = {}) => {
	const wrapper = shallow(<Greeting store={mockStoreOrder} {...props} />).dive().dive();
	return wrapper;
};

describe('Greeting component Test Suite when isLoggedIn is true', () => {
	let props, wrapper;
	const loginMock= jest.fn();

	beforeEach(() => {
		props = {
			messageMorning: 'messageMorning',
			messageAfternoon: 'messageAfternoon',
			messageEvening: 'messageEvening',
			login: loginMock,
		};
		wrapper = setup(props);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('messageMorning proptype', () =>{
			const messageMorningProp= wrapper.instance().props.messageMorning;
			expect(typeof messageMorningProp).toBe('string');
		});

		test('messageAfternoon proptype', () =>{
			const messageAfternoonProp= wrapper.instance().props.messageAfternoon;
			expect(typeof messageAfternoonProp).toBe('string');
		});

		test('messageEvening proptype', () =>{
			const messageEveningProp= wrapper.instance().props.messageEvening;
			expect(typeof messageEveningProp).toBe('string');
		});

		test('has isLoggedIn as prop and is of type boolean', () => {
			const isLoggedInProp = wrapper.instance().props.isLoggedIn;
			expect(typeof isLoggedInProp).toBe('boolean');
		});

		test('has isLoading as prop and is of type boolean', () => {
			const isLoadingProp = wrapper.instance().props.isLoading;
			expect(typeof isLoadingProp).toBe('boolean');
		});

		test('has customer as prop and is of type object', () => {
			const customerProp = wrapper.instance().props.customer;
			expect(customerProp).toBeInstanceOf(Object);
		});

		test('has login as prop and is of type function', () => {
			const loginProp = wrapper.instance().props.login;
			expect(typeof loginProp).toBe('function');
		});

	});

	describe('functions check', () => {

		test('state acccess check', () => {
			const state = wrapper.instance().state;
			expect(state).toBeInstanceOf(Object);

			expect(typeof state.greeting).toBe('string');
		});

		test('times acccess check', () => {
			const times = wrapper.instance().times;
			expect(times).toBeInstanceOf(Object);

			expect(typeof times.noon).toBe('number');
			expect(times.noon).toBe(12);

			expect(typeof times.evening).toBe('number');
			expect(times.evening).toBe(18);
		});

		test('setMessage acccess check', () => {
			const setMessageMock = wrapper.instance().setMessage;
			expect(typeof setMessageMock).toBe('function');
			setMessageMock();

			const currentHour = new Date().getHours();
			const noonTimes = wrapper.instance().times.noon;
			const eveningTimes = wrapper.instance().times.evening;
			const greetingState = wrapper.instance().state.greeting;
			const messageMorningProp= wrapper.instance().props.messageMorning;
			const messageAfternoonProp= wrapper.instance().props.messageAfternoon;
			const messageEveningProp= wrapper.instance().props.messageEvening;

			if(currentHour < noonTimes){
				expect(greetingState).toBe(messageMorningProp);
			} else if(currentHour < eveningTimes){
				expect(greetingState).toBe(messageAfternoonProp);
			} else {
				expect(greetingState).toBe(messageEveningProp);
			}
		});

		test('componentDidMount function call', () => {
			const componentDidMountMock = wrapper.instance().componentDidMount;
			expect(typeof componentDidMountMock).toBe('function');

			wrapper.instance().componentDidMount();

			const loginMockCallCount = loginMock.mock.calls.length;
			expect(loginMockCallCount).toBeDefined();
		});
	});
});

describe('Greeting component Test Suite', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			messageMorning: 'messageMorning',
			messageAfternoon: 'messageAfternoon',
			messageEvening: 'messageEvening',
			login: () => {},
		};
		wrapper = mount(<Greeting store={mockStore} {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});

describe('Greeting component Test Suite when isLoggedIn is true', () => {
	let props, wrapper;
	const loginMock= jest.fn();

	beforeEach(() => {
		props = {
			messageMorning: 'messageMorning',
			messageAfternoon: 'messageAfternoon',
			messageEvening: 'messageEvening',
			login: loginMock,
		};
		wrapper = setupTwo(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});
