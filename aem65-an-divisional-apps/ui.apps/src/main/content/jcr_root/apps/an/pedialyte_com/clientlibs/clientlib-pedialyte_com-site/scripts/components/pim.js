$(document).ready(function() {
  $(".a-column-control--base .ps-online-tab").css("max-width", "100%");
  let checkForm = setInterval(function() {
    if ($("#pim-form") && $("#pim-form").length) {
      clearInterval(checkForm);
      let productsForm = $("#pim-form");
      productsForm.parents(".formcontainer").hide();
      productsForm
        .find(
          '.o-form-container__element .o-form-container__buttons .btn[type="submit"]'
        )[0]
        .click();
    }
  }, 100);
});