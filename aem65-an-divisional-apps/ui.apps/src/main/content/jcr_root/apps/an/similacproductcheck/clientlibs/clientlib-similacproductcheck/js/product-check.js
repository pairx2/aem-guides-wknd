let overlayLoader = jQuery("#page-spinner");
const appJson = "application/json";
const country = jQuery("input[name=x-country-code]").val();
const language = jQuery("input[name=x-preferred-language]").val();
const application = jQuery("input[name=x-application-id]").val();
let templatePara = jQuery("#template.global-error p");
let templateBody = jQuery("#template");
let htmlBody = jQuery("html, body");
let contingency_page = jQuery("input[name=contingency-redirect]").val();
let contingency_page_global = jQuery(
  "input[name=contingency-redirect-global]"
).val();
let missing_prod_data = [];
let input_prod_array_before = jQuery("input[name=prod_attr]").val();
let input_prod_array = input_prod_array_before
  ? input_prod_array_before.split(",")
  : "";
let prod_attr = input_prod_array;
let attr_names = [];
let latitude = "";
let longitude = "";
let loc = false;
let prodSku = "";
let productEventCategory = jQuery("#prod-event-category").val();
let contingencyEventCategory = jQuery("#contingency-event-category").val();
let product = {
  sku: null,
  batchNumber: null,
  lotNumber: null,
  site: null
};
$('#popUpButtonId').hide();
$('#popUpButtonIdNew').hide();
const superScriptString = document.getElementById("super-script-indicators");
$('#popUpButtonIdInfant').hide();
$('#popUpButtonIdInfantNew').hide();
$('#popUpButtonIdToddler').hide();
$('#popUpButtonIdToddlerNew').hide();
productEventCategory = country + "-" + productEventCategory;
contingencyEventCategory = country + "-" + contingencyEventCategory;
/**
 * @method
 * @desc used for reading cookie
 * @param {string} cookie name parameter
 * @return {string} cookie value
 */
const getCookieValue = name =>
  document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";
let wcm_cookie = getCookieValue("wcmmode");

/**
 * @method
 * @desc used for reading query parameter
 * @param {string} query name parameter
 * @return {string} query value
 */
