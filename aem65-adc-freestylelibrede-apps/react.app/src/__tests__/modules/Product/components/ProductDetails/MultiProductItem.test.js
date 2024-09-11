import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore} from "../../../../../__mocks__/storeMock";
import MultiProductItem from "../../../../../modules/Product/components/ProductDetails/MultiProductItem";
import { Provider } from 'react-redux';
Enzyme.configure({

	adapter: new EnzymeAdapter(),
});
const setup = (props) => {
	const wrapper = shallow(<MultiProductItem store={mockStore} {...props}/>).dive();
	return wrapper;
};
const setupTwo = (props) => {
	const wrapper = mount(<Provider store={mockStore}><MultiProductItem  {...props}/></Provider>);
	return wrapper;
}
const product= {
	'id': 1,
	'sku': '1-71538-01',
	'name': 'Simple Product',
	'uom': 90,
	'product_version': 1,
	'cs_available_for_purchase': false,
	'image_url': 'https://abbott-magento2.test/static/version1563452614/graphql/_view/en_US/Magento_Catalog/images/product/placeholder/image.jpg',
	'url': 'https://abbott-magento2.test/simple-product.html',
	'min_sale_qty': '2',
	'max_sale_qty': '10',
	'price': '20.0000',
	'max_order_quantity': '3',
	'is_subscription': true,
	'bundle_options': [{
		'id': 1,
		'quantity': 2,
		'position': 'position',
		'label': 'label',
		'values': [{quantity: 2, price: 22}]
	},{
		'id': 2,
		'quantity': 2,
		'position': 'position',
		'label': 'label',
		'values': [{quantity: 2, price: 22}]
	}],
};

describe('MultiProductItem Component Test Suite with listLength true', () => {
	let props, wrapper;
	const handleSecondRadioButtonMock = jest.fn();
	const handleConfirmMock = jest.fn();
	const handleChangeMock = jest.fn();
	const toggleCalenderMock = jest.fn();
	const getProductPriceMock = jest.fn();
	beforeEach(() => {
		props = {

			index: "0",
			sku: "1-71538-01",
			product: product,
			description: "Test",
			breakpoints: {mobile: 320, tablet: 768, desktop: 1025},
			currentBreakpoint: 'mobile',
			subscriptionOption: '1',
			selectedProduct: null,
			handleSecondRadioButton: handleSecondRadioButtonMock,
			radioSelectionCheck: true,
			handleConfirm: handleConfirmMock,
			selectedDate: null,
			deliveryDate: null,
			handleChange: handleChangeMock,
			toggleCalendar: toggleCalenderMock,
			isCalendarOpen: true,
			changeRadioValueButton: false,
			getProductPrice : getProductPriceMock,
			listLength : true,
			productPageModel: {
				templateType: "multiproductv2"
			}
		};

		wrapper = setup(props);
	});
	describe('Render', () => {
		test('render check', () => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});
	});

	describe('Functions check', () => {
		test('getSubscriptionSelectedOptionLabel function call check', () => {
			const getSubscriptionSelectedOptionLabelMock = wrapper.instance().getSubscriptionSelectedOptionLabel;
			expect(typeof getSubscriptionSelectedOptionLabelMock).toBe('function');
			expect(getSubscriptionSelectedOptionLabelMock()).toBe("label");
		});
		test('getFirstDeliveryDate function call returning null check', () => {
			const getFirstDeliveryDateMock = wrapper.instance().getFirstDeliveryDate;

			var getFirstDeliveryDate = new Date(getFirstDeliveryDateMock());
			var tomorrow = new Date();
			tomorrow.setDate(tomorrow.getDate() + 1);

			expect(typeof getFirstDeliveryDateMock).toBe('function');
			expect(getFirstDeliveryDateMock()).toBeDefined();
			expect(getFirstDeliveryDate.toDateString()).toEqual(tomorrow.toDateString());
		});
		
	});
});

