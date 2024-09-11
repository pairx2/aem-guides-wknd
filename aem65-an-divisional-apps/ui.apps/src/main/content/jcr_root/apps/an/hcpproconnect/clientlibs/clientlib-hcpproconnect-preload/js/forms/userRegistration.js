/** User Registration -- starts**/

$(document).ready(function() {
    keyUpPassword();
});

function keyUpPassword() {
    $('.a-input-password-strength').find(".form-text.a-input-field--text-regex").attr("id", "toBeRemoved");
    $('.a-input-password-strength').find(".form-text.a-input-field--text-regex").after('</div>');
    $('.a-input-password-strength').find(".form-text.a-input-field--text-regex").after('<span class="form-text "><div id="specialCharId" class="error-holder  invalid"><div class="error-title">Any</div><div class="error-body"> Special characters (Example @#$"; etc)</div></div></span>');
    $('.a-input-password-strength').find(".form-text.a-input-field--text-regex").after('<span class="form-text "><div id="numberId" class="error-holder  invalid"><div class="error-title">0-9</div><div class="error-body">  Numeric digits</div></div></span>');
    $('.a-input-password-strength').find(".form-text.a-input-field--text-regex").after('<span class="form-text "><div id="lowerCaseLettersId" class="error-holder invalid"><div class="error-title">a-Z</div><div class="error-body"> Upper and lowercase letters</div></div></span>');
    $('.a-input-password-strength').find(".form-text.a-input-field--text-regex").after('<span class="form-text "><div id="charLimitId" class="error-holder invalid"><div class="error-title">8</div><div class="error-body"> At least 8 characters</div></div></span>');
    $('.a-input-password-strength').find(".form-text.a-input-field--text-regex").after('<span class="form-text "><div id="errorMessage"><div><b>Create a strong password using the below criteria and ensure the green bar is fully shown :</b></div></div></span>');
    $('.a-input-password-strength').find(".form-text.a-input-field--text-regex").after('<div id="errorContainer" class="errorContainerHidden">');

    $('#toBeRemoved').remove();

    $("#charLimitId").show();
    $("#numberId").show();
    $("#specialCharId").show();
    $("#lowerCaseLettersId").show();
    $("#password, #dynaFormPassword,#resetPasswordPassword").keyup(function(){
         let $field = $(this);
         let myInput;
         let beforeVal = $field.val();
         setTimeout(function() {
         }, 0);
        myInput = beforeVal;
        let lowerCaseLetters = /[a-z]/g;
        let upperCaseLetters = /[A-Z]/g;

        if(myInput.match(lowerCaseLetters) && myInput.match(upperCaseLetters)) {
            $("#lowerCaseLettersId").removeClass("invalid");
            $("#lowerCaseLettersId").addClass("valid");
        } else {
            $("#lowerCaseLettersId").removeClass("valid");
            $("#lowerCaseLettersId").addClass("invalid");
        }

        // Validate special character
        let specialChar = /[!@#$%^&*(){}[\]~`_+=<>,.?:";\\|'-]/;
        if(myInput.match(specialChar)) {
            $("#specialCharId").removeClass("invalid");
            $("#specialCharId").addClass("valid");
        } else {
            $("#specialCharId").removeClass("valid");
            $("#specialCharId").addClass("invalid");
        }

        // Validate numbers
        let numbers = /\d/g;
        if(myInput.match(numbers)) {
            $("#numberId").removeClass("invalid");
            $("#numberId").addClass("valid");
        } else {
            $("#numberId").removeClass("valid");
            $("#numberId").addClass("invalid");
        }

        // Validate length
        if(myInput.length >= 8) {
            $("#charLimitId").removeClass("invalid");
            $("#charLimitId").addClass("valid");
        } else {
            $("#charLimitId").removeClass("valid");
            $("#charLimitId").addClass("invalid");
        }

     });
}

function availableConsentsUpdateUK(jsonArray,consentTopics,availableConsents,isTrue,isFalse){
    let generalConsentId = "";
    let marketingConsent = "";
    let medicalConsent = "";
    if(jsonArray.userInfo.additionalProperties.consentTopic!=null){
        consentTopics = jsonArray.userInfo.additionalProperties.consentTopic;
        $.each(consentTopics, function(key,value) {
              if(consentTopics[key].marketingConsent == isFalse && consentTopics[key].medicalConsent == isTrue){
                medicalConsent = consentTopics[key].id;
              }
                else if(consentTopics[key].marketingConsent == isTrue && consentTopics[key].medicalConsent == isFalse){
                    marketingConsent = consentTopics[key].id;
                }
                else
                {
                    generalConsentId = consentTopics[key].id;
                }
         });
        availableConsents["primaryMedicalConsentReference"] = medicalConsent;
        availableConsents["primaryConsentReference"] = generalConsentId ;
        availableConsents["primaryMarketingConsentReference"] =marketingConsent;
    }
   else{

    availableConsents["primaryMedicalConsentReference"] = jsonArray.userInfo.additionalProperties.primaryMedicalConsentReference;
    availableConsents["primaryConsentReference"] = jsonArray.userInfo.additionalProperties.primaryConsentReference ;
    availableConsents["primaryMarketingConsentReference"] = jsonArray.userInfo.additionalProperties.primaryMarketingConsentReference;

   }
   return availableConsents;
}
function primaryConsentReferenceCheckUK(i,recordsUK){
    if(i=="primaryConsentReference"){
        recordsUK[i]["webinarsOptIn"]= true;
        recordsUK[i]["messagingOptIn"]= true;
        recordsUK[i]["SMSOptIn"]= true;
        recordsUK[i]["remoteOptIn"]= true;
        recordsUK[i]["F2FOptIn"]= true;
        recordsUK[i]["preferredTime"]="8:00-10:00;10:00-12:00;12:00-14:00;14:00-16:00;16:00-18:00";
       recordsUK[i]["preferredDay"]="Monday;Tuesday;Wednesday;Thursday;Friday";
   }
   return recordsUK;
}
function availableConsentsUpdateIN(jsonArray,consentTopics,availableConsents,isFalse){
    let generalConsentId = "";
    let marketingConsent = "";
    if(jsonArray.userInfo.additionalProperties.consentTopic!=null){
        consentTopics = jsonArray.userInfo.additionalProperties.consentTopic;
        $.each(consentTopics, function(key,value) {
          if(consentTopics[key].marketingConsent == isFalse ){
            generalConsentId = consentTopics[key].id;
          }
            else{
                marketingConsent = consentTopics[key].id;
            }
        });
        availableConsents["primaryConsentReference"] = generalConsentId ;
        availableConsents["primaryMarketingConsentReference"] =marketingConsent;
    }
   else{
   availableConsents["primaryConsentReference"] = jsonArray.userInfo.additionalProperties.primaryConsentReference ;
    availableConsents["primaryMarketingConsentReference"] = jsonArray.userInfo.additionalProperties.primaryMarketingConsentReference;
   }
   return availableConsents;
}
function primaryConsentReferenceCheckIN(j,recordsIN){
    if(j=="primaryConsentReference"){
        recordsIN[j][ "phoneOptIn"]= true;
        recordsIN[j]["remoteOptIn"]=true;
        recordsIN[j]["preferredTime"]="8:00-10:00;10:00-12:00;12:00-14:00;14:00-16:00;16:00-18:00";
        recordsIN[j]["preferredDay"]="Monday;Tuesday;Wednesday;Thursday;Friday";
    }
    return recordsIN;
}
function availableConsentsUpdateTH(jsonArray,availableConsents,consentTopics,isFalse){
    let generalConsentId = "";
    let marketingConsent = "";
    if(jsonArray.userInfo.additionalProperties.consentTopic!=null){
        consentTopics = jsonArray.userInfo.additionalProperties.consentTopic;
        $.each(consentTopics, function(key,value) {
          if(consentTopics[key].marketingConsent == isFalse ){
            generalConsentId = consentTopics[key].id;
          }
            else{
                marketingConsent = consentTopics[key].id;
            }
        });
        
        availableConsents["primaryMarketingConsentReference"] =marketingConsent;
        availableConsents["primaryConsentReference"] = generalConsentId ;
    }
   else{
    availableConsents["primaryConsentReference"] = jsonArray.userInfo.additionalProperties.primaryConsentReference ;
    availableConsents["primaryMarketingConsentReference"] = jsonArray.userInfo.additionalProperties.primaryMarketingConsentReference;
   } 
   return availableConsents;
}
function primaryConsentReferenceCheckTH(k,recordsTH){
    if(k=="primaryConsentReference"){
        recordsTH[k][ "phoneOptIn"]= true;
       recordsTH[k]["remoteOptIn"]=true;
         recordsTH[k]["preferredTime"]="8:00-10:00;10:00-12:00;12:00-14:00;14:00-16:00;16:00-18:00";
        recordsTH[k]["preferredDay"]="Monday;Tuesday;Wednesday;Thursday;Friday";
    }
    return recordsTH;
}

function ifConsentStatus(countryCode,records,recordsIN,recordsTH,recordsUK){
    if(countryCode.indexOf("UK")>=0){
        records.push(
        recordsUK["primaryConsentReference"],
        recordsUK["primaryMedicalConsentReference"],
        recordsUK["primaryMarketingConsentReference"]
        );
    }
    if(countryCode.indexOf("IN")>=0 ){
        records.push(
        recordsIN["primaryConsentReference"],
        recordsIN["primaryMarketingConsentReference"]
        );
    }
    else if(countryCode.indexOf("TH")>=0 ){
        records.push(
        recordsTH["primaryConsentReference"],
        recordsTH["primaryMarketingConsentReference"]
        );
    }
    return records;
}

function recordsUpdate_country(records,recordsUK,recordsIN,recordsTH,recordsEmptyUK,recordsEmptyIN,recordsEmptyTH){
    
    let countryCode=regCountryCode;
    let consentStatus=$("#consent-options").find("input[name='Consent']").is(":checked");
    if (regAccessCode && regAccessCode != '') {
        

        if(consentStatus){
            
            records = ifConsentStatus(countryCode,records,recordsIN,recordsTH,recordsUK);
        }

        else{

            if(countryCode.indexOf("UK")>=0){
                records.push(
                recordsEmptyUK["primaryConsentReference"],
                recordsEmptyUK["primaryMedicalConsentReference"],
                recordsEmptyUK["primaryMarketingConsentReference"]
                    );
            }
            if(countryCode.indexOf("IN")>=0 ){
                records.push(
                recordsEmptyIN["primaryConsentReference"],
                recordsEmptyIN["primaryMarketingConsentReference"]
                );
            }
            else if(countryCode.indexOf("TH")>=0 ){
                records.push(
                    recordsEmptyTH["primaryConsentReference"],
                    recordsEmptyTH["primaryMarketingConsentReference"]
                );
            }
        }
    }
    return records;
}

function userRegdetailUpdate(countryCode,userRegDetails,jsonArray,data){
    if(countryCode.indexOf("IN")>=0 ) {
        userRegDetails.userInfo['licenseID'] = jsonArray.userInfo.additionalProperties.licenseID;	
        if (hasUrlParameter("clu=true"))
        {
            userRegDetails.userInfo['isNonHCPRegistration']=true;
        }
   
    }
    else if(countryCode.indexOf("TH")>=0){
        userRegDetails.userInfo['licenseID'] =  jsonArray.userInfo.additionalProperties.licenseID;
        let prefLang = "";
        if(data.body.preferredLanguage== undefined )
            prefLang = jsonArray.userInfo.preferredLanguage ;
        else
            prefLang = data.body.preferredLanguage
        userRegDetails.userInfo['preferredLanguage'] = prefLang;		
        if (hasUrlParameter("clu=true"))
        {
            userRegDetails.userInfo['isNonHCPRegistration']=true;
        }
    }
    else if(countryCode.indexOf("UK")>=0){
        userRegDetails.userInfo['role'] = jsonArray.userInfo.additionalProperties.role;
        if (hasUrlParameter("clu=true"))
        {
            userRegDetails.userInfo['isNonHCPRegistration']=true;
        }
    }
    return userRegDetails;
}

function recordsUK_update(alreadyPresentConsents,availableConsents){

    let recordsUK = {};
    let recordsEmptyUK = {};
    for (let i in availableConsents) {
        if(alreadyPresentConsents[i]!=null){
            recordsUK[i] = {
                "emailOptIn": true,
                "phoneOptIn": true,
                "consentSigned": date.toISOString(),
                "consentStatus": "Completed",
                "id": alreadyPresentConsents[i]

            }
            recordsEmptyUK[i] = {
                "emailOptIn": false,
                "messagingOptIn": false,
                "phoneOptIn": false,
                "consentSigned": date.toISOString(),
                "SMSOptIn": false,
                "remoteOptIn": false,
                "consentStatus": "Completed",
                "webinarsOptIn": false,
                "F2FOptIn": false,
                "id": alreadyPresentConsents[i]

            }

        }
        else{
            recordsUK[i] = {
                "emailOptIn": true,
                "phoneOptIn": true,
                "consentSigned": date.toISOString(),
                "consentStatus": "Completed",
                "contactId": regAccessCode,
                "consentTopicId": availableConsents[i]
            }
            recordsEmptyUK[i] = {
                "emailOptIn": false,
                "messagingOptIn": false,
                "phoneOptIn": false,
                "consentSigned": date.toISOString(),
                "SMSOptIn": false,
                "remoteOptIn": false,
                "consentStatus": "Completed",
                "webinarsOptIn": false,
                "F2FOptIn": false,
                "contactId": regAccessCode,
                "consentTopicId": availableConsents[i]
            }   

        }
        recordsUK = primaryConsentReferenceCheckUK(i,recordsUK);
        

    }
    return {recordsUK:recordsUK,recordsEmptyUK:recordsEmptyUK}
}

let regCountryCode;
let recordsUK_main;
let recordsEmptyUK_main;

function updateRequestCompleteRegistration(data) {

    let availableConsents = {};
    let alreadyPresentConsents={};
    
    let recordsIN = {};
    let recordsTH = {};
    
    let recordsEmptyTH = {};
    let recordsEmptyIN = {};

     
        let consentTopics = "";
        let isFalse =false;
        let isTrue = true;

    	let json = localStorage.getItem("prepop");
        let jsonArray = JSON.parse(json);
		let country = $("input[name=x-country-code]").val();
       if (country == "UK") {
           alreadyPresentConsents["primaryConsentReference"] = jsonArray.userInfo.additionalProperties.primaryConsentReference ;
            alreadyPresentConsents["primaryMarketingConsentReference"] = jsonArray.userInfo.additionalProperties.primaryMarketingConsentReference;
             alreadyPresentConsents["primaryMedicalConsentReference"] = jsonArray.userInfo.additionalProperties.primaryMedicalConsentReference;

             availableConsents = availableConsentsUpdateUK(jsonArray,consentTopics,availableConsents,isTrue,isFalse);
            
              let {recordsUK,recordsEmptyUK} = recordsUK_update(alreadyPresentConsents,availableConsents);
            
               recordsUK_main = recordsUK;
               recordsEmptyUK_main = recordsEmptyUK;

       }
        if (country == "IN") {
             alreadyPresentConsents["primaryConsentReference"] = jsonArray.userInfo.additionalProperties.primaryConsentReference ;
            alreadyPresentConsents["primaryMarketingConsentReference"] = jsonArray.userInfo.additionalProperties.primaryMarketingConsentReference;

            availableConsents = availableConsentsUpdateIN(jsonArray,consentTopics,availableConsents,isFalse); 

           for (let j in availableConsents) {
               if(alreadyPresentConsents[j]!=null){
                 recordsIN[j] = {
                    "emailOptIn": true,
                    "messagingOptIn": true,
                    "consentSigned": date.toISOString(),
                    "SMSOptIn": true,
                    "consentStatus": "Completed",
                   "id": alreadyPresentConsents[j]
                }
                 recordsEmptyIN[j] = {
                    "emailOptIn": false,
                    "messagingOptIn": false,
                    "consentStatus": "Completed",
                    "consentSigned": date.toISOString(),
                    "SMSOptIn": false,
                    "contactId": regAccessCode,
                    "id": alreadyPresentConsents[j]
                }

               }
               else{
               recordsIN[j] = {
                    "emailOptIn": true,
                    "messagingOptIn": true,
                    "consentSigned": date.toISOString(),
                    "SMSOptIn": true,
                    "consentStatus": "Completed",
                    "contactId": regAccessCode,
                    "consentTopicId": availableConsents[j]
                }
                 recordsEmptyIN[j] = {
                    "emailOptIn": false,
                    "messagingOptIn": false,
                    "consentStatus": "Completed",
                    "consentSigned": date.toISOString(),
                    "SMSOptIn": false,
                    "contactId": regAccessCode,
                    "consentTopicId": availableConsents[j]
                }

               }
               
                recordsIN = primaryConsentReferenceCheckIN(j,recordsIN);

            }
        }
        if (country == "TH") {
            alreadyPresentConsents["primaryConsentReference"] = jsonArray.userInfo.additionalProperties.primaryConsentReference ;
            alreadyPresentConsents["primaryMarketingConsentReference"] = jsonArray.userInfo.additionalProperties.primaryMarketingConsentReference;
          
            availableConsents = availableConsentsUpdateTH(jsonArray,availableConsents,consentTopics,isFalse);

            for (let k in availableConsents) {
               if(alreadyPresentConsents[k]!=null){
                  recordsTH[k] = {
                    "emailOptIn": true,
                    "messagingOptIn": true,
                    "consentSigned": date.toISOString(),
                    "SMSOptIn": true,
                    "consentStatus": "Completed",
                    "id": alreadyPresentConsents[k],
                }

                recordsEmptyTH[k] = {
                    "emailOptIn": false,
                    "messagingOptIn": false,
                    "phoneOptIn": false,
                    "consentSigned": date.toISOString(),
                    "SMSOptIn": false,
                    "consentStatus": "Completed",
                    "id": alreadyPresentConsents[k]

                }

               }
               else{
                recordsTH[k] = {
                    "emailOptIn": true,
                    "messagingOptIn": true,
                    "consentSigned": date.toISOString(),
                    "SMSOptIn": true,
                     "consentStatus": "Completed",
                    "contactId": regAccessCode,
                    "consentTopicId": availableConsents[k],
                }

                recordsEmptyTH[k] = {
                    "emailOptIn": false,
                    "messagingOptIn": false,
                    "phoneOptIn": false,
                    "consentSigned": date.toISOString(),
                    "SMSOptIn": false,
                    "consentStatus": "Completed",
                    "contactId": regAccessCode,
                    "consentTopicId": availableConsents[k]
                }


            }
                
                recordsTH = primaryConsentReferenceCheckTH(k,recordsTH);
           }

        }


    let countryCode=data.headers['x-country-code'];
    regCountryCode =countryCode;
    let records=[

    ];

    records = recordsUpdate_country(records,recordsUK_main,recordsIN,recordsTH,recordsEmptyUK_main,recordsEmptyIN,recordsEmptyTH);

    
        let userRegDetails =  {

            "userInfo": {
                "sfdcId":regAccessCode,
				"password": data.body.password,
				"email": data.body.email,
				"phone": jsonArray.userInfo.additionalProperties.phone,
				"title": jsonArray.userInfo.title,
				"firstName": jsonArray.userInfo.firstName,
				"lastName":jsonArray.userInfo.lastName,
				"Postcode": jsonArray.userInfo.additionalProperties.Postcode,
				"orgName":jsonArray.userInfo.additionalProperties.orgName.Id,
				"billingStreet" : jsonArray.userInfo.additionalProperties.billingStreet,
				"billingCity": jsonArray.userInfo.additionalProperties.billingCity,
				"billingState" : jsonArray.userInfo.additionalProperties.billingState,
				"country":jsonArray.userInfo.country,
				"areaOfInterest": data.body.areaOfInterest,
                "records":records
            }
        };



userRegDetails['captchaValue'] = data.body['g-recaptcha-response'];
localStorage.setItem('captchaValue',data.body['g-recaptcha-response']);
	
userRegDetails = userRegdetailUpdate(countryCode,userRegDetails,jsonArray,data);

    data.body = userRegDetails;

    return data;

}

function onBeforeUserRegistration() {
    showLoading();
}

function onSuccessUserRegistration(data) {
    if(data.errorCode == 0) {
		localStorage.setItem("comp_response",JSON.stringify(data));
        hideLoading();



    } else {
        onErrorUserRegistration(data);
    }
}

function onErrorUserRegistration(error) {
    if((error.response.statusReason).indexOf("already exists")>=0){

     $("#successErrorMessage").show();
     $("#successErrorMessage").css('display', 'flex').css('gap','20px');

		$("#successErrorMessage").css("background","#E40046");
        $('#successErrorMessage p').text(error.response.statusReason);
		$('#successErrorMessage').addClass("abt-icon abt-icon-cancel");
        $(".o-form-container__error-msg").css("display","none");

        $(".abt-icon-cancel").on("click", function(){
    		$('#successErrorMessage').hide();
        });
    }
    else{
		    showApiError(error?.response);

    }

    hideLoading();
}


/** User Registration -- ends**/