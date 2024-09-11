$(document).ready(function () {
    let countryCode;
    let pageName;

    if ($('input[name=x-country-code]').attr('value')) {
        countryCode = $('input[name=x-country-code]').attr('value').toLowerCase();
    }
    else {
        countryCode = 'us';
    }

    if($('input[name=x-application-id]').attr('value')) {
        // truncate 'an' from x-application-id value to get page name. 
        pageName = $('input[name=x-application-id]').attr('value').substring(2);
    } else {
        pageName = 'an';
    }

    let cookieKey = 'policy_cookies_' + countryCode + '_' + pageName;
    let cookieAgree = getCookie(cookieKey);
    if (cookieAgree != "") {
        $('.a-container--cookie-policy').css("display", "none");
    } else {
        $('.a-container--cookie-policy').css("display", "block");
    }

    $(".a-container--cookie-policy .button").click(function () {
        setCookie(cookieKey, 'yes', 365);
        $('.a-container--cookie-policy').css("display", "none");
    });

    // Create cookie
    function setCookie(cname, cvalue, exdays) {
        let d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    // Read cookie
    function getCookie(cname) {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for (let i in ca) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
});
