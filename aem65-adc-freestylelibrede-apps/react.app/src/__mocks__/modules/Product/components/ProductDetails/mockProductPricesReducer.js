import {reducer as formReducer} from 'redux-form';
import {combineReducers} from 'redux';

const initialState = {

    productPrices: {
        'S5269856': {
            'id': 1,
            'sku': 'S5269856',
            'name': 'Simple Product',
            'uom': 90,
            'product_version': 1,
            'cs_available_for_purchase': false,
            'image_url': 'https://abbott-magento2.test/static/version1563452614/graphql/_view/en_US/Magento_Catalog/images/product/placeholder/image.jpg',
            'url': 'https://abbott-magento2.test/simple-product.html',
            'min_sale_qty': '2',
            'max_sale_qty': '10',
            'price': '20.0000',
            'max_order_quantity': '3'
        },
        "2-72114-01" : {
            "id": 24,
            "sku": "2-72114-01",
            "name": "PlusService FreeStyle Libre 3",
            "uom": null,
            "max_sale_qty": "7.0",
            "price": "461.30",
            "tax_value": "19",
            "min_sale_qty": "1",
            "is_subscription": true,
            "cs_delivery_frequency": null,
            "product_type": "",
            "product_version": "FSL3",
            "cs_product_type": 0,
            "first_delivery_date_after": "0.0",
            "bundle_options": [
                {
                    "id": 225,
                    "label": "Quarterly",
                    "position": 1,
                    "values": [
                        {
                            "quantity": 7,
                            "price": 461.3,
                            "id": 245,
                            "__typename": "AdcBundleItemOption"
                        }
                    ],
                    "__typename": "AdcBundleItem"
                }
            ],
            "__typename": "AdcProduct"
        },
        "72111-01" :  {
            "id": 58,
            "sku": "72111-01",
            "name": "FreeStyle Libre 3 Lesegerät, MG/DL",
            "uom": 99,
            "max_sale_qty": "1",
            "price": "65.90",
            "tax_value": "19",
            "min_sale_qty": "1",
            "is_subscription": false,
            "cs_delivery_frequency": null,
            "product_type": "READER",
            "product_version": "FSL3",
            "cs_product_type": 1,
            "first_delivery_date_after": null,
            "bundle_options": [],
            "__typename": "AdcProduct"
        }
    },
    GetCustomerCartReducer:{
        cartDetails: {
            'id': 'KDzhKR5Or16of6UqnOP29FqLn5YjPs9e',
            'shipping_address': {
                'country_id': 'DE'
            }
        },
        error: null,
        errorCodes: [4134]
    }
};

const GetProductsReducer = (state = initialState) => {
    return state;
};
const getProductPricesReducer = (state = initialState) => {
    return state;
};
const GetCustomerReducer = (state = initialState) => {
    return state;
};
const GetCustomerCartReducer = (state = initialState.GetCustomerCartReducer) => {
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
    myAccountModuleReducer,
    cartModuleReducer,
    translationModuleReducer
});


export const mockProductPricesReducer = (state, action) => {
    return combinedReducers(state, action);
};
