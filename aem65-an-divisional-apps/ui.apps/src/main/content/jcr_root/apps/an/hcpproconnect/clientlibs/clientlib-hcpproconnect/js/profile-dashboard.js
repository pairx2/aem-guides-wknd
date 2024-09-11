if(url.indexOf("profile-overview") >= 0 ){
    let  mobileOverviewTitle = $("#overviewTitle h2").text() ? $("#overviewTitle h2").text() : $("#consent-title h2").text();
   $("#profileoverview").children(":first").prepend("<div id='mobile-overview-title'><h2><strong>"+  mobileOverviewTitle+"</strong></h2></div>")
    let sitesearchAPI = $('#headerSearchSuggestApi').attr('data-api');
    let domainName = sitesearchAPI.split('api')[0];
    let profileApi = "api/private/profile/profile-info";
    let fetchProfile = domainName.concat(profileApi);

    const idToken = getCookie('jwtToken');

    let proHeaders = new Headers();
    proHeaders.append("x-application-id", $("input[name=x-application-id]").val());
    proHeaders.append("x-country-code", $("input[name=x-country-code]").val());
    proHeaders.append("x-preferred-language", $("input[name=x-preferred-language]").val());
    proHeaders.append("x-id-token", idToken);

    let requestOptions = {
        method: 'GET',
        headers: proHeaders,
        redirect: 'follow'
    };

    $("#preferredtimedata").hide();

    
    showLoading();

    function callorderslist(profileDashboardIndex,profileResult){
        if(url.substring(profileDashboardIndex + 1).includes('profile-overview')){
            let userInfo = JSON.parse(localStorage.getItem("userInfo"));

            let hcpIDProfileDashboard = userInfo.sfdcId;
            let organizationName = profileResult.userInfo.additionalProperties.orgNameText;
            let orderApiUrl = $("#orders-api-url").val();
            let orderSiteSearchAPI = $('#headerSearchSuggestApi').attr('data-api');
            domainName = orderSiteSearchAPI.split('api')[0];
            let ordersAPI = domainName.concat(orderApiUrl.substring(1));
            callMyOrders(ordersAPI,hcpIDProfileDashboard,organizationName,3)
        }
    }
    function usernameUK(country,jsonArray){
        if(country.toLowerCase() == "uk") {
            $("#userName").text(jsonArray.userInfo.title + " " + jsonArray.userInfo.firstName + " " + jsonArray.userInfo.lastName);
        }
    }
    function setconsentdateTH(country,newconsentDate,consentRevokedDate){
        if(country == "TH")

            {

            let thMonth = newconsentDate.getMonth();
            let getTHMonths = thMonth+1;
            let revokeTHMonth = consentRevokedDate.getMonth();
            let getRevokeTHMonths = revokeTHMonth+1;
            let getTHDates = newconsentDate.getDate();
        if (getTHDates < 10){
            getTHDates = '0'+getTHDates;
        }

        let getTHYears = newconsentDate.getFullYear();
        let getTHRevokeDates = consentRevokedDate.getDate();
        if (getTHRevokeDates < 10){
            getTHRevokeDates = '0'+getTHRevokeDates;
        }

        let getTHRevokeYears = consentRevokedDate.getFullYear();
        

            let thFullDate = getTHMonths +'/'+ getTHDates +'/' + getTHYears;
            let thFullRevokedDate = getRevokeTHMonths +'/'+ getTHRevokeDates +'/' + getTHRevokeYears;
            $("#thconsentdate").text(thFullDate);
        
            $("#thconsentrevokeddate").text(thFullRevokedDate);

        } 
    }
    function fnConsentexpiry(generalConsent,FullExpiryDate){
        if(generalConsent.hasOwnProperty("consentExpiry")){  

            $("#consentexpirydate").text(FullExpiryDate);
                }

            else{
                $("#consentexpirydate").hide();       
                }
    }
    
    function setConsentfulldate(newconsentDate){
        let month = newconsentDate.getMonth();
            let getMonths = month+1;
            if (getMonths < 10){
                getMonths = '0'+getMonths;
             }

            let getDates = newconsentDate.getDate();
             if (getDates < 10){
                getDates = '0'+getDates;
            }

            let getYears = newconsentDate.getFullYear();

            let FullDate =  getDates +'/'+ getMonths +'/' + getYears;

            $("#consentdate").text(FullDate);
    }

    function setconsentdate(country,generalConsent){

        let consentDate = generalConsent.consentSigned;
        let newconsentDate = new Date(consentDate);
        let consentExpiryDate = generalConsent.consentExpiry;
        let newconsentExpiryDate = new Date(consentExpiryDate);
        let consentRevokedDate= new Date();
        if( country != "TH"){
            setConsentfulldate(newconsentDate);

            let expireMonth = newconsentExpiryDate.getMonth();
            let getExpiryMonths = expireMonth+1;
            if (getExpiryMonths < 10){
                getExpiryMonths = '0'+getExpiryMonths;
            }

            let getExpireDates = newconsentExpiryDate.getDate();
            if (getExpireDates < 10){
                getExpireDates = '0'+getExpireDates;
            }

            let getExpiryYears = newconsentExpiryDate.getFullYear();
            let FullExpiryDate =  getExpireDates +'/'+ getExpiryMonths +'/' + getExpiryYears;

            fnConsentexpiry(generalConsent,FullExpiryDate);

            let revokeMonth = consentRevokedDate.getMonth();
            let getRevokeMonths = revokeMonth+1;
            if (getRevokeMonths < 10){
                getRevokeMonths = '0'+getRevokeMonths;
            }

            let getRevokeDates = consentRevokedDate.getDate();
            if (getRevokeDates < 10){
                getRevokeDates = '0'+getRevokeDates;
            }

            let getRevokeYears = consentRevokedDate.getFullYear();
            let FullRevokeDate =  getRevokeDates +'/'+ getRevokeMonths +'/' + getRevokeYears;
            $("#consentrevokeddate").text(FullRevokeDate);

            }
            
            setconsentdateTH(country,newconsentDate,consentRevokedDate);            
                                       				
    }

    function checktrueconsentUpdate(isGeneralCheck,generalConsent){
        let trueConsents = [];
        let checkConsents = [];
        let checkPreferedDay = [];

        if (generalConsent.phoneOptIn == isGeneralCheck){
            trueConsents.push("Phone");
            checkConsents.push("phoneOptIn");
            checkPreferedDay.push("M");
            checkPreferedDay.push("T");
            checkPreferedDay.push("W");
            checkPreferedDay.push("TH");
            checkPreferedDay.push("F");
        }

        if (generalConsent.remoteOptIn == isGeneralCheck){
            trueConsents.push("Remote visit");
            checkConsents.push("remoteOptIn");
        }

        if (generalConsent.F2FOptIn == isGeneralCheck){
            trueConsents.push("F2F visit");
            checkConsents.push("F2FOptIn");
        }

        if (generalConsent.messagingOptIn == isGeneralCheck){
            trueConsents.push("Messaging app");
            checkConsents.push("messagingOptIn");
        }

        if (generalConsent.webinarsOptIn == isGeneralCheck){
            trueConsents.push("Webinars");
            checkConsents.push("webinarsOptIn");
        }

        if (generalConsent.emailOptIn == isGeneralCheck){
            trueConsents.push("Primary email");
            checkConsents.push("emailOptIn");
        }

        if (generalConsent.SMSOptIn == isGeneralCheck){
            trueConsents.push("SMS")
            checkConsents.push("SMSOptIn");
        }

        return {trueConsents:trueConsents,checkConsents:checkConsents,checkPreferedDay:checkPreferedDay};
    }

    function trueconsentcheck(country,trueConsents){
        if(country == "UK"){
            $("#socialmediatext").append(`<p class = "socialtext">${trueConsents}</p>`);
        }

        if(country == "IN" || country == "TH")
        {
            $("#accordiangeneralcontainer").find(".m-accordion__title-wrapper").append(`<p class = "socialtext">${trueConsents}</p>`)
        }

    }

    function prefereddaystyle(generalConsent,checkPreferedDay){
        let prday = generalConsent.preferredDay;
        let dayarray = prday.split(";");
        let getdays = [];

        for( let m in dayarray)  {
            if (dayarray[m] !="Thursday"){
                getdays.push(dayarray[m].charAt(0));
            }

            else{
                getdays.push("TH")
            }
            }


        for(let i in checkPreferedDay) {
            let id =  '#'+checkPreferedDay[i] + 'container';

            for( let j in getdays){

                if(checkPreferedDay[i] == getdays[j]){
                    $(id).find('.a-badges').css('background-color' ,'#002A3A');
                    $(id).find('.a-badges--text').css( 'color' ,'#FFFFFF');
                    $(id).find('.a-badges--text').addClass('checked');
                }
            }
        }
    }

    function setGeneralconsent(trueConsents){
    if (trueConsents.length > 0) {
        let generalconsentsText =  trueConsents.join(", ");
        $("#generalconsents").text(generalconsentsText);
    }
    }

    function generalConsentRevokecheck(generalConsent){            
        if(generalConsent.hasOwnProperty("consentRevoked")){
            $("#generalconsents").text("No consents selected");
            $("#consentrevokeddate").show();
            $("#revdate").show();
            $("#sigdate").hide();
            $("#consentdate").hide();
            $("#thconsentdate").hide();					   
            $("#expdate").hide();
            $("#consentexpirydate").hide();
            $("#thconsentrevokeddate").show();
        }
        else{

            $("#consentrevokeddate").hide();
            $("#revdate").hide();
            $("#sigdate").show();
            $("#consentdate").show();
            $("#expdate").show();
            $("#consentexpirydate").show();
            $("#thconsentrevokeddate").hide();
            }
    }

    function checkConsentPhoneOpt(generalConsent,checkConsents,checkPreferedDay){
        let preferedtimeline =  $('#preferedtimelines-options').find('.a-checkbox');
        let preferedtimelineInput = ($(preferedtimeline).find('.a-checkbox__input'));
        let pftime = generalConsent.preferredTime;

        if(checkConsents.indexOf("phoneOptIn") > -1 ) {
        $("#preferredtimedata").show();
        for(let i of preferedtimelineInput) {
            let ptime = $(i).val();

            if(pftime.indexOf(ptime)>=0) {
                $(i).prop('checked',true);
            }
        }

        prefereddaystyle(generalConsent,checkPreferedDay);

        }
    }

    function socialmediaconsentcheck(trueConsents,checkConsents,checkPreferedDay,country,generalConsent){
        let key = "";
        if ($("#socialmediareach-options").length) {

            let generalcheckboxdatafinder = $('#socialmediareach-options').find('.a-checkbox');
            let generalcheckboxdInputs = ($(generalcheckboxdatafinder).find('.a-checkbox__input'));
            for(let i of generalcheckboxdInputs) {
                key = $(i).val();

                if(checkConsents.indexOf(key) >= 0) {
                $(i).prop('checked',true);
                }
            }

            checkConsentPhoneOpt(generalConsent,checkConsents,checkPreferedDay);
            
            trueconsentcheck(country,trueConsents);

        }
        
        setGeneralconsent(trueConsents);
        generalConsentRevokecheck(generalConsent);
    }

    function hideConsentOptin(generalConsent){
        let count = false;
        $.each(generalConsent, function (index, value) {
            if(index.includes("OptIn")){
                if(value){
                    count = true; 
                }
            }

        });

        if(!count){
            $("#sigdate").hide();
            $("#consentdate").hide();
            $("#thconsentdate").hide();
            $("#expdate").hide();
            $("#consentexpirydate").hide();
        }
    }
    
    function preferredDayTimeShow(generalConsent){
        hideConsentOptin(generalConsent);
				
        if(generalConsent.preferredDay != undefined){
            $("#preferredDay").text(generalConsent.preferredDay.replaceAll(";",", "));
        }

        if(generalConsent.preferredTime != undefined){
            $("#preferredTime").text(generalConsent.preferredTime.replaceAll(";",", "));
        }

        if(generalConsent.preferredDay == undefined && generalConsent.preferredTime == undefined){
            $("#preferredDay").text("No Time and Dates Selected");
            $("#preferredTime").hide();
        }
    }

    function checkConsentRevoked(generalConsent,marketingConsent,medicalConsent,isgeneralConsent){
        if(generalConsent.messagingOptIn == isgeneralConsent && generalConsent.virtualOptIn == isgeneralConsent && generalConsent.emailOptIn == isgeneralConsent && generalConsent.SMSOptIn == isgeneralConsent && generalConsent.phoneOptIn == isgeneralConsent && generalConsent.remoteOptIn == isgeneralConsent && generalConsent.F2FOptIn == isgeneralConsent && generalConsent.webinarsOptIn == isgeneralConsent){
            $("#generalconsents").text("No consents selected");
        }

        if(generalConsent.hasOwnProperty("consentRevoked") && marketingConsent.hasOwnProperty("consentRevoked") && medicalConsent.hasOwnProperty("consentRevoked") )
        {
         $("#consentrevokeddate").show();
         $("#revdate").show();
         $("#sigdate").hide();
        $("#consentdate").hide();
        $("#expdate").hide();
        $("#consentexpirydate").hide();
          }
        else{
        $("#consentrevokeddate").hide();
        $("#revdate").hide();
        $("#sigdate").show();
        $("#consentdate").show();
        $("#expdate").show();
        $("#consentexpirydate").show();
        }
        
        hideConsentOptin(generalConsent)
    }

    function updateMarketingsocialmedia(checkMarketingConsents,trueMarketingConsents){
        if ($("#marketingsocialmediareach-options").length) {
            let checkboxdatafinderMR = $('#marketingsocialmediareach-options').find('.a-checkbox');
            let checkboxdInputsMR = ($(checkboxdatafinderMR).find('.a-checkbox__input'));

            for(let i of checkboxdInputsMR) {
                let markey = $(i).val();

                if(checkMarketingConsents.indexOf(markey)>= 0) {
                    $(i).prop('checked',true);
                }
            }

            $("#marketingsocialmediatext").append(`<p class = "marketingsocialdatacontainer">${trueMarketingConsents}</p>`);

        }
    }

    function updateMarketingconsent(marketingConsent,isGeneralCheck,isgeneralConsent){
        let trueMarketingConsents = [];
        let checkMarketingConsents = [];
        if (marketingConsent.phoneOptIn == isGeneralCheck) {
            trueMarketingConsents.push("Phone");
            checkMarketingConsents.push("phoneOptInMr");
        }

        if (marketingConsent.emailOptIn == isGeneralCheck) {
            trueMarketingConsents.push("Primary Email");
            checkMarketingConsents.push("emailOptInMr");
        }

        updateMarketingsocialmedia(checkMarketingConsents,trueMarketingConsents);
        
        if (trueMarketingConsents.length > 0) {
            let marketingconsentsText =  trueMarketingConsents.join(", ");
            $("#marketingconsents").text(marketingconsentsText);
        }

        if (marketingConsent.phoneOptIn == isgeneralConsent && marketingConsent.emailOptIn == isgeneralConsent){
            $("#marketingconsents").text("No consents selected");
        }
    }

    function updateEducationalsocialmedia(checkMedicalConsents,trueMedicalConsents){
        if ($("#educationconsent-options").length) {

            let checkboxdatafinderMed = $('#educationconsent-options').find('.a-checkbox');
            let checkboxdInputsMed = ($(checkboxdatafinderMed).find('.a-checkbox__input'));
    
            for(let i of checkboxdInputsMed) {
                let  medkey = $(i).val();
                if(checkMedicalConsents.indexOf(medkey)>=0) {
                    $(i).prop('checked',true);
                }
            }
    
            $("#educationalsocialmediatext").append(`<p class = "educationalsocialdatacontainer">${trueMedicalConsents}</p>`);
            }
    }

    function updateMedicalconsent(medicalConsent,isGeneralCheck,isgeneralConsent){
        let trueMedicalConsents = [];
        let checkMedicalConsents =[];
        if (medicalConsent.phoneOptIn == isGeneralCheck) {
            trueMedicalConsents.push("Phone");
            checkMedicalConsents.push("phoneOptInMed");
        }

        if (medicalConsent.emailOptIn == isGeneralCheck) {
            trueMedicalConsents.push("Primary Email");
            checkMedicalConsents.push("emailOptInMed");
        }

        updateEducationalsocialmedia(checkMedicalConsents,trueMedicalConsents);
        
        if (trueMedicalConsents.length > 0) {
            let medicalconsentsText =   trueMedicalConsents.join(", ");
            $("#medicalconsents").text(medicalconsentsText);
        }

        if (medicalConsent.phoneOptIn == isgeneralConsent && medicalConsent.emailOptIn == isgeneralConsent){
            $("#medicalconsents").text("No consents selected");
        }
            
    }
    fetch(fetchProfile, requestOptions)
        .then(response => response.text())
        .then(function (result) {
            if(result){

                let jsonResult = JSON.parse(result);
				let profileResult = jsonResult.response;
				localStorage.setItem("userProfile", JSON.stringify(profileResult));

                let profileDashboardIndex = url.lastIndexOf("/");
                // envoke only on profile overview
                callorderslist(profileDashboardIndex,profileResult);
                
                hideLoading();

				let json = localStorage.getItem("userProfile");
                let jsonArray = JSON.parse(json);
                let responseProfile=jsonArray.userInfo.additionalProperties;

                //populate HCP details on profile dashboard
                let country = $("input[name=x-country-code]").val();
                $("#userName").text(jsonArray.userInfo.title + " " + jsonArray.userInfo.lastName + " " + jsonArray.userInfo.firstName);
                usernameUK(country,jsonArray);

                $("#phone").text(responseProfile.phone);
                $("#email").text(jsonArray.userInfo.email);
                $("#licenseID").text(responseProfile.licenseID);
                $("#orgName").text(responseProfile.orgName.Name);
                $("#address").text(responseProfile.billingStreet + ", " + responseProfile.billingCity + ", " + responseProfile.billingState + " " + responseProfile.Postcode);
                $("#role").text(responseProfile.role);
                $("#areaOfInterest").text(responseProfile.areaOfSpecialty);

                //consent details on profile dashboard

                let generalConsent = responseProfile.primaryConsent;
                let marketingConsent= responseProfile.primarymarketingconsent;
                let medicalConsent = responseProfile.primaryMedicalConsent;
                
                setconsentdate(country,generalConsent);

                //populate general consent details on profile dashboard
                let isGeneralCheck  = true;
                let {trueConsents,checkConsents,checkPreferedDay} = checktrueconsentUpdate(isGeneralCheck,generalConsent);
                
                if(generalConsent.virtualOptIn == isGeneralCheck){
                    trueConsents.push("Virtual Meeting");
                    checkConsents.push("virtualOptIn");
                }

                socialmediaconsentcheck(trueConsents,checkConsents,checkPreferedDay,country,generalConsent);

                preferredDayTimeShow(generalConsent);

                let isgeneralConsent = false;
                //populate marketing and medical consent details on profile dashboard
                if(country == "UK"){
                    checkConsentRevoked(generalConsent,marketingConsent,medicalConsent,isgeneralConsent);
                    updateMarketingconsent(marketingConsent,isGeneralCheck,isgeneralConsent);
                    updateMedicalconsent(medicalConsent,isGeneralCheck,isgeneralConsent);

                }

            }
        })

    	.catch(error => console.log('error', error));

}
$("#updateProfileForm").find(".form-control.a-input-control:read-only")
.mouseover(function() {
    let tooltipText = $(this).parent().siblings()
                        .find('.a-tooltilp__wrapper')
                        .attr('data-original-title');

    createDisabledCustomTooltip($(this), tooltipText);
})
.mouseout(function() {
    $('.disabled-custom-tooltip').remove();
});

$("#updateProfileForm").find(".a-dropdown__field.disabled")
.mouseover(function() {
    let tooltipText = $(this).siblings()
                        .find('.a-tooltilp__wrapper')
                        .attr('data-original-title');
    createDisabledCustomTooltip($(this), tooltipText);
})
.mouseout(function() {
    $('.disabled-custom-tooltip').remove();
})
.click(function(e){
    e.stopPropagation();
});

function createDisabledCustomTooltip(element, text) {
    $('.disabled-custom-tooltip').remove();
    let elemTooltip = $(`<div class='disabled-custom-tooltip'></div>`);

    if(text) {
       elemTooltip.append($.parseHTML(text));
       elemTooltip.find('p:empty').remove();
       elemTooltip.find('h5:empty').remove();
       elemTooltip.insertAfter(element);
    }
}


