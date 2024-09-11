/**
 * Porject Wolf GTM Data-Layer Utility
 *
 */


/**
 * @function
 * @desc pushes data to GTM based on event
 * @param {Object} config config options type and products
 */
function push(config) {
    let data;

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
 * @function
 * @desc pushes data to GTM based on event
 * @param {Object} config config options type
 */

function pageTrackingPush(config) {
    return {
        event: "load",
        eventCategory: config.eventCategory,
        eventAction: config.eventAction,
        eventLabel: config.eventLabel,
    };
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
        product: {
            detail:config.products,
        },
    };
}


/**
 * @function
 * @desc pushes track to GTM datalayer when product is loaded
 * @param {Array} product products list
 */
function pdp(product,eventName) {
    ABBOTT.gtm.push({
        type: "pdpPush",
        eventName: eventName,
        products: [{
            sku: product.sku,
            batchNumber: product.batchNumber,
            lotNumber: product.lotNumber,
            site: product.site,
        }, ],
    });
}

/**
 * @function
 * @desc pushes data to GTM based on event
 * @param {string} category, action, label
 */

function pageTracking(category, action, label) {
    ABBOTT.gtm.push({
        type: "pageTrackingPush",
        eventCategory: category,
        eventAction: action,
        eventLabel: label,
    });
}

(function(win) {
    const ABBOTT = win.ABBOTT = win.ABBOTT || {};
    ABBOTT.gtm = (function() {
        let pusher = {
            pageTrackingPush: pageTrackingPush,
            pdpPush: pdpPush,
        };

        let builder = {
            pageTracking: pageTracking,
            pdp: pdp,
        };

        // Exposed assets
        return {
            pusher: pusher,
            push: push, // use this method when customization required from response recieved
            buildAndPush: builder, // use methods under this when data can be used as is from response
        };
    })();
})(window);
