import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const LoadingIndicator = (props) => {
  const { isWhite } = props;
  const { t } = useTranslation();
  return (
    <div
      className={`a-spinner a-spinner--static ${
        isWhite ? 'a-spinner--white' : ''
      } m-2`}
    >
      <div className="spinner-border" role="status">
        <span className="sr-only">{t('loading')}</span>
      </div>
    </div>
  );
};

LoadingIndicator.defaultProps = {
  isWhite: false,
};

LoadingIndicator.propTypes = {
  isWhite: PropTypes.bool,
};

export default LoadingIndicator;
