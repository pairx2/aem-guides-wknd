var birthDateField = 'input[name="birthDate"]';
var DOB_CLASS = 'dob-placeholder';
var DEFAULT_DOB_VAL = "__/__/____";
var xIdToken = "x-id-token";
var docHeight = "auto";

var digitialOfferPreFill = function() {
    if (window.sessionStorage.getItem('userName')) {
        jQuery('#digitalOfferSignIn input[name="loginID"]').prop("readonly", true);
        jQuery('#digitalOfferSignIn input[name="loginID"]').addClass("grayedOut");
        window.sessionStorage.removeItem("userName");
    }
};

var updateAddressField = function() {
    var addr = jQuery("#react-form-field-address").val();
    if (addr !== "" && addr !== null && addr !== undefined) {
        var googleDefined = setInterval(function() {
            if (window.google) {
                jQuery("#react-form-field-address").focus();
                clearInterval(googleDefined);
            }
        }, 100);
    }
};

var datePickerLabelValueChange = function() {

    jQuery('#react-form-field-birthDate').click(function() {
        var dob = jQuery(birthDateField).val();
        if (dob === DEFAULT_DOB_VAL || dob === "") {
            setTimeout(function() {
                jQuery(birthDateField).addClass(DOB_CLASS).val('MM/DD/YYYY');
                jQuery(birthDateField).get(0).setSelectionRange(0, 0);
            }, 500)
        } else {
            jQuery(birthDateField).removeClass(DOB_CLASS)
        }
        var labelText = "";
        for (var i = 0; i < jsonData.fields.length; ++i) {
            if (jsonData.fields[i].onFocusLabel) {
                labelText = jsonData.fields[i].onFocusLabel
            }
        }
        jQuery("#react-form-field-birthDate label").text(labelText);

    });
};

var datePickerLabelChange = function() {
    var fieldLable = "";
    jQuery('#react-form-field-birthDate').focusout(function() {
        var dob = jQuery(birthDateField).val();
        for (var i = 0; i < jsonData.fields.length; ++i) {
            if (jsonData.fields[i].name === "birthDate") {
                if (dob === DEFAULT_DOB_VAL || dob === 'MM/DD/YYYY') {
                    fieldLable = jsonData.fields[i].label
                } else {
                    fieldLable = jsonData.fields[i].onFocusLabel
                }
            }
        }
        jQuery("#react-form-field-birthDate label").text(fieldLable);
    });
};

var hideOasisBannerAfterClose = function(){
    jQuery("#template.oasis-error-box .sim-icon").click(function(){
        if(ABBOTT.cookie(xIdToken)) {
            var profielCookie = JSON.parse(ABBOTT.cookie("profile"));
            const cookieConfig = {
                path: "/",
                domain: "similac.com"
            };
            ABBOTT.cookie(
                "profile",
                JSON.stringify({...profielCookie, oasisBannerClosed: true }),
                cookieConfig
            );
        }
    })
}


jQuery(document).ready(function() { 
    const currentUrl = document.URL;
    const checkHash = currentUrl.includes("#");
    if (checkHash) {
        sessionStorage.setItem('isHashURL', true);
    }
    digitialOfferPreFill();
    updateAddressField();
    datePickerLabelChange();
    datePickerLabelValueChange();
    hideOasisBannerAfterClose();
});

function unsetPLP() {
    window.sessionStorage.removeItem('isPLP');
}

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

(function() {

    if (typeof window.CustomEvent === "function") {
        return false;
    }

    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: null };
        var evt = document.createEvent("CustomEvent");
        evt.initCustomEvent(
            event,
            params.bubbles,
            params.cancelable,
            params.detail
        );
        return evt;
    }
    window.CustomEvent = CustomEvent;
    return true;
})();
if (!window.ABBOTT) {
    window.ABBOTT = {};
}


/**
 * Function to generate svg tags for given icon
 * @param {string} iconName
 */
function getSVGHtml(iconName) {
    return (
        '<svg viewBox="0 0 100 100" class="sim-icon">' +
        '<use href="#icon-' +
        iconName +
        '"></use>' +
        "</svg>"
    );
}
/**
 * Function to set svg for each icons
 */
function getSVGHtmlCallBack(iconName, iconEle) {
    if (iconName != null) {
        var iconHtml = getSVGHtml(iconName);
        iconEle.innerHTML = iconHtml;
    }
}

function setSocialIconsSplit(iconEle) {
    if (iconEle.getElementsByTagName("svg").length === 0) {
        var iconName =
            iconEle.dataset !== null &&
            iconEle.dataset.icon !== null &&
            iconEle.dataset.icon !== "" ?
            iconEle.dataset.icon :
            null;
        getSVGHtmlCallBack(iconName, iconEle)
    }
}

function setSocialIcons() {
    var iconElements = document.getElementsByClassName("sim-icons");
    if (iconElements != null && iconElements.length > 0) {
        for (var i = 0; i < iconElements.length; i++) {
            var iconEle = iconElements[i];
            setSocialIconsSplit(iconEle)
        }
    }
}


/**
 * Function to get svg sprite image
 */
function sanitize(data) {
    var DOMPurify = window.Bundle ? window.Bundle.DOMPurify : null;
    return DOMPurify ? DOMPurify.sanitize(data) : "";
}

function setSvg() {
    var event = new CustomEvent('re-build-menu');
    try {
        var iconSvg = jQuery("#icon-svg");
        if (iconSvg == null) {
            console.info("No image with svg groups found in page");
            return;
        }
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                var svgDiv = jQuery("<div></div>");
                svgDiv.html(sanitize(xmlHttp.responseText));
                svgDiv.addClass(iconSvg.attr("class"));
                iconSvg.replaceWith(svgDiv);
                setTimeout(function() {
                    setSocialIcons();
                    document.dispatchEvent(event);
                }, 1000);
            }
        };
        xmlHttp.open("GET", iconSvg.attr("data-src"), true); // true for asynchronous
        xmlHttp.send(null);
        setSocialIcons();
    } catch (err) {
        console.log("Error:setSvg", err);
    }
}
/**
 * Function to set methods for the  hamburger in global header
 */
// On window resize toggle backdrop  height for hamburger

function hamburgerResize(NAV_TOGGLER, NAV_BAR_SELECTOR) {
    jQuery(window).resize(function() {
        var $navBarSelect = jQuery(NAV_BAR_SELECTOR);
        if (
            jQuery(window).width() > 769 &&
            $navBarSelect.hasClass("show")
        ) {
            $navBarSelect.height("auto");
        }
        if (jQuery(window).width() < 769 && $navBarSelect.hasClass("show")) {
            $navBarSelect.height(docHeight);
        }
    });
}

