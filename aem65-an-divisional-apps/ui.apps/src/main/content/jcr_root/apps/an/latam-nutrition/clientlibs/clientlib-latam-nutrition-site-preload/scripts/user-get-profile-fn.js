// **************************
// My Info Section
// **************************

/**
 * @function
 * Summary: Function that executes before triggering API call
 * Parameters: data -> payload
 */
 function onUpdateLatamNutritionGetProfile(data) {
    let successfulLogin = getItemLocalStorage('cJwt',true);
    data.headers['x-id-token'] = successfulLogin;
}

function onSuccessLatamnutritionGetProfile(data) {
    if (data.errorCode == 0) {
        let userDetails = {
            ...data.response.userInfo,
            number : data.response.contacts["number"],
            zipCode: data.response.addresses["zipCode"],
            country: data.response.addresses["country"],
            lineOne: data.response.addresses["lineOne"]
        }
        setItemLocalStorage("userDetails", userDetails);
  	}
}