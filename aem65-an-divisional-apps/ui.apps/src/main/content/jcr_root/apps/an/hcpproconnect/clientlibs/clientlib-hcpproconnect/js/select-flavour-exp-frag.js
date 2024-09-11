let magnifyFlag = false;
let isClickQuantityOption = false;
let isClickFlavourOption = false;
let orderLineItemTypeId = $("#order-line-item-type-id").val();
let cartPopupTime = $("#cart-popup-time-sec").val() ? $("#cart-popup-time-sec").val() : "6";
let totalSamples = 0;
const maxSample = parseInt($("#cart-total-samples-max").val());
function disableFlag(){
    if($("#dropdown_label_flavourOption").siblings('ul').length < 1) {
        //create ul if not exist
        $("#flavourOption-options").find('.a-dropdown__field')
            .append('<ul id="flavourOption" class="a-dropdown__menu" name="flavourOption'
            + 'aria-labelledby="field_label_flavourOption" aria-expanded="false">');
    }
    $("#dropdown_label_quantityOption").parent().removeClass("disabled-dropdown").addClass("disabled-dropdown");
}
function popupFlag(){
    $("html").css('overflow', 'hidden');
    $("#clickSignUpPopupSampleRequest-modal").addClass('show').attr("aria-modal", "true").show();

    if ($(".modal-backdrop").length > 0) {
        $(".modal-backdrop").addClass('show').show();
    } else {
        $("body").append('<div class="modal-backdrop show"></div>');
    }
}
function productTmp(){
    if($("#productImageContent .slick-dots").length > 0) {
        $("#productImageContent").find('.slick-slide.slick-current.slick-active')
                        .find('img').parent().attr("id","imageHolder");
        $("#productImageContent").find('.slick-slide.slick-current.slick-active')
                        .find('img')
                        .attr("id","imageTmpID");
          $("#productImageContent .slick-dots").parent().append('<div id="magnifier-container">'
                        + '<span data-search-click="click" class="a-search--icon-left">'
                        + '<em class="abt-icon abt-icon-search" id="magnifier"></em></span></div>');
    } else {
        $("#productImageContent").find('.slick-slide.slick-current.slick-active')
                        .find('img').parent().attr("id","imageHolderSingleImage");
        $("#productImageContent").find('.slick-slide.slick-current.slick-active')
                        .find('img')
                        .attr("id","imageTmpIDSingleImage");
        $("#productImageContent .slick-list.draggable").after('<div id="magnifier-container">'
                              + '<span data-search-click="click" class="a-search--icon-left">'
                              + '<em class="abt-icon abt-icon-search" id="magnifier"></em></span></div>');
    }

    $("#magnifier").click(function(e){
        e.preventDefault();
        if(magnifyFlag) {
            $(".glass").hide();
            magnifyFlag = false;
            $("#magnifier").css("color", "");
        } else {
            $(".glass").show();
            magnifyFlag = true;
            $("#magnifier").css("color", "#003087");
        }
    });
}
function recountList(quantity,addedToCart,productListNumber,cartDetails,cartValues){
    if (localStorage.hasOwnProperty("addedToCart")) {
        let cartList = localStorage.getItem("addedToCart");
        let jsonArray = JSON.parse(cartList);
        let cartItems = jsonArray.cartItems;
        let totalSampleRecount = 0;
        cartItems.forEach(function(obj) {
            if(obj.productListNumber === productListNumber) {
                quantity = parseInt(quantity) + parseInt(obj.productFlavorQuantity);
                cartDetails.sampleValue = obj.packSize;
                cartDetails.maxQty = obj.maxQty;
                addedToCart = addToCartObjectCreation(cartDetails);
                    totalSampleRecount = totalSampleRecount + addedToCart.totalUnits;
            } else {
                cartValues.push(obj);
                totalSampleRecount = totalSampleRecount + obj.totalUnits;
            }
        });
        totalSamples = totalSampleRecount;
    }
    if(!addedToCart) {
        addedToCart = addToCartObjectCreation(cartDetails);
        totalSamples += addedToCart.totalUnits;
    }

    cartValues.push(addedToCart);
     let cartItemList = {
        "cartItems" : cartValues
    }
    localStorage.setItem("addedToCart", JSON.stringify(cartItemList));
    addToCart(addedToCart);
}

