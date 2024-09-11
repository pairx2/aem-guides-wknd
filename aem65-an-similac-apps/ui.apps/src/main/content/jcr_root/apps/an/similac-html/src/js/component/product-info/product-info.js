var $component = jQuery("#pdp-info");
var product = {};
var magentoMsg = "";
var outOfStock = false;
var $SUBSCRIPTION_MESSAGE = jQuery("#subscriptionMessage");
var $subscriptionDuration = jQuery("#pdp-duration");
var $errorMsgDelivery = jQuery(".error-msg-delivery");
var TEXT_DANGER = "text-danger";

function msgCheck(msg) {
    if (msg) {

        if (outOfStock) {
            $SUBSCRIPTION_MESSAGE.hide();
        } else {
            $SUBSCRIPTION_MESSAGE.html(msg);
            $SUBSCRIPTION_MESSAGE.show();
        }

    } else {
        $SUBSCRIPTION_MESSAGE.hide();
    }
}

var superScriptString = document.getElementById('super-script-indicators');

if (superScriptString) {
    var superScriptPattern = new RegExp("[" + superScriptString.value + "]");
    var prdDetailString = $('.pdp-info__title').html();
    if (prdDetailString) {
        const updatedString = addSuperScript(prdDetailString, superScriptPattern);
        $('.pdp-info__title').html(updatedString);
    }

    $('.pdp-comparison__title').each(function() {
        var prdCompString = $(this).html();
        if (prdCompString) {
            const updatedString = addSuperScript(prdCompString, superScriptPattern);
            $(this).html(updatedString);
        }
    });


    $('.product-card .card-title').each(function() {
        var prdCardString = $(this).html();
        if (prdCardString) {
            const updatedString = addSuperScript(prdCardString, superScriptPattern);
            $(this).html(updatedString);
        }
    });

}

function addSuperScript(string, pattern) {
    let output = "";
    var d = string;
    for (let i = 0; i < d.length; i++) {
        if (pattern.test(d[i])) {
            output += '<sup>' + d[i] + '</sup>'
        } else {
            output += d[i]
        }
    }
    return output;

}


/**
 * @function
 * @desc toggles subscription message aem/magento
 */
function updateSubcriptionMsg() {
    var msg = magentoMsg;
    msgCheck(msg);
}


function cartScheduleClick() {
    var buyType = jQuery(":radio[name=buy-type]:checked").val();
    var qty = jQuery(".stepper-control:visible")
        .find("input")
        .val();
    if (qty > 0) {
        var data = {
            sku: jQuery("#pdp-sku").data("sku"),
            qty: qty
        };
        if (buyType === "schedule") {
            var subscribeId = product.price.subsription.filter(function(item) {
                return item.id === parseInt($subscriptionDuration.val());
            });
            data.aw_sarp2_subscription_type = subscribeId[0].option_id;

        }
        if (product.customizable_options) {
            data.customizable_options = {
                id: product.customizable_options[0].option_id,
                value_string: product.customizable_options[0].option_values[0].option_type_id
            };
        }
        var addEvent = new CustomEvent("addToCart", {
            detail: data
        });
        window.dispatchEvent(addEvent);

        ABBOTT.gtm.push({
            type: "cartAdd",
            products: [{
                name: product.name,
                id: product.sku,
                price: ABBOTT.utils.getProductPrice(product),
                brand: product.brand,
                category: "",
                variant: getVariants(product),
                quantity: product.qty ? product.qty : 1,
            }, ],
        });
    }
}

function getVariants(productData) {
    var variants = [];
    var productVariants = [
        productData.case_of_product ? productData.case_of_product : productData.cases,
        productData.product_flavor ? productData.case_of_product : productData.flavors,
        productData.product_form ? productData.case_of_product : productData.forms,
    ];
    // Push Case/Size
    productVariants.forEach(function(variant) {
        if (variant && variant !== "null") {
            variants.push(variant);
        }
    });

    return variants.length ? variants.join(" | ") : "NA";
}

function updatePrice(subscriptionId) {
    var data = product.price.subsription.filter(function(item) {
        return item.id === +parseInt(subscriptionId); // change to number before comparison
    });
    return data;
}

/**
 * @function
 * @desc handles change event on subscription duration dropdown, update price
 * @param {Object} e Event Object
 */
