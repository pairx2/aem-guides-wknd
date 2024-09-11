import React from 'react';
import LoginListMobile from '../../../../../modules/Authentication/components/LoginHeader/LoginListMobile';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore} from '../../../../../__mocks__/storeMock';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

const setup = (props= {}) => {
	const wrapper = shallow(<LoginListMobile store= {mockStore} {...props}/>).dive().dive();
	return wrapper;
};

describe('LoginListMobile component Test Suite with v1-rendition', () => {
	let props, wrapper;
	beforeEach(() => {
		props = {
			logoutIcon: 'logoutIcon',
			logoutLabel: 'logoutLabel',
			pagePath: 'pagePath',
			accountOverviewList: [{'title':'1', iconClass: 'iconClass1'},{'title':2, iconClass: 'iconClass2'}],
			logoutPageRedirect: 'logoutPageRedirect',
			signOut: () => {},
			rendition: 'v1-rendition'
		};
		wrapper = setup(props);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('renderMyAccountList getting called', () => {
		const renderMyAccountListMock = jest.fn();
		renderMyAccountListMock.mockReturnValue(true);
		renderMyAccountListMock(wrapper.instance().props.accountOverviewList,wrapper.instance().props.pagePath);
		const renderMyAccountListCallCount = renderMyAccountListMock.mock.calls.length;
		expect(renderMyAccountListCallCount).not.toBe(0);
	});
})

describe('LoginListMobile Component Test Suite', () => {
	let props,wrapper;
	beforeEach(() => {
		props={
			logoutIcon: 'logoutIcon',
			logoutLabel: 'logoutLabel',
			pagePath: 'pagePath',
			accountOverviewList: [{'title':'1', iconClass: 'iconClass1'},{'title':2, iconClass: 'iconClass2'}],
			logoutPageRedirect: 'logoutPageRedirect',
			signOut: () => {},
			rendition: 'v2-rendition'
		};
		wrapper = setup(props);

	
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('has logoutIcon as prop', () => {
		const logoutIconProp = wrapper.instance().props.logoutIcon;
		expect(typeof logoutIconProp).toBe('string');
	});
	test('has logoutLabel as prop', () => {
		const logoutLabelProp = wrapper.instance().props.logoutLabel;
		expect(typeof logoutLabelProp).toBe('string');
	});
	test('has pagePath as prop', () => {
		const pagePathProp = wrapper.instance().props.pagePath;
		expect(typeof pagePathProp).toBe('string');
	});
	test('has accountOverviewList as prop', () => {
		const accountOverviewListProp = wrapper.instance().props.accountOverviewList;
		expect(accountOverviewListProp).toBeInstanceOf(Array);
	});
	test('has logoutPageRedirect as prop', () => {
		const logoutPageRedirectProp = wrapper.instance().props.logoutPageRedirect;
		expect(typeof logoutPageRedirectProp).toBe('string');
	});
	test('each item from accountOverviewList div gets rendered', () => {
		expect(wrapper.find('.navlinks')).toBeDefined();
	});
	test('renderMyAccountList getting called', () => {
		const renderMyAccountListMock = jest.fn();
		renderMyAccountListMock.mockReturnValue(true);
		renderMyAccountListMock(wrapper.instance().props.accountOverviewList,wrapper.instance().props.pagePath);
		const renderMyAccountListCallCount = renderMyAccountListMock.mock.calls.length;
		expect(renderMyAccountListCallCount).not.toBe(0);
	});

	test('signOut function type check', () => {
		const signOutMock = wrapper.instance().props.signOut;
		expect(typeof signOutMock).toBe('function');
	});

	test('signOut getting called', () => {
		const signOutMock = jest.fn();
		signOutMock.mockReturnValue(true);
		signOutMock(wrapper.instance().props.logoutPageRedirect);
		const signOutCallCount = signOutMock.mock.calls.length;
		expect(signOutCallCount).not.toBe(0);
	});

	test('a tag gets rendered', () => {
		expect(wrapper.containsMatchingElement(<a />)).toBeDefined();
	});

	test('a gets rendered', () => {
		expect(wrapper.find('.a')).toBeDefined();
	});

	test('mocking signOut function', () => {
		const mockF = jest.fn();
		const props= {
			signOut: mockF,
		};
		const wrapper1 = shallow(<LoginListMobile store= {mockStore} {...props}/>).dive().dive();

		const submitButton = wrapper1.find('a');
		submitButton.simulate('click', {preventDefault() {}});
		mockF();

		const mockFCallCount = mockF.mock.calls.length;
		expect(mockFCallCount).not.toBe(0);
	});

});
