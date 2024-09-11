import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStoreConfirmationPage} from '../../../../../__mocks__/storeMock';

import AccountPaymentCheckboxes from '../../../../../modules/Payment/components/PaymentDisplayEdit/AccountPaymentCheckboxes';
import {Provider} from 'react-redux';


Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

describe('AccountPaymentCheckboxes component Test Suite', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
	        isPayon: true
		};

		wrapper = shallow(<AccountPaymentCheckboxes {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

});

describe('AccountPaymentCheckboxes component Test Suite with mount', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			modalProps: {
				readerInformation: 'readerInformation',
				serviceText: 'serviceText',
				helplineNumber: 'helplineNumber',
				emailCTAStyle: 'primary',
				callCTAStyle: 'primary',
				email: 'email',
			}
		};

		wrapper = mount(<Provider store={mockStoreConfirmationPage} ><AccountPaymentCheckboxes {...props} /></Provider>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

});

