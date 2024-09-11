import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import MultiProductDetails from '../../../../../modules/Product/components/ProductDetails/MultiProductDetails';
import {mockProductStore,mockReaderStore, mockProductPricesStore} from '../../../../../__mocks__/modules/common/storeMock'


Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const productPageModel= {
	productDescription:"multi product page ",
	productList:[
		{
			label:'FreeStyle Libre 3',
			productImage: [
				'/content/dam/adc/products/fsl2-sensor/FSL_Sensor.png','/content/dam/adc/products/fsl2-sensor/FSL2SensorTilted.png',
				'/content/dam/adc/products/fsl2-sensor/Sensor_Side.png','/content/dam/adc/products/fsl2-sensor/Sensor_BOX.png'
			],
			videoList: [
				'/content/dam/adc/products/fsl2-sensor/FSL_Sensor.png','/content/dam/adc/products/fsl2-sensor/FSL2SensorTilted.png',
				'/content/dam/adc/products/fsl2-sensor/Sensor_Side.png','/content/dam/adc/products/fsl2-sensor/Sensor_BOX.png'
			],
			commonImage:"/content/dam/adc/samplingfsl3/de/de/images/webshop-icon/Infobox-Small.svg",
			quantityOrder:1,
			sku:"1-71538-01",
			variantDescription:"Bitte beachten Sie: Eine Bestellung während der Markteinführung kann maximal 7 Sensoren beinhalten. Der FreeStyle Libre 3 Sensor kann ausschließlich mit der FreeStyle Libre 3 App2 ausgelesen werden."
		},
		{
			label:'FreeStyle Libre plus service',
			productImage:[
				"/content/dam/adc/samplingfsl3/de/de/images/webshop-icon/Infobox-Small.svg",
				"/content/dam/adc/samplingfsl3/de/de/images/webshop-icon/question.svg"
			],
			commonImage:"/content/dam/adc/samplingfsl3/de/de/images/webshop-icon/verorts.svg",
			videoList:null,
			quantityOrder:null,
			sku:"2-72114-01",
			variantDescription:"Erhalten Sie alle drei Monate automatisch ein Paket mit 7 FreeStyle Libre 3 Sensoren bequem nach Hause geliefert. Sie können das Abonnement jederzeit kündigen. Der angegebene Preis fällt dabei vierteljährlich an. Als Preisvorteil gegenüber dem Einzelkauf, fallen für Sie als Abonnent keine Versandkosten für die Lieferungen an."
		}
	],
	productBadgev2: "New",
	quantityOrder:null,
	commonImage:null,
	label:"Test Product",
	productUrl:"/content/adc/freestylelibrede/de/de/v3/produkte/dfjdshg.html",
	templateType: "multiproductv1"
};

