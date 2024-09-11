import React from 'react';
import PropTypes from 'prop-types';

const Alert = (props) => {
  const {
    type,
    title,
    message,
    canCloseError,
    iconClass,
    linkUrl,
    linkText,
  } = props;

  let icon = iconClass;
  if (!icon) {
    switch (type) {
      case 'success':
        icon = 'tick';
        break;
      case 'warning':
        icon = 'alert-tringle';
        break;
      case 'danger':
        icon = 'alert-tringle';
        break;
      case 'info':
        icon = 'exclamation';
        break;
      default:
        icon = 'exclamation';
        break;
    }
  }

  return (
    <>
      <div
        className={`m-alert m-alert--${type} formalert`}
        data-alert-type="non-time-bound"
        data-js-component="alert"
      >
        <div className="m-alert">
          {canCloseError && (
            <div className="m-alert__close-icon" data-close-icon="close-alert">
              <i
                aria-hidden="true"
                data-dismiss="alert"
                className="abt-icon abt-icon-cancel close"
              />
            </div>
          )}
          <div className="m-alert__icon">
            <i aria-hidden="true" className={`abt-icon abt-icon-${icon}`} />
          </div>

          <div className="m-alert__content">
            {title && (
              <div className="m-alert__title">
                <h5>{title}</h5>
              </div>
            )}
            <div className="m-alert__para">{message}</div>

            {linkUrl && (
              <div className="m-alert__link">
                <div className="m-alert__linkText">
                  <a href={linkUrl}>{linkText}</a>
                </div>
                <div className="m-alert__arrow-icon">
                  <a
                    href={linkUrl}
                    aria-hidden="true"
                    data-dismiss="alert"
                    className="abt-icon abt-icon-right-arrow"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

Alert.defaultProps = {
  type: 'danger',
  title: null,
  canCloseError: false,
  iconClass: '',
  linkUrl: null,
  linkText: null,
};

Alert.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  canCloseError: PropTypes.bool,
  iconClass: PropTypes.string,
  linkUrl: PropTypes.string,
  linkText: PropTypes.string,
};

export default Alert;
