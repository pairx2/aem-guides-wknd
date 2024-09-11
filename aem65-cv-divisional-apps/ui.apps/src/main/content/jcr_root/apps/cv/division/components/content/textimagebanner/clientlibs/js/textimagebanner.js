(function(document, $) {
    "use strict";
    
    $(document).on("click", ".cq-dialog-submit", function (e) {

	 let imageval = $(".coral-Form-field[name='./imagepath']").val();
        
	 if(imageval != '') {
 
		   $(".coral-Form-field[name*='./imagepath']").each(function() {
 
			  if ($(this).val() == '') {
				  $(this).prop('required', true);
			  }
		  });
		  $(".coral-Form-field[name*='./altText']").each(function() {
			  let currectAltTxt = $(this);
			  let altIndx = $(this).closest('coral-multifield-item').index();
			  $(".coral-Form-field[name*='./decorative']").each(function() {
				  if ($(this).closest('coral-multifield-item').index() == altIndx) {
					  if ($(this).prop('checked') == true) {
						  currectAltTxt.val("");
						  currectAltTxt.prop('required', false);
					  } else {
						  currectAltTxt.prop('required', true);
					  }
				  }
			  });
		  });
 
	  } else {
		  $(".coral-Form-field[name*='./altText']").each(function() {
 
			  if ($(this).val() == '') {
				  $(this).prop('required', false);
			  }
		  });
	  }
    });

    $(document).on('change','coral-checkbox[name="./textDam"]', function(e){
        if(e.target.checked){
			let altText = $('foundation-autocomplete[name="./imagePath"] .coral-InputGroup-input').val().split("/").slice(-1).join().split(".").shift();
        	$('.coral-Form-field[name="./altText"]').val(altText);
        } else {
			$('.coral-Form-field[name="./altText"]').val('');
        }

	})


})(document, Granite.$);