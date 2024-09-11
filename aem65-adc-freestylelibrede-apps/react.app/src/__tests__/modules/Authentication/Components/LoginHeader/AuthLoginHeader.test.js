import React from 'react';
import Enzyme, {mount, shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import AuthLoginHeader from '../../../../../modules/Authentication/components/LoginHeader/AuthLoginHeader';
import {mockStore} from '../../../../../__mocks__/storeMock';
import { Provider } from 'react-redux';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

const setup = (props = {}) => {
	const wrapper = mount(<Provider store={mockStore}><AuthLoginHeader  {...props} /></Provider>)
	return wrapper;
};


describe('AuthLoginHeader Component Test Suite', () => {
	let props, wrapper;
	const handleLogoutMock = jest.fn()
	let headerList, pagePath, logoutIcon, logoutLabel, logoutPageRedirect, messageMorning, messageAfternoon, messageEvening, times, setMessage;
	beforeEach(() => {
		global.Date.now = jest.fn(() => new Date('2019-04-07T20:20:30Z').getTime())
		props = {
			headerList: [],
			times: {noon : 12,
				evening: 18},
			pagePath: 'pagePath',
			logoutIcon: 'logoutIcon',
			logoutLabel: 'logoutLabel',
			logoutPageRedirect: 'logoutPageRedirect',
			customer: {
				firstname: 'firstname',
				lastname: 'lastname'
			},
			messageMorning: 'messageMorning',
 			messageAfternoon: 'messageAfternoon',
 			messageEvening: 'messageEvening',
			handleLogout: handleLogoutMock
			
		};
		headerList= [],
		times= {noon : 12,
			evening: 18},
		pagePath= 'pagePath',
		logoutIcon= 'logoutIcon',
		logoutLabel= 'logoutLabel',
		logoutPageRedirect= 'logoutPageRedirect',
		messageMorning= 'messageMorning',
 		messageAfternoon= 'messageAfternoon',
 		messageEvening= 'messageEvening'

		wrapper = setup(props);
	});

	beforeAll(() => {
		global.Date.now = jest.fn(() => new Date('2019-04-07T20:20:30Z').getTime())
	  })
	  
	  afterAll(() => {
		global.Date.now = RealDate
	  })

	test('render null check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('has headerList as prop and type check', () => {
		const headerListProp = wrapper.props().children.props.headerList;
		expect(headerListProp).toEqual(headerList);
		expect(headerListProp).toBeInstanceOf(Array);
	});
	test('has pagePath as prop and type check', () => {
		const pagePathProp = wrapper.props().children.props.pagePath;
		expect(pagePathProp).toBe(pagePath);
		expect(typeof pagePathProp).toBe('string');
	});
	test('has logoutIcon as prop and type check', () => {
		const logoutIconProp = wrapper.props().children.props.logoutIcon;
		expect(logoutIconProp).toBe(logoutIcon);
		expect(typeof logoutIconProp).toBe('string');
	});
	test('has logoutLabel as prop and type check', () => {
		const logoutLabelProp = wrapper.props().children.props.logoutLabel;
		expect(logoutLabelProp).toBe(logoutLabel);
		expect(typeof logoutLabelProp).toBe('string');
	});
	test('has logoutPageRedirect as prop and type check', () => {
		const logoutPageRedirectProp = wrapper.props().children.props.logoutPageRedirect;
		expect(logoutPageRedirectProp).toBe(logoutPageRedirect);
		expect(typeof logoutPageRedirectProp).toBe('string');
	});
	test('has MorningMsg as prop and type check', () => {
		const messageMorningProp = wrapper.props().children.props.messageMorning;
		expect(messageMorningProp).toBe(messageMorning);
		expect(typeof messageMorningProp).toBe('string');
	});
	test('has AfternoonMsg as prop and type check', () => {
		const messageAfternoonProp = wrapper.props().children.props.messageAfternoon;
		expect(messageAfternoonProp).toBe(messageAfternoon);
		expect(typeof messageAfternoonProp).toBe('string');
	});
	test('has EveningMsg as prop and type check', () => {
		const messageEveningProp = wrapper.props().children.props.messageEvening;
		let mockedDate = new Date();
		mockedDate.setHours(20);
		jest.spyOn(Date, "now").mockReturnValue(mockedDate.getTime());
		expect(messageEveningProp).toBe(messageEvening);
		expect(typeof messageEveningProp).toBe('string');
	});

	test('has handleLogout as prop and type check', () => {
		const handleLogoutProp = wrapper.props().children.props.handleLogout;
		expect(typeof handleLogoutProp).toBe('function');
	});

	test('Initial use state check', () => {

		const realUseState = React.useState;
		const initialStateMsgMorning = 'messageMorning'
		jest.spyOn(React, 'useState').mockImplementationOnce(() =>  realUseState(initialStateMsgMorning))

	});

	test('times acccess check', () => {
		const times = wrapper.props().children.props.times;
		expect(times).toBeInstanceOf(Object);

		expect(typeof times.noon).toBe('number');
		expect(times.noon).toBe(12);

		expect(typeof times.evening).toBe('number');
		expect(times.evening).toBe(18);
	});

});
