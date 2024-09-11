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
      setTimeout(() => {
        let popup = $('#rewardsPopup-modal');
        let visited = localStorage.getItem("alreadyVisited");
        if (window.location.href.indexOf("rewards") == -1 && popup.length > 0 && $(`#wcmMode`).val() === 'false' && visited != 'yes') {
          localStorage.setItem("alreadyVisited","yes");
          $('#rewardsPopup').parent('.m-popup').trigger('click');
        }
      }, "5000");
    });