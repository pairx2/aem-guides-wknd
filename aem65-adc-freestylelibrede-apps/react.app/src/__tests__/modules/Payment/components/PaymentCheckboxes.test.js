import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import PaymentCheckboxes from '../../../../modules/Payment/components/PaymentCheckboxes';
import {mockStore} from '../../../../__mocks__/storeMock';

jest.mock('../../../../utils/endpointUrl.js');
jest.mock('../../../../utils/pageTypeUtils.js');

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

const setup = (props) => {
	const wrapper = shallow(<PaymentCheckboxes store={mockStore} {...props} />).dive().dive();
	return wrapper;
};

describe('PaymentCheckboxes Component Test Suite -isPayon: true && canAutoSavePayment: true,', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			isPayon: true,
			canAutoSavePayment: true,
			checkboxes : [{'required':'required','text':'text'},{'required':'required','text':'text'}],
			order: {
				orderId: 'orderId',
				orderType: 'Cash Pay Subscription'
			},
			paymentMethodToken: 'paymentMethodToken',
			paymentMethod: 'payon_paypal'
		};
		wrapper = setup(props);

	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});
describe('PaymentCheckboxes Component Test Suite -isPayon: false && canAutoSavePayment: true,', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			isPayon: false,
			canAutoSavePayment: true,
			checkboxes : [{'required':'required','text':'text'},{'required':'required','text':'text'}],
			order: {
				orderId: 'orderId',
				orderType: 'Reimbursement'
			},
			paymentMethodToken: 'paymentMethodToken',
			paymentMethod: 'payon_paypal'
		};
		wrapper = setup(props);

	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});

describe('PaymentCheckboxes Component Test Suite -isPayon: false && canAutoSavePayment: true,', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			isPayon: false,
			canAutoSavePayment: true,
			checkboxes : [{'required':'required','text':'text'},{'required':'required','text':'text'}],
			order: {
				orderId: 'orderId',
				orderType: 'Cash Pay Subscription'
			},
			paymentMethodToken: 'paymentMethodToken',
			paymentMethod: 'payon_paypal'
		};
		wrapper = setup(props);

	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});
