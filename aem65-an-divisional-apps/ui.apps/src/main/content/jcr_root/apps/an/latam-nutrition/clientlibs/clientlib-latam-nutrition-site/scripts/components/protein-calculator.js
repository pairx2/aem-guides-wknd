function containerProtein(tew,twa){
    if ($(".proteinFormGender .image-radio.active input").val() != undefined && $("[name='age']").val() != "" && $("[name='weight']").val() != "" && $("[name='height']").val() != "" && $(".proteinPhysicalActivityDots.active").attr("data-value") != undefined) {
        $(this).addClass("proteinP1Result");
        $(".proteinSlider .owl-height").height($(".proteinSlider .owl-height").height() - $(".proteinStartError").height() - 18);
        $(".proteinStartError").addClass("d-none");
        let bmr = (9.99 * $("[name='weight']").val()) + (6.25 * $("[name='height']").val()) - (4.92 * $("[name='age']").val());
        if ($(".proteinFormGender .image-radio.active input").val() === "male") {
            bmr = bmr + 5;
        } else {
            bmr = bmr - 161;
        }
        tew = bmr * parseFloat($(".proteinPhysicalActivityDots.active").attr("data-value"));
        twa = (tew * 0.2) / 4;
        twa = twa.toFixed(2);
        $(".proteinSlider .owl-stage .owl-item:last-child .totalCalorieNeed > p:last-child > span:first-child").html(twa);
        proteinMsg();
        $('.proteinSlider.owl-carousel').trigger('next.owl.carousel');
    } else {
        $(".proteinStartError").removeClass("d-none");
        $(".proteinSlider .owl-height").height($(".proteinSlider .owl-height").height() + $(".proteinStartError").height() + 18);
    }
}
function proteinMsg(totalProtein,twa) {
    if (totalProtein != 0 && twa != 0) {
        $(".proteinSlider .owl-stage .owl-item:last-child .finalResultContainer > p:not(:first-child)").addClass("d-none");
        if (totalProtein < twa) {
            $(".proteinSlider .owl-stage .owl-item:last-child .finalResultContainer .lessProtein").removeClass("d-none");
        }
        if (totalProtein === twa) {
            $(".proteinSlider .owl-stage .owl-item:last-child .finalResultContainer .equalProtein").removeClass("d-none");
        }
        if (totalProtein > twa) {
            $(".proteinSlider .owl-stage .owl-item:last-child .finalResultContainer .moreProtein").removeClass("d-none");
        }
    }
}
function sliderProtein(event){
    if (event.item.index == (event.item.count - 1)) {
        $(".proteinSlider .owl-nav .owl-next").html("Finalizar >").addClass("final").show();
        $(".proteinRequirement").removeClass("d-none");
        if (!$(".proteinSlider .owl-stage .owl-item:last-child > div > div:last-child").hasClass("d-none")) {
            $(".proteinSlider .owl-stage .owl-item:last-child > div > *").removeClass("d-none");
            $(".proteinSlider .owl-stage .owl-item:last-child > div > div:last-child").addClass("d-none");
            $(".proteinSlider .owl-height").removeAttr("style");
            if ($(".proteinSlider .owl-height").height() > $(".proteinSlider .owl-stage .owl-item:last-child").height()) {
                $(".proteinSlider .owl-height").height($(".proteinSlider .owl-stage .owl-item:last-child").height());
            }
        }
    } else {
        $(".proteinSlider .owl-nav .owl-next").html("Siguiente >").show();
    }
}
function proteinProduct(){
    $(".proteinSlider .owl-nav .owl-next").click(function() {
        if ($(this).hasClass("final")) {
            $(this).hide();
            $(".proteinSlider .owl-stage .owl-item:last-child > div > *").addClass("d-none");
            $(".proteinSlider .owl-stage .owl-item:last-child > div > div:last-child").removeClass("d-none");
            if ($(".proteinSlider .owl-height").height() < $(".proteinSlider .owl-stage .owl-item:last-child").height()) {
                $(".proteinSlider .owl-height").height($(".proteinSlider .owl-stage .owl-item:last-child").height());
            }
            $(".proteinRequirement").addClass("d-none");
        }
    });

    $(".proteinSlider .owl-nav .owl-prev").click(function() {
        if ($(".proteinSlider .owl-nav .owl-next").hasClass("final")) {
            $(".proteinSlider .owl-nav .owl-next").removeClass("final");
            $(".proteinSlider .owl-stage .owl-item:last-child > div > *").removeClass("d-none");
            $(".proteinSlider .owl-stage .owl-item:last-child > div > div:last-child").addClass("d-none");
            if ($(".proteinSlider .owl-height").height() < $(".proteinSlider .owl-stage .owl-item:last-child").height()) {
                $(".proteinSlider .owl-height").height($(".proteinSlider .owl-stage .owl-item:last-child").height());
            }
            $(".proteinRequirement").removeClass("d-none");
        }
    });
}
$(document).ready(function() {

    $(".proteinPhysicalActivityLine .proteinPhysicalActivityDots").click(function() {
        $(".proteinPhysicalActivityLine .proteinPhysicalActivityDots").removeClass("active");
        $(this).addClass("active");
    });
    $(".proteinFormGender .image-radio").click(function() {
        $(".proteinFormGender .image-radio").removeClass("active");
        $(this).addClass("active");
    });
    let tew = 0,
        twa = 0;
    $(".proteinStartContainer button").click(function() {
       containerProtein(tew,twa);
    });
    let totalProtein = 0;
    $(".proteinTileContainer .proteinTile").click(function() {
        $(this).toggleClass("active");
        let tileSelectCount = 0;
        totalProtein = 0;
        $(".proteinTileContainer .proteinTile").each(function() {
            if ($(this).hasClass("active")) {
                totalProtein = (parseFloat(totalProtein) + parseFloat($(this).attr("data-value"))).toFixed(2);
                tileSelectCount++;
            }
        });
        if (tileSelectCount > 0) {
            $(".patientProteinTotal span").html(totalProtein);
            $(".proteinSlider .owl-stage .owl-item:last-child .totalCalorieConsume > p:last-child > span:first-child").html(totalProtein);
            proteinMsg(totalProtein,twa);
        } else {
            $(".patientProteinTotal span").html("0");
        }
    });

    $(".proteinTile").matchHeight({ remove: true });
    $(".proteinSlider.owl-carousel").owlCarousel({
        dots: true,
        nav: true,
        navText: ["< Anterior", "Siguiente >"],
        autoHeight: true,
        loop: false,
        items: 1,
        responsive: {
            0: {
                onTranslated: function(event) {
                    if (event.item.index === 0) {
                        $(".proteinSlider .owl-nav").hide();
                        $(".proteinRequirement").addClass("d-none");
                        if ($(".proteinStartContainer button").hasClass("proteinP1Result")) {
                            $(".proteinSlider .owl-dots").show();
                        } else {
                            $(".proteinSlider .owl-dots").hide();
                        }
                    } else {
                        $(".proteinSlider .owl-nav,.proteinSlider .owl-dots").show();
                        $(".proteinRequirement").removeClass("d-none");
                    }
                    sliderProtein(event);
                }
            }
        }
    });
    if (!$(".proteinSlider").hasClass("owl-theme"))
        $(".proteinSlider").addClass("owl-theme");
    $(".proteinSlider .owl-nav,.proteinSlider .owl-dots").hide();
    proteinProduct();
});