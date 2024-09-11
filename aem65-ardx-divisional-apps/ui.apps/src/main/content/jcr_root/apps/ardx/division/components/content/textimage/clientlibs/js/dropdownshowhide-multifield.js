(function(document, $) {
    "use strict";

    $(document).on("click", ".cq-dialog-submit", function(e) {

        let desktopImageVal;
        let desktopImageAssetPicker = $(".coral-Form-field[name='./imageAssetPicker']").prop('checked');
        if(desktopImageAssetPicker){ // if the desktop image from pathfield is enabled then pathField is mandatory
            $(".coral-Form-field[name='./imageAssetPathField']").prop('required', true);
            valueAssignDesktop();
        } else { // if the desktop image using drag-drop option then pathField is not mandatory
             $(".coral-Form-field[name='./imageAssetPathField']").prop('required', false);
             assignValDeskElse();
        }
        
        let tabletImageAssetPicker = $(".coral-Form-field[name='./tabletImageAssetPicker']").prop('checked');
        if(tabletImageAssetPicker){ // if the Tablet image from pathfield is enabled then pathField is mandatory
            $(".coral-Form-field[name='./tabletImagePathField']").prop('required', true);
            valueAssignTablet();
        } else { // if the Tablet image using drag-drop option then pathField is not mandatory
             $(".coral-Form-field[name='./tabletImagePathField']").prop('required', false);
             assignValTabletElse();
        }
       
        let mobileImageAssetPicker = $(".coral-Form-field[name='./mobileImageAssetPicker']").prop('checked');
        if(mobileImageAssetPicker){// if the Mobile image from pathfield is enabled then pathField is mandatory
            $(".coral-Form-field[name='./mobileImagePathField']").prop('required', true);
            valueAssignMob();
        } else { // if the Mobile image using drag-drop option then pathField is not mandatory
             $(".coral-Form-field[name='./mobileImagePathField']").prop('required', false);
             assignValMobElse();
        }

        // alt text is mandatory if the desktop image is available and this skips for decorative image
        if (desktopImageVal) {
            $(".coral-Form-field[name*='./altText']").each(function() {
                let altIndx = $(this).closest('coral-multifield-item').index();
                $(".coral-Form-field[name*='./decorative']").each(function() {
                    if ($(this).closest('coral-multifield-item').index() == altIndx) {
                        assignValCurAltText();
                    }
                });
            });
        }

        // if the 'image url action' is  'open URL' then 'Target URL' is mandatory
        $(".coral-Form-field[name*='./imageCta']").each(function() {
            assingnValImageCta();
        });


    });

    $(document).on("foundation-contentloaded", function(e) {
        Coral.commons.ready(function () {

            // listener for the desktopImage
            const showHideDesktopImage = function(e) {
                if($("[name='./imageAssetPicker']").prop("checked")) {
                    $("[name='./imageAssetPathField']").closest(".coral-Form-fieldwrapper").show();
                    $("[name='./desktopImage']").closest(".coral-Form-fieldwrapper").hide();
                } else {
                    $("[name='./imageAssetPathField']").closest(".coral-Form-fieldwrapper").hide();
                    $("[name='./desktopImage']").closest(".coral-Form-fieldwrapper").show();
                }
            };
            $(document).on("change", "[name='./imageAssetPicker']", showHideDesktopImage);
            showHideDesktopImage();
            // listener for the tabletImage
            const showHideTabletImage = function(e) {
                if($("[name='./tabletImageAssetPicker']").prop("checked")) {
                    $("[name='./tabletImagePathField']").closest(".coral-Form-fieldwrapper").show();
                    $("[name='./tabletImage']").closest(".coral-Form-fieldwrapper").hide();
                } else {
                    $("[name='./tabletImagePathField']").closest(".coral-Form-fieldwrapper").hide();
                    $("[name='./tabletImage']").closest(".coral-Form-fieldwrapper").show();
                }
            };
            $(document).on("change", "[name='./tabletImageAssetPicker']", showHideTabletImage);
            showHideTabletImage();
            // listener for the mobileImage
            const showHideMobileImage = function(e) {
                if($("[name='./mobileImageAssetPicker']").prop("checked")) {
                    $("[name='./mobileImagePathField']").closest(".coral-Form-fieldwrapper").show();
                    $("[name='./mobileImage']").closest(".coral-Form-fieldwrapper").hide();
                } else {
                    $("[name='./mobileImagePathField']").closest(".coral-Form-fieldwrapper").hide();
                    $("[name='./mobileImage']").closest(".coral-Form-fieldwrapper").show();
                }
            };
            $(document).on("change", "[name='./mobileImageAssetPicker']", showHideMobileImage);
            showHideMobileImage();
    });
    });

})(document, Granite.$);




function valueAssignDesktop(){
    let desktopImageVal;
    desktopImageVal = $(".coral-Form-field[name='./imageAssetPathField']").val();
    let eleDragAndDropImage = $(".coral-Form-fieldwrapper").find($("[class='coral-Form-field cq-FileUpload cq-droptarget is-filled _coral-FileUpload fileupload-is-initialized']")).find( $("input[name='./imageAsset']"));
    if ($(eleDragAndDropImage).length > 0) {
        // set the dragAndDrop Image path for desktop if path field has a valid image path
        $(eleDragAndDropImage).val(desktopImageVal);
    } else {// clear the dragAndDrop desktop image path, if path field is empty
        $('input[name="./imageAsset"]').each(function(i, el) {
        $(el).replaceWith("<input type='hidden' name='./imageAsset' data-cq-fileupload-parameter='filereference' value='"+ desktopImageVal +"'>");
        });
    }
}

