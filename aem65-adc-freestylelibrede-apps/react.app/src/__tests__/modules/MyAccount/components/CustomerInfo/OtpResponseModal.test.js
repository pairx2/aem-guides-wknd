import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import OtpResponseModal from '../../../../../modules/MyAccount/components/CustomerInfo/OtpResponseModal';
import {mockStore, mockStoreOrder} from '../../../../../__mocks__/storeMock';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props) => {
	const wrapper = shallow(<OtpResponseModal store={mockStore} {...props} />).dive().dive().dive().dive().dive().dive().dive().dive().dive().dive().dive();
	return wrapper;
};

const setupTwo = (props) => {
	const wrapper = shallow(<OtpResponseModal store={mockStoreOrder} {...props} />).dive().dive().dive().dive().dive().dive().dive().dive().dive().dive().dive();
	return wrapper;
};

describe('OtpResponseModal component Test Suite', () => {
	let props, wrapper;
	const closeModalMock = jest.fn();
	const getCustomerMock = jest.fn();
	const otpRequestMock = jest.fn();
	const otpResendMock = jest.fn();
	const isModalOpenMock = jest.fn();

	beforeEach(() => {
		props = {
			closeModal: closeModalMock,
			getCustomer: getCustomerMock,
			tempMobileNumber: '12345678',
			otpRequest: otpRequestMock,
			otpResend : otpResendMock,
			isModalOpen: isModalOpenMock
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

		test('tempMobileNumber is prop of type string', () => {
			const tempMobileNumberProp = wrapper.instance().props.tempMobileNumber;
			expect(typeof tempMobileNumberProp).toBe('string');
		});

		test('temporary_mobile_number is prop of type string', () => {
			const temporary_mobile_numberProp = wrapper.instance().props.temporary_mobile_number;
			expect(typeof temporary_mobile_numberProp).toBe('string');
		});

		test('isMobileVerified is prop of type boolean', () => {
			const isMobileVerifiedProp = wrapper.instance().props.isMobileVerified;
			expect(typeof isMobileVerifiedProp).toBe('boolean');
		});
		test('errorCode is prop of type array', () => {
			const errorCodeProp = wrapper.instance().props.errorCode;
			expect(errorCodeProp).toBeInstanceOf(Array);
		});

		test('closeModal is prop of type function', () => {
			const closeModalProp = wrapper.instance().props.closeModal;
			expect(typeof closeModalProp).toBe('function');
		});

		test('getCustomer is prop of type function', () => {
			const getCustomerProp = wrapper.instance().props.getCustomer;
			expect(typeof getCustomerProp).toBe('function');
		});

		test('otpRequest is prop of type function', () => {
			const otpRequestProp = wrapper.instance().props.otpRequest;
			expect(typeof otpRequestProp).toBe('function');
		});

		test('otpResend is prop of type function', () => {
			const otpResendProp = wrapper.instance().props.otpResend;
			expect(typeof otpResendProp).toBe('function');
		});
	});

	describe('state check', () => {

		test('state check', () => {
			const stateCheck= wrapper.instance().state;
			expect(stateCheck).toBeInstanceOf(Object);
			expect(stateCheck.isErrorMessageToShow).toBeFalsy();
			expect(stateCheck.isShowOtpResendMessage).toBeFalsy();
		});
	});

	describe('Functions check', () => {

		test('submit check', () => {
			const submitMock= wrapper.instance().submit;
			expect(typeof submitMock).toBe('function');

			const values= {otpText: 'otpText'};
			submitMock(values);
			expect(wrapper.instance().state.isErrorMessageToShow).toBeTruthy();
			expect(wrapper.instance().state.isShowOtpResendMessage).toBeFalsy();
			const otpRequestMockCallCount = otpRequestMock.mock.calls.length;
			expect(otpRequestMockCallCount).toBeDefined();
		});

		test('resendOTP check', () => {
			const resendOTPMock= wrapper.instance().resendOTP;
			expect(typeof resendOTPMock).toBe('function');
			resendOTPMock();
			expect(wrapper.instance().state.isErrorMessageToShow).toBeFalsy();
			expect(wrapper.instance().state.isShowOtpResendMessage).toBeTruthy();
			const otpResendMockCallCount = otpResendMock.mock.calls.length;
			expect(otpResendMockCallCount).toBeDefined();
		});

		test('componentDidUpdate check', () => {
			const componentDidUpdateMock= wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateMock).toBe('function');

			wrapper.instance().componentDidUpdate();

			const getCustomerMockCallCount = getCustomerMock.mock.calls.length;
			expect(getCustomerMockCallCount).toBeDefined();

			const closeModalMockCallCount = closeModalMock.mock.calls.length;
			expect(closeModalMockCallCount).toBeDefined();
		});
		test('resendOTP function call in action property of Link', () => {
			const actionProp= wrapper.props().children.props.children[1].props.children[1].props.children[4].props.children.props.action;
			expect(typeof actionProp).toBe('function');
			actionProp();
			expect(wrapper.instance().state.isErrorMessageToShow).toBeFalsy();
			expect(wrapper.instance().state.isShowOtpResendMessage).toBeTruthy();
			const otpResendMockCallCount = otpResendMock.mock.calls.length;
			expect(otpResendMockCallCount).toBeDefined();
		});

		test('componentDidMount check', () => {
			const componentDidMountMock = wrapper.instance().componentDidMount;
			expect(typeof componentDidMountMock).toBe('function');
			wrapper.instance().componentDidMount();
		})

		test('componentWillUnmount check', () => {
			const componentWillUnmountMock = wrapper.instance().componentWillUnmount;
			expect(typeof componentWillUnmountMock).toBe('function');
			wrapper.instance().componentWillUnmount();
		})

		test('modalCloseHandler check', ()=> {
			expect(wrapper.instance().modalCloseHandler()).not.toEqual(null);
		})

		test('handleClickOutside check', ()=> {
			expect(wrapper.instance().handleClickOutside()).not.toEqual(null);
		})
	});
});

describe('Other OtpResponseModal component Test Suite', () => {
	let props, wrapper;
	const closeModalMock = jest.fn();
	const getCustomerMock = jest.fn();
	const otpRequestMock = jest.fn();
	const otpResendMock = jest.fn();
	const isModalOpenMock = jest.fn();

	beforeEach(() => {
		props = {
			closeModal: closeModalMock,
			getCustomer: getCustomerMock,
			tempMobileNumber: '12345678',
			otpRequest: otpRequestMock,
			otpResend : otpResendMock,
			isModalOpen: isModalOpenMock
		};
		wrapper = setupTwo(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('componentDidUpdate check', () => {
		const componentDidUpdateMock= wrapper.instance().componentDidUpdate;
		expect(typeof componentDidUpdateMock).toBe('function');

		wrapper.instance().componentDidUpdate();
		const closeModalMockCallCount = closeModalMock.mock.calls.length;
		expect(closeModalMockCallCount).toBeDefined();
	});

	test('componentDidMount check', () => {
		const componentDidMountMock = wrapper.instance().componentDidMount;
		expect(typeof componentDidMountMock).toBe('function');
		wrapper.instance().componentDidMount();
	})
	
	test('componentWillUnmount check', () => {
		const componentWillUnmountMock = wrapper.instance().componentWillUnmount;
		expect(typeof componentWillUnmountMock).toBe('function');
		wrapper.instance().componentWillUnmount();
	})
});