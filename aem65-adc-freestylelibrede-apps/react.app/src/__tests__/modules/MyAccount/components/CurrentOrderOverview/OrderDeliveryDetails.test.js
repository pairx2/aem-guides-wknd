import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import OrderDeliveryDetails from '../../../../../modules/MyAccount/components/CurrentOrderOverview/OrderDeliveryDetails';
jest.mock('../../../../../utils/endpointUrl.js');

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const currentDeliveryDetails= [{
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
	'shipmentId':'a4d4E0000000bOsQAI',
	'isCommercialReturnAllowed': 'true'
}];

const productData= [{
	'index':1,
	'productSKU':'S5269856',
	'productName':'FreeStyle Libre Sensor v1',
	'productQuantity':1,
	'productRescheduledDueDate':1587945600000,
	'productOriginalDateFrom':1587945600000,
	'productDateOfNextShipment':1595808000000,
	'productOriginalDateOfNextShipment':1595808000000,
	'productDueDateWindow':'14,14',
	'deliverableNumber':'DLV-000010292'
}];

const productDataWithoutProductDateOfNextShipment= [{
	'index':1,
	'productSKU':'S5269856',
	'productName':'FreeStyle Libre Sensor v1',
	'productQuantity':1,
	'productRescheduledDueDate':1595808000000,
	'productOriginalDateFrom':1587945600000,
	'productDateOfNextShipment': null,
	'productOriginalDateOfNextShipment':1595808000000,
	'productDueDateWindow':'14,14',
	'deliverableNumber':'DLV-000010292'
}];

const productDataWithoutProductRescheduledDueDate= [{
	'index':1,
	'productSKU':'S5269856',
	'productName':'FreeStyle Libre Sensor v1',
	'productQuantity':1,
	'productRescheduledDueDate': null,
	'productOriginalDateFrom':1587945600000,
	'productDateOfNextShipment':1587945600000,
	'productOriginalDateOfNextShipment':1595808000000,
	'productDueDateWindow':'14,14',
	'deliverableNumber':'DLV-000010292'
}];

const productDataWithoutTwoDate= [{
	'index':1,
	'productSKU':'S5269856',
	'productName':'FreeStyle Libre Sensor v1',
	'productQuantity':1,
	'productRescheduledDueDate': null,
	'productOriginalDateFrom':1587945600000,
	'productDateOfNextShipment': null,
	'productOriginalDateOfNextShipment':1595808000000,
	'productDueDateWindow':'14,14',
	'deliverableNumber':'DLV-000010292'
}];

const serviceData= [{
	'serviceSKU':'1-71538-01',
	'serviceName':'FreeStyle Libre Sensor Subscription',
	'serviceFromDate':1587945600000,
	'serviceToDate':null,
	'serviceFrequency':'3',
	'serviceDuration':null,
	'serviceProductQuantity':1,
	'serviceStatus':'Active'
}];

const returnDetails = [{
	'returnId': 'a5K9E0000005sD5UAI',
	'returnItemDetails': [],
	'returnStatus': 'Pending',
	'returnType': 'Commercial Return',
	'rmaLabel': null
}];


describe('OrderDeliveryDetails component Test Suite with orderStatus as Created & without currentDeliveryDetails', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			order: {
				orderType: 'Cash Pay Subscription',
				orderStatus: 'Created',
				currentDeliveryDate: null,
				productData: productData,
				serviceData: serviceData,
				orderId: 'DEA0001123',
				returnDetails: returnDetails
			},
			openChangeDeliveryDateModal: () => {},
			isPlusService: false,
			isAccountOverviewTab: false,
			deliveryDate: '03.03.2020'
		};
		wrapper = shallow(<OrderDeliveryDetails {...props}/>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

	});
});

describe('OrderDeliveryDetails component Test Suite with orderStatus as In Preparation & with currentDeliveryDetails', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			order: {
				orderType: 'Cash Pay',
				orderStatus: 'In Preparation',
				currentDeliveryDetails: currentDeliveryDetails,
				productData: productData,
				currentDeliveryDate: null,
				serviceData: serviceData,
			},
			openChangeDeliveryDateModal: () => {},
			isPlusService: true,
			isAccountOverviewTab: false,
			deliveryDate: '03.03.2020'
		};
		wrapper = shallow(<OrderDeliveryDetails {...props}/>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});

