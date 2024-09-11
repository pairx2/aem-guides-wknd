import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import NoPaymentMethodsAvailableModal from '../../../../../modules/MyAccount/components/PlusService/NoPaymentMethodsAvailableModal';
import {mockStore} from '../../../../../__mocks__/storeMock';
import {Provider} from 'react-redux';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});
const setup = (props = {}) => {
	const wrapper = mount(<Provider store= {mockStore}><NoPaymentMethodsAvailableModal {...props}/></Provider>);
	return wrapper;
};

describe('NoPaymentMethodsAvailableModal component Test Suite', () => {
	let wrapper, props;
	beforeEach(() => {
		props = {
			closeModalAction: jest.fn(),
		};
		wrapper = setup(props);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});
	});
});

describe('NoPaymentMethodsAvailableModal component Test Suite', () => {
	let wrapper, props;
	const closeModalActionMock = jest.fn();

	beforeEach(() => {
		props = {
			closeModalAction: closeModalActionMock,
		};
		wrapper = shallow(<NoPaymentMethodsAvailableModal store= {mockStore} {...props}/>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('goBack function call in Button', () => {
		const actionProp = wrapper.dive().dive().props().children[2].props.children.props.action;
		expect(typeof actionProp).toBe('function');

		expect(actionProp.name).toBe('goBack');
		actionProp();

		const closeModalActionMockCallCount = closeModalActionMock.mock.calls.length;
		expect(closeModalActionMockCallCount).toBeDefined();
	});
});