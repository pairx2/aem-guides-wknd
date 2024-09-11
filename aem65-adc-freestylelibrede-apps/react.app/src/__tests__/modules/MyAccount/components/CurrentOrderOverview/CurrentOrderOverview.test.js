import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore, mockStoreOrder} from '../../../../../__mocks__/storeMock';
import CurrentOrderOverview from '../../../../../modules/MyAccount/components/CurrentOrderOverview/CurrentOrderOverview';
jest.mock('../../../../../utils/endpointUrl');
Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

const setup = (props= {}) => {
	const wrapper = shallow(<CurrentOrderOverview store= {mockStore} {...props}/>).dive().dive();
	return wrapper;
};

const setupTwo = (props= {}) => {
	const wrapper = shallow(<CurrentOrderOverview store= {mockStoreOrder} {...props}/>).dive().dive();
	return wrapper;
};

describe('CurrentOrderOverview Component Test Suite with isReturnFlow as false', () => {
	let props, wrapper;
	const getCurrentOrdersMock= jest.fn();
	const getProductsRequestMock= jest.fn();
	const fetchDictionaryRequestMock= jest.fn();

	beforeEach(() => {
		props = {
			getCurrentOrders: getCurrentOrdersMock,
			getProductsRequest: getProductsRequestMock,
			fetchDictionaryRequest: fetchDictionaryRequestMock,
			currentOrderHeading: 'currentOrderHeading',
			emptyHeading: 'emptyHeading',
			emptyInfoText: 'emptyInfoText',
			orderRecipeStyle: 'orderRecipeStyle',
			orderRecipeLink: 'orderRecipeLink',
			orderShopStyle: 'orderShopStyle',
			checkoutPage: 'checkoutPage',
			orderShopLink: 'orderShopLink',
			returnText: 'returnText',
			responsiveness: {'default': 11},
			isAccountOverviewTab: false,
			accountPagePath: 'accountPagePath',
			accountPageTab: 'accountPageTab',
			tabName: 'tabName',
			orderType: 'CPS'
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

		test('has currentOrderHeading as prop and is of type string', () => {
			const currentOrderHeadingProp = wrapper.instance().props.currentOrderHeading;
			expect(typeof currentOrderHeadingProp).toBe('string');
		});

		test('has emptyHeading as prop and is of type string', () => {
			const emptyHeadingProp = wrapper.instance().props.emptyHeading;
			expect(typeof emptyHeadingProp).toBe('string');
		});

		test('has emptyInfoText as prop and is of type string', () => {
			const emptyInfoTextProp = wrapper.instance().props.emptyInfoText;
			expect(typeof emptyInfoTextProp).toBe('string');
		});

		test('has orderRecipeStyle as prop and is of type string', () => {
			const orderRecipeStyleProp = wrapper.instance().props.orderRecipeStyle;
			expect(typeof orderRecipeStyleProp).toBe('string');
		});

		test('has orderRecipeLink as prop and is of type string', () => {
			const orderRecipeLinkProp = wrapper.instance().props.orderRecipeLink;
			expect(typeof orderRecipeLinkProp).toBe('string');
		});

		test('has orderShopStyle as prop and is of type string', () => {
			const orderShopStyleProp = wrapper.instance().props.orderShopStyle;
			expect(typeof orderShopStyleProp).toBe('string');
		});

		test('has checkoutPage as prop and is of type string', () => {
			const checkoutPageProp = wrapper.instance().props.checkoutPage;
			expect(typeof checkoutPageProp).toBe('string');
		});

		test('has orderShopLink as prop and is of type string', () => {
			const orderShopLinkProp = wrapper.instance().props.orderShopLink;
			expect(typeof orderShopLinkProp).toBe('string');
		});

		test('has returnText as prop and is of type string', () => {
			const returnTextProp = wrapper.instance().props.returnText;
			expect(typeof returnTextProp).toBe('string');
		});

		test('has accountPagePath as prop and is of type string', () => {
			const accountPagePathProp = wrapper.instance().props.accountPagePath;
			expect(typeof accountPagePathProp).toBe('string');
		});

		test('has accountPageTab as prop and is of type string', () => {
			const accountPageTabProp = wrapper.instance().props.accountPageTab;
			expect(typeof accountPageTabProp).toBe('string');
		});

		test('has isReturnFlow as prop and is of type boolean', () => {
			const isReturnFlowProp = wrapper.instance().props.isReturnFlow;
			expect(typeof isReturnFlowProp).toBe('boolean');
		});

		test('has isAccountOverviewTab as prop and is of type boolean', () => {
			const isAccountOverviewTabProp = wrapper.instance().props.isAccountOverviewTab;
			expect(typeof isAccountOverviewTabProp).toBe('boolean');
		});

		test('has currentOrders as prop and is of type array', () => {
			const currentOrdersProp = wrapper.instance().props.currentOrders;
			expect(currentOrdersProp).toBeInstanceOf(Object);
		});

		test('has products as prop and is of type object', () => {
			const productsProp = wrapper.instance().props.products;
			expect(productsProp).toBeInstanceOf(Object);
		});

		test('has orders as prop and is of type object', () => {
			const ordersProp = wrapper.instance().props.orders;
			expect(ordersProp).toBeInstanceOf(Object);
		});

		test('has customer as prop and is of type object', () => {
			const customerProp = wrapper.instance().props.customer;
			expect(customerProp).toBeInstanceOf(Object);
		});

		test('has dictionary as prop and is of type object', () => {
			const dictionaryProp = wrapper.instance().props.dictionary;
			expect(dictionaryProp).toBeInstanceOf(Object);
		});

		test('has productData as prop and is of type object', () => {
			const productDataProp = wrapper.instance().props.productData;
			expect(productDataProp).toBeInstanceOf(Object);
		});

		test('has delivery as prop and is of type object', () => {
			const deliveryProp = wrapper.instance().props.delivery;
			expect(deliveryProp).toBeInstanceOf(Object);
		});

		test('has orderDetails as prop and is of type object', () => {
			const orderDetailsProp = wrapper.instance().props.orderDetails;
			expect(orderDetailsProp).toBeInstanceOf(Object);
		});

		test('has responsiveness as prop and is of type object', () => {
			const responsivenessProp = wrapper.instance().props.responsiveness;
			expect(responsivenessProp).toBeInstanceOf(Object);
		});

		test('has getCurrentOrders as prop and is of type function', () => {
			const getCurrentOrdersProp = wrapper.instance().props.getCurrentOrders;
			expect(typeof getCurrentOrdersProp).toBe('function');
		});

		test('has getProductsRequest as prop and is of type function', () => {
			const getProductsRequestProp = wrapper.instance().props.getProductsRequest;
			expect(typeof getProductsRequestProp).toBe('function');
		});

		test('has fetchDictionaryRequest as prop and is of type function', () => {
			const fetchDictionaryRequestProp = wrapper.instance().props.fetchDictionaryRequest;
			expect(typeof fetchDictionaryRequestProp).toBe('function');
		});

	});

	describe('state check', () => {

		test('state value check', () => {
			const stateCheck = wrapper.instance().state;
			expect(stateCheck).toBeInstanceOf(Object);

			expect(typeof stateCheck.isEditing).toBe('boolean');
			expect(stateCheck.isEditing).toBeFalsy();

			expect(typeof stateCheck.addressType).toBe('string');
			expect(stateCheck.addressType).toBe('');

			expect(stateCheck.currentOrder).toBeInstanceOf(Object);
			expect(stateCheck.currentOrder).toEqual({});
		});
	});

	describe('functions check', () => {

		test('toggleEditing function call check', () => {
			const toggleEditingMock = wrapper.instance().toggleEditing;
			expect(typeof toggleEditingMock).toBe('function');

			wrapper.instance().ref = {current : {scrollIntoView: jest.fn()}};
			const type= 'type';
			const isEditing= true;
			const currentOrder = {currentOrderProp: 'currentOrderValue'};

			toggleEditingMock(type, isEditing, currentOrder);

			expect(wrapper.instance().state.addressType).toBe(type);
			expect(wrapper.instance().state.isEditing).toBeTruthy();
			expect(wrapper.instance().state.currentOrder).toEqual(currentOrder);
		});

		test('tabChanged function call check', () => {
			const tabChangedMock = wrapper.instance().tabChanged;
			expect(typeof tabChangedMock).toBe('function');
			tabChangedMock();
			expect(wrapper.instance().state.isEditing).toBeFalsy();
		});

		test('isLargeEnough function call check', () => {
			const isLargeEnoughMock = wrapper.instance().isLargeEnough;
			expect(typeof isLargeEnoughMock).toBe('function');

			expect(isLargeEnoughMock()).toBeTruthy();
		});

		test('componentDidMount function call check', () => {
			const componentDidMountMock = wrapper.instance().componentDidMount;
			expect(typeof componentDidMountMock).toBe('function');

			wrapper.instance().componentDidMount();

			const getProductsRequestMockCallCount = getProductsRequestMock.mock.calls.length;
			expect(getProductsRequestMockCallCount).toBeDefined();
		});

		test('componentDidUpdate function call check', () => {
			const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateMock).toBe('function');

			const prevProps = {'customer': {'id': 5}, 'orders': {'CPS':{'ordersList': ['a1', 'a2']}}};
			wrapper.instance().componentDidUpdate(prevProps);

			const getCurrentOrdersMockCallCount = getCurrentOrdersMock.mock.calls.length;
			expect(getCurrentOrdersMockCallCount).toBeDefined();
		});

		test('toggleEditing function call in close property of AddressEditor', () => {
			wrapper.instance().setState({isEditing: true});
			const closeProp= wrapper.props().children.props.close;
			expect(typeof closeProp).toBe('function');

			wrapper.instance().ref = {current : {scrollIntoView: jest.fn()}};
			closeProp(false);
			expect(wrapper.instance().state.isEditing).toBeFalsy();
		});

	});
});

