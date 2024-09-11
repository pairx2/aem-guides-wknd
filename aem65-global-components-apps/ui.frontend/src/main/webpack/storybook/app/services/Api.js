import { App as AppConstants } from "../constants/App";
import { isLocalhost } from "../utils/Common";
import { ApiErrorCode } from "./ApiErrorCodes";

let abortController;

const httpConfig = {
  baseURL: isLocalhost() ? AppConstants.LOCALHOST_API_URL : '',
  endpoints: {
    themeConfig: '/api/getConvertedJSON?themeId={0}',
    componentConfig: '/api/getConvertedJSON?themeId={0}&component={1}',
    import: '/api/importCssFile',
    exportSCSS:'/api/exportScssFiles?themeId={0}&outputName={1}',
    exportCSS: '/api/exportCssFile?themeId={0}&outputName={1}'
  }
}

/**
 * Returns full API URL for the endpoint and params
 * @param {String} endpoint
 * @param {Array} params
 * @returns String
 */
const getEndpointURL = (endpoint, params) => {
  params.map((param,idx)=>{
    endpoint = endpoint.replace(new RegExp(`\\{${idx}\\}`,'g'), param);
  })
  return `${httpConfig.baseURL}${endpoint}`;
}

/**
 * Returns API Error code by server msg
 * @param {String} serverMsg
 * @returns ApiErrorCode
 */
const getErrorCode = (serverMsg) => {

  if (!serverMsg || typeof serverMsg !== 'string') {
    return ApiErrorCode.GENERIC_ERROR;
  }

  serverMsg = serverMsg.toLowerCase();

  if (serverMsg.indexOf('failed to fetch') > -1) {
    return ApiErrorCode.NO_CONNECTION;
  }

  if (serverMsg.indexOf('invalid theme file') > -1) {
    return ApiErrorCode.INVALID_THEME_NAME;
  }

  if (serverMsg.indexOf('invalid component requested') > -1) {
    return ApiErrorCode.INVALID_COMPONENT_NAME;
  }

  if (serverMsg.indexOf('invalid file requested') > -1) {
    return ApiErrorCode.INVALID_COMPONENT_NAME;
  }

  if (serverMsg.indexOf('global variables') > -1) {
    return ApiErrorCode.GLOBAL_VARIABLES_NOT_FOUND;
  }

  if (serverMsg.indexOf('cannot import') > -1) {
    return ApiErrorCode.INVALID_FILE_FORMAT
  }

  if (serverMsg.indexOf('invalid file') > -1) {
    return ApiErrorCode.INVALID_FILE
  }

  if (serverMsg.indexOf('mandatory css') > -1) {
    return ApiErrorCode.MANDATORY_VARIABLES_NOT_FOUND
  }

  if (serverMsg.indexOf('error downloading') > -1) {
    return ApiErrorCode.UNABLE_TO_DOWNLOAD_FILE
  }

  if (serverMsg.indexOf('compilation failed') > -1) {
    return ApiErrorCode.INVALID_FILE;
  }


  return ApiErrorCode.GENERIC_ERROR;
}

/**
 * HTTP Get utility method with endpoint and params
 * @param {String} endpoint
 * @param {Array} params
 * @returns response
 */
const httpGet = async (endpoint, params) => {
  const url = getEndpointURL(endpoint, params);
  if (abortController) {
    abortController.abort();
  }
  abortController = new AbortController();
  const signal = abortController.signal;
  try {
    const response = await fetch(url, {signal});
    if (response.ok) {
      return response.json();
    } else {
      return {
        'success': false,
        'message': e.message,
        'code': ApiErrorCode.NO_CONNECTION
      }
    }
  } catch (e) {
    if (!(e instanceof DOMException)) {
      return {
        'success': false,
        'message': e.message,
        'code': ApiErrorCode.NO_CONNECTION
      }
    }
  }
}

/**
 * HTTP Post utility method with endpoint and params
 * @param {String} endpoint
 * @param {Array} params
 * @param {Object} body
 * @returns response
 */
 const httpPost = async (endpoint, params, body) => {
  const url = getEndpointURL(endpoint, params);
  if (abortController) {
    abortController.abort();
  }
  abortController = new AbortController();

  try {
    const response = await fetch(url,{
      method:'POST',
      body: body
    });
    if (response.ok) {
      return response.json();
    } else {
      return {
        'success': false,
        'message': e.message,
        'code': ApiErrorCode.NO_CONNECTION
      }
    }
  } catch (e) {
    return {
      'success': false,
      'message': e.message,
      'code': ApiErrorCode.NO_CONNECTION
    }
  }
}

/**
 * Fetches theme global config from server
 * @param {String} themeId
 * @returns Object
 */
const getThemeConfig = async (themeId) => {
  let response = await httpGet(httpConfig.endpoints.themeConfig, [themeId]);
  if (response.success === false) {
    response.code = getErrorCode(response.message);
  }
  return response;
}

/**
 * Fetches the component configuation from server
 * @param {String} themeId
 * @param {String} componentName
 * @returns Object
 */
const getComponentConfig = async (themeId, componentName) => {
  let response = await httpGet(httpConfig.endpoints.componentConfig, [themeId, componentName]);
  if (response.success === false) {
    response.code = getErrorCode(response.message)
  }
  return response;
}

/**
 * Import CSS File
 * @param {FormData} formData
 * @returns Object
 */
const importCSSFile = async (formData) => {
  let response = await httpPost(httpConfig.endpoints.import,[], formData)
  if (response.success === false) {
    response.code = getErrorCode(response.message)
  }
  return response;
}

/**
 * Exports AEM theme. This outputs a zip file which contains
 * scss files in AEM theme folder structure by theme name
 * @param {Object} themeData
 * @param {String} name
 * @param {String} type
 * @returns File
 */
const exportSCSSFile =  async (themeData, themeId, outputName) => {
  let response = await httpPost(
    httpConfig.endpoints.exportSCSS,
    [themeId, outputName],
    JSON.stringify(themeData)
  );

  if (response.success === false) {
    response.code = getErrorCode(response.message)
  }
  return response;
}

/**
 * Exports a CSS File
 * @param {Object} themeData
 * @param {String} type
 * @returns
 */
const exportCSSFile =  async (themeData, themeId, outputName) => {
  let response = await httpPost(
    httpConfig.endpoints.exportCSS,
    [themeId, outputName],
    JSON.stringify(themeData)
  );

  if (response.success === false) {
    response.code = getErrorCode(response.message)
  }
  return response;
}



export default {
  getThemeConfig,
  getComponentConfig,
  importCSSFile,
  exportSCSSFile,
  exportCSSFile
};
