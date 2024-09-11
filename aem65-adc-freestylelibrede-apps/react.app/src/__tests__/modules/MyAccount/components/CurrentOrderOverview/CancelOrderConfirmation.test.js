import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import {CancelOrderConfirmation} from '../../../../../modules/MyAccount/components/CurrentOrderOverview/CancelOrderConfirmation';
import {mockStore} from '../../../../../__mocks__/storeMock';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props= {}) => {
	const wrapper = shallow(<CancelOrderConfirmation store= {mockStore} {...props}/>);
	return wrapper;
};


describe('CancelOrderConfirmation component Test Suite', () => {
	let props, wrapper;
	const closeCancelConfirmationMock = jest.fn();

	beforeEach(() => {

		props = {
			closeCancelConfirmation: closeCancelConfirmationMock,
			isAccountOverviewTab: true
		};
		wrapper= setup(props);
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
describe('CancelOrderConfirmation component Test Suite', () => {
	let props, wrapper;
	const closeCancelConfirmationMock = jest.fn();

	beforeEach(() => {

		props = {
			closeCancelConfirmation: closeCancelConfirmationMock,
			isAccountOverviewTab: false
		};
		wrapper= setup(props);
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
