import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import CartList from '../../../../../modules/Cart/components/CartListPage/CartList';
import {mockStore, mockStoreOrder} from '../../../../../__mocks__/storeMock';


Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

const setup = (props) => {
	const wrapper = shallow(<CartList store= {mockStore} {...props}/>).dive();
	return wrapper;
};

const setupTwo = (props) => {
	const wrapper = shallow(<CartList store= {mockStoreOrder} {...props}/>).dive();
	return wrapper;
};

describe('CartList Component Test Suite', () => {
	let props, wrapper;
	const getCustomerRequestMock= jest.fn();
	const getCustomerCartRequestMock= jest.fn();
	const getProductsRequestMock= jest.fn();
	const setShippingAddressOnCartMock= jest.fn();
	const setBillingAddressOnCartMock= jest.fn();

	beforeEach(() => {

		props= {
			getCustomerRequest: getCustomerRequestMock,
			getCustomerCartRequest: getCustomerCartRequestMock,
			getProductsRequest: getProductsRequestMock,
			setShippingAddressOnCart: setShippingAddressOnCartMock,
			setBillingAddressOnCart: setBillingAddressOnCartMock,
			qtyColHeading: 'qtyColHeading',
			priceColHeading: 'priceColHeading',
			productColHeading: 'productColHeading',
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

		test('qtyColHeading is a prop of type string', () => {
			const qtyColHeadingProp = wrapper.dive().instance().props.qtyColHeading;
			expect(typeof qtyColHeadingProp).toBe('string');
		});

		test('priceColHeading is a prop of type string', () => {
			const priceColHeadingProp = wrapper.dive().instance().props.priceColHeading;
			expect(typeof priceColHeadingProp).toBe('string');
		});

		test('productColHeading is a prop of type string', () => {
			const productColHeadingProp = wrapper.dive().instance().props.productColHeading;
			expect(typeof productColHeadingProp).toBe('string');
		});

		test('products is a prop of type object', () => {
			const productsProp = wrapper.dive().instance().props.products;
			expect(productsProp).toBeInstanceOf(Object);
		});

		test('cartDetails is a prop of type object', () => {
			const cartDetailsProp = wrapper.dive().instance().props.cartDetails;
			expect(cartDetailsProp).toBeInstanceOf(Object);
		});

		test('getCustomerRequest is a prop of type function', () => {
			const getCustomerRequestProp = wrapper.dive().instance().props.getCustomerRequest;
			expect(typeof getCustomerRequestProp).toBe('function');
		});

		test('getCustomerCartRequest is a prop of type function', () => {
			const getCustomerCartRequestProp = wrapper.dive().instance().props.getCustomerCartRequest;
			expect(typeof getCustomerCartRequestProp).toBe('function');
		});

		test('getProductsRequest is a prop of type function', () => {
			const getProductsRequestProp = wrapper.dive().instance().props.getProductsRequest;
			expect(typeof getProductsRequestProp).toBe('function');
		});

		test('setShippingAddressOnCart is a prop of type function', () => {
			const setShippingAddressOnCartProp = wrapper.dive().instance().props.setShippingAddressOnCart;
			expect(typeof setShippingAddressOnCartProp).toBe('function');
		});

		test('setBillingAddressOnCart is a prop of type function', () => {
			const setBillingAddressOnCartProp = wrapper.dive().instance().props.setBillingAddressOnCart;
			expect(typeof setBillingAddressOnCartProp).toBe('function');
		});

	});

	describe('state check', () => {

		test('state check', () => {
			const stateCheck = wrapper.dive().instance().state;
			expect(stateCheck).toBeInstanceOf(Object);

			const currentProductSkuProp = wrapper.dive().instance().state.currentProductSku;
			expect(typeof currentProductSkuProp).toBe('string');
		});

	});

	describe('Functions check', () => {

		test('getCartItems function call check', () => {
			const getCartItemsMock = wrapper.dive().instance().getCartItems;
			expect(typeof getCartItemsMock).toBe('function');

			expect(wrapper.dive().instance().getCartItems()).toBeInstanceOf(Object);
			expect(wrapper.dive().instance().getCartItems()).toBeDefined();
		});

		test('cancelDeleteCartItem function call check', () => {
			const cancelDeleteCartItemMock = wrapper.dive().instance().cancelDeleteCartItem;
			expect(typeof cancelDeleteCartItemMock).toBe('function');

			wrapper.dive().instance().cancelDeleteCartItem();
			expect(wrapper.dive().instance().state.currentProductSku).toBe('');
		});

		test('productRemoveWarningHandler function call check', () => {
			const productRemoveWarningHandlerMock = wrapper.dive().instance().productRemoveWarningHandler;
			expect(typeof productRemoveWarningHandlerMock).toBe('function');

			wrapper.dive().instance().productRemoveWarningHandler('sku');
			expect(typeof wrapper.dive().instance().state.currentProductSku).toBe('string');
		});

		test('getCartDetails function call check', () => {
			const getCartDetailsMock = wrapper.dive().instance().getCartDetails;
			expect(typeof getCartDetailsMock).toBe('function');

			expect(wrapper.dive().instance().getCartDetails()).toBeInstanceOf(Object);
			expect(wrapper.dive().instance().getCartDetails()).toStrictEqual(wrapper.dive().instance().props.cartDetails);
		});

		test('getCartPrices function call check', () => {
			const getCartPricesMock = wrapper.dive().instance().getCartPrices;
			expect(typeof getCartPricesMock).toBe('function');

			expect(wrapper.dive().instance().getCartPrices()).toBeInstanceOf(Object);
			expect(wrapper.dive().instance().getCartPrices()).toStrictEqual(wrapper.dive().instance().props.cartDetails.prices);
		});

		test('getSelectedShippingMethod function call check', () => {
			const getSelectedShippingMethodMock = wrapper.dive().instance().getSelectedShippingMethod;
			expect(typeof getSelectedShippingMethodMock).toBe('function');

			expect(wrapper.dive().instance().getSelectedShippingMethod()).toBeInstanceOf(Object);
			expect(wrapper.dive().instance().getSelectedShippingMethod()).toEqual({});
		});

		test('getAppliedTaxes function call check', () => {
			const getAppliedTaxesMock = wrapper.dive().instance().getAppliedTaxes;
			expect(typeof getAppliedTaxesMock).toBe('function');

			expect(wrapper.dive().instance().getAppliedTaxes()).toBeInstanceOf(Object);
			expect(wrapper.dive().instance().getAppliedTaxes()).toEqual({});
		});

		test('getCartshippingPrice function call check', () => {
			const getCartshippingPriceMock = wrapper.dive().instance().getCartshippingPrice;
			expect(typeof getCartshippingPriceMock).toBe('function');

			expect(typeof wrapper.dive().instance().getCartshippingPrice()).toBe('number');
			expect(wrapper.dive().instance().getCartshippingPrice()).toBe(0);
		});

		test('getCartshippingLabel function call check', () => {
			const getCartshippingLabelMock = wrapper.dive().instance().getCartshippingLabel;
			expect(typeof getCartshippingLabelMock).toBe('function');

			expect(typeof wrapper.dive().instance().getCartshippingLabel()).toBe('string');
			expect(wrapper.dive().instance().getCartshippingLabel()).toBe('');
		});

		test('getCartEstimatedVATPrice function call check', () => {
			const getCartEstimatedVATPriceMock = wrapper.dive().instance().getCartEstimatedVATPrice;
			expect(typeof getCartEstimatedVATPriceMock).toBe('function');

			expect(typeof wrapper.dive().instance().getCartEstimatedVATPrice()).toBe('number');
			expect(wrapper.dive().instance().getCartEstimatedVATPrice()).toBe(0);
		});

		test('getCartTotalPrice function call check', () => {
			const getCartTotalPriceMock = wrapper.dive().instance().getCartTotalPrice;
			expect(typeof getCartTotalPriceMock).toBe('function');

			expect(typeof wrapper.dive().instance().getCartTotalPrice()).toBe('number');
			expect(wrapper.dive().instance().getCartTotalPrice()).toBe(70);
		});

		test('componentDidMount function call check', () => {
			const componentDidMountMock = wrapper.dive().instance().componentDidMount;
			expect(typeof componentDidMountMock).toBe('function');

			wrapper.dive().instance().componentDidMount();

			const getCustomerRequestMockCallCount = getCustomerRequestMock.mock.calls.length;
			expect(getCustomerRequestMockCallCount).toBeDefined();

			const getCustomerCartRequestMockCallCount = getCustomerCartRequestMock.mock.calls.length;
			expect(getCustomerCartRequestMockCallCount).toBeDefined();

			const getProductsRequestMockCallCount = getProductsRequestMock.mock.calls.length;
			expect(getProductsRequestMockCallCount).toBeDefined();
		});
	});

});

describe('CartList Component Test Suite', () => {
	let props, wrapper;
	const getCustomerRequestMock= jest.fn();
	const getCustomerCartRequestMock= jest.fn();
	const getProductsRequestMock= jest.fn();
	const setShippingAddressOnCartMock= jest.fn();
	const setBillingAddressOnCartMock= jest.fn();

	beforeEach(() => {

		props= {
			getCustomerRequest: getCustomerRequestMock,
			getCustomerCartRequest: getCustomerCartRequestMock,
			getProductsRequest: getProductsRequestMock,
			setShippingAddressOnCart: setShippingAddressOnCartMock,
			setBillingAddressOnCart: setBillingAddressOnCartMock,
			qtyColHeading: 'qtyColHeading',
			priceColHeading: 'priceColHeading',
			productColHeading: 'productColHeading',
		};
		wrapper= setupTwo(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('getCartshippingPrice function call check', () => {
		const getCartshippingPriceMock = wrapper.dive().instance().getCartshippingPrice;
		expect(typeof getCartshippingPriceMock).toBe('function');

		expect(typeof wrapper.dive().instance().getCartshippingPrice()).toBe('number');
		expect(wrapper.dive().instance().getCartshippingPrice()).toBe(15);
	});

	test('getCartshippingLabel function call check', () => {
		const getCartshippingLabelMock = wrapper.dive().instance().getCartshippingLabel;
		expect(typeof getCartshippingLabelMock).toBe('function');

		expect(typeof wrapper.dive().instance().getCartshippingLabel()).toBe('string');
		expect(wrapper.dive().instance().getCartshippingLabel()).toBe('Flat Rate');
	});

	test('getCartEstimatedVATPrice function call check', () => {
		const getCartEstimatedVATPriceMock = wrapper.dive().instance().getCartEstimatedVATPrice;
		expect(typeof getCartEstimatedVATPriceMock).toBe('function');

		expect(typeof wrapper.dive().instance().getCartEstimatedVATPrice()).toBe('number');
		expect(wrapper.dive().instance().getCartEstimatedVATPrice()).toBe(101);
	});

	test('getCartTotalPrice function call check', () => {
		const getCartTotalPriceMock = wrapper.dive().instance().getCartTotalPrice;
		expect(typeof getCartTotalPriceMock).toBe('function');

		expect(typeof wrapper.dive().instance().getCartTotalPrice()).toBe('number');
		expect(wrapper.dive().instance().getCartTotalPrice()).toBe(70);
	});
});




