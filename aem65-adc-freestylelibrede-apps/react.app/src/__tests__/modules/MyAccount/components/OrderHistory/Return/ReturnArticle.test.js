import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {Card, CardContent} from '../../../../../../modules/Generic/components/Card/Card';
import ReturnInstructions from '../../../../../../modules/MyAccount/components/OrderHistory/Return/ReturnInstructions';
import ReturnForm from '../../../../../../modules/MyAccount/components/OrderHistory/Return/ReturnForm';
import ReturnArticle from '../../../../../../modules/MyAccount/components/OrderHistory/Return/ReturnArticle';
import {mockStore} from '../../../../../../__mocks__/storeMock';
jest.mock('../../../../../../utils/endpointUrl');
Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

const setup = (props) => {
	const wrapper = shallow(<ReturnArticle store= {mockStore} {...props}/>);
	return wrapper;
};

describe('ReturnArticle Component Test Suite', () => {

	let props, wrapper;
	const closeMock = jest.fn();
	const getOrderReturnRequestMock = jest.fn();
	const getOrderReturnRmaDetailsRequestMock = jest.fn();
	beforeEach(() => {
		props= {
			delivery: {},
	        orderDetails: {},
		    orderId: 'xyz',
		    orderDate: 19920123,
			products: {},
			productData: [],
			returnText: 'returnText',
			isLargeEnough: false,
			close: closeMock,
			getOrderReturnRequest: getOrderReturnRequestMock,
			getOrderReturnRmaDetailsRequest: getOrderReturnRmaDetailsRequestMock
		};

		wrapper= setup(props);
	});

	describe('Redux Props', () => {

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});
		test('has returnId as prop and type check', () => {
			const returnIdProp = wrapper.dive().dive().instance().props.returnId;
			expect(typeof returnIdProp).toBe('string');
		});
		test('has error as prop and type check', () => {
			const errorProp = wrapper.dive().dive().instance().props.error;
			expect(typeof errorProp).toBe('string');
		});
		test('has isLoading as prop and type check', () => {
			const isLoadingProp = wrapper.dive().dive().instance().props.isLoading;
			expect(typeof isLoadingProp).toBe('boolean');
		});
		test('has orderDate as prop and type check', () => {
			const orderDateProp = wrapper.dive().dive().instance().props.orderDate;
			expect(typeof orderDateProp).toBe('number');
		});
		test('has returnText as prop and type check', () => {
			const returnTextProp = wrapper.dive().dive().instance().props.returnText;
			expect(typeof returnTextProp).toBe('string');
		});
		test('has getOrderReturnRequest as prop and type check', () => {
			const getOrderReturnRequestProp = wrapper.dive().dive().instance().props.getOrderReturnRequest;
			expect(typeof getOrderReturnRequestProp).toBe('function');
		});
		test('has getOrderReturnRmaDetailsRequest as prop and type check', () => {
			const getOrderReturnRmaDetailsRequestProp = wrapper.dive().dive().instance().props.getOrderReturnRmaDetailsRequest;
			expect(typeof getOrderReturnRmaDetailsRequestProp).toBe('function');
		});
		test('has delivery as prop and type check', () => {
			const deliveryProp = wrapper.dive().dive().instance().props.delivery;
			expect(deliveryProp).toBeInstanceOf(Object);
		});
		test('has orderDetails as prop and  type check', () => {
			const orderDetailsProp = wrapper.dive().dive().instance().props.orderDetails;
			expect(orderDetailsProp).toBeInstanceOf(Object);
		});
		test('has products as prop and type check', () => {
			const productsProp = wrapper.dive().dive().instance().props.products;
			expect(productsProp).toBeInstanceOf(Object);
		});
		test('has isLargeEnough as prop and type check', () => {
			const isLargeEnoughProp = wrapper.dive().dive().instance().props.isLargeEnough;
			expect(typeof isLargeEnoughProp).toBe('boolean');
		});
		test('has productData as prop and type check', () => {
			const productDataProp = wrapper.dive().dive().instance().props.productData;
			expect(productDataProp).toBeInstanceOf(Array);
		});
	});
	describe('state check', () => {

		test('state value check', () => {
			const stateMock = wrapper.dive().dive().instance().state;
			expect(stateMock).toBeInstanceOf(Object);
			const showInstructionsMock= wrapper.dive().dive().instance().state.showInstructions;
			expect(typeof showInstructionsMock).toBe('boolean');
			expect(showInstructionsMock).toBe(false);
		});
	});

	describe('Functions check', () => {

		test('setstate', () => {
			wrapper.dive().dive().instance().setState({showInstructions: true});
			expect(typeof wrapper.dive().dive().instance().state.showInstructions).toBe('boolean');
		});

		test('backToOrderHistory function call', () => {
			wrapper.dive().dive().instance().backToOrderHistory();
			const closeMockCallCount = closeMock.mock.calls.length;
			expect(closeMockCallCount).not.toBe(0);
			expect(wrapper.dive().dive().instance().state.showInstructions).toBeFalsy();
		});
		test('submitReturnFormMock function call', () => {
			const values= {reason: 'reason1', quantity: 3};
			wrapper.dive().dive().instance().submitReturnForm(values);
			const returnOrderPayload = {
				requestReason: 'reason1',
				deliveryNumber: 'assdff',
				shipments: {id: 'a4d4E0000000bOxQAI', quantity: 3}
			};
			getOrderReturnRequestMock(returnOrderPayload);
		});
		test('getReturnReceipt function call', () => {
			wrapper.dive().dive().instance().getReturnReceipt();
			const shipment = {
				return_id: wrapper.dive().dive().instance().props.returnId,
				order_number: wrapper.dive().dive().instance().props.orderId
			};
			getOrderReturnRmaDetailsRequestMock(shipment);
		});
	});


	describe('component render check', () => {

		test('Card component gets rendered', () => {
			expect(wrapper.containsMatchingElement(<Card />)).toBeDefined();
		});
		test('CardContent gets rendered', () => {
			expect(wrapper.containsMatchingElement(<CardContent />)).toBeDefined();
		});
		test('ReturnInstructions gets rendered', () => {
			expect(wrapper.containsMatchingElement(<ReturnInstructions />)).toBeDefined();
		});
		test('ReturnForm gets rendered', () => {
			expect(wrapper.containsMatchingElement(<ReturnForm />)).toBeDefined();
		});
	});
});