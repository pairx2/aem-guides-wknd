import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore} from '../../../../../__mocks__/storeMock';
import DeleteOrderAddressConfirmationModal from '../../../../../modules/MyAccount/components/Modal/DeleteOrderAddressConfirmationModal';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props) => {
	const wrapper = shallow(<DeleteOrderAddressConfirmationModal store={mockStore} {...props} />).dive().dive();
	return wrapper;
};

describe('DeleteAccountAddressConfirmationModal test suite',() => {
	let props, wrapper;
	const onConfirmActionMock = jest.fn();

	beforeEach(() => {
		props = {
			onConfirmAction: onConfirmActionMock,
		};
		wrapper = setup(props);
	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
	test('removeAddress - call',() => {
		wrapper.instance().removeAddress();
	});
});