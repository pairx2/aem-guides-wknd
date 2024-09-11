var yesHFQ = $("#yes").val();
var noHFQ = $("#no").val();
var idkHFQ = $("#idk").val();
var sym_statement_1 = "You may not classify as an Advanced Heart Failure Patient";
var sym_statement_2 = "You may be experiencing symptoms of Advanced Heart Failure";

if ($(".HF-QuizComp").length) {
    display();
}

$('.quiz-cta-next').show().addClass('disabled');
$('.quiz-cta-prev').hide();

$(".HF-QuizComp .button-container .a-radio").on("change", function () {
    $('.quiz-cta-next').removeClass('disabled');
});

if ($('.m-iconcta').length) {
    $('.emailpage').hide();
}

$(".quiz-cta-next").click(function () {

    if ($('input[name="hfq"]:checked').val() != undefined) {
        $('.quiz-cta-prev').removeClass('disabled');
        $('.quiz-cta-next').addClass('disabled');

        if ($('.question-container').parent().find(".current").hasClass("q-1") && $('input[name="hfq"]:checked').val() != "Yes") {
            $(".question-container.yes").css("display", "none");
            $(".question-container.yes").addClass("display-none");
            $(".question-container.no").removeClass("display-none");
            $('.question-container.no').parent().find(".q-1").addClass("current");
            clearValuesYes();
        } else if ($('.question-container').parent().find(".current").hasClass("q-1") && $('input[name="hfq"]:checked').val() == "Yes") {
            $(".question-container.no").addClass("display-none");
            $(".question-container.yes").removeClass("display-none");
            $(".question-container.yes").css("display", "block");
            $('.question-container.yes').parent().find(".q-1").addClass("current");
            clearValuesNo();
        }

        if ($('.question-container').parent().find(".current").hasClass("q-6") && !$('.question-container').parent().find(".current").hasClass("chk-que")) {
            findEle();
            redirect();
            verifyRedirectYes();
        } else if ($('.question-container').parent().find(".current").hasClass("q-7")) {
            nextEle();
            verifyRedirectNo();
        } else if ($('.question-container').parent().find(".current").hasClass("q-8")) {
            findEle();
            redirect();
            var result2 = $(".resultqualifyurl").val();
            localStorage.setItem('resultqualifyurl', sym_statement_2);
            location.href = result2 + ".html";
        } else {
            nextEle();
        }

        progressBar();

        var attr = $('.question-container').parent().find(".current").attr('ans');
        if (attr == undefined || attr == false) {
            $('input[name="hfq"]').prop('checked', false);
        }

        if ($('.question-container').parent().find(".current").attr("ans")) {
            $('.quiz-cta-next').removeClass('disabled');
        }
    }

    if (!$('.question-container').parent().find(".current").hasClass(".q-1")) {
        $('.quiz-cta-prev').show();
    }
});

function nextEle() {
    if ($('input[name="hfq"]:checked').val() == yesHFQ) {
        $('.question-container').parent().find(".current").attr("ans", "Yes").removeClass("current").hide().next().show().addClass("current");
    } else if ($('input[name="hfq"]:checked').val() == noHFQ) {
        $('.question-container').parent().find(".current").attr("ans", "No").removeClass("current").hide().next().show().addClass("current");
    } else if ($('input[name="hfq"]:checked').val() == idkHFQ) {
        $('.question-container').parent().find(".current").attr("ans", "I don't know").removeClass("current").hide().next().show().addClass("current");
    }
    var attr = $('.question-container').parent().find(".current").attr('ans');
    if (typeof attr !== 'undefined' && attr !== false) {
        var nextRadioValue = $('.question-container').parent().find(".current").attr("ans").toLowerCase();
        $("#" + nextRadioValue).prop("checked", true);
    }
}

function findEle() {
    if ($('input[name="hfq"]:checked').val() == yesHFQ) {
        $('.question-container').parent().find(".current").attr("ans", "Yes");
    } else if ($('input[name="hfq"]:checked').val() == noHFQ) {
        $('.question-container').parent().find(".current").attr("ans", "No");
    } else if ($('input[name="hfq"]:checked').val() == idkHFQ) {
        $('.question-container').parent().find(".current").attr("ans", "I don't know");
    }
}

