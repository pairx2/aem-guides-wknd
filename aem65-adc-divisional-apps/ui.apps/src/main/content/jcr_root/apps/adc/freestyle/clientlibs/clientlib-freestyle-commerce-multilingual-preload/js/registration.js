  let rewriteRegistration = {};

  rewriteRegistration.updateRequestUserRegistration = () => {
    if (updateRequestMyFreestyleUserRegistration && typeof updateRequestMyFreestyleUserRegistration === 'function') {
      const fidelisRegistration = updateRequestMyFreestyleUserRegistration;
      updateRequestMyFreestyleUserRegistration = function (data) {
        const preferredLang = $('[name="x-preferred-language"]').val();
        let newData = data; 
        if (newData && !!preferredLang) {
          newData.body.userInfo['preferredLanguage'] = preferredLang;
        }
        fidelisRegistration(newData);
      }
    }
  };

  rewriteRegistration.updateRequestUserRegistration();
