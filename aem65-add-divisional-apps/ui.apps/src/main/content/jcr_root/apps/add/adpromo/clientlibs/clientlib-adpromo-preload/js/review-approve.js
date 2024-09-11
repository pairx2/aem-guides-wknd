function updateReviewRequest(data){
    var xApplicationId = document.querySelector('input[name="x-application-id"]').value;
    var xCountryCode = document.querySelector('input[name="x-country-code"]').value;
    var xPrefLang = document.querySelector('input[name="x-preferred-language"]').value;
    var jwtToken = getCookie('id.token');
    const actionItem = document.querySelector("#review-approve-options");
    var action = actionItem.getAttribute("role"); 
    var justification = document.querySelector('textarea[name="justificationForDecision"]').value;
    var changeID = document.querySelector('input[name="changeId"]').value;

    data.headers = {
        'x-application-id': xApplicationId,
        'x-country-code': xCountryCode,
        'x-preferred-language': xPrefLang,
        'Content-Type': 'application/json',
        "x-id-token": jwtToken
    }

    data.body = {
        "action" : action,
        "justification": justification,
        "changeRequestId": changeID,
    	"approverId": "12290457"
    }
return data

}

function onSuccessReviewRequest(data){
	   $('.loader-parent').show();
       if (data.errorCode == 0 ) {
            window.location.href = "/secure/product/request/home.html";
        }
   
}
function onCompleteReviewRequest(data){
	   $('.loader-parent').hide(); 
}
