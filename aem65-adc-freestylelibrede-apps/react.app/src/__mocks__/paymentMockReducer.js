import {combineReducers} from 'redux';

const initialState= {
	customer: {
		'id':200998,
		'dob':'1990-10-10',
		'measurement':'101',
		'mobile_phone':'+49 176 11111111',
		'landline_phone':'+49 176 11 11111111',
		'payer_institution_name':'test payers Swapna6',
		'payer_number':'105330157',
		'health_insurance_number':'Q849505609',
		'account_type':0,
		'firstname':'John',
		'lastname':'Doe',
		'email':'john.doe@gmail.com',
		'prefix':'Herr',
		'cs_first_shipment_shipped':true,
		'has_active_reimbursement':false,
		'prescription_reminder_sent':true,
		'is_cec_upload_allowed': false,
		'addresses':[
		   {
			  'id':200892,
			  'prefix':'Herr',
			  'firstname':'John',
			  'lastname':'Doe',
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
	dictionary: null,
	products: null,
	orders: null,
	currentOrders: null,
	productPrices: null,
	errorCodes:[1234],
	checkoutIdDate: '2121, 11, 24',
	cartDetails: {
		'id': 'KDzhKR5Or16of6UqnOP29FqLn5YjPs9e',
		'items': [{
			'id': 3,
			'product': {
				'id': 1,
				'sku': null,
				'name': null,
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
			'qty': '30',
			'bundle_options': [{
				'id': 1,
				'quantity': 2,
				'value': ['1']
			},
			],
			'price': {
				'value': null,
				'currency': 'USD'
			},
			'item_price': {
				'value': null,
				'currency': 'USD'
			},
			'sku': 'simple_product',
			'name': 'Simple Product'
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
			'payon_checkout_id':'payon_checkout_id'
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
	GetAvailablePaymentMethodsReducer:{
		methods: ['EP','CC','SUE','OI'],
		isVerified: false,
		error: null,
		webShopMessage: null,
		isAllowSave : true
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
};

const GetCustomerReducer = (state = initialState) => {
	return state;
};
const SickfundReducer = (state = initialState.SickfundReducer) => {
	return state;
};
const PaymentReducer= (state = initialState.PaymentReducer) => {
	return state;
};
const GetOrdersReducer = (state = initialState) => {
	return state;
};
const GetCustomerCartReducer = (state = initialState) => {
	return state;
};
const GetCustomerCartIdReducer = (state = initialState) => {
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
const GetAvailablePaymentMethodsReducer = (state = initialState.GetAvailablePaymentMethodsReducer) => {
	return state;
};
const GetAvailablePaymentMethodsGraphqlReducer = (state = initialState.GetAvailablePaymentMethodsGraphqlReducer) => {
	return state;
};
const paymentModuleReducer = combineReducers({
	PaymentReducer,
	GetAvailablePaymentMethodsReducer
});

const myAccountModuleReducer = combineReducers({
	GetCustomerReducer,
	GetOrdersReducer
});
const sickfundModuleReducer = combineReducers({
	SickfundReducer
});
const translationModuleReducer = combineReducers({
	translationReducer,
});

const productModuleReducer = combineReducers({
	GetProductsReducer,
	getProductPricesReducer
});
const cartModuleReducer = combineReducers({
	GetCustomerCartReducer,
	GetCustomerCartIdReducer,
	GetAvailablePaymentMethodsGraphqlReducer
});

const combinedReducers = combineReducers({
	myAccountModuleReducer,
	translationModuleReducer,
	productModuleReducer,
	cartModuleReducer,
	paymentModuleReducer,
	sickfundModuleReducer
});


export const mockReducerPayment = (state, action) => {
	return combinedReducers(state, action);
};