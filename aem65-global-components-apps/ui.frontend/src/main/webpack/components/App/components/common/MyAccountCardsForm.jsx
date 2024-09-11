import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../context/AuthContext';
import { CommerceContext } from '../../context/CommerceContext';
import ESL_EPT from '../../data/eslEndpoints';
import { fetchESLservice } from '../../services/eslService';
import {
  addEventHandlers,
  cloneAddress,
  removeEventHandlers,
  replacePlaceholder,
} from '../../utils/common';
import createConditionalEvent from '../../utils/conditional';
import LoadingIndicator from './LoadingIndicator';
import partialConfig from '../../config';

function MyAccountCardsForm() {
  const { t } = useTranslation();

  const [commerceContext, setCommerceContext] = useContext(CommerceContext);
  const [authContext, setAuthContext] = useContext(AuthContext);
  const [allCards, setAllCards] = useState();
  const [defaultCard, setDefaultCard] = useState();
  const [deleteCard, setDeleteCard] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { mountingPoints } = partialConfig;

  const getLas4DigitsFromCard = (last4Digits) => {
    return /[^-]*$/.exec(last4Digits)[0];
  };
  const updateFormData = (formDataEl, i, cardDetail) => {
    formDataEl.classList.add('payment-card-default');
    // Change placeholder data source for first  cards box
    formDataEl.dataset.source = replacePlaceholder(
      formDataEl.dataset.source,
      i
    );
    formDataEl.setAttribute(
      'data-display-output',
      `${cardDetail.html_image}${cardDetail.type}${cardDetail.html_last4_digits}${cardDetail.end_date}`
    );
    formDataEl.innerHTML = `<div class="payment-card-subLayout">${cardDetail.html_image}<div class="card-element">${t('card-ending')}${cardDetail.html_last4_digits}</div><div class="card-element">${cardDetail.end_date}</div></div>`;
  };

  const loadCards = async () => {
    try {
      const getStoredPaymentsParams = {
        service: ESL_EPT.storedPaymentsGetList,
        addAuthHeaders: true,
        withRecaptcha: false,
      };

      const { data } = await fetchESLservice(getStoredPaymentsParams);

      const cards = data?.response?.data?.customerPaymentTokens?.items;
      const errorCode = data?.response?.errorCode;

      if (cards?.length > 0 && !errorCode) {
        cards.forEach((card) => {
          let { details } = card;
          details = JSON.parse(details);

          let isExpired = false;

          if (new Date().getFullYear() > Number(details.expiryYear)) {
            isExpired = true;
          } else if (new Date().getFullYear() === Number(details.expiryYear) &&
            (new Date().getMonth() + 1) > Number(details.expiryMonth)) {
            isExpired = true;
          }

          // Selecting last characters for `last4_digits`
          // since BE send something like `"last4_digits": "XXXX-XXXX-XXXX-5100"`
          card.html_last4_digits = ` <strong>${getLas4DigitsFromCard(
            details.maskedCC
          )}</strong>`;
          card.end_date = `<span class=${isExpired ? "expired-card" : ""}>${t('expiration-date')} <strong>${details.expiryMonth}/${details.expiryYear}</strong></span>`;
          card.html_image = `<img src="${t(
            `${card.payment_method_code?.toLowerCase()}_card_image`
          ).replace(/ /g, '/')}" class="payment-card-logo" alt= "${t(`${card.payment_method_code.toLowerCase()}_card`)}"/>`;
          card.type =
            t(`${card.payment_method_code.toLowerCase()}_card`) +
            ' ' +
            t('ending');
          card.is_default = details.isDefault ? true : false;
          details.cardType = t(`${card.payment_method_code?.toLowerCase()}_card`);
          details.lastFourDigits = getLas4DigitsFromCard(details.maskedCC);
          details.endDate = `${details.expiryMonth}/${details.expiryYear}`;
          card.details = details;
        });

        const defaultCard = cards.filter((card) => card?.is_default);
        const otherCards = cards.filter((card) => !card?.is_default);

        setCommerceContext({
          ...commerceContext,
          profile: {
            ...commerceContext?.profile,
            cards: {
              ...commerceContext?.profile?.cards,
              default_card: defaultCard.length > 0 ? defaultCard[0] : null,
              other: otherCards,
            },
          },
        });

        // if default card exist
        if (defaultCard.length > 0) {
          const hasDefaultCardsEvant = createConditionalEvent(
            true,
            'hasDefaultCard'
          );
          window.dispatchEvent(hasDefaultCardsEvant);

          const firstFormDataEl = document.querySelectorAll(
            "[data-conditional-variable='hasDefaultCard'] .formdata .checkout-form-data "
          )[0];
          const firstElentOther = defaultCard.find((item) => item);
          updateFormData(firstFormDataEl, 'default_card', firstElentOther);
        }

        // if list of other cards exist
        if (otherCards.length > 0) {
          window.dispatchEvent(createConditionalEvent(true, 'hasOtherCards'));

          // clone boxes
          cloneAddress(
            document.querySelector(
              "[data-conditional-variable='hasOtherCards'] .formdata"
            ),
            otherCards?.length - 1
          );

          // setting info for first cards box

          otherCards.forEach((otherCard, i) => {
            const firstFormDataEl = document.querySelectorAll(
              "[data-conditional-variable='hasOtherCards'] .formdata .checkout-form-data"
            )[i];
            updateFormData(firstFormDataEl, i, otherCard);
          });

          // Portal will need to be re-rendered to bind FormData to the newly cloned selectors:
          window.dispatchEvent(
            new CustomEvent('rerenderPortal', {
              detail: {
                selector: '.checkout-form-data',
              },
            })
          );
        }

        setAllCards(cards);
      } else if (cards?.length == 0) {
        const hasOtherCardsEvant = createConditionalEvent(
          'noCards',
          'cardsError'
        );
        window.dispatchEvent(hasOtherCardsEvant);
      } else {
        throw new Error(
          t(`errorcode-${data?.response?.i18nMessageKey?.toLowerCase()}`) ||
          data?.response?.statusReason ||
          t('something-went-wrong')
        );
      }
    } catch (e) {
      showError(e);
    } finally {
      setIsLoading(false);
    }

    window.dispatchEvent(
      new CustomEvent('rerenderPortal', {
        detail: {
          selector: '#my-card-add-modal',
        },
      })
    );
  };

  const showError = (e) => {
    const hasOtherCardsEvant = createConditionalEvent('error', 'cardsError');
    window.dispatchEvent(hasOtherCardsEvant);
  };

  // Check this dataSource in commerceContext for corresponding address ID:
  const getCardsId = (dataSource) => {
    let data = commerceContext;
    const bracketRegex = '\\[.*]';

    if (data) {
      dataSource.split('.').forEach((chunk) => {
        const bracketMatch = chunk.match(bracketRegex);

        if (bracketMatch?.length) {
          // chunk is referencing an array index
          const index = bracketMatch[0].substring(
            1,
            bracketMatch[0].length - 1
          );
          const arr = chunk.replace(new RegExp(bracketRegex), '');

          data = data[arr][index];
        } else if (data[chunk]) {
          data = data[chunk];
        } else {
          data = {};
        }
      });
    } else {
      data = null;
    }

    return data?.public_hash;
  };

  // Assign data attributes to form data elements for each address id:
  const assignCardIds = () => {
    document
      .querySelectorAll('#my-account-cards-form .formdata')
      .forEach((formDataEl) => {
        const cardId = getCardsId(
          formDataEl.querySelector('.checkout-form-data')?.dataset.source
        );

        if (cardId) {
          formDataEl.dataset.cardId = cardId;
        }
      });
  };

  useEffect(async () => {
    if (defaultCard) {
      try {
        await fetchESLservice({
          service: ESL_EPT.storedPaymentsSetDefault,
          data: {
            'publicHash': defaultCard,
          },
          withRecaptcha: true,
          addAuthHeaders: true,
        });

        // Reload page to display updated cards:
        window.location.reload();
      } catch (e) {
        showError(e);
      }
    }
  }, [defaultCard]);

  const handleMakeCardDefault = (e) => {
    const selectedCardId = e.target.closest('.formdata')?.dataset?.cardId;
    setDefaultCard(selectedCardId);
  };

  const handleDeleteCardId = (e) => {
    const selectedCardId = e.target.closest('.formdata')?.dataset?.cardId;
    setDeleteCard(selectedCardId);

    const defaultCard = commerceContext?.profile?.cards?.default_card;
    if(defaultCard?.public_hash === selectedCardId) {
      setCommerceContext({
        ...commerceContext,
        profile: {
          ...commerceContext?.profile,
          cards: {
            ...commerceContext?.profile?.cards,
            selected: defaultCard,
          },
        },
      });
    } else {
      const otherCards = commerceContext?.profile?.cards?.other;
      const matchedCardDetails = otherCards?.find(card => card?.public_hash === selectedCardId);
      setCommerceContext({
        ...commerceContext,
        profile: {
          ...commerceContext?.profile,
          cards: {
            ...commerceContext?.profile?.cards,
            selected: matchedCardDetails,
          },
        },
      });
    }
  };

  const handleDeleteCard = async (e) => {
    if (deleteCard) {
      try {
        const res = await fetchESLservice({
          service: ESL_EPT.storedPaymentsDeleteCard,
          addAuthHeaders: true,
          withRecaptcha: false,
          data: {
            'publicHash' : deleteCard,
          },
        });

        if (res?.data?.errorCode && !res?.data?.status && res?.data?.response?.i18nMessageKey) {
          throw new Error(
            t(`errorcode-${res?.data?.response?.i18nMessageKey}`)
          );
        }
        else if (!res?.data?.response?.data?.deletePaymentToken?.result) {
          // if error is related to card being attached to a subscription
          document.querySelector('#my-card-delete-modal .generic-modal--close')?.click();
          document.querySelector('#my-other-card-delete-modal .generic-modal--close')?.click();
          const activeSubscriptionCard = createConditionalEvent(
            'activeSubscription',
            'cardsError'
          );
          window.dispatchEvent(activeSubscriptionCard);
          document.querySelector('[data-conditional-case="activeSubscription"] .abbott-alert').style.display='block';
          window.scrollToTop();
        }
        else {
          // Reload page to display updated cards:
          document.querySelector('#my-card-delete-modal .generic-modal--close')?.click();
          document.querySelector('#my-other-card-delete-modal .generic-modal--close')?.click();
          window.location.reload();
        }
      } catch (e) {
        document.querySelector('#my-card-delete-modal .generic-modal--close')?.click();
        document.querySelector('#my-other-card-delete-modal .generic-modal--close')?.click();
        showError(e);
      }
    }
  };

  useEffect(() => {
    const clickHandlers = [
      {
        selector: `#my-card-delete-modal #my-card-delete-confirm`,
        handler: (e) => handleDeleteCard(e),
      },
      {
        selector: `#my-other-card-delete-modal #my-card-delete-confirm`,
        handler: (e) => handleDeleteCard(e),
      },
    ];

    addEventHandlers('click', clickHandlers);

    return () => {
      removeEventHandlers('click', clickHandlers);
    };
  }, [deleteCard]);

  useEffect(() => {
    const clickHandlers = [
      {
        selector: `#my-account-cards-form #my-card-delete`,
        handler: (e) => handleDeleteCardId(e),
      },
      {
        selector: `#my-account-cards-form #my-other-card-delete`,
        handler: (e) => handleDeleteCardId(e),
      },
      {
        selector: `#my-other-card-delete-modal #my-card-delete-confirm`,
        handler: (e) => handleDeleteCard(e),
      },
      {
        selector: `#my-card-delete-modal #my-card-delete-confirm`,
        handler: (e) => handleDeleteCard(e),
      },
      {
        selector: `#my-account-cards-form #my-card-default`,
        handler: (e) => handleMakeCardDefault(e),
      },
    ];

    addEventHandlers('click', clickHandlers);

    if (allCards) {
      assignCardIds();
    }

    return () => {
      removeEventHandlers('click', clickHandlers);
    };
  }, [allCards]);

  useEffect(async () => {
    await loadCards();
  }, []);

  useEffect(() => {
    const parent = document.querySelector(mountingPoints.myAccountCardsForm);
    if (isLoading) {
      parent?.classList.remove('d-block');
    } else {
      parent?.classList.add('d-block');
    }
  }, [isLoading]);

  return (
    <>
      {isLoading && <LoadingIndicator />}
    </>
  );
}

export default MyAccountCardsForm;
