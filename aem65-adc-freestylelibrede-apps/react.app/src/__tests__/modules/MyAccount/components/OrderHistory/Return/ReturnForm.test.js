import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import ReturnForm from '../../../../../../modules/MyAccount/components/OrderHistory/Return/ReturnForm';
import {mockStore} from '../../../../../../__mocks__/storeMock';
import Col from '../../../../../../modules/Generic/components/Container/Col';
import Row from '../../../../../../modules/Generic/components/Container/Row';
import I18n from '../../../../../../modules/Translation/components/I18n';
import {For} from '../../../../../../modules/Generic/components/Logic/LogicalComponents';
import Button from '../../../../../../modules/Generic/components/Button/Button';
import HelpdeskBanner from '../../../../../../modules/MyAccount/components/OrderHistory/Return/HelpdeskBanner';
import SelectField from '../../../../../../modules/Form/components/GenericFields/SelectField';
import RadioButtonReduxField from '../../../../../../modules/Form/components/GenericFields/RadioButtonReduxField';
import {Provider} from 'react-redux';
import { isImpersonateSession } from '../../../../../../api/esl.auth.service';

jest.mock('../../../../../../utils/endpointUrl');
jest.mock('../../../../../../api/esl.auth.service');

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

const setup = (props) => {
	const wrapper = shallow(<ReturnForm store= {mockStore} {...props}/>);
	return wrapper;
};

const products = {
	'71523-01': {
		'productSku': ['71524-01', '71523-01']
	}
};

const productData = [{
	'deliverableNumber': 'DLV-000011392',
	'deliveryIdDetails': [],
	'index': 1,
	'productDateOfNextShipment': null,
	'productDueDateWindow': '14,14',
	'productName': 'FreeStyle Libre 2 Sensor',
	'productOriginalDateFrom': 1618444800000,
	'productOriginalDateOfNextShipment': null,
	'productQuantity': 5,
	'productRescheduledDueDate': null,
	'productSKU': '71523-01'
}];

