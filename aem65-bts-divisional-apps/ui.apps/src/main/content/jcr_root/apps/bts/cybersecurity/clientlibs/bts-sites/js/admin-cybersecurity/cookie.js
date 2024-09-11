/**
 * @function
 * Summary: Function to set cookie
 * Parameters:  cname {String} cookie name, cvalue {String} cookie cvalue,
 *              exdays {Number} cookie expiry in days
 *              isLang {Boolean} flag to append country-lang in the cookie name.
 */
function setCookie(cname, cvalue, exdays, isLang = false) {
  let expires = "", cnameN = cname, cpath = "/";
  if (exdays !== '') {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    expires = "expires=" + d.toUTCString();
  }
  if (isLang) {
    let xLangCode = $('[name="x-preferred-language"]').val();
    cnameN = (xLangCode !== '' && cname.indexOf(xLangCode) === -1) ? (cname + '_' + xLangCode) : cname;

    let counLang = getCountryLang();
    cpath = !counLang ? '/' : `/${counLang}`;
  }

  document.cookie = `${cnameN}=${cvalue};${expires};path=${cpath};Secure;`;
}

/**
 * @function
 * Summary: Function to get cookie string value
 * Parameters:  cname {String} cookie name, 
 *              isLang {Boolean} flag to append country-lang in the cookie name.
 */
function getCookie(cname, isLang = false) {
  let name = cname + "=";

  if (isLang) {
    let xLangCode = $('[name="x-preferred-language"]').val();
    name = (xLangCode !== '' && cname.indexOf(xLangCode) === -1) ? (cname + '_' + xLangCode + "=") : (cname + "=");
  }

  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (const i in ca) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

/**
 * @function
 * Summary: Function to delete cookie
 * Parameters:  cname {String} cookie name, 
 *              isLang {Boolean} flag to append country-lang in the cookie name.
 */
function deleteCookie(name, isLang = false) {
  let newName = name, cpath = "/";
  if (isLang) {
    let xLangCode = $('[name="x-preferred-language"]').val();
    newName = (xLangCode !== '' && name.indexOf(xLangCode) === -1) ? (name + '_' + xLangCode) : name;

    let counLang = getCountryLang();
    cpath = !counLang ? '/' : `/${counLang}`;
  }
  document.cookie = `${newName}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=${cpath};Secure;`;
}
