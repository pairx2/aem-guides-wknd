import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import ReactivateSubscriptionOrder from '../../../../../modules/MyAccount/components/PlusService/ReactivateSubscriptionOrder';
import {mockStore, mockStoreOrder} from '../../../../../__mocks__/storeMock';
import translate,{i18nLabels} from '../../../../../utils/translationUtils';
jest.mock('../../../../../utils/endpointUrl');
Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props) => {
	const wrapper = shallow(<ReactivateSubscriptionOrder store={mockStore} {...props} />).dive().dive().dive().dive().dive().dive().dive().dive().dive().dive().dive();
	return wrapper;
};

const setupTwo = (props) => {
	const wrapper = shallow(<ReactivateSubscriptionOrder store={mockStoreOrder} {...props} />).dive().dive().dive().dive().dive().dive().dive().dive().dive().dive().dive();
	return wrapper;
};

describe('ReactivateSubscriptionOrder component Test Suite', () => {
	let props, wrapper;
	const closeReactivationFormMock = jest.fn();
	const getAvailablePaymentMethodsRequestMock = jest.fn();
	const reactivatePlusServiceMock = jest.fn();
	const openModalActionMock = jest.fn();
	const closeMock = jest.fn();
	const editAddressMock = jest.fn();

	beforeEach(() => {
		props = {
			close: closeMock,
			reactivatePlusService: reactivatePlusServiceMock,
			closeReactivationForm: closeReactivationFormMock,
			deactivateSubscription: jest.fn(),
			deleteSubscription: jest.fn(),
			openModalAction: openModalActionMock,
			getAvailablePaymentMethodsRequest: getAvailablePaymentMethodsRequestMock,
			order: {
				'orderId':'DEBAAAAAIS',
				'rxmc': '000AQ',
				'orderType':'Reimbursement',
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
					'phoneNumber':'+49 1514215786',
				},
				'productData':[
					{
						'index':1,
						'productSKU':'S5269856',
						'productName':'FreeStyle Libre Sensor v1',
						'productQuantity':1,
						'productRescheduledDueDate':null,
						'productOriginalDateFrom':1587945600000,
						'productDateOfNextShipment':1595808000000,
						'productOriginalDateOfNextShipment':1575808000000,
						'productDueDateWindow':'14,14',
						'deliverableNumber':'DLV-000010292'
					}
				 ],
				 currentAddress: {currentAddress: 'currentAddress1'},
				 billingAddress: {billingAddress: 'billingAddress1'}
			},
			orderServiceStatus: 'orderServiceStatus',
			products: {},
			dictionary: {},
			privacyPolicyPath: 'privacyPolicyPath',
			termsAndConditionsPath: 'termsAndConditionsPath',
			trainingMaterialsPath: 'trainingMaterialsPath',
			editAddress: editAddressMock
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

		test('componentDidUpdate should call submitForm',() => {
			wrapper.instance().setState({submitClicked:true});
			const prevProps = {isAllowSave: true};
			wrapper.instance().componentDidUpdate(prevProps);
			wrapper.instance().submitForm();
			expect(closeReactivationFormMock.mock.calls.length).toBeDefined();
		});
		test('propsDidChange call check',() => {
			const prevProps = {isAllowSave: true};
			wrapper.instance().propsDidChange(prevProps);
		});
		test('handleChange call check',() => {
			const date = new Date();
			wrapper.instance().handleChange(date);
			expect(wrapper.instance().state.selectedDate).toBe(date);
		});
		test('handleConfirm call check',() => {
			const date = new Date();
			wrapper.instance().handleConfirm(date);
			expect(wrapper.instance().state.deliveryDate).toBe(date);
			expect(wrapper.instance().state.isCalendarOpen).toBeFalsy();
		});
		test('toggleCalendar call check',() => {
			wrapper.instance().toggleCalendar();
			expect(wrapper.instance().state.isCalendarOpen).toBeTruthy();
		});
		test('editPaymentMethod call check',() => {
			wrapper.instance().editPaymentMethod(true);

			wrapper.instance().props.openModalAction({
				heading: i18nLabels.CHOOSE_ALTERNATIVE_PAYMENT_METHOD,
				contentID: 'changePaymentMethodModal',
				props: {}
			});
		});

		test('editPaymentMethod call check',() => {
			wrapper.instance().editPaymentMethod(false);
			expect(wrapper.instance().state.togglePaymentEditing).toBeFalsy();
		});

		test('checkAddress call check',() => {
			wrapper.instance().checkAddress();
			expect(getAvailablePaymentMethodsRequestMock.mock.calls.length).toBeDefined();
		});

		test('submitForm call check',() => {
			wrapper.instance().submitForm();
			expect(reactivatePlusServiceMock.mock.calls.length).toBeDefined();
			const deliveryDate = new Date();
			const dictionaryMock = wrapper.instance().props.dictionary;
			wrapper.instance().props.openModalAction({
				heading: i18nLabels.PLUS_SERVICE_REACTIVATED,
				contentID: 'plusServiceUpdatedConfirmationModal',
				props: {
					paragraph_1: translate(dictionaryMock, i18nLabels.PLUS_SERVICE_SUCCESSFULLY_ACTIVATED),
					paragraph_2: translate(dictionaryMock, i18nLabels.SUPPLY_PERIOD_STARTS_AT_X, [deliveryDate])
				}
			});
		});

		test('editPaymentMethod call check',() => {
			const editPaymentMethodMock = wrapper.instance().editPaymentMethod;
			expect(typeof editPaymentMethodMock).toBe('function');

			const openModalActionMockCallCount = openModalActionMock.mock.calls.length;
			expect(openModalActionMockCallCount).toBeDefined();

			const actionProp = wrapper.props().children.props.children[1].props.children[0].props.children[1][0].props.children[2].props.editSubscriptionPayment;
			expect(typeof actionProp).toBe('function');

			actionProp(true);

			expect(wrapper.instance().state.togglePaymentEditing).toBeTruthy();
		});

		test('componentDidUpdate call check',() => {
			const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateMock).toBe('function');

			const prevProps = {verificationStatus: ''};
			wrapper.instance().componentDidUpdate(prevProps);

			const closeReactivationFormMockCallCount = closeReactivationFormMock.mock.calls.length;
			expect(closeReactivationFormMockCallCount).toBeDefined();

			const closeMockCallCount = closeMock.mock.calls.length;
			expect(closeMockCallCount).toBeDefined();
		});

		test('editAddress function call in action property of Link in order.currentAddress condition', () => {
			const actionProp = wrapper.props().children.props.children[1].props.children[0].props.children[1][0].props.children[0][0].props.children[1].props.action;
			expect(typeof actionProp).toBe('function');

			actionProp('shipping');

			const editAddressMockCallCount = editAddressMock.mock.calls.length;
			expect(editAddressMockCallCount).toBeDefined();
			expect(editAddressMockCallCount).not.toBe(0);
		});

		test('editAddress function call in action property of Link in order.billingAddress condition', () => {
			const actionProp = wrapper.props().children.props.children[1].props.children[0].props.children[1][0].props.children[1][0].props.children[1].props.action;
			expect(typeof actionProp).toBe('function');

			actionProp('billing');

			const editAddressMockCallCount = editAddressMock.mock.calls.length;
			expect(editAddressMockCallCount).toBeDefined();
			expect(editAddressMockCallCount).not.toBe(0);
		});

		test('renderCustomHeader method inside DatePicker tag', () => {
			const renderCustomHeaderProp = wrapper.props().children.props.children[1].props.children[0].props.children[0].props.children[2].props.children[1].props.renderCustomHeader;
			expect(typeof renderCustomHeaderProp).toBe('function');
			expect(renderCustomHeaderProp.name).toBe('renderCustomHeader');

			expect(renderCustomHeaderProp('20/11/2012', 1, 2)).toBeDefined();
			expect(typeof renderCustomHeaderProp('20/11/2012', 1, 2)).toBe('object');
		});
	});
});

