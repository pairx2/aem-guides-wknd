if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}
// Function to make IE9+ support forEach:
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

function checkLoginSplitUp(ABBOTT, nameUpdateElements, loginHideElements, loginShowElements) {
    nameUpdateElements.forEach(function(el) {
        var namePattern = el.getAttribute("data-name-pattern");
        var firstName = "";
        try {
            var local;
            var strJson = String(ABBOTT.cookie("profile")).trim();
            var ls = strJson && JSON.parse(strJson) || {};
            if (!ls["firstName"]) {
                local = JSON.parse(ABBOTT.cookie("abt_usr") || "{}");
            }
            firstName = ls["firstName"] || local["fname"] || "";
        } catch (e) {}
        el.textContent = namePattern.replace(/NAME/g, firstName);
    });
    loginShowElements.forEach(function(el) {
        el.classList.remove("d-none");
    });
    loginHideElements.forEach(function(el) {
        el.classList.add("d-none");
    });
}

function updatePageElementsSplit(ABBOTT) {
    var loginShowElements = document.querySelectorAll("[data-login='true']");
    var loginHideElements = document.querySelectorAll("[data-login='false']");
    var nameUpdateElements = document.querySelectorAll("[data-name-pattern]");
   
    if (ABBOTT.checkLogin()) {       
        /**Logout when browser session re-opened without profile cookie   */
            if(!ABBOTT.cookie("profile")){            
                ABBOTT.signOut();
                return;
            }
           
        checkLoginSplitUp(ABBOTT, nameUpdateElements, loginHideElements, loginShowElements)
        
    } else {
        loginShowElements.forEach(function(el) {
            el.classList.add("d-none");
        });
        loginHideElements.forEach(function(el) {
            el.classList.remove("d-none");
        });
    }
}

function logoutCallbackSplit(ABBOTT, cookieConfig) {
    window.sessionStorage.removeItem('oasisEmail');
    var byID = document.getElementById.bind(document);
    var SP = byID("secured-page");
    var SRP = byID("session-redirect-page");
    var isSecurePage = SP && SP.value && SP.value === "true";
    var SRPurl = SRP && SRP.value || "";
    ABBOTT.cookie("profile", "", cookieConfig);
    if (isSecurePage && SRPurl) {
        window.location.replace(SRPurl);
    } else {
        document.location.reload();
    }
}

function signOutSplitFN(ABBOTT, config, cookieConfig, ID_TOKEN) {
    if (window.ABBOTT.config && window.ABBOTT.config.storeName) {
        config["headers"]["Store"] = window.ABBOTT.config.storeName;
    }
    if (ABBOTT.checkLogin()) {
        config["headers"][ID_TOKEN] = ABBOTT.cookie(ID_TOKEN);
    }
    var logoutURL = window.jsonAppData && window.jsonAppData.logoutURL || "";
    config["url"] = ABBOTT.getAemURL(logoutURL || "/api/private/profile/logout");

    config["data"] = "{}";
    var _config = Object.assign({}, config, {
        xhrFields: {
            withCredentials: true
        }
    })
    var logoutCallback = function() {
        logoutCallbackSplit(ABBOTT, cookieConfig)
    };
    if (ABBOTT.checkLogin()) {
        ABBOTT.http.makeAjaxCall(_config).always(logoutCallback);
    } else {
        logoutCallback();
    }
}

function storeAccountInfoSplit(_ref, _extends, cookieConfig, ABBOTT) {
    var _ref$accountInfo = _ref.accountInfo;
    _ref$accountInfo = _ref$accountInfo === undefined ? {} : _ref$accountInfo;
    var profile = _ref$accountInfo.profile;
    var _ref$accountInfo$UID = _ref$accountInfo.UID;
    var UID = _ref$accountInfo$UID === undefined ? "" : _ref$accountInfo$UID;
    var _ref$accountInfo$dob = _ref$accountInfo.dob;
    var dob = _ref$accountInfo$dob === undefined ? "11/23/2020" : _ref$accountInfo$dob;
    var _ref$accountInfo$data$userType = _ref$accountInfo.data.userType;
    var userType = _ref$accountInfo$data$userType === undefined ? "" : _ref$accountInfo$data$userType;

    return ABBOTT.cookie("profile", JSON.stringify(_extends({}, profile, { UID: UID, userType: userType, dob: dob })), cookieConfig);

}

