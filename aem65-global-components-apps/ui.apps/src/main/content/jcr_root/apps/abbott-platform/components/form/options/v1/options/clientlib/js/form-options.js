(function(document, $) {
    "use strict";

    /* on click of initial state dropdown and type dropdown hiding the unwanted options*/
    $(document).on('click',"coral-select.coral-Form-field.cmp-form-options__editor-type.options-initial-state,coral-select.coral-Form-field.coral3-Select[name$='./type']", function(e) {
      const selectedType = $("coral-select.coral-Form-field.coral3-Select[name$='./type']").val();
      const currentDialog = $(this).closest(".formoptions-container");
      const initialStateDropDown = currentDialog.find("coral-select.coral-Form-field.coral3-Select.options-initial-state");
        /* if selected type is checkbox, hiding unwanted options*/
		if(selectedType == "checkbox") {
            $(initialStateDropDown).each(function(index){
                const optionsDropDown = $(this).find("coral-selectlist.coral3-SelectList.coral3-Select-selectList");
				const children = optionsDropDown.find("coral-selectlist-item");
                $(children).each(function(){
                    $(this).removeClass("hide");
                })
            })

        }

        /* if selected type is radio, hiding unwanted options*/
        if(selectedType == "radio") {
            $(initialStateDropDown).each(function(index){
                const optionsDropDown = $(this).find("coral-selectlist.coral3-SelectList.coral3-Select-selectList");
				const children = optionsDropDown.find("coral-selectlist-item");
                $(children).each(function(){
                    $(this).removeClass("hide");
                    if($(this).text() == 'Indeterminate'){
						$(this).addClass("hide");
                    }
                })
            })

        }

        /* if selected type is drop-down, multiselect dropdown hiding unwanted options*/
        if(selectedType == "drop-down" || selectedType == "multi-drop-down") {
            $(initialStateDropDown).each(function(index){
                const optionsDropDown = $(this).find("coral-selectlist.coral3-SelectList.coral3-Select-selectList");
				const children = optionsDropDown.find("coral-selectlist-item");
                $(children).each(function(){
                    $(this).removeClass("hide");
                    if($(this).text() == 'Checked Disabled' || $(this).text() == 'Error' || $(this).text() == 'Indeterminate'){
						$(this).addClass("hide");
                    }
                })
            })

        }

	});

	/* on change of type dropdown value changing the initial value */
    $(document).on('change',"coral-select.coral-Form-field.coral3-Select[name$='./type']", function(e) {
        const currentDialog1 = $(this).closest(".formoptions-container");
		const initialStateDropDown1 = currentDialog1.find("coral-select.coral-Form-field.coral3-Select.options-initial-state");
        $(initialStateDropDown1).each(function(index){
          $("coral-select[name*='./items/item']").val('default');
        })
    });
})(document,Granite.$);