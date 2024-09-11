/**
 * Extension to the standard dropdown/select dropDownComponent. It enables showing/hiding of other dialog tabs based on the
 * selection made in the dropdown.
 *
 * How to use:
 *
 * - add the class cq-dialog-tab-showhide (in addition to any existing class from parent core component or existing) to the dropdown/select element
 * - add the data attribute dep-value to the dialog tab which is to be hidden/shown on the dropdown selection, value should be the
 *   value of the select
 */
/*globals Granite,Coral*/
(function ($, document) {

        'use strict';
     $(document).on("change",'.cmp-image__editor coral-checkbox[name="./isDecorative"]', function(event) {
           if (event.target) {
            	if (event.target.checked) {
		 			$('coral-checkbox[name="./altValueFromDAM"]').prop("checked",false);
            	}
        	}
    	});
    }

)(Granite.$, document);