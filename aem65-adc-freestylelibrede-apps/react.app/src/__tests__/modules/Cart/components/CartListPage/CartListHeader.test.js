import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import CartListHeader from '../../../../../modules/Cart/components/CartListPage/CartListHeader';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});


describe('CartListHeader component Test Suite', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			qtyColHeading: 'qtyColHeading',
			priceColHeading: 'priceColHeading',
			productColHeading: 'productColHeading',
			taxValue:'16'
		};
		wrapper = shallow(<CartListHeader {...props}/>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

	});
});
