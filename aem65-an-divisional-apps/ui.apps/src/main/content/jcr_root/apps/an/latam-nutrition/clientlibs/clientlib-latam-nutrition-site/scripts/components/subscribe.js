$(document).on('ready',function() {  
    if ($('.o-form-container--profile').length > 0 && window.matchMedia('(max-width: 767px)').matches) {
		$('.o-form-container--base.o-form-container--profile').parents('.a-container--base.a-container--fixed').css({padding:'15px'});
    }
});