function productcodecheck(){
    if($("#product-code").val() && $("#product-code").val() !== ' ') {
        getProductDetails($("#product-code").val());
    } else {
        $("#dropdown_label_flavourOption").parent().removeClass("disabled-dropdown").addClass("disabled-dropdown");
    }
}
$(document).ready(function(){
    getItemCount();
    if(isCountryCodeUK() && $("#productImageContent").length > 0) {
        $('#flavourOption-options .a-dropdown__field').after('<span class="form-text a-input-field--text-require"'
                                        + ' id="exceed-message"></span>');
        $("#exceed-message").hide();
        productcodecheck();
       

        totalSamples = getTotalSampleValues();
        $("#addToCart").addClass('color-disabled');
        $("#addToCart").parent().addClass('pointer-disabled');
        $("#flavourOption-options .form-text.a-input-field--text-require").attr("id","exceed-message");
        let header = getTitleFromMeta() ? getTitleFromMeta() : " ";
        disableFlag();


        $("#addToCart").click(function(e){
            e.preventDefault();
            if(!isUserLoggedIn()) {
               popupFlag();
            } else {
                let flavourValue = $("#flavourOption-options").find('.a-dropdown-selected').text().trim();
                let quantity = $("#quantityOption-options").find('.a-dropdown-selected').text().trim();
                let flavouredItemId = $("#flavourOption").attr('aria-activedescendant');
                let packSize = parseInt($("#"+flavouredItemId).attr('data-pack-size'));
                let maxQty = parseInt($("#"+flavouredItemId).attr('data-max-value'));
                let img = getImage(flavourValue.toLowerCase());
                let productId = $("#"+flavouredItemId).attr('data-product-id');

                let productName = $("#"+flavouredItemId).attr('data-product-name');
                let productListNumber = $("#"+flavouredItemId).attr('data-product-list-number');
                let imageURL = $("#"+flavouredItemId).attr('data-product-imageURL');
                resetDropdown();
                let cartValues = [];
                let addedToCart;

                isClickQuantityOption = false;
                isClickFlavourOption = false;
                let cartDetails = {};
                cartDetails.product = productId;
                cartDetails.quantity = quantity;
                cartDetails.img = img;
                cartDetails.flavour = flavourValue;
                cartDetails.sampleValue = packSize;
                cartDetails.maxQty = maxQty;
                cartDetails.productName = productName;
                cartDetails.productListNumber = productListNumber;
                cartDetails.header = header.toUpperCase();
                cartDetails.imageURL = imageURL;
                recountList(quantity,addedToCart,productListNumber,cartDetails,cartValues);

                
                getItemCount();

                $("#cart-popup-xf").parent().show();
                $("#cart-popup-xf").show();

                setTimeout(function () {
                    $('#cart-popup-xf').fadeOut();
                }, cartPopupTime * 1000);
            }
        });

          //set timming to load all content before appending div for magnifyer
        setTimeout(function () {
            $('#flavor-dropdown-spinner').hide();


            //add magnifier
            productTmp();
            imageOnClick();
            $(".slick-dots").bind("DOMSubtreeModified", function(e) {
                 e.preventDefault();
                reInitializeMagnifier();
            });

            productImageContentlength();

            $(".glass").hide();
        }, 1000);
    }

});
function productImageContentlength(){
    if($("#productImageContent .slick-dots").length > 0) {
        magnify("imageTmpID", 2);
    } else {
        magnify("imageTmpIDSingleImage", 2);
    }
}

