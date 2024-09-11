var floatingLabelClass = "similac-label-floating";
var formGroupClass = ".form-group";
var dataRequired = "data-required";
var formLabel = "label";
var facebookCheckBox = ".o-form-container__wrapper #facebook-disconnect-options input";
var faceBookConnectLabel = ".o-form-container__wrapper .form-container #facebook-disconnect-options span.a-checkbox__text";
var googleCheckBox = ".o-form-container__wrapper #google-disconnect-options input";
var googleConnectLabel = ".o-form-container__wrapper .form-container #google-disconnect-options span.a-checkbox__text";

jQuery("input").blur(function() {
    var inputVal = jQuery(this).val();
    if (jQuery.trim(inputVal).length < 1) {
        jQuery(this)
            .parents(formGroupClass)
            .find(formLabel)
            .removeClass(floatingLabelClass);
    }
});
jQuery("input").focus(function() {
    jQuery(this)
        .parents(formGroupClass)
        .find(formLabel)
        .addClass(floatingLabelClass);
});

jQuery(document).ready(function () {
    jQuery(facebookCheckBox).change(function () {        
      
        if (jQuery(this).is(":checked")) {            
            jQuery(faceBookConnectLabel).text("Connected");
        }
        else {
            jQuery(faceBookConnectLabel).text("Disconnected");
        }
  
    });
    jQuery(googleCheckBox).change(function () {        
      
        if (jQuery(this).is(":checked")) {            
            jQuery(googleConnectLabel).text("Connected");
        }
        else {
            jQuery(googleConnectLabel).text("Disconnected");
        }
  
    });
});