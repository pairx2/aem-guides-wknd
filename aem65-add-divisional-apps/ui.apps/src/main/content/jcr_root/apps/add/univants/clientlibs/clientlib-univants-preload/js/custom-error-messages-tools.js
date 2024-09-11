function showToolsApiError(specificerrorContainer, genericerrorContainer, error) {

   
    if (error.response) {
        var errorCode = error.errorCode;

        if (errorCode !== 0) {
            var i18Key, i18KeyEle;
            i18Key = (error.response.i18nMessageKey) ? error.response.i18nMessageKey : "";

            console.log("error.response: ", error.response);
            console.log("error.response.additionalProperties: ", error.response.additionalProperties);
            console.log("i18Key: ", i18Key);
            console.log("i18KeyEle: ", i18KeyEle);

            if (i18Key !== "") {

                if (error.response.statusReason == "multiple error found") {

                    var additionalErrors = error.response.additionalProperties;

                    console.log("additionalErrors: ", additionalErrors);

                    $.each(additionalErrors, function(mErrorIndex, mErrorVal) {
                        console.log("mErrorVal: ", mErrorIndex);


                        $(specificerrorContainer + ' ' + '#' + mErrorIndex).addClass('alert alert-danger');
                        $(specificerrorContainer + ' ' + '#' + mErrorIndex).css('display', 'block');
                        $(specificerrorContainer).css('display', 'block');
                        $(".alert-danger").parents(".cmp-experiencefragment").removeClass("ht-zero");


                        $(genericerrorContainer).css('display', 'block');
                        $(genericerrorContainer).find("#general-api-error").addClass('alert alert-danger').css('display', 'block');
                        $('button[type="submit"]').attr("disabled", true);

                    });

                }else{

                    $(specificerrorContainer + ' ' + '#' + i18Key).addClass('alert alert-danger');
                    $(specificerrorContainer + ' ' + '#' + i18Key).css('display', 'block');
                    $(specificerrorContainer).css('display', 'block');
                    $(".alert-danger").parents(".cmp-experiencefragment").removeClass("ht-zero");

                    $(genericerrorContainer).css('display', 'block');
                    $(genericerrorContainer).find("#general-api-error").addClass('alert alert-danger').css('display', 'block');
                    $('button[type="submit"]').attr("disabled", true);
                }

                /*$('input').blur(function() {
                    $(specificerrorContainer + ' ' + '#' + i18Key).css('display', 'none');
                    $(specificerrorContainer).css('display', 'none');
                    $('button[type="submit"]').attr("disabled", false);
                });*/

                $('button[type="reset"]').click(function() {
                    console.log("you clicked cancel btn");
                    $(specificerrorContainer + ' ' + '#' + i18Key).css('display', 'none');
                    $(specificerrorContainer).css('display', 'none');
                    $('button[type="submit"]').attr("disabled", true);


                    $(genericerrorContainer).css('display', 'none');
                    $('button[type="submit"]').attr("disabled", true);
                });

            }
        }

    }
}