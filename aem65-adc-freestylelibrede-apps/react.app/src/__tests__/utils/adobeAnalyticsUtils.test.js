import '@testing-library/jest-dom/extend-expect';
import eventMapping, {loginFormStart, loginFormError, formStartSatellite, formSubmitSuccessSatellite, cancelPlusServiceFormSuccess, loginFormSuccess, cancelPlusServiceFormStart, cancelPlusServiceFormError, formSubmitErrorSatellite, OfflineToOnlineIdentificationFormStart, OfflineToOnlineIdentificationFormSuccess, OfflineToOnlineIdentificationFormError, OfflineToOnlineRegistrationFormStart, OfflineToOnlineRegistrationFormSuccess, OfflineToOnlineRegistrationFormError } from '../../utils/adobeAnalyticsUtils';
jest.mock('../../utils/endpointUrl');

describe('test eventMapping ', () => {
    jest.useFakeTimers();
    beforeEach(() => {
        window._satellite = {
            track: jest.fn()
        }
    });
	test('test eventMapping with empty input', async () => {
		const result = eventMapping;
		expect(result).toBeDefined();
	});
    beforeEach(() => {
        const cartDetails= {
            'id': 'KDzhKR5Or16of6UqnOP29FqLn5YjPs9e',
            'items': [{
                'id': 3,
                'name': 'Simple Product',
                'variant': 'Sensor',
                'category': 'FreeStyleLibre',
                'coupon': 'J477754930',
                'price': 65.5,
                'quantity': 3,
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
                'qty': 3,
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
            }, {
                'id': 4,
                'name': 'Simple Product',
                'variant': 'reader',
                'category': 'FreeStyleLibre',
                'coupon': '',
                'price': 479.5,
                'quantity': 2,
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
                'qty': 3,
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
                'code': 'checkmo',
                'title': 'Check / Money order'
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
                'discount': {
                    'value': 0,
                    'currency': 'EUR',
                    '__typename': 'Money'
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
        };
        const productPrices= {
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
        }
        localStorage.setItem("cartDetails", cartDetails)
        localStorage.setItem("productsList", productPrices)
	});
	test('test eventMapping with different inputs', async () => {
       
		const payload = {
			 'id':2821,
			 'item_price':{
				'value':59.9,
				'currency':'EUR',
			 },
			 'price':{
				'value':59.9,
				'currency':'EUR',
			 },
			 'product':[{
				'sku':'1-71988-01',
				'name':'Freestyle Libre 2 Sensor Subscription',
				'min_sale_qty':'1',
				'max_sale_qty':'10000',
				'uom':0,
				'product_version':'fsl2',
				'cs_product_type':'sensor'
			 },
            {
                'sku':'1-71989-02',
				'name':'Freestyle Libre 3 Sensor Subscription',
				'min_sale_qty':'1',
				'max_sale_qty':'4',
				'uom':0,
				'product_version':'fsl3',
				'cs_product_type':'sensor'
            }],
			 'qty':1
		};
		eventMapping('addToCart', payload);
		eventMapping('removeFromCart', payload);
		eventMapping('viewProduct', payload);
		eventMapping('checkoutStep1');
		eventMapping('transaction', payload);
        eventMapping('applyCoupon', payload)
        jest.runAllTimers();
	});

    test('test eventMapping with no Currency', async () => {
     
		const payload = {
			 'id':2821,
			 'item_price':{
				'value':59.9,
				'currency':'EUR',
			 },
			 'price':{
				'value':59.9
			 },
			 'product':[{
				'sku':'1-71988-01',
				'name':'Freestyle Libre 2 Sensor Subscription',
				'min_sale_qty':'1',
				'max_sale_qty':'10000',
				'uom':0,
				'product_version':'fsl2',
				'cs_product_type':'sensor'
			 },
            {
                'sku':'1-71989-02',
				'name':'Freestyle Libre 3 Sensor Subscription',
				'min_sale_qty':'1',
				'max_sale_qty':'4',
				'uom':0,
				'product_version':'fsl3',
				'cs_product_type':'sensor'
            }],
			 'qty':1
		};

		eventMapping('addToCart', payload);
		eventMapping('removeFromCart', payload);
		eventMapping('viewProduct', payload);
		eventMapping('checkoutStep1');
		eventMapping('checkoutStep2');
		eventMapping('transaction', payload);
        eventMapping('applyCoupon', payload);
        jest.runAllTimers();
	});

});

describe('test eventMapping Product Detail view', () => {
    jest.useFakeTimers();
    beforeEach(() => {
        window._satellite = undefined;
    });
	test('test eventMapping with empty input', async () => {
		const result = eventMapping;
		expect(result).toBeDefined();
	});
	test('test eventMapping with different inputs', async () => {
       
		const payload = {
			 'id':2821,
			 'item_price':{
				'value':59.9,
				'currency':'EUR',
			 },
			 'price':{
				'value':59.9,
				'currency':'EUR',
			 },
			 'product':[{
				'sku':'1-71988-01',
				'name':'Freestyle Libre 2 Sensor Subscription',
				'min_sale_qty':'1',
				'max_sale_qty':'10000',
				'uom':0,
				'product_version':'fsl2',
				'cs_product_type':'sensor'
			 },
            {
                'sku':'1-71989-02',
				'name':'Freestyle Libre 3 Sensor Subscription',
				'min_sale_qty':'1',
				'max_sale_qty':'4',
				'uom':0,
				'product_version':'fsl3',
				'cs_product_type':'sensor'
            }],
			 'qty':1
		};
		eventMapping('viewProduct', payload);
		jest.advanceTimersByTime(500);
        jest.advanceTimersByTime(1000);
	});

    test('test eventMapping with no Currency', async () => {
     
		const payload = {
			 'id':2821,
			 'item_price':{
				'value':59.9,
				'currency':'EUR',
			 },
			 'price':{
				'value':59.9
			 },
			 'product':[{
				'sku':'1-71988-01',
				'name':'Freestyle Libre 2 Sensor Subscription',
				'min_sale_qty':'1',
				'max_sale_qty':'10000',
				'uom':0,
				'product_version':'fsl2',
				'cs_product_type':'sensor'
			 },
            {
                'sku':'1-71989-02',
				'name':'Freestyle Libre 3 Sensor Subscription',
				'min_sale_qty':'1',
				'max_sale_qty':'4',
				'uom':0,
				'product_version':'fsl3',
				'cs_product_type':'sensor'
            }],
			 'qty':1
		};
            eventMapping('viewProduct', payload);
            jest.advanceTimersByTime(500);
            jest.advanceTimersByTime(1000);
	});

});

describe('test formStartSatellite method', () => {
   

    test('formStartSatellite', async () => {
		const result = formStartSatellite(true);
        expect(result).toBeUndefined();
	});
});

describe('test formSubmitSuccessSatellite method', () => {
    beforeEach(() => {
        window._satellite = {
            track: jest.fn()
        }
    });

	test('formSubmitSuccessSatellite', async () => {
		const result = formSubmitSuccessSatellite(true);
        expect(result).toBeUndefined();
	});
});

describe('test formStartSatellite method undefined', () => {
    beforeEach(() => {
        window._satellite = undefined
    });

    test('formStartSatellite undefined', async () => {
		const result = formStartSatellite(false);
        expect(result).toBeUndefined();
	});
});

describe('test formSubmitSuccessSatellite method undefined', () => {
    beforeEach(() => {
        window._satellite = undefined
    });

	test('formSubmitSuccessSatellite undefined', async () => {
		const result = formSubmitSuccessSatellite(false);
        expect(result).toBeUndefined();
	});
});


describe('test cancelPlusServiceFormSuccess method', () => {
    beforeEach(() => {
        window._satellite = {
            track: jest.fn()
        }
    });

	test('cancelPlusServiceFormSuccess', async () => {
		const result = cancelPlusServiceFormSuccess(true);
        expect(result).toBeUndefined();
	});
});

describe('test cancelPlusServiceFormSuccess method undefined', () => {
    beforeEach(() => {
        window._satellite = undefined
    });

    test('cancelPlusServiceFormSuccess undefined', async () => {
		const result = cancelPlusServiceFormSuccess(false);
        expect(result).toBeUndefined();
	});
});



describe('test loginFormSuccess method', () => {
    beforeEach(() => {
        window._satellite = {
            track: jest.fn()
        }
    });

	test('loginFormSuccess', async () => {
		const result = loginFormSuccess(true);
        expect(result).toBeUndefined();
	});
});

describe('test loginFormSuccess method undefined', () => {
    beforeEach(() => {
        window._satellite = undefined
    });

    test('loginFormSuccess undefined', async () => {
		const result = loginFormSuccess(false);
        expect(result).toBeUndefined();
	});
});

// loginform start
describe('test loginFormStart method undefined', () => {
    beforeEach(() => {
        window._satellite = undefined
    });

    test('loginFormSuccess undefined', async () => {
		const result = loginFormStart(false);
        expect(result).toBeUndefined();
	});
});

describe('test loginFormStart method', () => {
    beforeEach(() => {
        window._satellite = {
            track: jest.fn()
        }
    });

	test('loginFormSuccess', async () => {
		const result = loginFormStart(true);
        expect(result).toBeUndefined();
	});
});

// cancelPlusServiceForm Start
describe('test cancelPlusServiceFormStart  method undefined', () => {
    beforeEach(() => {
        window._satellite = undefined
    });

    test('cancelPlusServiceFormStart  undefined', async () => {
		const result = cancelPlusServiceFormStart(false);
        expect(result).toBeUndefined();
	});
});

describe('test cancelPlusServiceFormStart  method', () => {
    beforeEach(() => {
        window._satellite = {
            track: jest.fn()
        }
    });

	test('cancelPlusServiceFormStart ', async () => {
		const result = cancelPlusServiceFormStart(true);
        expect(result).toBeUndefined();
	});
});

// loginForm error 
describe('test loginForm error  method undefined', () => {
    beforeEach(() => {
        window._satellite = undefined
    });

    test('loginForm error  undefined', async () => {
		const result = loginFormError(false);
        expect(result).toBeUndefined();
	});
});

describe('test loginForm error  method', () => {
    beforeEach(() => {
        window._satellite = {
            track: jest.fn()
        }
    });

	test('loginForm error ', async () => {
		const result = loginFormError(true);
        expect(result).toBeUndefined();
	});
});

// cancelPlusService From Error
describe('test cancelPlusServiceForm error  method undefined', () => {
    beforeEach(() => {
        window._satellite = undefined
    });

    test('cancelPlusServiceForm error  undefined', async () => {
		const result = cancelPlusServiceFormError(false);
        expect(result).toBeUndefined();
	});
});

describe('test cancelPlusServiceForm error  method', () => {
    beforeEach(() => {
        window._satellite = {
            track: jest.fn()
        }
    });

	test('cancelPlusServiceForm error ', async () => {
		const result = cancelPlusServiceFormError(true);
        expect(result).toBeUndefined();
	});
});

// formSubmit Error
describe('test formSubmit error  method undefined', () => {
    beforeEach(() => {
        window._satellite = undefined
    });

    test('formSubmit error  undefined', async () => {
		const result = formSubmitErrorSatellite(false);
        expect(result).toBeUndefined();
	});
});

describe('test formSubmit error  method', () => {
    beforeEach(() => {
        window._satellite = {
            track: jest.fn()
        }
    });

	test('formSubmit error ', async () => {
		const result = formSubmitErrorSatellite(true);
        expect(result).toBeUndefined();
	});
});

describe('test eventMapping ', () => {
    test('test eventMapping when satellite is undefined', async () => {
       
		const payload = {
			 'id':2821,
			 'item_price':{
				'value':59.9,
				'currency':'EUR',
			 },
			 'price':{
				'value':59.9
			 },
			 'product':[{
				'sku':'1-71988-01',
				'name':'Freestyle Libre 2 Sensor Subscription',
				'min_sale_qty':'1',
				'max_sale_qty':'10000',
				'uom':0,
				'product_version':'fsl2',
				'cs_product_type':'sensor'
			 },
            {
                'sku':'1-71989-02',
				'name':'Freestyle Libre 3 Sensor Subscription',
				'min_sale_qty':'1',
				'max_sale_qty':'4',
				'uom':0,
				'product_version':'fsl3',
				'cs_product_type':'sensor'
            }],
			 'qty':1
		};
		eventMapping('addToCart', payload);
		eventMapping('removeFromCart', payload);
		eventMapping('viewProduct', payload);
		eventMapping('checkoutStep1');
		eventMapping('checkoutStep2');
		eventMapping('transaction', payload);
        eventMapping('applyCoupon', payload)
	});
    })

describe('test for map and couponsapplied', () => {
   
        const cartDetails = {
            'items': [
                {
                    'id': 3,  
                    'name': 'Simple Product',
                    'variant': 'Sensor',
                    'category': 'FreeStyleLibre',
                    'coupon': 'J477754930',
                    'price': 65.5,
                    'quantity': 3
                },
                {
                    'id': 3,
                    'name': 'Simple Product',
                    'variant': 'reader',
                    'category': 'FreeStyleLibre',
                    'coupon': '',
                    'price': 479.5,
                    'quantity': 2
                }
            ]
        }
    
 test('test for map', () => {
        eventMapping('checkoutStep1', cartDetails);
		eventMapping('checkoutStep2', cartDetails);
        eventMapping('applyCoupon', cartDetails);
        eventMapping('transaction', cartDetails);
        eventMapping('Trycatch&Defaultblocks', cartDetails);
})
});

// offlineToOnline testCoverage identification Form
describe('test OfflineToOnlineIdentificationFormStart method', () => {
    beforeEach(() => {
        window._satellite = {
            track: jest.fn()
        }
    });

    test('OfflineToOnlineIdentificationFormStart ', async () => {
		const result = OfflineToOnlineIdentificationFormStart(true);
        expect(result).toBeUndefined();
	});
});

describe('test OfflineToOnlineIdentificationFormError  method', () => {
    beforeEach(() => {
        window._satellite = {
            track: jest.fn()
        }
    });
    test('OfflineToOnlineIdentificationFormError error ', async () => {
		const result = OfflineToOnlineIdentificationFormError(true);
        expect(result).toBeUndefined();
	});
});

describe('test OfflineToOnlineIdentificationFormSuccess method undefined', () => {
    beforeEach(() => {
        window._satellite = undefined
    });

    test('OfflineToOnlineIdentificationFormSuccess undefined', async () => {
		const result = OfflineToOnlineIdentificationFormSuccess(false);
        expect(result).toBeUndefined();
	});
});

describe('test OfflineToOnlineIdentificationFormError  method', () => {
    beforeEach(() => {
        window._satellite = {
            track: jest.fn()
        }
    });
    test('OfflineToOnlineIdentificationFormError error ', async () => {
		const result = OfflineToOnlineIdentificationFormError(true);
        expect(result).toBeUndefined();
	});
});

// offlineToOnline testCoverage Registration Form
describe('test OfflineToOnlineRegistrationFormStart method', () => {
    beforeEach(() => {
        window._satellite = {
            track: jest.fn()
        }
    });

    test('OfflineToOnlineRegistrationFormStart ', async () => {
		const result = OfflineToOnlineRegistrationFormStart(true);
        expect(result).toBeUndefined();
	});
});

describe('test OfflineToOnlineRegistrationFormError  method', () => {
    beforeEach(() => {
        window._satellite = {
            track: jest.fn()
        }
    });
    test('OfflineToOnlineRegistrationFormError error ', async () => {
		const result = OfflineToOnlineRegistrationFormError(true);
        expect(result).toBeUndefined();
	});
});

describe('test OfflineToOnlineRegistrationFormSuccess method undefined', () => {
    beforeEach(() => {
        window._satellite = undefined
    });

    test('OfflineToOnlineRegistrationFormSuccess undefined', async () => {
		const result = OfflineToOnlineRegistrationFormSuccess(false);
        expect(result).toBeUndefined();
	});
});

describe('test OfflineToOnlineRegistrationFormError  method', () => {
    beforeEach(() => {
        window._satellite = {
            track: jest.fn()
        }
    });
    test('OfflineToOnlineRegistrationFormError error ', async () => {
		const result = OfflineToOnlineRegistrationFormError(true);
        expect(result).toBeUndefined();
	});
});
