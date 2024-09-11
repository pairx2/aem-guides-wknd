


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