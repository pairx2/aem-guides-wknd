$(document).ready(function () {
    $("#ph-formula-finder-results").find("div[id^='ph']").hide();
    let productId = sessionStorage.getItem("productId");
    let resultId =  "ph-product-"+productId;
    $("#"+resultId).show();
});