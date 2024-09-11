import {combineReducers} from 'redux';

const initialState= {
	customer: null,
	dictionary: null,
	products: null,
	orders: null,
	currentOrders: null,
	productPrices: null,
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
};

const GetCustomerReducer = (state = initialState) => {
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

const myAccountModuleReducer = combineReducers({
	GetCustomerReducer,
	GetOrdersReducer
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
	GetCustomerCartIdReducer
});

const combinedReducers = combineReducers({
	myAccountModuleReducer,
	translationModuleReducer,
	productModuleReducer,
	cartModuleReducer
});


export const mockReducerDataLayer = (state, action) => {
	return combinedReducers(state, action);
};
