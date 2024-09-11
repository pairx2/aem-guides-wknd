/**
 * e-learning page
 **/
$(document).ready(function () {

    let mJwt = getItemLocalStorage('mJwt', true);
    let meridianJWT = $('#myfreestyle-meridian-jwt button[name="Meridian-JWT"]');  
    let onLearnPage=$('#courseiframe')

    if(!mJwt && meridianJWT.length && isOnPublish() && onLearnPage.length){
        setTimeout(() => {
        meridianJWT.trigger('click')
    }, "1000");
    }
    else if(onLearnPage.length && isOnPublish()){
        setTimeout(() => {
            SetIframeSource()
        }, "1000");
    }
	$('#courseiframe').on('load', function(){
    $('#page-spinner').hide();
})
});