import {reducer as formReducer} from 'redux-form';
import {combineReducers} from 'redux';
import {ADDRESS_CHECK_SUCCESS} from '../modules/Address/api/addressVerification.api';

const initialState = {

	customer: {
		'id':200998,
		'dob':'1990-10-10',
		'measurement':'101',
		'mobile_phone':'+49 176 11111111',
		'landline_phone':'+49 176 11 11111111',
		'payer_institution_name':'test payers Swapna6',
		'payer_number':null,
		'health_insurance_number':'Q849505609',
		'account_type':0,
		'firstname':'Saurabh',
		'lastname':'Mishhra',
		'email':'786677@yopmail.com',
		'prefix':'Herr',
		'cs_first_shipment_shipped':true,
		'has_active_reimbursement':false,
		'prescription_reminder_sent':true,
		'is_cec_upload_allowed': false,
		'addresses':[
		   {
			  'id':200892,
			  'prefix':'Herr',
			  'firstname':'Saurabh',
			  'lastname':'Mishhra',
			  'postcode':'55132',
			  'country_id':'DE',
			  'country_name':'Deutschland',
			  'region_code':null,
			  'region':null,
			  'city':'sadasdas',
			  'street':[
				 'asdasdasd'
			  ],
			  'telephone':'+49 176 11111111',
			  'rss_result_code':null,
			  'address_label':'null',
			  'default_shipping':false,
			  'default_billing':false,
			  '__typename':'AdcCustomerAddress'
		   }
		],
		'__typename':'AdcCustomer'
	},
	cartId: 'KDzhKR5Or16of6UqnOP29FqLn5YjPs9e',
	orderID: 'orderIDString',
	error: {'error': 'error'},
	translationReducer: {
		dictionary: {
			'test_key': 'test_label',
			'test_key_html': '<div>test'
		},
		dictionaryFetched: true,
	},
	showEditForm: false,
	addressID: 'addressID',
	orders: {
		'accountId':'4900201099',
		'RX':{
			'orderList':[
		    {
			  'index':1,
			  'orderId':'DEBAAAAAIS',
			  'orderDate':1587945600000,
			  'orderTitle':'Cash Pay Subscription',
			  'orderType':'Cash Pay Subscription',
			  'rxmc': 'rxmc',
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
			]
	  }
	 },
	 currentOrders:[
		{
		   'index':2,
		   'orderId':'DEBAAAAAGG',
		   'orderDate':1585872000000,
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
				 'productOriginalDateFrom':1585872000000,
				 'productDateOfNextShipment':1593734400000,
				 'productOriginalDateOfNextShipment':1593734400000,
				 'productDueDateWindow':'14,14',
				 'deliverableNumber':'DLV-000009586'
			  }
		   ],
		   'serviceData':[
			  {
				 'serviceSKU':'1-71538-01',
				 'serviceName':'FreeStyle Libre Sensor Subscription',
				 'serviceFromDate':1585872000000,
				 'serviceToDate':null,
				 'serviceFrequency':'3',
				 'serviceDuration':null,
				 'serviceProductQuantity':1,
				 'serviceStatus':'Cancelled'
			  }
		   ],
		   'priceBreakdown':{
			  'totalPrice':'425.25',
			  'price':419.3,
			  'coPay':'',
			  'deliveryCost':5.95
		   },
		   'paymentDetails':{
			  'paymentMethodType':'credit_card',
			  'paymentBrand':null,
			  'card':{
				 'last4Digits':'1111'
			  },
			  'amountAuthorized':425.25,
			  'paymentToken':'8ac7a4a1713a51e201713f5bf8cd4da3',
			  'amountPaid':425.25,
			  'paymentTransactionId':null
		   },
		   'deliveryDetails':[
			  {
				 'index':1,
				 'deliveryId':'SCH-0000089618',
				 'deliveryType':'Master',
				 'deliveryStatus':'Order cancelled',
				 'deliveryNumber':null,
				 'deliveryTrackingNr':null,
				 'invoiceIdDetails':[
						{
					   'invoiceId':'a4Z4E000000Cu8oUAC',
					   'invoiceStatus':null
						}
				 ],
				 'wmsStatus':null,
				 'estimatedDeliveryDate':null,
				 'productSKU':'S5269856',
				 'productQuantity':1,
				 'shipmentId':'a4d4E000000DAi7QAG',
				 'products':[
						{
					   'productSKU':'S5269856',
					   'productQuantity':1
						}
				 ],
				 'deliveryAddress': {
					 'id': 11
				 }
			  }
		   ],
		   'deliveryAddress':{
			  'salutation':null,
			  'firstName':'Saurabh',
			  'lastName':'Mishra',
			  'city':'Mainz',
			  'zipCode':'55116',
			  'street':'Bahnhofplatz 123123123',
			  'addressInfo':null,
			  'country':null,
			  'countryCode':'DE',
			  'stateProvince':null,
			  'phoneNumber':'+49 176 11 1111111'
		   },
		   'billingAddress':{
			  'salutation':null,
			  'firstName':'Saurabh',
			  'lastName':'Mishra',
			  'city':'Mainz',
			  'zipCode':'55116',
			  'street':'Bahnhofplatz 123123123',
			  'addressInfo':null,
			  'country':null,
			  'countryCode':'DE',
			  'stateProvince':null,
			  'phoneNumber':'+49 176 11 1111111'
		   },
		   'returnDetails':null
		},
		{
			'index':3,
			'orderId':'DEBAAAAAGG',
			'orderDate':1585872000000,
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
				  'productOriginalDateFrom':1585872000000,
				  'productDateOfNextShipment':1593734400000,
				  'productOriginalDateOfNextShipment':1593734400000,
				  'productDueDateWindow':'14,14',
				  'deliverableNumber':'DLV-000009586'
			   }
			],
			'serviceData':[
			   {
				  'serviceSKU':'1-71538-01',
				  'serviceName':'FreeStyle Libre Sensor Subscription',
				  'serviceFromDate':1585872000000,
				  'serviceToDate':null,
				  'serviceFrequency':'3',
				  'serviceDuration':null,
				  'serviceProductQuantity':1,
				  'serviceStatus':'Cancelled'
			   }
			],
			'priceBreakdown':{
			   'totalPrice':'425.25',
			   'price':419.3,
			   'coPay':'',
			   'deliveryCost':5.95
			},
			'paymentDetails':{
			   'paymentMethodType':'credit_card',
			   'paymentBrand':null,
			   'card':{
				  'last4Digits':'1111'
			   },
			   'amountAuthorized':425.25,
			   'paymentToken':'8ac7a4a1713a51e201713f5bf8cd4da3',
			   'amountPaid':425.25,
			   'paymentTransactionId':null
			},
			'deliveryDetails':[
			   {
				  'index':1,
				  'deliveryId':'SCH-0000089618',
				  'deliveryType':'Master',
				  'deliveryStatus':'Order cancelled',
				  'deliveryNumber':null,
				  'deliveryTrackingNr':null,
				  'invoiceIdDetails':[
					 {
							'invoiceId':'a4Z4E000000Cu8oUAC',
							'invoiceStatus':null
					 }
				  ],
				  'wmsStatus':null,
				  'estimatedDeliveryDate':null,
				  'productSKU':'S5269856',
				  'productQuantity':1,
				  'shipmentId':'a4d4E000000DAi7QAG',
				  'products':[
					 {
							'productSKU':'S5269856',
							'productQuantity':1
					 }
				  ]
			   }
			],
			'deliveryAddress':{
			   'salutation':null,
			   'firstName':'Saurabh',
			   'lastName':'Mishra',
			   'city':'Mainz',
			   'zipCode':'55116',
			   'street':'Bahnhofplatz 123123123',
			   'addressInfo':null,
			   'country':null,
			   'countryCode':'DE',
			   'stateProvince':null,
			   'phoneNumber':'+49 176 11 1111111'
			},
			'billingAddress':{
			   'salutation':null,
			   'firstName':'Saurabh',
			   'lastName':'Mishra',
			   'city':'Mainz',
			   'zipCode':'55116',
			   'street':'Bahnhofplatz 123123123',
			   'addressInfo':null,
			   'country':null,
			   'countryCode':'DE',
			   'stateProvince':null,
			   'phoneNumber':'+49 176 11 1111111'
			},
			'returnDetails':null
		 }
	 ],
	 formValues: {'formValues': 'form11'},
	 verificationStatus: ADDRESS_CHECK_SUCCESS,
	 address: {
		 'street': 'street',
		 'streetNumber': 'streetNumber',
		 'zipcode': 123456,
		 'city': 'city'
	 },
	 methods: ['EP','CC'],
	 addresses: {
		registration: {
			verificationStatus: ADDRESS_CHECK_SUCCESS,
			address: {
				street: 'street',
				streetNumber: 'streetNumber',
				zipcode: 'zipcode',
				city: 'city',
			},
			rssResultCode: 'rssResultCode'
		},
		account: {
			verificationStatus: ADDRESS_CHECK_SUCCESS,
			address: {verifiedAddress: 'verifiedAddress1'}
		},
		plus_service: {
			verificationStatus: null,
			address: {}
		}
	},
	bluedoorCustomer: {
		account_type: 2,
		dob: '20-12-1994',
		firstname: 'firstname',
		lastName: 'lastname',
		health_insurance_number: 123,
		email:' email',
		payer_institution_name:'AOK Bayern'
	 },
	 loading: true,
	 generalInfoFormValues: {'generalInfoFormValues': 'generalInfoFormValues1'},
	 modalProps: {
		 errorMessage: 'errorMessage',
		 errorTitle: 'errorTitle',
		 readerInformation: 'readerInformation',
		 serviceText: 'serviceText',
		 helplineNumber: 'helplineNumber',
		 emailCTAStyle: 'primary',
		 callCTAStyle: 'primary',
		 email: 'email',
		 token: 'token',
		 paymentMethod: {method: 'method', type: 'type', last4Digits: '1234', expiry: '2023'}
	},
	cartDetails: {items: []},
	loggedIn: false,
	showMiniCart: true,
	products: {},
	rxmcOrder: {'rxmcOrder1':'rxmcOrder2'},
	OrderIdModuleReducer:{
		orderID: 'orderIDString',
		error: 'payment-error',
	},
	user: {
		userName: 'userName',
		firstName: 'firstName',
		lastName: 'lastName',
		isSocialLogin: true,
		email: 'email'
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
	GetAvailablePaymentMethodsReducer:{
		methods: ['EP','CC','SUE','OI'],
		isVerified: false,
		error: null,
		webShopMessage: null
	 },
	 GetAvailablePaymentMethodsGraphqlReducer:{
		payment_methods:[
			'payon_cc',
			'payon_paypal',
			'open_invoice'
			],
    isLoading: false,
	error: null,
    unavailablePaymentOptionsMsg: null,
	},
	 dictionary: {
		'test_key': 'test_label',
		'test_key_html': '<div>test'
	},
	OrderUpdateReducer: {
		isOrderUpdated: true,
		error: {error: 'error'},
		loading: true
	},
	PaymentReducer: {
		isLoading: false,
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
		canGoToPaymentTab: true
	},
	DeliveryDateUpdateReducer: {
		isDeliveryDateUpdated: false,
		isDeliveryDateLoading: true,
	},
	SickfundReducer:{
		loading: false,
		sickfunds: [
			{
			   'insuranceName':'AOK Bayern',
			   'leadIKNumber':'108310404',
			   'isSpecialSickFund':'false',
			   'supportsApprovalFree':'false',
			   'isExtendedRollover':'false',
			   'displayToCustomer':'true',
			   'insuranceType':'Public',
			   'associatedRSPs':[
				  {
					 'rspName':'CC'
				  }
			   ]
			},
			{
			   'insuranceName':'AOK Bremen / Bremerhaven',
			   'leadIKNumber':'110311919',
			   'isSpecialSickFund':'false',
			   'supportsApprovalFree':'false',
			   'isExtendedRollover':'false',
			   'displayToCustomer':'true',
			   'insuranceType':'Private',
			   'associatedRSPs':[
				  {
					 'rspName':'HMM'
				  }
			   ]
			},
			{
			   'insuranceName':'test payers Swapna8',
			   'leadIKNumber':'10831056',
			   'isSpecialSickFund':'true',
			   'supportsApprovalFree':'false',
			   'isExtendedRollover':'false',
			   'displayToCustomer':'true',
			   'insuranceType':'Public',
			   'associatedRSPs':[
				  {
					 'rspName':'HMM'
				  }
			   ]
			},
			{
			   'insuranceName':'test payers Swapna3',
			   'leadIKNumber':'10831044',
			   'isSpecialSickFund':'false',
			   'supportsApprovalFree':'false',
			   'isExtendedRollover':'false',
			   'displayToCustomer':'true',
			   'insuranceType':'Public',
			   'associatedRSPs':[
				  {
					 'rspName':'HMM'
				  }
			   ]
			},
			{
			   'insuranceName':'test payerssync Swapna9',
			   'leadIKNumber':'10831057',
			   'isSpecialSickFund':'false',
			   'supportsApprovalFree':'false',
			   'isExtendedRollover':'false',
			   'displayToCustomer':'true',
			   'insuranceType':'Public',
			   'associatedRSPs':[
				  {
					 'rspName':'HMM'
				  }
			   ]
			},
			{
			   'insuranceName':'test payers Swapna6',
			   'leadIKNumber':'10831047',
			   'isSpecialSickFund':'true',
			   'supportsApprovalFree':'false',
			   'isExtendedRollover':'false',
			   'displayToCustomer':'true',
			   'insuranceType':'Public',
			   'associatedRSPs':[
				  {
					 'rspName':'HMM'
				  }
			   ]
			},
			{
			   'insuranceName':'akhil',
			   'leadIKNumber':'10010010',
			   'isSpecialSickFund':'false',
			   'supportsApprovalFree':'false',
			   'isExtendedRollover':'false',
			   'displayToCustomer':'true',
			   'insuranceType':'Public',
			   'associatedRSPs':[
				  {
					 'rspName':'HMM'
				  }
			   ]
			},
			{
			   'insuranceName':'swapna123 tyuio',
			   'leadIKNumber':'10831068',
			   'isSpecialSickFund':'false',
			   'supportsApprovalFree':'false',
			   'isExtendedRollover':'false',
			   'displayToCustomer':'true',
			   'insuranceType':'Public',
			   'associatedRSPs':[
				  {
					 'rspName':'HMM'
				  }
			   ]
			},
			{
			   'insuranceName':'test payers Swapna',
			   'leadIKNumber':'10831042',
			   'isSpecialSickFund':'false',
			   'supportsApprovalFree':'false',
			   'isExtendedRollover':'false',
			   'displayToCustomer':'true',
			   'insuranceType':'Public',
			   'associatedRSPs':[
				  {
					 'rspName':'HMM'
				  }
			   ]
			},
			{
			   'insuranceName':'test payers Swapna4',
			   'leadIKNumber':'10831045',
			   'isSpecialSickFund':'false',
			   'supportsApprovalFree':'false',
			   'isExtendedRollover':'false',
			   'displayToCustomer':'true',
			   'insuranceType':'Public',
			   'associatedRSPs':[
				  {
					 'rspName':'HMM'
				  }
			   ]
			},
			{
			   'insuranceName':'test payers Swapna5',
			   'leadIKNumber':'10831046',
			   'isSpecialSickFund':'false',
			   'supportsApprovalFree':'false',
			   'isExtendedRollover':'false',
			   'displayToCustomer':'true',
			   'insuranceType':'Public',
			   'associatedRSPs':[
				  {
					 'rspName':'HMM'
				  }
			   ]
			},
			{
			   'insuranceName':'swapna123',
			   'leadIKNumber':'10831048',
			   'isSpecialSickFund':'false',
			   'supportsApprovalFree':'false',
			   'isExtendedRollover':'false',
			   'displayToCustomer':'true',
			   'insuranceType':'Public',
			   'associatedRSPs':[
				  {
					 'rspName':'HMM'
				  }
			   ]
			},
			{
			   'insuranceName':'Sync Test Aloha',
			   'leadIKNumber':'25145841',
			   'isSpecialSickFund':'false',
			   'supportsApprovalFree':'false',
			   'isExtendedRollover':'false',
			   'displayToCustomer':'true',
			   'insuranceType':'Public',
			   'associatedRSPs':[
				  {
					 'rspName':'HMM'
				  }
			   ]
			},
			{
			   'insuranceName':'swapna123',
			   'leadIKNumber':'123451234',
			   'isSpecialSickFund':'true',
			   'supportsApprovalFree':'false',
			   'isExtendedRollover':'false',
			   'displayToCustomer':'true',
			   'insuranceType':'Public',
			   'associatedRSPs':[
				  {
					 'rspName':null
				  }
			   ]
			}
		],
		error: null
	 },
	 OrdersReducer:{
		plusService:{
			isDeleted: true,
			isPaymentEditFormOpen: false,
		   isReactivationFormOpen: false,
	   },
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
			'shelf_life': '20',
			'is_subscription': true,
			'bundle_options': [{
				'id': 1,
				'quantity': 2,
				'position': 'position',
				'label': 'label',
				'values': [{quantity: 2, price: 22}]

			}],
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
			'is_subscription': true,
			'first_delivery_date_after': true,
			'bundle_options': [{
				'id': 2,
				'quantity': 3,
				'position': 'position',
				'label': 'label',
				'values': [{quantity: 3, price: 33}]

			}],
		}
	},
	shippingOptions: [],
	errorCodes: null
};

