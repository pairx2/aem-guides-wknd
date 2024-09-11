import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {translationModuleReducer} from '../modules/Translation/redux/reducers';
import {formModuleReducer} from '../modules/Form/redux/reducers';
import {authenticationModuleReducer} from '../modules/Authentication/redux/reducers/authentication.reducer';
import {cartModuleReducer} from '../modules/Cart/redux/reducers';
import {productModuleReducer} from '../modules/Product/redux/reducers';
import {myAccountModuleReducer} from '../modules/MyAccount/redux/reducers';
import {modalModuleReducer} from '../modules/Modal/redux/reducers';
import {paymentIdReducer} from '../modules/Confirmation/redux/reducers';
import {addressModuleReducer} from '../modules/Address/redux/reducers';
import {resultsModuleReducer} from '../modules/Search/redux/reducers';
import {paymentModuleReducer} from '../modules/Payment/redux/reducers';
import {sickfundModuleReducer} from '../modules/SickFund/redux/reducers';
import {responsiveGridModuleReducer} from '../modules/Generic/components/ResponsiveGrid/redux/reducers';
import {newsletterReducer} from '../modules/NewsletterSignup/redux/reducers';
import {bluedoorModuleReducer} from '../modules/Authentication/redux/reducers/bluedoor.reducer';
import {plusServiceCancellationModuleReducer} from "../modules/PlusServiceCancellation/redux/reducers";
import { offlineToOnlineModuleReducer } from '../modules/OfflineToOnline/redux/reducers';

const RESET_STATE_ACTION = 'RESET_STATE';

const combinedReducers = combineReducers({
	translationModuleReducer,
	formModuleReducer,
	authenticationModuleReducer,
	cartModuleReducer,
	productModuleReducer,
	form: formReducer,
	myAccountModuleReducer,
	modalModuleReducer,
	paymentIdReducer,
	addressModuleReducer,
	resultsModuleReducer,
	paymentModuleReducer,
	sickfundModuleReducer,
	responsiveGridModuleReducer,
	newsletterReducer,
	bluedoorModuleReducer,
	plusServiceCancellationModuleReducer,
	offlineToOnlineModuleReducer
});


export const rootReducer = function (state, action) {
	if (action.type === RESET_STATE_ACTION) {
		state = undefined;
	}
	return combinedReducers(state, action);
};