function getUrlParameter(name) {
  name = name.replace(/\[/, "\\[").replace(/\]/, "\\]");
  let regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  let results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

/**
 * @method
 * @desc used for redirecting to contingency page
 * @param {string} URL path parameter
 */
function authorRedirect(contingency_page_url) {
  if (wcm_cookie === "" || wcm_cookie === undefined) {
    window.location = contingency_page_url;
  }
}

/**
 * @method
 * @desc used for image reading from dam
 * @param {string} image path parameter
 */
function checkImage(img_path) {
  let request = new XMLHttpRequest();
  request.open("GET", img_path, true);
  request.send();
  request.onload = function() {
    /* eslint-disable */
    status = request.status;   //NOSONAR
    /* eslint-enable */
    if (request.status == 200) {    
      const product_image = document.createElement('img');
      product_image.setAttribute('src',img_path);
      product_image.setAttribute('alt', 'product image');
      jQuery("#container-image-product").append(product_image);
    } else {
      const ga_val = country + "-image_missing_for_SKU_" + prodSku;
      window.sessionStorage.setItem("contingencyPageGA", ga_val);
      authorRedirect(contingency_page);
    }
  };
}

/**
 * @method
 * @desc used for redirect or data mapping call
 * @param {string} missed attr from api, all attr from api
 * missing_prod variable stores all the missing attriubue from API
 * attr_prod variable contains all the attribute coming from API
 * prdod_attr contains all the predfined attribute to be persent
 */
function decideOnRedirect(missing_prod, attr_prod) {
  //Logic to check if missing attributes are Batch number and lot number
  if (
    (missing_prod[0] === prod_attr[0] && missing_prod[1] === prod_attr[1]) ||
    (missing_prod[1] === prod_attr[0] && missing_prod[0] === prod_attr[1])
  ) {
    const ga_val =
      country + "-" + missing_prod.join("_") + "_missing_for_SKU_" + prodSku;
    window.sessionStorage.setItem("contingencyPageGA", ga_val);
    authorRedirect(contingency_page);
  } else {
    mapDataToPage(missing_prod, attr_prod);
  }
}

/**
 * @method
 * @desc used for checking past or future date
 * @param {string} date parameter
 * @return {string} date type
 */
function dateCheck(date) {
  const today = new Date();
  if (date < today) return "past";
  else if (date > today) return "future";
}

/**
 * @method
 * @desc used for convert date in expected format
 * @param {string} date parameter
 * @return {string} formatted date value
 */
function dateFormatConversion(date) {
  let new_format_date = date;
  let monthArray = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  let month = monthArray[new_format_date.getMonth()];
  let date_new = new_format_date.getDate();
  let year = new_format_date.getFullYear();
  let formattedDate = date_new + "-" + month + "-" + year;
  return formattedDate;
}

/**
 * @method
 * @desc used for mapping api data to page
 * @param {string} missing prod data from api, all prod data from api
 */
function mapInnerDataToPageOnValidation(missing_prod, attr_prod) {
  product.sku = prodSku;
  for (let x in attr_prod) {
    let attr_i = attr_prod[x].name; // get product arrtibute name
    let attr_i_value = attr_prod[x].value.toLowerCase();
    attr_i = attr_i.toLowerCase();
    //logic to show learnmore button
    if (attr_i === "similac-pm" && attr_i_value === "true") {
      $("#learn-more").addClass("show-learn-more");
      $("#similac-btn").addClass("d-none");
    }
    if (attr_i === "sku") {
      let img_path =
        jQuery("#product-dam-path").val() + attr_prod[x].value + ".png";
      checkImage(img_path);
    }

    if (attr_i === "brand") {
      jQuery(".product-name h1").text(attr_prod[x].value);
    }
    //update the product name for region and language specific
    let language_region="brand" +
    "-" +
    country.toLocaleLowerCase() +
    "-" +
    language.toLocaleLowerCase();
    if (
      attr_i === language_region      
    ) {
      jQuery(".product-name h1").text(attr_prod[x].value);
    }
    //logic to form super script
    makeSuperScriptString(attr_i,language_region);
    
    attr_i = attr_i.split(" ").join("_"); // replacing space with _ for product attibute name
    let updated_class_i=(".").concat(attr_i);
    $(updated_class_i).find("span").text(attr_prod[x].value);
    //logic to check expiry date as past/future date
    checkExpiryDate(attr_i, attr_prod, x);
    
    //logic to check QA relase date as past/future date
    getQaRelaseData(attr_i, attr_prod, x);
    //Logic to map manufacturing site name
    updateSiteName(attr_i, attr_prod, x);
    if (attr_i === "batch_number") {
      product.batchNumber = attr_prod[x].value;
    }
    if (attr_i === "lot_number") {
      product.lotNumber = attr_prod[x].value;
    }
  }
  // Logic to decide to show Batch Number/Lot Number
  hideShowBatchLot(prod_attr, attr_prod, missing_prod);

  jQuery("#page-spinner .a-spinner").toggleClass("d-none");
  overlayLoader.hide();
  //product details load success GTM data push
  setTimeout(function() {
    const ga_val = country + "-product_sku_" + prodSku + "_details_loaded";
    ABBOTT.gtm.buildAndPush.pageTracking(productEventCategory, "load", ga_val);
    ABBOTT.gtm.buildAndPush.pdp(product, "load");
  }, 500);
}

/**
 * @method
 * @desc makes and add the super script string to HTML
 * @param {array} attribute name
 * @param {string} language_region
 */
function makeSuperScriptString(attr_i,language_region) {
  if (superScriptString && (attr_i === "brand"|| attr_i === language_region)) {
    let superScriptPattern = new RegExp("[" + superScriptString.value + "]");
    let prdDetailString = $(".product-name h1").html();
    if (prdDetailString) {
      const updatedString = addSuperScript(
        prdDetailString,
        superScriptPattern
      );
      $(".product-name h1").html(updatedString);
    }
  }
}

/**
 * @method
 * @desc to check expiry date as past/future date
 * @param {array} attribute name, all prod data from api
 */
function checkExpiryDate(attr_i, attr_prod, x){
  if (attr_i === "expiry_date") {
    let attr_date = attr_prod[x].value;
    let exp_date = attr_date.split("/");
    let new_exp_date = new Date(
      exp_date[1] + "/" + exp_date[0] + "/" + exp_date[2]
    );
    let exp_formatted_date = dateFormatConversion(new_exp_date);
    if (dateCheck(new_exp_date) === "past") {
      let updated_class_past=(".").concat(attr_i);
      $(updated_class_past).find("span")
        .text(exp_formatted_date)
        .addClass("redB");
    } else {
      let updated_class_future=(".").concat(attr_i);
      $(updated_class_future).find("span").text(exp_formatted_date);
    }
  }
}

/**
 * @method
 * @desc used for show or hide batch or lot
 * @param {array} prod_arr, attr_prod, missing_prod
 */
function hideShowBatchLot(prod_arr, attr_prod, missing_prod) {
  let prod_val = attr_prod.map(function(item) {
    return item.name;
  });

  if (missing_prod.includes(prod_arr[0])) {
    $(".batch_number").addClass("show_none");
  }
  if (missing_prod.includes(prod_arr[1])) {
    $(".lot_number").addClass("show_none");
  }
  if (prod_val.includes(prod_arr[0]) && prod_val.includes(prod_arr[1])) {
    $(".lot_number").addClass("show_none");
  }
}
/**
 * @method
 * @desc used for mapping maufacturing site name
 * @param {string} attr_name, api_attr to check and name map site value
 */
function updateSiteName(attr_name, api_attr, index) {
  if (attr_name === "site") {
    jQuery(".site span").text(api_attr[index].value);
  }
}

/**
 * @method
 * @desc used for check the past/future date of qa relase date
 * @param {string} attr_name, api_attr to check and name map site value
 */

function getQaRelaseData(attr_name, api_attr, index) {
  if (attr_name === "qa_test_date") {
    let attr_date = api_attr[index].value;
    let qa_date = attr_date.split("/");
    let new_qa_date = new Date(
      qa_date[1] + "/" + qa_date[0] + "/" + qa_date[2]
    );
    if (dateCheck(new_qa_date) === "future") {
      const ga_val = country + "-" + prodSku + "_future_release_date";
      window.sessionStorage.setItem("contingencyPageGA", ga_val);
      authorRedirect(contingency_page);
    } else {
      let qa_formatted_date = dateFormatConversion(new_qa_date);
      let updated_class=(".").concat(attr_name);
      $(updated_class).find("span").text(qa_formatted_date);
    }
  }
}

/**
 * @method
 * @desc used for mapping api data to page
 * @param {string} missing_prod from api, all prod data from api
 */
function mapDataToPage(missing_prod, attr_prod) {
  if (missing_prod.length > 1) {
    const ga_val = country + "-" + missing_prod.join("_") + "_fields_missing.";
    window.sessionStorage.setItem("contingencyPageGA", ga_val);
    authorRedirect(contingency_page);
  } else if (
    missing_prod.length === 1 &&
    missing_prod[0] !== prod_attr[0] &&
    missing_prod[0] !== prod_attr[1]
  ) {
    const ga_val =
      country + "-" + missing_prod[0] + "_missing_for_SKU_" + prodSku;
    window.sessionStorage.setItem("contingencyPageGA", ga_val);
    authorRedirect(contingency_page);
  } else {
    mapInnerDataToPageOnValidation(missing_prod, attr_prod);
    // display pop up for specific SKU
    displayPopUp();
    displayPopUpPureBliss('sku-popup-infant','popUpButtonIdInfant');
    displayPopUpPureBliss('sku-popup-toddler','popUpButtonIdToddler');
  }
}
/**
 * @method
 * @desc redirect or map based on api data
 * @param {string} missed attr from api, all attr from api, missing attr length
 */
function redirectOrMapLogic(missing_prod, attr_prod, missing_prod_data_len) {
  if (missing_prod_data_len > 0 && missing_prod_data_len < 3) {
    decideOnRedirect(missing_prod, attr_prod);
  } else if (missing_prod_data_len === 0) {
    mapDataToPage(missing_prod, attr_prod);
  } else {
    const ga_val = country + "-" + missing_prod.join("_") + "_fields_missing.";
    window.sessionStorage.setItem("contingencyPageGA", ga_val);
    authorRedirect(contingency_page);
  }
}

/**
 * @method
 * @desc API call to get data for the gpas code
 * @param {string} URL value parameter
 */
function ajaxCommonPropertyGetAPIData(apiURL) {
  let request_body = {
    code: getUrlParameter("c"),
    userLanguage: navigator.language || navigator.userLanguage
  };

  jQuery.ajax({
    url: apiURL,
    method: "POST",
    headers: {
      "content-type": appJson,
      "x-application-id": application,
      "x-country-code": country,
      "x-preferred-language": language
    },
    async: true,
    data: JSON.stringify(request_body),
    beforeSend: function() {
      overlayLoader.show();
      jQuery("#page-spinner .a-spinner").toggleClass("d-none");
    },
    success: function(results) {
      addGTMPushRedirect(results); // Call this function if status, errorCode, reason, results not valid
      jQuery("#page-spinner .a-spinner").toggleClass("d-none");
      overlayLoader.hide();
      let attr_prod = results.response.attributes;
      // If API call successful but attribute array itself are missing
      if (!attr_prod && results.errorCode === 0) {
        const ga_val = country + "-attributes_array_is_missing";
        window.sessionStorage.setItem("contingencyGlobalGA", ga_val);
        authorRedirect(contingency_page_global);
      } else if (attr_prod !== undefined && results.errorCode === 0) {
        //Redirect to Recall Page
        results.response.attributes.find(function(item){
          if(item.name.toUpperCase() === "RECALL" && item.value.toUpperCase() === "Y"){
              window.location.href = document.getElementById('recallPage').value;
          }
      });
      setProdSkuValue(attr_prod);
        
        //Get all the missing product attribute from response
        missing_prod_data = prod_attr.filter(e => attr_names.indexOf(e) === -1);
        let missing_prod_data_len = missing_prod_data.length;
        redirectOrMapLogic(missing_prod_data, attr_prod, missing_prod_data_len);
      }
    },
    error: function() {
      const ga_val = country + "-api_failed";
      window.sessionStorage.setItem("contingencyGlobalGA", ga_val);
      authorRedirect(contingency_page_global);
    }
  });
}
/**
* @method
 * @desc method to set prod_sku value and similac flag
 * @param {Object} attr_prod response attributes
 */
function setProdSkuValue(attr_prod){
  // If API data present
  for (let x in attr_prod) {
    attr_names.push(attr_prod[x].name);
    // Set product SKU variable to access across functions on the page
    if (attr_prod[x].name.toLowerCase() === "sku") {
      prodSku = attr_prod[x].value;
    }
    // set Flag for  Similac PM 60-40
    if (
      attr_prod[x].name.toLowerCase() === "similac-pm" &&
      attr_prod[x].value.toLowerCase() === "true"
    ) {
      window.sessionStorage.setItem("isSimilacPM", true);
    }
  }
}
/**
 * @method
 * @desc API call to get data for the gpas code
 * @param {Object} results valid value parameter
 */

function addGTMPushRedirect(results) {
  let ga_val = country + "-agnostic-contingency-page_reason_";
  let valid_product =
    results.response.result && results.response.result.toLowerCase();
  let valid_reason =
    results.response.reason && results.response.reason.toLowerCase();
  if (results.status !== true) {
    ga_val += "status_" + results.status;
  }
  if (results.errorCode !== 0) {
    ga_val += "_error-code_" + results.errorCode;
  }
  if (valid_reason !== "consumed" && results.status) {
    ga_val += "product_" + valid_reason;
  }
  if (valid_product !== "valid" && results.status) {
    ga_val += "product_" + valid_product;
  }

  if (
    results.status !== true ||
    results.errorCode !== 0 ||
    valid_reason !== "consumed" ||
    valid_product !== "valid"
  ) {
    window.sessionStorage.setItem("contingencyGlobalGA", ga_val);
    authorRedirect(contingency_page_global);
  }
}

/**
 * @method
 * @desc used for adding superscript in product name
 * @param {string} product name and pattern parameter
 * @return {string} updated product name
 */
function addSuperScript(string, pattern) {
  let output = "";
  let d = string;
  for (let superscript of d) {
    if (pattern.test(superscript)) {
      output += "<sup>" + superscript + "</sup>";
    } else {
      output += superscript;
    }
  }
  return output;
}

function pushGTMData() {
  const specificPage = jQuery("#specific-contingency").val();
  const genericPage = jQuery("#generic-contingency").val();
  if (genericPage === "true") {
    let ga_val = window.sessionStorage.getItem("contingencyGlobalGA");
    if (ga_val === null || ga_val === undefined) {
      ga_val =
        country + "-product_page_access_from_desktop_OR_direct_url_access";
    }
    ABBOTT.gtm.buildAndPush.pageTracking(
      contingencyEventCategory,
      "load",
      ga_val
    );
    window.sessionStorage.removeItem("contingencyGlobalGA");
  } else if (specificPage === "true") {
    const ga_val = window.sessionStorage.getItem("contingencyPageGA");
    const isSimilacPM = window.sessionStorage.getItem("isSimilacPM");
    if (isSimilacPM) {
      $("#learn-more").addClass("show-learn-more");
      $("#similac-btn").addClass("d-none");
    }
    ABBOTT.gtm.buildAndPush.pageTracking(
      contingencyEventCategory,
      "load",
      ga_val
    );
    window.sessionStorage.removeItem("contingencyPageGA");
  }
}

//Logic for sku Pop up starts 
function displayPopUp() {
  let skuPopUpValue = $('#sku-popup').val();
  if (skuPopUpValue != undefined) {
    let skuArray = skuPopUpValue.split(',');
    let skuPopUpButton = $(document).find('#popUpButtonId');
    let skuPopUpButtonNew = $(document).find('#popUpButtonIdNew');
    if (skuPopUpButton && skuPopUpButton.length > 0) {
      //add id to abt-icon-cancel button
      jQuery("#popUpButtonId-modal .abt-icon-cancel").attr('id', 'rtf-pop-up-close-button-click');

      if (skuArray.includes(prodSku)) {
        $('#popUpButtonId').parent('.m-popup').trigger('click');
      }

    } else if (skuPopUpButtonNew && skuPopUpButtonNew.length > 0) {
      //add id to abt-icon-cancel button
      jQuery("#popUpButtonIdNew-modal .abt-icon-cancel").attr('id', 'rtf-pop-up-close-button-click');
      if (skuArray.includes(prodSku)) {
        $('#popUpButtonIdNew').parent('.m-popup').trigger('click');
      }
    }
  }
}

function displayPopUpPureBliss(skuPopupId, popUpButtonId) {
  let skuPopUpValue = $('#' + skuPopupId).val();
  if (skuPopUpValue != undefined) {
    let skuArray = skuPopUpValue.split(',');
    let skuPopUpButton = $(document).find('#' + popUpButtonId);
    let skuPopUpButtonNew = $(document).find('#' + popUpButtonId + 'New');
    if (skuPopUpButton && skuPopUpButton.length > 0) {
      //add id to abt-icon-cancel button
      jQuery("#" + popUpButtonId + "-modal .abt-icon-cancel").attr('id', 'rtf-pop-up-close-button-click');

      if (skuArray.includes(prodSku)) {
        $('#' + popUpButtonId).parent('.m-popup').trigger('click');
      }

    } else if (skuPopUpButtonNew && skuPopUpButtonNew.length > 0) {
      //add id to abt-icon-cancel button
      jQuery("#" + popUpButtonId + "New-modal .abt-icon-cancel").attr('id', 'rtf-pop-up-close-button-click');
      if (skuArray.includes(prodSku)) {
        $('#' + popUpButtonId + 'New').parent('.m-popup').trigger('click');
      }
    }
  }
}
//Logic for sku Pop up ends

jQuery(document).ready(function () {
  const getAPIDataURL = jQuery("#product-lookup").val();
  const page_check = jQuery("#is-product-page").val();
  let mobileLangClass = jQuery(".m-link-stack__dropdown-wrapper");
  if (mobileLangClass.length) {
    mobileLangClass.addClass("mob-countryselect");
  }
  jQuery("#right-column-text-col-start")
    .parents(".featurescard")
    .addClass("width100");
  jQuery("#right-column-text-col-end")
    .parents(".featurescard")
    .addClass("width100");
  if (page_check === "true") {
    if (getUrlParameter("c")) {
      contingency_page = contingency_page.concat("?c=").concat(getUrlParameter("c")); //Pass gpas code to the contingency page
      contingency_page_global = contingency_page_global.concat("?c=").concat(getUrlParameter("c")); //Pass gpas code to the contingency page
      // Update the HREF with GPAS code in the language dropdown
      updateHrefWithGpasCode();

      // Update product page URL
      updateProductPageUrl();
      
      // Update the PWA product page URL
      updatePWAProductPageUrl();
	  
      // Update the CA product page URL
      updateCAProductPageUrl();
      
      // Update the US product page URL
      updateUSProductPageUrl();
      
      // set Intermediate page to pwa login page with GpasId Redirection.
      setPWALoginUrl();
      // Append GPAS code to sweepstake link.
      if(jQuery("#sweepLink").length>0){
        let sweepLink= jQuery("#sweepLink").attr("href").concat("&qr_code=").concat(getUrlParameter("c"));
        jQuery("#sweepLink").attr("href",sweepLink);
      }
      ajaxCommonPropertyGetAPIData(getAPIDataURL);
    } else {
      const ga_val = country + "-gpass_code_not_present_in_url_querystring";
      window.sessionStorage.setItem("contingencyGlobalGA", ga_val);
      authorRedirect(contingency_page_global);
    }
  } else {
    pushGTMData();
  }
  // parent class added for Elecare landing page.
  $("#content_id").parents().find("#section-pwa-banner-align").addClass("elecareLanding");
});

/**
 * @method
 * @desc Update the HREF with GPAS code in the language dropdown
*/
function updateHrefWithGpasCode() {
  if ($("#langNav .m-link-stack__list")) {
    let items = $(".m-link-stack__list li");
    for (let element of items) {
      let link_update = $(element)
        .find("a")
        .attr("href");
      $(element)
        .find("a")
        .attr("href", link_update + "?c=" + getUrlParameter("c"));
    }
  }
}
/**
 * @method
 * @desc Update the product page URL
*/
function updateProductPageUrl() {
  if(jQuery("#banner-img").length>0 && jQuery("#banner-img a").length>0){
    let updated_product_page_url= jQuery("#banner-img a").attr("href").concat("?c=").concat(getUrlParameter("c"));
    jQuery("#banner-img a").attr("href",updated_product_page_url);
   }
}
/**
 * @method
 * @desc Update the PWA product page URL
*/
function updatePWAProductPageUrl() {
  if(jQuery("#pwa-banner-img").length>0) {
    if(jQuery("#pwa-banner-img").attr("href") != undefined) {
      let pwa_updated_product_page_url= jQuery("#pwa-banner-img").attr("href").concat("?c=").concat(getUrlParameter("c"));
      jQuery("#pwa-banner-img").attr("href",pwa_updated_product_page_url);
    } else if (jQuery("#pwa-banner-img a").attr("href").length>0) {
      let pwa_updated_product_page_url= jQuery("#pwa-banner-img a").attr("href").concat("?c=").concat(getUrlParameter("c"));
      jQuery("#pwa-banner-img a").attr("href",pwa_updated_product_page_url);
    }
  }
}
/**
 * @method
 * @desc Update the CA product page URL
*/
function updateCAProductPageUrl() {
  if(jQuery("#quality-tracking").length>0){
    let updated_product_page_url_ca;
    if(jQuery("#quality-tracking").attr("href") != undefined){
      updated_product_page_url_ca = jQuery("#quality-tracking").attr("href").concat("?c=").concat(getUrlParameter("c"));
      jQuery("#quality-tracking").attr("href",updated_product_page_url_ca);
   } else if(jQuery("#quality-tracking a").attr("href").length>0){
      updated_product_page_url_ca = jQuery("#quality-tracking a").attr("href").concat("?c=").concat(getUrlParameter("c"));
      jQuery("#quality-tracking a").attr("href",updated_product_page_url_ca);
   }
  }
}
/**
 * @method
 * @desc Update the US product page URL
*/
function updateUSProductPageUrl() {
  if(jQuery(".quality-txt").length>0 && jQuery(".quality-txt a").length>0){
    let updated_product_page_url_us= jQuery(".quality-txt a").attr("href").concat("?c=").concat(getUrlParameter("c"));
    jQuery(".quality-txt a").attr("href",updated_product_page_url_us);
  }
}
/**
 * @method
 * @desc set Intermediate page to pwa login page with GpasId Redirection
*/
function setPWALoginUrl() {
  /** Intermediate page to pwa login page with GpasId Redirection code start */
  if (jQuery("#pwa_login").length > 0) {
    if (jQuery("#pwa_login").attr("href") != undefined) {
      let pwaLoginUrl= jQuery("#pwa_login").attr("href").concat("?c=").concat(getUrlParameter("c"));
      jQuery("#pwa_login").attr("href", pwaLoginUrl);
    }
    else if (jQuery("#pwa_login a").attr("href").length > 0) {
      let pwaLoginUrl= jQuery("#pwa_login a").attr("href").concat("?c=").concat(getUrlParameter("c"));
      jQuery("#pwa_login a").attr("href", pwaLoginUrl);
    }
  }
  /** Intermediate page to pwa login page with GpasId Redirection code ends */
}

jQuery("#pwa_login").click((e) => {
	ABBOTT.gtm.buildAndPush.pageTracking(
	  "rewards",
	  "click",
	  "pwa_bonuspoints-login"
	);
  });
  jQuery("#rewards-faq").click((e) => {
	ABBOTT.gtm.buildAndPush.pageTracking(
	  "faq",
	  "click",
	  "pwa_formula-faqs"
	);
  });