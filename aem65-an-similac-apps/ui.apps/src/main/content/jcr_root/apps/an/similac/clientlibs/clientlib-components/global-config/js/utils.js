// URL list
var AEM_URLs = {
    BASE: jQuery("#aem-base-url").val(),
};

/**
 * @function
 * @desc removes all line-breaks and convert multiple whitespaces to one from the GrahQL query string
 * @param {String} query graphQL query input
 * @return {String} formated graphQL query
 */
function formatGraphQLQuery(query) {
    query = query.replace(/\n/g, "");
    query = query.replace(/  +/g, " ");

    return query;
}
/**
 * @function
 * @desc finds cart key from cookie
 * @return {String} session cart key or empty string
 */
function getCartKey(name) {
    name = name || "abt_cartKey";
    ABBOTT.cookie.json = false;
    return ABBOTT.cookie(name);
}

/**
 * @function
 * @desc forms PDP and IMAGE url based on current environment set by
 * @param {String} relativeUrl
 * @param {Boolean} isPdp
 * @return {String} formed absolute URL
 */
function getUrl(relativeUrl) {
    return AEM_URLs.BASE + relativeUrl;
}

/**
 * @function
 * @desc finds session token from cookie
 * @return {String} session token or empty string
 */
function getMagentoSessionToken() {
    var sessionInfo = getMagentoSessionInfo();
    var token = "";
    if (sessionInfo && sessionInfo.token) {
        token = sessionInfo.token;
    }
    return token;
}
/**
 * @function
 * @desc finds session token from cookie
 * @return {String} session token or empty string
 */
function getMagentoCustomerId() {
    var sessionInfo = getMagentoSessionInfo();
    var customerId = "";
    if (sessionInfo && sessionInfo.customer_id) {
        customerId = sessionInfo.customer_id;
    }
    return customerId;
}
/**
 * @function
 * @desc finds out session user info from cookie
 * @return {Object} User session info
 */
function getMagentoSessionInfo() {
    var sessionInfo = ABBOTT.cookie("abt_usr");
    if (typeof sessionInfo === "string") {
        sessionInfo = JSON.parse(sessionInfo);
    }
    return sessionInfo;
}
/**
 * @function
 * @desc finds if user is logged-in
 * @return {Boolean} user logged-in state
 */
function isUserLoggedIn() {
    return !!getSessionInfo();
}
/**
 * @function
 * @desc finds out Gigya session user info from cookie
 * @return {Object} User session info
 */
function getSessionInfo() {
    return ABBOTT.cookie("x-id-token");
}

function setInputFilter(textbox, inputFilter) {
    if (textbox) {
        ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
            textbox.addEventListener(event, function() {
                if (inputFilter(this.value)) {
                    this.oldValue = this.value;
                    this.oldSelectionStart = this.selectionStart;
                    this.oldSelectionEnd = this.selectionEnd;
                } else if (this.hasOwnProperty("oldValue")) {
                    this.value = this.oldValue;
                    this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                } else {
                    this.value = "";
                }
            });
        });
    }
}

function getProfileJSON() {
    var profileJSONString = ABBOTT.cookie("profile") || "{}";
    return JSON.parse(profileJSONString);
}

function getCookieConfig() {
    return {
        path: '/',
        domain: 'similac.com'
    }
}

function profileUpdate(key, value) {
    if (key) {
        var profile = getProfileJSON();
        profile[key] = value;
        ABBOTT.cookie("profile", JSON.stringify(profile), getCookieConfig());
    }
}

function getUserType(_ut) {
    var SSM_USER_TYPE = "similac-ssm"; // ecom user similac-ecom
    if (_ut === SSM_USER_TYPE && ABBOTT.cookie("abt_usr")) {
        return "similac-fullaccount";
    }
    return String(_ut).trim();
}

function getCurrentUserType() {
    var profile = getProfileJSON();
    return getUserType(profile['userType']);
}

function getActualUserType() {
    var profile = getProfileJSON();
    return profile['userType'];
}

function filterNumbers(selector) {
    setInputFilter(selector, function(value) {
        return /^\d*$/.test(value);
    });
}
/**
 * @function
 * @desc Calculates product price based on pricing rules
 * @param {Object} product product details object
 * @return {String} price with 2 precisions
 */
function getProductPrice(product) {

    var price;


    // If price or customerGroup not found yet, apply other price rules 
    price = price || product.special_price || product.price.regular || product.price;

    return price.toFixed(2);
}

function hyphenWords(str) {
    return str.toLowerCase().replace(/[\. ',:-]+/g, "-");
}

function toCamelCase(str) {
    var lowerStr = str.toLowerCase();
    var camelStr = lowerStr.substring(0, 1).toUpperCase() + lowerStr.substring(1);
    return camelStr;
}

(function(win) {
    if (!win.ABBOTT) {
        win.ABBOTT = {};
    }
    var ABBOTT = win.ABBOTT;
    ABBOTT.utils = (function() {

        // JS Utils
        return {
            formatGraphQLQuery: formatGraphQLQuery,
            getCartKey: getCartKey,
            getUrl: getUrl,
            isUserLoggedIn: isUserLoggedIn,
            getSessionInfo: getSessionInfo,
            getMagentoSessionToken: getMagentoSessionToken,
            getMagentoCustomerId: getMagentoCustomerId,
            filterNumbers: filterNumbers,
            getProfileJSON: getProfileJSON,
            getUserType: getUserType,
            getCurrentUserType: getCurrentUserType,
            getActualUserType: getActualUserType,
            profileUpdate: profileUpdate,
            getCookieConfig: getCookieConfig,
            getProductPrice: getProductPrice,
            hyphenWords: hyphenWords,
            toCamelCase:toCamelCase
        };
    })();
})(window);