function hamburgercollapsed(NAV_TOGGLER, NAV_BAR_SELECTOR) {
    jQuery("body").click(function(evt) {
        let chkWidth = 769;
        if(isPWA()){
            chkWidth = 991;
        }
        if (jQuery(window).width() < chkWidth) {
            if (
                jQuery(evt.target).parents("#hamburger").length === 0 &&
                jQuery(evt.target).parents(".navbar-nav").length === 0
            ) {
                var $navBarSelect = jQuery(NAV_BAR_SELECTOR);
                var $navBarToggler = jQuery(NAV_TOGGLER);
                if ($navBarSelect.hasClass("show")) {
                    $navBarSelect.removeClass("show");
                    $navBarToggler.addClass("collapsed");
                }
            }
        }
    });
}

function setHeaderHamburger() {
    try {
        // close hamburger menu when clicked from outside the menu
        var NAV_BAR_SELECTOR = ".nav-bar .navbar-collapse";
        var NAV_TOGGLER = ".navbar-toggler";
        hamburgercollapsed(NAV_TOGGLER, NAV_BAR_SELECTOR)
        // set hamburger menu backdrop height, when it is in open state
        var $navBarSelect = jQuery(NAV_BAR_SELECTOR);    
        var $navBarToggler = jQuery(NAV_TOGGLER);
        if (jQuery(window).width() < 769) {
            jQuery("#hamburger").click(function() {
                // get the document height
                docHeight = jQuery(document).height();
                docHeight = docHeight - 150;
                //close the hamburger menu if it is in open state
                if($navBarSelect.hasClass("show")){
                    $navBarSelect.removeClass("show");
                    $navBarToggler.addClass("collapsed");
                }
                setTimeout(function() { 
                    if ($navBarSelect.hasClass("show")) {
                        $navBarSelect.height(docHeight);
                    }
                }, 1000);
            });
        }
        hamburgerResize(NAV_TOGGLER, NAV_BAR_SELECTOR);
        closeHamburgerMenu(NAV_TOGGLER, NAV_BAR_SELECTOR);
    } catch (err) {
        console.log("Error:setHeader", err);
    }
}

/**
 * Function to close hamburger menu if close icon clicked
 * @param {NAV_TOGGLER, NAV_BAR_SELECTOR}  
 */
function closeHamburgerMenu(NAV_TOGGLER, NAV_BAR_SELECTOR) {
    jQuery('.burger-close').click(function(e){
        e.stopPropagation();
        var $navBarSelect = jQuery(NAV_BAR_SELECTOR);    
        var $navBarToggler = jQuery(NAV_TOGGLER);
        if ($navBarSelect.hasClass("show")) {
            $navBarSelect.removeClass("show");
            $navBarToggler.addClass("collapsed");
        }   
    });
}
/**
 * Function to set the header menu search box methods
 */
var outsideClickCloseCallback = function(evt) {

    var SEARCH_BOX = ".search-box";
    if (jQuery(evt.target).parents("#open-search").length === 0 &&
        jQuery(evt.target).parents(SEARCH_BOX).length === 0) {
        if (!jQuery(SEARCH_BOX).hasClass("d-none")) {
            jQuery(SEARCH_BOX).addClass("d-none");
        }
    }
}

function setHeaderSearchSplit(SEARCH_BOX) {
    jQuery('body').on('click', '#open-search', function() {
        var $searchBox = jQuery(SEARCH_BOX);
        $searchBox.toggleClass("d-none");
        if ($searchBox.hasClass("d-none")) {
            jQuery("body").off("click", outsideClickCloseCallback);
        } else {
            $searchBox.find(".input-field input").first().focus();
            jQuery("body").on("click", outsideClickCloseCallback);
        }
    });
}

function setHeaderSearch(ABBOTT) {
    var SEARCH_BOX = ".search-box";
    try {
        // show/hide search box
        setHeaderSearchSplit(SEARCH_BOX)

        /**
         * Method called on search  on enter
         */
        jQuery("body").on("keypress", "#globalSearchHeader input", function(e) {
            var key = e.which;
            if (key === 13) {
                // the enter key code
                e.preventDefault();
                jQuery("#globalSearchHeader .sim-icons").trigger("click");
            }
        });

        /**
         * Method called on search icon is clicked
         */
        jQuery("body").on("click", "#globalSearchHeader  .sim-icons", function(e) {
            ABBOTT.gtm.buildAndPush.formTracking('search', 'submit', 'search-submit');
            window.location.href = jQuery("#search-page-url").val() + "?q=" + jQuery("#globalSearchHeader input").val();
        });

    } catch (err) {
        console.log("Error:setHeaderSearch", err);
    }
}
/**
 * Method called on cookie disabled
 */
function showError() {
    jQuery("#template").show();
}

/**
 * Function for the drawer and disruptor components
 */
function setDrawerCollapse() {
    try {
        // close drawer component when clicked from outside
        var DRAWER_CONTENT = ".drawer-content.collapse";
        jQuery("body").click(function(evt) {
            var $drawerContent = jQuery(DRAWER_CONTENT);
            if (jQuery(evt.target).parents(".drawer-content").length === 0) {
                if ($drawerContent.is(":visible")) {
                    $drawerContent.collapse("hide");
                }
            }
        });
        jQuery(".drawer-title-wrapper").click(function() {
            var data = jQuery(this).data().gtm;
            var rest = data.substring(0, data.lastIndexOf("_"));
            if (jQuery(this).hasClass("collapsed")) {
                jQuery(this).attr("data-gtm", rest + "_expand");
                jQuery(this).data("gtm", rest + "_expand");
            } else {
                jQuery(this).attr("data-gtm", rest + "_collapse");
                jQuery(this).data("gtm", rest + "_collapse");
            }
        });
        // set the drawer component backdrop height
        if (jQuery(window).width() < 768) {
            jQuery(".drawer-title-wrapper").click(function() {
                setTimeout(function() {
                    jQuery(DRAWER_CONTENT).height(jQuery(document).height());
                }, 1000);
            });
        }
    } catch (err) {
        console.log("Error:setDrawerCollapse", err);
    }
}
/**
 * Function to set the jQuery UI select menu
 */
function setCustomSelect() {
    try {
        jQuery(".custom-select").each(function() {
            var selectBox = jQuery(this);
            selectBox.selectmenu({
                appendTo: selectBox.parent(),
                style: "dropdown",
                transferClasses: true,
                width: null,
            });
        });
    } catch (err) {
        console.log("Error:setCustomSelect", err);
    }
}
/**
 * @function
 * @desc Adds one item to quantity
 */
function addOneItem() {
    try {
        var $input = jQuery(this).closest(".stepper-control").find(".form-control");
        var currentQty = $input.val() - 0;
        $input.val(currentQty + 1);
    } catch (err) {
        console.log("Error:addOneItem", err);
    }
}
/**
 * @function
 * @desc Removes one item to quantity
 */
