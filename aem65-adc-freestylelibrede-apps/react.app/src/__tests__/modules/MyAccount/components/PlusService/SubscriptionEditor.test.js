import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import SubscriptionEditor from '../../../../../modules/MyAccount/components/PlusService/SubscriptionEditor';
import {mockStore, mockStoreOrder} from '../../../../../__mocks__/storeMock';
jest.mock('../../../../../utils/endpointUrl');
Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props) => {
	const wrapper = shallow(<SubscriptionEditor store={mockStore} {...props} />).dive().dive();
	return wrapper;
};

const setupTwo = (props) => {
	const wrapper = shallow(<SubscriptionEditor store={mockStoreOrder} {...props} />).dive().dive();
	return wrapper;
};

describe('SubscriptionEditor component Test Suite', () => {
	let props, wrapper;
	const closeMock = jest.fn();

	beforeEach(() => {
		props = {
			close: closeMock,
			openModalAction: jest.fn(),
			order: {
				'deliveryAddress':{
					'salutation':null,
					'firstName':'britania',
					'lastName':'marie',
					'city':'Emsdetten',
					'zipCode':'48282',
					'street':'Weststr. 62',
					'addressInfo':null,
					'country':null,
					'countryCode':'DE',
					'stateProvince':null,
					'phoneNumber':'+49 1514215786'
				 },
				 serviceData: [{
					'serviceSKU':'1-71538-01',
					'serviceName':'FreeStyle Libre Sensor Subscription',
					'serviceFromDate':1587945600000,
					'serviceToDate':null,
					'serviceFrequency':'3',
					'serviceDuration':null,
					'serviceProductQuantity':3,
					'serviceStatus':'Active',
					'productSKUDetails': ['productSKUDetails0', 'productSKUDetails1']
				 }]
			},
			orderServiceStatus: 'orderServiceStatus',
			products: {},
		};
		wrapper = setup(props);
	});

	describe('props check', () => {
		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});
	});

	describe('function calls',() => {
		test('editPaymentMethod call check',() => {
			wrapper.instance().editPaymentMethod();
			expect(wrapper.instance().state.togglePaymentEditing).toBeFalsy();
		});
		test('getServiceDescription function call', () => {
			const getServiceDescriptionMock = wrapper.instance().getServiceDescription;
			expect(typeof getServiceDescriptionMock).toBe('function');
			getServiceDescriptionMock();
			expect(getServiceDescriptionMock).toBeDefined();
		});
		test('getProductDetailsReaders call check',() => {
			const order= {
				'deliveryAddress':{
					'salutation':null,
					'firstName':'britania',
					'lastName':'marie',
					'city':'Emsdetten',
					'zipCode':'48282',
					'street':'Weststr. 62',
					'addressInfo':null,
					'country':null,
					'countryCode':'DE',
					'stateProvince':null,
					'phoneNumber':'+49 1514215786'
				 },
				 serviceData: [{
					'serviceSKU':'1-71538-01',
					'serviceName':'FreeStyle Libre Sensor Subscription',
					'serviceFromDate':1587945600000,
					'serviceToDate':null,
					'serviceFrequency':'3',
					'serviceDuration':null,
					'serviceProductQuantity':3,
					'serviceStatus':'Active'
				 }]
			};
			expect(wrapper.instance().getProductDetailsReaders(order)).toBe(undefined);
		});
	});
});

describe('SubscriptionEditor component Test Suite', () => {
	let props, wrapper;
	const closeMock = jest.fn();

	beforeEach(() => {
		props = {
			close: closeMock,
			openModalAction: jest.fn(),
			order: {
				'deliveryAddress':{
					'salutation':null,
					'firstName':'britania',
					'lastName':'marie',
					'city':'Emsdetten',
					'zipCode':'48282',
					'street':'Weststr. 62',
					'addressInfo':null,
					'country':null,
					'countryCode':'DE',
					'stateProvince':null,
					'phoneNumber':'+49 1514215786'
				 },
				 serviceData: [{
					'serviceSKU':'1-71538-01',
					'serviceName':'FreeStyle Libre Sensor Subscription',
					'serviceFromDate':1587945600000,
					'serviceToDate':null,
					'serviceFrequency':'3',
					'serviceDuration':null,
					'serviceProductQuantity':3,
					'serviceStatus':'Active'
				 }],
				 productData:[{
					'index':1,
					'productDateOfNextShipment':1605571200000,
					'productDueDateWindow':'14,14',
					'productName':'FreeStyle Libre Sensor v2',
					'productOriginalDateFrom':1597363200000,
					'productOriginalDateOfNextShipment':1605312000000,
					'productQuantity':7,
					'productRescheduledDueDate':null,
					'productSKU':'71988-01'
				 }]
			},
			orderServiceStatus: 'orderServiceStatus',
			products: {},
		};
		wrapper = setupTwo(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('editPaymentMethod function call editSubscriptionPayment property of SubscriptionPaymentInformation', () => {
		const actionProp = wrapper.props().children[0].props.children.props.children[0].props.children[3].props.children.props.editSubscriptionPayment;
		expect(typeof actionProp).toBe('function');
		actionProp(true);
		expect(wrapper.instance().state.togglePaymentEditing).toBeTruthy();
	});

	test('getServiceDescription function call', () => {
		const description  = wrapper.dive().dive().props().children[0].props.children.props.children[0].props.children[1].props.children.props.children[1].props.dangerouslySetInnerHTML.__html;
		expect(description).toBe('( 3 FreeStyle Libre Sensor v2  - product_frequency_label_3 )');
	});
	test('getProductDetailsReaders call check',() => {
		const order= {
			'deliveryAddress':{
				'salutation':null,
				'firstName':'britania',
				'lastName':'marie',
				'city':'Emsdetten',
				'zipCode':'48282',
				'street':'Weststr. 62',
				'addressInfo':null,
				'country':null,
				'countryCode':'DE',
				'stateProvince':null,
				'phoneNumber':'+49 1514215786'
			 },
			 serviceData: [{
				'serviceSKU':'1-71538-01',
				'serviceName':'FreeStyle Libre Sensor Subscription',
				'serviceFromDate':1587945600000,
				'serviceToDate':null,
				'serviceFrequency':'3',
				'serviceDuration':null,
				'serviceProductQuantity':3,
				'serviceStatus':'Active'
			 }],
			 productData:[{
				'index':1,
				'productDateOfNextShipment':1605571200000,
				'productDueDateWindow':'14,14',
				'productName':'FreeStyle Libre Sensor v2',
				'productOriginalDateFrom':1597363200000,
				'productOriginalDateOfNextShipment':1605312000000,
				'productQuantity':7,
				'productRescheduledDueDate':null,
				'productSKU':'71988-01'
			 }]
		};
		expect(wrapper.instance().getProductDetailsReaders(order)).toBe('7 FreeStyle Libre Sensor v2');
	});
});