/**
**  Image Magnifier
**  imgId - id of the image to be magnified
**  zoom - zoom value (int)
**/
function magnify(imgID, zoom){
    let image, glass, width, height, borderWidth;
    image = document.getElementById(imgID);
    if(image) {
    /* Create glass */
        glass = document.createElement('div');
        glass.setAttribute('class', 'glass');

        /* Insert glass */
        image.parentElement.insertBefore(glass, image);

        /* Background for glass */
        glass.style.backgroundImage = "url('" + image.src + "')";
        glass.style.backgroundRepeat = "no-repeat";
        glass.style.backgroundSize = (image.width * zoom) + "px " + (image.height * zoom) + "px";
        borderWidth = 3;
        width = glass.offsetWidth / 2;
        height = glass.offsetHeight / 2;

        /* Add mouse event */
        image.addEventListener('mousemove', moveMagnifier);
        glass.addEventListener('mousemove', moveMagnifier);

        /* Add touch event */
        image.addEventListener('touchmove', moveMagnifier);
        glass.addEventListener('touchmove', moveMagnifier);

        /* Fucntion for moving glass */
        function moveMagnifier(event){
            let position, x, y;

            /* Prevent default functions */
            event.preventDefault();

            /* Get cursor's x and y positions */
            position = getCursorPosition(event);
            x = position.x;
            y = position.y;

            /* Prevent glass from positioned outside */
            if(x > image.width - (width / zoom)){
                x = image.width - (width / zoom)
            }
            if(x < (width / zoom)){
                x = width / zoom;
            }
            if(y > image.height - (height / zoom)){
                y = image.height - (height / zoom);
            }
            if(y < (height / zoom)){
                y = height / zoom;
            }

            /* Glass position */
            glass.style.left = (x - width) + 'px';
            glass.style.top = (y - height) + 'px';

            /* Display image inside glass */
            glass.style.backgroundPosition = "-" + ((x * zoom) - width + borderWidth) + "px -" + ((y * zoom) - height + borderWidth) + "px";
        }

        /* Function for cursor position */
        function getCursorPosition(eventSecondary){
            let clientRect, x = 0, y = 0;
            eventSecondary = eventSecondary || window.addEventListener;

            /* Get position of image relative to viewport */
            clientRect = image.getBoundingClientRect();

            /* Calculate cursor's x and y coordinates relative to image */
            x = eventSecondary.pageX - clientRect.left;
            y = eventSecondary.pageY - clientRect.top;

            /* Consider any page scroll */
            x = x - window.scrollX;
            y = y - window.scrollY;

            return {x : x, y : y};
        }
    }

}

/**
** Reinitialize Magnifier
**/
function reInitializeMagnifier() {
    $("#imageTmpID").unbind('click');
    $("#imageTmpID").attr("id","");
    $("#imageHolder").attr("id","")
    $(".glass").remove();
    $("#productImageContent").find('.slick-slide.slick-current.slick-active')
        .find('img').parent().attr("id","imageHolder");
    $("#productImageContent").find('.slick-slide.slick-current.slick-active')
        .find('img')
        .attr("id","imageTmpID");
    magnify("imageTmpID", 2);
    if(magnifyFlag) {
        $(".glass").show();
    } else {
        $(".glass").hide();
    }

    imageOnClick();
}

/**
** Get image on specific flavour
**/
function getImage(flavour) {
    let element = $("#productImageContent").find('.slick-slide');
    let src = '';
    for(let i of element) {
       src = i.querySelectorAll('.cmp-image__image.a-image__default')[0].getAttribute("src");
       if(src.toLowerCase().includes(flavour)) {
            break;
       }
    }
    return src;
}

/**
**  Add to Cart Object
**/
function addToCartObjectCreation(cartDetails) {


    let addedToCart = {
        "packSize" : cartDetails.sampleValue,
        "sampleValue": cartDetails.quantity * cartDetails.sampleValue,
        "product": cartDetails.product,
        "productName": cartDetails.productName,
        "productImageUrl": cartDetails.imageURL,
        "displayImage": cartDetails.img,
        "productFlavorQuantity": cartDetails.quantity,
        "orderConfirm": false,
        "productListNumber": cartDetails.productListNumber,
        "productFlavor": cartDetails.flavour,
        "productCustomerName": cartDetails.productName,
        "isAnonymous": false, //can be blank
        "maxQty": cartDetails.maxQty,
        "orderLineItemTypeId": orderLineItemTypeId,
        "totalUnits": cartDetails.quantity * cartDetails.sampleValue,
        "header": cartDetails.header
    };


    return addedToCart;
}