describe('MultiProductItem Component Test Suite with listLength true', () => {
	let props, wrapper;
	const handleSecondRadioButtonMock = jest.fn();
	const handleConfirmMock = jest.fn();
	const handleChangeMock = jest.fn();
	const toggleCalenderMock = jest.fn();
	const getProductPriceMock = jest.fn();
	beforeEach(() => {
		props = {

			index: "0",
			sku: "1-71538-01",
			product: product,
			description: "Test",
			breakpoints: {mobile: 320, tablet: 768, desktop: 1025},
			currentBreakpoint: 'mobile',
			subscriptionOption: '1',
			selectedProduct: null,
			handleSecondRadioButton: handleSecondRadioButtonMock,
			radioSelectionCheck: false,
			handleConfirm: handleConfirmMock,
			selectedDate: null,
			deliveryDate: null,
			handleChange: handleChangeMock,
			toggleCalendar: toggleCalenderMock,
			changeRadioValueButton: true,
			isCalendarOpen: true,
			getProductPrice : getProductPriceMock,
			listLength : true,
			productPageModel: {
				templateType: "multiproductv2"
			}
		};

		wrapper = setup(props);
	});
	describe('Render', () => {
		test('render check', () => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});
	});

	describe('Functions check', () => {
		test('getSubscriptionSelectedOptionLabel function call check', () => {
			const getSubscriptionSelectedOptionLabelMock = wrapper.instance().getSubscriptionSelectedOptionLabel;
			expect(typeof getSubscriptionSelectedOptionLabelMock).toBe('function');
			expect(getSubscriptionSelectedOptionLabelMock()).toBe("label");
		});
		test('getFirstDeliveryDate function call returning null check', () => {
			const getFirstDeliveryDateMock = wrapper.instance().getFirstDeliveryDate;

			var getFirstDeliveryDate = new Date(getFirstDeliveryDateMock());
			var tomorrow = new Date();
			tomorrow.setDate(tomorrow.getDate() + 1);

			expect(typeof getFirstDeliveryDateMock).toBe('function');
			expect(getFirstDeliveryDateMock()).toBeDefined();
			expect(getFirstDeliveryDate.toDateString()).toEqual(tomorrow.toDateString());
		});
	});
});


describe('MultiProductItem Component Test Suite with listLength false', () => {
	let props, wrapper;
	const handleSecondRadioButtonMock = jest.fn();
	const handleConfirmMock = jest.fn();
	const handleChangeMock = jest.fn();
	const toggleCalenderMock = jest.fn();
	const getProductPriceMock = jest.fn();
	beforeEach(() => {
		props = {

			index: "0",
			sku: "1",
			product: product,
			description: "Test",
			breakpoints: {mobile: 320, tablet: 768, desktop: 1025},
			currentBreakpoint: 'mobile',
			subscriptionOption: {
				label: "0"
			},
			selectedProduct: null,
			handleSecondRadioButton: handleSecondRadioButtonMock,
			radioSelectionCheck: false,
			handleConfirm: handleConfirmMock,
			selectedDate: null,
			deliveryDate: null,
			handleChange: handleChangeMock,
			toggleCalendar: toggleCalenderMock,
			isCalendarOpen: true,
			getProductPrice : getProductPriceMock,
			listLength : false,
			productPageModel : {templateType: "v1product"},
			changeRadioValueButton: false
		};

		wrapper = setup(props);
	});
	describe('Render', () => {
		test('render check', () => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});
	});

	describe('Functions check', () => {

		test('getSubscriptionSelectedOptionLabel function call check', () => {
			const getSubscriptionSelectedOptionLabelMock = wrapper.instance().getSubscriptionSelectedOptionLabel;
			expect(typeof getSubscriptionSelectedOptionLabelMock).toBe('function');
			expect(getSubscriptionSelectedOptionLabelMock()).toBeDefined();
		});
		test('getFirstDeliveryDate function call returning null check', () => {
			const getFirstDeliveryDateMock = wrapper.instance().getFirstDeliveryDate;

			var getFirstDeliveryDate = new Date(getFirstDeliveryDateMock());
			var tomorrow = new Date();
			tomorrow.setDate(tomorrow.getDate() + 1);

			expect(typeof getFirstDeliveryDateMock).toBe('function');
			expect(getFirstDeliveryDateMock()).toBeDefined();
			expect(getFirstDeliveryDate.toDateString()).toEqual(tomorrow.toDateString());
		});
	});
});

