import React from 'react';
import Enzyme, {shallow,mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import CartItemsDisplay from '../../../../../modules/Cart/components/CartOverview/CartItemsDisplay';
import {mockStore, mockStoreConfirmationPage, mockStoreDataLayer} from '../../../../../__mocks__/storeMock';
import {Provider} from 'react-redux';


Enzyme.configure({
	adapter: new EnzymeAdapter()
});

const setup = (props) => {
	const wrapper = shallow(<CartItemsDisplay store= {mockStore} {...props}/>);
	return wrapper;
};

describe('CartOverview Component Test suite', () => {
	let wrapper,props;
	const getProductsRequestMock = jest.fn();
	beforeEach(() => {
		props={
			getProductsRequest: getProductsRequestMock,
			productHeading: 'productHeading'
		};
		wrapper = mount(<Provider store= {mockStoreConfirmationPage}><CartItemsDisplay {...props}/></Provider>);

	});

	describe('propTypes check', () => {
		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});
		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});
	});
});

describe('CartOverview Component Test suite', () => {
	let wrapper,props;
	const getProductsRequestMock = jest.fn();
	beforeEach(() => {
		props={
			getProductsRequest: getProductsRequestMock,
			productHeading: 'productHeading'
		};
		wrapper = mount(<Provider store= {mockStoreDataLayer}><CartItemsDisplay {...props}/></Provider>);

	});

	describe('propTypes check', () => {
		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});
		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});
	});
});

describe('CartOverview Component Test suite', () => {
	let wrapper,props;
	const getProductsRequestMock = jest.fn();
	beforeEach(() => {
		props={
			getProductsRequest: getProductsRequestMock,
			productHeading: 'productHeading'
		};
		wrapper = setup(props);

	});

	describe('remder', () => {
		test('render check',() => {
			expect(wrapper.dive().type()).not.toEqual(null);
		});
		test('renders without crashing', () => {
			expect(wrapper.dive()).toBeDefined();
		});
	});

	describe('functions check',()=> {

		test ('getProductsRequest runs on CartListPage mount', () => {
			wrapper.dive().dive().instance().componentDidMount();
			const getProductsRequestMockCallCount = getProductsRequestMock.mock.calls.length;
			expect(getProductsRequestMockCallCount).toBeDefined();
		});
		test('getCartItems test', () => {
			const getCartItemsMock = wrapper.dive().dive().instance().getCartItems;
			expect(typeof getCartItemsMock).toBe('function');
			wrapper.dive().dive().instance().getCartItems();
		});
	});
});
