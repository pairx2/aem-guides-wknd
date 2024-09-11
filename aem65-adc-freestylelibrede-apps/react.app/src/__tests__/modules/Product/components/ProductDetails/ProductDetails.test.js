import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import ProductDetails from '../../../../../modules/Product/components/ProductDetails/ProductDetails';
import {mockProductStore,mockReaderStore, mockProductPricesStore} from '../../../../../__mocks__/modules/common/storeMock'

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const productPageModel= {
	productDescription: 'Einfache Applikation und maximaler Tragekomfort. Der unauffällige Sensor kann bis zu 14 Tage am Oberarm getragen werden und speichert alle 15 Minuten Ihre Glukosewerte für bis zu 8 Stunden. Jederzeit und rund um die Uhr. ',
	productList: [
		{
			sku:'1-71538-01',
			label:'FreeStyle Libre 3',
			productImage: [
			'/content/dam/adc/products/fsl2-sensor/FSL_Sensor.png','/content/dam/adc/products/fsl2-sensor/FSL2SensorTilted.png',
			'/content/dam/adc/products/fsl2-sensor/Sensor_Side.png','/content/dam/adc/products/fsl2-sensor/Sensor_BOX.png'
			],
			videoList: [
				'/content/dam/adc/products/fsl2-sensor/FSL_Sensor.png','/content/dam/adc/products/fsl2-sensor/FSL2SensorTilted.png',
				'/content/dam/adc/products/fsl2-sensor/Sensor_Side.png','/content/dam/adc/products/fsl2-sensor/Sensor_BOX.png'
			]
		}],
	productUrl: 'http://localhost:4502/content/adc/freestylelibrede/de/de/libre/product-pages/FSL_2_PlusService.html'
};

