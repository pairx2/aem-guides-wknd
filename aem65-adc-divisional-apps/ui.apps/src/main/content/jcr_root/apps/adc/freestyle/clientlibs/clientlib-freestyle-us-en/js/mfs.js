let showHideFields;

$(async function () {
  const wcmEdit = $("#wcmMode").val();
  const isExrFormVersion = $('[name="ERXVersion"]').val() ?? false;
  $('body').addClass('wcmEnabled');
  let vanityProduct = getParameterByName("product");
  if(!!vanityProduct) {
      let vanityProductValue = $('[name='+vanityProduct+']').val();
      vanityProductValue && $('[name="deviceType"]').val(vanityProductValue);
      $("#myfreestyle_form [name='productinterested']").attr("data-required", false);
      $("#productinterested-options").hide();
  }
  // fsl3languagetext
  $("#fsl3languagetext").toggle(vanityProduct === 'fsl3');
  $('#myfreestyle_form input[type=radio]').change(function() {
    $("#fsl3languagetext").toggle($("input[type='radio'][value='FreeStyle Libre 3 system']").is(':checked'));
  });

  if (wcmEdit != "true") {
    erxUIUpdates(isExrFormVersion);
    $('body').removeClass('wcmEnabled');
    if($('#myfreestyle_form').length > 0) {
    // set max length to fields
      setMaxLengthToField("#myfreestyle_form .a-input-control[name=zip]", 5);
      setMaxLengthToField("#myfreestyle_form .a-input-control[name=patient_phone]", 12);
      setMaxLengthToField("#myfreestyle_form .a-input-control[name=caregiver_phone]", 12);

      $("input[name='areYou18']").change(function () {
        handleAgeValueChange($(this).val());
      });

      $(".hennessey-modal button.close, .hennessey-modal .close-btn").click(
        function () {
          $(this).closest('.hennessey-modal').hide().removeClass("show");
        }
      );

      $('#myfreestyle_form .a-date-picker--single .a-input-control[name="dob"]').on('keyup', function(e){
        let element = $(e.currentTarget);
        element.filter(function(){
          return element.val().length === 10;
        }).each(function(){
          let dateString = $(this).val();
          let dateFormat = $(this).closest(".a-date-picker--single").attr('data-date-format');
          validateDatePicker(e,true, dateString, dateFormat, 18);
        });
      });

      $('#myfreestyle_form .a-date-picker--single .a-input-control[name="minor_dob"]').on('keyup', function(e){
        let element = $(e.currentTarget);
        element.filter(function(){
          return element.val().length === 10;
        }).each(function(){
          let dateString = $(this).val();
          let dateFormat = $(this).closest(".a-date-picker--single").attr('data-date-format');
          validateDatePicker(e,true, dateString, dateFormat, 4, "#notEligibleCareGiver");
        });
      });

      $('#myfreestyle_form .a-input-control[name=patient_phone], #myfreestyle_form .a-input-control[name=caregiver_phone]').on('keyup', function(e){
        this.value = this.value.replace(/\D/g, '');
        const valueCount = this.value.trim();
        const formattedNumber = formatPhoneNumber(valueCount);
        $(this).val($(this).val().replace(valueCount,formattedNumber));
    });


      $('#myfreestyle_form .a-input-control[name=zip]').on('keyup', function (event) {
        this.value = this.value.replace(/\D/g, '');
      });

      const lookUpApi = $('#zipcodeapi').val();
      const apiEndPnt = lookUpApi;

      $("#myfreestyle_form .a-input-control[name=zip]").on("change",function(){

        $('input[type="hidden"][name="zipcodeapi"]').filter(function(){
          return $(this).length  === 0;
        }).each(function(){
          return;
        });

        const fieldDiv = $(this).parents('.form-group');
        !fieldDiv.hasClass('validation-regex validation-require') && (() => {
          let options = {
            method: 'GET',
            mode: 'cors',
            headers: {
                "cache-control":"no-cache",
                "Content-Type": "application/json",
                "x-application-id": "freestyle",
                "x-country-code": "US",
                "x-preferred-language": "en",
            }
          }

          fetch(apiEndPnt, options).then((response) => {
            return response.json();
          })
          .then((data) => {
            let authors = data;
            const matchingauthor = authors.response.find(author => author.key === $("#myfreestyle_form .a-input-control[name=zip]").val())
            const showZipcodePopup = () => {
              $("#myfreestyle_form .a-input-control[name=zip]").val("");
              $("#myfreestyle_form .a-input-control[name=zip]").focus();
              $("#zipCodePopup").show().addClass("show");
            };
            matchingauthor && showZipcodePopup();
          });
        })();

      });

      let myself_fields = ["fname","lname","email","dob", "gender", "patient_phone","typeofdiabetes","diabetesManagement"];
      let someoneICareFor_fields = ["areYou18","caregiver_fname","caregiver_lname","caregiver_email_id","caregiver_phone","minor_fname","minor_lname","minor_dob", "minor_gender","someonediabetestype","someonediabetesManagement"];

      let myself_req_fields = [];
      let someoneICareFor_req_fields = [];

      let selectedForm = "";

      listRequiredFields(myself_fields, myself_req_fields);
      listRequiredFields(someoneICareFor_fields, someoneICareFor_req_fields);

      showHideFields = async function (fieldArr,visibility) {
        removeValidationClass(selectedForm);
        let fieldList = fieldArr;
        handleFieldClass(fieldList,myself_req_fields,someoneICareFor_req_fields,visibility);
      }

      await showHideFields(someoneICareFor_fields, 'hide');
      await showHideFields(myself_fields, 'show');

      $("#myfreestyle_form input[type=radio][name=for_whom]").change(async function () {
        selectedForm = handleFields(this.value,someoneICareFor_fields,myself_fields,selectedForm)
      });


      $("#mfs_submit_placeholder").click(function () {
        $("#mfs_submit_btn").attr("disabled", false).click();
      });
      let container = document.querySelector("#myfreestyle_form");
      let form = container?.querySelector("form");

      let btnSubmit = container?.querySelector("#mfs_submit_placeholder");

      btnSubmit?.addEventListener("click", function () {
        handleValidationRequire();
      });

      let insuranceList = $('[name="insuranceTypePopup"]').val()?.split(',');
        const insurance_options = form?.querySelectorAll('#insurance_type-options .a-dropdown__field li');
        insurance_options.forEach(function(e){
          e.addEventListener('click', function () {
            setTimeout(() => {
              const selectedInsurance = $('[name="insuranceType"] .selected').attr("data-optionvalue").trim();
              insuranceList.includes(selectedInsurance) && $("#insuranceTypePopup").show().addClass("show");           
            }, 0);
          });
        });
  }
}

  // print voucher
  const printVoucherBtn = document.getElementById('print-voucher');
  printVoucherBtn?.addEventListener("click", function () {
      window.print();
  });

  //multiple print voucher
  document.querySelectorAll('.print-voucher-click').forEach(function(e){
    e.addEventListener('click', function () {
      window.print();
    });
  });

  $(document).on("click","#telehealth",async function(event) {
    handleTelehealthHref();
    const telehealthData = "SteadyMD";
    callEslServiceToUpdateTelehealthData(telehealthData);
});

$(document).on("click","#walgreens",function(event) {
  const WalgreensData = "Walgreens";
  callEslServiceToUpdateTelehealthData(WalgreensData);
});

});

