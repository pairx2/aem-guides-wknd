$(document).ready(function () {
  var report_type;
  var report_cycle = "ALL";
  var report_startdate;
  var report_enddate;
  var searchUserurl = new URL($("#session-api-url").val());
  var searchUserurlOrigin = searchUserurl.origin;
  var urldta;
  $("#section-create-report #create-report-btn").prop("disabled", true);
  $("#create-report .container").addClass("paddingLeftRight ");

  //Get todays date
  function GetTodayDate() {
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output =
      d.getFullYear() +
      "-" +
      (("" + month).length < 2 ? "0" : "") +
      month +
      "-" +
      (("" + day).length < 2 ? "0" : "") +
      day;

    return output;
  }

  // changing the report type
  $("#report_type-options ul li").click(function () {
    $("#section-create-report .error").remove();
    report_type = $(this).attr("data-optionvalue");
    report_startdate = $(
      "#section-create-report input[name='startDate']"
    ).val();
    report_enddate = $("#section-create-report input[name='endDate']").val();
    $("#section-create-report .a-input-field--text-require").hide();

    setTimeout(function () {
      if (report_type.length > 0) {
        $("#create-report-btn").prop("disabled", false);
      } else {
        $("#create-report-btn").prop("disabled", true);
      }
    }, 100);

    if (
      report_type === "Applicant" ||
      report_type === "Judge" ||
      report_type === "Organization"
    ) {
      $("#cycle-options").css("visibility", "hidden");
      $("#section-create-report .datepicker").show();
    } else if (
      report_type === "ApplicationDetails" ||
      report_type === "Assessment"
    ) {
      $("#cycle-options").css("visibility", "visible");
      $("#section-create-report .datepicker").show();
    } else if (
      report_type === "ApplicationJudgeSummary" ||
      report_type === "ApplicationKpiTotal" ||
      report_type === "AssessmentDetails"
    ) {
      $("#cycle-options").css("visibility", "visible");
      $("#section-create-report .datepicker").hide();
    }
  });

  $(
    "#section-create-report input[name='startDate'] , #section-create-report input[name='endDate']"
  ).change(function () {
    report_startdate = $(
      "#section-create-report input[name='startDate']"
    ).val();
    report_enddate = $("#section-create-report input[name='endDate']").val();
  });

  // changing the report cycle
  $("#cycle-options .a-dropdown__field").click(function () {
    $("#cycle-options .a-dropdown__field")
      .find(".a-dropdown__menu li")
      .addClass("appCycleList");
    $(".appCycleList").click(function () {
      report_cycle = $(this).text().trim();
    });
  });

  // submitting the form
  $("#create-report-btn").click(function () {
    $("#section-create-report .error").remove();
    report_startdate = $(
      "#section-create-report input[name='startDate']"
    ).val();
    report_enddate = $("#section-create-report input[name='endDate']").val();

    function download() {
      var today = GetTodayDate();
      var downloadname = report_type + "_" + today + ".csv";
      $.ajax({
        url: urldta,
        type: "GET",
        dataType: "json",
        headers: {
          "x-Country-Code": xCountryCode,
          "X-Application-Id": xApplicationId,
          "x-id-token": jwtToken,
        },
        success: function (data) {
          let csvContent = atob(data.response);
          var blob = new Blob([csvContent], {
            type: "data:application/octet-stream;base64",
          });
          var a = document.createElement("a");
          var url = window.URL.createObjectURL(blob);
          a.href = url;
          a.download = downloadname;
          document.body.append(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
        },
      });
    }
    function downloadzip(filename, urldata) {
      $.ajax({
        url: urldata,
        type: "GET",
        dataType: "json",
        headers: {
          "x-Country-Code": xCountryCode,
          "X-Application-Id": xApplicationId,
          "x-id-token": jwtToken,
        },
        success: function (data) {
          let zipContent = data.response;
          var element = document.createElement("a");

          element.setAttribute("href", "data:text/plain;base64," + zipContent);

          element.setAttribute("download", filename);

          element.style.display = "none";

          document.body.appendChild(element);

          element.click();

          document.body.removeChild(element);
        },
      });
    }
    if (
      report_type === "ApplicationJudgeSummary" ||
      report_type === "ApplicationKpiTotal" ||
      report_type === "AssessmentDetails"
    ) {
      if (report_cycle == "" || report_cycle == undefined) {
        urldta =
          searchUserurlOrigin +
          ENDPOINTS.CREATE_REPORT +
          "?reportType=" +
          report_type;
      } else {
        urldta =
          searchUserurlOrigin +
          ENDPOINTS.CREATE_REPORT +
          "?reportType=" +
          report_type +
          "&cycleName=" +
          report_cycle;
      }
      if (report_type === "AssessmentDetails") {
        var today_date = GetTodayDate();
        var downloadnamezip = report_type + "_" + today_date + ".zip";
        downloadzip(downloadnamezip, urldta);
      } else {
        download();
      }
    } else {
      if (report_startdate.length == 0 && report_enddate.length == 0) {
        if (
          report_type === "Applicant" ||
          report_type === "Judge" ||
          report_type === "Organization"
        ) {
          urldta =
            searchUserurlOrigin +
            ENDPOINTS.CREATE_REPORT +
            "?reportType=" +
            report_type;
        } else {
          if (report_cycle == "" || report_cycle == undefined) {
            urldta =
              searchUserurlOrigin +
              ENDPOINTS.CREATE_REPORT +
              "?reportType=" +
              report_type;
          } else {
            urldta =
              searchUserurlOrigin +
              ENDPOINTS.CREATE_REPORT +
              "?reportType=" +
              report_type +
              "&cycleName=" +
              report_cycle;
          }
        }
        download();
      } else if (report_startdate.length > 0 && report_enddate.length == 0) {
        $(
          "<p class='error'>" +
            $("#endDateErrorMsg").attr("data-key-name") +
            "</p>"
        ).insertBefore("#create-report-btn-wrap");
      } else if (report_startdate.length == 0 && report_enddate.length > 0) {
        $(
          "<p class='error'>" +
            $("#startDateErrorMsg").attr("data-key-name") +
            "</p>"
        ).insertBefore("#create-report-btn-wrap");
      } else if (report_startdate.length > 0 && report_enddate.length > 0) {
        if (Date.parse(report_enddate) >= Date.parse(report_startdate)) {
          if (
            report_type === "Applicant" ||
            report_type === "Judge" ||
            report_type === "Organization"
          ) {
            urldta =
              searchUserurlOrigin +
              ENDPOINTS.CREATE_REPORT +
              "?reportType=" +
              report_type +
              "&startDate=" +
              report_startdate +
              "&endDate=" +
              report_enddate;
          } else {
            if (report_cycle == "" || report_cycle == undefined) {
              urldta =
                searchUserurlOrigin +
                ENDPOINTS.CREATE_REPORT +
                "?reportType=" +
                report_type +
                "&startDate=" +
                report_startdate +
                "&endDate=" +
                report_enddate;
            } else {
              urldta =
                searchUserurlOrigin +
                ENDPOINTS.CREATE_REPORT +
                "?reportType=" +
                report_type +
                "&startDate=" +
                report_startdate +
                "&endDate=" +
                report_enddate +
                "&cycleName=" +
                report_cycle;
            }
          }
          download();
        } else {
          $(
            "<p class='error'>" +
              $("#endDateValidationMsg").attr("data-key-name") +
              "</p>"
          ).insertBefore("#create-report-btn-wrap");
        }
      } else {
        $("<p class='error'>Date Problem !</p>").insertBefore(
          "#create-report-btn-wrap"
        );
      }
    }
  });
});