function removeOneItem() {
    try {
        var $input = jQuery(this).closest(".stepper-control").find(".form-control");
        var currentQty = $input.val() - 0;
        // Check for min quantity
        if (currentQty > 1) {
            $input.val(currentQty - 1);
        }
    } catch (err) {
        console.log("Error:removeOneItem", err);
    }
}
/**
 * Function to set increase/ decrease the stepper component
 */
function setStepper() {
    try {
        jQuery(".btn-add-one-item").on("click", addOneItem);
        jQuery(".btn-remove-one-item").on("click", removeOneItem);
    } catch (err) {
        console.log("Error:setStepper", err);
    }
}

function setText(el) {
    el.innerHTML = jQuery(el).data("html");
    var wordArray = el.innerHTML.split(" ");
    while (wordArray.length !== 0 && el.scrollHeight > el.offsetHeight) {
        wordArray.pop();
        el.innerHTML = wordArray.join(" ") + "...";
    }
}

function init(_ael, isUpdate) {
    for (var i = 0; i < _ael.length; i++) {
        var el = _ael[i];
        if (isUpdate) {
            jQuery(el).data("html", el.innerHTML);
        }
        setText(el);
    }
}

function initializeEllipsize() {
    jQuery.fn.ellipsizeTextBox = function(opt) {
        var ael = this;
        init(ael, true);
        var returnVal = (this.length === 0) ? false : true;
        return returnVal
    };
}

function setEllipsizeTextBox() {

    if (window.msCrypto) { //ie check
        jQuery(".card-body .card-title").ellipsizeTextBox();
        jQuery(".card-body .card-text").ellipsizeTextBox();
        jQuery(".card-body h5").ellipsizeTextBox();
        jQuery(".card-body h2").ellipsizeTextBox();
        jQuery(".card-body .quantity").ellipsizeTextBox();
    }
}

function setCardEqualHeights() {
    try {
        jQuery(".card-body > h3").responsiveEqualHeightGrid();
        jQuery(".card-body > h2").responsiveEqualHeightGrid();
        jQuery(".card-body > h5").responsiveEqualHeightGrid();
        jQuery(".card-body > .card-text").responsiveEqualHeightGrid();
        jQuery(".card-body > .quantity").responsiveEqualHeightGrid();
        jQuery(".card-body > .article-card-title").responsiveEqualHeightGrid();
        jQuery(".people_viewed .card-body > h3").responsiveEqualHeightGrid();
        jQuery(".people_viewed .card-body > .card-text").responsiveEqualHeightGrid();
    } catch (e) {}
}


function shutterflyPopup(pattern, SHUTTERFLY_SELECTOR) {
    var popUpDetails = {};
    if (pattern) {

        popUpDetails.pattern = pattern.split("|");
        jQuery.each(popUpDetails.pattern, function(term, item) {
            if (window.location.pathname.indexOf(item) > -1) {
                popUpDetails.popUp = jQuery(SHUTTERFLY_SELECTOR);
                popUpDetails.cookieName = "shutterfly";
                popUpDetails.cookieValue = true;
            }
        });

    }
    return popUpDetails;
}

function welcomePopup(pattern, WELCOME_SELECTOR) {
    var popUpDetails = {};
    if (pattern) {
        if (window.location.pathname === '/') {
            popUpDetails.popUp = jQuery(WELCOME_SELECTOR);
            popUpDetails.cookieName = "registration";
            popUpDetails.cookieValue = true;
        } else {
            popUpDetails.pattern = pattern.split("|");
            jQuery.each(popUpDetails.pattern, function(term, item) {
                if (window.location.pathname.indexOf(item) > -1 && window.location.pathname.indexOf('alimentum-powder') < 0) {
                    popUpDetails.popUp = jQuery(WELCOME_SELECTOR);
                    popUpDetails.cookieName = "registration";
                    popUpDetails.cookieValue = true;
                }
            });
        }
    }
    return popUpDetails;
}

function checkUserLogin(ABBOTT) {
    var popUpDetails = {};
    var pattern;
    if (!ABBOTT.cookie(xIdToken) && !ABBOTT.cookie("similac-remember-me")) {
        // get the url pattern to match to show which pop up content
        if (!popUpDetails.popUp && !ABBOTT.cookie("shutterfly")) {
            var SHUTTERFLY_SELECTOR = "#shutterfly-popup";
            pattern = jQuery(SHUTTERFLY_SELECTOR).data("url-pattern");
            popUpDetails = shutterflyPopup(pattern, SHUTTERFLY_SELECTOR);
        }
        //check registration cookie is not present
        if (!popUpDetails.popUp && !ABBOTT.cookie("registration")) {
            var WELCOME_SELECTOR = "#welcome-popup";

            pattern = jQuery(WELCOME_SELECTOR).data("url-pattern");
            popUpDetails = welcomePopup(pattern, WELCOME_SELECTOR);
        }


    }
    return popUpDetails;
}

function setPopUpSplitpopUpDetails(ABBOTT, popUpDetails) {
    if (ABBOTT.cookie("DO") && !isPWA()) {// Added isPWA to hide "switchToDigital" popup in PWA
        var lc = ABBOTT.cookie("DO");
        var lp = JSON.parse(lc);
        if (lp.status !== false) {
            popUpDetails.popUp = jQuery("#do-popup");
            popUpDetails.cookieName = "DO";
            popUpDetails.cookieValue = JSON.stringify({ UID: lp.UID, status: false });
        }
    }
    return popUpDetails;
}

// Sweep stack popup
function sweepPopup(ABBOTT, popUpDetails) {
    if(sessionStorage.getItem('sweepPopUp')) {
        popUpDetails.popUp = jQuery("#sweep-popup");
        popUpDetails.cookieName = "sweepPopUp";
        popUpDetails.cookieValue = "";
    }
    return popUpDetails;
}

