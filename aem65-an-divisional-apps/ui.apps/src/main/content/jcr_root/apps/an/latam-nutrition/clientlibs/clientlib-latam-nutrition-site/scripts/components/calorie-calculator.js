$(document).ready(function () {
    let maxHeight;

    function evenHeight() {
        if ($(window).width() > 991) {
            maxHeight = $(".calorieCalc .row").height();
            $(".calorieCalc .row > div > div").css("height", maxHeight + "px");
        } else if ($(".calorieCalc .row > div > div").attr("style") != undefined) {
            $(".calorieCalc .row > div > div").removeAttr("style");
        }
    }
    evenHeight();
    $('[name="age"],[name="weight"],[name="height"]').on('keypress', function (e) {
        if ($(this).val().length > 2) {
            e.preventDefault();
        }
    });
    $(".caloriePhysicalActivityLine .caloriePhysicalActivityDots").click(function () {
        if ($(".calorieCalcField button").is(":visible")) {
            $(".caloriePhysicalActivityLine .caloriePhysicalActivityDots").removeClass("active");
            $(this).addClass("active");
        }
    });
    $(".calorieGender .image-radio").click(function () {
        if ($(".calorieCalcField button").is(":visible")) {
            $(".calorieGender .image-radio").removeClass("active");
            $(this).addClass("active");
        }
    });
    $(".calorieCalcField p").click(function () {
        $(".calorieGender .image-radio, .caloriePhysicalActivityLine .caloriePhysicalActivityDots").removeClass("active");
        $(".calorieInputs input").val("").removeAttr("readonly");
        if ($(".calorieCalc .row > div:first-child").hasClass("d-none") || $(".calorieCalcField button").hasClass("d-none")) {
            $(".calorieCalc .row > div:last-child").addClass("d-none");
            $(".calorieCalc .row > div:first-child,.calorieCalcField button").removeClass("d-none");
        }
    });
    $(".calorieCalcField button").click(function () {
        if ($(".image-radio.active input").val() != undefined && $("[name='age']").val() != "" && $("[name='weight']").val() != "" && $("[name='height']").val() != "" && $(".caloriePhysicalActivityDots.active").attr("data-value") != undefined) {
            $(".calorieInputs input").attr("readonly", true);
            let bmr = (9.99 * $("[name='weight']").val()) + (6.25 * $("[name='height']").val()) - (4.92 * $("[name='age']").val());
            if ($(".image-radio.active input").val() === "male") {
                bmr = bmr + 5;
            } else {
                bmr = bmr - 161;
            }
            let twa = bmr * parseFloat($(".caloriePhysicalActivityDots.active").attr("data-value"));
            twa = Math.ceil(twa);
            $(".calorieCalc .row > div:first-child,.calorieCalcField button, .calorieCalcFieldError").addClass("d-none");
            $(".calorieCalc .row > div:last-child").removeClass("d-none");
            $(".calorieResultVal h1").html(twa);
            $(".calorieResult .calorieResultProduct").addClass("d-none");
            $(".calorieResult .calorieResultProduct").each(function () {
                if ($(this).attr("data-palvalue") === $(".caloriePhysicalActivityDots.active").attr("data-value")) {
                    $(this).removeClass("d-none");
                    $(this).find(".calorieResultProductPdf").removeClass("d-none");
                }
            });
            evenHeight();
        } else {
            $(".calorieCalcFieldError").removeClass("d-none");
        }
    });
    $(window).resize(function () {
        evenHeight();
    });
});