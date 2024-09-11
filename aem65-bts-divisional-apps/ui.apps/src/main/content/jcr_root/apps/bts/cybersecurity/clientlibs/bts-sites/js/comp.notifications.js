/**
 * @module
 * @desc Notifications Module
 */


(function () {

    document.addEventListener('DOMContentLoaded', function () {
        let isEmailSubscribed = sessionStorage.getItem('isEmailSubscribed');
        let emailSubscriptionLink = $(document).find('#manage-email-notification');

        if (emailSubscriptionLink.length && isEmailSubscribed) {

            /* Post modal availability, set the user email subscription preference in the manage email notification modal */
            isModalAvailable(function() {
                let emailSubscriptionModal = $(document).find('#manage-email-notification-modal');
                let emailSubscriptionCheckbox = emailSubscriptionModal.find('.form-container .options .checkbox .a-checkbox__input');
                if (JSON.parse(isEmailSubscribed)) {
                    !emailSubscriptionCheckbox.is(':checked') && emailSubscriptionCheckbox.trigger('click');
                } else {
                    emailSubscriptionCheckbox.is(':checked') && emailSubscriptionCheckbox.trigger('click');
                }
            });
        }
    });
})();
