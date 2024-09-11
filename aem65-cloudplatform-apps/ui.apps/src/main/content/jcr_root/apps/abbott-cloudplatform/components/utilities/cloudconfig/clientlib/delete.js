(function(window, document, $, Granite) {
    "use strict";

    let ui = $(window).adaptTo("foundation-ui");
    $(window).adaptTo("foundation-registry").register("foundation.collection.action.action", {
        name: "abbott-platform.cloudconfig.delete",
        handler: function(name, el, config, collection, selections) {
            let message = $("<div/>");
            let intro = $("<p/>").appendTo(message);
            intro.text(Granite.I18n.get("You are going to delete the selected item"));

            ui.prompt(Granite.I18n.get("Delete"), message.html(), "notice", [{
                text: Granite.I18n.get("Cancel")
            }, {
                text: Granite.I18n.get("Delete"),
                warning: true,
                handler: function() {
                    doDelete(config.data.path);
                }
            }]);
        }
    });

    function doDelete(path) {
        ui.wait();
        $.ajax({
            url: path,
            type: "POST",
            data: {
                _charset_: "UTF-8",
                ":operation": "delete"
            }
        }).done(function(data, textStatus, jqXHR) {
            window.location.reload();
        }).fail(function(jqXHR, textStatus, errorThrown) {
            let message = Granite.I18n.getVar($(jqXHR.responseText).find(".foundation-form-response-description").next().html());
            ui.alert(Granite.I18n.get("Error"), message, "error");
        }).always(function() {
            ui.clearWait();
        });
    }
})(window, document, Granite.$, Granite);
