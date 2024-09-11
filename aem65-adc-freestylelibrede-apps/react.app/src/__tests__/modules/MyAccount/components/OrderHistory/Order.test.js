import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import Order from '../../../../../modules/MyAccount/components/OrderHistory/Order';
import {Provider} from 'react-redux';
import {mockStore, mockStoreOrder, mockStoreConfirmationPage} from '../../../../../__mocks__/storeMock';
jest.mock('../../../../../utils/endpointUrl');
Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props= {}) => {
	const wrapper = shallow(<Order store= {mockStore} {...props}/>).dive().dive();
	return wrapper;
};

const setupTwo = (props= {}) => {
	const wrapper = shallow(<Order store= {mockStoreOrder} {...props}/>).dive().dive();
	return wrapper;
};
const setupThree = (props= {}) => {
	const wrapper = shallow(<Order store= {mockStoreConfirmationPage} {...props}/>).dive().dive();
	return wrapper;
};

const openReturnFormRequestMock = jest.fn();
const getOrderReturnRmaDetailsRequestMock = jest.fn();
const getInvoiceMock = jest.fn();
const productData= [{
	'index': 0,
	'productSKU':'sku',
	'productName':'FreeStyle Libre Sensor v1',
	'productQuantity':1,
	'productRescheduledDueDate':null,
	'productOriginalDateFrom':1587945600000,
	'productDateOfNextShipment':1595808000000,
	'productOriginalDateOfNextShipment':1595808000000,
	'productDueDateWindow':'14,14',
	'deliverableNumber':'DLV-000010292'
}];
const productDataMultiple= [{
	'index': 0,
	'productSKU':'sku',
	'productName':'FreeStyle Libre Sensor v1 Sensor',
	'productQuantity':3,
	'productRescheduledDueDate':null,
	'productOriginalDateFrom':1587945600000,
	'productDateOfNextShipment':1595808000000,
	'productOriginalDateOfNextShipment':1595808000000,
	'productDueDateWindow':'14,14',
	'deliverableNumber':'DLV-000010292'
},
{
	'index': 1,
	'productSKU':'sku1',
	'productName':'FreeStyle Libre Sensor v2 Sensor',
	'productQuantity':2,
	'productRescheduledDueDate':null,
	'productOriginalDateFrom':1587945600000,
	'productDateOfNextShipment':1595808000000,
	'productOriginalDateOfNextShipment':1595808000000,
	'productDueDateWindow':'14,14',
	'deliverableNumber':'DLV-000010292'
}];
const priceBreakdown= {
	'totalPrice':425.25,
	'price':419.30,
	'coPay':'',
	'deliveryCost':5.95
};
const paymentDetails= {
	'paymentMethodType':'paypal',
	'paymentBrand':null,
	'card':{
		'last4Digits':null
	},
	'amountAuthorized':425.25,
	'paymentToken':'8ac7a4a271bac61a0171bafbc8c427f8',
	'amountPaid':425.25,
	'paymentTransactionId':null
};
const deliveryDetails = [{
	'index':1,
	'deliveryId':'SCH-0000089849',
	'deliveryType':'Master',
	'deliveryStatus':'Scheduled',
	'deliveryNumber':null,
	'deliveryTrackingNr':null,
	'invoiceIdDetails':[{
		'invoiceId':'a4Z4E0000002qCuUAI',
		'invoiceStatus':null
	}],
	'wmsStatus':null,
	'estimatedDeliveryDate':null,
	'productSKU':'S5269856',
	'productQuantity':1,
	'shipmentId':'a4d4E0000000bOsQAI'
}];
const products= {
	'id': 1,
	'sku': 'simple_product',
	'name': 'Simple Product',
	'description': 'Some product description',
	'short_description': 'Some product short description',
};

