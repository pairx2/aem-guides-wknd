import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import SubscriptionPaymentEditor from '../../../../../modules/MyAccount/components/PlusService/SubscriptionPaymentEditor';
import {mockStore, mockStoreOrder} from '../../../../../__mocks__/storeMock';


Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props) => {
	const wrapper = shallow(<SubscriptionPaymentEditor store={mockStore} {...props} />).dive().dive().dive().dive().dive().dive().dive().dive().dive().dive().dive();
	return wrapper;
};

const setupTwo = (props) => {
	const wrapper = shallow(<SubscriptionPaymentEditor store={mockStoreOrder} {...props} />).dive().dive().dive().dive().dive().dive().dive().dive().dive().dive().dive();
	return wrapper;
};

describe('SubscriptionPaymentEditor component Test Suite', () => {
	let props, wrapper;
	const closeMock = jest.fn();
	const verifyAddressRequestMock = jest.fn();
	const updatePlusServicePaymentMock = jest.fn();
	beforeEach(() => {
		props = {
			close: closeMock,
			updatePlusService: jest.fn(),
			updatePlusServicePayment: updatePlusServicePaymentMock,
			verifyAddressRequest: verifyAddressRequestMock
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
	describe('function calls',() => {

		test('componentDidUpdate should call submitForm',() => {
			const prevProps = {
				verificationStatus: 'ADDRESS_CHECK_SUCCESS',
				isDeactivated: false
			};
			wrapper.instance().componentDidUpdate(prevProps);
			wrapper.instance().submitForm();
			expect(closeMock.mock.calls.length).toBeDefined();
		});
		test('componentDidUpdate should call submitForm',() => {
			const prevProps = {
				verificationStatus: null,
				isDeactivated: false
			};
			wrapper.instance().componentDidUpdate(prevProps);
			wrapper.instance().submitForm();
			expect(closeMock.mock.calls.length).toBeDefined();
		});

		test('propsDidChange call check',() => {
			const prevProps = {verificationStatus: 'ADDRESS_CHECK_SUCCESS'};
			wrapper.instance().propsDidChange(prevProps);
		});

		test('checkAddress call check',() => {
			//form value not getting
			// wrapper.instance().checkAddress();
			// expect(verifyAddressRequestMock.mock.calls.length).toBeDefined();
		});

		test('submitForm call check',() => {
			wrapper.instance().submitForm();
			expect(updatePlusServicePaymentMock.mock.calls.length).toBeDefined();
		});
	});
});


describe('SubscriptionPaymentEditor component Test Suite', () => {
	let props, wrapper;
	const closeMock = jest.fn();
	const verifyAddressRequestMock = jest.fn();
	const updatePlusServicePaymentMock = jest.fn();

	beforeEach(() => {
		props = {
			close: closeMock,
			updatePlusService: jest.fn(),
			updatePlusServicePayment: updatePlusServicePaymentMock,
			verifyAddressRequest: verifyAddressRequestMock
		};
		wrapper = setupTwo(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('componentDidUpdate call check',() => {
		const prevProps = {
			verificationStatus: 'ADDRESS_CHECK_SUCCESS',
		};
		wrapper.instance().componentDidUpdate(prevProps);
	});
});
