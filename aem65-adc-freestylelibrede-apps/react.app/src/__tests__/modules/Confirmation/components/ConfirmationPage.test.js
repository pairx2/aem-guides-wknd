import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import ConfirmationPage from '../../../../modules/Confirmation/components/ConfirmationPage';
import {mockStore, mockStoreConfirmationPage} from '../../../../__mocks__/storeMock';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

const setup = (props= {}) => {
	const wrapper = shallow(<ConfirmationPage store= {mockStoreConfirmationPage} {...props}/>).dive().dive();
	return wrapper;
};

const setupTwo = (props= {}) => {
	const wrapper = shallow(<ConfirmationPage store= {mockStore} {...props}/>).dive().dive();
	return wrapper;
};

describe('ConfirmationPage Component Test Suite with valid error value', () => {
	let props, wrapper;
	const openModalActionMock = jest.fn();
	const closeModalActionMock = jest.fn();
	const placeOrderRequestMock = jest.fn();
	const getOrderIdFailureMock = jest.fn();
	const downloadDocumentRequestMock = jest.fn();
	const runTrustedShopsScriptMock = jest.fn();

	beforeEach(() => {
		props= {
			moreInfoIcon: 'moreInfoIcon',
			moreInfoDescription: 'moreInfoDescription',
			moreInfoLabel: 'moreInfoLabel',
			moreInfoLink: 'moreInfoLink',
			moreCTAStyle: 'primary',
			readerInformation: 'readerInformation',
			serviceText: 'serviceText',
			helplineNumber: 'helplineNumber',
			emailCTAStyle: 'primary',
			callCTAStyle: 'primary',
			buttonAction: '/content/adc/freestylelibrede/test',
			email: 'email',
			openModalAction: openModalActionMock,
			modelHeading: 'modelHeading',
			closeModalAction: closeModalActionMock,
			placeOrderRequest: placeOrderRequestMock,
			getOrderIdFailure: getOrderIdFailureMock,
			isReimbursment: true,
			orderTrackCtaText: 'orderTrackCtaText',
			urlHashKey: 'urlHashKey',
			orderTrackCtaStyle: 'primary',
			orderTrackPath: 'orderTrackPath',
			downloadDocumentRequest: downloadDocumentRequestMock,
			claimReceipt: 'claimReceipt',
			heading: 'heading',
			iconPath: 'iconPath',
			buttonText: 'buttonText',
			onlineInfoIcon: 'onlineInfoIcon',
			onlineDescription: 'onlineDescription',
			onlineCtaInfoLabel: 'onlineCtaInfoLabel',
			onlineCtaInfoLink: 'onlineCtaInfoLink',
			onlineMoreCTAStyle: 'primary'
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

		test('has moreInfoIcon as prop and is of type string', () => {
			const moreInfoIconProp = wrapper.instance().props.moreInfoIcon;
			expect(typeof moreInfoIconProp).toBe('string');
		});

		test('has moreInfoDescription as prop and is of type string', () => {
			const moreInfoDescriptionProp = wrapper.instance().props.moreInfoDescription;
			expect(typeof moreInfoDescriptionProp).toBe('string');
		});

		test('has moreInfoLabel as prop and is of type string', () => {
			const moreInfoLabelProp = wrapper.instance().props.moreInfoLabel;
			expect(typeof moreInfoLabelProp).toBe('string');
		});

		test('has moreInfoLink as prop and is of type string', () => {
			const moreInfoLinkProp = wrapper.instance().props.moreInfoLink;
			expect(typeof moreInfoLinkProp).toBe('string');
		});

		test('has moreCTAStyle as prop and is of type string', () => {
			const moreCTAStyleProp = wrapper.instance().props.moreCTAStyle;
			expect(typeof moreCTAStyleProp).toBe('string');
		});

		test('has readerInformation as prop and is of type string', () => {
			const readerInformationProp = wrapper.instance().props.readerInformation;
			expect(typeof readerInformationProp).toBe('string');
		});

		test('has serviceText as prop and is of type string', () => {
			const serviceTextProp = wrapper.instance().props.serviceText;
			expect(typeof serviceTextProp).toBe('string');
		});

		test('has helplineNumber as prop and is of type string', () => {
			const helplineNumberProp = wrapper.instance().props.helplineNumber;
			expect(typeof helplineNumberProp).toBe('string');
		});

		test('has emailCTAStyle as prop and is of type string', () => {
			const emailCTAStyleProp = wrapper.instance().props.emailCTAStyle;
			expect(typeof emailCTAStyleProp).toBe('string');
		});

		test('has callCTAStyle as prop and is of type string', () => {
			const callCTAStyleProp = wrapper.instance().props.callCTAStyle;
			expect(typeof callCTAStyleProp).toBe('string');
		});

		test('has email as prop and is of type string', () => {
			const emailProp = wrapper.instance().props.email;
			expect(typeof emailProp).toBe('string');
		});

		test('has modelHeading as prop and is of type string', () => {
			const modelHeadingProp = wrapper.instance().props.modelHeading;
			expect(typeof modelHeadingProp).toBe('string');
		});

		test('has orderID as prop and is of type string', () => {
			const orderIDProp = wrapper.instance().props.orderID;
			expect(typeof orderIDProp).toBe('string');
		});

		test('has isReimbursment as prop and is of type boolean', () => {
			const reimbursmentProp = wrapper.instance().props.isReimbursment;
			expect(typeof reimbursmentProp).toBe('boolean');
		});

		test('has orderTrackCtaText as prop and is of type string', () => {
			const orderTrackCtaTextProp = wrapper.instance().props.orderTrackCtaText;
			expect(typeof orderTrackCtaTextProp).toBe('string');
		});

		test('has orderTrackCtaStyle as prop and is of type string', () => {
			const orderTrackCtaStyleProp = wrapper.instance().props.orderTrackCtaStyle;
			expect(typeof orderTrackCtaStyleProp).toBe('string');
		});

		test('has orderTrackPath as prop and is of type string', () => {
			const orderTrackPathProp = wrapper.instance().props.orderTrackPath;
			expect(typeof orderTrackPathProp).toBe('string');
		});

		test('has urlHashKey as prop and is of type string', () => {
			const orderUrlHashKey = wrapper.instance().props.urlHashKey;
			expect(typeof orderUrlHashKey).toBe('string');
		});

		test('has cartId as prop and is of type string', () => {
			const cartIdProp = wrapper.instance().props.cartId;
			expect(typeof cartIdProp).toBe('string');
		});

		test('has error as prop and is of type object', () => {
			const errorProp = wrapper.instance().props.error;
			expect(typeof errorProp).toBe('string');
		});

		test('has customer as prop and is of type object', () => {
			const customerProp = wrapper.instance().props.customer;
			expect(customerProp).toBeInstanceOf(Object);
		});

		test('has openModalAction as prop and is of type function', () => {
			const openModalActionProp = wrapper.instance().props.openModalAction;
			expect(typeof openModalActionProp).toBe('function');
		});

		test('has closeModalAction as prop and is of type function', () => {
			const closeModalActionProp = wrapper.instance().props.closeModalAction;
			expect(typeof closeModalActionProp).toBe('function');
		});

		test('has placeOrderRequest as prop and is of type function', () => {
			const placeOrderRequestProp = wrapper.instance().props.placeOrderRequest;
			expect(typeof placeOrderRequestProp).toBe('function');
		});

		test('has getOrderIdFailure as prop and is of type function', () => {
			const getOrderIdFailureProp = wrapper.instance().props.getOrderIdFailure;
			expect(typeof getOrderIdFailureProp).toBe('function');
		});

	});

	describe('Functions check', () => {

		test('componentDidMount function check', () => {
			const componentDidMountMock = wrapper.instance().componentDidMount;
			expect(typeof componentDidMountMock).toBe('function');

			wrapper.instance().componentDidMount();

			const openModalActionMockCallCount = openModalActionMock.mock.calls.length;
			expect(openModalActionMockCallCount).toBeDefined();

			const placeOrderRequestMockCallCount = placeOrderRequestMock.mock.calls.length;
			expect(placeOrderRequestMockCallCount).toBeDefined();
		});

		test('componentDidUpdate function check', () => {
			const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateMock).toBe('function');

			const prevProps= {error: ''};
			wrapper.instance().componentDidUpdate(prevProps);

			const openModalActionMockCallCount = openModalActionMock.mock.calls.length;
			expect(openModalActionMockCallCount).toBeDefined();
		});
		test('componentDidUpdate function check', () => {
			const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateMock).toBe('function');

			const prevProps= {error: 'payment-error'};
			wrapper.instance().componentDidUpdate(prevProps);

			const openModalActionMockCallCount = openModalActionMock.mock.calls.length;
			expect(openModalActionMockCallCount).toBeDefined();
		});

		test('downloadDocumentRequest function call check in action property of Button', () => {
			const actionProp= wrapper.props().children[0].props.children[3].props.children.props.children[1].props.children[1].props.children.props.action;
			expect(typeof actionProp).toBe('function');

			actionProp('claimReceipt');
			const downloadDocumentRequestMockCallCount= downloadDocumentRequestMock.mock.calls.length;
			expect(downloadDocumentRequestMockCallCount).toBeDefined();
		});

		test('getCartItems function call', () => {
			const getCartItemsMock = wrapper.instance().getCartItems;
			expect(typeof getCartItemsMock).toBe('function');

			expect(getCartItemsMock()).toBeDefined();
			expect(typeof getCartItemsMock()).toBe('object');
			expect(getCartItemsMock()).toEqual([]);
		});

		test('isCartEmpty test', () => {
			const isCartEmptyMock = wrapper.instance().isCartEmpty;
			expect(typeof isCartEmptyMock).toBe('function');
			expect(isCartEmptyMock()).toBeTruthy();
		});

		test('runTrustedShopsScript test',() => {
			const runTrustedShopsScriptMock = wrapper.instance().runTrustedShopsScript;
			expect(typeof runTrustedShopsScriptMock).toBe('function');
		});

	});

});

