import React, { useEffect } from 'react';
import createConditionalEvent from '../../utils/conditional';
import { fetchESLservice } from '../../services/eslService';
import { getURLParams } from '../../utils/common';

/**
 * Auto-submits a form with the id of `autosubmit`
 * Makes a few assumptions:
 * - Hidden inputs on page are indicated by the "Request Parameter" value source
 * - Request method and url are defined on the Form Container AEM component
 * - Payload being sent is flat (no nested objects or arrays)
 *
 * The autosubmitState Form Conditional event can be used to display content on loading/success/failure
 */
const AutoSubmitForm = () => {
  const submitForm = async ({ method, url, payload, headers }) => {
    window.dispatchEvent(createConditionalEvent('pending', 'autosubmitState'));

    const { data } = await fetchESLservice({
      fullUrl: url,
      customMethod: method,
      data: payload,
      customHeaders: headers,
    });

    if (data?.status === true) {
      window.dispatchEvent(
        createConditionalEvent('success', 'autosubmitState')
      );
    } else {
      window.dispatchEvent(
        createConditionalEvent('failure', 'autosubmitState')
      );
    }
  };

  useEffect(() => {
    const form = document.querySelector('#autosubmit form');
    const formAction = form.getAttribute('action');
    const formMethod = form.dataset.ajaxMethod;

    if (!form || !formAction || !formMethod) {
      console.warn('No form found');
    }

    const payload = {};
    const headers = {};
    const queryParams = getURLParams(window.location.search);
    const hiddenRequestInputs = form.querySelectorAll(
      'input[type="hidden"][data-request]'
    );

    if (hiddenRequestInputs) {
      for (let i = 0; i < hiddenRequestInputs.length; i++) {
        const inputEl = hiddenRequestInputs[i];

        if (inputEl.name && inputEl.dataset.request === 'body') {
          payload[inputEl.name] = decodeURIComponent(
            queryParams[inputEl.dataset.keyName]
          );
        }

        if (inputEl.name && inputEl.dataset.request === 'header') {
          headers[inputEl.name] = decodeURIComponent(
            queryParams[inputEl.dataset.keyName]
          );
        }
      }
    }

    if (!window.location.href.includes('editor.html')) {
      submitForm({ method: formMethod, url: formAction, payload, headers });
    }
  }, []);

  return null;
};

export default AutoSubmitForm;