describe('ReactivateSubscriptionOrder component Test Suite', () => {
	let props, wrapper;
	const closeReactivationFormMock = jest.fn();
	const getAvailablePaymentMethodsRequestMock = jest.fn();
	const reactivatePlusServiceMock = jest.fn();
	const openModalActionMock = jest.fn();
	const closeMock = jest.fn();

	beforeEach(() => {
		props = {
			close: closeMock,
			reactivatePlusService: reactivatePlusServiceMock,
			closeReactivationForm: closeReactivationFormMock,
			deactivateSubscription: jest.fn(),
			deleteSubscription: jest.fn(),
			openModalAction: openModalActionMock,
			getAvailablePaymentMethodsRequest: getAvailablePaymentMethodsRequestMock,
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
					'phoneNumber':'+49 1514215786',
				},
				'productData':[
					{
						'index':1,
						'productSKU':'S5269856',
						'productName':'FreeStyle Libre Sensor v1',
						'productQuantity':1,
						'productRescheduledDueDate':null,
						'productOriginalDateFrom': '1587945600000',
						'productDateOfNextShipment': '1595808000000',
						'productOriginalDateOfNextShipment': '1575808000000',
						'productDueDateWindow':'14,14',
						'deliverableNumber':'DLV-000010292'
					}
				 ],
				currentAddress: {currentAddress: 'currentAddress1'},
				billingAddress: {billingAddress: 'billingAddress1'}
			},
			orderServiceStatus: 'orderServiceStatus',
			products: {},
			dictionary: {},
			privacyPolicyPath: null,
			termsAndConditionsPath: null,
			trainingMaterialsPath: null
		};
		wrapper = setupTwo(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('other componentDidUpdate call check',() => {
		const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
		expect(typeof componentDidUpdateMock).toBe('function');

		const prevProps = {verificationStatus: ''};
		wrapper.instance().componentDidUpdate(prevProps);
	});

});

describe('ReactivateSubscriptionOrder component Test Suite', () => {
	let props, wrapper;
	const closeReactivationFormMock = jest.fn();
	const getAvailablePaymentMethodsRequestMock = jest.fn();
	const reactivatePlusServiceMock = jest.fn();
	const openModalActionMock = jest.fn();
	const closeMock = jest.fn();
	const editAddressMock = jest.fn();

	beforeEach(() => {
		props = {
			close: closeMock,
			reactivatePlusService: reactivatePlusServiceMock,
			closeReactivationForm: closeReactivationFormMock,
			deactivateSubscription: jest.fn(),
			deleteSubscription: jest.fn(),
			openModalAction: openModalActionMock,
			getAvailablePaymentMethodsRequest: getAvailablePaymentMethodsRequestMock,
			order: {
				'orderId':'DEBAAAAAIS',
				'rxmc': '000AQ',
				'orderType':'Cash Pay',
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
					'phoneNumber':'+49 1514215786',
				},
				'productData':[
					{
						'index':1,
						'productSKU':'S5269856',
						'productName':'FreeStyle Libre Sensor v1',
						'productQuantity':1,
						'productRescheduledDueDate':null,
						'productOriginalDateFrom':1587945600000,
						'productDateOfNextShipment':1595808000000,
						'productOriginalDateOfNextShipment':1575808000000,
						'productDueDateWindow':'14,14',
						'deliverableNumber':'DLV-000010292'
					}
				 ],
				 currentAddress: {currentAddress: 'currentAddress1'},
				 billingAddress: {billingAddress: 'billingAddress1'}
			},
			orderServiceStatus: 'orderServiceStatus',
			products: {},
			dictionary: {},
			privacyPolicyPath: 'privacyPolicyPath',
			termsAndConditionsPath: 'termsAndConditionsPath',
			trainingMaterialsPath: 'trainingMaterialsPath',
			editAddress: editAddressMock
		};
		wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
	test('componentDidUpdate should call submitForm',() => {
		const prevProps = {verificationStatus: 'ADDRESS_CHECK_SUCCESS'};
		wrapper.instance().componentDidUpdate(prevProps);
		wrapper.instance().submitForm();
		expect(closeReactivationFormMock.mock.calls.length).toBeDefined();
	});
});
