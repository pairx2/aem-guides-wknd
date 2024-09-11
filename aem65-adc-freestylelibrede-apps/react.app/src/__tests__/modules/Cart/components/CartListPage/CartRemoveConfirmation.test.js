import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import CartRemoveConfirmation from '../../../../../modules/Cart/components/CartListPage/CartRemoveConfirmation';


Enzyme.configure({
	adapter: new EnzymeAdapter(),
});


describe('CartRemoveConfirmation component Test Suite', () => {
	let props, wrapper;
	const removeCartItemMock = jest.fn();
	const cancelDeleteCartItemMock = jest.fn();

	beforeEach(() => {

		props = {
			productID: 11,
			removeCartItem: removeCartItemMock,
			cancelDeleteCartItem: cancelDeleteCartItemMock,
			warningText: 'warningText'
		};
		wrapper = shallow(<CartRemoveConfirmation {...props}/>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('remove action in first Button test', () => {
			const actionProp = wrapper.props().children.props.children[1].props.children[0].props.action;
			expect(actionProp.name).toBe('remove');
			actionProp();

			const removeCartItemMockCallCount = removeCartItemMock.mock.calls.length;
			expect(removeCartItemMockCallCount).toBeDefined();
			expect(removeCartItemMockCallCount).not.toBe(0);

			const cancelDeleteCartItemMockCallCount = cancelDeleteCartItemMock.mock.calls.length;
			expect(cancelDeleteCartItemMockCallCount).toBeDefined();
			expect(cancelDeleteCartItemMockCallCount).not.toBe(0);
		});

		test('remove action in second Button test', () => {
			const actionProp = wrapper.props().children.props.children[1].props.children[1].props.action;
			actionProp();

			const cancelDeleteCartItemMockCallCount = cancelDeleteCartItemMock.mock.calls.length;
			expect(cancelDeleteCartItemMockCallCount).toBeDefined();
			expect(cancelDeleteCartItemMockCallCount).not.toBe(0);
		});

	});
});
