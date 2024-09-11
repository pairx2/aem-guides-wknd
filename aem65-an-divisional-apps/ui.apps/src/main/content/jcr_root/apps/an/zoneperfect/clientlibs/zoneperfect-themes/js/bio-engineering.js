jQuery(document).ready(function() {
    jQuery("#rectangle").on("click", function() {
        window.location = "/home.html"
    });
    jQuery("#learn-more").on("click", function() {
        sessionStorage.setItem("clickFromBEPage", true)
    })
});