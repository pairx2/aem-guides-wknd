/**********************************
Form Container
**********************************/

$(function () {

    //protien calci code
   if (isOnPublish() && $('.a-container--protein-calci-variation').length) {
        $('.a-dropdown__field ').on('click', function () {
            $('.a-dropdown__menu li').each(function () {
                if ($(this).hasClass("selected")) {
                    $(this).addClass("filter-bg");
                }
            });
        });

        $(".a-dropdown__field .a-dropdown__menu li").mouseenter(function () {
            $(".a-dropdown__menu li.selected").removeClass("filter-bg");
        });
        function calci() {
            let age = "";
            ageCalci(age);
        }
        $(".a-input-control").keypress(function (e) {
            keyPressValue(e);
        }).on("paste", function (e) {
            e.preventDefault();
        }).on("keyup", function (e) {
            if (-1 != $(this).val().indexOf(".") && $(this).val().split(".")[1].length > 2) {
                this.value = parseFloat(this.value).toFixed(2);
            }
            calci();
        });
        $('.a-dropdown__field .a-dropdown__menu li').on('click', function () {
            setTimeout(function () {
                calci();
            }, 200);
        });
    }

    //Verify email based on email provided
    //Verify email ID field to have ID: verifyEmail
    //Email ID to compare with to have ID: referenceEmail
    emailReference();
     //close other dropdowns when opening other dropdown
     $(".a-dropdown__field").click(function(){
        $('.a-dropdown__field').not(this).removeClass('active');
    })
});

function emailReference() {
    if (isOnPublish() && $('#verifyEmail').length && $('#referenceEmail').length) {
        $('#verifyEmail, #referenceEmail').on('keyup change input', function () {
            let verifyEmailHTML = $(this).parents('.form-container').find('#verifyEmail');
            let verifyEmailVal = verifyEmailHTML.val().toLowerCase();
            let referenceEmailVal = $(this).parents('.form-container').find('#referenceEmail').val().toLowerCase();
            // Settimeout to let the platform code run first
            setTimeout(function () {
                if (verifyEmailVal && verifyEmailVal.length && referenceEmailVal && referenceEmailVal.length) {
                    if (referenceEmailVal !== verifyEmailVal) {
                        let emailField = verifyEmailHTML.parents('div[data-component="input-field"]');
                        !(emailField.hasClass('validation-require') || emailField.hasClass('validation-regex')) && verifyEmailHTML.parents('div[data-component="input-field"]').addClass('validation-error');
                    } else {
                        verifyEmailHTML.parents('div[data-component="input-field"]').removeClass('validation-error');
                    }
                }
            }, 200);
        });
    }
}
function ageCalci(age) {
    $("#ageoptions-options li").each(function () {
        if ($(this).hasClass("selected")) {
            age = $(this).attr("data-optionvalue");
        }
        if (age == "(select-one)") {
            age = "";
        }
    });

    if ($("input.a-input-control").val() && age) {
        let t, output;
        t = $("input.a-input-control").val() / 2.2;
        if( age === '18'){
            t *= 0.8 ;               
        }else if( age === '65'){
            t *= 1.1 ;
        }
        output = t.toFixed(2);
        $("#proteinCalculator_output h2").html(output);
    }
}
function  keyPressValue(e){
    if ((46 != e.which || 46 == e.which && "" == $(this).val() || -1 != $(this).val().indexOf(".")) && (e.which < 48 || e.which > 57)) {
        e.preventDefault();
    }

    if (3 == $(this).val().length && 46 != e.which) {
        e.preventDefault();
    }
}