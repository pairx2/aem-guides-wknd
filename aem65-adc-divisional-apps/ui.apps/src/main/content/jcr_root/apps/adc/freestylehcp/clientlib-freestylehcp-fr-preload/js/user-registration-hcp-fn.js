/**
 * HCP FR - USER REGISTRATION
 **/

/**
 * @function
 * Summary: Called before request, to update the payload.
 * Parameters: data {Object} initial payload generated from form-container.
 */

 function updateRequestHcpUserRegistration(data) {

  //territory
  if ($('#hcpterritoryOfExcercise-de').length == 1){
    data.body.userInfo['territoryOfExcercise']=$('#hcpterritoryOfExcercise-de').val();
  } else {
    data.body.userInfo['territoryOfExcercise']=$('#hcpterritoryOfExcercise-options .selected').text().trim();
  }

  //speciality
  if ($('#hcpspeciality-backend-variable-options').length == 1){
    data.body.userInfo['speciality']=$('#hcpspeciality-backend-variable-options .selected').attr('data-optionvalue');
  } else {
    data.body.userInfo['speciality']=$('#hcpspeciality-options .selected').text().trim();
  }
  
  //action
  data.body['action']='createProfileNormal';
  //businessType 
  data.body.userInfo['businessType']='B2B';
  
  //data.body.userInfo['termsAndConditions']='true'
  
  //  captcha
    data.body['g-recaptcha-response'] = data['g-recaptcha-response'];
  
  //  validationType
     let validationType=radioValue(data.body['Registration']).split(' ').join('_');
     data.body.userInfo['validationType']=validationType;
  
  //  RPPS/Invitaton code
     let updValidationType=(!validationType.toLowerCase().includes('rpps')?'invitationCode':'rppsNumber')
     data.body.userInfo[updValidationType]=data.body['validationCode']
     
  //  salutation
    let salutationValue;
    if((document.getElementById("hcp-de-title-options") !== null) && ($('#hcp-de-title-options :checked').length == 0)){
      salutationValue = '';
      } else {
      salutationValue = radioValue(data.body['title']);
    }

   data.body.userInfo['title'] = salutationValue;
  
  
  //   //removed extra data
   delete data['g-recaptcha-response'];
   delete data.body['title'];
   delete data.body['requestType'];
   delete data.body['node'];
   delete data.body['Registration'];
   delete data.body['validationCode'];
  
  
  
  
  //  encrypt and store data
   let regUsObj = {
     'title': salutationValue,
     'firstName': data.body.userInfo['firstName'],
     'lastName': data.body.userInfo['lastName'],
     'phoneNumber': data.body.userInfo['phoneNumber'],
     'email': data.body.userInfo['email'],
     'consents': data.body['consents']
   }
   
   setUsObj(regUsObj);
  
   return data;
  // 
  }
  
  
  
  
  /**
  * @function
  * Summary: Called on successful login to process response. 
  * Parameters: data {Object} is the API response.
  */
  function onSuccessHcpUserRegistration(data) {
  if (data.errorCode !== 0) {
   onErrorHcpUserRegistration(data);
  }
  
  }
  
  /**
  * @function
  * Summary: Called on error response of login. 
  * Parameters: error {Object} is the API response.
  */
  function onErrorHcpUserRegistration(error) {
  showHideApiError(error);
  
    deleteCookie('pk', true);
    deleteCookie('usObj', true);
    deleteCookie('usFn', true);
  
  }
  

  /**
 * @function
 * Summary: Called before request, to update the payload for book a rep.
 * Parameters: data {Object} initial payload generated from form-container.
 */

  function updateBookaRep(data) {

    let saluteBookaRep = radioValue(data.body['title']);
    data.body['title'] = saluteBookaRep;
   
    return data;
  }
   