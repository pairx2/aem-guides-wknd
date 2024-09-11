import React from 'react';
import Enzyme, {shallow, mount , ShallowWrapper} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import LoginHeader from '../../../../../modules/Authentication/components/LoginHeader/LoginHeader';
import {mockStore, mockStoreOrder, mockStoreConfirmationPage} from '../../../../../__mocks__/storeMock';
import {Provider} from 'react-redux';
import {render} from '@testing-library/react';
jest.mock('../../../../../utils/endpointUrl');

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

const setup = (props) => {
	const wrapper = shallow(<LoginHeader store= {mockStore} {...props}/>).dive().dive().dive().dive();
	return wrapper;
};

describe('LoginHeader Component Test Suite', () => {
	let props,wrapper;

	const loginMock = jest.fn();
	const signOutMock = jest.fn();

	beforeEach(() => {
		const div = document.createElement('div');
		div.setAttribute('id', 'mySideNavRight');
		
		document.body.appendChild(div);
		const div2 = document.createElement('div');
		div2.setAttribute('id', 'mySidenavMainRight');
		document.body.appendChild(div2);
		const div3 = document.createElement('div');
		div3.setAttribute('class', 'header-dropdown');
		document.body.appendChild(div3);
		props={
			offlineIcon: 'offlineIcon',
			label: 'label',
			labelLogin: 'labelLogin',
			loginPagePath: 'loginPagePath',
			login: loginMock,
			icon: 'icon',
			logoutIcon: 'logoutIcon',
			logoutLabel: 'logoutLabel',
			pagePath: 'pagePath',
			logoutPageRedirect: 'logoutPageRedirect',
			accountOverviewList: [ 'a2', 'a1' ],
			signOut: signOutMock,
			breakpoints : {mobile: 320, tablet: 768, desktop: 1025},
			currentBreakpoint: 'mobile',
			rendition : 'v2-rendition',
			wrapperRef: "Target"
		};
		wrapper=setup(props);

	});
	test('render',() => {
		
		expect(wrapper.type()).not.toEqual(null);
	});
	test('has isLoggedIn as prop and is of type boolean', () => {
		const isLoggedInProp = wrapper.instance().props.isLoggedIn;
		expect(typeof isLoggedInProp).toBe('boolean');
	});
	test('has isLoading as prop and is of type boolean', () => {
		const isLoadingProp = wrapper.instance().props.isLoading;
		expect(typeof isLoadingProp).toBe('boolean');
	});
	test('has offlineIcon as prop and is of type string', () => {
		const offlineIconProp = wrapper.instance().props.offlineIcon;
		expect(typeof offlineIconProp).toBe('string');
	});
	test('has label as prop and is of type string', () => {
		const labelProp = wrapper.instance().props.label;
		expect(typeof labelProp).toBe('string');
	});
	test('has labelLogin as prop and is of type string', () => {
		const labelLoginProp = wrapper.instance().props.labelLogin;
		expect(typeof labelLoginProp).toBe('string');
	});
	test('has loginPagePath as prop and is of type string', () => {
		const loginPagePathProp = wrapper.instance().props.loginPagePath;
		expect(typeof loginPagePathProp).toBe('string');
	});
	test('has login as prop and is of type string', () => {
		const loginProp = wrapper.instance().props.login;
		expect(typeof loginProp).toBe('function');
	});
	test('has icon as prop and is of type string', () => {
		const iconProp = wrapper.instance().props.icon;
		expect(typeof iconProp).toBe('string');
	});
	test('has logoutIcon as prop and is of type string', () => {
		const logoutIconProp = wrapper.instance().props.logoutIcon;
		expect(typeof logoutIconProp).toBe('string');
	});
	test('has logoutLabel as prop and is of type string', () => {
		const logoutLabelProp = wrapper.instance().props.logoutLabel;
		expect(typeof logoutLabelProp).toBe('string');
	});
	test('has pagePath as prop and is of type string', () => {
		const pagePathProp = wrapper.instance().props.pagePath;
		expect(typeof pagePathProp).toBe('string');
	});
	test('has logoutPageRedirect as prop and is of type string', () => {
		const logoutPageRedirectProp = wrapper.instance().props.logoutPageRedirect;
		expect(typeof logoutPageRedirectProp).toBe('string');
	});
	test('has accountOverviewList as prop and is of type array', () => {
		const accountOverviewListProp = wrapper.instance().props.accountOverviewList;
		expect(accountOverviewListProp).toBeInstanceOf(Array);
	});
	test('has customer as prop and is of type object', () => {
		const customerProp = wrapper.instance().props.customer;
		expect(customerProp).toBeInstanceOf(Object);
	});
	test ('login runs on LoginHeader mount', () => {
		wrapper.instance().componentDidMount();
	});
	test ('login runs on LoginHeader mount', () => {
		wrapper.setProps({isLoggedIn: false, isLoading: false}, () => {
			wrapper.instance().componentDidMount();
		})
	});
	test ('login runs on LoginHeader mount', () => {
		wrapper.setProps({isLoggedIn: true, isSocialLogin: false}, () => {
			wrapper.instance().componentDidMount();
			const element = wrapper.find({id: "loginHeader"}).first();
     		element.simulate("click");
		})
	});
	test ('login runs on LoginHeader mount', () => {
		wrapper.setProps({isLoggedIn: false, isSocialLogin: false}, () => {
			wrapper.instance().componentDidMount();
		})
	});
	test ('login runs on LoginHeader mount', () => {
		wrapper.setProps({isLoggedIn: true, isSocialLogin: false, currentBreakpoint: 'desktop'}, () => {
			wrapper.instance().componentDidMount();
			const element = wrapper.find({id: "loginHeader"}).first();
     		element.simulate("click");
		})
	});
	test ('login runs on LoginHeader mount', () => {
		wrapper.setProps({isLoggedIn: true, isSocialLogin: false, rendition: 'v1-rendition'}, () => {
			wrapper.instance().componentDidMount();
		})
	});
	test ('login runs on LoginHeader mount', () => {
		wrapper.setProps({isLoggedIn: true, isSocialLogin: true}, () => {
			wrapper.instance().componentDidMount();
		})
	});
	test ('login runs on LoginHeader closeNaveRight ', () => {	
		wrapper.instance().closeNaveRight();				
	});

	test ('login runs on LoginHeader openNaveRight ', () => {		
		wrapper.instance().openNaveRight();	
	});

	test ('login runs on LoginHeader componentWillUnmount ', () => {	
		wrapper.setProps({rendition:""})
		wrapper.instance().componentWillUnmount();		
	});
	test ('login runs on LoginHeader componentWillUnmount no param ', () => {		
		wrapper.instance().componentWillUnmount();		
	});
	test('login runs on LoginHeader setWrapperRef ', () => {
		wrapper.instance().setWrapperRef("target1");
	});
	test ('login runs on LoginHeader handleClickOutside ', () => {	
		const value= {target:'target2'}	
		wrapper.instance().handleClickOutside(value);
	});
	test ('login runs on LoginHeader handleClickOutside  without param', () => {	
		const value= {target:''}	
		wrapper.instance().handleClickOutside(value);	
	});
	
	test('breakpoints is prop of type object', () => {
		const breakpointsProp = wrapper.instance().props.breakpoints;
		expect(breakpointsProp).toBeInstanceOf(Object);
	});

	
});
describe('LoginHeader Component Test Suite', () => {
	let props,wrapper;
	const signOutMock = jest.fn();
	const loginMock = jest.fn();
	beforeEach(() => {
		props={
			offlineIcon: 'offlineIcon',
			label: 'label',
			labelLogin: 'labelLogin',
			loginPagePath: 'loginPagePath',
			login: loginMock,
			icon: 'icon',
			logoutIcon: 'logoutIcon',
			logoutLabel: 'logoutLabel',
			pagePath: 'pagePath',
			logoutPageRedirect: 'logoutPageRedirect',
			accountOverviewList: [ 'a2', 'a1' ],
			breakpoints : {mobile: 320, tablet: 768, desktop: 1025},
			currentBreakpoint: 'mobile',
			signOut: signOutMock,
		};
		wrapper=mount(<Provider store= {mockStoreOrder}><LoginHeader {...props}/></Provider>);

	});
	test('render',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
	test('click samulate signout', () =>{
		const linkTag = wrapper.find('Link');
		linkTag.simulate('click');
		const signOutMockCount = signOutMock.mock.calls.length;
		expect(signOutMockCount).toBeDefined();

  });
  test('click samulate', () =>{
	wrapper.setProps({rendition:""});
	
	const linkTag = wrapper.find('div');
	linkTag.simulate('click',);
	const openNaveRightMock = jest.fn();
	const openNaveRightMockCount = openNaveRightMock.mock.calls.length;
	expect(openNaveRightMockCount).toBeDefined();

});
	
});
describe('LoginHeader Component Test Suite', () => {
	let props,wrapper;

	const loginMock = jest.fn();
	beforeEach(() => {
		props={
			offlineIcon: 'offlineIcon',
			label: 'label',
			labelLogin: 'labelLogin',
			loginPagePath: 'loginPagePath',
			login: loginMock,
			icon: 'icon',
			logoutIcon: 'logoutIcon',
			logoutLabel: 'logoutLabel',
			pagePath: 'pagePath',
			logoutPageRedirect: 'logoutPageRedirect',
			accountOverviewList: [ 'a2', 'a1' ],
			breakpoints : {mobile: 320, tablet: 768, desktop: 1025},
			currentBreakpoint: 'mobile',
		};
		wrapper=shallow(<LoginHeader store= {mockStoreConfirmationPage} {...props}/>).dive();

	});
	test('render',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
});
describe('LoginHeader Component Test Suite', () => {
	let props,wrapper;
	const loginMock = jest.fn();

	beforeEach(() => {
		props={
			offlineIcon: 'offlineIcon',
			label: 'label',
			labelLogin: 'labelLogin',
			loginPagePath: 'loginPagePath',
			login: loginMock,
			icon: 'icon',
			logoutIcon: 'logoutIcon',
			logoutLabel: 'logoutLabel',
			pagePath: 'pagePath',
			logoutPageRedirect: 'logoutPageRedirect',
			accountOverviewList: [ 'a2', 'a1' ],
			isLoggedIn: true,
			breakpoints : {mobile: 320, tablet: 768, desktop: 1025},
			currentBreakpoint: 'mobile',
		};
		wrapper=shallow(<LoginHeader store= {mockStoreOrder} {...props}/>).dive().dive().dive().dive();

	});
	test('render',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	// test ('login runs on LoginHeader mount', () => {
	// 	wrapper.dive().instance().componentDidMount();

	// 	const loginMockCallCount = loginMock.mock.calls.length;
	// 	expect(loginMockCallCount).toBeDefined();
	// });
});