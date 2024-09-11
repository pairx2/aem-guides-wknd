import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import GhostOrder  from '../../../../../modules/MyAccount/components/PrescriptionAccount/GhostOrder';
import {Provider} from 'react-redux';
import {mockStore} from '../../../../../__mocks__/storeMock';
jest.mock('../../../../../utils/endpointUrl');
Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const order = [{
	'index':1,
	'orderId':'DEBAAAAAIS',
	'orderDate':1587945600000,
	'orderTitle':'Cash Pay Subscription',
	'orderType':'Cash Pay Subscription',
	'rxmc':null,
	'isReimbursedOrder':false,
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
	]
}];



describe('GhostOrder component Test Suite', () => {
	let props, wrapper;
	const getInvoiceMock= jest.fn();

	beforeEach(() => {

		props = {
			title: 'title',
			downloadLabel: 'downloadLabel',
			customer: {},
			dictionary: {},
			icon: 'icon',
			textdescription: 'textdescription',
			linktext: 'linktext',
			linkpath: 'linkpath',
			instructionText: 'instructionText',
			getInvoice: getInvoiceMock,
			ghostType: 'ghostType',
			customerId: null
		};
		wrapper = shallow(<GhostOrder {...props}/>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

	});
});

describe('GhostOrder component Test Suite with mount', () => {
	let props, wrapper;
	const getInvoiceMock= jest.fn();

	beforeEach(() => {

		props = {
			title: null,
			downloadLabel: 'downloadLabel',
			customer: {},
			dictionary: {},
			icon: 'icon',
			textdescription: 'textdescription',
			linktext: 'linktext',
			linkpath: 'linkpath',
			instructionText: 'instructionText',
			orders: order,
			getInvoice: getInvoiceMock,
			ghostType: 'ghostType',
			customerId: '1234567890'
		};
		wrapper = mount(<Provider store={mockStore}><GhostOrder {...props}/></Provider>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

	});
});
describe('GhostOrder component Test Suite with no CustomerId', () => {
	let props, wrapper;
	const getInvoiceMock= jest.fn();

	beforeEach(() => {

		props = {
			title: null,
			downloadLabel: 'downloadLabel',
			customer: {},
			dictionary: {},
			icon: 'icon',
			textdescription: 'textdescription',
			linktext: 'linktext',
			linkpath: 'linkpath',
			instructionText: 'instructionText',
			orders: order,
			getInvoice: getInvoiceMock,
			ghostType: 'ghostType'
		};
		wrapper = mount(<Provider store={mockStore}><GhostOrder {...props}/></Provider>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

	});
});
