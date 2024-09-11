import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStoreConfirmationPage} from '../../../../../__mocks__/storeMock';

import DeactivateGhostOrder from '../../../../../modules/MyAccount/components/PrescriptionAccount/DeactivateGhostOrder';
import {Provider} from 'react-redux';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props = {}) => {
	const wrapper = shallow(<DeactivateGhostOrder store= {mockStoreConfirmationPage} {...props} />);
	return wrapper;
};

describe('DeactivateGhostOrder component Test Suite with mount', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			modalProps: {serviceToDate: 2},
			closeModalAction: () => {},
			ghostOrdersDeactivate: () => {},
			orderId: 'orderId'
		};
		wrapper = mount(<Provider store={mockStoreConfirmationPage} ><DeactivateGhostOrder {...props} /></Provider>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

	});
});

describe('DeactivateGhostOrder component Test Suite with mount', () => {
	let props, wrapper;
	const ghostOrdersDeactivateMock = jest.fn();

	beforeEach(() => {

		props = {
			modalProps: {serviceToDate: 2},
			closeModalAction: () => {},
			ghostOrdersDeactivate: ghostOrdersDeactivateMock,
			orderId: 'orderId'
		};
		wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('deactivateGhostOrderData function call in action property of Button', () => {
		const actionProp = wrapper.dive().dive().props().children[2].props.children[1].props.action;
		expect(typeof actionProp).toBe('function');

		actionProp();
		const ghostOrdersDeactivateMockCount= ghostOrdersDeactivateMock.mock.calls.length;
		expect(ghostOrdersDeactivateMockCount).toBeDefined();
	});
});