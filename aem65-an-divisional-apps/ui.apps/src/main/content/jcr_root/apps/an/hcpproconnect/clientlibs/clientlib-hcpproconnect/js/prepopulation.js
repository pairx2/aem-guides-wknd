let sfdc_id = getUrlParameter("cid");
let regAccessCode = getUrlParameter("cid");
function valueList(prefLang,preferredLangList){
  $(preferredLangList).each(function() {
    if($(this).attr("data-optionvalue").toUpperCase() === prefLang.toUpperCase()){
      $("#preferredLanguage-options").find('.a-dropdown__field span').removeClass("a-dropdown__placeholder");
      $(this).parent().siblings('span').addClass("a-dropdown-selected");
      $(this).addClass("selected");
      $('#preferredLanguage-options').find('.a-dropdown-selected').text($(this).attr("data-optionvalue"));
    }
  })
}
function prepop(){
    
    if (hasUrlParameter("cid")) {
        regAccessCode = getUrlParameter("cid");
        let domainName = getApiFromCurrentServer();
        let lookUpApi = "api/public/lookup/user";

        let fetchPrepopulation = domainName.concat(lookUpApi);
        let captchaValue=localStorage.getItem("captchaValue");
        let prdHeaders = getHeaders();
        let raw = {
            "captchaValue": captchaValue,
            "userInfo": {
                "sfdcId": regAccessCode
            }
        }
        let requestOptions = {
            method: 'POST',
            headers: prdHeaders,
            body: JSON.stringify(raw)

        };
        showLoading();
        fetch(fetchPrepopulation, requestOptions)
            .then(response => response.text())
            .then(function(result) {
                if (result) {
                    let jsonResult = JSON.parse(result);
                     result = jsonResult.response;
                    localStorage.setItem("prepop", JSON.stringify(result));

                }
                let json = localStorage.getItem("prepop");
                let jsonArray = JSON.parse(json);
                let country = $("input[name=x-country-code]").val();

                if (!jsonArray?.userInfo)
                    return;

                $("#title").val(jsonArray.userInfo.title);
                $("#title").attr("disabled", true);
                $("#registrationEmailAddress").val(jsonArray.userInfo.email);
                $("#registrationEmailAddress").attr("disabled", true);
                $("#registrationFirstName").val(jsonArray.userInfo.firstName);
                $("#registrationFirstName").attr("disabled", true);
                $("#registrationLastName").val(jsonArray.userInfo.lastName);
                $("#registrationLastName").attr("disabled", true);
                $("#initialregistrationmobilenumber").val(jsonArray.userInfo.additionalProperties.phone);
                $("#initialregistrationmobilenumber").attr("disabled", true);
                $("#Postcode").val(jsonArray.userInfo.additionalProperties.Postcode);
                $("#Postcode").attr("disabled", true);
                $("#orgName").val(jsonArray.userInfo.additionalProperties.orgName.Name);
                $("#orgName").attr("disabled", true);
                $("#lineOne").val(jsonArray.userInfo.additionalProperties.billingStreet);
                $("#lineOne").attr("disabled", true);
                $("#billingState").val(jsonArray.userInfo.additionalProperties.billingState);
                $("#billingState").attr("disabled", true);
                $("#billingCity").val(jsonArray.userInfo.additionalProperties.billingCity);
                $("#billingCity").attr("disabled", true);
                userRegistrationPrePop(json);
                if(country=="IN" ) {
                    $("#licenseID").val(result.userInfo.additionalProperties.licenseID);
                    $("#licenseID").attr("disabled", true);

                    }
                else if(country=="TH" ){
                        $("#licenseID").val(result.userInfo.additionalProperties.licenseID);
                        $("#licenseID").attr("disabled", true);
                        let prefLang = result.userInfo.preferredLanguage;
                        let preferredLangList = $("#preferredLanguage-options").find(".a-dropdown__menu li")
                        valueList(prefLang,preferredLangList);

            }
            else if(country=="UK" ){

                $("#role").val(result.userInfo.role);
                    $("#role").attr("disabled", true);
               }

        hideLoading();

            })
            .catch(error => console.log('error', error));
        }
}
function registerPrepop(addtlProp){
  if(addtlProp.role) {
    //pre populate dropdown for jobid
    let jobID = "dropdown_label_registrationJobTitle";
    dropdownPopulator(jobID, addtlProp.role);
 }
 //prepopulate checkbox
 if(addtlProp.areaOfInterest) {
    let results = addtlProp.areaOfInterest.split(';');

    // for fix
    for (const element of results) {
      $("[id='"+element.trim()+"']").siblings('.a-checkbox__custom').trigger("click");
    }

    let checkboxSpans = $("#registrationAreaOfSpecialty-options").find('.a-checkbox label .a-checkbox__custom');
     checkboxSpans.each(function() {
        $(this).parent().addClass('disabled-checkbox');
        if($(this).attr('aria-checked') !== 'true') {
          $(this).addClass('disabled-dropdown');
        }
     });


 }

 if(addtlProp.orgName.Name) {
      $("#dropdown_label_regOrgNameUk").text(addtlProp.orgName.Name);
      $("#registrationStreet").val(addtlProp.billingStreet);
      $("#registrationCity").val(addtlProp.billingCity);
      $("#registrationState").val(addtlProp.billingState);
      $("#regOrgNameTextUk").attr('value', addtlProp.orgName.Name);

      $("#registrationStreet").attr("disabled","true");
      $("#registrationCity").attr("disabled","true");
      $("#registrationState").attr("disabled","true");
}
}
function prepopUser(addtlProp,userInfo){
  if(addtlProp.role) {
    $("#dropdown_label_registrationJobTitle").parent().addClass("disabled-dropdown");
}

//disabled title
if(userInfo.title) {
    $("#dropdown_label_salutation").parent().addClass("disabled-dropdown");
}

//disabled fistname if not empty
if(userInfo.firstName) {
  $("#registrationFirstName").attr("disabled","true");
} else {
  $("#registrationFirstName").removeAttr("disabled");
}
}
function lastaNameEmpty(addtlProp,userInfo){
  if(userInfo.lastName) {
    $("#registrationLastName").attr("disabled","true");
  } else {
    $("#registrationLastName").removeAttr("disabled");
  }

  //disabled work/trust
  if(addtlProp.orgName.Name) {
      $("#dropdown_label_regOrgNameUk")
                      .removeClass("a-dropdown__placeholder")
                      .addClass("a-dropdown-selected");
      $("#dropdown_label_regOrgNameUk").parent().addClass("disabled-dropdown");
  }
   //disabled email if not empty
  if(userInfo.email) {
    $("#email").attr("disabled","true");
  } else {
    $("#email").removeAttr("disabled");
  }
}

