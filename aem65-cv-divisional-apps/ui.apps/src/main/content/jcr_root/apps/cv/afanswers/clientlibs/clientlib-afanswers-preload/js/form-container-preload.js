var currentPagePath = window.location.href;
var emailToAddress;

function UpdateContactUsRequest(formData) {
	var formBody = formData.body;
	for (const key in formBody) {
		if (Array.isArray(formBody[key])) {
			let transFormArray = formData.body[key];
			let transFormObject = [];
			transFormArray.filter(obj => {
				if (obj.consentValue == true) {
					transFormObject.push(obj.consentName)
				}
			});
			formData.body[key] = transFormObject.toString();
		}
	}

	if (currentPagePath) {
		formData.body.currentPageURL = currentPagePath;
	}
	if (emailToAddress) {
		formData.body.emailAddress = emailToAddress;
	}
	if (formData.body["g-recaptcha-response"]) {
		formData.body.captchaValue = formData.body["g-recaptcha-response"];
	}
}


function contactusSuccessmsgCallback(){
     setTimeout(function() {
		 $(".o-form-container__buttons").find('.a-spinner').remove();
	},10);
}

function contactusFailuremsgCallback(){
    setTimeout(function() {
		$(".o-form-container__buttons").find('.a-spinner').remove();
    },10);
}



