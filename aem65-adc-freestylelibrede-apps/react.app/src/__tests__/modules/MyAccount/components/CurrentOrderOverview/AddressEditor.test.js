import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import AddressEditor from '../../../../../modules/MyAccount/components/CurrentOrderOverview/AddressEditor';
import {mockStoreOrder, mockStoreConfirmationPage} from '../../../../../__mocks__/storeMock';


jest.mock('../../../../../utils/endpointUrl.js');
jest.mock('../../../../../utils/enums.js');

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props= {}) => {
	const wrapper = shallow(<AddressEditor store= {mockStoreConfirmationPage} {...props}/>).dive().dive();
	return wrapper;
};

const setupTwo = (props= {}) => {
	const wrapper = shallow(<AddressEditor store= {mockStoreOrder} {...props}/>).dive().dive();
	return wrapper;
};

const customer = {
	'id': 201363,
	'user_id': '4900201363',
	'firstname': 'Dayana',
	'lastname': 'Wiegand',
	'email': 'loren.1590243663@yopmail.com',
	'dob': '13.07.1980',
	'measurement': '99',
	'mobile_phone': '+4915212345672',
	'landline_phone': '+49302345671',
	'payer_institution_name': 'akhil555',
	'health_insurance_number': 'Q348589748',
	'account_type': 0,
	'prefix': 'Herr',
	'cs_first_shipment_shipped': false,
	'has_active_reimbursement': false,
	'is_mobile_verified': false,
	'last_cec_upload_date': null,
	'prescription_reminder_sent': false,
	'is_social': false,
	'is_copay_exempted_this_year': false,
	'is_copay_exempted_next_year': false,
	'temporary_mobile_number': null,
	'addresses': [
		{
			'id': -1,
			'prefix': 'Frau',
			'firstname': 'saurabh',
			'lastname': 'mishra',
			'postcode': '1234',
			'country_id': 'DE',
			'country_name': 'Deutschland',
			'region_code': null,
			'region': null,
			'city': 'mainz',
			'street': [
				'bdhvddd'
			],
			'telephone': '',
			'rss_result_code': 'AVD999',
			'address_label': 'null',
			'default_shipping': false,
			'default_billing': false
		}
	]
};

const address = {
	'id': 201359,
	'prefix': 'Frau',
	'firstname': 'Kim',
	'lastname': 'Richards',
	'postcode': '1234',
	'country_id': 'DE',
	'country_name': 'Deutschland',
	'region_code': null,
	'region': null,
	'city': 'mainz',
	'street': ['Bahnhofplatz'],
	'telephone': '',
	'rss_result_code': 'AVD999',
	'address_label': 'null',
	'default_shipping': false,
	'default_billing': false
};

const updatedAddresses = {
	'_-1': {
		'id': -1,
		'city': 'mainz',
		'firstname': 'Kim',
		'default_shipping': false,
		'lastname': 'Richards',
		'postcode': '55116',
		'prefix': 'Frau',
		'street': ['Bahnhofplatz']
	},
	201359: {
		'id': 201359,
		'city': 'mainz',
		'firstname': 'Kim',
		'default_shipping': false,
		'lastname': 'Richards',
		'postcode': '55116',
		'prefix': 'Frau',
		'street': ['Bahnhofplatz']
	}
};

const closeMock = jest.fn();
const getCustomerMock = jest.fn();
const openModalActionMock = jest.fn();
const updateOrderRequestMock = jest.fn();
const resetAddressEditorMock = jest.fn();
const verifyAddressRequestMock = jest.fn();
const updateAddressRequestMock = jest.fn();
const getAvailablePaymentMethodsRequestMock = jest.fn();