/**
**  Update cart session
**/
function updateSessionCart(data, quantity) {
    let addedToCart;
    let cartValues = [];
    orderLineItemTypeId = data.orderLineItemTypeId;

    if (localStorage.hasOwnProperty("addedToCart")) {
        let cartList = localStorage.getItem("addedToCart");
        let jsonArray = JSON.parse(cartList);
        let cartItems = jsonArray.cartItems;
        cartItems.forEach(function(obj) {
            if(obj.productListNumber === data.productListNumber) {
            let cartDetails = {};
                cartDetails.product = obj.product;
                cartDetails.quantity = quantity;
                cartDetails.img = obj.displayImage;
                cartDetails.flavour = obj.productFlavor;
                cartDetails.sampleValue = obj.packSize;
                cartDetails.maxQty = obj.maxQty;
                cartDetails.productName = obj.productCustomerName;
                cartDetails.productListNumber = obj.productListNumber;
                cartDetails.header = obj.header;
                cartDetails.imageURL = obj.productImageUrl;
                addedToCart = addToCartObjectCreation(cartDetails);
                cartValues.push(addedToCart);
            } else {
                cartValues.push(obj);
            }
        });
         let cartItemList = {
            "cartItems" : cartValues
        }
        localStorage.setItem("addedToCart", JSON.stringify(cartItemList));
    }
}

/**
**  Remove cart item
**/
function removeCartItemObj(name, flavour) {
    let cartValues = [];

    if (localStorage.hasOwnProperty("addedToCart")) {
        let cartList = localStorage.getItem("addedToCart");
        let jsonArray = JSON.parse(cartList);
        let cartItems = jsonArray.cartItems;

        cartItems.forEach(function(obj) {
            if(obj.product != name && obj.productFlavor != flavour)
                cartValues.push(obj);
        });

        let cartItemList = {"cartItems" : cartValues};
        localStorage.setItem("addedToCart", JSON.stringify(cartItemList));
    }
}

/**
**  Reset Flavoured drop down and quantity
**/
function resetDropdown() {

    $("#dropdown_label_flavourOption").text("Select Flavour");
    $("#dropdown_label_flavourOption").siblings('ul').attr("aria-expanded", "false");
    $("#dropdown_label_flavourOption").siblings('ul').removeAttr("aria-activedescendant")

    $("#dropdown_label_quantityOption").text("Quantity");
    $("#dropdown_label_quantityOption").siblings('ul').attr("aria-expanded", "false");
    $("#dropdown_label_quantityOption").siblings('ul').removeAttr("aria-activedescendant")

    $("#addToCart").addClass('color-disabled');
    $("#addToCart").parent().addClass('pointer-disabled');
}

/**
**  Check dropdown if selected and enabled the add to cart button.
**/
function checkDropdown() {
    if(isClickQuantityOption && isClickFlavourOption) {
        $("#addToCart").removeClass('color-disabled');
        $("#addToCart").parent().removeClass('pointer-disabled');
    }

}

/**
**  Check if selected flavoured and quantity is available.
**/
function checkQuantity(selectedQuantity, packSize, productListNumber, productFlavor, productMaxQty) {

    let tempTotal = (selectedQuantity * packSize) + totalSamples;

    if(tempTotal > maxSample ) {
        $("#addToCart").addClass('color-disabled');
        $("#addToCart").parent().addClass('pointer-disabled');
        $("#exceed-message").text($('#exceed-error-message').val());
        $("#exceed-message").show();
    } else if(isQuantityAvailabiltyExceed(productListNumber, productFlavor, selectedQuantity,
        productMaxQty, packSize)) {
        $("#addToCart").addClass('color-disabled');
        $("#addToCart").parent().addClass('pointer-disabled');
        $("#exceed-message").text($('#max-out-message').val());
        $("#exceed-message").show();
    }else {
        $("#addToCart").removeClass('color-disabled');
        $("#addToCart").parent().removeClass('pointer-disabled');
        $("#exceed-message").hide();
    }


}
function getTotalSampleValues() {
    totalSamples = 0;
    if (localStorage.hasOwnProperty("addedToCart")) {
        let cartList = localStorage.getItem("addedToCart");
        let jsonArray = JSON.parse(cartList);
        let cartItems = jsonArray.cartItems;
        cartItems.forEach(function(obj) {
            totalSamples += obj.totalUnits;
        });
    }
    return totalSamples;
}

