import React, { useContext, useState, useEffect } from 'react';
import { CommerceContext } from '../../context/CommerceContext';
import ESL_EPT from '../../data/eslEndpoints';
import { fetchGPQESLservice } from '../../services/eslService';
import { productImageQuery } from '../../data/graphqlQueries';
import { AuthContext } from '../../context/AuthContext';
import { isLoggedIn } from '../../utils/common';

const OrderDetailsItemList = ({ ...props }) => {
  const [commerceContext, setCommerceContext] = useContext(CommerceContext);
  const [authContext, setAuthContext] = useContext(AuthContext);
  const userIsLoggedIn = isLoggedIn(authContext);
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState({});
  const orderSkus = commerceContext.profile?.items?.orderDetail?.items.map(
    (item) => item.product_sku
  );

  useEffect(async () => {
    if (!orderSkus) {
      return;
    }

    try {
      const productImages = await fetchGPQESLservice(
        ESL_EPT.products,
        productImageQuery(orderSkus),
        userIsLoggedIn
      );

      // Create mapping of SKUs to images:
      const imagesData = productImages?.data?.response?.data?.products?.items?.reduce(
        (acc, item) => {
          return {
            ...acc,
            [item.sku]: {
              src: item.image?.url,
              label: item.image?.label,
            },
          };
        },
        {}
      );

      setImages(imagesData);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [commerceContext?.profile?.items]);

  const displayArr = commerceContext.profile?.items?.orderDetail?.items?.map(
    (element, index) => {
      return (
        <li key={index} className="m-orderdetailsitemlist__item">
          {!isLoading && images && (
            <img
              src={images[element?.product_sku]?.src}
              alt={images[element?.product_sku]?.label || element?.product_name}
              className="m-orderdetailsitemlist__image"
              width="80"
              height="80"
            />
          )}
          <div className="m-orderdetailsitemlist__item-info">
            <h6 className="m-orderdetailsitemlist__item-title">
              {element?.product_name}
            </h6>
            <div className="m-orderdetailsitemlist__item-number">
              {element?.quantity_ordered}
            </div>
          </div>
        </li>
      );
    }
  );
  return (
    <div className="m-orderdetailsitemlist__container">
      <ul className="m-orderdetailsitemlist__list">{displayArr}</ul>
    </div>
  );
};

OrderDetailsItemList.PropTypes = {};

export default OrderDetailsItemList;