describe('AddressEditor Component Test Suite', () => {

	let props, wrapper;

	beforeEach(() => {
		props = {
			order: {
				'orderId':'DEBAAAAAIS',
				'orderDate':1587945600000,
				'orderTitle':'Cash Pay Subscription',
				'orderType':'Cash Pay Subscription',
				'priceBreakdown':{
					'totalPrice':'425.25',
					'price':419.30,
					'coPay':'',
					'deliveryCost':5.95
				 },
				 'paymentDetails':{
					'paymentMethodType':'open_invoice',
					'paymentBrand':null,
					'card':{'last4Digits': null},
					'amountAuthorized':425.25,
					'paymentToken':'8ac7a4a271bac61a0171bafbc8c427f8',
					'amountPaid':425.25,
					'paymentTransactionId':null,
				 },
				 'deliveryAddress': {
					'salutation': 'MR',
					'firstName': 'firstName',
					'lastName': 'lastName',
					'city': 'Frankfurt',
					'zipCode': '65936',
					'street': 'Westerwaldstr. 258',
					'addressInfo': null,
					'country': 'DE',
					'countryCode': 'DE',
					'stateProvince': null,
					'phoneNumber': null
				  },
				  'billingAddress': {
					'salutation': null,
					'firstName': 'firstName',
					'lastName': 'lastName',
					'city': 'Frankfurt',
					'zipCode': '65936',
					'street': 'Westerwaldstr. 258',
					'addressInfo': null,
					'country': 'DE',
					'countryCode': 'DE',
					'stateProvince': null,
					'phoneNumber': null
				  }
			},
			close: closeMock,
			isVerified: false,
			customer: customer,
			riskCheckError: '',
			addressCheckError: '',
			isBlacklisted: false,
			methods: [],
			addressType: 'addressType',
			getCustomer: getCustomerMock,
			updatedAddresses: updatedAddresses,
			openModalAction: openModalActionMock,
			updateOrderRequest: updateOrderRequestMock,
			resetAddressEditor: resetAddressEditorMock,
			verificationStatus: 'ADDRESS_CHECK_SUCCESS',
			updateAddressRequest: updateAddressRequestMock,
			verifyAddressRequest: verifyAddressRequestMock,
			getAvailablePaymentMethodsRequest: getAvailablePaymentMethodsRequestMock
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

		test('has addressType as prop and is of type string', () => {
			const addressTypeProp = wrapper.instance().props.addressType;
			expect(typeof addressTypeProp).toBe('string');
		});

		test('has verificationStatus as prop and is of type string', () => {
			const verificationStatusProp = wrapper.instance().props.verificationStatus;
			expect(typeof verificationStatusProp).toBe('string');
		});

		test('has isOrderUpdated as prop and is of type boolean', () => {
			const isOrderUpdatedProp = wrapper.instance().props.isOrderUpdated;
			expect(typeof isOrderUpdatedProp).toBe('boolean');
		});

		test('has isOrderLoading as prop and is of type boolean', () => {
			const isOrderLoadingProp = wrapper.instance().props.isOrderLoading;
			expect(typeof isOrderLoadingProp).toBe('boolean');
		});

		test('has order as prop and is of type object', () => {
			const orderProp = wrapper.instance().props.order;
			expect(orderProp).toBeInstanceOf(Object);
		});

		test('has customer as prop and is of type object', () => {
			const customerProp = wrapper.instance().props.customer;
			expect(customerProp).toBeInstanceOf(Object);
		});

		test('has dictionary as prop and is of type object', () => {
			const dictionaryProp = wrapper.instance().props.dictionary;
			expect(dictionaryProp).toBeInstanceOf(Object);
		});

		test('has close as prop and is of type function', () => {
			const closeProp = wrapper.instance().props.close;
			expect(typeof closeProp).toBe('function');
		});

		test('has methods as prop and is of type function', () => {
			const methodsProp = wrapper.instance().props.methods;
			expect(typeof methodsProp).toBe('object');
		});

		test('has openModalAction as prop and is of type function', () => {
			const openModalActionProp = wrapper.instance().props.openModalAction;
			expect(typeof openModalActionProp).toBe('function');
		});

		test('has updateAddress as prop and is of type function', () => {
			const updateAddressRequestProp = wrapper.instance().props.updateAddressRequest;
			expect(typeof updateAddressRequestProp).toBe('function');
		});

		test('has getAvailablePaymentMethodsRequest as prop and is of type function', () => {
			const getAvailablePaymentMethodsRequestProp = wrapper.instance().props.getAvailablePaymentMethodsRequest;
			expect(typeof getAvailablePaymentMethodsRequestProp).toBe('function');
		});

		test('has updateOrderRequest as prop and is of type function', () => {
			const updateOrderRequestProp = wrapper.instance().props.updateOrderRequest;
			expect(typeof updateOrderRequestProp).toBe('function');
		});

		test('has resetAddressEditor as prop and is of type function', () => {
			const resetAddressEditorProp = wrapper.instance().props.resetAddressEditor;
			expect(typeof resetAddressEditorProp).toBe('function');
		});

		test('has verifyAddressRequest as prop and is of type function', () => {
			const verifyAddressRequestProp = wrapper.instance().props.verifyAddressRequest;
			expect(typeof verifyAddressRequestProp).toBe('function');
		});

	});

	describe('state check', () => {

		test('state value check', () => {
			const stateCheck = wrapper.instance().state;
			expect(stateCheck).toBeInstanceOf(Object);

			expect(stateCheck.editing).toBeFalsy();
			expect(stateCheck.address).toBeInstanceOf(Object);

			expect(stateCheck.newAddress).toBeInstanceOf(Object);
			expect(typeof stateCheck.newAddress.id).toBe('number');
			expect(stateCheck.newAddress.id).toBe(-1);

			expect(stateCheck.currentAction).toBe('');
		});

	});

	describe('functions check', () => {

		test('compareAddress function call check', () => {
			const compareAddressMock = wrapper.instance().compareAddress;
			expect(typeof compareAddressMock).toBe('function');

			const firstAddress= {default_shipping: 'default_shipping1'};
			const secondAddress= {default_shipping: 'default_shipping2'};

			expect(typeof compareAddressMock(firstAddress, secondAddress)).toBe('number');
			expect(compareAddressMock(firstAddress, secondAddress)).toBe(0);
		});
		test('showPayonWidgetBasedOnMethods function call check', () => {
			const showPayonWidgetBasedOnMethodsMock = wrapper.instance().showPayonWidgetBasedOnMethods;
			expect(typeof showPayonWidgetBasedOnMethodsMock).toBe('function');

			const methods = ['CC', 'EP', 'OI'];

			expect(showPayonWidgetBasedOnMethodsMock(methods)).toBe(undefined);
		});
		test('showPayonWidgetBasedOnMethods function call check', () => {
			const showPayonWidgetBasedOnMethodsMock = wrapper.instance().showPayonWidgetBasedOnMethods;
			expect(typeof showPayonWidgetBasedOnMethodsMock).toBe('function');

			const methods = ['NY'];

			expect(showPayonWidgetBasedOnMethodsMock(methods)).toBe(undefined);
		});
		test('updateAddress function call check', () => {
			const updateAddressMock = wrapper.instance().updateAddress;
			expect(typeof updateAddressMock).toBe('function');
			wrapper.instance().setState({
				address: {
					address_label: 'shipping',
					city: 'Mainz',
					country_id: 'DE',
					country_name: 'Germany',
					default_billing: false,
					default_shipping: true,
					firstname: 'Edward Stark',
					id: 201641,
					lastname: 'Anthony',
					postcode: '55116',
					prefix: 'Herr',
					region: null,
					region_code: null,
					rss_result_code: 'AVD000',
					street: ['Bahnhofplatz'],
					telephone: '+49 15100211000'
				},
				usethisAddressChoosen: true
			});

			const address1 = {
				'salutation': null,
				'firstName': 'firstName',
				'lastName': 'lastName',
				'city': 'Frankfurt',
				'zipCode': '65936',
				'street': 'Westerwaldstr. 258',
				'addressInfo': null,
				'country': 'DE',
				'countryCode': 'DE',
				'stateProvince': null,
				'phoneNumber': null
			};
			const address2 = {
				'salutation': null,
				'firstName': 'firstName',
				'lastName': 'lastName',
				'city': 'Frankfurt',
				'zipCode': '65936',
				'street': 'Westerwaldstr. 258',
				'addressInfo': null,
				'country': 'DE',
				'countryCode': 'DE',
				'stateProvince': null,
				'phoneNumber': null
			};
			expect(updateAddressMock(address1, address2)).toBe(undefined);
			wrapper.instance().setState({
				address: {
					address_label: 'shipping',
					city: 'Mainz',
					country_id: 'DE',
					country_name: 'Germany',
					default_billing: false,
					default_shipping: true,
					firstname: 'Edward Stark',
					id: 201641,
					lastname: 'Anthony',
					postcode: '55116',
					prefix: 'Herr',
					region: null,
					region_code: null,
					rss_result_code: 'AVD000',
					street: ['Bahnhofplatz'],
					telephone: '+49 15100211000'
				},
				usethisAddressChoosen: false
			});
			expect(updateAddressMock(address1, address2)).toBe(undefined);
		});
		test('updateAddress function call check', () => {
			const updateAddressMock = wrapper.instance().updateAddress;
			expect(typeof updateAddressMock).toBe('function');
			wrapper.instance().setState({
				address: {
					address_label: 'shipping',
					city: 'Mainz',
					country_id: 'DE',
					country_name: 'Germany',
					default_billing: false,
					default_shipping: true,
					firstname: 'Edward Stark',
					id: 201641,
					lastname: 'Anthony',
					postcode: '55116',
					prefix: 'Herr',
					region: null,
					region_code: null,
					rss_result_code: 'AVD000',
					street: ['Bahnhofplatz'],
					telephone: '+49 15100211000'
				},
				usethisAddressChoosen: false
			});
			const address1 = {
				'salutation': null,
				'firstName': 'firstName',
				'lastName': 'lastName',
				'city': 'Frankfurt',
				'zipCode': '65936',
				'street': 'Westerwaldstr. 258',
				'addressInfo': null,
				'country': 'DE',
				'countryCode': 'DE',
				'stateProvince': null,
				'phoneNumber': null
			};
			const address2 = {
				'salutation': null,
				'firstName': 'firstName',
				'lastName': 'lastName',
				'city': 'Frankfurt',
				'zipCode': '65936',
				'street': 'Westerwaldstr. 258',
				'addressInfo': null,
				'country': 'DE',
				'countryCode': 'DE',
				'stateProvince': null,
				'phoneNumber': null
			};
			expect(updateAddressMock(address1, address2)).toBe(undefined);
		});
		test('updateAddress function call check', () => {
			const updateAddressMock = wrapper.instance().updateAddress;
			expect(typeof updateAddressMock).toBe('function');
			const address2 = {
				'salutation': null,
				'firstName': 'firstName',
				'lastName': 'lastName',
				'city': 'Frankfurt',
				'zipCode': '65936',
				'street': 'Westerwaldstr. 258',
				'addressInfo': null,
				'country': 'DE',
				'countryCode': 'DE',
				'stateProvince': null,
				'phoneNumber': null
			};
			wrapper.instance().setState({
				address: {
					address_label: 'shipping',
					city: 'Mainz',
					country_id: 'DE',
					country_name: 'Germany',
					default_billing: false,
					default_shipping: true,
					firstname: 'Edward Stark',
					id: 201641,
					lastname: 'Anthony',
					postcode: '55116',
					prefix: 'Herr',
					region: null,
					region_code: null,
					rss_result_code: 'AVD000',
					street: ['Bahnhofplatz'],
					telephone: '+49 15100211000'
				},
				usethisAddressChoosen: false
			});
			expect(updateAddressMock(null, address2)).toBe(undefined);
		});
		test('createAddress function call check', () => {
			const createAddressMock = wrapper.instance().createAddress;
			expect(typeof createAddressMock).toBe('function');

			const address1 = {
				'salutation': null,
				'firstName': 'firstName',
				'lastName': 'lastName',
				'city': 'Frankfurt',
				'zipCode': '65936',
				'street': 'Westerwaldstr. 258',
				'addressInfo': null,
				'country': 'DE',
				'countryCode': 'DE',
				'stateProvince': null,
				'phoneNumber': null
			};
			const address2 = {
				'salutation': null,
				'firstName': 'firstName',
				'lastName': 'lastName',
				'city': 'Frankfurt',
				'zipCode': '65936',
				'street': 'Westerwaldstr. 258',
				'addressInfo': null,
				'country': 'DE',
				'countryCode': 'DE',
				'stateProvince': null,
				'phoneNumber': null
			};
			expect(createAddressMock(address1, address2)).toBe(undefined);
		});
		test('getRsid function call check', () => {
			const getRsidMock = wrapper.instance().getRsid;
			expect(typeof getRsidMock).toBe('function');

			expect(getRsidMock('paypal')).toBe('EP');
		});

		test('constructPayload function call check', () => {
			const constructPayloadMock = wrapper.instance().constructPayload;
			expect(typeof constructPayloadMock).toBe('function');

			const customer = wrapper.instance().props.customer;
			const order = wrapper.instance().props.order;
			const address= {street: ['address'],country_name:{value:'DE',label:'Germany'}};

			expect(wrapper.instance().constructPayload(customer, order, address)).toBeDefined();
			expect(wrapper.instance().constructPayload(customer, order, address)).toBeInstanceOf(Object);
		});

		test('arePaymentMethodsAvailable function call check', () => {
			const methods = ['EP','CC','SUE','OI'];
			const arePaymentMethodsAvailableMock = wrapper.instance().arePaymentMethodsAvailable;
			expect(typeof arePaymentMethodsAvailableMock).toBe('function');

			expect(arePaymentMethodsAvailableMock(methods)).toBeTruthy();
		});

		test('updateOrder function call check', () => {
			wrapper.instance().setState({
				address: {
					address_label: 'shipping',
					city: 'Mainz',
					country_id: 'DE',
					country_name: 'Germany',
					default_billing: false,
					default_shipping: true,
					firstname: 'Edward Stark',
					id: 201641,
					lastname: 'Anthony',
					postcode: '55116',
					prefix: 'Herr',
					region: null,
					region_code: null,
					rss_result_code: 'AVD000',
					street: ['Bahnhofplatz'],
					telephone: '+49 15100211000'
				}
			});
			const updateOrderMock = wrapper.instance().updateOrder;
			expect(typeof updateOrderMock).toBe('function');

			updateOrderMock();
			const updateOrderRequestMockCallCount = updateOrderRequestMock.mock.calls.length;
			expect(updateOrderRequestMockCallCount).toBeDefined();
		});

		test('showNoPaymentMethodsAvaiableModal function call check', () => {
			const showNoPaymentMethodsAvaiableModalMock = wrapper.instance().showNoPaymentMethodsAvaiableModal;
			expect(typeof showNoPaymentMethodsAvaiableModalMock).toBe('function');

			showNoPaymentMethodsAvaiableModalMock();
			const openModalActionMockCallCount = openModalActionMock.mock.calls.length;
			expect(openModalActionMockCallCount).toBeDefined();
		});

		test('addressFormInitialValues function call check', () => {
			const addressFormInitialValuesMock = wrapper.instance().addressFormInitialValues;
			expect(typeof addressFormInitialValuesMock).toBe('function');

			const address= {id: 1, default_shipping: 'default_shipping1'};

			expect(addressFormInitialValuesMock(address)).toBeDefined();
			expect(addressFormInitialValuesMock(address)).toBeInstanceOf(Object);
		});

		test('saveNewAddress function call check', () => {
			const saveNewAddressMock = wrapper.instance().saveNewAddress;
			expect(typeof saveNewAddressMock).toBe('function');
		});

		test('saveAddress function call check', () => {
			const saveAddressMock = wrapper.instance().saveAddress;
			expect(typeof saveAddressMock).toBe('function');
		});

		test('useThisAddress function call check', () => {
			const useThisAddressMock = wrapper.instance().useThisAddress;
			expect(typeof useThisAddressMock).toBe('function');

			useThisAddressMock(address);
		});

		test('addressCheck function call check', () => {
			const addressCheckMock = wrapper.instance().addressCheck;
			expect(typeof addressCheckMock).toBe('function');
			wrapper.setState({address: address});
			wrapper.instance().addressCheck(address);
		});

		test('riskCheck function call check', () => {
			const riskCheckMock = wrapper.instance().riskCheck;
			expect(typeof riskCheckMock).toBe('function');

			wrapper.instance().riskCheck(address);
		});

		test('componentDidMount function call check', () => {
			const componentDidMountMock = wrapper.instance().componentDidMount;
			expect(typeof componentDidMountMock).toBe('function');

			wrapper.instance().componentDidMount();
			expect(wrapper.instance().ref).toBeTruthy();
		});

		test('componentDidUpdate function call check', () => {
			wrapper.instance().setState({
				address: {
					address_label: 'shipping',
					city: 'Mainz',
					country_id: 'DE',
					country_name: 'Germany',
					default_billing: false,
					default_shipping: true,
					firstname: 'Edward Stark',
					id: 201641,
					lastname: 'Anthony',
					postcode: '55116',
					prefix: 'Herr',
					region: null,
					region_code: null,
					rss_result_code: 'AVD000',
					street: ['Bahnhofplatz'],
					telephone: '+49 15100211000'
				}
			});
			const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateMock).toBe('function');

			const prevProps= {methods: ['EP','CC'], isOrderUpdated: false, verificationStatus: 'ADDRESS_CHECK_SUCCESS', riskCheckError: null, addressCheckError: null};
			wrapper.instance().ref = {current : {scrollIntoView: jest.fn()}};
			wrapper.instance().componentDidUpdate(prevProps);

			const updateOrderRequestMockCallCount = updateOrderRequestMock.mock.calls.length;
			expect(updateOrderRequestMockCallCount).toBeDefined();

			const getCustomerMockCallCount = getCustomerMock.mock.calls.length;
			expect(getCustomerMockCallCount).toBeDefined();
		});
		

		test('tabChanged function call check', () => {
			const tabChangedMock = wrapper.instance().tabChanged;
			expect(typeof tabChangedMock).toBe('function');
			wrapper.instance().tabChanged();
			expect(wrapper.instance().state.isEditing).toBeFalsy();
		});

		test('compareAddress function call check', () => {
			const compareAddressMock = wrapper.instance().compareAddress;
			expect(typeof compareAddressMock).toBe('function');

			const firstAddress= {default_shipping: 'default_shipping1'};
			const secondAddress= {};

			expect(typeof compareAddressMock(firstAddress, secondAddress)).toBe('number');
			expect(compareAddressMock(firstAddress, secondAddress)).toBe(-1);
		});

		test('compareAddress function call check', () => {
			const compareAddressMock = wrapper.instance().compareAddress;
			expect(typeof compareAddressMock).toBe('function');

			const firstAddress= {};
			const secondAddress= {default_shipping: 'default_shipping1'};

			expect(typeof compareAddressMock(firstAddress, secondAddress)).toBe('number');
			expect(compareAddressMock(firstAddress, secondAddress)).toBe(1);
		});
		test('compareAddress function call check', () => {
			const compareAddressMock = wrapper.instance().compareAddress;
			expect(typeof compareAddressMock).toBe('function');

			const firstAddress= {};
			const secondAddress= {};

			expect(typeof compareAddressMock(firstAddress, secondAddress)).toBeDefined();
			expect(compareAddressMock(firstAddress, secondAddress)).not.toBeDefined();
		});

	});
});

