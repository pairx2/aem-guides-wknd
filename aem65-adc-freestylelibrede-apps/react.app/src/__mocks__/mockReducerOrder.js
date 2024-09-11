import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';

const initialState = {

	loading: false,
	errorCodes: [4134],
	orders: {
		'accountId': '4900201099',
		'CPS': {
			'orderList': [
				{
					index: 0,
					orderDate: 1697188135000,
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
					index: 1,
					orderDate: 1697188136000,
					orderId: "DE6500000497",
					orderType: "Cash Pay Subscription",
					orderTitle: "Cash Pay Subscription",
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
					'index': 2,
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
							'serviceStatus': 'Inactive'
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
	dictionary: {},
	products: {},
	isOpen: true,
	delivery: {},
	orderDetails: {},
	productData: {},
	isInvoiceErrorModalOpen: false,
	productPrices: {
		'S5269856': {
			'id': 1,
			'sku': 'S5269856',
			'name': 'Simple Product',
			'description': 'Some product description',
			'short_description': 'Some product short description',
			'uom': 90,
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
		}
	},
	isLoggedIn: false,
	loggedIn: false,
	resetPasswordSuccess: true,
	customer: {
		id: 100000,
        user_id: '4900100000',
		addresses: [],
		is_social: true,
		data_processing: true,
		temporary_mobile_number: '+49 16095554072',
		mobile_phone: '+49 16095554072',
	},
	cartDetails: {
		'selected_payment_method':{
			'payon_checkout_id':'12343'
		},
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
				// 'min_sale_qty': '2',
				// 'max_sale_qty': '10',
				'price': '20.0000',
				'max_order_quantity': '3',
				'weight': '2.0000',
				'ean_code': '99999999992',
				'shelf_life': '20',
				is_subscription: true,
			},
			'qty': '3',
			'bundle_options': ['1'],
			'price': {
				'value': 20,
				'currency': 'USD'
			},
		}],
		'selected_shipping_method': {
			'carrier_code': 'flatrate',
			'method_code': 'flatrate',
			'carrier_title': 'Flat Rate',
			'amount': {
				'value': 15,
				'currency': 'USD'
			}
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
			'applied_taxes': [{ amount: { value: 101, currency: 'INR' } }],
		},
		'applied_coupon': null,
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
			'telephone': '10111111112',
			address_id: 0
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
			'telephone': '10111111112',
			address_id: 0
		},
	},
	cartId: 'KDzhKR5Or16of6UqnOP29FqLn5YjPs9e',
	currentOrders: {
		CP: {
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
	showEditForm: true,
	addressID: '',
	addresses: {
		registration: {
			verificationStatus: '',
			address: {},
		},
		account: {
			verificationStatus: 'ADDRESS_CHECK_ERROR',
			address: {}
		},
		plus_service: {
			verificationStatus: 'ADDRESS_CHECK_ERROR',
			address: {}
		}
	},
	methods: [],
	shippingOptions: [],
	sickfunds: [],
	forgotPasswordSuccess: true,
	error: 'error',
	PaymentReducer: {
		isLoading: true,
		paymentTokens: [{
			'method': 'payon_credit_card',
			'type': 'MC',
			'token': 'qwer4321',
			'expiry': '12/2019',
			'last4Digits': '1111',
			'label': 'Payon CC Payment',
			'is_default': true
		},
		{
			'method': 'payon_credit_card',
			'type': 'MC',
			'token': 'qwer4321',
			'expiry': '12/2019',
			'last4Digits': '1111',
			'label': 'Payon CC Payment',
			'is_default': false
		}],
		payonCheckoutId: 'payonCheckoutId',
		canGoToPaymentTab: true,
		error: 123,
		errorInDeletingPayment: null
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
			'prefix': 'Frau',
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
					'prefix': 'Frau',
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
	authenticationModuleReducer: {
        loading: false,
        user: {
            email: 'john.doe@gmail.com',
            isSocialLogin: true
        },
        loggedIn: true,
        isLoggedIn: true,
        isRegistered: true,
        error: null,
        errorCode: null,
        resetPasswordSuccess: false,
        confirmationStatus: true,
        forgotPasswordSuccess: false
    },
	isOrderUpdated: false,
	OtpConfirmRequestReducer: {
		errorCode: 123,
		isMobileVerified: true,
		isResendRequest: true,
		isRequestSent: true
	},
	temporary_mobile_number: null,
	searchBarResults: {
		query: '',
		result: []
	},
	faqSearchBarResults: {
		query: '',
		result: []
	},
	searchBarLoading: false,
	faqSearchBarLoading: false,
	plusService: {
		isPaymentEditFormOpen: false,
		isReactivationFormOpen: true,
	},
	UploadCecFileReducer: {
		uploadPercentage: 100,
		loading: true,
		data: [{ 'label': 'value' }],
		error: { error: 'error' }
	},
	ModalReducer: {
		modalOpen: false,
		modalHeading: 'modalHeading',
		modalContentID: 'modalContentID',
		modalProps: { 'modalProps': 'modalProps1' },
		modalSize: { desktop: 'large', tablet: 'medium', mobile: 'small' },
	},
	DeliveryDateUpdateReducer: {
		isDeliveryDateUpdated: false,
		isDeliveryDateLoading: true,
		deliveryDate: '2021-02-23T18:30:00.000Z'
	},
	EmailUpdateReducer: {
		isLoading: false,
		error: null,
		emailUpdated: null,
		confirmEmailStatus: null,
	},
	PasswordReducer: {
		isLoading: true,
		error: null,
		isPasswordUpdated: false,
	},
	isReturnFlow: false,
	UpdatePaymentMethodReducer: {
		isPaymentMethodUpdated: false,
		error: null,
		orderUpdated: 'Cash Pay Subscription'
	},
	isAllowSave: false,
	user: {
		userName: 'John Watson',
		firstName: 'John',
		lastName: 'Watson',
		isSocialLogin: false
	},
	bluedoorCustomer: null,
	isCouponCodeError: true,
	isLoading: true,
	isReactivated: true,
	returnOrderType: 'RX',
	allOrders: {
		fetched: true,
		loading: false,
		orders: [
			{
				"index": 1,
				"orderType": "Cash Pay",
				"orderId": "DE15006789",
				"serviceData": null,
				"deliveryDetails": [
					{
						"index": 1,
						"deliveryStatus": "Created",
						"productSKU": "72114-01",
						"deliveryOrderId": "DE5500003448",
						"invoiceIdDetails": [
							{
							  "invoiceId": "DEI0000838122",
							  "invoiceStatus": "Payment Completed"
							}
						  ],
					}
				]
			},
			{
				"index": 2,
				"orderType": "Cash Pay Subscription",
				"orderId": "DE15006789",
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
						"deliveryOrderId": "DE5500003448",
						"invoiceIdDetails": [
							{
							  "invoiceId": "DEC0000838122",
							  "invoiceStatus": "Payment Completed"
							}
						  ],
					}
				]
			},
			{
				"index": 3,
				"orderType": "Reimbursement",
				"orderId": "DE15006789",
				"serviceData": [
					{
						"serviceStatus": "Active"
					}
				],
				"deliveryDetails": [
					{
						"index": 2,
						"deliveryStatus": "Created",
						"productSKU": "71988-01",
						"deliveryOrderId": "DE5500003448",
						"invoiceIdDetails": [
							{
							  "invoiceId": "D0000838122",
							  "invoiceStatus": "Payment Completed"
							}
						  ],
					},
					{
						"index": 1,
						"deliveryStatus": "Created",
						"productSKU": "71988-01",
					}
					
				],
			},
			{
				"index": 1,
				"orderType": "Cash Pay",
				"orderId": "DE15006789",
				"serviceData": null,
				"deliveryDetails": [
					{
						"index": 1,
						"deliveryStatus": "Created",
						"productSKU": "72114-01",
						"deliveryOrderId": "DE5500003448",
						"invoiceIdDetails": [
							{
							  "invoiceStatus": "Payment Completed"
							}
						  ],
					}
				]
			},
		]
	}
};

const UpdatePaymentMethodReducer = (state = initialState) => {
	return state;
};

const DeliveryDateUpdateReducer = (state = initialState) => {
	return state;
};

const GetCustomerCartReducer = (state = initialState) => {
	return state;
};
const GetAvailablePaymentMethodsGraphqlReducer = (state = initialState) => {
	return state;
};
const GetResultsReducer = (state = initialState) => {
	return state;
};

const GetOrdersReducer = (state = initialState) => {
	return state;
};

const GetGhostOrdersReducer = (state = initialState) => {
	return state;
};
const translationReducer = (state = initialState) => {
	return state;
};
const GetProductsReducer = (state = initialState) => {
	return state;
};
const getProductPricesReducer = (state = initialState) => {
	return state;
};
const authenticationModuleReducer = (state = initialState) => {
	return state;
};
const OrdersReducer = (state = initialState) => {
	return state;
};
const GetCustomerReducer = (state = initialState) => {
	return state;
};
const GetCustomerCartIdReducer = (state = initialState) => {
	return state;
};
const PrePoulateFormReducer = (state = initialState) => {
	return state;
};
const AddressReducer = (state = initialState) => {
	return state;
};
const shippingOptionsReducers = (state = initialState) => {
	return state;
};
const SickfundReducer = (state = initialState) => {
	return state;
};
const PaymentReducer = (state = initialState.PaymentReducer) => {
	return state;
};

const GetAvailablePaymentMethodsReducer = (state = initialState) => {
	return state;
};
const OrderUpdateReducer = (state = initialState) => {
	return state;
};
const PasswordReducer = (state = initialState.PasswordReducer) => {
	return state;
};
const EmailUpdateReducer = (state = initialState.EmailUpdateReducer) => {
	return state;
};
const OtpConfirmRequestReducer = (state = initialState.OtpConfirmRequestReducer) => {
	return state;
};

const UploadCecFileReducer = (state = initialState.UploadCecFileReducer) => {
	return state;
};
const ModalReducer = (state = initialState.ModalReducer) => {
	return state;
};
const bluedoorModuleReducer = (state = initialState) => {
	return state;
};
const confirmOfflineCustomerReducer = (state = initialState) => {
	return state;
}

const cartModuleReducer = combineReducers({
	GetCustomerCartReducer,
	GetCustomerCartIdReducer,
	shippingOptionsReducers,
	GetAvailablePaymentMethodsGraphqlReducer
});

const paymentModuleReducer = combineReducers({
	PaymentReducer,
	GetAvailablePaymentMethodsReducer
});

const resultsModuleReducer = combineReducers({
	GetResultsReducer
});

const modalModuleReducer = combineReducers({
	ModalReducer
});

const myAccountModuleReducer = combineReducers({
	GetOrdersReducer,
	OrdersReducer,
	GetCustomerReducer,
	PasswordReducer,
	EmailUpdateReducer,
	PrePoulateFormReducer,
	OrderUpdateReducer,
	OtpConfirmRequestReducer,
	UploadCecFileReducer,
	DeliveryDateUpdateReducer,
	UpdatePaymentMethodReducer,
	GetGhostOrdersReducer
});
const translationModuleReducer = combineReducers({
	translationReducer,
});

const productModuleReducer = combineReducers({
	GetProductsReducer,
	getProductPricesReducer
});

const addressModuleReducer = combineReducers({
	AddressReducer
});

const sickfundModuleReducer = combineReducers({
	SickfundReducer
});

const offlineToOnlineModuleReducer = combineReducers({
	confirmOfflineCustomerReducer
})

const combinedReducers = combineReducers({
	form: formReducer,
	cartModuleReducer,
	myAccountModuleReducer,
	translationModuleReducer,
	productModuleReducer,
	authenticationModuleReducer,
	addressModuleReducer,
	sickfundModuleReducer,
	paymentModuleReducer,
	resultsModuleReducer,
	modalModuleReducer,
	bluedoorModuleReducer,
	offlineToOnlineModuleReducer
});


export const mockReducerOrder = (state, action) => {
	return combinedReducers(state, action);
};