describe('ConfirmationPage Component Test Suite with empty error value', () => {
	let props, wrapper;
	const openModalActionMock = jest.fn();
	const closeModalActionMock = jest.fn();
	const placeOrderRequestMock = jest.fn();
	const getOrderIdFailureMock = jest.fn();
	const downloadDocumentRequestMock = jest.fn();
	const runTrustedShopsScriptMock = jest.fn();

	beforeEach(() => {
		props= {
			moreInfoIcon: 'moreInfoIcon',
			moreInfoDescription: 'moreInfoDescription',
			moreInfoLabel: 'moreInfoLabel',
			moreInfoLink: 'moreInfoLink',
			moreCTAStyle: 'primary',
			readerInformation: 'readerInformation',
			serviceText: 'serviceText',
			helplineNumber: 'helplineNumber',
			emailCTAStyle: 'primary',
			buttonAction: '/content/adc/freestylelibrede/test',
			callCTAStyle: 'primary',
			email: 'email',
			openModalAction: openModalActionMock,
			modelHeading: 'modelHeading',
			closeModalAction: closeModalActionMock,
			placeOrderRequest: placeOrderRequestMock,
			getOrderIdFailure: getOrderIdFailureMock,
			isReimbursment: false,
			orderTrackCtaText: 'orderTrackCtaText',
			urlHashKey: 'urlHashKey',
			orderTrackCtaStyle: 'primary',
			orderTrackPath: 'orderTrackPath',
			downloadDocumentRequest: downloadDocumentRequestMock,
			claimReceipt: 'claimReceipt',
			heading: 'heading',
			iconPath: 'iconPath',
			buttonText: 'buttonText',
			onlineInfoIcon: 'onlineInfoIcon',
			onlineDescription: 'onlineDescription',
			onlineCtaInfoLabel: 'onlineCtaInfoLabel',
			onlineCtaInfoLink: 'onlineCtaInfoLink',
			onlineMoreCTAStyle: 'primary'
		};
		wrapper= setupTwo(props);
	});

	test('componentDidUpdate function check', () => {
		const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
		expect(typeof componentDidUpdateMock).toBe('function');

		const prevProps= {error: ''};
		wrapper.instance().componentDidUpdate(prevProps);

		const closeModalActionMockCallCount = closeModalActionMock.mock.calls.length;
		expect(closeModalActionMockCallCount).toBeDefined();
	});

	test('componentDidUpdate should call runTrustedShopsScript',() => {
		const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
		expect(typeof componentDidUpdateMock).toBe('function');

		const runTrustedShopsScriptMockCallCount = runTrustedShopsScriptMock.mock.calls.length;
		expect(runTrustedShopsScriptMockCallCount).toBeDefined();
	});

	test('getCartItems function call', () => {
		const getCartItemsMock = wrapper.instance().getCartItems;
		expect(typeof getCartItemsMock).toBe('function');

		expect(getCartItemsMock()).toBeDefined();
		expect(typeof getCartItemsMock()).toBe('object');
		expect(getCartItemsMock()).not.toEqual([]);
	});

	test('isCartEmpty test', () => {
		const isCartEmptyMock = wrapper.instance().isCartEmpty;
		expect(typeof isCartEmptyMock).toBe('function');
		expect(isCartEmptyMock()).toBeFalsy();
	});

	test('runTrustedShopsScript test',() => {
		const runTrustedShopsScriptMock = wrapper.instance().runTrustedShopsScript;
		expect(typeof runTrustedShopsScriptMock).toBe('function');
	});

});

