import getSymbolFromCurrency from 'currency-symbol-map';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useQuery } from 'react-query';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import debounce from 'lodash.debounce';
import InnerHTML from 'dangerously-set-html-content';
import ESL_EPT from '../../data/eslEndpoints';
import { fetchESLservice } from '../../services/eslService';
import {
  onMiniCartOpen,
  onShowIncompatibleProductMessage,
} from '../../utils/hooks';
import Stepper from '../atoms/Stepper';
import LoadingIndicator from '../common/LoadingIndicator';
import { CommerceContext } from '../../context/CommerceContext';
import productPriceConst from '../../constants/productPriceConst';
import PromoCode from '../atoms/PromoCode';
import PromoCodeTag from '../atoms/PromoCodeTag';
import {
  getLocalContextStoreName,
  isLoggedIn,
  getFormattedDate,
  parsePriceString,
  replaceI18nVariables,
  cartContainsSubscription,
  beginGuestSubscriptionFlow,
  endGuestSubscriptionFlow,
  removeHTMLTags,
  getItemMaxValue,
  getItemMinValue,
} from '../../utils/common';
import { AuthContext } from '../../context/AuthContext';
import Alert from '../atoms/Alert';
import adobeAnalyticsConst from '../../constants/adobeAnalyticsConst';
import checkoutFormConst from '../../constants/checkoutFormConst';
import eventTrack  from '../../utils/adobeAnalytics';

