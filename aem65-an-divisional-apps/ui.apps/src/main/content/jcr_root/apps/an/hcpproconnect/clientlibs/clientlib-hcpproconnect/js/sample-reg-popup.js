function checkformspage()
{
    if ($("#book-meeting-form-container").length > 0 || $("#dynamometerForm").length > 0) {
        if (isCountryCodeUK()) {
            $("#initial-registration-popup-xf").remove();
        }
    }
}
$(document).ready(function(){
	if((window.location.pathname === '/uk/en/home.html') && sessionStorage.getItem('openRegistrationPopup')){
      $("body").css("overflow", "hidden");
      $("#initial-registration-popup-xf").show();
      sessionStorage.removeItem('openRegistrationPopup');
   }
   if(window.location.pathname === '/uk/en/initial-registration.html') {
      setTimeout(function() {
         showSampleOrderRegistrationPopup();
      },100);
   }

    checkformspage();

	$(document).on("click", "#site-entering-sample-order-popup-xf-modal[data-js-component='pop-up'].show .generic-modal--close", function (e) {
      $("#site-entering-sample-order-popup-xf-modal").removeClass('show').hide();
      $(".modal-backdrop").removeClass("show");
      $(".modal-dialog").removeClass("sign-up-modal");
      $("html").css('overflow', 'auto');
   });	
   $(document).on("click", "#sample-order-registration-popup-xf-modal[data-js-component='pop-up'].show .generic-modal--close", function (e) {
      $("#sample-order-registration-popup-xf-modal").removeClass('show').hide();
      $(".modal-backdrop").removeClass("show");
      $(".modal-dialog").removeClass("sign-up-modal");
      $("html").css('overflow', 'auto');
   });
   $(document).on("click", ".SampleSignupredirect", function (e) {
      e.preventDefault();
      $("body").css("overflow", "hidden");
      $("#initial-registration-popup-xf").show();
   });
   
   $(document).on("click", "nav[role='tablist'] a[aria-label='Register'].show.active", function (e) {
      showSampleOrderRegistrationPopup();
   });

setTimeout(function () {
if(isCountryCodeUK() && ($("input[name=x-application-id]").val()!="anpatientcarers"))  { 
if ((!isUserLoggedIn()) && (!isLiteUser) && null ==sessionStorage.getItem('samplesiteentering') && $("#initialRegistrationForm").length < 1 && $("#accountActivationErrorMsg").length < 1 )	
{
	sessionStorage.setItem("samplesiteentering", "Yes");
    $("body").css('overflow', 'hidden');
    $("#site-entering-sample-order-popup-xf-modal").addClass('show').attr("aria-modal", "true").show();
    if (!$(".modal-backdrop").length) {
        $("body").append('<div class="modal-backdrop show"></div>');
    } 
	else {
        $(".modal-backdrop").show();
    }
	  
   }
}
   }, 20000);
    
});

function showSampleOrderRegistrationPopup() {
   if(isCountryCodeUK() && (!isUserLoggedIn()) && (!isLiteUser))  { 
      $("body").css('overflow', 'hidden');
    $("#sample-order-registration-popup-xf-modal").addClass('show').attr("aria-modal", "true").show();
    if (!$(".modal-backdrop").length) {
       $("body").append('<div class="modal-backdrop show"></div>');
    } 
    else {
       $(".modal-backdrop").show();
       $(".modal-backdrop").addClass('show');
    }
 }
}