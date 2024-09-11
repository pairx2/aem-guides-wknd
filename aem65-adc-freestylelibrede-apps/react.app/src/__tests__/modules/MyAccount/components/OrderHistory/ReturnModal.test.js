import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import ReturnModal from '../../../../../modules/MyAccount/components/OrderHistory/ReturnModal';
import {Provider} from 'react-redux';
import {mockStore} from '../../../../../__mocks__/storeMock';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props= {}) => {
	const wrapper = shallow(<ReturnModal store= {mockStore} {...props}/>);
	return wrapper;
};

describe('ReturnModal component Test Suite when isCurrentOrderReturnFlow is true', () => {
	let props;
	let wrapper;

	beforeEach(() => {
		props = {
			closeModalAction: () => {},
			openReturnFormRequest: () => {},
			openCurrentOrderReturnFormRequest: () => {},
			productData: {'productData': 'productData1'},
			delivery: {'delivery': 'delivery1'},
			orderDetails: {'orderDetails': 'orderDetails1'},
			isCurrentOrderReturnFlow: true,
		};
		wrapper = setup(props);
		// wrapper = shallow(<Provider store= {mockStore}><ReturnModal {...props} /></Provider>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('action prop of Button component', () => {
		const actionProp = wrapper.dive().props().children[3].props.children.props.action;
		expect(typeof actionProp).toBe('function');

		const actionNameProp = wrapper.dive().props().children[3].props.children.props.action.name;
		expect(actionNameProp).toBe('confirmAndClose');

		const productData= wrapper.props().productData;
		const delivery= wrapper.props().delivery;
		const orderDetails= wrapper.props().orderDetails;

		wrapper.dive().props().children[3].props.children.props.action();

		wrapper.props().isCurrentOrderReturnFlow ?
			wrapper.props().openCurrentOrderReturnFormRequest({
				productData,
				delivery,
				orderDetails
			})
			:
			wrapper.props().openReturnFormRequest({
				productData,
				delivery,
				orderDetails
			});
		wrapper.props().closeModalAction();
	});

});

describe('ReturnModal component Test Suite when isCurrentOrderReturnFlow is false', () => {
	let props;
	let wrapper;

	beforeEach(() => {
		props = {
			closeModalAction: () => {},
			openReturnFormRequest: () => {},
			openCurrentOrderReturnFormRequest: () => {},
			productData: {'productData': 'productData1'},
			delivery: {'delivery': 'delivery1'},
			orderDetails: {'orderDetails': 'orderDetails1'},
			isCurrentOrderReturnFlow: false,
		};
		wrapper = setup(props);
		// wrapper = shallow(<Provider store= {mockStore}><ReturnModal {...props} /></Provider>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('action prop of Button component', () => {
		const actionProp = wrapper.dive().props().children[3].props.children.props.action;
		expect(typeof actionProp).toBe('function');

		const actionNameProp = wrapper.dive().props().children[3].props.children.props.action.name;
		expect(actionNameProp).toBe('confirmAndClose');

		const productData= wrapper.props().productData;
		const delivery= wrapper.props().delivery;
		const orderDetails= wrapper.props().orderDetails;

		wrapper.dive().props().children[3].props.children.props.action();

		wrapper.props().isCurrentOrderReturnFlow ?
			wrapper.props().openCurrentOrderReturnFormRequest({
				productData,
				delivery,
				orderDetails
			})
			:
			wrapper.props().openReturnFormRequest({
				productData,
				delivery,
				orderDetails
			});
		wrapper.props().closeModalAction();
	});

});

describe('ReturnModal component Test Suite with mount', () => {
	let props;
	let wrapper;

	beforeEach(() => {
		props = {
			closeModalAction: () => {},
			openReturnFormRequest: () => {},
			openCurrentOrderReturnFormRequest: () => {},
			productData: {},
			delivery: {},
			orderDetails: {},
			isCurrentOrderReturnFlow: true,
		};
		wrapper = mount(<Provider store= {mockStore}><ReturnModal {...props} /></Provider>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});

