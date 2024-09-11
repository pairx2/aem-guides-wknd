import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import DeliveryAddress from '../../../../../modules/MyAccount/components/CurrentOrderOverview/DeliveryAddress';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});


describe('DeliveryAddress component Test Suite with canDeleteAddress as true', () => {
	let props, wrapper;
	const selectAddressMock = jest.fn();

	beforeEach(() => {

		props = {
			address: {
				id:202021,
				prefix:'Herr',
				firstname:'John',
				lastname:'Holland',
				postcode:'55116',
				country_id:'DE',
				country_name:'Deutschland',
				region_code:null,
				region:null,
				city:'Mainz',
				telephone:'',
				rss_result_code:'AVD000',
				address_label:'billing',
				default_shipping:false,
				default_billing:true,
				is_blacklisted:false,
				missing_verification:false
			},
			selectAddress: selectAddressMock,
			canDeleteAddress: true,
			index: 1
		};
		wrapper = shallow(<DeliveryAddress {...props}/>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('selectAddress function in Button action property', () => {
			const actionProp = wrapper.props().children[1].props.children.props.action;
			expect(typeof actionProp).toBe('function');

			actionProp();
			const selectAddressMockCallCount = selectAddressMock.mock.calls.length;
			expect(selectAddressMockCallCount).toBeDefined();
			expect(selectAddressMockCallCount).not.toBe(0);
		});
	});
});

describe('DeliveryAddress component Test Suite with canDeleteAddress as true', () => {
	let props, wrapper;
	const selectAddressMock = jest.fn();

	beforeEach(() => {

		props = {
			address: {
				id:202021,
				prefix:'Herr',
				firstname:'John',
				lastname:'Holland',
				postcode:'55116',
				country_id:'DE',
				country_name:'Deutschland',
				region_code:null,
				region:null,
				city:'Mainz',
				telephone:'',
				rss_result_code:'AVD000',
				address_label:'billing',
				default_shipping:true,
				default_billing:false,
				is_blacklisted:false,
				missing_verification:false
			},
			selectAddress: selectAddressMock,
			canDeleteAddress: true,
			index: 4
		};
		wrapper = shallow(<DeliveryAddress {...props}/>);
	});


	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});

