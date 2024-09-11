(function(document, $) {
    "use strict";
    $(document).on("click", ".cq-dialog-submit", function(e) {

        $(".coral-Form-field[name*='./urlAction']").each(function() {

            var buttontype = $(this).val();

            if (buttontype == 'openUrl') {
                $(this).parent().siblings(".urlaction-showhide-target[data-showhidetargetvalue='openUrl']").find(".coral-Form-field[name*='./url']").prop('required', true);
            } else {
                $(this).parent().siblings(".urlaction-showhide-target[data-showhidetargetvalue='openUrl']").find(".coral-Form-field[name*='./url']").prop('required', false);
            }

            if (buttontype == 'gotoAnchor') {
                $(this).parent().siblings(".urlaction-showhide-target[data-showhidetargetvalue='gotoAnchor']").find(".coral-Form-field[name*='./anchorName']").prop('required', true);
            } else {
                $(this).parent().siblings(".urlaction-showhide-target[data-showhidetargetvalue='gotoAnchor']").find(".coral-Form-field[name*='./anchorName']").prop('required', false);
            }
            if (buttontype == 'downloadAsset') {
                $(this).parent().siblings(".urlaction-showhide-target[data-showhidetargetvalue='downloadAsset']").find(".coral-Form-field[name*='assetUrl']").prop('required', true);
            } else {
                $(this).parent().siblings(".urlaction-showhide-target[data-showhidetargetvalue='downloadAsset']").find(".coral-Form-field[name*='assetUrl']").prop('required', false);
            }

            if (buttontype == 'playYoutubeVideo') {
                $(this).parent().siblings(".urlaction-showhide-target[data-showhidetargetvalue='playYoutubeVideo']").find(".coral-Form-field[name*='./youTubeUrl']").prop('required', true);
            } else {
                $(this).parent().siblings(".urlaction-showhide-target[data-showhidetargetvalue='playYoutubeVideo']").find(".coral-Form-field[name*='./youTubeUrl']").prop('required', false);
            }

            if (buttontype == 'playLimelightVideo') {
                $(this).parent().siblings(".urlaction-showhide-target[data-showhidetargetvalue='playLimelightVideo']").find(".coral-Form-field[name*='./limelightPlayerId']").prop('required', true);
                $(this).parent().siblings(".urlaction-showhide-target[data-showhidetargetvalue='playLimelightVideo']").find(".coral-Form-field[name*='./limelightMediaId']").prop('required', true);
                $(this).parent().siblings(".urlaction-showhide-target[data-showhidetargetvalue='playLimelightVideo']").find(".coral-Form-field[name*='./orgId']").prop('required', true);

            } else {
                $(this).parent().siblings(".urlaction-showhide-target[data-showhidetargetvalue='playLimelightVideo']").find(".coral-Form-field[name*='./limelightPlayerId']").prop('required', false);
                $(this).parent().siblings(".urlaction-showhide-target[data-showhidetargetvalue='playLimelightVideo']").find(".coral-Form-field[name*='./limelightMediaId']").prop('required', false);
                $(this).parent().siblings(".urlaction-showhide-target[data-showhidetargetvalue='playLimelightVideo']").find(".coral-Form-field[name*='./orgId']").prop('required', false);

            }


        });



    });



})(document, Granite.$);