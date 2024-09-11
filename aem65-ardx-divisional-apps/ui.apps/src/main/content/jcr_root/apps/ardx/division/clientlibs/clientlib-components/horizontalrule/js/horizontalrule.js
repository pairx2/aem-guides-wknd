
function rule(_this) {
    const attributes = {
        color: "data-rule-color",
        topMargin: "data-rule-margin-top-pixels",
        bottomMargin: "data-rule-margin-botton-pixels",
        thickness: "data-rule-thickness-pixels",
        topAndBottomMargin: "data-rule-margin-top-bottom-pixels",
        marginCheckbox: $(_this).attr("data-rule-margin-top-bottom-diffrent") === "true"
    };

    const elements = {
        color: $(_this).attr(attributes.color),
        topMargin: $(_this).attr(attributes.topMargin),
        bottomMargin: $(_this).attr(attributes.bottomMargin),
        thickness: $(_this).attr(attributes.thickness),
        topAndBottomMargin: $(_this).attr(attributes.topAndBottomMargin)
    };

    if (elements.color) {
        $(_this).css("border-color", elements.color);
    }
    if (attributes.marginCheckbox) {
        if (elements.topMargin) {
            $(_this).css("margin-top", elements.topMargin + "px");
        }
        if (elements.bottomMargin) {
            $(_this).css("margin-bottom", elements.bottomMargin + "px");
        }
    } else {
        if (elements.topAndBottomMargin) {
            $(_this).css("margin-top", elements.topAndBottomMargin + "px");
            $(_this).css("margin-bottom", elements.topAndBottomMargin + "px");
        }
    }
    if (elements.thickness) {
        $(_this).css("border-width", elements.thickness + "px");
    }

}


$(document).ready(function () {
    $('[data-js-component="horizontal-rule"]').each(function () {
        rule(this);
    });
});

$(window).resize(function () {
    $('[data-js-component="horizontal-rule"]').each(function () {
        rule(this);
    });
});