function assignValDeskElse(){
    let desktopImageVal;
    let eleDragAndDropImage = $(".coral-Form-fieldwrapper").find( $("input[name='./imageAsset']"));
    desktopImageVal = $(eleDragAndDropImage).val();
   if ($(eleDragAndDropImage).length > 0 && $(".coral-Form-field[name='./imageAssetPathField']").length >0 && desktopImageVal) {
       // set the image-path field of desktop if the drag and image had valid image path
        $(".coral-Form-field[name='./imageAssetPathField']").val(desktopImageVal);
   } else if (!desktopImageVal){
       // clear the image-path field of desktop if the drag and image is not available
       $(".coral-Form-field[name='./imageAssetPathField']").val('');
   }
}

function valueAssignTablet(){
    let tabletImageVal;
    tabletImageVal = $(".coral-Form-field[name='./tabletImagePathField']").val();
    let eleDragAndDropImage = $(".coral-Form-fieldwrapper").find($("[class='coral-Form-field cq-FileUpload cq-droptarget is-filled _coral-FileUpload fileupload-is-initialized']")).find( $("input[name='./tabletImage']"));
    if ($(eleDragAndDropImage).length > 0) {
        // set the dragAndDrop Image path for tablet if path field has a valid image path
        $(eleDragAndDropImage).val(tabletImageVal);
    } else {// clear the dragAndDrop tablet image path, if path field is empty
          $('input[name="./tabletImage"]').each(function(i, el) {
             $(el).replaceWith("<input type='hidden' name='./tabletImage' data-cq-fileupload-parameter='filereference' value='"+ tabletImageVal +"'>");
           });
       }
}

function assignValTabletElse(){
    let tabletImageVal;
    let eleDragAndDropImage = $(".coral-Form-fieldwrapper").find( $("input[name='./tabletImage']"));
    tabletImageVal = $(eleDragAndDropImage).val();
    if ($(eleDragAndDropImage).length > 0 && $(".coral-Form-field[name='./tabletImagePathField']").length >0 && tabletImageVal) {
         // set the image-path field of tablet if the drag and image had valid image path
         $(".coral-Form-field[name='./tabletImagePathField']").val(tabletImageVal);
    } else if (!tabletImageVal){// clear the image-path field of tablet if the drag and image is not available
        $(".coral-Form-field[name='./tabletImagePathField']").val('');
    }
}

function valueAssignMob(){
    let mobileImageVal;
    mobileImageVal = $(".coral-Form-field[name='./mobileImagePathField']").val();
    let eleDragAndDropImage = $(".coral-Form-fieldwrapper").find($("[class='coral-Form-field cq-FileUpload cq-droptarget is-filled _coral-FileUpload fileupload-is-initialized']")).find( $("input[name='./mobileImage']"));
    if ($(eleDragAndDropImage).length > 0) {
        // set the dragAndDrop Image path for mobile if path field has a valid image path
        $(eleDragAndDropImage).val(mobileImageVal);
    } else {// clear the dragAndDrop mobile image path, if path field is empty
            $('input[name="./mobileImage"]').each(function(i, el) {
            $(el).replaceWith("<input type='hidden' name='./mobileImage' data-cq-fileupload-parameter='filereference' value='"+ mobileImageVal +"'>");
            });
        }
}

function assignValMobElse(){
    let mobileImageVal;
    let eleDragAndDropImage = $(".coral-Form-fieldwrapper").find( $("input[name='./mobileImage']"));
    mobileImageVal = $(eleDragAndDropImage).val();
    if ($(eleDragAndDropImage).length > 0 && $(".coral-Form-field[name='./mobileImagePathField']").length >0 && mobileImageVal) {
        // set the image-path field of tablet if the drag and image had valid image path
        $(".coral-Form-field[name='./mobileImagePathField']").val(mobileImageVal);
    } else if (!mobileImageVal){// clear the image-path field of mobile if the drag and image is not available
        $(".coral-Form-field[name='./mobileImagePathField']").val('');
    }
}


function assingnValImageCta(){
    let imageCta = $(this).val();
    if (imageCta == 'imageUrl') {
        $(this).parent().siblings(".imagetype-showhide-target[data-showhidetargetvalue='imageUrl']").find(".coral-Form-field[name='./targetUrl']").prop('required', true);
    } else {
        $(this).parent().siblings(".imagetype-showhide-target[data-showhidetargetvalue='imageUrl']").find(".coral-Form-field[name='./targetUrl']").prop('required', false);
    }
}

function assignValCurAltText(){
    let currectAltTxt = $(this);
    if ($(this).prop('checked') === true) {
        currectAltTxt.val('');
        currectAltTxt.prop('required', false);
    } else {
        currectAltTxt.prop('required', true);
    }
}