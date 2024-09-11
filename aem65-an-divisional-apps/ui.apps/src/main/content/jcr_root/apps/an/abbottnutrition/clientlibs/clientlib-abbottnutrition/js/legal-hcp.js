$(document).ready(function () {
    let legalPopUp = $(document).find('#btnModalLegalPopUp')
    if (legalPopUp && legalPopUp.length > 0 && localStorage.getItem('firstVisit') !== "1" && isOnPublish()) {
        setTimeout(function () {
            $('#btnModalLegalPopUp').parent('.m-popup').trigger('click');
            $('body').on('click', '#btnModalLegalPopUp-modal .a-button--primary .btn', function () {
                localStorage.setItem("firstVisit", "1");
            });
        }, 1000);
    }
	
	let searchResultsPopUp = $(document).find('#btnModalSearchResultsPopUp');
	if (searchResultsPopUp && searchResultsPopUp.length > 0 && isOnPublish()) {
			$('#btnModalSearchResultsPopUp').hide();
        
		if (localStorage.getItem('firstVisit') !== "1") {
			setTimeout(function () {
				$('#searchResultsPopUp').parent('.m-popup').trigger('click');
				$('body').on('click', '#searchResultsPopUp-modal .a-button--primary .btn', function () {
					localStorage.setItem("firstVisit", "1");
				});
			}, 1000);
		}
	}
});