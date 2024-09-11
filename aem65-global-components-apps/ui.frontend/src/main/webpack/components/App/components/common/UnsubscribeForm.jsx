import React, { useState, useEffect } from 'react';
import createConditionalEvent from '../../utils/conditional';
import ESL_EPT from '../../data/eslEndpoints';
import { fetchESLservice } from '../../services/eslService';
import LoadingIndicator from './LoadingIndicator';
import { useTranslation } from 'react-i18next';

const UnsubscribeForm = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  const submitForm = async () => {
    window.dispatchEvent(createConditionalEvent('pending', 'unsubscribeState'));

    try {
      const { subscriptionId, verifykey } = getURLParams(
        window.location.search
      );

      if (!subscriptionId || !verifykey) {
        throw new Error(t('something-went-wrong'));
      }

      const { data } = await fetchESLservice({
        service: ESL_EPT.manageSubscription,
        data: {
          consentTypes: [
            {
              consentValue: false,
              consentName: subscriptionId,
            },
          ],
        },
        customHeaders: {
          'x-unsubscribe-token': verifykey,
        },
      });

      if (data?.status === true && !data?.errorCode) {
        window.dispatchEvent(
          createConditionalEvent('success', 'unsubscribeState')
        );
      } else {
        throw new Error(
          t(`errorcode-${data?.response?.i18nMessageKey.toLowerCase()}`) ||
            data?.response?.statusReason ||
            t('something-went-wrong')
        );
      }
    } catch (error) {
      const errorParagraph = document.querySelector(
        "div[data-conditional-variable='unsubscribeState'] div[data-conditional-case='failed'] .m-alert__para p"
      );

      if (errorParagraph && error) {
        errorParagraph.innerHTML = error;
      }
      window.dispatchEvent(
        createConditionalEvent('failed', 'unsubscribeState')
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!window.location.href.includes('editor.html')) {
      submitForm();
    }
  }, []);

  if (loading) {
    return (
      <div className="mt-5">
        <LoadingIndicator />
      </div>
    );
  }

  return null;
};

export default UnsubscribeForm;
