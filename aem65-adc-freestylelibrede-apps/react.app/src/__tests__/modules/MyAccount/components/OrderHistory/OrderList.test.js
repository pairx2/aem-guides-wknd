import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import OrderList from '../../../../../modules/MyAccount/components/OrderHistory/OrderList';
import {Provider} from 'react-redux';
import {mockStore, mockStoreOrder} from '../../../../../__mocks__/storeMock';
jest.mock('../../../../../utils/endpointUrl');
Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props= {}) => {
	const wrapper = shallow(<OrderList store= {mockStore} {...props}/>);
	return wrapper;
};

const setupTwo = (props= {}) => {
	const wrapper = shallow(<OrderList store= {mockStoreOrder} {...props}/>);
	return wrapper;
};

describe('OrderList component Test Suite with orders data', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			orders: [
				{
					'index':1,
					'orderId':'DEBAAAAAIS',
					'orderDate':1587945600000,
					'orderTitle':'Cash Pay Subscription',
					'orderType':'Cash Pay Subscription',
					'rxmc':null,
					'isReimbursedOrder':false,
					'productData':[
						{
							'index':1,
							'productSKU':'S5269856',
							'productName':'FreeStyle Libre Sensor v1',
							'productQuantity':1,
							'productRescheduledDueDate':null,
							'productOriginalDateFrom':1587945600000,
							'productDateOfNextShipment':1595808000000,
							'productOriginalDateOfNextShipment':1595808000000,
							'productDueDateWindow':'14,14',
							'deliverableNumber':'DLV-000010292'
						}
					],
					'serviceData':[
						{
							'serviceSKU':'1-71538-01',
							'serviceName':'FreeStyle Libre Sensor Subscription',
							'serviceFromDate':1587945600000,
							'serviceToDate':null,
							'serviceFrequency':'3',
							'serviceDuration':null,
							'serviceProductQuantity':1,
							'serviceStatus':'Active'
						}
					],
					'priceBreakdown':{
						'totalPrice':'425.25',
						'price':419.30,
						'coPay':'',
						'deliveryCost':5.95
					},
					'paymentDetails':{
						'paymentMethodType':'paypal',
						'paymentBrand':null,
						'card':{
							'last4Digits':null
						},
						'amountAuthorized':425.25,
						'paymentToken':'8ac7a4a271bac61a0171bafbc8c427f8',
						'amountPaid':425.25,
						'paymentTransactionId':null
					},
					'deliveryDetails':[
						{
							'index':1,
							'deliveryId':'SCH-0000089849',
							'deliveryType':'Master',
							'deliveryStatus':'Scheduled',
							'deliveryNumber':null,
							'deliveryTrackingNr':null,
							'invoiceIdDetails':[
								{
									'invoiceId':'a4Z4E0000002qCuUAI',
									'invoiceStatus':null
								}
							],
							'wmsStatus':null,
							'estimatedDeliveryDate':null,
							'productSKU':'S5269856',
							'productQuantity':1,
							'shipmentId':'a4d4E0000000bOsQAI'
						}
					],
					'deliveryAddress':{
						'salutation':null,
						'firstName':'britania',
						'lastName':'marie',
						'city':'Emsdetten',
						'zipCode':'48282',
						'street':'Weststr. 62',
						'addressInfo':null,
						'country':null,
						'countryCode':'DE',
						'stateProvince':null,
						'phoneNumber':'+49 1514215786'
					},
					'billingAddress':{
						'salutation':null,
						'firstName':'britania',
						'lastName':'marie',
						'city':'Emsdetten',
						'zipCode':'48282',
						'street':'Weststr. 62',
						'addressInfo':null,
						'country':null,
						'countryCode':'DE',
						'stateProvince':null,
						'phoneNumber':'+49 1514215786'
					},
					'returnDetails':null
				},
				{
					'index':2,
					'orderId':'DEAAAAAAIR',
					'orderDate':1587945600000,
					'orderTitle':'Cash Pay',
					'orderType':'Cash Pay',
					'rxmc':null,
					'isReimbursedOrder':false,
					'productData':[
						{
							'index':1,
							'productSKU':'71969-01',
							'productName':'Freestyle Libre Standalone Reader v2',
							'productQuantity':1,
							'productRescheduledDueDate':null,
							'productOriginalDateFrom':1587945600000,
							'productDateOfNextShipment':null,
							'productOriginalDateOfNextShipment':null,
							'productDueDateWindow':'14,14',
							'deliverableNumber':'DLV-000010291'
						}
					],
					'serviceData':null,
					'priceBreakdown':{
						'totalPrice':'65.85',
						'price':59.90,
						'coPay':'',
						'deliveryCost':5.95
					},
					'paymentDetails':{
						'paymentMethodType':'paypal',
						'paymentBrand':null,
						'card':{
							'last4Digits':null
						},
						'amountAuthorized':65.85,
						'paymentToken':'8ac7a4a271bac61a0171bafa58852667',
						'amountPaid':65.85,
						'paymentTransactionId':null
					},
					'deliveryDetails':[
						{
							'index':2,
							'deliveryId':'SCH-0000089848',
							'deliveryType':'Master',
							'deliveryStatus':'Payment Completed',
							'deliveryNumber':null,
							'deliveryTrackingNr':null,
							'invoiceIdDetails':[
								{
									'invoiceId':'a4Z4E0000002qCpUAI',
									'invoiceStatus':'Payment Completed'
								}
							],
							'wmsStatus':null,
							'estimatedDeliveryDate':null,
							'productSKU':'71969-01',
							'productQuantity':1,
							'shipmentId':'a4d4E0000000bOnQAI'
						}
					],
					'deliveryAddress':{
						'salutation':null,
						'firstName':'britania',
						'lastName':'marie',
						'city':'Emsdetten',
						'zipCode':'48282',
						'street':'Weststr. 62',
						'addressInfo':null,
						'country':null,
						'countryCode':'DE',
						'stateProvince':null,
						'phoneNumber':'+49 1514215786'
					},
					'billingAddress':{
						'salutation':null,
						'firstName':'britania',
						'lastName':'marie',
						'city':'Emsdetten',
						'zipCode':'48282',
						'street':'Weststr. 62',
						'addressInfo':null,
						'country':null,
						'countryCode':'DE',
						'stateProvince':null,
						'phoneNumber':'+49 1514215786'
					},
					'returnDetails':null
				},
				{
					'index':3,
					'orderId':'DEBAAAAAIQ',
					'orderDate':1587945600000,
					'orderTitle':'Cash Pay Subscription',
					'orderType':'Cash Pay Subscription',
					'rxmc':null,
					'isReimbursedOrder':false,
					'productData':[
						{
							'index':1,
							'productSKU':'S5269856',
							'productName':'FreeStyle Libre Sensor v1',
							'productQuantity':1,
							'productRescheduledDueDate':null,
							'productOriginalDateFrom':1587945600000,
							'productDateOfNextShipment':1595808000000,
							'productOriginalDateOfNextShipment':1595808000000,
							'productDueDateWindow':'14,14',
							'deliverableNumber':'DLV-000010293'
						}
					],
					'serviceData':[
						{
							'serviceSKU':'1-71538-01',
							'serviceName':'FreeStyle Libre Sensor Subscription',
							'serviceFromDate':1587945600000,
							'serviceToDate':null,
							'serviceFrequency':'3',
							'serviceDuration':null,
							'serviceProductQuantity':1,
							'serviceStatus':'Active'
						}
					],
					'priceBreakdown':{
						'totalPrice':'185.65',
						'price':179.70,
						'coPay':'',
						'deliveryCost':5.95
					},
					'paymentDetails':{
						'paymentMethodType':'paypal',
						'paymentBrand':null,
						'card':{
							'last4Digits':null
						},
						'amountAuthorized':185.65,
						'paymentToken':'8ac7a49f71aabf0e0171ba97acb923d2',
						'amountPaid':185.65,
						'paymentTransactionId':null
					},
					'deliveryDetails':[
						{
							'index':3,
							'deliveryId':'SCH-0000089850',
							'deliveryType':'Master',
							'deliveryStatus':'Scheduled',
							'deliveryNumber':null,
							'deliveryTrackingNr':null,
							'invoiceIdDetails':[
								{
									'invoiceId':'a4Z4E0000002qCzUAI',
									'invoiceStatus':null
								}
							],
							'wmsStatus':null,
							'estimatedDeliveryDate':null,
							'productSKU':'S5269856',
							'productQuantity':1,
							'shipmentId':'a4d4E0000000bOxQAI'
						}
					],
					'deliveryAddress':{
						'salutation':null,
						'firstName':'britania',
						'lastName':'marie',
						'city':'Emsdetten',
						'zipCode':'48282',
						'street':'Weststr. 62',
						'addressInfo':null,
						'country':null,
						'countryCode':'DE',
						'stateProvince':null,
						'phoneNumber':'+49 1514215786'
					},
					'billingAddress':{
						'salutation':null,
						'firstName':'britania',
						'lastName':'marie',
						'city':'Emsdetten',
						'zipCode':'48282',
						'street':'Weststr. 62',
						'addressInfo':null,
						'country':null,
						'countryCode':'DE',
						'stateProvince':null,
						'phoneNumber':'+49 1514215786'
					},
					'returnDetails':null
				}
			],
			currentPagination: 1,
			limit: 2,
			dictionary: {'dictionary': 'dictionary1'},
			products: {
				'id': 1,
				'sku': 'simple_product',
				'name': 'Simple Product',
				'description': 'Some product description',
				'short_description': 'Some product short description',
				'uom': 1,
				'product_version': 1,
				'hts_code': '123-hts',
				'origin': 'Alabama',
				'type_id': 'simple',
				'meta_title': null,
				'meta_description': null,
				'meta_keyword': null,
				'is_in_stock': true,
				'regular_price_with_tax': null,
				'regular_price_without_tax': null,
				'image_url': 'https://abbott-magento2.test/static/version1563452614/graphql/_view/en_US/Magento_Catalog/images/product/placeholder/image.jpg',
				'url': 'https://abbott-magento2.test/simple-product.html',
				'min_sale_qty': '2',
				'max_sale_qty': '10',
				'price': '20.0000',
				'max_order_quantity': '3',
				'weight': '2.0000',
				'ean_code': '99999999992',
				'shelf_life': '20'
			},
			checkoutPage: 'checkoutPage'
		};

		wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('inside map', () => {
		expect(wrapper.find('Order').length).not.toBe(2);
	});

});

