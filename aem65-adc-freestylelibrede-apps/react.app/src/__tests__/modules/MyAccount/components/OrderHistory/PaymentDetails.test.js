import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStoreConfirmationPage} from '../../../../../__mocks__/storeMock';
import PaymentDetails from '../../../../../modules/MyAccount/components/OrderHistory/PaymentDetails';
import {Provider} from 'react-redux';


Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

describe('PaymentDetails component Test Suite with paymentDetails data when paymentMethodType is credit_card', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			paymentDetails:{
				'paymentMethodType': 'credit_card',
				'paymentBrand': null,
				'card':{'last4Digits': null},
				'amountAuthorized': 425.25,
				'paymentToken': '8ac7a4a271bac61a0171bafbc8c427f8',
				'amountPaid': 425.25,
				'paymentTransactionId': null
			},
			orderType: 'Reimbursement',
			productData:[{
				'deliverableStatus': 'Scheduled'
			}],
			serviceData:[{
				'serviceSKU':'1-71538-01',
				'serviceName':'FreeStyle Libre Sensor Subscription',
				'serviceFromDate':1587945600000,
				'serviceToDate':null,
				'serviceFrequency':'3',
				'serviceDuration':null,
				'serviceProductQuantity':1,
				'serviceStatus':'Active'
			}],
			ghostOrders: [{
				'status_code': 50
			}],
		};

		wrapper = shallow(<PaymentDetails {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});

describe('PaymentDetails component Test Suite with paymentDetails data when paymentMethodType is open_invoice', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			paymentDetails:{
				'paymentMethodType': 'open_invoice',
				'paymentBrand': null,
				'card':{'last4Digits': null},
				'amountAuthorized': 425.25,
				'paymentToken': '8ac7a4a271bac61a0171bafbc8c427f8',
				'amountPaid': 425.25,
				'paymentTransactionId': null
			},
			orderType: 'Reimbursement',
			productData:[{
				'deliverableStatus': 'Scheduled'
			}],
			serviceData:[{
				'serviceSKU':'1-71538-01',
				'serviceName':'FreeStyle Libre Sensor Subscription',
				'serviceFromDate':1587945600000,
				'serviceToDate':null,
				'serviceFrequency':'3',
				'serviceDuration':null,
				'serviceProductQuantity':1,
				'serviceStatus':'Active'
			}],
			ghostOrders: [{
				'status_code': 50
			}],
		};

		wrapper = shallow(<PaymentDetails {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	// test('render check',() => {
	// 	expect(wrapper.type()).not.toEqual(null);
	// });

});

describe('PaymentDetails component Test Suite with paymentDetails data when paymentMethodType is paypal', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			paymentDetails:{
				'paymentMethodType': 'paypal',
				'paymentBrand': null,
				'card':{'last4Digits': null},
				'amountAuthorized': 425.25,
				'paymentToken': '8ac7a4a271bac61a0171bafbc8c427f8',
				'amountPaid': 425.25,
				'paymentTransactionId': null
			},
			orderType: 'Reimbursement',
			productData:[{
				'deliverableStatus': 'Scheduled'
			}],
			serviceData:[{
				'serviceSKU':'1-71538-01',
				'serviceName':'FreeStyle Libre Sensor Subscription',
				'serviceFromDate':1587945600000,
				'serviceToDate':null,
				'serviceFrequency':'3',
				'serviceDuration':null,
				'serviceProductQuantity':1,
				'serviceStatus':'Active'
			}],
			ghostOrders: [{
				'status_code': 50
			}],
		};

		wrapper = shallow(<PaymentDetails {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	// test('render check',() => {
	// 	expect(wrapper.type()).not.toEqual(null);
	// });

});

describe('PaymentDetails component Test Suite with paymentDetails data when paymentMethodType is sofort', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			paymentDetails:{
				'paymentMethodType': 'sofort',
				'paymentBrand': null,
				'card':{'last4Digits': null},
				'amountAuthorized': 425.25,
				'paymentToken': '8ac7a4a271bac61a0171bafbc8c427f8',
				'amountPaid': 425.25,
				'paymentTransactionId': null
			},
			orderType: 'Reimbursement',
			productData:[{
				'deliverableStatus': 'Scheduled'
			}],
			serviceData:[{
				'serviceSKU':'1-71538-01',
				'serviceName':'FreeStyle Libre Sensor Subscription',
				'serviceFromDate':1587945600000,
				'serviceToDate':null,
				'serviceFrequency':'3',
				'serviceDuration':null,
				'serviceProductQuantity':1,
				'serviceStatus':'Active'
			}],
			ghostOrders: [{
				'status_code': 50
			}],
		};

		wrapper = shallow(<PaymentDetails {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	// test('render check',() => {
	// 	expect(wrapper.type()).not.toEqual(null);
	// });

});

