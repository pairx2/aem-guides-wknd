/**
 * SAMPLE FREESTYLE - USER REGISTRATION
 **/

/**
 * @function
 * Summary: Function to check Email for new user.
 * Parameters: data {Object} initial payload generated from form-container.
 */
function updateRequestSampleNewUserEmailCheck(data) {
  delete data.body['requestType'];
  delete data.body['node'];
  if(data.body['Login']){
      delete data.body['Login'];
  }
  data.headers["x-id-token"] = getItemLocalStorage('cJwt', true) || getCookie('cJwt_smpl', true);
  let storedData = JSON.parse(sessionStorage.getItem('userData')) || {};
  data.body['consents'] = storedData.consents;
  data.body['userInfo'].email = storedData.email;
  data.body['userInfo'].password = storedData.password;
  data.body['userInfo'].preferredLanguage = data.headers['x-preferred-language'];
  data.body['address'].region = $('#dropdown_label_region_id.a-dropdown-selected').text().trim();
  delete data.body['adress'];
  data.body['userInfo'].additionalProperties = {};
  data.body['userInfo'].additionalProperties = Object.assign(data.body['userInfo'].additionalProperties, data.body['address']);
  delete data.body['address'];
  let filteredArray = data.body['title'].filter(function (item) {
    return item.consentValue === true;
  });
  let title = filteredArray.map(function (item) {
    return item.consentName;
  });
  data.body['userInfo'].title = title[0];
  delete data.body['title'];
  let addressData = data.body;
  sessionStorage.setItem('addressData', JSON.stringify(addressData));
  $('#page-spinner').show();
  return addressData;
}



/**
* @function
* Summary: Called on successful login to process response.
* Parameters: data {Object} is the API response.
*/
function onSuccessSampleNewUserEmailCheck(data) {
  if (data.errorCode !== 0) {
    onErrorSampleNewUserEmailCheck(data);
  } else {
    if (data.response.samplingKey || data.errorCode == 0) {
      sessionStorage.setItem('addressData', JSON.stringify({ ...JSON.parse(sessionStorage.getItem('addressData') || '{}'), samplingkey: data.response.samplingKey }));
      let currElement = $('.o-wizard__container').find('li.a-wizard-step--active');
      currElement.removeClass('a-wizard-step--active a-wizard__step--incomplete').addClass('a-wizard__step--complete a-wizard-step--inactive');
      currElement.next().addClass('a-wizard-step--active');
      $("fieldset[data-wizarditem='1']").hide();
      $("fieldset[data-wizarditem='2']").css("display", "block");
      $("#sample-OTC-verify-form").hide();
      let userMobileNo = JSON.parse(sessionStorage.getItem("addressData"))
      $("#OTC-mobileno").val(userMobileNo.userInfo.phoneNumber);
      if($('#OTC-mobileno').val() !== ""){        
        $("#otc-submit-button").attr("disabled", false);
      }
      scrollToTop();
    }
  }
  $('#page-spinner').hide();

}

/**
* @function
* Summary: Called on error response of login.
* Parameters: error {Object} is the API response.
*/
function onErrorSampleNewUserEmailCheck(error) {
  $('#page-spinner').hide();
  showHideApiError(error);
}
