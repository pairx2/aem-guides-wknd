import {
	ADD_MULTIPLE_PRODUCTS_REQUEST,
	ADD_PRODUCT_REQUEST,
	GET_CUSTOMER_CART_REQUEST,
	GET_CUSTOMER_CART_REQUEST_FAILURE,
	GET_CUSTOMER_CART_REQUEST_SUCCESS,
	HIDE_MINICART_POPUP,
	RESET_ERROR_ACTION,
	ADD_SUBSCRIPTION_REQUEST, SET_SAVED_PAYMENT_METHOD_ON_CART_REQUEST, ADD_COUPON_FAILURE, REMOVE_COUPON_FAILURE, SET_PAYMENT_METHOD_ON_CART_REQUEST_SUCCESS
} from '../actions/cart.action';
import {GET_CHECKOUT_ID_REQUEST} from '../../../Payment/redux/actions/get_checkout_id.action';


const initialState = {
	loading: false,
	isSubmitDisabled: false,
	cartDetails: {
		items: [],
	},
	error: null,
	storeSKU: null,
	cardError: {},
	warnings: [],
	showMiniCart: false,
	isCouponCodeSuccess: false,
	isCouponRemoved: false,
	checkoutIdDate: null,
	isCouponCodeError:false
};
export const GetCustomerCartReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_CUSTOMER_CART_REQUEST:
		case ADD_MULTIPLE_PRODUCTS_REQUEST:
		case ADD_SUBSCRIPTION_REQUEST:
			return {
				...state,
				loading: true
			};
		case ADD_PRODUCT_REQUEST:
			return {
				...state,
				loading: true,
				storeSKU: action?.payload?.sku
			};
		case GET_CUSTOMER_CART_REQUEST_SUCCESS:
			return {
				...state,
				loading: false,
				isSubmitDisabled: false,
				cartDetails: (
					action.payload.adcCartDetails ||
					action.payload.adcCartItemsUpdate ||
					action.payload.adcCartProductsAdd ||
					action.payload.adcApplyCouponToCart ||
					action.payload.adcRemoveCouponFromCart ||
					action.payload.adcSetShippingAddressOnCart ||
					action.payload.adcSetBillingAddressOnCart ||
					action.payload.adcSetShippingMethodOnCart
				).cart,
				showMiniCart: !!action.payload.adcCartProductsAdd,
				isCouponCodeSuccess: !!action.payload.adcApplyCouponToCart,
				isCouponRemoved: !!action.payload.adcRemoveCouponFromCart,
				error: null,
				warnings: (
					action.payload.adcCartDetails ||
					action.payload.adcCartItemsUpdate ||
					action.payload.adcCartProductsAdd ||
					action.payload.adcApplyCouponToCart ||
					action.payload.adcRemoveCouponFromCart ||
					action.payload.adcSetShippingAddressOnCart ||
					action.payload.adcSetBillingAddressOnCart ||
					action.payload.adcSetShippingMethodOnCart
				)?.warning_messages,
				errorCodes: null,
				cardError: {}
			};
		case SET_PAYMENT_METHOD_ON_CART_REQUEST_SUCCESS:
			return {
				...state,
				loading: false,
				isSubmitDisabled: false,
				cartDetails: {
					...state.cartDetails,
					selected_payment_method: action.payload.adcSetPaymentMethodOnCart.cart.selected_payment_method
				},
				error: null,
				errorCodes: null,
				warnings:action.payload.adcSetPaymentMethodOnCart.warning_messages,
				checkoutIdDate: action.payload.adcSetPaymentMethodOnCart ? new Date() : state.checkoutIdDate
			};
		case GET_CUSTOMER_CART_REQUEST_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error,
				errorCodes: action.payload.errorCodes,
				cardError: {
					...state.cardError,
					[state?.storeSKU]: action?.payload?.errorCodes
				},
				showErrorModal: true,
				checkoutIdDate: null,
			};
		case ADD_COUPON_FAILURE:
		case REMOVE_COUPON_FAILURE: 
			return {
				...state,
				loading: false,
				error: action.payload.error,
				isCouponCodeError: true
			};
		case HIDE_MINICART_POPUP:
			return {
				...state,
				showMiniCart: false
			};
		case RESET_ERROR_ACTION:
			return {
				...state,
				error: null
			};
		case SET_SAVED_PAYMENT_METHOD_ON_CART_REQUEST:
			return {
				...state,
				isSubmitDisabled: true
			};
		case GET_CHECKOUT_ID_REQUEST:
			return {
				...state,
				errorCodes: null
			};
		default:
			return state;
	}
};