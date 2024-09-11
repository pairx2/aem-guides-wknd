import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import OrderCost from '../../../../../modules/MyAccount/components/CurrentOrderOverview/OrderCost';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

describe('OrderCost component Test Suite with isPlusService & showBorder is true', () => {
	let props, wrapper;
	const openCancelFormMock = jest.fn();

	beforeEach(() => {

		props = {
			ghostOrders: [{
				'status_code': 50
			}],
			order: {
				'orderId':'DEAAAAAAIR',
				'orderType':'Cash Pay',
				'isReimbursedOrder':true,
				'priceBreakdown':{
					'totalPrice':'65.85',
					'price':59.90,
					'coPay':'',
					'deliveryCost':5.95
				},
				'productData':[{
					'deliverableStatus': 'Scheduled'
				}],
				'serviceData':[{
					'serviceSKU':'1-71538-01',
					'serviceName':'FreeStyle Libre Sensor Subscription',
					'serviceFromDate':1587945600000,
					'serviceToDate':null,
					'serviceFrequency':'3',
					'serviceDuration':null,
					'serviceProductQuantity':1,
					'serviceStatus':'Active'
				}],
			},
			openCancelForm: openCancelFormMock,
			isPlusService: true,
			showBorder: true,
		};
		wrapper = shallow(<OrderCost {...props}/>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

	});
});

describe('OrderCost component Test Suite with isPlusService is true & showBorder is false', () => {
	let props, wrapper;
	const openCancelFormMock = jest.fn();

	beforeEach(() => {

		props = {
			order: {
				'orderId':'DEAAAAAAIR',
				'orderType':'Cash Pay Subscription',
				'isReimbursedOrder':false,
				'priceBreakdown':{
					'price':59.90,
					'coPay':'',
					'deliveryCost':5.95
				},
				'serviceData':[{
					'serviceSKU':'1-71538-01',
					'serviceName':'FreeStyle Libre Sensor Subscription',
					'serviceFromDate':1587945600000,
					'serviceToDate':null,
					'serviceFrequency':'3',
					'serviceDuration':null,
					'serviceProductQuantity':1,
					'serviceStatus':'Cancelled'
				}],
			},
			openCancelForm: openCancelFormMock,
			isPlusService: false,
			showBorder: false,
		};
		wrapper = shallow(<OrderCost {...props}/>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('openCancelForm function call in action property of Button', () => {
			const actionProp = wrapper.props().children[1].props.children.props.children.props.children.props.action;
			expect(typeof actionProp).toBe('function');

			actionProp(true);
			const openCancelFormMockCallCount = openCancelFormMock.mock.calls.length;
			expect(openCancelFormMockCallCount).toBeDefined();
			expect(openCancelFormMockCallCount).not.toBe(0);
		});
	});
});

describe('OrderCost component Test Suite with isPlusService & showBorder is true with ghostorders', () => {
	let props, wrapper;
	const openCancelFormMock = jest.fn();

	beforeEach(() => {

		props = {
			ghostOrders: [{
				'status_code': 50
			}],
			order: {
				'orderId':'DEAAAAAAIR',
				'orderType':'Cash Pay',
				'isReimbursedOrder':true,
				'priceBreakdown':{
					'totalPrice':'65.85',
					'price':59.90,
					'coPay':'',
					'deliveryCost':5.95
				},
				'productData':[{
					'deliverableDateTo': 1708560000000,
					'deliverableDuration': null,
					'deliverableStatus': 'Scheduled'
				}],
				'serviceData':[{
					'serviceSKU':'1-71538-01',
					'serviceName':'FreeStyle Libre Sensor Subscription',
					'serviceFromDate':1587945600000,
					'serviceToDate':null,
					'serviceFrequency':'3',
					'serviceDuration':12,
					'serviceProductQuantity':1,
					'serviceStatus':'Active'
				}],
			},
			openCancelForm: openCancelFormMock,
			isPlusService: true,
			showBorder: true,
		};
		wrapper = shallow(<OrderCost {...props}/>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

	});
});

describe('OrderCost component Test Suite with isPlusService & showBorder is true with noghostOrderstatus & serviceData null', () => {
	let props, wrapper;
	const openCancelFormMock = jest.fn();

	beforeEach(() => {

		props = {
			order: {
				'orderId':'DEAAAAAAIR',
				'orderType':'Cash Pay',
				'isReimbursedOrder':true,
				'priceBreakdown':{
					'totalPrice':'65.85',
					'price':59.90,
					'coPay':'',
					'deliveryCost':5.95
				},
				'productData':[{
					'deliverableDateTo': 1708560000000,
					'deliverableDuration': null,
					'deliverableStatus': 'Scheduled'
				}],
				'serviceData':null,
			},
			openCancelForm: openCancelFormMock,
			isPlusService: true,
			showBorder: true,
		};
		wrapper = shallow(<OrderCost {...props}/>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

	});
});
