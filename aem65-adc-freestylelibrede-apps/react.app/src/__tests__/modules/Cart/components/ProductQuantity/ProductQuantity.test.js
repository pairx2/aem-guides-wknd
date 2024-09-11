import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import ProductQuantity from '../../../../../modules/Cart/components/ProductQuantity/ProductQuantity';
import {mockStore} from '../../../../../__mocks__/storeMock';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = ( props) => {
	const wrapper = shallow(<ProductQuantity store= {mockStore} {...props}/>).dive();
	return wrapper;
};

describe('ProductQuantity Component Test Suite', () => {
	let props,wrapper;
	const onDecrementMock = jest.fn();
	const onIncrementMock = jest.fn();
	const updateCartItemtMock = jest.fn();

	beforeEach(() => {
		props={
			quantity: 2,
			productId: 2233,
			updateCartItem: updateCartItemtMock,
			isManual: false,
			onDecrement: onDecrementMock,
			onIncrement: onIncrementMock,
			min_sale_qty: 3,
			max_sale_qty: 1
		};
		wrapper=setup(props);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('has isManual as prop', () => {
		const isManualProp = wrapper.instance().props.isManual;
		expect(typeof isManualProp).toBe('boolean');
	});
	test('has quantity as prop', () => {
		const quantityProp = wrapper.instance().props.quantity;
		expect(typeof quantityProp).toBe('number');
	});
	test('has productId as prop', () => {
		const productIdProp = wrapper.instance().props.productId;
		expect(typeof productIdProp).toBe('number');
	});
	test('has productId as prop', () => {
		const updateCartItemProp = wrapper.instance().props.updateCartItem;
		expect(typeof updateCartItemProp).toBe('function');
	});
	test('has productId as prop', () => {
		const onDecrementProp = wrapper.instance().props.onDecrement;
		expect(typeof onDecrementProp).toBe('function');
	});
	test('has productId as prop', () => {
		const onIncrementProp = wrapper.instance().props.onIncrement;
		expect(typeof onIncrementProp).toBe('function');
	});

	test('increment getting called', () => {
		wrapper.instance().increment();
		expect(onIncrementMock.mock.calls.length).toBe(0);
	});
	test('decrement getting called', () => {
		wrapper.instance().decrement();
		expect(onIncrementMock.mock.calls.length).toBe(0);
	});
});
describe('ProductQuantity Component Test Suite', () => {
	let props,wrapper;
	const onDecrementMock = jest.fn();
	const onIncrementMock = jest.fn();
	const updateCartItemtMock = jest.fn();

	beforeEach(() => {
		props={
			quantity: 2,
			productId: 2233,
			updateCartItem: updateCartItemtMock,
			isManual: true,
			onDecrement: onDecrementMock,
			onIncrement: onIncrementMock,
			min_sale_qty: 3,
			max_sale_qty: 1
		};
		wrapper=setup(props);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('has isManual as prop', () => {
		const isManualProp = wrapper.instance().props.isManual;
		expect(typeof isManualProp).toBe('boolean');
	});
	test('has quantity as prop', () => {
		const quantityProp = wrapper.instance().props.quantity;
		expect(typeof quantityProp).toBe('number');
	});
	test('has productId as prop', () => {
		const productIdProp = wrapper.instance().props.productId;
		expect(typeof productIdProp).toBe('number');
	});
	test('has productId as prop', () => {
		const updateCartItemProp = wrapper.instance().props.updateCartItem;
		expect(typeof updateCartItemProp).toBe('function');
	});
	test('has productId as prop', () => {
		const onDecrementProp = wrapper.instance().props.onDecrement;
		expect(typeof onDecrementProp).toBe('function');
	});
	test('has productId as prop', () => {
		const onIncrementProp = wrapper.instance().props.onIncrement;
		expect(typeof onIncrementProp).toBe('function');
	});

	test('increment getting called', () => {
		wrapper.instance().increment();
		expect(onIncrementMock.mock.calls.length).toBe(1);
	});
	test('decrement getting called', () => {
		wrapper.instance().decrement();
		expect(onIncrementMock.mock.calls.length).toBe(1);
	});
});