function progressBar() {
    var widthVal;
    var count = $('.question-container').parent().find(".current").attr("class").split('-')[1].slice(0, 1) - 1;
    if ($(".question-container.no").hasClass("display-none")) {
        widthVal = 100 / 6;
        $('.progress-container .progress-bar').attr("style", "width: " + widthVal * count + "%");
    } else if ($(".question-container.yes").hasClass("display-none")) {
        widthVal = 100 / 8;
        $('.progress-container .progress-bar').attr("style", "width: " + widthVal * count + "%");
    }
}

function verifyRedirectYes() {
    var count_yes = $(".question-container.yes div[ans*='Yes']").length;
    var count_no = $(".question-container.yes div[ans*='No']").length;
    var count_idk = $(".question-container.yes div[ans*='I don\\'t know']").length;
    count_no = count_no + count_idk;

    if (count_yes > 3 && count_no <= 3) {
        var result1 = $(".resultnotqualifyurl").val();
        localStorage.setItem('resultnotqualifyurl', sym_statement_1);
        location.href = result1 + ".html";
    } else if ((count_yes <= 3 && count_no > 3) || (count_yes == 3 && count_no == 3)) {
        var result2 = $(".resultqualifyurl").val();
        localStorage.setItem('resultqualifyurl', sym_statement_2);
        location.href = result2 + ".html";
    }
}

function verifyRedirectNo() {
    var count_yes = $(".question-container.no div[ans*='Yes']").length;
    var count_no = $(".question-container.no div[ans*='No']").length;
    var count_idk = $(".question-container.no div[ans*='I don\\'t know']").length;
    var count_no_plus_idk = count_no + count_idk;
    redirect();
    if ((count_yes > 0 || count_idk == 7 || count_no_plus_idk == 7) && count_no != 7) {
        var result2 = $(".resultqualifyurl").val();
        localStorage.setItem('resultqualifyurl', sym_statement_2);
        location.href = result2 + ".html";
    }
    $('input[name="hfq"]').prop('checked', false);
}

function clearValuesYes() {
    $('.question-container.yes .que').each(function () {
        $(this).removeClass("current");
        $(this).removeAttr("ans");
        $(this).css("display", "none");
    });
}

function clearValuesNo() {
    $('.question-container.no .que').each(function () {
        $(this).removeClass("current");
        $(this).removeAttr("ans");
        $(this).css("display", "none");
    });
}

$(".quiz-cta-prev").click(function () {
    $('.quiz-cta-next').show();
    $('input[name="hfq"]').prop('checked', false);
    $('.question-container').parent().find(".current").removeClass("current").hide().prev().show().addClass("current");
    var prevRadioValue = $('.question-container').parent().find(".current").attr("ans").toLowerCase();
    progressBar();
    $("#" + prevRadioValue).prop("checked", true);
    if ($('.question-container').parent().find(".current").hasClass("q-1")) {
        $('.quiz-cta-prev').hide();
    }
    if ($('.question-container').parent().find(".current").attr("ans")) {
        $('.quiz-cta-next').removeClass('disabled');
    }
});

$('.question-container.yes .que').each(function (i) {
    $(this).addClass("q-" + (i + 1));
});
$('.question-container.no .que').each(function (i) {
    $(this).addClass("q-" + (i + 1));
});

$(".queContEle-no").html($(".question-container.no").html());
$(".queContEle-yes").html($(".question-container.yes").html());

var img = $(".question-container.yes .q-1").find(".img").attr("img-src");
$(".image-container img").attr("src", img);

var altText = $(".question-container.yes .q-1").find(".img").attr("alt");
$(".image-container img").attr("alt", altText);

function display() {

    $(".question-container .q-1").css("display", "none");
    $('.question-container .que').each(function () {

        if ($(this).css("display") == "block") {
            $(".que").removeClass("current");
            $(this).addClass("current");
        }

    });

    if ($(".question-container .q-2").hasClass("current")) {
        $(".question-container .q-2").css("display", "block");
    }

}

$(".question-container.no .q-1, .question-container.no .q-2, .question-container.no .q-3, .question-container.no .q-4, .question-container.no .q-5, .question-container.no .q-6, .question-container.no .q-7, .question-container.no .q-8").addClass("chk-que");


if ($(".main-container").hasClass("question-page")) {
    window.localStorage.clear();
}

