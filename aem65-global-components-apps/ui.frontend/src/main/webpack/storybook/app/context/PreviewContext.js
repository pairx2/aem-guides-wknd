import React, {createContext, useReducer} from 'react';
import { PreviewActionTypes, PreviewReducer } from '../reducers/PreviewReducer';
import ThemeGlobals from '../models/ThemeGlobals';
import ThemeVariables from '../models/ThemeVariables';
import fonts from '../models/Fonts';
import {View} from '../constants/View';

const defaultThemeName = localStorage.getItem('theme') || 'theme1';

const getThemeObject = (themeName) => {
  return {
    name: themeName,
    src: `/clientlib-${themeName}/${themeName}.css`
  }
}

const initialState = {
  knobsets: [],
  theme: getThemeObject(defaultThemeName),
  view: {
    type: View.DESKTOP,
    isLandscape: false
  },
  isRTL: false,
  newTheme: ThemeGlobals,
  themeVariables: ThemeVariables,
  iframeLoaded: false,
  fonts: fonts,
  date: new Date()
}

export const PreviewContext = createContext(initialState);
export const PreviewContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PreviewReducer, initialState);

  const updatePreview = (knobsets) => {
    dispatch({
      type: PreviewActionTypes.UPDATE_PREVIEW,
      payload: knobsets
    });
  }

  const setTheme = (themeName) => {
    dispatch({
      type: PreviewActionTypes.SET_THEME,
      payload: getThemeObject(themeName)
    });
    localStorage.setItem('theme', themeName);
  }

  const setView = (viewObject) => {
    dispatch({
      type: PreviewActionTypes.SET_VIEW,
      payload: viewObject
    });
  }

  const setRTL = (isRTL) => {
    dispatch({
      type: PreviewActionTypes.SET_RTL,
      payload: isRTL
    });
  }

  const forceUpdate = () => {
    dispatch({
      type: PreviewActionTypes.FORCE_UPDATE,
      payload: new Date()
    });
  }

  const clearSession = () => {
    state.newTheme.clear();
    state.themeVariables.clear();
    forceUpdate();
  }

  const setIframeLoaded = (iframeLoaded) => {
    dispatch({
      type: PreviewActionTypes.IFRAME_LOADED,
      payload: iframeLoaded
    });
  }


  return (
    <PreviewContext.Provider value={{
      previewState: state,
      updatePreview,
      setTheme,
      setView,
      setRTL,
      forceUpdate,
      clearSession,
      setIframeLoaded
    }}>
      {children}
    </PreviewContext.Provider>
  )

}

