import debounce from 'lodash.debounce';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import commonConst from '../../constants/commonConts';
import { AuthContext } from '../../context/AuthContext';
import {
  getURLParams,
  isLoggedIn,
  lessThanMinutesAgo,
  isSessionExpired,
  shortLongUrl,
} from '../../utils/common';
import createConditionalEvent from '../../utils/conditional';
import Modal from '../molecules/Modal';
import Button from './Button';
import LoadingIndicator from '../common/LoadingIndicator';

const SessionExpiredModal = () => {
  const { t } = useTranslation();
  const { loginPage = '/', logoutRedirectPage = '/' } = document.querySelector(
    'body'
  )?.dataset;
  const modalDurationInMinutes = 2;

  const [intervalId, setIntevarlId] = useState();
  const [clearIntervalId, setClearIntervalId] = useState();
  const [twoMinutesCounter, setTwoMinutesCounter] = useState('02:00');
  const [authContext, setAuthContext] = useContext(AuthContext);
  const userIsLoggedIn = isLoggedIn(authContext);
  const timerModalButtonRef = useRef(null);
  const staleSessionButtonRef = useRef(null);
  const [counterIntevalId, setCounterIntervalId] = useState();
  const [staySignedInIsLoading, setStaySignedInIsLoading] = useState();
  const [cancelIsLoading, setCancelIsLoading] = useState();

  /*
   * On Cancel, log out user and take him to home page
   */
  const onCancel = () => {
    localStorage.setItem(
      commonConst.SESSION_EXPIRED_ACTION_STORAGE,
      commonConst.SESSION_EXPIRED_ACTIONS.CANCEL
    );

    if (counterIntevalId) {
      clearInterval(counterIntevalId);
    }

    onCancelAction();
  };

  const onCancelAction = () => {
    setCancelIsLoading(true);
    OnNaveCommLogoutSuccess(logoutRedirectPage);
  };

  /*
   * On Stay Signed in, make session call and dissmiss modal
   */
  const onStaySignedIn = async () => {
    localStorage.setItem(
      commonConst.SESSION_EXPIRED_ACTION_STORAGE,
      commonConst.SESSION_EXPIRED_ACTIONS.STAY
    );

    if (counterIntevalId) {
      clearInterval(counterIntevalId);
    }

    setStaySignedInIsLoading(true);
    const { status } = await handleExtendSession();

    if (status) {
      onStaySignedInAction();
      setStaySignedInIsLoading(false);
    } else {
      onRedirectToSiginAction();
    }
  };

  const onStaySignedInAction = () => {
    window.removeEventListener('storage', onModalAction);
    document
      .querySelector(
        `#${commonConst.SESSION_EXPIRED_MODAL} .generic-modal--close`
      )
      .click();
    document
      .querySelector('body')
      .classList.remove(commonConst.SESSION_EXPIRED_MODAL);
    setTimer();
    setEventListeners();
    setTwoMinutesCounter('02:00');

    /*
     * Deleting expired action on stay sign in
     */
    setTimeout(() => {
      localStorage.removeItem(commonConst.SESSION_EXPIRED_ACTION_STORAGE);
    }, 500);
  };

  const onRedirectToSigin = () => {
    localStorage.setItem(
      commonConst.SESSION_EXPIRED_ACTION_STORAGE,
      commonConst.SESSION_EXPIRED_ACTIONS.TO_SIGN_IN
    );
    onRedirectToSiginAction();
  };

  const onRedirectToSiginAction = () => {
    OnNaveCommLogoutSuccess(`${shortLongUrl(loginPage)}?sessionExpired=true`);
  };

  /*
   * Showing modal to customer
   */
  const showModal = () => {
    document
      .querySelector('body')
      .classList.add(commonConst.SESSION_EXPIRED_MODAL);
    timerModalButtonRef.current.click();

    // Calculate the future timestamp of when session will expire:
    const minutesFromNow =
      new Date().getTime() + 60 * modalDurationInMinutes * 1000;

    startInsideModalCounter(minutesFromNow);
  };

  /*
   * Main Timer that runs every 10 seconds to check
   * if last customer interaction time was {13} minutes ago
   */
  const setTimer = () => {
    localStorage.setItem(commonConst.SESSION_EXPIRED_MODAL, Date.now());

    let newIntervalId = setInterval(() => {
      // if interaction was less than 13 minutes ago, clear interval
      if (isSessionExpired()) {
        clearInterval(newIntervalId);
        setClearIntervalId(true);
        return;
      }

      // if a sessionTimeStamp exist and it is not less than 55 minutes
      // call session to keep it open
      const sessionTimeStamp = JSON.parse(
        localStorage.getItem(commonConst.EXTEND_SESSION_TIMESTAMP)
      );

      if (sessionTimeStamp && !lessThanMinutesAgo(sessionTimeStamp, 55)) {
        setSession(true);
        handleExtendSession();
        // update session time stamp just in case, to avoid infinite loops
        // in case setSession call takes more than 10 seconds
        // and interval runs again
        localStorage.setItem(commonConst.EXTEND_SESSION_TIMESTAMP, Date.now());
      }
    }, 10000);

    setIntevarlId(newIntervalId);
    setClearIntervalId(false);
  };

  /*
   * Function that is going to run on every mouse or keyword event.
   * Debounce of 5 seconds used to avoid performance issues
   */
  const updateTimeStamp = useMemo(
    () =>
      debounce(() => {
        localStorage.setItem(commonConst.SESSION_EXPIRED_MODAL, Date.now());
      }, 5000),
    []
  );

  const setEventListeners = () => {
    window.addEventListener('mousemove', updateTimeStamp);
    window.addEventListener('scroll', updateTimeStamp);
    window.addEventListener('keydown', updateTimeStamp);
  };

  const removeEventListeners = () => {
    window.removeEventListener('mousemove', updateTimeStamp);
    window.removeEventListener('scroll', updateTimeStamp);
    window.removeEventListener('keydown', updateTimeStamp);
  };

  /*
   * On Modal Action
   */
  const onModalAction = () => {
    const sessionAction = localStorage.getItem(
      commonConst.SESSION_EXPIRED_ACTION_STORAGE
    );

    switch (sessionAction) {
      case commonConst.SESSION_EXPIRED_ACTIONS.CANCEL:
        onCancelAction();
        break;

      case commonConst.SESSION_EXPIRED_ACTIONS.STAY:
        onStaySignedInAction();
        break;

      case commonConst.SESSION_EXPIRED_ACTIONS.TO_SIGN_IN:
        onRedirectToSigin();
        break;
    }
  };

  const handleExtendSession = async () => {
    const response = await extendSession(true);

    // Storing new ecommToken and jwtToken sent by BE
    if (response?.response?.id_token) {
      setAuthContext({
        ...authContext,
        accountInfo: {
          ...authContext?.accountInfo,
          userInfo: {
            ...authContext?.accountInfo?.userInfo,
            additionalProperties: {
              ...authContext?.accountInfo?.userInfo?.additionalProperties,
              ecommToken:
                response?.response?.ecommToken ||
                authContext?.accountInfo?.userInfo?.additionalProperties
                  ?.ecommToken,
            },
          },
        },
        jwtToken: {
          ...authContext?.jwtToken,
          id_token: response.response.id_token,
        },
      });
    }

    return response;
  };

  // On authContext change
  useEffect(() => {
    if (userIsLoggedIn) {
      setTimer();
      setEventListeners();
    } else if (intervalId) {
      clearInterval(intervalId);
      removeEventListeners();
    }
  }, [authContext]);

  // Showing Modal
  useEffect(() => {
    if (clearIntervalId && intervalId) {
      showModal();
      clearInterval(intervalId);
      removeEventListeners();
    }
  }, [clearIntervalId]);

  /*
   * On Load
   */
  useEffect(() => {
    localStorage.removeItem(commonConst.SESSION_EXPIRED_ACTION_STORAGE);

    if (userIsLoggedIn && isSessionExpired()) {
      // Open modal indicating session has already expired
      staleSessionButtonRef.current.click();
    }
  }, []);

  /*
   * Subscribing to storage change event
   */
  useEffect(() => {
    window.addEventListener('storage', onModalAction);
    return () => {
      window.removeEventListener('storage', onModalAction);
    };
  }, [counterIntevalId]);

  /*
   * Check if login page has sessionExpired query attribute
   */
  useEffect(() => {
    const { sessionExpired } = getURLParams(window.location.search);

    if (sessionExpired) {
      const loginCredentialsErrorEvent = createConditionalEvent(
        'server',
        'LoginError'
      );
      window.dispatchEvent(loginCredentialsErrorEvent);

      document.querySelector(
        "[data-conditional-case='server'] .m-alert__para"
      ).innerText = t('you-have-been-logged-out');
    }
  }, []);

  /*
   * Counter inside modal
   * - Recalculate remaining time every 500ms to prevent skipping seconds
   */
  const startInsideModalCounter = (logoutTimestamp) => {
    let minutes, seconds;

    const insideModalTimer = setInterval(() => {
      const now = new Date();
      const remainingSeconds = Math.floor((logoutTimestamp - now) / 1000);

      minutes = parseInt(remainingSeconds / 60, 10);
      seconds = parseInt(remainingSeconds % 60, 10);

      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;

      setTwoMinutesCounter(minutes + ':' + seconds);

      // Redirect user to log in page if user doesn't do anything on modal after two minutes
      if (remainingSeconds <= 0) {
        clearInterval(insideModalTimer);
        onRedirectToSigin();
      }
    }, 500);

    setCounterIntervalId(insideModalTimer);
  };

  /*
   * Modal displayed on page load if session has previously expired
   * This indicates that user has been logged out and will be redirected
   */
  const staleSessionModal = (
    <>
      <Modal id="stale-session-modal" hideCloseIcon={true}>
        <h4>
          <i className="abt-icon abt-icon-information" />{' '}
          {t('you-have-been-logged-out-inactivity')}
        </h4>
        <LoadingIndicator />
      </Modal>
      <button
        ref={staleSessionButtonRef}
        className={`d-none js-stale-session-modal`}
        data-toggle="modal"
        data-target={`#stale-session-modal`}
      >
        {' '}
      </button>
    </>
  );

  return (
    <>
      <Modal id={commonConst.SESSION_EXPIRED_MODAL} hideCloseIcon={true}>
        <h4>
          <i className="abt-icon abt-icon-exclamation text-danger" />{' '}
          {t('you-logged-out-inactivity')}
        </h4>
        <p>{t('to-continue-click-stay-signed-in')}</p>

        <p>{twoMinutesCounter}</p>

        <div className="text-right">
          <div className="d-inline-flex">
            <Button
              text={t('cancel')}
              onClick={onCancel}
              buttonStyle="secondary"
              buttonClasses={cancelIsLoading && 'a-button--spinner'}
              iconClass={cancelIsLoading && 'spinner'}
            />
            <Button
              text={t('stay-signed-in')}
              onClick={onStaySignedIn}
              buttonStyle="primary"
              buttonClasses={`ml-2 ${
                staySignedInIsLoading && 'a-button--spinner'
              }`}
              iconClass={staySignedInIsLoading && 'spinner'}
            />
          </div>
        </div>
      </Modal>
      <button
        ref={timerModalButtonRef}
        className={`d-none js-${commonConst.SESSION_EXPIRED_MODAL}`}
        data-toggle="modal"
        data-target={`#${commonConst.SESSION_EXPIRED_MODAL}`}
      >
        {' '}
      </button>
      {staleSessionModal}
    </>
  );
};

export default SessionExpiredModal;
