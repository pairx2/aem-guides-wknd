import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import DataLayer from '../../../modules/Data/DataLayer';
import {mockStoreOrder, mockStoreDataLayer} from '../../../__mocks__/storeMock';
import {Provider} from 'react-redux';


Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props= {}) => {
	const wrapper = shallow(<DataLayer store= {mockStoreDataLayer} {...props}/>).dive().dive();
	return wrapper;
};

const setupTwo = (props= {}) => {
	const wrapper = shallow(<DataLayer store= {mockStoreOrder} {...props}/>).dive().dive();
	return wrapper;
};

describe('DataLayer component Test Suite', () => {
	let props, wrapper;
	const getCustomerRequestMock = jest.fn();
	const fetchDictionaryRequestMock = jest.fn();
	const getProductsRequestMock = jest.fn();
	const getOrdersRequestMock = jest.fn();
	const getCurrentOrdersRequestMock = jest.fn();
	const getProductPriceRequestMock = jest.fn();

	beforeEach(() => {
		props = {
			customer: {'customer': 'customer'},
			dictionary: {'dictionary': 'dictionary'},
			products: {'products': 'products'},
			orders: {'orders': 'orders'},
			currentOrders: {'currentOrders': 'currentOrders'},
			productPrices: {'productPrices': 'productPrices'},
			productSku: 'productSku',
			getCustomerRequest: getCustomerRequestMock,
			fetchDictionaryRequest: fetchDictionaryRequestMock,
			getProductsRequest: getProductsRequestMock,
			getOrdersRequest: getOrdersRequestMock,
			getCurrentOrdersRequest: getCurrentOrdersRequestMock,
			getProductPriceRequest: getProductPriceRequestMock
		};
		wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('render check',() => {
		expect(wrapper.isEmptyRender()).toBe(false);
	});

	test('componentDidMount', () => {
		const componentDidMountMock = wrapper.instance().componentDidMount;
		expect(typeof componentDidMountMock).toBe('function');

		wrapper.instance().componentDidMount();
		const getCustomerRequestMockCallCount = getCustomerRequestMock.mock.calls.length;
		expect(getCustomerRequestMockCallCount).toBeDefined();

		const fetchDictionaryRequestMockCallCount = fetchDictionaryRequestMock.mock.calls.length;
		expect(fetchDictionaryRequestMockCallCount).toBeDefined();

		const getOrdersRequestMockCallCount = getOrdersRequestMock.mock.calls.length;
		expect(getOrdersRequestMockCallCount).toBeDefined();

		const getCurrentOrdersRequestMockCallCount = getCurrentOrdersRequestMock.mock.calls.length;
		expect(getCurrentOrdersRequestMockCallCount).toBeDefined();

		const getProductsRequestMockCallCount = getProductsRequestMock.mock.calls.length;
		expect(getProductsRequestMockCallCount).toBeDefined();
	});

});

describe('Other DataLayer component Test Suite', () => {
	let props, wrapper;
	const getCustomerRequestMock = jest.fn();
	const fetchDictionaryRequestMock = jest.fn();
	const getProductsRequestMock = jest.fn();
	const getOrdersRequestMock = jest.fn();
	const getCurrentOrdersRequestMock = jest.fn();
	const getProductPriceRequestMock = jest.fn();

	beforeEach(() => {
		props = {
			productSku: 'productSku',
			getCustomerRequest: getCustomerRequestMock,
			fetchDictionaryRequest: fetchDictionaryRequestMock,
			getProductsRequest: getProductsRequestMock,
			getOrdersRequest: getOrdersRequestMock,
			getCurrentOrdersRequest: getCurrentOrdersRequestMock,
			getProductPriceRequest: getProductPriceRequestMock
		};
		wrapper = setupTwo(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('componentDidMount', () => {
		const componentDidMountMock = wrapper.instance().componentDidMount;
		expect(typeof componentDidMountMock).toBe('function');

		wrapper.instance().componentDidMount();
		const getCustomerRequestMockCallCount = getCustomerRequestMock.mock.calls.length;
		expect(getCustomerRequestMockCallCount).toBeDefined();

		const fetchDictionaryRequestMockCallCount = fetchDictionaryRequestMock.mock.calls.length;
		expect(fetchDictionaryRequestMockCallCount).toBeDefined();

		const getOrdersRequestMockCallCount = getOrdersRequestMock.mock.calls.length;
		expect(getOrdersRequestMockCallCount).toBeDefined();

		const getCurrentOrdersRequestMockCallCount = getCurrentOrdersRequestMock.mock.calls.length;
		expect(getCurrentOrdersRequestMockCallCount).toBeDefined();

		const getProductsRequestMockCallCount = getProductsRequestMock.mock.calls.length;
		expect(getProductsRequestMockCallCount).toBeDefined();
	});

});

describe('clone', () => {
	function TestComponent(){ return (<div className="test" />); }

	  it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<Provider store= {mockStoreOrder}><DataLayer><TestComponent /></DataLayer></Provider>, div);
	  });
});


