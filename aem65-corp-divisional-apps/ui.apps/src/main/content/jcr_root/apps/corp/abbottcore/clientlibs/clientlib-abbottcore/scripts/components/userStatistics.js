$(document).ready(function () {
  if (window.location["href"].includes("user-statistics")) {
    var tokens = getCookie("id_token");
    var searchUserurl = new URL($("#session-api-url").val());

    var searchUserurlOrigin = searchUserurl.origin;

    var getStatistics_url = "/api/private/profile/search-users";

    var getStatisticApiUrl = searchUserurlOrigin + getStatistics_url;
    var dataJSON = {
      searchType: "userStatistics",
    };
    $.ajax({
      url: getStatisticApiUrl,
      datatype: "json",
      type: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-Country-Code": $("input[name='x-country-code']").val(),
        "X-Application-Id": $("input[name='x-application-id']").val(),
        "x-Preferred-language": $("input[name='x-preferred-language']").val(),
        "x-id-token": tokens,
      },
      data: JSON.stringify(dataJSON),
      beforeSend: function () {
        setTimeout(function () {
          toggleLoadingSpinner();
        }, 10);
      },
      success: function (response) {
        toggleLoadingSpinner();
        var formdata = response.response;
        $(".conf-count").text(formdata["totalNoOfUsers"]);
        $(".enabled-count").text(formdata["enabledUsers"]);
      },
    });
  }
});
