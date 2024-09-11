(function (document, $) {
    'use strict';
     $(document).ready(function () {
			let redirectPageUrl = $("#urlRedirect").val();
			if(redirectPageUrl != null) {
				$("#shell-propertiespage-doneactivator").attr("data-granite-form-saveactivator-href",redirectPageUrl);
				$("#shell-propertiespage-closeactivator").attr("href",redirectPageUrl);
			}
        });
})(document, Granite.$);