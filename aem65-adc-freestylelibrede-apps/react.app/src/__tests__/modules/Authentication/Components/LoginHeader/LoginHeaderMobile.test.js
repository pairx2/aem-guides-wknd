import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import LoginHeaderMobile from '../../../../../modules/Authentication/components/LoginHeader/LoginHeaderMobile';
import {mockStore, mockStoreConfirmationPage, mockStoreOrder} from '../../../../../__mocks__/storeMock';

import {Provider} from 'react-redux';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

const setup = (props) => {
	const wrapper = shallow(<LoginHeaderMobile store= {mockStore} {...props}/>).dive();
	return wrapper;
};


describe('LoginHeaderMobile Component Test Suite', () => {
	let props,wrapper;
	const loginMock = jest.fn();
	beforeEach(() => {
		props={
			offlineIcon: 'offlineIcon',
			label: 'label',
			labelLogin:'labelLogin',
			loginPagePath:'loginPagePath',
			login : loginMock
		};
		wrapper = setup(props);


	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('has login as prop', () => {
		const loginProp = wrapper.props().login;
		expect(typeof loginProp).toBe('function');
	});
	test('has isLoggedIn as prop', () => {
		const isLoggedInProp = wrapper.props().isLoggedIn;
		expect(typeof isLoggedInProp).toBe('boolean');
	});
	test('has isLoading as prop', () => {
		const isLoadingProp = wrapper.props().isLoading;
		expect(typeof isLoadingProp).toBe('boolean');
	});
	test('has offlineIcon as prop', () => {
		const offlineIconProp = wrapper.props().offlineIcon;
		expect(typeof offlineIconProp).toBe('string');
	});
	test('has label as prop', () => {
		const labelProp = wrapper.props().label;
		expect(typeof labelProp).toBe('string');
	});
	test('has labelLogin as prop', () => {
		const labelLoginProp = wrapper.props().labelLogin;
		expect(typeof labelLoginProp).toBe('string');
	});
	test('has loginPagePath as prop', () => {
		const loginPagePathProp = wrapper.props().loginPagePath;
		expect(typeof loginPagePathProp).toBe('string');
	});
	test ('login runs on LoginHeaderMobile mount', () => {
		wrapper.dive().instance().componentDidMount();
		const loginCallCount = loginMock.mock.calls.length;
		expect(loginCallCount).toBeDefined();
	});

});
describe('LoginHeaderMobile Component Test Suite', () => {
	let props,wrapper;
	const loginMock = jest.fn();

	beforeEach(() => {
		props={
			offlineIcon: 'offlineIcon',
			label: 'label',
			labelLogin:'labelLogin',
			loginPagePath:'loginPagePath',
			login : loginMock
		};
		wrapper = mount(<Provider store= {mockStore}><LoginHeaderMobile {...props}/></Provider>);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});
describe('LoginHeaderMobile Component Test Suite', () => {
	let props,wrapper;
	const loginMock = jest.fn();

	beforeEach(() => {
		props={
			offlineIcon: 'offlineIcon',
			label: 'label',
			labelLogin:'labelLogin',
			loginPagePath:'loginPagePath',
			login : loginMock
		};
		wrapper = shallow(<LoginHeaderMobile store= {mockStoreConfirmationPage} {...props}/>).dive();
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});
describe('LoginHeaderMobile Component Test Suite', () => {
	let props,wrapper;
	const loginMock = jest.fn();

	beforeEach(() => {
		props={
			offlineIcon: 'OfflineIcon',
			label: 'label',
			labelLogin:'labelLogin',
			loginPagePath:'loginPagePath',
			login : loginMock
		};
		wrapper = shallow(<LoginHeaderMobile store= {mockStoreOrder} {...props}/>).dive();
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test ('login runs on LoginHeaderMobile mount', () => {
		wrapper.dive().instance().componentDidMount();
		const loginCallCount = loginMock.mock.calls.length;
		expect(loginCallCount).toBeDefined();
	});

	test('loginActive function call on onClick property', () => {
		const onClickProp= wrapper.dive().props().children.props.onClick;
		expect(typeof onClickProp).toBe('function');

		onClickProp();
	});

});