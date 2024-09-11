jQuery(document).ready(function() {
    var dialogCookie = jQuery.cookie('abt_dialogMessage');
	if (typeof dialogCookie === "string") {
        dialogCookie = JSON.parse(dialogCookie)
    }
    if (dialogCookie != undefined) {
        jQuery('#magento-message').html(dialogCookie.message);
        jQuery('#cart-link').attr('href', dialogCookie.buttons[0].link);
        jQuery('#cart-link').html(dialogCookie.buttons[0].label);
        jQuery("#cartupdate-popup").fadeIn();
        jQuery.cookie('abt_dialogMessage', '', { expires: -1, path: '/', domain:'.abbottstore.com'});
    }
    jQuery(
        "#cartupdate-popup .modal-close, #cartupdate-popup .modal-submit, #cartupdate-popup .close-link"
    ).on("click", function(e) {
        jQuery("#cartupdate-popup").fadeOut();
        jQuery(".modal-backdrop.show").remove();
    });
});