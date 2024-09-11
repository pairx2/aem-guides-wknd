function consentCounterInc(value,generalConsentCounter){
    if(value)
    {
        generalConsentCounter++;
    }
    return generalConsentCounter;
}

function updatedRequest(key,value,consentOptInArray){
    let generalConsentCounter = 0;
    let medicalConsentCounter = 0;
    let marketingConsentCounter = 0;

    if ($("#socialmediareach-options").length) {
        let checkboxdInputs = $('#socialmediareach-options .a-checkbox').find('.a-checkbox__input');
        for(let i of checkboxdInputs)
        {
            key = $(i).val();
            value = $(i).prop('checked') ;
            consentOptInArray[key] = value;
            generalConsentCounter = consentCounterInc(value,generalConsentCounter);
        }
    }

    if ($("#marketingsocialmediareach-options").length) {
        let checkboxdatafinderMR = $('#marketingsocialmediareach-options').find('.a-checkbox');
        let checkboxdInputsMR = ($(checkboxdatafinderMR).find('.a-checkbox__input'));
        for(let i of checkboxdInputsMR)
        {
            key = $(i).val();
            value = $(i).prop('checked') ;
            consentOptInArray[key] = value;
            if(value)
            {
				marketingConsentCounter++;
            }
        }
    }
    
    if ($("#educationconsent-options").length) {
        let checkboxdatafinderMed = $('#educationconsent-options').find('.a-checkbox');
        let checkboxdInputsMed = ($(checkboxdatafinderMed).find('.a-checkbox__input'));
        for(let i of checkboxdInputsMed)
        {
            key = $(i).val();
            value = $(i).prop('checked') ;
            consentOptInArray[key] = value;
            if(value)
            {
				medicalConsentCounter++;
            }
        }
    }
    consentOptInArray = consentUpdated(generalConsentCounter,marketingConsentCounter,medicalConsentCounter,consentOptInArray);

    return consentOptInArray;
}
function consentUpdated(generalConsentCounter,marketingConsentCounter,medicalConsentCounter,consentOptInArray){
    let date=new Date();
    
    if(generalConsentCounter== 0)
    {
        consentOptInArray["generalConsentRevoked"] = date.toISOString();
        consentOptInArray["generalConsentStatus"] = "Revoked";
    }
    else{
        consentOptInArray["generalConsentStatus"] = "completed";
        consentOptInArray["generalConsenSigned"] = date.toISOString();
        consentOptInArray["generalConsentRevoked"] = "";
    }
    if(marketingConsentCounter == 0)
    {
        consentOptInArray["marketingConsentRevoked"] = date.toISOString();
        consentOptInArray["marketingConsentStatus"] = "Revoked";
    }
    else{
        consentOptInArray["marketingConsentStatus"] = "completed";
        consentOptInArray["marketingConsentSigned"] = date.toISOString();
        consentOptInArray["marketingConsentRevoked"] = "";
    }
    if(medicalConsentCounter == 0)
    {
        consentOptInArray["medicalConsentRevoked"] = date.toISOString();
        consentOptInArray["medicalConsentStatus"] = "Revoked";
    }
    else{
        consentOptInArray["medicalConsentStatus"] = "completed";
        consentOptInArray["medicalConsentSigned"] = date.toISOString();
        consentOptInArray["medicalConsentRevoked"] = "";
    }

    return consentOptInArray;
}
/** Initial Registration -- starts**/
function updateConsentRequest(data) {

    let consentOptInArray = {};
    let userRegDetails;
    let key = "";
    let value = false ;
    consentOptInArray = updatedRequest(key,value,consentOptInArray);

    
   
    let isOptIn = true;
    if(consentOptInArray["phoneOptIn"] == isOptIn)
    {
        let preferedtimeline =  $('#preferedtimelines-options').find('.a-checkbox');
        let preferedtimelineInput = ($(preferedtimeline).find('.a-checkbox__input'));
        let preferredTimeStr = "";
        for(let i of preferedtimelineInput)
        {
            if($(i).prop('checked'))
            {
                preferredTimeStr += $(i).val() + ";";
            }
        }
        consentOptInArray["preferredTime"] = preferredTimeStr.substring(0,preferredTimeStr.length-1);
    
    
        let days = $(".a-badges").find('.a-badges--text');
        let preferredDays = "";
    
        $(days).each(function() {
            if($(this).hasClass('checked')){
                let dayCode  = $(this).text().trim();
                let dayName = getDayName(dayCode.toUpperCase());
                preferredDays += dayName + ";"
            }
        });
        consentOptInArray["preferredDays"] = preferredDays.substring(0,preferredDays.length-1);
    }
    else
    {
		consentOptInArray["preferredTime"] = "";
		consentOptInArray["preferredDays"] = "";
    }
	userRegDetails = getRecords(data, consentOptInArray);

    data.headers["x-id-token"] = getCookie("jwtToken");
    console.log(getLocalStorage('userInfo'));
    data.body = userRegDetails;
    return data;

    }


