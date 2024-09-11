export const ApiErrorCode = {
  NO_CONNECTION: 0,
  INVALID_THEME_NAME: 1,
  INVALID_COMPONENT_NAME: 2,
  GENERIC_ERROR: -1,
  GLOBAL_VARIABLES_NOT_FOUND: 3,
  INVALID_FILE_FORMAT: 4,
  MANDATORY_VARIABLES_NOT_FOUND: 5,
  UNABLE_TO_DOWNLOAD_FILE: 6,
  INVALID_FILE: 7
}

export const ApiErrorMessages = {
  [ApiErrorCode.NO_CONNECTION]: 'Unable to establish a connection with the server, server may be down',
  [ApiErrorCode.INVALID_THEME_NAME]: 'Theme request is unavailable, theme name might be incorrect',
  [ApiErrorCode.INVALID_COMPONENT_NAME]: 'Component config requested is unavailable, component name might be incorrect',
  [ApiErrorCode.GENERIC_ERROR]: 'Unknown issue occured, please try again after sometime',
  [ApiErrorCode.GLOBAL_VARIABLES_NOT_FOUND]: 'Theme variables not available for the selected theme',
  [ApiErrorCode.INVALID_FILE]: 'Invalid file uploaded for import, please upload a valid CSS file',
  [ApiErrorCode.INVALID_FILE_FORMAT]: 'Invalid file uploaded for import, please upload a valid CSS file',
  [ApiErrorCode.UNABLE_TO_DOWNLOAD_FILE]: 'Unable to download the file, please try again in sometime',
}
