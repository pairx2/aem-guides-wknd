import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  getLocalContextStoreName,
  onAEMauthor,
  isSessionExpired,
} from '../utils/common';
import commonConst from '../constants/commonConts';

const AuthContext = React.createContext({});

function AuthProvider(props) {
  const localState =
    JSON.parse(
      localStorage.getItem(
        getLocalContextStoreName(commonConst.AUTH_LOCAL_STORAGE)
      ) || null
    ) || null;
  const [authContext, setAuthContext] = useState(localState);
  const { children } = props;

  const redirectToLoginPage = () => {
    const { loginPage = '/' } = document.querySelector('body')?.dataset;
    window.location.replace(loginPage);
  };

  useEffect(() => {
    localStorage.setItem(
      getLocalContextStoreName(commonConst.AUTH_LOCAL_STORAGE),
      JSON.stringify(authContext) || null
    );
  }, [authContext]);

  useEffect(async () => {
    const idToken = authContext?.jwtToken?.id_token;
    const sessionTimestamp = localStorage.getItem(
      commonConst.SESSION_EXPIRED_MODAL
    );
    const isSecurePath = /secure/.test(window.location.href);

    if (idToken && sessionTimestamp && isSessionExpired()) {
      /*
       *   Logging out and redirecting to the login page if:
       *   - User is `logged in` but session has expired (session is older than 13 minutes)
       */
      await OnNaveCommLogoutSuccess();
      redirectToLoginPage();
    } else if (!idToken && isSecurePath && !onAEMauthor()) {
      /*
       *   Redirecting user to login page if:
       *   - user isn't `logged in` and
       *   - user is in a `/secure` path url
       *   - it will not redirect if we are in author edit mode page
       */
      redirectToLoginPage();
    }
  }, []);

  return (
    <AuthContext.Provider value={[authContext, setAuthContext]}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
