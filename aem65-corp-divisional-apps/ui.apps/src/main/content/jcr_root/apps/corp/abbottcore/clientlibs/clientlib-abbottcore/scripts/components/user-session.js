$(document).ready(function () {
  if (window.location["href"].includes("secure") && isOnPublish()) {
    if (getCookie("userInfo")) {
      $(".linkstack--user-info .m-link-stack--title span.user-name").text(
        JSON.parse(getCookie("userInfo")).userInfo.firstName +
          " " +
          JSON.parse(getCookie("userInfo")).userInfo.lastName
      );
    }
    var currentTime = new Date();
    var userLogoutTimeCheck = new Date(getCookie("userLogoutTime"));
    var baseURL = new URL($("#session-api-url").val());
    var base_domain = baseURL.origin;
    var extend_session_api = "/api/private/profile/extend-session";

    // update session cookies on extend session
    function updateSessionCookieExtend(apiEndpoint, enableValue) {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-Country-Code": $("input[name='x-country-code']").val(),
          "X-Application-Id": $("input[name='x-application-id']").val(),
          "x-Preferred-language": $("input[name='x-preferred-language']").val(),
          "x-id-token": getCookie("id_token"),
        },
        mode: "cors",
        cache: "no-cache",
      };
      fetch(apiEndpoint + "?enable=" + enableValue, requestOptions).then(
        function (response) {
          toggleLoadingSpinner();
          return response;
        }
      );
    }

    // If session time is more than 50 minutes
    if (currentTime >= userLogoutTimeCheck) {
      $.ajax({
        url: base_domain + extend_session_api,
        type: "POST",
        dataType: "json",
        headers: {
          "Content-Type": "application/json",
          "x-Country-Code": $("input[name='x-country-code']").val(),
          "X-Application-Id": $("input[name='x-application-id']").val(),
          "x-Preferred-language": $("input[name='x-preferred-language']").val(),
          "x-id-token": getCookie("id_token"),
        },
        data: JSON.stringify({
          refresh_token: getCookie("refresh_token"),
        }),
        beforeSend: function () {
          // setting a timeout
          setTimeout(function () {
            toggleLoadingSpinner();
          }, 10);
        },
        success: function (data) {
          if (data.errorCode == 0) {
            setCookie("id_token", data.response.id_token, "");
            var userLogoutTime = new Date();
            userLogoutTime.setTime(userLogoutTime.getTime() + 50 * 60 * 1000);
            setCookie("userLogoutTime", userLogoutTime, "");
            var searchUserurlOriginLogout =
              "https://" + $(location).attr("hostname");
            var session_urlLogout = "/api/private/profile/session";
            var sessionApiUrlLogout =
              searchUserurlOriginLogout + session_urlLogout;
            updateSessionCookieExtend(sessionApiUrlLogout, true);
          } else {
            window.location.href = "/login/logout.html";
          }
        },
        error: function () {
          window.location.href = "/login/logout.html";
        },
      });
    }
  }
  if (window.location["href"].includes("login-sso") && isOnPublish()) {
    //setting session function  Admin Login
    function updateSessionCookieAdminLogin(apiEndpoint, enableValue) {
      const requestOptions = {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "x-Country-Code": $("input[name='x-country-code']").val(),
          "X-Application-Id": $("input[name='x-application-id']").val(),
          "x-Preferred-language": $("input[name='x-preferred-language']").val(),
          "x-id-token": getUrlParameterAdmin("id_token"),
        },
        mode: 'cors',
        cache: 'no-cache'
        
        };
        fetch(apiEndpoint + "?enable=" + enableValue, requestOptions)
        .then(function(response) {
          if (response.status == 200) {
            window.location.href = "/secure/manage/activateRetiree.html";
         }
        toggleLoadingSpinner();
        return response;
      });
    }

    if (getUrlParameterAdmin("id_token")) {
      setTimeout(function () {
        toggleLoadingSpinner();
      }, 10);
      setCookie("id_token", getUrlParameterAdmin("id_token"), "");
      setCookie("refresh_token", getUrlParameterAdmin("access_token"), "");
      var userLogoutTimeAdmin = new Date();
      userLogoutTimeAdmin.setTime(
        userLogoutTimeAdmin.getTime() + 50 * 60 * 1000
      );
      setCookie("userLogoutTime", userLogoutTimeAdmin, "");
      var searchUserurlOriginAdmin = "https://" + $(location).attr("hostname");
      var session_urlAdmin = "/api/private/profile/session";
      var sessionApiUrlAdmin = searchUserurlOriginAdmin + session_urlAdmin;
      updateSessionCookieAdminLogin(sessionApiUrlAdmin, true);
    }
  }
});
