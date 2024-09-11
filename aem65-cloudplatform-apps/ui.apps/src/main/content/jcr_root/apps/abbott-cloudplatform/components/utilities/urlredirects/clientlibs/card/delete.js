(function (document, $) {
    'use strict';

    let ui = $(window).adaptTo("foundation-ui");
    $(window).adaptTo("foundation-registry").register("foundation.collection.action.action", {
        name: "abbott-platform.cloudconfig.delete",
        handler: function(name, el, config, collection, selections) {

            let formData = new FormData;
            formData.append('_charset_', 'UTF-8');
        	formData.append(':operation', 'delete');

            selections.forEach(function (v) {
				let item = $(v);
                let itemPath = item.data("foundation-collection-item-id") || item.data("path");

                formData.append(':applyTo', itemPath);
            });

            let actions = [{text: 'No'},
                           {text: 'Yes', warning: true, handler: function() { doDelete(formData) }}];

            ui.prompt("Delete Confirmation", "Are you sure you want to delete the selected configuration(s)?", "notice", actions);
        }
    });


    function doDelete(formData) {
        ui.wait();

        $.ajax({
            url: "/conf",
            type: "POST",
            processData: false,
  			contentType: false,
            data: formData
        }).done(function(data, textStatus, jqXHR) {
            let actions = [{text: 'Ok', primary: true, handler: function() {window.location.reload();}}];
            ui.prompt("Success", Granite.I18n.get('Configuration(s) deleted successfully!'), 'success', actions );

        }).fail(function(jqXHR, textStatus, errorThrown) {
            ui.alert("Error", Granite.I18n.get(jqXHR.responseText), 'error');
        }).always(function() {
            ui.clearWait();
        });
    }

})(document, Granite.$);