function callEslServiceToUpdateTelehealthData(eslData) {
  const siteKey = $("body").attr("data-site-key");
  let jsonMfs = sessionStorage.getItem("mfsJson")
  let updatedformattedData =  JSON.parse(jsonMfs);
  const apiregister =  $('[name="telehealthUpdateAPI"]').val();
  let enterpriseRecaptcha = document.querySelector('input[name="enterpriseRecaptcha"]')?.value;
  updatedformattedData.additionalProfileProperties.telehealth = eslData ;

  let jsonHeader =  {
    "cache-control": "no-cache",
    "Content-Type": "application/json",
    "x-application-id": "freestyle",
    "x-country-code": "US",
    "x-preferred-language": "en",
  }

  if(enterpriseRecaptcha === 'true') {
    grecaptcha.enterprise.ready(function () {
      grecaptcha.enterprise.execute(siteKey, {
        action: 'homepage'
      }).then(function (token) {
        if(token==="") {
          jsonHeader["x-secret-header"] = reCaptchaKey;
        } else {
          updatedformattedData.userInfo.captchaValue = token ;
          updatedformattedData.userInfo.captchaType = "ENT";
          updatedformattedData.userInfo.captchaAction = "submit";
        }
        const options = {
          method: 'POST',
          mode: 'cors',
          headers: jsonHeader,
          body: JSON.stringify(updatedformattedData),
        };
        fetch(apiregister, options).then((response) => {
          return response.json();
        });
      });
    });
  } else {
    grecaptcha.ready(function () {
      grecaptcha.execute(siteKey, {
        action: 'homepage'
      }).then(function (token) {
        if (token === "") {
          jsonHeader["x-secret-header"] = reCaptchaKey;
        } else {
          updatedformattedData.userInfo.captchaValue = token;
        }
        const options = {
          method: 'POST',
          mode: 'cors',
          headers: jsonHeader,
          body: JSON.stringify(updatedformattedData),
        };
        fetch(apiregister, options).then((response) => {
          return response.json();
        });
      });
    });
  }
}

