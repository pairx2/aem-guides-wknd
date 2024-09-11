import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import ChangeDeliveryDateModal from '../../../../../modules/MyAccount/components/CurrentOrderOverview/ChangeDeliveryDateModal';

import {mockStore, mockStoreConfirmationPage} from '../../../../../__mocks__/storeMock';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props= {}) => {
	const wrapper = shallow(<ChangeDeliveryDateModal store= {mockStore} {...props}/>).dive().dive();
	return wrapper;
};

const setupTwo = (props) => {
	const wrapper = shallow(<ChangeDeliveryDateModal store={mockStoreConfirmationPage} {...props} />).dive().dive();
	return wrapper;
};

const productData= [{
	'index':1,
	'productSKU':'S5269856',
	'productName':'FreeStyle Libre Sensor v1',
	'productQuantity':1,
	'productRescheduledDueDate':null,
	'productDueDateWindow':'14,14',
	'productDeliverable': [{
		'sku': '71988-01',
		'deliverable_id': 'DLV-000019410'
	}],
	'numberofDaysBeforeDueDateChange':14
}];

describe('ChangeDeliveryDateModal Component Test Suite with DeliveryDate and without productDateOfNextShipment & productOriginalDateFrom', () => {

	let props, wrapper;
	const closeModalActionMock = jest.fn();
	const updateDeliveryDateRequestMock = jest.fn();
	const resetDeliveryDateModalMock = jest.fn();

	beforeEach(() => {
		props = {
			updateDeliveryDateRequest: updateDeliveryDateRequestMock,
			order: {
				'index':1,
				'orderId':'DEBAAAAAIS',
				'productData': productData
			},
			closeModalAction: closeModalActionMock,
			resetDeliveryDateModal: resetDeliveryDateModalMock,
			productDueDateWindow: '14,14',
			deliveryDate: '03.03.2031',
			numberofDaysBeforeDueDateChange: 14
		};
		wrapper= setup(props);
	});

	describe('propTypes check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('isDeliveryDateLoading is a prop of type boolean', () => {
			const isDeliveryDateLoadingProp = wrapper.instance().props.isDeliveryDateLoading;
			expect(typeof isDeliveryDateLoadingProp).toBe('boolean');
		});

		test('isDeliveryDateUpdated is a prop of type boolean', () => {
			const isDeliveryDateUpdatedProp = wrapper.instance().props.isDeliveryDateUpdated;
			expect(typeof isDeliveryDateUpdatedProp).toBe('boolean');
		});

		test('order is a prop of type object', () => {
			const orderProp = wrapper.instance().props.order;
			expect(orderProp).toBeInstanceOf(Object);
		});

		test('updateDeliveryDateRequest is a prop of type function', () => {
			const updateDeliveryDateRequestProp = wrapper.instance().props.updateDeliveryDateRequest;
			expect(typeof updateDeliveryDateRequestProp).toBe('function');
		});

		test('closeModalAction is a prop of type function', () => {
			const closeModalActionProp = wrapper.instance().props.closeModalAction;
			expect(typeof closeModalActionProp).toBe('function');
		});

		test('resetDeliveryDateModal is a prop of type function', () => {
			const resetDeliveryDateModalProp = wrapper.instance().props.resetDeliveryDateModal;
			expect(typeof resetDeliveryDateModalProp).toBe('function');
		});

	});

	describe('state check', () => {

		test('state check', () => {
			const stateCheck = wrapper.instance().state;
			expect(stateCheck).toBeInstanceOf(Object);

			expect(stateCheck.deliveryDate).toBeInstanceOf(Date);
			expect(stateCheck.selectedDate).toBeInstanceOf(Date);
			expect(stateCheck.isCalendarOpen).toBeFalsy();
		});

	});

	describe('Functions check', () => {

		test('handleChange function call check', () => {
			const handleChangeMock = wrapper.instance().handleChange;
			expect(typeof handleChangeMock).toBe('function');

			handleChangeMock(1590135502760);
			expect(wrapper.instance().state.selectedDate).toEqual(1590135502760);
		});

		test('handleConfirm function call check', () => {
			const handleConfirmMock = wrapper.instance().handleConfirm;
			expect(typeof handleConfirmMock).toBe('function');

			handleConfirmMock(1590135567182);
			expect(wrapper.instance().state.deliveryDate).toEqual(1590135567182);
			expect(wrapper.instance().state.isCalendarOpen).toBeFalsy();
		});

		test('toggleCalendar function call check', () => {
			const toggleCalendarMock = wrapper.instance().toggleCalendar;
			expect(typeof toggleCalendarMock).toBe('function');

			toggleCalendarMock();
			expect(wrapper.instance().state.isCalendarOpen).toBeTruthy();
		});

		test('updateDeliveryDate function call check', () => {
			const updateDeliveryDateMock = wrapper.instance().updateDeliveryDate;
			expect(typeof updateDeliveryDateMock).toBe('function');

			updateDeliveryDateMock();
			const updateDeliveryDateRequestMockCallCount = updateDeliveryDateRequestMock.mock.calls.length;
			expect(updateDeliveryDateRequestMockCallCount).toBeDefined();
		});

		test('componentWillUnmount function call check', () => {
			const componentWillUnmountMock = wrapper.instance().componentWillUnmount;
			expect(typeof componentWillUnmountMock).toBe('function');

			wrapper.instance().componentWillUnmount();
			const resetDeliveryDateModalMockCallCount = resetDeliveryDateModalMock.mock.calls.length;
			expect(resetDeliveryDateModalMockCallCount).toBeDefined();
		});

		test('getDate function call check', () => {
			const getDateMock = wrapper.instance().getDate;
			expect(typeof getDateMock).toBe('function');

			const returnValue = getDateMock();
			expect(returnValue).toBeInstanceOf(Date);
		});

		test('getMinDate function call check', () => {
			const getMinDateMock = wrapper.instance().getMinDate;
			expect(typeof getMinDateMock).toBe('function');

			const returnValue = getMinDateMock();
			expect(returnValue).toBeDefined();
		});

	});

});

