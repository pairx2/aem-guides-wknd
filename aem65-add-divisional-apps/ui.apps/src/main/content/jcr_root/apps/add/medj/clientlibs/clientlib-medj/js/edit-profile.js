function profileFormAttributeSet() {
    $('#editProfileForm input#firstName').attr('maxlength', 40);
    $('#editProfileForm input#lastName').attr('maxlength', 40);
    $('#editProfileForm input#medicalInstitution').attr('maxlength', 200);
    $('#editProfileForm input#workPhone').attr('maxlength', 12);
    $('#editProfileForm input#workPhone').attr('minlength', 12);
    $('#editProfileForm input#speciality').attr('maxlength', 200);
    $('#editProfileForm input#designation').attr('maxlength', 200);
}
$(document).ready(function() {
    if(typeof typeof Granite === 'undefined' ||  typeof Granite.author === 'undefined') {
        var isLoginTrigger=localStorage.getItem('triggerLoginPopup');
        if(isLoginTrigger=='true'){
                $("#loginSignUpTrigger").parent().parent(".m-popup").addClass("loginPopupBtn");
                setTimeout(function() {
                    $(".loginPopupBtn.m-popup").click();
                }, 100);
                localStorage.setItem('triggerLoginPopup','false');
        }
        var editProfileForm = $("#editProfileForm").length;
        if (editProfileForm) {
            $('#editProfileForm input[name="designation"]').closest('.layoutcontainer.m-layout-container').css('z-index', '0');
            profileFormAttributeSet();
            var profileLoginToken,
                profileSiteLanguage,
                profileSiteCountryCode,
                profileSiteApplicationId,
                retrieveProfileUrl;
            profileSiteLanguage = $("input[name='x-preferred-language']").val();
            profileSiteCountryCode = $("input[name='x-country-code']").val();
            profileSiteApplicationId = $("input[name='x-application-id']").val();
            retrieveProfileUrl = $("#retreiveProfileForm form").attr('action');
            $("#loginSignUpTrigger").parent().parent(".m-popup").addClass("loginPopupBtn");
            if (UserLoginValidCheck()) {
                profileLoginToken = sessionStorage.getItem('jwtToken');
                $.ajax({
                    url: retrieveProfileUrl,
                    type: 'GET',
                    dataType: 'json',
                    headers: {
                        'x-country-code': profileSiteCountryCode,
                        'x-application-id': profileSiteApplicationId,
                        'x-preferred-language': profileSiteLanguage,
                        'x-id-token': profileLoginToken
                    },
                    success: function(data) {
                        if (data.errorCode == 0) {
                            var userprofileInfo = data.response.userInfo;
                            var userfirstName = userprofileInfo.firstName;
                            var userlastName = userprofileInfo.lastName;
                            var userMedicalInstitution = userprofileInfo.medicalInstitution;
                            var userWorkPhone = userprofileInfo.workPhone;
                            var userSpeciality = userprofileInfo.speciality;
                            var userOccupation = userprofileInfo.occupation;
                            var userDesignation = userprofileInfo.designation;
                            var userEmail = userprofileInfo.email;
                            var userarticleSubscribed = userprofileInfo.articleSubscribed;
                            var userEventSubscribed = userprofileInfo.eventSubscribed;
                            var userPromoInfoSubscribed = userprofileInfo.promoInfoSubscribed;

                            $("#firstName").val(userfirstName);
                            $("#lastName").val(userlastName);
                            $("#medicalInstitution").val(userMedicalInstitution);
                            $("#workPhone").val(userWorkPhone);
                            $("#speciality").val(userSpeciality);
                            $("#occupation-options .a-dropdown__field > span").remove();
                            $("#occupation-options .a-dropdown__field").append('<span class="a-dropdown-selected">'+userOccupation+'</span>');
                            $("#occupation-options .a-dropdown__menu li[data-optionvalue="+userOccupation+"]").addClass('selected');

                            $("#designation").val(userDesignation);
                            $("#email").val(userEmail);
                        if (userarticleSubscribed == "true") {

                                $("#newsletter-subscription-options input[type='checkbox'][value='articles']").prop('checked','true');
                            }

                            if (userEventSubscribed == "true") {

                                $("#newsletter-subscription-options input[type='checkbox'][value='eventsOrSeminar']").prop('checked','true');
                            }

                            if (userPromoInfoSubscribed == "true") {

                                $("#newsletter-subscription-options input[type='checkbox'][value='promotionalInformation']").prop('checked','true');
                            }
                            $("#editProfileForm .o-form-container__buttons .a-button .btn[type='submit']").prop('disabled',false);

                        } else {
                            showApiError('#edit-profile-api-error', data);
                            $("#editProfileForm").hide();
                        }

                    },
                    error: function(error) {
                    $(".loginPopupBtn.m-popup").click();
                    }
                });
            } else {
            setTimeout(function() {
                    $(".loginPopupBtn.m-popup").click();
                }, 100);
            }
        }
    }
});