/**
 * Similac GTM Data-Layer Utility
 *
 */

/**
 * @function
 * @desc formats product variants and stringify these
 * @param {Object} categories Product Object
 * @return {String} variants in string format separated with ' | '
 */
function getVariants(product) {
    var variants = [];
    var productVariants = [
        product.case_of_product ? product.case_of_product : product.cases,
        product.product_flavor ? product.case_of_product : product.flavors,
        product.product_form ? product.case_of_product : product.forms,
    ];
    // Push Case/Size
    productVariants.forEach(function(variant) {
        if (variant && variant !== "null") {
            variants.push(variant);
        }
    });

    return variants.length ? variants.join(" | ") : "NA";
}

/**
 * @function
 * @desc pushes data to GTM based on event
 * @param {Object} config config options type and products
 */
function push(config) {
    var data;

    // check if config is correct
    if (!config.type || !ABBOTT.gtm.pusher[config.type]) {
        throw new Error("GTM event configuration error!");
    }

    data = ABBOTT.gtm.pusher[config.type](config);

    if (data && typeof dataLayer === "object") {
        dataLayer.push(data);
    }
}
/**
 * @method
 * @desc used for product listing
 * @param {Object} config configurations
 * @return {object} GTM data object
 */
function impressions(config) {
    var data = {
        ecommerce: {
            currencyCode: "USD",
            impressions: config.products
        },
        event: config.eventName ? config.eventName : ""
    };
    return data;
}
/**
 * @method
 * @desc used for product detail page impression
 * @param {Object} config configurations
 * @return {object} GTM data object
 */
function pdpPush(config) {
    return {
        event: config.eventName,
        ecommerce: {
            detail: {
                products: config.products,
            },
        },
    };
}

/**
 * @method
 * @desc used for product link click event anywhere
 * @param {Object} config configurations
 * @return {object} GTM data object
 */
function productClick(config) {
    return {
        event: "productClick",
        ecommerce: {
            click: {
                products: config.products,
            },
        },
        eventCallback: function() {
            var url = config.product.aem_url ? config.product.aem_url : "";
            document.location = ABBOTT.utils.getUrl(url);
        },
    };
}

/**
 * @method
 * @desc used for product adding to cart from anywhere
 * @param {Object} config configurations
 * @return {object} GTM data object
 */
function cartAdd(config) {
    return {
        event: "addToCart",
        ecommerce: {
            currencyCode: "USD",
            add: {
                products: config.products,
            },
        },
    };
}

/**
 * @method
 * @desc used for product removing to cart from cart slider
 * @param {Object} config configurations
 * @return {object} GTM data object
 */
function cartRemove(config) {
    return {
        event: "removeFromCart",
        ecommerce: {
            remove: {
                products: config.products,
            },
        },
    };
}

function formTrackingPush(config) {
    return {
        event: "ga-custom-events",
        eventCategory: config.eventCategory,
        eventAction: config.eventAction,
        eventLabel: config.eventLabel,
    };
}
/**
 * @function
 * @desc pushes track to product listing
 * @param {Array} product products list
 */
function listing(products, listName, eventName) {
    ABBOTT.gtm.push({
        type: "impressions",
        eventName: eventName,
        products: products.map(function(item, index) {
            return {
                name: item.name ? item.name : item.product_name,
                id: item.sku ? item.sku : item.product_sku,
                price: ABBOTT.utils.getProductPrice(item),
                brand: item.brand ? item.brand : item.product_brand,
                category: "",
                variant: getVariants(item),
                list: listName,
                position: index + 1,
            };
        }),
    });
}

/**
 * @function
 * @desc pushes track to GTM data layer when PDP link is clicked
 * @param {Object} product product information
 * @param {Number} index index of the product in list
 */
function clickURL(product, index) {
    ABBOTT.gtm.push({
        type: "productClick",
        products: [{
            name: product.name ? product.name : product.product_name,
            id: product.sku ? product.sku : product.product_sku,
            price: ABBOTT.utils.getProductPrice(product),
            brand: product.brand ? product.brand : product.product_brand,
            category: "",
            variant: getVariants(product),
            position: index + 1,
        }, ],
        product: product,
    });
}
/**
 * @function
 * @desc pushes track to GTM data layer when product is added to cart
 * @param {Array} product products list
 */
function pdp(product, eventName) {
    ABBOTT.gtm.push({
        type: "pdpPush",
        eventName: eventName,
        products: [{
            name: product.name ? product.name : product.image.label,
            id: product.sku,
            price: ABBOTT.utils.getProductPrice(product),
            brand: product.brand,
            category: "",
            variant: getVariants(product),
        }, ],
    });
}

/**
 * @function
 * @desc pushes track to GTM data layer when product is added to cart
 * @param {Object} product product information
 */
function addToCart(product) {
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

/**
 * @function
 * @desc pushes track to GTM data layer when product is removed from cart
 * @param {Object} product product information
 */
function removeFromCart(item) {
    ABBOTT.gtm.push({
        type: "cartRemove",
        products: [{
            name: item.product.image.label,
            id: item.product.sku,
            price: item.product.price.toString(),
            brand: item.product.brand,
            category: "",
            variant: getVariants(item.product),
            quantity: item.quantity,
        }, ],
    });
}

function formTracking(category, action, label) {
    ABBOTT.gtm.push({
        type: "formTrackingPush",
        eventCategory: category,
        eventAction: action,
        eventLabel: label,
    });
}
(function(win) {
    if (!win.ABBOTT) {
        win.ABBOTT = {};
    }
    var ABBOTT = win.ABBOTT;
    ABBOTT.gtm = (function() {
        var pusher = {
            impressions: impressions,
            pdpPush: pdpPush,
            productClick: productClick,
            cartAdd: cartAdd,
            cartRemove: cartRemove,
            formTrackingPush: formTrackingPush,
        };

        var builder = {
            listing: listing,
            clickURL: clickURL,
            pdp: pdp,
            addToCart: addToCart,
            removeFromCart: removeFromCart,
            formTracking: formTracking,
        };

        // Exposed assets
        return {
            pusher: pusher,
            push: push, // use this method when customization required from response received
            buildAndPush: builder, // use methods under this when data can be used as is from response
            getVariants: getVariants,
        };
    })();
})(window);