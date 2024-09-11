import {all} from 'redux-saga/effects';
import addOrderAddressSaga from './add_new_address.saga';
import deleteOrderAddressSagas from './delete_order_address.saga';
import getCustomerSagas from './get_customer.saga';
import updateOrderAddressSagas from './update_order_address.saga';
import setOrderAddressSagas from './set_order_address.saga';
import getOrdersSagas from './get_orders.saga';
import updateCustomerSagas from './update_customer.saga';
import editPasswordSagas from './edit_password.saga';
import ordersSaga from './orders.saga';
import updateCustomerPermissionSagas from './update_customer_permissions.saga';
import getCustomerPermissionSagas from './get_customer_permissions.saga';
import getGhostOrdersSagas from './get_ghost_orders.saga';
import updateEmailSagas from './update_email.saga';
import getOrderReturnSagas from './order_return.saga';
import uploadCecFileSagas from './upload_cec_file.saga';
import OtpConfirmRequestSagas from './otp_confimation_request.saga';
import OtpResendRequestSagas from './otp_resend_request.saga';
import setMeasurmentUnitSagas from './set_measurment.saga';
import updatePaymentMethodSagas from './update_payment_method.saga';
import updateAddressAndPaymentMethodSagas from './update_address_and_payment.saga';
import updateOrderShippingAddressSagas from './update_order.saga';
import updateDeliveryDateSagas from './update_delivery_date.saga';
import downloadDocumentSagas from './download_document.saga';
import updateGhostOrdersSagas from './update_ghost_orders.saga';
import returnActionRequestSagas from "./refund_reship_widget.saga";

export default function* myAccountModuleSaga() {
	yield all([
		addOrderAddressSaga(),
		deleteOrderAddressSagas(),
		getCustomerSagas(),
		updateCustomerSagas(),
		updateOrderAddressSagas(),
		setOrderAddressSagas(),
		getOrdersSagas(),
		getGhostOrdersSagas(),
		editPasswordSagas(),
		ordersSaga(),
		updateGhostOrdersSagas(),
		updateAddressAndPaymentMethodSagas(),
		getCustomerPermissionSagas(),
		updateCustomerPermissionSagas(),
		updateEmailSagas(),
		getOrderReturnSagas(),
		uploadCecFileSagas(),
		OtpConfirmRequestSagas(),
		OtpResendRequestSagas(),
		setMeasurmentUnitSagas(),
		updatePaymentMethodSagas(),
		updateOrderShippingAddressSagas(),
		updateDeliveryDateSagas(),
		downloadDocumentSagas(),
		returnActionRequestSagas()
	]);
}