var validationReq = "validation-require";
var validationRegex = "validation-regex";
$(document).ready(function(){
    function validationLogic(targetElement){
        if(targetElement != lineTwo){
            targetElement.blur(function(){
            if($(this).val().length < 1){
                $(this).parents('.a-form-grp').addClass(validationReq);
                } else{
                $(this).parents('.a-form-grp').removeClass(validationReq);
                }
            });
        }
        var targetRegexString = targetElement.attr('data-regex');
        var targetPatternStr = targetRegexString.substring(1, targetRegexString.length-1);
        var validTargetRegex = new RegExp(targetPatternStr);
        targetElement.keyup(function(){
        if(targetElement.val().length > 0 && !validTargetRegex .test(targetElement.val())){
            $(this).parents('.a-form-grp').removeClass(validationReq);
            $(this).parents('.a-form-grp').addClass(validationRegex); 
            } else{
            $(this).parents('.a-form-grp').removeClass(validationRegex); 
            }
        });	
    }
		
    // Emali Validation
    var emailBox = $('#email_id');
    validationLogic(emailBox);
    // FirstName Validation
    var fNameBox = $('#first-name');
    validationLogic(fNameBox);
    // LastName Validation
    var lNameBox = $('#last-name');
    validationLogic(lNameBox);
    //Password validation
    var passBox = $('#password');
    validationLogic(passBox);
    // Address line 1 Validation
    var lineOne = $('#lineOne');
    validationLogic(lineOne);
    // Address line 2 validation 
    var lineTwo = $('#lineTwo');
    validationLogic(lineTwo);
    // City validation 
    var cityVal = $('#city-id');
    validationLogic(cityVal);
    // ZipCode validation 
    var zipVal = $('#zipcode-id');
    validationLogic(zipVal);
		
	$('#button-id').click(function(){
		// Weeks validation 
		var weekDrop = $('#preemie-age-options');
		var selectedOption = weekDrop.find('.a-dropdown__menu li').hasClass("selected");
		if(weekDrop.is(':visible') && selectedOption){
			weekDrop.find('.a-dropdown__container.form-group').removeClass(validationReq);
		} else{
			weekDrop.find('.a-dropdown__container.form-group').addClass(validationReq)
		}
		
		weekDrop.find('.a-dropdown__menu li').click(function(){
			weekDrop.find('.a-dropdown__container.form-group').removeClass(validationReq);
		});
		
		//Past date radio validation
		var pastRadio = $('input[name="preemie"]');
		if($('#premature-id-options').is(':visible') && pastRadio.is(":checked")){
			pastRadio.parents('fieldset').removeClass(validationReq);
		} else{
			pastRadio.parents('fieldset').addClass(validationReq);
		}
		pastRadio.click(function(){
			pastRadio.parents('fieldset').removeClass(validationReq);
		});
		
		pastRadio.parents('.a-radio__label').click(function(){
			pastRadio.parents('fieldset').removeClass(validationReq);
		});
	});
	
	// Date validation
	var dateBox = $('input[name="birthdate"]');
	dateBox.blur(function(){
	if($(this).val().length < 1){
		$(this).parents('.a-form-grp').addClass(validationReq);
		} else{
		$(this).parents('.a-form-grp').removeClass(validationReq);
		}
    });
    // Additional opt-in checkbox validation 
    jQuery(document).on('click',"#additional-optin-options .a-checkbox__input",function(){
        if(jQuery("#additional-optin-options .a-checkbox__input").is(":checked"))
        {
            jQuery("#additional-optin-options .a-checkbox__custom").attr("aria-checked",true);
            additionalOptin.removeClass("validation-require");
            removeDisableForm();
        }else{
            jQuery("#additional-optin-options .a-checkbox__custom").attr("aria-checked",false);
            additionalOptin.addClass("validation-require");
        }        
    });


});