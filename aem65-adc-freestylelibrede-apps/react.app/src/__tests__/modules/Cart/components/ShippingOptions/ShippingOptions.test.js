import React from 'react';
import ShippingOptions from '../../../../../modules/Cart/components/ShippingOptions/ShippingOptions.jsx';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore, mockStoreOrder} from '../../../../../__mocks__/storeMock';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props) => {
	const wrapper = shallow(<ShippingOptions store= {mockStore} {...props}/>).dive().dive();
	return wrapper;
};

const setupTwo = (props) => {
	const wrapper = shallow(<ShippingOptions store= {mockStoreOrder} {...props}/>).dive().dive();
	return wrapper;
};

describe('ShippingOptions Component Test Suite', () => {
	let props,wrapper;
	beforeEach(() => {
		props={
			shippingList: ['list1','list2'],
			shippingOptionsInfo: 'shippingOptionsInfo',
			shippingOptionsHeading: 'shippingOptionsHeading',
		};
		wrapper= setup(props);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('has cartDetails as prop', () => {
		const cartDetailsProp = wrapper.instance().props.cartDetails;
		expect(cartDetailsProp).toBeInstanceOf(Object);
	});
	test('has shippingOptions as prop', () => {
		const shippingOptionsProp = wrapper.instance().props.shippingOptions;
		expect(shippingOptionsProp).toBeInstanceOf(Array);
	});
	test('has shippingList as prop', () => {
		const shippingListProp = wrapper.instance().props.shippingList;
		expect(shippingListProp).toBeInstanceOf(Array);
	});
	test('has shippingOptionsInfo as prop', () => {
		const shippingOptionsInfoProp = wrapper.instance().props.shippingOptionsInfo;
		expect(typeof shippingOptionsInfoProp).toBe('string');
	});
	test('has shippingOptionsHeading as prop', () => {
		const shippingOptionsHeadingProp = wrapper.instance().props.shippingOptionsHeading;
		expect(typeof shippingOptionsHeadingProp).toBe('string');
	});
	test('ShippingOption component div gets rendered', () => {
		const wrapper = setup(props);
		expect(wrapper.find('.adc-shipping-options')).toBeDefined();
	});
	test('getShippingOptionsRequest getting called', () => {
		const getShippingOptionsRequestMock = jest.fn();
		getShippingOptionsRequestMock();
		const getShippingOptionsRequestCallCount = getShippingOptionsRequestMock.mock.calls.length;
		expect(getShippingOptionsRequestCallCount).not.toBe(0);
	});
	test('updateShippingOptionsRequest getting called', () => {
		const updateShippingOptionsRequestMock = jest.fn();
		updateShippingOptionsRequestMock();
		const updateShippingOptionsRequestCallCount = updateShippingOptionsRequestMock.mock.calls.length;
		expect(updateShippingOptionsRequestCallCount).not.toBe(0);
	});
	test('getShippingOptions getting called', () => {
		const getShippingOptionsMock = jest.fn();
		getShippingOptionsMock();
		const getShippingOptionsCallCount = getShippingOptionsMock.mock.calls.length;
		expect(getShippingOptionsCallCount).not.toBe(0);
	});
	test('updateShippingOption getting called', () => {
		const updateShippingOptionMock = jest.fn();
		updateShippingOptionMock();
		const updateShippingOptionCallCount = updateShippingOptionMock.mock.calls.length;
		expect(updateShippingOptionCallCount).not.toBe(0);
	});
	test('componentDidUpdate',() => {
		const getShippingOptionsMock = jest.fn();
		wrapper.update();
		const getShippingOptionsCallCount = getShippingOptionsMock.mock.calls.length;
		expect(getShippingOptionsCallCount).toBe(0);
	});

	test('didupdate call', () => {
		const didUpdateMock = jest.fn();
		const prevProps= {'cartDetails': {'shipping_address': {'city': 'abc'}}};

		wrapper.instance().componentDidUpdate(prevProps);
		const didUpdateMockCallCount = didUpdateMock.mock.calls.length;
		expect(didUpdateMockCallCount).toBeDefined();

	});
});

describe('instance test cases', () => {
	let props,wrapper;

	beforeEach(() => {

		props={
			shippingList: ['list1','list2'],
			shippingOptionsInfo: 'shippingOptionsInfo',
			shippingOptionsHeading: 'shippingOptionsHeading',
		};

		wrapper= setup(props);

	});

	test('wrapper state', () => {
		const loadingMock = wrapper.instance().state.loading;
		expect(loadingMock).toBe(null);
	});

	test('getShippingOptions state', () => {
		const getShippingOptionsMock = wrapper.instance().getShippingOptions;
		expect(typeof getShippingOptionsMock).toBe('function');
	});

	test('updateShippingOption state', () => {
		const updateShippingOptionMock = wrapper.instance().updateShippingOption;
		expect(typeof updateShippingOptionMock).toBe('function');
	});

	test('updateShippingOption state with argument', () => {
		const payloadMock = {
			carrierCode: 'flatrate',
			carrier_code: 'flatrate',
			method_code: 'flatrate',
			carrier_title: 'Flat Rate',
			amount: {
				value: 15,
				currency: 'USD'
			}};

		wrapper.instance().updateShippingOption(payloadMock);
		expect(wrapper.instance().state.loading).toBe('flatrate');

	});

	test('didupdate call', () => {
		const prevProps= {'cartDetails': {'shipping_address': {'city': 'abc'}}};

		wrapper.instance().componentDidUpdate(prevProps);

		expect(wrapper.instance().state.loading).toBe(null);
	});

});

test('didUpdate',() => {
	const props={
		cartDetails: {items:[]},
		shippingOptions: [],
		shippingList: ['list1','list2'],
		shippingOptionsInfo: 'shippingOptionsInfo',
		shippingOptionsHeading: 'shippingOptionsHeading',
	};
	const newprops= {cartDetails: {
		shipping_address :{
			id: 4,
			prefix: 'Mr',
			firstname: 'Firstname',
			lastname: 'Lastname',
			postcode: 'postcode',
			country_id: 'DE',
			country_name: 'Germany',
			region_code: 'BER',
			region: 'Berlin',
			city: 'Germany',
			street: [
				'Street 1',
				'Street 2'
			],
			telephone: '10111111112'
		},
	},
	shippingOptions: ['111'],
	shippingList: ['1list1','1list2'],
	shippingOptionsInfo: '1shippingOptionsInfo',
	shippingOptionsHeading: '1shippingOptionsHeading',
	};


	const wrapper = setup(props);

	wrapper.setProps({props: newprops}, ()=>{
	});

	expect(wrapper.instance().props).not.toEqual(props);
});

describe('ShippingOptions Component Test Suite', () => {
	let props,wrapper;
	beforeEach(() => {
		props={
			shippingList: ['list1','list2'],
			shippingOptionsInfo: 'shippingOptionsInfo',
			shippingOptionsHeading: 'shippingOptionsHeading',
		};
		wrapper= setupTwo(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('didupdate call', () => {
		const prevProps= {'cartDetails': {'selected_shipping_method': {}}};

		wrapper.instance().componentDidUpdate(prevProps);
		expect(wrapper.instance().state.loading).toBe(null);

	});
});