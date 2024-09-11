function handleLink() {
  this.event.preventDefault();
  let button = $(this.event.target).parent();
  $('.a-button--width-100').removeClass('a-button--primary').addClass('a-button--secondary');
  button.removeClass('a-button--secondary').addClass('a-button--primary');

  let id = $(this.event.target).attr("data-id");
  $('.verification-banner-text').removeClass('verification-section-show').addClass('verification-section-hide');
  $('#' + id).removeClass("verification-section-hide").addClass('verification-section-show');
  $(".opacity-section").addClass('adc-tech-training-add-opacity')
  $("#section-training-plus-ich-section").addClass('adc-tech-training-add-opacity')
}

$(document).ready(function () {
  let hmmUrl = $('.cmp-account-verification-container').attr('data-hmmUrl');
  if (hmmUrl) {
    $('#yes-section').html($('#yes-section').html().replace("@hmmUrl@", hmmUrl + "?customerid=" + window.btoa(getCookie("adcCustomerId"))));
  }
  const icon = $(".cmp-account-verification-banner .icon-class");
  const check = $(".cmp-account-verification-banner .jsclass");
  icon.mouseover(function () {
    $(check).removeClass("d-none");
  });
  icon.mouseleave(function () {
    $(check).addClass("d-none");
  });
  $("#hmmUrlButton").closest('.m-popup').attr("data-external-link", $("#hmmUrlButton").closest('.m-popup').attr("data-external-link") + window.btoa(getCookie("adcCustomerId")));
  
  // TechnicalTraining show/hide logic
  const TechnicalTrainingreq = getCookie('TechTrainingRequired') == "true" ? true : false ;
  if(!TechnicalTrainingreq){
    $('.hide-hr-for-private-customers').addClass('d-none');
    $('.hide-techtrain-for-private-customers').addClass('d-none');
   }
});
