import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStoreConfirmationPage} from '../../../../../__mocks__/storeMock';

import PaymentMethod from '../../../../../modules/Payment/components/PaymentDisplayEdit/PaymentMethod';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});
const setup = (props = {}) => {
	const wrapper = shallow(<PaymentMethod store={mockStoreConfirmationPage} {...props} />);
	return wrapper;
};

describe('PaymentMethod component Test Suite with paymentMethod object & isDefault and isEnableDesign are false', () => {
	let props, wrapper;
	const openModalActionMock = jest.fn();

	beforeEach(() => {
		props = {
			openModalAction: openModalActionMock,
			isDefault: false,
			paymentMethod: {'paymentMethod': 'paymentMethod1'},
			width: 1,
			title: 'title',
			style: {'style': 'style1'},
			paymentEditUrl: 'paymentEditUrl',
			isEnableDesign: false,
		};
		wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('render check', () => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('action prop of Link component', () => {
		const linkComponent = wrapper.dive().props().children[1].props.children.type.name;
		expect(linkComponent).toBe('Link');

		const actionProp = wrapper.dive().props().children[1].props.children.props.action;
		expect(typeof actionProp).toBe('function');

		actionProp();
		const openModalActionMockCount= openModalActionMock.mock.calls.length;
		expect(openModalActionMockCount).toBeDefined();
	});

});

describe('PaymentMethod component Test Suite with empty paymentMethod object & isDefault and isEnableDesign are false', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			openModalAction: () => {},
			isDefault: false,
			paymentMethod: {},
			width: 1,
			title: 'title',
			style: {'style': 'style1'},
			paymentEditUrl: 'paymentEditUrl',
			isEnableDesign: false,
		};
		wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('render check', () => {
		expect(wrapper.type()).not.toEqual(null);
	});

});

describe('PaymentMethod component Test Suite with paymentMethod object & isDefault is false and isEnableDesign is true', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			openModalAction: () => {},
			isDefault: false,
			paymentMethod: {},
			width: 1,
			title: 'title',
			style: {'style': 'style1'},
			paymentEditUrl: 'paymentEditUrl',
			isEnableDesign: true,
		};
		wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('render check', () => {
		expect(wrapper.type()).not.toEqual(null);
	});

});

