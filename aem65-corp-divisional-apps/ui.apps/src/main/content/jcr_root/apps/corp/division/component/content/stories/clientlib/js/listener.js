(function (document, $) {
    "use strict";  
    $(document).on("foundation-contentloaded", function (e) {
        setTimeout(function(){
        loadHubStoriesDialogTab2();
        var parentDiv = $(".storyType").parent().parent().parent();
		showHidePanels($(parentDiv));
        },100);
    });

    $(document).on("change","coral-checkbox[name$='./dynamicData']", function(e){
        loadHubStoriesDialogTab2();
    });

    $(document).on("change", ".storyType", function (e) {
      const $parentDiv = $(this).parent();
	  $parentDiv.find('coral-checkbox[name$="./dynamicData"]').attr('checked', false);
      loadHubStoriesDialogTab2();
      showHidePanels($(this));
   });


   $(document).on("click", ".coral-Button.coral-Button--secondary", function (e) {
      loadHubStoriesDialogTab2();
      showHidePanels($(this));
   });

	  function showHidePanels(el) {
      setTimeout(function () {
		 $('input[name$="./storyType"]').each(function(){
         const $parentDiv = $(this).parent().parent().parent();
         var value = $parentDiv.find('input[name$="./storyType"]').val();
         var optionValue = $parentDiv.find('input[name$="./videoType"]').val();

         if (value == "imageStory") {
             console.log("Img");
            $parentDiv.find('input[name$="./videoType"]').parent().parent().hide();
            $parentDiv.find('input[name$="./playerId"]').parent().hide();
            $parentDiv.find('input[name$="./mediaId"]').parent().hide();
            $parentDiv.find('textarea[name$="./videoScript"]').parent().hide();
            $parentDiv.find('coral-checkbox[name$="./dynamicData"]').parent().show();
            $parentDiv.find('input[name$="./rootPath"]').parent().hide();
            $parentDiv.find('input[name$="./storyLink"]').parent().hide();

         } else if (value == "videoStory" && optionValue == "limelightvideo") {
             console.log("Vid LL");
            $parentDiv.find('input[name$="./videoType"]').parent().parent().show();
            $parentDiv.find('input[name$="./playerId"]').parent().show();
            $parentDiv.find('input[name$="./mediaId"]').parent().show();
            $parentDiv.find('textarea[name$="./videoScript"]').parent().hide();
            $parentDiv.find('coral-checkbox[name$="./dynamicData"]').parent().hide();
            $parentDiv.find('foundation-autocomplete[name$="./storyLink"]').parent().hide();
            $parentDiv.find('foundation-autocomplete[name$="./rootPath"]').parent().hide();

         } else if (value == "videoStory" && optionValue == "youtube") {
             console.log("Vid YT");
            $parentDiv.find('input[name$="./videoType"]').parent().parent().show();
            $parentDiv.find('input[name$="./playerId"]').parent().hide();
            $parentDiv.find('input[name$="./mediaId"]').parent().hide();
            $parentDiv.find('textarea[name$="./videoScript"]').parent().show();
            $parentDiv.find('coral-checkbox[name$="./dynamicData"]').parent().hide();
            $parentDiv.find('foundation-autocomplete[name$="./storyLink"]').parent().hide();
            $parentDiv.find('foundation-autocomplete[name$="./rootPath"]').parent().hide();

         }
         });

      }, 100)
   }

    function loadHubStoriesDialogTab2(){
        $('coral-checkbox[name$="./dynamicData"]').each(function(){
            const $parentDiv = $(this).parent().parent();
            if($(this).attr('checked')){
                $parentDiv.find('foundation-autocomplete[name$="./rootPath"]').parent().show();
                $parentDiv.find('input[name$="./storyHeadline"]').parent().hide();
                $parentDiv.find('coral-select[name$="./titleColor"]').parent().hide();
                $parentDiv.find('foundation-autocomplete[name$="./storyLink"]').parent().hide();
                $parentDiv.find('foundation-autocomplete[name$="./storyImage"]').parent().hide();
                $parentDiv.find('input[name$="./altText"]').parent().hide();
                $parentDiv.find('input[name$="./storyTitle"]').parent().hide();
                $parentDiv.find('textarea[name$="./storyDescription"]').parent().hide();
            } else {
                $parentDiv.find('foundation-autocomplete[name$="./rootPath"]').parent().hide();
                $parentDiv.find('input[name$="./storyHeadline"]').parent().show();
                $parentDiv.find('coral-select[name$="./titleColor"]').parent().show();
                $parentDiv.find('foundation-autocomplete[name$="./storyLink"]').parent().show();
                $parentDiv.find('foundation-autocomplete[name$="./storyImage"]').parent().show();
                $parentDiv.find('input[name$="./altText"]').parent().show();
                $parentDiv.find('input[name$="./storyTitle"]').parent().show();
                $parentDiv.find('textarea[name$="./storyDescription"]').parent().show();
            }
        });
    }


   	$(document).on("change", ".videoType", function (e) {
      	showHideVideoOptions($(this));
   });

   function showHideVideoOptions(el) {
      setTimeout(function () {

         const $parentDiv = el.parent().parent().parent();
         var value = $parentDiv.find(".videoType").val();
         if (value == "limelightvideo") {
            $parentDiv.find('input[name$="./playerId"]').parent().show();
            $parentDiv.find('input[name$="./mediaId"]').parent().show();
            $parentDiv.find('textarea[name$="./videoScript"]').parent().hide();
         } else if (value == "youtube") {
            $parentDiv.find('input[name$="./playerId"]').parent().hide();
            $parentDiv.find('input[name$="./mediaId"]').parent().hide();
            $parentDiv.find('textarea[name$="./videoScript"]').parent().show();
         }

      }, 100)
   }


})(document, Granite.$);