function updateSubcriptionPrice() {
    var subscriptionId = $subscriptionDuration.val();
    var data = '';
    if (subscriptionId && subscriptionId.length > 0) {
        $errorMsgDelivery.removeClass(TEXT_DANGER).hide();
        data = updatePrice(subscriptionId);
        data = data.length && data[0];
        jQuery("#btn-schedule").removeClass("disabled-add-cart");
        if (!data) {
            data = { price: 0 };
        }
    } else {
        data = { price: product.subscription_price ? product.subscription_price[0] && product.subscription_price[0].price : product.price.regular };
    }

}

function cartUpdates(data,
    isBackorder,
    isOutOfStock,
    isInStock,
    $stock,
    $cartButtons,
    labels) {
    // Set product max quantity that can be added to cart

    if (data.qty > 0) {
        jQuery(".quanity-update-control")
            .find("input")
            .attr("max", data.qty);
    }
    if (isInStock) {
        $stock.text(labels.inStock);
    }
    if (isBackorder) {
        $stock.text(labels.backorder).addClass("danger");
        $cartButtons.text(labels.backorder);
    }
    // Set back order status Out of Stock
    if (isOutOfStock) {
        outOfStock = true;

        $stock.text(labels.outOfStock).addClass("danger");
        jQuery('.out-ofstoke-hide').hide()
        jQuery('[for=radio-one-time]').hide()
        $(".pdp-info__price-text").hide();
        $(".pdp-info__pack-detail").addClass('add-top-margin-pd');
        $cartButtons.remove();
    }
    jQuery(":radio:checked").trigger("click");
}

function checkUrlParams() {
    var pageUrlParams = window.location.search.substring(1);
    var urlVariables = pageUrlParams.split('&');
    var parameterName;
    var cookieConfig = {
        path: '/',
        domain: '.similac.com',
        secure: true,
        expires: 1 / 12
    };

    for (var i = 0; i < urlVariables.length; i++) {
        parameterName = urlVariables[i].split('=');
        if (parameterName[0] === 'psrid' && parameterName[1]) {
            ABBOTT.cookie('abt_psrid', parameterName[1], cookieConfig);
        }
    }
}


function handleAjaxResponse(res) {
    // Handle response
	const D_NONE = "d-none";
    var data = res.data.inventory.products[0];
    var isBackorder = data.backorders === 2 && data.qty <= 0;
    var isOutOfStock = !data.is_in_stock;

    var isInStock = data.is_in_stock;
    magentoMsg = res.data.inventory.subscription_message_html;
    var tableColor = data.aem_color;
    var isProgressive = false;

    // set abt_psrid cookie
    checkUrlParams();

    if (isOutOfStock) {
        outOfStock = true
        jQuery("#subscriptionMessage").hide();
		jQuery("#find-retailer-buy-type-subscribe").removeClass(D_NONE);
    } else {
        outOfStock = false;
    }

    $('#radio-one-time').attr('checked', true);
    
    jQuery('.pdp-tab__nutri-info-wrapper .pdp-tab__nutri-info-table-head').addClass(tableColor)
    jQuery('.pdp-tab__nutri-info-wrapper .pdp-tab__nutri-info-table-title').addClass(tableColor)
    jQuery('.pdp-tab__nutri-info-wrapper .pdp-tab__nutri-info-table').addClass(tableColor)
        // Save Product Info
    product = {
        id: data.product_id,
        name: data.product_name,
        sku: data.product_sku,
        brand: data.product_brand,
        categories: data.categories,
        isBackorder: isBackorder,
        cases: data.cases,
        flavors: data.flavors,
        forms: data.forms,
        subscription_price: data.subscription_price,
        price: {
            regular: data.price,
            subsription: data.subscription_price,
            discount: data.group_price,
        }
    };
    ABBOTT.gtm.buildAndPush.pdp(product, "view_product");
    var $stock = jQuery("#stock-status");
    var $cartButtons = jQuery("#btn-cart, #btn-schedule");
    var labels = jQuery("#stock-labels").data();
    // Update default subscription price
    updateSubcriptionPrice();
    cartUpdates(
        data,
        isBackorder,
        isOutOfStock,
        isInStock,
        $stock,
        $cartButtons,
        labels
    );

    const LINE_THROUGH = "line-through";
    let $listPrice = jQuery("#list-price");
    let $currentPrice = jQuery("#current-price");

    $SUBSCRIPTION_MESSAGE.hide();
    jQuery(".pdp-info__buy-type-subscribe").addClass(D_NONE);
    jQuery(".pdp-info__buy-type-one-time").removeClass(D_NONE);
    $listPrice.closest("p").addClass(D_NONE);
    $listPrice.removeClass(LINE_THROUGH);
    $currentPrice.text(product.price.regular.toFixed(2));
    if (product.price.discount) {
        $listPrice.closest("p").removeClass(D_NONE);
        $listPrice.text(product.price.regular.toFixed(2));
        $listPrice.addClass(LINE_THROUGH);
        $currentPrice.text(product.price.discount.toFixed(2));
    }
    
}

