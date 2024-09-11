/**
 * Meridian SSO
 **/
$(document).ready(function () {

  // add "meridian-link" class to all merdian links & assign click event
  meridianLinkAssignEvent();

  $(document).on('click', '.meridian-link' , function(e) {
    let mlink = $(this).find('a').attr('href');
    let isMedianSecureConn = getItemSessionStorage('mSecure') == 'true' ? true : false;
    let mJwt = getItemSessionStorage('mJwt');

    // trigger form submit
    if (!isMedianSecureConn && mJwt) {
      e.preventDefault();
      meridianSecureConnForm(mlink);
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
  let meridianDomain = document.querySelector('[name="meridian-sso-domain"]').value;
  let mApiEndpoint = meridianDomain + '/default.aspx?ReturnUrl=' + encodeURIComponent(getParam);

  let mJwt = getItemSessionStorage('mJwt');

  let meridianFormTemplate = `
    <form method="post" id="meridianssoform" action="${mApiEndpoint}" target="_blank">
        <input type="hidden" name="HTTP_AUTHORIZATION" value="${mJwt}">
        <input type="submit">
    </form>`;

  document.body.insertAdjacentHTML('beforeend', meridianFormTemplate);
  $('#meridianssoform').trigger('submit');

  setItemSessionStorage('mSecure', true);
}
