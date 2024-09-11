let rememberCheck = $('#rememberUser-options').find('.a-checkbox__input');

 $(rememberCheck).click(function () {
    if ($(rememberCheck).is(':checked')){
            localStorage.loginemail =  $('#loginEmailAddress').val();
        } else {
            localStorage.loginemail = '';
        }
    });

$(window).on("load",function(){
    if((localStorage.loginemail != undefined) && (localStorage.loginemail != '')) {
        $('#loginEmailAddress').val(localStorage.loginemail);
       $('#rememberUser-options').find('.a-checkbox__input').prop("checked", true);
    } else if((localStorage.loginemail == '') || (localStorage.loginemail == undefined)){
	$('#loginEmailAddress').val('');
    $('#rememberUser-options').find('.a-checkbox__input').prop("checked", false);
    }
});