describe('ProductDetails Component Test Suite with valid productPageModel object',() => {
	let props, wrapper;
	const getProductPriceMock = jest.fn();
	const setShippingAddressOnCartMock = jest.fn();
	const addProductToCartMock = jest.fn();
	const addSubscriptionToCartMock = jest.fn();

	beforeEach(() => {
		props= {
			productType: 'sensor',
			getProductPrice: getProductPriceMock,
			setShippingAddressOnCart: setShippingAddressOnCartMock,
			addProductToCart: addProductToCartMock,
			productPageModel: productPageModel,
			wizardSelectorUrl: 'wizardSelectorUrl',
			quantityOrder: 'quantityOrder',
			addSubscriptionToCart: addSubscriptionToCartMock,
			breakpoints : {mobile: 320, tablet: 768, desktop: 1025},
			currentBreakpoint: 'mobile',
		};
		wrapper= shallow(<ProductDetails
			store={mockProductStore} {...props}/>).dive().dive().dive().dive().dive().dive().dive().dive().dive().dive().dive().dive().dive();
	});

	describe('Render', () => {
		test('renders without crashing', () => {
			expect(wrapper.type()).not.toEqual(null);
			expect(wrapper).toBeDefined();
		});
	});

	describe('state check', () => {
		test('state check', () => {
			const stateCheck = wrapper.instance().state;
			expect(stateCheck.hasUndefinedUom).toBeTruthy();
			expect(stateCheck.errors).toBeInstanceOf(Object);
			expect(stateCheck.errors.undeterminedUomError).toBeUndefined();
			expect(stateCheck.quantity).toBe(1);
			expect(stateCheck.selectedProduct).toBe(null);
			expect(stateCheck.deliveryDate).toBe(null);
			expect(stateCheck.selectedDate).toBe(null);
			expect(stateCheck.isCalendarOpen).toBeFalsy();
		});
	});

	describe('Functions check', () => {
		test('getSelectedProductData function call check', () => {
			const getSelectedProductDataMock = wrapper.instance().getSelectedProductData;
			expect(typeof getSelectedProductDataMock).toBe('function');
			expect(getSelectedProductDataMock()).toBeDefined();
			expect(getSelectedProductDataMock()).toBeInstanceOf(Object);
		});
		test('getSku function call check', () => {
			const getSkuMock = wrapper.instance().getSku;
			expect(typeof getSkuMock).toBe('function');
			expect(getSkuMock()).toBe('1-71538-01');
		});
		test('plusServiceOptions function call check', () => {
			const plusServiceOptionsMock = wrapper.instance().plusServiceOptions;
			expect(typeof plusServiceOptionsMock).toBe('function');
			expect(plusServiceOptionsMock()).toBeDefined();
			expect(plusServiceOptionsMock()).toBeInstanceOf(Object);
		});
		test('getReaderOptions function call check', () => {
			const readerOptionsMock = wrapper.instance().getReaderOptions;
			expect(typeof readerOptionsMock).toBe('function');
			expect(readerOptionsMock()).toBeDefined();
			expect(readerOptionsMock()).toBeInstanceOf(Object);
		});
		test('getProductPrice function call check', () => {
			const getProductPriceMock = wrapper.instance().getProductPrice;
			expect(typeof getProductPriceMock).toBe('function');
			expect(getProductPriceMock()).toBeDefined();
			expect(typeof getProductPriceMock()).toBe('number');
			expect(getProductPriceMock()).toBe(30);
		});
		test('getFrequencyOptions function call check', () => {
			const getFrequencyOptionsMock = wrapper.instance().getFrequencyOptions;
			expect(typeof getFrequencyOptionsMock).toBe('function');
			expect(getFrequencyOptionsMock()).toBeDefined();
			expect(getFrequencyOptionsMock()).toBeInstanceOf(Array);
		});
		test('isReader function call check', () => {
			const isReaderMock = wrapper.instance().isReader;
			expect(typeof isReaderMock).toBe('function');
			expect(isReaderMock()).toBeFalsy();
		});
		test('isSubscription function call check', () => {
			const isSubscriptionMock = wrapper.instance().isSubscription;
			expect(typeof isSubscriptionMock).toBe('function');
			expect(isSubscriptionMock()).toBeFalsy();
		});
		test('incrementQuantity function call check', () => {
			const incrementQuantityMock = wrapper.instance().incrementQuantity;
			expect(typeof incrementQuantityMock).toBe('function');
			incrementQuantityMock();
			expect(wrapper.instance().state.quantity).toBe(2);
		});
		test('decrementQuantity function call check', () => {
			const decrementQuantityMock = wrapper.instance().decrementQuantity;
			expect(typeof decrementQuantityMock).toBe('function');
			wrapper.instance().setState({quantity: 3});
			decrementQuantityMock();
			expect(wrapper.instance().state.quantity).toBe(2);
		});
		test('getProductPage function call check', () => {
			const getProductPageMock = wrapper.instance().getProductPage;
			expect(typeof getProductPageMock).toBe('function');
			expect(getProductPageMock()).toBeInstanceOf(Object);
			expect(getProductPageMock()).toEqual(productPageModel);
		});
		test('getProductImages function call check', () => {
			const getProductImagesMock = wrapper.instance().getProductImages;
			expect(getProductImagesMock).toBeDefined();
			expect(getProductImagesMock).toBeInstanceOf(Function);
		});
		test('getProductVideos function call check', () => {
			const getProductVideosMock = wrapper.instance().getProductVideos;
			expect(typeof getProductVideosMock).toBe('function');
			expect(getProductVideosMock()).toBeDefined();
			expect(getProductVideosMock()).toBeInstanceOf(Array);
		});
		test('getFirstDeliveryDate function call check', () => {
			const getFirstDeliveryDateMock = wrapper.instance().getFirstDeliveryDate;
			expect(typeof getFirstDeliveryDateMock).toBe('function');
			expect(getFirstDeliveryDateMock()).toBeDefined();
		});
		test('setSelectedValue function call check', () => {
			const setSelectedValueMock = wrapper.instance().setSelectedValue;
			expect(typeof setSelectedValueMock).toBe('function');
			setSelectedValueMock('101');
			expect(wrapper.instance().state.quantity).toBe(1);
			expect(wrapper.instance().state.hasUndefinedUom).toBeFalsy();
			expect(wrapper.instance().state.errors).toBeInstanceOf(Object);
			expect(wrapper.instance().state.errors.undeterminedUomError).toBeUndefined();
		});
		test('handleChange function call check', () => {
			const handleChangeMock = wrapper.instance().handleChange;
			expect(typeof handleChangeMock).toBe('function');
			const e = {stopPropagation: jest.fn()};
			handleChangeMock(1587945600000, e);
			expect(typeof wrapper.instance().state.selectedDate).toBe('object');
		});
		test('changePlusService function call check', () => {
			const obj = {target: {
					value: '2-71988-01',
					label: 'Freestyle Libre 3'
				}};
			const changePlusServiceMock = wrapper.instance().changePlusService;
			expect(typeof changePlusServiceMock).toBe('function');
			changePlusServiceMock(obj);
			expect(wrapper.instance().state.selectedProduct).toEqual(obj.target.value);
		});
		test('handleConfirm function call check', () => {
			const handleConfirmMock = wrapper.instance().handleConfirm;
			expect(typeof handleConfirmMock).toBe('function');
			const e = {stopPropagation: jest.fn()};
			handleConfirmMock(e);
			expect(wrapper.instance().state.isCalendarOpen).toBeFalsy();
		});
		test('toggleCalendar function call check', () => {
			const toggleCalendarMock = wrapper.instance().toggleCalendar;
			expect(typeof toggleCalendarMock).toBe('function');
			toggleCalendarMock();
			expect(wrapper.instance().state.isCalendarOpen).toBeTruthy();
		});
		test('getSubscriptionSelectedOption function call check', () => {
			const getSubscriptionSelectedOptionMock = wrapper.instance().getSubscriptionSelectedOption;
			expect(typeof getSubscriptionSelectedOptionMock).toBe('function');
			expect(getSubscriptionSelectedOptionMock()).toBeDefined();
			expect(getSubscriptionSelectedOptionMock()).toBeInstanceOf(Object);
		});
		test('getSubscriptionSelectedOptionLabel function call check', () => {
			const getSubscriptionSelectedOptionLabelMock = wrapper.instance().getSubscriptionSelectedOptionLabel;
			expect(typeof getSubscriptionSelectedOptionLabelMock).toBe('function');
			expect(getSubscriptionSelectedOptionLabelMock()).toBeDefined();
		});
		test('addProductToCart function call check', () => {
			const addProductToCartMock = wrapper.instance().addProductToCart;
			expect(typeof addProductToCartMock).toBe('function');
			expect(addProductToCartMock()).toBeUndefined();
			const addSubscriptionToCartMockCallCount = addSubscriptionToCartMock.mock.calls.length;
			expect(addSubscriptionToCartMockCallCount).toBeDefined();
		});
		test('initiateWebRx function call check', () => {
			const initiateWebRxMock = wrapper.instance().initiateWebRx;
			expect(typeof initiateWebRxMock).toBe('function');
			expect(initiateWebRxMock).toBeDefined();
		});
		test('componentDidMount function call check', () => {
			const componentDidMountMock = wrapper.instance().componentDidMount;
			expect(typeof componentDidMountMock).toBe('function');
			expect(wrapper.instance().componentDidMount()).toBeUndefined();
		});
		test('componentDidUpdate function call check', () => {
			const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateMock).toBe('function');
			const prevProps= {cartDetails: {id: 'id'}};
			const prevState= {selectedProduct: '2-72114-01'};
			const snapshot = {};
			expect(wrapper.instance().componentDidUpdate(prevProps,prevState,snapshot)).toBeUndefined();
		});
		test('getSkusOrLabels function call check to get the Label', () => {
			const getSkusOrLabelsMock = wrapper.instance().getSkusOrLabels;
			expect(typeof getSkusOrLabelsMock).toBe('function');
			expect(getSkusOrLabelsMock()).toStrictEqual(['FreeStyle Libre 3']);
		});
	});
});

