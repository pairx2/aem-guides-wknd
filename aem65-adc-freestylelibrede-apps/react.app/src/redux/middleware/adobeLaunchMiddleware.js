import eventTrack from '../../utils/adobeAnalyticsUtils';
import { GET_CUSTOMER_CART_REQUEST_SUCCESS, DELETE_PRODUCT_REQUEST_SUCCESS, SET_PAYMENT_METHOD_ON_CART_REQUEST_SUCCESS } from '../../modules/Cart/redux/actions/cart.action';
import { GET_PRODUCT_PRICE_REQUEST_SUCCESS } from '../../modules/Product/redux/actions/get_product_price.action';
import { PLACE_ORDER_SUCCESS, PLACE_ORDER_FAILURE } from '../../modules/Confirmation/redux/actions/place_order.action';
import {GET_SHIPPING_OPTIONS_REQUEST_SUCCESS} from '../../modules/Cart/redux/actions/shipping_options_action'
import { isCheckoutPageType } from '../../utils/pageTypeUtils';
import { ADOBE_ANALYTICS_EVENTS } from '../../utils/enums';
import { GET_GHOST_CART_REQUEST_SUCCESS } from '../../modules/Cart/redux/actions/ghost_cart.action';
import { getServiceEndPoint } from '../../utils/endpointUrl';

