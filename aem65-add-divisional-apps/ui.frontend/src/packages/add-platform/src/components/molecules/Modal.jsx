import React from 'react';
import PropTypes from 'prop-types';

export const Modal = (props) => {
  const { children, title, id, onModalDismissCallback, hideCloseIcon, onCloseCallback } = props;

  const onModalDismiss = (e) => {
    if (typeof onModalDismissCallback === 'function') {
      const target = e.target;
      if (
        target.classList.contains('generic-modal') ||
        target.classList.contains('abt-icon-cancel')
      ) {
        onModalDismissCallback();
      }
    }
  };


  const closeModal = (e) => {
    document.querySelector('.show-modal').classList.remove("show-modal")
    document.querySelector("body").style.overflow = "auto";
    if (onCloseCallback && typeof onCloseCallback == "function") {
      onCloseCallback();
    }
  }
   

  
  return (
    <div
      className="modal generic-modal"
      tabIndex="-1"
      role="dialog"
      id={id}
      data-js-component="pop-up"
      onClick={(e) => onModalDismiss(e)}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content generic-modal__content">
          <div
            className={`modal-header generic-modal__header ${
              hideCloseIcon && 'd-none'
            }`}
          >
            <span
              className="generic-modal--close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={(e) => closeModal(e)}

            >
              <i aria-hidden="true" className="abt-icon abt-icon-cancel"></i>
            </span>
          </div>

          <div className="modal-body generic-modal__content-body">
            {title && (
              <div className="generic-modal__text">
                <h3>{title}</h3>
              </div>
            )}

            <div>{children}</div>
          </div>
          <div className="modal-footer generic-modal__content-footer"></div>
        </div>
      </div>
    </div>
  );
};

Modal.defaultProps = {
  title: null,
  onModalDismissCallback: null,
  hideCloseIcon: null,
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  onModalDismissCallback: PropTypes.func,
  hideCloseIcon: PropTypes.bool,
  onCloseCallback: PropTypes.func
};

export default Modal;
