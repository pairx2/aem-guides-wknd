import React from 'react';
import MinicartPopup from '../../../../../modules/Cart/components/MiniCart/MinicartPopup';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore, mockStoreOrder, mockStoreConfirmationPage, mockStoreDataLayer} from '../../../../../__mocks__/storeMock';
import {Provider} from 'react-redux';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props) => {
	const wrapper = shallow(<MinicartPopup store= {mockStore} {...props}/>).dive().dive().dive().dive();
	return wrapper;
};

const setupTwo = (props) => {
	const wrapper = shallow(<MinicartPopup store= {mockStoreConfirmationPage} {...props}/>).dive().dive().dive().dive();
	return wrapper;
};
const setupThree = (props) => {
	const wrapper = shallow(<MinicartPopup store= {mockStoreOrder} {...props}/>).dive().dive().dive().dive();
	return wrapper;
};

describe('MinicartPopup Component Test Suite with cartDetails object and isLogged as true', () => {
	let props;
	let wrapper;
	const hideMiniCartPopupMock = jest.fn();
	const getProductsRequestMock = jest.fn();
	const getCustomerCartRequestMock = jest.fn();
	const updateCartItemMock = jest.fn();

	beforeEach(() => {

		props= {
			cartHeading: 'cartHeading',
			downloadAppImage: 'downloadAppImage',
			downloadAppText: 'downloadAppText',
			learnMoreLinkText: 'learnMoreLinkText',
			learnMoreLinkDestination:'learnMoreLinkDestination',
			openTab: 'openTab',
			emptyCartMessage: 'emptyCartMessage',
			shoppingcartPage: 'shoppingcartPage',
			hideMiniCartPopup: hideMiniCartPopupMock,
			getProductsRequest: getProductsRequestMock,
			getCustomerCartRequest: getCustomerCartRequestMock,
			updateCartItem: updateCartItemMock,
			breakpoints : {
				mobile: 320,
				tablet: 768,
				desktop: 1025
			},
			currentBreakpoint: 'mobile',
			hideShowAppDetails: false
		};
		wrapper= setup(props);
	});

	describe('propTypes check', () => {

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});
	});

	describe('Functions check', () => {

		test('getCartItems function call', () => {
			const getCartItemsMock = wrapper.instance().getCartItems;
			expect(typeof getCartItemsMock).toBe('function');

			expect(getCartItemsMock()).toBeDefined();
			expect(typeof getCartItemsMock()).toBe('object');
		});

		test('isCartEmpty function call', () => {
			const isCartEmptyMock = wrapper.instance().isCartEmpty;
			expect(typeof isCartEmptyMock).toBe('function');

			expect(isCartEmptyMock()).toBeFalsy();
		});

		test('getCartTotalPrice function call', () => {
			const getCartTotalPriceMock = wrapper.instance().getCartTotalPrice;
			expect(typeof getCartTotalPriceMock).toBe('function');

			expect(getCartTotalPriceMock()).toBe(70);
		});

		test('componentDidMount function call', () => {
			const componentDidMountMock = wrapper.instance().componentDidMount;
			expect(typeof componentDidMountMock).toBe('function');

			wrapper.instance().componentDidMount();
			const getProductsRequestMockCallCount = getProductsRequestMock.mock.calls.length;
			expect(getProductsRequestMockCallCount).toBeDefined();

			const getCustomerCartRequestMockCallCount = getCustomerCartRequestMock.mock.calls.length;
			expect(getCustomerCartRequestMockCallCount).toBeDefined();
		});

		test('componentDidUpdate function call', () => {
			const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateMock).toBe('function');

			const prevProps= {canShowMiniCart: true};
			wrapper.instance().componentDidUpdate(prevProps);

			const updateCartItemMockCallCount = updateCartItemMock.mock.calls.length;
			expect(updateCartItemMockCallCount).toBeDefined();

			const hideMiniCartPopupMockCallCount = hideMiniCartPopupMock.mock.calls.length;
			expect(hideMiniCartPopupMockCallCount).toBeDefined();
			expect(hideMiniCartPopupMockCallCount).toBe(0);
		});
		test('componentDidUpdate function call', () => {
			const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateMock).toBe('function');

			const prevProps= {
				canShowMiniCart: false,
				cartDetails: {...wrapper.instance().props.cartDetails}
			};
			wrapper.instance().componentDidUpdate(prevProps);
		});
	});
});