describe('ChangeDeliveryDateModal Component Test Suite with only productDateOfNextShipment', () => {

	let props, wrapper;
	const closeModalActionMock = jest.fn();
	const updateDeliveryDateRequestMock = jest.fn();
	const resetDeliveryDateModalMock = jest.fn();

	beforeEach(() => {
		props = {
			updateDeliveryDateRequest: updateDeliveryDateRequestMock,
			order: {
				'index':1,
				'orderId':'DEBAAAAAIS',
				'productData': productData
			},
			closeModalAction: closeModalActionMock,
			resetDeliveryDateModal: resetDeliveryDateModalMock,
			isDeliveryDateUpdated: false,
			isDeliveryDateLoading: false,
			productDateOfNextShipment: 1575808000000,
			productDueDateWindow: '14,14',
			deliveryDateUpdationError: null,
			productOriginalDateOfNextShipment: 1717027200000,
			numberofDaysBeforeDueDateChange: 14
		};
		wrapper= setupTwo(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('getDate function call check', () => {
		const getDateMock = wrapper.instance().getDate;
		expect(typeof getDateMock).toBe('function');

		const returnValue = getDateMock();
		expect(returnValue).toBeInstanceOf(Date);
	});

	test('getMinDate function call check', () => {
		const getMinDateMock = wrapper.instance().getMinDate;
		expect(typeof getMinDateMock).toBe('function');

		const returnValue = getMinDateMock();
		expect(returnValue).toBeDefined();
	});

});

describe('ChangeDeliveryDateModal Component Test Suite with only productOriginalDateFrom', () => {

	let props, wrapper;
	const closeModalActionMock = jest.fn();
	const updateDeliveryDateRequestMock = jest.fn();
	const resetDeliveryDateModalMock = jest.fn();

	beforeEach(() => {
		props = {
			updateDeliveryDateRequest: updateDeliveryDateRequestMock,
			order: {
				'index':1,
				'orderId':'DEBAAAAAIS',
				'productData': productData
			},
			closeModalAction: closeModalActionMock,
			resetDeliveryDateModal: resetDeliveryDateModalMock,
			isDeliveryDateUpdated: false,
			isDeliveryDateLoading: false,
			productOriginalDateFrom: '1575808000000',
			productDueDateWindow: '14,14',
			deliveryDate: '',
			deliveryDateUpdationError: null,
			numberofDaysBeforeDueDateChange: 14,
			productOriginalDateOfNextShipment: 1717027200000
		};
		wrapper= setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('renderCustomHeader method inside DatePicker tag', () => {
		const renderCustomHeaderProp = wrapper.props().children[1].props.children[2].props.children[2].props.renderCustomHeader;
		expect(typeof renderCustomHeaderProp).toBe('function');
		expect(renderCustomHeaderProp.name).toBe('renderCustomHeader');

		expect(renderCustomHeaderProp('20/11/2012', 1, 2)).toBeDefined();
		expect(typeof renderCustomHeaderProp('20/11/2012', 1, 2)).toBe('object');
	});

	test('getDate function call check', () => {
		const getDateMock = wrapper.instance().getDate;
		expect(typeof getDateMock).toBe('function');

		const returnValue = getDateMock();
		expect(returnValue).toBeInstanceOf(Date);
	});

	test('getMinDate function call check', () => {
		const getMinDateMock = wrapper.instance().getMinDate;
		expect(typeof getMinDateMock).toBe('function');

		const returnValue = getMinDateMock();
		expect(returnValue).toBeDefined();
	});

});

describe('ChangeDeliveryDateModal Component Test Suite with only productOriginalDateFrom', () => {

	let props, wrapper;
	const closeModalActionMock = jest.fn();
	const updateDeliveryDateRequestMock = jest.fn();
	const resetDeliveryDateModalMock = jest.fn();

	beforeEach(() => {
		props = {
			updateDeliveryDateRequest: updateDeliveryDateRequestMock,
			order: {
				'index':1,
				'orderId':'DEBAAAAAIS',
				'productData': productData
			},
			closeModalAction: closeModalActionMock,
			resetDeliveryDateModal: resetDeliveryDateModalMock,
			isDeliveryDateUpdated: false,
			isDeliveryDateLoading: false,
			productOriginalDateFrom: 1717027200000,
			productDueDateWindow: '14,14',
			deliveryDate: '',
			deliveryDateUpdationError: null,
			numberofDaysBeforeDueDateChange: 14,
		};
		wrapper= setupTwo(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('getDate function call check', () => {
		const getDateMock = wrapper.instance().getDate;
		expect(typeof getDateMock).toBe('function');

		const returnValue = getDateMock();
		expect(returnValue).toBeInstanceOf(Date);
	});

	test('getMinDate function call check', () => {
		const getMinDateMock = wrapper.instance().getMinDate;
		expect(typeof getMinDateMock).toBe('function');

		const returnValue = getMinDateMock();
		expect(returnValue).toBeDefined();
	});

});







