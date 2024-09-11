var totalFun = function totalFun($cur, def) {
    var total = $cur.data("total") || def.total;
    var value = $cur.data("value") || 0;
    if($cur.data("total")){
        total = value + total
    }
    return value >= total ? 100 : Math.floor((value / total) * 100);
};

function getDonutPercent($cur, def) {
    return $cur.data("total") ? totalFun($cur, def) : $cur.data("percent");
}

function getDonutDuration($cur, def) {
    return $cur.data("duration") ? $cur.data("duration") : def.duration;
}

function getOptions($cur, def) {
    var opt = {};
    opt.backgroundColor = $cur.data("background") ?
        $cur.data("background") :
        def.backgroundColor;
    opt.progressColor = $cur.data("progress") ?
        $cur.data("progress") :
        def.progressColor;
    opt.value = $cur.data("value") ? $cur.data("value") : 0;
    opt.percent = getDonutPercent($cur, def);
    opt.duration = getDonutDuration($cur, def);
    return opt;
}

function setAnimation(opt, $cur) {
    if (opt.percent > 50) {
        var rightAni =
            "step-ani " + (opt.duration / opt.percent) * 50 + "ms step-end";
        var leftAni =
            "step-ani " + (opt.duration / opt.percent) * 50 + "ms step-start";
        $cur.find(".left").css({
            animation: leftAni,
            opacity: 0,
        });
        $cur.find(".right").css({
            animation: rightAni,
            opacity: 1,
        });
    }
}

function setDonut($cur, def) {
    var innerText = $cur.data("inner-text") || def.innerText;
    var opt = getOptions($cur, def);
    $cur.css({ width: def.size, height: def.size });
    var percentData = $cur.data("percent") ? opt.percent + "%" : opt.value;
    var textPercent = innerText ? percentData : "";
    $cur.html(
        '<div class="background"></div><div class="rotate"></div><div class="left"></div><div class="right"></div><div class=""><span>' +
        textPercent +
        "</span></div>"
    );
    var BG_COLOR_PROP = "background-color";
    $cur.find(".background").css(BG_COLOR_PROP, opt.backgroundColor);
    $cur.find(".left").css(BG_COLOR_PROP, opt.backgroundColor);
    $cur.find(".rotate").css(BG_COLOR_PROP, opt.progressColor);
    $cur.find(".right").css(BG_COLOR_PROP, opt.progressColor);

    var $rotate = $cur.find(".rotate");
    setTimeout(function() {
        $rotate.css({
            transition: "transform " + opt.duration + "ms linear",
            transform: "rotate(" + opt.percent * 3.6 + "deg)",
        });
    }, 0);
    setAnimation(opt, $cur);
}

function donutMain(ABBOTT) {
    var def = {
        backgroundColor: "#bfdeec",
        progressColor: "#007DB3",
        total: 35,
        percent: 0,
        duration: 1000,
        size: 100,
        innerText: false,
    };
    jQuery.fn.donut = function() {
        jQuery(this).each(function() {
            var $cur = jQuery(this);
            setDonut($cur, def);
        });
    };
}

function donutPWA(ABBOTT) {
    var def = {
        backgroundColor: "#FFFFFF",
        progressColor: "#009CDE",
        total: 35,
        percent: 0,
        duration: 1000,
        size: 30,
        innerText: false,
    };
    jQuery.fn.donut = function () {
        jQuery(this).each(function () {
            var $cur = jQuery(this);
            setDonut($cur, def);
        });
    };
}

(function (ABBOTT) {
    if (isPWA()) {
        donutPWA(ABBOTT);
    } else {
        donutMain(ABBOTT);
    }

})(window.ABBOTT);