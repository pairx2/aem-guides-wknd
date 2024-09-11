      window.onload = function(){
        getCookieData();
      }

      // set cookie data
      function saveCookieData(){
        let now = new Date();
        let time = now.getTime();

        // set expire time
        time += 1 * 24 * 60 * 60 * 1000; // days, hours, minutes, seconds, milliseconds

        now.setTime(time);
        document.cookie = "cookieDisclaimerAgree=true;expires="+now.toUTCString()+";max-age="+ now.toUTCString();
        jQuery('.cookie-banner').hide();

      }

      // check browser cookies and find disclaimer
      function getCookieData(){
        if(checkCookieExistance('cookieDisclaimerAgree')){ // if cookies exist
          	 jQuery('.cookie-banner').hide();
         }else{ // if cookies not exist
             jQuery('.cookie-banner').show();
         }
      }

