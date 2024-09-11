import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import NoCurrentOrder from '../../../../../modules/MyAccount/components/CurrentOrderOverview/NoCurrentOrder';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});


describe('NoCurrentOrder component Test Suite', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			order: {},
	        reOrder: () => {},
			isAccountOverviewTab: true
		};
		wrapper = shallow(<NoCurrentOrder {...props}/>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

	});
});

describe('NoCurrentOrder component isAccountOverviewTab set to true', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			order: {},
	        reOrder: () => {},
			customerId: "1234567890"
		};
		wrapper = shallow(<NoCurrentOrder {...props}/>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

	});
});
