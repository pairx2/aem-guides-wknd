$(document).ready(function() {
  populateProfile();
});

function populateProfile() {
  let userProfile = $("#editUserProfile");
  if (userProfile && userProfile.length > 0) {

    let profileInfo = getLocalStorage('profile');
    let firstName = profileInfo.firstName;
    if (firstName && firstName != '') {
      $("[name='firstName']").val(firstName);
    }

    let lastName = profileInfo.lastName;
    if (lastName && lastName != '') {
      $("[name='lastName']").val(lastName);
    }

    let email = profileInfo.email;
    if (email && email != '') {
      $("[name='email']").val(email);
    }

    let phoneNum = profileInfo.phones[0].number;
    if (phoneNum && phoneNum != '') {
      $("[name='phoneNumber']").val(phoneNum);
    }

    let userType = profileInfo.userType;
    if (userType && userType != '') {
      selectFormDropdown("role", userType);
    }
    if(userType =='distributor')
    {
      $('#user-type-options .a-dropdown__field')[0].disabled=true;
      $('#user-type-options .a-dropdown__field')[0].style.opacity=0.3;
    }
    if(userType!='distributor')
    {
      if($('#user-type-options li[data-optionValue="distributor"]')[0]!=null)
      {
        $('#user-type-options li[data-optionValue="distributor"]')[0].remove();
      }
    }

    let country = profileInfo.country;
    if (country && country != '') {
      selectFormDropdown("country", country);
    }
  }
}
window.populateProfile = populateProfile;