describe('ConfirmationPage Component Test Suite with valid error value', () => {
	let props, wrapper;
	const openModalActionMock = jest.fn();
	const closeModalActionMock = jest.fn();
	const placeOrderRequestMock = jest.fn();
	const getOrderIdFailureMock = jest.fn();
	const downloadDocumentRequestMock = jest.fn();

	beforeEach(() => {
		props= {
			moreInfoIcon: 'moreInfoIcon',
			moreInfoDescription: 'moreInfoDescription',
			moreInfoLabel: 'moreInfoLabel',
			moreInfoLink: 'moreInfoLink',
			moreCTAStyle: 'primary',
			readerInformation: 'readerInformation',
			serviceText: 'serviceText',
			helplineNumber: 'helplineNumber',
			emailCTAStyle: 'primary',
			callCTAStyle: 'primary',
			email: 'email',
			buttonAction: '/content/adc/freestylelibrede/test',
			openModalAction: openModalActionMock,
			modelHeading: 'modelHeading',
			closeModalAction: closeModalActionMock,
			placeOrderRequest: placeOrderRequestMock,
			getOrderIdFailure: getOrderIdFailureMock,
			isReimbursment: false,
			orderTrackCtaText: 'orderTrackCtaText',
			urlHashKey: 'urlHashKey',
			orderTrackCtaStyle: 'primary',
			orderTrackPath: 'orderTrackPath',
			downloadDocumentRequest: downloadDocumentRequestMock,
			claimReceipt: 'claimReceipt',
			heading: null,
			iconPath: null,
			buttonText: null,
			onlineInfoIcon: 'onlineInfoIcon',
			onlineDescription: 'onlineDescription',
			onlineCtaInfoLabel: 'onlineCtaInfoLabel',
			onlineCtaInfoLink: 'onlineCtaInfoLink',
			onlineMoreCTAStyle: 'primary'
		};
		wrapper= setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});