function userRegistrationPrePop(json) {

    let jsonArray = JSON.parse(json);
    if(jsonArray.hasOwnProperty('userInfo')) {
       let userInfo  = jsonArray.userInfo;
       let addtlProp = userInfo.additionalProperties;
       let titleId = "dropdown_label_salutation";

        dropdownPopulator(titleId, userInfo.title);
        $("#email").val(userInfo.email);
        $("#secondaryEmail").val(addtlProp.personalEmail);

      registerPrepop(addtlProp);
       if(isCountryCodeUK()) {
          //disabled dropdown for role
        prepopUser(addtlProp,userInfo); 

          //disabled lastname if not empty
         lastaNameEmpty(addtlProp,userInfo);

          //check if has personal email
          if(addtlProp.personalEmail) {
            $("#secondaryEmail").attr("disabled", "true");
            //for fix
            let requiredMark = $(`<span class="a-input-field--required" id="custom-required-mark">*</span>`);
            $('#conSecondEmail').parents('.a-input-field').removeAttr('data-required');
            $('#conSecondEmail').parents('.a-input-field').attr('data-required', 'true');
            $('#conSecondEmail').attr("required", "true");
            $('#conSecondEmail').parent().siblings('.form-label.a-input-label').append(requiredMark);
          } else {
            $("#secondaryEmail").removeAttr("disabled");
          }

          //check if has phone
          if(addtlProp.phone) {
            $("#initialregistrationmobilenumber").attr("disabled","true");
          } else {
            $("#initialregistrationmobilenumber").removeAttr("disabled");
          }

          if(!addtlProp.Postcode) {
            $("#postalcode").removeAttr("disabled");
            $("#registrationStreet").removeAttr('disabled');
            $("#registrationCity").removeAttr('disabled');
            $("#registrationState").removeAttr('disabled');
            $("#dropdown_label_regOrgNameUk").parent().removeClass("disabled-dropdown");
          } else {
            $("#regPostcodeUk").attr("disabled", true);
            $("#regPostcodeUk").val(addtlProp.Postcode);
          }
       }
    }

}
