/**
 * SAMPLE FREESTYLE - OTC Send and Verify
 **/

/**
 * @function
 * Summary: Function to check the OTC send on user.
 * Parameters: data {Object} initial payload generated from form-container.
 */
let OTPvalidationFaild;

function updateRequestSampleFreestyleOtc(data) {
  let sampleData = JSON.parse(sessionStorage.getItem("addressData"))
  data.body['samplingKey'] = sampleData.samplingkey;
  data.body['type'] = 'SendOTC';
  delete data.body['requestType'];
  delete data.body['node'];  
  delete data.body['address'];
  OTPvalidationFaild = 0;
  $("#OTC-mobileno-2").val($("#OTC-mobileno").val());
  $('#page-spinner').show();
  return data; 
}

/**
 * @function
 * Summary: Function to check the OTC send success response.
 * Parameters: data {Object} is the API response..
 */  
function onRequestSuccessFreestyleSampleOtc(data){
  if (data.errorCode == 0) {
      $("#sample-OTC-request-form").hide();
      $("#sample-OTC-verify-form").show();
      $('#page-spinner').hide();
      scrollToTop();
  } else {
    onRequestErrorFreestyleSampleOtc(data);
  }
}

/**
 * @function
 * Summary: Function to check the OTC send error response.
 * Parameters: data {Object} is the API response.
 */
function onRequestErrorFreestyleSampleOtc(error){
  showHideApiError(error);
  $('#page-spinner').hide();
}


/**
 * @function
 * Summary: Function to check the OTC verfied intial payload.
 * Parameters: data {Object} initial payload generated from form-container.
 */

function updateVerifySampleFreestyleOtc(data) {
  let sampleData = JSON.parse(sessionStorage.getItem("addressData"))
  data.body['samplingKey'] = sampleData.samplingkey;
  data.body['type'] = 'validateOTC';
  data.body['otc'] = $('#OTC-code').val();
  delete data.body['requestType'];
  delete data.body['node'];
  delete data.body['userInfo'];
  $('#page-spinner').show();
  return data;
}

/**
 * @function
 * Summary: Function to check the OTC verfied success response.
 * Parameters: data {Object} is the API response.
 */

function onVerifySuccessFreestyleSampleOtc(data){
  if (data.errorCode == 0) {
    sessionStorage.removeItem('addressData')
    sessionStorage.removeItem('userData')
    $('#page-spinner').hide();
    sessionStorage.removeItem('LoggedInUserSampling');
  } else {
    onVerifyErrorFreestyleSampleOtc(data);
  }
}

/**
 * @function
 * Summary: Function to check the OTC verfied error response.
 * Parameters: error {Object} is the API response.
 */
function onVerifyErrorFreestyleSampleOtc(error){
  $('#sample-OTC-verify-form button[type="submit"]').attr("disabled", true);
  if (error.errorCode == 1004) {
    $('#OTC-inccorrect-msg').show();
    OTPvalidationFaild++;
    $('#page-spinner').hide();
    $("#OTC-code").val("");
    if (OTPvalidationFaild == 3){
      $('#OTC-inccorrect-msg').hide();
      $("#OTC-code").attr("disabled", true).val("");
      $('#OTC-attempt-alert-message').show();
    }
  }else{
    showHideApiError(error);
    if ($('#OTC-inccorrect-msg').is(':visible')){
      $('#OTC-inccorrect-msg').hide();
    }
    if ($('#OTC-attempt-alert-message').is(':visible')){
      $('#OTC-attempt-alert-message').hide();
    }
  }
}