const MiniCart = (props) => {
  const {
    enableTax,
    cartHeader,
    readAllowed,
    priceToShow,
    orderSummary,
    shoppingCart,
    promoCodeEnabled,
    promoCodeText,
    promoCodeSuccessMessage,
    promoCodeErrorMessage,
    deleteClass,
    incompatibleProductMessage,
    promoCodeAaTracking,
    miniaddtocartAaTracking,
    miniremovecartAaTracking,
    showSpaceinprice,
    subtotalWithouttax
  } = props;

  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [cartIsLoading, setCartIsLoading] = useState(false);
  const [cartIsError, setCartIsError] = useState(false);
  const [cartError, setCartError] = useState(false);
  const [commerceContext, setCommerceContext] = useContext(CommerceContext);
  const [authContext, setAuthContext] = useContext(AuthContext);
  const userIsLoggedIn = isLoggedIn(authContext);
  const isOrderConfirmation =
    commerceContext?.checkout?.orderData && orderSummary;

  const [mobileScreen, setMobileScreen] = React.useState({
    matches: window.matchMedia('(max-width: 540px)').matches
  });
  const [desktopScreen, setDesktopScreen] = React.useState({
    matches: window.matchMedia('(min-width: 1037px)').matches
  });

  const params = {
    cartId: commerceContext?.cart?.id,
  };
  // Cart Info Query
  const cartInfoServiceParams = {
    service: userIsLoggedIn ? ESL_EPT.retrieveCartAuth : ESL_EPT.retrieveCart,
    params,
    addAuthHeaders: userIsLoggedIn,
    withRecaptchaOnHeader: !userIsLoggedIn,
  };
  
  const checkoutElement = document.getElementById(checkoutFormConst.SIMPLIFIED_CHECKOUT);
  
  const { data, isLoading, isError, error, refetch } = useQuery(
    [`cartInfo-${commerceContext?.cart?.id}`, cartInfoServiceParams],
    !checkoutElement ? () => fetchESLservice(cartInfoServiceParams) : ()=>{},
    {
      enabled: false,
    }
  );

  const [productsData, setProductsData] = useState();
  const showVat = priceToShow === productPriceConst.VAT_PRICE;
  const showAll = priceToShow === productPriceConst.ALL_PRICES;
  const [resultMsg, setResultMsg] = useState('');
  const [
    showIncompatibleProductMessage,
    setShowIncompatibleProductMessage,
  ] = useState(false);

  const toggleModal = (e, openModal) => {
    if (isOpen && openModal) return;

    e.preventDefault();

    const open = !isOpen;
    setIsOpen(open);
    document.querySelector('body').classList.toggle('no-scroll-y');
    document
      .querySelector('.m-minicart__container')
      .classList.toggle('is-active');

    const freeStyleMiniCart = document.querySelector('#freestyle-minicart');
    if (freeStyleMiniCart !== null && !isOpen) {
      const calculateOffsets = () => {
        let box = document.querySelector('.header').closest('.abbott-wrapper');
        let height = box?.offsetHeight;

        if (height > 0) {
          document.querySelector(".m-minicart__container.is-active").style.top = height + "px";
          if (mobileScreen || desktopScreen) {
            document.querySelector("#below-cart-msg").style.marginBottom = height + "px";
            document.querySelector(".m-minicart__container .m-minicart__main").style.marginBottom = "0";
          } else {
            document.querySelector("#below-cart-msg").style.marginBottom = "0";
            document.querySelector(".m-minicart__container .m-minicart__main").style.marginBottom = height + "px";
          }
        }
      }

      if ($('html').scrollTop() > 0) {
        $('html').animate({
          scrollTop: 0
        }, 200, () => setTimeout(calculateOffsets, 100));
      } else {
        calculateOffsets();
      }
    }

    if (
      !isOpen &&
      !commerceContext?.cart &&
      commerceContext?.cart?.id &&
      !isOrderConfirmation
    ) {
      refetch();
    }
  };

  if (!orderSummary && !shoppingCart) {
    const openModalOnClick = useCallback((e) => toggleModal(e, true));
    onMiniCartOpen(openModalOnClick);
  }

  onShowIncompatibleProductMessage(
    useCallback(({ detail: showMessage }) =>
      setShowIncompatibleProductMessage(showMessage)
    )
  );

  const mainSelector =
    !orderSummary && !shoppingCart
      ? '.js-mini-cart'
      : !orderSummary
      ? '.js-shoppingcart'
      : '.js-ordersummary';

  const emptyCartDiv = `${mainSelector} #empty-cart-msg`;
  const belowCartDiv = `${mainSelector} #below-cart-msg`;

  //using below selector to disable 'checkout' button when cart is empty
  const checkOutBtn = `${belowCartDiv} #checkout-btn`;
  const btn = `${belowCartDiv} a.btn`

  if (document.querySelectorAll(btn)) {
    document.querySelectorAll(btn)
      .forEach((el) => {
        el.addEventListener('click', function handleClick() {
          const updatedStepCommerceContext = {
            ...commerceContext,
            checkoutStep: 1,
          };
          setCommerceContext(updatedStepCommerceContext);
        });
      });
  }

  // Showing/Hidding empty cart message
  if (
    !commerceContext?.cart?.items?.length &&
    !isLoading &&
    !cartIsLoading &&
    !isError
  ) {
    document.querySelector(emptyCartDiv).classList.add('d-block');

    if (document.querySelectorAll(checkOutBtn)) {
      document.querySelectorAll(checkOutBtn).forEach(function (element) {
        element.style.pointerEvents = 'none';
        element.style.backgroundColor = '#888B8D';
      });
    }
  } else {
    document.querySelector(emptyCartDiv).classList.remove('d-block');

    if (document.querySelectorAll(checkOutBtn)) {
      document.querySelectorAll(checkOutBtn).forEach(function (element) {
        element.style.pointerEvents = 'auto';
        element.style.backgroundColor = '#001489';
      });
    }
  }

  // Sync mini cart bottom content with react content
  if (
    !isLoading &&
    !cartIsLoading &&
    !isError &&
    commerceContext?.cart?.items?.length &&
    !isOrderConfirmation
  ) {
    document.querySelector(belowCartDiv).classList.add('d-block');
  } else {
    document.querySelector(belowCartDiv).classList.remove('d-block');
  }

  // Setting CSS class for orderConfirmation
  if (isOrderConfirmation) {
    document.querySelector(mainSelector).classList.add('m-order-confirmation');

    // Clean Cart Local Storage if order was successfull
    if (commerceContext?.checkout?.orderData?.response?.increment_id) {
      const actualCommerceContext = { ...commerceContext };

      delete actualCommerceContext?.cart;
      delete actualCommerceContext?.checkout;
      delete actualCommerceContext?.checkoutStep;

      localStorage.setItem(
        getLocalContextStoreName(),
        JSON.stringify(actualCommerceContext) || null
      );

      // Clean accountData in auth context
      if (userIsLoggedIn && authContext?.accountData) {
        setAuthContext({
          ...authContext,
          accountData: null,
        });
      }

      // Hide Cart Icon on header after successful order
      document.querySelectorAll('.o-header__mini-cart, .minicartbutton').forEach((el) => {
        el.classList.add('hide-icon');
      });
    }
  }

  const getCurrentDate = () => {
    const date = new Date();
    const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
    const month =
      date.getMonth() > 8 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const getSubscriptionPrice = (subscriptionItem) => {
    if (subscriptionItem) {
      const currency = getSymbolFromCurrency(
        showVat || showAll
          ? subscriptionItem.prices.row_total_including_tax?.currency
          : subscriptionItem.prices.row_total?.currency
      );

      const value =
        showVat || showAll
          ? subscriptionItem.prices.row_total_including_tax?.value
          : subscriptionItem.prices.row_total?.value;

      return `${currency}${value}`;
    }
  };

  const getDeliveryFrequency = (str) => {
    const frequency = str.split('_');
    return frequency[frequency.length-2] || str;
  };

  /**
   * Converts rich text (from MBO) to HTML to be rendered in the mini cart
   * @param {string} str text string from MBO
   * @returns JSX element to be rendered
   */
  const convertDiscountTextToHTML = (str) => {
    if (!str) {
      return;
    }

    // Replace all new lines with <br/>
    const newStr = str
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .replace(/\n/g, '<br />');

    return <InnerHTML html={t(newStr)} />;
  };

  useEffect(() => {
    setResultMsg('');
  }, [isOpen]);

  useEffect(() => {
    if (shoppingCart) {
      document.body.classList.add('shopping-cart-page');
    }

    if (data?.data?.response) {
      let cartData =
        data.data.response.data?.cart || data.data.response.data?.customerCart;

      setCommerceContext({
        ...commerceContext,
        cart: cartData,
      });

      document.dispatchEvent(
        new CustomEvent('showIncompatibleProductMessage', {
          detail: cartData?.show_product_compatible_warning === 1,
        })
      );
    }
  }, [data?.data?.status]);

  /**
   * Function that is going to make new cart calls updating quantity or deleting items in mini cart
   */
  const updateCart = async () => {
    setCartIsLoading(true);
    setCartIsError(false);
    setShowIncompatibleProductMessage(false);

    // Cart Query Paramethers
    const cartServiceParams = {
      service: userIsLoggedIn
        ? ESL_EPT.createCartAddItemAuth
        : ESL_EPT.createCartAddItem,
      data: productsData,
      addAuthHeaders: userIsLoggedIn,
      withRecaptcha: !userIsLoggedIn,
    };

    try {
      const result = await fetchESLservice(cartServiceParams);
      if (result?.data?.status) {
        const cart =
          result?.data?.response?.data?.cart ||
          result?.data?.response?.data?.customerCart;
        const cartIsEmpty = !cart?.items?.length;

        // if cart is empty
        if (cartIsEmpty) {
          document.querySelector(emptyCartDiv).classList.add('d-block');
        }
        if (commerceContext?.cart) {
          let preQuantity = commerceContext?.cart?.items?.find((item) => item?.id === productsData?.products[0].itemId)?.quantity;
          let newQuantity = productsData?.products[0].qty;
          let newCartData = commerceContext?.cart?.items?.find((item) => item?.id === productsData?.products[0].itemId);
          newCartData.updatedQty = newQuantity == 0 ? preQuantity : 1;
          newCartData.cartId = commerceContext?.cart?.id;


          let actionEventName = preQuantity > newQuantity ? adobeAnalyticsConst.REMOVE_FROM_CART : adobeAnalyticsConst.ADD_TO_CART;
          if (actionEventName == adobeAnalyticsConst.ADD_TO_CART && miniaddtocartAaTracking === 'true'){
            eventTrack(actionEventName, newCartData)
          }
          else if (actionEventName == adobeAnalyticsConst.REMOVE_FROM_CART && miniremovecartAaTracking === 'true'){
            eventTrack(actionEventName, newCartData)
          }
        }

        setResultMsg(false);
        setCommerceContext({
          ...commerceContext,
          cart: cartIsEmpty && !userIsLoggedIn ? null : cart,
          timeStamp: Date.now(),
        });

        document.dispatchEvent(
          new CustomEvent('showIncompatibleProductMessage', {
            detail: cart?.show_product_compatible_warning === 1,
          })
        );
      } else if (
        result?.data?.errorCode &&
        result?.data?.response?.statusReason
      ) {
        if(data?.response?.i18nMessageKey == 'CRT-007'){
          Object.keys(commerceContext).forEach((i) => commerceContext[i] = null);
          setCommerceContext({
            ...commerceContext,
          })
        }
        setResultMsg(result?.data?.response?.statusReason);
      }
    } catch (e) {
      setCartIsError(true);
      setCartError(e);
    } finally {
      setCartIsLoading(false);
    }
  };

  useEffect(async () => {
    if (productsData?.edited) {
      updateCart();
    }
  }, [productsData]);

  const onProductChange = (
    qty,
    itemId,
    maxQuantityReached,
    minQuantityReached
  ) => {
    if (!maxQuantityReached && !minQuantityReached) {
      setProductsData({
        products: [
          {
            itemId,
            qty,
          },
        ],
        cartId: commerceContext?.cart?.id,
        edited: true,
      });
    }
  };

  useEffect(() => {
    if (!userIsLoggedIn && cartContainsSubscription(commerceContext)) {
      beginGuestSubscriptionFlow();
    } else {
      endGuestSubscriptionFlow();
    }
  }, [commerceContext?.cart]);

  /**
   * Refresh cart contents on checkout page and shopping cart load
   */
  useEffect(() => {
    if (
      (shoppingCart || orderSummary) &&
      commerceContext?.cart?.id &&
      !isOrderConfirmation
    ) {
      refetch();
    }
  }, []);

  const debouncedStepperHandler = useMemo(
    () => debounce(onProductChange, 500),
    [commerceContext?.cart?.id]
  );

  const onOpenCloseSummary = () => {
    document.querySelectorAll('.js-ordersummary').forEach((item) => {
      item.classList.toggle('is-collapsed');
    });
  };

  // Promo Code
  const promoCode = commerceContext?.cart?.applied_coupon?.code;
  const [deletePromoCode, setDeletePromoCode] = useState(false);

  const onDeletePromoCode = () => {
    setDeletePromoCode(true);
  };

  const onAfterDeletePromoCode = () => {
    setDeletePromoCode(false);
  };

  const displayTax = () => {
    const appliedTaxes = commerceContext?.cart?.prices?.applied_taxes;
    let taxValue;
    let currencySymbol;
    let currenValu;

    if (appliedTaxes?.length) {
      taxValue = appliedTaxes.reduce((totaltax, currentVal) => {
        return totaltax + currentVal.amount.value
      },0);
      currenValu = appliedTaxes[0].amount.currency == null ? commerceContext?.cart?.prices?.grand_total?.currency : appliedTaxes[0].amount.currency;
      currencySymbol = getSymbolFromCurrency(currenValu);
    } else {
      taxValue =
        commerceContext?.cart?.prices?.subtotal_including_tax?.value -
        commerceContext?.cart?.prices?.subtotal_excluding_tax?.value;
      currencySymbol = getSymbolFromCurrency(
        commerceContext?.cart?.prices?.subtotal_including_tax?.currency
      );
    }

    return (<>
      <span className={showSpaceinprice === 'true' ? 'allow-symbol-space' : null}>
        {currencySymbol}
      </span>
      {parsePriceString(taxValue)}
    </>);
  }

  const productPdpLink = (sku) => {
    return sku && sku !== '' && commerceContext?.pdp?.[sku]
      ? commerceContext.pdp[sku]
      : false;
  };

  const renderItemPricing = (prices) => {
    if (!prices) {
      return;
    }

    let originalPrice;
    let priceWithDiscount;
    let isDiscounted;

    if (showVat || showAll) {
      isDiscounted =
        prices.row_total_including_tax?.value !==
        prices.row_total_with_discount_including_tax?.value;

      originalPrice = prices.row_total_including_tax?.value;
      priceWithDiscount = prices.row_total_with_discount_including_tax?.value;
    } else {
      isDiscounted =
        prices.row_total?.value !== prices.row_total_with_discount?.value;

      originalPrice = prices.row_total?.value;
      priceWithDiscount = prices.row_total_with_discount?.value;
    }

    const currency = getSymbolFromCurrency(
      showVat || showAll
        ? prices.row_total_including_tax?.currency
        : prices.row_total?.currency
    );

    return (
      <div
        className="m-minicart__price"
        aria-label={readAllowed ? item?.prices?.row_total?.value : ''}
      >
        <span className={showSpaceinprice === 'true' ? 'allow-symbol-space' : null}>{currency}</span>
        {isDiscounted
          ? parsePriceString(priceWithDiscount)
          : parsePriceString(originalPrice)}
        {isDiscounted ? (
          <div className="m-minicart__original-price">
            {currency}
            {parsePriceString(originalPrice)}
          </div>
        ) : null}
        <div className="m-minicart__price-vat-label">
          ({showVat || showAll ? t('product-inc-vat') : t('product-exc-vat')})
        </div>
      </div>
    );
  };

  return (
    <>
      {/* <!-- Mini Cart Start --> */}
      {(isOpen || orderSummary || shoppingCart) && (
        <aside className="m-minicart__content-above">
          {/* <!-- Header  --> */}
          <div
            className="m-minicart__header"
            onClick={onOpenCloseSummary}
            aria-hidden="true"
          >
            <div className={orderSummary ? 'w-100' : ''}>
              {!isOrderConfirmation && (
                <>
                  <div className="d-flex align-items-center">
                    <div
                      className="m-minicart__heading"
                      aria-label={
                        readAllowed ? cartHeader || t('shopping-cart') : ''
                      }
                    >
                      {cartHeader ||
                        (orderSummary
                          ? t('order-summary')
                          : t('shopping-cart'))}
                      {!!commerceContext?.cart?.items?.length &&
                        !isOrderConfirmation && (
                          <>
                            <span className="total-cart-items">
                              {` (${commerceContext?.cart?.total_quantity} ${t(
                                'cart-items'
                              )}) `}
                            </span>
                          </>
                        )}
                    </div>
                    {orderSummary && (
                      <>
                        <div
                          className="m-minicart__heading-total"
                          aria-label={
                            readAllowed
                              ? commerceContext?.cart?.prices?.grand_total
                                  ?.value
                              : ''
                          }
                        >
                          <span className={showSpaceinprice === 'true' ? 'allow-symbol-space' : null}>
                            {getSymbolFromCurrency(
                              commerceContext?.cart?.prices?.grand_total?.currency
                            )}
                          </span>
                          {commerceContext?.cart?.prices?.grand_total?.value}
                        </div>
                        <em className="abt-icon abt-icon-right-arrow m-minicart__heading-toggle" />
                      </>
                    )}
                  </div>
                  {orderSummary && (
                    <div className="m-minicart__mb-sub-heading">
                      {!promoCode && (
                        <span className="m-minicart__promo-heading">
                          {t('have-promo-code')}
                        </span>
                      )}

                      {promoCode && (
                        <div className="m-minicart__discounts">
                          <div className="m-minicart__discount d-flex">
                            <div className="m-minicart__discount-label">
                              {t('your-promo-codes')}
                              <PromoCodeTag
                                promoCode={promoCode}
                                deletePromoCode={onDeletePromoCode}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
              {isOrderConfirmation && (
                <>
                  <div
                    className="m-minicart__heading"
                    aria-label={
                      readAllowed ? cartHeader || t('order-number') : ''
                    }
                  >
                    {t('order-number')}{' '}
                    {
                      commerceContext?.checkout?.orderData?.response
                        ?.increment_id
                    }
                  </div>
                  <div className="m-minicart__sub-heading">
                    {t('estimated-arrival')}:{' '}
                    {commerceContext?.checkout?.orderData?.response
                      ?.extension_attributes?.estimated_delivery_date &&
                      getFormattedDate(
                        commerceContext?.checkout?.orderData?.response
                          ?.extension_attributes?.estimated_delivery_date,
                        t
                      )}
                  </div>
                </>
              )}
            </div>

            {!orderSummary && !shoppingCart && (
              <div
                className="a-button a-button--tertiary  a-button--icon-left m-minicart__close"
                onClick={toggleModal}
                aria-hidden="true"
              >
                <button className="btn" type="button">
                  <em
                    aria-hidden="true"
                    className="abt-icon abt-icon-only abt-icon-cross"
                  >
                    &nbsp;
                  </em>
                </button>
              </div>
            )}
          </div>

          {(isLoading || cartIsLoading) && <LoadingIndicator />}

          {(isError || cartIsError) && (
            <div
              className="px-4"
              aria-label={
                readAllowed ? error?.message || t('errorcode-500') : ''
              }
            >
              {error?.message || cartError?.message || t('errorcode-500')}
            </div>
          )}

          {showIncompatibleProductMessage && !!incompatibleProductMessage && (
            <div className="m-minicart__incompatible-product-alert">
              <Alert
                type="warning"
                iconClass="information"
                message={removeHTMLTags(incompatibleProductMessage)}
              />
            </div>
          )}
          <div className="m-minicart__main-content">
            {!isLoading &&
              !cartIsLoading &&
              !!commerceContext?.cart?.items?.length && (
                <>
                  {/* <!-- Items --> */}
                  <div className="m-minicart__items">
                    {commerceContext?.cart?.items.map((item) => (
                      <>
                        <div className="m-minicart__cart-item">
                          {!orderSummary && (
                            <div className=" a-button a-button--tertiary a-button--icon-left m-minicart__delete">
                              <button
                                className=" btn"
                                type="button"
                                onClick={() => onProductChange(0, item?.id)}
                              >
                                <em aria-hidden="true" className={deleteClass}>
                                  &nbsp;
                                </em>
                              </button>
                            </div>
                          )}

                          <div className="d-flex flex-wrap align-items-center">
                            <img
                              className="m-minicart__image"
                              src={item?.product?.thumbnail?.url}
                              alt={item?.product?.sku}
                            />
                          </div>

                          <div className="m-minicart__item-details">
                            {cartContainsSubscription(commerceContext) ? (
                              <>
                                <div
                                  className="m-minicart__sku"
                                  aria-label={
                                    readAllowed ? item?.product?.name : ''
                                  }
                                >
                                  {item?.product?.name + " -"}
                                </div>
                                <p className="m-minicart__subscription-label">
                                  {convertDiscountTextToHTML(item?.sarp2?.plan_frequency_description)}
                                </p>
                                <p className="m-minicart__subscription-label">
                                  {item?.sarp2?.frequency_description}
                                </p>
                              </>
                            ) : <div
                              className="m-minicart__sku"
                              aria-label={
                                readAllowed ? item?.product?.name : ''
                              }
                            >
                              {productPdpLink(item?.product?.sku) ? (
                                <a href={productPdpLink(item?.product?.sku)}>
                                  {item?.product?.name}
                                </a>
                              ) : (
                                item?.product?.name
                              )}
                            </div>}

                            {orderSummary ? (
                              <div className="m-ordersummary__item-qty">
                                {item?.quantity}
                              </div>
                            ) : cartContainsSubscription(commerceContext) ? (
                              null
                            ) : getItemMinValue(
                                commerceContext,
                                item?.product?.sku
                              ) !==
                              getItemMaxValue(
                                commerceContext,
                                item?.product?.sku
                              ) ? (
                              <Stepper
                                applySubscriptionStyle={false}
                                defaultVal={item?.quantity}
                                minVal={getItemMinValue(
                                  commerceContext,
                                  item?.product?.sku
                                )}
                                maxVal={getItemMaxValue(
                                  commerceContext,
                                  item?.product?.sku
                                )}
                                onMiniCart
                                onChange={(
                                  val,
                                  maxQuantityReached,
                                  minQuantityReached
                                ) =>
                                  debouncedStepperHandler(
                                    val,
                                    item?.id,
                                    maxQuantityReached,
                                    minQuantityReached
                                  )
                                }
                              />
                            ) : null}
                          </div>
                          <div className="m-minicart__pricing">
                            {renderItemPricing(item?.prices)}
                          </div>
                        </div>
                        {cartContainsSubscription(commerceContext) ? (
                          <p className="m-minicart__subscription-renewal-info">
                            {replaceI18nVariables(
                              t('subscription-renewal-info'),
                              [
                                getCurrentDate(),
                                getDeliveryFrequency(item?.sarp2?.plan_frequency_description),
                                getSubscriptionPrice(item),
                                item.product.delivery_frequency_label,
                              ]
                            )}
                          </p>
                        ) : null}
                      </>
                    ))}
                  </div>
                  {resultMsg && (
                    <div class="px-4 m-minicart__request-error">
                      <Alert type="danger" iconClass="information" message={resultMsg} />
                    </div>
                  )}
                  {(orderSummary || shoppingCart) &&
                    promoCodeEnabled &&
                    !isOrderConfirmation && (
                      <div className="m-minicart__bottom">
                        <PromoCode
                          promoCodeText={promoCodeText}
                          deletePromoCode={deletePromoCode}
                          afterDeletePromoCode={onAfterDeletePromoCode}
                          promoCodeSuccessMessage={promoCodeSuccessMessage}
                          promoCodeErrorMessage={promoCodeErrorMessage}
                          promoCodeAaTracking={promoCodeAaTracking}
                        />
                      </div>
                    )}

                  {/* <!-- Totals --> */}
                  <div className="m-minicart__totals">
                    <div className="m-minicart__subtotal">
                      <div
                        className="m-minicart__subtotal-label"
                        aria-label={readAllowed ? t('subtotal') : ''}
                      >
                        {t('subtotal')}
                      </div>
                      <div className="m-minicart__subtotal-value">
                        <div
                          className="m-minicart__subtotal-amount"
                          aria-label={
                            readAllowed
                              ? commerceContext?.cart?.prices
                                  ?.subtotal_excluding_tax?.value
                              : ''
                          }
                        >
                          <span className={showSpaceinprice === 'true' ? 'allow-symbol-space' : null}>
                          {getSymbolFromCurrency(
                            showVat || showAll
                              ? commerceContext?.cart?.prices
                                  ?.subtotal_including_tax?.currency
                              : commerceContext?.cart?.prices
                                  ?.subtotal_excluding_tax?.currency
                          )}
                          </span>
                          {enableTax === 'true' && subtotalWithouttax === 'true' ?
                          parsePriceString(commerceContext?.cart?.prices
                          ?.subtotal_excluding_tax?.value)
                          :
                          parsePriceString(
                            showVat || showAll
                              ? commerceContext?.cart?.prices
                                  ?.subtotal_including_tax?.value
                              : commerceContext?.cart?.prices
                                  ?.subtotal_excluding_tax?.value
                          )}
                        </div>

                        <div className="m-minicart__price-vat-label">
                          (
                          {enableTax === 'true' && subtotalWithouttax === 'true' ?
                          t('product-exc-vat') :
                          showVat || showAll
                            ? t('product-inc-vat')
                            : t('product-exc-vat')}
                          )
                        </div>
                      </div>
                    </div>

                    {!shoppingCart &&
                      !!commerceContext?.cart?.prices?.discounts?.length && (
                        <div className="m-minicart__discounts">
                          {commerceContext?.cart?.prices?.discounts?.map(
                            (item) => (
                              <div className="m-minicart__discount d-flex">
                                <div className="m-minicart__discount-label">
                                  {item.label}
                                </div>
                                <div className="m-minicart__discount-value">
                                  -{' '}
                                <span className={showSpaceinprice === 'true' ? 'allow-symbol-space' : null}>
                                  {getSymbolFromCurrency(
                                    item?.amount?.currency
                                  )}
                                  </span>
                                  {parsePriceString(item?.amount?.value)}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      )}

                    {/* <!-- Selected Shipping Method --> */}
                    {commerceContext?.cart?.shipping_addresses[0]
                      ?.selected_shipping_method && (
                      <div className="m-minicart__delivery">
                        <div className="m-minicart__delivery-label">
                          {
                            commerceContext?.cart?.shipping_addresses[0]
                              ?.selected_shipping_method?.method_title
                          }
                        </div>
                        <div className="m-minicart__delivery-value">
                          <div className="m-minicart__delivery-heading notranslate">
                          <span className={showSpaceinprice === 'true' ? 'allow-symbol-space' : null}>
                            {commerceContext?.cart?.shipping_addresses[0]
                              ?.selected_shipping_method?.amount !== 0 &&
                              getSymbolFromCurrency(
                                commerceContext?.cart?.shipping_addresses[0]
                                  ?.selected_shipping_method?.amount?.currency
                              )}
                              </span>
                            {
                              parsePriceString(commerceContext?.cart?.shipping_addresses[0]
                                ?.selected_shipping_method?.amount?.value)
                            }
                          </div>
                        </div>
                      </div>
                    )}

                    {(orderSummary || shoppingCart) &&
                      !commerceContext?.cart?.shipping_addresses[0]
                        ?.selected_shipping_method?.carrier_title && (
                        <div className="m-minicart__delivery">
                          <div className="m-minicart__delivery-label">
                            {t('delivery-cost-calculated-next-step')}
                          </div>
                        </div>
                      )}

                    {enableTax === 'true' && (
                      <div className="m-minicart__tax">
                        <div
                          className="m-minicart__tax-label"
                          aria-label={readAllowed ? t('tax') : ''}
                        >
                          {t('Tax')}
                        </div>

                        <div className="m-minicart__tax-value">
                          <div
                            className="m-minicart__tax-amount"
                            aria-label={
                              readAllowed
                                ? commerceContext?.cart?.prices
                                    ?.subtotal_excluding_tax?.value
                                : ''
                            }
                          >
                            {displayTax()}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="m-minicart__total">
                      <div
                        className="m-minicart__total-label"
                        aria-label={readAllowed ? t('order-total') : ''}
                      >
                        {t('order-total')}
                      </div>
                      <div
                        className="m-minicart__total-value notranslate"
                        aria-label={
                          readAllowed
                            ? showVat || showAll
                              ? commerceContext?.cart?.prices?.grand_total
                                  ?.value
                              : commerceContext?.cart?.prices
                                  ?.subtotal_with_discount_excluding_tax?.value
                            : ''
                        }
                      ><span className={showSpaceinprice === 'true' ? 'allow-symbol-space' : null}>
                        {getSymbolFromCurrency(
                          commerceContext?.cart?.prices?.grand_total?.currency
                        )}
                        </span>
                        {enableTax === 'true' && subtotalWithouttax === 'true' ?
                        parsePriceString(commerceContext?.cart?.prices?.grand_total?.value)  
                        :  
                        parsePriceString(
                          showVat || showAll
                            ? commerceContext?.cart?.prices?.grand_total?.value
                            : commerceContext?.cart?.prices
                                ?.subtotal_with_discount_excluding_tax?.value
                        )}
                        <div className="m-minicart__price-vat-label translate">
                          (
                          {enableTax === 'true' && subtotalWithouttax === 'true' ?
                          t('product-inc-vat') :
                          showVat || showAll
                            ? t('product-inc-vat')
                            : t('product-exc-vat')}
                          )
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            {!commerceContext?.cart?.items?.length && (
              <div className="m-minicart__zero-items"></div>
            )}
          </div>
        </aside>
      )}
      {/* <!-- Mask (overlay) --> */}
      {!orderSummary && !shoppingCart && (
        <div
          className={
            isOpen
              ? 'm-minicart__mask m-minicart__mask-active'
              : 'm-minicart__mask'
          }
          onClick={toggleModal}
          aria-hidden="true"
        />
      )}

      {/* <!-- Mini Cart End --> */}
      {/* <div className="o-mini-cart" onClick={closeModal} style={{ display: isOpen ? 'block' : 'none', width: '100%' }}>
                <aside className="o-mini-modal" style={{ width: '50%' }}>
                    <header onClick={e => e.stopPropagation()}>
                        <h2 className="o-mini-cart-title">Shopping Cart</h2>
                        <button className="o-mini-cart-close" onClick={closeModal}></button>
                    </header>
                </aside>
            </div> */}
    </>
  );
};

MiniCart.defaultProps = {
  enableTax: '',
  cartHeader: '',
  readAllowed: '',
  priceToShow: '',
  orderSummary: '',
  shoppingCart: '',
  promoCodeEnabled: '',
  promoCodeText: '',
  promoCodeSuccessMessage: '',
  promoCodeErrorMessage: '',
  deleteClass: 'abt-icon abt-icon-only abt-icon-delete',
  promoCodeAaTracking: 'false',
  miniaddtocartAaTracking: 'false',
  miniremovecartAaTracking: 'false',
  showSpaceinprice: 'false',
  subtotalWithouttax: 'false',
};

MiniCart.propTypes = {
  enableTax: PropTypes.string,
  cartHeader: PropTypes.string,
  readAllowed: PropTypes.string,
  priceToShow: PropTypes.string,
  orderSummary: PropTypes.string,
  shoppingCart: PropTypes.string,
  promoCodeEnabled: PropTypes.string,
  promoCodeText: PropTypes.string,
  promoCodeSuccessMessage: PropTypes.string,
  promoCodeErrorMessage: PropTypes.string,
  deleteClass: PropTypes.string,
  promoCodeAaTracking: PropTypes.string,
  miniaddtocartAaTracking: PropTypes.string,
  miniremovecartAaTracking: PropTypes.string,
  showSpaceinprice: PropTypes.string,
  subtotalWithouttax: PropTypes.string,
};

export default MiniCart;
