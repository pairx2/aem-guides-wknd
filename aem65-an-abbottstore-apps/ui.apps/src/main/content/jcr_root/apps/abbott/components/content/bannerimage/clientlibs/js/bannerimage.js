jQuery(document).ready(function() {
    if (document.getElementById('img-link')) {
        var existingUrl = jQuery('#img-link').prop('href').split('/');
        var newPathname = "";
        for (var i = 0; i < existingUrl.length; i++) {
            if (!(jQuery.cookie('wcmmode') == "edit" || jQuery.cookie('wcmmode') == "preview")) {
                if (existingUrl[i] == 'content' || existingUrl[i] == 'abbott' || existingUrl[i] == 'en' || existingUrl[i] == 'en.html') {
                    //console.log("skipping " + existingUrl[i]);
                } else {
                    if (i != 0) {
                        newPathname += "/";
                    }
                    newPathname += existingUrl[i];
                }
            }
        }
    }
    jQuery("#img-link").attr("href", newPathname);
});