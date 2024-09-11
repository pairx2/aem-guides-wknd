import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import CartOverviewPricing from '../../../../../modules/Cart/components/CartOverview/CartOverviewPricing';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('CartOverviewPricing Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			subTolInTax: 120,
			subTolInCurrny: 'String',
			total: 120,
			includedTax: 120,
			includedTaxCurency: 'String',
			currency: 'String',
			shippingType: 'String',
			shippingPrice: 120,
			shippingCurrency: 'String',
			couponCode: 'String',
			couponValue: 120,
			couponCurrency: 'String',
		};
		wrapper = shallow(<CartOverviewPricing {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('parent tag renders 5 children',() => {
		expect(wrapper.props().children.length).toBe(5);
		expect(wrapper.props().children[0].type).toBe('div');
		expect(wrapper.props().children[1].type).toBe('div');
		expect(wrapper.props().children[2].type.WrappedComponent.name).toBe('CouponCodeOrderOverview');
		expect(wrapper.props().children[3].type).toBe('div');
		expect(wrapper.props().children[4].type).toBe('div');
	});
});

describe('CartOverviewPricing Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			subTolInTax: 120,
			subTolInCurrny: 'String',
			total: 120,
			includedTax: 120,
			includedTaxCurency: 'String',
			currency: 'String',
			shippingType: null,
			shippingPrice: 120,
			shippingCurrency: 'String',
			couponCode: 'String',
			couponValue: 120,
			couponCurrency: 'String',
		};
		wrapper = shallow(<CartOverviewPricing {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});


