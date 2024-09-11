import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore} from '../../../../../__mocks__/storeMock';

import DeliverableList, {openChangeDeliveryDateModal, processDeliverables}  from '../../../../../modules/MyAccount/components/PrescriptionAccount/DeliverableList';
import {Provider} from 'react-redux';
jest.mock('../../../../../utils/endpointUrl');

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props = {}) => {
	const wrapper = shallow(<DeliverableList store= {mockStore} {...props} />);
	return wrapper;
};

const order = {
	'index':1,
	'orderId':'DEBAAAAAIS',
	'productData':[
		{
			'index':1,
			'productSKU':'S5269856',
			'productName':'FreeStyle Libre Sensor v1',
			'productQuantity':1,
			'productRescheduledDueDate':null,
			'productOriginalDateFrom':1587945600000,
			'productDateOfNextShipment':1595808000000,
			'productOriginalDateOfNextShipment':1595808000000,
			'productDueDateWindow':'14,14',
			'deliverableNumber':'DLV-000010292'
		},
		{
			'deliverableNumber':'DLV-000008208',
			'deliverableStatus':'Scheduled',
			'deliverableTotal':30,
			'deliveryIdDetails':[],
			'index':1,
			'productDateOfNextShipment':null,
			'productDueDateWindow':'10,10',
			'productName':'FreeStyle Libre 2 Sensor',
			'productOriginalDateFrom':1630540800000,
			'productOriginalDateOfNextShipment':null,
			'productQuantity':6,
			'productRescheduledDueDate':null,
			'productSKU':'71988-01'
		}
	],
	'deliveryDetails':[
		{
			'index':1,
			'deliveryId':'SCH-0000089849',
			'deliveryType':'Master',
			'deliveryStatus':'Scheduled',
			'deliveryNumber':null,
			'deliveryTrackingNr':null,
			'invoiceIdDetails':[
				{
					'invoiceId':'a4Z4E0000002qCuUAI',
					'invoiceStatus':null
				}
			],
			'wmsStatus':null,
			'estimatedDeliveryDate':null,
			'productSKU':'S5269856',
			'productQuantity':1,
			'shipmentId':'a4d4E0000000bOsQAI'
		}
	],
	orderSubtype :null,
	orderTitle :'Reimbursement',
	orderType:'Reimbursement'
};
const sampleOrder = {
	'index':1,
	'orderId':'DEBAAAAAIS',
	'productData':[
		{
			'index':1,
			'productSKU':'S5269856',
			'productName':'FreeStyle Libre Sensor v1',
			'productQuantity':1,
			'productRescheduledDueDate':null,
			'productOriginalDateFrom':1587945600000,
			'productDateOfNextShipment':1595808000000,
			'productOriginalDateOfNextShipment':1595808000000,
			'productDueDateWindow':'14,14',
			'deliverableNumber':'DLV-000010292'
		},
		{
			'deliverableNumber':'DLV-000008208',
			'deliverableStatus':'Scheduled',
			'deliverableTotal':30,
			'deliveryIdDetails':[],
			'index':1,
			'productDateOfNextShipment':null,
			'productDueDateWindow':'10,10',
			'productName':'FreeStyle Libre 2 Sensor',
			'productOriginalDateFrom':1630540800000,
			'productOriginalDateOfNextShipment':null,
			'productQuantity':6,
			'productRescheduledDueDate':null,
			'productSKU':'71988-01'
		},
		{
			'deliverableNumber':'DLV-000008207',
			'deliverableStatus':'Scheduled',
			'deliverableTotal':30,
			'deliveryIdDetails':[],
			'index':2,
			'productDateOfNextShipment':null,
			'productDueDateWindow':'10,10',
			'productName':'FreeStyle Libre 2 Sensor',
			'productOriginalDateFrom':1622592000000,
			'productOriginalDateOfNextShipment':null,
			'productQuantity':6,
			'productRescheduledDueDate':null,
			'productSKU':'71988-01'
		},
		{
			'deliverableNumber':'DLV-000008206',
			'deliverableStatus':'Scheduled',
			'deliverableTotal':30,
			'deliveryIdDetails':[],
			'index':1,
			'productDateOfNextShipment':null,
			'productDueDateWindow':'10,10',
			'productName':'FreeStyle Libre 2 Sensor',
			'productOriginalDateFrom':1614643200000,
			'productOriginalDateOfNextShipment':null,
			'productQuantity':6,
			'productRescheduledDueDate':null,
			'productSKU':'71988-01'
		},
		{
			'deliverableNumber':'DLV-000008205',
			'deliverableStatus':'Scheduled',
			'deliverableTotal':30,
			'deliveryIdDetails':[
				{deliveryId: 'SCH-0000005288'},
				{deliveryId: 'SCH-0000005287'},
				{deliveryId: 'SCH-0000005286'}
			],
			'index':1,
			'productDateOfNextShipment':null,
			'productDueDateWindow':'10,10',
			'productName':'FreeStyle Libre 2 Sensor',
			'productOriginalDateFrom':1606867200000,
			'productOriginalDateOfNextShipment':null,
			'productQuantity':7,
			'productRescheduledDueDate':null,
			'productSKU':'71988-01'
		}
	],
	'deliveryDetails':[
		{
			'index':1,
			'deliveryId':'SCH-0000089849',
			'deliveryType':'Master',
			'deliveryStatus':'Scheduled',
			'deliveryNumber':null,
			'deliveryTrackingNr':null,
			'invoiceIdDetails':[
				{
					'invoiceId':'a4Z4E0000002qCuUAI',
					'invoiceStatus':null
				}
			],
			'wmsStatus':null,
			'estimatedDeliveryDate':null,
			'productSKU':'S5269856',
			'productQuantity':1,
			'shipmentId':'a4d4E0000000bOsQAI'
		}
	],
	orderSubtype :null,
	orderTitle :'Reimbursement',
	orderType:'Reimbursement'
};