describe('PaymentDetails component Test Suite with paymentDetails data when paymentMethodType is direct_debit', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			paymentDetails:{
				'paymentMethodType': 'direct_debit',
				'paymentBrand': null,
				'card':{'last4Digits': null},
				'amountAuthorized': 425.25,
				'paymentToken': '8ac7a4a271bac61a0171bafbc8c427f8',
				'amountPaid': 425.25,
				'paymentTransactionId': null
			},
			orderType: 'Reimbursement',
			productData:[{
				'deliverableStatus': 'Scheduled'
			}],
			serviceData:[{
				'serviceSKU':'1-71538-01',
				'serviceName':'FreeStyle Libre Sensor Subscription',
				'serviceFromDate':1587945600000,
				'serviceToDate':null,
				'serviceFrequency':'3',
				'serviceDuration':null,
				'serviceProductQuantity':1,
				'serviceStatus':'Active'
			}],
			ghostOrders: [{
				'status_code': 50
			}],
		};

		wrapper = shallow(<PaymentDetails {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	// test('render check',() => {
	// 	expect(wrapper.type()).not.toEqual(null);
	// });

});

describe('PaymentDetails component Test Suite with paymentDetails data when paymentMethodType is amazon_pay', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			paymentDetails:{
				'paymentMethodType': 'amazon_pay',
				'paymentBrand': null,
				'card':{'last4Digits': null},
				'amountAuthorized': 425.25,
				'paymentToken': '8ac7a4a271bac61a0171bafbc8c427f8',
				'amountPaid': 425.25,
				'paymentTransactionId': null
			},
			orderType: 'Reimbursement',
			productData:[{
				'deliverableStatus': 'Scheduled'
			}],
			serviceData:[{
				'serviceSKU':'1-71538-01',
				'serviceName':'FreeStyle Libre Sensor Subscription',
				'serviceFromDate':1587945600000,
				'serviceToDate':null,
				'serviceFrequency':'3',
				'serviceDuration':null,
				'serviceProductQuantity':1,
				'serviceStatus':'Active'
			}],
			ghostOrders: [{
				'status_code': 50
			}],
		};

		wrapper = shallow(<PaymentDetails {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	// test('render check',() => {
	// 	expect(wrapper.type()).not.toEqual(null);
	// });

});

describe('PaymentDetails component Test Suite without paymentDetails data', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			paymentDetails:{ },
			orderType: 'Reimbursement',
			productData:[{
				'deliverableStatus': 'Scheduled'
			}],
			serviceData:[{
				'serviceSKU':'1-71538-01',
				'serviceName':'FreeStyle Libre Sensor Subscription',
				'serviceFromDate':1587945600000,
				'serviceToDate':null,
				'serviceFrequency':'3',
				'serviceDuration':null,
				'serviceProductQuantity':1,
				'serviceStatus':'Active'
			}],
			ghostOrders: [{
				'status_code': 50
			}],
		};

		wrapper = shallow(<PaymentDetails {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	// test('render check',() => {
	// 	expect(wrapper.type()).not.toEqual(null);
	// });

});

describe('PaymentDetails component Test Suite with mount', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			paymentDetails:{
				'paymentMethodType': 'payon_credit_card',
				'paymentBrand': null,
				'card':{'last4Digits': null},
				'amountAuthorized': 425.25,
				'paymentToken': '8ac7a4a271bac61a0171bafbc8c427f8',
				'amountPaid': 425.25,
				'paymentTransactionId': null
			},
			orderType: 'Reimbursement',
			productData:[{
				'deliverableStatus': 'Scheduled'
			}],
			serviceData:[{
				'serviceSKU':'1-71538-01',
				'serviceName':'FreeStyle Libre Sensor Subscription',
				'serviceFromDate':1587945600000,
				'serviceToDate':null,
				'serviceFrequency':'3',
				'serviceDuration':null,
				'serviceProductQuantity':1,
				'serviceStatus':'Active'
			}],
			ghostOrders: [{
				'status_code': 50
			}],
		};

		wrapper = mount(<Provider store= {mockStoreConfirmationPage}><PaymentDetails {...props} /></Provider>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	// test('render check',() => {
	// 	expect(wrapper.type()).not.toEqual(null);
	// });

});