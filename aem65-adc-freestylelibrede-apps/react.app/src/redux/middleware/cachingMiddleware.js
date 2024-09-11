import {cacheReducerState, mapTypeToReducer} from '../../utils/cachingUtils';

export const cachingMiddleWare = store => next => action => {
	next(action);
	if (mapTypeToReducer[action.type]) {
		const state = mapTypeToReducer[action.type].split('.').reduce((p, c) => p && p[c] || null, store.getState());
		cacheReducerState(state, mapTypeToReducer[action.type]);
	}
};