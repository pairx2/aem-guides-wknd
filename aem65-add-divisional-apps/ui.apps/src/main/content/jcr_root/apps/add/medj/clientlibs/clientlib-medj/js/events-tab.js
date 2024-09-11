var EventsShanonLoginRedirection = null;
var EventsShanonLink = null;

function eventsTabContentLinkAction() {
    var eventsTabContentWrap = document.querySelector('#events-tab-content-wrap');
    
    eventsTabContentWrap.querySelectorAll('.text h5').forEach(linkItems => {
        linkItems.addEventListener('click', function(event) {
            event.preventDefault();
            var isLoginValid = UserLoginValidCheck();
            var eventLink = event.target.parentElement.parentNode.previousElementSibling.querySelector('input[name="event-link"]').value;
            EventsShanonLink = eventLink;
            console.log('Event link : ' + EventsShanonLink);
            sessionStorage.setItem('EventsShanonRedirectLink', EventsShanonLink);
            if(isLoginValid) {
                EventsShanonRedirectionForm();
            }
            else {
                $(".loginPopupTrigger.m-popup").click();
                EventsShanonLoginRedirection = true;     
            }      
        })
    });
}

function EventsShanonRedirectionForm() {
    var eventsShanonRedirectForm = document.querySelector('#events-shanon-sso-form-wrap form');
    var eventsShanonRedirectFormUrl = eventsShanonRedirectForm.querySelector('input[name="events-shanon-sso-url"]').value;
    var eventsShanonRedirectFormVisitorData = (isSubdomain()) ? eventsShanonRedirectForm.querySelector('input[name="Public::Application::User_D__P__D_VisitorData.attribute74"]') : eventsShanonRedirectForm.querySelector('input[name="Public::Application::User_D__P__D_VisitorData.attribute140"]');

    var IDLinkageHashedKey = sessionStorage.getItem('IdLinkageHashedKey');
    var IdLinkageVisitorData_attribute = (isSubdomain()) ? sessionStorage.getItem('IdLinkageVisitorData_attribute74') : sessionStorage.getItem('IdLinkageVisitorData_attribute140');
    eventsShanonRedirectForm.setAttribute('method', 'POST');

    var EventShanonRedirectLink = sessionStorage.getItem('EventsShanonRedirectLink');
    sessionStorage.removeItem('EventsShanonRedirectLink');

    eventsShanonRedirectForm.setAttribute('action', eventsShanonRedirectFormUrl + '?page=auth&return_path=' + EventShanonRedirectLink + '&key_param=' + IDLinkageHashedKey);
    eventsShanonRedirectFormVisitorData.value = IdLinkageVisitorData_attribute;

    eventsShanonRedirectForm.submit();
}

$(document).ready(function () {
    var eventsTabContentWrap = document.querySelector('#events-tab-content-wrap');
    if(eventsTabContentWrap) {
        eventsTabContentLinkAction();
    }    
});