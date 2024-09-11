(function(document, $) {
    "use strict";

    $(document).on("click", ".cq-dialog-submit", function(e) {

        var imageval = $(".coral-Form-field[name='./imagePath']").val();


        if (imageval != '') {

            $(".coral-Form-field[name*='./altText']").each(function() {
                var currectAltTxt = $(this);

                var altIndx = $(this).closest('coral-multifield-item').index();
                $(".coral-Form-field[name*='./decorative']").each(function() {
                    if ($(this).closest('coral-multifield-item').index() == altIndx) {
                        if ($(this).prop('checked') == true) {
                            currectAltTxt.val("");
                            currectAltTxt.prop('required', false);
                        } else {
                            currectAltTxt.prop('required', true);
                        }
                    }
                });
            });
        }


        $(".coral-Form-field[name*='./imageCta']").each(function() {

            var imageCta = $(this).val();

            if (imageCta == 'imageUrl') {
                $(this).parent().siblings(".imagetype-showhide-target[data-showhidetargetvalue='imageUrl']").find(".coral-Form-field[name*='./targetUrl']").prop('required', true);
            } else {
                $(this).parent().siblings(".imagetype-showhide-target[data-showhidetargetvalue='imageUrl']").find(".coral-Form-field[name*='./targetUrl']").prop('required', false);
            }

            if (imageCta == 'imageUrl') {
                $(this).parent().siblings(".imagetype-showhide-target[data-showhidetargetvalue='imageUrl']").find(".coral-Form-field[name*='./targetUrlNewWindow']").prop('required', false);
            }

            if (imageCta == 'imageAnchor') {
                $(this).parent().siblings(".imagetype-showhide-target[data-showhidetargetvalue='imageAnchor']").find(".coral-Form-field[name*='./anchorValue']").prop('required', true);
            } else {
                $(this).parent().siblings(".imagetype-showhide-target[data-showhidetargetvalue='imageAnchor']").find(".coral-Form-field[name*='./anchorValue']").prop('required', false);
            }

            if (imageCta == 'imageAsset') {
                $(this).parent().siblings(".imagetype-showhide-target[data-showhidetargetvalue='imageAsset']").find(".coral-Form-field[name*='./assetValue']").prop('required', true);
            } else {
                $(this).parent().siblings(".imagetype-showhide-target[data-showhidetargetvalue='imageAsset']").find(".coral-Form-field[name*='./assetValue']").prop('required', false);
            }

            if (imageCta == 'imageVideo') {
                $(this).parent().siblings(".imagetype-showhide-target[data-showhidetargetvalue='imageVideo']").find(".coral-Form-field[name*='./mediaIdValue']").prop('required', true);
                $(this).parent().siblings(".imagetype-showhide-target[data-showhidetargetvalue='imageVideo']").find(".coral-Form-field[name*='./playerIdValue']").prop('required', true);
            } else {
                $(this).parent().siblings(".imagetype-showhide-target[data-showhidetargetvalue='imageVideo']").find(".coral-Form-field[name*='./mediaIdValue']").prop('required', false);
                $(this).parent().siblings(".imagetype-showhide-target[data-showhidetargetvalue='imageVideo']").find(".coral-Form-field[name*='./playerIdValue']").prop('required', false);
            }

            if (imageCta == 'imageYtVideo') {
                $(this).parent().siblings(".imagetype-showhide-target[data-showhidetargetvalue='imageYtVideo']").find(".coral-Form-field[name*='./videoIdValue']").prop('required', true);
            } else {
                $(this).parent().siblings(".imagetype-showhide-target[data-showhidetargetvalue='imageYtVideo']").find(".coral-Form-field[name*='./videoIdValue']").prop('required', false);
            }

            if (imageCta == 'telePhoneNumber') {
                $(this).parent().siblings(".imagetype-showhide-target[data-showhidetargetvalue='telePhoneNumber']").find(".coral-Form-field[name*='./telePhoneNumber']").prop('required', true);
            } else {
                $(this).parent().siblings(".imagetype-showhide-target[data-showhidetargetvalue='telePhoneNumber']").find(".coral-Form-field[name*='./telePhoneNumber']").prop('required', false);
            }
        });


    });

})(document, Granite.$);