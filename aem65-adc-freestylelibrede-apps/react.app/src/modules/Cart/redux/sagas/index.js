import {all} from 'redux-saga/effects';
import getCustomerCartSagas from './cart.saga';
import addProductSagas from './add_product.saga';
import deleteProductSagas from './delete_product.saga';
import updateProductSagas from './update_product.saga';
import getCustomerCartIdSagas from './cart_id.saga';
import addCouponCodeToCartSagas from './add_coupon_to_cart.saga';
import removeCartFromCartSagas from './remove_coupon_from_cart.saga';
import setAddressOnCartSagas from './set_address_on_cart.saga';
import setPaymentMethodOnCartSagas from './set_payment_method_on_cart.saga';
import mergeCartSagas from './merge_cart.saga';
import getShippingOptionsSaga from './get_shipping_options.saga';
import updateShippingOptionsSagas from './update_shipping_options.saga';
import getGhostCartSagas from './ghost_cart.saga';
import getAvailablePaymentMethodsGraphqlSagas from './get_available_payment_methods_graphql.saga';
export default function* cartModuleSaga() {
	yield all([
		getCustomerCartSagas(),
		addProductSagas(),
		deleteProductSagas(),
		updateProductSagas(),
		getCustomerCartIdSagas(),
		addCouponCodeToCartSagas(),
		removeCartFromCartSagas(),
		setAddressOnCartSagas(),
		setPaymentMethodOnCartSagas(),
		mergeCartSagas(),
		getShippingOptionsSaga(),
		updateShippingOptionsSagas(),
		getGhostCartSagas(),
		getAvailablePaymentMethodsGraphqlSagas()
	]);
}