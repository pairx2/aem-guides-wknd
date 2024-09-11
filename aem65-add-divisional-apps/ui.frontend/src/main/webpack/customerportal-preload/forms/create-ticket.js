/** Create Ticket -- starts**/

function updateRequestCreateTicket(data) {

    const profile = window.getLocalStorage('profile');

    let body = {};

    body['incidentReportSubmission'] = {};
    body['incidentReportSubmission']['SerialNumber'] = data.body['SerialNumber'];
    body['incidentReportSubmission']['ShortDescription'] = data.body['ShortDescription'];
    body['incidentReportSubmission']['DetailedDescription'] = data.body['DetailedDescription'];
    body['incidentReportSubmission']['Impact'] = data.body['Impact'];
    body['incidentReportSubmission']['CmsNextInstrumentId'] = data.body['CmsNextInstrumentId'];
    body['incidentReportSubmission']['CmsNextCustomerId'] = data.body['CmsNextCustomerId'];
    body['incidentReportSubmission']['UserName'] = profile?.firstName + " " + profile?.lastName;

    let billingCountry = getUrlParameter('bc');
    if (billingCountry && billingCountry != '') {
        body['incidentReportSubmission']['BillingCountry'] = billingCountry;
    }

    let isInformatics = getUrlParameter('in') === 'true';
    body['incidentReportSubmission']['IsInformatics'] = isInformatics;

    const contactId = $("[name='contactId']").val();
    body['incidentReportSubmission']['IncidentReportContact'] = {};
    if (contactId) {
        body['incidentReportSubmission']['IncidentReportContact']["ContactId"] = contactId;
        body['incidentReportSubmission']['IncidentReportContact']["Phone"] = data.body['Phone'];
    } else {
        body['incidentReportSubmission']['IncidentReportContact']["EmailAddress"] = data.body['Email'];
        body['incidentReportSubmission']['IncidentReportContact']["Phone"] = data.body['Phone'];
        body['incidentReportSubmission']['IncidentReportContact']["Name"] = data.body['Name'];
        let nameParts = data.body['Name'].split(" ");
        body['incidentReportSubmission']['IncidentReportContact']["FirstName"] = nameParts[0];
        body['incidentReportSubmission']['IncidentReportContact']["LastName"] = nameParts[1] || '';
    }

    let uploadedFiles = $("[name='uploaded-s3-files']").val();

    if (uploadedFiles) {
        let jsonAttachments = JSON.parse(uploadedFiles);

        if (jsonAttachments) {
            body['incidentReportSubmission']['Attachments'] = jsonAttachments;
        }
    }

    body['action'] = 'createIncident';


    data.body = body;

    const token = getCookie("jwtToken");
    data.headers["x-id-token"] = token;

    return data;
}
window.updateRequestCreateTicket = updateRequestCreateTicket;


function onBeforeCreateTicket() {
    showLoading();
}
window.onBeforeCreateTicket = onBeforeCreateTicket;

function onSuccessCreateTicket(data) {
    console.error(data);

    if (data.errorCode == 0) {
        const detailedDescription = $('textarea[name="DetailedDescription"]').val();
        const detailedEllipsis = detailedDescription.length > 500 ? "..." : "";
        let passData = {
            'dateOpened': data.response?.DateOpened,
            'facility': window.getLocalStorage('custportalSelectedLabProfile')?.labName,
            'subject': $('input[name="ShortDescription"]').val(),
            'detailedDescription': detailedDescription.slice(0, 500) + detailedEllipsis,
            'impact': $.trim($(".a-dropdown__field .a-dropdown-selected").text()),
            'contactName': $('input[name="contactName"]').val(),
            'createdContactName': $('input[name="Name"]').val(),
            'incidentNumber': data.response?.TicketNum
        };

        // Fire service request submits analytics event
        let labInfo = window.addAnalytics.getAnalyticsLabProfileObj()
        let userInfo = window.addAnalytics.getAnalyticsUserObj()
        let serviceRequestSubmitsObj = {
            "event": "service_request_submit",
            "lab": {
                "labType": labInfo.lab.labType,
                "labId": labInfo.lab.labId
            },
            "user": {
                "userRole": userInfo.user.userRole,
                "userLoginStatus": userInfo.user.userLoginStatus
            },
            "siteLanguage": window.getLanguage(),
            "serviceRequestId": passData.incidentNumber
        }

        window.addAnalytics.fireAnalyticsEvent('service_request_submit', serviceRequestSubmitsObj)
    
        // this url encodes twice, once to escape non-latin chars, once to url encode the base64 string
        window.location.href = "create-ticket-success.html?d=" + encodeURIComponent(encodeBase64(JSON.stringify(passData)));
        //hide all errors
        hideApiError();
        hideLoading();
        return false;

    } else {
        onErrorCreateTicket(data);
    }
}
window.onSuccessCreateTicket = onSuccessCreateTicket;

function onErrorCreateTicket(error) {
    console.error(error);
    showApiError(error?.response?.i18nMessageKey);
    hideLoading();
}
window.onErrorCreateTicket = onErrorCreateTicket;
/** Create Ticket -- ends**/