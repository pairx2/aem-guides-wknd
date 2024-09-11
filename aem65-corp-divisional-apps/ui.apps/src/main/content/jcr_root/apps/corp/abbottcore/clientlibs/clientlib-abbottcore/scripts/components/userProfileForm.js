$(document).ready(function () {
  if (window.location["href"].includes("onlineDirectory") && isOnPublish()) {
    setTimeout(function () {
      $(".formcontainer button[name='Search']").click();
    }, 1000);
  }
  if (
    window.location["href"].includes("showUserProfileForm") &&
    isOnPublish()
  ) {
    var token = getCookie("id_token");
    var searchUserurl = new URL($("#session-api-url").val());
    var searchUserurlOrigin = searchUserurl.origin;
    var getProfile_url = "/api/private/profile/profile-info";

    $.ajax({
      url: searchUserurlOrigin + getProfile_url,
      datatype: "json",
      type: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-Country-Code": $("input[name='x-country-code']").val(),
        "X-Application-Id": $("input[name='x-application-id']").val(),
        "x-Preferred-language": $("input[name='x-preferred-language']").val(),
        "x-id-token": token,
      },
      beforeSend: function () {
        setTimeout(function () {
          toggleLoadingSpinner();
        }, 10);
      },
      success: function (response) {
        toggleLoadingSpinner();
        var formdata = response.response;
        sessionStorage.setItem("userName", formdata["userInfo"].userName);
        sessionStorage.setItem("uid", formdata["userInfo"].uid);
        sessionStorage.setItem(
          "country",
          formdata["userInfo"]["additionalProperties"].country
        );
        setCookie(
          "retireeOption",
          formdata["userInfo"]["additionalProperties"].onlineretiree_optin,
          ""
        );
        $(".showuserprofile-form .a-input-control[name='email']").val(
          formdata["userInfo"].email
        );
        $(".showuserprofile-form .a-input-control[name='firstName']").val(
          formdata["userInfo"].firstName
        );
        $(".showuserprofile-form .a-input-control[name='lastName']").val(
          formdata["userInfo"].lastName
        );
        $(".showuserprofile-form .a-input-control[name='middleName']").val(
          formdata["userInfo"].middleName
        );
        $(".showuserprofile-form .a-input-control[name='lineOne']").val(
          formdata["userInfo"].street
        );
        $(".showuserprofile-form .a-input-control[name='division']").val(
          formdata["userInfo"]["additionalProperties"].division
        );
        $(".showuserprofile-form .a-input-control[name='city']").val(
          formdata["userInfo"]["additionalProperties"].city
        );
        $(".showuserprofile-form .a-input-control[name='state']").val(
          formdata["userInfo"]["additionalProperties"].state
        );
        $(".showuserprofile-form .a-input-control[name='zipCode']").val(
          formdata["userInfo"]["additionalProperties"].zip
        );
        $(".showuserprofile-form .a-input-control[name='number']").val(
          formdata["userInfo"]["additionalProperties"].phoneNumber
        );
        $(
          ".showuserprofile-form .a-input-control[name='dateofretirement']"
        ).val(formdata["userInfo"]["additionalProperties"].retirementDate);
        $(".showuserprofile-form .a-input-control[name='yearsOfService']").val(
          formdata["userInfo"]["additionalProperties"].yearsOfService
        );

        var country_name = formdata["userInfo"]["additionalProperties"].country;
        var countrySplit = country_name.split(" ");
        var countrySplitted;
        if (countrySplit.length > 1) {
          countrySplitted = countrySplit[0] + "_" + countrySplit[1];
        } else {
          countrySplitted = country_name;
        }
        $(".showuserprofile-form .options .a-dropdown__menu[name='Country']")
          .parent()
          .children(".a-dropdown-selected")
          .text(formdata["userInfo"]["additionalProperties"].country);
        $(
          ".showuserprofile-form .options .a-dropdown__menu[name='Country'] li"
        ).removeClass(" selected");

        $(
          ".showuserprofile-form .options .a-dropdown__menu[name='Country'] li"
        ).filter(function () {
          if ($(this).data("optionvalue").match(countrySplitted)) {
            $(this).addClass("selected");
          }
        });
        $(
          ".showuserprofile-form .options .a-dropdown__menu[name='information']"
        )
          .parent()
          .children(".a-dropdown-selected")
          .text(
            formdata["userInfo"]["additionalProperties"].onlineretiree_optin
          );
        $(
          ".showuserprofile-form .options .a-dropdown__menu[name='information'] li"
        ).removeClass(" selected");
        $(
          ".showuserprofile-form .options .a-dropdown__menu[name='information'] li"
        ).filter(function () {
          if (
            $(this)
              .data("optionvalue")
              .match(
                formdata["userInfo"]["additionalProperties"].onlineretiree_optin
              )
          ) {
            $(this).addClass("selected");
          }
        });
        if(formdata["userInfo"]["additionalProperties"]["showfields"]) {
          $("fieldset .a-checkbox input[type='checkbox']").prop("checked", false);
          if(formdata["userInfo"]["additionalProperties"]["showfields"].includes("email_address")) {
            $("fieldset .a-checkbox input[value='Email']").prop("checked", true);
          }
          if(formdata["userInfo"]["additionalProperties"]["showfields"].includes("phone_number")) {
            $("fieldset .a-checkbox input[value='Phone Number']").prop("checked", true);
          }
          if(formdata["userInfo"]["additionalProperties"]["showfields"].includes("division_retiree")) {
            $("fieldset .a-checkbox input[value='Division']").prop("checked", true);
          }
          if(formdata["userInfo"]["additionalProperties"]["showfields"].includes("homeaddress_retiree")) {
            $("fieldset .a-checkbox input[value='Home Address']").prop("checked", true);
          }
          if(formdata["userInfo"]["additionalProperties"]["showfields"].includes("show_user_photo")) {
            $("fieldset .a-checkbox input[value='Photo']").prop("checked", true);
          }		  
        }
	    //show profile pic in my account page
          if(formdata.userInfo.picture != "" && formdata.userInfo.picture != null && !formdata.userInfo.picture.includes('/user-photos/default.jpg')){
              showprofilePic(formdata.userInfo.picture,function(bytes){
                  $('#viewImage img').attr('src', `data:image/png;base64,${bytes}`);
              });
          }	
       
      },
    });
  }
  if (
    window.location["href"].includes("updateProfileSuccess") &&
    isOnPublish()
  ) {
    setOnlineRetireeOption();
  }
});