function getLocalContentSplitFN(objKey) {
    var data = localStorage.getItem("LOCAL_TEMP");
    var parsedData = {};
    if (data) {
        try {
            parsedData = JSON.parse(data);
        } catch (e) {}
    }
    if (objKey) {
        return parsedData ? parsedData[objKey] : null;
    }
    return parsedData;
}

function autoLoginAPISplitFN(config, ABBOTT) {
    var _config = Object.assign({}, config);
    var url = ABBOTT.getAemURL(jsonLoginMenuData && jsonLoginMenuData.actionPath ||
        "/api/public/profile/login");
    _config.headers["rememberme"] = true;
    _config["url"] = url;

    ABBOTT.http && ABBOTT.http.makeAjaxCall(_config).done(function(result) {
        var errorCode = result.errorCode;
        var response = result.response;
        var status = result.status;

        if (errorCode === 0 && status === true) {
            ABBOTT.storeAccountInfo(response);
            ABBOTT.updatePageElements();
        }
    })
}
(function(win) {
    if (!win.ABBOTT) {
        win.ABBOTT = {};
    }
    var ABBOTT = win.ABBOTT;
    var cookieConfig = {
        path: '/',
        domain: 'similac.com'
    };
    var ID_TOKEN = "x-id-token";
    var config = {
        "async": true,
        "crossDomain": true,
        "method": "POST",
        "global": false,
        "headers": {
            "content-type": "application/json",
            "x-country-code": "US",
            "x-application-id": "similac",
            "x-preferred-language": "en-US",
            "cache-control": "no-cache"
        },
        "processData": false,
    }



    ABBOTT.checkLogin = function() {
        return !!ABBOTT.cookie(ID_TOKEN);
    }
    ABBOTT.getAemURL = function(path) {
        var aemEle = document.querySelector("#aem-base-url");
        var aemURL = aemEle && aemEle.value || "";
        if (!aemURL) {
            aemURL = window.location.protocol + "//" + window.location.hostname;
        }
        return new URL(path, aemURL);
    }

    ABBOTT.getRememberMe = function() {
        return ABBOTT.cookie("similac-remember-me");
    }

    var _extends = Object.assign;

    ABBOTT.storeAccountInfo = function storeAccountInfo(_ref) {
        var storeAccountInforeturn = storeAccountInfoSplit(_ref, _extends, cookieConfig, ABBOTT)
        return storeAccountInforeturn
    };

    ABBOTT.autoLoginAPI = function() {
        autoLoginAPISplitFN(config, ABBOTT)

    }

    ABBOTT.checkRememberMe = function() {
        if (!ABBOTT.checkLogin() && ABBOTT.getRememberMe()) {
            ABBOTT.autoLoginAPI();
        }
    }

    ABBOTT.signOut = function() {
        if (window.location.href.indexOf("/app") > -1) {
            ABBOTT.gtm.buildAndPush.formTracking('sign-out', 'click', 'pwa_logout');
        }  
        signOutSplitFN(ABBOTT, config, cookieConfig, ID_TOKEN)
    }

    ABBOTT.getLocalContent = function(objKey) {
        var parsedData = getLocalContentSplitFN(objKey)
        return parsedData;
    }

    ABBOTT.updatePageElements = function() {
        updatePageElementsSplit(ABBOTT)

    }

    ABBOTT.updatePageElements();
    ABBOTT.checkRememberMe();

    jQuery(document).ready(function() {
        ABBOTT.updatePageElements();
    });

    jQuery(document).on("click", "[data-fun]", function(e) {
        var func = this.getAttribute("data-fun");
        if (func && ABBOTT.hasOwnProperty(func)) {
            ABBOTT[func]();
        }
    });

})(window);