const erxUIUpdates = (isExrFormVersion) => {
  if (isExrFormVersion !== '2') {return false}
  setItemLocalStorage('SteadyMD',  false); // rest Md

    const telehealthSection = 'telehealth';
    $("#myfreestyle_form").addClass("d-none");
    $('#section-remove_space_erx').closest('.container').addClass('p_top_zero remove_exr_spacing');


    $("#myfreestyle_form input[type=radio][name=for_telehealth]").change(async function () {

      $("#myfreestyle_form .radio").removeClass("validation-require");
      setItemLocalStorage(telehealthSection, this.value == telehealthSection ? 'Yes' : 'no');
     });
     const border_bg = 'yellow_bg_erx_border';

     $(".m-card.m-card--large").click(function () {
      const chekfornontel = $(this).closest('.m-card.m-card--large').find('.m-card__description p a:not(".m-card-link")').attr('id');
      if (chekfornontel == 'non_telehealthForm_btn'){
        noneteliBtnclick(telehealthSection, border_bg);
      } else if(chekfornontel == 'telehealthForm_btn') {
        teliBtnclick(telehealthSection, border_bg);
      }

     });


      $("#telehealthForm_btn").click(function () {
        teliBtnclick(telehealthSection, border_bg);
      });
      $("#non_telehealthForm_btn").click(function () {

        noneteliBtnclick(telehealthSection, border_bg);
      });
    $('#myfreestyle_form input[type=checkbox][name=SteadyMD]').on('change', async function(){ // on change of state
      setItemLocalStorage('SteadyMD', this.checked ? true : false);

    });

    const patentHtmlLable = $(`#myfreestyle_form [name='patient_phone']`).closest('.fields.text').find('.form-label.a-input-label ');
    const patientText = patentHtmlLable?.html();
    const requtextPatent =  patientText?.split('(');
    const requtextcaregiverT =  patientText?.split('(');

    $(`#myfreestyle_form [name='patient_phone']`).closest('.a-input-field .form-group.a-form-grp').append(`<span class="form-text a-input-field--text-require"><em class="abt-icon abt-icon-exclamation"></em>Please provide ${requtextPatent[0]}</span>`);
    $(`#myfreestyle_form [name='caregiver_phone']`).closest('.a-input-field .form-group.a-form-grp').append(`<span class="form-text a-input-field--text-require"><em class="abt-icon abt-icon-exclamation"></em>Please provide ${requtextcaregiverT[0]}</span>`);

}
const teliBtnclick = (telehealthSection, border_bg) => {
        $('#myfreestyle_form input[type=checkbox][name=SteadyMD]').attr('checked', false);
        $("#myfreestyle_form").removeClass("d-none");
        setItemLocalStorage( telehealthSection, 'Yes');
        setItemLocalStorage('SteadyMD',  false);
        $("#myfreestyle_form [name='SteadyMD']").closest('.options').removeClass('caregiver');
        $('#telehealthForm_btn').closest('.m-card.m-card--large').addClass(border_bg);
        $('#non_telehealthForm_btn').closest('.m-card.m-card--large').removeClass(border_bg);
        $('#SteadyMD_text').closest('.text').removeClass('d-none');
}
const noneteliBtnclick = (telehealthSection, border_bg) => {
      $('#myfreestyle_form input[type=checkbox][name=SteadyMD]').attr('checked', false);
      $("#myfreestyle_form").removeClass("d-none");
      setItemLocalStorage( telehealthSection, 'no');
      setItemLocalStorage('SteadyMD',  false);
      $("#myfreestyle_form [name='SteadyMD']").closest('.options').addClass('caregiver');
      $(`#caregiver_info.cmp-text`).closest('.text').addClass('caregiver');
      $(`#patient_info.cmp-text`).closest('.text').addClass('caregiver');
      $('#non_telehealthForm_btn').closest('.m-card.m-card--large').addClass(border_bg);
      $('#telehealthForm_btn').closest('.m-card.m-card--large').removeClass(border_bg);
      $('#SteadyMD_text').closest('.text').addClass('d-none');
}
const show_option_text = () =>{
  $(`#myfreestyle_form [name='patient_phone']`).closest('.a-input-field').find('.option_hide').show();
  $(`#myfreestyle_form [name='caregiver_phone']`).closest('.a-input-field').find('.option_hide').show();
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  let results = regex.exec(url);
  if (!results) return '';
  if (!results[2]) {
   return '';
  } else {
   return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
}

function handleAgeValueChange(val){
  if(val == "no"){
    $("#notEligible").show().addClass("show");
    $('input[name="areYou18"]').attr("checked", false);
    $('input[name="areYou18"]').prop('checked', false);
    $('input[name="areYou18"]').removeAttr('checked');
  }
}

function listRequiredFields(fieldsList, reqFieldArr) {
  fieldsList.forEach(function(fieldName){
    let field = $("#myfreestyle_form [name="+fieldName+"]").closest('.a-input-field');
    if(field.attr('data-required') === 'true'){
      reqFieldArr.push(fieldName);
    }
  });
}

const handleFields = async (value,someoneICareFor_fields,myself_fields,selectedForm) => {
  if(value == "Patient"){
    $("#myfreestyle_form form")[0].reset();
    $("#myfreestyle_form input[type=radio][name='for_whom']")[1].checked = true
    await showHideFields(someoneICareFor_fields, 'show');
    await showHideFields(myself_fields, 'hide');
    selectedForm = value;
    return selectedForm;
  }else if(value == "minor"){
    if(selectedForm !== '') {
      $("#myfreestyle_form form")[0].reset();
    }
    $("#myfreestyle_form input[type=radio][name='for_whom']")[0].checked = true
    await showHideFields(someoneICareFor_fields, 'hide');
    await showHideFields(myself_fields, 'show');
    selectedForm = value;
    return selectedForm;
  }
}

const formatPhoneNumber = (valueCount) => {
  const chunkOne = valueCount?.substr(0,3);
  const chunkTwo = valueCount?.substr(3,3);
  const restOnes = valueCount?.substr(6, valueCount?.length - 6);
  return `${chunkOne}${chunkTwo ? '-'+chunkTwo : ''}${restOnes ? '-'+restOnes : ''}`
}

const handleTelehealthHref = () => {
  let telehref = $('#telehealth').attr('href');
    const sessionCampaignParams = sessionStorage.getItem('campaignParameters');
    const salesforceAccountId = sessionStorage.getItem("salesforceAccountId");
    let campainparametsurl ;
   if(telehref.includes('?') && !!sessionCampaignParams){
    campainparametsurl = telehref.split('?')[0];
    telehref = campainparametsurl+'?'+sessionCampaignParams;
   }
    const allowSFDCID = $('[name="salesforceAccountId"]').val()
    if(salesforceAccountId != undefined && salesforceAccountId != "" && salesforceAccountId.length>0 && allowSFDCID=="allow" ){
      if(!telehref.includes("&ID=")) {
        telehref = `${telehref}&ID=${salesforceAccountId}`;
        }
    }
    $('#telehealth').attr("href", `${telehref}`);
}

const handleValidationRequire = () => {
  let errorCount = $('.validation-require:visible:not(#common-error)').length + $('.validation-error:visible').length + $('.validation-regex:visible').length;
  if (errorCount > 0) {
    $("#common-error").addClass("validation-require");
  } else {
    showBtnSpinner("mfs_submit_placeholder");
    $("#common-error").removeClass("validation-require");
  }
}

const removeValidationClass = (selectedForm) =>{
if(selectedForm !== "") {
  $("#myfreestyle_form .validation-require").removeClass('validation-require');
  $("#myfreestyle_form .validation-error-msg").removeClass('validation-error-msg');
  $("#myfreestyle_form .validation-regex").removeClass('validation-regex');
  $("#myfreestyle_form .validation-error").removeClass('validation-error');
}
}

function handleFieldClass(fieldList, myself_req_fields, someoneICareFor_req_fields, visibility) {
  let field;
  fieldList.forEach(function (fieldName) {
    if ($("#myfreestyle_form [name=" + fieldName + "]").closest('.fields').length > 0) {
      field = $("#myfreestyle_form [name=" + fieldName + "]").closest('.fields');
    } else if ($("#myfreestyle_form [name=" + fieldName + "]").closest('.options').length > 0) {
      field = $("#myfreestyle_form [name=" + fieldName + "]").closest('.options');
    } else if ($("#myfreestyle_form [name=" + fieldName + "]").closest('.datepicker').length > 0) {
      field = $("#myfreestyle_form [name=" + fieldName + "]").closest('.datepicker');
    }
    if (visibility === 'show') {
      field.removeClass('caregiver');
      $("#myfreestyle_form #patient_info").closest(".text").addClass("caregiver");
      $("#myfreestyle_form #caregiver_info").closest(".text").addClass("caregiver");
      myself_req_fields.forEach(function (myself_req_field_name) {
        $("#myfreestyle_form [name=" + myself_req_field_name + "]").closest('.a-input-field').attr("data-required", true);
      });
      someoneICareFor_req_fields.forEach(function (someoneICareFor_req_field_name) {
        $("#myfreestyle_form [name=" + someoneICareFor_req_field_name + "]").closest('.a-input-field').attr("data-required", false);
      });
      $("#myfreestyle_form [name='areYou18']").attr("data-required", false);
    } else {
      field.addClass('caregiver');
      $("#myfreestyle_form #patient_info").closest(".text").removeClass("caregiver");
      $("#myfreestyle_form #caregiver_info").closest(".text").removeClass("caregiver");
      myself_req_fields.forEach(function (myself_req_field_name) {
        $("#myfreestyle_form [name=" + myself_req_field_name + "]").closest('.a-input-field').attr("data-required", false);
      });
      someoneICareFor_req_fields.forEach(function (someoneICareFor_req_field_name) {
        $("#myfreestyle_form [name=" + someoneICareFor_req_field_name + "]").closest('.a-input-field').attr("data-required", true);
      });
      $("#myfreestyle_form [name='areYou18']").attr("data-required", true);
    }
  });
}