function setPopUp(ABBOTT) {
    try {
        //sign up pop up - START
        var popUpDetails = {};
        //check login then show do pop up
        if (ABBOTT.cookie(xIdToken)) {
            popUpDetails = setPopUpSplitpopUpDetails(ABBOTT, popUpDetails);
            if(sessionStorage.getItem('sweepPopUp')) {
                popUpDetails = sweepPopup(ABBOTT, popUpDetails);
            }
        } else {
            //else show welcome/ shutterfly pop up
            popUpDetails = checkUserLogin(ABBOTT);
        }

        if (popUpDetails.popUp) {
            popUpDetails.ctaDays = popUpDetails.popUp.data("cta-days");
            popUpDetails.signupDays = popUpDetails.popUp.data("signup-days");
            jQuery("#registration-popup .modal-body").html(popUpDetails.popUp.html());

            jQuery("#registration-popup").modal("show");
            ABBOTT.gtm.buildAndPush.formTracking('pop-up', 'load', popUpDetails.cookieName + '-pop-up');
            // set registration cookie
            jQuery(
                "#registration-popup .modal-close, #registration-popup .modal-submit, #registration-popup .close-link"
            ).on("click", function(e) {
                var cookieConfig = {
                    path: '/',
                    domain: 'similac.com'
                };
                if (jQuery(this).hasClass("modal-close") || jQuery(this).hasClass("close-link")) {
                    cookieConfig.expires = parseInt(popUpDetails.ctaDays);
                    ABBOTT.cookie(popUpDetails.cookieName, popUpDetails.cookieValue, cookieConfig);
                    ABBOTT.gtm.buildAndPush.formTracking('pop-up', 'click', popUpDetails.cookieName + '-pop-up_close');
                }
                if (jQuery(this).hasClass("modal-submit")) {
                    cookieConfig.expires = parseInt(popUpDetails.signupDays);
                    ABBOTT.cookie(popUpDetails.cookieName, popUpDetails.cookieValue, cookieConfig);
                    ABBOTT.gtm.buildAndPush.formTracking('pop-up', 'click', popUpDetails.cookieName + '-pop-up_yes');
                    window.location.href = popUpDetails.popUp.data("url");
                }
                sessionStorage.removeItem('sweepPopUp');
                // Removing the cookie and removing the timeout memory 
                var clearTime = setTimeout(function(){
                    if(ABBOTT.cookie('sweepPopUp')){ 
                        cookieConfig.expires = -1;
                        ABBOTT.removeCookie('sweepPopUp', cookieConfig);
                        clearTimeout(clearTime); 
                    }   
                }, 1000);
                jQuery("#registration-popup").modal("hide");
                jQuery(".modal-backdrop.show").remove();
            });

        }
    } catch (e) {}
}

function sonarFnCHange() {

    jQuery("body").on("click", "#template .sim-icon", function(e) {
        jQuery("#template").hide();
    });
    var url = window.location.href;

    /**Function to mark Menu and sub menu active pages */
    jQuery(".main-nav a").each(function() {
        if (url === this.href) {
            jQuery(this).closest("li").addClass("active");
            jQuery(this).closest("li").parent().parent().addClass("active");
        }
    });
}

function setAnnouncementBanner() {
    var ANNOUNCEMENT_SELECTOR = jQuery('#announcementTemplate');
    var covidSession = sessionStorage.getItem("myAnnouncement");

    jQuery("#announcementTemplate .sim-icon").click(function() {
        sessionStorage.setItem("myAnnouncement", "covid19data");
        ANNOUNCEMENT_SELECTOR.hide();
    });

    if (covidSession) {
        ANNOUNCEMENT_SELECTOR.hide();
    } else {
        ANNOUNCEMENT_SELECTOR.show();
    }
}

function majorMainFN(ABBOTT) {
    /**Function call when cookie disabled */
    if (!navigator.cookieEnabled) {
        showError();
    }

    sonarFnCHange()
        /**Function to change formula-finder-device */
    if (jQuery(window).width() < 767) {
        var ffdevice = jQuery('.formula-finder-device .column-control .row')
        ffdevice.find('.col-sm-6.col-lg-12.col-md-6.col-xl-12.mb-1_875 .image.section').insertBefore(ffdevice.find('.col-lg-8.mb-1_875 .text.section').last());
    }
    /**PDP Page star rating  */
    jQuery('.pdp-info__rating [data-bv-show="rating_summary"] svg').css('cssText', 'width: 16px !important')
    jQuery('.pdp-info__rating [data-bv-show="rating_summary"] svg').css('cssText', 'height: 16px !important')


    // Add the product to cart when add to cart button is clicked in any card component.
    jQuery(".add-cart").click(function() {
        var skuId = jQuery(this).parents(".card-body").data("product-sku");
        var data = {
            sku: skuId,
            qty: 1,
        };
        var addEvent = new CustomEvent("addToCart", {
            detail: data,
        });
        window.dispatchEvent(addEvent);
    });

    const queryString = new URLSearchParams(window.location.search);
    const parameters = {};
    for (var value of queryString.keys()) {
        parameters[value] = queryString.get(value);
    }
    const keys = Object.keys(parameters);
    const reqparams = ["utm_campaign", "utm_source", "utm_content", "utm_term", "utm_medium"];
    if (keys.length > 0) {
        keys.forEach(e => {
            if (reqparams.includes(e)) {
                sessionStorage.setItem('MediaTracking', JSON.stringify(parameters));
            }

        })
    }


    //sign up pop up - ENDS
    setSvg();
    if (isPWA() && !(ABBOTT.cookie(xIdToken) && ABBOTT.cookie("profile"))) {
        jQuery('#hamburger').removeClass('d-flex').addClass('d-none');
    } 
    setHeaderHamburger();
    setHeaderSearch(ABBOTT);
    setDrawerCollapse();
    setCustomSelect();
    setStepper();
    initializeEllipsize();
    setEllipsizeTextBox();
    setCardEqualHeights();
    setPopUp(ABBOTT);
    setAnnouncementBanner();
    // Exposed assets
    if(isPWA()){
        setViewPort();
        setLoginPageCSS();
        setScanPageCSS();
        analyticsForPWAScanPages();
        analyticsForPWATabs();
        analyticsForLocateQRCodeBtn();
        analyticsForLocateQRLink();
        analyticsForWrongQRCodeBtn();
        analyticsForLocateQRLinkInPopUp();
        setLogoutButtonLayout();
        setSmsNotificationPage();
        setAccntSettingPageCSS();
        setErrorMessageCSS();
        setWrongQrCodePageCSS();
    }else{
        unSetLoginPageCSS();
        unSetErrorMessageCSS();
        if (ABBOTT.cookie(xIdToken) && ABBOTT.cookie("profile")) {
            setFooterNavPipe();
        }
        setToddlerListItemCss();
        unsetZoomFromRewardPages();
    }
}
(function(ABBOTT) {

    ABBOTT.getScrollPercent = function getScrollPercent() {
        var h = document.documentElement,
            b = document.body,
            st = 'scrollTop',
            sh = 'scrollHeight';
        return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
    };
    ABBOTT.throttle = function throttle(func, timeFrame) {
        var lastTime = 0;
        return function() {
            var now = new Date();
            if (now - lastTime >= timeFrame) {
                func();
                lastTime = now;
            }
        };
    }
    ABBOTT.debounce = function debounce(func, delay) {
        var debounceTimer;
        return function() {
            var context = this;
            var args = arguments;
            clearTimeout(debounceTimer);
            debounceTimer
                = setTimeout(function() { func.apply(context, args) }, delay)
        }
    }

    window.addEventListener('load', function() {
        if( window && window.addThisSocialScript){
        var addThisscript = document.createElement('script');
        addThisscript.type = 'text/javascript';
        addThisscript.src = window.addThisSocialScript;
        document.getElementsByTagName('head')[0].appendChild(addThisscript);
        }
    })

    var addThisCallback = ABBOTT.debounce(function() {
        var addThisDiv = document.getElementById('at-share-dock');
        if (addThisDiv) {
            var scrollPercent = parseInt(ABBOTT.getScrollPercent());
            jQuery(addThisDiv).parent().addClass('d-lg-none').removeClass("at4-visually-hidden");
            if (scrollPercent > jQuery(window).width() && jQuery(window).width() < 992 && scrollPercent >= 97) {
                jQuery(addThisDiv).css("position", "static");
            } else {
                jQuery(addThisDiv).css("position", "");
            }
        }
    }, 300);
    window.addthis && window.addthis.addEventListener('addthis.ready', addThisCallback);
    jQuery(window).on('scroll resize load DOMContentLoaded', addThisCallback);

    function showContent() {
        jQuery('#template').show();

    }

    jQuery("#template .sim-icon").click(function() {
        jQuery('#template').hide();
    });

    ABBOTT.main = (function() {
        majorMainFN(ABBOTT)
        return {
            setSocialIcons: setSocialIcons,
            initLazyImgLoad: initLazyImgLoad
        };
    })();
})(window.ABBOTT);
var redirectAccountLink = function(e, accountLinking) {
    if (window.sessionStorage && e.response && e.response.regToken) {
        sessionStorage.setItem('regToken', e.response.regToken);
        sessionStorage.setItem("loginID", e.response.loginID);
    }
    if (accountLinking) {
        document.location = accountLinking;
    }
}

