import React, { useState } from 'react';
import PropTypes from 'prop-types';

function PromoCodeTag(props) {
  const { promoCode, deletePromoCode, disableDelete } = props;
  const [isDisabled, setIsDisabled] = useState();

  const onDeletePromoCode = () => {
    if (!isDisabled) {
      setIsDisabled(true);
      if (typeof deletePromoCode === 'function') {
        deletePromoCode();
      }
    }
  };

  return (
    <div
      className={`a-promo-code__tag ${
        isDisabled ? 'a-promo-code__tag--disabled' : ''
      }`}
    >
      <em className="abt-icon abt-icon-price-tag mr-2" />
      {promoCode}
      {!disableDelete ? (
        <em
          className="a-promo-code__tag-delete-icon abt-icon abt-icon-delete"
          onClick={onDeletePromoCode}
          aria-hidden
        />
      ) : null}
    </div>
  );
}

PromoCodeTag.defaultProps = {
  deletePromoCode: null,
};

PromoCodeTag.propTypes = {
  deletePromoCode: PropTypes.func,
  promoCode: PropTypes.string.isRequired,
};

export default PromoCodeTag;
