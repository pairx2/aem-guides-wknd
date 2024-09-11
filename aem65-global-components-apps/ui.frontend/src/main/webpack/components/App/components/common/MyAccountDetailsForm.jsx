import React, { useState, useEffect, useContext } from 'react';
import { CommerceContext } from '../../context/CommerceContext';
import commonConst from '../../constants/commonConts';
import createConditionalEvent from '../../utils/conditional';
import {
  getLocalContextStoreName,
  addEventHandlers,
  removeEventHandlers,
} from '../../utils/common';
import { AuthContext } from '../../context/AuthContext';

const MyAccountOverview = () => {
  const [commerceContext, setCommerceContext] = useContext(CommerceContext);
  const [authContext, setAuthContext] = useContext(AuthContext);
  const [enteredEmail, setEnteredEmail] = useState(null);
  const [enteredName, setEnteredName] = useState(null);
  const [enteredLastName, setEnteredLastName] = useState(null);
  const authInfo =
    JSON.parse(
      localStorage.getItem(
        getLocalContextStoreName(commonConst.AUTH_LOCAL_STORAGE)
      ) || null
    ) || null;
  const emailVerified = authInfo && authInfo.accountInfo?.userInfo?.verified;

  const setAuthHeaderFields = (el) => {
    if (authInfo) {
      if (el.querySelector('input[name="x-id-token"]')) {
        el.querySelector('input[name="x-id-token"]').value =
          authInfo.jwtToken?.id_token || null;
      }
      if (el.querySelector('input[name="x-ecom-token"]')) {
        el.querySelector('input[name="x-ecom-token"]').value =
          authInfo.accountInfo?.userInfo?.additionalProperties?.ecommToken ||
          null;
      }
      if ( el.querySelector('input[name="x-ext-token"]')) {
        el.querySelector('input[name="x-ext-token"]').value =
          authInfo.accountInfo?.userInfo?.additionalProperties?.extToken || null;
      }
    } else {
      // No authInfo exists, user is likely not logged in
      if (el.querySelector('input[name="x-id-token"]')) {
        el.querySelector('input[name="x-id-token"]').value = null;
      }
      if (el.querySelector('input[name="x-ecom-token"]')) {
        el.querySelector('input[name="x-ecom-token"]').value = null;
      }
      if (el.querySelector('input[name="x-ext-token"]')) {
        el.querySelector('input[name="x-ext-token"]').value = null;
      }
    }
  };

  useEffect(() => {
    const onSuccessHandler = (e) => {
      if (e.detail.value !== 'success') {
        return;
      }

      const previousEmail = commerceContext?.profile?.userInfo?.email;

      // If email has been changed, update verified flag in localStorage
      if (previousEmail !== enteredEmail && authInfo) {
        window.dispatchEvent(
          createConditionalEvent('emailupdated', 'detailsUpdated')
        );
      }

      setCommerceContext({
        ...commerceContext,
        profile: {
          ...commerceContext.profile,
          userInfo: {
            ...commerceContext.profile?.userInfo,
            firstName: enteredName,
            lastName: enteredLastName,
          },
        },
      });

      setAuthContext({
        ...authContext,
        accountInfo: {
          ...authContext.accountInfo,
          userInfo: {
            ...authContext.accountInfo?.userInfo,
            firstName: enteredName,
            lastName: enteredLastName,
            verified: previousEmail !== enteredEmail && authInfo ? false : true,
          },
        },
      });

      setTimeout(() => {
        const form = document.getElementById('my-details__form');
        const formWithEmail = document.getElementById('my-details__form-email');

        form.querySelector(
          'input[name="userInfo.firstName"]'
        ).value = enteredName;
        form.querySelector(
          'input[name="userInfo.lastName"]'
        ).value = enteredLastName;
        formWithEmail.querySelector(
          'input[name="userInfo.email"]'
        ).value = enteredEmail;
      }, 0);
    };

    const inputHandlers = [
      {
        selector: `#my-details__form-email input[name="userInfo.email"]`,
        handler: (e) => {
          // Input value needs to be saved in state, so that we can access it after form submission:
          setEnteredEmail(e.target.value);
        },
      },
      {
        selector: `#my-details__form input[name="userInfo.firstName"]`,
        handler: (e) => {
          setEnteredName(e.target.value);
        },
      },
      {
        selector: `#my-details__form input[name="userInfo.lastName"]`,
        handler: (e) => {
          setEnteredLastName(e.target.value);
        },
      },
    ];

    const clickHandlers = [
      {
        selector: `#my-details__actions--delete`,
        handler: (e) => {
          const deleteAccountModal = document.querySelector(
            '#my-details__actions--delete-modal'
          );

          if (deleteAccountModal) {
            setAuthHeaderFields(deleteAccountModal);
          }
        },
      },
      {
        selector: `[data-conditional-case="emailupdated"] .m-alert__para a`,
        handler: (e) => {
          e.preventDefault();

          localStorage.setItem('resendEmailVerification', enteredEmail);
          window.location = document.querySelector(
            '[data-conditional-case="emailupdated"] .m-alert__para a'
          ).href;
        },
      },
    ];

    addEventHandlers('input', inputHandlers);
    addEventHandlers('click', clickHandlers);
    window.addEventListener('conditional-component-change', onSuccessHandler);

    return () => {
      removeEventHandlers('input', inputHandlers);
      removeEventHandlers('click', clickHandlers);
      window.removeEventListener(
        'conditional-component-change',
        onSuccessHandler
      );
    };
  }, [enteredEmail, enteredName, enteredLastName]);

  useEffect(() => {
    const form = document.getElementById('my-details__form');
    setAuthHeaderFields(form);

    const formWithEmail = document.getElementById('my-details__form-email');
    setAuthHeaderFields(formWithEmail);

    if (commerceContext?.profile?.userInfo?.firstName) {
      form.querySelector('input[name="userInfo.firstName"]').value =
        commerceContext.profile.userInfo.firstName;
      setEnteredName(commerceContext.profile.userInfo.firstName);
    }
    if (commerceContext?.profile?.userInfo?.lastName) {
      form.querySelector('input[name="userInfo.lastName"]').value =
        commerceContext.profile.userInfo.lastName;
      setEnteredLastName(commerceContext.profile.userInfo.lastName);
    }
    if (commerceContext?.profile?.userInfo?.email) {
      formWithEmail.querySelector('input[name="userInfo.email"]').value =
        commerceContext.profile.userInfo.email;
      setEnteredEmail(commerceContext.profile.userInfo.email);
    }

    if (!emailVerified) {
      window.dispatchEvent(
        createConditionalEvent('emailupdated', 'detailsUpdated')
      );
    }
  }, []);

  return null;
};

export default MyAccountOverview;