const OrdersReducer = (state = initialState.OrdersReducer) => {
	return state;
};

const GetCustomerReducer = (state = initialState) => {
	return state;
};
const GetAvailablePaymentMethodsReducer = (state = initialState.GetAvailablePaymentMethodsReducer) => {
	return state;
};
const OrderUpdateReducer = (state = initialState.OrderUpdateReducer) => {
	return state;
};
const GetGhostOrdersReducer = (state = initialState) => {
	return state;
};
const OrderIdModuleReducer = (state = initialState.OrderIdModuleReducer) => {
	return state;
};
const GetCustomerCartIdReducer = (state = initialState) => {
	return state;
};
const GetCustomerCartReducer = (state = initialState) => {
	return state;
};
const GetAvailablePaymentMethodsGraphqlReducer = (state = initialState.GetAvailablePaymentMethodsGraphqlReducer) => {
	return state;
};
const translationReducer = (state = initialState) => {
	return state;
};
const PrePoulateFormReducer = (state = initialState) => {
	return state;
};
const GetOrdersReducer = (state = initialState) => {
	return state;
};
const AddressReducer = (state = initialState) => {
	return state;
};
const authenticationModuleReducer  = (state = initialState) => {
	return state;
};
const bluedoorModuleReducer  = (state = initialState) => {
	return state;
};
const ModalReducer = (state = initialState) => {
	return state;
};
const GetProductsReducer = (state = initialState) => {
	return state;
};
const PaymentReducer= (state = initialState.PaymentReducer) => {
	return state;
};
const SickfundReducer = (state = initialState.SickfundReducer) => {
	return state;
};
const getProductPricesReducer = (state = initialState) => {
	return state;
};
const shippingOptionsReducers = (state = initialState) => {
	return state;
};
const sickfundModuleReducer = combineReducers({
	SickfundReducer
});
const modalModuleReducer = combineReducers({
	ModalReducer
});

