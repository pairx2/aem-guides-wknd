function customRuleValidation (){
    //ageForm form validation  
    let ageReuiredMsg = $("#inicio-age").attr("data-msg-required");
    let ageMinValue = $("#inicio-age").attr("min");
    let ageMinMsg = $("#inicio-age").attr("data-msg-minlength");
    let nameReuiredMsg = $("#inicio-name").attr("data-msg-required");
    let nameMaxLength = $("#inicio-name").attr("data-maxlength");
    let nameMaxMsg = $("#inicio-name").attr("data-msg-length");
    let lastnameReuiredMsg = $("#inicio-lastname").attr("data-msg-required");
    let lastnameMaxLength = $("#inicio-lastname").attr("data-maxlength");
    let lastnameMaxMsg = $("#inicio-lastname").attr("data-msg-length");
    let emailReuiredMsg = $("#inicio-email").attr("data-msg-required");
    let emailValidMsg = $("#inicio-email").attr("data-msg-valid");
    let emailMaxLength = $("#inicio-email").attr("data-maxlength");
    let emailMaxMsg = $("#inicio-email").attr("data-msg-length");
    //miniForm form validation 
    let miniNameReuiredMsg = $("#mini-name").attr("data-msg-required");
    let mininameMaxLength = $("#mini-name").attr("data-maxlength");
    let mininameMaxMsg = $("#mini-name").attr("data-msg-length");
    let minisurNameReuiredMsg = $("#mini-surname").attr("data-msg-required");
    let minisurNameMaxLength = $("#mini-surname").attr("data-maxlength");
    let minisurNameMaxMsg = $("#mini-surname").attr("data-msg-length");
    let miniEmailReuiredMsg = $("#mini-email").attr("data-msg-required");
    let miniEmailValidMsg = $("#mini-email").attr("data-msg-valid");
    let miniemailMaxLength = $("#mini-email").attr("data-maxlength");
    let miniemailMaxMsg = $("#mini-email").attr("data-msg-length");
    let miniPasswordReuiredMsg = $("#mini-password").attr("data-msg-required");
    // create custom rule for vlaidation
    $.validator.addMethod("accept", function (value, element, param) {
       if (value !== "" && value !== undefined) {
           let reg = new XRegExp(param);
           return reg.test(value);
       } else {
           return true;
       }
   });

   // ageForm step 1 validation


   $("#ageForm")
       .submit(function (e) {
           e.preventDefault();

       })
       .validate({
           meta: "validate",
           ignore: [],
           errorClass: "invalid-input",
           rules: {
               age: {
                   required: true,
                   min: ageMinValue
               },
               firstName: {
                   required: true,
                   maxlength: nameMaxLength
               },
               lastName: {
                   required: true,
                   maxlength: lastnameMaxLength
               },
               email: {
                   required: true,
                   email: true,
                   maxlength: emailMaxLength
               }
           },
           messages: {
               age: {
                   required: ageReuiredMsg,
                   min: ageMinMsg
               },
               firstName: {
                   required: nameReuiredMsg,
                   maxlength: nameMaxMsg
               },
               lastName: {
                   required: lastnameReuiredMsg,
                   maxlength: lastnameMaxMsg
               },
               email: {
                   required: emailReuiredMsg,
                   email: emailValidMsg,
                   maxlength: emailMaxMsg
               }
           },
           errorPlacement: function (error, element) {
               // This is the default behavior
               error.insertAfter(element);
           },
           // config for error high light
           highlight: function (element, errorClass, validClass) {
               if (element.type === "select-one") {
                   $(".ui-selectmenu-button").addClass(errorClass);
                   $(element).addClass(errorClass);
               } else {
                   $(element).addClass(errorClass);
               }
           },
           //config for error un highlight
           unhighlight: function (element, errorClass, validClass) {
               if (element.type === "select-one") {
                   $(".ui-selectmenu-button").removeClass(errorClass);
                   $(element).removeClass(errorClass);
               } else {
                   $(element).removeClass(errorClass);
               }
           }
   });

   // miniForm step 1 validation

   $("#miniForm")
       .submit(function (e) {
           e.preventDefault();
       })
       .validate({
           meta: "validate",
           ignore: [],
           errorClass: "invalid-input",
           rules: {
               userName: {
                   required: true,
                   maxlength: mininameMaxLength
               },
               usersurName: {
                   required: true,
                   maxlength: minisurNameMaxLength
               },
               userEmail: {
                   required: true,
                   accept:
                       "^[\\p{L}0-9]+([\\.+-]?[\\p{L}0-9]+)*@\\p{L}+([\\.-]?\\p{L}+)*(\\.\\w{2,3})+$",
                   maxlength: miniemailMaxLength
               },
               userPassword: "required"
           },
           messages: {
               userName: {
                   required: miniNameReuiredMsg,
                   maxlength: mininameMaxMsg
               },
               usersurName: {
                   required: minisurNameReuiredMsg,
                   maxlength: minisurNameMaxMsg
               },
               userEmail: {
                   required: miniEmailReuiredMsg,
                   accept: miniEmailValidMsg,
                   maxlength: miniemailMaxMsg
               },
               userPassword: {
                   required: miniPasswordReuiredMsg
               }
           },

           errorPlacement: function (error, element) {
               // This is the default behavior
               error.insertAfter(element);
           },
           // config for error high light
           highlight: function (element, errorClass, validClass) {
               if (element.type === "select-one") {
                   $(".ui-selectmenu-button").addClass(errorClass);
                   $(element).addClass(errorClass);
               } else {
                   $(element).addClass(errorClass);
               }
           },
           //config for error un highlight
           unhighlight: function (element, errorClass, validClass) {
               if (element.type === "select-one") {
                   $(".ui-selectmenu-button").removeClass(errorClass);
                   $(element).removeClass(errorClass);
               } else {
                   $(element).removeClass(errorClass);
               }
           }
   });

  }