describe('OrderDeliveryDetails component Test Suite with orderStatus as In Progress', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			order: {
				orderType: 'Reimbursement',
				orderStatus: 'In Progress',
				currentDeliveryDetails: currentDeliveryDetails,
				productData: productData,
				currentDeliveryDate: null,
				serviceData: serviceData,
			},
			openChangeDeliveryDateModal: () => {},
			isPlusService: false,
			isAccountOverviewTab: false,
			deliveryDate: '03.03.2020'
		};
		wrapper = shallow(<OrderDeliveryDetails {...props}/>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});

describe('OrderDeliveryDetails component Test Suite with orderStatus as Scheduled', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			order: {
				orderType: 'Cash Pay Subscription',
				orderStatus: 'Scheduled',
				currentDeliveryDetails: currentDeliveryDetails,
				productData: productData,
				currentDeliveryDate: null,
				serviceData: serviceData,
			},
			openChangeDeliveryDateModal: () => {},
			isPlusService: true,
			isAccountOverviewTab: false,
			deliveryDate: '03.03.2020'
		};
		wrapper = shallow(<OrderDeliveryDetails {...props}/>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});

describe('OrderDeliveryDetails component Test Suite with orderStatus as Deactivated', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			order: {
				orderType: 'Cash Pay Subscription',
				orderStatus: 'Deactivated',
				currentDeliveryDetails: currentDeliveryDetails,
				productData: productData,
				currentDeliveryDate: null,
				serviceData: serviceData,
			},
			openChangeDeliveryDateModal: () => {},
			isPlusService: false,
			isAccountOverviewTab: false,
			deliveryDate: '03.03.2020'
		};
		wrapper = shallow(<OrderDeliveryDetails {...props}/>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});

describe('OrderDeliveryDetails component Test Suite without order object', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			order: {currentDeliveryDetails: {}, orderStatus: '', productData: productData},
			openChangeDeliveryDateModal: () => {},
			isPlusService: true,
			isAccountOverviewTab: false,
			deliveryDate: '03.03.2020'
		};
		wrapper = shallow(<OrderDeliveryDetails {...props}/>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});

describe('OrderDeliveryDetails component Test Suite with orderStatus as Created & without currentDeliveryDetails - without deliveryDate', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			order: {
				orderType: 'Cash Pay Subscription',
				orderStatus: 'Created',
				currentDeliveryDate: null,
				productData: productData,
				serviceData: serviceData,
				orderId: 'DEA0001123',
				returnDetails: returnDetails
			},
			openChangeDeliveryDateModal: () => {},
			isPlusService: false,
			isAccountOverviewTab: false,
			deliveryDate: null
		};
		wrapper = shallow(<OrderDeliveryDetails {...props}/>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

	});
});
describe('OrderDeliveryDetails component Test Suite with orderStatus as In Progress - - without deliveryDate,productDateOfNextShipment', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			order: {
				orderType: 'Reimbursement',
				orderStatus: 'In Progress',
				currentDeliveryDetails: currentDeliveryDetails,
				productData: productDataWithoutProductDateOfNextShipment,
				currentDeliveryDate: null,
				serviceData: serviceData,
			},
			openChangeDeliveryDateModal: () => {},
			isPlusService: false,
			isAccountOverviewTab: false,
			deliveryDate: null
		};
		wrapper = shallow(<OrderDeliveryDetails {...props}/>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});
describe('OrderDeliveryDetails component Test Suite with orderStatus as In Progress - - without deliveryDate,productDateOfNextShipment,productRescheduledDueDate', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			order: {
				orderType: 'Reimbursement',
				orderStatus: 'In Progress',
				currentDeliveryDetails: currentDeliveryDetails,
				productData: productDataWithoutProductRescheduledDueDate,
				currentDeliveryDate: null,
				serviceData: serviceData,
			},
			openChangeDeliveryDateModal: () => {},
			isPlusService: false,
			isAccountOverviewTab: false,
			deliveryDate: null
		};
		wrapper = shallow(<OrderDeliveryDetails {...props}/>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});

describe('OrderDeliveryDetails component Test Suite with orderStatus as In Progress -- without productDateOfNextShipment,productRescheduledDueDate', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			order: {
				orderType: 'Reimbursement',
				orderStatus: 'In Progress',
				currentDeliveryDetails: currentDeliveryDetails,
				productData: productDataWithoutTwoDate,
				currentDeliveryDate: null,
				serviceData: serviceData,
			},
			openChangeDeliveryDateModal: () => {},
			isPlusService: false,
			isAccountOverviewTab: true,
			deliveryDate: null
		};
		wrapper = shallow(<OrderDeliveryDetails {...props}/>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});


