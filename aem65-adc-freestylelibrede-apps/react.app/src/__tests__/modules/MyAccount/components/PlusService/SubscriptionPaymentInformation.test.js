import React from 'react';
import Enzyme, {mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux';
import {mockStore} from '../../../../../__mocks__/storeMock';
import {SubscriptionPaymentInformation} from '../../../../../modules/MyAccount/components/PlusService/SubscriptionPaymentInformation';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});


describe('SubscriptionPaymentInformation component Test Suite with paymentMethodType as open_invoice', () => {
	let props;
	let wrapper;

	beforeEach(() => {
		props = {
			order: {
					  'paymentDetails':{
						 'paymentMethodType':'open_invoice',
						 'amountAuthorized':425.25,
						 'paymentToken':'8ac7a4a271bac61a0171bafbc8c427f8',
						 'amountPaid':425.25,
						 'paymentTransactionId':null
					  },
				   },
			editSubscriptionPayment: jest.fn(),
			isReactivationFlow: true
		};
		wrapper = mount(<Provider store= {mockStore}><SubscriptionPaymentInformation {...props} /></Provider>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});

describe('SubscriptionPaymentInformation component Test Suite  with paymentMethodType as credit_card', () => {
	let props;
	let wrapper;

	beforeEach(() => {
		props = {
			order: {
					  'paymentDetails':{
						 'paymentMethodType':'credit_card',
						 'paymentBrand':null,
						 'card':{
						'last4Digits': null
						 },
						 'amountAuthorized':425.25,
						 'paymentToken':'8ac7a4a271bac61a0171bafbc8c427f8',
						 'amountPaid':425.25,
						 'paymentTransactionId':null
					  },
				   },
			editSubscriptionPayment: jest.fn(),
			isReactivationFlow: false
		};
		wrapper = mount(<Provider store= {mockStore}><SubscriptionPaymentInformation {...props} /></Provider>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});

describe('SubscriptionPaymentInformation component Test Suite  with paymentMethodType as sofort', () => {
	let props;
	let wrapper;

	beforeEach(() => {
		props = {
			order: {
					  'paymentDetails':{
						 'paymentMethodType':'sofort',
						 'amountAuthorized':425.25,
						 'paymentToken':'8ac7a4a271bac61a0171bafbc8c427f8',
						 'amountPaid':425.25,
						 'paymentTransactionId':null
					  },
				   },
			editSubscriptionPayment: jest.fn(),
			isReactivationFlow: true
		};
		wrapper = mount(<Provider store= {mockStore}><SubscriptionPaymentInformation {...props} /></Provider>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});

describe('SubscriptionPaymentInformation component Test Suite  with paymentMethodType as paypal', () => {
	let props;
	let wrapper;

	beforeEach(() => {
		props = {
			order: {
					  'paymentDetails':{
						 'paymentMethodType':'paypal',
						 'amountAuthorized':425.25,
						 'paymentToken':'8ac7a4a271bac61a0171bafbc8c427f8',
						 'amountPaid':425.25,
						 'paymentTransactionId':null
					  },
				   },
			editSubscriptionPayment: jest.fn(),
			isReactivationFlow: false
		};
		wrapper = mount(<Provider store= {mockStore}><SubscriptionPaymentInformation {...props} /></Provider>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});