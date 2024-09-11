
function addPatientStoryRequestProcess(patientStorydata) {
  return buildAddPatientupRequestData(patientStorydata);
}


function buildAddPatientupRequestData(patientStorydata) {
     const reCaptchappatientKey = $('[name="reCaptchaAPIKey"]').val();

      const captchaValue = patientStorydata.body["g-recaptcha-response"];
      const firstName = $('[name="patientfirstname"]').val();
      const lastName = $('[name="patientlastname"]').val();
      const email = $('[name="patientemail"]').val();
      const state = parseInt($('[id="form_state"] .selected').attr("data-optionvalue"));
      const age = parseInt($('[id="form_age"] .selected').attr("data-optionvalue"));
      const product =  parseInt($('[id="form_product"] .selected').attr("data-optionvalue"));
      const storyType = parseInt($('[id="form_story_type"] .selected').attr("data-optionvalue"));
      const storyTopic = parseInt($('[id="form_story_topic"] .selected').attr("data-optionvalue"));
      const content = $('[id="patienttext"]').val();
      const PreviousMeter =$('[id="form_product"] .selected').text().trim(); 
      const contactConsent = ($("input:checkbox[name=contactConsent]:checked").val())=="on" ? "1" : "0";
      const tncConsent = ($("input:checkbox[name=tncConsent]:checked").val())=="on"? "1" : "0";
      const marketingConsent = ($("input:checkbox[name=marketingConsent]:checked").val()) == "on" ? true : false ;
      let image = $(".m-file-uploader__croppedimg img").attr('src')== undefined ? "" : $(".m-file-uploader__croppedimg img").attr('src') ;
      if(image != '' && image != 'undefined' ){
        image = image.split(",")[1];
      }
      const patientStoryFormattedData = {  "first_name": firstName,
                                            "last_name": lastName,
                                            "email": email,
                                            "state_id":state,
                                            "age_range_id": age,
                                            "product_id": product,
                                            "story_type_id": storyType,
                                            "story_topic_id":storyTopic,
                                            "content": content,
                                            "PreviousMeter": PreviousMeter,
                                            "accepted_consent_to_contact": contactConsent,
                                            "accepted_terms_and_conditions": tncConsent,
                                            "marketingConsent": marketingConsent,
                                            "image":image
                                          };

      const addPatientStory = {
        "first_name": patientStoryFormattedData.first_name,
        "last_name": patientStoryFormattedData.last_name,
        "email": patientStoryFormattedData.email,
        "state_id":patientStoryFormattedData.state_id,
        "age_range_id": patientStoryFormattedData.age_range_id,
        "product_id": patientStoryFormattedData.product_id,
        "story_type_id": patientStoryFormattedData.story_type_id,
        "story_topic_id":patientStoryFormattedData.story_topic_id,
        "content": patientStoryFormattedData.content,
        "PreviousMeter": patientStoryFormattedData.PreviousMeter,
        "accepted_consent_to_contact": patientStoryFormattedData.accepted_consent_to_contact,
        "accepted_terms_and_conditions": patientStoryFormattedData.accepted_terms_and_conditions,
        "marketingConsent": patientStoryFormattedData.marketingConsent,
        "image":patientStoryFormattedData.image
      };

    if(captchaValue==="") {
      patientStorydata.headers["x-secret-header"] = reCaptchappatientKey;
    } else {
      addPatientStory["captchaValue"] = captchaValue ;
      let enterpriseRecaptcha = document.querySelector('input[name="enterpriseRecaptcha"]')?.value
      if(enterpriseRecaptcha === "true") {
        addPatientStory["captchaType"] = "ENT";
        addPatientStory["captchaAction"] = "submit";
      }
      
  }

    patientStorydata.body = addPatientStory;

  return patientStorydata;
}

function onSuccessPatientStorydata(patientStorydata) {
    if(patientStorydata.status){
      $("#patient-story-success-message").show();
      $("#share_your_story_container").hide();  
    }
 
      
}

function onErrorPatientStorydata(patientStorydata) {
    $("#addpatient_form .o-form-container__success-msg").hide();
    $("#addpatient_form").show().addClass('show');

  }

  function createObjectWithKeys(obj) {
    return Object.keys(obj).reduce((acc, key) => ({ ...acc, [key]: key }), {});
  }  



