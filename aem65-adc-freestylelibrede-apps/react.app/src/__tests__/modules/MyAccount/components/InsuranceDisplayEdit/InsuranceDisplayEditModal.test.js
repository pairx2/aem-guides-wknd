import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import InsuranceDisplayEditModal from '../../../../../modules/MyAccount/components/InsuranceDisplayEdit/InsuranceDisplayEditModal';
import {mockStore} from '../../../../../__mocks__/storeMock';
import {Provider} from 'react-redux';


Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props) => {
	const wrapper = shallow(<InsuranceDisplayEditModal store={mockStore} {...props} />).dive().dive();
	return wrapper;
};

describe('InsuranceDisplayEditModal Component Test Suite', () => {

	let props, wrapper;
	const closeModalActionMock = jest.fn();
	const updatePayerRequestSuccessMock = jest.fn();

	beforeEach(() => {

		props = {
			closeModalAction: closeModalActionMock,
			updatePayerRequestSuccess: updatePayerRequestSuccessMock,
			insuranceDisplayHeading: 'insuranceDisplayHeading',
			insuranceDisplayButtonText: 'insuranceDisplayButtonText'
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

		test('has insuranceDisplayHeading as prop check',() => {
			const insuranceDisplayHeadingProp = wrapper.instance().props.insuranceDisplayHeading;
			expect(typeof insuranceDisplayHeadingProp).toBe('string');
		});

		test('has insuranceDisplayButtonText as prop and type check',() => {
			const insuranceDisplayButtonTextProp = wrapper.instance().props.insuranceDisplayButtonText;
			expect(typeof insuranceDisplayButtonTextProp).toBe('string');
		});

		test('has modalProps as prop and type check',() => {
			const modalPropsProp = wrapper.instance().props.modalProps;
			expect(modalPropsProp).toBeInstanceOf(Object);
		});

		test('has closeModalAction as prop and type check',() => {
			const closeModalActionProp = wrapper.instance().props.closeModalAction;
			expect(typeof closeModalActionProp).toBe('function');
		});

		test('has updatePayerRequestSuccess as prop and type check',() => {
			const updatePayerRequestSuccessProp = wrapper.instance().props.updatePayerRequestSuccess;
			expect(typeof updatePayerRequestSuccessProp).toBe('function');
		});
	});

	describe('functions check', () => {

		test('handleAction function call check', () => {
			const handleActionProp = wrapper.instance().handleAction;
			expect(typeof handleActionProp).toBe('function');

			handleActionProp();
			const closeModalActionMockCallCount = closeModalActionMock.mock.calls.length;
			expect(closeModalActionMockCallCount).toBeDefined();

			const updatePayerRequestSuccessMockCallCount = updatePayerRequestSuccessMock.mock.calls.length;
			expect(updatePayerRequestSuccessMockCallCount).toBeDefined();
		});
	});
});

describe('InsuranceDisplayEditModal Component Test Suite', () => {

	let props, wrapper;
	const closeModalActionMock = jest.fn();
	const updatePayerRequestSuccessMock = jest.fn();

	beforeEach(() => {

		props = {
			closeModalAction: closeModalActionMock,
			updatePayerRequestSuccess: updatePayerRequestSuccessMock,
			insuranceDisplayHeading: 'insuranceDisplayHeading',
			insuranceDisplayButtonText: 'insuranceDisplayButtonText'
		};
		wrapper = mount(<Provider store={mockStore}><InsuranceDisplayEditModal {...props} /></Provider>);
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