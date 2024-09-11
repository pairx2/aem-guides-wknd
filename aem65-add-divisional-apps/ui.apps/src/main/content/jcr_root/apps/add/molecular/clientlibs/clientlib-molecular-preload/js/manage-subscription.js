function updateRequest(formData)
{
    
  formData.body ={
    "subscribe": "true",
    "firstName": formData.body.firstName,
    "lastName": formData.body.lastName,
    "email": formData.body.email,
    "institution":formData.body.institution,
    "g-recaptcha-response": formData.body["g-recaptcha-response"],
    "consents": [
        {
            "type": "svc_notifications",
            "approved": formData.body.approved
        }
    ],
    "title":formData.body.title,
    "country":formData.body.country,
    "node":formData.body.node,
    "requestType":formData.body.requestType
    
 }

return formData
}

function updateSuccessResponse(data)
{
  if(data.errorCode==0)
  {
    document.querySelector('.form-container').style.display="none";
    document.querySelector('.o-form-container__buttons .btn').style.display="none";
    document.querySelector('#subscription-success').style.display="block";
  }
}

