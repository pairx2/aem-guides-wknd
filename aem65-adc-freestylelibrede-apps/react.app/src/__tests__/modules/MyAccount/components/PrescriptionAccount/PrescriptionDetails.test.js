import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStoreConfirmationPage, mockStore} from '../../../../../__mocks__/storeMock';

import PrescriptionDetails from '../../../../../modules/MyAccount/components/PrescriptionAccount/PrescriptionDetails';
jest.mock('../../../../../utils/endpointUrl');

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props = {}) => {
	const wrapper = shallow(<PrescriptionDetails store={mockStoreConfirmationPage} {...props} />).dive().dive();
	return wrapper;
};
const setupOne = (props = {}) => {
	const wrapper = shallow(<PrescriptionDetails store={mockStore} {...props} />).dive().dive();
	return wrapper;
};

describe('PrescriptionDetails component Test Suite with valid rxmcOrder array & isDeactivated as false and status_code less than 50', () => {
	let props, wrapper;
	const openModalActionMock = jest.fn();
	const getOrdersByRxmcMock = jest.fn();
	const downloadDocumentRequestMock = jest.fn();
	const resetGhostOrdersSuccessMock = jest.fn();

	beforeEach(() => {

		props = {
			title: 'title',
			ghostOrder: {rxmc: 'rxmc', frontend_status: 10, status_code: 10, prescription_start_date: '11', payer_institution_name: 'payer_institution_name'},
			customer: {health_insurance_number: 'health_insurance_number'},
			dictionary: {dictionary: 'dictionary'},
			openModalAction: openModalActionMock,
			getOrdersByRxmc: getOrdersByRxmcMock,
			icon: 'icon',
			textdescription: 'textdescription',
			linktext: 'linktext',
			linkpath: 'linkpath',
			downloadDocumentRequest: downloadDocumentRequestMock,
			resetGhostOrdersSuccess: resetGhostOrdersSuccessMock,
			rxmcOrders: {},
			ghostType: 'completed_order'
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

		test('title is a prop of type string', () =>{
			const titleProp= wrapper.instance().props.title;
			expect(typeof titleProp).toBe('string');
		});

		test('icon is a prop of type string', () =>{
			const iconProp= wrapper.instance().props.icon;
			expect(typeof iconProp).toBe('string');
		});

		test('textdescription is a prop of type string', () =>{
			const textdescriptionProp= wrapper.instance().props.textdescription;
			expect(typeof textdescriptionProp).toBe('string');
		});

		test('linktext is a prop of type string', () =>{
			const linktextProp= wrapper.instance().props.linktext;
			expect(typeof linktextProp).toBe('string');
		});

		test('linkpath is a prop of type string', () =>{
			const linkpathProp= wrapper.instance().props.linkpath;
			expect(typeof linkpathProp).toBe('string');
		});

		test('orderList is a prop of type Array', () =>{
			const orderListProp= wrapper.instance().props.orderList;
			expect(orderListProp).toBeInstanceOf(Array);
		});

		test('ghostOrder is a prop of type Object', () =>{
			const ghostOrderProp= wrapper.instance().props.ghostOrder;
			expect(ghostOrderProp).toBeInstanceOf(Object);
		});

		test('customer is a prop of type Object', () =>{
			const customerProp= wrapper.instance().props.customer;
			expect(customerProp).toBeInstanceOf(Object);
		});

		test('dictionary is a prop of type Object', () =>{
			const dictionaryProp= wrapper.instance().props.dictionary;
			expect(dictionaryProp).toBeInstanceOf(Object);
		});

		test('openModalAction is a prop of type function', () =>{
			const openModalActionProp= wrapper.instance().props.openModalAction;
			expect(typeof openModalActionProp).toBe('function');
		});

		test('getOrdersByRxmc is a prop of type function', () =>{
			const getOrdersByRxmcProp= wrapper.instance().props.getOrdersByRxmc;
			expect(typeof getOrdersByRxmcProp).toBe('function');
		});

		test('ghostType is a prop of type string', () =>{
			const ghostType= wrapper.instance().props.ghostType;
			expect(typeof ghostType).toBe('string');
		});

	});

	describe('state check', () => {

		test('state check', () => {
			const stateCheck = wrapper.instance().state;
			expect(stateCheck).toBeInstanceOf(Object);

			const isDetailsOpenCheck = wrapper.instance().state.isDetailsOpen;
			expect(isDetailsOpenCheck).toBeFalsy();

			const orderCheck = wrapper.instance().state.order;
			expect(orderCheck).toBeInstanceOf(Object);
		});
	});

	describe('functions check', () => {

		test('getGhostOrder function call check', () => {
			const getGhostOrderMock = wrapper.instance().getGhostOrder;
			expect(typeof getGhostOrderMock).toBe('function');
			expect(wrapper.instance().getGhostOrder()).toBeInstanceOf(Object);
		});

		test('getStatusIcon function call check', () => {
			const getStatusIconMock = wrapper.instance().getStatusIcon;
			expect(typeof getStatusIconMock).toBe('function');

			expect(wrapper.instance().getStatusIcon(25)).toBe('large-x-circle-orange');
			expect(wrapper.instance().getStatusIcon(20)).toBe('tick-circle-blue');
			expect(wrapper.instance().getStatusIcon(10)).toBe('waiting-icon');
			expect(wrapper.instance().getStatusIcon(0)).toBe('tick-circle-blue');
		});

		test('doesCustomerRequired function call check', () => {
			const doesCustomerRequiredMock = wrapper.instance().doesCustomerRequired;
			expect(typeof doesCustomerRequiredMock).toBe('function');
			expect(wrapper.instance().doesCustomerRequired(25)).toBeTruthy();
			expect(wrapper.instance().doesCustomerRequired(11)).toBeFalsy();
		});

		test('deActivateSubscription function call check', () => {
			const deActivateSubscriptionMock = wrapper.instance().deActivateSubscription;
			expect(typeof deActivateSubscriptionMock).toBe('function');

			wrapper.instance().deActivateSubscription();
			const openModalActionMockCount = openModalActionMock.mock.calls.length;
			expect(openModalActionMockCount).toBeDefined();
		});

		test('toggleDetails function call check', () => {
			wrapper.instance().setState({isDetailsOpen: false});
			const toggleDetailsMock = wrapper.instance().toggleDetails;
			expect(typeof toggleDetailsMock).toBe('function');
			wrapper.instance().toggleDetails();
			expect(wrapper.instance().state.order).toBeInstanceOf(Object);
		});
		test('toggleDetails function call check', () => {
			wrapper.instance().setState({isDetailsOpen: true});
			const toggleDetailsMock = wrapper.instance().toggleDetails;
			expect(typeof toggleDetailsMock).toBe('function');
			wrapper.instance().toggleDetails();
			expect(wrapper.instance().state.order).toBeInstanceOf(Object);
		});

		test('downloadDocumentRequest function call in action property of Button', () => {
			const actionProp = wrapper.props().children[2].props.children.props.children[1][1].props.children.props.action;
			expect(typeof actionProp).toBe('function');
			actionProp('claim_receipt');
			const downloadDocumentRequestMockCount= downloadDocumentRequestMock.mock.calls.length;
			expect(downloadDocumentRequestMockCount).toBeDefined();
		});

		test('canBeDeactivated function call check', () => {
			const canBeDeactivatedMock = wrapper.instance().canBeDeactivated;
			expect(typeof canBeDeactivatedMock).toBe('function');

			expect(wrapper.instance().canBeDeactivated(0)).toBeTruthy();
		});

	});

});

describe('PrescriptionDetails component Test Suite with diff rxmcOrder array & isDeactivated as true and status_code less than 50', () => {
	let props, wrapper;
	const openModalActionMock = jest.fn();
	const getOrdersByRxmcMock = jest.fn();
	const resetGhostOrdersSuccessMock = jest.fn();

	beforeEach(() => {

		props = {
			title: 'title',
			// ghostOrder: {ghostOrder: 'ghostOrder1'},
			ghostOrder: {rxmc: 'rxmc1', status_code: 30, prescription_start_date: '11', payer_institution_name: 'payer_institution_name'},
			customer: {health_insurance_number: 'health_insurance_number'},
			dictionary: {dictionary: 'dictionary'},
			openModalAction: openModalActionMock,
			getOrdersByRxmc: getOrdersByRxmcMock,
			icon: 'icon',
			textdescription: 'textdescription',
			linktext: 'linktext',
			linkpath: 'linkpath',
			resetGhostOrdersSuccess: resetGhostOrdersSuccessMock
		};
		wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('getGhostOrder function call check', () => {
		const getGhostOrderMock = wrapper.instance().getGhostOrder;
		expect(typeof getGhostOrderMock).toBe('function');

		expect(wrapper.instance().getGhostOrder()).toBeUndefined();
	});

	test('toggleDetails function call check', () => {
		wrapper.instance().setState({isDetailsOpen: false});
		const toggleDetailsMock = wrapper.instance().toggleDetails;
		expect(typeof toggleDetailsMock).toBe('function');

		wrapper.instance().toggleDetails();
		const getOrdersByRxmcMockCount = getOrdersByRxmcMock.mock.calls.length;
		expect(getOrdersByRxmcMockCount).toBeDefined();
	});
});
describe('PrescriptionDetails component Test Suite with diff rxmcOrder array & isDeactivated as true and status_code less than 50', () => {
	let props, wrapper;
	const openModalActionMock = jest.fn();
	const getOrdersByRxmcMock = jest.fn();
	const resetGhostOrdersSuccessMock = jest.fn();

	beforeEach(() => {

		props = {
			title: 'title',
			// ghostOrder: {ghostOrder: 'ghostOrder1'},
			ghostOrder: {rxmc: '0008RK', status_code: 30, prescription_start_date: '11', payer_institution_name: 'payer_institution_name'},
			customer: {health_insurance_number: 'health_insurance_number'},
			dictionary: {dictionary: 'dictionary'},
			openModalAction: openModalActionMock,
			getOrdersByRxmc: getOrdersByRxmcMock,
			icon: 'icon',
			textdescription: 'textdescription',
			linktext: 'linktext',
			linkpath: 'linkpath',
			resetGhostOrdersSuccess: resetGhostOrdersSuccessMock
		};
		wrapper = setupOne(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('getGhostOrder function call check', () => {
		const getGhostOrderMock = wrapper.instance().getGhostOrder;
		expect(typeof getGhostOrderMock).toBe('function');

		expect(wrapper.instance().getGhostOrder()).toBeUndefined();
	});

	test('toggleDetails function call check', () => {
		wrapper.instance().setState({isDetailsOpen: false});
		const toggleDetailsMock = wrapper.instance().toggleDetails;
		expect(typeof toggleDetailsMock).toBe('function');

		wrapper.instance().toggleDetails();
		const getOrdersByRxmcMockCount = getOrdersByRxmcMock.mock.calls.length;
		expect(getOrdersByRxmcMockCount).toBeDefined();
	});
});