import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import CartRowPrice from '../../../../../modules/Cart/components/CartListPage/CartRowPrice';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});


describe('CartRowPrice component Test Suite', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			price: 101,
			quantity: 11,
			currency: 'currency',
			priceColHeading: 'priceColHeading',
			taxValue:'16'

		};
		wrapper = shallow(<CartRowPrice {...props}/>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

	});
});
