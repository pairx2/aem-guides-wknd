import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import IconButton from '../IconButton';
import Icons from '../../models/Icons';
import './Modal.scss';

const Modal = (props) => {
  const  {width, show, children, message, okTitle, cancelTitle, error, heading, loading, okDisabled, onOk, onCancel, onClose, hideCancel} = props;
  const [modalShow, setModalShow] = useState(show);
  const modalRef = useRef(null);

  useEffect(() => {
    setModalShow(show);
  }, [show])

  useEffect(() => {
      if(!modalRef.current) {
        return;
      }
      if (modalShow) {
        modalRef.current.classList.add('visible');
        const input = modalRef.current && modalRef.current.querySelector('input[type="text"]');
        if (input) {
          input.focus();
        }
      } else {
        modalRef.current.classList.remove('visible');
      }
    }, [modalShow]);

  const handleClose = (e) => {
    onClose && onClose();
  }

  const handleCancelClick = (e) => {
    onCancel && onCancel();
  }

  const handleOkClick = (e) => {
    onOk && onOk();
  }

  const renderModal = () => {
    return <div ref={modalRef} className='modal-bg'>
        <div className={`modal ${error? 'error':''}`} style={{width: `${width}`}}>
        <div className="modal__close-icon">
          <IconButton id="close" text="Close" icon={Icons.Close} large={true} noMargin={true} onClick={handleClose} />
        </div>
        <h2 className="modal__heading">{heading}</h2>
        <div className="modal__body">
        {children || message}
        </div>
        <div className="modal__footer">
          {!hideCancel && cancelTitle  && <Button label={cancelTitle} onClick={handleCancelClick} secondary={true} size="medium"  />}
          <Button disabled={okDisabled} loading={loading} label={okTitle} onClick={handleOkClick} size="medium" />
        </div>
      </div>
    </div>;
  }

  return (
    modalShow && renderModal()
  )
};

Modal.defaultProps = {
  show: false,
  heading: '',
  width: '480px',
  okTitle: 'Ok',
  loading: false,
  hideCancel: false
}

Modal.propTypes = {
  show: PropTypes.bool,
  heading: PropTypes.string,
  width: PropTypes.string,
  okTitle: PropTypes.string.isRequired,
  cancelTitle: PropTypes.string,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  onClose: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  message: PropTypes.string,
  okDisabled: PropTypes.bool,
  hideCancel: PropTypes.bool
}


export default Modal;