function redirect() {
    if ($('.question-container').parent().find(".current").hasClass("chk-que")) {
        var que1, que2, que3, que4, que5, que6, que7, que8, que1_ans, que2_ans, que3_ans, que4_ans, que5_ans, que6_ans, que7_ans, que8_ans;
        que1 = $(".question-container.no .q-1").find("p").text();
        que2 = $(".question-container.no .q-2").find("p").text();
        que3 = $(".question-container.no .q-3").find("p").text();
        que4 = $(".question-container.no .q-4").find("p").text();
        que5 = $(".question-container.no .q-5").find("p").text();
        que6 = $(".question-container.no .q-6").find("p").text();
        que7 = $(".question-container.no .q-7").find("p").text();
        que8 = $(".question-container.no .q-8").find("p").text();

        que1_ans = $(".question-container.no .q-1").attr("ans");
        que2_ans = $(".question-container.no .q-2").attr("ans");
        que3_ans = $(".question-container.no .q-3").attr("ans");
        que4_ans = $(".question-container.no .q-4").attr("ans");
        que5_ans = $(".question-container.no .q-5").attr("ans");
        que6_ans = $(".question-container.no .q-6").attr("ans");
        que7_ans = $(".question-container.no .q-7").attr("ans");
        que8_ans = $(".question-container.no .q-8").attr("ans");

        localStorage.setItem('que1', que1);
        localStorage.setItem('que2', que2);
        localStorage.setItem('que3', que3);
        localStorage.setItem('que4', que4);
        localStorage.setItem('que5', que5);
        localStorage.setItem('que6', que6);
        localStorage.setItem('que7', que7);
        localStorage.setItem('que8', que8);

        localStorage.setItem('que1_ans', que1_ans);
        localStorage.setItem('que2_ans', que2_ans);
        localStorage.setItem('que3_ans', que3_ans);
        localStorage.setItem('que4_ans', que4_ans);
        localStorage.setItem('que5_ans', que5_ans);
        localStorage.setItem('que6_ans', que6_ans);
        localStorage.setItem('que7_ans', que7_ans);
        localStorage.setItem('que8_ans', que8_ans);

    } else if (!$('.question-container').parent().find(".current").hasClass("chk-que")) {

        que1 = $(".question-container.yes .q-1").find("p").text();
        que2 = $(".question-container.yes .q-2").find("p").text();
        que3 = $(".question-container.yes .q-3").find("p").text();
        que4 = $(".question-container.yes .q-4").find("p").text();
        que5 = $(".question-container.yes .q-5").find("p").text();
        que6 = $(".question-container.yes .q-6").find("p").text();

        que1_ans = $(".question-container.yes .q-1").attr("ans");
        que2_ans = $(".question-container.yes .q-2").attr("ans");
        que3_ans = $(".question-container.yes .q-3").attr("ans");
        que4_ans = $(".question-container.yes .q-4").attr("ans");
        que5_ans = $(".question-container.yes .q-5").attr("ans");
        que6_ans = $(".question-container.yes .q-6").attr("ans");

        localStorage.setItem('que1', que1);
        localStorage.setItem('que2', que2);
        localStorage.setItem('que3', que3);
        localStorage.setItem('que4', que4);
        localStorage.setItem('que5', que5);
        localStorage.setItem('que6', que6);

        localStorage.setItem('que1_ans', que1_ans);
        localStorage.setItem('que2_ans', que2_ans);
        localStorage.setItem('que3_ans', que3_ans);
        localStorage.setItem('que4_ans', que4_ans);
        localStorage.setItem('que5_ans', que5_ans);
        localStorage.setItem('que6_ans', que6_ans);

    }
}
var q1 = localStorage.getItem('que1') != null ? localStorage.getItem('que1') : "";
var q2 = localStorage.getItem('que2') != null ? localStorage.getItem('que2') : "";
var q3 = localStorage.getItem('que3') != null ? localStorage.getItem('que3') : "";
var q4 = localStorage.getItem('que4') != null ? localStorage.getItem('que4') : "";
var q5 = localStorage.getItem('que5') != null ? localStorage.getItem('que5') : "";
var q6 = localStorage.getItem('que6') != null ? localStorage.getItem('que6') : "";
var q7 = localStorage.getItem('que7') != null ? localStorage.getItem('que7') : "";
var q8 = localStorage.getItem('que8') != null ? localStorage.getItem('que8') : "";

