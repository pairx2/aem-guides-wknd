import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import LoginHeaderListItems from '../../../../../modules/Authentication/components/LoginHeader/LoginHeaderListItems';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

describe('LoginHeaderListItems Component Test Suite', () => {
	let props, wrapper, wrapper1;
	let logoutIcon, logoutLabel, logoutPageRedirect, handleLogout;
	const handleLogoutMock = jest.fn();
	beforeEach(() => {
		props = {
			headerList: [
				{createdId : '123344'},
				{title: 'title'},
			],
			pagePath: 'pagePath',
			logoutIcon: 'logoutIcon',
			logoutLabel: 'logoutLabel',
			logoutPageRedirect: 'logoutPageRedirect',
			handleLogout: handleLogoutMock
		};
		logoutIcon= 'logoutIcon';
		logoutLabel= 'logoutLabel';
		logoutPageRedirect= 'logoutPageRedirect';
		handleLogout= handleLogoutMock;
		wrapper = shallow(<LoginHeaderListItems {...props} />);
	});

	test('render null check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('has logoutLabel as prop and type check', () => {
		const logoutLabelProp = wrapper.props().children.props.children[1].props.children.props.logoutLabel;
		expect(logoutLabelProp).toBe(logoutLabel);
		expect(typeof logoutLabelProp).toBe('string');
	});
	test('has logoutPageRedirect as prop and type check', () => {
		const logoutPageRedirectProp = wrapper.props().children.props.children[1].props.children.props.logoutPageRedirect;
		expect(logoutPageRedirectProp).toBe(logoutPageRedirect);
		expect(typeof logoutPageRedirectProp).toBe('string');
	});

	test('has handlelogout as prop and type check', () => {
		const handleLogoutProp = wrapper.props().children.props.children[1].props.onClick;
		expect(handleLogoutProp).toBe(handleLogout);
		expect(typeof handleLogoutProp).toBe('function');
	});
});


describe('LoginHeaderListItems Component Test Suite', () => {
	let props, wrapper;
	const closeNaveRightMock = jest.fn();
	const handleLogoutMock = jest.fn();
	beforeEach(() => {
		props = {
			headerList: [
				{createdId : '123344'},
				{title: 'title'},
			],
			pagePath: 'pagePath',
			logoutIcon: 'logoutIcon',
			logoutLabel: 'logoutLabel',
			logoutPageRedirect: 'logoutPageRedirect',
			rendition: 'v2-rendition',
			closeNaveRight: closeNaveRightMock,
			handleLogout: handleLogoutMock
		};
		if(!window.dataLayer) window.dataLayer = [];
		wrapper = shallow(<LoginHeaderListItems {...props} />);
	});

	test('render null check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('refresh page',() => {
		const element = wrapper.find('a');
		element.simulate("click");
	});

});

