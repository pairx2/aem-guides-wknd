$(document).ready(function() {
    if(typeof typeof Granite === 'undefined' ||  typeof Granite.author === 'undefined') {
        var userProfileForm = $("#myProfileForm").length;
        if (userProfileForm) {
            var loginToken,
                siteLanguage,
                siteCountryCode,
                siteApplicationId,
                getProfileUrl;
            siteLanguage = $("input[name='x-preferred-language']").val();
            siteCountryCode = $("input[name='x-country-code']").val();
            siteApplicationId = $("input[name='x-application-id']").val();
            getProfileUrl = $("#myProfileForm form").attr('action');            
            
            if(sessionStorage.getItem('profileUpdateAlert')=='PasswordChanged') {
                sessionStorage.removeItem('profileUpdateAlert');
                $("#profile-update-alert").closest('.container').hide();
                $("#change-password-update-alert").addClass('alert alert-success');
                $("#change-password-update-alert").closest('.container').show();
                setTimeout(function() {
                    $("#change-password-update-alert").closest('.container').hide();
                }, 10000)
            }
            else if(sessionStorage.getItem('profileUpdateAlert')=='ProfileUpdated') {
                sessionStorage.removeItem('profileUpdateAlert');
                $("#change-password-update-alert").closest('.container').hide();
                $("#profile-update-alert").addClass('alert alert-success');
                $("#profile-update-alert").closest('.container').show();
                setTimeout(function() {
                    $("#profile-update-alert").closest('.container').hide();
                }, 10000)
            }
            else {
                $("#profile-update-alert").closest('.container').hide();
                $("#change-password-update-alert").closest('.container').hide();
            }
          
            $("#myProfileNewsletter #articleSubscribed, #myProfileNewsletter #eventsSubscribed, #myProfileNewsletter #promoSubscribed").hide();
            $("#my-profile").closest('.container').addClass("profileContainer");
            $("#loginSignUpTrigger").parent().parent(".m-popup").addClass("loginPopupBtn");
            if (UserLoginValidCheck()) {
                loginToken = sessionStorage.getItem('jwtToken');
                $.ajax({
                    url: getProfileUrl,
                    type: 'GET',
                    dataType: 'json',
                    headers: {
                        'x-country-code': siteCountryCode,
                        'x-application-id': siteApplicationId,
                        'x-preferred-language': siteLanguage,
                        'x-id-token': loginToken
                    },
                    success: function(data) {
                        if (data.errorCode == 0) {
                            console.log(data.response.userInfo);
                            var profileInfo = data.response.userInfo;
                            var firstName = profileInfo.firstName;
                            var lastName = profileInfo.lastName;
                            var medicalInstitution = profileInfo.medicalInstitution;
                            var workPhone = profileInfo.workPhone;
                            var speciality = profileInfo.speciality;
                            var occupation = profileInfo.occupation;
                            var designation = profileInfo.designation;
                            var email = profileInfo.email;
                            var articleSubscribed = profileInfo.articleSubscribed;
                            var eventSubscribed = profileInfo.eventSubscribed;
                            var promoInfoSubscribed = profileInfo.promoInfoSubscribed;

                            $("#firstName p").text(firstName);
                            $("#lastName p").text(lastName);
                            $("#medicalInstitution p").text(medicalInstitution);
                            $("#phoneNumber p").text(workPhone);
                            $("#belongCourse p").text(speciality);
                            $("#occupation p").text(occupation);
                            $("#positionRole p").text(designation);
                            $("#emailAddress p").text(email);
                            if (articleSubscribed == "true") {

                                $("#myProfileNewsletter #articleSubscribed").show();
                            }

                            if (eventSubscribed == "true") {

                                $("#myProfileNewsletter #eventsSubscribed").show();
                            }

                            if (promoInfoSubscribed == "true") {

                                $("#myProfileNewsletter #promoSubscribed").show();
                            }

                        } else {
                            showApiError('#my-profile-api-error', data);
                            $(".profileContainer").hide();
                            $("#myProfileForm").parent().hide();
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