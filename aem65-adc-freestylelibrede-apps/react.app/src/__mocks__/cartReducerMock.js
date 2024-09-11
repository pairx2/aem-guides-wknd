import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';

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
	GetCustomerCartReducer: {
		loading: false,
		isSubmitDisabled: false,
		warnings: [
			{ 'code': '5000', 'message': 'Some of the products below are not proper' },
			{ 'code': '5000', 'message': 'Some of the products below are not proper' }
		],
		cartDetails: {
			'id': 'KDzhKR5Or16of6UqnOP29FqLn5YjPs9e',
			'items': [],
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
	GetCustomerCartIdReducer:{
		loading: false,
		cartId: 'KDzhKR5Or16of6UqnOP29FqLn5YjPs9e',
		error: null
	}	
};

const translationReducer = (state = initialState) => {
	return state;
};
const GetCustomerCartReducer = (state = initialState.GetCustomerCartReducer) => {
	return state;
};
const GetCustomerCartIdReducer = (state = initialState.GetCustomerCartIdReducer) => {
	return state;
};

const translationModuleReducer = combineReducers({
	translationReducer
});

const cartModuleReducer = combineReducers({
	GetCustomerCartReducer,
	GetCustomerCartIdReducer,
});

const combinedReducers = combineReducers({
	form: formReducer,
	translationModuleReducer,
	cartModuleReducer	
});


export const mockReducerCart = (state, action) => {
	return combinedReducers(state, action);
};