describe('ProductDetails Component Test Suite without productPageModel object & productType as sensor',() => {
	let props, wrapper;
	const getProductPriceMock = jest.fn();
	const setShippingAddressOnCartMock = jest.fn();
	const addProductToCartMock = jest.fn();
	const addSubscriptionToCartMock = jest.fn();

	beforeEach(() => {
		props= {
			productType: 'sensor',
			getProductPrice: getProductPriceMock,
			setShippingAddressOnCart: setShippingAddressOnCartMock,
			addProductToCart: addProductToCartMock,
			productPageModel: {productList: []},
			wizardSelectorUrl: 'wizardSelectorUrl',
			quantityOrder: 'quantityOrder',
			addSubscriptionToCart: addSubscriptionToCartMock,
			breakpoints : {mobile: 320, tablet: 768, desktop: 1025},
			currentBreakpoint: 'mobile',
		};
		wrapper= shallow(<ProductDetails
			store={mockProductPricesStore} {...props}/>).dive().dive().dive().dive().dive().dive().dive().dive().dive().dive().dive().dive().dive();
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('getSelectedProductData function call check', () => {
		const getSelectedProductDataMock = wrapper.instance().getSelectedProductData;
		expect(typeof getSelectedProductDataMock).toBe('function');
		expect(getSelectedProductDataMock()).toBeDefined();
		expect(getSelectedProductDataMock()).toBeInstanceOf(Object);
		expect(getSelectedProductDataMock()).toEqual({});
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
	test('getProductPrice function call check', () => {
		const getProductPriceMock = wrapper.instance().getProductPrice;
		expect(typeof getProductPriceMock).toBe('function');
		expect(getProductPriceMock()).toBeDefined();
		expect(typeof getProductPriceMock()).toBe('number');
		expect(getProductPriceMock()).toBe(0);
	});
	test('getProductPage function call check', () => {
		const getProductPageMock = wrapper.instance().getProductPage;
		expect(typeof getProductPageMock).toBe('function');
		expect(getProductPageMock()).toBeInstanceOf(Object);
		expect(getProductPageMock()).toEqual(wrapper.instance().props.productPageModel);
	});
	test('getProductImages function call check', () => {
		const getProductImagesMock = wrapper.instance().getProductImages;
		expect(typeof getProductImagesMock).toBe('function');
		expect(getProductImagesMock()).toBeDefined();
		expect(getProductImagesMock()).toBeInstanceOf(Array);
		expect(getProductImagesMock()).toEqual([]);
	});
	test('getProductVideos function call check', () => {
		const getProductVideosMock = wrapper.instance().getProductVideos;
		expect(typeof getProductVideosMock).toBe('function');
		expect(getProductVideosMock()).toBeDefined();
		expect(getProductVideosMock()).toBeInstanceOf(Array);
		expect(getProductVideosMock()).toEqual([]);
	});
	test('getSkusOrLabels function call check', () => {
		const getSkusOrLabelsMock = wrapper.instance().getSkusOrLabels;
		expect(typeof getSkusOrLabelsMock).toBe('function');
		expect(getSkusOrLabelsMock()).toBeDefined();
		expect(getSkusOrLabelsMock()).toBeInstanceOf(Array);
		expect(getSkusOrLabelsMock()).toEqual([]);
	});
});

describe('ProductDetails Component Test Suite with valid productPageModel object & productType as reader',() => {
	let props, wrapper;
	const getProductPriceMock = jest.fn();
	const setShippingAddressOnCartMock = jest.fn();
	const addProductToCartMock = jest.fn();
	const addSubscriptionToCartMock = jest.fn();

	beforeEach(() => {
		props= {
			productType: 'reader',
			getProductPrice: getProductPriceMock,
			setShippingAddressOnCart: setShippingAddressOnCartMock,
			addProductToCart: addProductToCartMock,
			productPageModel: productPageModel,
			wizardSelectorUrl: 'wizardSelectorUrl',
			quantityOrder: 'quantityOrder',
			addSubscriptionToCart: addSubscriptionToCartMock,
			breakpoints : {mobile: 320, tablet: 768, desktop: 1025},
			currentBreakpoint: 'mobile',
		};
		wrapper= shallow(<ProductDetails
			store={mockReaderStore} {...props}/>).dive().dive().dive().dive().dive().dive().dive().dive().dive().dive().dive().dive().dive();
	});

	test('renders without crashing', () => {
		expect(wrapper.type()).not.toEqual(null);
		expect(wrapper).toBeDefined();
	});

	test('getProductPrice function call check', () => {
		const getProductPriceMock = wrapper.instance().getProductPrice;
		expect(typeof getProductPriceMock).toBe('function');
		expect(getProductPriceMock()).toBeDefined();
		expect(typeof getProductPriceMock()).toBe('number');
		expect(getProductPriceMock()).toBe(33);
	});

	test('componentDidUpdate function call check', () => {
		const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
		expect(typeof componentDidUpdateMock).toBe('function');
		const prevProps= {cartDetails: {id: 'id'}};
		const prevState= {selectedProduct: 'selectedProduct'};
		expect(wrapper.instance().componentDidUpdate(prevProps, prevState)).toBeUndefined();
	});
});
