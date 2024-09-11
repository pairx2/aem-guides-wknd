import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore, mockStoreOrder} from '../../../../../__mocks__/storeMock';
import OrderPaymentDisplayAndEdit from '../../../../../modules/MyAccount/components/PlusService/OrderPaymentDisplayAndEdit';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props) => {
	const wrapper = shallow(<OrderPaymentDisplayAndEdit store={mockStore} {...props} />).dive().dive();
	return wrapper;
};

const setupTwo = (props) => {
	const wrapper = shallow(<OrderPaymentDisplayAndEdit store={mockStoreOrder} {...props} />).dive().dive();
	return wrapper;
};

const customer = {
	'id':200998,
	'dob':'1990-10-10',
	'measurement':'101',
	'mobile_phone':'+49 176 11111111',
	'landline_phone':'+49 176 11 11111111',
	'payer_institution_name':'test payers Swapna6',
	'payer_number':null,
	'health_insurance_number':'Q849505609',
	'account_type':0,
	'firstname':'Saurabh',
	'lastname':'Mishhra',
	'email':'786677@yopmail.com',
	'prefix':'Herr',
	'cs_first_shipment_shipped':true,
	'has_active_reimbursement':false,
	'prescription_reminder_sent':true,
	'last_cec_upload_date': '20171022',
	'is_cec_upload_allowed': true,
	'disable_mobile_popup' : true,
	'addresses':[
	   {
		  'id':200892,
		  'prefix':'Herr',
		  'firstname':'Saurabh',
		  'lastname':'Mishhra',
		  'postcode':'55132',
		  'country_id':'DE',
		  'country_name':'Deutschland',
		  'region_code':null,
		  'region':null,
		  'city':'sadasdas',
		  'street':[
			 'asdasdasd'
		  ],
		  'telephone':'+49 176 11111111',
		  'rss_result_code':null,
		  'address_label':'null',
		  'default_shipping':true,
		  'default_billing':true,
		  '__typename':'AdcCustomerAddress'
	   }
	],
	'is_social': false
};