const productPageModelV2= {
	productDescription:"multi product page ",
	productList:[
		{
			label:'FreeStyle Libre 3',
			productImage: [
				'/content/dam/adc/products/fsl2-sensor/FSL_Sensor.png','/content/dam/adc/products/fsl2-sensor/FSL2SensorTilted.png',
				'/content/dam/adc/products/fsl2-sensor/Sensor_Side.png','/content/dam/adc/products/fsl2-sensor/Sensor_BOX.png'
			],
			videoList: [
				'/content/dam/adc/products/fsl2-sensor/FSL_Sensor.png','/content/dam/adc/products/fsl2-sensor/FSL2SensorTilted.png',
				'/content/dam/adc/products/fsl2-sensor/Sensor_Side.png','/content/dam/adc/products/fsl2-sensor/Sensor_BOX.png'
			],
			commonImage:"/content/dam/adc/samplingfsl3/de/de/images/webshop-icon/Infobox-Small.svg",
			quantityOrder:1,
			sku:"1-71538-01",
			variantDescription:"Bitte beachten Sie: Eine Bestellung während der Markteinführung kann maximal 7 Sensoren beinhalten. Der FreeStyle Libre 3 Sensor kann ausschließlich mit der FreeStyle Libre 3 App2 ausgelesen werden."
		},
		{
			label:'FreeStyle Libre plus service',
			productImage:[
				"/content/dam/adc/samplingfsl3/de/de/images/webshop-icon/Infobox-Small.svg",
				"/content/dam/adc/samplingfsl3/de/de/images/webshop-icon/question.svg"
			],
			commonImage:"/content/dam/adc/samplingfsl3/de/de/images/webshop-icon/verorts.svg",
			videoList:null,
			quantityOrder:null,
			sku:"2-72114-01",
			variantDescription:"Erhalten Sie alle drei Monate automatisch ein Paket mit 7 FreeStyle Libre 3 Sensoren bequem nach Hause geliefert. Sie können das Abonnement jederzeit kündigen. Der angegebene Preis fällt dabei vierteljährlich an. Als Preisvorteil gegenüber dem Einzelkauf, fallen für Sie als Abonnent keine Versandkosten für die Lieferungen an."
		},
		{
			label:'FreeStyle Libre 3',
			productImage: [
				'/content/dam/adc/products/fsl2-sensor/FSL_Sensor.png','/content/dam/adc/products/fsl2-sensor/FSL2SensorTilted.png',
				'/content/dam/adc/products/fsl2-sensor/Sensor_Side.png','/content/dam/adc/products/fsl2-sensor/Sensor_BOX.png'
			],
			videoList: [
				'/content/dam/adc/products/fsl2-sensor/FSL_Sensor.png','/content/dam/adc/products/fsl2-sensor/FSL2SensorTilted.png',
				'/content/dam/adc/products/fsl2-sensor/Sensor_Side.png','/content/dam/adc/products/fsl2-sensor/Sensor_BOX.png'
			],
			commonImage:"/content/dam/adc/samplingfsl3/de/de/images/webshop-icon/Infobox-Small.svg",
			quantityOrder:1,
			sku:"72111-01",
			variantDescription:"Bitte beachten Sie: Eine Bestellung während der Markteinführung kann maximal 7 Sensoren beinhalten. Der FreeStyle Libre 3 Sensor kann ausschließlich mit der FreeStyle Libre 3 App2 ausgelesen werden."
		}
	],
	quantityOrder:null,
	commonImage:null,
	label:"Test Product",
	productUrl:"/content/adc/freestylelibrede/de/de/v3/produkte/dfjdshg.html",
	templateType: "multiproductv2",
	productBadgev2: "New"
};

