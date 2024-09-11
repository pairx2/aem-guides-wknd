import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import Button from './Button';
import { fetchESLservice } from '../../services/eslService';
import ESL_EPT from '../../data/eslEndpoints';
import { CommerceContext } from '../../context/CommerceContext';
import { AuthContext } from '../../context/AuthContext';
import {
  isLoggedIn,
  getUrlParameter,
  getLocalContextStoreName,
} from '../../utils/common';
import addToCartConst from '../../constants/addToCartConst';
import Alert from './Alert';
import StockAlertSubscribe from './StockAlertSubscribe';
import adobeAnalyticsConst from '../../constants/adobeAnalyticsConst';
import eventTrack  from '../../utils/adobeAnalytics';

const AddToCartCta = (props) => {
  const {
    sku,
    pdpUrl,
    minVal,
    maxVal,
    selectedQuantity,
    text,
    priceIsLoading,
    priceIsError,
    priceError,
    stockStatus,
    outOfStockTitle,
    outOfStockMessage,
    displayStockAlert,
    stockAlertLinkText,
    stockAlertStaticText,
    aaTrackingAddtocart,
    buyNowButton,
    selectedSubscriptionOption,
    isSingleProductSelected,
    selectedSkuVal,
  } = props;

  const { t } = useTranslation();
  const [commerceContext, setCommerceContext] = useContext(CommerceContext);

  const [resultMsg, setResultMsg] = useState();
  const [isLoading, setIsLoading] = useState();
  const [buttonName, setButtonName] = useState();
  const [isBuyNowLoading, setIsBuyNowLoading] = useState();
  const [productsData, setProductsData] = useState({
    products: [
      {
        sku,
        qty: selectedQuantity,
      },
    ],
    cartId: commerceContext?.cart?.id,
  });

  const [authContext, setAuthContext] = useContext(AuthContext);
  const userIsLoggedIn = isLoggedIn(authContext);

  // Cart Query
  const addToCartServiceParams = {
    service: userIsLoggedIn
      ? ESL_EPT.createCartAddItemAuth
      : ESL_EPT.createCartAddItem,
    data: productsData,
    addAuthHeaders: userIsLoggedIn,
    withRecaptcha: !userIsLoggedIn,
  };

  const {
    isFetching: cartIsLoading,
    isError: cartIsError,
    error: cartError,
    refetch: cartRefetch,
  } = useQuery(
    [`newCartId`, addToCartServiceParams],
    () => fetchESLservice(addToCartServiceParams),
    {
      enabled: false,
    }
  );

  // Clean error message on quantity change
  useEffect(() => {
    setResultMsg(false);
  }, [selectedQuantity]);

  useEffect(() => {
    if(buttonName == addToCartConst.BUY_NOW){
      setIsBuyNowLoading(cartIsLoading || priceIsLoading);
    }
    else{
      setIsLoading(cartIsLoading || priceIsLoading);
    }
  }, [cartIsLoading, priceIsLoading]);

  useEffect(() => {
    if (cartIsError || priceIsError) {
      setResultMsg(cartError?.message || priceError?.message);
    }
  }, [cartIsError, priceIsError]);

  //Check user in login or not, If not then ridrect to login page
  const setPendingCheckoutStatus = (checkoutPath) => {
    localStorage.setItem(
      'pendingCheckoutCart',
      JSON.stringify({
        checkoutPending: true,
        checkoutPath: checkoutPath,
      })
    );
  };
  const openCheckoutPage = () => {
    const checkoutButton = document.querySelector(`#mini-cart-checkout-button`);
    const loginAnchor = document.querySelector(`#header-login-sign-up-link`);
    const checkoutPagePath = checkoutButton?.pathname;
    const loginPagePath = loginAnchor?.pathname;

    if (userIsLoggedIn && checkoutPagePath) {
      location.pathname = checkoutPagePath
    }
    else {
      if (loginPagePath) {
        setPendingCheckoutStatus(checkoutPagePath);
        location.pathname = loginPagePath;
      }
    }
  };

  const openMiniCartModal = () => {
    const cartOpenEvent = new Event('abtCartOpen');
    document.dispatchEvent(cartOpenEvent);
  };

  useEffect(async () => {
    if (productsData?.edited) {
      const result = await cartRefetch();
      const data = result?.data?.data;
      const cart =
        data?.response?.data?.cart || data?.response?.data?.customerCart;

      if (cart) {
        let newCartData = cart?.items?.find((item) => item?.product?.sku == productsData?.products[0].sku);
        newCartData.updatedQty = productsData?.products[0].qty;
        newCartData.cartId = cart?.id;
        selectedSubscriptionOption ? newCartData.optionId = productsData?.products[0].optionId : null;
        // newCartData.price = priceToShow === productPriceConst.VAT_PRICE ? productItem?.vat_details?.including_tax : productItem?.vat_details?.excluding_tax;
        if (aaTrackingAddtocart === 'true') {
          const eventButton = buttonName == addToCartConst.BUY_NOW ? adobeAnalyticsConst.TYPE_BUY_NOW : adobeAnalyticsConst.TYPE_ADD_TO_CART
          newCartData.clickType = eventButton
          eventTrack(adobeAnalyticsConst.ADD_TO_CART, newCartData)
        }
      }

      if (data?.status) {
        setCommerceContext({
          ...commerceContext,
          cart,
          timeStamp: Date.now(),
        });
        
        setTimeout(() => {
          buttonName == addToCartConst.BUY_NOW ? openCheckoutPage() :openMiniCartModal();
        }, 500);

        document.dispatchEvent(
          new CustomEvent('showIncompatibleProductMessage', {
            detail: cart?.show_product_compatible_warning === 1,
          })
        );
      } else if (data?.errorCode && data?.response?.statusReason) {
        if(data?.response?.i18nMessageKey == 'CRT-007'){
          Object.keys(commerceContext).forEach((i) => commerceContext[i] = null);
          setCommerceContext({
            ...commerceContext,
          });
        }
        setResultMsg(data?.response?.statusReason);
      }
    }
  }, [productsData]);

  const addProductToCart = async (
    selectedQuantityVal = selectedQuantity.length === 0
      ? minVal
      : selectedQuantity,
    minAmmount = minVal,
    maxAmmount = maxVal
  ) => {
    // Promo code used for golden ticket
    const promoCode = getUrlParameter('promoCode');

    setResultMsg('');
    if(selectedSubscriptionOption) {
      if (commerceContext?.cart) {
        setProductsData({
          products: [
            {
              sku,
              qty: 1,
              optionId: selectedSubscriptionOption,
            },
          ],
          ...(promoCode && {
            promoCode,
          }),
          cartId: commerceContext?.cart?.id,
          edited: true,
        });
      } else {
        setProductsData({
          products: [
            {
              sku,
              qty: 1,
              optionId: selectedSubscriptionOption,
            },
          ],
          ...(promoCode && {
            promoCode,
          }),
          ...(userIsLoggedIn && {
            cartId: commerceContext?.cart?.id,
          }),
          edited: true,
        });
      }
    }
    else if (
      parseFloat(selectedQuantityVal) >= parseFloat(minAmmount) &&
      parseFloat(selectedQuantityVal) <= parseFloat(maxAmmount)
    ) {
      if (commerceContext?.cart) {
        setProductsData({
          products: [
            {
              sku,
              qty: selectedQuantityVal,
            },
          ],
          ...(promoCode && {
            promoCode,
          }),
          cartId: commerceContext?.cart?.id,
          edited: true,
        });
      } else {
        setProductsData({
          products: [
            {
              sku,
              qty: selectedQuantityVal,
            },
          ],
          ...(promoCode && {
            promoCode,
          }),
          ...(userIsLoggedIn && {
            cartId: commerceContext?.cart?.id,
          }),
          edited: true,
        });
      }
    } else {
      setResultMsg(t('product-not-available-quantity'));
    }
  };

  const registerPdpUrl = () => {
    if (pdpUrl === '') return;

    let pdp = commerceContext?.pdp || {};
    pdp[sku] = pdpUrl;

    setCommerceContext({ ...commerceContext, pdp });
  };

  const onAddToCart = () => {
    if (!isLoading) {
      addProductToCart();
      registerPdpUrl();
    }
  };
  const onButtonClick = (buttonName) => {
    if (buttonName) {
      setButtonName(buttonName)
    }
  };

  return (
    <div className="a-add-to-cart__cta">
      {stockStatus === addToCartConst.IN_STOCK && (
        <div className="buy-now-cta">
          {buyNowButton === 'true' &&
            (<Button
              text={t('buy-now')}
              onClick={() => { onAddToCart(); onButtonClick(addToCartConst.BUY_NOW); }}
              buttonClasses={isBuyNowLoading ? 'a-button--spinner' : ''}
              iconClass={isBuyNowLoading ? 'spinner' : ''}
              iconPosition={isBuyNowLoading ? 'left' : ''}
              disabled={(!isSingleProductSelected && !selectedSubscriptionOption && sku == selectedSkuVal)}
            />
            )}
          <Button
            text={text || t('add-to-cart')}
            onClick={() => { onAddToCart(); onButtonClick(addToCartConst.ADD_TO_CART); }}
            buttonClasses={isLoading ? 'a-button--spinner' : ''}
            iconClass={isLoading ? 'spinner' : ''}
            iconPosition={isLoading ? 'left' : ''}
            disabled={(!isSingleProductSelected && !selectedSubscriptionOption && sku == selectedSkuVal)}
            buttonStyle={buyNowButton === 'true' ? 'secondary' : 'primary'}
          />
        </div>
      )}
      {stockStatus === addToCartConst.OUT_OF_STOCK && (
        <>
          <div className="a-add-to-cart__out-of-stock-message">
            <Alert
              type="danger"
              iconClass="information"
              title={outOfStockTitle}
              message={outOfStockMessage || t('product-out-of-stock')}
            />
          </div>
          {displayStockAlert && !!stockAlertLinkText && (
            <StockAlertSubscribe
              linkText={stockAlertLinkText}
              staticText={stockAlertStaticText}
              pdpUrl={pdpUrl}
              sku={sku}
            />
          )}
        </>
      )}
      {!!resultMsg && (
        <div className="a-add-to-cart__result-message">
          <Alert type="danger" iconClass="information" message={resultMsg} />
        </div>
      )}
    </div>
  );
};