function onBeforeConsentRequest() {
    showLoading();

}

function onSuccessConsentRequest(data) {

    if(data.errorCode == 0) {
        hideApiError();
		console.log(data);
        hideLoading();
		window.location.reload();

    } else {
        onErrorConsentRequest(data);
    }
    $("#subscribetoall").attr("disabled", false);
    $("#savechanges").attr("disabled", false);
}

function onErrorConsentRequest(error) {

    showApiError(error?.response);

    hideLoading();
    $("#subscribetoall").attr("disabled", false);
    $("#savechanges").attr("disabled", false);
}

function getDayName(day)
{
	switch (day) {
        case "M":
            return "Monday";
        case "T":
          return "Tuesday";
        case "W":
          return "Wednesday";
        case "TH":
          return "Thursday";
        case "F":
          return "Friday";
        default:
          return("");
  }

}

function updateSubscribeAllRequest(data)
{
    let consentOptInArray = {};
    let userRegDetails;

    let checkboxdatafinder = $('#socialmediareach-options').find('.a-checkbox');
    let checkboxdInputs = ($(checkboxdatafinder).find('.a-checkbox__input'));
    let key = "";
    let value = false;
	for(let i of checkboxdInputs)
    {
        key = $(i).val();
        value = true ;
        consentOptInArray[key] = value;
    }

     if ($("#marketingsocialmediareach-options").length) {
        let checkboxdatafinderMR = $('#marketingsocialmediareach-options').find('.a-checkbox');
        let checkboxdInputsMR = ($(checkboxdatafinderMR).find('.a-checkbox__input'));
        for(let i of checkboxdInputsMR)
        {
            key = $(i).val();
            value = true;
            consentOptInArray[key] = value;
        }
    }
    if ($("#educationconsent-options").length) {
        let checkboxdatafinderMed = $('#educationconsent-options').find('.a-checkbox');
        let checkboxdInputsMed = ($(checkboxdatafinderMed).find('.a-checkbox__input'));
        for(let i of checkboxdInputsMed)
        {
            key = $(i).val();
            value = true ;
            consentOptInArray[key] = value;
        }
    }
    let isOptConsent = true;
    if(consentOptInArray["phoneOptIn"] == isOptConsent)
    {
        let preferedtimeline =  $('#preferedtimelines-options').find('.a-checkbox');
        let preferedtimelineInput = ($(preferedtimeline).find('.a-checkbox__input'));
        let preferredTimeStr = "";
        for(let i of preferedtimelineInput)
        {
                preferredTimeStr += $(i).val() + ";";
        }
        consentOptInArray["preferredTime"] = preferredTimeStr.substring(0,preferredTimeStr.length-1);

    
        let days = $(".a-badges").find('.a-badges--text');
        let preferredDays = "";
    
        $(days).each(function() {
                let dayCode  = $(this).text().trim();
                let dayName = getDayName(dayCode.toUpperCase());
                preferredDays += dayName + ";"
    
        });
        consentOptInArray["preferredDays"] = preferredDays.substring(0,preferredDays.length-1);
    }

	consentOptInArray["generalConsentStatus"] = "completed";
        consentOptInArray["generalConsenSigned"] = date.toISOString();
        consentOptInArray["generalConsentRevoked"] = "";
    consentOptInArray["medicalConsentStatus"] = "completed";
        consentOptInArray["medicalConsentSigned"] = date.toISOString();
        consentOptInArray["medicalConsentRevoked"] = "";
    consentOptInArray["marketingConsentStatus"] = "completed";
        consentOptInArray["marketingConsentSigned"] = date.toISOString();
        consentOptInArray["marketingConsentRevoked"] = "";
    userRegDetails = getRecords(data, consentOptInArray);

    data.headers["x-id-token"] = getCookie("jwtToken");
    data.body = userRegDetails;
    return data;
}

function onSuccessSubscribeAllRequest(data) {

    if(data.errorCode == 0) {
        hideApiError();
		console.log(data);
        hideLoading();
		window.location.reload();

    } else {
        onErrorConsentRequest(data);
    }
    $("#subscribetoall").attr("disabled", false);
    $("#savechanges").attr("disabled", false);

    	let checkboxdatafinder = $('#socialmediareach-options').find('.a-checkbox');
        let checkboxdInputs = ($(checkboxdatafinder).find('.a-checkbox__input'));
        for(let i of checkboxdInputs)
        {
            $(i).prop("checked", true);
        }
    	let checkboxdatafinderMR = $('#marketingsocialmediareach-options').find('.a-checkbox');
        let checkboxdInputsMR = ($(checkboxdatafinderMR).find('.a-checkbox__input'));
        for(let i of checkboxdInputsMR)
        {
            $(i).prop("checked", true);        
        }
        let checkboxdatafinderMed = $('#educationconsent-options').find('.a-checkbox');
        let checkboxdInputsMed = ($(checkboxdatafinderMed).find('.a-checkbox__input'));
        for(let i of checkboxdInputsMed)
        {
            $(i).prop("checked", true);
        }
		let preferedtimelineInput =  $('#preferedtimelines-options .a-checkbox').find('.a-checkbox__input');
    	for(let i of preferedtimelineInput) {                    	
             $(i).prop('checked',true);
        }

    	let days = $(".a-badges");    
        $(days).each(function() {
                $(this).css('background-color' ,'#002A3A');
               $(this).find('.a-badges--text').css( 'color' ,'#FFFFFF');
                $(this).find('.a-badges--text').addClass('checked');   
        });
    $("#preferredtimedata").show();
}


