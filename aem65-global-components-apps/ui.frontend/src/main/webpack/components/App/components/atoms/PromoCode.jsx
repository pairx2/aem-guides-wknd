import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import Button from './Button';
import PromoCodeTag from './PromoCodeTag';
import Alert from './Alert';
import { CommerceContext } from '../../context/CommerceContext';
import { AuthContext } from '../../context/AuthContext';
import { isLoggedIn, removeHTMLTags } from '../../utils/common';
import ESL_EPT from '../../data/eslEndpoints';
import { fetchESLservice } from '../../services/eslService';
import LoadingIndicator from '../common/LoadingIndicator';
import adobeAnalyticsConst from '../../constants/adobeAnalyticsConst';
import eventTrack  from '../../utils/adobeAnalytics';

function PromoCode(props) {
  const {
    promoCodeText,
    deletePromoCode,
    afterDeletePromoCode,
    promoCodeSuccessMessage,
    promoCodeErrorMessage,
    promoCodeAaTracking
  } = props;
  const [commerceContext, setCommerceContext] = useContext(CommerceContext);
  const [authContext, setAuthContext] = useContext(AuthContext);
  const userIsLoggedIn = isLoggedIn(authContext);
  const [showForm, setShowForm] = useState(false);
  const { t } = useTranslation();
  const promoCode = commerceContext?.cart?.applied_coupon?.code;
  const [promoCodeData, setPromoCodeData] = useState({
    cartId: commerceContext?.cart?.id,
  });
  const [hasError, setHasError] = useState();
  const [promoCodeRemoved, setPromoCodeRemoved] = useState(false);
  const [onCheckoutStepOne, setOnCheckoutStepOne] = useState(
    commerceContext?.checkoutStep === 1
  );
  const [promoCodeTracked, setpromoCodeTracked] = useState(false);

  const promoCodeServiceParams = {
    service: userIsLoggedIn
      ? ESL_EPT.createCartAddItemAuth
      : ESL_EPT.createCartAddItem,
    data: { ...promoCodeData },
    addAuthHeaders: userIsLoggedIn,
    withRecaptcha: !userIsLoggedIn,
  };

  let { data, isFetching, isError, refetch } = useQuery(
    [`promoCode-${commerceContext?.cart?.id}`, promoCodeServiceParams],
    () => fetchESLservice(promoCodeServiceParams),
    {
      enabled: false,
    }
  );

  const onApplyPromo = (e) => {
    e.preventDefault();
    const promoCodeInput = e.target.promoCode.value;
    if (promoCodeInput) {
      setPromoCodeData({
        ...promoCodeData,
        action: 'setPromoCode',
        promoCode: promoCodeInput,
      });
    }
  };

  const onRemovePromo = () => {
    setPromoCodeData({
      ...promoCodeData,
      action: 'removePromoCode',
    });
  };

  const onPromoCodeChange = (e) => {
    if (!e.target.value) {
      setHasError(false);
    }
  };

  useEffect(() => {
    if (!!promoCode) setShowForm(true);
  }, [promoCode]);

  useEffect(() => {
    if (!showForm) setHasError(false);
  }, [showForm]);

  useEffect(() => {
    if (deletePromoCode) {
      onRemovePromo();

      if (typeof afterDeletePromoCode === 'function') {
        afterDeletePromoCode();
      }
    }
  }, [deletePromoCode]);

  useEffect(() => {
    if (promoCodeData?.action) {
      data = null;
      refetch();
      setHasError(false);
    }
  }, [promoCodeData]);

  useEffect(() => {
    const cart =
      data?.data?.response?.data?.cart ||
      data?.data?.response?.data?.customerCart;

    if (cart && !isFetching) {
      setCommerceContext({
        ...commerceContext,
        cart,
        shippingMethodsRender:true,
      });
  
      
      if (promoCodeData.action === 'removePromoCode') {
        setPromoCodeRemoved(true);
        setpromoCodeTracked(false);
      } else {
        setPromoCodeRemoved(false);
      }
    }

    if (!isFetching && (isError || (data && !data?.data?.response?.data))) {
      setHasError(true);
    } else if (!promoCodeTracked && promoCodeAaTracking === 'true' && !isFetching && !hasError &&  promoCodeData.action == 'setPromoCode' && promoCodeData.promoCode) {
      eventTrack(adobeAnalyticsConst.APPLY_COUPON, promoCodeData.promoCode);
      setpromoCodeTracked(true);
    }
  }, [isFetching, data, isError]);

  useEffect(() => {
    setOnCheckoutStepOne(commerceContext?.checkoutStep === 1);
  }, [commerceContext?.checkoutStep]);

  if (!promoCode && !onCheckoutStepOne) {
    /**
     * If user has not entered a promo code but is on step 2 or 3 of checkout,
     * show the below message in place of the promo code form:
     */
    return <p>{t('step-one-to-add-promo-code')}</p>;
  }

  return (
    <div
      className={`a-promo-code ${hasError ? 'a-promo-code--with-error' : ''}`}
    >
      <div
        className="d-flex a-promo-code__heading"
        onClick={() => setShowForm(!showForm)}
        aria-hidden
      >
        <p className="a-promo-code__title">
          {promoCode ? t('your-promo-codes') : t('have-promo-code')}
        </p>
        <span className="a-promo-code__btn-expand">
          <em
            className={`abt-icon ${
              showForm ? 'abt-icon-minus' : 'abt-icon-plus'
            }`}
          />
          <span>{t('add-promo-code')}</span>
        </span>
      </div>

      {showForm && (
        <>
          {promoCode && (
            <div className="a-promo-code__codes">
              <PromoCodeTag
                promoCode={promoCode}
                key={`promoCode_${promoCode}`}
                deletePromoCode={onRemovePromo}
                disabled={isFetching}
                disableDelete={!onCheckoutStepOne}
              />
              {!onCheckoutStepOne ? <p>{t('return-to-step-one')}</p> : null}
            </div>
          )}
          {!hasError &&
            promoCodeRemoved &&
            promoCodeData.action != 'setPromoCode' && (
              <Alert
                type="warning"
                iconClass="information"
                message={`${t('removed-discount-code')}`}
              />
            )}

          {!hasError &&
            promoCode &&
            promoCodeData.action != 'removePromoCode' &&
            promoCodeSuccessMessage && (
              <Alert
                type="success"
                message={removeHTMLTags(
                  promoCodeSuccessMessage.replace('{{code}}', promoCode)
                )}
              />
            )}

          {!promoCode && (
            <form className="d-flex a-promo-code__form" onSubmit={onApplyPromo}>
              <div className="a-promo-code__label-container">
                <label htmlFor="promoCode" className="a-promo-code__label">
                  {promoCodeText || t('promo-code')}
                  <div className="a-promo-code__input-container">
                    <em className="a-promo-code__input-icon abt-icon abt-icon-price-tag" />
                    <input
                      id="promoCode"
                      name="promoCode"
                      className="a-promo-code__input"
                      placeholder={t('enter-promo-code')}
                      onChange={onPromoCodeChange}
                      // value={inputText}
                      disabled={isFetching}
                    />
                  </div>
                </label>

                {hasError && (
                  <div className="a-promo-code__error-msg">
                    {removeHTMLTags(promoCodeErrorMessage)}
                  </div>
                )}
              </div>
              <div className="a-promo-code__btn-container">
                {!isFetching && (
                  <Button
                    type="submit"
                    text={t('apply')}
                    disabled={isFetching}
                  />
                )}

                {isFetching && <LoadingIndicator />}
              </div>
            </form>
          )}
        </>
      )}
    </div>
  );
}

PromoCode.defaultProps = {
  promoCodeText: '',
  deletePromoCode: null,
  afterDeletePromoCode: null,
  promoCodeSuccessMessage: '',
  promoCodeErrorMessage: '',
  promoCodeAaTracking: 'false'
};

PromoCode.propTypes = {
  promoCodeText: PropTypes.string,
  deletePromoCode: PropTypes.func,
  afterDeletePromoCode: PropTypes.func,
  promoCodeSuccessMessage: PropTypes.string,
  promoCodeErrorMessage: PropTypes.string,
  promoCodeAaTracking: PropTypes.string
};

export default PromoCode;