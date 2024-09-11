//breadcrumb-patientcarers fix:
if($("input[name='x-country-code']").attr('value').toLowerCase() == "uk"){
    let currentPageurl = window.location.href;
    let ispatienturl= currentPageurl.includes("/patient-carers/")
    if(ispatienturl){
        $(".abbott-breadcrumb .a-breadcrumb__item:first-child").remove();
    }
}
$(document).ready(function(){
	let charLimit=80;
	let maxcharErrmsg;
$( "#regOrgNameTextUk" ).on("keyup", function() {
	setTimeout(function() {
	if($("#regOrgNameTextUk").val().length > charLimit) {
		maxcharErrmsg='<em class="abt-icon abt-icon-exclamation" style="font-size: .75rem;padding-right: .5rem;position: relative;top: 1px;"></em>Please reduce text to only have 80 characters';
       }
	else{
		maxcharErrmsg='<em class="abt-icon abt-icon-exclamation" style="font-size: .75rem;padding-right: .5rem;position: relative;top: 1px;"></em>Special characters are not allowed in the work/trust, street and city fields.Please fill in address manually without special characters.';
	}
		$('#regOrgNameTextUk').closest('.form-group').find('.a-input-field--text-regex').html(maxcharErrmsg); 
	}, 100);
});
	
});
function checkWorkcharlength(){
    let charLimit=80;
    let maxcharErrmsg='<em class="abt-icon abt-icon-exclamation" style="font-size: .75rem;padding-right: .5rem;position: relative;top: 1px;"></em>Please reduce text to only have 80 characters';
    if($("#regOrgNameTextUk").attr('value').length > charLimit) {
        $('#regOrgNameUkUl').closest('.a-dropdown').find('.a-input-field--text-regex').html(maxcharErrmsg);                        
    }
}

function getAddressDetail(){
    let addressList = addressDropdown.find('.a-dropdown__menu').children();
    addressList.click(function(){
        $(this).each(function(){
            let pattern,Orgpattern,orgnameArr=[],skipflag=false;
            if(!$(this).hasClass('fill-manually')) {
                $("#registrationStreet").val($(this).attr('billingStreet'));
                $("#registrationState").val($(this).attr('billingState'));
                $("#registrationCity").val($(this).attr('billingCity'));
                $("#regOrgNameTextUk").attr('value', $(this).attr('orgName'));	 
                orgnameArr.push($("#registrationStreet").val());
                orgnameArr.push($("#registrationCity").val());
                pattern= new RegExp($("#registrationStreet").attr('data-regex').replaceAll('/',''));
                Orgpattern= new RegExp($("#regOrgNameTextUk").attr('data-regex').replaceAll('/',''));
                $(this).closest('.a-dropdown').find('.a-input-field--text-regex').remove();
                $.each(orgnameArr,function(i,v){
                    if(skipflag){return;}
                    if(!pattern.test(v)) {
                        $('#regOrgNameUkUl').closest('.a-dropdown').append(' <span class="form-text a-input-field--text-regex" style="display:block;color:#e4002b"><em class="abt-icon abt-icon-exclamation" style="font-size: .75rem;padding-right: .5rem;position: relative;top: 1px;"></em>Special characters are not allowed in the work/trust, street and city fields.Please fill in address manually without special characters.</span>');
                        skipflag=true;
                    }                                                        
                });
                if(!skipflag && !Orgpattern.test($("#regOrgNameTextUk").attr('value'))){
					$('#regOrgNameUkUl').closest('.a-dropdown').append(' <span class="form-text a-input-field--text-regex" style="display:block;color:#e4002b"><em class="abt-icon abt-icon-exclamation" style="font-size: .75rem;padding-right: .5rem;position: relative;top: 1px;"></em>Special characters are not allowed in the work/trust, street and city fields.Please fill in address manually without special characters.</span>');
				}
                //placeofwork max length check:
                checkWorkcharlength();
                localStorage.setItem('isDcrTypeNew', false);
                $("#dropdown_label_regBillingStateSelect")
                    .removeClass('a-dropdown__placeholder')
                    .addClass('a-dropdown-selected');
            }
            else{
                $('#regOrgNameUkUl').closest('.a-dropdown').find('.a-input-field--text-regex').remove();
            }
        });
    });
}

