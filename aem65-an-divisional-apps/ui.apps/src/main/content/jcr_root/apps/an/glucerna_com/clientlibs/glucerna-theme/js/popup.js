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
    $(".glucerna-alert").click(function(){
        if(confirm("Links which take you out of Abbott Laboratories worldwide\nweb site are not under the control of Abbott Laboratories,\nand Abbott Laboratories is not responsible for the contents\nof any such site or any further link from such site. Abbott\nLaboratories is providing these links to you only as a\nconvenience, and the inclusion of any link does not imply\nendorsement of the linked site by Abbott Laboratories.\n\n Do you wish to leave this site?")){
            let redirectUrl = $(this).attr("href");
            window.open(redirectUrl,"_blank");
        }else{
              return false;
        }
    });
});


