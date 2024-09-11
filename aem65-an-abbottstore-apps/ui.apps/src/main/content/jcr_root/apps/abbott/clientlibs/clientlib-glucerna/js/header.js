(function(GLUCERNA) {
  GLUCERNA.header = (function() {
    //
    jQuery(document).ready(function() {
      var $glucernaHeader = jQuery('.glucerna-header');
      var $window = jQuery(window);

      /**
       * @function
       * @desc Fetch cart based on below cases:
       * CASE: 1
       *    Scenario: User logged-in, it has new cartKey & default cart Key
       *    Action: Merge Cart, Set new-cart-key as default, remove new-cart-key
       * 
       * CASE: 2
       *    Scenario: User logged-in, it has new cartKey but not default cart Key
       *    Action: Set new-cart-key as default, remove new-cart-key
       * 
      */
      function getCartBySession() {
        var cookieConfig = {
          path: '/',
          domain: 'glucernastore.com',
          secure: true
        };

        var cartKey = {
          default: ABBOTT.utils.getCartKey(),
          sessionBased: ABBOTT.utils.getCartKey('abt_sesCartKey')
        };

        if(ABBOTT.utils.isUserLoggedIn()) {

          if(cartKey.sessionBased && cartKey.default) {
            // CASE: 1
            mergeCartSession(cartKey.default, cartKey.sessionBased);
            jQuery.cookie('abt_cartKey', cartKey.sessionBased, cookieConfig);
            jQuery.removeCookie('abt_sesCartKey', cookieConfig);

          } else if (cartKey.sessionBased) {
            // CASE: 2
            jQuery.cookie('abt_cartKey', cartKey.sessionBased, cookieConfig);
            jQuery.removeCookie('abt_sesCartKey', cookieConfig);

          } 
        } 
      }

    /**
     * @function
     * @desc merges the cart session after login from AEM to Magento
     * @param {String} source Old Cart Key 
     * @param {String} destination New Cart Key
    */
    function mergeCartSession(source, destination) {
      var ajaxObj = {
        url : ABBOTT.config.getEndpointUrl('GRAPH_QL'),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'store': 'glucerna',
          'Authorization' : 'Bearer ' + ABBOTT.utils.getSessionToken()
        },
        data: merge({ source: source, destination: destination })
      }

      ABBOTT.http.makeAjaxCall(ajaxObj);
    }

    /**
     * @function
     * @desc generates formated GraphQL query for merge-cart request
     * @param {Object} data add to cart keys
     * @return {String} formated GraphQL query for merge cart
     */
     function merge(data) {
        var query = "mutation { mergeCarts( source_cart_id: \"".concat(data.source, "\",  destination_cart_id: \"").concat(data.destination, "\" ) { success } }");

        query = JSON.stringify({
            query:query
        });

        return ABBOTT.utils.formatGraphQLQuery(query);
      }
      

      /**
       * @function
       * @desc event handler for header to be fixed when document is scrolled
       */
      function _onScroll() {
        if ($glucernaHeader.hasClass("is-sticky")) {
          $glucernaHeader.toggleClass("fixed-top", $window.scrollTop() > 40);
        }
      }

      // Logged in user interface changes
      ABBOTT.utils.setSimilacButtonText();

      // Event Binding
      $window.on("scroll", _onScroll);
      getCartBySession();
    });
  })();
})(window.GLUCERNA || (window.GLUCERNA = {}));