describe('MultiProductItem Component Test Suite with listLength true and radioSelectionCheck false', () => {
	let props, wrapper;
	const handleSecondRadioButtonMock = jest.fn();
	const handleConfirmMock = jest.fn();
	const handleChangeMock = jest.fn();
	const toggleCalenderMock = jest.fn();
	const getProductPriceMock = jest.fn();
	beforeEach(() => {
		props = {

			index: "0",
			sku: "1-71538-01",
			product: {'bundle_options': [{
					'id': 1,
					'quantity': 2,
					'position': 'position',
					'label': 'label',
					'values': [{quantity: 2, price: 22}]

				}],
				first_delivery_date_after : "0.0",
			is_subscription: false},
			description: "Test",
			breakpoints: {mobile: 320, tablet: 768, desktop: 1025},
			currentBreakpoint: 'mobile',
			subscriptionOption: {
				label: "0"
			},
			selectedProduct: null,
			handleSecondRadioButton: handleSecondRadioButtonMock,
			radioSelectionCheck: false,
			handleConfirm: handleConfirmMock,
			selectedDate: null,
			deliveryDate: null,
			handleChange: handleChangeMock,
			toggleCalendar: toggleCalenderMock,
			isCalendarOpen: true,
			getProductPrice : getProductPriceMock,
			listLength : false,
			productPageModel: {
				templateType: "multiproductv2"
			},
			changeRadioValueButton : false
		};

		wrapper = setup(props);
	});
	describe('Render', () => {
		test('render check', () => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});
	});

	describe('Functions check', () => {
		test('getSubscriptionSelectedOptionLabel function call check', () => {
			const getSubscriptionSelectedOptionLabelMock = wrapper.instance().getSubscriptionSelectedOptionLabel;
			expect(typeof getSubscriptionSelectedOptionLabelMock).toBe('function');
			expect(getSubscriptionSelectedOptionLabelMock()).toBeDefined();
		});
		test('getFirstDeliveryDate function call returning null check', () => {
			const getFirstDeliveryDateMock = wrapper.instance().getFirstDeliveryDate;

			var getFirstDeliveryDate = new Date(getFirstDeliveryDateMock());
			var tomorrow = new Date();
			tomorrow.setDate(tomorrow.getDate() + 1);

			expect(typeof getFirstDeliveryDateMock).toBe('function');
			expect(getFirstDeliveryDateMock()).toBeDefined();
			expect(getFirstDeliveryDate.toDateString()).toEqual(tomorrow.toDateString());
		});
	});
});

describe('MultiProductItem Component Test Suite with listLength true and radioSelectionCheck false', () => {
	let props, wrapper;
	const handleSecondRadioButtonMock = jest.fn();
	const handleConfirmMock = jest.fn();
	const handleChangeMock = jest.fn();
	const toggleCalenderMock = jest.fn();
	const getProductPriceMock = jest.fn();
	beforeEach(() => {
		props = {

			index: "0",
			sku: "1-71538-01",
			product: {'bundle_options': [{
					'id': 1,
					'quantity': 2,
					'position': 'position',
					'label': 'label',
					'values': [{quantity: 2, price: 22}]

				}],
				first_delivery_date_after : "0.0",
			is_subscription: false},
			description: "Test",
			breakpoints: {mobile: 320, tablet: 768, desktop: 1025},
			currentBreakpoint: 'mobile',
			subscriptionOption: {
				label: "0"
			},
			selectedProduct: null,
			handleSecondRadioButton: handleSecondRadioButtonMock,
			radioSelectionCheck: false,
			handleConfirm: handleConfirmMock,
			selectedDate: null,
			deliveryDate: null,
			handleChange: handleChangeMock,
			toggleCalendar: toggleCalenderMock,
			isCalendarOpen: true,
			getProductPrice : getProductPriceMock,
			listLength : false,
			productPageModel: {
				templateType: "multiproductv2"
			},
			changeRadioValueButton : true,
			addedFromPDP : true
		};

		wrapper = setup(props);
	});
	describe('Render', () => {
		test('render check', () => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});
	});
});

