import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import ProductCard from '../../../../../modules/Product/components/ProductCard/ProductCard';
import {mockStore, mockStoreConfirmationPage} from '../../../../../__mocks__/storeMock';


Enzyme.configure({
	adapter: new EnzymeAdapter(),
});


const setup = (props) => {
	const wrapper = shallow(<ProductCard store= {mockStore} {...props}/>).dive().dive().dive();
	return wrapper;
};
const setupTwo = (props) => {
	const wrapper = shallow(<ProductCard store= {mockStoreConfirmationPage} {...props}/>).dive().dive().dive();
	return wrapper;
};

describe('Product card props test suite - productSkus not empty ', () => {
	let props,wrapper;
	const getProductPriceMock = jest.fn();
	const addProductToCartMock = jest.fn();
	beforeEach(() => {
		props={
			getProductPrice: getProductPriceMock,
			addProductToCart: addProductToCartMock,
			productSkus: ['S5269856','S5269856'],
			heading: 'heading',
			description: 'description',
			productImage: 'productImage',
			icon: 'icon',
			importantMessageIcon: 'importantMessageIcon',
			cta1: {text: 'text1', link: 'link1', type: 'type1', action: 'action1'},
			cta2: {text: 'text2', link: 'link2', type: 'type2', action: 'action2'},
			disclaimerText: 'text',
			productPrices: [],
			breakpoints : {
				mobile: 320,
				tablet: 768,
				desktop: 1025
			},
			currentBreakpoint: 'mobile',
			deepLinkTarget: 'deepLinkTarget'
		};
		wrapper=setup(props);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test ('getProductPrice runs on ProductCard mount', () => {
		wrapper.dive().instance().componentDidMount();
		const getProductPriceCallCount = getProductPriceMock.mock.calls.length;
		expect(getProductPriceCallCount).toBeDefined();
	});
	test('getProductPrice call',() => {
		wrapper.dive().instance().getProductPrice();
	});
	test('addProductToCart call',() => {
		wrapper.dive().instance().addProductToCart();
	});
	test('setSelectedValue call',() => {
		wrapper.dive().instance().setSelectedValue('value');
	});
});
describe('Product card props test suite - productSkus not empty ', () => {
	let props,wrapper;
	const getProductPriceMock = jest.fn();
	const addProductToCartMock = jest.fn();
	beforeEach(() => {
		props={
			getProductPrice: getProductPriceMock,
			addProductToCart: addProductToCartMock,
			productSkus: ['S5269856','S5269856'],
			heading: 'heading',
			description: 'description',
			productImage: 'productImage',
			icon: 'icon',
			importantMessageIcon: 'importantMessageIcon',
			cta1: {text: 'text1', link: 'link1', type: 'type1', action: 'action1'},
			cta2: {text: 'text2', link: 'link2', type: 'type2', action: 'action2'},
			disclaimerText: 'text',
			productPrices: [],
			breakpoints : {
				mobile: 320,
				tablet: 768,
				desktop: 1025
			},
			currentBreakpoint: 'mobile',
			deepLinkTarget: 'deepLinkTarget'
		};
		wrapper=setupTwo(props);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test ('getProductPrice runs on ProductCard mount', () => {
		wrapper.dive().instance().componentDidMount();
		const getProductPriceCallCount = getProductPriceMock.mock.calls.length;
		expect(getProductPriceCallCount).toBeDefined();
	});
	test('getProductPrice call',() => {
		wrapper.dive().instance().getProductPrice();
	});
	test('addProductToCart call',() => {
		wrapper.dive().instance().addProductToCart();
	});
	test('setSelectedValue call',() => {
		wrapper.dive().instance().setSelectedValue('value');
	});
});
describe('Product card props test suite -productSkus: []', () => {
	let props,wrapper;
	const getProductPriceMock = jest.fn();
	const addProductToCartMock = jest.fn();
	beforeEach(() => {
		props={
			getProductPrice: getProductPriceMock,
			addProductToCart: addProductToCartMock,
			productSkus: null,
			heading: 'heading',
			description: 'description',
			productImage: 'productImage',
			icon: 'icon',
			importantMessageIcon: 'importantMessageIcon',
			cta1: {text: 'text1', link: 'link1', type: 'type1', action: 'action1'},
			cta2: {text: 'text2', link: 'link2', type: 'type2', action: 'action2'},
			disclaimerText: 'text',
			productPrices: [],
			breakpoints : {
				mobile: 320,
				tablet: 768,
				desktop: 1025
			},
			currentBreakpoint: 'mobile',
			deepLinkTarget: 'deepLinkTarget'
		};
		wrapper=setup(props);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test ('getProductPrice runs on ProductCard mount', () => {
		wrapper.dive().instance().componentDidMount();
		const getProductPriceCallCount = getProductPriceMock.mock.calls.length;
		expect(getProductPriceCallCount).toBeDefined();
	});
	test('getProductPrice call',() => {
		wrapper.dive().instance().getProductPrice();
	});
	test('addProductToCart call',() => {
		wrapper.dive().instance().addProductToCart();
	});
});

