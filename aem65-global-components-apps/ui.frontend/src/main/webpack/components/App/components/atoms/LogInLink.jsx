import React, { useContext, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../context/AuthContext';
import { isLoggedIn } from '../../utils/common';
import LoadingIndicator from '../common/LoadingIndicator';

function LogInLink() {
  const [authContext, setAuthContext] = useContext(AuthContext);
  const userIsLoggedIn = isLoggedIn(authContext);
  const logInLinkContainer = useRef(null);
  const { t } = useTranslation();

  const getParent = () => {
    const element = logInLinkContainer.current;
    return element.closest('#logInLink');
  };

  /**
   * when user clicks logouts, run logout callback and set loading state in button
   */
  const onLogOutClick = () => {
    const loginLogOutButtons = document.querySelectorAll('#logInLink');
    if (!loginLogOutButtons[0]?.classList.contains('m-signup--loading')) {
      OnNaveCommLogoutSuccess(true);

      loginLogOutButtons?.forEach((item) => {
        item.classList.add('m-signup--loading');
      });
    }
  };

  useEffect(() => {
    const parent = getParent();
    if (userIsLoggedIn) {
      // Adding click event listener to anchors
      // when user is logged in
      parent.addEventListener('click', onLogOutClick);
    }

    return () => {
      if (userIsLoggedIn) {
        parent.removeEventListener('click', onLogOutClick);
      }
    };
  }, [authContext?.loggingOut]);

  useEffect(() => {
    const parent = getParent();
    parent.classList.add('d-block');
    if (userIsLoggedIn) {
      const logInLinkIcon = parent.querySelector('.abt-icon');
      const logInLinkText = parent.querySelector('.a-link__inner-text');

      parent.setAttribute('href', 'javascript:void(0);');
      logInLinkIcon.classList.add('abt-icon-logout');
      logInLinkText.innerHTML = t('log-out');

      // Show My Account Link beside log out link
      const closestContainer = parent.closest('.container');
      const myAccountLink = closestContainer.querySelector('.js-myaccount');
      myAccountLink.classList.add('d-block');
    }
  }, []);

  return (
    <span className="a-link__loader" ref={logInLinkContainer}>
      <LoadingIndicator />
    </span>
  );
}

export default LogInLink;
