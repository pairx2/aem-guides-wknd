var _conf;
var gigya_url = jQuery("#gigyaURL").val();
var callScriptWait=false;
(function(win) {
  if (!win.ABBOTT) {
    win.ABBOTT = {};
  }
  var ABBOTT = win.ABBOTT;

  if (!ABBOTT.socialLogin) {
    ABBOTT.socialLogin = function(
      _enabledProviders,
      _containerID,
      _onLogin,
      _onError,
      _onLoad,
      loginMode,
      regtoken
    ) {
      var error = function(e) {
        _onError && _onError.apply(this, arguments);
      };

      var login = function(e) {
        _onLogin && _onLogin.apply(this, arguments);
        swal("Login " + e.errorCode, e.errorMessage);
      };
      var showLoader = function(e) {
        if (_containerID) {
          jQuery("#" + _containerID)
            .siblings(jQuery(".field-login-loader.field-loader"))
            .hide();
        }
      };

      _conf = {
        version: 2,
        showTermsLink: "false",
        height: "auto",
        width: "100%",
        containerID: _containerID, //"SocialLoginDiv"
        buttonsStyle: "fullLogoColored",
        enabledProviders: _enabledProviders,
        loginMode: loginMode,
        regToken: regtoken,
        onError: error,
        onLogin: login,
        onLoad: showLoader,
        onButtonClicked: function(n) {
          if (
            typeof jsonData !== "undefined" &&
            jsonData.formName === "checkoutLogin"
          ) {
            jQuery(".errorMessage").html("");
          }
        },
        cid: ""
      };
      assignEnabledProviders(_enabledProviders, _conf);
      loadGigyaUI(_conf, _containerID);
    };
  }
})(window);

jQuery.fn.isInViewport = function() {
  if (jQuery(this)) {
    var elementTop = jQuery(this).offset().top;
    var elementBottom = elementTop + jQuery(this).outerHeight();

    var viewportTop = jQuery(window).scrollTop();
    var viewportBottom = viewportTop + jQuery(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
  } else {
    return false;
  }
};

async function loadGigyaUI(__conf, _containerID) {
  if (
    (_containerID &&
    jQuery("#" + _containerID).isInViewport() &&
    jQuery("#" + _containerID + "_uiContainer").length === 0) || (jQuery("#" + _containerID + "_uiContainer").length === 0 && window.location.href.indexOf("/app/login"))
  ) {

    if (!window.gigya && !callScriptWait) {
      callScriptWait=true;
    await jQuery.getScript(gigya_url).done(function(script, textStatus) {
      var stc= window.setTimeout(function(){ 
      callScriptWait=false  
      window.gigya.socialize.showLoginUI(__conf);
      window.clearTimeout(stc);
      },3000);
      });
    } else if(window.gigya && !callScriptWait){
      window.gigya.socialize.showLoginUI(__conf);
    }
  }
}

function assignEnabledProviders(_enabledProviders, _conf__) {
  if (_enabledProviders) {
    _conf__["enabledProviders"] = _enabledProviders;
  } else {
    _conf__["enabledProviders"] = "facebook,googleplus";
  }
}