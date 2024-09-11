/* Ensure popup */

$("#ensurecom-alert").click(function(){
    if(confirm("Links which take you out of Abbott Laboratories worldwide\nweb site are not under the control of Abbott Laboratories,\nand Abbott Laboratories is not responsible for the contents\nof any such site or any further link from such site. Abbott\nLaboratories is providing these links to you only as a\nconvenience, and the inclusion of any link does not imply\nendorsement of the linked site by Abbott Laboratories.\n\n Do you wish to leave this site?")){
        let redirectUrl = $("#ensurecom-alert").attr("href");
        window.open(redirectUrl,"_blank");
    }else{
		  return false;
    }
});

$(function () {
if ( $('.container.container--hcp-auth').length) {
        setTimeout(function () {
            $('.container.container--hcp-auth').each(function () {
                let modal = $(this).parents('.modal');
                if (modal.length) {
                    modal.addClass('modal--hcp-auth');
                }
            });
        }, 1000);
    }

     // to add popup class to modal
    if ($('#section-site-alert').length) {
        setTimeout(function () {
            $('.container #section-site-alert').each(function () {
                let popup = $(this).parents('.modal');
                if (popup.length) {
                    popup.addClass("modal-site-leaving");
                }
            });
        }, 1000);
    }
});