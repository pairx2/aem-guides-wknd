import {combineReducers} from 'redux';
import {PrePoulateFormReducer} from './pre_populate_form.reducer';
import {GetCustomerReducer} from './customer.reducer';
import {GetOrdersReducer} from './get_orders.reducer';
import {OrdersReducer} from './orders.reducer';
import {PasswordReducer} from './password.reducer';
import {GetCustomerPermissionReducer} from './permissions.reducer';
import {GetGhostOrdersReducer} from './get_ghost_orders.reducer';
import {EmailUpdateReducer} from './update_email.reducer';
import {OrderReturnReducer} from './order_return.reducer';
import {UploadCecFileReducer} from './upload_cec_file.reducer';
import {OtpConfirmRequestReducer} from './otp_confirm_request.reducer';
import {OrderUpdateReducer} from './update_order.reducer';
import {UpdatePaymentMethodReducer} from './update_payment_method.reducer';
import {DeliveryDateUpdateReducer} from './update_delivery_date.reducer';
import {RefundReshipWegetReducer} from "./refund_reship_widget.reducer";

export const myAccountModuleReducer = combineReducers({
	PrePoulateFormReducer,
	GetCustomerReducer,
	GetOrdersReducer,
	GetGhostOrdersReducer,
	OrdersReducer,
	PasswordReducer,
	GetCustomerPermissionReducer,
	EmailUpdateReducer,
	OrderReturnReducer,
	UploadCecFileReducer,
	OtpConfirmRequestReducer,
	OrderUpdateReducer,
	UpdatePaymentMethodReducer,
	DeliveryDateUpdateReducer,
	RefundReshipWegetReducer
});