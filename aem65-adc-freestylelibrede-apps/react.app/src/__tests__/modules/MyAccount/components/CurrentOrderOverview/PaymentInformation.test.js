import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import {PaymentInformation} from '../../../../../modules/MyAccount/components/CurrentOrderOverview/PaymentInformation';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});


describe('PaymentInformation component Test Suite when paymentMethodType is open_invoice', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			order: {
				'paymentDetails': {
					'paymentMethodType': 'open_invoice',
					'paymentBrand': null,
					'card':{},
					'amountAuthorized': 185.65,
					'paymentToken': '8ac7a49f71aabf0e0171ba97acb923d2',
					'amountPaid': 185.65,
					'paymentTransactionId': null
				 },
			},
	        isDisplayInfo: true
		};
		wrapper = shallow(<PaymentInformation {...props}/>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

	});
});

describe('PaymentInformation component Test Suite when paymentMethodType is credit_card, with last4Digits', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			order: {
				'paymentDetails': {
					'paymentMethodType': 'credit_card',
					'paymentBrand': null,
					'card':{'last4Digits': 6789},
					'amountAuthorized': 185.65,
					'paymentToken': '8ac7a49f71aabf0e0171ba97acb923d2',
					'amountPaid': 185.65,
					'paymentTransactionId': null
				 },
			},
	        isDisplayInfo: true
		};
		wrapper = shallow(<PaymentInformation {...props}/>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

	});
});
describe('PaymentInformation component Test Suite when paymentMethodType is credit_card, without last4Digits', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			order: {
				'paymentDetails': {
					'paymentMethodType': 'credit_card',
					'paymentBrand': null,
					'card':{'last4Digits': null},
					'amountAuthorized': 185.65,
					'paymentToken': '8ac7a49f71aabf0e0171ba97acb923d2',
					'amountPaid': 185.65,
					'paymentTransactionId': null
				 },
			},
	        isDisplayInfo: true
		};
		wrapper = shallow(<PaymentInformation {...props}/>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

	});
});

describe('PaymentInformation component Test Suite when paymentMethodType is sofort', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			order: {
				'paymentDetails': {
					'paymentMethodType': 'sofort',
					'paymentBrand': null,
					'amountAuthorized': 185.65,
					'paymentToken': '8ac7a49f71aabf0e0171ba97acb923d2',
					'amountPaid': 185.65,
					'paymentTransactionId': null
				 },
			},
	        isDisplayInfo: true
		};
		wrapper = shallow(<PaymentInformation {...props}/>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

	});
});

describe('PaymentInformation component Test Suite when paymentMethodType is paypal,isDisplayInfo:true', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			order: {
				'paymentDetails': {
					'paymentMethodType': 'paypal',
					'paymentBrand': null,
					'card': {'last4Digits': null},
					'amountAuthorized': 185.65,
					'paymentToken': '8ac7a49f71aabf0e0171ba97acb923d2',
					'amountPaid': 185.65,
					'paymentTransactionId': null
				 },
			},
	        isDisplayInfo: true
		};
		wrapper = shallow(<PaymentInformation {...props}/>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

	});
});
describe('PaymentInformation component Test Suite when paymentMethodType is someMethod,isDisplayInfo:false', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			order: {
				'paymentDetails': {
					'paymentMethodType': 'someMethod',
					'paymentBrand': null,
					'card': {'last4Digits': null},
					'amountAuthorized': 185.65,
					'paymentToken': '8ac7a49f71aabf0e0171ba97acb923d2',
					'amountPaid': 185.65,
					'paymentTransactionId': null
				 },
			},
	        isDisplayInfo: false
		};
		wrapper = shallow(<PaymentInformation {...props}/>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

	});
});

