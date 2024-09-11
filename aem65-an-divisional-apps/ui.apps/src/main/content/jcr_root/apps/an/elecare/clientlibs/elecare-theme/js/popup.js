$(document).ready(function () {
    $(document).on('click', '#siteEntryPopUp-modal .generic-modal--close', function() {
        $('#siteEntryPopUp-modal').css('display','none');
        localStorage.setItem('popupclose', 'true');
    });
    $(document).on('click', '#siteEntryPopUp-modal #sign-up', function() {
        localStorage.setItem('visited-for-day', 'true');
        $('#siteEntryPopUp-modal').css('display','none');
    });
    $(document).on('click', '#siteEntryPopUp-modal #already-member, #siteEntryPopUp-modal #donot-show', function() {
        localStorage.setItem('alreadymem', 'true');
        $('#siteEntryPopUp-modal').css('display','none');
    });
    if (isOnPublish()) {
        let member = localStorage.getItem('alreadymem');
        let visitedDay = localStorage.getItem('visited-for-day');
        let popupclose = localStorage.getItem('popupclose');
        if (!member && !visitedDay && !popupclose) {
            $('#siteEntryPopUp-modal').css('display','block');
        }
    }
});


