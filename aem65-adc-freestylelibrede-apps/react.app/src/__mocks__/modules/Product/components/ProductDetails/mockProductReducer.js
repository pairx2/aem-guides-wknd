import {combineReducers} from 'redux';
import {reducer as formReducer} from "redux-form";

const initialState = {

    productPrices: {
        'S5269856': {
            'id': 1,
            'sku': 'S5269856',
            'name': 'Simple Product',
            'description': 'Some product description',
            'uom': 1,
            'product_version': 1,
            'product_type': 'SENSOR',
            'cs_available_for_purchase': false,
            'first_delivery_date_after': '3.0',
            'image_url': 'https://abbott-magento2.test/static/version1563452614/graphql/_view/en_US/Magento_Catalog/images/product/placeholder/image.jpg',
            'url': 'https://abbott-magento2.test/simple-product.html',
            'min_sale_qty': '2',
            'max_sale_qty': '10',
            'price': '20.0000',
            'max_order_quantity': '3'
        },
        '1-71538-01': {
            'id': 2,
            'sku': '1-71538-01',
            'name': 'Simple Product2',
            'description': 'Some product description2',
            'uom': 99,
            'product_version': 2,
            'product_type': 'SENSOR',
            'type_id': 'simple2',
            'cs_available_for_purchase': false,
            'image_url': 'https://abbott-magento2.test/static/version1563452614/graphql/_view/en_US/Magento_Catalog/images/product/placeholder/image.jpg',
            'url': 'https://abbott-magento2.test/simple-product.html',
            'min_sale_qty': '20',
            'max_sale_qty': '11',
            'price': '30.0000',
            'is_subscription': false,
            'first_delivery_date_after': '3.0',
            'bundle_options': [{
                'id': 1,
                'quantity': 2,
                'position': 'position',
                'label': 'label',
                'values': [{quantity: 2, price: 22}]
            },{
                'id': 2,
                'quantity': 2,
                'position': 'position',
                'label': 'label',
                'values': [{quantity: 2, price: 22}]
            }],
        }
    },
    GetCustomerReducer:{},
    GetCustomerCartReducer:{
        cartDetails: {
            'id': 'KDzhKR5Or16of6UqnOP29FqLn5YjPs9e'
        },
        error: null,
        errorCodes: [4134]
    },
    authenticationModuleReducer:{
        loggedIn: true
    },
    GetCustomerCartIdReducer:{
        loading: false,
        cartId: 'KDzhKR5Or16of6UqnOP29FqLn5YjPs9e',
        error: null
    }
};

const GetProductsReducer = (state = initialState) => {
    return state;
};
const getProductPricesReducer = (state = initialState) => {
    return state;
};
const authenticationModuleReducer  = (state = initialState.authenticationModuleReducer) => {
    return state;
};
const GetCustomerReducer = (state = initialState.GetCustomerReducer) => {
    return state;
};

const GetCustomerCartReducer = (state = initialState.GetCustomerCartReducer) => {
    return state;
};

const GetCustomerCartIdReducer = (state = initialState.GetCustomerCartIdReducer) => {
    return state;
};

const translationReducer = (state = initialState) => {
    return state;
};

const translationModuleReducer = combineReducers({
    translationReducer
});

const productModuleReducer = combineReducers({
    GetProductsReducer,
    getProductPricesReducer
});

const myAccountModuleReducer = combineReducers({
    GetCustomerReducer
});

const cartModuleReducer = combineReducers({
    GetCustomerCartReducer,
    GetCustomerCartIdReducer
});

const combinedReducers = combineReducers({
    form: formReducer,
    productModuleReducer,
    authenticationModuleReducer,
    myAccountModuleReducer,
    cartModuleReducer,
    translationModuleReducer
});

export const mockProductReducer = (state, action) => {
    return combinedReducers(state, action);
};
