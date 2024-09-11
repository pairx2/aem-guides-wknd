(function(ABBOTT) {
    ABBOTT.productSearchModal = (function() { })();

    jQuery(document).ready(function () {
        var $modal = jQuery('#search-modal');

        /**
         * @function
         * @desc Opens up Search modal from header
         */
        function openModal(){
			jQuery('.card-search__input').focus();
            $modal.addClass('is-open');
        }

        /**
         * @functions
         * @desc closes the search modal
         */
        function closeModal() {
            $modal.removeClass('is-open');
        }

        // Event binding
        jQuery('#product-search-trigger').on('click', openModal);
        jQuery('#search-modal-close').on('click', closeModal);
    });
  
    
})(window.ABBOTT || (window.ABBOTT = {}));
  