function isQuantityAvailabiltyExceed(productListNumber, productFlavor, quantity, productMaxQty, packSize) {
    let isExceedQuantity = false;
    if (localStorage.hasOwnProperty("addedToCart")) {
        let cartList = localStorage.getItem("addedToCart");

        let jsonArray = JSON.parse(cartList);
        let cartItems = jsonArray.cartItems;
        cartItems.forEach(function(obj) {
            if(obj.productListNumber === productListNumber) {
                   quantity = parseInt(quantity) + parseInt(obj.productFlavorQuantity)
                   isExceedQuantity = (quantity > obj.maxQty);
                   return true;
            }
        });
    } else {
        isExceedQuantity = (quantity > productMaxQty);
    }
    return isExceedQuantity;

}

function imageOnClick() {
    $("#show-product-data-popup-btn").bind('click', function() {
        let imgSrc = $("#productImageContent").find('.slick-current.slick-active img').attr("src");
        let productName = document.title;
        showProductDataPopup(imgSrc, productName);
    });
}

/**
 ** Reinitialize Quantity Dropdown based on max value
 **  maxValue - maximum quantity of the product
 **/
function reInitQuantityDropdown(maxValue) {
    $("#dropdown_label_quantityOption").siblings('ul').children().remove();
    isClickQuantityOption = false;
    for(let index = 1; index < maxValue + 1; index++) {
        $("#dropdown_label_quantityOption").siblings('ul')
            .append('<li data-optionvalue="'+ index +'" id="field_label_quantityOption_'+ index +'" class="">'
            + '<span class="a-dropdown__option-text">'+ index +'</span></li>');
    }
     $("#quantityOption-options").find('.a-dropdown__field').children('ul').children('li').click(function(){
        isClickQuantityOption = true;
        checkDropdown();
        if(isClickQuantityOption && isClickFlavourOption) {
            let selectedQuantity = parseInt($(this).attr('data-optionvalue'));
            let flavouredItemId = $("#flavourOption").attr('aria-activedescendant');
            let packSize = parseInt($("#"+flavouredItemId).attr('data-pack-size'));
            let productFlavour = $("#"+flavouredItemId).attr('data-optionvalue');
            let productMaxQty = $("#"+flavouredItemId).attr('data-max-value');
            let productListNumber = $("#"+flavouredItemId).attr('data-product-list-number');
            checkQuantity(selectedQuantity, packSize, productListNumber, productFlavour, productMaxQty);
        }
    });

}

