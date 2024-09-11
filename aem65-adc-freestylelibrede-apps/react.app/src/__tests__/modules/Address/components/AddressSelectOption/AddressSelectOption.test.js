import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore} from '../../../../../__mocks__/storeMock';
import AddressSelectOption from '../../../../../modules/Address/components/AddressSelectOption/AddressSelectOption';
jest.mock('../../../../../utils/pageTypeUtils');

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props) => {
	const wrapper = shallow(<AddressSelectOption store={mockStore} {...props} />).dive().dive();
	return wrapper;
};

describe('AddressSelectOption component Test Suite ', () => {
	let props, wrapper;

	const setAddressMock = jest.fn();
	const saveAddressMock = jest.fn();
	const deleteAddressMock = jest.fn();


	beforeEach(() => {
		props = {

			address:{
				id: 4,
				addresstype: 'String',
				prefix: 'String',
				firstname: 'String',
				lastname: 'String',
				street: [
					'Street 1',
					'Street 2'
				],
				postcode: 'String',
				city: 'String',
				isNew: true,
				default_shipping:true,
				default_billing:false,
				isShipping: true
			},
			setAddress:setAddressMock,
			saveAddress:saveAddressMock(123421),
			deleteAddress:deleteAddressMock(123421),

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
	describe('method calls', () => {
		test('componentDidUpdate',() => {
			const prevProps = {
				isLoading:true,
				canSaveAsDefault: true,
				isShipping: true,
				initialValues: {},
				setAddress:setAddressMock,
				saveAddress:saveAddressMock,
				deleteAddress:deleteAddressMock,
				address:{
					id: 123421,
					addresstype: 'String',
					prefix: 'String',
					firstname: 'String',
					lastname: 'String',
					street: [
						'Street 1',
						'Street 2'
					],
					postcode: 'String',
					city: 'String',
					isNew: true,
					default_shipping:false,
					default_billing:false
				}
			};
			wrapper.instance().componentDidUpdate(prevProps);
			expect(wrapper.instance().state.editing).toBe(false);

		});
		test('componentDidUpdate',() => {
			const prevProps = {...wrapper.instance().props};
			wrapper.instance().componentDidUpdate(prevProps);
		});
		test('setEditMode',() => {
			wrapper.instance().setEditMode();
			expect(wrapper.instance().state.editing).toBe(true);
		});
		test('cancelEditMode',() => {
			wrapper.instance().cancelEditMode();
			expect(wrapper.instance().state.editing).toBe(false);
		});
		test('setAddress',() => {
			wrapper.instance().setAddress();
			const setAddressMockCount = setAddressMock.mock.calls.length;
		    expect(setAddressMockCount).not.toBe(0);
		});
	});
});

describe('AddressSelectOption component Test Suite ', () => {
	let props, wrapper;

	const setAddressMock = jest.fn();
	const saveAddressMock = jest.fn();
	const deleteAddressMock = jest.fn();


	beforeEach(() => {
		props = {
			address:{
				id: 123421,
				addresstype: 'String',
				prefix: 'String',
				firstname: 'String',
				lastname: 'String',
				street: [
					'Street 1',
					'Street 2'
				],
				postcode: 'String',
				city: 'String',
				isNew: true,
				default_shipping: false,
				default_billing: true,
			},
			setAddress:setAddressMock,
			saveAddress:saveAddressMock(123421),
			deleteAddress:deleteAddressMock(123421),

		};
		wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
});

describe('AddressSelectOption component Test Suite ', () => {
	let props, wrapper;

	const setAddressMock = jest.fn();
	const saveAddressMock = jest.fn();
	const deleteAddressMock = jest.fn();


	beforeEach(() => {
		props = {
			address:{
				id: 123421,
				addresstype: 'String',
				prefix: 'String',
				firstname: 'String',
				lastname: 'String',
				street: [
					'Street 1',
					'Street 2'
				],
				postcode: 'String',
				city: 'String',
				isNew: false,
				default_shipping: true,
				default_billing: true
			},
			setAddress:setAddressMock,
			saveAddress:saveAddressMock(123421),
			deleteAddress:deleteAddressMock(123421),

		};
		wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
});