var filterReqData = function(e) {
    var resp = e.response || {};
    return {
        uid: resp.UID,
        registrationToken: resp.regToken,
        UIDSig: resp.UIDSig,
        UIDSignature: resp.UIDSignature,
        userName: resp.email,
        firstName: resp.firstName,
        lastName: resp.lastName,
        loginProvider: resp.loginProvider,
        photoURL: resp.photoURL,
    };
};

var error = function(e) {
    if (e.errorCode === "403043") {
        
    var jsonSocialLoginData = window.jsonSocialLoginData || {};
    var accountLinkingURL = jsonSocialLoginData.accountLinkingURL;

        redirectAccountLink(e, accountLinkingURL);
        return;
    }
    var data = filterReqData(e);
    if (window.regObj) {
        window.regObj.setGigyaData &&
            window.regObj.setGigyaData(data, ["uid", "registrationToken"]);
    }
};

var login = function(e) {
    return true;
};
var onScrollResize = function(e) {	
    if (jQuery("#SocialLoginDiv").length) {
    ABBOTT.socialLogin("", "SocialLoginDiv", login, error);	
    e.stopPropagation();
    }
    if (jQuery("#SocialRegisterDiv").length) {
        ABBOTT.socialLogin("", "SocialRegisterDiv", login, error);	
        e.stopPropagation();
    }
    if (window.location.href.indexOf("/app/login") > -1) {
        ABBOTT.socialLogin("", "SocialLoginDivId", login, error);
        e.stopPropagation();
    }
    return "";	
};
jQuery("#user").click(function(e){
    if (jQuery("#SocialLoginDivId").length) {
        ABBOTT.socialLogin("", "SocialLoginDivId");	
        e.stopPropagation();	
    }
})

/**
 * Function for Social login
 */
document.addEventListener("DOMContentLoaded", function() {
    
    if (jQuery("#SocialLoginDiv").length) {
        ABBOTT.socialLogin("", "SocialLoginDiv", login, error);
    }
    if (jQuery("#SocialRegisterDiv").length) {
        ABBOTT.socialLogin("", "SocialRegisterDiv", login, error);
    }
    if (window.location.href.indexOf("/app/login") > -1) {
        ABBOTT.socialLogin("", "SocialLoginDivId", login, error);
    }
    window.addEventListener('scroll', function(event){
        onScrollResize(event)
      });
});




/**
 * Function for lazy load the images
 */
document.addEventListener("DOMContentLoaded", function() {
    initLazyImgLoad();
});

function initLazyImgLoad() {

    var lazyImages = [].slice.call(document.querySelectorAll("[data-src]"));
    var active = false;
    var switchAttr = function(el, srcAttr, target) {
        var targetData = el.getAttribute(srcAttr);
        if (el && srcAttr && target && targetData) {
            el.setAttribute(target, el.getAttribute(srcAttr));
            el.classList.add("updated");
        }
    };
    var lazyLoad = function() {
        if (active === false) {
            active = true;

            setTimeout(function() {
                lazyImages.forEach(function(lazyImage) {
                    loadLazyImages(lazyImage)
                });
                active = false;
            }, 200);
        }
    };

    function loadLazyImages(lazyImage) {
        if (
            lazyImage.getBoundingClientRect().top <= window.innerHeight &&
            lazyImage.getBoundingClientRect().bottom >= 0 &&
            getComputedStyle(lazyImage).display !== "none"
        ) {
            if (typeof lazyImage.dataset.src !== "undefined") {
                if (
                    String(lazyImage.src).toLowerCase().trim() !==
                    String(lazyImage.dataset.src).toLowerCase().trim()
                ) {
                    lazyImage.src = lazyImage.dataset.src;
                    if (
                        lazyImage.parentElement &&
                        String(lazyImage.parentElement.tagName).toUpperCase() ===
                        "PICTURE"
                    ) {
                        var sourceTags =
                            lazyImage.parentElement.querySelectorAll("[data-srcset]") || [];
                        sourceTags.forEach(function(sourceTag) {
                            switchAttr(sourceTag, "data-srcset", "srcset");
                        });
                    }
                }
            }
            lazyImage.classList.add("lazy");

            lazyImages = lazyImages.filter(function(image) {
                return image !== lazyImage;
            });

            if (lazyImages.length === 0) {
                document.removeEventListener("scroll", lazyLoad);
                document.removeEventListener("mouseup", lazyLoad);
                window.removeEventListener("resize", lazyLoad);
                window.removeEventListener("orientationchange", lazyLoad);
            }
        }
    }

    document.addEventListener("scroll", lazyLoad);
    document.addEventListener("mouseup", lazyLoad);
    window.addEventListener("resize", lazyLoad);
    window.addEventListener("orientationchange", lazyLoad);
    window.addEventListener("load", lazyLoad);

}
jQuery("#updatePasswordClose").on("click", function(e) {
    jQuery("#updatepassword-popup").modal("hide");
});

jQuery("#updatePasswordConfirm").on("click", function(e) {
    jQuery("#updatePasswordConfirm-popup").modal("hide");
});

