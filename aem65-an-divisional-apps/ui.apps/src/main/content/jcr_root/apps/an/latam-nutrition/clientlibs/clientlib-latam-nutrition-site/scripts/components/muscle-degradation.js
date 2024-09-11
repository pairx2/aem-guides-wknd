$(".a-container--muscle-degradation .columncontrol__column:nth-child(2) .a-text--base").css("display", "none");
$(".a-radio__input").click(function () {

    setTimeout(() => {
        if ($(this).val() == "40-anos") {
            $(".image").css("display", "none")
            $(".image:nth-child(2)").css("display", "block");
            $(".a-container--muscle-degradation .columncontrol__column:nth-child(2) .a-text--base").css("display", "none");
            $(".a-container--muscle-degradation .columncontrol__column:nth-child(2) .a-text--base:nth-child(6)").css("display", "block");

        }

        if ($(this).val() == "50-anos") {
            $(".image").css("display", "none")
            $(".image:nth-child(3)").css("display", "block");
            $(".a-container--muscle-degradation .columncontrol__column:nth-child(2) .a-text--base").css("display", "none");
            $(".a-container--muscle-degradation .columncontrol__column:nth-child(2) .a-text--base:nth-child(7)").css("display", "block");
        }

        if ($(this).val() == "70-anos") {
            $(".image").css("display", "none")
            $(".image:nth-child(4)").css("display", "block");
            $(".a-container--muscle-degradation .columncontrol__column:nth-child(2) .a-text--base").css("display", "none");
            $(".a-container--muscle-degradation .columncontrol__column:nth-child(2) .a-text--base:nth-child(8)").css("display", "block");
        }
    }, 0);
});
