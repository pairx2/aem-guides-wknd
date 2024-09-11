$(document).ready(function(){

    $(document).on("click", "#footer-contact-us", function(){
        let dataTarget_3 = $(this).find(".m-popup").attr('data-target');
        $(dataTarget_3).removeClass('modal-popup--fixedwidth');
    });

});