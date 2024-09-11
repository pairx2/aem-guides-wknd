import React from 'react';
import Enzyme, {mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import CartRow from '../../../../../modules/Cart/components/CartListPage/CartRow';
import {mockStore} from '../../../../../__mocks__/storeMock';
import {Provider} from 'react-redux';
jest.mock('../../../../../utils/endpointUrl');



Enzyme.configure({
	adapter: new EnzymeAdapter(),
});


describe('CartRow component Test Suite when currentProductSku !== sku', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			id: 1,
			name: 'name',
			price: 100,
			quantity: 11,
			pdpLink: 'pdpLink',
			sku: 'sku',
			uom: 10,
			taxValue:'16',
			image: 'image',
			min_sale_qty: 'min_sale_qty',
			max_sale_qty: 'max_sale_qty',
			qtyOrderMsg: 'qtyOrderMsg',
			productRemoveWarningHandler: () => {},
			removeMessage: 'removeMessage',
			currentProductSku: 'currentProductSku',
			cancelDeleteCartItem: () => {},
			isSubscription: true,
			currency: 'currency',
			priceColHeading: '',
			removeCartItem: () => {},
			deliveryDate: '05/05/2020',
			bundle: {label: 'bundle1', values: [{quantity: 2}]}
		};
		wrapper = mount(<Provider store= {mockStore}><CartRow {...props}/></Provider>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

	});
});

describe('CartRow component Test Suite when currentProductSku == sku', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			id: 1,
			name: 'name',
			price: 100,
			quantity: 11,
			pdpLink: 'pdpLink',
			sku: 'sku',
			uom: 10,
			taxValue:'16',
			image: 'image',
			min_sale_qty: 'min_sale_qty',
			max_sale_qty: 'max_sale_qty',
			qtyOrderMsg: 'qtyOrderMsg',
			productRemoveWarningHandler: () => {},
			removeMessage: 'removeMessage',
			currentProductSku: 'sku',
			cancelDeleteCartItem: () => {},
			isSubscription: true,
			currency: 'currency',
			priceColHeading: '',
			removeCartItem: () => {},
			deliveryDate: '05/05/2020',
			bundle: {label: 'bundle1', values: [{quantity: 2}]}
		};
		wrapper = mount(<Provider store= {mockStore}><CartRow {...props}/></Provider>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

	});
});

describe('CartRow component Test Suite when currentProductSku !== sku with isSubscription as false', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			id: 1,
			name: 'name',
			price: 100,
			quantity: 11,
			pdpLink: 'pdpLink',
			sku: 'sku',
			uom: 10,
			image: 'image',
			min_sale_qty: 'min_sale_qty',
			max_sale_qty: 'max_sale_qty',
			qtyOrderMsg: 'qtyOrderMsg',
			productRemoveWarningHandler: () => {},
			removeMessage: 'removeMessage',
			currentProductSku: 'currentProductSku',
			cancelDeleteCartItem: () => {},
			isSubscription: false,
			currency: 'currency',
			priceColHeading: '',
			removeCartItem: () => {},
			deliveryDate: '05/05/2020',
			bundle: {label: 'bundle1', values: [{quantity: 2}]},
			taxValue:'16'
		};
		wrapper = mount(<Provider store= {mockStore}><CartRow {...props}/></Provider>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

	});
});
