import {combineReducers} from 'redux';
import {GetAvailablePaymentMethodsReducer} from './get_available_payment_methods.reducer';
import {PaymentReducer} from './payment.reducer';

export const paymentModuleReducer = combineReducers({
	GetAvailablePaymentMethodsReducer,
	PaymentReducer
});