/**
 * User Registartion
 **/
$(document).ready(function() {
	
	// updated for the landline number verification	
	var stateField,zipCodeField,cityField,userRegistrationMobile,userRegistrationPhone;
	function validate(){
			stateField = $('#stateField').val();
			zipCodeField = $('#zipCodeField').val();
			cityField = $('#cityField').val();
			userRegistrationPhone = $('#userRegistrationPhone').val();
			userRegistrationMobile = $('#userRegistrationMobile').val();
		if(userRegistrationPhone=="" && userRegistrationMobile==""){
			return false;
		}else if((stateField!="")&&(zipCodeField!="")&&(cityField!="")&&(userRegistrationPhone!=""||userRegistrationMobile!="")){
			return true;
		 }
	}

	$('#userRegistrationMobile,#userRegistrationPhone').on('blur', function() {
		var flag= validate();
		  if (!flag) {
			   $('#contactButtonId').prop('disabled', 'true');
		  } else {
				 $('#contactButtonId').removeProp('disabled')
		  }
	});

	//added for the data layer changes for the registration pages
	$('#userRegistrationStep1Btn').on('click', function() {
        console.log("pushing the data layer updates for Kontakt");
        pushDataLayerUpdates('Pageview', '/de-de/registrieren-kontakt','Kontakt');

    });

    $('#contactButtonId').on('click', function() {
        console.log("pushing the data layer updates for Maßeinheit");
        pushDataLayerUpdates('Pageview', '/de-de/registrieren-masseinheit','Maßeinheit');

    });

    $('#measurementUnitId').on('click', function() {
        console.log("pushing the data layer updates for login details");
        pushDataLayerUpdates('Pageview', '/de-de/registrieren-login-details','Login-Details');

    });

    $('#userRegistrationStep4Btn').on('click', function() {
         console.log("No data layer push ");

    });
	
	
    //User Registration
    let fsl2UserRegistration = $('#fsl2UserRegistration');

    if (fsl2UserRegistration.length > 0 && wcmmodeOff) {

        checkCookie('user-registration'); //check cookies user-registration

        //Initial make nonrequired to dropdown
        $('#healthInsuranceDrp-options').find('.a-dropdown').attr('data-required', 'false');
		
		//sort dropdown
        sortDropdown('#healthInsuranceDrp-options');

        //initial class added for mobile and phone field german flag icon
        $('#userRegistrationMobile').parents('.a-input-field').find('.icon em').addClass('userRegistrationMobileIcon');
        $('#userRegistrationPhone').parents('.a-input-field').find('.icon em').addClass('userRegistrationPhoneIcon');

        //ExperienceFragment position change from before button to after button
        var step1Btn = $('#userRegistrationStep1Btn').parents('.o-wizard__btn');
        $("#userRegistrationStep1 .experiencefragment").insertAfter(step1Btn);
    }

    //Health insurance no dropdown hide and show condition
    $("input[name='sickfundType']").on('change', function() {
        var insuranceTypeVal = $(this).val();

        var healthInsPlaceholder = $('#healthInsuranceDrp-options .a-dropdown__placeholder').text();

        if (insuranceTypeVal == 'Public') {
            $('#healthInsuranceDrp-options').show();
            $('#healthInsuranceDivider').show();
            $('#healthInsuranceDrp-options').find('.a-dropdown').attr('data-required', 'true');
			//added to show 8 values in the drop down
			$(".o-wizard__container").attr("style","overflow:visible");
            $('.a-dropdown__field').attr("style","--dropdown-menu-max-height:400px");
        } else {
            $('#healthInsuranceDrp-options').hide();
            $('#healthInsuranceDivider').hide();
            $('#healthInsuranceDrp-options .a-dropdown-selected').removeClass('a-dropdown-selected').addClass('a-dropdown__placeholder').text(healthInsPlaceholder);
            $('#healthInsuranceDrp-options .a-dropdown__menu li').removeClass('selected');
            $('#healthInsuranceDrp-options').find('.a-dropdown').attr('data-required', 'false');
        }
    });

    //User Registration Success page code start here
    let fsl2userRegSuccessPage = $('#userRegSuccessPage');

    if (fsl2userRegSuccessPage.length > 0 && wcmmodeOff) {

        //retriving value from query param
        var username = window.atob(getUrlParameter('username'));
        var salutation = window.atob(getUrlParameter('salutation'));
        var useremail = window.atob(getUrlParameter('email'));

        //showcasing value on page
        if (salutation !== "" && username !== "") {
            $('#userRegSuccessPage span.regUserName').text(salutation + " " + username);
        } else if(username !== "") {
            $('#userRegSuccessPage span.regUserName').text(username);
        }
        
        if (useremail !== "") {
            $('#userRegSuccessPage span.regUserEmail').text(useremail);
        }

    }
});