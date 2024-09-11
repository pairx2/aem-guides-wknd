import React, { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import getSymbolFromCurrency from 'currency-symbol-map';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { productPriceQuery, productSubscriptionsQuery } from '../../data/graphqlQueries';
import { fetchGPQESLservice } from '../../services/eslService';
import ESL_EPT from '../../data/eslEndpoints';
import productPriceConst from '../../constants/productPriceConst';
import LoadingIndicator from '../common/LoadingIndicator';
import { CommerceContext } from '../../context/CommerceContext';
import { fetchSinglePurchaseProduct, isLoggedIn, parsePriceString } from '../../utils/common';
import { AuthContext } from '../../context/AuthContext';
import adobeAnalyticsConst from '../../constants/adobeAnalyticsConst';
import eventTrack  from '../../utils/adobeAnalytics';

const ProductPrice = (props) => {
  const { priceToShow, sku, freeDelivery, aaTrackingViewproduct, productBadge, subscriptionOptions, enableLoyaltyPoints } = props;
  const [commerceContext, setCommerceContext] = useContext(CommerceContext);
  const [authContext, setAuthContext] = useContext(AuthContext);
  const userIsLoggedIn = isLoggedIn(authContext);
  const showFreeDeliveryLabel = freeDelivery === 'true';
  const showLoyaltyPointsLabel = enableLoyaltyPoints === 'true';

  const { isLoading, isError, data, error } = useQuery(
    [`productPrice-${sku}`, ESL_EPT.products, productPriceQuery, productSubscriptionsQuery],
    () => 
      fetchGPQESLservice(
        ESL_EPT.products,
        subscriptionOptions?.toLowerCase() === 'singlepurchase' ? productPriceQuery(sku) : productSubscriptionsQuery(sku), 
        userIsLoggedIn
      )
  );
  const { t } = useTranslation();

  useEffect(() => {
    const productItem = fetchSinglePurchaseProduct(subscriptionOptions, data?.data?.response?.data?.products?.items);

    if (productItem) {
      const itemInArray = commerceContext?.productQuantities?.find(
        (item) => item?.sku === productItem?.sku
      );
      if (!itemInArray) {
        let productQuantities = [];
        if (commerceContext?.productQuantities) {
          productQuantities = [...commerceContext?.productQuantities];
        }
        productQuantities.push(productItem);
        setCommerceContext({
          ...commerceContext,
          productQuantities,
        });
      }
      productItem.cartID = commerceContext?.cart?.id
      if (!productItem.cartID) productItem.cartID ="";
      if (!productItem.name) productItem.name = productBadge;

      if (productItem && aaTrackingViewproduct === 'true') {
        eventTrack(adobeAnalyticsConst.VIEW_PRODUCT, productItem)
      }
    }
  }, [data]);

  const renderPrices = () => {
    const showVat = priceToShow === productPriceConst.VAT_PRICE;
    const showAll = priceToShow === productPriceConst.ALL_PRICES;
    const productItem = fetchSinglePurchaseProduct(subscriptionOptions, data?.data?.response?.data?.products?.items);
    const vatPrice = productItem?.vat_details?.including_tax;
    const excludingVatPrice = productItem?.vat_details?.excluding_tax;
    const priceRange = productItem?.price_range?.minimum_price;
    const hasDiscount = priceRange?.discount?.amount_off > 0;
    const basePrice = priceRange?.regular_price;
    const finalPrice = showVat ? vatPrice : excludingVatPrice;
    const otherPrice = showVat ? excludingVatPrice : vatPrice; // Used for 'showAll' pricing
    const isSubscription = productItem?.is_subscription;
    const deliveryFrequencyLabel = productItem?.delivery_frequency_label;
    const loyaltyPoints = productItem?.loyalty_points?.value;

    return (
      <>
        {hasDiscount && basePrice ? (
          <div className="a-product-price__discount-price">
            <span className="a-product-price__currency">
              {getSymbolFromCurrency(basePrice?.currency)}
            </span>
            {parsePriceString(basePrice?.value)}
          </div>
        ) : null}
        {finalPrice ? (
          
          <div className="a-product-price__normal-price">
            <span className="a-product-price__currency">
              {getSymbolFromCurrency(finalPrice?.currency)}
            </span>
            {parsePriceString(finalPrice?.value)}
            <div class="a-product-price__labels">
              <span className="a-product-price__vat-label">
                {showVat ? t('product-inc-vat') : t('product-exc-vat')}
              </span>
              {showFreeDeliveryLabel ? (
                <>
                  {' '}
                  <span className="a-product-price__shipping-label">
                    {t('free-delivery')}
                  </span>
                </>
              ) : null}
            </div>
          </div>
        ) : null}
        {showAll && otherPrice ? (
          <div className="a-product-price__normal-price">
            <span className="a-product-price__currency">
              {getSymbolFromCurrency(otherPrice?.currency)}
            </span>
            {parsePriceString(otherPrice.value)}
            <div class="a-product-price__labels">
              <span className="a-product-price__vat-label">
                {t('product-inc-vat')}
              </span>
              {showFreeDeliveryLabel ? (
                <>
                  {' '}
                  <span className="a-product-price__shipping-label">
                    {t('free-delivery')}
                  </span>
                </>
              ) : null}
            </div>
          </div>
        ) : null}
        {/* Loyalty points code - to render when checkbox in dialog is checked and when user in logged in */}
        {(showLoyaltyPointsLabel && userIsLoggedIn && loyaltyPoints) ? (
          <div className='a-product-price__loyalty-points'>
            <span className='a-product-price__loyalty-points--label'>{t('product-loyalty-points-pre')}</span>
            <span className='a-product-price__loyalty-points--value'>{loyaltyPoints + ' ' + t('product-loyalty-points-post')}</span>
          </div>
        ) : null}
        {isSubscription && deliveryFrequencyLabel ? (
          <h4 className="a-product-price__subscription-label">
            {deliveryFrequencyLabel}
          </h4>
        ) : null}
      </>
    );
  };

  const prices = () => {
    if (isLoading) {
      return <LoadingIndicator />;
    }

    if (isError) {
      return <span>{`${t('error')} : ${error.message}`}</span>;
    }

    return renderPrices();
  };

  return <div className="a-product-price">{prices()}</div>;
};

ProductPrice.propTypes = {
  priceToShow: PropTypes.string.isRequired,
  sku: PropTypes.string.isRequired,
  aaTrackingViewproduct: PropTypes.string,
  productBadge: PropTypes.string,
  enableLoyaltyPoints: PropTypes.string
};
export default ProductPrice;