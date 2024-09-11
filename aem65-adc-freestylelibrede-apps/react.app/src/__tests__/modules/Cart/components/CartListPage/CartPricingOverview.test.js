import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import CartPricingOverview from '../../../../../modules/Cart/components/CartListPage/CartPricingOverview';


Enzyme.configure({
	adapter: new EnzymeAdapter(),
});


describe('CartPricingOverview component Test Suite with isShippingAddressSet as true', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			shippingLabel: 'shippingLabel',
			shippingPrice: 100,
			totalWithVatPrice: 101,
			EstimatedVATPrice: 102,
			shippingPriceCurrency: 'shippingPriceCurrency',
			EstimatedVATPriceCurrency: 'EstimatedVATPriceCurrency',
			totalWithVatPriceCurrency: 'totalWithVatPriceCurrency',
			isShippingAddressSet: true,
		};
		wrapper = shallow(<CartPricingOverview {...props}/>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

	});
});

describe('CartPricingOverview component Test Suite with isShippingAddressSet as false', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			shippingLabel: 'shippingLabel',
			shippingPrice: 100,
			totalWithVatPrice: 101,
			EstimatedVATPrice: 102,
			shippingPriceCurrency: 'shippingPriceCurrency',
			EstimatedVATPriceCurrency: 'EstimatedVATPriceCurrency',
			totalWithVatPriceCurrency: 'totalWithVatPriceCurrency',
			isShippingAddressSet: false,
		};
		wrapper = shallow(<CartPricingOverview {...props}/>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

	});
});

describe('CartPricingOverview component Test Suite with isShippingAddressSet as false with express Shipping', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			shippingPrice: 100,
			totalWithVatPrice: 101,
			EstimatedVATPrice: 102,
			shippingPriceCurrency: 'shippingPriceCurrency',
			EstimatedVATPriceCurrency: 'EstimatedVATPriceCurrency',
			totalWithVatPriceCurrency: 'totalWithVatPriceCurrency',
			isShippingAddressSet: false,
			shippingLabel:'Express Shipping'
		};
		wrapper = shallow(<CartPricingOverview {...props}/>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

	});
});
describe('CartPricingOverview component Test Suite with isShippingAddressSet as false with Standard Shipping', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			shippingPrice: 100,
			totalWithVatPrice: 101,
			EstimatedVATPrice: 102,
			shippingPriceCurrency: 'shippingPriceCurrency',
			EstimatedVATPriceCurrency: 'EstimatedVATPriceCurrency',
			totalWithVatPriceCurrency: 'totalWithVatPriceCurrency',
			isShippingAddressSet: false,
			shippingLabel:'Standard Shipping'
		};
		wrapper = shallow(<CartPricingOverview {...props}/>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

	});
});

