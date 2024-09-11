function cancelDataRequest(data){
    var xApplicationId = document.querySelector('input[name="x-application-id"]').value;
    var xCountryCode = document.querySelector('input[name="x-country-code"]').value;
    var xPrefLang = document.querySelector('input[name="x-preferred-language"]').value;
    var jwtToken = getCookie('id.token');
    const actionItem = document.querySelector("#cancel-review");
    var action = actionItem.getAttribute("role"); 
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
        "changeRequestId": changeID,
    	"approverId": "12290457"
    }
return data
}
function onSuccessCancelRequest(data){
    $(".loader-parent").show();
    if (data.errorCode == 0 ) {
        window.location.href = "/secure/product/request/home.html";
     }
}
function onCompleteCancelRequest(){
    $(".loader-parent").hide();
}