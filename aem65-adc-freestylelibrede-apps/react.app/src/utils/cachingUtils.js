import {GET_PRODUCT_PRICE_REQUEST_SUCCESS} from '../modules/Product/redux/actions/get_product_price.action';
import {SET_DICTIONARY} from '../modules/Translation/redux/actions/translation.actions';
import {SET_FRAUD_DOMAIN} from '../modules/Form/redux/actions/form.actions';

export const TRANSLATION_REDUCER = 'translationModuleReducer.translationReducer';
export const PRODUCT_PRICES_REDUCER = 'productModuleReducer.getProductPricesReducer';
export const FORM_REDUCER = 'formModuleReducer.formReducer';

const STORAGE = {
	LOCAL: 'local',
	SESSION: 'session'
};

const cacheConfig = {
	lifetime: 0,
	storageType: STORAGE.SESSION
};

export const mapTypeToReducer = {
	[GET_PRODUCT_PRICE_REQUEST_SUCCESS]: PRODUCT_PRICES_REDUCER,
	[SET_DICTIONARY]: TRANSLATION_REDUCER,
	[SET_FRAUD_DOMAIN]: FORM_REDUCER
};

export const cacheAnonymousCartId = id => {
	const storage = localStorage; // changed for cart merge scenario in case of guest -> checkout -> login -> registartion flow
	try {
		storage.setItem('CART_ID', id);
	} catch {
		console.warn('couldn\'t store cart id');
	}
};

export const deleteAnonymousCartIdFromCache = () => {
	const storage = localStorage;
	try {
		storage.removeItem('CART_ID');
	} catch {
		console.warn('couldn\'t delete cart id');
	}
};

export const getAnonymousCartIdFromCache = () => {
	const storage = localStorage;
	try {
		return storage.getItem('CART_ID');
	} catch {
		console.warn('couldn\'t get cart id from cache');
		return undefined;
	}
};

export const cacheReducerState = (state, key) => {
	const storage = cacheConfig.storageType === STORAGE.LOCAL ? localStorage : sessionStorage;
	try {
		const cacheObject = {
			data: state,
			lifetime: cacheConfig.lifetime,
			storageTime: new Date().getTime()
		};
		storage.setItem(key, JSON.stringify(cacheObject));
	} catch {
		console.warn('state could not be stored');
	}
};

export const restoreReducerState = (key) => {
	const storage = cacheConfig.storageType === STORAGE.LOCAL ? localStorage : sessionStorage;
	try {
		const cacheObject = JSON.parse(storage.getItem(key));
		const storageTime = new Date(cacheObject.storageTime);
		const lifeTime = cacheObject.lifetime;
		if (lifeTime === 0 || new Date() < storageTime.setMinutes(storageTime.getMinutes() + lifeTime)) {
			return cacheObject.data;
		} else {
			storage.removeItem(key);
		}

	} catch {
		console.warn(`state for ${key} is not stored`);
	}
};

export const deleteReducerStateFromCache = (key) => {
	const storage = cacheConfig.storageType === STORAGE.LOCAL ? localStorage : sessionStorage;
	try {
		storage.removeItem(key);
	} catch {
		console.warn(`state for ${key} could not be deleted`);
	}
};