const productModuleReducer = combineReducers({
	GetProductsReducer,
	getProductPricesReducer
});

const paymentModuleReducer = combineReducers({
	PaymentReducer,
	GetAvailablePaymentMethodsReducer
});

const DeliveryDateUpdateReducer = (state = initialState) => {
	return state;
};

const myAccountModuleReducer = combineReducers({
	GetCustomerReducer,
	PrePoulateFormReducer,
	GetOrdersReducer,
	GetGhostOrdersReducer,
	OrderUpdateReducer,
	DeliveryDateUpdateReducer,
	OrdersReducer
});

const paymentIdReducer = combineReducers({
	OrderIdModuleReducer
});

const cartModuleReducer = combineReducers({
	GetCustomerCartIdReducer,
	GetCustomerCartReducer,
	shippingOptionsReducers,
	GetAvailablePaymentMethodsGraphqlReducer
});

const translationModuleReducer = combineReducers({
	translationReducer
});

const addressModuleReducer = combineReducers({
	AddressReducer
});

const combinedReducers = combineReducers({
	form: formReducer,
	cartModuleReducer,
	sickfundModuleReducer,
	paymentIdReducer,
	myAccountModuleReducer,
	translationModuleReducer,
	addressModuleReducer,
	authenticationModuleReducer,
	bluedoorModuleReducer,
	modalModuleReducer,
	productModuleReducer,
	paymentModuleReducer
});


export const mockReducerConfirmationPage = (state, action) => {
	return combinedReducers(state, action);
};
