import {
	GET_GHOST_CART_ID_REQUEST,
	GET_GHOST_CART_ID_REQUEST_FAILURE,
	GET_GHOST_CART_ID_REQUEST_SUCCESS,
	GET_GHOST_CART_REQUEST_SUCCESS,
	GET_GHOST_CART_REQUEST_FAILURE,
	SET_PAYMENT_METHOD_ON_GHOST_CART_REQUEST_SUCCESS
} from '../actions/ghost_cart.action';
import {GET_CHECKOUT_ID_REQUEST} from '../../../Payment/redux/actions/get_checkout_id.action';

const initialState = {
	loading: false,
	id: null,
	rxmcExists: null,
	warnings: [],
	cartDetails: {
		items: [],
	},
	isSubmitDisabled: false,
	checkoutIdDate: null,
};
export const GhostCartReducer = (state = initialState, action) => {

	switch (action.type) {
		case GET_GHOST_CART_ID_REQUEST:
			return {
				...state,
				loading: true,
				rxmcExists:null
			};
		case GET_GHOST_CART_ID_REQUEST_SUCCESS:
			return {
				...state,
				loading: false,
				rxmcExists:null,
				id: action.payload.adcGetOrCreateCartId
			};
		case GET_GHOST_CART_ID_REQUEST_FAILURE:
			return {
				...state,
				loading: false,
				rxmcExists: action.error?.[0].code,
				errorCodes: action.error?.errorCodes,
				checkoutIdDate: null
			};
		case GET_GHOST_CART_REQUEST_SUCCESS:
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
				isCouponCodeSuccess: !!action.payload.adcApplyCouponToCart,
				isCouponRemoved: !!action.payload.adcRemoveCouponFromCart,
				error: null,
				warnings: action.payload.adcCartDetails?.warning_messages,
				errorCodes: null
			};

		case SET_PAYMENT_METHOD_ON_GHOST_CART_REQUEST_SUCCESS:
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
		case GET_GHOST_CART_REQUEST_FAILURE:
			return {
				...state,
				loading: false,
				error: action.error.error,
				errorCodes: action.error.errorCodes,
				checkoutIdDate: null,
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