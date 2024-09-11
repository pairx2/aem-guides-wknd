$(function() {
  const xApplicationId = $('input[name="x-application-id"]').val();
  const xCountryCode = $('input[name="x-country-code"]').val();

	const wcmEdit = $("#wcmMode").val();
  $('body').addClass('wcmEnabled');
  if (wcmEdit == "true") { return false; }

    $('body').removeClass('wcmEnabled');
    const form = document.querySelector('#request-info-form');
    if(form === null || !form){ return false;}
    let npi_container = form.querySelector('#npi-field');
    let npi = form.querySelector('#npi-field .a-input-control[name="NPI"]');
    let address_container = form.querySelector("#address-fields");
    let addressLine1 = address_container?.querySelector('.a-input-control[name="addressLine1"]');
    let state = address_container?.querySelector('.a-input-control[name="state"]');
    let city = address_container?.querySelector('.a-input-control[name="city"]');
    let zipCode = form.querySelector('input[name="zipCode"]');
    let govt_agency_selection = form.querySelector('#govt_agency_selection-options');
    let govt_agency_container = form.querySelector('#govt_agency-options');
    let govt_agency = govt_agency_container?.querySelector('#govt_agency-options .a-dropdown__menu');

    // changed required fields to non-required and vice-versa
   

    //  onLoad make all the hidden fields to non-required
    const roles_hidden_var = $('[name="hide_nip_option"]').val();
    const hideNpi = npiHiddenCheck(roles_hidden_var);
    is_field_required([ npi, addressLine1, state, city, govt_agency]);

   

    //Show NPI Number input field depending on the Role selected

    const roles = hideNpi ? hideNpi : ['primary care physician', 'endocrinologist', 'nurse practitioner/nurse', 'physician assistant'];
    formFields_options(npi,npi_container,roles);
    // Show the address fields when checkbox is checked else hide
    is_interested_to_contact_by_sales(form,address_container);

    // Show the govt_Agency dropdown when user selected yes
    govt_agency_selection?.querySelectorAll('input[name="govAgency"]').forEach(function(ele){
      ele.addEventListener('change', function () {
            const curEle = this;
            const selectedVal = curEle.value;
            if (selectedVal === "Yes") {
              govt_agency_container.style.display = 'block';
              is_field_required([govt_agency], true);
            } else {
              govt_agency_container.style.display = 'none';
              is_field_required([govt_agency]);
            }
          })
    });

    // On click of AddAddress text, show the address line 2 field and remove text
    form.querySelector("#addLine")?.addEventListener('click', function () {
      this.classList.remove('d-inline-block');
      form.querySelector('#secondary-address').style.display = 'block';
      form.querySelector('#removeLine').classList.add('d-inline-block');
    });

    // On click of RemoveAddress text, hide the address line 2 field and show add text
    form.querySelector("#removeLine")?.addEventListener('click', function () {
      this.classList.remove('d-inline-block');
      form.querySelector('#secondary-address').style.display = 'none';
      form.querySelector('#addLine').classList.add('d-inline-block');
    });

    //Call service to get City and State through Zip Code
    zipCode?.addEventListener('keyup', function () {
      const zipCodeValue = $(this).val();
		  if(zipCodeValue?.length !== 5) {
		      return false;
		  }

      const url = $('#request-info-form form').attr('action');
      const domain = (new URL(url));
      const requestURL = $('[name="zipCodeRequestURL"]').val();
      const requestURLWithCode = domain?.origin + requestURL + zipCodeValue;

      $.ajax({
        url: requestURLWithCode,
        headers: {
                   'Content-Type': 'application/json',
                   'x-country-code' : xCountryCode,
                   'x-application-id': xApplicationId
                 },
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            city.value = "";
            state.value = "";
            if(data.errorCode === 0) {
                  const zipCodeResponse = data?.response?.CityStateLookupResponse?.ZipCode;
                  city.value = zipCodeResponse?.City;
                  state.value = zipCodeResponse?.State;
            }
            return false;
        },
        error: function (data) {
            console.log(data);
        }
      });
    });
   
});
function is_field_required(targetEle, isRequired = false) {
  targetEle.forEach(ele => {
      ele?.closest('.a-input-field').setAttribute('data-required', isRequired);
      ele?.setAttribute('required', isRequired);
});
}
function npiHiddenCheck (roles_hidden_var) {
if (roles_hidden_var && roles_hidden_var == 'all'){
  return [];
} else if (roles_hidden_var){
  return roles_hidden_var?.split(';') 
}
return false;
} 

function is_interested_to_contact_by_sales(form, address_container) {
  form.querySelector('input[value="is_interested_to_contact_by_sales"]')?.addEventListener('change', function () {
    const curr_ele = this;
    const is_checked = curr_ele.checked;
    const checked_val = curr_ele.value === "is_interested_to_contact_by_sales" ? true : false;
    if (checked_val) {
      if (is_checked) {
        address_container.style.display = 'block';
        is_field_required([addressLine1, state, city], true);
        $('html, body').animate({
          scrollTop: $('#section-address-fields').offset().top -150
        }, 1000);
      } else {
        address_container.style.display = 'none';
        is_field_required([addressLine1, state, city]);
      }
    }
  });
}

function formFields_options(npi,npi_container,roles) {
  $('#formFields-role-options .a-dropdown').on('change', function () {
    const selectedRole = document.querySelector('.a-dropdown-selected')?.innerText?.toLowerCase();
       const showNPI = roles?.includes(selectedRole);
       showNPI === true ? ($(npi_container).show()) : ($(npi_container).hide());
       is_field_required([npi], showNPI);
   });
}