describe('MultiProductDetails Component Test Suite with valid productPageModel object',() => {
	let props, wrapper;
	const getProductPriceMock = jest.fn();
	const setShippingAddressOnCartMock = jest.fn();
	const addProductToCartMock = jest.fn();
	const addSubscriptionToCartMock = jest.fn();

	beforeEach(() => {
		props= {
			productType: "SENSOR",
			getProductPrice: getProductPriceMock,
			setShippingAddressOnCart: setShippingAddressOnCartMock,
			addProductToCart: addProductToCartMock,
			productPageModel: productPageModel,
			wizardSelectorUrl: 'wizardSelectorUrl',
			quantityOrder: 'quantityOrder',
			addSubscriptionToCart: addSubscriptionToCartMock,
			breakpoints : {mobile: 320, tablet: 768, desktop: 1025},
			currentBreakpoint: 'mobile',
			subscriptionOption:"0",
			productVideoArray: [{
				url: "video?.thumbnailImage",
				videoId: "video?.videoId",
				thumbnailImage: "video?.thumbnailImage",
				videoPlayOption: "VIDEO_PLAY_OPTION.DISPLAY_ON_MODAL"
			},
			{
				url: "video?.thumbnailImage",
				videoId: "video?.videoId",
				thumbnailImage: "video?.thumbnailImage",
				videoPlayOption: "VIDEO_PLAY_OPTION.DISPLAY_ON_MODAL"
			}],
			productImageArray : [
				 'https://splash1',
				'https://splash1'
			]
		};
		wrapper= shallow(<MultiProductDetails
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
		test('getProduct function call check', () => {
			const getProductMock = wrapper.instance().getProduct;
			expect(typeof getProductMock).toBe('function');
			getProductMock();
		});
		test('getProduct function call check', () => {
			wrapper.setState({
				selectedProduct: "2-72114-01"
			})
			const getProductMock = wrapper.instance().getProduct;
			expect(typeof getProductMock).toBe('function');
			getProductMock();
		});
		test('initiateWebRx function call check', () => {
			const initiateWebRxMock = wrapper.instance().initiateWebRx;
			expect(typeof initiateWebRxMock).toBe('function');
			initiateWebRxMock();
		});
		test('handleSecondRadioButton function call check', () => {
			const e = {
				target: {id: '2-72114-01', name:'test'}
			};
			wrapper.instance().handleSecondRadioButton(e);
			const selectedProduct = e.target.name;
			wrapper.instance().setState({

					selectedProduct: selectedProduct
			});
			const handleSecondRadioButtonMock = wrapper.instance().handleSecondRadioButton;
			expect(typeof handleSecondRadioButtonMock).toBe('function');
		})
		test('handleChange function call check',() => {
			const e = {stopPropagation: jest.fn()};
			const date = new Date();
			wrapper.instance().handleChange(date,e);
			wrapper.instance().setState({
				selectedDate: date
			});
			const handleChangeMock = wrapper.instance().handleChange;
			expect(typeof handleChangeMock).toBe('function');
		});
		test('toggleCalendar',() => {
			const isCalendarOpenState = wrapper.instance().state.isCalendarOpen;
			wrapper.instance().toggleCalendar();
			expect(wrapper.instance().state.isCalendarOpen).toBe(!isCalendarOpenState);
		});
		test('getProductPrice function call check', () => {
			const getProductPriceMock = wrapper.instance().getProductPrice;
			expect(typeof getProductPriceMock).toBe('function');
			expect(getProductPriceMock()).toBeDefined();
			expect(typeof getProductPriceMock()).toBe('number');
			expect(getProductPriceMock()).toBe(30);
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
		test('getProductPage function call check', () => {
			const getProductPageMock = wrapper.instance().getProductPage;
			expect(typeof getProductPageMock).toBe('function');
			expect(getProductPageMock()).toBeInstanceOf(Object);
			expect(getProductPageMock()).toEqual(productPageModel);
		});

		test('getClassName function call check', () => {
			const getClassNameMock = wrapper.instance().getClassName;
			expect(typeof getClassNameMock).toBe('function');
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

		test('handleConfirm function call check', () => {
			const handleConfirmMock = wrapper.instance().handleConfirm;
			expect(typeof handleConfirmMock).toBe('function');
			const e = {stopPropagation: jest.fn()};
			handleConfirmMock(e);
			expect(wrapper.instance().state.isCalendarOpen).toBeFalsy();
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
		test('handleAddProductToCart function call check', () => {
			const handleAddProductToCartMock = wrapper.instance().handleAddProductToCart;
			expect(typeof handleAddProductToCartMock).toBe('function');
			expect(handleAddProductToCartMock()).toBeUndefined();
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
			expect(getSkusOrLabelsMock()).toStrictEqual(['FreeStyle Libre 3' , 'FreeStyle Libre plus service']);
		});
	});
});

describe('MultiProductDetails Component Test Suite without productPageModel object & productType as sensor',() => {
	let props, wrapper;
	const getProductPriceMock = jest.fn();
	const setShippingAddressOnCartMock = jest.fn();
	const addProductToCartMock = jest.fn();
	const addSubscriptionToCartMock = jest.fn();

	beforeEach(() => {
		props= {
			productType: "SENSOR",
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
		wrapper= shallow(<MultiProductDetails
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
		getProductPageMock();
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
	test('incrementQuantity function call check', () => {
		const incrementQuantityMock = wrapper.instance().incrementQuantity;
		expect(typeof incrementQuantityMock).toBe('function');
		wrapper.instance().setState({quantity: 2});
		incrementQuantityMock();
		expect(wrapper.instance().state.quantity).toBe(3);
	});
	test('decrementQuantity function call check', () => {
		const decrementQuantityMock = wrapper.instance().decrementQuantity;
		expect(typeof decrementQuantityMock).toBe('function');
		wrapper.instance().setState({quantity: 4});
		decrementQuantityMock();
		expect(wrapper.instance().state.quantity).toBe(3);
	});
	test('decrementQuantity function call check with state set to 0', () => {
		const decrementQuantityMock = wrapper.instance().decrementQuantity;
		expect(typeof decrementQuantityMock).toBe('function');
		wrapper.instance().setState({quantity: 0});
		decrementQuantityMock();
	});
});

describe('MultiProductDetails Component Test Suite with valid productPageModel object & productType as reader',() => {
	let props, wrapper;
	const getProductPriceMock = jest.fn();
	const setShippingAddressOnCartMock = jest.fn();
	const addProductToCartMock = jest.fn();
	const addSubscriptionToCartMock = jest.fn();

	beforeEach(() => {
		props= {
			productType: "READER",
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
		wrapper= shallow(<MultiProductDetails
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

describe('MultiProductDetails Component Test Suite with valid productPageModel object & productType as subscription',() => {
	let props, wrapper;
	const getProductPriceMock = jest.fn();
	const setShippingAddressOnCartMock = jest.fn();
	const addProductToCartMock = jest.fn();
	const addSubscriptionToCartMock = jest.fn();

	beforeEach(() => {
		props= {
			productType: "subscription",
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
		wrapper= shallow(<MultiProductDetails
			store={mockProductPricesStore} {...props}/>).dive().dive().dive().dive().dive().dive().dive().dive().dive().dive().dive().dive().dive();
	});

	test('renders without crashing', () => {
		expect(wrapper.type()).not.toEqual(null);
		expect(wrapper).toBeDefined();
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

	test('getProductPrice function call check', () => {
		const getProductPriceMock = wrapper.instance().getProductPrice;
		expect(typeof getProductPriceMock).toBe('function');
		expect(getProductPriceMock()).toBeDefined();
		expect(typeof getProductPriceMock()).toBe('number');
		expect(getProductPriceMock()).toBe(0);
	});

	test('componentDidUpdate function call check', () => {
		const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
		expect(typeof componentDidUpdateMock).toBe('function');
		const prevProps= {cartDetails: {id: 'id'}};
		const prevState= {selectedProduct: 'selectedProduct'};
		expect(wrapper.instance().componentDidUpdate(prevProps, prevState)).toBeUndefined();
	});
	test('addProductToCart function call check', () => {
		const handleAddProductToCartMock = wrapper.instance().handleAddProductToCart;
		expect(typeof handleAddProductToCartMock).toBe('function');
		expect(handleAddProductToCartMock()).toBeUndefined();
		const addSubscriptionToCartMockCallCount = addSubscriptionToCartMock.mock.calls.length;
		expect(addSubscriptionToCartMockCallCount).toBeDefined();
	});
});

describe('MultiProductDetails Component Test Suite with valid productPageModel object & productType as subscription for v2 product template',() => {
	let props, wrapper;
	const getProductPriceMock = jest.fn();
	const setShippingAddressOnCartMock = jest.fn();
	const addProductToCartMock = jest.fn();
	const addSubscriptionToCartMock = jest.fn();
	const mockHandleSecondRadioButton = jest.fn();
	beforeEach(() => {
		props= {
			productType: "subscription",
			getProductPrice: getProductPriceMock,
			setShippingAddressOnCart: setShippingAddressOnCartMock,
			addProductToCart: addProductToCartMock,
			productPageModel: productPageModelV2,
			wizardSelectorUrl: 'wizardSelectorUrl',
			quantityOrder: 'quantityOrder',
			addSubscriptionToCart: addSubscriptionToCartMock,
			breakpoints : {mobile: 320, tablet: 768, desktop: 1025},
			currentBreakpoint: 'mobile',
		};
		wrapper= shallow(<MultiProductDetails
			store={mockProductPricesStore} {...props}/>).dive().dive().dive().dive().dive().dive().dive().dive().dive().dive().dive().dive().dive();
	});

	test('renders without crashing', () => {
		expect(wrapper.type()).not.toEqual(null);
		expect(wrapper).toBeDefined();
	});

	test('renderMultiProductItem function call check', () => {
		const renderMultiProductItem = wrapper.instance().renderMultiProductItem;
		expect(typeof renderMultiProductItem).toBe('function');
		expect(renderMultiProductItem()).toBeDefined();
	});

	test('onclick test cases', () => {
		wrapper.setProps({
			prodoctPrices : { "2-72114-01" : {
				"id": 24,
				"sku": "2-72114-01",
				"name": "PlusService FreeStyle Libre 3",
				"uom": null,
				"max_sale_qty": "7.0",
				"price": "461.30",
				"tax_value": "19",
				"min_sale_qty": "1",
				"is_subscription": true,
				"cs_delivery_frequency": null,
				"product_type": "",
				"product_version": "FSL3",
				"cs_product_type": 0,
				"first_delivery_date_after": "0.0",
				"bundle_options": [
					{
						"id": 225,
						"label": "Quarterly",
						"position": 1,
						"values": [
							{
								"quantity": 7,
								"price": 461.3,
								"id": 245,
								"__typename": "AdcBundleItemOption"
							}
						],
						"__typename": "AdcBundleItem"
					}
				],
				"__typename": "AdcProduct"
			}
		}})
		const divWithOnClick = wrapper.find('div[onClick]').at(0);
		divWithOnClick.simulate('click');
	});
	test('onclick test cases second', () => {
		wrapper.setProps({
			prodoctPrices : { 
				"72111-01" :  {
					"id": 58,
					"sku": "72111-01",
					"name": "FreeStyle Libre 3 Lesegerät, MG/DL",
					"uom": 99,
					"max_sale_qty": "1",
					"price": "65.90",
					"tax_value": "19",
					"min_sale_qty": "1",
					"is_subscription": false,
					"cs_delivery_frequency": null,
					"product_type": "READER",
					"product_version": "FSL3",
					"cs_product_type": 1,
					"first_delivery_date_after": null,
					"bundle_options": [],
					"__typename": "AdcProduct"
				}
		}
		})
		const seconddivWithOnClick = wrapper.find('div[onClick]').at(1);
		seconddivWithOnClick.simulate('click');
	});

	test('getProductPrice function call check', () => {
		wrapper.setState({isCalendarOpen: true})
		const getProductPriceMock = wrapper.instance().getProductPrice;
		expect(typeof getProductPriceMock).toBe('function');
		expect(getProductPriceMock()).toBeDefined();
		expect(typeof getProductPriceMock()).toBe('number');
		expect(getProductPriceMock()).toBe(0);
	});

	test('componentDidUpdate function call check', () => {
		const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
		expect(typeof componentDidUpdateMock).toBe('function');
		const prevProps= {cartDetails: {id: 'id'}};
		const prevState= {selectedProduct: 'selectedProduct'};
		expect(wrapper.instance().componentDidUpdate(prevProps, prevState)).toBeUndefined();
	});
	test('addProductToCart function call check', () => {
		const handleAddProductToCartMock = wrapper.instance().handleAddProductToCart;
		expect(typeof handleAddProductToCartMock).toBe('function');
		expect(handleAddProductToCartMock()).toBeUndefined();
		const addSubscriptionToCartMockCallCount = addSubscriptionToCartMock.mock.calls.length;
		expect(addSubscriptionToCartMockCallCount).toBeDefined();
	});
});


