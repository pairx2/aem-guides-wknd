(function ($) {
    let siteEnteringCookie = 'site-entering-consent';
    $(document).ready(function () {
        let siteEnteringPopup = $('[data-site-entering-popup-required="true"]');
        siteEnteringPopup.attr('data-site-entering-popup-required', "false");
        if(!getCookie(siteEnteringCookie)) {
            siteEnteringPopup.show();
        }
        siteEnteringPopup.find('#continue-btn').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            setCookie(siteEnteringCookie, true, 0);
            siteEnteringPopup.hide();
        });
    });

    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            if (days == 0) {
                expires = "; expires=0"
            } else {
                let date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }
    function getCookie(name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for(let co of ca) {
            let c = co;
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
})(jQuery);