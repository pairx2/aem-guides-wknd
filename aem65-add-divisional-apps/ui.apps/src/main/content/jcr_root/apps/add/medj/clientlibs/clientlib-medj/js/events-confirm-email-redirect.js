function eventConfirmEmailRedirect() {
    var myEventsUrlPath = document.querySelector('input[name="shanon-my-events-url-bind"]').value;
    var eventsConfirmEmailRedirectLoginInfo = document.querySelector('#events-confirm-email-redirect-login-info');
    var eventsConfirmEmailRedirectInfoLoader = document.querySelector('#events-confirm-email-redirect-info-loader');
    if(UserLoginValidCheck()) {
        eventsConfirmEmailRedirectLoginInfo.style.display = 'none';        
        sessionStorage.setItem('EventsShanonRedirectLink', myEventsUrlPath);
        EventsShanonRedirectionForm();
    }
    else {
        eventsConfirmEmailRedirectInfoLoader.style.display = 'none';
        sessionStorage.setItem('EventsShanonRedirectLink', myEventsUrlPath);
        var EventsShanonLoginRedirection = true;
        setTimeout(function() {
            $(".loginPopupTrigger.m-popup").click();
        }, 3600);        
    }
}

$(document).ready(function () {
    if(typeof typeof Granite === 'undefined' ||  typeof Granite.author === 'undefined'){
        if(document.getElementById('events-confirm-email-redirection-wrap')) {
            eventConfirmEmailRedirect();
        }
    }
});