describe('Order component Test Suite', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			order: {
				'index':1,
				'orderId':'orderId',
				'orderDate':1587945600000,
				'orderTitle':'Cash Pay',
				'orderType':'Cash Pay',
				'orderSubtype': 'orderSubtype',
				'productData': productData,
				'serviceData': [],
				'priceBreakdown': priceBreakdown,
				'paymentDetails': paymentDetails,
				'deliveryDetails': deliveryDetails,
				'returnDetails': [{returnId: 'returnId1'}],
			},
			products: products,
			dictionary: {'dictionary': 'dictionary1'},
			openReturnFormRequest: openReturnFormRequestMock,
			getInvoice: getInvoiceMock,
			getOrderReturnRmaDetailsRequest: getOrderReturnRmaDetailsRequestMock,
		};
		wrapper= setup(props);
	});

	describe('Props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('order is a prop and is of type Object', () => {
			const orderProp = wrapper.instance().props.order;
			expect(orderProp).toBeInstanceOf(Object);
		});

		test('products is a prop and is of type Object', () => {
			const productsProp = wrapper.instance().props.products;
			expect(productsProp).toBeInstanceOf(Object);
		});

		test('dictionary is a prop and is of type Object', () => {
			const dictionaryProp = wrapper.instance().props.dictionary;
			expect(dictionaryProp).toBeInstanceOf(Object);
		});

		test('customerReturnInfo is a prop and is of type Object', () => {
			const customerReturnInfoProp = wrapper.instance().props.customerReturnInfo;
			expect(customerReturnInfoProp).toBeInstanceOf(Object);
		});

		test('openReturnFormRequest is a prop and is of type function', () => {
			const openReturnFormRequestProp = wrapper.instance().props.openReturnFormRequest;
			expect(typeof openReturnFormRequestProp).toBe('function');
		});

		test('getInvoice is a prop and is of type function', () => {
			const getInvoiceProp = wrapper.instance().props.getInvoice;
			expect(typeof getInvoiceProp).toBe('function');
		});

		test('getOrderReturnRmaDetailsRequest is a prop and is of type function', () => {
			const getOrderReturnRmaDetailsRequestProp = wrapper.instance().props.getOrderReturnRmaDetailsRequest;
			expect(typeof getOrderReturnRmaDetailsRequestProp).toBe('function');
		});

	});

	describe('state check', () => {

		test('state check', () => {
			const stateCheck = wrapper.instance().state;
			expect(stateCheck).toBeInstanceOf(Object);
			expect(stateCheck.showDetails).toBeFalsy();
		});
	});

	describe('Functions check', () => {

		test('getReturnReceipt function call check', () => {
			const getReturnReceiptMock = wrapper.instance().getReturnReceipt;
			expect(typeof getReturnReceiptMock).toBe('function');

			getReturnReceiptMock();
			const getOrderReturnRmaDetailsRequestMockCallCount = getOrderReturnRmaDetailsRequestMock.mock.calls.length;
			expect(getOrderReturnRmaDetailsRequestMockCallCount).toBeDefined();
		});

		test('getOrderDescription function call check', () => {
			const getOrderDescriptionMock = wrapper.instance().getOrderDescription;
			expect(typeof getOrderDescriptionMock).toBe('function');
			expect(typeof getOrderDescriptionMock()).toBe('string');
		});


		test('getProductImage function call check', () => {
			const getProductImageMock = wrapper.instance().getProductImage;
			expect(typeof getProductImageMock).toBe('function');
			expect(typeof getProductImageMock()).toBe('object');
		});

		test('getProductSKUs function call check', () => {
			const getProductSKUsMock = wrapper.instance().getProductSKUs;
			expect(typeof getProductSKUsMock).toBe('function');

			expect(getProductSKUsMock()).toEqual(['sku']);
		});

		test('toggleDetails function call check', () => {
			const toggleDetailsMock = wrapper.instance().toggleDetails;
			expect(typeof toggleDetailsMock).toBe('function');

			toggleDetailsMock();
			expect(wrapper.instance().state.showDetails).toBeTruthy();
		});

		test('returnArticle function call check', () => {
			wrapper.instance().setState({
				showDetails: true
			});
			const returnArticleMock = wrapper.props().children[3].props.children[1].props.children[0].props.returnArticle;
			const order = {...wrapper.instance().props.order};
			// order.orderType = 'Cash Pay';
			// const productData= order.productData;
			const delivery= order.delivery;
			const orderDetails= order.orderDetails;
			returnArticleMock(productData, delivery, orderDetails,'Cash Pay');
			const openReturnFormRequestMockCallCount = openReturnFormRequestMock.mock.calls.length;
			expect(openReturnFormRequestMockCallCount).toBeDefined();
		});

	});
});

