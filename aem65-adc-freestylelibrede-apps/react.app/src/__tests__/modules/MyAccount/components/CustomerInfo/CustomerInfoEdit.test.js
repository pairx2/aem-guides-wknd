import React from 'react';
import Enzyme, {shallow,mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore, mockStoreOrder} from '../../../../../__mocks__/storeMock';
import CustomerInfoEdit from '../../../../../modules/MyAccount/components/CustomerInfo/CustomerInfoEdit';
import {Provider} from 'react-redux';

jest.mock('../../../../../utils/formUtils');

//methods, props arent accesible - Blocker as of now
Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props) => {
	const wrapper = shallow(<CustomerInfoEdit store={mockStore} {...props} />).dive().dive().dive();
	return wrapper;
};

describe('CustomerInfoEdit component Test Suite ', () => {
	let props, wrapper,instance;
	const cancelEditCustomerInfoMock = jest.fn();
	const updateCustomerMock = jest.fn();
	const getNumberFromStringMock = jest.fn();

	beforeEach(() => {
		props = {
			cancelEditCustomerInfo: cancelEditCustomerInfoMock,
			updateCustomer: updateCustomerMock,
			getNumberFromString: getNumberFromStringMock,
		};
		wrapper = setup(props);
		instance = wrapper.dive().dive().dive().dive().dive().dive().dive().dive().instance();
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});
		test('customer object',() => {
			expect(typeof instance.props.customer).toBe('object');
		});
	});
	describe('function call', () => {
		test('propsDidChange', () => {
			const prevProps={
				isLoading:true
			};
			instance.propsDidChange(prevProps);
		});
		test('propsDidChange', () => {
			const prevProps={
				isLoading:false
			};
			instance.propsDidChange(prevProps);
		});

		test('componentDidUpdate', () => {
			const prevProps={
				isLoading:true
			};
			instance.componentDidUpdate(prevProps);
		});
		test('componentDidUpdate', () => {
			const prevProps={
				isLoading:false
			};
			instance.componentDidUpdate(prevProps);
		});
		test('submit', () => {
			instance.submit();
		});

	});

	describe('customerinfoedit submit', () => {

		test('mobile format variations', () => {
			wrapper.setProps({updatedCustomer: {
				landline_phone: [true, "015123123123"],
				mobile_phone: [true, "015123123123"],
				postcode: "65205",
				city: "Wiesbaden",
				street: "Max-Planck-Ring",
				"additionalAddress": "Abbott gmbh"
			  }});
			  wrapper.dive().dive().dive().dive().dive().dive().dive().dive().instance().submit();
			 wrapper.setProps({updatedCustomer: {
				landline_phone: [true, ""],
				mobile_phone: [true, ""],
				postcode: "65205",
				city: "Wiesbaden",
				street: "Max-Planck-Ring",
				"additionalAddress": "Abbott gmbh"
			  }});
			  wrapper.dive().dive().dive().dive().dive().dive().dive().dive().instance().submit();
		});

	});

});

describe('CustomerInfoEdit component Test Suite ', () => {
	let props, wrapper;
	const cancelEditCustomerInfoMock = jest.fn();
	const updateCustomerMock = jest.fn();

	beforeEach(() => {
		props = {
		cancelEditCustomerInfo: cancelEditCustomerInfoMock,
		updateCustomer: updateCustomerMock,
	};
	wrapper = mount(<Provider store={mockStoreOrder}><CustomerInfoEdit {...props} /></Provider>);
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