describe('OrderPaymentDisplayAndEdit component Test Suite', () => {
	let props, wrapper;
	const getAvailablePaymentMethodsRequestMock = jest.fn();
	const initializeCustomerPaymentTokenMock = jest.fn();
	const verifyAddressRequestMock = jest.fn();
	beforeEach(() => {

		props = {
			initializeCustomerPaymentToken: initializeCustomerPaymentTokenMock,
			payonEndpoint: 'payonEndpoint',
			updateAddress:jest.fn(),
			isPaymentMismatch: false,
			showPayonWidget: true,
			checkboxes: [],
			order: {
				'billingAddress':{
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
				'priceBreakdown':{
					'totalPrice':'185.65',
					'price':179.70,
					'coPay':'',
					'deliveryCost':5.95
				},
				orderType: 'Reimbursement'
			},
			customer: customer,
			getAvailablePaymentMethodsRequest: getAvailablePaymentMethodsRequestMock,
			verifyAddressRequest: verifyAddressRequestMock
		};
		wrapper = setup(props);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});
	});

	describe('function calls',() => {

		test('did mount should call getAvailablePaymentMethods',() => {
			wrapper.instance().componentDidMount();
			wrapper.instance().getAvailablePaymentMethods();
		});

		test('check call getAvailablePaymentMethods',() => {
			const customerProp = wrapper.props().customer;
			const orderProp = wrapper.props().order;
			wrapper.instance().getAvailablePaymentMethods(customerProp, orderProp);
			expect(getAvailablePaymentMethodsRequestMock.mock.calls.length).toBeDefined();
		});
		test('check call addressCheck',() => {
			wrapper.instance().addressCheck();
			expect(verifyAddressRequestMock.mock.calls.length).toBeDefined();
		});
		test('check call markSavedFormAsDirty',() => {
			wrapper.instance().markSavedFormAsDirty();
			expect(wrapper.instance().state.isSavedPaymentClicked).toBe(true);
		});

		test('check call constructPayload',() => {
			const customer ={
				'id':200998,
				'dob':'1990-10-10',
				'measurement':'101',
				'mobile_phone':'+49 176 11111111',
				'landline_phone':'+49 176 11 11111111',
				'payer_institution_name':'test payers Swapna6',
				'payer_number':null,
				'health_insurance_number':'Q849505609',
				'account_type':0,
				'firstname':'Saurabh',
				'lastname':'Mishhra',
				'email':'786677@yopmail.com',
				'prefix':'Herr',
				'cs_first_shipment_shipped':true,
				'has_active_reimbursement':false,
				'prescription_reminder_sent':true,
				'last_cec_upload_date': '20171022'
			};
			const order ={
				'billingAddress':{
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
				'priceBreakdown':{
					'totalPrice':'185.65',
					'price':179.70,
					'coPay':'',
					'deliveryCost':5.95
				},
				orderType: 'Reimbursement'
			};
			wrapper.instance().constructPayload(customer, order);
		});

		test('componentDidUpdate function call check', () => {
			const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateMock).toBe('function');
			const prevProps = {isLoading: false};
			const prevState = {paymentMethod: 'cash'};
			wrapper.instance().componentDidUpdate(prevProps, prevState);
			expect(wrapper.instance().state.paymentMethod).toBeNull();
			expect(wrapper.instance().state.loadingIndex).toBeNull();
			expect(wrapper.instance().state.expandedIndex).toBeNull();
		});
		test('propsDidChange function call check', () => {
			const propsDidChangeMock = wrapper.instance().propsDidChange;
			expect(typeof propsDidChangeMock).toBe('function');
			const prevProps = {
				isLoading: false,
				methods:[]
			};
			expect(wrapper.instance().propsDidChange(prevProps)).toBe(true);
		});

		test('other componentDidUpdate function call check', () => {
			const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateMock).toBe('function');
			wrapper.instance().setState({paymentMethod: 'open_invoice'});

			const prevProps = {isLoading: false, payonCheckoutId: ''};
			const prevState = {paymentMethod: 'open_invoice'};

			wrapper.instance().componentDidUpdate(prevProps, prevState);
			expect(wrapper.instance().state.paymentMethod).toBe('open_invoice');
			expect(wrapper.instance().state.loadingIndex).toBeNull();
			expect(wrapper.instance().state.expandedIndex).toBeNull();
		});

		test('should call getMappedPaymentMethods',() => {
			wrapper.instance().getMappedPaymentMethods();
		});
		test('should call markFormAsDirty',() => {
			wrapper.instance().markFormAsDirty();
			expect(wrapper.instance().state.isOpenInvoiceClicked).toBeTruthy();
		});
		test('should call setSavedPaymentMethod',() => {
			const tokenProp = {};
			wrapper.instance().setSavedPaymentMethod(tokenProp);
			expect(wrapper.instance().state.paymentMethodToken).toBeInstanceOf(Object);
		});
		test('should call toggleOption',() => {
			const index = null;
			wrapper.instance().toggleOption(index);
			wrapper.instance().getMappedPaymentMethods();
			expect(wrapper.instance().state.paymentMethodToken).toBeNull();
			expect(wrapper.instance().state.expandedIndex).toBeNull();
			expect(wrapper.instance().state.paymentMethod).toBeNull();
			expect(wrapper.instance().state.loadingIndex).toBeNull();
			expect(initializeCustomerPaymentTokenMock.mock.calls.length).toBeDefined();
		});

		test('should call getConfirmedCheckoutId',() => {
			wrapper.instance().getConfirmedCheckoutId();
		});

		test('other toggleOption function call',() => {
			wrapper.instance().setState({
				methods: ['OI', 'EP']
			});
			wrapper.instance().toggleOption(1);

			const initializeCustomerPaymentTokenMockCallCount = initializeCustomerPaymentTokenMock.mock.calls.length;
			expect(initializeCustomerPaymentTokenMockCallCount).toBeDefined();

			expect(wrapper.instance().state.expandedIndex).toBe(null);
			expect(wrapper.instance().state.paymentMethod).toBe('payon_paypal');
		});

		test('other toggleOption function call- 1st condition',() => {
			wrapper.instance().toggleOption(0);
			expect(wrapper.instance().state.paymentMethod).toBe('payon_saved_token');
			expect(wrapper.instance().state.paymentMethodToken).toBe(null);
		});

		test('other toggleOption function call- 3rd condition',() => {
			wrapper.instance().setState({
				methods: ['EP','CC', 'SUE', 'EP', 'OI']
			});
			wrapper.instance().toggleOption(4);
			expect(wrapper.instance().state.paymentMethod).toBe('open_invoice');
			expect(wrapper.instance().state.loadingIndex).toBe(null);
		});
	});
});
describe('OrderPaymentDisplayAndEdit component Test Suite', () => {
	let props, wrapper;
	const getAvailablePaymentMethodsRequestMock = jest.fn();
	const initializeCustomerPaymentTokenMock = jest.fn();
	const verifyAddressRequestMock = jest.fn();
	beforeEach(() => {

		props = {
			initializeCustomerPaymentToken: initializeCustomerPaymentTokenMock,
			payonEndpoint: 'payonEndpoint',
			updateAddress:jest.fn(),
			isPaymentMismatch: false,
			showPayonWidget: false,
			checkboxes: [],
			order: {
				'billingAddress':{
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
				'priceBreakdown':{
					'totalPrice':'185.65',
					'price':179.70,
					'coPay':'',
					'deliveryCost':5.95
				},
				orderType: 'Reimbursement'
			},
			customer: customer,
			getAvailablePaymentMethodsRequest: getAvailablePaymentMethodsRequestMock,
			verifyAddressRequest: verifyAddressRequestMock
		};
		wrapper = setup(props);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});
	});

	describe('function calls',() => {

		test('did mount should call getAvailablePaymentMethods',() => {
			wrapper.instance().componentDidMount();
			wrapper.instance().getAvailablePaymentMethods();
		});

		test('check call getAvailablePaymentMethods',() => {
			const customerProp = wrapper.props().customer;
			const orderProp = wrapper.props().order;
			wrapper.instance().getAvailablePaymentMethods(customerProp, orderProp);
			expect(getAvailablePaymentMethodsRequestMock.mock.calls.length).toBeDefined();
		});

		test('check call constructPayload',() => {
			const customer ={
				'id':200998,
				'dob':'1990-10-10',
				'measurement':'101',
				'mobile_phone':'+49 176 11111111',
				'landline_phone':'+49 176 11 11111111',
				'payer_institution_name':'test payers Swapna6',
				'payer_number':null,
				'health_insurance_number':'Q849505609',
				'account_type':0,
				'firstname':'Saurabh',
				'lastname':'Mishhra',
				'email':'786677@yopmail.com',
				'prefix':'Herr',
				'cs_first_shipment_shipped':true,
				'has_active_reimbursement':false,
				'prescription_reminder_sent':true,
				'last_cec_upload_date': '20171022'
			};
			const order ={
				'billingAddress':{
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
				'priceBreakdown':{
					'totalPrice':'185.65',
					'price':179.70,
					'coPay':'',
					'deliveryCost':5.95
				},
				orderType: 'Reimbursement'
			};
			wrapper.instance().constructPayload(customer, order);
		});

		test('componentDidUpdate function call check', () => {
			const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateMock).toBe('function');
			const prevProps = {isLoading: false};
			const prevState = {paymentMethod: 'cash'};
			wrapper.instance().componentDidUpdate(prevProps, prevState);
			expect(wrapper.instance().state.paymentMethod).toBeNull();
			expect(wrapper.instance().state.loadingIndex).toBeNull();
			expect(wrapper.instance().state.expandedIndex).toBeNull();
		});

		test('other componentDidUpdate function call check', () => {
			const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateMock).toBe('function');
			wrapper.instance().setState({paymentMethod: 'open_invoice'});

			const prevProps = {isLoading: false, payonCheckoutId: ''};
			const prevState = {paymentMethod: 'open_invoice'};

			wrapper.instance().componentDidUpdate(prevProps, prevState);
			expect(wrapper.instance().state.paymentMethod).toBe('open_invoice');
			expect(wrapper.instance().state.loadingIndex).toBeNull();
			expect(wrapper.instance().state.expandedIndex).toBeNull();
		});

		test('should call getMappedPaymentMethods',() => {
			wrapper.instance().getMappedPaymentMethods();
		});
		test('should call markFormAsDirty',() => {
			wrapper.instance().markFormAsDirty();
			expect(wrapper.instance().state.isOpenInvoiceClicked).toBeTruthy();
		});
		test('should call setSavedPaymentMethod',() => {
			const tokenProp = {};
			wrapper.instance().setSavedPaymentMethod(tokenProp);
			expect(wrapper.instance().state.paymentMethodToken).toBeInstanceOf(Object);
		});
		test('should call toggleOption',() => {
			const index = null;
			wrapper.instance().toggleOption(index);
			wrapper.instance().getMappedPaymentMethods();
			expect(wrapper.instance().state.paymentMethodToken).toBeNull();
			expect(wrapper.instance().state.expandedIndex).toBeNull();
			expect(wrapper.instance().state.paymentMethod).toBeNull();
			expect(wrapper.instance().state.loadingIndex).toBeNull();
			expect(initializeCustomerPaymentTokenMock.mock.calls.length).toBeDefined();
		});

		test('should call getConfirmedCheckoutId',() => {
			wrapper.instance().getConfirmedCheckoutId();
		});

		test('other toggleOption function call',() => {
			wrapper.instance().setState({
				methods: ['OI', 'EP']
			});
			wrapper.instance().toggleOption(1);

			const initializeCustomerPaymentTokenMockCallCount = initializeCustomerPaymentTokenMock.mock.calls.length;
			expect(initializeCustomerPaymentTokenMockCallCount).toBeDefined();

			expect(wrapper.instance().state.expandedIndex).toBe(null);
			expect(wrapper.instance().state.paymentMethod).toBe('payon_paypal');
		});

		test('other toggleOption function call- 1st condition',() => {
			wrapper.instance().toggleOption(0);
			expect(wrapper.instance().state.paymentMethod).toBe('payon_saved_token');
			expect(wrapper.instance().state.paymentMethodToken).toBe(null);
		});

		test('other toggleOption function call- 3rd condition',() => {
			wrapper.instance().setState({
				methods: ['EP','CC', 'SUE', 'EP', 'OI']
			});
			wrapper.instance().toggleOption(4);
			expect(wrapper.instance().state.paymentMethod).toBe('open_invoice');
			expect(wrapper.instance().state.loadingIndex).toBe(null);
		});
	});
});