function stateInput(){
    // sync the state to the input
    $(".image-checkbox").on("click", function (e) {
        $(this).toggleClass('image-checkbox-checked');
        let $checkbox = $(this).find('input[type="checkbox"]');
        $checkbox.prop("checked", !$checkbox.prop("checked"))
        e.preventDefault();
        if ($('.image-checkbox input[type="checkbox"]').not(':checked').length == 0) {
            $('.viewResultbtn').show();
        }
        else if (($('.image-checkbox input[type="checkbox"]').not(':checked').length >= 1) && ($('.image-checkbox input[type="checkbox"]').not(':checked').length != $('.image-checkbox input[type="checkbox"]').length)) {
            $('.viewResultbtn').show();
        }
        else {
            $('.viewResultbtn').hide();
            $('.allOptions').hide();
        }
    });
    $(".radio-wrap .radio-inline").click(function () {
        $(".options").removeClass('active');
        $(".level3").addClass('d-none');
        $('#optionsList .image-checkbox').removeClass('image-checkbox-checked');
        $(".options").find('input[type="radio"]').prop('checked', false);
        $('.viewResultbtn').hide();
        $(".view-result").addClass('d-none');
        $('.product-result').addClass('d-none');
        if ($('#optionYesBut, #optionNo').is(':checked')) {
            $(".switchContent.slider-image").removeClass('d-none');
            $('#firstOption').hide();
            $('.allOptions').hide();
            $('#optionsList input[type="checkbox"]').prop('checked', false);
        }
        else if ($('#optionYes').is(':checked')) {
            $('#firstOption').show();
            $('.allOptions').hide();
            $(".switchContent.slider-image").addClass('d-none');
            $(".level3").addClass('d-none');
            $('.viewResultbtn').hide();
            $(".view-result").addClass('d-none');

        }
        else {
            $(".switchContent.slider-image").addClass('d-none');
            $('#firstOption').hide();
            $('.allOptions').hide();
            $('#optionsList input[type="checkbox"]').prop('checked', false);
        }
    });

    $(".slider-wrap .image-options .options").click(function () {
        $(".level3 .options").find('input[type="radio"]').prop('checked', false);
        $('.ensuremxcampaign .slider-stroke .slider-dot').hide();
        let id = $(this).id;
        if (id != 'sick' && id != 'activePerson') {
            if ($('.sickness-type .image-options .options, .exercise-type .image-options .options').hasClass('active')) {
                $('.sickness-type .image-options .options, .exercise-type .image-options .options').removeClass('active');
            }
        }
    });
} 

