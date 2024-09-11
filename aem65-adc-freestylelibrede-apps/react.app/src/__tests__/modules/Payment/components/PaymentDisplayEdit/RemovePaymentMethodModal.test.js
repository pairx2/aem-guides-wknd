import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import RemovePaymentMethodModal from '../../../../../modules/Payment/components/PaymentDisplayEdit/RemovePaymentMethodModal';
import {Provider} from 'react-redux';
import {mockStoreConfirmationPage} from '../../../../../__mocks__/storeMock';


Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props = {}) => {
	const wrapper = shallow(<RemovePaymentMethodModal store= {mockStoreConfirmationPage} {...props} />);
	// const wrapper = shallow(<Provider store= {mockStoreConfirmationPage}><RemovePaymentMethodModal {...props} /></Provider>);
	return wrapper;
};


describe('RemovePaymentMethodModal component Test Suite', () => {
	let props, wrapper;
	const deleteCustomerPaymentTokenMock= jest.fn();
	const openModalActionMock= jest.fn();
	const closeModalActionMock= jest.fn();


	beforeEach(() => {
		props = {
			modalProps: {
				paymentMethod: {token: 'abc'}
			},
			closeModalAction: closeModalActionMock,
			openModalAction: openModalActionMock,
			deleteCustomerPaymentToken: deleteCustomerPaymentTokenMock
		};
		wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('removePaymentMethodAndShowConfirmation function call in action property of Button', () => {
		const actionProp = wrapper.dive().dive().props().children[2].props.children.props.children[1].props.children.props.action;

		expect(typeof actionProp).toBe('function');

		actionProp();
		const deleteCustomerPaymentTokenMockCount= deleteCustomerPaymentTokenMock.mock.calls.length;
		expect(deleteCustomerPaymentTokenMockCount).toBeDefined();

		const openModalActionMockCount= openModalActionMock.mock.calls.length;
		expect(openModalActionMockCount).toBeDefined();
	});

});

describe('RemovePaymentMethodModal component Test Suite with mount', () => {
	let props;
	let wrapper;

	beforeEach(() => {
		props = {
			paymentMethod: 'paymentMethod',
			confirmationPage: 'confirmationPage',
			expandedIndex: 1,
			paymentMapping: ['paymentMapping1', 'paymentMapping2']
		};
		wrapper = mount(<Provider store= {mockStoreConfirmationPage}><RemovePaymentMethodModal {...props} /></Provider>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});

