import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import CurrentSubscriptionOrder from '../../../../../modules/MyAccount/components/PlusService/CurrentSubscriptionOrder';
import {mockStore, mockStoreOrder} from '../../../../../__mocks__/storeMock';
import translate, {i18nLabels} from '../../../../../utils/translationUtils';
jest.mock('../../../../../utils/endpointUrl');
//import { render, Link } from 'enzyme';
Enzyme.configure({
	adapter: new EnzymeAdapter()
});

const setup = (props = {}) => {
	const wrapper = shallow(<CurrentSubscriptionOrder store={mockStore} {...props} />).dive().dive();
	return wrapper;
};

const setupTwo = (props = {}) => {
	const wrapper = shallow(<CurrentSubscriptionOrder store={mockStoreOrder} {...props} />).dive().dive();
	return wrapper;
};

describe('CurrentSubscriptionOrder component Test Suite', () => {
	let wrapper, props;
	const openModalActionMock = jest.fn();
	const openReactivationFormMock = jest.fn();
	const editSubscriptionMock = jest.fn();
	const resetPaymentReducerMock = jest.fn();
	beforeEach(() => {

		props = {
			openModalAction: openModalActionMock,
			openReactivationForm: openReactivationFormMock,
			editSubscription: editSubscriptionMock,
			order: {
				firstname: 'john',
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
				 orderType: 'Cash Pay Subscription'
			},
			orderServiceStatus: 'Inactive',
			products: {},
			dictionary: {},
			deliveryDate: '2021-02-23T18:30:00.000Z',
			tabName: '#plus_service',
			resetPaymentReducer: resetPaymentReducerMock,
			customerId: '1234567890'
		};
		wrapper = setupTwo(props);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('prop type check', () =>{
			expect(typeof wrapper.instance().props.openModalAction).toBe('function');
			expect(typeof wrapper.instance().props.openReactivationForm).toBe('function');
			expect(typeof wrapper.instance().props.editSubscription).toBe('function');
			expect(wrapper.instance().props.products).toBeInstanceOf(Object);
			expect(wrapper.instance().props.order).toBeInstanceOf(Object);
			expect(wrapper.instance().props.dictionary).toBeInstanceOf(Object);
			expect(typeof wrapper.instance().props.orderServiceStatus).toBe('string');
			expect(typeof wrapper.instance().props.isLoading).toBe('boolean');
			expect(wrapper.instance().props.errorCodes).not.toBeNull();
			expect(wrapper.instance().props.customer).toBeInstanceOf(Object);
		});
	});
	describe('function calls',() => {
		test('openChangeDeliveryDateModal call check',() => {
			const nameMock = wrapper.instance().props.order.firstname;
			const dictionaryMock = wrapper.instance().props.dictionary;
			wrapper.instance().openChangeDeliveryDateModal();

			wrapper.instance().props.openModalAction({
				heading: translate(dictionaryMock, i18nLabels.PERSONALIZED_CHOOSE_NEW_DELIVERY_DATE, [nameMock]),
				contentID: 'changeDeliveryDateModal'
			});
		});

		test('reactivateSubscription call check',() => {
			wrapper.instance().reactivateSubscription();
			const editSubscriptionMockCount = editSubscriptionMock.mock.calls.length;
			expect(editSubscriptionMockCount).not.toBe(0);
		});
	});
});

describe('CurrentSubscriptionOrder component Test Suite', () => {
	let wrapper, props;
	const openModalActionMock = jest.fn();
	const openReactivationFormMock = jest.fn();
	const editSubscriptionMock = jest.fn();
	const resetPaymentReducerMock = jest.fn();
	beforeEach(() => {

		props = {
			openModalAction: openModalActionMock,
			openReactivationForm: openReactivationFormMock,
			editSubscription: editSubscriptionMock,
			order: {
				firstname: 'john',
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
				 orderType: 'Cash Pay Subscription'
			},
			orderServiceStatus: 'Active',
			products: {},
			dictionary: {},
			deliveryDate: '2021-02-23T18:30:00.000Z',
			tabName: '#plus_service',
			resetPaymentReducer: resetPaymentReducerMock
		};
		wrapper = setupTwo(props);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('prop type check', () =>{
			expect(typeof wrapper.instance().props.openModalAction).toBe('function');
			expect(typeof wrapper.instance().props.openReactivationForm).toBe('function');
			expect(typeof wrapper.instance().props.editSubscription).toBe('function');
			expect(wrapper.instance().props.products).toBeInstanceOf(Object);
			expect(wrapper.instance().props.order).toBeInstanceOf(Object);
			expect(wrapper.instance().props.dictionary).toBeInstanceOf(Object);
			expect(typeof wrapper.instance().props.orderServiceStatus).toBe('string');
			expect(typeof wrapper.instance().props.isLoading).toBe('boolean');
			expect(wrapper.instance().props.errorCodes).not.toBeNull();
			expect(wrapper.instance().props.customer).toBeInstanceOf(Object);
		});
	});
	describe('function calls',() => {
		test('openChangeDeliveryDateModal call check',() => {
			const nameMock = wrapper.instance().props.order.firstname;
			const dictionaryMock = wrapper.instance().props.dictionary;
			wrapper.instance().openChangeDeliveryDateModal();

			wrapper.instance().props.openModalAction({
				heading: translate(dictionaryMock, i18nLabels.PERSONALIZED_CHOOSE_NEW_DELIVERY_DATE, [nameMock]),
				contentID: 'changeDeliveryDateModal'
			});
		});

		test('reactivateSubscription call check',() => {
			wrapper.instance().reactivateSubscription();
			const editSubscriptionMockCount = editSubscriptionMock.mock.calls.length;
			expect(editSubscriptionMockCount).not.toBe(0);
		});
	});
});

