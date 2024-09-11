function blurFormElements(INPUT_CONTENTS, ele, value) {

    if (value !== "" && value !== undefined) {
        if (!ele.hasClass(INPUT_CONTENTS)) {
            ele.addClass(INPUT_CONTENTS);
        }
    } else {
        ele.removeClass(INPUT_CONTENTS);
    }
    addBlur(INPUT_CONTENTS, ele);
}

function addBlur(INPUT_CONTENTS, ele) {
    if (!ele.hasClass(INPUT_CONTENTS)) {
        if (ele.hasClass("isFocused")) {
            ele.removeClass("isFocused").addClass("isBlured");
        }
    }
}

function focusFormElements(INPUT_CONTENTS, ele, value) {

    if (value !== "" && value !== undefined) {
        if (!ele.hasClass(INPUT_CONTENTS)) {
            ele.addClass(INPUT_CONTENTS);
        }
    } else {
        ele.removeClass(INPUT_CONTENTS);
    }

    addFocus(INPUT_CONTENTS, ele);
}

function addFocus(INPUT_CONTENTS, ele) {
    if (!ele.hasClass(INPUT_CONTENTS)) {
        if (ele.hasClass("isBlured")) {
            ele.removeClass("isBlured").addClass("isFocused");
        }
    }
}



(function(win) {
    if (!win.ABBOTT) {
        win.ABBOTT = {};
    }
    var ABBOTT = win.ABBOTT;
    ABBOTT.formElements = (function() {
        jQuery(".similac-form.static-form .form-control").on("focus", function() {
            var INPUT_CONTENTS = "input-contents";
            var ele = jQuery(this).parents(".similac-form-group");
            var value = jQuery(this).val();
            focusFormElements(INPUT_CONTENTS, ele, value);
        });
        jQuery(".similac-form.static-form .form-control").on("blur", function() {
            var INPUT_CONTENTS = "input-contents";
            var ele = jQuery(this).parents(".similac-form-group");
            var value = jQuery(this).val();
            blurFormElements(INPUT_CONTENTS, ele, value);
        });
    })();
})(window);