describe('MinicartPopup Component Test Suite with empty cartDetails obj & isLoggedIn as false', () => {
	let props;
	let wrapper;
	const hideMiniCartPopupMock = jest.fn();
	const getProductsRequestMock = jest.fn();
	const getCustomerCartRequestMock = jest.fn();
	const updateCartItemMock = jest.fn();

	beforeEach(() => {

		props= {
			cartHeading: 'cartHeading',
			downloadAppImage: 'downloadAppImage',
			downloadAppText: 'downloadAppText',
			learnMoreLinkText: 'learnMoreLinkText',
			learnMoreLinkDestination:'learnMoreLinkDestination',
			openTab: 'openTab',
			emptyCartMessage: 'emptyCartMessage',
			shoppingcartPage: 'shoppingcartPage',
			hideMiniCartPopup: hideMiniCartPopupMock,
			getProductsRequest: getProductsRequestMock,
			getCustomerCartRequest: getCustomerCartRequestMock,
			updateCartItem: updateCartItemMock,
			breakpoints : {
				mobile: 320,
				tablet: 768,
				desktop: 1025
			},
			currentBreakpoint: 'tablet',
			hideShowAppDetails: false
		};

		wrapper= setupTwo(props);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('isCartEmpty test', () => {
		const isCartEmptyMock = wrapper.instance().isCartEmpty;
		expect(typeof isCartEmptyMock).toBe('function');

		expect(isCartEmptyMock()).toBeTruthy();
	});

	test('getCartTotalPrice test', () => {
		const getCartTotalPriceMock = wrapper.instance().getCartTotalPrice;
		expect(typeof getCartTotalPriceMock).toBe('function');

		expect(getCartTotalPriceMock()).toBe(0);
	});
	test('componentDidUpdate function call', () => {
		const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
		expect(typeof componentDidUpdateMock).toBe('function');

		const prevProps= {
			canShowMiniCart: false,
			cartDetails: {...wrapper.instance().props.cartDetails}
		};
		wrapper.instance().componentDidUpdate(prevProps);
	});
});
describe('MinicartPopup Component Test Suite with empty cartDetails obj & isLoggedIn as false', () => {
	let props;
	let wrapper;
	const hideMiniCartPopupMock = jest.fn();
	const getProductsRequestMock = jest.fn();
	const getCustomerCartRequestMock = jest.fn();
	const updateCartItemMock = jest.fn();

	beforeEach(() => {

		props= {
			cartHeading: 'cartHeading',
			downloadAppImage: 'downloadAppImage',
			downloadAppText: 'downloadAppText',
			learnMoreLinkText: 'learnMoreLinkText',
			learnMoreLinkDestination:'learnMoreLinkDestination',
			openTab: 'openTab',
			emptyCartMessage: 'emptyCartMessage',
			shoppingcartPage: 'shoppingcartPage',
			hideMiniCartPopup: hideMiniCartPopupMock,
			getProductsRequest: getProductsRequestMock,
			getCustomerCartRequest: getCustomerCartRequestMock,
			updateCartItem: updateCartItemMock,
			breakpoints : {
				mobile: 320,
				tablet: 768,
				desktop: 1025
			},
			currentBreakpoint: 'mobile',
			hideShowAppDetails: false
		};

		wrapper= setupTwo(props);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('isCartEmpty test', () => {
		const isCartEmptyMock = wrapper.instance().isCartEmpty;
		expect(typeof isCartEmptyMock).toBe('function');

		expect(isCartEmptyMock()).toBeTruthy();
	});

	test('getCartTotalPrice test', () => {
		const getCartTotalPriceMock = wrapper.instance().getCartTotalPrice;
		expect(typeof getCartTotalPriceMock).toBe('function');

		expect(getCartTotalPriceMock()).toBe(0);
	});
	test('componentDidUpdate function call', () => {
		const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
		expect(typeof componentDidUpdateMock).toBe('function');

		const prevProps= {
			canShowMiniCart: false,
			cartDetails: {...wrapper.instance().props.cartDetails}
		};
		wrapper.instance().componentDidUpdate(prevProps);
	});
});
describe('MinicartPopup Component Test Suite with cartDetails obj - 1 item & isLoggedIn as false', () => {
	let props;
	let wrapper;
	const hideMiniCartPopupMock = jest.fn();
	const getProductsRequestMock = jest.fn();
	const getCustomerCartRequestMock = jest.fn();
	const updateCartItemMock = jest.fn();

	beforeEach(() => {

		props= {
			cartHeading: 'cartHeading',
			downloadAppImage: 'downloadAppImage',
			downloadAppText: 'downloadAppText',
			learnMoreLinkText: 'learnMoreLinkText',
			learnMoreLinkDestination:'learnMoreLinkDestination',
			openTab: 'openTab',
			emptyCartMessage: 'emptyCartMessage',
			shoppingcartPage: 'shoppingcartPage',
			hideMiniCartPopup: hideMiniCartPopupMock,
			getProductsRequest: getProductsRequestMock,
			getCustomerCartRequest: getCustomerCartRequestMock,
			updateCartItem: updateCartItemMock,
			breakpoints : {
				mobile: 320,
				tablet: 768,
				desktop: 1025
			},
			currentBreakpoint: 'tablet',
			hideShowAppDetails: false
		};

		wrapper= setupThree(props);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});


describe('MinicartPopup Component Test Suite with mount', () => {
	let props;
	let wrapper;
	const hideMiniCartPopupMock = jest.fn();
	const getProductsRequestMock = jest.fn();
	const getCustomerCartRequestMock = jest.fn();
	const updateCartItemMock = jest.fn();

	beforeEach(() => {
		props= {
			cartHeading: 'cartHeading',
			downloadAppImage: 'downloadAppImage',
			downloadAppText: 'downloadAppText',
			learnMoreLinkText: 'learnMoreLinkText',
			learnMoreLinkDestination:'learnMoreLinkDestination',
			openTab: 'openTab',
			emptyCartMessage: 'emptyCartMessage',
			shoppingcartPage: 'shoppingcartPage',
			hideMiniCartPopup: hideMiniCartPopupMock,
			getProductsRequest: getProductsRequestMock,
			getCustomerCartRequest: getCustomerCartRequestMock,
			updateCartItem: updateCartItemMock,
			breakpoints : {
				mobile: 320,
				tablet: 768,
				desktop: 1025
			},
			currentBreakpoint: 'desktop',
			hideShowAppDetails: false
		};

		wrapper= mount(<Provider store= {mockStore} ><MinicartPopup {...props}/></Provider>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});
describe('MinicartPopup Component Test Suite with mount', () => {
	let props;
	let wrapper;
	const hideMiniCartPopupMock = jest.fn();
	const getProductsRequestMock = jest.fn();
	const getCustomerCartRequestMock = jest.fn();
	const updateCartItemMock = jest.fn();

	beforeEach(() => {
		props= {
			cartHeading: 'cartHeading',
			downloadAppImage: 'downloadAppImage',
			downloadAppText: 'downloadAppText',
			learnMoreLinkText: 'learnMoreLinkText',
			learnMoreLinkDestination:'learnMoreLinkDestination',
			openTab: 'openTab',
			emptyCartMessage: 'emptyCartMessage',
			shoppingcartPage: 'shoppingcartPage',
			hideMiniCartPopup: hideMiniCartPopupMock,
			getProductsRequest: getProductsRequestMock,
			getCustomerCartRequest: getCustomerCartRequestMock,
			updateCartItem: updateCartItemMock,
			breakpoints : {
				mobile: 320,
				tablet: 768,
				desktop: 1025
			},
			currentBreakpoint: 'desktop',
			hideShowAppDetails: false
		};

		wrapper= mount(<Provider store= {mockStoreDataLayer} ><MinicartPopup {...props}/></Provider>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});
