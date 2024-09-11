/* Glucerna popup */

$("#glucernacom-alert").click(function () {
    if (confirm("Links which take you out of Abbott Laboratories worldwide\nweb site are not under the control of Abbott Laboratories,\nand Abbott Laboratories is not responsible for the contents\nof any such site or any further link from such site. Abbott\nLaboratories is providing these links to you only as a\nconvenience, and the inclusion of any link does not imply\nendorsement of the linked site by Abbott Laboratories.\n\n Do you wish to leave this site?")) {
        window.open("https://www.glucerna-great-savings.com/home?cid=tag-referral-an-glu-326&utm_campaign=glu-program-30&utm_medium=tag-referral&utm_source=glu-program-30-website&utm_content=glu-microsite-buttons&utm_term=redeem-now", "_blank", "noopener");
    } else {
        return false;
    }
});

$(function () {

    // to add popup class to modal
    if ($('#section-site-alert').length) {
        setTimeout(function () {
            $('.container #section-site-alert').each(function () {
                let modal = $(this).parents('.modal');
                if (modal.length) {
                    modal.addClass("modal-site-leaving");
                }
            });
        }, 1000);
    }
});