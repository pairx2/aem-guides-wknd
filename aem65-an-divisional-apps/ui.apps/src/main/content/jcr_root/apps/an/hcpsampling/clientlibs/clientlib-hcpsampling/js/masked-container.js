/**
 * Masked Container
 */
$(document).ready(function() {
    if ($(".m-masked-container").length) {
        if (isUserLoggedIn()) {
            $(".m-masked-container").removeClass("masked");
        } else {
            $(".m-masked-container").addClass("show-login");
        }

        $("body").on("an-hcpsampling:login", function(e, data) {
            $(".m-masked-container").removeClass("masked");
        });
    }
});