import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import CurrentOrder from '../../../../../modules/MyAccount/components/CurrentOrderOverview/CurrentOrder';
import {mockStore} from '../../../../../__mocks__/storeMock';
jest.mock('../../../../../utils/endpointUrl');
Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props= {}) => {
	const wrapper = shallow(<CurrentOrder store= {mockStore} {...props}/>).dive().dive();
	return wrapper;
};

const productData = [{
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
}];

const priceBreakdown= {
	'totalPrice':'425.25',
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

const deliveryDetails= [{
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

const deliveryAddress= {
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
};

const billingAddress= {
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
};

describe('CurrentOrder Component Test Suite with serviceData array in order & orderType as CPS', () => {

	let props, wrapper;
	const openModalActionMock = jest.fn();
	const editAddressMock = jest.fn();
	const addProductToCartMock= jest.fn();
	const addMultipleProductsToCartMock = jest.fn();
	const getInvoiceMock = jest.fn();
	const updatePaymentMethodRequestMock = jest.fn();
	const resetPaymentReducerMock = jest.fn();

	beforeEach(() => {
		props = {
			openModalAction: openModalActionMock,
			order: {
				'index':1,
				'orderId':'DEBAAAAAIS',
				'orderDate':1587945600000,
				'orderTitle':'Reimbursement',
				'orderType':'Reimbursement',
				'rxmc':null,
				'isReimbursedOrder':false,
				'productData': productData,
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
				'priceBreakdown': priceBreakdown,
				'paymentDetails': paymentDetails,
				'deliveryDetails': deliveryDetails,
				'deliveryAddress': deliveryAddress,
				'billingAddress': billingAddress,
				'returnDetails': null
			},
			currentOrderHeading: 'currentOrderHeading',
			products: {productSKU: 'productSKU', productQuantity: 'productQuantity'},
			dictionary: {dictionary: 'dictionary'},
			editAddress: editAddressMock,
			addProductToCart: addProductToCartMock,
			addMultipleProductsToCart: addMultipleProductsToCartMock,
			checkoutPage: 'checkoutPage',
			getInvoice: getInvoiceMock,
			isAccountOverviewTab: true,
			myOrderUrl: 'myOrderUrl',
			errorCodes: [],
			updatePaymentMethodRequest: updatePaymentMethodRequestMock,
			tabName: '#kostenbernahme',
			resetPaymentReducer: resetPaymentReducerMock
		};
		wrapper= setup(props);
	});

	describe('propTypes check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});
	});

	describe('state check', () => {

		test('state check', () => {
			const stateCheck = wrapper.instance().state;
			expect(stateCheck).toBeInstanceOf(Object);
			expect(stateCheck.showCancelConfirmation).toBeFalsy();
			expect(stateCheck.showCancelForm).toBeFalsy();
			expect(stateCheck.isReOrdering).toBeFalsy();
		});

	});

	describe('Functions check', () => {

		test('openChangeDeliveryDateModal function call check', () => {
			const openChangeDeliveryDateModalMock = wrapper.instance().openChangeDeliveryDateModal;
			expect(typeof openChangeDeliveryDateModalMock).toBe('function');

			openChangeDeliveryDateModalMock();
			const openModalActionMockCallCount = openModalActionMock.mock.calls.length;
			expect(openModalActionMockCallCount).toBeDefined();
		});

		test('openCancelForm function call check', () => {
			const openCancelFormMock = wrapper.instance().openCancelForm;
			expect(typeof openCancelFormMock).toBe('function');

			openCancelFormMock(false);
			expect(wrapper.instance().state.showCancelForm).toBeFalsy();
		});

		test('cancelOrder function call check', () => {
			const cancelOrderMock = wrapper.instance().cancelOrder;
			expect(typeof cancelOrderMock).toBe('function');

			cancelOrderMock();
			expect(wrapper.instance().state.showCancelConfirmation).toBeDefined();
			// expect(wrapper.instance().state.cancelled).toBeDefined();
		});

		test('reOrder function call check', () => {
			const reOrderMock = wrapper.instance().reOrder;
			expect(typeof reOrderMock).toBe('function');

			reOrderMock();
			const addProductToCartMockCallCount = addProductToCartMock.mock.calls.length;
			expect(addProductToCartMockCallCount).toBeDefined();
		});

		test('closeCancelConfirmation function call check', () => {
			const closeCancelConfirmationMock = wrapper.instance().closeCancelConfirmation;
			expect(typeof closeCancelConfirmationMock).toBe('function');

			closeCancelConfirmationMock();
			expect(wrapper.instance().state.showCancelConfirmation).toBeFalsy();
			expect(wrapper.instance().state.showCancelForm).toBeFalsy();
		});

		test('getTitle function call check', () => {
			const getTitleMock = wrapper.instance().getTitle;
			expect(typeof getTitleMock).toBe('function');

			expect(getTitleMock()).toBe(wrapper.instance().props.currentOrderHeading);

			wrapper.setState({showCancelForm: true});
			expect(getTitleMock()).toBe('Diese Bestellung stornieren');
		});
		test('editPaymentMethod function call check', () => {
			const editPaymentMethodMock = wrapper.instance().editPaymentMethod;
			wrapper.instance().ref = {current : {scrollIntoView: jest.fn()}};
			expect(typeof editPaymentMethodMock).toBe('function');
			editPaymentMethodMock(true);

			expect(wrapper.instance().state.togglePaymentEditing).toBeTruthy();
		});

		test('changeDeliveryAddress function call check', () => {
			const changeDeliveryAddressMock = wrapper.instance().changeDeliveryAddress;
			expect(typeof changeDeliveryAddressMock).toBe('function');

			changeDeliveryAddressMock();
			const editAddressMockCallCount = editAddressMock.mock.calls.length;
			expect(editAddressMockCallCount).toBeDefined();
			expect(editAddressMockCallCount).not.toBe(0);
		});

		test('componentDidUpdate function call check', () => {
			const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateMock).toBe('function');

			const prevProps= {isLoading: false, isPaymentMethodUpdated: null};
			wrapper.instance().componentDidUpdate(prevProps);

			const openModalActionMockCallCount = openModalActionMock.mock.calls.length;
			expect(openModalActionMockCallCount).toBeDefined();
		});

		test('componentDidUpdate function call check', () => {
			const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateMock).toBe('function');

			wrapper.instance().setState({isReOrdering:true});
			const prevProps= {isLoading: true};
			wrapper.instance().componentDidUpdate(prevProps);
			const openModalActionMockCallCount = openModalActionMock.mock.calls.length;
			expect(openModalActionMockCallCount).toBeDefined();
		});
	});

});


