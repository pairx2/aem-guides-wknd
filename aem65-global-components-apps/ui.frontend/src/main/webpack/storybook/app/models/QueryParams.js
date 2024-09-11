import { App } from "../constants/App";

const getSelectPageParams =  () => {
  let hash = window.location.hash.replace('#', '');

  if (!hash) {
    const path = window.location.pathname.toLowerCase();
    if (path.indexOf(App.THEME_BUILDER.PATH) > -1) {
      window.location.hash = App.THEME_BUILDER.HASH
    } else if(path === App.STORYBOOK.PATH) {
      window.location.hash = App.STORYBOOK.HASH
    }
    hash = window.location.hash.replace('#', '');
  }

  const searchParams = new URLSearchParams(hash);
  const navProps = {
    branchId: searchParams.get('b'),
    componentId: searchParams.get('c'),
    variantId: searchParams.get('v'),
    key: `${searchParams.get('b')}-${searchParams.get('c')}-${searchParams.get('v')||''}`
  }
  return navProps;
}

const hasPreview = () => {
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    const searchParams = new URLSearchParams(hash);
    return searchParams.has('preview');
  }
  return false;
}

const setQueryparams = (newHash) => {
  if (hasPreview()){
    newHash+="&preview=true"
  }
  window.location.hash = newHash
}

const getPreviewURL = () => {
  return window.location.href + '&preview=true'
}

const getDefaultHash = (page) => {
  return defaultHash[page]
}

const getPagePathWithHash = (obj) => {
  return obj.PATH + obj.HASH
}

export default {
  hasPreview,
  getSelectPageParams,
  setQueryparams,
  getPreviewURL,
  getDefaultHash,
  getPagePathWithHash
}
