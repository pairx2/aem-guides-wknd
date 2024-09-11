export const PreviewActionTypes = {
  'UPDATE_PREVIEW': 0,
  'SET_THEME':1,
  'SET_VIEW': 2,
  'SET_RTL': 4,
  'FORCE_UPDATE': 5,
  'IFRAME_LOADED': 6
}

export const PreviewReducer = (state, action) => {
  switch(action.type) {
    case PreviewActionTypes.UPDATE_PREVIEW:
      return {...state, knobsets: [...action.payload]};
    case PreviewActionTypes.SET_THEME:
      return {...state, theme: {...action.payload}};
    case PreviewActionTypes.SET_VIEW:
      return {...state, view: {...action.payload}};
    case PreviewActionTypes.SET_RTL:
      return {...state, isRTL: action.payload};
    case PreviewActionTypes.FORCE_UPDATE:
      return {...state, date: action.payload};
    case PreviewActionTypes.IFRAME_LOADED:
      return {...state, iframeLoaded: action.payload};
  }

}