function getProductDetails(productCode) {
    showLoading();
    $("#dropdown_label_quantityOption").parent().removeClass("disabled-dropdown").addClass("disabled-dropdown");
    $("#dropdown_label_quantityOption").text("Quantity");
    isClickQuantityOption = false;
    const apiProductURL = "api/public/products";
    let headers = new Headers();
    headers.append("x-application-id", $("input[name=x-application-id]").val());
    headers.append("x-country-code", $("input[name=x-country-code]").val());
    headers.append("x-preferred-language", $("input[name=x-preferred-language]").val());
    headers.append("Content-Type", 'application/json');
    headers.append("x-secret-header", $("#secretHeader").val());
    let productPayload = JSON.stringify({
        "userInfo": {
            "productListNumber": productCode
        }
    });
    function postApi_List(productMaxQty,productListNumberData){
        if(productMaxQty > 0) {
            reInitQuantityDropdown(productMaxQty);
        } else {
             $("#addToCart").addClass('color-disabled');
             $("#addToCart").parent().addClass('pointer-disabled');
             $("#exceed-message").text($('#no-available-product-meesage').val());
             $("#exceed-message").show();
        }

        $("#dropdown_label_quantityOption").parent().removeClass("disabled-dropdown");
        checkDropdown();
        if(isClickQuantityOption && isClickFlavourOption) {
            let packSizeData = parseInt($(this).attr('data-pack-size'));
            let productFlavour = $(this).attr('data-optionvalue');
            let selectedQuantity = parseInt($("#dropdown_label_quantityOption").text().trim());

            checkQuantity(selectedQuantity, packSizeData, productListNumberData, productFlavour,productMaxQty );
        }
     }
    //call look user api to get profile details
    apiPOSTCall(headers,apiProductURL,productPayload)
    .then(response => response.text())
    .then(function (result) {
        let data = JSON.parse(result);
        if(data.errorCode == 0) {
           hideLoading();
           let sampleProductSize = data.response.length;
           for(let i = 0; i < sampleProductSize; i++) {
               let productDetails = data.response[i];

               let sampleFlavour = productDetails.sampleFlavour;
               let packSize = productDetails.packSize;
               let maxValue =  productDetails.maxQuantity;
               let productListNumber = productDetails.productListNumber;
               let productName = productDetails.productName;
               let productId = productDetails.id;
               let imageURL = productDetails.productImageUrl;
               let showFlavourInDropdown = false;
               if(typeof maxValue == 'number' && maxValue >= 0) {
                    showFlavourInDropdown = true;
               }

               if(showFlavourInDropdown || maxValue) {
                    $("#flavourOption-options").find('.a-dropdown__field')
                       .children('ul')
                       .append('<li data-optionvalue="'+ sampleFlavour
                         + '" id="field_label_flavourOption_'+ i +'" class="generatedOption" data-pack-size="'
                         + packSize + '" data-max-value="' + maxValue
                         + '" data-product-list-number= "' + productListNumber
                         + '" data-product-name= "' + productName
                         + '" data-product-id= "' + productId
                         + '" data-product-imageURL= "' + imageURL
                         +'"><span class="a-dropdown__option-text">' + sampleFlavour + '</span></li>');
                }

           }

           $('.generatedOption').click(function(e){
               e.preventDefault();
               $("#exceed-message").hide();
               isClickFlavourOption = true;
               let productMaxQty = parseInt($(this).attr('data-max-value'));
               let productListNumberData = parseInt($(this).attr('data-product-list-number'));
               postApi_List(productMaxQty,productListNumberData);
           });

        } else {
             hideLoading();
        }
    });
}

function getTitleFromMeta() {
    	let data = document.getElementsByTagName('meta');
        for(let i in data) {
        if(data[i].name === "title") {
            return data[i].content;
        }

    }
}

/**
**  Delete cart session
**/
function deleteCartItem(currentItemProductName, currentItemProductDesc, currentItemProductFlavour) {
    let cartValues = [];

    if (localStorage.hasOwnProperty("addedToCart")) {
        let cartList = localStorage.getItem("addedToCart");
        let jsonArray = JSON.parse(cartList);
        let cartItems = jsonArray.cartItems;

        cartItems.forEach(function(obj) {
            if(obj.header.toUpperCase() !== currentItemProductName.toUpperCase() ||
               obj.productFlavor.toUpperCase() !== currentItemProductFlavour.toUpperCase() ||
               obj.productCustomerName.toUpperCase() !== currentItemProductDesc.toUpperCase()) {
                cartValues.push(obj);
            }
        });

        let cartItemList = {
            "cartItems" : cartValues
        }

        localStorage.setItem("addedToCart", JSON.stringify(cartItemList));
    }
}

function getItemCount() {
    let cartCount = 0;
    if (localStorage.hasOwnProperty("addedToCart")) {
        let cartList = localStorage.getItem("addedToCart");
        let jsonArray = JSON.parse(cartList);
        let cartItems = jsonArray.cartItems;
        cartItems.forEach(function(value, idx) {
            cartCount += parseInt(value.totalUnits);
        });
    }
    if(cartCount == '0') {
        $("#cartCount").addClass('zeroCartCount');
        $("#cartCount-mobile").addClass('zeroCartCount');
    } else {
        $("#cartCount").removeClass('zeroCartCount');
        $("#cartCount-mobile").removeClass('zeroCartCount');
    }
    $("#cartCount").html(cartCount);
    $("#cartCount-mobile").html(cartCount);
}
