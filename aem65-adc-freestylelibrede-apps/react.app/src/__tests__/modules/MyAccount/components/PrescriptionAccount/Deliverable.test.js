import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Deliverable  from '../../../../../modules/MyAccount/components/PrescriptionAccount/Deliverable';
jest.mock('../../../../../utils/endpointUrl');

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

describe('Deliverable component Test Suite with hasDelivery as true', () => {
	let props, wrapper;
	const getInvoiceMock= jest.fn();

	beforeEach(() => {
		props = {
			orderId: 'orderId',
			deliveryOrderId: 'DECHBRRUA4',
			index: 1,
			productData: [
				{'index':1,'productSKU':'71988-01','productName':'FreeStyle Libre Sensor v2','productQuantity':7,'productRescheduledDueDate':null,'productOriginalDateFrom':1597968000000,'productDateOfNextShipment':null,'productOriginalDateOfNextShipment':null,'productDueDateWindow':'14,14','deliverableNumber':'DLV-000002886'}
			],
			deliverable: {
				'hasDelivery':true,
				'products':[
					{
						'productSKU':'71988-01',
						'productQuantity':7
					}
				],
				'deliveryStatus':'Order shipped',
				'estimatedDeliveryDate':1590451200000,
				'invoiceIdDetails':[
					{
						'invoiceId':'a589E0000009fZlQAI',
						'invoiceStatus':'Payment Completed'
					}
				],
				'deliveryDetails':[
					{
						'index':2,
						'deliveryStatus':'Order has been sent back',
						'estimatedDeliveryDate':234,
						'deliveryTrackingNr':'deliveryTrackingNr',
			        }
			    ]
			},
			getInvoice: getInvoiceMock,
		};
		wrapper = shallow(<Deliverable {...props}/>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('getInvoice function call in action property of Button', () => {
		const actionProp = wrapper.props().children[3].props.children.props.children[1].props.children[0].props.children.props.action;
		expect(typeof actionProp).toBe('function');

		actionProp('claim_receipt');
		const getInvoiceMockCount= getInvoiceMock.mock.calls.length;
		expect(getInvoiceMockCount).toBeDefined();
		expect(getInvoiceMockCount).not.toBe(0);
	});

});

describe('Deliverable component Test Suite with hasDelivery as false', () => {
	let props, wrapper;
	beforeEach(() => {
		props = {
			orderId: 'orderId',
			deliveryOrderId: 'DECHBRRUA4',
			index: 1,
			productData: [{'index':1,'productSKU':'71988-01','productName':'FreeStyle Libre Sensor v2','productQuantity':7,'productRescheduledDueDate':null,'productOriginalDateFrom':1597968000000,'productDateOfNextShipment':null,'productOriginalDateOfNextShipment':null,'productDueDateWindow':'14,14','deliverableNumber':'DLV-000002886'}],
			deliverable: {
				'hasDelivery':false,
				'products':[
					{
						'productSKU':'71988-01',
						'productQuantity':7
					}
				],
				'deliveryStatus':'Order shipped',
				'estimatedDeliveryDate':1590451200000,
				'invoiceIdDetails':[
					{
						'invoiceId':'a589E0000009fZlQAI',
						'invoiceStatus':'Payment Completed'
					}
				],
				'deliveryDetails':[
					{
						'index':2,
						'deliveryStatus':'Order has been sent back',
						'estimatedDeliveryDate':234,
						'deliveryTrackingNr':'deliveryTrackingNr',
					}
				]
			},
			getInvoice: () => {},
		};
		wrapper = shallow(<Deliverable {...props}/>);
	});

	describe('props check', () => {
		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});
	});
});
describe('Deliverable component Test Suite with hasDelivery as false', () => {
	let props, wrapper;
	beforeEach(() => {
		props = {
			orderId: 'orderId',
			deliveryOrderId: 'DECHBRRUA4',
			index: 1,
			productData: [{'index':1,'productSKU':'71988-01','productName':'FreeStyle Libre Sensor v2','productQuantity':7,'productRescheduledDueDate':null,'productOriginalDateFrom':1597968000000,'productDateOfNextShipment':null,'productOriginalDateOfNextShipment':null,'productDueDateWindow':'14,14','deliverableNumber':'DLV-000002886'}],
			deliverable: {
				'hasDelivery':false,
				'products':[
					{
						'productSKU':'71988-01',
						'productQuantity':7,
						'productRescheduledDueDate': 1587945600000
					}
				],
				'deliveryStatus':'Order shipped',
				'estimatedDeliveryDate':1590451200000,
				'invoiceIdDetails':[
					{
						'invoiceId':'a589E0000009fZlQAI',
						'invoiceStatus':'Payment Completed'
					}
				],
				'deliveryDetails':[
					{
						'index':2,
						'deliveryStatus':'Order has been sent back',
						'estimatedDeliveryDate':234,
						'deliveryTrackingNr':'deliveryTrackingNr',
			        }
			    ]
			},
			getInvoice: () => {},
		};
		wrapper = shallow(<Deliverable {...props}/>);
	});

	describe('props check', () => {
		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});
	});
});