describe('OrderList component Test Suite not with orders data', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			orders: null,
			currentPagination: 1,
			limit: 2,
			dictionary: {'dictionary': 'dictionary1'},
			products: {
				'id': 1,
				'sku': 'simple_product',
				'name': 'Simple Product',
				'description': 'Some product description',
				'short_description': 'Some product short description',
				'uom': 1,
				'product_version': 1,
				'hts_code': '123-hts',
				'origin': 'Alabama',
				'type_id': 'simple',
				'meta_title': null,
				'meta_description': null,
				'meta_keyword': null,
				'is_in_stock': true,
				'regular_price_with_tax': null,
				'regular_price_without_tax': null,
				'image_url': 'https://abbott-magento2.test/static/version1563452614/graphql/_view/en_US/Magento_Catalog/images/product/placeholder/image.jpg',
				'url': 'https://abbott-magento2.test/simple-product.html',
				'min_sale_qty': '2',
				'max_sale_qty': '10',
				'price': '20.0000',
				'max_order_quantity': '3',
				'weight': '2.0000',
				'ean_code': '99999999992',
				'shelf_life': '20'
			},
			checkoutPage: 'checkoutPage'
		};

		wrapper = setupTwo(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});

describe('OrderList component Test Suite with mount', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			orders: [
				{
					'index':1,
					'orderId':'DEBAAAAAIS',
					'orderDate':1587945600000,
					'orderTitle':'Cash Pay Subscription',
					'orderType':'Cash Pay Subscription',
					'rxmc':null,
					'isReimbursedOrder':false,
					'productData':[
						{
							'index':1,
							'productSKU':'S5269856',
							'productName':'FreeStyle Libre Sensor v1',
							'productQuantity':1,
							'productRescheduledDueDate':null,
							'productOriginalDateFrom':1587945600000,
							'productDateOfNextShipment':1595808000000,
							'productOriginalDateOfNextShipment':1595808000000,
							'productDueDateWindow':'14,14',
							'deliverableNumber':'DLV-000010292'
						}
					],
					'serviceData':[],
					'priceBreakdown':{
						'totalPrice':'425.25',
						'price':419.30,
						'coPay':'',
						'deliveryCost':5.95
					},
					'paymentDetails':{
						'paymentMethodType':'paypal',
						'paymentBrand':null,
						'card':{
							'last4Digits':null
						},
						'amountAuthorized':425.25,
						'paymentToken':'8ac7a4a271bac61a0171bafbc8c427f8',
						'amountPaid':425.25,
						'paymentTransactionId':null
					},
					'deliveryDetails':[
						{
							'index':1,
							'deliveryId':'SCH-0000089849',
							'deliveryType':'Master',
							'deliveryStatus':'Scheduled',
							'deliveryNumber':null,
							'deliveryTrackingNr':null,
							'invoiceIdDetails':[
								{
									'invoiceId':'a4Z4E0000002qCuUAI',
									'invoiceStatus':null
								}
							],
							'wmsStatus':null,
							'estimatedDeliveryDate':null,
							'productSKU':'S5269856',
							'productQuantity':1,
							'shipmentId':'a4d4E0000000bOsQAI'
						}
					],
					'deliveryAddress':{
						'salutation':null,
						'firstName':'britania',
						'lastName':'marie',
						'city':'Emsdetten',
						'zipCode':'48282',
						'street':'Weststr. 62',
						'addressInfo':null,
						'country':null,
						'countryCode':'DE',
						'stateProvince':null,
						'phoneNumber':'+49 1514215786'
					},
					'billingAddress':{
						'salutation':null,
						'firstName':'britania',
						'lastName':'marie',
						'city':'Emsdetten',
						'zipCode':'48282',
						'street':'Weststr. 62',
						'addressInfo':null,
						'country':null,
						'countryCode':'DE',
						'stateProvince':null,
						'phoneNumber':'+49 1514215786'
					},
					'returnDetails':null
				},
				{
					'index':2,
					'orderId':'DEAAAAAAIR',
					'orderDate':1587945600000,
					'orderTitle':'Cash Pay',
					'orderType':'Cash Pay',
					'rxmc':null,
					'isReimbursedOrder':false,
					'productData':[
						{
							'index':1,
							'productSKU':'71969-01',
							'productName':'Freestyle Libre Standalone Reader v2',
							'productQuantity':1,
							'productRescheduledDueDate':null,
							'productOriginalDateFrom':1587945600000,
							'productDateOfNextShipment':null,
							'productOriginalDateOfNextShipment':null,
							'productDueDateWindow':'14,14',
							'deliverableNumber':'DLV-000010291'
						}
					],
					'serviceData':null,
					'priceBreakdown':{
						'totalPrice':'65.85',
						'price':59.90,
						'coPay':'',
						'deliveryCost':5.95
					},
					'paymentDetails':{
						'paymentMethodType':'paypal',
						'paymentBrand':null,
						'card':{
							'last4Digits':null
						},
						'amountAuthorized':65.85,
						'paymentToken':'8ac7a4a271bac61a0171bafa58852667',
						'amountPaid':65.85,
						'paymentTransactionId':null
					},
					'deliveryDetails':[
						{
							'index':2,
							'deliveryId':'SCH-0000089848',
							'deliveryType':'Master',
							'deliveryStatus':'Payment Completed',
							'deliveryNumber':null,
							'deliveryTrackingNr':null,
							'invoiceIdDetails':[
								{
									'invoiceId':'a4Z4E0000002qCpUAI',
									'invoiceStatus':'Payment Completed'
								}
							],
							'wmsStatus':null,
							'estimatedDeliveryDate':null,
							'productSKU':'71969-01',
							'productQuantity':1,
							'shipmentId':'a4d4E0000000bOnQAI'
						}
					],
					'deliveryAddress':{
						'salutation':null,
						'firstName':'britania',
						'lastName':'marie',
						'city':'Emsdetten',
						'zipCode':'48282',
						'street':'Weststr. 62',
						'addressInfo':null,
						'country':null,
						'countryCode':'DE',
						'stateProvince':null,
						'phoneNumber':'+49 1514215786'
					},
					'billingAddress':{
						'salutation':null,
						'firstName':'britania',
						'lastName':'marie',
						'city':'Emsdetten',
						'zipCode':'48282',
						'street':'Weststr. 62',
						'addressInfo':null,
						'country':null,
						'countryCode':'DE',
						'stateProvince':null,
						'phoneNumber':'+49 1514215786'
					},
					'returnDetails':null
				},
				{
					'index':3,
					'orderId':'DEBAAAAAIQ',
					'orderDate':1587945600000,
					'orderTitle':'Cash Pay Subscription',
					'orderType':'Cash Pay Subscription',
					'rxmc':null,
					'isReimbursedOrder':false,
					'productData':[
						{
							'index':1,
							'productSKU':'S5269856',
							'productName':'FreeStyle Libre Sensor v1',
							'productQuantity':1,
							'productRescheduledDueDate':null,
							'productOriginalDateFrom':1587945600000,
							'productDateOfNextShipment':1595808000000,
							'productOriginalDateOfNextShipment':1595808000000,
							'productDueDateWindow':'14,14',
							'deliverableNumber':'DLV-000010293'
						}
					],
					'serviceData':[],
					'priceBreakdown':{
						'totalPrice':'185.65',
						'price':179.70,
						'coPay':'',
						'deliveryCost':5.95
					},
					'paymentDetails':{
						'paymentMethodType':'paypal',
						'paymentBrand':null,
						'card':{
							'last4Digits':null
						},
						'amountAuthorized':185.65,
						'paymentToken':'8ac7a49f71aabf0e0171ba97acb923d2',
						'amountPaid':185.65,
						'paymentTransactionId':null
					},
					'deliveryDetails':[
						{
							'index':3,
							'deliveryId':'SCH-0000089850',
							'deliveryType':'Master',
							'deliveryStatus':'Scheduled',
							'deliveryNumber':null,
							'deliveryTrackingNr':null,
							'invoiceIdDetails':[
								{
									'invoiceId':'a4Z4E0000002qCzUAI',
									'invoiceStatus':null
								}
							],
							'wmsStatus':null,
							'estimatedDeliveryDate':null,
							'productSKU':'S5269856',
							'productQuantity':1,
							'shipmentId':'a4d4E0000000bOxQAI'
						}
					],
					'deliveryAddress':{
						'salutation':null,
						'firstName':'britania',
						'lastName':'marie',
						'city':'Emsdetten',
						'zipCode':'48282',
						'street':'Weststr. 62',
						'addressInfo':null,
						'country':null,
						'countryCode':'DE',
						'stateProvince':null,
						'phoneNumber':'+49 1514215786'
					},
					'billingAddress':{
						'salutation':null,
						'firstName':'britania',
						'lastName':'marie',
						'city':'Emsdetten',
						'zipCode':'48282',
						'street':'Weststr. 62',
						'addressInfo':null,
						'country':null,
						'countryCode':'DE',
						'stateProvince':null,
						'phoneNumber':'+49 1514215786'
					},
					'returnDetails':null
				}
			],
			currentPagination: 2,
			limit: 5,
			dictionary: {'dictionary': 'dictionary1'},
			products: {
				'id': 1,
				'sku': 'simple_product',
				'name': 'Simple Product',
				'description': 'Some product description',
				'short_description': 'Some product short description',
				'uom': 1,
				'product_version': 1,
				'hts_code': '123-hts',
				'origin': 'Alabama',
				'type_id': 'simple',
				'meta_title': null,
				'meta_description': null,
				'meta_keyword': null,
				'is_in_stock': true,
				'regular_price_with_tax': null,
				'regular_price_without_tax': null,
				'image_url': 'https://abbott-magento2.test/static/version1563452614/graphql/_view/en_US/Magento_Catalog/images/product/placeholder/image.jpg',
				'url': 'https://abbott-magento2.test/simple-product.html',
				'min_sale_qty': '2',
				'max_sale_qty': '10',
				'price': '20.0000',
				'max_order_quantity': '3',
				'weight': '2.0000',
				'ean_code': '99999999992',
				'shelf_life': '20'
			},
			checkoutPage: 'checkoutPage'
		};

		wrapper = mount(<Provider store={mockStore}><OrderList {...props} /></Provider>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});