/**
 * ALERT - COMPONENT
 **/
$(function () {
  const alertNonTimeBound = $('.m-alert[data-alert-type="non-time-bound"]');
  const alertClose = alertNonTimeBound.find('.m-alert__close-icon');
  const myAccountAlert = $('#my-account-user-info-success');

  alertClose.on('click', function () {
    if (myAccountAlert.length) {
      window.dispatchEvent(new CustomEvent("conditional-component-change", {
        detail: {
          value: false,
          var: 'userInfoUpdated'
        }
      }));
    }
    else {
      $(this).closest('.abbott-alert').hide();
    }
    //adjust mini cart window
    calculateminiOffsets(); 
  });
  
  const calculateminiOffsets = () => {
    let box = document.querySelector('.header').closest('.abbott-wrapper');
    let height = box?.offsetHeight;
    if (height > 0) {
      if(document.querySelector(".m-minicart__container.is-active"))
      {
      document.querySelector(".m-minicart__container.is-active").style.top = height + "px";
      }
      document.querySelector("#below-cart-msg").style.marginBottom = height + "px";
      document.querySelector(".m-minicart__container .m-minicart__main").style.marginBottom = "0";          
    }
  }
});
