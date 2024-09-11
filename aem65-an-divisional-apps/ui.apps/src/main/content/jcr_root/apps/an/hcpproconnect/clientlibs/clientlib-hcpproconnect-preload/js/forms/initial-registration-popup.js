$(document).ready(function(){
    if(isCountryCodeUK()) {
        let buttonClose = `<div>
                            <span class="generic-modal--close"
                            data-dismiss="modal"
                            aria-label="Close">
                            <i id="closeInitialRegistrationPopup"
                            aria-hidden="true"
                            class="abt-icon abt-icon-cancel"></i>
                            </span>
                            </div>`;

        $("#initialRegistrationFormPopup").append(buttonClose);
        initRegistrationPopup();

       $("#closeInitialRegistrationPopup").bind('click', function(e) {
           e.preventDefault();
           $("#initial-registration-popup-xf").hide();
           $("body").css('overflow', 'auto');

           if($('.modal-backdrop').length > 0) {
               setTimeout(function () {
                   $('.modal-backdrop').show();
                   $("body").css('overflow', 'hidden');
               }, 50);
           }
       });
    }
});

