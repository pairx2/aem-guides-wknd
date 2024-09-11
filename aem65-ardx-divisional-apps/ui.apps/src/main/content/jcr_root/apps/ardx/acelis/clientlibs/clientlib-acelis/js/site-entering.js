$(document).ready(function () {
    var siteEntringValue = localStorage.getItem('alreadyVisited');

 

    if(siteEntringValue == null) { 
        callBackSiteEntering();
    } 
});

 

function callBackSiteEntering() {
    if($('#siteEnteringPopupFragmentPath').length != 0) {
        if($('#siteEnteringPopupFragmentPath').hasClass('show')) {
         var continueBtn =  $('#siteEnteringPopupFragmentPath').find('a')[0];
            $(continueBtn).removeAttr("target");
            $(continueBtn).on('click', function(e) {
                e.preventDefault();
              $(".modal-backdrop").remove();

                $("#siteEnteringPopupFragmentPath").removeClass('show');
              $("#siteEnteringPopupFragmentPath").css("display", "none");
            });
        }
    } else {
        setTimeout(function () {
            callBackSiteEntering();
        }, 50);
    }
}