import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import AddPaymentMethod from '../../../../../modules/Payment/components/PaymentDisplayEdit/AddPaymentMethod';


Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

describe('AddPaymentMethod component Test Suite when isPayon is true & paymentMapping[expandedIndex].showRedirectNotice is true & paymentMethod is payon_paypal', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			toggleOption: () => {},
			markFormAsDirty: () => {},
			width: 1,
			expandedIndex: 1,
			loadingIndex: 1,
			isPayon: true,
			confirmationPage: 'confirmationPage',
			paymentMethod: 'payon_paypal',
			isOpenInvoiceClicked: true,
			style: {'style': 'style1'},
			paymentMapping: [{title: 'title1', icon: 'icon1', showRedirectNotice: true}, {title: 'title2', icon: 'icon2', showRedirectNotice: true}],
			error: 1
		};

		wrapper = shallow(<AddPaymentMethod {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('PaymentOption component check', () => {
		const componentCheck = wrapper.props().children.props.children[0].props.children[1].props.children[0].type.name;
		expect(componentCheck).toBe('PaymentOption');
	});

});

describe('AddPaymentMethod component Test Suite when isPayon is false & expandedIndex is not null & isOpenInvoiceClicked is true' , () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			toggleOption: () => {},
			markFormAsDirty: () => {},
			width: 1,
			expandedIndex: 1,
			loadingIndex: 1,
			isPayon: false,
			confirmationPage: 'confirmationPage',
			paymentMethod: 'payon_paypal',
			isOpenInvoiceClicked: true,
			style: {'style': 'style1'},
			paymentMapping: [{title: 'title1', icon: 'icon1'}, {title: 'title2', icon: 'icon2'}],
			error: 0
		};

		wrapper = shallow(<AddPaymentMethod {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

});

describe('AddPaymentMethod component Test Suite when isPayon is false & expandedIndex is null & isOpenInvoiceClicked is true' , () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			toggleOption: () => {},
			markFormAsDirty: () => {},
			width: 1,
			expandedIndex: null,
			loadingIndex: 1,
			isPayon: false,
			confirmationPage: 'confirmationPage',
			paymentMethod: 'paymentMethod',
			isOpenInvoiceClicked: false,
			style: {'style': 'style1'},
			paymentMapping: [{title: 'title1', icon: 'icon1'}, {title: 'title2', icon: 'icon2'}],
			error: 2
		};

		wrapper = shallow(<AddPaymentMethod {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

});

describe('AddPaymentMethod component Test Suite when isPayon is true & paymentMethod is not payon_paypal', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			toggleOption: () => {},
			markFormAsDirty: () => {},
			width: 1,
			expandedIndex: 1,
			loadingIndex: 1,
			isPayon: true,
			confirmationPage: 'confirmationPage',
			paymentMethod: 'open_invoice',
			isOpenInvoiceClicked: true,
			style: {'style': 'style1'},
			paymentMapping: [{title: 'title1', icon: 'icon1', showRedirectNotice: false}, {title: 'title2', icon: 'icon2', showRedirectNotice: false}],
			error: 3
		};
		wrapper = shallow(<AddPaymentMethod {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

});

describe('AddPaymentMethod component Test Suite when isPayon is true & paymentMethod is not payon_paypal', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			toggleOption: () => {},
			markFormAsDirty: () => {},
			width: 1,
			expandedIndex: 1,
			loadingIndex: 1,
			isPayon: true,
			confirmationPage: 'confirmationPage',
			paymentMethod: 'open_invoice',
			isOpenInvoiceClicked: false,
			style: {'style': 'style1'},
			paymentMapping: [{title: 'title1', icon: 'icon1', showRedirectNotice: false}, {title: 'title2', icon: 'icon2', showRedirectNotice: false}],
			error: 3
		};
		wrapper = shallow(<AddPaymentMethod {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

});


describe('AddPaymentMethod component Test Suite when isPayon is true & paymentMethod is not payon_paypal', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			toggleOption: () => {},
			markFormAsDirty: () => {},
			width: 1,
			expandedIndex: null,
			loadingIndex: 1,
			isPayon: false,
			confirmationPage: 'confirmationPage',
			paymentMethod: 'open_invoice',
			isOpenInvoiceClicked: false,
			style: {'style': 'style1'},
			paymentMapping: [{title: 'title1', icon: 'icon1', showRedirectNotice: false}, {title: 'title2', icon: 'icon2', showRedirectNotice: false}],
			error: 3
		};
		wrapper = shallow(<AddPaymentMethod {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

});
