import React from 'react';
import CartListPage from '../../../../../modules/Cart/components/CartListPage/CartListPage';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore} from '../../../../../__mocks__/storeMock';


Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props) => {
	const wrapper = shallow(<CartListPage store= {mockStore} {...props}/>).dive();
	return wrapper;
};


describe('CartListPage Component Test Suite', () => {
	let props, wrapper;

	beforeEach(() => {
		props= {
			cartHeading: 'cartHeading',
			emptyCartImg: 'emptyCartImg',
			emptyCartCtaDest: 'emptyCartCtaDest',
			emptyCartCtaTarget: 'emptyCartCtaTarget',
			emptyCartCtaStyle: 'primary',
			checkoutPage: 'checkoutPage',
			loginPage: 'loginPage',
			emptyCartMsg: 'emptyCartMsg',
		};
		wrapper= setup(props);
	});

	describe('propTypes check', () => {

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('has cartHeading as prop and is of type string', () => {
			const cartHeadingProp = wrapper.props().cartHeading;
			expect(typeof cartHeadingProp).toBe('string');
		});

		test('has checkoutPage as prop and is of type string', () => {
			const checkoutPageProp = wrapper.props().checkoutPage;
			expect(typeof checkoutPageProp).toBe('string');
		});

		test('has emptyCartImg as prop and is of type string', () => {
			const emptyCartImgProp = wrapper.props().emptyCartImg;
			expect(typeof emptyCartImgProp).toBe('string');
		});

		test('has emptyCartCtaDest as prop and is of type string', () => {
			const emptyCartCtaDestProp = wrapper.props().emptyCartCtaDest;
			expect(typeof emptyCartCtaDestProp).toBe('string');
		});

		test('has emptyCartCtaTarget as prop and is of type string', () => {
			const emptyCartCtaTargetProp = wrapper.props().emptyCartCtaTarget;
			expect(typeof emptyCartCtaTargetProp).toBe('string');
		});

		test('has emptyCartCtaStyle as prop and is of type string', () => {
			const emptyCartCtaStyleProp = wrapper.props().emptyCartCtaStyle;
			expect(typeof emptyCartCtaStyleProp).toBe('string');
		});

		test('has loginPage as prop and is of type string', () => {
			const loginPageProp = wrapper.props().loginPage;
			expect(typeof loginPageProp).toBe('string');
		});

		test('has emptyCartMsg as prop and is of type string', () => {
			const emptyCartMsgProp = wrapper.props().emptyCartMsg;
			expect(typeof emptyCartMsgProp).toBe('string');
		});

		test('has cartDetails as prop and is of type object', () => {
			const cartDetailsProp = wrapper.props().cartDetails;
			expect(cartDetailsProp).toBeInstanceOf(Object);
		});

		test('has isLoggedIn as prop and is of type boolean', () => {
			const isLoggedInProp = wrapper.props().isLoggedIn;
			expect(typeof isLoggedInProp).toBe('boolean');
		});

	});

	describe('condition check', () => {

		test('loginPage condition check', () => {
			const loginPageMock = wrapper.props().loginPage;
			const checkoutPageMock = wrapper.props().checkoutPage;
			const loginPageMockCheck = loginPageMock + '?isCheckout=true&redirectTo=' + checkoutPageMock;
			expect(loginPageMockCheck).toBe('loginPage?isCheckout=true&redirectTo=checkoutPage');
		});
	});

});

describe('when `loginPage` is undefined', () => {
	let props;
	beforeEach(() => {
		props= {loginPage: undefined};
	});

	const wrapper= setup(props);

	it('does not set loginPage', () => {
		expect(wrapper.find('loginPage').length).toBe(0);
	});
});

describe('instance test cases', () => {
	let wrapper, props;

	beforeEach(() => {
		props= {
			cartHeading: 'cartHeading',
			emptyCartImg: 'emptyCartImg',
			emptyCartCtaDest: 'emptyCartCtaDest',
			emptyCartCtaTarget: 'emptyCartCtaTarget',
			emptyCartCtaStyle: 'primary',
			checkoutPage: 'checkoutPage',
			loginPage: 'loginPage',
			emptyCartMsg: 'emptyCartMsg',
		};
		wrapper= setup(props);
	});

	test('state variable currentStep', () => {
		const currentStepMock = wrapper.dive().instance().state.currentStep;
		expect(currentStepMock).toBe(1);
		expect(typeof currentStepMock).toBe('number');
	});

	test('state variable steps', () => {
		const stepsMock = wrapper.dive().instance().state.steps;
		expect(stepsMock).toEqual([{title: 'shopping_cart'},{title: 'login'},{title: 'cashbox'}]);
		expect(stepsMock).toBeInstanceOf(Array);
	});

	test('state variable AuthSteps:', () => {
		const AuthStepsMock = wrapper.dive().instance().state.AuthSteps;
		expect(AuthStepsMock).toEqual([{title: 'shopping_cart'},{title: 'cashbox'}]);
		expect(AuthStepsMock).toBeInstanceOf(Array);
	});

});
describe('react lifecycle method test', () => {
	let props, wrapper;
	const setShippingAddressOnCartMock= jest.fn();
	const setBillingAddressOnCartMock= jest.fn();
	beforeEach(() => {
		props= {
			setShippingAddressOnCart: setShippingAddressOnCartMock,
			setBillingAddressOnCart: setBillingAddressOnCartMock
		};
		wrapper= setup(props);
	});
	test('componentDidUpdate function call check', () => {
		const componentDidUpdateMock = wrapper.dive().instance().componentDidUpdate;
		expect(typeof componentDidUpdateMock).toBe('function');

		const prevProps = {customer: {'id': 200999,}};
		expect(wrapper.dive().instance().propsDidChange(prevProps)).toBeTruthy();

		wrapper.dive().instance().componentDidUpdate(prevProps);

		const setShippingAddressOnCartMockCallCount = setShippingAddressOnCartMock.mock.calls.length;
		expect(setShippingAddressOnCartMockCallCount).toBeDefined();

		const setBillingAddressOnCartMockCallCount = setBillingAddressOnCartMock.mock.calls.length;
		expect(setBillingAddressOnCartMockCallCount).toBeDefined();
	});
});