jQuery(window).on('load', function() {
    jQuery("#overlay").hide();
});
//Exit-popUp function

var exitPopUptitle = jQuery("#popup-title").val();
var exitPopUpText = jQuery("#popup-text").val();
var exitPopUpConfirmBtnLabel = jQuery("#confirm-button-label").val();
var exitPopUpCancelBtnlLabel = jQuery("#cancel-button-lablel").val();
var ExitPopUpsafeList = jQuery('#safe-list').val();
var classNameForModel = classNamePWAModel();
if ((ExitPopUpsafeList != "") && (ExitPopUpsafeList != "undefined") && (ExitPopUpsafeList != undefined)) {
    ExitPopUpsafeList = ExitPopUpsafeList.split(',');
}

function customwarnOnLeave(a) {
    swal({

        title: exitPopUptitle,
        text: exitPopUpText,
        className: classNameForModel,        
        closeOnClickOutside: false,
        buttons: {

            confirm: {
                text: exitPopUpConfirmBtnLabel,
                value: "ok",
            },
            cancel: true
        }
    }).then(function(value) {
        if (value === "ok") {      
            if(isPWA()){     
               ABBOTT.gtm.buildAndPush.formTracking('pop-up', 'select', 'pwa_exit-site_ok');
            }
            else{
                ABBOTT.gtm.buildAndPush.formTracking('pop-up', 'select', 'exit-site_ok');
            }
            window.open(a, "_blank");
        } else if (!value) {
            if(isPWA()){
                ABBOTT.gtm.buildAndPush.formTracking('pop-up', 'select', 'pwa_exit-site_cancel');
            }else{
                ABBOTT.gtm.buildAndPush.formTracking('pop-up', 'select', 'exit-site_cancel');
            }
            swal.close();
        }
    })
}
jQuery("a").click(function(a) {
    a.preventDefault();
    var hostnameCheck = false;
    var hostLink = jQuery(this).attr('href');
    var urlTarget = jQuery(this).attr('target');
    var samplePLID = jQuery(this).attr('id');
    if (hostLink === "#" || hostLink == null || hostLink === "" || hostLink.startsWith("#") || hostLink.startsWith("ja")) {
        window.open(hostLink, "_self");
    } else {
        var noHostUrl = hostLink.startsWith("/");
        if (noHostUrl) {
            window.open(hostLink, "_self");
        } else {
            var hostUrl = new URL(hostLink);
            var hostUrlName = hostUrl.hostname;
            hostnameCheck = ExitPopUpsafeList.includes(hostUrlName);
            if (!hostnameCheck && samplePLID !== "pampersPrivacyLink") {
                customwarnOnLeave(hostLink);
            } else {
                linkOpenDecider(urlTarget, hostLink)   
            }
        }
    }

});

function linkOpenDecider(linkTarget, linkToOpen){
    if (linkTarget === "_blank") {
        window.open(linkToOpen, "_blank");
    } else {
        window.open(linkToOpen, "_self");
    }
}


jQuery(document).ready(function() {
    var headTitle = jQuery('head title');
    var f = headTitle.get(0).innerText;
    var d = new Date();
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    if (f.includes('mmm.yyyy')) {
        headTitle.get(0).innerText = f.replace('mmm.yyyy', `${months[d.getMonth()]}.${d.getFullYear()}`);
    } else {
        headTitle.get(0).innerText = f.replace('yyyy', d.getFullYear());
    }    
   // Add logic to remove cookie after DO opt-in
    if((window.location.href.indexOf("core-welcome") > -1 || window.location.href.indexOf("profile") > -1) &&
        sessionStorage.getItem("sweepPopUp")) {
        var sweepConfig = {
            path: "/",
            domain: "similac.com"
        };
        ABBOTT.removeCookie("MediaTracking", sweepConfig);
    }
});
function isPWA() {
    if (window.location.href.indexOf("/app") > -1) {
        return true;
    }
    return false;
}
function setLogoutButtonLayout() {
    jQuery('[data-fun="signOut"]').addClass('btn btn-primary col-12 col-lg-8').css({ 'color': '#464646 !important', 'font-weight': '450', 'width': '12.5rem', 'height': '2.75rem' });
    jQuery('#account-logout').parents('div.button').css({
        'border-bottom': '0.063rem solid #029ce8',
        'text-align': 'center',
        'padding': '0 15px 0 15px'
    });
    /**Find a Retailer pop-out image css fix */
    jQuery('#find-a-retailer-link').parent('div').css({
        'background': 'url(/content/dam/an/similac/global/icons/navigation-icon-medium.png) no-repeat 110px 2px transparent',
        'background-size': '18px'
    });
    jQuery('#account-similac-link').parent('div').css({
        'background': 'url(/content/dam/an/similac/global/icons/navigation-icon-medium.png) no-repeat 180px 0px transparent',
        'background-size': '18px'
    });
    return;
}

function setViewPort() {
    document.querySelector('[name="viewport"]').setAttribute('content','width=device-width,height=device-height,initial-scale=1.0,user-scalable=no,user-scalable=0');
}

function isMobileDevice() {
    var check;
    if (/SM-T/i.test(navigator.userAgent)) {// false for samsung tablet
      check = false;
    }
    else if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      check = true;
    }
    return check;
}

function setSmsNotificationPage() {
    if (jQuery('#similac-pwa-sms-notify').length > 0) {
        document.body.style.backgroundColor = '#f2f8fb';
    }
    let smsCheck;
    if (!smsCheck && ABBOTT.cookie(xIdToken)) {
        smsCheck = setInterval(function() {
            if (ABBOTT.cookie("pwa_sms")) {
                const cookieConfig = {
                    path: "/",
                    domain: "similac.com",
                    expires: 0
                  };
                ABBOTT.cookie("pwa_sms", JSON.stringify({ pwa_sms: true }), cookieConfig);
                clearInterval(smsCheck);
                window.location = "/content/an/similac/us/en/app/sms-notification.html";
            }
        }, 15000); /**updated it to 15 seconds wait time */
    }
}