export const adobeLaunchMiddleware = () => next => action => {
	next(action);
	try {
		const isAdobeAnalyticsNeeded = getServiceEndPoint('enable.adobe.analytics.tracking');
		if (isAdobeAnalyticsNeeded) {
			switch (action.type) {
				case GET_CUSTOMER_CART_REQUEST_SUCCESS: {
					action.payload.adcCartProductsAdd && localStorage.setItem('cartDetails', JSON.stringify(action.payload.adcCartProductsAdd.cart));
					action.payload.adcCartProductsAdd && eventTrack(ADOBE_ANALYTICS_EVENTS.ADD_TO_CART, action.payload.adcCartProductsAdd.cart.items[action.payload.adcCartProductsAdd.cart?.items?.length - 1]);
					action.payload.adcCartItemsUpdate  && localStorage.setItem('cartDetails', JSON.stringify(action.payload.adcCartItemsUpdate.cart))
					action.payload.adcCartItemsUpdate && localStorage.getItem('productAdded') && eventTrack(ADOBE_ANALYTICS_EVENTS.ADD_TO_CART, action.payload.adcCartItemsUpdate.cart.items[action.payload.adcCartItemsUpdate.cart?.items?.length - 1]);
					action.payload.adcCartItemsUpdate && localStorage.getItem('productDeleted') && eventTrack(ADOBE_ANALYTICS_EVENTS.REMOVE_FROM_CART, action.payload.adcCartItemsUpdate.cart.items[action.payload.adcCartItemsUpdate.cart?.items?.length - 1]);
					action.payload.adcApplyCouponToCart && localStorage.setItem('cartDetails', JSON.stringify(action.payload.adcApplyCouponToCart.cart));
					action.payload.adcApplyCouponToCart && eventTrack(ADOBE_ANALYTICS_EVENTS.APPLY_COUPON, JSON.parse(localStorage.getItem('cartDetails')))
					action.payload.adcRemoveCouponFromCart && localStorage.setItem('cartDetails', JSON.stringify(action.payload.adcRemoveCouponFromCart.cart));
					action.payload.adcSetShippingMethodOnCart && localStorage.setItem('cartDetails', JSON.stringify(action.payload.adcSetShippingMethodOnCart.cart));
					break;
				}
				case GET_GHOST_CART_REQUEST_SUCCESS: {
					action.payload.adcCartProductsAdd && localStorage.setItem('cartDetails', JSON.stringify(action.payload.adcCartProductsAdd.cart))
					action.payload.adcCartProductsAdd && eventTrack(ADOBE_ANALYTICS_EVENTS.ADD_TO_CART, action.payload.adcCartProductsAdd.cart.items[0]);
					action.payload.adcCartItemsUpdate  && localStorage.setItem('cartDetails', JSON.stringify(action.payload.adcCartItemsUpdate.cart))
					action.payload.adcCartItemsUpdate && localStorage.getItem('productAdded') && eventTrack(ADOBE_ANALYTICS_EVENTS.ADD_TO_CART, action.payload.adcCartItemsUpdate.cart.items[action.payload.adcCartItemsUpdate.cart?.items?.length - 1]);
					action.payload.adcCartItemsUpdate && localStorage.getItem('productDeleted') && eventTrack(ADOBE_ANALYTICS_EVENTS.REMOVE_FROM_CART, action.payload.adcCartItemsUpdate.cart.items[action.payload.adcCartItemsUpdate.cart?.items?.length - 1]);
					action.payload.adcApplyCouponToCart && localStorage.setItem('cartDetails', JSON.stringify(action.payload.adcApplyCouponToCart.cart));
					action.payload.adcApplyCouponToCart && eventTrack(ADOBE_ANALYTICS_EVENTS.APPLY_COUPON, JSON.parse(localStorage.getItem('cartDetails')));
					action.payload.adcRemoveCouponFromCart && localStorage.setItem('cartDetails', JSON.stringify(action.payload.adcRemoveCouponFromCart.cart));
					action.payload.adcSetShippingMethodOnCart && localStorage.setItem('cartDetails', JSON.stringify(action.payload.adcSetShippingMethodOnCart.cart));
					break;
				}
				case SET_PAYMENT_METHOD_ON_CART_REQUEST_SUCCESS: {
					isCheckoutPageType() && action.payload.adcSetPaymentMethodOnCart && eventTrack(ADOBE_ANALYTICS_EVENTS.CHECKOUT_STEP_TWO, JSON.parse(localStorage.getItem('cartDetails')));
					action.payload.adcSetPaymentMethodOnCart && localStorage.setItem('cartDetails', JSON.stringify(action.payload.adcSetPaymentMethodOnCart.cart));
					break;
				}
				case GET_PRODUCT_PRICE_REQUEST_SUCCESS: {
				localStorage.getItem('shouldPushViewProduct') && action.payload.adcProductDetails?.product && eventTrack(ADOBE_ANALYTICS_EVENTS.VIEW_PRODUCT, action.payload.adcProductDetails?.product)
					break;
				}
				case DELETE_PRODUCT_REQUEST_SUCCESS: {
					localStorage.getItem('deletedProductFromCart') && eventTrack(ADOBE_ANALYTICS_EVENTS.REMOVE_FROM_CART, JSON.parse(localStorage.getItem('deletedProductFromCart')));
					break;
				}
				case PLACE_ORDER_SUCCESS: {
					localStorage.setItem('orderTransactionId', JSON.stringify(action.payload?.adcPlaceOrder?.order?.order_id));
					(JSON.parse(localStorage.getItem('checkoutPageType')) === true) && eventTrack(ADOBE_ANALYTICS_EVENTS.TRANSACTION, JSON.parse(localStorage.getItem('cartDetails')));
					localStorage.getItem('orderType') && eventTrack(ADOBE_ANALYTICS_EVENTS.CHECKOUT_ORDER_TYPE, localStorage.getItem('orderType'));
					localStorage.removeItem('checkoutPageType');
					break;
				}
				case PLACE_ORDER_FAILURE: {
					localStorage.removeItem('cartDetails');
					localStorage.removeItem('checkoutPageType');
					break;
				}
				case GET_SHIPPING_OPTIONS_REQUEST_SUCCESS: {
					localStorage.setItem('checkoutPageType', isCheckoutPageType())
					action.payload.adcGetAvailableShippingMethods && eventTrack(ADOBE_ANALYTICS_EVENTS.CHECKOUT_STEP_ONE, JSON.parse(localStorage.getItem('cartDetails')));
					break;
				}
				
				default:
					break;
			}
		}

	} catch (e) {
		console.warn('Tried to fire a Adobe event, but failed. ', e);
	}
};