describe('CurrentOrder Component Test Suite with empty serviceData array in order & orderType as CPS', () => {

	let props, wrapper;
	const openModalActionMock = jest.fn();
	const editAddressMock = jest.fn();
	const addProductToCartMock= jest.fn();
	const addMultipleProductsToCartMock = jest.fn();
	const getInvoiceMock = jest.fn();
	const updatePaymentMethodRequestMock = jest.fn();
	const resetPaymentReducerMock = jest.fn();

	beforeEach(() => {
		props = {
			openModalAction: openModalActionMock,
			order: {
				'index':1,
			  'orderId':'DEBAAAAAIS',
			  'orderDate':1587945600000,
			  'orderTitle':'Cash Pay Subscription',
			  'orderType':'Reimbursement',
			  'rxmc':null,
			  'isReimbursedOrder':false,
			  'productData': productData,
			  'serviceData':[],
			  'priceBreakdown': priceBreakdown,
			  'paymentDetails': paymentDetails,
			  'deliveryDetails': deliveryDetails,
			  'deliveryAddress': deliveryAddress,
			  'billingAddress': billingAddress,
			  'returnDetails':null
			},
			currentOrderHeading: 'currentOrderHeading',
			products: {productSKU: 'productSKU', productQuantity: 'productQuantity'},
			dictionary: {dictionary: 'dictionary'},
			editAddress: editAddressMock,
			addProductToCart: addProductToCartMock,
			addMultipleProductsToCart: addMultipleProductsToCartMock,
			checkoutPage: 'checkoutPage',
			getInvoice: getInvoiceMock,
			isAccountOverviewTab: true,
			myOrderUrl: 'myOrderUrl',
			errorCodes: [],
			updatePaymentMethodRequest: updatePaymentMethodRequestMock,
			tabName: '#kostenbernahme',
			resetPaymentReducer: resetPaymentReducerMock,
			customerId: '1234567890'
		};
		wrapper= setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('reOrder function call check', () => {
		const reOrderMock = wrapper.instance().reOrder;
		expect(typeof reOrderMock).toBe('function');

		reOrderMock();
		const addMultipleProductsToCartMockCallCount = addMultipleProductsToCartMock.mock.calls.length;
		expect(addMultipleProductsToCartMockCallCount).toBeDefined();
	});

});
describe('CurrentOrder Component Test Suite with empty serviceData array in order & orderType as CPS', () => {

	let props, wrapper;
	const openModalActionMock = jest.fn();
	const editAddressMock = jest.fn();
	const addProductToCartMock= jest.fn();
	const addMultipleProductsToCartMock = jest.fn();
	const getInvoiceMock = jest.fn();
	const updatePaymentMethodRequestMock = jest.fn();
	const resetPaymentReducerMock = jest.fn();

	beforeEach(() => {
		props = {
			openModalAction: openModalActionMock,
			order: {
				'index':1,
			  'orderId':'DEBAAAAAIS',
			  'orderDate':1587945600000,
			  'orderTitle':'Cash Pay Subscription',
			  'orderType':'Reimbursement',
			  'rxmc':null,
			  'isReimbursedOrder':false,
			  'productData': productData,
			  'serviceData':[],
			  'priceBreakdown': priceBreakdown,
			  'paymentDetails': paymentDetails,
			  'deliveryDetails': deliveryDetails,
			  'deliveryAddress': deliveryAddress,
			  'billingAddress': billingAddress,
			  'returnDetails':null
			},
			currentOrderHeading: 'currentOrderHeading',
			products: {productSKU: 'productSKU', productQuantity: 'productQuantity'},
			dictionary: {dictionary: 'dictionary'},
			editAddress: editAddressMock,
			addProductToCart: addProductToCartMock,
			addMultipleProductsToCart: addMultipleProductsToCartMock,
			checkoutPage: '',
			getInvoice: getInvoiceMock,
			isAccountOverviewTab: true,
			myOrderUrl: 'myOrderUrl',
			errorCodes: [],
			updatePaymentMethodRequest: updatePaymentMethodRequestMock,
			tabName: '#kostenbernahme',
			resetPaymentReducer: resetPaymentReducerMock
		};
		wrapper= setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});

describe('CurrentOrder Component Test Suite with serviceData array in order & orderType as RX & isAccountOverviewTab as false', () => {

	let props, wrapper;
	const openModalActionMock = jest.fn();
	const editAddressMock = jest.fn();
	const addProductToCartMock= jest.fn();
	const addMultipleProductsToCartMock = jest.fn();
	const getInvoiceMock = jest.fn();
	const updatePaymentMethodRequestMock = jest.fn();
	const resetPaymentReducerMock = jest.fn();

	beforeEach(() => {
		props = {
			openModalAction: openModalActionMock,
			order: {
				'index':1,
			  'orderId':'DEBAAAAAIS',
			  'orderDate':1587945600000,
			  'orderTitle':'Cash Pay',
			  'orderType':'Reimbursement',
			  'rxmc':null,
			  'isReimbursedOrder':false,
			  'productData': productData,
			  'serviceData':[],
			  'priceBreakdown': priceBreakdown,
			  'paymentDetails': paymentDetails,
			  'deliveryDetails': deliveryDetails,
			  'deliveryAddress': deliveryAddress,
			  'billingAddress': billingAddress,
			  'returnDetails':null,
			  currentAddress: {currentAddress: 'currentAddress1'}
			},
			currentOrderHeading: 'currentOrderHeading',
			products: {productSKU: 'productSKU', productQuantity: 'productQuantity'},
			dictionary: {dictionary: 'dictionary'},
			editAddress: editAddressMock,
			addProductToCart: addProductToCartMock,
			addMultipleProductsToCart: addMultipleProductsToCartMock,
			checkoutPage: 'checkoutPage',
			getInvoice: getInvoiceMock,
			isAccountOverviewTab: false,
			myOrderUrl: 'myOrderUrl',
			errorCodes: [],
			updatePaymentMethodRequest: updatePaymentMethodRequestMock,
			tabName: '#kostenbernahme',
			resetPaymentReducer: resetPaymentReducerMock
		};
		wrapper= setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('editAddress function call in action property of Link in order.currentAddress condition', () => {
		const actionProp= wrapper.props().children.props.children[0].props.children[1].props.children[1].props.children[0][0][0].props.children[1].props.action;
		expect(typeof actionProp).toBe('function');

		actionProp('shipping');
		const editAddressMockCallCount = editAddressMock.mock.calls.length;
		expect(editAddressMockCallCount).toBeDefined();
		expect(editAddressMockCallCount).not.toBe(0);
	});

	test('editAddress function call in action property of Link in order.billingAddress condition', () => {
		const actionProp= wrapper.props().children.props.children[0].props.children[1].props.children[1].props.children[0][1][0].props.children[1].props.action;
		expect(typeof actionProp).toBe('function');

		actionProp('billing');
		const editAddressMockCallCount = editAddressMock.mock.calls.length;
		expect(editAddressMockCallCount).toBeDefined();
		expect(editAddressMockCallCount).not.toBe(0);
	});

	test('editPaymentMethod function call in action property of Link in 3rd if condition', () => {
		const actionProp= wrapper.props().children.props.children[0].props.children[1].props.children[1].props.children[0][2].props.children.props.action;
		expect(typeof actionProp).toBe('function');

		wrapper.instance().ref = {current : {scrollIntoView: jest.fn()}};
		actionProp(true);
		expect(wrapper.instance().state.togglePaymentEditing).toBeTruthy();
	});

	test('editPaymentMethod function call in action property of Link inside CardAction', () => {
		wrapper.instance().setState({togglePaymentEditing: true});
		const actionProp= wrapper.props().children.props.children[1].props.children[1].props.children.props.action;
		expect(typeof actionProp).toBe('function');

		wrapper.instance().ref = {current : {scrollIntoView: jest.fn()}};
		actionProp(false);
		expect(wrapper.instance().state.togglePaymentEditing).toBeFalsy();
	});

});