function sicknessType(){
    $(".sickness-type .image-options .options, .exercise-type .image-options .options").click(function () {
        $(this).find('input[type="radio"]').prop('checked', true);
        if ($(this).find('input[type="radio"]').is(':checked')) {
            $(".view-result").removeClass('d-none');
        }
    });


    $(".slider-wrap .options#sick").click(function () {
        $(this).find('input[type="radio"]').prop('checked', true);
        if ($(this).find('input[type="radio"]').is(':checked')) {
            $(this).addClass('active').siblings().removeClass('active');
            $('#firstOption').hide();
            $('.allOptions').hide();
            $('.viewResultbtn').hide();
        }
        $(".level3").removeClass('d-none');
        $(".level3 .sickness-type").removeClass('d-none').siblings().addClass('d-none');
        $(".view-result").addClass('d-none');
    });

    $(".slider-wrap .options#surgery, .slider-wrap .options#pregnant").click(function () {
        $(this).find('input[type="radio"]').prop('checked', true);
        if ($(this).find('input[type="radio"]').is(':checked')) {
            $(this).addClass('active').siblings().removeClass('active');
            $('#firstOption').hide();
            $('.allOptions').hide();
            $('.viewResultbtn').hide();
        }
        $(".view-result").removeClass('d-none');
        $(".level3").addClass('d-none')
    });

    $(".slider-wrap .options#activePerson").click(function () {
        $(this).find('input[type="radio"]').prop('checked', true);
        if ($(this).find('input[type="radio"]').is(':checked')) {
            $(this).addClass('active').siblings().removeClass('active');
            $('#firstOption').hide();
            $('.allOptions').hide();
            $('.viewResultbtn').hide();
        }
        $(".level3").removeClass('d-none');
        $(".level3 .exercise-type").removeClass('d-none').siblings().addClass('d-none');
        $(".view-result").addClass('d-none');
    });

    $(".slider-wrap .options#inactivePerson").click(function () {
        $(this).find('input[type="radio"]').prop('checked', true);
        if ($(this).find('input[type="radio"]').is(':checked')) {
            $(this).addClass('active').siblings().removeClass('active');
            $('#optionsList input[type="checkbox"]').prop('checked', false);
            $('#optionsList .image-checkbox').removeClass('image-checkbox-checked');
            $('#optionsList #firstOption').show();
            $('.allOptions').hide();
            $('.viewResultbtn').hide();
        }
        $(".level3").addClass('d-none')
        $(".view-result").addClass('d-none');
    });


    $(".ensuremxcampaign .options").click(function () {
        $('#optionsList input[type="checkbox"]').prop('checked', false);
        $('#optionsList .image-checkbox').removeClass('image-checkbox-checked');
        $(".options").find('input[type="radio"]').prop('checked', false);
        $('.options.active').find('input[type="radio"]').prop('checked', true);
        $(this).find('input[type="radio"]').prop('checked', true);
        $('.product-result').addClass('d-none');
        if ($(this).find('input[type="radio"]').is(':checked')) {
            $(this).addClass('active').siblings().removeClass('active');
        }
    });


    $('.exercise-type .image-options .options').click(function () {
        if ($(this).hasClass('showMeals')) {
            $('.product-result').addClass('d-none');
            $(".view-result").addClass('d-none');
            $('#firstOption').show();
            $('.allOptions').hide();
            $('.viewResultbtn').hide();
        }
        else {
            $('#firstOption').hide();
            $('.allOptions').hide();
        }
    });
}
function cancerpdtActive(){
    if ($('#cancerpdt').hasClass('active')) {
        $('.cancerpdt').addClass('active').siblings().removeClass('active');
    }
    else if ($('#pulmonarpdt').hasClass('active')) {
        $('.pulmonarpdt').addClass('active').siblings().removeClass('active');
    }
    else if ($('#gastropdt').hasClass('active')) {
        $('.gastropdt').addClass('active').siblings().removeClass('active');
    }
    else if ($('#renalpdt').hasClass('active')) {
        $('.renalpdt').addClass('active').siblings().removeClass('active');
    }
}
function optionActive(){
    if ($('.slider-wrap .options#activePerson').hasClass('active') && $('.showMeals ').hasClass('active')) {
        $('.product-result').addClass('d-none');
    }

    let values = values.concat(
        $("#ageForm input[type=checkbox]:not(:checked),#ageForm .level3 .image-options input[type=radio]:not(:checked)").map(
            function () {
                return { "name": this.name, "value": " " }
            }).get()
    );
    values = values.concat(
        $("#ageForm .showProduct:visible").find("img.active").next().map(
            function () {
                return { "name": "product", "value": this.value }
            }).get()
    );


    let endProduct = $("#ageForm .showProduct:visible").find("img.active").next().val();
    let successfulLogin = getItemLocalStorage('cJwt', true);
    if (!successfulLogin && endProduct == "Ensure") {
        $('.a-container--ensuremxcampaign .cmp-experiencefragment--forms').show();
    }


    $.ajax({
        type: 'POST',
        url: '/bin/servlet/abbott/globalPage/cuasservlet',
        data: values,
        success: function (data) {

        }
    });
}
function imageCheckbox(values){
    if ($('.image-checkbox input[type="checkbox"]').not(':checked').length == 0 || ($('.image-checkbox input[type="checkbox"]').not(':checked').length > 0 && values[0].value > 40)) {
        $('.product-result').addClass('d-none');
        $('.allOptions').hide();
        $('.allOptions.fiveOptions').show();
        $('.allOptions').find('img').removeClass('active');
        $('.allOptions.fiveOptions').find('img').addClass('active');
    }
    else if ($('.image-checkbox input[type="checkbox"]').not(':checked').length > 0 && values[0].value <= 40) {
        $('.product-result').addClass('d-none');
        $('.allOptions').hide();
        $('.allOptions:not(.fiveOptions)').show();
        $('.allOptions').find('img').removeClass('active');
        $('.allOptions:not(.fiveOptions)').find('img').addClass('active');
    }
    else {
        $('.product-result').addClass('d-none');
        $('.allOptions').hide();
    }
}
$(function () {
    customRuleValidation();
    $(".image-checkbox").each(function () {
        if ($(this).find('input[type="checkbox"]').first().attr("checked")) {
            $(this).addClass('image-checkbox-checked');
        }
        else {
            $(this).removeClass('image-checkbox-checked');
        }
    });

   stateInput();

   sicknessType();

   




    $('.resultBtn').click(function (e) {
        e.preventDefault();

        let validVal = $("#ageForm").valid();
        if (validVal ) {


            let values = $("#ageForm").serializeArray();

            imageCheckbox(values);

            if ($('.slider-wrap .options#sick').hasClass('active')) {
                $('.product-result.sick').removeClass('d-none');
                cancerpdtActive();
            }
            else if ($('.slider-wrap .options#surgery').hasClass('active')) {
                $('.product-result.surgery').removeClass('d-none');
                $('.product-result.surgery').find('img').addClass('active');
            }
            else if ($('.slider-wrap .options#pregnant').hasClass('active')) {
                $('.product-result.pregnancy').removeClass('d-none');
                $('.product-result.pregnancy').find('img').addClass('active');
            }
            else if ($('.slider-wrap .options#activePerson').hasClass('active')) {
                $('.product-result.activePerson').removeClass('d-none');
                $('.product-result.activePerson').find('img').addClass('active');
            }

         optionActive();

        }
        else {
            $('html, body').animate({
                scrollTop: $("#ageForm").offset().top
            }, 2000);
            $('.product-result').addClass('d-none');
            $('.allOptions').hide();
            $('#optionsList input[type="checkbox"]').prop('checked', false)
            $('#optionsList .image-checkbox').removeClass('image-checkbox-checked');
            $('.viewResultbtn').hide();
        }

    });

    if ($(window).width() >= 768) {
        setTimeout(function () {
            optionsHeight();
        }, 500);
    }
});
function optionsHeight() {

    let options = $(".ensuremxcampaign .slider-wrap .image-options .options");
    let optionsHeights = [];

    options.each(function () {
        $(this).css({ 'height': '', 'min-height': '' });
        let height = $(this).height();
        optionsHeights.push(height);
    });

    let maxHeightWrap = Math.max.apply(null, optionsHeights);
    options.each(function () {
        $(this).css('min-height', maxHeightWrap);
    });

    let optionsLabel = $(".ensuremxcampaign .slider-wrap .image-options .options label");
    let optionsHeightLabel = [];

    optionsLabel.each(function () {
        $(this).css({ 'height': '', 'min-height': '' });
        let heightLabel = $(this).height();
        optionsHeightLabel.push(heightLabel);
    });

    let maxHeightLabel = Math.max.apply(null, optionsHeightLabel);
    optionsLabel.each(function () {
        $(this).css('min-height', maxHeightLabel);
    });

    let optionsDesc = $(".ensuremxcampaign .slider-wrap .image-options .options label .img-caption");
    let optionsHeightDesc = [];

    optionsDesc.each(function () {
        $(this).css({ 'height': '', 'min-height': '' });
        let heightDesc = $(this).height();
        optionsHeightDesc.push(heightDesc);
    });

    let maxHeightDesc = Math.max.apply(null, optionsHeightDesc);
    optionsDesc.each(function () {
        $(this).css('min-height', maxHeightDesc);
    });
}

let wWidth = document.body.clientWidth;
$(window).resize(function (e) {
    let rwWidth = document.body.clientWidth;
    if (wWidth != rwWidth) {
        wWidth = rwWidth;
        if (rwWidth >= 768) {
            setTimeout(function () {
                optionsHeight();
            }, 500);
        }
    }
});


$(window).on("load", function () {
    setTimeout(function () {
        optionsHeight();
    }, 500);
});