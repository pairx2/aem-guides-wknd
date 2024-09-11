import { adobeAnalyticLayer } from '../data/adobeAnalyticsTracking';
import  adobeAnalyticsConst  from '../constants/adobeAnalyticsConst';
import {formatPriceAA,getCartProduct} from './common'

const sendEvents = (event, events) => {
    if (adobeAnalyticLayer() && events) {
        try {
            adobeAnalyticLayer().track(event, events);
        }
        catch {
            return false;
        }
    }
};

const getProductsInCart = (items) =>{
	let products = [];
	for(let i=0; i<items.length; i++){
	    products.push({
            id: items[i].product.sku ? items[i]?.product?.sku : '',
            name: items[i].product.name ? items[i]?.product?.name : '',
            category: items[i].product.attribute_set ? items[i]?.product?.attribute_set : '',
            variant: items[i].product.product_version ? items[i]?.product?.product_version : '',
            price: formatPriceAA(items[i]?.prices?.price?.value),
            quantity: items[i].quantity ? items[i]?.quantity : 0
	    });
	}
	return products;
};

const getPurchaseProducts = (items) =>{
	let productArr = [];
	for(let i=0; i<items.length; i++){

		let productdetails = getCartProduct(items[i]);

		productArr.push({
			id: productdetails.sku ? productdetails?.sku : '',
			name: productdetails.name ? productdetails?.name : '', 
			category: productdetails.attribute_set ? productdetails?.attribute_set : '',
			variant: productdetails.product_version ? productdetails?.product_version : '',			
			price: formatPriceAA(productdetails?.price),
			quantity: productdetails.qty_ordered ? productdetails?.qty_ordered : ''
		})
	}
	 return productArr;
}

const getCheckoutStepName = (checkoutStepNumber) => {
	let checkoutStepName = '';
	switch (checkoutStepNumber) {
        case 0:
            checkoutStepName = adobeAnalyticsConst.STEP_ZERO;
			break;
		case 1:
			checkoutStepName = adobeAnalyticsConst.STEP_SHIPPING;
			break;
		case 2:
			checkoutStepName = adobeAnalyticsConst.STEP_DELIVERY;
			break;
		case 3:
			checkoutStepName = adobeAnalyticsConst.STEP_PAYMENT;
			break;
	}
	return checkoutStepName;
}

export default (event, eventData = null) => {
    switch (event) {
        case adobeAnalyticsConst.VIEW_PRODUCT:
            sendEvents(
                event,
                {
                    cartId: eventData?.cartID,
					currency: eventData.vat_details.excluding_tax.currency ? eventData?.vat_details?.excluding_tax?.currency : '',
                    products: [
                        {
                            id: eventData.sku ? eventData?.sku : '',
                            name: eventData.name ? eventData?.name : '',
                            category: eventData.attribute_set ? eventData?.attribute_set : '',
                            variant: eventData.product_version ? eventData?.product_version : '',
							price: formatPriceAA(eventData?.vat_details?.excluding_tax?.value),
                        }
                    ]

                }
            );
            break;
        case adobeAnalyticsConst.ADD_TO_CART:
            sendEvents(
                event,
                {
                    cartId: eventData?.cartId,
                    currency: eventData?.prices?.price?.currency,
                    clickType: eventData.clickType ? eventData?.clickType : '',
                    products: [
                        {
                            id: eventData.product.sku ? eventData?.product?.sku : '',
                            name: eventData.product.name ? eventData?.product?.name : '',
                            category: eventData.product.attribute_set ? eventData?.product?.attribute_set : '',
                            variant: eventData.product.product_version ? eventData?.product?.product_version : '',
                            price: formatPriceAA(eventData?.prices?.price?.value),
                            quantity:  eventData.updatedQty ? eventData?.updatedQty : 0
                        }
                    ]

                }
            );
            break;
        case adobeAnalyticsConst.REMOVE_FROM_CART:
            sendEvents(
                event,
                {
                    cartId: eventData?.cartId,
                    currency: eventData?.prices?.price?.currency,
                    products: [
                        {
                            id: eventData.product.sku ? eventData?.product?.sku : '',
                            name: eventData.product.name ? eventData?.product?.name : '',
                            category: eventData.product.attribute_set ? eventData?.product?.attribute_set : '',
                            variant: eventData.product.product_version ? eventData?.product?.product_version : '',
                            price: formatPriceAA(eventData?.prices?.price?.value),
                            quantity: eventData.updatedQty ? eventData?.updatedQty : 0
                        }
                    ]
                }
            );
            break;
        case adobeAnalyticsConst.APPLY_COUPON:
            sendEvents(
                event,
                {
                    couponCode: eventData
                }
            );
            break;
        case adobeAnalyticsConst.PURCHASE:
            sendEvents(
                event,
                {
                    cartId: eventData?.cartID,
                    currency: eventData.base_currency_code ? eventData?.base_currency_code : '',
                    total: formatPriceAA(eventData?.grand_total),
                    transactionId: eventData.increment_id ? eventData?.increment_id : '',
                    shipping: formatPriceAA(eventData?.shipping_incl_tax),
                    tax: formatPriceAA(eventData?.tax_amount),
                    paymentMethod: eventData.payment.method ? eventData?.payment?.method : '',
                    couponCode: eventData.coupon_code ? eventData?.coupon_code : '',
                    discountAmount: formatPriceAA(eventData?.discount_amount),
                    products: getPurchaseProducts(eventData?.items),
                    loginStatus: eventData?.isLoggedIn ? adobeAnalyticsConst.LOGIN : adobeAnalyticsConst.LOGOUT ,
                }
            );
            break;
            case adobeAnalyticsConst.CHECKOUT:
                sendEvents(
                    event,
                    {
                        cartId: eventData?.id,
                        currency: eventData.prices.grand_total.currency ? eventData?.prices?.grand_total?.currency : '',
                        checkoutStepNumber: eventData?.checkoutStep,
                        checkoutStepName: getCheckoutStepName(eventData?.checkoutStep),
                        products: getProductsInCart(eventData?.items),
                        loginStatus: eventData?.isLoggedIn ? adobeAnalyticsConst.LOGIN  : adobeAnalyticsConst.LOGOUT ,                    
                    }
                );
                break;
        default:
            return false;
    }
};