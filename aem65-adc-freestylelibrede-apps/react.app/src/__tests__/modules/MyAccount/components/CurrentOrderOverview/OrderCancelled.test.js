import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import {OrderCancelled} from '../../../../../modules/MyAccount/components/CurrentOrderOverview/OrderCancelled';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});


describe('OrderCancelled component Test Suite with valid priceBreakdown values', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			order: {
				'priceBreakdown':{
					'totalPrice': '65.85',
					'price': 59.90,
					'coPay': '',
					'deliveryCost': 5.95
				}},
	        reOrder: () => {}
		};
		wrapper = shallow(<OrderCancelled {...props}/>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

	});
});

describe('OrderCancelled component Test Suite with 0 priceBreakdown values', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			order: {
				'priceBreakdown':{
					'totalPrice': 0,
					'price': 0,
					'coPay': '',
					'deliveryCost': 0
				}},
	        reOrder: () => {}
		};
		wrapper = shallow(<OrderCancelled {...props}/>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

	});
});
