

/**
 * HCP-NL Book A Rep form
 * /**
 * @function
 * Summary: 
 * In Book a rep form - Title, First name, Last Name, zip code will be pre-populated and editable
 * Checkbox: Contact me at my mobile number(greyed out until start entering in mobile number field and will be disabled in case of wrong mobile number too).
**/

$(document).ready(function () {

    if ($("input[name='x-preferred-language']").val() === 'nl_nl' && $('#hcp-nl-bookarep-form').length > 0) {
        const usrObj = getCookieByKey('usObj_nl_nl');
        const userData = usrObj && decryptData(usrObj, pk, 'object');
        const _mobileNo = $("input[name='mobileNumber']");
        const _contactMeoffice = $('input[name="contactMeAtOffice"]');
    
        // Enable submit button based on prepopulated data in form
        function enableSubmitButtonOnPreRender() {
            const isEmptyField =
                $("input[name='firstName']").val() === '' &&
                $("input[name='lastName']").val() === '' &&
                $("input[name='zipcode']").val() === '' &&
                $("input[name='email']").val() === '' &&
                $("input[name='mobileNumber']").val() === '';
    
            $('#hcp-nl-bookarep-submit').attr("disabled", isEmptyField);
        }
    
        setTimeout(enableSubmitButtonOnPreRender, 100);
    
        if (userData) {
            $("input[name='firstName']").val(userData.firstName);
            $("input[name='lastName']").val(userData.lastName);
            $("input[name='zipcode']").val(userData.territoryZipCode);
            $("input[name='email']").val(userData.email);
            $("input[name='mobileNumber']").val(userData.phoneNumber);
    
            $('#hcp-de-salute-options').find('input').each(function(index, item) {
                if (item.value === userData.title) {
                    $(`input[value='${item.value}']`).attr('checked', true);
                }
            });
        }
    
        // Check contactMe checkbox condition
        function contactMeAtOfficeCheck() {
            const _mobileRegxPattern = getRegExpObjFromString(_mobileNo.data('regex'));
            const _mobileRegex = new RegExp(_mobileRegxPattern).test(_mobileNo.val());
    
            _contactMeoffice.attr("disabled", !(_mobileNo.val() !== '' && _mobileRegex));
        }
    
        contactMeAtOfficeCheck();
        _mobileNo.on('click keyup onblur change', contactMeAtOfficeCheck);
    }
});