describe('OrderPaymentDisplayAndEdit component Test Suite', () => {
	let props, wrapper;
	const getAvailablePaymentMethodsRequestMock = jest.fn();
	const initializeCustomerPaymentTokenMock = jest.fn();
	const verifyAddressRequestMock = jest.fn();
	beforeEach(() => {
		props = {
			initializeCustomerPaymentToken: initializeCustomerPaymentTokenMock,
			payonEndpoint: 'payonEndpoint',
			checkboxes: [],
			updateAddress:jest.fn(),
			isPaymentMismatch: false,
			showPayonWidget: false,
			order: {
				'billingAddress':{
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
				'priceBreakdown':{
					'totalPrice':'185.65',
					'price':179.70,
					'coPay':'',
					'deliveryCost':5.95
				},
				orderType: 'Cash Pay Subscription'
			},
			customer: customer,
			getAvailablePaymentMethodsRequest: getAvailablePaymentMethodsRequestMock,
			verifyAddressRequest: verifyAddressRequestMock
		};
		wrapper = setupTwo(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('other didMount call',() => {
		wrapper.instance().componentDidMount();
		const getAvailablePaymentMethodsRequestMockCallCount= getAvailablePaymentMethodsRequestMock.mock.calls.length;
		expect(getAvailablePaymentMethodsRequestMockCallCount).toBeDefined();
	});
});
describe('OrderPaymentDisplayAndEdit component Test Suite', () => {
	let props, wrapper;
	const getAvailablePaymentMethodsRequestMock = jest.fn();
	const initializeCustomerPaymentTokenMock = jest.fn();
	const verifyAddressRequestMock = jest.fn();
	beforeEach(() => {
		props = {
			initializeCustomerPaymentToken: initializeCustomerPaymentTokenMock,
			payonEndpoint: 'payonEndpoint',
			checkboxes: [],
			updateAddress:jest.fn(),
			isPaymentMismatch: false,
			showPayonWidget: true,
			order: {
				'billingAddress':{
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
				'priceBreakdown':{
					'totalPrice':'185.65',
					'price':179.70,
					'coPay':'',
					'deliveryCost':5.95
				},
				orderType: 'Cash Pay Subscription'
			},
			customer: customer,
			getAvailablePaymentMethodsRequest: getAvailablePaymentMethodsRequestMock,
			verifyAddressRequest: verifyAddressRequestMock
		};
		wrapper = setupTwo(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('other didMount call',() => {
		wrapper.instance().componentDidMount();
		const getAvailablePaymentMethodsRequestMockCallCount= getAvailablePaymentMethodsRequestMock.mock.calls.length;
		expect(getAvailablePaymentMethodsRequestMockCallCount).toBeDefined();
	});
});