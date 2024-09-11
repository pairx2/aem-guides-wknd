import React from 'react';
import PropTypes from 'prop-types';

const Modal = (props) => {
  const { children, title, id, onModalDismissCallback, hideCloseIcon } = props;

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

  return (
    <div
      class="modal generic-modal"
      tabindex="-1"
      role="dialog"
      id={id}
      data-js-component="pop-up"
      onClick={(e) => onModalDismiss(e)}
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content generic-modal__content">
          <div
            class={`modal-header generic-modal__header ${
              hideCloseIcon && 'd-none'
            }`}
          >
            <span
              class="generic-modal--close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <i aria-hidden="true" class="abt-icon abt-icon-cancel"></i>
            </span>
          </div>

          <div class="modal-body generic-modal__content-body">
            {title && (
              <div class="generic-modal__text">
                <h3>{title}</h3>
              </div>
            )}

            <div>{children}</div>
          </div>
          <div class="modal-footer generic-modal__content-footer"></div>
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
};

export default Modal;
