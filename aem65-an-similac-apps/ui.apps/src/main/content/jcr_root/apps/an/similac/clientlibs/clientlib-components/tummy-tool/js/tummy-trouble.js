(function (win) {
    if(!win.ABBOTT){
        win.ABBOTT = {};
    }
    var ABBOTT = win.ABBOTT;
    function onSliderLoad () {
        jQuery(".tummy-tool-detail-wrap .detail-head").click(function () {
            var a = tummyToolSlider.getCurrentSlide() + 1
                , b = $(this).index() + 1;
            var title = $(this).text();
            var content = document.createElement("div");
            content.innerHTML = jQuery("#tummy-note-" + a + "-" + b).html();
            swal({
                title: title,
                content: content,
                buttons: {
                    cancel: "Close",
                },
                className: "similac-modal"
            })
        });
    }

    var tummyToolSlider = $(".tummy-tool-slider").bxSlider({
        controls: false,
        pager: false,
        infiniteLoop: false,
        touchEnabled: false,
        easing: "ease-in-out",
        adaptiveHeight: false,
        onSliderLoad: onSliderLoad
    });

    var $tummyToolProgress = $(".tummy-tool-progress");
    $tummyToolProgress.html("");
    for (var f = tummyToolSlider.getSlideCount(), g = 0; g < f; g++) {
        $tummyToolProgress.append("<li></li>");
    }
    $tummyToolProgress.append('<li class="liCount">0 of ' + f + "</li>");
    var question1, question2, question3, question4, question5, question6, question7, question8, queryString;
    function produceResults(n) {
        question1 = $("input[name='ques1']:checked").val();
        question2 = $("input[name='ques2']:checked").val();
        question3 = $("input[name='ques3']:checked").val();
        question4 = $("input[name='ques4']:checked").val();
        question5 = $("input[name='ques5']:checked").val();
        question6 = $("input[name='ques6']:checked").val();
        question7 = $("input[name='ques7']:checked").val();
        question8 = $("input[name='ques8']:checked").val();
        q1();
        q2();
        q3();
        q4();
        q5();
        q6();
        q7();
        q8();
        window.location.href = n + "?" + queryString
    }
    var eUri = encodeURIComponent;
    function q1() {
        queryString = "q1\x3d" + eUri(question1 === "1_1" ? "1A" : question1 === "1_2" ? "1B" : question1 === "1_3" ? "1C" : question1 === "1_4" ? "1D" : "1E")
    }
    function q2() {
        queryString += "\x26q2\x3d";
        queryString += eUri(question2 === "2_1" ? "2A" : question2 === "2_2" ? "2B" : "2C")
    }
    function q3() {
        queryString += "\x26q3\x3d";
        question3 === "3_1" ? question2 === "2_3" ? (question1 === "1_1" || question1 === "1_2" || question1 === "1_3") ? queryString += eUri("3A123F") : (question1 === "1_4" || question1 === "1_5") && (queryString += eUri("3A45F")) : (question2 === "2_1" || question2 === "2_2") && (question1 === "1_1" || question1 === "1_2" ? queryString += eUri("3A12SB") : question1 === "1_3" ? queryString += eUri("3A3SB") : (question1 === "1_4" || question1 === "1_5") && (queryString += eUri("3A45SB"))) : question3 === "3_2" ? queryString += eUri("3BNR") : (question3 = "3_3") && (question2 === "2_3" ? question1 === "1_1" || question1 === "1_2" ? queryString += eUri("3C12F") : question1 === "1_3" ? queryString += eUri("3C3F") : (question1 === "1_4" || question1 === "1_5") && (queryString += eUri("3C45F")) : (question2 === "2_1" || question2 === "2_2") && (question1 === "1_1" || question1 === "1_2" || question1 === "1_3" ? queryString += eUri("3C123SB") : (question1 === "1_4" || question1 === "1_5") && (queryString += eUri("3C45SB"))))
    }
    function q4() {
        queryString += "\x26q4\x3d";
        queryString += eUri(question4 === "4_1" ? question2 === "2_3" ? question1 === "1_1" ? "4A1F" : "4A2345F" : question2 === "2_2" ? question1 === "1_1" ? "4A1S" : question1 === "1_2" || question1 === "1_3" ? "4A23S" : "4A45S" : question1 === "1_1" ? "4A1B" : question1 === "1_2" || question1 === "1_3" ? "4A23B" : "4A45B" : question4 === "4_2" ? question2 === "2_3" ? question1 === "1_1" ? "4B1F" : "4B2345F" : question2 === "2_2" ? question1 === "1_1" ? "4B1S" : question1 === "1_2" || question1 === "1_3" ? "4B23S" : "4B45S" : question1 === "1_1" ? "4B1B" : question1 === "1_2" || question1 === "1_3" ? "4B23B" : "4B45B" : "4CNR")
    }
    function q5() {
        queryString += "\x26q5\x3d";
        queryString += eUri(question5 === "5_1" ? question2 === "2_1" ? question1 === "1_4" || question1 === "1_5" ? "5A45B" : "5A123B" : question1 === "1_1" ? "5A1FS" : question1 === "1_2" || question1 === "1_3" ? "5A23FS" : "5A45FS" : question5 === "5_2" ? question2 === "2_1" ? question1 === "1_1" || question1 === "1_2" ? "5B12B" : "5B345B" : question2 === "2_2" ? question1 === "1_1" || question1 === "1_2" ? "5B12S" : question1 === "1_3" ? "5B3S" : "5B45S" : question1 === "1_1" || question1 === "1_2" ? "5B12F" : question1 === "1_3" ? "5B3F" : "5B45F" : "5CNR")
    }
    function q6() {
        queryString += "\x26q6\x3d";
        queryString += eUri(question6 === "6_1" ? "6ANR" : "6BNR")
    }
    function q7() {
        queryString += "\x26q7\x3d";
        queryString += eUri(question7 === "7_1" ? question2 === "2_3" ? "7AF" : question2 === "2_2" ? question1 === "1_1" ? "7A1S" : question1 === "1_3" || question1 === "1_2" ? "7A23S" : "7A45S" : question1 === "1_1" ? "7A1B" : question1 === "1_3" || question1 === "1_2" ? "7A23B" : "7A45B" : question7 === "7_2" ? question2 === "2_3" ? question1 === "1_1" ? "7B1F" : "7B2345F" : question1 === "1_1" ? "7B1SB" : "7B2345SB" : "7CNR")
    }
    function q8() {
        queryString += "\x26q8\x3d";
        queryString += eUri(question8 === "8_1" ? question2 === "2_1" ? "8AB" : question2 === "2_2" ? "8AS" : "8AF" : "8BNR")
    }
    $(function () {
        var $tummyToolPrev = $(".tummy-tool-prev");
        var $tummyToolProgressLi = $(".tummy-tool-progress li");
        $(".tummy-tool-next").click(function (n) {
            n.preventDefault();
            var t = tummyToolSlider.getCurrentSlide() + 1;
            var r = tummyToolSlider.getSlideCount();
            var i = $(".tummy-tool-slider li:nth-child(" + t + ") .tummy-tool-select input[type=radio]:checked");
            if (i.length > 0 && t === r) {
                produceResults(ABBOTT.getAemURL(jQuery("#tummyResultsUrl").val()));
            }
            else if (i.length > 0) {
                tummyToolSlider.goToNextSlide();
                t = tummyToolSlider.getCurrentSlide() + 1;
                t > 1 && $tummyToolPrev.removeClass("disabled");
                t <= $(".tummy-tool-progress li.active").length && $(".liCount").text(t + " of " + ($tummyToolProgressLi.length - 1));
            } else {
                return
            }
        });
        $tummyToolPrev.click(function (n) {
            n.preventDefault();
            tummyToolSlider.goToPrevSlide();
            var t = tummyToolSlider.getCurrentSlide() + 1;
            t === 1 && $tummyToolPrev.addClass("disabled");
            $(".liCount").text(t + " of " + ($tummyToolProgressLi.length - 1))
        });
        $(".tummy-radio input:radio").change(function () {
            var n = $(this).closest("li").index()
                , t = this.name
                , i = $(".tummy-radio input[type = radio][name = " + t + "]:checked");
            i.length > 0 ? $(".tummy-tool-progress li:nth-child(" + (n + 1) + ")").addClass("active") : $(".tummy-tool-progress li:nth-child(" + (n + 1) + ")").removeClass("active");
            $(".liCount").text($(".tummy-tool-progress li.active").length + " of " + ($tummyToolProgressLi.length - 1))
        })
    });

})(window);

