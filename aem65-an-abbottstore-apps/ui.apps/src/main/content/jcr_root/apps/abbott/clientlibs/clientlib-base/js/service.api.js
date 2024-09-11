(function(ABBOTT) {
  var AjaxService = function() {};

  /**
   * @function
   * @description AJAX Call and return response object.
   *              To call this function: ABBOTT.http.makeAjaxCall(CONFIG_OBJECT);
   * @param {Object} opts
   */
  AjaxService.prototype.makeAjaxCall = function(opts) {
    var config = {
      method: 'GET',
      dataType: 'json'
    };

    // Extends ajax params
    config = jQuery.extend({}, config, opts);

    // Throw error if no URL
    if (!opts.url) {
      return jQuery.error('Please pass URL for the Ajax call');
    }

    // Return Ajax Promise Object
    return jQuery.ajax(config)
      .done(function(data) {
        return data;
      })
      .fail(function(data) {
        return data;
      });
  };

  ABBOTT.http = new AjaxService();
})(window.ABBOTT || (window.ABBOTT = {}));
