import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStoreConfirmationPage} from '../../../../../__mocks__/storeMock';
import DeliveryDetails from '../../../../../modules/MyAccount/components/OrderHistory/DeliveryDetails';
import {Provider} from 'react-redux';
jest.mock('../../../../../utils/endpointUrl');

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

describe('DeliveryDetails component Test Suite', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			deliveryAddress: {
				salutation: '',
				firstName: '',
				lastName: '',
				street: '',
				zipCode: '',
				city: '',
				addressInfo: '',
				country: ''
			},
			totalPrice: 0,
			priceBreakdown: {deliveryCost: null, price: null, coPay: null},
			orderType: 'CashPay'
		};

		wrapper = shallow(<DeliveryDetails {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

});

describe('DeliveryDetails component Test Suite', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			deliveryAddress: {},
			totalPrice: 0,
			priceBreakdown: null,
			orderType: 'Cash Pay Subscription'
		};

		wrapper = shallow(<DeliveryDetails {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

});

describe('DeliveryDetails component Test Suite with mount', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			deliveryAddress: {
				salutation: 'salutation',
				firstName: 'firstName',
				lastName: 'lastName',
				street: 'street',
				zipCode: 'zipCode',
				city: 'city',
				addressInfo: 'addressInfo',
				country: 'DE'
			},
			totalPrice: 101,
			priceBreakdown: {deliveryCost: 101, price: 101, coPay: 101},
			orderType: 'Cash Pay'
		};

		wrapper = mount(<Provider store= {mockStoreConfirmationPage}><DeliveryDetails {...props} /></Provider>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});
describe('DeliveryDetails component Test Suite with mount', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			deliveryAddress: {
				salutation: 'salutation',
				firstName: 'firstName',
				lastName: 'lastName',
				street: 'street',
				zipCode: 'zipCode',
				city: 'city',
				addressInfo: 'addressInfo',
				country: 'DE'
			},
			totalPrice: 101,
			priceBreakdown: {deliveryCost: 101, price: 101, coPay: 101},
			orderType: 'Reimbursement'
		};

		wrapper = mount(<Provider store= {mockStoreConfirmationPage}><DeliveryDetails {...props} /></Provider>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});