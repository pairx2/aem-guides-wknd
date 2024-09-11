/**
 * @function
 * Summary: Encrypt and Store Data in SessionStorage
 * Parameters: obj {Object}
 */
 function setUsObj(obj) {

  let tempK = getenKy(obj.email);
  setCookie('pk', tempK, 1, true);

  let logInObj = {
    'title': getLoginObj(obj.title),
    'firstName': getLoginObj(obj.firstName),
    'lastName': getLoginObj(obj.lastName),
    'phoneNumber': getLoginObj(obj.phoneNumber),
    'email': getLoginObj(obj.email),
    'validationType':getLoginObj(obj.validationType),
    'rppsNumber':getLoginObj(obj.rppsNumber),
    'invitationCode':getLoginObj(obj.invitationCode),
    'territoryOfExcercise':getLoginObj(obj.territoryOfExcercise),
    'speciality':getLoginObj(obj.speciality),
    'territoryZipCode':getLoginObj(obj.territoryZipCode),
  };

   if(logInObj.firstName !== "") {
  let userInitial = logInObj.firstName.charAt(0).toUpperCase() || "";
  setCookie('usFn', userInitial, 1, true);
}

  if (logInObj.firstName !== "" && logInObj.lastName !== "") {
    let tempUsObj = encryptData(logInObj);
    setCookie('usObj', tempUsObj, 1, true);      
  }

  let userConsent = obj.consents || [];
  if (Array.isArray(userConsent) && userConsent.length > 0) {
    let tempUsCon = encryptData(userConsent);
    setCookie('usCon', tempUsCon, 1, true);
  } 

  function getLoginObj(objName,defaultValue = ''){
    return objName || defaultValue
  }
  

  return true;
}
