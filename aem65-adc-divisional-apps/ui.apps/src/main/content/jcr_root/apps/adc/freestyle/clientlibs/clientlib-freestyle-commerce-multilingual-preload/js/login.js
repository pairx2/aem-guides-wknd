let rewriteLogin = {};

rewriteLogin.onSuccessMyFreestyleUserLogin = () => {
  if (onSuccessMyFreestyleUserLogin && typeof onSuccessMyFreestyleUserLogin === 'function') {
    const fidelisLogin = onSuccessMyFreestyleUserLogin;
    onSuccessMyFreestyleUserLogin = function (data) {
      if (data.errorCode == 0) {
        let preferredLang = data.response && data.response.preferredLanguage;
        if (preferredLang) {
          setCookie('x-preferred-language', data.response.preferredLanguage);
        }
      }
      fidelisLogin(data);
    }
  }
};

rewriteLogin.onSuccessMyFreestyleUserLogin();