function getRecords(data, consentOptInArray)
{
	let json = localStorage.getItem("userProfile");
    let jsonArray = JSON.parse(json);
    let responseProfile=jsonArray.userInfo.additionalProperties;
    let generalConsentId = (responseProfile.primaryConsent.id).slice(0, -3);
    let marketingConsentId= (responseProfile.primarymarketingconsent.id).slice(0, -3);
	let userRegDetails = "";
		if(data.headers['x-country-code'] == "IN" || data.headers['x-country-code'] == "TH")
        {
                userRegDetails = {
                    "userInfo": {
                        "records": [
                            {
                                "id":generalConsentId,
                                "emailOptIn": consentOptInArray["emailOptIn"],
                                "messagingOptIn": consentOptInArray["messagingOptIn"],
                                "phoneOptIn": consentOptInArray["phoneOptIn"],
                                "SMSOptIn": consentOptInArray["SMSOptIn"],
                                "remoteOptIn":consentOptInArray["remoteOptIn"],
                                "consentSigned": consentOptInArray["generalConsenSigned"],
                                "consentRevoked": consentOptInArray["generalConsentRevoked"],
                                "consentStatus": consentOptInArray["generalConsentStatus"],
                                "preferredTime": consentOptInArray["preferredTime"],
                                "preferredDay": consentOptInArray["preferredDays"]
                            },
                            {
                                "id":marketingConsentId,
                                "emailOptIn": consentOptInArray["emailOptIn"],
                                "messagingOptIn": consentOptInArray["messagingOptIn"],
                                "phoneOptIn": consentOptInArray["phoneOptIn"],
                                "SMSOptIn": consentOptInArray["SMSOptIn"],
                                "remoteOptIn":consentOptInArray["remoteOptIn"],
                                "consentSigned": consentOptInArray["generalConsenSigned"],
                                "consentRevoked": consentOptInArray["generalConsentRevoked"],
                                "consentStatus": consentOptInArray["generalConsentStatus"]
                            }
                        ]
                    }
                }
        }

    	if(data.headers['x-country-code'] == "UK")
        {
			let medicalConsentId = (responseProfile.primaryMedicalConsent.id).slice(0, -3);		 
                userRegDetails = {
                    "userInfo": {
                        "records": [
                            {
                                "id":generalConsentId,
                                "emailOptIn": consentOptInArray["emailOptIn"],
                                "messagingOptIn": consentOptInArray["messagingOptIn"],
                                "phoneOptIn":consentOptInArray["phoneOptIn"],
                                "SMSOptIn": consentOptInArray["SMSOptIn"],
                                "remoteOptIn":consentOptInArray["remoteOptIn"],
                                "webinarsOptIn": consentOptInArray["webinarsOptIn"],
                                "F2FOptIn": consentOptInArray["F2FOptIn"],
                                "consentSigned": consentOptInArray["generalConsenSigned"],
                                "consentRevoked": consentOptInArray["generalConsentRevoked"],
                                "consentStatus": consentOptInArray["generalConsentStatus"],
                                "preferredTime": consentOptInArray["preferredTime"],
                                "preferredDay": consentOptInArray["preferredDays"]

                            },
                            {
                                "id":medicalConsentId,
                                "emailOptIn": consentOptInArray["emailOptInMed"],
                                "phoneOptIn": consentOptInArray["phoneOptInMed"],
                                "SMSOptIn": consentOptInArray["SMSOptInMed"],
                                "consentSigned": consentOptInArray["medicalConsentSigned"],
                                "consentRevoked": consentOptInArray["medicalConsentRevoked"],
                                "consentStatus": consentOptInArray["medicalConsentStatus"]
                            },
                            {
                                "id":marketingConsentId,
                                "emailOptIn": consentOptInArray["emailOptInMr"],
                                "phoneOptIn": consentOptInArray["phoneOptInMr"],
                                "SMSOptIn": consentOptInArray["SMSOptInMr"],
                                "consentSigned": consentOptInArray["marketingConsentSigned"],
                                "consentRevoked": consentOptInArray["marketingConsentRevoked"],
                                "consentStatus": consentOptInArray["marketingConsentStatus"]
                            }
                        ]
                    }
       	 	}
        }
	return userRegDetails;
}