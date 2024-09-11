let prePopSfdcId_ = "";
let prePopOrgName_ = "";
let recordTypeId = hasUrlParameter("recordtypeid")?getUrlParameter("recordtypeid"):$("#mwa-record-type-id").val().trim();

$(document).ready(function() {
    if($("#bookAMeeting").length > 0) {
        let bookContactDate = '#bookMeetingDayOfContact';
         //address functionality:
         initAddressDropdown();
        disablePastDate(bookContactDate);

        initDropdownWithSearch('bookMeetingJobTitle');
        //populate field if user is login
        if(isUserLoggedIn()) {
            $("#bookMeetingTandC-options").hide();
            $('#bookMeetingTandC-options > .a-checkbox > .a-checkbox__label > .a-checkbox__input').prop("checked", true);
            callGetProfile();
        }

        $('#bookMeetingPhone').on('keyup', function() {
            let value = $(this).val();
            setTimeout(function() {}, 0);
            $(this).val($(this).attr("value") + value.substring(3));
        });

        $('#bookMeetingDayOfContact').click(function(e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).parent().find('.abt-icon-calendar').click();
        });
    }
});

/**
 ** Call userInfo details
**/
function callGetProfile() {
    showLoading();
    let userInfoDetails = localStorage.getItem('userInfo');
    if (userInfoDetails !== null && userInfoDetails !=='undefined') {
        let jsonArray = JSON.parse(userInfoDetails);
        prePopSfdcId_ = jsonArray.sfdcId;
    }
    let appId = $("input[name=x-application-id]").val();
    let countryCode = $("input[name=x-country-code]").val();
    let language = $("input[name=x-preferred-language]").val();
    let idToken = getCookie('jwtToken');
    let headers = new Headers();
    headers.append("x-application-id", appId);
    headers.append("x-country-code", countryCode);
    headers.append("x-preferred-language", language);
    headers.append("x-id-token", idToken);
    getProfileInfo(headers)
        .then(response => response.text())
        .then(function (result) {
            let data = JSON.parse(result);
            let userInfo = data?.response?.userInfo;

            if (userInfo) {
                populateMeetWithAbbott(userInfo);
            }

            hideLoading();
        });
}

/**
 ** Populate Fields
 ** userInfo - LoginUser details
**/
function populateMeetWithAbbott(userInfo) {
    $("#bookMeetingFirstName").val(userInfo.firstName);
    $("#bookMeetingLastName").val(userInfo.lastName);
    $("#bookMeetingEmail").val(userInfo.email);
    $("#bookMeetingPhone").val(userInfo.phone);

    $("#bookMeetingPhone").val(userInfo.additionalProperties.phone);
    $("#regPostcodeUk").val(userInfo.additionalProperties.Postcode);
    $("#registrationCity").val(userInfo.additionalProperties.billingCity);
    $("#registrationState").val(userInfo.additionalProperties.billingState);
    $("#registrationStreet").val(userInfo.additionalProperties.billingStreet);
    $("#regOrgNameTextUk").attr('value', userInfo.additionalProperties.orgName.Name);
    $("#dropdown_label_regOrgNameUk").text(userInfo.additionalProperties.orgName.Name);
    $("#dropdown_label_regOrgNameUk").removeClass("a-dropdown__placeholder").addClass("a-dropdown-selected");
    prePopOrgName_ = userInfo.additionalProperties.orgName.Id;


    //pre populate dropdown for jobid
    let jobID = "dropdown_label_bookMeetingJobTitle";
    dropdownPopulator(jobID, userInfo.additionalProperties.role);
}


function datailBook(data){
    if($("#x-contact-request-application-id").attr("data-key-name")) {
        data.headers['x-application-id'] = $("#x-contact-request-application-id").attr("data-key-name");
    }
    return data;
}
/** Book a meeting-- starts**/
function bookingDetails(data) {

	let country = "United Kingdom";
    let billingCity = $("#registrationCity").val();
    let billingState = $("#registrationState").val();
    let billingStreet = $("#registrationStreet").val();
    let orgNameText = data.body.orgNameText;
	let dayOfContact = data.body.dayOfContact;
	let startDate;
	let endDate;
    let startTime = 0;
    let endTime = 0;

    let dateParts = dayOfContact.split("/");
    let day = dateParts[0];
	let month = dateParts[1];
    let year = dateParts[2];

    let timeOfContactSize = parseInt(data.body.timeOfContact.length);
    let contactTime;
    let index;
    let orgName = data.body.orgName ? data.body.orgName : prePopOrgName;
    let sfdcId = prePopSfdcId_ ? prePopSfdcId_ : "";

    if(timeOfContactSize > 0) {
        for(index = 0; index < timeOfContactSize; index++ ) {
           if(data.body.timeOfContact[index].consentName == 'morning' &&
                data.body.timeOfContact[index].consentValue) {
                startTime = 9;
                endTime = 12;
                contactTime = "AM";
                break;
           } else if(data.body.timeOfContact[index].consentName == 'afternoon' &&
                data.body.timeOfContact[index].consentValue) {
                startTime = 13;
                endTime = 17;
                contactTime = "PM";
                break;
           }
        }
    }

	startDate = new Date(year,month -1,day,startTime,0,0,0);
    endDate = new Date(year,month -1,day,endTime,0,0,0);
    let typeSize = parseInt(data.body.type.length);
    let type;
    for(index = 0; index < typeSize; index++ ) {
       if(data.body.type[index].consentValue) {
            type = data.body.type[index].consentName;
            break;
       }
    }


    let bookingDetailPayload =
        {
          "firstName": data.body.firstName,
          "lastName": data.body.lastName,
          "phone": data.body.phone.substring(3),
          "email": data.body.email,
          "role": data.body.role,
          "hcpId": sfdcId,
          "postCode": data.body.postcode,
          "orgNameText": orgNameText,
          "orgName": orgName,
          "billingCity": billingCity,
          "billingState": billingState,
          "billingStreet": billingStreet,
          "areaOfPractice": data.body.areaOfPractice,
          "comment": data.body.comment ? data.body.comment : " ",
          "timeOfContact": contactTime,
          "type": type,
          "country": country,
          "TAndC": data.body.TAndC,
          "startDateTime": startDate.toISOString(),
          "endDateTime": endDate.toISOString(),
          "recordTypeId": recordTypeId,
          "requestType": "meetwithabbott"
        }

        bookingDetailPayload['captchaValue'] = data.body['g-recaptcha-response'];
     data = datailBook(data);

        data.body = bookingDetailPayload;
        return data;
}

function preBookingDetails() {
    showLoading();
}

function bookingSuccess(data) {

    if(data.errorCode == 0) {
		//hide all errors
        hideApiError();
        hideLoading();
    } else {
        bookingError(data);
    }
}

function bookingError(error) {
    showApiError(error?.response);
    hideLoading();
}

function disablePastDate(id) {
    let thisID = $(id);

    let d = new Date();
    let month = d.getMonth()+1;
    let day = d.getDate();

    let currentDate = d.getFullYear() + '-' +
        ((''+month).length<2 ? '0' : '') + month + '-' +
        ((''+day).length<2 ? '0' : '') + day;

    setTimeout(function() { 
        thisID.attr('min', currentDate);
    }, 2000);
}