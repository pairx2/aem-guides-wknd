/**
 * Page thumbnail image and navigation image cannot be authored at the same time because of same field names i.e ./image.
 * This fixes the issue by removing the navigation image field having ./image fieldname from existing pages. A new field
 * with fieldname ./navImage is added for future use.
 *
 * To ensure, existing pages using ./image field for navigation image, the field value is copied into the new field ./navImage.
 */
(function(document, $) {
    "use strict";
    // when dialog gets injected
    $(document).on("foundation-contentloaded", function(e) {
        var eleNavImage = $(".navigation-container").find($("[class='coral-Form-field'][name='./image']"));
        if ($(eleNavImage).length > 0) {
            var navImagePath = $(eleNavImage).val();
			var pageJcrPath = $(eleNavImage).closest("form").attr("action");
			$(eleNavImage).parent().remove();
            if (navImagePath) {
                $("[name='./navImage']").val(navImagePath);				
				var dataObj = {};
				dataObj["./image"] = "";				
				$.ajax({
					type: "POST",
					url: pageJcrPath,
					data: dataObj,
					success: ""
				});				
            }
        }
    });
})(document, Granite.$);