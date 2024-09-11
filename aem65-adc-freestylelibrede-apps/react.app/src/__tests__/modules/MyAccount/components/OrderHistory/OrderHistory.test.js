import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import OrderHistory from '../../../../../modules/MyAccount/components/OrderHistory/OrderHistory';
import {mockStore, mockStoreOrder} from '../../../../../__mocks__/storeMock';
jest.mock('../../../../../utils/endpointUrl');
Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

const setup = (props= {}) => {
	const wrapper = shallow(<OrderHistory store= {mockStore} {...props}/>).dive().dive();
	return wrapper;
};

const setupTwo = (props= {}) => {
	const wrapper = shallow(<OrderHistory store= {mockStoreOrder} {...props}/>).dive().dive();
	return wrapper;
};

describe('OrderHistory Component Test Suite', () => {
	let props, wrapper;
	const fetchDictionaryRequestMock = jest.fn();
	const getProductsRequestMock = jest.fn();
	const getOrdersRequestMock = jest.fn();
	const closeReturnFormRequestMock = jest.fn();
	const openModalActionMock = jest.fn();

	beforeEach(() => {

		props= {
			fetchDictionaryRequest: fetchDictionaryRequestMock,
			getProductsRequest: getProductsRequestMock,
			getOrdersRequest: getOrdersRequestMock,
			closeReturnFormRequest: closeReturnFormRequestMock,
			openModalAction: openModalActionMock,
			checkoutPage: 'checkoutPage',
			returnText: 'returnText',
			heading: 'heading',
			responsiveness: {default: 11},
			orderHistoryType: 'RX'
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

		test('has checkoutPage as prop and is of type string', () => {
			const checkoutPageProp = wrapper.instance().props.checkoutPage;
			expect(typeof checkoutPageProp).toBe('string');
		});

		test('has returnText as prop and is of type string', () => {
			const returnTextProp = wrapper.instance().props.returnText;
			expect(typeof returnTextProp).toBe('string');
		});

		test('has heading as prop and is of type string', () => {
			const headingProp = wrapper.instance().props.heading;
			expect(typeof headingProp).toBe('string');
		});

		test('has dictionary as prop', () => {
			const dictionaryProp = wrapper.instance().props.dictionary;
			expect(dictionaryProp).toBeInstanceOf(Object);
		});

		test('has orders as prop', () => {
			const ordersProp = wrapper.instance().props.orders;
			expect(ordersProp).toBeInstanceOf(Object);
		});

		test('has products as prop', () => {
			const productsProp = wrapper.instance().props.products;
			expect(productsProp).toBeInstanceOf(Object);
		});

		test('has productData as prop', () => {
			const productDataProp = wrapper.instance().props.productData;
			expect(productDataProp).toBeInstanceOf(Object);
		});

		test('has delivery as prop', () => {
			const deliveryProp = wrapper.instance().props.delivery;
			expect(deliveryProp).toBeInstanceOf(Object);
		});

		test('has orderDetails as prop', () => {
			const orderDetailsProp = wrapper.instance().props.orderDetails;
			expect(orderDetailsProp).toBeInstanceOf(Object);
		});

		test('has responsiveness as prop', () => {
			const responsivenessProp = wrapper.instance().props.responsiveness;
			expect(responsivenessProp).toBeInstanceOf(Object);
		});

		test('fetchDictionaryRequest as a prop and is of type function', () => {
			const fetchDictionaryRequestProp = wrapper.instance().props.fetchDictionaryRequest;
			expect(typeof fetchDictionaryRequestProp).toBe('function');
		});

		test('getProductsRequest as a prop and is of type function', () => {
			const getProductsRequestProp = wrapper.instance().props.getProductsRequest;
			expect(typeof getProductsRequestProp).toBe('function');
		});

		test('getOrdersRequest as a prop and is of type function', () => {
			const getOrdersRequestProp = wrapper.instance().props.getOrdersRequest;
			expect(typeof getOrdersRequestProp).toBe('function');
		});

		test('closeReturnFormRequest as a prop and is of type function', () => {
			const closeReturnFormRequestProp = wrapper.instance().props.closeReturnFormRequest;
			expect(typeof closeReturnFormRequestProp).toBe('function');
		});

		test('openModalAction as a prop and is of type function', () => {
			const openModalActionProp = wrapper.instance().props.openModalAction;
			expect(typeof openModalActionProp).toBe('function');
		});

	});

	describe('state check', () => {

		test('state variable access', () => {
			const stateProp = wrapper.instance().state;
			expect(stateProp).toBeInstanceOf(Object);

			expect(stateProp.currentPagination).toBe(1);
			expect(typeof stateProp.currentPagination).toBe('number');
		});
	});

	describe('function check', () => {

		test('setPagination function access', () => {
			const setPaginationMock = wrapper.instance().setPagination;
			expect(typeof setPaginationMock).toBe('function');

			setPaginationMock(2);
			expect(wrapper.instance().state.currentPagination).toBe(2);
		});

		test('isLargeEnough function access', () => {
			const isLargeEnoughMock = wrapper.instance().isLargeEnough;
			expect(typeof isLargeEnoughMock).toBe('function');

			expect(isLargeEnoughMock()).toBeTruthy();
		});

		test('componentDidUpdate function check', () => {
			const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateMock).toBe('function');

			wrapper.instance().ref= {current: {scrollIntoView: jest.fn()}};
			const prevProps= {isInvoiceErrorModalOpen : false, isReturnFlow : true};
			wrapper.instance().componentDidUpdate(prevProps);

			const openModalActionMockCallCount= openModalActionMock.mock.calls.length;
			expect(openModalActionMockCallCount).toBeDefined();
		});
	});
});

describe('OrderHistory Component Test Suite', () => {
	let props, wrapper;
	const fetchDictionaryRequestMock = jest.fn();
	const getProductsRequestMock = jest.fn();
	const getOrdersRequestMock = jest.fn();
	const closeReturnFormRequestMock = jest.fn();
	const openModalActionMock = jest.fn();

	beforeEach(() => {

		props= {
			fetchDictionaryRequest: fetchDictionaryRequestMock,
			getProductsRequest: getProductsRequestMock,
			getOrdersRequest: getOrdersRequestMock,
			closeReturnFormRequest: closeReturnFormRequestMock,
			openModalAction: openModalActionMock,
			checkoutPage: 'checkoutPage',
			returnText: 'returnText',
			heading: 'heading',
			responsiveness: {default: 5},
			orderHistoryType: 'CP'
		};
		wrapper= setupTwo(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('isLargeEnough function access', () => {
		const isLargeEnoughMock = wrapper.instance().isLargeEnough;
		expect(typeof isLargeEnoughMock).toBe('function');

		expect(isLargeEnoughMock()).toBeFalsy();
	});

	test('ReturnArticle component renders if isReturnFlow is true', () => {
		const ReturnArticleProp= wrapper.props().children.type.displayName;
		expect(ReturnArticleProp).toBe('withBreakpoints(CardRender)');
	});

});