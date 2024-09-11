(function(ABBOTT){
  ABBOTT.calculator = (function(){});

  jQuery(function () {
    // On Document ready
    jQuery(document).ready(function(){
        var $subcriptionCalculatorItem = jQuery('.subscription-calculator-item');

        /**
         * @function
         * @description Toggle active and semi-active classes on each Item click
         */
        function calculateSubscription() {
          var $this = jQuery(this);
          var category = ($this.index() + 1) / 3;
          var index = (Math.ceil(category) * 3) - 3;
          var length = Math.ceil(category) * 3;

          $subcriptionCalculatorItem.removeClass('active').removeClass('semi-active');
          $this.addClass('active');
          
          for (index ; index < length ; index++) {
            $subcriptionCalculatorItem.eq(index).addClass('semi-active');
          }
        }
        
        // Event Binding
        $subcriptionCalculatorItem.on('click', calculateSubscription);
        
        // Trigger click First Item if present
        $subcriptionCalculatorItem.eq(0).length && $subcriptionCalculatorItem.eq(0).trigger('click');
    });
  });
})(window.ABBOTT || (window.ABBOTT = {}));