describe('MultiProductItem Component Test Suite with listLength true and radioSelectionCheck true & templateType not equal to multiproductv2', () => {
	let props, wrapper;
	const handleSecondRadioButtonMock = jest.fn();
	const handleConfirmMock = jest.fn();
	const handleChangeMock = jest.fn();
	const toggleCalenderMock = jest.fn();
	const getProductPriceMock = jest.fn();
	beforeEach(() => {
		props = {

			index: "0",
			sku: "1-71538-01",
			product: {'bundle_options': [{
					'id': 1,
					'quantity': 2,
					'position': 'position',
					'label': 'label',
					'values': [{quantity: 2, price: 22}]

				}],first_delivery_date_after : "0.0"},
			description: "Test",
			breakpoints: {mobile: 320, tablet: 768, desktop: 1025},
			currentBreakpoint: 'mobile',
			subscriptionOption: {
				label: "0"
			},
			selectedProduct: null,
			handleSecondRadioButton: handleSecondRadioButtonMock,
			radioSelectionCheck: true,
			handleConfirm: handleConfirmMock,
			selectedDate: null,
			deliveryDate: null,
			handleChange: handleChangeMock,
			toggleCalendar: toggleCalenderMock,
			isCalendarOpen: true,
			getProductPrice : getProductPriceMock,
			listLength : true,
			productPageModel: {
				templateType: "v2product"
			},
			changeRadioValueButton : false,
			addedFromPDP : true
		};

		wrapper = setup(props);
	});
	describe('Render', () => {
		test('render check', () => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});
	});

});

describe('onclick test for multiproduct-v2', () => {
	let props, wrapper;
	const handleSecondRadioButtonMock = jest.fn();
	const handleConfirmMock = jest.fn();
	const handleChangeMock = jest.fn();
	const toggleCalenderMock = jest.fn();
	const getProductPriceMock = jest.fn();
	beforeEach(() => {
		props = {

			index: "0",
			sku: "1-71538-01",
			product: {'bundle_options': [{
					'id': 1,
					'quantity': 2,
					'position': 'position',
					'label': 'label',
					'values': [{quantity: 2, price: 22}]

				}],first_delivery_date_after : "0.0"},
			description: "Test",
			breakpoints: {mobile: 320, tablet: 768, desktop: 1025},
			currentBreakpoint: 'mobile',
			subscriptionOption: {
				label: "0"
			},
			selectedProduct: null,
			handleSecondRadioButton: handleSecondRadioButtonMock,
			radioSelectionCheck: false,
			handleConfirm: handleConfirmMock,
			selectedDate: null,
			deliveryDate: null,
			handleChange: handleChangeMock,
			toggleCalendar: toggleCalenderMock,
			isCalendarOpen: true,
			getProductPrice : getProductPriceMock,
			listLength : true,
			productPageModel: {
				templateType: "multiproductv2"
			},
			changeRadioValueButton : false
		};

		wrapper = setupTwo(props);
	});
	

});
describe('onclick test for multiproduct-v1', () => {
	let props, wrapper;
	const handleSecondRadioButtonMock = jest.fn();
	const handleConfirmMock = jest.fn();
	const handleChangeMock = jest.fn();
	const toggleCalenderMock = jest.fn();
	const getProductPriceMock = jest.fn();
	beforeEach(() => {
		props = {

			index: "0",
			sku: "1-71538-01",
			product: {'bundle_options': [{
					'id': 1,
					'quantity': 2,
					'position': 'position',
					'label': 'label',
					'values': [{quantity: 2, price: 22}]

				}],first_delivery_date_after : "0.0"},
			description: "Test",
			breakpoints: {mobile: 320, tablet: 768, desktop: 1025},
			currentBreakpoint: 'mobile',
			subscriptionOption: {
				label: "0"
			},
			selectedProduct: null,
			handleSecondRadioButton: handleSecondRadioButtonMock,
			radioSelectionCheck: false,
			handleConfirm: handleConfirmMock,
			selectedDate: null,
			deliveryDate: null,
			handleChange: handleChangeMock,
			toggleCalendar: toggleCalenderMock,
			isCalendarOpen: true,
			getProductPrice : getProductPriceMock,
			listLength : true,
			productPageModel: {
				templateType: "multiprod"
			},
			changeRadioValueButton : false
		};

		wrapper = setupTwo(props);
	});
	
	describe('Functions check', () => {
		test('handleSecondRadioButton function call onclick test', () => {
			const radioButton = wrapper.find('.radiosection');
			expect(radioButton.length).toBe(1);
			radioButton.simulate('click');
			});
	});

});
