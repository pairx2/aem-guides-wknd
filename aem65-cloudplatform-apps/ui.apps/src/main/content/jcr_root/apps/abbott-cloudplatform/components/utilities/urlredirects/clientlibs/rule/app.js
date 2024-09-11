(function (document, $) {
    'use strict';

    let ui = $(window).adaptTo("foundation-ui");
    let editRuleForm = "#edit-rule-properties-form";
    let delRuleForm = "#delete-rule-properties-form";
	let stateChangeRuleForm = "#state-change-rule-properties-form";
    let backHref = "/urlredirects.html";

	$(document).on('foundation-contentloaded', function () {
        $(editRuleForm).on('submit', doEditRule);
        $(delRuleForm).on('submit', doDeleteRule);

        backHref = $(editRuleForm).data('content-path');
    });

    function goBack() {
        location.href = backHref;
    }

    function doEditRule(event) {
        if (null != event) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }

        
        if(isRuleValid()) {
            // Submit if the form is valid
			ui.wait();
			let $form = $(editRuleForm);
            let isNew = $(editRuleForm).data('is-new');
			let data = $form.serialize();
        
			$.ajax({
				url: $form.attr('action'),
				type: "POST",
				data: data,
                cache: false
			}).success(function (data, textStatus, jqXHR ) {
                let actions = [{text: 'Ok', primary: true, handler: goBack}];
                if (isNew) {
                	ui.prompt("Success", Granite.I18n.get('Rule created successfully!'), 'success', actions );
                } else {
                    ui.prompt("Success", Granite.I18n.get('Rule updated successfully!'), 'success', actions );
                }
        	}).fail(function (jqXHR, textStatus, errorThrown) {
            	ui.notify("Error", Granite.I18n.get(jqXHR.responseText), 'error');
            }).always(function() {
				ui.clearWait();
			});
        }
    }

    function isRuleValid() {
        let validatePath = $(editRuleForm).data("post-url-validate");
        let $form = $(editRuleForm);
		let data = $form.serializeArray();
        let valid = false;

         ui.wait();
		$.ajax({
			url: validatePath,
			type: 'POST',
            data: data,
            cache: false,
			async: false,
            dataType: "json"
		}).success(function (resp) {
			let errorCode = resp.errorCode;
            if(errorCode == 0) {
                valid = true;
            } else {
                valid = false;
                ui.notify("Error", resp.message, 'error');
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            valid = false;    
            ui.notify("Error", Granite.I18n.get(jqXHR.responseText), 'error');
        }).always(function() {
			ui.clearWait();
			});

        return valid;
    }

    function doDeleteRule(event) {
        if (null != event) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }

        let actions = [{text: 'No'},
                       {text: 'Yes', warning: true, handler: performDelete}];

		ui.prompt("Delete Confirmation", "Are you sure you want to delete this rule?", 'notice', actions);
    }

    function performDelete() {
        ui.wait();
		let $form = $(delRuleForm);
        let data = $form.serialize();

        $.ajax({
            url: $form.attr('action'),
            type: "POST",
            data: data,
            cache: false
        }).success(function (data, textStatus, jqXHR ) {
            performStateChange();
			let actions = [{text: 'Ok', primary: true, handler: goBack}];
            ui.prompt("Success", Granite.I18n.get('Rule deleted successfully!'), 'success', actions );
        }).fail(function (jqXHR, textStatus, errorThrown) {
            ui.notify("Error", Granite.I18n.get(jqXHR.responseText), 'error');
        }).always(function() {
            ui.clearWait();
        });
    }

    function performStateChange() {
		let $form = $(stateChangeRuleForm);
        let data = $form.serialize();
        $.ajax({
            url: $form.attr('action'),
            type: "POST",
            data: data,
            cache: false
        });
    }

})(document, Granite.$);