var ans1 = localStorage.getItem('que1_ans') != "null" ? localStorage.getItem('que1_ans') : "";
var ans2 = localStorage.getItem('que2_ans') != "null" ? localStorage.getItem('que2_ans') : "";
var ans3 = localStorage.getItem('que3_ans') != "null" ? localStorage.getItem('que3_ans') : "";
var ans4 = localStorage.getItem('que4_ans') != "null" ? localStorage.getItem('que4_ans') : "";
var ans5 = localStorage.getItem('que5_ans') != "null" ? localStorage.getItem('que5_ans') : "";
var ans6 = localStorage.getItem('que6_ans') != "null" ? localStorage.getItem('que6_ans') : "";
var ans7 = localStorage.getItem('que7_ans') != "null" ? localStorage.getItem('que7_ans') : "";
var ans8 = localStorage.getItem('que8_ans') != "null" ? localStorage.getItem('que8_ans') : "";

$("td.q-1").text(q1);
$("td.q-2").text(q2);
$("td.q-3").text(q3);
$("td.q-4").text(q4);
$("td.q-5").text(q5);
$("td.q-6").text(q6);
$("td.q-7").text(q7);
$("td.q-8").text(q8);

if (ans1 == "No") {
    $("td.ans-col-1").text("No");
} else if (ans1 == "I don't know") {
    $("td.ans-col-1").text("-");
} else if (ans1 == "Yes") {
    $("td.ans-col-1").text("Yes");
}
if (ans2 == "No") {
    $("td.ans-col-2").text("No");
} else if (ans2 == "I don't know") {
    $("td.ans-col-2").text("-");
} else if (ans2 == "Yes") {
    $("td.ans-col-2").text("Yes");
}
if (ans3 == "No") {
    $("td.ans-col-3").text("No");
} else if (ans3 == "I don't know") {
    $("td.ans-col-3").text("-");
} else if (ans3 == "Yes") {
    $("td.ans-col-3").text("Yes");
}

if (ans4 == "No") {
    $("td.ans-col-4").text("No");
} else if (ans4 == "I don't know") {
    $("td.ans-col-4").text("-");
} else if (ans4 == "Yes") {
    $("td.ans-col-4").text("Yes");
}

if (ans5 == "No") {
    $("td.ans-col-5").text("No");
} else if (ans5 == "I don't know") {
    $("td.ans-col-5").text("-");
} else if (ans5 == "Yes") {
    $("td.ans-col-5").text("Yes");
}
if (ans6 == "No") {
    $("td.ans-col-6").text("No");
} else if (ans6 == "I don't know") {
    $("td.ans-col-6").text("-");
} else if (ans6 == "Yes") {
    $("td.ans-col-6").text("Yes");
}

if (ans7 == "No") {
    $("td.ans-col-7").text("No");
} else if (ans7 == "I don't know") {
    $("td.ans-col-7").text("-");
} else if (ans7 == "Yes") {
    $("td.ans-col-7").text("Yes");
}

if (ans8 == "No") {
    $("td.ans-col-8").text("No");
} else if (ans8 == "I don't know") {
    $("td.ans-col-8").text("-");
} else if (ans8 == "Yes") {
    $("td.ans-col-8").text("Yes");
}
if ($(".results .q-7").text() == "null" || $(".results .q-7").text() == '') {
    $(".results .q-7").parent("tr").remove();
}
if ($(".results .q-8").text() == "null" || $(".results .q-8").text() == '') {
    $(".results .q-8").parent("tr").remove();
}
if (ans7 == "undefined") {
    $(".results .q-7").parent("tr").remove();
}
if (ans8 == "undefined") {
    $(".results .q-8").parent("tr").remove();
}