AddToCartCta.defaultProps = {
  pdpUrl: '',
  text: '',
  minVal: '',
  maxVal: '',
  selectedQuantity: '',
  priceIsLoading: false,
  priceIsError: false,
  priceError: null,
  stockStatus: '',
  outOfStockTitle: '',
  outOfStockMessage: '',
  displayStockAlert: false,
  stockAlertLinkText: '',
  stockAlertStaticText: '',
  aaTrackingAddtocart: 'false',
  buyNowButton: 'false',
  selectedSubscriptionOption: '',
  isSingleProductSelected: true,
  selectedSkuVal: '',
};

AddToCartCta.propTypes = {
  sku: PropTypes.string.isRequired,
  pdpUrl: PropTypes.string,
  text: PropTypes.string,
  minVal: PropTypes.string,
  maxVal: PropTypes.string,
  selectedQuantity: PropTypes.string,
  priceIsLoading: PropTypes.bool,
  priceIsError: PropTypes.bool,
  priceError: PropTypes.object,
  stockStatus: PropTypes.string,
  outOfStockTitle: PropTypes.string,
  outOfStockMessage: PropTypes.string,
  displayStockAlert: PropTypes.bool,
  stockAlertLinkText: PropTypes.string,
  stockAlertStaticText: PropTypes.string,
  aaTrackingAddtocart:  PropTypes.string,
  buyNowButton: PropTypes.string,
  selectedSubscriptionOption: PropTypes.string,
  isSingleProductSelected: PropTypes.bool,
  selectedSkuVal: PropTypes.string,
};

export default AddToCartCta;
