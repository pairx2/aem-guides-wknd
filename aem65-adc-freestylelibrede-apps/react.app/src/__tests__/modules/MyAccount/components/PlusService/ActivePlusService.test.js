import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import ActivePlusService from '../../../../../modules/MyAccount/components/PlusService/ActivePlusService';
import {mockStore, mockStoreOrder, mockStoreConfirmationPage} from '../../../../../__mocks__/storeMock';
jest.mock('../../../../../utils/endpointUrl');
Enzyme.configure({
	adapter: new EnzymeAdapter()
});

const setup = (props) => {
	const wrapper = shallow(<ActivePlusService store={mockStore} {...props} />).dive().dive();
	return wrapper;
};

const setupTwo = (props) => {
	const wrapper = shallow(<ActivePlusService store={mockStoreOrder} {...props} />).dive().dive();
	return wrapper;
};

const setupThree = (props) => {
	const wrapper = shallow(<ActivePlusService store={mockStoreConfirmationPage} {...props} />).dive().dive();
	return wrapper;
};

describe('ActivePlusService component Test Suite', () => {
	let props, wrapper;
	const closePaymentEditFormRequestMock = jest.fn();

	beforeEach(() => {
		props = {
			order: {},
			products: {},
			orderServiceStatus: 'shipped',
			dictionary: {},
			customer: {},
			closePaymentEditFormRequest: closePaymentEditFormRequestMock,
			deactivateSubscription: jest.fn(),
			deleteSubscription: jest.fn(),
			privacyPolicyPath: 'privacyPolicyPath',
			termsAndConditionsPath: 'termsAndConditionsPath',
			trainingMaterialsPath: 'trainingMaterialsPath',
			tabName: 'tabName'
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

		test('proptype check', () =>{
			expect(wrapper.instance().props.order).toBeInstanceOf(Object);
			expect(wrapper.instance().props.products).toBeInstanceOf(Object);
			expect(typeof wrapper.instance().props.orderServiceStatus).toBe('string');
			expect(wrapper.instance().props.dictionary).toBeInstanceOf(Object);
			expect(wrapper.instance().props.customer).toBeInstanceOf(Object);
			expect(typeof wrapper.instance().props.closePaymentEditFormRequest).toBe('function');
			expect(typeof wrapper.instance().props.deactivateSubscription).toBe('function');
			expect(typeof wrapper.instance().props.deleteSubscription).toBe('function');
			expect(typeof wrapper.instance().props.privacyPolicyPath).toBe('string');
			expect(typeof wrapper.instance().props.termsAndConditionsPath).toBe('string');
			expect(typeof wrapper.instance().props.trainingMaterialsPath).toBe('string');
		});
	});

	describe('state check', () => {

		test('state value check', () => {
			const stateMock = wrapper.instance().state;
			expect(stateMock).toBeInstanceOf(Object);
			expect(typeof stateMock.isSubscriptionEditing).toBe('boolean');
			expect(stateMock.isSubscriptionEditing).toBe(false);
		});
	});

	describe('function calls',() => {

		test('toggleSubscriptionEditing method check', () => {
			const toggleSubscriptionEditingMock = wrapper.instance().toggleSubscriptionEditing;
			expect(typeof toggleSubscriptionEditingMock).toBe('function');

			wrapper.instance().ref= {current: {scrollIntoView: jest.fn()}};
			toggleSubscriptionEditingMock(false);

			const closePaymentEditFormRequestMockCallCount = closePaymentEditFormRequestMock.mock.calls.length;
			expect(closePaymentEditFormRequestMockCallCount).toBeDefined();
		});

		test('toggleShippingAddressEditing method check', () => {
			const isShippingAddressEditing = false;
			const addressType = '';
			wrapper.instance().toggleShippingAddressEditing(addressType, isShippingAddressEditing);
			expect(wrapper.instance().state.isShippingAddressEditing).toBeFalsy();
			expect(wrapper.instance().state.addressType).toBe('');

		});
		test('componentDidMount method check', () => {
			const mockRef = {offsetTop: 0};
			expect(wrapper.instance().ref).toEqual({current: null});
			wrapper.instance().ref.current = mockRef;
			wrapper.instance().componentDidMount();
		});

		test('tabChanged function call check', () => {
			const tabChangedMock = wrapper.instance().tabChanged;
			expect(typeof tabChangedMock).toBe('function');
			tabChangedMock();
			expect(wrapper.instance().state.isEditing).toBeFalsy();
		});

		test('toggleSubscriptionEditing function call in close property of SubscriptionPaymentEditor', () => {
			wrapper.instance().setState({isSubscriptionEditing: true});
			const actionProp= wrapper.props().children[0].props.close;
			expect(typeof actionProp).toBe('function');

			wrapper.instance().ref= {current: {scrollIntoView: jest.fn()}};
			actionProp(false);

			expect(wrapper.instance().state.isSubscriptionEditing).toBeFalsy();

			const closePaymentEditFormRequestMockCallCount = closePaymentEditFormRequestMock.mock.calls.length;
			expect(closePaymentEditFormRequestMockCallCount).toBeDefined();
		});

		test('toggleShippingAddressEditing function call in close property of AddressEditor of else', () => {
			wrapper.instance().setState({isShippingAddressEditing: true});
			const actionProp= wrapper.props().children.props.close;
			expect(typeof actionProp).toBe('function');

			actionProp(false);
			expect(wrapper.instance().state.isShippingAddressEditing).toBeFalsy();
		});

		test('toggleSubscriptionEditing function call in editSubscription property of CurrentSubscriptionOrder', () => {
			const actionProp= wrapper.props().children.props.editSubscription;
			expect(typeof actionProp).toBe('function');

			wrapper.instance().ref= {current: {scrollIntoView: jest.fn()}};
			actionProp(true);

			expect(wrapper.instance().state.isSubscriptionEditing).toBeTruthy();

			const closePaymentEditFormRequestMockCallCount = closePaymentEditFormRequestMock.mock.calls.length;
			expect(closePaymentEditFormRequestMockCallCount).toBeDefined();
		});

		test('toggleShippingAddressEditing function call in editAddress property of CurrentSubscriptionOrder', () => {
			const actionProp= wrapper.props().children.props.editAddress;
			expect(typeof actionProp).toBe('function');

			actionProp('', true);
			expect(wrapper.instance().state.isShippingAddressEditing).toBeTruthy();
			expect(wrapper.instance().state.addressType).toBe('');
		});
	});
});

describe('ActivePlusService component Test Suite with other store', () => {
	let props, wrapper;
	const closePaymentEditFormRequestMock = jest.fn();

	beforeEach(() => {
		props = {
			order: {},
			products: {},
			orderServiceStatus: 'shipped',
			dictionary: {},
			customer: {},
			closePaymentEditFormRequest: closePaymentEditFormRequestMock,
			deactivateSubscription: jest.fn(),
			deleteSubscription: jest.fn(),
			privacyPolicyPath: 'privacyPolicyPath',
			termsAndConditionsPath: 'termsAndConditionsPath',
			trainingMaterialsPath: 'trainingMaterialsPath',
		};
		wrapper = setupTwo(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('toggleSubscriptionEditing function call in close property of ReactivateSubscriptionOrder', () => {
		wrapper.instance().setState({isSubscriptionEditing: true});
		const actionProp= wrapper.props().children[0].props.close;
		expect(typeof actionProp).toBe('function');

		wrapper.instance().ref= {current: {scrollIntoView: jest.fn()}};
		actionProp(false);

		expect(wrapper.instance().state.isSubscriptionEditing).toBeFalsy();

		const closePaymentEditFormRequestMockCallCount = closePaymentEditFormRequestMock.mock.calls.length;
		expect(closePaymentEditFormRequestMockCallCount).toBeDefined();
	});

	test('toggleShippingAddressEditing function call in editAddress property of ReactivateSubscriptionOrder', () => {
		wrapper.instance().setState({isSubscriptionEditing: true});
		const actionProp= wrapper.props().children[0].props.editAddress;
		expect(typeof actionProp).toBe('function');

		actionProp('', true);
		expect(wrapper.instance().state.isShippingAddressEditing).toBeTruthy();
		expect(wrapper.instance().state.addressType).toBe('');
	});

	test('toggleShippingAddressEditing function call in close property of AddressEditor', () => {
		wrapper.instance().setState({isSubscriptionEditing: true, isShippingAddressEditing: true});
		const actionProp= wrapper.props().children[0].props.close;
		expect(typeof actionProp).toBe('function');

		actionProp(false);
		expect(wrapper.instance().state.isShippingAddressEditing).toBeFalsy();
	});
});

describe('ActivePlusService component Test Suite with other store', () => {
	let props, wrapper;
	const closePaymentEditFormRequestMock = jest.fn();

	beforeEach(() => {
		props = {
			order: {},
			products: {},
			orderServiceStatus: 'shipped',
			dictionary: {},
			customer: {},
			closePaymentEditFormRequest: closePaymentEditFormRequestMock,
			deactivateSubscription: jest.fn(),
			deleteSubscription: jest.fn(),
			privacyPolicyPath: 'privacyPolicyPath',
			termsAndConditionsPath: 'termsAndConditionsPath',
			trainingMaterialsPath: 'trainingMaterialsPath',
		};
		wrapper = setupThree(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('toggleSubscriptionEditing function call in close property of SubscriptionEditor', () => {
		wrapper.instance().setState({isSubscriptionEditing: true});
		const actionProp= wrapper.props().children[0].props.close;
		expect(typeof actionProp).toBe('function');

		wrapper.instance().ref= {current: {scrollIntoView: jest.fn()}};
		actionProp(false);

		expect(wrapper.instance().state.isSubscriptionEditing).toBeFalsy();

		const closePaymentEditFormRequestMockCallCount = closePaymentEditFormRequestMock.mock.calls.length;
		expect(closePaymentEditFormRequestMockCallCount).toBeDefined();
	});

});
describe('ActivePlusService component Test Suite with other store', () => {
	let props, wrapper;
	const closePaymentEditFormRequestMock = jest.fn();

	beforeEach(() => {
		props = {
			order: {},
			products: {},
			orderServiceStatus: 'Inactive',
			canRedirect: true,
			dictionary: {},
			customer: {},
			closePaymentEditFormRequest: closePaymentEditFormRequestMock,
			deactivateSubscription: jest.fn(),
			deleteSubscription: jest.fn(),
			privacyPolicyPath: 'privacyPolicyPath',
			termsAndConditionsPath: 'termsAndConditionsPath',
			trainingMaterialsPath: 'trainingMaterialsPath',
		};
		wrapper = setupThree(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});

describe('ActivePlusService component Test Suite with other store', () => {
	let props, wrapper;
	const closePaymentEditFormRequestMock = jest.fn();

	beforeEach(() => {
		props = {
			order: {},
			products: {},
			orderServiceStatus: 'Inactive',
			canRedirect: true,
			dictionary: {},
			customer: {},
			closePaymentEditFormRequest: closePaymentEditFormRequestMock,
			deactivateSubscription: jest.fn(),
			deleteSubscription: jest.fn(),
			privacyPolicyPath: 'privacyPolicyPath',
			termsAndConditionsPath: 'termsAndConditionsPath',
			trainingMaterialsPath: 'trainingMaterialsPath',
		};
		wrapper = setupTwo(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('toggleSubscriptionEditing function call in close property of SubscriptionEditor', () => {
		wrapper.instance().setState({isSubscriptionEditing: false});
		const actionProp= wrapper.props().children[0].props.close;
		expect(typeof actionProp).toBe('function');

		wrapper.instance().ref= {current: {scrollIntoView: jest.fn()}};
		actionProp(false);

		expect(wrapper.instance().state.isSubscriptionEditing).toBeFalsy();

		const closePaymentEditFormRequestMockCallCount = closePaymentEditFormRequestMock.mock.calls.length;
		expect(closePaymentEditFormRequestMockCallCount).toBeDefined();
	});

});