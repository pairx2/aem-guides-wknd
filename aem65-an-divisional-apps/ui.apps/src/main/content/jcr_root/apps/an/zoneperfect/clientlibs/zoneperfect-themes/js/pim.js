$(document).ready(function () {
    let checkForm = setInterval(function() {
        if ( $('#pim-form') && $('#pim-form').length) {
            clearInterval(checkForm);
            let productsForm = $('#pim-form');
            productsForm.parents('.formcontainer').hide();
            productsForm.find('.o-form-container__element .o-form-container__buttons .btn[type="submit"]')[0].click();
        }  
    }, 100);
    if($('#product-detail-accordion').length > 0) {
		$('[name="Flavor"] li a').on('click', function(e) { 
			e.preventDefault(); 
			let pageUrl = $(this).attr('href');
			window.location = pageUrl;
		});
	}
    $('#dropdown-form-options .a-dropdown__field').on('click', function() {
        $('.a-dropdown ul[name="Size"]').closest('.a-dropdown__field').removeClass('active');
    });
});