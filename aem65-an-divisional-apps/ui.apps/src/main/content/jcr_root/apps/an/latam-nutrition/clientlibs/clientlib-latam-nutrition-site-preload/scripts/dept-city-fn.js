function onSuccessDeptCity(data) {
    if (data.errorCode == 0) {
      let fullResponse = data.response;
      if (fullResponse) {
        setItemLocalStorage('deptCityResponse', JSON.stringify(fullResponse), true);
      } 
    } else {
      onErrorDeptCity(data);
    }
}
  
  
  /**
   * @function
   * Summary: Called before login request, to update the payload.
   * Parameters: data {Object} initial payload generated from form-container.
   */ 
  function updateRequestDeptCity(data) {
    delete data.body['requestType'];
    delete data.body['node'];
    return data;
  }

  /**
   * @function
   * Summary: Called on error response of login. 
   * Parameters: error {Object} is the API response.
   */
  function onErrorDeptCity(error) {
    removeItemLocalStorage('deptCityResponse', true);
  }