import {reducer as formReducer} from 'redux-form';
import {combineReducers} from 'redux';

const initialState = {

	customer: {
		'addresses':[{}]
	},
	translationReducer: {
		dictionary: {
			'test_key': 'test_label',
			'test_key_html': '<div>test'
		},
		dictionaryFetched: true,
	},
	addressID: 'addressID',
	cartDetails: {items: []},
	address: {
		'street': 'street',
		'streetNumber': 'streetNumber',
		'zipcode': 123456,
		'city': 'city'
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
			'product_type': 'READER',
			'image_url': 'https://abbott-magento2.test/static/version1563452614/graphql/_view/en_US/Magento_Catalog/images/product/placeholder/image.jpg',
			'url': 'https://abbott-magento2.test/simple-product.html',
			'min_sale_qty': '2',
			'max_sale_qty': '10',
			'price': '20.0000',
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
			'product_type': 'READER',
			'image_url': 'https://abbott-magento2.test/static/version1563452614/graphql/_view/en_US/Magento_Catalog/images/product/placeholder/image.jpg',
			'url': 'https://abbott-magento2.test/simple-product.html',
			'min_sale_qty': '20',
			'max_sale_qty': '11',
			'price': '30.0000',
			'max_order_quantity': '30',
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
	authenticationModuleReducer:{
		loggedIn: true
	}
};

const GetProductsReducer = (state = initialState) => {
	return state;
};
const authenticationModuleReducer  = (state = initialState.authenticationModuleReducer) => {
	return state;
};
const getProductPricesReducer = (state = initialState) => {
	return state;
};
const GetCustomerReducer = (state = initialState) => {
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

const productModuleReducer = combineReducers({
	GetProductsReducer,
	getProductPricesReducer
});

const translationModuleReducer = combineReducers({
	translationReducer
});

const cartModuleReducer = combineReducers({
	GetCustomerCartReducer,
	GetCustomerCartIdReducer
});

const myAccountModuleReducer = combineReducers({
	GetCustomerReducer
});

const combinedReducers = combineReducers({
	form: formReducer,
	productModuleReducer,
	authenticationModuleReducer,
	myAccountModuleReducer,
	cartModuleReducer,
	translationModuleReducer
});

export const mockReaderReducer = (state, action) => {
	return combinedReducers(state, action);
};