function initRegistrationPopup() {
    initDropdownWithSearch('registrationJobTitle');
    initMultiCheckbox('registrationAreaOfSpecialty');
    initAddressDropdown();
    toggleEyeIconPassword();
    keyUpPassword();
    let contactUsLink = $('#reg-form-contact-us-link').attr('href');
    $('#reg-form-contact-us-link').parents('.link').hide();
    $('#discrepancyErrorMsg_fullRegister')
      .find('.a-contact-us-link')
      .attr('href', contactUsLink);
 
    $('#secondaryEmail, #conSecondEmail').on("input", function () {
       validateConfirmPassword('#secondaryEmail', '#conSecondEmail', '.secondMatchemail', false);
    });
 
    $('#email, #conemail').on("input", function () {
       validateConfirmPassword('#email', '#conemail', '.matchemail', true);
    });
 
    $('#initial-registration-content > .columncontrol .row:first').children().each(function() {
        if($(this).hasClass('col-lg-2'))
            $(this).removeClass('col-lg-2').addClass('col-lg-1');
 
        if($(this).hasClass('col-lg-8'))
            $(this).removeClass('col-lg-8').addClass('col-lg-10');
 
        if($(this).hasClass('col-md-2'))
            $(this).removeClass('col-md-2');
 
        if($(this).hasClass('col-md-8'))
            $(this).removeClass('col-md-8').addClass('col-md-12');
    });
 }
 let addressDropdown = $('#regOrgNameUk-options');
 // Address dropdown with fill-manually option...
 function initAddressDropdown() {   
     $(document).ready(function() {
         getBillingStateSelectValues();
         readOnlyAddressFields(true);
         displayOrgNameText(false);
         displayBillingStateSelect(false);
         initDropdownWithSearch('regOrgNameUk');
 
         let placeholderText = addressDropdown.find(".a-dropdown .a-dropdown__placeholder").text();
 
         $("#regOrgNameUkUl").remove();
         let ul = $(`<ul class="a-dropdown__menu"
                         name="orgName"
                         id="regOrgNameUkUl"
                         aria-labelledby="field_label_regOrgNameUk"
                         aria-expanded="false"></ul>`);
 
         addressDropdown.find('.a-dropdown__field').append(ul);
         insertManualOption();
 
         $("#regPostcodeUk").focusin(function() {
             addressDropdown.find('.a-dropdown__menu').children().not(".fill-manually:first").remove();
             addressDropdown.find('.a-dropdown__field span')
                            .removeClass("a-dropdown-selected")
                            .addClass("a-dropdown__placeholder");
             addressDropdown.find('.a-dropdown__field > span').text(placeholderText);
            
             $('#regOrgNameUkUl').closest('.a-dropdown').find('.a-input-field--text-regex').remove();
             clearAddressFields();
             displayOrgNameText(false);
             displayBillingStateSelect(false);
             readOnlyAddressFields(true);
         })
         .focusout(function() {
             readOnlyAddressFields(true);
             addressDropdown.find('.a-dropdown__menu').children().not(".fill-manually:first").remove();
 
             if($(this).val() != "")
                getAddressByPostcode($(this).val());
         });
 
         $('.fill-manually').click(function(){
             clearAddressFields();
             readOnlyAddressFields(false);
             displayOrgNameText(true);
             displayBillingStateSelect(true);
             localStorage.setItem('isDcrTypeNew', true);
         });
 
         $('.regBillingStateItem').click(function(){
             let value = $(this).attr('data-optionvalue');
             $('#registrationState').val(value);
         });
     });
 
     
     function getAddressByPostcode(postcode) {
         let appId = $("input[name=x-application-id]").val();
         let countryCode = $("input[name=x-country-code]").val();
         let language = $("input[name=x-preferred-language]").val();
 
         let headers = new Headers();
         headers.append("x-application-id", appId);
         headers.append("x-country-code", countryCode);
         headers.append("x-preferred-language", language);
         headers.append("Content-Type", "application/json");
 
         checkAddressByPostcode(headers, postcode)
             .then(response => response.text())
             .then(function (result) {
                 let data = JSON.parse(result);
                 if(data.errorCode == 0) {
                     let addresses = data.response;
 
                     if(addresses.length > 0)
                         addresses = sortAddress('orgName', true, addresses);
 
                     addresses.forEach(function(item) {
                         const orgData = $(`<li data-optionvalue="${item.accountId}"
                                              billingStreet="${item.billingStreet}"
                                              billingState="${item.billingState}"
                                              billingCity="${item.billingCity}"
                                              orgName="${item.orgName}">
                                              <span>${item.orgName}</span></li>`);
                         addressDropdown.find('.a-dropdown__menu').append(orgData);
                     });
 
                     initDropdownWithSearch('regOrgNameUk');
 
                     
                            
                             getAddressDetail();
                            
                        
                 }
             });
     }
 
     function sortAddress(prop, asc, address) {
         address.sort(function(a, b) {
             if (asc) {
                let a_SortAddress = ((a[prop] < b[prop]) ? -1 : 0)
                 return (a[prop] > b[prop]) ? 1 : a_SortAddress;
             } else {
                let b_sortAddress = ((b[prop] < a[prop]) ? -1 : 0)
                 return (b[prop] > a[prop]) ? 1 : b_sortAddress;
             }
         });
 
         return address;
     }
 
     function readOnlyAddressFields(value) {
         let street = $("#registrationStreet");
         let state = $("#registrationState");
         let city = $("#registrationCity");
 
         street.closest('.form-group').removeClass("validation-require");
         state.closest('.form-group').removeClass("validation-require");
         city.closest('.form-group').removeClass("validation-require");
 
         if(value) {
             $('#registrationSubmit').attr('disabled', true);
             street.attr('disabled', 'disabled');
             state.attr('disabled', 'disabled');
             city.attr('disabled', 'disabled');
 
             street.parent().siblings('label').find('.a-input-field--required').text("");
             state.parent().siblings('label').find('.a-input-field--required').text("");
             city.parent().siblings('label').find('.a-input-field--required').text("");
         } else {
             street.removeAttr('disabled');
             state.removeAttr('disabled');
             city.removeAttr('disabled');
 
             street.parent().siblings('label').find('.a-input-field--required').text("*");
             state.parent().siblings('label').find('.a-input-field--required').text("*");
             city.parent().siblings('label').find('.a-input-field--required').text("*");
         }
     }
 
     function insertManualOption() {
         let manualOption = $(`<li class="fill-manually"><span>Fill in Address Manually</span></li>`);
         addressDropdown.find('.a-dropdown__menu').append(manualOption);
     }
 
     function displayOrgNameText(value) {
         setTimeout(function(){
              $('#regOrgNameTextUk').closest('.form-group').removeClass("validation-require");
             if(value) {
                 $('#regOrgNameTextUk').closest('.fields').show();
                 $('#regOrgNameTextUk').attr('type', 'text');
                 addressDropdown.parent().hide();
             } else {
                 $('#regOrgNameTextUk').closest('.fields').hide();
                 $('#regOrgNameTextUk').attr('type', 'hidden');
                 addressDropdown.parent().show();
             }
         }, 100);
     }
 
     function displayBillingStateSelect(value) {
         setTimeout(function(){
             resetCountyDropdown();
 
             if(value) {
                 $('#regBillingStateSelect-options').parent('.options').show();
                 $('#registrationState').closest('.fields').hide();
             } else {
                 $('#regBillingStateSelect-options').parent('.options').hide();
                 $('#registrationState').closest('.fields').show();
             }
         }, 100);
     }
 
     function clearAddressFields() {
         $("#registrationStreet").val("");
         $("#registrationState").val("");
         $("#registrationCity").val("");
         $('#regOrgNameTextUk').val("");
     }
 
     function getBillingStateSelectValues() {
         $("#regBillingStateSelect-options .a-dropdown__field").find('ul').empty();
 
         if(countyObj) {
             countyObj.counties.forEach((data, idx) => {
                 let county = data.name;
                 let li = $(`
                     <li data-optionvalue=${county}
                         id=field_label_regBillingStateSelect_${idx}
                         class="regBillingStateItem">
                         <span class="a-dropdown__option-text">${county}</span>
                     </li>
                 `);
 
                 $("#regBillingStateSelect-options .a-dropdown__field").find('ul').append(li);
             });
 
             initDropdownWithSearch('regBillingStateSelect');
         }
     }
 
     function resetCountyDropdown() {
         $('#regBillingStateSelect-options').find('.form-group').removeClass("validation-require");
         $("#dropdown_label_regBillingStateSelect").text("County...");
         $("#dropdown_label_regBillingStateSelect").removeClass('a-dropdown-selected').addClass('a-dropdown__placeholder');
         $("#dropdown_label_regBillingStateSelect").siblings('ul').attr("aria-expanded", "false");
         $("#dropdown_label_regBillingStateSelect").siblings('ul').removeAttr("aria-activedescendant");
     }
 }
 