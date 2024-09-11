import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CommerceContext } from '../../context/CommerceContext';

const MiniCartButton = (props) => {
  const {
    commerceInfoExpireAfterdays
  } = props;
  const { t } = useTranslation();
  const { header = '', icon = '', readAllowed = '' } =
    document.querySelector('#minicart')?.dataset || {};
  const [commerceContext, setCommerceContext] = useContext(CommerceContext);

  const openModal = () => {
    if (!!document.querySelector('.js-mini-cart.is-active')) {
      document.querySelector('.m-minicart__header .m-minicart__close')?.click();
    } else {
      const cartOpenEvent = new Event('abtCartOpen');
      document.dispatchEvent(cartOpenEvent);
    }
  };

  useEffect(() => {
    if (commerceContext?.timeStamp && commerceInfoExpireAfterdays && commerceContext?.cart && commerceInfoExpireAfterdays != '0') {
      let cartDate = new Date(commerceContext?.timeStamp)

      let expireDate = new Date();
      expireDate.setDate(expireDate.getDate() - commerceInfoExpireAfterdays);

      if (cartDate < expireDate) {
        Object.keys(commerceContext).forEach((i) => commerceContext[i] = null);
          setCommerceContext({
            ...commerceContext,
          })
      }
    }
  });

  return (
    <div
      className="m-minicart m-minicart__btn"
      aria-hidden="true"
      onClick={openModal}
    >
      <span className="m-minicart__btn-icon">
        <i className={icon || 'abt-icon abt-icon-shoppingcart'} />
        {!!commerceContext?.cart?.items?.length && (
          <span className="m-minicart__btn-count">
            {commerceContext?.cart?.total_quantity}
          </span>
        )}
      </span>
      <span
        className="m-minicart__btn-text"
        aria-label={readAllowed ? header || t('cart') : ''}
      >
        {header || t('cart')}
      </span>
    </div>
  );
};

export default MiniCartButton;
