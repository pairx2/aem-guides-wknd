$(document).ready(function(){
	if ($("#homeTilesSection").length) {
		$("#homeTilesSection.cmp-container").closest('.container').addClass('padding-zero homeTilesContainer');
	}
	if ($("#menu-section").length) {
		$("#menu-section.cmp-container").closest('.container').addClass('padding-zero menuSectionContainer');
	}
	if ($("#homeCarousalSection").length) {
		$("#homeCarousalSection.cmp-container").closest('.container').addClass('padding-zero homeCarousalContainer');
	}
});