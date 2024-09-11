import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import AddToCartErrorModal from '../../../../../modules/MyAccount/components/OrderHistory/AddToCartErrorModal';
import {Provider} from 'react-redux';
import {mockStore} from '../../../../../__mocks__/storeMock';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});


describe('AddToCartErrorModal component Test Suite', () => {
	let props;
	let wrapper;

	beforeEach(() => {
		props = {
			closeModalAction: () => {},
	        errorCodes: ['errorCodes1', 'errorCodes2'],
		};
		wrapper = shallow(<Provider store= {mockStore}><AddToCartErrorModal {...props} /></Provider>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});

describe('AddToCartErrorModal component Test Suite with mount', () => {
	let props;
	let wrapper;

	beforeEach(() => {
		props = {
			closeModalAction: () => {},
	        errorCodes: ['errorCodes1', 'errorCodes2'],
		};
		wrapper = mount(<Provider store= {mockStore}><AddToCartErrorModal {...props} /></Provider>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});