describe('ReturnForm Component Test Suite', () => {
	let props, wrapper;
	beforeEach(() => {
		isImpersonateSession.mockImplementation(() => false);
		props= {
			close: jest.fn(),
	        delivery: {
				products: [
					{
						'productQuantity': 7,
						'productSKU': '71523-01',
						'shipmentId': 'a5M9E000000BRmCUAW'
					},
					{
						'productQuantity': 8,
						'productSKU': '71523-02',
						'shipmentId': 'a5M9E000001BRmCUAW'
					}
				]
			},
	        orderDetails: {},
		    deliveryOrderId: 'deliveryOrderId',
		    estimatedDeliveryDate: 19920123,
			products: products,
			productData: productData,
			returnText: 'returnText',
			isLargeEnough: false,
			values: []
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
		test('has deliveryOrderId as prop and type check', () => {
			const deliveryOrderIdProp = wrapper.dive().instance().props.deliveryOrderId;
			expect(typeof deliveryOrderIdProp).toBe('string');
		});
		test('has estimatedDeliveryDate as prop and type check', () => {
			const orderDateProp = wrapper.dive().instance().props.estimatedDeliveryDate;
			expect(typeof orderDateProp).toBe('number');
		});
		test('has returnText as prop and type check', () => {
			const returnTextProp = wrapper.dive().instance().props.returnText;
			expect(typeof returnTextProp).toBe('string');
		});
		test('has close as prop and type check', () => {
			const returnTextProp = wrapper.dive().instance().props.close;
			expect(typeof returnTextProp).toBe('function');
		});
		test('has delivery as prop and type check', () => {
			const deliveryProp = wrapper.dive().instance().props.delivery;
			expect(deliveryProp).toBeInstanceOf(Object);
		});
		test('has orderDetails as prop and  type check', () => {
			const orderDetailsProp = wrapper.dive().instance().props.orderDetails;
			expect(orderDetailsProp).toBeInstanceOf(Object);
		});
		test('has products as prop and type check', () => {
			const productsProp = wrapper.dive().instance().props.products;
			expect(productsProp).toBeInstanceOf(Object);
		});
		test('has isLargeEnough as prop and type check', () => {
			const isLargeEnoughProp = wrapper.dive().instance().props.isLargeEnough;
			expect(typeof isLargeEnoughProp).toBe('boolean');
		});
		test('has productData as prop and type check', () => {
			const productDataProp = wrapper.dive().instance().props.productData;
			expect(productDataProp).toBeInstanceOf(Array);
		});
		test('has values as prop and nd type check', () => {
			const valuesProp = wrapper.dive().instance().props.values;
			expect(valuesProp).toBeInstanceOf(Array);
		});
	});[]

	describe('component render check', () => {

		test('Col component gets rendered', () => {
			expect(wrapper.containsMatchingElement(<Col />)).toBeDefined();
		});
		test('Row gets rendered', () => {
			expect(wrapper.containsMatchingElement(<Row />)).toBeDefined();
		});
		test('I18n gets rendered', () => {
			expect(wrapper.containsMatchingElement(<I18n />)).toBeDefined();
		});
		test('Button gets rendered', () => {
			expect(wrapper.containsMatchingElement(<Button />)).toBeDefined();
		});
		test('HelpdeskBanner gets rendered', () => {
			expect(wrapper.containsMatchingElement(<HelpdeskBanner />)).toBeDefined();
		});
		test('SelectField gets rendered', () => {
			expect(wrapper.containsMatchingElement(<SelectField />)).toBeDefined();
		});
		test('RadioButtonReduxField gets rendered', () => {
			expect(wrapper.containsMatchingElement(<RadioButtonReduxField />)).toBeDefined();
		});
		test('For gets rendered', () => {
			expect(wrapper.containsMatchingElement(<For />)).toBeDefined();
		});
	});
});
describe('ReturnForm Component Test Suite', () => {
	let props, wrapper;
	beforeEach(() => {
		isImpersonateSession.mockImplementation(() => false);

		props= {
			close: jest.fn(),
	        delivery: {
				products: [
					{
						'productQuantity': 7,
						'productSKU': '12345-01',
						'shipmentId': 'a5M9E000000BRmCUAW'
					}
				]
			},
	        orderDetails: {},
		    deliveryOrderId: 'deliveryOrderId',
		    estimatedDeliveryDate: 19920123,
			products: products,
			productData: productData,
			returnText: 'returnText',
			isLargeEnough: false,
			showOrcWidget: false,
			values: {returnReason:"string"}
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
		test('has deliveryOrderId as prop and type check', () => {
			const deliveryOrderIdProp = wrapper.dive().instance().props.deliveryOrderId;
			expect(typeof deliveryOrderIdProp).toBe('string');
		});
		test('has estimatedDeliveryDate as prop and type check', () => {
			const orderDateProp = wrapper.dive().instance().props.estimatedDeliveryDate;
			expect(typeof orderDateProp).toBe('number');
		});
		test('has returnText as prop and type check', () => {
			const returnTextProp = wrapper.dive().instance().props.returnText;
			expect(typeof returnTextProp).toBe('string');
		});
		test('has close as prop and type check', () => {
			const returnTextProp = wrapper.dive().instance().props.close;
			expect(typeof returnTextProp).toBe('function');
		});
		test('has delivery as prop and type check', () => {
			const deliveryProp = wrapper.dive().instance().props.delivery;
			expect(deliveryProp).toBeInstanceOf(Object);
		});
		test('has orderDetails as prop and  type check', () => {
			const orderDetailsProp = wrapper.dive().instance().props.orderDetails;
			expect(orderDetailsProp).toBeInstanceOf(Object);
		});
		test('has products as prop and type check', () => {
			const productsProp = wrapper.dive().instance().props.products;
			expect(productsProp).toBeInstanceOf(Object);
		});
		test('has isLargeEnough as prop and type check', () => {
			const isLargeEnoughProp = wrapper.dive().instance().props.isLargeEnough;
			expect(typeof isLargeEnoughProp).toBe('boolean');
		});
		test('has productData as prop and type check', () => {
			const productDataProp = wrapper.dive().instance().props.productData;
			expect(productDataProp).toBeInstanceOf(Array);
		});
		test('has values as prop and nd type check', () => {
			const valuesProp = wrapper.dive().instance().props.values;
			expect(valuesProp).toBeInstanceOf(Object);
		});
	});

	describe('component render check', () => {

		test('Col component gets rendered', () => {
			expect(wrapper.containsMatchingElement(<Col />)).toBeDefined();
		});
		test('Row gets rendered', () => {
			expect(wrapper.containsMatchingElement(<Row />)).toBeDefined();
		});
		test('I18n gets rendered', () => {
			expect(wrapper.containsMatchingElement(<I18n />)).toBeDefined();
		});
		test('Button gets rendered', () => {
			expect(wrapper.containsMatchingElement(<Button />)).toBeDefined();
		});
		test('HelpdeskBanner gets rendered', () => {
			expect(wrapper.containsMatchingElement(<HelpdeskBanner />)).toBeDefined();
		});
		test('SelectField gets rendered', () => {
			expect(wrapper.containsMatchingElement(<SelectField />)).toBeDefined();
		});
		test('RadioButtonReduxField gets rendered', () => {
			expect(wrapper.containsMatchingElement(<RadioButtonReduxField />)).toBeDefined();
		});
		test('For gets rendered', () => {
			expect(wrapper.containsMatchingElement(<For />)).toBeDefined();
		});
	});
});
describe('ReturnForm Component Test Suite', () => {
	let props, wrapper;
	beforeEach(() => {
		isImpersonateSession.mockImplementation(() => false);

		props= {
			close: jest.fn(),
	        delivery: {
				products: [
					{
						'productQuantity': 7,
						'productSKU': '71523-01',
						'shipmentId': 'a5M9E000000BRmCUAW'
					}
				]
			},
	        orderDetails: {},
		    deliveryOrderId: 'deliveryOrderId',
		    estimatedDeliveryDate: 19920123,
			products: products,
			productData: productData,
			returnText: 'returnText',
			isLargeEnough: true,
			showOrcWidget: false,
			values: {returnReason:"string"}
		};

		wrapper= mount(<Provider store= {mockStore}><ReturnForm {...props}/></Provider>);
	});

	describe('Redux Props', () => {

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});
		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});
	});
});

describe('ORC ReturnForm Component Test Suite', () => {
	let props, wrapper;
	
	beforeEach(() => {
		isImpersonateSession.mockImplementation(() => false);
		props= {
			close: jest.fn(),
			delivery: {
				products: []
			},
			orderDetails: {},
			deliveryOrderId: 'deliveryOrderId',
			estimatedDeliveryDate: 19920123,
			products:null,
			productData: {},
			returnText: 'returnText',
			isLargeEnough: false,
			values: {returnReason: "string"},
			orcEnable: true,
			showOrcWidget: true,
			productDetails: false
		};

		wrapper= mount(<Provider store= {mockStore}><ReturnForm {...props}/></Provider>);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});
