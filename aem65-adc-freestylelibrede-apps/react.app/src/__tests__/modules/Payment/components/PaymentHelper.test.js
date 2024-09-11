import React from 'react';
import { call } from 'redux-saga/effects';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { mockStore } from '../../../../__mocks__/storeMock';
import PaymentHelper from '../../../../modules/Payment/components/PaymentHelper';
import { getJwtToken } from '../../../../api/authentication.service';
import { sagaDataHandling } from '../../../../utils/sagaDataHandling';
import { getGraphQlCallOptions } from '../../../../utils/endpointUrl';
import { buildCreateOrderSchema } from '../../../../modules/Payment/redux/schemas/create_order.schema';
jest.mock('../../../../utils/siteData.js');
jest.mock('../../../../utils/endpointUrl.js');

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

const setup = (props = {}) => {
	const wrapper = shallow(<PaymentHelper store={mockStore} {...props} />).dive();
	return wrapper;
};

describe('PaymentHelper Component Test Suite', () => {
	let props, wrapper;
	const openModalActionMock = jest.fn();
	const createOrderErrorMock = jest.fn();
	beforeEach(() => {
		props = {
			isTriggerSaveOrderBeforePayment: true,
			openModalAction: openModalActionMock,
			cardID: 'abc123',
			readerInformation: 'readerInformation',
			callCTAStyle: 'callCTAStyle',
			buttonAction: 'buttonAction',
			buttonLabel: 'buttonLabel'
		};
		wrapper = setup(props);
	});

	describe('render type check', () => {
		test('render check', () => {
			expect(wrapper.type()).toEqual(null);
		});
		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});
	});

	describe('prop types check', () => {
		test('has isTriggerSaveOrderBeforePayment as prop and is of type boolean', () => {
			const isTriggerSaveOrderBeforePaymentProp = wrapper.instance().props.isTriggerSaveOrderBeforePayment;
			expect(typeof isTriggerSaveOrderBeforePaymentProp).toBe('boolean');
		});
		test('has openModalAction as prop and is of type function', () => {
			const openModalActionProp = wrapper.instance().props.openModalAction;
			expect(typeof openModalActionProp).toBe('function');
		});
		test('has cardID as prop and is of type string', () => {
			const cardIDProp = wrapper.instance().props.cardID;
			expect(typeof cardIDProp).toBe('string');
		});
		test('has readerInformation as prop and is of type string', () => {
			const readerInformationProp = wrapper.instance().props.readerInformation;
			expect(typeof readerInformationProp).toBe('string');
		});
		test('has callCTAStyle as prop and is of type string', () => {
			const callCTAStyleProp = wrapper.instance().props.callCTAStyle;
			expect(typeof callCTAStyleProp).toBe('string');
		});
		test('has buttonAction as prop and is of type string', () => {
			const buttonActionProp = wrapper.instance().props.buttonAction;
			expect(typeof buttonActionProp).toBe('string');
		});
		test('has buttonLabel as prop and is of type string', () => {
			const buttonLabelProp = wrapper.instance().props.buttonLabel;
			expect(typeof buttonLabelProp).toBe('string');
		});

		test('componentDidMount function call check', () => {
			const componentDidMountMock = wrapper.instance().componentDidMount;
			expect(typeof componentDidMountMock).toBe('function');
		});

		test('has createOrderError as prop and is of type function', () => {
			const openModalActionProp = wrapper.instance().createOrderErrorMock;
			expect(typeof createOrderErrorMock).toBe('function');
		});
	});

	describe('API call', () => {
		const iterator = sagaDataHandling();
		test('call getGraphQlCallOptions', () => {
			const token = call(getJwtToken);
			const expectedYield = iterator.next().value;
			const actualYield = getGraphQlCallOptions(buildCreateOrderSchema('KcQoXXyGjSGDSIQo6U4nXdwEe04LAXAm'), token, null, {});
			expect(actualYield).not.toEqual(expectedYield);
		});
	});
});