$(document).ready(function () {
	const whyJoinContainer = $("#homewhyjoincolumncontrol");
    const postLoginCarousel = $("#carouselPostLogin");
    const preLoginCarousel = $("#carouselPreLogin");

    if (isUserLoggedIn()) {
        // if user is logged in - hide why join
        if (whyJoinContainer.length) {
            whyJoinContainer.hide();
        }
		//show Logged in carousel
         if (preLoginCarousel.length) {
            preLoginCarousel.hide();
            postLoginCarousel.show();
        }
    }else{
        //show Logged out carousel
         if (postLoginCarousel.length) {
            postLoginCarousel.hide();
            preLoginCarousel.show();
        }
    }
});