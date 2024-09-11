(function(window, $, Granite) {
    "use strict";

    $(window).adaptTo("foundation-registry").register("foundation.validation.validator", {
        selector: "[data-foundation-validation~='abbott.externalizer.validator'],[data-validation~='abbott.externalizer.validator']",
        validate: function(el) {
            const v = el.value;
            if (v.length > 0) {
                let result = "";
                const url = window.location.origin + "/apps/abbott-platform/components/structure/page/externalizerCheck?domain=" + v;
                $.ajax({
                    url: url,
                    type: "get",
                    async: false,
                    success: function (data) {
                        result = data;
                    },
                    timeout: 2000
                })
                return result;
            }
        }
    });
})(window, Granite.$, Granite);
