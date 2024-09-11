import React from 'react';
import Enzyme, {mount, shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux';
import DeletePlusServiceModal from '../../../../../modules/MyAccount/components/PlusService/DeletePlusServiceModal';
import {mockStore, mockStoreConfirmationPage} from '../../../../../__mocks__/storeMock';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

const setup = (props) => {
	const wrapper = mount(<Provider store={mockStore}><DeletePlusServiceModal {...props} /></Provider>);
	return wrapper;
};

const setupTwo = (props) => {
	const wrapper = shallow(<DeletePlusServiceModal store={mockStoreConfirmationPage} {...props} />);
	return wrapper;
};

describe('DeletePlusServiceModal component Test Suite', () => {
	let wrapper, props;
	beforeEach(() => {
		props = {
			closeModalAction: jest.fn(),
			deletePlusServiceRequest: jest.fn(),
			orderId: 'qewrr233'
		};
		wrapper = setup(props);
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

describe('DeletePlusServiceModal component Test Suite', () => {
	let wrapper, props;
	const deletePlusServiceRequestMock = jest.fn();

	beforeEach(() => {
		props = {
			closeModalAction: jest.fn(),
			deletePlusServiceRequest: deletePlusServiceRequestMock,
			orderId: 'qewrr233'
		};
		wrapper = setupTwo(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('renders without crashing', () => {
		const actionProp = wrapper.dive().dive().props().children[2].props.children.props.children[1].props.children.props.action;
		expect(typeof actionProp).toBe('function');

		actionProp('Cancelled', 'orderId');
		const deletePlusServiceRequestMockCallCount= deletePlusServiceRequestMock.mock.calls.length;
		expect(deletePlusServiceRequestMockCallCount).toBeDefined();
	});
});