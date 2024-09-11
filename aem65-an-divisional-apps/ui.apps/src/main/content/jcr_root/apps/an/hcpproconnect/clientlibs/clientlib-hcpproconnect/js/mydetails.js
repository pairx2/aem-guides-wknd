if(url.indexOf("profile-overview") >= 0 ){
    initMultiCheckbox('profileareaOfInterest');
    let dropdownHelpText = $("#updateProfileForm .a-dropdown__field.disabled").parent().siblings('p');
    dropdownHelpText.each(function() {
        let text = $(this).text();
        let helpText = $(`<span class="form-text a-input-field--text-help">${text}</span>`);
        $(this).siblings('.a-dropdown.a-input-field').append(helpText);
        $(this).detach();
    });
	let json = localStorage.getItem("userProfile");
     if (json !== null && json !=='undefined') {
    	let jsonArray = JSON.parse(json);
        let responseProfile=jsonArray.userInfo.additionalProperties;
        let countryCode = $("input[name=x-country-code]").val();
    
        $("#firstName").val(jsonArray.userInfo.firstName);
        $("#lastName").val(jsonArray.userInfo.lastName );
		if(responseProfile.phone == undefined) {
            $("#phone").attr("value", "");
        } else {
            $("#phone").val(responseProfile.phone);
        }
        $("#email").val(jsonArray.userInfo.email);
		$("#conemail").val(jsonArray.userInfo.email);
		$("#secondaryEmail").val(responseProfile.personalEmail ? responseProfile.personalEmail : "");
        $("#conSecondEmail").val(responseProfile.personalEmail ? responseProfile.personalEmail : "");
        $("#licenseID").val(responseProfile.licenseID);
        $("#billingStreet").val(responseProfile.billingStreet);
        $("#billingCity").val(responseProfile.billingCity);
        $("#billingState").val(responseProfile.billingState);
        $("#profilepostalcode").val(responseProfile.Postcode);

        if(responseProfile.Postcode == "00000" && $("input[name=x-country-code]").val() === "TH")
        {
			const dummyValue = `<li data-optionvalue="" billingStreet="" billingState="" billingCity="" ><span>N/A</span></li>`;
            $('#profileInstitutionName-options').find('.a-dropdown__menu').append(dummyValue);
            let a = $('#profileInstitutionName-options').find('.a-dropdown__field');
            $(a).find("span:first").removeClass("a-dropdown__placeholder");            
            $(a).find("span:first").addClass("a-dropdown-selected");
            $(a).find("span").html("N/A");
        }
        else{
			getAddressOnProfileDashborad(responseProfile.Postcode, responseProfile.orgName.Id);
        }
        getTitleProfileDashboard(jsonArray.userInfo.title);
        getRoleProfileDashboard(responseProfile.role);
        getAreaOfIntProfileDashboard(responseProfile.areaOfSpecialty);
    
        if(countryCode == "IN" || countryCode == "TH")
        {
            $("#phone").val("+" + responseProfile.phone);	
            $("#profiletitle-options .a-dropdown__field").addClass("disabled");
            $("#profilerole-options .a-dropdown__field").addClass("disabled");
            $("#profileareaOfInterest-options .a-dropdown__field").addClass("disabled");
            $("#profileInstitutionName-options .a-dropdown__field").addClass("disabled");
        }
        $('#profileInstitutionName-options').find('.a-dropdown__field').append(dropdownMenu);
	}

}


