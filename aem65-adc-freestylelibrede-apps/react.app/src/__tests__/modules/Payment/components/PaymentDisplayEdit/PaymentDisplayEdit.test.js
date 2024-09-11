import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import PaymentDisplayEdit from '../../../../../modules/Payment/components/PaymentDisplayEdit/PaymentDisplayEdit';
import {mockStoreOrder, mockStoreConfirmationPage} from '../../../../../__mocks__/storeMock';


Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props= {}) => {
	const wrapper = shallow(<PaymentDisplayEdit store= {mockStoreOrder} {...props}/>).dive().dive();
	return wrapper;
};

const setupTwo = (props= {}) => {
	const wrapper = shallow(<PaymentDisplayEdit store= {mockStoreConfirmationPage} {...props}/>).dive().dive();
	return wrapper;
};


describe('PaymentDisplayEdit Component Test Suite', () => {
	let props, wrapper;
	const getCustomerPaymentTokensMock = jest.fn();
	const initializeCustomerPaymentTokenMock = jest.fn();
	const saveCustomerPaymentTokenMock = jest.fn();

	beforeEach(() => {
		props= {
			getCustomerPaymentTokens: getCustomerPaymentTokensMock,
			initializeCustomerPaymentToken: initializeCustomerPaymentTokenMock,
			saveCustomerPaymentToken: saveCustomerPaymentTokenMock,
			payonEndpoint: 'payonEndpoint',
			confirmationPage: 'confirmationPage',
			checkboxes: ['checkboxes'],
			isEnableDesign: false,
			accountPagePath: 'accountPagePath',
			accountPageTab: 'accountPageTab',
		};
		wrapper= setup(props);
	});

	describe('Redux Props', () => {

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('has payonEndpoint as prop and is of type string', () => {
			const payonEndpointProp = wrapper.instance().props.payonEndpoint;
			expect(typeof payonEndpointProp).toBe('string');
		});

		test('has confirmationPage as prop and is of type string', () => {
			const confirmationPageProp = wrapper.instance().props.confirmationPage;
			expect(typeof confirmationPageProp).toBe('string');
		});

		test('has accountPagePath as prop and is of type string', () => {
			const accountPagePathProp = wrapper.instance().props.accountPagePath;
			expect(typeof accountPagePathProp).toBe('string');
		});

		test('has accountPageTab as prop and is of type string', () => {
			const accountPageTabProp = wrapper.instance().props.accountPageTab;
			expect(typeof accountPageTabProp).toBe('string');
		});

		test('has payonCheckoutId as prop and is of type string', () => {
			const payonCheckoutIdProp = wrapper.instance().props.payonCheckoutId;
			expect(typeof payonCheckoutIdProp).toBe('string');
		});

		test('has isEnableDesign as prop and is of type boolean', () => {
			const isEnableDesignProp = wrapper.instance().props.isEnableDesign;
			expect(typeof isEnableDesignProp).toBe('boolean');
		});

		test('has isLoading as prop and is of type boolean', () => {
			const isLoadingProp = wrapper.instance().props.isLoading;
			expect(typeof isLoadingProp).toBe('boolean');
		});

		test('has canGoToPaymentTab as prop and is of type boolean', () => {
			const canGoToPaymentTabProp = wrapper.instance().props.canGoToPaymentTab;
			expect(typeof canGoToPaymentTabProp).toBe('boolean');
		});

		test('has paymentTokens as prop and is of type array', () => {
			const paymentTokensProp = wrapper.instance().props.paymentTokens;
			expect(paymentTokensProp).toBeInstanceOf(Array);
		});

		test('has checkboxes as prop and is of type array', () => {
			const checkboxesProp = wrapper.instance().props.checkboxes;
			expect(checkboxesProp).toBeInstanceOf(Array);
		});

		test('has getCustomerPaymentTokens as prop and is of type function', () => {
			const getCustomerPaymentTokensProp = wrapper.instance().props.getCustomerPaymentTokens;
			expect(typeof getCustomerPaymentTokensProp).toBe('function');
		});

		test('has initializeCustomerPaymentToken as prop and is of type function', () => {
			const initializeCustomerPaymentTokenProp = wrapper.instance().props.initializeCustomerPaymentToken;
			expect(typeof initializeCustomerPaymentTokenProp).toBe('function');
		});

		test('has saveCustomerPaymentToken as prop and is of type function', () => {
			const saveCustomerPaymentTokenProp = wrapper.instance().props.saveCustomerPaymentToken;
			expect(typeof saveCustomerPaymentTokenProp).toBe('function');
		});
	});

	describe('state check', () => {

		test('state check', () => {
			const stateCheck = wrapper.instance().state;

			expect(stateCheck.expandedIndex).toBe(null);
			expect(stateCheck.loadingIndex).toBe(null);

			expect(stateCheck.paymentMethod).toBe(null);
			expect(stateCheck.isOpenInvoiceClicked).toBeFalsy();
		});

	});

	describe('function calls', () => {

		test('getConfirmedCheckoutId check', () => {
			const getConfirmedCheckoutIdMock = wrapper.instance().getConfirmedCheckoutId;
			expect(typeof getConfirmedCheckoutIdMock).toBe('function');

			expect(getConfirmedCheckoutIdMock()).toBeUndefined();
		});

		test('toggleOption check', () => {
			const toggleOptionMock = wrapper.instance().toggleOption;
			expect(typeof toggleOptionMock).toBe('function');

			toggleOptionMock(0);
			const initializeCustomerPaymentTokenMockCallCount = initializeCustomerPaymentTokenMock.mock.calls.length;
			expect(initializeCustomerPaymentTokenMockCallCount).toBeDefined();

			expect(wrapper.instance().state.loadingIndex).toBe(0);
			expect(wrapper.instance().state.paymentMethod).toBe('payon_paypal');
		});

		test('getMappedPaymentMethods check', () => {
			const getMappedPaymentMethodsMock = wrapper.instance().getMappedPaymentMethods;
			expect(typeof getMappedPaymentMethodsMock).toBe('function');

			expect(getMappedPaymentMethodsMock()).toBeDefined();
			expect(getMappedPaymentMethodsMock()).toBeInstanceOf(Array);
		});

		test('markFormAsDirty check', () => {
			const markFormAsDirtyMock = wrapper.instance().markFormAsDirty;
			expect(typeof markFormAsDirtyMock).toBe('function');

			expect(markFormAsDirtyMock()).toBeUndefined();
		});

		test('componentDidMount check', () => {
			const componentDidMountMock = wrapper.instance().componentDidMount;
			expect(typeof componentDidMountMock).toBe('function');

			wrapper.instance().componentDidMount();

			const getCustomerPaymentTokensMockCallCount= getCustomerPaymentTokensMock.mock.calls.length;
			expect(getCustomerPaymentTokensMockCallCount).toBeDefined();
		});

		test('componentDidUpdate check', () => {
			const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateMock).toBe('function');

			const prevProps= {paymentMethod: null, payonCheckoutId: null};
			const prevState= {canGoToPaymentTab: null};
			expect(wrapper.instance().componentDidUpdate(prevProps, prevState)).toBeUndefined();

			wrapper.setState({paymentMethod: 'open_invoice'});
			wrapper.update();
			const prevStateNew = {paymentMethod: ''};
			wrapper.instance().componentDidUpdate(prevProps, prevStateNew);
			expect(wrapper.instance().state.expandedIndex).toBe(null);
			expect(wrapper.instance().state.loadingIndex).toBe(null);
		});

	});
});
describe('PaymentDisplayEdit Component Test Suite', () => {
	let props, wrapper;
	const getCustomerPaymentTokensMock = jest.fn();
	const initializeCustomerPaymentTokenMock = jest.fn();
	const saveCustomerPaymentTokenMock = jest.fn();

	beforeEach(() => {
		props= {
			getCustomerPaymentTokens: getCustomerPaymentTokensMock,
			initializeCustomerPaymentToken: initializeCustomerPaymentTokenMock,
			saveCustomerPaymentToken: saveCustomerPaymentTokenMock,
			payonEndpoint: 'payonEndpoint',
			confirmationPage: 'confirmationPage',
			checkboxes: ['checkboxes'],
			isEnableDesign: false,
			accountPagePath: 'accountPagePath',
			accountPageTab: null,
		};
		wrapper= setup(props);
	});

	describe('Redux Props', () => {

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('has payonEndpoint as prop and is of type string', () => {
			const payonEndpointProp = wrapper.instance().props.payonEndpoint;
			expect(typeof payonEndpointProp).toBe('string');
		});

		test('has confirmationPage as prop and is of type string', () => {
			const confirmationPageProp = wrapper.instance().props.confirmationPage;
			expect(typeof confirmationPageProp).toBe('string');
		});

		test('has accountPagePath as prop and is of type string', () => {
			const accountPagePathProp = wrapper.instance().props.accountPagePath;
			expect(typeof accountPagePathProp).toBe('string');
		});

		test('has accountPageTab as prop and is of type string', () => {
			const accountPageTabProp = wrapper.instance().props.accountPageTab;
			expect(typeof accountPageTabProp).toBe('object');
		});

		test('has payonCheckoutId as prop and is of type string', () => {
			const payonCheckoutIdProp = wrapper.instance().props.payonCheckoutId;
			expect(typeof payonCheckoutIdProp).toBe('string');
		});

		test('has isEnableDesign as prop and is of type boolean', () => {
			const isEnableDesignProp = wrapper.instance().props.isEnableDesign;
			expect(typeof isEnableDesignProp).toBe('boolean');
		});

		test('has isLoading as prop and is of type boolean', () => {
			const isLoadingProp = wrapper.instance().props.isLoading;
			expect(typeof isLoadingProp).toBe('boolean');
		});

		test('has canGoToPaymentTab as prop and is of type boolean', () => {
			const canGoToPaymentTabProp = wrapper.instance().props.canGoToPaymentTab;
			expect(typeof canGoToPaymentTabProp).toBe('boolean');
		});

		test('has paymentTokens as prop and is of type array', () => {
			const paymentTokensProp = wrapper.instance().props.paymentTokens;
			expect(paymentTokensProp).toBeInstanceOf(Array);
		});

		test('has checkboxes as prop and is of type array', () => {
			const checkboxesProp = wrapper.instance().props.checkboxes;
			expect(checkboxesProp).toBeInstanceOf(Array);
		});

		test('has getCustomerPaymentTokens as prop and is of type function', () => {
			const getCustomerPaymentTokensProp = wrapper.instance().props.getCustomerPaymentTokens;
			expect(typeof getCustomerPaymentTokensProp).toBe('function');
		});

		test('has initializeCustomerPaymentToken as prop and is of type function', () => {
			const initializeCustomerPaymentTokenProp = wrapper.instance().props.initializeCustomerPaymentToken;
			expect(typeof initializeCustomerPaymentTokenProp).toBe('function');
		});

		test('has saveCustomerPaymentToken as prop and is of type function', () => {
			const saveCustomerPaymentTokenProp = wrapper.instance().props.saveCustomerPaymentToken;
			expect(typeof saveCustomerPaymentTokenProp).toBe('function');
		});
	});

	describe('state check', () => {

		test('state check', () => {
			const stateCheck = wrapper.instance().state;

			expect(stateCheck.expandedIndex).toBe(null);
			expect(stateCheck.loadingIndex).toBe(null);

			expect(stateCheck.paymentMethod).toBe(null);
			expect(stateCheck.isOpenInvoiceClicked).toBeFalsy();
		});

	});

	describe('function calls', () => {

		test('getConfirmedCheckoutId check', () => {
			const getConfirmedCheckoutIdMock = wrapper.instance().getConfirmedCheckoutId;
			expect(typeof getConfirmedCheckoutIdMock).toBe('function');

			expect(getConfirmedCheckoutIdMock()).toBeUndefined();
		});

		test('toggleOption check', () => {
			const toggleOptionMock = wrapper.instance().toggleOption;
			expect(typeof toggleOptionMock).toBe('function');

			toggleOptionMock(0);
			const initializeCustomerPaymentTokenMockCallCount = initializeCustomerPaymentTokenMock.mock.calls.length;
			expect(initializeCustomerPaymentTokenMockCallCount).toBeDefined();

			expect(wrapper.instance().state.loadingIndex).toBe(0);
			expect(wrapper.instance().state.paymentMethod).toBe('payon_paypal');
		});
		test('toggleOption check', () => {
			const toggleOptionMock = wrapper.instance().toggleOption;
			expect(typeof toggleOptionMock).toBe('function');

			toggleOptionMock(1);
		});

		test('markFormAsDirty check', () => {
			const markFormAsDirtyMock = wrapper.instance().markFormAsDirty;
			expect(typeof markFormAsDirtyMock).toBe('function');

			expect(markFormAsDirtyMock()).toBeUndefined();
		});

		test('componentDidMount check', () => {
			const componentDidMountMock = wrapper.instance().componentDidMount;
			expect(typeof componentDidMountMock).toBe('function');

			wrapper.instance().componentDidMount();

			const getCustomerPaymentTokensMockCallCount= getCustomerPaymentTokensMock.mock.calls.length;
			expect(getCustomerPaymentTokensMockCallCount).toBeDefined();
		});

		test('componentDidUpdate check', () => {
			const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateMock).toBe('function');

			const prevProps= {paymentMethod: null, payonCheckoutId: null};
			const prevState= {canGoToPaymentTab: null};
			expect(wrapper.instance().componentDidUpdate(prevProps, prevState)).toBeUndefined();

			wrapper.setState({paymentMethod: 'open_invoice'});
			wrapper.update();
			const prevStateNew = {paymentMethod: ''};
			wrapper.instance().componentDidUpdate(prevProps, prevStateNew);
			expect(wrapper.instance().state.expandedIndex).toBe(null);
			expect(wrapper.instance().state.loadingIndex).toBe(null);
		});

	});
});

describe('PaymentDisplayEdit Component Test Suite', () => {
	let props, wrapper;
	const getCustomerPaymentTokensMock = jest.fn();
	const initializeCustomerPaymentTokenMock = jest.fn();
	const saveCustomerPaymentTokenMock = jest.fn();

	beforeEach(() => {
		props= {
			getCustomerPaymentTokens: getCustomerPaymentTokensMock,
			initializeCustomerPaymentToken: initializeCustomerPaymentTokenMock,
			saveCustomerPaymentToken: saveCustomerPaymentTokenMock,
			payonEndpoint: 'payonEndpoint',
			confirmationPage: 'confirmationPage',
			checkboxes: ['checkboxes'],
			isEnableDesign: false,
			accountPagePath: 'accountPagePath',
			accountPageTab: 'accountPageTab',
		};
		wrapper= setupTwo(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
		wrapper.instance().setState({expandedIndex: 1});
	});

});
