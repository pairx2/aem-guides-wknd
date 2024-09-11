$(document).ready(function(){
    if(isCountryCodeUK()) {
        let isLiteUser = sessionStorage.getItem('lite-user');

        if(isLiteUser === 'true')
            $("#limited-access-xf").show();

        let buttonClose = `<div>
                            <span class="generic-modal--close"
                            data-dismiss="modal"
                            aria-label="Close">
                            <i id="closeLimitedAccessPopup"
                            aria-hidden="true"
                            class="abt-icon abt-icon-cancel"></i>
                            </span>
                            </div>`;

        $("#limited-access-xf").append(buttonClose);

        $("#closeLimitedAccessPopup").click(function() {
            $("#limited-access-xf").hide();
        });
    }
});

