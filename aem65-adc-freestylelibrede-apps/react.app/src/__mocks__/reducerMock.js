import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import { empty } from '../utils/default';

const initialState = {

	translationReducer: {
		dictionary: {
			'test_key': 'test_label',
			'test_key_html': '<div>test'
		},
		dictionaryFetched: true,
	},
	formReducer:{
		fraudDomain: ['test.com','test0.com','test1.com'],
		fraudDomainFetched: true,
	},
	loading: false,
	isSubmitDisabled: false,
	// error: 404,
	warnings: [],
	showEditForm: false,
	showNewForm: false,
	formData: {
		country_id: 'DE'
	},
	isReactivated: false,
	deliveryDate: null,
	reactivateDeliveryDate: null,
	// error: {},
	addressAllowPM: [],
	showMiniCart: false,
	isCouponCodeSuccess: true,
	isCouponRemoved: true,
	checkoutIdDate: 'Wed May 13 2020 13:38:55 GMT+0530 (India Standard Time)',
	loggedIn: true,
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
	productPrices: {
		'S5269856': {
			'id': 1,
			'sku': 'S5269856',
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
		'1-71538-01': {
			'id': 2,
			'sku': '1-71538-01',
			'name': 'Simple Product2',
			'description': 'Some product description2',
			'short_description': 'Some product short description2',
			'uom': 99,
			'product_version': 2,
			'hts_code': '1234-hts',
			'origin': 'Alabama2',
			'type_id': 'simple2',
			'meta_title': null,
			'meta_description': null,
			'meta_keyword': null,
			'is_in_stock': true,
			'regular_price_with_tax': null,
			'regular_price_without_tax': null,
			'image_url': 'https://abbott-magento2.test/static/version1563452614/graphql/_view/en_US/Magento_Catalog/images/product/placeholder/image.jpg',
			'url': 'https://abbott-magento2.test/simple-product.html',
			'min_sale_qty': '20',
			'max_sale_qty': '11',
			'price': '30.0000',
			'max_order_quantity': '30',
			'weight': '3.0000',
			'ean_code': '99999999990',
			'shelf_life': '10',
			is_subscription: false,
			'bundle_options': [{
				'id': 1,
				'quantity': 2,
				'position': 'position',
				'label': 'label',
				'values': [{ quantity: 2, price: 22 }]
			}, {
				'id': 2,
				'quantity': 2,
				'position': 'position',
				'label': 'label',
				'values': [{ quantity: 2, price: 22 }]
			}],
		}
	},

	shippingOptions: [
		{
			'carrier_code': 'flatrate',
			'carrier_title': 'Flat Rate',
			'amount': {
				'value': 0
			},
			'method_code': 'flatrate',
		}
	],
	paymentTokens: [
		{
			'method': 'payon_credit_card',
			'type': 'MC',
			'token': 'qwer4321',
			'expiry': '12/2019',
			'last4Digits': '1111',
			'label': 'Payon CC Payment',
			'is_default': true
		}
	],
	payonCheckoutId: 'qwer1234',
	ordersByPageNumber: {
		'orderList': [
			{
				'index': 1,
				'orderId': 'DEBAAAAAIS',
				'orderDate': 1587945600000,
				'orderTitle': 'Cash Pay Subscription',
				'orderType': 'Cash Pay Subscription',
				'rxmc': 'Qasw12',
				'isReimbursedOrder': false,
				'productData': [
					{
						'index': 1,
						'productSKU': 'S5269856',
						'productName': 'FreeStyle Libre Sensor v1',
						'productQuantity': 1,
						'productRescheduledDueDate': null,
						'productOriginalDateFrom': 1587945600000,
						'productDateOfNextShipment': 1595808000000,
						'productOriginalDateOfNextShipment': 1595808000000,
						'productDueDateWindow': '14,14',
						'deliverableNumber': 'DLV-000010292'
					}
				],
				'serviceData': [
					{
						'serviceSKU': '1-71538-01',
						'serviceName': 'FreeStyle Libre Sensor Subscription',
						'serviceFromDate': 1587945600000,
						'serviceToDate': null,
						'serviceFrequency': '3',
						'serviceDuration': null,
						'serviceProductQuantity': 1,
						'serviceStatus': 'Active'
					}
				],
				'priceBreakdown': {
					'totalPrice': '425.25',
					'price': 419.30,
					'coPay': '',
					'deliveryCost': 5.95
				},
				'paymentDetails': {
					'paymentMethodType': 'paypal',
					'paymentBrand': null,
					'card': {
						'last4Digits': null
					},
					'amountAuthorized': 425.25,
					'paymentToken': '8ac7a4a271bac61a0171bafbc8c427f8',
					'amountPaid': 425.25,
					'paymentTransactionId': null
				},
				'deliveryDetails': [
					{
						'index': 1,
						'deliveryId': 'SCH-0000089849',
						'deliveryType': 'Master',
						'deliveryStatus': 'Scheduled',
						'deliveryNumber': null,
						'deliveryTrackingNr': null,
						'invoiceIdDetails': [
							{
								'invoiceId': 'a4Z4E0000002qCuUAI',
								'invoiceStatus': null
							}
						],
						'wmsStatus': null,
						'estimatedDeliveryDate': null,
						'productSKU': 'S5269856',
						'productQuantity': 1,
						'shipmentId': 'a4d4E0000000bOsQAI'
					}
				],
				'deliveryAddress': {
					'salutation': null,
					'firstName': 'john',
					'lastName': 'doe',
					'city': 'Emsdetten',
					'zipCode': '48282',
					'street': 'Weststr. 62',
					'addressInfo': null,
					'country': null,
					'countryCode': 'DE',
					'stateProvince': null,
					'phoneNumber': '+49 1514215786'
				},
				'billingAddress': {
					'salutation': null,
					'firstName': 'john',
					'lastName': 'doe',
					'city': 'Emsdetten',
					'zipCode': '48282',
					'street': 'Weststr. 62',
					'addressInfo': null,
					'country': null,
					'countryCode': 'DE',
					'stateProvince': null,
					'phoneNumber': '+49 1514215786'
				},
				'returnDetails': null
			}
		]
	},
	orders: {
		'accountId': '4900201099',
		'CPS': {
			'orderList': [
				{
					index: 0,
					orderDate: 1697188136000,
					orderId: "DE6500000497",
					orderType: "Cash Pay Subscription",
					orderTitle: "Cash Pay Subscription",
					'rxmc': null,
					'isReimbursedOrder': false,
					'productData': [
						{
							'index': 1,
							'productSKU': 'S5269856',
							'productName': 'FreeStyle Libre Sensor v1',
							'productQuantity': 1,
							'productRescheduledDueDate': null,
							'productOriginalDateFrom': 1587945600000,
							'productDateOfNextShipment': 1595808000000,
							'productOriginalDateOfNextShipment': 1595808000000,
							'productDueDateWindow': '14,14',
							'deliverableNumber': 'DLV-000010292'
						}
					],
					'serviceData': [
						{
							'serviceSKU': '1-71538-01',
							'serviceName': 'FreeStyle Libre Sensor Subscription',
							'serviceFromDate': 1587945600000,
							'serviceToDate': null,
							'serviceFrequency': '3',
							'serviceDuration': null,
							'serviceProductQuantity': 1,
							'serviceStatus': 'Inactive'
						}
					],
					'priceBreakdown': {
						'totalPrice': '425.25',
						'price': 419.30,
						'coPay': '',
						'deliveryCost': 5.95
					},
					'paymentDetails': {
						'paymentMethodType': 'paypal',
						'paymentBrand': null,
						'card': {
							'last4Digits': null
						},
						'amountAuthorized': 425.25,
						'paymentToken': '8ac7a4a271bac61a0171bafbc8c427f8',
						'amountPaid': 425.25,
						'paymentTransactionId': null
					},
					'deliveryDetails': [
						{
							'index': 1,
							'deliveryId': 'SCH-0000089849',
							'deliveryType': 'Master',
							'deliveryStatus': 'Scheduled',
							'deliveryNumber': null,
							'deliveryTrackingNr': null,
							'invoiceIdDetails': [
								{
									'invoiceId': 'a4Z4E0000002qCuUAI',
									'invoiceStatus': null
								}
							],
							'wmsStatus': null,
							'estimatedDeliveryDate': null,
							'productSKU': 'S5269856',
							'productQuantity': 1,
							'shipmentId': 'a4d4E0000000bOsQAI'
						}
					],
					'deliveryAddress': {
						'salutation': null,
						'firstName': 'john',
						'lastName': 'doe',
						'city': 'Emsdetten',
						'zipCode': '48282',
						'street': 'Weststr. 62',
						'addressInfo': null,
						'country': null,
						'countryCode': 'DE',
						'stateProvince': null,
						'phoneNumber': '+49 1514215786'
					},
					'billingAddress': {
						'salutation': null,
						'firstName': 'john',
						'lastName': 'doe',
						'city': 'Emsdetten',
						'zipCode': '48282',
						'street': 'Weststr. 62',
						'addressInfo': null,
						'country': null,
						'countryCode': 'DE',
						'stateProvince': null,
						'phoneNumber': '+49 1514215786'
					},
					'returnDetails': null
				},
				{
					'index': 2,
					'orderId': 'DEAAAAAAIR',
					'orderDate': 1587945600000,
					'orderTitle': 'Cash Pay',
					'orderType': 'Cash Pay',
					'rxmc': null,
					'isReimbursedOrder': false,
					'productData': [
						{
							'index': 1,
							'productSKU': '71969-01',
							'productName': 'Freestyle Libre Standalone Reader v2',
							'productQuantity': 1,
							'productRescheduledDueDate': null,
							'productOriginalDateFrom': 1587945600000,
							'productDateOfNextShipment': null,
							'productOriginalDateOfNextShipment': null,
							'productDueDateWindow': '14,14',
							'deliverableNumber': 'DLV-000010291'
						}
					],
					'serviceData': [
						{
							'serviceSKU': '1-71538-01',
							'serviceName': 'FreeStyle Libre Sensor Subscription',
							'serviceFromDate': 1587945600000,
							'serviceToDate': null,
							'serviceFrequency': '3',
							'serviceDuration': null,
							'serviceProductQuantity': 1,
							'serviceStatus': 'Active',
							"productSKUDetails": [
								{
									"productSKU": "71988-01"
								},
								{
									"productSKU": "71988-01"
								},
								{
									"productSKU": "71988-01"
								},
								{
									"productSKU": "71988-01"
								}
							]
						}
					],
					'priceBreakdown': {
						'totalPrice': '65.85',
						'price': 59.90,
						'coPay': '',
						'deliveryCost': 5.95
					},
					'paymentDetails': {
						'paymentMethodType': 'paypal',
						'paymentBrand': null,
						'card': {
							'last4Digits': null
						},
						'amountAuthorized': 65.85,
						'paymentToken': '8ac7a4a271bac61a0171bafa58852667',
						'amountPaid': 65.85,
						'paymentTransactionId': null
					},
					'deliveryDetails': [
						{
							'index': 2,
							'deliveryId': 'SCH-0000089848',
							'deliveryType': 'Master',
							'deliveryStatus': 'Payment Completed',
							'deliveryNumber': null,
							'deliveryTrackingNr': null,
							'invoiceIdDetails': [
								{
									'invoiceId': 'a4Z4E0000002qCpUAI',
									'invoiceStatus': 'Payment Completed'
								}
							],
							'wmsStatus': null,
							'estimatedDeliveryDate': null,
							'productSKU': '71969-01',
							'productQuantity': 1,
							'shipmentId': 'a4d4E0000000bOnQAI'
						},{
							"index": 1,
							"deliveryId": "SCH-0000379839",
							"deliveryOrderId": "DE6500000104",
							"deliveryType": "Master",
							"deliveryStatus": "Order could not be delivered - Recipient not reached",
							"deliveryNumber": "4000063019",
							"deliveryTotal": 0,
							"deliveryTrackingNr": "00340434635500083101",
							"wmsStatus": "Carrier Return",
							"dueDate": 1694736000000,
							"returnDetails": [
								{
									"returnId": "4950005386",
									"rmaLabel": null,
									"rmaName": null,
									"returnType": "Carrier Return",
									"returnDate": 1694649600000,
									"returnRequestDate": 1694693723000,
									"returnStatus": "Consistent",
									"csStatus": "Carrier Returned",
									"returnItemDetails": [
										{
											"returnItem": {
												"returnItemQuantity": 1,
												"returnItemName": "FreeStyle Libre 3 Sensor",
												"returnItemSku": "72114-01",
												"returnItemStatus": "Created",
												"returnItemId": "a5r5r000000DiY0AAK"
											}
										}
									]
								}
							],
						},
					],
					'deliveryAddress': {
						'salutation': null,
						'firstName': 'john',
						'lastName': 'doe',
						'city': 'Emsdetten',
						'zipCode': '48282',
						'street': 'Weststr. 62',
						'addressInfo': null,
						'country': null,
						'countryCode': 'DE',
						'stateProvince': null,
						'phoneNumber': '+49 1514215786'
					},
					'billingAddress': {
						'salutation': null,
						'firstName': 'john',
						'lastName': 'doe',
						'city': 'Emsdetten',
						'zipCode': '48282',
						'street': 'Weststr. 62',
						'addressInfo': null,
						'country': null,
						'countryCode': 'DE',
						'stateProvince': null,
						'phoneNumber': '+49 1514215786'
					},
					'returnDetails': null
				},
				{
					'index': 3,
					'orderId': 'DEBAAAAAIQ',
					'orderDate': 1587945600000,
					'orderTitle': 'Cash Pay Subscription',
					'orderType': 'Cash Pay Subscription',
					'rxmc': null,
					'isReimbursedOrder': false,
					'productData': [
						{
							'index': 1,
							'productSKU': 'S5269856',
							'productName': 'FreeStyle Libre Sensor v1',
							'productQuantity': 1,
							'productRescheduledDueDate': null,
							'productOriginalDateFrom': 1587945600000,
							'productDateOfNextShipment': 1595808000000,
							'productOriginalDateOfNextShipment': 1595808000000,
							'productDueDateWindow': '14,14',
							'deliverableNumber': 'DLV-000010293'
						}
					],
					'serviceData': [
						{
							'serviceSKU': '1-71538-01',
							'serviceName': 'FreeStyle Libre Sensor Subscription',
							'serviceFromDate': 1587945600000,
							'serviceToDate': null,
							'serviceFrequency': '3',
							'serviceDuration': null,
							'serviceProductQuantity': 1,
							'serviceStatus': 'Active'
						}
					],
					'priceBreakdown': {
						'totalPrice': '185.65',
						'price': 179.70,
						'coPay': '',
						'deliveryCost': 5.95
					},
					'paymentDetails': {
						'paymentMethodType': 'paypal',
						'paymentBrand': null,
						'card': {
							'last4Digits': null
						},
						'amountAuthorized': 185.65,
						'paymentToken': '8ac7a49f71aabf0e0171ba97acb923d2',
						'amountPaid': 185.65,
						'paymentTransactionId': null
					},
					'deliveryDetails': [
						{
							'index': 3,
							'deliveryId': 'SCH-0000089850',
							'deliveryType': 'Master',
							'deliveryStatus': 'Scheduled',
							'deliveryNumber': null,
							'deliveryTrackingNr': null,
							'invoiceIdDetails': [
								{
									'invoiceId': 'a4Z4E0000002qCzUAI',
									'invoiceStatus': null
								}
							],
							'wmsStatus': null,
							'estimatedDeliveryDate': null,
							'productSKU': 'S5269856',
							'productQuantity': 1,
							'shipmentId': 'a4d4E0000000bOxQAI'
						}
					],
					'deliveryAddress': {
						'salutation': null,
						'firstName': 'john',
						'lastName': 'doe',
						'city': 'Emsdetten',
						'zipCode': '48282',
						'street': 'Weststr. 62',
						'addressInfo': null,
						'country': null,
						'countryCode': 'DE',
						'stateProvince': null,
						'phoneNumber': '+49 1514215786'
					},
					'billingAddress': {
						'salutation': null,
						'firstName': 'john',
						'lastName': 'doe',
						'city': 'Emsdetten',
						'zipCode': '48282',
						'street': 'Weststr. 62',
						'addressInfo': null,
						'country': null,
						'countryCode': 'DE',
						'stateProvince': null,
						'phoneNumber': '+49 1514215786'
					},
					'returnDetails': null
				}
			]
		},
		'RX': {
			'orderList': [
				{
					'index': 1,
					'orderId': 'DEBAAAAAIS',
					'orderDate': 1587945600000,
					'orderTitle': 'Cash Pay Subscription',
					'orderType': 'Cash Pay Subscription',
					'rxmc': null,
					'isReimbursedOrder': false,
					'productData': [
						{
							'index': 1,
							'productSKU': 'S5269856',
							'productName': 'FreeStyle Libre Sensor v1',
							'productQuantity': 1,
							'productRescheduledDueDate': null,
							'productOriginalDateFrom': 1587945600000,
							'productDateOfNextShipment': 1595808000000,
							'productOriginalDateOfNextShipment': 1595808000000,
							'productDueDateWindow': '14,14',
							'deliverableNumber': 'DLV-000010292'
						}
					],
					'serviceData': [
						{
							'serviceSKU': '1-71538-01',
							'serviceName': 'FreeStyle Libre Sensor Subscription',
							'serviceFromDate': 1587945600000,
							'serviceToDate': 1669564244,
							'serviceFrequency': '3',
							'serviceDuration': null,
							'serviceProductQuantity': 1,
							'serviceStatus': 'Active',
							"productSKUDetails": [
								{
									"productSKU": "71988-01"
								},
								{
									"productSKU": "71988-01"
								},
								{
									"productSKU": "71988-01"
								},
								{
									"productSKU": "71988-01"
								}
							]
						}
					],
					'priceBreakdown': {
						'totalPrice': '425.25',
						'price': 419.30,
						'coPay': '',
						'deliveryCost': 5.95
					},
					'paymentDetails': {
						'paymentMethodType': 'paypal',
						'paymentBrand': null,
						'card': {
							'last4Digits': null
						},
						'amountAuthorized': 425.25,
						'paymentToken': '8ac7a4a271bac61a0171bafbc8c427f8',
						'amountPaid': 425.25,
						'paymentTransactionId': null
					},
					'deliveryDetails': [
						{
							'index': 1,
							'deliveryId': 'SCH-0000089849',
							'deliveryType': 'Master',
							'deliveryStatus': 'Scheduled',
							'deliveryNumber': null,
							'deliveryTrackingNr': null,
							'invoiceIdDetails': [
								{
									'invoiceId': 'a4Z4E0000002qCuUAI',
									'invoiceStatus': null
								}
							],
							'wmsStatus': null,
							'estimatedDeliveryDate': null,
							'productSKU': 'S5269856',
							'productQuantity': 1,
							'shipmentId': 'a4d4E0000000bOsQAI',
							"returnDetails": [
								{
									"returnId": "4950005386",
									"rmaLabel": null,
									"rmaName": null,
									"returnType": "carrier return",
									"returnDate": 1700743279000,
									"returnRequestDate": 1700743279000,
									"returnStatus": "Consistent",
									"csStatus": "carrier returned",
									"returnItemDetails": [
										{
											"returnItem": {
												"returnItemQuantity": 1,
												"returnItemName": "FreeStyle Libre 3 Sensor",
												"returnItemSku": "72114-01",
												"returnItemStatus": "Created",
												"returnItemId": "a5r5r000000DiY0AAK"
											}
										}
									]
								}
							]
						}
					],
					'deliveryAddress': {
						'salutation': null,
						'firstName': 'john',
						'lastName': 'doe',
						'city': 'Emsdetten',
						'zipCode': '48282',
						'street': 'Weststr. 62',
						'addressInfo': null,
						'country': null,
						'countryCode': 'DE',
						'stateProvince': null,
						'phoneNumber': '+49 1514215786'
					},
					'billingAddress': {
						'salutation': null,
						'firstName': 'john',
						'lastName': 'doe',
						'city': 'Emsdetten',
						'zipCode': '48282',
						'street': 'Weststr. 62',
						'addressInfo': null,
						'country': null,
						'countryCode': 'DE',
						'stateProvince': null,
						'phoneNumber': '+49 1514215786'
					},
					'returnDetails': null
				},
				{
					'index': 2,
					'orderId': 'DEAAAAAAIR',
					'orderDate': 1587945600000,
					'orderTitle': 'Cash Pay',
					'orderType': 'Cash Pay',
					'rxmc': null,
					'isReimbursedOrder': false,
					'productData': [
						{
							'index': 1,
							'productSKU': '71969-01',
							'productName': 'Freestyle Libre Standalone Reader v2',
							'productQuantity': 1,
							'productRescheduledDueDate': null,
							'productOriginalDateFrom': 1587945600000,
							'productDateOfNextShipment': null,
							'productOriginalDateOfNextShipment': null,
							'productDueDateWindow': '14,14',
							'deliverableNumber': 'DLV-000010291'
						}
					],
					'serviceData': [
						{
							'serviceSKU': '1-71538-01',
							'serviceName': 'FreeStyle Libre Sensor Subscription',
							'serviceFromDate': 1587945600000,
							'serviceToDate': null,
							'serviceFrequency': '3',
							'serviceDuration': null,
							'serviceProductQuantity': 1,
							'serviceStatus': 'Active',
							"productSKUDetails": [
								{
									"productSKU": "71988-01"
								},
								{
									"productSKU": "71988-01"
								},
								{
									"productSKU": "71988-01"
								},
								{
									"productSKU": "71988-01"
								}
							]
						}
					],
					'priceBreakdown': {
						'totalPrice': '65.85',
						'price': 59.90,
						'coPay': '',
						'deliveryCost': 5.95
					},
					'paymentDetails': {
						'paymentMethodType': 'paypal',
						'paymentBrand': null,
						'card': {
							'last4Digits': null
						},
						'amountAuthorized': 65.85,
						'paymentToken': '8ac7a4a271bac61a0171bafa58852667',
						'amountPaid': 65.85,
						'paymentTransactionId': null
					},
					'deliveryDetails': [
						{
							'index': 2,
							'deliveryId': 'SCH-0000089848',
							'deliveryType': 'Master',
							'deliveryStatus': 'Payment Completed',
							'deliveryNumber': null,
							'deliveryTrackingNr': null,
							'invoiceIdDetails': [
								{
									'invoiceId': 'a4Z4E0000002qCpUAI',
									'invoiceStatus': 'Payment Completed'
								}
							],
							'wmsStatus': null,
							'estimatedDeliveryDate': null,
							'productSKU': '71969-01',
							'productQuantity': 1,
							'shipmentId': 'a4d4E0000000bOnQAI'
						}
					],
					'deliveryAddress': {
						'salutation': null,
						'firstName': 'john',
						'lastName': 'doe',
						'city': 'Emsdetten',
						'zipCode': '48282',
						'street': 'Weststr. 62',
						'addressInfo': null,
						'country': null,
						'countryCode': 'DE',
						'stateProvince': null,
						'phoneNumber': '+49 1514215786'
					},
					'billingAddress': {
						'salutation': null,
						'firstName': 'john',
						'lastName': 'doe',
						'city': 'Emsdetten',
						'zipCode': '48282',
						'street': 'Weststr. 62',
						'addressInfo': null,
						'country': null,
						'countryCode': 'DE',
						'stateProvince': null,
						'phoneNumber': '+49 1514215786'
					},
					'returnDetails': null
				},
				{
					'index': 3,
					'orderId': 'DEBAAAAAIQ',
					'orderDate': 1587945600000,
					'orderTitle': 'Cash Pay Subscription',
					'orderType': 'Cash Pay Subscription',
					'rxmc': null,
					'isReimbursedOrder': false,
					'productData': [
						{
							'index': 1,
							'productSKU': 'S5269856',
							'productName': 'FreeStyle Libre Sensor v1',
							'productQuantity': 1,
							'productRescheduledDueDate': null,
							'productOriginalDateFrom': 1587945600000,
							'productDateOfNextShipment': 1595808000000,
							'productOriginalDateOfNextShipment': 1595808000000,
							'productDueDateWindow': '14,14',
							'deliverableNumber': 'DLV-000010293'
						}
					],
					'serviceData': [
						{
							'serviceSKU': '1-71538-01',
							'serviceName': 'FreeStyle Libre Sensor Subscription',
							'serviceFromDate': 1587945600000,
							'serviceToDate': null,
							'serviceFrequency': '3',
							'serviceDuration': null,
							'serviceProductQuantity': 1,
							'serviceStatus': 'Active'
						}
					],
					'priceBreakdown': {
						'totalPrice': '185.65',
						'price': 179.70,
						'coPay': '',
						'deliveryCost': 5.95
					},
					'paymentDetails': {
						'paymentMethodType': 'paypal',
						'paymentBrand': null,
						'card': {
							'last4Digits': null
						},
						'amountAuthorized': 185.65,
						'paymentToken': '8ac7a49f71aabf0e0171ba97acb923d2',
						'amountPaid': 185.65,
						'paymentTransactionId': null
					},
					'deliveryDetails': [
						{
							'index': 3,
							'deliveryId': 'SCH-0000089850',
							'deliveryType': 'Master',
							'deliveryStatus': 'Scheduled',
							'deliveryNumber': null,
							'deliveryTrackingNr': null,
							'invoiceIdDetails': [
								{
									'invoiceId': 'a4Z4E0000002qCzUAI',
									'invoiceStatus': null
								}
							],
							'wmsStatus': null,
							'estimatedDeliveryDate': null,
							'productSKU': 'S5269856',
							'productQuantity': 1,
							'shipmentId': 'a4d4E0000000bOxQAI'
						}
					],
					'deliveryAddress': {
						'salutation': null,
						'firstName': 'John',
						'lastName': 'Doe',
						'city': 'Emsdetten',
						'zipCode': '48282',
						'street': 'Weststr. 62',
						'addressInfo': null,
						'country': null,
						'countryCode': 'DE',
						'stateProvince': null,
						'phoneNumber': '+49 1514215786'
					},
					'billingAddress': {
						'salutation': null,
						'firstName': 'John',
						'lastName': 'Doe',
						'city': 'Emsdetten',
						'zipCode': '48282',
						'street': 'Weststr. 62',
						'addressInfo': null,
						'country': null,
						'countryCode': 'DE',
						'stateProvince': null,
						'phoneNumber': '+49 1514215786'
					},
					'returnDetails': null
				},
				{
					'index': 4,
					'orderId': 'DEBAAAAAIQ1',
					'orderDate': 1587945600000,
					'orderTitle': 'Cash Pay Subscription',
					'orderType': 'Cash Pay Subscription',
					'rxmc': null,
					'isReimbursedOrder': false,
					'productData': [
						{
							'index': 1,
							'productSKU': '72114-01',
							'productName': 'FreeStyle Libre Sensor 3',
							'productQuantity': 1,
							'productRescheduledDueDate': null,
							'productOriginalDateFrom': 1587945600000,
							'productDateOfNextShipment': 1595808000000,
							'productOriginalDateOfNextShipment': 1595808000000,
							'productDueDateWindow': '14,14',
							'deliverableNumber': 'DLV-000010293'
						}
					],
					'serviceData': [
						{
							'serviceSKU': '72114-01',
							'serviceName': 'FreeStyle Libre Sensor Subscription',
							'serviceFromDate': 1587945600000,
							'serviceToDate': null,
							'serviceFrequency': '3',
							'serviceDuration': null,
							'serviceProductQuantity': 1,
							'serviceStatus': 'Active'
						}
					],
					'priceBreakdown': {
						'totalPrice': '185.65',
						'price': 179.70,
						'coPay': '',
						'deliveryCost': 5.95
					},
					'paymentDetails': {
						'paymentMethodType': 'paypal',
						'paymentBrand': null,
						'card': {
							'last4Digits': null
						},
						'amountAuthorized': 185.65,
						'paymentToken': '8ac7a49f71aabf0e0171ba97acb923d2',
						'amountPaid': 185.65,
						'paymentTransactionId': null
					},
					'deliveryDetails': [
						{
							'index': 3,
							'deliveryId': 'SCH-0000089850',
							'deliveryType': 'Master',
							'deliveryStatus': 'Scheduled',
							'deliveryNumber': null,
							'deliveryTrackingNr': null,
							'invoiceIdDetails': [
								{
									'invoiceId': 'a4Z4E0000002qCzUAI',
									'invoiceStatus': null
								}
							],
							'wmsStatus': null,
							'estimatedDeliveryDate': null,
							'productSKU': '72114-01',
							'productQuantity': 1,
							'shipmentId': 'a4d4E0000000bOxQAI'
						}
					],
					'deliveryAddress': {
						'salutation': null,
						'firstName': 'John',
						'lastName': 'Doe',
						'city': 'Emsdetten',
						'zipCode': '48282',
						'street': 'Weststr. 62',
						'addressInfo': null,
						'country': null,
						'countryCode': 'DE',
						'stateProvince': null,
						'phoneNumber': '+49 1514215786'
					},
					'billingAddress': {
						'salutation': null,
						'firstName': 'John',
						'lastName': 'Doe',
						'city': 'Emsdetten',
						'zipCode': '48282',
						'street': 'Weststr. 62',
						'addressInfo': null,
						'country': null,
						'countryCode': 'DE',
						'stateProvince': null,
						'phoneNumber': '+49 1514215786'
					},
					'returnDetails': null
				}
			]
		},
		'CP': {
			'orderList': [
				{
					'index': 1,
					'orderId': 'DEBAAAAAIS',
					'orderDate': 1587945600000,
					'orderTitle': 'Cash Pay Subscription',
					'orderType': 'Cash Pay Subscription',
					'rxmc': null,
					'isReimbursedOrder': false,
					'productData': [
						{
							'index': 1,
							'productSKU': 'S5269856',
							'productName': 'FreeStyle Libre Sensor v1',
							'productQuantity': 1,
							'productRescheduledDueDate': null,
							'productOriginalDateFrom': 1587945600000,
							'productDateOfNextShipment': 1595808000000,
							'productOriginalDateOfNextShipment': 1595808000000,
							'productDueDateWindow': '14,14',
							'deliverableNumber': 'DLV-000010292'
						}
					],
					'serviceData': [
						{
							'serviceSKU': '1-71538-01',
							'serviceName': 'FreeStyle Libre Sensor Subscription',
							'serviceFromDate': 1587945600000,
							'serviceToDate': null,
							'serviceFrequency': '3',
							'serviceDuration': null,
							'serviceProductQuantity': 1,
							'serviceStatus': 'Active'
						}
					],
					'priceBreakdown': {
						'totalPrice': '425.25',
						'price': 419.30,
						'coPay': '',
						'deliveryCost': 5.95
					},
					'paymentDetails': {
						'paymentMethodType': 'paypal',
						'paymentBrand': null,
						'card': {
							'last4Digits': null
						},
						'amountAuthorized': 425.25,
						'paymentToken': '8ac7a4a271bac61a0171bafbc8c427f8',
						'amountPaid': 425.25,
						'paymentTransactionId': null
					},
					'deliveryDetails': [
						{
							'index': 1,
							'deliveryId': 'SCH-0000089849',
							'deliveryType': 'Master',
							'deliveryStatus': 'Scheduled',
							'deliveryNumber': null,
							'deliveryTrackingNr': null,
							'invoiceIdDetails': [
								{
									'invoiceId': 'a4Z4E0000002qCuUAI',
									'invoiceStatus': null
								}
							],
							'wmsStatus': null,
							'estimatedDeliveryDate': null,
							'productSKU': 'S5269856',
							'productQuantity': 1,
							'shipmentId': 'a4d4E0000000bOsQAI'
						}
					],
					'deliveryAddress': {
						'salutation': null,
						'firstName': 'john',
						'lastName': 'doe',
						'city': 'Emsdetten',
						'zipCode': '48282',
						'street': 'Weststr. 62',
						'addressInfo': null,
						'country': null,
						'countryCode': 'DE',
						'stateProvince': null,
						'phoneNumber': '+49 1514215786'
					},
					'billingAddress': {
						'salutation': null,
						'firstName': 'john',
						'lastName': 'doe',
						'city': 'Emsdetten',
						'zipCode': '48282',
						'street': 'Weststr. 62',
						'addressInfo': null,
						'country': null,
						'countryCode': 'DE',
						'stateProvince': null,
						'phoneNumber': '+49 1514215786'
					},
					'returnDetails': null
				},
				{
					'index': 2,
					'orderId': 'DEAAAAAAIR',
					'orderDate': 1587945600000,
					'orderTitle': 'Cash Pay',
					'orderType': 'Cash Pay',
					'rxmc': null,
					'isReimbursedOrder': false,
					'productData': [
						{
							'index': 1,
							'productSKU': '71969-01',
							'productName': 'Freestyle Libre Standalone Reader v2',
							'productQuantity': 1,
							'productRescheduledDueDate': null,
							'productOriginalDateFrom': 1587945600000,
							'productDateOfNextShipment': null,
							'productOriginalDateOfNextShipment': null,
							'productDueDateWindow': '14,14',
							'deliverableNumber': 'DLV-000010291'
						}
					],
					'serviceData': null,
					'priceBreakdown': {
						'totalPrice': '65.85',
						'price': 59.90,
						'coPay': '',
						'deliveryCost': 5.95
					},
					'paymentDetails': {
						'paymentMethodType': 'paypal',
						'paymentBrand': null,
						'card': {
							'last4Digits': null
						},
						'amountAuthorized': 65.85,
						'paymentToken': '8ac7a4a271bac61a0171bafa58852667',
						'amountPaid': 65.85,
						'paymentTransactionId': null
					},
					'deliveryDetails': [
						{
							'index': 2,
							'deliveryId': 'SCH-0000089848',
							'deliveryType': 'Master',
							'deliveryStatus': 'Payment Completed',
							'deliveryNumber': null,
							'deliveryTrackingNr': null,
							'invoiceIdDetails': [
								{
									'invoiceId': 'a4Z4E0000002qCpUAI',
									'invoiceStatus': 'Payment Completed'
								}
							],
							'wmsStatus': null,
							'estimatedDeliveryDate': null,
							'productSKU': '71969-01',
							'productQuantity': 1,
							'shipmentId': 'a4d4E0000000bOnQAI'
						}
					],
					'deliveryAddress': {
						'salutation': null,
						'firstName': 'john',
						'lastName': 'doe',
						'city': 'Emsdetten',
						'zipCode': '48282',
						'street': 'Weststr. 62',
						'addressInfo': null,
						'country': null,
						'countryCode': 'DE',
						'stateProvince': null,
						'phoneNumber': '+49 1514215786'
					},
					'billingAddress': {
						'salutation': null,
						'firstName': 'john',
						'lastName': 'doe',
						'city': 'Emsdetten',
						'zipCode': '48282',
						'street': 'Weststr. 62',
						'addressInfo': null,
						'country': null,
						'countryCode': 'DE',
						'stateProvince': null,
						'phoneNumber': '+49 1514215786'
					},
					'returnDetails': null
				},
				{
					'index': 3,
					'orderId': 'DEBAAAAAIQ',
					'orderDate': 1587945600000,
					'orderTitle': 'Cash Pay Subscription',
					'orderType': 'Cash Pay Subscription',
					'rxmc': null,
					'isReimbursedOrder': false,
					'productData': [
						{
							'index': 1,
							'productSKU': 'S5269856',
							'productName': 'FreeStyle Libre Sensor v1',
							'productQuantity': 1,
							'productRescheduledDueDate': null,
							'productOriginalDateFrom': 1587945600000,
							'productDateOfNextShipment': 1595808000000,
							'productOriginalDateOfNextShipment': 1595808000000,
							'productDueDateWindow': '14,14',
							'deliverableNumber': 'DLV-000010293'
						}
					],
					'serviceData': [
						{
							'serviceSKU': '1-71538-01',
							'serviceName': 'FreeStyle Libre Sensor Subscription',
							'serviceFromDate': 1587945600000,
							'serviceToDate': null,
							'serviceFrequency': '3',
							'serviceDuration': null,
							'serviceProductQuantity': 1,
							'serviceStatus': 'Active'
						}
					],
					'priceBreakdown': {
						'totalPrice': '185.65',
						'price': 179.70,
						'coPay': '',
						'deliveryCost': 5.95
					},
					'paymentDetails': {
						'paymentMethodType': 'paypal',
						'paymentBrand': null,
						'card': {
							'last4Digits': null
						},
						'amountAuthorized': 185.65,
						'paymentToken': '8ac7a49f71aabf0e0171ba97acb923d2',
						'amountPaid': 185.65,
						'paymentTransactionId': null
					},
					'deliveryDetails': [
						{
							'index': 3,
							'deliveryId': 'SCH-0000089850',
							'deliveryType': 'Master',
							'deliveryStatus': 'Scheduled',
							'deliveryNumber': null,
							'deliveryTrackingNr': null,
							'invoiceIdDetails': [
								{
									'invoiceId': 'a4Z4E0000002qCzUAI',
									'invoiceStatus': null
								}
							],
							'wmsStatus': null,
							'estimatedDeliveryDate': null,
							'productSKU': 'S5269856',
							'productQuantity': 1,
							'shipmentId': 'a4d4E0000000bOxQAI'
						}
					],
					'deliveryAddress': {
						'salutation': null,
						'firstName': 'john',
						'lastName': 'doe',
						'city': 'Emsdetten',
						'zipCode': '48282',
						'street': 'Weststr. 62',
						'addressInfo': null,
						'country': null,
						'countryCode': 'DE',
						'stateProvince': null,
						'phoneNumber': '+49 1514215786'
					},
					'billingAddress': {
						'salutation': null,
						'firstName': 'john',
						'lastName': 'doe',
						'city': 'Emsdetten',
						'zipCode': '48282',
						'street': 'Weststr. 62',
						'addressInfo': null,
						'country': null,
						'countryCode': 'DE',
						'stateProvince': null,
						'phoneNumber': '+49 1514215786'
					},
					'returnDetails': null
				}
			]
		}
	},
	allOrders: {
		fetched: false,
		loading: false,
		orders: [
			{
				"index": 1,
				"orderType": "Cash Pay",
				"orderId": "DEI15006789",
				"serviceData": [
					{
						"serviceStatus": "Active",
						"serviceToDate": 1669161600000
					}
				],
				"deliveryDetails": [
					{
						"index": 1,
						"deliveryStatus": "Created",
						"productSKU": "72114-01"
					}
				]
			},
			{
				"index": 2,
				"orderType": "Cash Pay Subscription",
				"orderId": "DEC5006789",
				"serviceData": [
					{
						"serviceStatus": "Active"
					}
				],
				"deliveryDetails": [
					{
						"index": 1,
						"deliveryStatus": "Created",
						"productSKU": "72114-01",
					}
				]
			},
			{
				"index": 3,
				"orderType": "Reimbursement",
				"orderId": "DED5006789",
				"serviceData": [
					{
						"serviceStatus": "Active"
					}
				],
				"deliveryDetails": [
					{
						"index": 2,
						"deliveryStatus": "Created",
						"productSKU": "71988-01"
					},
					{
						"index": 1,
						"deliveryStatus": "Created",
						"productSKU": "71988-01",
					}
				],
			}
		]
	},
	isCurrentOrderReturnFlow: false,
	errorCodes: [4134],
	errorCode: 1,
	confirmEmailStatus: true,
	searchBarLoading: false,
	faqSearchBarLoading: false,
	searchBarResults: {
		query: 'query',
		result: [{
			title: 'FreeStyle Libre – Blutzucker messen ohne Stechhilfe | FreeStyle Libre Sensor | FreeStyle Libre Lesegerät | FreeStyle Libre Erstattung | FreeStyle Libre über die Krankenkasse | FreeStyle Libre von Abbott',
			url: 'https://dev-nextgen-fsl.adcapps.net/libre.html',
			description: 'Plus Service Sensoren immer rechtzeitig bei Ihnen zu Hause FSL Sensor & Lesegerat 1 FSL Sensoren 2 14 Tage uberall und bequem Glukosewerte messen. ... Ad templum portam speciosam nomine dictam',
			tagtitle: 'FreeStyle Libre – Blutzucker messen ohne Stechhilfe | FreeStyle Libre Sensor | FreeStyle Libre Lesegerät | FreeStyle Libre Erstattung | FreeStyle Libre über die Krankenkasse | FreeStyle Libre von Abbott',
			tagdesc: 'Plus Service Sensoren immer rechtzeitig bei Ihnen zu Hause FSL Sensor & Lesegerat 1 FSL Sensoren 2 14 Tage uberall und bequem Glukosewerte messen. ... Ad templum portam speciosam nomine dictam',
			date: '2020-03-19',
			datetime: '2020-03-19 04:16:33.0',
			location: '/content/adc/freestylelibrede/de/de/v3/jcr:content'
		}]
	},
	faqSearchBarResults: {
		query: 'query',
		result: [{
			title: 'FreeStyle Libre – Blutzucker messen ohne Stechhilfe | FreeStyle Libre Sensor | FreeStyle Libre Lesegerät | FreeStyle Libre Erstattung | FreeStyle Libre über die Krankenkasse | FreeStyle Libre von Abbott',
			url: 'https://dev-nextgen-fsl.adcapps.net/libre.html',
			description: 'Plus Service Sensoren immer rechtzeitig bei Ihnen zu Hause FSL Sensor & Lesegerat 1 FSL Sensoren 2 14 Tage uberall und bequem Glukosewerte messen. ... Ad templum portam speciosam nomine dictam',
			tagtitle: 'FreeStyle Libre – Blutzucker messen ohne Stechhilfe | FreeStyle Libre Sensor | FreeStyle Libre Lesegerät | FreeStyle Libre Erstattung | FreeStyle Libre über die Krankenkasse | FreeStyle Libre von Abbott',
			tagdesc: 'Plus Service Sensoren immer rechtzeitig bei Ihnen zu Hause FSL Sensor & Lesegerat 1 FSL Sensoren 2 14 Tage uberall und bequem Glukosewerte messen. ... Ad templum portam speciosam nomine dictam',
			date: '2020-03-19',
			datetime: '2020-03-19 04:16:33.0',
			location: '/content/adc/freestylelibrede/de/de/v3/jcr:content'
		}]
	},
	results: {
		query: 'query',
		result: [{
			title: 'FreeStyle Libre – Blutzucker messen ohne Stechhilfe | FreeStyle Libre Sensor | FreeStyle Libre Lesegerät | FreeStyle Libre Erstattung | FreeStyle Libre über die Krankenkasse | FreeStyle Libre von Abbott',
			url: 'https://dev-nextgen-fsl.adcapps.net/libre.html',
			description: 'Plus Service Sensoren immer rechtzeitig bei Ihnen zu Hause FSL Sensor & Lesegerat 1 FSL Sensoren 2 14 Tage uberall und bequem Glukosewerte messen. ... Ad templum portam speciosam nomine dictam',
			tagtitle: 'FreeStyle Libre – Blutzucker messen ohne Stechhilfe | FreeStyle Libre Sensor | FreeStyle Libre Lesegerät | FreeStyle Libre Erstattung | FreeStyle Libre über die Krankenkasse | FreeStyle Libre von Abbott',
			tagdesc: 'Plus Service Sensoren immer rechtzeitig bei Ihnen zu Hause FSL Sensor & Lesegerat 1 FSL Sensoren 2 14 Tage uberall und bequem Glukosewerte messen. ... Ad templum portam speciosam nomine dictam',
			date: '2020-03-19',
			datetime: '2020-03-19 04:16:33.0',
			location: '/content/adc/freestylelibrede/de/de/v3/jcr:content'
		}]
	},
	plusService: {
		isDeleted: true,
		isPaymentEditFormOpen: true,
		isReactivationFormOpen: true,
	},
	loadingOrders: false,
	dictionary: {},
	currentOrders: {
		CPS: {
				'index': 0,
				'orderId': 'DEBAAAAAGG',
				'orderDate': 1585872000000,
				'orderTitle': 'Cash Pay Subscription',
				'orderType': 'Cash Pay Subscription',
				'rxmc': null,
				'isReimbursedOrder': false,
				'productData': [
					{
						'index': 1,
						'productSKU': 'S5269856',
						'productName': 'FreeStyle Libre Sensor v1',
						'productQuantity': 1,
						'productRescheduledDueDate': null,
						'productOriginalDateFrom': 1585872000000,
						'productDateOfNextShipment': 1593734400000,
						'productOriginalDateOfNextShipment': 1593734400000,
						'productDueDateWindow': '14,14',
						'deliverableNumber': 'DLV-000009586'
					}
				],
				'serviceData': [
					{
						'serviceSKU': '1-71538-01',
						'serviceName': 'FreeStyle Libre Sensor Subscription',
						'serviceFromDate': 1585872000000,
						'serviceToDate': null,
						'serviceFrequency': '3',
						'serviceDuration': null,
						'serviceProductQuantity': 1,
						'serviceStatus': 'Cancelled'
					}
				],
				'priceBreakdown': {
					'totalPrice': '425.25',
					'price': 419.3,
					'coPay': '',
					'deliveryCost': 5.95
				},
				'paymentDetails': {
					'paymentMethodType': 'credit_card',
					'paymentBrand': null,
					'card': {
						'last4Digits': '1111'
					},
					'amountAuthorized': 425.25,
					'paymentToken': '8ac7a4a1713a51e201713f5bf8cd4da3',
					'amountPaid': 425.25,
					'paymentTransactionId': null
				},
				'deliveryDetails': [
					{
						'index': 1,
						'deliveryId': 'SCH-0000089618',
						'deliveryType': 'Master',
						'deliveryStatus': 'On the way',
						'deliveryNumber': null,
						'deliveryTrackingNr': null,
						'invoiceIdDetails': [
							{
								'invoiceId': 'a4Z4E000000Cu8oUAC',
								'invoiceStatus': null
							}
						],
						'wmsStatus': null,
						'estimatedDeliveryDate': null,
						'productSKU': 'S5269856',
						'productQuantity': 1,
						'shipmentId': 'a4d4E000000DAi7QAG',
						'products': [
							{
								'productSKU': 'S5269856',
								'productQuantity': 1
							}
						]
					}
				],
				'deliveryAddress': {
					'salutation': null,
					'firstName': 'John',
					'lastName': 'Doe',
					'city': 'Mainz',
					'zipCode': '55116',
					'street': 'Bahnhofplatz 123123123',
					'addressInfo': null,
					'country': null,
					'countryCode': 'DE',
					'stateProvince': null,
					'phoneNumber': '+49 176 11 1111111'
				},
				'billingAddress': {
					'salutation': null,
					'firstName': 'John',
					'lastName': 'Doe',
					'city': 'Mainz',
					'zipCode': '55116',
					'street': 'Bahnhofplatz 123123123',
					'addressInfo': null,
					'country': null,
					'countryCode': 'DE',
					'stateProvince': null,
					'phoneNumber': '+49 176 11 1111111'
				},
				'returnDetails': null
			},
		RX: {
				'index': 1,
				'orderId': 'DEBAAAAAGG',
				'orderDate': 1585872000000,
				'orderTitle': 'Cash Pay Subscription',
				'orderType': 'Cash Pay Subscription',
				'rxmc': null,
				'isReimbursedOrder': false,
				'productData': [
					{
						'index': 1,
						'productSKU': 'S5269856',
						'productName': 'FreeStyle Libre Sensor v1',
						'productQuantity': 1,
						'productRescheduledDueDate': null,
						'productOriginalDateFrom': 1585872000000,
						'productDateOfNextShipment': 1593734400000,
						'productOriginalDateOfNextShipment': 1593734400000,
						'productDueDateWindow': '14,14',
						'deliverableNumber': 'DLV-000009586'
					}
				],
				'serviceData': [
					{
						'serviceSKU': '1-71538-01',
						'serviceName': 'FreeStyle Libre Sensor Subscription',
						'serviceFromDate': 1585872000000,
						'serviceToDate': null,
						'serviceFrequency': '3',
						'serviceDuration': null,
						'serviceProductQuantity': 1,
						'serviceStatus': 'Cancelled'
					}
				],
				'priceBreakdown': {
					'totalPrice': '425.25',
					'price': 419.3,
					'coPay': '',
					'deliveryCost': 5.95
				},
				'paymentDetails': {
					'paymentMethodType': 'credit_card',
					'paymentBrand': null,
					'card': {
						'last4Digits': '1111'
					},
					'amountAuthorized': 425.25,
					'paymentToken': '8ac7a4a1713a51e201713f5bf8cd4da3',
					'amountPaid': 425.25,
					'paymentTransactionId': null
				},
				'deliveryDetails': [
					{
						'index': 1,
						'deliveryId': 'SCH-0000089618',
						'deliveryType': 'Master',
						'deliveryStatus': 'Order cancelled',
						'deliveryNumber': null,
						'deliveryTrackingNr': null,
						'invoiceIdDetails': [
							{
								'invoiceId': 'a4Z4E000000Cu8oUAC',
								'invoiceStatus': null
							}
						],
						'wmsStatus': null,
						'estimatedDeliveryDate': null,
						'productSKU': 'S5269856',
						'productQuantity': 1,
						'shipmentId': 'a4d4E000000DAi7QAG',
						'products': [
							{
								'productSKU': 'S5269856',
								'productQuantity': 1
							}
						]
					}
				],
				'deliveryAddress': {
					'salutation': null,
					'firstName': 'John',
					'lastName': 'Doe',
					'city': 'Mainz',
					'zipCode': '55116',
					'street': 'Bahnhofplatz 123123123',
					'addressInfo': null,
					'country': null,
					'countryCode': 'DE',
					'stateProvince': null,
					'phoneNumber': '+49 176 11 1111111'
				},
				'billingAddress': {
					'salutation': null,
					'firstName': 'John',
					'lastName': 'Doe',
					'city': 'Mainz',
					'zipCode': '55116',
					'street': 'Bahnhofplatz 123123123',
					'addressInfo': null,
					'country': null,
					'countryCode': 'DE',
					'stateProvince': null,
					'phoneNumber': '+49 176 11 1111111'
				},
				'returnDetails': null
			}
	},

	user: {
		email: 'john.doe@gmail.com'
	},
	confirmationStatus: true,
	ghostOrders: [
		{
			'id': 3,
			'hmm_order_id': 'hmm_order_id001',
			'rxmc': 'rxmc001',
			'status_code': 50,
			'status_label': 'status_label001',
			'prescription_start_date': '2012-01-01',
			'approval_data': '2019-01-01',
			'customer_id': 12,
			'claim_receipt': '0JjQtNC10LnQvdGL0LUg0YHQvtC+0LHRgNCw0LbQtdC90LjRjyDQstGL0YHRiNC1111',
			'rx_free_order' : 1
		},
		{
			'id': 4,
			'hmm_order_id': 'hmm_order_id002',
			'rxmc': 'rxmc002',
			'status_code': 10,
			'status_label': 'status_label002',
			'prescription_start_date': '2012-01-02',
			'approval_data': '2019-01-02',
			'customer_id': 12,
			'claim_receipt': '0JjQtNC10LnQvdGL0LUg0YHQvtC+0LHRgNCw0LbQtdC90LjRjyDQstGL0YHRiNC1222',
			'rx_free_order' : 0
		},
		{
			'id': 5,
			'hmm_order_id': 'hmm_order_id002',
			'rxmc': 'rxmc002',
			'status_code': 51,
			'status_label': 'status_label002',
			'prescription_start_date': '2012-01-02',
			'approval_data': '2019-01-02',
			'customer_id': 12,
			'claim_receipt': '0JjQtNC10LnQvdGL0LUg0YHQvtC+0LHRgNCw0LbQtdC90LjRjyDQstGL0YHRiNC1222'
		},
		{
			'id': 6,
			'hmm_order_id': 'hmm_order_id002',
			'rxmc': 'rxmc002',
			'status_code': 49,
			'status_label': 'status_label002',
			'prescription_start_date': '2012-01-02',
			'approval_data': '2019-01-02',
			'customer_id': 12,
			'claim_receipt': '0JjQtNC10LnQvdGL0LUg0YHQvtC+0LHRgNCw0LbQtdC90LjRjyDQstGL0YHRiNC1222',
			'frontend_status': null
		},
		{
			'id': 7,
			'hmm_order_id': 'hmm_order_id001',
			'rxmc': 'rxmc001',
			'status_code': 90,
			'status_label': 'status_label001',
			'prescription_start_date': '2012-01-01',
			'approval_data': '2019-01-01',
			'customer_id': 12,
			'claim_receipt': '0JjQtNC10LnQvdGL0LUg0YHQvtC+0LHRgNCw0LbQtdC90LjRjyDQstGL0YHRiNC1111',
			'is_completed': true
		},
		{
			'id': 8,
			'hmm_order_id': 'hmm_order_id002',
			'rxmc': 'rxmc001',
			'status_code': 48,
			'status_label': 'status_label002',
			'prescription_start_date': '2012-01-01',
			'approval_data': '2019-01-01',
			'customer_id': 12,
			'claim_receipt': '0JjQtNC10LnQvdGL0LUg0YHQvtC+0LHRgNCw0LbQtdC90LjRjyDQstGL0YHRiNC1111',
		}
	],
	isLoading: false,
	passwordError: 'passwordError',
	isPasswordUpdated: false,
	emailUpdated: false,
	isEmailLoading: 'isEmailLoading',
	emailError: 'emailError',
	modalOpen: true,
	modalHeading: 'modalHeading',
	modalClassName: 'className',
	modalContentID: 'modalContentID',
	modalProps: { 'modalProps': 'modalProps1' },
	modalSize: { desktop: 'large', tablet: 'medium', mobile: 'small' },
	canModalClose: true,
	forgotPasswordSuccess: true,
	error: 'error',
	isOpen: false,
	delivery: { 'delivery': 'delivery1' },
	orderDetails: { 'orderDetails': 'orderDetails1' },
	isInvoiceErrorModalOpen: true,
	productData: { 'productData': 'productData1' },
	images: { name: 'image1' },
	returnId: '22222',
	formValues: {
		'country_id': 'AB',
		'telephone': 'telephone',
		'default_shipping': 'default_shipping',
		'default_billing': 'default_billing',
		'additionaladdress': 'additionaladdress'
	},
	UpdatePaymentMethodReducer: {
		isPaymentMethodUpdated: true,
		error: null,
		canRedirect: true,
		updatedOrder: 'Cash Pay Subscription'
	},
	bluedoorCustomer: {
		account_type: 2,
		dob: '20-12-1994',
		firstname: 'John',
		lastName: 'Doe',
		health_insurance_number: 'Q849505609',
		email: 'john.doe@gmail.com'
	},
	UploadCecFileReducer: {
		uploadPercentage: 100,
		loading: false,
		data: null,
		error: null
	},
	GetAvailablePaymentMethodsReducer: {
		methods: ['EP', 'CC', 'SUE', 'OI'],
		isLoading: false,
		error: null,
		resultCode: null
	},
	OtpConfirmRequestReducer: {
		otpText: '',
		isLoading: false,
		errorCode: [1234],
		isMobileVerified: true,
		confirmMobileStatus: null,
		verifiedMessage: null,
		isRequestSent: false,
		isResendRequest: false
	},
	GetCustomerCartReducer: {
		loading: false,
		isSubmitDisabled: false,
		warnings: [
			{ 'code': '5000', 'message': 'Some of the products below are not proper' },
			{ 'code': '5000', 'message': 'Some of the products below are not proper' }
		],
		cartDetails: {
			'id': 'KDzhKR5Or16of6UqnOP29FqLn5YjPs9e',
			'items': [{
				'id': 3,
				'product': {
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
					'image_url': 'https://abbott-magento2.test/static/version1563452614/graphql/_view/en_US/Magento_',
					'url': '',
					'https': '',
					'min_sale_qty': '2',
					'max_sale_qty': 10,
					'price': '20.0000',
					'max_order_quantity': '3',
					'weight': '2.0000',
					'ean_code': '99999999992',
					'shelf_life': '20'
				},
				'qty': 3,
				'bundle_options': [{
					'id': 1,
					'quantity': 2,
					'value': ['1']
				},
				],
				'price': {
					'value': 20,
					'currency': 'USD'
				},
				'item_price': {
					'value': 60,
					'currency': 'USD'
				},
				'sku': 'simple_product',
				'name': 'Simple Product'
			},
			{
				'id': 4,
				'product': {
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
					'image_url': 'https://abbott-magento2.test/static/version1563452614/graphql/_view/en_US/Magento_',
					'url': '',
					'https': '',
					'min_sale_qty': '2',
					'max_sale_qty': '10',
					'price': '20.0000',
					'max_order_quantity': '3',
					'weight': '2.0000',
					'ean_code': '99999999992',
					'shelf_life': '20'
				},
				'qty': 13,
				'bundle_options': [{
					'id': 1,
					'quantity': 2,
					'value': ['1']
				},
				],
				'price': {
					'value': 20,
					'currency': 'USD'
				},
				'item_price': {
					'value': 60,
					'currency': 'USD'
				},
				'sku': 'simple_product',
				'name': 'Simple Product'
			}],
			'billing_address': {
				'id': 13,
				'prefix': 'Mr',
				'firstname': 'Firstname',
				'lastname': 'Lastname',
				'postcode': 'postcode',
				'country_id': 'DE',
				'country_name': 'Germany',
				'region_code': 'BER',
				'region': 'Berlin',
				'city': 'Berlin',
				'street': [
					'Street 1',
					'Street 2'
				],
				'telephone': '10111111112'
			},
			'shipping_address': {
				'id': 4,
				'prefix': 'Mr',
				'firstname': 'Firstname',
				'lastname': 'Lastname',
				'postcode': 'postcode',
				'country_id': 'DE',
				'country_name': 'Germany',
				'region_code': 'BER',
				'region': 'Berlin',
				'city': 'Berlin',
				'street': [
					'Street 1',
					'Street 2'
				],
				'telephone': '10111111112'
			},
			'applied_coupon': {
				'code': '2?ds5!2d'
			},
			'selected_payment_method': {
				'code': 'payon_paypal',
				'title': 'Check / Money order',
				'payon_checkout_id': 'payon_checkout_id'
			},
			'prices': {
				'grand_total': {
					'value': 70,
					'currency': 'USD'
				},
				'subtotal_including_tax': {
					'value': 60,
					'currency': 'USD'
				},
				'subtotal_excluding_tax': {
					'value': 60,
					'currency': 'USD'
				},
				'subtotal_with_discount_excluding_tax': {
					'value': 55,
					'currency': 'USD'
				},
				'applied_taxes': []
			}
		},
		error: null,
		showMiniCart: false,
		isCouponCodeSuccess: true,
		isCouponRemoved: true,
		errorCodes: [4134],
		checkoutIdDate: 'Wed May 13 2020 13:38:55 GMT+0530 (India Standard Time)'
	 },
	 GetAvailablePaymentMethodsGraphqlReducer:{
		paymentMethods: ['payon_cc','payon_paypal','open_invoice'],
    isLoading: false,
	error: null,
    unavailablePaymentOptionsMsg: null,
	},
	 GhostCartReducer: {
		loading:false,
		id:'CPMVw92p4LRqr5RPjMcCdWchSv5ONg9y',
		rxmcExists:null,
		warnings: [
			{ 'code': '5000', 'message': 'Some of the products below are not proper' },
			{ 'code': '5000', 'message': 'Some of the products below are not proper' }
		],
		checkoutIdDate:null,
		isCouponCodeSuccess:false,
		isCouponRemoved:false,
		error:null,
		errorCodes:null,
	 },
	 GetCustomerCartIdReducer:{
		loading: false,
		cartId: 'KDzhKR5Or16of6UqnOP29FqLn5YjPs9e',
		error: null
	},
	GetCustomerReducer: {
		loading: false,
		error: null,
		addressID: 12,
		maxAddressError: null,
		customer: {
			'id': 200998,
			'dob': '1990-10-10',
			'measurement': '101',
			'mobile_phone': '+49 176 11111111',
			'landline_phone': '+49 176 11 11111111',
			'payer_institution_name': 'test payers Swapna6',
			'payer_number': '105330157',
			'health_insurance_number': 'Q849505609',
			'account_type': 0,
			'firstname': 'John',
			'lastname': 'Doe',
			'email': 'john.doe@gmail.com',
			'prefix': 'Herr',
			'cs_first_shipment_shipped': true,
			'has_active_reimbursement': false,
			'prescription_reminder_sent': true,
			'last_cec_upload_date': '20171022',
			'is_cec_upload_allowed': true,
			'disable_mobile_popup': true,
			'temporary_mobile_number': '',
			'addresses': [
				{
					'id': 200892,
					'prefix': 'Herr',
					'firstname': 'John',
					'lastname': 'Doe',
					'postcode': '55132',
					'country_id': 'DE',
					'country_name': 'Deutschland',
					'region_code': null,
					'region': null,
					'city': 'sadasdas',
					'street': [
						'asdasdasd'
					],
					'telephone': '+49 176 11111111',
					'rss_result_code': null,
					'address_label': 'null',
					'default_shipping': true,
					'default_billing': true,
					'__typename': 'AdcCustomerAddress'
				}
			],
			'__typename': 'AdcCustomer',
			'is_social': false,
			'data_processing': false,
			'technical_instructions': [{
				"product_version": "FreeStyleLibre v.1",
				"status": "NEW"
			},
			{
				"product_version": "FreeStyleLibre v.2",
				"status": "completed"
			}]
		},
		temporary_mobile_number: '1234567890',
		isPayerConfirmationAccepted: true
	},
	GetCustomerPermissionReducer: {
		permissions: [],
		errorCode: null
	},
	authenticationModuleReducer: {
		loading: false,
		user: {
			email: 'john.doe@gmail.com',
			isSocialLogin: true
		},
		loggedIn: true,
		isLoggedIn: true,
		isRegistered: false,
		error: null,
		errorCode: null,
		resetPasswordSuccess: false,
		confirmationStatus: true,
		forgotPasswordSuccess: false
	},
	PaymentReducer: {
		isLoading: false,
		paymentTokens: null,
		payonCheckoutId: 'payonCheckoutId',
		canGoToPaymentTab: null,
		errorInDeletingPayment: 4123
	},
	SickfundReducer: {
		loading: false,
		sickfunds: [
			{
				'insuranceName': 'AOK Bayern',
				'leadIKNumber': '105330157',
				'isSpecialSickFund': 'false',
				'supportsApprovalFree': 'false',
				'isExtendedRollover': 'false',
				'displayToCustomer': 'true',
				'insuranceType': 'Public',
				'associatedRSPs': [
					{
						'rspName': 'ContraCare'
					}
				]
			},
			{
				'insuranceName': 'AOK Bremen / Bremerhaven',
				'leadIKNumber': '110311919',
				'isSpecialSickFund': 'false',
				'supportsApprovalFree': 'false',
				'isExtendedRollover': 'false',
				'displayToCustomer': 'true',
				'insuranceType': 'Private',
				'associatedRSPs': [
					{
						'rspName': 'HMM'
					}
				]
			},
			{
				'insuranceName': 'test payers Swapna8',
				'leadIKNumber': '10831056',
				'isSpecialSickFund': 'true',
				'supportsApprovalFree': 'false',
				'isExtendedRollover': 'false',
				'displayToCustomer': 'true',
				'insuranceType': 'Public',
				'associatedRSPs': [
					{
						'rspName': 'HMM'
					}
				]
			},
			{
				'insuranceName': 'test payers Swapna3',
				'leadIKNumber': '10831044',
				'isSpecialSickFund': 'false',
				'supportsApprovalFree': 'false',
				'isExtendedRollover': 'false',
				'displayToCustomer': 'true',
				'insuranceType': 'Public',
				'associatedRSPs': [
					{
						'rspName': 'HMM'
					}
				]
			},
			{
				'insuranceName': 'test payerssync Swapna9',
				'leadIKNumber': '10831057',
				'isSpecialSickFund': 'false',
				'supportsApprovalFree': 'false',
				'isExtendedRollover': 'false',
				'displayToCustomer': 'true',
				'insuranceType': 'Public',
				'associatedRSPs': [
					{
						'rspName': 'HMM'
					}
				]
			},
			{
				'insuranceName': 'test payers Swapna6',
				'leadIKNumber': '10831047',
				'isSpecialSickFund': 'true',
				'supportsApprovalFree': 'false',
				'isExtendedRollover': 'false',
				'displayToCustomer': 'true',
				'insuranceType': 'Public',
				'associatedRSPs': [
					{
						'rspName': 'HMM'
					}
				]
			},
			{
				'insuranceName': 'akhil',
				'leadIKNumber': '10010010',
				'isSpecialSickFund': 'false',
				'supportsApprovalFree': 'false',
				'isExtendedRollover': 'false',
				'displayToCustomer': 'true',
				'insuranceType': 'Public',
				'associatedRSPs': [
					{
						'rspName': 'HMM'
					}
				]
			},
			{
				'insuranceName': 'swapna123 tyuio',
				'leadIKNumber': '10831068',
				'isSpecialSickFund': 'false',
				'supportsApprovalFree': 'false',
				'isExtendedRollover': 'false',
				'displayToCustomer': 'true',
				'insuranceType': 'Public',
				'associatedRSPs': [
					{
						'rspName': 'HMM'
					}
				]
			},
			{
				'insuranceName': 'test payers Swapna',
				'leadIKNumber': '10831042',
				'isSpecialSickFund': 'false',
				'supportsApprovalFree': 'false',
				'isExtendedRollover': 'false',
				'displayToCustomer': 'true',
				'insuranceType': 'Public',
				'associatedRSPs': [
					{
						'rspName': 'HMM'
					}
				]
			},
			{
				'insuranceName': 'test payers Swapna4',
				'leadIKNumber': '10831045',
				'isSpecialSickFund': 'false',
				'supportsApprovalFree': 'false',
				'isExtendedRollover': 'false',
				'displayToCustomer': 'true',
				'insuranceType': 'Public',
				'associatedRSPs': [
					{
						'rspName': 'HMM'
					}
				]
			},
			{
				'insuranceName': 'test payers Swapna5',
				'leadIKNumber': '10831046',
				'isSpecialSickFund': 'false',
				'supportsApprovalFree': 'false',
				'isExtendedRollover': 'false',
				'displayToCustomer': 'true',
				'insuranceType': 'Public',
				'associatedRSPs': [
					{
						'rspName': 'HMM'
					}
				]
			},
			{
				'insuranceName': 'swapna123',
				'leadIKNumber': '10831048',
				'isSpecialSickFund': 'false',
				'supportsApprovalFree': 'false',
				'isExtendedRollover': 'false',
				'displayToCustomer': 'true',
				'insuranceType': 'Public',
				'associatedRSPs': [
					{
						'rspName': 'HMM'
					}
				]
			},
			{
				'insuranceName': 'Sync Test Aloha',
				'leadIKNumber': '25145841',
				'isSpecialSickFund': 'false',
				'supportsApprovalFree': 'false',
				'isExtendedRollover': 'false',
				'displayToCustomer': 'true',
				'insuranceType': 'Public',
				'associatedRSPs': [
					{
						'rspName': 'HMM'
					}
				]
			},
			{
				'insuranceName': 'swapna123',
				'leadIKNumber': '123451234',
				'isSpecialSickFund': 'true',
				'supportsApprovalFree': 'false',
				'isExtendedRollover': 'false',
				'displayToCustomer': 'true',
				'insuranceType': 'Public',
				'associatedRSPs': [
					{
						'rspName': null
					}
				]
			}
		],
		error: null
	},
	AddressReducer: {
		loading: false,
		addresses: {
			registration: {
				verificationStatus: 'ADDRESS_CHECK_SUCCESS',
				address: {}
			},
			account: {
				verificationStatus: 'null',
				address: {}
			},
			plus_service: {
				verificationStatus: 'ADDRESS_CHECK_SUCCESS',
				address: {}
			}
		},
		error: { errorCodes: [4123] },
		methods: ['EP', 'CC', 'SUE', 'OI'],
	},
	zipcodes: {
		suggestions: empty.array
	},
	cities: {
		suggestions: empty.array
	},
	streets: {
		suggestions: empty.array
	},
	responsiveGridReducer: {
		editContext: { editContext: 'editContext1' },
		html: { 'path/responsiveGridName': 'html1' }
	},
	customerReturnInfo: { orderId: 'orderId1' },
	OrderIdModuleReducer: {
		orderId: 'orderId',
		error: { error: '' }
	},
	DeliveryDateUpdateReducer: {
		isDeliveryDateUpdated: false,
		isDeliveryDateLoading: false,
		deliveryDate: '2021-02-23T18:30:00.000Z'
	},
	isSubscriptionSuccessful: false,
	isPaymentMethodUpdated: true,
	updatedOrder: 'Cash Pay Subscription',
	isOrderUpdated: false,
	returnOrderType: 'CPS',
	addressAndPaymentUpdateError: true,
	isAddressAndPaymentMethodUpdated: true,
	rxmcOrders: {
		'0008RK': {
			'index': 1,
			'orderId': 'DEBAAAAAIS',
			'productData': [
				{
					'index': 1,
					'productSKU': 'S5269856',
					'productName': 'FreeStyle Libre Sensor v1',
					'productQuantity': 1,
					'productRescheduledDueDate': null,
					'productOriginalDateFrom': 1587945600000,
					'productDateOfNextShipment': 1595808000000,
					'productOriginalDateOfNextShipment': 1595808000000,
					'productDueDateWindow': '14,14',
					'deliverableNumber': 'DLV-000010292'
				},
				{
					'deliverableNumber': 'DLV-000008208',
					'deliverableStatus': 'Scheduled',
					'deliverableTotal': 30,
					'deliveryIdDetails': [],
					'index': 1,
					'productDateOfNextShipment': null,
					'productDueDateWindow': '10,10',
					'productName': 'FreeStyle Libre 2 Sensor',
					'productOriginalDateFrom': 1630540800000,
					'productOriginalDateOfNextShipment': null,
					'productQuantity': 6,
					'productRescheduledDueDate': null,
					'productSKU': '71988-01'
				},
				{
					'deliverableNumber': 'DLV-000008207',
					'deliverableStatus': 'Scheduled',
					'deliverableTotal': 30,
					'deliveryIdDetails': [],
					'index': 2,
					'productDateOfNextShipment': null,
					'productDueDateWindow': '10,10',
					'productName': 'FreeStyle Libre 2 Sensor',
					'productOriginalDateFrom': 1622592000000,
					'productOriginalDateOfNextShipment': null,
					'productQuantity': 6,
					'productRescheduledDueDate': null,
					'productSKU': '71988-01'
				},
				{
					'deliverableNumber': 'DLV-000008206',
					'deliverableStatus': 'Scheduled',
					'deliverableTotal': 30,
					'deliveryIdDetails': [],
					'index': 1,
					'productDateOfNextShipment': null,
					'productDueDateWindow': '10,10',
					'productName': 'FreeStyle Libre 2 Sensor',
					'productOriginalDateFrom': 1614643200000,
					'productOriginalDateOfNextShipment': null,
					'productQuantity': 6,
					'productRescheduledDueDate': null,
					'productSKU': '71988-01'
				},
				{
					'deliverableNumber': 'DLV-000008205',
					'deliverableStatus': 'Scheduled',
					'deliverableTotal': 30,
					'deliveryIdDetails': [
						{ 'deliveryId': 'SCH-0000005288' },
						{ 'deliveryId': 'SCH-0000005287' },
						{ 'deliveryId': 'SCH-0000005286' }
					],
					'index': 1,
					'productDateOfNextShipment': null,
					'productDueDateWindow': '10,10',
					'productName': 'FreeStyle Libre 2 Sensor',
					'productOriginalDateFrom': 1606867200000,
					'productOriginalDateOfNextShipment': null,
					'productQuantity': 7,
					'productRescheduledDueDate': null,
					'productSKU': '71988-01'
				}
			],
			'deliveryDetails': [
				{
					'index': 1,
					'deliveryId': 'SCH-0000089849',
					'deliveryType': 'Master',
					'deliveryStatus': 'Scheduled',
					'deliveryNumber': null,
					'deliveryTrackingNr': null,
					'invoiceIdDetails': [
						{
							'invoiceId': 'a4Z4E0000002qCuUAI',
							'invoiceStatus': null
						}
					],
					'wmsStatus': null,
					'estimatedDeliveryDate': null,
					'productSKU': 'S5269856',
					'productQuantity': 1,
					'shipmentId': 'a4d4E0000000bOsQAI'
				}
			],
			orderSubtype: null,
			orderTitle: 'Reimbursement',
			orderType: 'Reimbursement'
		}
	},
	plusServiceCancellationModuleReducer: {
		loading: false,
		plusServiceCancellationResponce: "fails",
		error: "plus_service_cancel_error_4617"
	},
	RefundReshipWegetReducer: {
		isfetching: false,
		returnStatusUpdated: false,
		errorMessageCode: ""
	},
	offlineToOnlineReducer: {
		validateOfflineCustomerResponse: null,
	isLoading: false,
	error: null
	},
	registerOfflineCustomerReducer: {
		registerOfflineCustomerResponse: null,
		isLoading: true,
		error: null
	},
	confirmOfflineCustomerReducer: {
		confirmOfflineCustomerResponse: {
				"status": false,
				"requestId": "271a679b-81ea-4c31-8b6b-6f0065a90031",
				"response": {
					"statusReason": "Verification Link Expired",
					"i18nMessageKeyAvailable": true,
					"i18nMessageKey": "AUTH-1012"
				},
				"errorCode": 400
			},
		isLoading: false,
		error: null
	}
};
const offlineToOnlineReducer = (state = initialState.offlineToOnlineReducer) => {
	return state;
};

const registerOfflineCustomerReducer = (state = initialState.registerOfflineCustomerReducer) => {
	return state;
};

const confirmOfflineCustomerReducer = (state = initialState.confirmOfflineCustomerReducer) => {
	return state;
}

const UpdatePaymentMethodReducer = (state = initialState) => {
	return state;
};
const RefundReshipWegetReducer = (state = initialState.RefundReshipWegetReducer) => {
	return state;
};
const translationReducer = (state = initialState) => {
	return state;
};
const formReducer1 = (state = initialState.formReducer) => {
	return state;
};
const GetCustomerCartReducer = (state = initialState.GetCustomerCartReducer) => {
	return state;
};
const GetAvailablePaymentMethodsGraphqlReducer = (state = initialState.GetAvailablePaymentMethodsGraphqlReducer) => {
	return state;
};
const GhostCartReducer = (state = initialState.GhostCartReducer) => {
	return state;
};
const GetCustomerCartIdReducer = (state = initialState.GetCustomerCartIdReducer) => {
	return state;
};
const OtpConfirmRequestReducer = (state = initialState.OtpConfirmRequestReducer) => {
	return state;
};
const responsiveGridReducer = (state = initialState.responsiveGridReducer) => {
	return state;
};

const GetProductsReducer = (state = initialState) => {
	return state;
};
const getProductPricesReducer = (state = initialState) => {
	return state;
};
const shippingOptionsReducers = (state = initialState) => {
	return state;
};
const GetCustomerReducer = (state = initialState.GetCustomerReducer) => {
	return state;
};
const GetOrdersReducer = (state = initialState) => {
	return state;
};
const OrdersReducer = (state = initialState) => {
	return state;
};
const EmailUpdateReducer = (state = initialState) => {
	return state;
};
const PasswordReducer = (state = initialState) => {
	return state;
};
const GetCustomerPermissionReducer = (state = initialState.GetCustomerPermissionReducer) => {
	return state;
};

const PaymentReducer = (state = initialState.PaymentReducer) => {
	return state;
};

const GetResultsReducer = (state = initialState) => {
	return state;
};
const SickfundReducer = (state = initialState.SickfundReducer) => {
	return state;
};
const ModalReducer = (state = initialState) => {
	return state;
};
const GetAvailablePaymentMethodsReducer = (state = initialState.GetAvailablePaymentMethodsReducer) => {
	return state;
};

const OrderIdModuleReducer = (state = initialState.OrderIdModuleReducer) => {
	return state;
};

const DeliveryDateUpdateReducer = (state = initialState.DeliveryDateUpdateReducer) => {
	return state;
};
const modalModuleReducer = combineReducers({
	ModalReducer
});

const paymentIdReducer = combineReducers({
	OrderIdModuleReducer
});
const plusServiceCancellationModuleReducer = combineReducers({
	PlusServiceCancellationReducer
});
const responsiveGridModuleReducer = combineReducers({
	responsiveGridReducer
});
const sickfundModuleReducer = combineReducers({
	SickfundReducer
});

const paymentModuleReducer = combineReducers({
	GetAvailablePaymentMethodsReducer,
	PaymentReducer
});

const resultsModuleReducer = combineReducers({
	GetResultsReducer
});

const translationModuleReducer = combineReducers({
	translationReducer
});

const formModuleReducer = combineReducers({
	formReducer : formReducer1
});

const cartModuleReducer = combineReducers({
	GetCustomerCartReducer,
	GetCustomerCartIdReducer,
	shippingOptionsReducers,
	GhostCartReducer,
	GetAvailablePaymentMethodsGraphqlReducer
});

const offlineToOnlineModuleReducer = combineReducers({
	offlineToOnlineReducer,
	registerOfflineCustomerReducer,
	confirmOfflineCustomerReducer
});

const authenticationModuleReducer = (state = initialState.authenticationModuleReducer) => {
	return state;
};
const bluedoorModuleReducer = (state = initialState) => {
	return state;
};
const PrePoulateFormReducer = (state = initialState) => {
	return state;
};
const AddressReducer = (state = initialState.AddressReducer) => {
	return state;
};
const GetGhostOrdersReducer = (state = initialState) => {
	return state;
};
const SubscribeToNewsletterReducer = (state = initialState) => {
	return state;
};
const OrderReturnReducer = (state = initialState) => {
	return state;
};
const TypeaheadReducer = (state = initialState) => {
	return state;
};
const UploadCecFileReducer = (state = initialState.UploadCecFileReducer) => {
	return state;
};
const PlusServiceCancellationReducer = (state = initialState.plusServiceCancellationModuleReducer) => {
	return state;
};
const productModuleReducer = combineReducers({
	GetProductsReducer,
	getProductPricesReducer
});
const newsletterReducer = combineReducers({
	SubscribeToNewsletterReducer
});
const addressModuleReducer = combineReducers({
	AddressReducer,
	TypeaheadReducer
});
const OrderUpdateReducer = (state = initialState) => {
	return state;
};


const myAccountModuleReducer = combineReducers({
	PrePoulateFormReducer,
	GetCustomerReducer,
	GetOrdersReducer,
	GetGhostOrdersReducer,
	OrdersReducer,
	PasswordReducer,
	OrderUpdateReducer,
	GetCustomerPermissionReducer,
	EmailUpdateReducer,
	OtpConfirmRequestReducer,
	OrderReturnReducer,
	UploadCecFileReducer,
	DeliveryDateUpdateReducer,
	UpdatePaymentMethodReducer,
	PlusServiceCancellationReducer,
	RefundReshipWegetReducer
});

const combinedReducers = combineReducers({
	form: formReducer,
	translationModuleReducer,
	formModuleReducer,
	cartModuleReducer,
	authenticationModuleReducer,
	productModuleReducer,
	myAccountModuleReducer,
	paymentModuleReducer,
	sickfundModuleReducer,
	resultsModuleReducer,
	addressModuleReducer,
	modalModuleReducer,
	newsletterReducer,
	bluedoorModuleReducer,
	responsiveGridModuleReducer,
	paymentIdReducer,
	plusServiceCancellationModuleReducer,
	offlineToOnlineModuleReducer
});


export const mockReducer = (state, action) => {
	return combinedReducers(state, action);
};