import React from "react";
import PropTypes from "prop-types";

export const FileSize = (props) => {
  const {
    size,
    decimals
  } = props;

  const formatBytes = (bytes, decimals) => {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
  }

  return formatBytes(size, decimals);
};

FileSize.defaultProps = {
  size: 0,
  decimals: 2
};

FileSize.propTypes = {
  size: PropTypes.number,
  decimals: PropTypes.number
};

export default FileSize;
