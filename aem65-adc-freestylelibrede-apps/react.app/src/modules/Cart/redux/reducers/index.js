import {combineReducers} from 'redux';
import {GetCustomerCartReducer} from './cart.reducer';
import {GetCustomerCartIdReducer} from './cart_id.reducer';
import {shippingOptionsReducers} from '../../../Cart/redux/reducers/shipping_options.reducers';
import {GhostCartReducer} from './ghost_cart.reducer';
import {GetAvailablePaymentMethodsGraphqlReducer} from './get_available_payment_methods_graphql.reducer'

export const cartModuleReducer = combineReducers({
	GetCustomerCartReducer,
	GetCustomerCartIdReducer,
	shippingOptionsReducers,
	GhostCartReducer,
	GetAvailablePaymentMethodsGraphqlReducer
});