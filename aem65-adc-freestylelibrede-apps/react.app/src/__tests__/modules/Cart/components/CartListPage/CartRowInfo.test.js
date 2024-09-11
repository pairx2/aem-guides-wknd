import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import CartRowInfo from '../../../../../modules/Cart/components/CartListPage/CartRowInfo';



Enzyme.configure({
	adapter: new EnzymeAdapter(),
});


describe('CartRowInfo component Test Suite with pdpLink', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			name: 'name',
			uom: 11,
			pdpLink: 'pdpLink',
			isSubscription:true,
			deliveryDate: '05/05/2020',
			bundle: {label: 'bundle1', values: [{quantity: 2}]}
		};
		wrapper = shallow(<CartRowInfo {...props}/>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

	});
});

describe('CartRowInfo component Test Suite without pdpLink', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			name: 'name',
			uom: 11,
			pdpLink: '',
			isSubscription: true,
			deliveryDate: '05/05/2020',
			bundle: {label: 'bundle1', values: [{quantity: 2}]}
		};
		wrapper = shallow(<CartRowInfo {...props}/>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

	});
});

