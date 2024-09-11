import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import CancelOrder from '../../../../../modules/MyAccount/components/CurrentOrderOverview/CancelOrder';
import {Provider} from 'react-redux';
import {mockStore} from '../../../../../__mocks__/storeMock';
jest.mock('../../../../../utils/endpointUrl');

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props= {}) => {
	const wrapper = shallow(<CancelOrder store= {mockStore} {...props}/>).dive().dive().dive().dive().dive().dive().dive().dive().dive();
	return wrapper;
};


describe('CancelOrder component Test Suite', () => {
	let props, wrapper;
	const openCancelFormMock = jest.fn();

	beforeEach(() => {

		props = {
			order: {orderType: 'abc',
				productData: [{productQuantity: 2, productName: 'productName', productSKU : 'productSKU'}],
				currentProducts: [{productQuantity: 2, productName: 'productName', productSKU : 'productSKU'}],
				serviceData: [{serviceProductQuantity: 2, serviceDuration: 1, serviceFrequency : 3,}]
			},
			cancelOrder: () => {},
			openCancelForm: openCancelFormMock,
			products: {},
			dictionary: {},
			isAccountOverviewTab: true
		};
		wrapper = mount(<Provider store={mockStore}><CancelOrder {...props}/></Provider>);
	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});

describe('CancelOrder component Test Suite', () => {
	let props, wrapper;
	const openCancelFormMock = jest.fn();

	beforeEach(() => {
		props = {
			order: {orderType: 'abc',
				productData: [{productQuantity: 2, productName: 'productName', productSKU : 'productSKU'}],
				currentProducts: [{productQuantity: 2, productName: 'productName', productSKU : 'productSKU'}],
				serviceData: [{serviceProductQuantity: 2, serviceDuration: 1, serviceFrequency : 3,}]
			},
			cancelOrder: () => {},
			openCancelForm: openCancelFormMock,
			products: {},
			dictionary: {},
			isAccountOverviewTab: false
		};
		wrapper = setup(props);
	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('openCancelForm function call in action property of Button', () => {
		 const actionProp= wrapper.props().children[2].props.children.props.children[0].props.children.props.action;
		expect(typeof actionProp).toBe('function');

		actionProp(false);
		const openCancelFormMockCallCount= openCancelFormMock.mock.calls.length;
		expect(openCancelFormMockCallCount).toBeDefined();
	});
});


