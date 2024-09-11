import React, {createContext, useReducer} from 'react';
import QueryParams from '../models/QueryParams';
import { AppActionTypes, AppReducer } from '../reducers/AppReducer';


const initialState = {
  component: null,
  isFullscreen: false,
  isPreview: QueryParams.hasPreview(),
  isThemeBuilder: false,
  isLoading: false
}

export const AppContext = createContext(initialState);

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const setSelectedComponent = (component) => {
    dispatch({
      type: AppActionTypes.SET_COMPONENT,
      payload: component
    });
  }

  const setFullscreen = (isFullscreen) => {
    dispatch({
      type: AppActionTypes.SET_FULLSCREEN,
      payload: isFullscreen
    });
  }

  const setPreviewMode = (isPreviewMode) => {
    dispatch({
      type: AppActionTypes.SET_PREVIEW_MODE,
      payload: isPreviewMode
    });
  }

  const setIsThemeBuilder = (isThemeBuilder) => {
    dispatch({
      type: AppActionTypes.SET_IS_THEME_BUILDER,
      payload: isThemeBuilder
    });
  }

  const setIsLoading = (isLoading) => {
    dispatch({
      type: AppActionTypes.SET_IS_LOADING,
      payload: isLoading
    });
  }

  return (
    <AppContext.Provider value={{
      appState: state,
      setSelectedComponent,
      setFullscreen,
      setIsLoading,
      setIsThemeBuilder,
      setPreviewMode
    }}>
      {children}
    </AppContext.Provider>
  )

}

