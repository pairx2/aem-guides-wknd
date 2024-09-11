// logics to be applied on page load
$(document).ready(function() {
  if ((document.referrer == "" || document.referrer == undefined) && $("#isthankyou").val() === "true") {
    window.location = "/";
  }
  $("#thankyouPage2").hide();
  $("#thankyouPage1").hide();

  // showing thankyou page based on level selected
  if (window.localStorage.getItem("product_level") === "level1") {
    $("#thankyouPage1").show();
  } else if (window.localStorage.getItem("product_level") === "level2") {
    $("#thankyouPage2").show();
  }
});


// removing session items
function removeLocalS(){
    window.localStorage.removeItem("product_level");
    window.localStorage.removeItem("product_name");
    }
