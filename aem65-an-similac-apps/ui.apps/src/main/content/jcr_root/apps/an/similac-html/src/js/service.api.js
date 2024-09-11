(function (win) {
  if(!win.ABBOTT){
      win.ABBOTT = {};
  }
  var ABBOTT = win.ABBOTT;
  var AjaxService = function () {
    // No definition
  };

  /**
   * @function
   * @description AJAX Call and return response object.
   *              To call this function: ABBOTT.http.makeAjaxCall(CONFIG_OBJECT);
   * @param {Object} opts
   */
  AjaxService.prototype.makeAjaxCall = function (opts, verifyemailIDC) {
   
    const verifyEmail  = verifyemailIDC ? true:false;
    var timeOut;
    if(!verifyEmail){
        timeOut=window.setTimeout(function(){ 
          $("#overlay").show();
        }, 2000);
    }
    var config = {
      method: "GET",
      dataType: "json"      
    };

    // Extends ajax params
    config = jQuery.extend({}, config, opts);

    // Throw error if no URL
    if (!opts.url) {
      return jQuery.error("Please pass URL for the Ajax call");
    }

    // Return Ajax Promise Object
    return jQuery.ajax(config)
      .done(function (data) {
        window.clearTimeout(timeOut);
        $("#overlay").hide();
        return data;
      })
      .fail(function (data) {
        $("#overlay").hide();
        window.clearTimeout(timeOut);
        return data;
      });
  };
  

  ABBOTT.getParams = function (url) {
    var params = {};
    var parser = document.createElement('a');
    parser.setAttribute('href',url)  ;
    var cleanParser = DOMPurify.sanitize('parser',{IN_PLACE:true});  
    document.appendChild(cleanParser);  
    var query = cleanParser.search.substring(1);    
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
  }

  ABBOTT.http = new AjaxService();
})(window);
