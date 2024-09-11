import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const ProductTileInclude = (props) => {
  const { t } = useTranslation();
  const { id } = props;
  const imagePath = t(`${id}_image`).replace(/ /g, "/");

  return (
    <>
      <div className="a-product-tile-details__image-container">
        <img
          className="a-product-tile-details__image"
          src={imagePath}
          alt={t(id)}
        />
      </div>
      <div className="a-product-tile-details__text">{t(id)}</div>
    </>
  );
};

ProductTileInclude.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ProductTileInclude;