function userLoginAjax(ajaxObj) {
    if (ABBOTT.utils.isUserLoggedIn()) {
        ajaxObj.headers.Authorization =
            "Bearer " + ABBOTT.utils.getMagentoSessionToken();
    }
}

function getProductInfo() {
    var sku = jQuery("#pdp-sku").data("sku");
    var req =
        '{ inventory(sku: "' +
        sku +
        '"){ products { qty item_id product_sku aem_color product_id is_in_stock backorders price group_price subscription_price' +
        "{ id option_id name percent price is_progressive} product_name product_brand categories forms flavors cases customizable_options" +
        "{ option_id metabolic_state option_values { option_type_id } } } subscription_error subscription_message_html  }    } ";
    // Make ajax call
    var ajaxObj = {
        url: ABBOTT.config.getEndpointUrl("GRAPH_QL"),
        contentType: "application/json",
        data: {
            query: req
        },
        headers: {
            Store: ABBOTT.config.storeName
        }
    };
    userLoginAjax(ajaxObj);

    ABBOTT.http
        .makeAjaxCall(ajaxObj)
        .done(function(res) {
            if (res.errors) {
                return;
            }
            handleAjaxResponse(res);
        })
        .fail(function() {

            window.location = errorCodeData.errorPageURL;
        });
}

function readReview() {
    jQuery("#Reviews").trigger("click");
    jQuery("html, body").animate({ scrollTop: jQuery("#Reviews").position().top },
        "slow"
    );
}

function selectMenuChange(ui) {
    var sizeData = jQuery("#size-key-" + ui.item.value).data();
    if (
        sizeData.variationPagePath !== "" &&
        sizeData.variationPagePath !== undefined
    ) {
        document.location.href = sizeData.variationPagePath;
    }
}

(function(win) {
    if (!win.ABBOTT) {
        win.ABBOTT = {};
    }
    var ABBOTT = win.ABBOTT;
    ABBOTT.pdp = (function() {
        $SUBSCRIPTION_MESSAGE.hide();
        // On click of read review in product info section, page should point to reviews tab
        jQuery(".pdp-info__rating").on("click", ".bv_main_container_row_flex", function() {
            readReview();
        });

        /**
         * @function
         * @desc switches page based on the property selected of the product
         */
        jQuery("#pdp-size").on("selectmenuchange", function(e, ui) {
            selectMenuChange(ui);
        });

        /**
         * @function
         * @desc on selecting the duration
         */
        $subscriptionDuration.on("selectmenuchange", function() {
            if (jQuery(this).val().length > 0) {
                $errorMsgDelivery.removeClass(TEXT_DANGER).hide();
                updateSubcriptionPrice();
                updateSubcriptionMsg();
            }

        });
        jQuery("#btn-cart").click(function() {
            cartScheduleClick();
        });

        jQuery("#btn-schedule").click(btnScheduleClick);

        function btnScheduleClick() {
            if ($subscriptionDuration.val().length < 1) {
                $errorMsgDelivery.addClass(TEXT_DANGER).show();
            } else {
                $errorMsgDelivery.removeClass(TEXT_DANGER).hide();
                cartScheduleClick();
            }
        }

        /**
         * @function
         * @desc checking only numbers
         */

        // Fetch Product Info (only in PDP page)
        if ($component.length) {
            getProductInfo();
        }
        
        // Event Bindings
        $component
            .on("change", "#pdp-duration", updateSubcriptionPrice);
    })();
})(window);

jQuery(document).ready(function() {
    var inputSelect = document.querySelector(".text-number");
    ABBOTT.utils.filterNumbers(inputSelect);

    var referUrl = document.referrer;
    var isPLP = referUrl.includes("/products.html");
    if (isPLP) {
        sessionStorage.setItem('isPLP', true);
    }
    var currentUrl = document.URL;
    var checkHash = currentUrl.includes("#");
    var isPDP = currentUrl.includes("/products/");
    if (sessionStorage.getItem('isHashURL') && isPDP && !checkHash) {
        sessionStorage.removeItem('isHashURL')
        location.reload();
    }

});