$(document).ready(function(){
    $('#successPopup').hide();
});

$(document).on('click',"#forgotPasswordSuccessButton",function () {
    $('[data-js-component="pop-up"].show .generic-modal--close')[0].click();
});

$('#secretHeader').attr("value","KHWBMJBE6XZDXFR549KGPCSDU6GCL7TP");