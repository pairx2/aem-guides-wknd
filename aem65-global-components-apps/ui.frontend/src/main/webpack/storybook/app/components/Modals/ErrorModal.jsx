import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal'
import { ApiErrorCode, ApiErrorMessages } from '../../services/ApiErrorCodes';

const ErrorModal = (props) => {
  const {show, errorCode, onOk, onClose} = props;

  let message = ApiErrorMessages[errorCode] || ApiErrorMessages[ApiErrorCode.GENERIC_ERROR];

  message = `${message} (err: ${errorCode})`;

  const handleOkClick = () => {
    onOk && onOk();
  }

  const handleCloseClick = () => {
    onClose && onClose();
  }


  return (
    <Modal show={show}  error={true} okTitle='ok' heading='Error occured' message={message} onOk={handleOkClick} onClose={handleCloseClick}></Modal>
  )
}

ErrorModal.propTypes = {
  errorCode: PropTypes.string,
  show: PropTypes.bool,
  onOk: PropTypes.func,
  onClose: PropTypes.func
}


export default ErrorModal;