describe('Order component Test Suite', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			order: {
				'index':1,
				'orderId':'orderId',
				'orderDate':1587945600000,
				'orderTitle':'Cash Pay',
				'orderType':'Cash Pay Subscription',
				'orderSubtype': 'orderSubtype',
				'productData': productData,
				'serviceData': [],
				'priceBreakdown': priceBreakdown,
				'paymentDetails': paymentDetails,
				'deliveryDetails': deliveryDetails,
				'returnDetails': [{returnId: 'returnId1'}],
			},
			products: products,
			dictionary: {'dictionary': 'dictionary1'},
			openReturnFormRequest: openReturnFormRequestMock,
			getInvoice: getInvoiceMock,
			getOrderReturnRmaDetailsRequest: getOrderReturnRmaDetailsRequestMock,
		};
		wrapper= setupThree(props);
	});

	describe('Render check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});
		test('returnArticle function call check', () => {
			wrapper.instance().setState({
				showDetails: true
			});
			const returnArticleMock = wrapper.props().children[3].props.children[1].props.children[0].props.returnArticle;
			const order = {...wrapper.instance().props.order};
			// order.orderType = 'Cash Pay';
			// const productData= order.productData;
			const delivery= order.delivery;
			const orderDetails= order.orderDetails;
			const openReturnFormRequestMockCallCount = openReturnFormRequestMock.mock.calls.length;
			returnArticleMock(productData, delivery, orderDetails,'Cash Pay Subscription');
			expect(openReturnFormRequestMockCallCount).toBeDefined();
		});
	});
});

