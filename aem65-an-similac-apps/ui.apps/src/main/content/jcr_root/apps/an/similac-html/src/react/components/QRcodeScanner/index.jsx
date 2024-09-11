import React, { useEffect, useState } from "react";
import QrReader from 'react-qr-reader';
import { makeCall } from "../../common/api";
import {
  sendFormData,
  getErrorMessage,
  getMessageForReg
} from "../../common/api";


var wrongScanUrl = document.getElementById("wrong-qr-scan_url");
const QRcodeScanner = (props) => {
  const [showScanner, setShowScanner] = useState(false);

  const handleScan = async (result) => {
    $("#overlay").hide();
    if (result) {
      $('#qr-scan-progress-popup').modal("show");
      setShowScanner(false);
      const scannedUrl = result.split('?c=');
      const cValue = scannedUrl[1];
      if (cValue) {
        ABBOTT.removeCookie("gpasScannedId; path=/; domain=.similac.com");
        let cookieConfig = {
          path: "/",
          domain: "similac.com",
          secure: true,
          HttpOnly: true
        };
        ABBOTT.cookie(
          "gpasScannedId",
          cValue,
          cookieConfig
        );
        $('#qr-scan-progress-popup').modal("show");

        let gpasScannedId = cValue;
        if (checkLogin() && gpasScannedId) {
          var lc = ABBOTT.cookie("scan");
          var lp = JSON.parse(lc);
          var userType = ABBOTT.utils.getActualUserType();
          if (userType == 'similac-ssm') {
            let productpackUrl = findValueFromJson(window.jsonData.fields, 'product-lookup');
            getGpasProductData(productpackUrl.value).then(res => {
              redirectToValidScreenWithScan(lp);
            })
          }
          else {
            ABBOTT.removeCookie("profile; path=/; domain=.similac.com");
            ABBOTT.removeCookie("x-id-token; path=/; domain=.similac.com;");
          }
        }

      } else {
          const { errMessage = getMessageForReg('INVALID-QR-CODE') } = getErrorMessage('INVALID-QR-CODE') || {};
          dataLayer.push({ 
            event: "ga-custom-events", 
            eventCategory: "camera-scan", 
            eventAction: "error",  
            eventLabel: "pwa_wrong-qr-code-scanned_error-message" 
          });
          // To redirect the page, if the QR invalid
          window.location.pathname = wrongScanUrl ? wrongScanUrl.value: "" ;
          $("#overlay").hide();
          $('#qr-scan-progress-popup').modal("hide");
          return error;
      }
    }
    $("#overlay").hide();
  };

  // Function to check iOS version
 checkIOSVersion = () => {
    const match = navigator.userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/);
    if (match !== null && match.length > 1) {
      const majorVersion = parseInt(match[1], 10);
      const minorVersion = match[2] ? parseInt(match[2], 10) : 0;
      return parseFloat(`${majorVersion}.${minorVersion}`);
    }
    return null; // Not an iOS device
  }

  checkLogin = () => {
    return ABBOTT.cookie("x-id-token");
  }
  findValueFromJson = (data, key) => {
    return data.find(x => x.id == key);
  }

  redirectToValidScreenWithScan = (res) => {
    var loyaltyScanBonusesEarned = res.loyaltyScanBonusesEarnedState;
    var loyaltyScansSinceLastReward = res.loyaltyScansSinceLastRewardState;
    var gpasScansToday = res.gpasScansTodayLimit;

    var dailyScanLimit = findValueFromJson(window.jsonData.fields, 'dailyScanLimit');
    dailyScanLimit = dailyScanLimit.value;

    var loyaltyScanLimit = findValueFromJson(window.jsonData.fields, 'loyaltyScanLimit');
    loyaltyScanLimit = loyaltyScanLimit.value;

    var confirmationPage = findValueFromJson(window.jsonData.fields, 'scan-confirmation');
    confirmationPage = confirmationPage.value;

    var scanLimitPage = findValueFromJson(window.jsonData.fields, 'scan-limit');
    scanLimitPage = scanLimitPage.value;

    var bonusPage = findValueFromJson(window.jsonData.fields, 'scan-bonus');
    bonusPage = bonusPage.value;

    var doubleBonusPage = findValueFromJson(window.jsonData.fields, 'scan-double-bonus');
    doubleBonusPage = doubleBonusPage.value;
    ABBOTT.removeCookie("gpasScannedId; path=/; domain=.similac.com");

    if (gpasScansToday >= dailyScanLimit) {
      window.location = scanLimitPage;
    } else if (loyaltyScansSinceLastReward > loyaltyScanLimit) {
      window.location = scanLimitPage;
    } else if (loyaltyScanBonusesEarned >= 2) {
      window.location = doubleBonusPage;
    } else if (loyaltyScansSinceLastReward == loyaltyScanLimit) {
      window.location = bonusPage;
    } else {
      window.location = confirmationPage;
    }
  }

  /**
  * @method
  * @desc API call to get data for the gpas code
  * @param {string} URL value parameter
  */
  getGpasProductData = async (apiURL) => {
    var gpasIdCookie = ABBOTT.cookie('gpasScannedId');
    var request_body = {
      code: gpasIdCookie,
      userLanguage: navigator.language || navigator.userLanguage
    };

    let ajaxConfig = {
      url: apiURL,
      method: "POST",
      contentType: "application/json",
      headers: {
        "content-type": "application/json",
        "x-country-code": "US",
        "x-application-id": "ansimilacprdchk",
        "x-preferred-language": "en"
      },
      data: JSON.stringify(request_body),
    };

    await makeCall(ajaxConfig).then(
      results => {
        const { response, errorCode } = results;
        $("#overlay").hide();
        if (errorCode == '400') {
          const { errMessage = getMessageForReg('INVALID-QR') } = getErrorMessage('INVALID-QR') || {};
          dataLayer.push({ 
            event: "ga-custom-events", 
            eventCategory: "camera-scan", 
            eventAction: "error",  
            eventLabel: "pwa_wrong-qr-code-scanned_error-message" 
          });
          // To redirect the page, if the QR invalid
          window.location.pathname = wrongScanUrl ? wrongScanUrl.value: "" ;

          $("#overlay").hide();
          $('#qr-scan-progress-popup').modal("hide");
          return fail;
        }
        else if (errorCode != '') {
          const { errMessage = getMessageForReg('INVALID-QR-CODE') } = getErrorMessage('INVALID-QR-CODE') || {};
          dataLayer.push({ 
            event: "ga-custom-events", 
            eventCategory: "camera-scan", 
            eventAction: "error",  
            eventLabel: "pwa_wrong-qr-code-scanned_error-message" 
          });
          // To redirect the page, if the QR invalid
          window.location.pathname = wrongScanUrl ? wrongScanUrl.value: "";
          $("#overlay").hide();
          $('#qr-scan-progress-popup').modal("hide");
          return fail;
        } else {

          const gpasResponse = response;
          var attr_names = [];
          var attr_prod = gpasResponse.attributes;
          var exceptionalSkuList = findValueFromJson(window.jsonData.fields, 'exceptional-sku-list');
          exceptionalSkuList = exceptionalSkuList.value;
          // If API call successful but attribute array itself are missing
          if (!attr_prod && results.errorCode === 0) {
          } else if (attr_prod !== undefined && results.errorCode === 0) {
            for (let x in attr_prod) {
              if (attr_prod[x].name.indexOf('date') != '-1') {
                attr_names.push([camelizeStr(attr_prod[x].name), formatDate(attr_prod[x].value)]);
              } else {
                if (attr_prod[x].name === 'SKU') {
                  //Check exceptional SKU
                  if (exceptionalSkuList.includes(attr_prod[x].value)) {
                    const { errMessage = getMessageForReg('INVALID-QR') } = getErrorMessage('INVALID-QR');
                    dataLayer.push({ 
                      event: "ga-custom-events", 
                      eventCategory: "camera-scan", 
                      eventAction: "error",  
                      eventLabel: "pwa_wrong-qr-code-scanned_error-message" 
                    });
                    // To redirect the page,for exceptional SKU QR code
                    window.location.pathname = wrongScanUrl ? wrongScanUrl.value: "" ;
                    $("#overlay").hide();
                    $('#qr-scan-progress-popup').modal("hide");
                    return fail;
                  }
                }
                attr_names.push([camelizeStr(attr_prod[x].name), attr_prod[x].value]);
              }
            }
          }
          const apiResponseData = arrayToObj(attr_names);
          let formData = {
            "category": "gpas",
            "gpasActivityInfo": []
          };
          var gpasLocation = gpasResponse.location;
          if (Object.keys(gpasLocation).length === 0) {
            gpasLocation = null;
          }

          const scanDate = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');

          const apiResponseOtherFields = { "code": gpasResponse.code, "location": gpasLocation, "authenticationAttempts": gpasResponse.authenticationAttempts, "productName": gpasResponse.product.name, "reason": gpasResponse.reason, "scanDate": scanDate };
          const mergedResponse = { ...apiResponseOtherFields, ...apiResponseData };
          formData.gpasActivityInfo.push(mergedResponse);
          const loginToken = checkLogin();
          let _config = {
            headers: {
              "x-id-token": loginToken
            }
          };
          $("#overlay").hide();
          return sendFormData(window.jsonData.actionPathToUpdateProfile, formData, _config).then(success => {
            return success;
          });
        }
      },
      fail => {
        console.log(fail);
      }
    );
  }

  const handleError = (error) => {
    const iOSVersion = checkIOSVersion();
    // Check if iOS version is less than 15.1
    if (error.name == 'NotAllowedError' || error.name == 'PermissionDeniedError') {
       var { errMessage = getMessageForReg('CAMERA-STATE-DENIED') } = getErrorMessage('CAMERA-STATE-DENIED') || {};
       dataLayer.push({ 
        event: "ga-custom-events", 
        eventCategory: "camera-scan", 
        eventAction: "error",  
        eventLabel: "pwa_camera-access-denied_error-message" 
      });
    } else if (iOSVersion !== null && iOSVersion < 15.1) {
      var errMessage = getErrorMessage('INVALID-IOS-VERSION') || {};
    } else {
      var errMessage = getErrorMessage("GEN_ERR");
      dataLayer.push({ 
        event: "ga-custom-events", 
        eventCategory: "pwa-generic-error", 
        eventAction: "error",  
        eventLabel: "pwa_oops-temporary-issue-try-again-later_error-message" 
      });
    }
    $("#template").css({'background-color':"#e4002b"});
    $("#template.global-error p").css({'color':"#ffffff"});
    $("#template.global-error p").html(errMessage);
    $("#template").show();
    $("#overlay").hide();
    $('#qr-scan-progress-popup').modal("hide");
    closeScanner();
  };

  const closeScanner = () => {
    setShowScanner(false);
  }

  /** Camel casing to strings*/
  camelizeStr = (str) => {
    str = str.toLowerCase();
    str = str.split(' ').map(a => a.trim()).map(a => a[0].toUpperCase() + a.substring(1)).join("");
    return str.charAt(0).toLowerCase() + str.slice(1);
  }

  /**date formatting */
  formatDate = (date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  /**Convert Array to Object */
  arrayToObj = (arr) => {
    let obj = {};
    arr.forEach((v) => {
      let key = v[0];
      let value = v[1];
      obj[key] = value;
    });
    return obj;
  }


  return (
    <>
      <div>
        <button className={`scannerButton ${props.scanButtonClass}`}
          onClick={() => {
            
            setShowScanner(true);
            $("#template").hide();
          }}
          data-gtm = {`${props.scanGtm}`}
        >
          {props.scanButtonLabel}
          <img src="/content/dam/an/similac/global/icons/camera.png"/>
        </button>
        {showScanner && (
          <>
            <div className="scanner-modal">
              <div className="scanner-content">
                <QrReader
                  constraints= {{
                    facingMode: 'environment'
                  }}
                  delay={300}
                  onError={handleError}
                  onScan={handleScan}
                  style={{ width: "100%" }}
                />
                <button onClick={closeScanner}>Close</button>
              </div></div>
          </>
        )}
      </div>
    </>
  );
};

export default QRcodeScanner;
