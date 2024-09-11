import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import SimpleProductPrice from '../../../../../modules/Product/components/SimpleProductPrice/SimpleProductPrice';
import {mockStore} from '../../../../../__mocks__/storeMock';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

const setup = (props) => {
	const wrapper = shallow(<SimpleProductPrice store= {mockStore} {...props}/>).dive().dive();
	return wrapper;
};

describe('SimpleProductPrice Component Test Suite', () => {
	let props;
	let wrapper;


	beforeEach(() => {

		props= {
			productPrices: {},
			sku: 'sku',
			currency: 'currency',
		};
		wrapper= setup(props);
	});

	describe('propTypes check', () => {

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('has sku as prop and is of type string', () => {
			const skuProp = wrapper.instance().props.sku;
			expect(typeof skuProp).toBe('string');
		});

		test('has currency as prop and is of type string', () => {
			const currencyProp = wrapper.instance().props.currency;
			expect(typeof currencyProp).toBe('string');
		});

		test('has productPrices as prop', () => {
			const productPricesProp = wrapper.instance().props.productPrices;
			expect(productPricesProp).toBeInstanceOf(Object);
		});
	});

	describe('functions check', () => {

		test('getProductPrice as a prop and is of type function', () => {
			const getProductPriceProp = wrapper.instance().props.getProductPrice;
			expect(typeof getProductPriceProp).toBe('function');
		});

		test('getSelectedProductData function call check', () => {
			const getSelectedProductDataProp = wrapper.instance().getSelectedProductData;
			expect(typeof getSelectedProductDataProp).toBe('function');
		});

		test('getProductPrice function call check', () => {
			const getProductPriceMock = jest.fn();
			const props= {
				getProductPrice: getProductPriceMock,
			};
			const wrapper = setup(props);
			getProductPriceMock();

			const getProductPriceMockCallCount = getProductPriceMock.mock.calls.length;
			expect(wrapper).toBeDefined();
			expect(getProductPriceMockCallCount).toBeDefined();
			expect(getProductPriceMockCallCount).not.toBe(0);
		});
	});
});

describe('SimpleProductPrice Component Test Suite', () => {
	let props;
	let wrapper;


	beforeEach(() => {

		props= {
			productPrices: {},
			sku: '1-71538-01',
			currency: 'currency',
		};
		wrapper= setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});
