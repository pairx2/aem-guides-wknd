import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import PaymentMethodInformation from '../../../../../modules/Payment/components/PaymentDisplayEdit/PaymentMethodInformation';
import {Provider} from 'react-redux';
import {mockStoreConfirmationPage} from '../../../../../__mocks__/storeMock';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

describe('PaymentMethodInformation component Test Suite with isEnableDesign & isHideDisclaimer are true and method is payon_credit_card', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			paymentMethod: {
				method: 'payon_credit_card',
				type: 'type',
				last4Digits: '1234',
				expiry: '2024'
			},
			isHideDisclaimer: true,
			isEnableDesign: true,
			isDefaultView: true
		};

		wrapper = shallow(<PaymentMethodInformation {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
});

describe('PaymentMethodInformation component Test Suite with isEnableDesign & isHideDisclaimer are true and method is payon_credit_card with empty 4 digits', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			paymentMethod: {
				method: 'payon_credit_card',
				type: 'type',
				last4Digits: '',
				expiry: '2024'
			},
			isHideDisclaimer: true,
			isEnableDesign: true
		};

		wrapper = shallow(<PaymentMethodInformation {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
});

describe('PaymentMethodInformation component Test Suite with isEnableDesign & isHideDisclaimer are false and method is open_invoice', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			paymentMethod: {
				method: 'open_invoice',
				type: 'type',
				last4Digits: '1234',
				expiry: '2024'
			},
			isHideDisclaimer: false,
			isEnableDesign: false,
			isDefaultView: true
		};

		wrapper = shallow(<PaymentMethodInformation {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
});

describe('PaymentMethodInformation component Test Suite with isEnableDesign & isHideDisclaimer are false and method is something dummy', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			paymentMethod: {
				method: 'dummy',
				type: 'type',
				last4Digits: '1234',
				expiry: '2024'
			},
			isHideDisclaimer: false,
			isEnableDesign: false
		};

		wrapper = shallow(<PaymentMethodInformation {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
});

describe('PaymentMethodInformation component Test Suite with isEnableDesign & isHideDisclaimer are false and method is payon_paypal', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			paymentMethod: {
				method: 'payon_paypal',
				type: 'type',
				last4Digits: '1234',
				expiry: '2024'
			},
			isHideDisclaimer: false,
			isEnableDesign: false
		};

		wrapper = shallow(<PaymentMethodInformation {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
});

describe('PaymentMethodInformation component Test Suite with isEnableDesign & isHideDisclaimer are true and method is payon_sofort', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			paymentMethod: {
				method: 'payon_sofort',
				type: 'type',
				last4Digits: '1234',
				expiry: '2024'
			},
			isHideDisclaimer: true,
			isEnableDesign: true
		};

		wrapper = shallow(<PaymentMethodInformation {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
});

describe('PaymentMethodInformation component Test Suite with mount', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			paymentMethod: {
				method: 'method',
				type: 'type',
				last4Digits: '1234',
				expiry: '2024'
			},
			isHideDisclaimer: true,
			isEnableDesign: true
		};

		wrapper = mount(<Provider store={mockStoreConfirmationPage}><PaymentMethodInformation {...props} /></Provider>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});