describe('AddressEditor Component Test Suite with billing', () => {

	let props, wrapper;
	const openModalActionMock = jest.fn();
	const closeMock = jest.fn();

	beforeEach(() => {
		props = {
			order: {
				'orderId':'DEBAAAAAIS',
				'orderDate':1587945600000,
				'orderTitle':'Reimbursement',
				'orderType':'Reimbursement',
				'priceBreakdown':{
					'totalPrice':'425.25',
					'price':419.30,
					'coPay':'',
					'deliveryCost':5.95
				 },
				 'paymentDetails':{
					'paymentMethodType':'paypal',
					'paymentBrand':null,
					'card':{'last4Digits': null},
					'amountAuthorized':425.25,
					'paymentToken':'8ac7a4a271bac61a0171bafbc8c427f8',
					'amountPaid':425.25,
					'paymentTransactionId':null,
				 },
				 'deliveryAddress': {
					'salutation': 'MR',
					'firstName': 'firstName',
					'lastName': 'lastName',
					'city': 'Frankfurt',
					'zipCode': '65936',
					'street': 'Westerwaldstr. 258',
					'addressInfo': null,
					'country': 'DE',
					'countryCode': 'DE',
					'stateProvince': null,
					'phoneNumber': null
				  },
				  'billingAddress': {
					'salutation': null,
					'firstName': 'firstName',
					'lastName': 'lastName',
					'city': 'Frankfurt',
					'zipCode': '65936',
					'street': 'Westerwaldstr. 258',
					'addressInfo': null,
					'country': 'DE',
					'countryCode': 'DE',
					'stateProvince': null,
					'phoneNumber': null
				  }
			},
			close: closeMock,
			isVerified: false,
			customer: customer,
			riskCheckError: '',
			addressCheckError: '',
			isBlacklisted: false,
			methods: [],
			addressType: 'billing',
			getCustomer: getCustomerMock,
			updatedAddresses: updatedAddresses,
			openModalAction: openModalActionMock,
			updateOrderRequest: updateOrderRequestMock,
			resetAddressEditor: resetAddressEditorMock,
			verificationStatus: 'ADDRESS_CHECK_SUCCESS',
			updateAddressRequest: updateAddressRequestMock,
			verifyAddressRequest: verifyAddressRequestMock,
			getAvailablePaymentMethodsRequest: getAvailablePaymentMethodsRequestMock
		};
		wrapper= setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});

describe('AddressEditor Component Test Suite', () => {

	let props, wrapper;

	beforeEach(() => {
		props = {
			order: {
				'index':1,
				'orderId':'DEBAAAAAIS',
				'orderDate':1587945600000,
				'orderTitle':'Reimbursement',
				'orderType':'Reimbursement',
				'priceBreakdown':{
					'totalPrice':'425.25',
					'price':419.30,
					'coPay':'',
					'deliveryCost':5.95
							 },
							 'paymentDetails':{
					'paymentMethodType':'paypal',
					'paymentBrand':null,
					'card':{'last4Digits': null},
					'amountAuthorized':425.25,
					'paymentToken':'8ac7a4a271bac61a0171bafbc8c427f8',
					'amountPaid':425.25,
					'paymentTransactionId':null,
							 },
							 'deliveryAddress': {
					'salutation': 'MR',
					'firstName': 'firstName',
					'lastName': 'lastName',
					'city': 'Frankfurt',
					'zipCode': '65936',
					'street': 'Westerwaldstr. 258',
					'addressInfo': null,
					'country': 'DE',
					'countryCode': 'DE',
					'stateProvince': null,
					'phoneNumber': null
							  },
							  'billingAddress': {
					'salutation': null,
					'firstName': 'firstName',
					'lastName': 'lastName',
					'city': 'Frankfurt',
					'zipCode': '65936',
					'street': 'Westerwaldstr. 258',
					'addressInfo': null,
					'country': 'DE',
					'countryCode': 'DE',
					'stateProvince': null,
					'phoneNumber': null
							  }
			},
			close: closeMock,
			isVerified: false,
			customer: customer,
			riskCheckError: '',
			addressCheckError: '',
			isBlacklisted: false,
			methods: [],
			addressType: 'shipping',
			getCustomer: getCustomerMock,
			updatedAddresses: updatedAddresses,
			openModalAction: openModalActionMock,
			updateOrderRequest: updateOrderRequestMock,
			resetAddressEditor: resetAddressEditorMock,
			verificationStatus: 'ADDRESS_CHECK_SUCCESS',
			updateAddressRequest: updateAddressRequestMock,
			verifyAddressRequest: verifyAddressRequestMock,
			getAvailablePaymentMethodsRequest: getAvailablePaymentMethodsRequestMock
		};
		wrapper= setupTwo(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});


	test('componentDidUpdate function call check', () => {

		const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
		expect(typeof componentDidUpdateMock).toBe('function');

		const prevProps= {methods: [], isVerified: true, isOrderUpdated: false, verificationStatus: 'ADDRESS_CHECK_ERROR'};
		wrapper.instance().ref = {current : {scrollIntoView: jest.fn()}};
		wrapper.instance().componentDidUpdate(prevProps);

		const updateOrderRequestMockCallCount = updateOrderRequestMock.mock.calls.length;
		expect(updateOrderRequestMockCallCount).toBeDefined();

		const getCustomerMockCallCount = getCustomerMock.mock.calls.length;
		expect(getCustomerMockCallCount).toBeDefined();
	});

	test('constructPayload function call check', () => {
		const constructPayloadMock = wrapper.instance().constructPayload;
		expect(typeof constructPayloadMock).toBe('function');

		const customer = wrapper.instance().props.customer;
		const order = wrapper.instance().props.order;
		const address= {street: ['address'],country_name:{value:'DE',label:'Germany'}};

		expect(wrapper.instance().constructPayload(customer, order, address)).toBeDefined();
		expect(wrapper.instance().constructPayload(customer, order, address)).toBeInstanceOf(Object);
	});

	test('updateOrder function call check', () => {

		const updateOrderMock = wrapper.instance().updateOrder;
		expect(typeof updateOrderMock).toBe('function');

		updateOrderMock();
		const updateOrderRequestMockCallCount = updateOrderRequestMock.mock.calls.length;
		expect(updateOrderRequestMockCallCount).toBeDefined();
	});

	test('useThisAddress function call check', () => {
		const useThisAddressMock = wrapper.instance().useThisAddress;
		expect(typeof useThisAddressMock).toBe('function');

		wrapper.instance().useThisAddress(address);
	});

	test('arePaymentMethodsAvailable function call check', () => {
		const methods = ['EP','CC','SUE','OI'];
		const arePaymentMethodsAvailableMock = wrapper.instance().arePaymentMethodsAvailable;
		expect(typeof arePaymentMethodsAvailableMock).toBe('function');

		expect(arePaymentMethodsAvailableMock(methods)).toBeTruthy();
	});

});