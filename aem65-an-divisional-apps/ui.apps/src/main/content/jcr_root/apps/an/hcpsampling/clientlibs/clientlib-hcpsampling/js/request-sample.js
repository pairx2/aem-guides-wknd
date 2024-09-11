let productImage, productName;

$(document).ready(function () {
    let sampleForm = $("#requestSampleForm");

    if (sampleForm.length) {
        // check to see if user is logged in, if so pre-fill My Account form fields
        productImage = decodeBase64(getUrlParameter('productImage'));
        productName = decodeBase64(getUrlParameter('productName'));
        let gratisId = decodeBase64(getUrlParameter('gratisId'));
        let brandId = decodeBase64(getUrlParameter('brandId'));

        $("[name=recommendedProduct]").val(gratisId);
        $("[name=brandId]").val(brandId);

        let userInfo = getLocalStorage("userInfo");
        $("[name=sfdcId]").val(userInfo?.additionalProperties?.sfdcId);

        let textParent = sampleForm.find(".text:eq(0)");
        let img = $("<img>");
        img.attr("src", productImage);
        img.attr("alt", productName);

        textParent.html(textParent.html().replaceAll("{productName}", productName).replaceAll("{productImage}",img[0].outerHTML));
    }

    let sampleSuccessful = $("#requestSampleSuccessful");

    if (sampleSuccessful.length) {
        // check to see if user is logged in, if so pre-fill My Account form fields
        productImage = decodeBase64(getUrlParameter('productImage'));
        productName = decodeBase64(getUrlParameter('productName'));
        let consumerEmail = decodeBase64(getUrlParameter('consumerEmail'));

        let textParent = sampleSuccessful.find(".text:eq(0)");
        let img = $("<img>");
        img.attr("src", productImage);
        img.attr("alt", productName);

        textParent.html(textParent.html().replaceAll("{productName}", productName).replaceAll("{productImage}",img[0].outerHTML));
        $("[name=consumerEmail]").val(consumerEmail);
    }
});