import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import DeleteCartItem from '../../../../../modules/Cart/components/MiniCart/DeleteCartItem';
import {mockStore} from '../../../../../__mocks__/storeMock';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});
const setup = (props) => {
	const wrapper = shallow(<DeleteCartItem store={mockStore} {...props} />).dive();
	return wrapper;
};

describe('DeleteCartItem Component Test Suite' , () => {
	let props, wrapper;
	const removeCartItemMock = jest.fn();

	beforeEach(() => {
		props = {
			productID: 1,
			removeCartItem: removeCartItemMock
		};
		wrapper = setup(props);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('onclick',() => {
		const onClickProp= wrapper.props().onClick;
		expect(typeof onClickProp).toBe('function');

		onClickProp();
		const removeCartItemMockCallCount = removeCartItemMock.mock.calls.length;
		expect(removeCartItemMockCallCount).toBeDefined();
	});
});