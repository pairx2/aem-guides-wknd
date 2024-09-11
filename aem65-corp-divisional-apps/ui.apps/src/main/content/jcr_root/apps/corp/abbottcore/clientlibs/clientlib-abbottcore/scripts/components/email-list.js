$(window).on('load', function () {
    if ($('#user-search-form form').length && isOnPublish()) {
        $('#user-search-form').parent().addClass('d-none');
    }
    setTimeout(function () {
        if (window.location.pathname.indexOf("/manage/email-list") > -1 && isOnPublish()) {
            let tokens = getCookie("id_token");
            if (tokens) {
                const userSearchForm = $('#user-search-form')
                if (userSearchForm.length) {
                    let formSubmitButton = userSearchForm.find('.o-form-container__buttons button[type="submit"]');
                    formSubmitButton.removeAttr('disabled');
                    formSubmitButton[0].click();
                }
            }
            else {
                window.location.href = "/login/showUserLoginForm.html";
            }
        }
    }, 1000)

});