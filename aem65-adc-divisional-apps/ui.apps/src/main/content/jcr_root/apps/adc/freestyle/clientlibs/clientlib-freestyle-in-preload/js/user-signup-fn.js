/**
 * MYFREESTYLE - USER REGISTRATION
 **/

/**
 * @function
 * Summary: Called before request, to update the payload.
 * Parameters: data {Object} initial payload generated from form-container.
 */
function updateRequestMyFreestyleSignup(data) {

  const getUtmSource = getUrlParameter('utm_source');
  if (getUtmSource && getUtmSource !== "") {
    data.body['sourceSystem'] = getUtmSource;
  }

  //removed extra data
  delete data.body['requestType'];
  delete data.body['node'];

  //final registration data
  return data;
}