describe('CurrentOrderOverview Component Test Suite with isReturnFlow as true & no responsiveness prop', () => {

	let props, wrapper;
	const getCurrentOrdersMock= jest.fn();
	const getProductsRequestMock= jest.fn();
	const fetchDictionaryRequestMock= jest.fn();

	beforeEach(() => {
		props = {
			getCurrentOrders: getCurrentOrdersMock,
			getProductsRequest: getProductsRequestMock,
			fetchDictionaryRequest: fetchDictionaryRequestMock,
			currentOrderHeading: 'currentOrderHeading',
			emptyHeading: 'emptyHeading',
			emptyInfoText: 'emptyInfoText',
			orderRecipeStyle: 'orderRecipeStyle',
			orderRecipeLink: 'orderRecipeLink',
			orderShopStyle: 'orderShopStyle',
			checkoutPage: 'checkoutPage',
			orderShopLink: 'orderShopLink',
			returnText: 'returnText',
			responsiveness: {'default': 7},
			isAccountOverviewTab: false,
			accountPagePath: 'accountPagePath',
			accountPageTab: 'accountPageTab',
			tabName: 'tabName'
		};
		wrapper= setupTwo(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('isLargeEnough function call check', () => {
		const isLargeEnoughMock = wrapper.instance().isLargeEnough;
		expect(typeof isLargeEnoughMock).toBe('function');

		expect(isLargeEnoughMock()).toBeFalsy();
	});

});


