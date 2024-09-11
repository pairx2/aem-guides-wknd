$(document).ready(function(){
	if(!isUserLoggedIn())
    {
	   if( null != localStorage.getItem('alreadyVisited') && 
			(null ==sessionStorage.getItem('rememberhcpchoice') && null ==localStorage.getItem('rememberhcpchoice') ))
		{
			removeLocalStorage("alreadyVisited");
		}
	}
});


$(document).on('click', "#hcpConfirmed, #nonhcp", function () {
    let valueofrememberchoice = $('#rememberHcpChoice-options').find('.a-checkbox__input');
    if($(valueofrememberchoice).is(':checked')) {
        setLocalStorage("rememberhcpchoice", "Yes");
    } else {
        sessionStorage.setItem("rememberhcpchoice", "Yes");
    }

    $('[data-js-component="pop-up"].show .generic-modal--close')[0].click();
});