describe('Other CurrentSubscriptionOrder component Test Suite', () => {
	let wrapper, props;
	const openModalActionMock = jest.fn();
	const openReactivationFormMock = jest.fn();
	const editSubscriptionMock = jest.fn();
	const editAddressMock = jest.fn();
	const resetPaymentReducerMock = jest.fn();

	beforeEach(() => {

		props = {
			openModalAction: openModalActionMock,
			openReactivationForm: openReactivationFormMock,
			editSubscription: editSubscriptionMock,
			editAddress: editAddressMock,
			order: {
				currentAddress: {currentAddress: 'currentAddress1'},
				billingAddress: {billingAddress: 'billingAddress1'},
				orderType: 'Cash Pay Subscription'
			},
			orderServiceStatus: 'Active',
			products: {},
			dictionary: {},
			deliveryDate: '2021-02-23T18:30:00.000Z',
			tabName: '#plus_service',
			resetPaymentReducer: resetPaymentReducerMock
		};
		wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	 
	test('Message Banner render test while isPaymentMethodUpdated is true', () => {
		wrapper.setProps({isPaymentMethodUpdated: true, updatedOrder:'CPS', order:{orderType:'Cash Pay Subscription'}, orderServiceStatus: 'Active'}, () => {
			expect(wrapper).toBeDefined();
		});		
	});

	test('Message Banner render test while isAddressAndPaymentMethodUpdated is true & isPaymentMethodUpdated is false', () => {
		wrapper.setProps({isAddressAndPaymentMethodUpdated:true, isPaymentMethodUpdated: false, updatedOrder:'CPS', order:{orderType:'Cash Pay Subscription'}, orderServiceStatus: 'Active'}, () => {
			expect(wrapper).toBeDefined();
		});		
	});

	test('paymentMethodUpdateError is true, addressAndPaymentUpdateError is false, isAddressAndPaymentMethodUpdated is false', () => {
		wrapper.setProps({paymentMethodUpdateError:true, addressAndPaymentUpdateError:false, isAddressAndPaymentMethodUpdated:false, isPaymentMethodUpdated: false, updatedOrder:'CPS', order:{orderType:'Cash Pay Subscription'}, orderServiceStatus: 'Active'}, () => {
			expect(wrapper).toBeDefined();
		});		
	});

	test('isPaymentMethodUpdated is false and isOrderUpdated is true, isPaymentMethodUpdated is false', () => {
		wrapper.setProps({isOrderUpdated:true,  paymentMethodUpdateError:false, addressAndPaymentUpdateError:true, isAddressAndPaymentMethodUpdated:false, isPaymentMethodUpdated: false, updatedOrderType :'Cash Pay Subscription', order:{orderType:'Cash Pay Subscription'}, orderServiceStatus: 'Active'}, () => {
			expect(wrapper).toBeDefined();
		});		
	});

	test('isOrderUpdated is false, isPaymentMethodUpdated is false', () => {
		wrapper.setProps({updateError:true, isOrderUpdated:false,  paymentMethodUpdateError:false, addressAndPaymentUpdateError:true, isAddressAndPaymentMethodUpdated:false, isPaymentMethodUpdated: false, updatedOrderType :'Cash Pay Subscription', order:{orderType:'Cash Pay Subscription'}, orderServiceStatus: 'Active'}, () => {
			expect(wrapper).toBeDefined();
		});		
	});

	test('isPaymentMethodUpdated is false', () => {
		wrapper.setProps({paymentMethodUpdateError:true, addressAndPaymentUpdateError:true, isAddressAndPaymentMethodUpdated:false, isPaymentMethodUpdated: false, updatedOrder:'CPS', order:{orderType:'Cash Pay Subscription'}, orderServiceStatus: 'Active'}, () => {
			expect(wrapper).toBeDefined();
		});		
	});

	test('editAddress function call in action property of Link in order.currentAddress condition', () => {
		 const actionProp= wrapper.props().children[0].props.children[1].props.children[1].props.children[0][0].props.children[1].props.children.props.action;
		 expect(typeof actionProp).toBe('function');
		actionProp('shipping');
	});
	
	test('editAddress function call in action property of Link in order.billingAddress condition', () => {
		const actionProp= wrapper.props().children[0].props.children[1].props.children[1].props.children[1][0].props.children[1].props.children.props.action;
	 	expect(typeof actionProp).toBe('function');
	    actionProp('billing');
   });
});
