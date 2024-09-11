import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import RemovePaymentMethodConfirmationModal from '../../../../../modules/Payment/components/PaymentDisplayEdit/RemovePaymentMethodConfirmationModal';
import {Provider} from 'react-redux';
import {mockStore, mockStoreOrder} from '../../../../../__mocks__/storeMock';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});


describe('RemovePaymentMethodConfirmationModal component Test Suite', () => {
	let props;
	let wrapper;

	beforeEach(() => {
		props = {
			closeModalAction: () => {}
		};
		wrapper = shallow(<Provider store= {mockStore}><RemovePaymentMethodConfirmationModal {...props} /></Provider>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});

describe('RemovePaymentMethodConfirmationModal component Test Suite with mount', () => {
	let props;
	let wrapper;

	beforeEach(() => {
		props = {
			closeModalAction: () => {}
		};
		wrapper = mount(<Provider store= {mockStore}><RemovePaymentMethodConfirmationModal {...props} /></Provider>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});
describe('RemovePaymentMethodConfirmationModal component Test Suite with mount', () => {
	let props;
	let wrapper;

	beforeEach(() => {
		props = {
			closeModalAction: () => {}
		};
		wrapper = mount(<Provider store= {mockStoreOrder}><RemovePaymentMethodConfirmationModal {...props} /></Provider>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});

