/**
 * Meridian SSO
 **/
$(document).ready(function () {

  // add "meridian-link" class to all merdian links & assign click event
  meridianLinkAssignEvent();

  $(document).on('click', '.meridian-link' , function(e) {
    let mlink = $(this).find('a').attr('href');
    let mJwt = getItemLocalStorage('mJwt', true);
    
    // trigger form submit
    if (mJwt && mJwt !== "") {
      e.preventDefault();
      meridianSecureConnForm(mlink);
    } else {
      e.preventDefault();
      //show modal
      showhideModal('btnModalNoMeridian', 1);
    }
  });

});

/**
 * @function
 * Summary: Add class "meridian-link" & Assign Click event to all meridian links
 * Parameters: None
 */
function meridianLinkAssignEvent() {

  let meridianDomain = $('[name="meridian-sso-domain"]') ? $('[name="meridian-sso-domain"]').val() : '';

  $('.a-link a.a-link__text, .a-button a.btn').each(function () {
    let aherf = $(this).attr('href');
    if (aherf && aherf.indexOf(meridianDomain) >= 0) {
      $(this).parent().addClass('meridian-link');
    }
  });

}

/**
 * @function
 * Summary: Submit/Post function to Meridian for establishing sso connection
 * Parameters: Url {String} meridian link
 */
function meridianSecureConnForm(url) {

  let getParam = '/' + getLastItem(url);
  let getMrdId = getParam.substring(getParam.indexOf('=') + 1);
  let meridianDomain = document.querySelector('[name="meridian-sso-domain"]').value;
  let mApiEndpoint = meridianDomain + '/default.aspx?ReturnUrl=' + encodeURIComponent(getParam);

  let mJwt = getItemLocalStorage('mJwt', true);

  let meridianssoform = $(`#mrdssoform-${getMrdId}`);
  if (meridianssoform.length <= 0) {
    let meridianFormTemplate = `
    <form class="d-none" method="post" id="mrdssoform-${getMrdId}" action="${mApiEndpoint}" target="_blank">
        <input type="hidden" name="HTTP_AUTHORIZATION" value="${mJwt}">
        <input type="submit">
    </form>`;

    document.body.insertAdjacentHTML('beforeend', meridianFormTemplate);
  }
  
  $(`#mrdssoform-${getMrdId}`).trigger('submit');

}