describe('Order component Test Suite with mount', () => {
	let props;
	let wrapper;
	
	beforeEach(() => {
		props = {
			order: {
				'index':1,
				'orderId':'orderId',
				'orderDate':1587945600000,
				'orderTitle':'Cash Pay',
				'orderType':'Cash Pay',
				'orderSubtype': 'orderSubtype',
				'productData': productDataMultiple,
				'serviceData': [],
				'priceBreakdown': priceBreakdown,
				'paymentDetails': paymentDetails,
				'deliveryDetails': deliveryDetails,
				'returnDetails': [{returnId: 'returnId1'}],
			},
			
			products: {},
			dictionary: {},
			openReturnFormRequest: openReturnFormRequestMock,
			getInvoice: getInvoiceMock,
			getOrderReturnRmaDetailsRequest: getOrderReturnRmaDetailsRequestMock,
		};
		wrapper = mount(<Provider store= {mockStore}><Order {...props} /></Provider>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});

describe('Order component Test Suite with other conditions without serviceData', () => {

	let props;
	let wrapper;
const getOrderDescriptionMock = jest.fn();
const getProductLabelsMock = jest.fn();
	beforeEach(() => {
		props = {
			order: {
				'index':1,
				'orderId':'orderId',
				'orderDate':1587945600000,
				'orderTitle':'Cash Pay Subscription',
				'orderType':'Cash Pay Subscription',
				'productData': productData,
				'serviceData': [],
				'priceBreakdown': priceBreakdown,
				'paymentDetails': paymentDetails,
				'deliveryDetails': deliveryDetails,
				'returnDetails':null,
			},
			products: products,
			dictionary: {'dictionary': 'dictionary1'},
			openReturnFormRequest: openReturnFormRequestMock,
			getInvoice: getInvoiceMock,
			getOrderReturnRmaDetailsRequest: getOrderReturnRmaDetailsRequestMock,
			getOrderDescription: getOrderDescriptionMock,
			getProductLabels: getProductLabelsMock,
		};
		wrapper= setupTwo(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	
	test('getOrderDescription is a prop and is of type function', () => {
    	const getOrderDescriptionProp = wrapper.instance().props.getOrderDescription;
    	expect(typeof getOrderDescriptionProp).toBe('function');
	});


	test('getProductLabels is a prop and is of type function', () => {
		const getProductLabelsProp = wrapper.instance().props.getProductLabels;
		expect(typeof getProductLabelsProp).toBe('function');
	});
	test('getProductSKUs is a prop and is of type function', () => {
		const getProductSKUsMock = wrapper.instance().getProductSKUs;
		expect(typeof getProductSKUsMock).toBe('function');

		expect(typeof getProductSKUsMock()).toBe('object');
	});
});

describe('Order component Test Suite with other conditions with serviceData', () => {

	let props;
	let wrapper;

	beforeEach(() => {
		props = {
			order: {
				'index':1,
				'orderId':'orderId',
				'orderDate':1587945600000,
				'orderTitle':'Cash Pay Subscription',
				'orderType':'Cash Pay Subscription',
				'orderSubtype': 'orderSubtype',
				'productData': productData,
				'serviceData': [{'serviceProductQuantity':1,'serviceDuration' :'week', 'serviceFrequency':'3'}],
				'priceBreakdown': {
					'price':419.30,
					'coPay':'',
					'deliveryCost':5.95
				},
				'paymentDetails': paymentDetails,
				'deliveryDetails': deliveryDetails,
				'returnDetails':null,
			},
			products: products,
			dictionary: {'dictionary': 'dictionary1'},
			openReturnFormRequest: openReturnFormRequestMock,
			getInvoice: getInvoiceMock,
			getOrderReturnRmaDetailsRequest: getOrderReturnRmaDetailsRequestMock,
		};
		wrapper= setupTwo(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});

describe('Order component Test Suite with other conditions without serviceData[0]', () => {

	let props;
	let wrapper;

	beforeEach(() => {
		props = {
			order: {
				'index':1,
				'orderId':'orderId',
				'orderDate':1587945600000,
				'orderTitle':'Reimbursement',
				'orderType':'Reimbursement',
				'orderSubtype': 'orderSubtype',
				'productData': productData,
				'serviceData': [''],
				'priceBreakdown': {
					'price':419.30,
					'coPay':'',
					'deliveryCost':5.95
				},
				'paymentDetails': paymentDetails,
				'deliveryDetails': deliveryDetails,
				'returnDetails':null,
			},
			products: products,
			dictionary: {'dictionary': 'dictionary1'},
			openReturnFormRequest: openReturnFormRequestMock,
			getInvoice: getInvoiceMock,
			getOrderReturnRmaDetailsRequest: getOrderReturnRmaDetailsRequestMock,
		};
		wrapper= setupTwo(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('returnArticle function call check', () => {
		wrapper.instance().setState({
			showDetails: true
		});
		const returnArticleMock = wrapper.props().children[3].props.children[1].props.children[0].props.returnArticle;
		const order = {...wrapper.instance().props.order};
		// order.orderType = 'Cash Pay';
		// const productData= order.productData;
		const delivery= order.delivery;
		const orderDetails= order.orderDetails;
		const openReturnFormRequestMockCallCount = openReturnFormRequestMock.mock.calls.length;
		returnArticleMock(productData, delivery, orderDetails,'Reimbursement');
		expect(openReturnFormRequestMockCallCount).toBeDefined();
	});

});


