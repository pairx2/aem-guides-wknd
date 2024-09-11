import React from 'react';
import Enzyme, {mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore} from '../../../../../__mocks__/storeMock';
import AddressEdit from '../../../../../modules/Address/components/AddressEdit/AddressEdit';
import {Provider} from 'react-redux';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props) => {
	const wrapper = mount(<Provider store={mockStore}><AddressEdit {...props} /></Provider>);
	return wrapper;
};


describe('AddressEdit component Test Suite with mount-1', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			addressId: 3244,
			informationalMessage: 'informationalMessage',
			onSubmit: jest.fn(),
			cancelEdit: jest.fn(),
			values: {},
			canSave: true,
			hasTwoColumns: true,
			addressType:'shipping'
		};
		wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});

describe('AddressEdit component Test Suite with mount-1', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			addressId: 456,
			informationalMessage: 'informationalMessage',
			onSubmit: jest.fn(),
			cancelEdit: jest.fn(),
			values: {},
			canSave: true,
			hasTwoColumns: true,
			addressType:'billing'
		};
		wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});

describe('AddressEdit component Test Suite with mount-1', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			addressId: 5664,
			informationalMessage: 'informationalMessage',
			onSubmit: jest.fn(),
			cancelEdit: jest.fn(),
			values: {},
			canSave: true,
			hasTwoColumns: false,
			addressType:'shipping'
		};
		wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});

describe('AddressEdit component Test Suite with mount-1', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			addressId: 54747,
			informationalMessage: 'informationalMessage',
			onSubmit: jest.fn(),
			cancelEdit: jest.fn(),
			values: {},
			canSave: true,
			hasTwoColumns: false,
			addressType:'billing'
		};
		wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});