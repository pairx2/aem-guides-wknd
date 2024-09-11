import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Delivery from '../../../../../modules/MyAccount/components/OrderHistory/Delivery';
jest.mock('../../../../../utils/endpointUrl');

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const getFormattedDateMock = jest.fn();
const returnArticleMock = jest.fn();
const getInvoiceMock = jest.fn();
const getReturnReceiptMock = jest.fn();


describe('Delivery component Test Suite with returnSent as true and with returnDetails array and returnId as well', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			orderId: 'orderId',
			delivery: {
				index: 2,
				deliveryStatus: 'Delivered',
				estimatedDeliveryDate: 234,
				deliveryTrackingNr: 'deliveryTrackingNr',
				invoiceIdDetails: [{
					'invoiceId': 'DEIE0000002qCuUAI',
					'invoiceStatus': 'invoiceStatus'
					}
				],
				deliveredDate: 1594887935000,
				products: [{
					'productSKU': '71988-01',
					'productQuantity': 1
				}],
				returnDetails: [{ 'returnType': 'commercial return' }]
			},
			getFormattedDate: getFormattedDateMock,
			returnArticle: returnArticleMock,
			orderDate: 123,
			getInvoice: getInvoiceMock,
			getReturnReceipt: getReturnReceiptMock,
			commercialReturnGracePeriod: 14,
			returnId: '',
			returnDetails: [{
				'returnId': '4900001672',
				'returnStatus': 'Pending',
				'returnRequestDate': '1594887935000'
			}],
			productData: [{
				'index':1,
				'productSKU':'71988-01',
				'productName':'Freestyle Libre Sensor v2',
				'productQuantity':1,
				'productRescheduledDueDate':null,
				'productOriginalDateFrom':1592265600000,
				'productDateOfNextShipment':null,
				'productOriginalDateOfNextShipment':null,
				'productDueDateWindow':'14,14',
				'deliverableNumber':'DLV-000017694'
			}]
		};
		wrapper = shallow(<Delivery {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('render check', () => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('getInvoice function call in button action', () => {

		const actionProp = wrapper.props().children[2].props.children.props.children[1].props.children[0][0].props.children.props.action;
		expect(typeof actionProp).toBe('function');
		actionProp();
		const getInvoiceMockCallCount = getInvoiceMock.mock.calls.length;
		expect(getInvoiceMockCallCount).toBeDefined();
		expect(getInvoiceMockCallCount).not.toBe(0);
	});
});

describe('Delivery component Test Suite with returnSent as true and with returnDetails array and returnId as well', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			orderId: 'orderId',
			delivery: {
				index: 2,
				deliveryStatus: 'Delivered',
				estimatedDeliveryDate: 234,
				deliveryTrackingNr: 'deliveryTrackingNr',
				invoiceIdDetails: [{
					'invoiceId': 'a4Z4E0000002qCuUAI',
					'invoiceStatus': 'invoiceStatus'
				}],
				deliveredDate: 1602633600000,
				products: [{
					'productSKU': '71988-01',
					'productQuantity': 1
				}]
			},
			getFormattedDate: getFormattedDateMock,
			returnArticle: returnArticleMock,
			orderDate: 123,
			getInvoice: getInvoiceMock,
			getReturnReceipt: getReturnReceiptMock,
			commercialReturnGracePeriod: 14,
			returnId: '',
			returnDetails: [],
			productData: [{
				'index': 1,
				'productSKU': '71988-01',
				'productName': 'Freestyle Libre Sensor v2',
				'productQuantity': 1,
				'productRescheduledDueDate': null,
				'productOriginalDateFrom': 1592265600000,
				'productDateOfNextShipment': null,
				'productOriginalDateOfNextShipment': null,
				'productDueDateWindow': '14,14',
				'deliverableNumber': 'DLV-000017694'
			}]
		};
		wrapper = shallow(<Delivery {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('render check', () => {
		expect(wrapper.type()).not.toEqual(null);
	});
});

describe('Delivery component Test Suite with returnSent as false', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			orderId: 'orderId',
			delivery: {
				index: 2,
				deliveryStatus: 'Order has been sent back',
				estimatedDeliveryDate: 234,
				deliveryTrackingNr: 'deliveryTrackingNr',
				invoiceIdDetails: [{
					'invoiceId': 'a4Z4E0000002qCuUAI',
					'invoiceStatus': 'invoiceStatus'
				}],
				deliveredDate: 1594887935000,
				products: [{
					'productSKU': '71988-01',
					'productQuantity': 1
				}]
			},
			getFormattedDate: getFormattedDateMock,
			returnArticle: returnArticleMock,
			orderDate: 123,
			getInvoice: getInvoiceMock,
			getReturnReceipt: getReturnReceiptMock,
			commercialReturnGracePeriod: 14,
			returnId: 'returnId',
			returnDetails: [],
			productData: [{
				'index': 1,
				'productSKU': '71988-01',
				'productName': 'Freestyle Libre Sensor v2',
				'productQuantity': 1,
				'productRescheduledDueDate': null,
				'productOriginalDateFrom': 1592265600000,
				'productDateOfNextShipment': null,
				'productOriginalDateOfNextShipment': null,
				'productDueDateWindow': '14,14',
				'deliverableNumber': 'DLV-000017694'
			}]
		};
		wrapper = shallow(<Delivery {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});

describe('Delivery component Test Suite with other condition', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			orderId: 'orderId',
			delivery: {
				index: 2,
				deliveryStatus: 'Order has been sent back',
				estimatedDeliveryDate: 234,
				deliveryTrackingNr: 'deliveryTrackingNr',
				invoiceIdDetails: [{
					'invoiceId': 'a4Z4E0000002qCuUAI',
					'invoiceStatus': 'invoiceStatus'
				}],
				deliveredDate: 1594887935000,
				products: [{
					'productSKU': '71988-01',
					'productQuantity': 1
				}],
				returnDetails: [{ 'returnType': 'commercial return' }]
			},
			getFormattedDate: getFormattedDateMock,
			returnArticle: returnArticleMock,
			orderDate: 123,
			getInvoice: getInvoiceMock,
			getReturnReceipt: getReturnReceiptMock,
			commercialReturnGracePeriod: 14,
			returnId: 'returnId',
			returnDetails: [{
				'returnId': '4900001672',
				'returnStatus': 'Pending',
				'returnRequestDate': '1594887935000',
				'returnType': 'commercial return'
			}],
			productData: [{
				'index': 1,
				'productSKU': '71988-01',
				'productName': 'Freestyle Libre Sensor v2',
				'productQuantity': 1,
				'productRescheduledDueDate': null,
				'productOriginalDateFrom': 1592265600000,
				'productDateOfNextShipment': null,
				'productOriginalDateOfNextShipment': null,
				'productDueDateWindow': '14,14',
				'deliverableNumber': 'DLV-000017694'
			}],
			isOrderLoading: true,
			rmaLabels: null
		};
		wrapper = shallow(<Delivery {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	
		test('renders without crashing', () => {
			const actionProp = wrapper.props().children[2].props.children.props.children[1].props.children.props.children.props.children[1].props.children.props.children[2].props.children[0].props.children.props.action;
			expect(typeof actionProp).toBe('function');
	
			actionProp();
		}); 
		test('renders without crashing', () => {
			const actionPropTwo = wrapper.props().children[2].props.children.props.children[1].props.children.props.children.props.children[1].props.children.props.children[2].props.children[0].props.children.props.action;
			expect(typeof actionPropTwo).toBe('function');
			actionPropTwo();
		}); 
		test('getInvoice Button action event', () => {
			const actionProp = wrapper.props().children[2].props.children.props.children[1].props.children.props.children.props.children[1].props.children.props.children[2].props.children[0].props.children.props.action;
			expect(typeof actionProp).toBe('function');
			actionProp();
		}); 
		test('renders without crashing', () => {
			wrapper.setProps({returnDetails: null, returnId: null , delivery: {
				index: 2,
				deliveryStatus: 'Delivered',
				estimatedDeliveryDate: 234,
				deliveryTrackingNr: 'deliveryTrackingNr',
				invoiceIdDetails: null,
				deliveredDate: 2073963194000,
				products: [{
					'productSKU': '71988-01',
					'productQuantity': 1
				}],
				returnDetails: [{ 'returnType': 'commercial return' }]
			}})
			const actionPropThree = wrapper.props().children[2].props.children.props.children[1].props.children[1].props.action;
			expect(typeof actionPropThree).toBe('function');
	
			actionPropThree();
		});
});


describe('Delivery component Test Suite with other condition', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			orderId: 'orderId',
			delivery: {
				index: 2,
				deliveryStatus: 'POD Uploaded',
				estimatedDeliveryDate: 234,
				deliveryTrackingNr: 'deliveryTrackingNr',
				invoiceIdDetails: [{
					'invoiceId': 'a4Z4E0000002qCuUAI',
					'invoiceStatus': 'invoiceStatus'
				}],
				deliveredDate: 1594887935000,
				products: [{
					'productSKU': '71988-01',
					'productQuantity': 1
				}]
			},
			getFormattedDate: getFormattedDateMock,
			returnArticle: returnArticleMock,
			orderDate: 123,
			getInvoice: getInvoiceMock,
			getReturnReceipt: getReturnReceiptMock,
			commercialReturnGracePeriod: 14,
			returnId: 'returnId',
			returnDetails: [{
				'returnId': '4900001672',
				'returnStatus': 'Consistent',
				'returnRequestDate': '1594887935000',
				'returnType': 'Carrier Return'
			}],
			productData: [{
				'index': 1,
				'productSKU': '71988-01',
				'productName': 'Freestyle Libre Sensor v2',
				'productQuantity': 1,
				'productRescheduledDueDate': null,
				'productOriginalDateFrom': 1592265600000,
				'productDateOfNextShipment': null,
				'productOriginalDateOfNextShipment': null,
				'productDueDateWindow': '14,14',
				'deliverableNumber': 'DLV-000017694'
			}]
		};
		wrapper = shallow(<Delivery {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});

describe('Delivery component Test Suite with returnSent as false', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			orderId: 'orderId',
			delivery: {
				index: 2,
				deliveryStatus: 'Order has been sent back',
				estimatedDeliveryDate: 234,
				deliveryTrackingNr: 'deliveryTrackingNr',
				invoiceIdDetails: [{
					'invoiceId': 'a4Z4E0000002qCuUAI',
					'invoiceStatus': 'invoiceStatus'
				}],
				deliveredDate: 1594887935000,
				products: [{
					'productSKU': '71988-01',
					'productQuantity': 1
				}]
			},
			getFormattedDate: getFormattedDateMock,
			returnArticle: returnArticleMock,
			orderDate: 123,
			getInvoice: getInvoiceMock,
			getReturnReceipt: getReturnReceiptMock,
			commercialReturnGracePeriod: 14,
			returnDetails: [],
			productData: [{
				'index': 1,
				'productSKU': '71988-01',
				'productName': 'Freestyle Libre Sensor v2',
				'productQuantity': 1,
				'productRescheduledDueDate': null,
				'productOriginalDateFrom': 1592265600000,
				'productDateOfNextShipment': null,
				'productOriginalDateOfNextShipment': null,
				'productDueDateWindow': '14,14',
				'deliverableNumber': 'DLV-000017694'
			}]
		};
		wrapper = shallow(<Delivery {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});