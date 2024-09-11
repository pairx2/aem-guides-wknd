import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore} from '../../../../../__mocks__/storeMock';
import AddNewPaymentMethod from '../../../../../modules/MyAccount/components/PlusService/AddNewPaymentMethod';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});
const setup = (props) => {
	const wrapper = shallow(<AddNewPaymentMethod store={mockStore} {...props} />).dive().dive();
	return wrapper;
};

describe('AddNewPaymentMethod component Test Suite', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			toggleOption: jest.fn(),
			markFormAsDirty: jest.fn(),
			width: 20,
			expandedIndex: 1,
			loadingIndex: 10,
			isPayon: false,
			confirmationPage: 'confirmationPage',
			paymentMethod: 'payon_saved_token',
			isOpenInvoiceClicked: false,
			style: {},
			updateAddress:jest.fn(),
			showPayonWidget: true,
			headingText:'headingText',
			paymentMapping: [],
			paymentTokens: [{token:'token'}],
			paymentMethodToken: {},
			setSavedPaymentMethod: jest.fn(),
			checkboxes: [],
			canBeSaved: false,
			order: {},
			isSubmitDisabled: false
		};
		wrapper = setup(props);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('tag check',() => {
			expect(wrapper.props().children.props.children.type).toBe('div');
			expect(wrapper.props().children.props.children.props.children[0].type).toBe('h6');
		});
	});
});
describe('AddNewPaymentMethod component Test Suite', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			toggleOption: jest.fn(),
			markFormAsDirty: jest.fn(),
			width: 20,
			expandedIndex: 0,
			loadingIndex: 10,
			isPayon: true,
			confirmationPage: 'confirmationPage',
			paymentMethod: 'payon_paypal',
			isOpenInvoiceClicked: false,
			style: {},
			paymentMapping: [{icon:'icon',title:'title,'}],
			paymentTokens: [],
			paymentMethodToken: {},
			setSavedPaymentMethod: jest.fn(),
			updateAddress:jest.fn(),
			showPayonWidget: true,
			headingText:'headingText',
			checkboxes: [],
			canBeSaved: false,
			order: {},
			isSubmitDisabled: false
		};
		wrapper = setup(props);
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
describe('AddNewPaymentMethod component Test Suite', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			toggleOption: jest.fn(),
			markFormAsDirty: jest.fn(),
			width: 20,
			expandedIndex: 0,
			loadingIndex: 10,
			isPayon: true,
			confirmationPage: 'confirmationPage',
			paymentMethod: 'open_invoice',
			isOpenInvoiceClicked: false,
			style: {},
			paymentMapping: [{icon:'icon',title:'title,'}],
			paymentTokens: [],
			paymentMethodToken: {},
			setSavedPaymentMethod: jest.fn(),
			updateAddress:jest.fn(),
			showPayonWidget: true,
			headingText:'headingText',
			checkboxes: [],
			canBeSaved: false,
			order: {},
			isSubmitDisabled: false
		};
		wrapper = setup(props);
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
describe('AddNewPaymentMethod component Test Suite', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			toggleOption: jest.fn(),
			markFormAsDirty: jest.fn(),
			width: 20,
			expandedIndex: 0,
			loadingIndex: 10,
			isPayon: true,
			confirmationPage: 'confirmationPage',
			paymentMethod: 'open_invoice',
			isOpenInvoiceClicked: true,
			style: {},
			paymentMapping: [{icon:'icon',title:'title,'}],
			paymentTokens: [],
			paymentMethodToken: {},
			setSavedPaymentMethod: jest.fn(),
			updateAddress:jest.fn(),
			showPayonWidget: false,
			headingText:'headingText',
			checkboxes: [],
			canBeSaved: false,
			order: {},
			isSubmitDisabled: false
		};
		wrapper = setup(props);
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

describe('AddNewPaymentMethod component Test Suite', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			toggleOption: jest.fn(),
			markFormAsDirty: jest.fn(),
			width: 20,
			expandedIndex: 1,
			loadingIndex: 10,
			isPayon: false,
			confirmationPage: 'confirmationPage',
			paymentMethod: 'saved_payments_order_update',
			isOpenInvoiceClicked: false,
			style: {},
			updateAddress:jest.fn(),
			showPayonWidget: true,
			headingText: null,
			paymentMapping: [],
			paymentTokens: [{token:'token'}],
			paymentMethodToken: null,
			setSavedPaymentMethod: jest.fn(),
			checkboxes: [],
			canBeSaved: false,
			order: {},
			isSubmitDisabled: true,
			isSavedPaymentClicked: true
		};
		wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

});