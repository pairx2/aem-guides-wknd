$(document).ready(function() {
    let cartExceedDefaultTxt = "You have reached the maximum order quantity for this product.";
    let cartItemExceedMsg = $("#cartItemExceedMsg").val() ? $("#cartItemExceedMsg").val() : cartExceedDefaultTxt;

    if(isCountryCodeUK() && $('#checkout-page-steps').length > 0) {
        if (localStorage.hasOwnProperty("addedToCart") && isUserLoggedIn()) {
            let cartList = localStorage.getItem("addedToCart");
            let jsonArray = JSON.parse(cartList);
            let data = jsonArray.cartItems;
            let cartTotalSamples = 0;

            if(data.length > 0) {
                isCartEmpty(false);
                data.forEach(function(value, idx) {
                    let id = 'sc-item-' + idx;
                    let cartItemId = '#shopping-cart-item-' + idx;
                    let itemElem = $(`<div class="shopping-cart-item"
                                       id=shopping-cart-item-${idx}>
                                       <span class="abt-icon abt-icon-cancel remove-cart-item"></span>
                                       </div>`);

                    $('#shopping-cart-items').append(itemElem);
                    insertCartItem(value, cartItemId);
                    insertCounter(value, cartItemId, id, cartItemExceedMsg);
                    insertSamplesValue(value.totalUnits, cartItemId, id, cartItemExceedMsg);

                    cartTotalSamples += parseInt(value.totalUnits);
                });

                insertCartTotalSamples(cartTotalSamples);

                $('.remove-cart-item').click(function(e) {
                    let currentItemId = $(this).parent().attr("id");
                    let currentItemProductName = $('#' + currentItemId +' .cart-item .cart-item-product-name').html();
                    let currentItemProductDesc = $('#' + currentItemId +' .cart-item .cart-item-product-desc').html();
                    let currentItemProductFlavour = $('#' + currentItemId +' .cart-item .cart-item-product-type').html();
                    let index = currentItemProductFlavour.indexOf(':');

                    currentItemProductFlavour = currentItemProductFlavour.substring(index + 1);
                    removeCartItem($(this).parent());
                    deleteCartItem(
                        currentItemProductName.trim(),
                        currentItemProductDesc.trim(),
                        currentItemProductFlavour.trim()
                    );
                    getItemCount();
                });
            } else {
                isCartEmpty(true);
            }
        } else {
            isCartEmpty(true);
        }
    }
});

function removeCartItem(currentItem) {
    let samplesValue = currentItem.find('.cart-item-samples-value').html();
    let samplesAmount = $('#cart-samples-amount').html();
    let productName = currentItem.find('.cart-item-product-name').html();
    let productFlavour = currentItem.find('.cart-item-product-type').html();
    let updatedTotal = samplesAmount - samplesValue;

    if(updatedTotal <= 0)
        isCartEmpty(true);

    $('#cart-samples-amount').html(updatedTotal);
    currentItem.remove();
    removeCartItemObj(productName, productFlavour);
}

function isCartEmpty(empty) {
    if(empty) {
        $('#shopping-cart-proceed').addClass('disabled');
        $('#shopping-cart-item-xf').hide();
        $('#cart-items-empty-text').show();
    } else {
        $('#shopping-cart-proceed').removeClass('disabled');
        $('#shopping-cart-item-xf').show();
        $('#cart-items-empty-text').hide();
    }
}

function insertCartTotalSamples(amount) {
    let maxSamples = $("#cart-total-samples-max").val();
    let totalSamples = $(`<div id="cart-total-samples-count">
                            <p id="cart-samples-amount">${amount}<p>/
                            <p id="cart-samples-max">${maxSamples}</p>
                         </div>`);
    $('#cart-total-samples .text').after(totalSamples);
}

function insertCartItem(item, elem) {
    let cartItem = $(`
        <div class="cart-item">
          <div class="image image--align-center"><img src=${item.displayImage} /></div>
            <div class="cart-item-product-details">
                  <p class="cart-item-product-name">${item.header}</p>
                  <p class="cart-item-product-desc">${item.productCustomerName}</p>
                  <p class="cart-item-product-type">Flavour:${item.productFlavor}</p>
            </div>
        </div>
    `);

    $(elem).append(cartItem);
}

function insertCounter(data, elem, id, cartItemExceedMsg) {
    let counter = $(`
        <div id=${id}-counter class="cart-item-counter">
            <button id=${id}-btn-plus>+</button>
            <div id=${id}-count class="cart-item-count">${data.productFlavorQuantity}</div>
            <button id=${id}-btn-minus>-</button>
            <div id=${id}-exceed-msg class="qty-exceed-msg">
                ${cartItemExceedMsg}
            </div>
        </div>
    `);

    $(elem).append(counter);

    $("#" + id + "-btn-plus").click(function() {
        updateQtyValues("+", id, data, $(this));
    });

    $("#" + id + "-btn-minus").click(function() {
        updateQtyValues("-", id, data, $(this));
    });
}

function insertSamplesValue(value, elem, id, cartItemExceedMsg) {
    let samplesValue = $(`<div id=${id}-samples-value class="cart-item-samples-value">${value}</div>
                        <div id=${id}-exceed-msg-mobile class="qty-exceed-msg-mobile">
                            ${cartItemExceedMsg}
                        </div>`);
    $(elem).append(samplesValue);
}

function updateQtyValues(addOrMinus, id, data, thisElem) {
    let currentQty = $("#" + id + "-count").html();
    let samplesValueTotal = $("#" + id + "-samples-value").html();
    let samplesCount = $('#cart-samples-amount').html();
    let samplesMax = $('#cart-samples-max').html();
    let prevSampleTotal = samplesValueTotal;

    currentQty = currentQty ? parseInt(currentQty) : 0;
    samplesValueTotal = samplesValueTotal ? parseInt(samplesValueTotal) : 0;
    samplesMax = samplesMax ? parseInt(samplesMax) : 0;
    samplesCount = samplesCount ? parseInt(samplesCount) : 0;

    if (addOrMinus === "+") {
        currentQty += 1;
    } else if (addOrMinus === "-" && samplesValueTotal > 0) {
        currentQty -= 1;
    }

    if(currentQty > data.maxQty) {
        thisElem.parent().addClass('counter-flex-top');
        $("#"+id+"-exceed-msg").show();
        $("#"+id+"-exceed-msg-mobile").show();
        return;
    } else {
        thisElem.parent().removeClass('counter-flex-top');
        $("#"+id+"-exceed-msg").hide();
        $("#"+id+"-exceed-msg-mobile").hide();
    }

    let checkMaxQty = (currentQty * data.packSize) - prevSampleTotal;

    if((checkMaxQty + samplesCount) > samplesMax)
        currentQty -= 1;

    samplesValueTotal = currentQty * data.packSize;
    samplesCount += (samplesValueTotal - prevSampleTotal);

    $("#" + id + "-count").html(currentQty);
    $("#" + id + "-samples-value").html(samplesValueTotal);
    $('#cart-samples-amount').html(samplesCount);

    if(samplesCount == 0) {
        $('#shopping-cart-proceed').addClass('disabled');
    } else {
        $('#shopping-cart-proceed').removeClass('disabled');
    }
    updateSessionCart(data, currentQty);
    getItemCount();
}