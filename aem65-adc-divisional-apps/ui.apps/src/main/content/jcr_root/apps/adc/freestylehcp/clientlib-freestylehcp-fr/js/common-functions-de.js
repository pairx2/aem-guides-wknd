

/**
 * HCP-DE Registration page and Book A Rep form
 * /**
 * @function
 * Summary: 
 * In Registration disable SMS optin if mobile not provided
 * In Book a Rep. enable submit button only if mobile no. or contact me at office or both are selected  
**/

 $(document).ready(function () {

    $('#hcp-de-next-btn').click(function(){
        let _marketingSms = $('#marketingsms').parents('.a-checkbox');
        if($('#hcp-de-mobile').val() == ''){
            _marketingSms.hide();
        } else{
            _marketingSms.show();
        }
    });

    function commonBookaRepCondition(){
         setTimeout(() => {
            
            let MobileRegxPattern = getRegExpObjFromString($('#hcp-de-bookarep-mobile').data('regex')),
                zipcodeRegxPattern = getRegExpObjFromString($('#hcp-de-postalcode').data('regex')),
                mobileRegex = new RegExp(MobileRegxPattern).test($('#hcp-de-bookarep-mobile').val()),
                zipcodeRegex = new RegExp(zipcodeRegxPattern).test($('#hcp-de-postalcode').val());

           if( (($('#hcp-de-bookarep-mobile').val() !== '' && mobileRegex) || $('#hcp-de-contact-me-options').find('input').is(':checked') !== false) && ( ($('#hcp-de-postalcode').val() !== '' && zipcodeRegex ) && $('#hcp-de-salute-options :checked').length && $('#hcp-de-firstname').val() !== '' && $('#hcp-de-lastname').val() !== '' && $('#hcp-de-date-picker').val() !== '')) {
                $('#hcp-de-bookarep-submit').prop('disabled', false);
            } else{
                $('#hcp-de-bookarep-submit').prop('disabled', true);
            }
        }, 100)
	}

    $('#hcp-de-bookarep-form .form-container').on('click keyup onblur change', function(e) {
           commonBookaRepCondition();
    });
     $('#hcp-de-date-picker').on('click keyup onblur change', function(e) {
            commonBookaRepCondition();
    });

});



