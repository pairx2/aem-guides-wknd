(function(document, $) {
    "use strict";

    $(document).on("click", ".cq-dialog-submit", function(e) {

        const buttonType = $(".coral-Form-field[name='./buttonType']").val();
		if (buttonType != 'imageButton') {
            $(".coral-Form-field[name*='./jcr:title']").prop('required', true);
		} else {
            $(".coral-Form-field[name*='./jcr:title']").removeAttr('required');
		}

    });

})(document, Granite.$);