
// Function for contact us form request processing
function contactUsFormRequestProcess(data) {

  // Read Session Storage of user details like fullname and email
  let userData = JSON.parse(sessionStorage.getItem('user'));
  let fullName = "";
  let email = "";
  if(userData){
	fullName = userData.name;
	email = userData.email;
  }

  let formattedData = {
    "requestType": data.body.requestType,
	"fullName": fullName,
    "email": email,
    "subject": data.body.subject,
    "message": data.body.message,
    "captchaValue":  data.body["g-recaptcha-response"]
  }

  data.body = formattedData;

  return data;
}