describe('DeliverableList component Test Suite with hasDelivery as true & order object with productData & deliveryDetails', () => {
	let props, wrapper;
	const openModalActionMock= jest.fn();
	beforeEach(() => {

		props = {
			order: {...order},
			getInvoice: () => {},
			openModalAction: openModalActionMock,
			showLoader:true,
			isOrderAvailable: true
		};
		wrapper = setup(props);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});
	});
});
describe('DeliverableList component Test Suite with hasDelivery as true & order object with productData & deliveryDetails', () => {
	let props, wrapper;
	const openModalActionMock= jest.fn();
	beforeEach(() => {

		props = {
			order: {...order},
			getInvoice: () => {},
			openModalAction: openModalActionMock,
			showLoader:false,
			isOrderAvailable: true
		};
		wrapper = setup(props);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});
	});
});

describe('DeliverableList component Test Suite - order object with empty productData & deliveryDetails', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			order: {
				'index':1,
				'orderId':'DEBAAAAAIS',
				'productData':[],
				'deliveryDetails':[],
				showLoader: false,
				isOrderAvailable: true
			},
			getInvoice: () => {},
		};
		wrapper = setup(props);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

	});
});
describe('DeliverableList component Test Suite - order object with empty productData & deliveryDetails', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			order: {
				'index':1,
				'orderId':'DEBAAAAAIS',
				'productData':[],
				'deliveryDetails':[],
				showLoader: false,
				isOrderAvailable: false
			},
			getInvoice: () => {},
		};
		wrapper = setup(props);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

	});
});
describe('DeliverableList component Test Suite - order object with empty productData & deliveryDetails -mount', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			order: {
				'index':1,
				'orderId':'DEBAAAAAIS',
				'productData':[],
				'deliveryDetails':[],
				showLoader: false,
				isOrderAvailable: false
			},
			getInvoice: () => {},
		};
		wrapper = mount(<Provider store={mockStore}><DeliverableList  {...props} /></Provider>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

	});
});
describe('DeliverableList component Test Suite - order object with empty productData & deliveryDetails', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			order: {
				'index':1,
				'orderId':'DEBAAAAAIS',
				'productData':[],
				'deliveryDetails':[],
				showLoader: true,
				isOrderAvailable: false
			},
			getInvoice: () => {},
		};
		wrapper = setup(props);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

	});
});
describe('openChangeDeliveryDateModal component Test Suite', () => {
	const openChangeDeliveryDateModalMock = openChangeDeliveryDateModal;
	const openModalActionMock= jest.fn();
	const deliverable = {
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
		]
	};
	const order = {
		'index':1,
		'orderId':'DEBAAAAAIS',
		'productData':[
			{
				'index':1,
				'productSKU':'S5269856',
				'productName':'FreeStyle Libre Sensor v1',
				'productQuantity':1,
				'productRescheduledDueDate':null,
				'productOriginalDateFrom':1587945600000,
				'productDateOfNextShipment':1595808000000,
				'productOriginalDateOfNextShipment':1595808000000,
				'productDueDateWindow':'14,14',
				'deliverableNumber':'DLV-000010292'
			}
		],
		'deliveryDetails':[
			{
				'index':1,
				'deliveryId':'SCH-0000089849',
				'deliveryType':'Master',
				'deliveryStatus':'Scheduled',
				'deliveryNumber':null,
				'deliveryTrackingNr':null,
				'invoiceIdDetails':[
					{
						'invoiceId':'a4Z4E0000002qCuUAI',
						'invoiceStatus':null
					}
				],
				'wmsStatus':null,
				'estimatedDeliveryDate':null,
				'productSKU':'S5269856',
				'productQuantity':1,
				'shipmentId':'a4d4E0000000bOsQAI'
			}
		],
	};
	openChangeDeliveryDateModalMock(deliverable, order, null, null,openModalActionMock);
});
describe('processDeliverables component Test Suite', () => {
	const processDeliverablesMock = processDeliverables;
	processDeliverablesMock(order);
	order.deliveryDetails = null;
	processDeliverablesMock(order);
	processDeliverablesMock(sampleOrder);
});