function setLoginPageCSS() {
    jQuery('#similac-pwa-login').removeClass('bg-white pt-sm-none mt-2_625');
    if(jQuery('#similac-pwa-login').length>0)
    {
        browser = detectBrowser();
        document.body.style.backgroundColor = '#7fbed9';
        if(browser == 'safari'){
            document.body.style.height = '100%';
        }else{
            document.body.removeAttribute('height');
        }
    }else{
        document.body.removeAttribute('backgroundColor');
    }
}
function setScanPageCSS() {
    if(jQuery('#pwa-confirm-page').length>0 || jQuery('#pwa-scan-limit').length>0 || jQuery('#pwa-scan-bonus').length>0 || jQuery('#pwa-double-bonus').length>0 || jQuery('#locate-qr-code-page').length>0 || jQuery('#wrong-qr-scan-page').length>0)
    {
        browser = detectBrowser();
        document.body.style.backgroundColor = '#003087';
        if(browser == 'safari'){
            document.body.style.height = '100%';
        }else{
            document.body.removeAttribute('height');
        }
    }else{
        document.body.removeAttribute('backgroundColor');
    }
}
function analyticsForPWAScanPages() {
    jQuery("#pwa-confirm-dashboard").click((e) => {
        ABBOTT.gtm.buildAndPush.formTracking(
          "rewards",
          "click",
          "pwa_confirmation_go-to-dashboard-button"
        );
    });
    jQuery("#pwa-bonus-dashboard").click((e) => {
        ABBOTT.gtm.buildAndPush.formTracking(
          "rewards",
          "click",
          "pwa_bonus_go-to-dashboard-button"
        );
    });
    jQuery("#pwa-limit-dashboard").click((e) => {
        ABBOTT.gtm.buildAndPush.formTracking(
          "rewards",
          "click",
          "pwa_scan-limit_go-to-dashboard-button"
        );
    });
    jQuery("#pwa-double-bonus-dashboard").click((e) => {
        ABBOTT.gtm.buildAndPush.formTracking(
          "rewards",
          "click",
          "pwa_double-bonus_go-to-dashboard-button"
        );
    });
}
function analyticsForPWATabs() {
    jQuery('.nav-tabs a:eq(0)').click((e) => {
        ABBOTT.gtm.buildAndPush.formTracking(
          "tab",
          "click",
          "pwa_savings_tab"
        );
    });
    jQuery('.nav-tabs a:eq(1)').click((e) => {
        ABBOTT.gtm.buildAndPush.formTracking(
          "tab",
          "click",
          "pwa_rewards_tab"
        );
    });
    jQuery('.nav-tabs a:eq(2)').click((e) => {
        ABBOTT.gtm.buildAndPush.formTracking(
          "tab",
          "click",
          "pwa_account_tab"
        );
    });
}
function unSetLoginPageCSS() {
    if(jQuery("body").length > 0){
        document.body.removeAttribute('backgroundColor');
    }
}

function detectBrowser(){
    let userAgent = navigator.userAgent;
    let browserName;
    if (userAgent.match(/chrome|chromium|crios/i)) {
        browserName = "chrome";
    } else {
        browserName = "safari";
    }
    return browserName;
}

function classNamePWAModel()
{
    if (window.location.href.indexOf("/app") > -1) {
        return 'similac-modal-ExitPopup-PWA';
    }
    return 'similac-modal';
}

function setAccntSettingPageCSS(){
    if (window.location.href.indexOf("/app/account/account-settings.html") > -1) {
        jQuery('#account-setting-single-opt-in').hide();
        jQuery('#account-settings').hide();
        jQuery('#account-setting-mobile').hide();
    }
}

function downloadPopupBannerClose() {
    var popupBanner = document.querySelector('.downloadPopup-banner');
    popupBanner.style.display = 'none';
    $("#downloadPwa-banner-chrome").modal("hide");
    $("#downloadPwa-banner-safari").modal("hide");
    setCookieDownloadBanner();
  }
function showDownloadPopupAddbutton(){
    ABBOTT.gtm.buildAndPush.formTracking(
        "internal-link",
        "click",
        "pwa_add-to-homescreen"
      );
    const browserName = fnBrowserDetect();
    //Show PWA Download pop up
    if (browserName == 'chrome') {
        $("#downloadPwa-banner-chrome").modal("show");
      } else {
        $("#downloadPwa-banner-safari").modal("show");
      }
}  
function setCookieDownloadBanner()
{
    const cookieConfig = {
        path: "/",
        domain: "similac.com",
    };
    ABBOTT.cookie(
        "isDownloadBanner",
        "true",
        cookieConfig
    );
}

function fnBrowserDetect(){
    let browserName;
    if (navigator.userAgent.match(/chrome|chromium|crios/i)) {
      browserName = "chrome";
    } else {
      browserName = "safari";
    }
    return browserName;
  }

function analyticsForLocateQRLink() {
    jQuery("#locate-qr-code-link").click((e) => {
        ABBOTT.gtm.buildAndPush.formTracking(
          "internal-link",
          "click",
          "pwa_locate-qr-code"
        );
    });
}

function analyticsForLocateQRCodeBtn() {
    jQuery("#locate-qr-got-it").click((e) => {
        ABBOTT.gtm.buildAndPush.formTracking(
          "locate-qr",
          "click",
          "pwa_locate-qr-got-it-button"
        );
    });
}

function analyticsForWrongQRCodeBtn() {
    jQuery("#wrong-qr-got-it").click((e) => {
        ABBOTT.gtm.buildAndPush.formTracking(
          "camera-scan",
          "click",
          "pwa_wrong-qr-scan-page-got-it-button"
        );
    });
}

function analyticsForLocateQRLinkInPopUp() {
    jQuery("#pop-up-locate-qr-code-link").click((e) => {
        ABBOTT.gtm.buildAndPush.formTracking(
        "pop-up",
        "click_event",
        "pwa-pop-up-locate-qr-code"
        );
    });
}

function setErrorMessageCSS() {
    jQuery('#template p').css({ 'font-family': 'BrandonText, Arial, sans-serif', 'font-weight': '450' });
}

function unSetErrorMessageCSS() {
    jQuery('#template p').css({ 'font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', 'font-weight': '400' , 'color': '#ffffff'});
}
  
