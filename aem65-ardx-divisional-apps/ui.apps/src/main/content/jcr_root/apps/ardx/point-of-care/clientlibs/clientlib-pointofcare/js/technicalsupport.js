$(document).ready(function () {
  if ($("#technical-support").length != 0) {
    $(".tech-support-content").hide();
    let input_length = $("[name='technical-support']").length;
    let techSptxApplicationId = $('input[name="x-application-id"]').val();
    let techSptxCountryCode = $('input[name="x-country-code"]').val();
    let techSptxPreferredLanguage = $('input[name="x-preferred-language"]').val();
    let action = window.location.origin + '/content/dam/ardx/gpoc/support/techsupport.json';

    if (input_length >= 1) {
      $.ajax({
        url: action,
        method: "GET",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        headers: {
          "x-application-id": techSptxApplicationId,
          "x-country-code": techSptxCountryCode,
          "x-preferred-language": techSptxPreferredLanguage
        },
      }).then(function (data) {
        let countryData = [];
        for (const element of data) {
          countryData.push(element);
          let appendli = `<li><span>${element.country}</sapn></li>`;
          $("[name='technical-support']").append(appendli);
        }
        $("[name='technical-support']")
          .closest(".a-dropdown__field")
          .find("span")
          .on("DOMSubtreeModified", function () {
            let selectValue = $(this)?.text()?.trim();
            selectToggling(selectValue);
            callselectvalue(countryData, selectValue);
          });  
      });
    }
  }
});
function callselectvalue(countryData, selectValue){
  for (const element of countryData) {
    if (selectValue == element.country) {
     covidAppendTags(element);
     auotcemailAppendAttr(element);
    }
  }
}
function covidAppendTags(element) {
    if(element.otclabel){
      $("[id='covid-19']").html(
      `<strong> ${element.otclabel}</strong>`
      );
    }
    let covidDesc = $("[id='covid-19']").find("#covid-desc");
    if( covidDesc.length === 0){
        $("[id='covid-19']").append(`<span id="covid-desc"></span>`);
    }
    $("[id='telephone']").find("span")?.html("");
    $("[id='telephone']").append(
      `<span> ${element.phone}</span>`
    );
    $("[id='opening-hrs']").find("span")?.html("");
    $("[id='opening-hrs']").append(
      `<span> ${element.hours}</span>`
    );
}

function selectToggling(selectValue) {
  if (selectValue != "") {
    $(".tech-support-content").show();
  } else {
    $(".tech-support-content").hide();
  }
}

function auotcemailAppendAttr(element) {
  if (element.otcphone == "") {
    $("[id='covid-19']").hide();
  } else {
    $("[id='covid-19']").show();
    $("[id='covid-19']").find("#covid-desc")?.html("");
    $("#covid-desc").append(
      `<span > ${element.otcphone}<br><a href="mailto:${element.otcemail}"> ${element.otcemail}</a> </span>`
    );
  }
}
function assignValotclabel(element){
  if(element.otclabel){
    $("[id='covid-19']").html(
   `<strong> ${element.otclabel}</strong>`
   );
 }
}