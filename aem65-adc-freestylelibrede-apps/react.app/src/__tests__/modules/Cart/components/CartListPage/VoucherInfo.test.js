import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import VoucherInfo from '../../../../../modules/Cart/components/CartListPage/VoucherInfo';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});


describe('VoucherInfo component Test Suite', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			voucherMsg: 'voucherMsg'
		};
		wrapper = shallow(<VoucherInfo {...props}/>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

	});
});
