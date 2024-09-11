/**
 * Global Code
 **/

 let pk, usObj, usCon, mrdObj;

 /**
  * @function
  * Summary: Function to fetch user data from cookies
  * Parameters: -
  */
 function setSessionValues() {
   pk = getCookie('pk', true);
   usObj = getCookie('usObj', true);
   usCon = getCookie('usCon', true);
   mrdObj = getCookie('mrdObj', true);
 }
 
 setSessionValues();
 