// TrustARC Alertbanner logic starts 
var alertbannerEle =  document.querySelector('.m-alert-banner');
if(alertbannerEle){
    var selfValue;
    var assginedSelfValue = document.getElementById('selfValue') ?  document.getElementById('selfValue').value.trim() : "";
    if(assginedSelfValue.length){
        selfValue = assginedSelfValue;
    } else {
        selfValue = window.location.host;
    }
    var cmId = document.getElementById('cmpidField') ?  document.getElementById('cmpidField').value : "";          
	// Expand and Collapse logic
	var collapseEl  = document.querySelector('.m-collapse');
	var expandEl = document.querySelector('.m-expand');
	// Collapse the banner
	collapseEl.addEventListener('click', function(){
		this.classList.add('d-none');
		expandEl.classList.remove('d-none');
		document.querySelector('.m-alert-banner__content__para').classList.add('d-none');
	
	});
	// Expand the banner
	expandEl.addEventListener('click', function(){
		this.classList.add('d-none');
		collapseEl.classList.remove('d-none');
		document.querySelector('.m-alert-banner__content__para').classList.remove('d-none');
		document.querySelector('.m-alert-banner--button').classList.remove('d-none');
	});
	
	// Enable cookies
	var getBtnContainer = document.querySelector('.m-alert-banner__content');
	var getBtn =  getBtnContainer.querySelector('button');
	if(getBtn){
		getBtn.addEventListener('click', function(){
			var teConsentBtn =  document.getElementById('teconsent');
			if(teConsentBtn){
				teConsentBtn.querySelector('a').click();
			}
			
		}
		);
	}
	
	// Get consent status and show banner
	document.addEventListener("DOMContentLoaded", function(){
		var checkTAstatus;
		if(checkTAstatus){
			clearTimeout(checkTAstatus);
		}
		setTimeout(function(){
			var getSiteConsentStatus = PrivacyManagerAPI.callApi("getConsentDecision",window.location.host);
			 if(getSiteConsentStatus.source === "asserted" && getSiteConsentStatus.consentDecision === 1){
				document.querySelector('.m-alert-banner').classList.remove('d-none');
			} else {
				document.querySelector('.m-alert-banner').classList.add('d-none');
			}
		},500);
	});
	
	//Refresh the page on Trustarc btn click
	document.addEventListener('click',function(e){
	var targetId = e.target.closest('#teconsent');
	if(targetId){
		sessionStorage.setItem('trustDialogStatus',true);
		var checkFrameLoad = setInterval(function(){
			if(sessionStorage.getItem('trustDialogStatus') && document.querySelector('.truste_box_overlay').querySelector('iframe')){
				clearInterval(checkFrameLoad);
				var removeFrameInterval = setInterval(function(){
				if(!document.querySelector('.truste_box_overlay')){
					clearInterval(removeFrameInterval);
					sessionStorage.removeItem('trustDialogStatus');
					setTimeout(function() {
						var res = window.truste && truste.cma.callApi("getConsent",window.location.host,cmId);
						if(res){
							window.location.href = location.href;
						}
					},1000);
				}
			},1500);   
			}
			
		},1000);
	}
});
	
	
jQuery('.m-alert-banner__icon .abt-icon-alert').html('<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.34335 0.152918C6.04684 0.298284 5.80724 0.537885 5.66187 0.834398L0.136248 12.0911C-0.186641 12.7473 0.0840061 13.541 0.740641 13.8641C0.922307 13.9536 1.12261 14 1.32577 14H12.6747C13.4058 14.0009 13.9991 13.408 14 12.6764C14 12.4727 13.9536 12.2724 13.8639 12.0905L8.33851 0.834198C7.98965 0.124575 7.15238 -0.184999 6.43227 0.112736L6.34335 0.152918ZM7.55319 1.21999L13.0788 12.4767C13.1093 12.5385 13.125 12.6065 13.125 12.6759C13.1247 12.924 12.9233 13.1253 12.6752 13.125H1.32577C1.25637 13.125 1.18844 13.1093 1.12718 13.0791C0.903703 12.9691 0.811872 12.6998 0.921508 12.477L6.44741 1.21976C6.50747 1.09725 6.6062 0.998526 6.72894 0.93835C7.0339 0.788424 7.40299 0.914481 7.55319 1.21999ZM7.00024 4.37523C7.22172 4.37523 7.40477 4.53982 7.43373 4.75336L7.43773 4.81272V9.18761C7.43773 9.42923 7.24186 9.6251 7.00024 9.6251C6.77876 9.6251 6.59572 9.46052 6.56675 9.24698L6.56276 9.18761V4.81272C6.56276 4.5711 6.75863 4.37523 7.00024 4.37523ZM7.00024 10.5001L7.07174 10.5039C7.40048 10.5396 7.65647 10.8181 7.65647 11.1563C7.65647 11.5187 7.36261 11.8126 7.00024 11.8126C6.63788 11.8126 6.34402 11.5187 6.34402 11.1563C6.34402 10.8181 6.60001 10.5396 6.92875 10.5039L7.00024 10.5001Z" fill="#004F71"/></svg>');
jQuery('.m-alert-banner .abt-icon-down-arrow').html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.14643 4.00645C0.319988 3.83287 0.589412 3.81358 0.784286 3.94856L0.853537 4.00642L8 11.152L15.1465 4.00642C15.32 3.83286 15.5895 3.81358 15.7843 3.94859L15.8536 4.00645C16.0271 4.18002 16.0464 4.44945 15.9114 4.64431L15.8535 4.71356L8.70749 11.8589C8.34771 12.2199 7.78007 12.2481 7.38793 11.9433L7.29345 11.8599L0.146463 4.71356C-0.0488082 4.5183 -0.0488229 4.20172 0.14643 4.00645Z" fill="#222731"/></svg>');
jQuery('.m-alert-banner .abt-icon-up-arrow').html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.14643 11.9961C0.319988 12.1697 0.589412 12.189 0.784286 12.054L0.853537 11.9961L8 4.85056L15.1465 11.9961C15.32 12.1697 15.5895 12.189 15.7843 12.054L15.8536 11.9961C16.0271 11.8225 16.0464 11.5531 15.9114 11.3582L15.8535 11.289L8.70749 4.14361C8.34771 3.7826 7.78007 3.75448 7.38793 4.05922L7.29345 4.14267L0.146463 11.289C-0.0488082 11.4842 -0.0488229 11.8008 0.14643 11.9961Z" fill="#222731"/></svg>');	
}

function setFooterNavPipe() {
    //code to display pipe in last nav item when user logged in
    if (window.innerWidth > 991) { // viewport desktop only
        var navItem = document.querySelector('footer .second-nav-list li.nav-item:nth-child(6) a');
        if (navItem) {
            navItem.style.borderRight = '2px solid #ffffff';
        }
    }
}

function setToddlerListItemCss(){
	if(window.innerWidth <= 991){
		jQuery('ul.toddler-bullet li').css('font-size','1rem');
	}
}

function setWrongQrCodePageCSS() {
    if (jQuery('#wrong-qr-scan-page').length > 0) {
        var concatenatedString = '';
        concatenatedString += jQuery('#wrong-qr-subtitle-first').html();
        concatenatedString += jQuery('#wrong-qr-subtitle-second').html();
        concatenatedString += jQuery('#wrong-qr-subtitle-third').html();
        concatenatedString = concatenatedString.replace(/<p/g, '<span').replace(/<\/p>/g, '</span>');
        concatenatedString += jQuery('#wrong-qr-subtitle-fourth').html();
        $('#wrong-qr-subtitle-first').html(concatenatedString);
    }
}

function unsetZoomFromRewardPages() {
    let currentPage = window.location.href;
    if (currentPage.indexOf("rewards.html") > -1 || currentPage.indexOf("digitalrewards.html") > -1) {
        jQuery('meta[name="viewport"]').attr('content', 'width=device-width, initial-scale=1, maximum-scale=1');
    }
}
