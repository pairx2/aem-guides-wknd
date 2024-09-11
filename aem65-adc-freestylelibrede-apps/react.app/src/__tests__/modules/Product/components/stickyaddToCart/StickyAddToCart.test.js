import React from 'react';
import Enzyme, {mount, shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import StickyAddToCart from '../../../../../modules/Product/components/StickyAddToCart/StickyAddToCart';
import {mockProductStore,mockReaderStore} from '../../../../../__mocks__/modules/common/storeMock'
import {Provider} from 'react-redux';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

const productPageModel= {
	productDescription: 'Einfache Applikation und maximaler Tragekomfort. Der unauffällige Sensor kann bis zu 14 Tage am Oberarm getragen werden und speichert alle 15 Minuten Ihre Glukosewerte für bis zu 8 Stunden. Jederzeit und rund um die Uhr. ',
	videoList: [
		'/content/dam/adc/products/fsl2-sensor/FSL_Sensor.png','/content/dam/adc/products/fsl2-sensor/FSL2SensorTilted.png',
		'/content/dam/adc/products/fsl2-sensor/Sensor_Side.png','/content/dam/adc/products/fsl2-sensor/Sensor_BOX.png'
	],
	productList: [{
		sku:'1-71538-01',
		label:'FreeStyle Libre 3',
		productImage: [
			'/content/dam/adc/products/fsl2-sensor/FSL_Sensor.png','/content/dam/adc/products/fsl2-sensor/FSL2SensorTilted.png',
			'/content/dam/adc/products/fsl2-sensor/Sensor_Side.png','/content/dam/adc/products/fsl2-sensor/Sensor_BOX.png'
		]}],
	productUrl: 'http://localhost:4502/content/adc/freestylelibrede/de/de/libre/product-pages/FSL_2_PlusService.html'
};

describe('StickyAddToCart Component Test Suite with productPageModel ' +
	'object & productType is SENSOR & isLoggedIn is true', () => {

	let props, wrapper;
	const addProductToCartMock = jest.fn();

	beforeEach(() => {

		props= {
			addProductToCart: addProductToCartMock,
			addToCart: 'primary',
			subsOrder: 'primary',
			prescriptionOrderPageUrl: 'prescriptionOrderPageUrl',
			loginPageUrl: 'loginPageUrl',
			productPageModel: productPageModel,
			productType: 'sensor',
			isLoggedIn: true,
			productList: [{sku:'1-71538-01',label:'FreeStyle Libre 3'}],
			productPrices: {}
		};
		wrapper= shallow(<StickyAddToCart store={mockProductStore} {...props}/>).dive().dive();
		wrapper.setState({selectedProduct: '1-71538-01'});
	});

	describe('Redux Props', () => {

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('has productType as prop and is of type object', () => {
			const productTypeProp = wrapper.instance().props.productType;
			expect(typeof productTypeProp).toBe('string');
		});

		test('has addToCart as prop and is of type string', () => {
			const addToCartProp = wrapper.instance().props.addToCart;
			expect(typeof addToCartProp).toBe('string');
		});

		test('has subsOrder as prop and is of type string', () => {
			const subsOrderProp = wrapper.instance().props.subsOrder;
			expect(typeof subsOrderProp).toBe('string');
		});

		test('has prescriptionOrderPageUrl as prop and is of type string', () => {
			const prescriptionOrderPageUrlProp = wrapper.instance().props.prescriptionOrderPageUrl;
			expect(typeof prescriptionOrderPageUrlProp).toBe('string');
		});

		test('has loginPageUrl as prop and is of type string', () => {
			const loginPageUrlProp = wrapper.instance().props.loginPageUrl;
			expect(typeof loginPageUrlProp).toBe('string');
		});

		test('has isLoggedIn as prop and is of type boolean', () => {
			const isLoggedInProp = wrapper.instance().props.isLoggedIn;
			expect(typeof isLoggedInProp).toBe('boolean');
		});

		test('has productPageModel as prop and is of type object', () => {
			const productPageModelProp = wrapper.instance().props.productPageModel;
			expect(productPageModelProp).toBeInstanceOf(Object);
		});

		test('has productPrices as prop and is of type object', () => {
			const productPricesProp = wrapper.instance().props.productPrices;
			expect(productPricesProp).toBeInstanceOf(Object);
		});

		test('has addProductToCart as prop and is of type function', () => {
			const addProductToCartProp = wrapper.instance().props.addProductToCart;
			expect(typeof addProductToCartProp).toBe('function');
		});
	});

	describe('Function calls', () => {

		test('getSku function call', () => {
			const getSkuMock = wrapper.instance().getSku;
			expect(typeof getSkuMock).toBe('function');
			expect(getSkuMock()).toBe('1-71538-01');
		});

		test('getSkusOrLabels function call check to get the Label', () => {
			const getSkusOrLabelsMock = wrapper.instance().getSkusOrLabels;
			expect(typeof getSkusOrLabelsMock).toBe('function');
			expect(getSkusOrLabelsMock()).toStrictEqual(['FreeStyle Libre 3']);
		});

		test('getSku function call check', () => {
			const getSkuMock = wrapper.instance().getSku;
			expect(typeof getSkuMock).toBe('function');
		});

		test('getReaderOptions function call check', () => {
			const readerOptionsMock = wrapper.instance().getReaderOptions;
			expect(typeof readerOptionsMock).toBe('function');
			expect(readerOptionsMock()).toBeDefined();
			expect(readerOptionsMock()).toBeInstanceOf(Object);
		});

		test('getProductPage function call', () => {
			const getProductPageMock = wrapper.instance().getProductPage;
			expect(typeof getProductPageMock).toBe('function');
			wrapper.instance().getProductPage();
		});

		test('incrementQuantity function call', () => {
			const incrementQuantityMock = wrapper.instance().incrementQuantity;
			expect(typeof incrementQuantityMock).toBe('function');
			const quantityMock = wrapper.instance().state.quantity;

			incrementQuantityMock();
			expect(wrapper.instance().state.quantity).toBe(quantityMock+1);
		});

		test('decrementQuantity function call', () => {
			const decrementQuantityMock = wrapper.instance().decrementQuantity;
			expect(typeof decrementQuantityMock).toBe('function');

			decrementQuantityMock();
			expect(wrapper.instance().state.quantity).toBe(1);
		});

		test('decrementQuantity function call', () => {
			wrapper.setState({quantity: 4});
			const decrementQuantityMock = wrapper.instance().decrementQuantity;
			expect(typeof decrementQuantityMock).toBe('function');

			decrementQuantityMock();
			expect(wrapper.instance().state.quantity).toBe(3);
		});

		test('prescriptionHandler function call', () => {
			const prescriptionHandlerMock = wrapper.instance().prescriptionHandler;
			expect(typeof prescriptionHandlerMock).toBe('function');
			if (wrapper.instance().props.isLoggedIn) {
				window.location= wrapper.instance().props.prescriptionOrderPageUrl;
			} else {
				window.location= wrapper.instance().props.loginPageUrl;
			}
		});

		test('isReader function call', () => {
			const isReaderMock = wrapper.instance().isReader;
			expect(typeof isReaderMock).toBe('function');

		});

		test('getSelectedProductData function call', () => {
			const getSelectedProductDataMock = wrapper.instance().getSelectedProductData;
			expect(typeof getSelectedProductDataMock).toBe('function');
			expect(getSelectedProductDataMock).toBeDefined();
		});

		test('setSelectedValue function call', () => {
			const setSelectedValueMock = wrapper.instance().setSelectedValue;
			expect(typeof setSelectedValueMock).toBe('function');
			setSelectedValueMock('99');
			expect(wrapper.instance().state.selectedProduct).toBe('99');
			expect(wrapper.instance().state.quantity).toBe(1);
		});

		test('addProductToCart function call', () => {
			const addProductToCartDummy = wrapper.instance().addProductToCart;
			expect(typeof addProductToCartDummy).toBe('function');

			addProductToCartDummy();
			const addProductToCartMockCount = addProductToCartMock.mock.calls.length;
			expect(addProductToCartMockCount).toBeDefined();
		});

		test('updated getProductPage function call', () => {
			const getProductPageMock = wrapper.instance().getProductPage;
			expect(getProductPageMock()).toEqual(wrapper.instance().props.productPageModel );
		});

		test('prescriptionHandler function call', () => {
			const prescriptionHandlerMock = wrapper.instance().prescriptionHandler;
			prescriptionHandlerMock();
			window.location = wrapper.instance().props.prescriptionOrderPageUrl;
		});
	});

	describe('state check', () => {

		test('state check', () => {
			const stateMock = wrapper.instance().state;
			expect(stateMock).toBeInstanceOf(Object);

			expect(typeof stateMock.quantity).toBe('number');
			expect(stateMock.quantity).toBe(1);

			expect(typeof stateMock.selectedProduct).toBe('string');
			expect(stateMock.selectedProduct).toBe('1-71538-01');
		});
	});
});

describe('StickyAddToCart Component Test Suite with empty productPageModel object ' +
	'& productType is READER & productPrices have valid uom & isLoggedIn is false', () => {

	let props, wrapper;
	beforeEach(() => {
		props= {
			addProductToCart: () => {},
			addToCart: 'secondary',
			subsOrder: 'secondary',
			prescriptionOrderPageUrl: 'prescriptionOrderPageUrl',
			productPageModel: {},
			loginPageUrl: 'loginPageUrl',
			productType: 'reader',
			isLoggedIn: false,
			productPrices: {}
		};
		wrapper= shallow(<StickyAddToCart store={mockReaderStore} {...props}/>).dive().dive();
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('getProductPage function call', () => {
		const getProductPageMock = wrapper.instance().getProductPage;
		expect(getProductPageMock()).toEqual({});
	});

	test('prescriptionHandler function call', () => {
		const prescriptionHandlerMock = wrapper.instance().prescriptionHandler;
		prescriptionHandlerMock();
		window.location = wrapper.instance().props.loginPageUrl;
	});

	test('getSelectedProductData function call', () => {
		const getSelectedProductDataMock = wrapper.instance().getSelectedProductData;
		expect(getSelectedProductDataMock()).toBeInstanceOf(Object);
	});
});

describe('StickyAddToCart Component Test Suite with productType is READER', () => {

	let props, wrapper;

	beforeEach(() => {
		props= {
			addProductToCart: () => {},
			addToCart: 'primary',
			subsOrder: 'primary',
			prescriptionOrderPageUrl: 'prescriptionOrderPageUrl',
			loginPageUrl: 'loginPageUrl',
			productType: 'reader',
			isLoggedIn: false,
			productPageModel: productPageModel,
			productList: [{sku:'1-71538-01',label:'FreeStyle Libre 3'}],
			productPrices: {}
		};
		wrapper= shallow(<StickyAddToCart store={mockReaderStore} {...props}/>).dive().dive();
		wrapper.setState({selectedProduct: '1-71538-01',hasUndefinedUom: true});
	});

	test('renders without crashing', () => {
		expect(wrapper.type()).not.toEqual(null);
		wrapper.setState({addedFromSticky: true});
		expect(wrapper).toBeDefined();
	});

	test('getSelectedProductData & isReader function call', () => {
		const getSelectedProductDataMock = wrapper.instance().getSelectedProductData;
		expect(getSelectedProductDataMock()).toBeInstanceOf(Object);
		const isReaderMock = wrapper.instance().isReader;
		expect(typeof isReaderMock).toBe('function');
	});

	test('has addProductToCart as prop and is of type function', () => {
		const addProductToCartMock = wrapper.instance().addProductToCart();
		expect(wrapper.instance().state.undeterminedUomError).toBe('undetermined_uom_error');
	});
});

describe('StickyAddToCart Component Test Suite with mount', () => {
	let props, wrapper;
	beforeEach(() => {

		props= {
			addProductToCart: () => {},
			getProductPrice: () => {},
			getCustomerCartRequest: () => {},
			addToCart: 'primary',
			subsOrder: 'primary',
			prescriptionOrderPageUrl: 'prescriptionOrderPageUrl',
			loginPageUrl: 'loginPageUrl',
			productType: 'subscription',
			isLoggedIn: true,
			productList: [{sku:'1-71538-01',label:'FreeStyle Libre 3'}],
			productPrices: {}
		};

		wrapper= mount(<Provider store= {mockProductStore} ><StickyAddToCart {...props}/></Provider>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});