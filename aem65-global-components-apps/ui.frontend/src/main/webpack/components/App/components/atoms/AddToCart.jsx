import React, { useEffect, useContext, useState } from 'react';
import { useQuery } from 'react-query';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import addToCartConst from '../../constants/addToCartConst';
import ESL_EPT from '../../data/eslEndpoints';
import { productSubscriptionsQuery, productPriceQuery } from '../../data/graphqlQueries';
import { fetchGPQESLservice } from '../../services/eslService';
import Button from './Button';
import Stepper from './Stepper';
import ProductSubscriptionOptions from './ProductSubscriptionOptions';
import AddToCartCta from './AddToCartCta';
import { CommerceContext } from '../../context/CommerceContext';
import { fetchSinglePurchaseProduct, getItemMaxValue, getItemMinValue, isLoggedIn, fetchSubscriptionPurchaseOptions } from '../../utils/common';
import { AuthContext } from '../../context/AuthContext';

const AddToCart = (props) => {
  const {
    ctaOverride,
    pdpUrl,
    sku,
    outOfStockTitle,
    outOfStockMessage,
    stockAlertLinkText,
    stockAlertStaticText,
    aaTrackingAddtocart,
    buyNowButton,
    subscriptionOptions
  } = props;
  const [commerceContext, setCommerceContext] = useContext(CommerceContext);
  const [authContext, setAuthContext] = useContext(AuthContext);
  const userIsLoggedIn = isLoggedIn(authContext);

  const graphqlQuery = () => {
    if(subscriptionOptions?.toLowerCase() === 'singlepurchase') return productPriceQuery;
    if(subscriptionOptions?.toLowerCase() === 'subscriptionpurchase') return productSubscriptionsQuery;
    return productSubscriptionsQuery;
  }
  const productQuery = graphqlQuery();
  const { data, isLoading, isError, error } = useQuery(
    [`productPrice-${sku}`, ESL_EPT.products, productPriceQuery, productSubscriptionsQuery],
    () => fetchGPQESLservice(ESL_EPT.products, productQuery(sku), userIsLoggedIn)
  );
  const filterSinglePurchase = fetchSinglePurchaseProduct(subscriptionOptions, data?.data?.response?.data?.products?.items);
  const productItem =
    filterSinglePurchase?.default_quantities;
  const stockStatus =
    filterSinglePurchase?.stock_status;
  const displayStockAlert =
    filterSinglePurchase?.productalert?.stockalert ===
    1;
  const { t } = useTranslation();
  const [selectedQuantity, setSelectedQuantity] = useState(
    productItem?.min_sale_qty
  );
  const [selectedSubscriptionOption, setSelectedSubscriptionOption] = useState('');
  const [selectedSubscriptionSku, setSelectedSubscriptionSku] = useState(sku);

  const isSinglePurchaseDefaultSelected = () => {
    if(subscriptionOptions?.toLowerCase() === 'singlepurchase') return true;
    if(subscriptionOptions?.toLowerCase() === 'subscriptionpurchase') return false;
    return true
  }

  const [isSingleProductSelected, setIsSingleProductSelected] = useState(isSinglePurchaseDefaultSelected());
  const [selectedSkuVal, setSelectedSkuVal] = useState('');

  const itemMinVal = getItemMinValue(commerceContext, sku);
  const itemMaxVal = getItemMaxValue(commerceContext, sku);

  const handleSelectedSubscriptionOption = (optionId = '', subscriptionSku = sku) => {
    setSelectedSubscriptionOption(optionId);
    setSelectedSubscriptionSku(subscriptionSku);
  }

  const handlePurchaseOptionChange = (isSinglePurchase, skuVal) => {
    setIsSingleProductSelected(isSinglePurchase);
    setSelectedSkuVal(skuVal);
  }

  useEffect(() => {
    const singlePurchaseRadioBtn = document.getElementById('single-purchase');
    const subscriptionPurchaseRadioBtn = document.getElementById('subscription-purchase');
    if(isSingleProductSelected) {
      if(singlePurchaseRadioBtn) {
        singlePurchaseRadioBtn.checked = true;
      }
      if(subscriptionPurchaseRadioBtn) {
        subscriptionPurchaseRadioBtn.checked = false;
      }
      handleSelectedSubscriptionOption('', sku);
    } else {
      const items = data?.data?.response?.data?.products?.items;
      const planOptions = items?.length ? fetchSubscriptionPurchaseOptions(items) : null;
      if(singlePurchaseRadioBtn) {
        singlePurchaseRadioBtn.checked = false;
      }
      if(subscriptionPurchaseRadioBtn) {
        subscriptionPurchaseRadioBtn.checked = true;
      }
      if(planOptions) {
        const subsOptionId=planOptions[0]?.sarp2?.plan_options[0]?.option_id;
        const subsOptionSku=planOptions[0]?.sku;
        handleSelectedSubscriptionOption(subsOptionId, subsOptionSku);
      }
      setSelectedQuantity('');
    }
  }, [isSingleProductSelected]);

  useEffect(() => {
    const clickHandlers = [
      {
        selector: 'subscription-purchase',
        handler: (e) => {
          const skuElement = e.target.closest('.product-detail__subscription-purchase')?.nextElementSibling
          const skuVal = skuElement?.getAttribute('data-sku')
        
          handlePurchaseOptionChange(false,skuVal);
        }
      },
      {
        selector: 'single-purchase',
        handler: (e) => {
          handlePurchaseOptionChange(true, '');
        }
      },
    ];

    clickHandlers.forEach((v) => {
      if (document.getElementById(v.selector)) {
        document.querySelectorAll(`#${v.selector}`).forEach((e) => {e.addEventListener('click', v.handler)});
      }
    });

    return () => {
      clickHandlers.forEach((v) => {
        if (document.getElementById(v.selector)) {
          document.querySelectorAll(`#${v.selector}`).forEach((e) => {e.removeEventListener('click', v.handler)});
        }
      });
    }
  }, []);

  return (
    <div
      className={`a-add-to-cart${
        stockStatus === addToCartConst.OUT_OF_STOCK
          ? ' a-add-to-cart--out-of-stock'
          : ''
      }`}
    >
      {isSingleProductSelected && !isLoading && itemMinVal !== itemMaxVal ? (
        <Stepper
          applySubscriptionStyle={subscriptionOptions}
          minVal={productItem?.min_sale_qty}
          maxVal={productItem?.max_sale_qty}
          onChange={(val) => setSelectedQuantity(val)}
        />
       ) : !isSingleProductSelected && (
        <ProductSubscriptionOptions
          className='a-add-to-cart__subscription-options'
          selectedSubscriptionOption={selectedSubscriptionOption}
          handleSelectedOption={handleSelectedSubscriptionOption}
          data={data}
          sku={sku}
          selectedSkuVal={selectedSkuVal}
        />
      )}
      {(ctaOverride === addToCartConst.ADD_TO_CART ||
        ctaOverride === addToCartConst.BOTH) && (
        <AddToCartCta
          sku={selectedSubscriptionSku === sku ? sku : selectedSubscriptionSku}
          pdpUrl={pdpUrl}
          text={null}
          minVal={productItem?.min_sale_qty}
          maxVal={productItem?.max_sale_qty}
          selectedQuantity={selectedQuantity}
          priceIsError={isError}
          priceIsLoading={isLoading}
          priceError={error}
          stockStatus={stockStatus}
          outOfStockTitle={outOfStockTitle}
          outOfStockMessage={outOfStockMessage}
          displayStockAlert={displayStockAlert}
          stockAlertLinkText={stockAlertLinkText}
          stockAlertStaticText={stockAlertStaticText}
          aaTrackingAddtocart={aaTrackingAddtocart}
          buyNowButton={buyNowButton}
          selectedSubscriptionOption={selectedSubscriptionOption}
          isSingleProductSelected={isSingleProductSelected}
          selectedSkuVal={selectedSkuVal}
        />
      )}

      {(ctaOverride === addToCartConst.PDP_LINK ||
        ctaOverride === addToCartConst.BOTH) && (
        <Button
          text={t('pdp-btn-label')}
          anchorLink={pdpUrl}
          buttonStyle={
            ctaOverride === addToCartConst.BOTH ? 'secondary' : 'primary'
          }
        />
      )}
    </div>
  );
};

AddToCart.defaultProps = {
  pdpUrl: '',
  outOfStockTitle: '',
  outOfStockMessage: '',
  stockAlertLinkText: '',
  stockAlertStaticText: '',
  aaTrackingAddtocart: 'false',
  buyNowButton: 'false',
};

AddToCart.propTypes = {
  ctaOverride: PropTypes.string.isRequired,
  sku: PropTypes.string.isRequired,
  pdpUrl: PropTypes.string,
  outOfStockTitle: PropTypes.string,
  outOfStockMessage: PropTypes.string,
  stockAlertLinkText: PropTypes.string,
  stockAlertStaticText: PropTypes.string,
  aaTrackingAddtocart: PropTypes.string,
  buyNowButton: PropTypes.string,
  subscriptionOptions: PropTypes.string,
};

export default AddToCart;