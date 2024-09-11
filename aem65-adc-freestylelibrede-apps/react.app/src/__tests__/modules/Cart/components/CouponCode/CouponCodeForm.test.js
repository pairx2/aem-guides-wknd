import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import CouponCodeForm from '../../../../../modules/Cart/components/CouponCode/CouponCodeForm';
import {mockStore, mockStoreOrder} from '../../../../../__mocks__/storeMock';
jest.mock('../../../../../utils/endpointUrl.js');
jest.mock('../../../../../utils/pageTypeUtils.js');

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

const setup = (props) => {
	const wrapper = shallow(<CouponCodeForm store= {mockStore} {...props}/>).dive().dive();
	return wrapper;
};

const setupTwo = (props) => {
	const wrapper = shallow(<CouponCodeForm store= {mockStoreOrder} {...props}/>).dive().dive();
	return wrapper;
};

describe('CouponCodeForm component Test Suite', () => {
	let props;
	let wrapper;
	const addCouponToCartRequestMock = jest.fn();
	const openModalActionMock = jest.fn();
	const resetErrorMock = jest.fn();

	beforeEach(() => {
		props = {
			componentHeading:'String',
			confirmCtaStyling: 'primary',
			redeemCtaStyling:'primary',
			confirmationHeading: 'String',
			openModalAction: openModalActionMock,
			addCouponToCartRequest: addCouponToCartRequestMock,
			resetError: resetErrorMock,
		};
		wrapper = setup(props);

	});

	describe('render &  props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('cartDetails object',() => {
			expect(typeof wrapper.instance().props.cartDetails).toBe('object');
		});


	});
	describe('lifecycle methods check', () => {
		test('propsDidChange',() => {
			const prevProps = {
				componentHeading:'a',
				confirmCtaStyling: 'b',
				redeemCtaStyling:'c',
				confirmationHeading: 'd',
				openModalAction: openModalActionMock,
				addCouponToCartRequest: addCouponToCartRequestMock,
				resetError: resetErrorMock,
				cartDetails:{}
			};
			const didChange = wrapper.instance().propsDidChange(prevProps);
			expect(didChange).toBe(true);
		});
		test('componentdidUpdate when propsDidChange true',() => {
			const prevProps = {
				componentHeading:'a',
				confirmCtaStyling: 'b',
				redeemCtaStyling:'c',
				confirmationHeading: 'd',
				openModalAction: openModalActionMock,
				addCouponToCartRequest: addCouponToCartRequestMock,
				resetError: resetErrorMock,
				cartDetails:{}

			};
			wrapper.instance().componentDidUpdate(prevProps);
		});
		test('componentdidUpdate when propsDidChange false',() => {
			const prevProps = {...wrapper.instance.props};
			wrapper.instance().componentDidUpdate(prevProps);
		});
	});
	describe('method calls',() => {

		test('onChangeHandler',() => {
			wrapper.instance().onChangeHandler();
			expect(wrapper.instance().state.isCouponInCart).toBe(false);
			expect(wrapper.instance().state.isError).toBe(false);
			expect(wrapper.instance().state.isEmptyField).toBe(false);
		});
		test('setAppliedCouponHandler',() => {
			wrapper.instance().setAppliedCouponHandler(true);
			expect(wrapper.instance().state.isCouponInCart).toBe(true);
		});
		test('submit',() => {
			const value = {
				CouponCodeField:'qw23ed'
			};
			wrapper.instance().submit(value);
			expect(wrapper.instance().state.isCouponInCart).toBe(true);
		});
		test('applyCouponCode',() => {
			wrapper.instance().applyCouponCode('qw23ed');
			expect(wrapper.instance().state.isCouponInCart).toBe(true);
		});

		test('applyCouponCode without argument',() => {
			wrapper.instance().applyCouponCode();
			expect(wrapper.instance().state.isEmptyField).toBeTruthy();
		});

		test('setEmptyFieldError',() => {
			wrapper.instance().setEmptyFieldError(true);
			expect(wrapper.instance().state.isEmptyField).toBeTruthy();
		});

	});
});

describe('CouponCodeForm component Test Suite', () => {
	let props;
	let wrapper;
	// const getCustomerCartRequestMock = jest.fn();
	const addCouponToCartRequestMock = jest.fn();
	const openModalActionMock = jest.fn();
	const resetErrorMock = jest.fn();

	beforeEach(() => {
		props = {
			componentHeading:'String',
			confirmCtaStyling: 'primary',
			redeemCtaStyling:'primary',
			confirmationHeading: 'String',
			openModalAction: openModalActionMock,
			addCouponToCartRequest: addCouponToCartRequestMock,
			resetError: resetErrorMock,
		};
		wrapper = setupTwo(props);

	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('componentdidUpdate when propsDidChange true',() => {
		const prevProps = {
			componentHeading:'a',
			confirmCtaStyling: 'b',
			redeemCtaStyling:'c',
			confirmationHeading: 'd',
			openModalAction: openModalActionMock,
			addCouponToCartRequest: addCouponToCartRequestMock,
			resetError: resetErrorMock,
			cartDetails:{}

		};
		wrapper.instance().componentDidUpdate(prevProps);
	});

	test('onChangeHandler',() => {
		wrapper.instance().onChangeHandler();
		expect(wrapper.instance().state.isCouponInCart).toBe(false);
		expect(wrapper.instance().state.isError).toBe(false);
		expect(wrapper.instance().state.isEmptyField).toBe(false);

		const resetErrorMockCallCount = resetErrorMock.mock.calls.length;
		expect(resetErrorMockCallCount).toBeDefined();
	});

	test('applyCouponCode',() => {
		wrapper.instance().applyCouponCode('coupon');
		const addCouponToCartRequestCallCount = addCouponToCartRequestMock.mock.calls.length;
		expect(addCouponToCartRequestCallCount).toBeDefined();
	});

});