$('.email-results').on('click', function () {

    var sym_statement = localStorage.getItem('resultqualifyurl') ? localStorage.getItem('resultqualifyurl') : localStorage.getItem('resultnotqualifyurl');

    var mailSubject = $(".email-results").attr("mailsubject");
    var emailBody = $(".nonrichtext").text();
    var from = $(".email-results").attr("from");
    var currentdate = new Date();
    var date = currentdate.getDate() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getFullYear();
    var time = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: "2-digit"
    });
    var mailbody, mail;
    if (ans1 == "Idk") {
        ans1 = "I don't know";
    }
    if (ans2 == "Idk") {
        ans2 = "I don't know";
    }
    if (ans3 == "Idk") {
        ans3 = "I don't know";
    }
    if (ans4 == "Idk") {
        ans4 = "I don't know";
    }
    if (ans5 == "Idk") {
        ans5 = "I don't know";
    }
    if (ans6 == "Idk") {
        ans6 = "I don't know";
    }
    if (ans7 == "Idk") {
        ans7 = "I don't know";
    }
    if (ans8 == "Idk") {
        ans8 = "I don't know";
    }
    if ($(".HF-QuizComp-Resultpage table tbody tr").length == 6) {
        mailbody = "%0D%0A" + "1. " + q1 + " => " + ans1 + "%0D%0A" + "2. " + q2 + " => " + ans2 + "%0D%0A" + "3. " + q3 + " => " + ans3 + "%0D%0A" + "4. " + q4 + " => " + ans4 + "%0D%0A" + "5. " + q5 + " => " + ans5 + "%0D%0A" + "6. " + q6 + " => " + ans6;
        mail = "mailto:?subject=" + mailSubject + "&body=" + emailBody + "%0D%0A" + "%0D%0A" + "=== Abbott Heart Failure Quiz " + "%0D%0A" + "=== Based on Your Results, " + sym_statement + "%0D%0A" + mailbody + "%0D%0A" + "Completed " + date + " at " + time + "%0D%0A" + "%0D%0A" + "From," + "%0D%0A" + from;
        window.open(mail, "_self", "scrollbars=yes,resizable=yes,width=10,height=10");
    } else if ($(".HF-QuizComp-Resultpage table tbody tr").length == 7) {
        mailbody = "%0D%0A" + "1. " + q1 + " => " + ans1 + "%0D%0A" + "2. " + q2 + " => " + ans2 + "%0D%0A" + "3. " + q3 + " => " + ans3 + "%0D%0A" + "4. " + q4 + " => " + ans4 + "%0D%0A" + "5. " + q5 + " => " + ans5 + "%0D%0A" + "6. " + q6 + " => " + ans6 + "%0D%0A" + "7. " + q7 + " => " + ans7 + "%0D%0A";
        mail = "mailto:?subject=" + mailSubject + "&body=" + emailBody + "%0D%0A" + "%0D%0A" + "=== Abbott Heart Failure Quiz " + "%0D%0A" + "=== Based on Your Results, " + sym_statement + "%0D%0A" + mailbody + "%0D%0A" + "Completed " + date + " at " + time + "%0D%0A" + "%0D%0A" + "From," + "%0D%0A" + from;
        window.open(mail, "_self", "scrollbars=yes,resizable=yes,width=10,height=10");
    } else if ($(".HF-QuizComp-Resultpage table tbody tr").length == 8) {
        mailbody = "%0D%0A" + "1. " + q1 + " => " + ans1 + "%0D%0A" + "2. " + q2 + " => " + ans2 + "%0D%0A" + "3. " + q3 + " => " + ans3 + "%0D%0A" + "4. " + q4 + " => " + ans4 + "%0D%0A" + "5. " + q5 + " => " + ans5 + "%0D%0A" + "6. " + q6 + " => " + ans6 + "%0D%0A" + "7. " + q7 + " => " + ans7 + "%0D%0A" + "8. " + q8 + " => " + ans8 + "%0D%0A";
        mail = "mailto:?subject=" + mailSubject + "&body=" + emailBody + "%0D%0A" + "%0D%0A" + "=== Abbott Heart Failure Quiz " + "%0D%0A" + "=== Based on Your Results, " + sym_statement + "%0D%0A" + mailbody + "%0D%0A" + "Completed " + date + " at " + time + "%0D%0A" + "%0D%0A" + "From," + "%0D%0A" + from;
        window.open(mail, "_self", "scrollbars=yes,resizable=yes,width=10,height=10");
    }

});

if ($(".download-results").length) {
    $("body").addClass("printWin");
}

$('.download-results').on('click', function () {
    window.print();
    $(".o-header .sticky").css('display', 'block');
    $(".o-header .sticky").css('top', '0px');
    if ($(".m-hbanner").offset().top == "0") {
        if (window.innerWidth > 995) {
            $(".m-hbanner").css("margin-top", "130px");
        }
        if (window.innerWidth > 767 && window.innerWidth < 995) {
            $(".m-hbanner").css("margin-top", "97px");
        }
        if (window.innerWidth < 767) {
            $(".m-hbanner").css("margin-top", "101px");
        }
    }
});