function getTitleProfileDashboard(profileTitle) {
        let titleList = $("#profiletitle-options").find(".a-dropdown__menu li")
        $(titleList).each(function() {
            
            if($(this).attr("data-optionvalue") === profileTitle){
    
                $("#profiletitle-options").find('.a-dropdown__field span').removeClass("a-dropdown__placeholder");
                $(this).parent().siblings('span').addClass("a-dropdown-selected");
                $(this).addClass("selected");
                $('#profiletitle-options').find('.a-dropdown-selected').text($(this).attr("data-optionvalue"));
            }
        })
    }

    function getRoleProfileDashboard(profilerole) {
        let roleList = $("#profilerole-options").find(".a-dropdown__menu li");
        $(roleList).each(function() {        
            if($(this).attr("data-optionvalue") === profilerole){
                $("#profilerole-options").find('.a-dropdown__field span').removeClass("a-dropdown__placeholder");
                $(this).parent().siblings('span').addClass("a-dropdown-selected");
                $(this).addClass("selected");
                $('#profilerole-options').find('.a-dropdown-selected').text(profilerole);
            }
        })
    }

    function getAreaOfIntProfileDashboard(profileAreaOfInterest) {  
        if(isCountryCodeUK()){  
            let areaOfInterestList = profileAreaOfInterest ;
            let results = areaOfInterestList.split(';');
            // select checkbox
            for (const element of results) {
                $("[id='"+element.trim()+"']").siblings('.a-checkbox__custom').trigger("click");
            } 
        }
        else{
            let areaOfInterestList = $("#profileareaOfInterest-options").find(".a-dropdown__menu li");
            $(areaOfInterestList).each(function() {        
            if($(this).attr("data-optionvalue") === profileAreaOfInterest){
                $("#profileareaOfInterest-options").find('.a-dropdown__field span').removeClass("a-dropdown__placeholder");
                $(this).parent().siblings('span').addClass("a-dropdown-selected");
                $(this).addClass("selected");
                $('#profileareaOfInterest-options').find('.a-dropdown-selected').text(profileAreaOfInterest);
            }
        })
        }
    }

$("#profilepostalcode").focusin(function() {
	$('#profileInstitutionName-options').find('.a-dropdown__menu').children().remove();

        $("#profileInstitutionName-options").find('.a-dropdown__field span').removeClass("a-dropdown-selected");
        $("#profileInstitutionName-options").find('.a-dropdown__field span').addClass("a-dropdown__placeholder");
       
});


$("#profilepostalcode").focusout(function() {
	if($("#profilepostalcode").val() == "00000" && $("input[name=x-country-code]").val() === "TH")
        {        
            const dummyValue = `<li data-optionvalue="" billingStreet="" billingState="" billingCity="" ><span>N/A</span></li>`;
            $('#profileInstitutionName-options').find('.a-dropdown__menu').append(dummyValue);
            let profileDropdown = $('#profileInstitutionName-options').find('.a-dropdown__field');
            $(profileDropdown).find("span:first").removeClass("a-dropdown__placeholder");            
            $(profileDropdown).find("span:first").addClass("a-dropdown-selected");
            $(profileDropdown).find("span").html("N/A");
        }
        else{
            let postcodefield = $("#profilepostalcode").val();
    		getAddressOnProfileDashborad(postcodefield);
        }
});

function getAddressOnProfileDashborad(postcodefield, orgId) {
    let raw = JSON.stringify({
        "postCode": postcodefield
    });

	let requestOptions = {
  	  method: 'POST',
  	  headers: addHeaders,
  	  body: raw,
      redirect: 'follow'
	};

	fetch(fetchAddress, requestOptions)
      .then(response => response.text())
      .then(function (result) {
      	if(result){
        	let jsonResult = JSON.parse(result);
        	let addressResult = jsonResult.response;
            if($('#profileInstitutionName-options').find('.a-dropdown__menu').children().length > 0){
				$('#profileInstitutionName-options').find('.a-dropdown__menu').children().remove();
			}
            addressResult.forEach(function(item) {
			const orgData = `<li data-optionvalue="${item.accountId}" billingStreet="${item.billingStreet}" billingState="${item.billingState}" billingCity="${item.billingCity}" ><span>${item.orgName}</span></li>`;
                $('#profileInstitutionName-options').find('.a-dropdown__menu').append(orgData);

			});
            let addressList = $('#profileInstitutionName-options').find('.a-dropdown__menu').children();
            $(addressList).click(function(){
            	$(this).each(function(){
                    $("#billingStreet").val($(this).attr('billingStreet'));
                    $("#billingState").val($(this).attr('billingState'));
                    $("#billingCity").val($(this).attr('billingCity'));
            	});
            });

                let orgNameList = $("#profileInstitutionName-options").find(".a-dropdown__menu li")
                $(orgNameList).each(function() {        
                    if($(this).attr("data-optionvalue") === orgId){
                        $("#profileInstitutionName-options").find('.a-dropdown__field span').removeClass("a-dropdown__placeholder");
                        $(this).parent().siblings('span').addClass("a-dropdown-selected");
                        $(this).addClass("selected");
                        $('#profileInstitutionName-options').find('.a-dropdown-selected').text($(this).find("span").text());
                    }
                });
            }


	})
      .catch(error => console.log('error', error));
}
