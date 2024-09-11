import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore} from '../../../../../__mocks__/storeMock';
import CallBack from '../../../../../modules/Contact/components/CallBack/CallBack';
import {Provider} from 'react-redux';
jest.mock('../../../../../utils/endpointUrl');
jest.mock('../../../../../utils/siteData');

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props) => {
	const wrapper = shallow(<CallBack store={mockStore} {...props} />);
	return wrapper;
};

describe('CallBack test suite',() => {

	let props;
	let wrapper,instance;
	beforeEach(() => {
		props = {
			callTimeID: 'callTimeIDString',
			heading: 'headingString',
			salesforceURL: 'salesforceURLString',
			salesforceOrgId: 'salesforceOrgIdString',
			privacyPolicy: 'privacyPolicyString',
			firstNameID: '123456',
			lastNameID: '67890',
			customerID: '200998',
			callBackCaseID: '23we3535we',
			retURL: 'retURLString',
			submitCtaStyle: 'primary',

		};
		wrapper = setup(props);
		instance = wrapper.dive().dive().dive().dive().dive().dive().dive().dive().dive().dive().dive().instance();
	});
	describe('props check',() => {
		test('render',()=> {
			expect(wrapper.type()).not.toEqual(null);
		});
		test('values to be object',() => {
			expect(typeof instance.props.values).toBe('object');
		});
		test('callTimeID to be string',() => {
			expect(typeof instance.props.callTimeID).toBe('string');
		});
		test('heading to be string',() => {
			expect(typeof instance.props.heading).toBe('string');
		});
		test('salesforceURL to be string',() => {
			expect(typeof instance.props.salesforceURL).toBe('string');
		});
		test('salesforceOrgId to be string',() => {
			expect(typeof instance.props.salesforceOrgId).toBe('string');
		});
		test('privacyPolicy to be string',() => {
			expect(typeof instance.props.privacyPolicy).toBe('string');
		});
		test('firstNameID to be string',() => {
			expect(typeof instance.props.firstNameID).toBe('string');
		});
		test('lastNameID to be string',() => {
			expect(typeof instance.props.lastNameID).toBe('string');
		});
		test('customerID to be string',() => {
			expect(typeof instance.props.customerID).toBe('string');
		});
		test('callBackCaseID to be string',() => {
			expect(typeof instance.props.callBackCaseID).toBe('string');
		});
		test('customer to be string',() => {
			expect(typeof instance.props.customer).toBe('object');
			expect(typeof instance.props.customer.id).toBe('number');

		});
		test('retURL to be string',() => {
			expect(typeof instance.props.retURL).toBe('string');
		});
		test('submitCtaStyle to be string',() => {
			expect(typeof instance.props.submitCtaStyle).toBe('string');
		});
	});
	describe('function calls',() => {
		test('handleConfirm',() => {
			const e = {stopPropagation: jest.fn()};
			instance.handleConfirm(e);
			expect(instance.state.callDate).toBe(instance.state.selectedDate);
			expect(instance.state.isCalendarOpen).toBe(false);
		});
		test('handleChange',() => {
			const e = {stopPropagation: jest.fn()};
			const date = new Date();
			instance.handleChange(date,e);
			expect(instance.state.selectedDate).toBe(date);
		});
		test('toggleCalendar',() => {
			const isCalendarOpenState = instance.state.isCalendarOpen;
			instance.toggleCalendar();
			expect(instance.state.isCalendarOpen).toBe(!isCalendarOpenState);
		});
	});
});

describe('CallBack test suite',() => {

	let props, wrapper;
	beforeEach(() => {
		props = {
			callTimeID: 'callTimeIDString',
			heading: 'headingString',
			salesforceURL: 'salesforceURLString',
			salesforceOrgId: 'salesforceOrgIdString',
			firstNameID: '123456',
			lastNameID: '67890',
			customerID: '200998',
			callBackCaseID: '23we3535we',
			retURL: 'retURLString',
			submitCtaStyle: null,
			privacyPolicy: null
		};
		wrapper = mount(<Provider store={mockStore}><CallBack {...props} /></Provider>);
	});
	test('render',()=> {
		expect(wrapper.type()).not.toEqual(null);
	});
});
