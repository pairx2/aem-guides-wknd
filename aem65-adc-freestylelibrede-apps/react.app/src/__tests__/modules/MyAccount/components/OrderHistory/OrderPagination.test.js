import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStoreConfirmationPage} from '../../../../../__mocks__/storeMock';
import OrderPagination from '../../../../../modules/MyAccount/components/OrderHistory/OrderPagination';
import {Provider} from 'react-redux';


Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

describe('OrderPagination component Test Suite with currentPagination as non-zero & i === currentPagination as false', () => {
	let props, wrapper;
	const setPaginationMock = jest.fn();

	beforeEach(() => {

		props = {
			currentPagination: 2,
			totalItemsCount: 800,
			itemsCountPerPage: 8,
			setPagination: setPaginationMock
		};

		wrapper = shallow(<OrderPagination {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
	test('onChange check',() => {
		expect(wrapper.props().children.props.children.props.onChange()).not.toBeDefined();
	});
	test('onClick check',() => {
		expect(wrapper.props().children.props.children.props.onClick()).not.toBeDefined();
	});
});

describe('OrderPagination component Test Suitev with mount', () => {
	let props, wrapper;
	const setPaginationMock = jest.fn();
	beforeEach(() => {

		props = {
			currentPagination: 2,
			totalItemsCount: 800,
			itemsCountPerPage: 8,
			setPagination: setPaginationMock
		};

		wrapper = mount(<Provider store= {mockStoreConfirmationPage}><OrderPagination {...props} /></Provider>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});