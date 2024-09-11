jQuery(function() {
    var $flvourBtn = jQuery('.flavour-section__desc--btn'),
        $closeButton = jQuery('.popup-close');

    /**
       * @function
       * @desc Open Popup on click and scroll to top
    */
    function openPopup() {
        var $html = jQuery('html');
      

        $html.animate({
            scrollTop: $html.offset().top
        }, 'slow');

        jQuery(this)
        .siblings('.flavour-popup')
        .addClass('popup-open');
    
    }

    /**
       * @function
       * @desc Closes Popup
    */
    function closePopup() {
        jQuery(this)
        .parents('.flavour-popup')
        .removeClass('popup-open');
    }

    (function(ABBOTT) {
      
      
          var ajaxObj = {
            url: ABBOTT.config.getEndpointUrl('GRAPH_QL'),
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'store': ABBOTT.utils.storeName
            }
          };
  
          return ABBOTT.http.makeAjaxCall(ajaxObj);
  
    })(window.ABBOTT || (window.ABBOTT = {}));
    



      

    $flvourBtn.on('click',openPopup);
    $closeButton.on('click',closePopup);
}); 
    


