
function setMyAccountData(data) {
    let retrievedObject = JSON.parse(data);
    for (const key in retrievedObject) {
        let input = null;
        let textarea = null;
        let formOption = null;
		input = $(`input[name='${key}']`);
        textarea = $(`textarea[name='${key}']`);
        formOption = $(`.options.o-form-option--base .a-dropdown__menu[name='${key}']`);
        if (input != null && input.length) {
            input.val(retrievedObject[key]);
        } else if (textarea != null && textarea.length) {
            textarea.val(retrievedObject[key]);
        } else if (formOption !=null && formOption.length) {
            $(`.options.o-form-option--base .a-dropdown__menu[name='${key}'] li`).removeClass('selected');
            $(`.options.o-form-option--base .a-dropdown__menu[name='${key}'] li[data-optionvalue='${retrievedObject[key]}']`).addClass('selected');
			if($(`.options.o-form-option--base .a-dropdown__menu[name='${key}'] li[data-optionvalue='${retrievedObject[key]}']`).length) {
				$(`.options.o-form-option--base .a-dropdown__menu[name='${key}']`).prev()[0].innerText = $(`.options.o-form-option--base .a-dropdown__menu[name='${key}'] li.selected`)[0].innerText.trim();
			}
        }
	}
}
function errorMsgChange(prefix){
    let mobPrefix = prefix;
    let mobPrefixList = ['+501','+502','+503','+504','+505'];
    let telContent = $('[type="tel"]').closest(".form-group").find(".a-input-field--text-regex");
    for(let i in mobPrefixList) {
        if(telContent.text().indexOf(mobPrefixList[i]) > -1) {
            telContent.html(telContent.html().replace(mobPrefixList[i],mobPrefix));
        }
    }
}
function profileInstance(){
    setTimeout(function() {
        switch($('.o-form-container--base.o-form-container--profile [name=country]').val()) {
            case 'Honduras':
                $('.o-form-container--base.o-form-container--profile input[type=tel]').attr('placeholder','+504');
                $('.o-form-container--base.o-form-container--profile input[type=tel]').attr('data-regex','/^\\+[5][0][4][0-9]{8}$/');
                errorMsgChange('+504');
                break;
            case 'Nicaragua':
                $('.o-form-container--base.o-form-container--profile input[type=tel]').attr('placeholder','+505');
                $('.o-form-container--base.o-form-container--profile input[type=tel]').attr('data-regex','/^\\+[5][0][5][0-9]{8}$/');
                errorMsgChange('+505');
                break;
            case 'El salvador':
                $('.o-form-container--base.o-form-container--profile input[type=tel]').attr('placeholder','+503');
                $('.o-form-container--base.o-form-container--profile input[type=tel]').attr('data-regex','/^\\+[5][0][3][0-9]{8}$/');
                errorMsgChange('+503');
                break;
            case 'Belize':
                $('.o-form-container--base.o-form-container--profile input[type=tel]').attr('placeholder','+501');
                $('.o-form-container--base.o-form-container--profile input[type=tel]').attr('data-regex','/^\\+[5][0][1][0-9]{8}$/');
                errorMsgChange('+501');
                break;
            default:
                $('.o-form-container--base.o-form-container--profile input[type=tel]').attr('placeholder','+502');
                $('.o-form-container--base.o-form-container--profile input[type=tel]').attr('data-regex','/^\\+[5][0][2][0-9]{8}$/');
                errorMsgChange('+502');
                break;
        }
    },250);
}
function observerInstance(newNodes, registerForm, getProfileForm){
    if( newNodes !== null ) { // If there are new nodes added
        if (registerForm.length) {
            switch($('#latam-form-signup ul.a-dropdown__menu[name=country] li.selected').attr('data-optionvalue')) {
                case 'hn':
                    $('#latam-form-signup input[type=tel]').attr('placeholder','+504');
                    $('#latam-form-signup input[type=tel]').attr('data-regex','/^\\+[5][0][4][0-9]{8}$/');
                    errorMsgChange('+504');
                    break;
                case 'ni':
                    $('#latam-form-signup input[type=tel]').attr('placeholder','+505');
                    $('#latam-form-signup input[type=tel]').attr('data-regex','/^\\+[5][0][5][0-9]{8}$/');
                    errorMsgChange('+505');
                    break;
                case 'sv':
                    $('#latam-form-signup input[type=tel]').attr('placeholder','+503');
                    $('#latam-form-signup input[type=tel]').attr('data-regex','/^\\+[5][0][3][0-9]{8}$/');
                    errorMsgChange('+503');
                    break;
                case 'bz':
                    $('#latam-form-signup input[type=tel]').attr('placeholder','+501');
                    $('#latam-form-signup input[type=tel]').attr('data-regex','/^\\+[5][0][1][0-9]{8}$/');
                    errorMsgChange('+501');
                    break;
                default:
                    $('#latam-form-signup input[type=tel]').attr('placeholder','+502');
                    $('#latam-form-signup input[type=tel]').attr('data-regex','/^\\+[5][0][2][0-9]{8}$/');
                    errorMsgChange('+502');
                    break;
            }
        }
        else if(getProfileForm.length && ($("body").attr("data-country-code").toLowerCase() === "gt")) {
            profileInstance();            
        }
    }
}
function detailSure(userDetails, data){
    if($("[name='Recomendación']").length) {
        userDetails.Recomendación = data.responseJSON.response.additionalProfileProperties.recommendedBy;
    }
    if($("[name='Recommended_By__c']").length) {
        userDetails.Recommended_By__c = data.responseJSON.response.additionalProfileProperties.recommendedBy;
    }
}
function profileAction(data, xAppId){
    if (data.responseJSON.errorCode == 0) {
        let userDetails = {
            dateOfBirth: data.responseJSON.response.userInfo.dateOfBirth,
            firstName: data.responseJSON.response.userInfo.firstName,
            gender: data.responseJSON.response.userInfo.gender,
            id: data.responseJSON.response.userInfo.id,
            identification: data.responseJSON.response.userInfo.idNumber,
            idType: data.responseJSON.response.userInfo.idType,
            lastName: data.responseJSON.response.userInfo.lastName,
            userName: data.responseJSON.response.userInfo.userName,
            number : data.responseJSON.response.contacts[0].number,
            zipCode: data.responseJSON.response.addresses[0].zipCode,
            country: data.responseJSON.response.addresses[0].country,
            lineOne: data.responseJSON.response.addresses[0].lineOne,
            state: data.responseJSON.response.addresses[0].state,
            city: data.responseJSON.response.addresses[0].city,
            department: data.responseJSON.response.additionalProfileProperties.department,
            nutriSelect: data.responseJSON.response.additionalProfileProperties.nutriSelect,
            consumer: data.responseJSON.response.additionalProfileProperties.consumer,
            consumer__c: data.responseJSON.response.additionalProfileProperties.consumer__c,
            Have_Children__c: data.responseJSON.response.additionalProfileProperties.haveChildren,
            No_Children__c: data.responseJSON.response.additionalProfileProperties.noChildren,
            Ensure_Profile__c: data.responseJSON.response.additionalProfileProperties.Ensure_Profile__c,
            Interested_in_Ensure__c: data.responseJSON.response.additionalProfileProperties.Interested_in_Ensure__c,
            Pediasure_Profile__c: data.responseJSON.response.additionalProfileProperties.Pediasure_Profile__c,
            Interested_in_Pediasure__c: data.responseJSON.response.additionalProfileProperties.Interested_in_Pediasure__c,
            Glucerna_Profile__c: data.responseJSON.response.additionalProfileProperties.Glucerna_Profile__c,
            Interested_in_Glucerna__c: data.responseJSON.response.additionalProfileProperties.Interested_in_Glucerna__c,
            Mastermama_Profile__c: data.responseJSON.response.additionalProfileProperties.Mastermama_Profile__c,
            Interested_in_Mastermama__c: data.responseJSON.response.additionalProfileProperties.Mastermama_Profile__c
        }
        if($("[name='consumer__c']").length) {
            userDetails.consumer__c = data.responseJSON.response.additionalProfileProperties.consumer;
        }
        else if($("[name='Consumer__c']").length) {
            userDetails.Consumer__c = data.responseJSON.response.additionalProfileProperties.consumer;
        }
        if(xAppId === 'anensure') {
            detailSure(userDetails, data);
            userDetails.Interested_in_Ensure__c = data.responseJSON.response.additionalProfileProperties.interestedIn;
            userDetails.Ensure_Profile__c = data.responseJSON.response.additionalProfileProperties.reasonToTake;
        }
        else if(xAppId === 'anpediasure') {
            userDetails.RecommendedBy__c = data.responseJSON.response.additionalProfileProperties.recommendedBy;
            userDetails.Interest_in_Pediasure__c = data.responseJSON.response.additionalProfileProperties.interestedIn;
        }
        else if(xAppId === 'anglucerna') {
            userDetails.Recomendación = data.responseJSON.response.additionalProfileProperties.recommendedBy;
            userDetails.Interested_in_Glucerna__c = data.responseJSON.response.additionalProfileProperties.interestedIn;
            userDetails.Glucerna_Profile__c = data.responseJSON.response.additionalProfileProperties.diabetesStage;
        }
        else if(xAppId === 'anmastermama') {
            if($("[name='Recomendación']").length) {
                userDetails.Recomendación = data.responseJSON.response.additionalProfileProperties.recommendedBy;
            }
            if($("[name='Recommended_by__c']").length) {
                userDetails.Recommended_by__c = data.responseJSON.response.additionalProfileProperties.recommendedBy;
            }
            userDetails.Mom_Interest__c = data.responseJSON.response.additionalProfileProperties.reasonToTake;
        }
        setItemLocalStorage("userDetails", JSON.stringify(userDetails));
    }
}
$(document).ready(function () {
    //disable false for all the submit buttons
    let xAppId = $('[name="x-application-id"]').val(),
    xCountryCode = $('[name="x-country-code"]').val(),
    xLangCode = $('[name="x-preferred-language"]').val(),
    registerForm = $("#latam-form-signup"),
    getProfileForm = $("#latam-getProfile");
    
    let FormContainerSubmitBtn = $('.formcontainer.o-form-container--base button[type="submit"]');
	let successfulLogin = getItemLocalStorage('cJwt',true);
    let target = $("#latam-form-signup ul[name=country]")[0];
    let getProfileTarget = $(".o-form-container--base.o-form-container--profile [name=country]")[0];	
    // Create an observer instance
    let observer = new MutationObserver(function( mutations ) {
    mutations.forEach(function( mutation ) {
        let newNodes = mutation.addedNodes; // DOM NodeList
        observerInstance(newNodes, registerForm, getProfileForm);        
    });    
    });
    if (successfulLogin) {
        setTimeout(function() {
            setMyAccountData(getItemLocalStorage("userDetails"));
        },100);
    }
    // Configuration of the observer:
    let config = { 
        attributes: true, 
        childList: true, 
        characterData: true 
    };
    // Pass in the target node, as well as the observer options
    if(registerForm.length && $('#latam-form-signup ul.a-dropdown__menu[name=country]').length) {
        observer.observe(target, config);
    }
    if(getProfileForm.length && $('.o-form-container--base.o-form-container--profile [name=country]').length) {
        observer.observe(getProfileTarget, config);
    }
    /*logic ends*/
    if(FormContainerSubmitBtn.length) {
        $('.formcontainer.o-form-container--base button[type="submit"]').attr("disabled", false);
    }
    if (getProfileForm.length) {
        $('.o-form-container--profile input[type=email], .o-form-container--profile [name=country]').css({'pointer-events':'none'}).attr('tabindex','-1');
        updateProfile();
    }

    function updateProfile() {
        const action = getProfileForm.find("form").attr("action");
        let headers = {
            "x-application-id": xAppId,
            "x-country-code": xCountryCode,
            "x-preferred-language": xLangCode,
            "x-id-token": successfulLogin
        };

        let data = $.ajax({
            "url": action,
            "method": "GET",
            "headers": headers,
            "async": false
        });
                
        profileAction(data, xAppId);
    }
});