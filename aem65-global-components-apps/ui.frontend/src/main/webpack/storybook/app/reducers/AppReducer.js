import { getComponentVariant } from "../models/Stories";

export const AppActionTypes = {
  'SET_COMPONENT': 0,
  'SET_FULLSCREEN': 1,
  'SET_PREVIEW_MODE': 2,
  'SET_THEME_NAME':  3,
  'SET_IS_THEME_BUILDER': 4,
  'SET_IS_LOADING': 5

}


export const AppReducer = (state, action) => {
  switch(action.type) {
    case AppActionTypes.SET_COMPONENT:
      let component = null;
      if (action.payload) {
        component = action.payload.type !== 'custom' ? getComponentVariant(action.payload) : action.payload
      }
      return {
        ...state,
        component: component
      };
    case AppActionTypes.SET_FULLSCREEN:
      return {...state, isFullscreen: action.payload}
    case AppActionTypes.SET_PREVIEW_MODE:
      return {...state, isPreviewMode: action.payload}
    case AppActionTypes.SET_IS_THEME_BUILDER:
      return {...state, isThemeBuilder: action.payload}
    case AppActionTypes.SET_IS_LOADING:
      return {...state, isLoading: action.payload}
    default:
      return state;

  }
}
