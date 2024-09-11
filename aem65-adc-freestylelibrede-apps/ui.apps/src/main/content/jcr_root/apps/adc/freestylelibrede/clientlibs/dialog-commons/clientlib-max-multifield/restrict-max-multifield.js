$(document).on("dialog-ready", function () {
$("[coral-multifield-add]").click(function() {
    let field = $(this).parent();
    let size = field.attr("data-maxlinksallowed");
    if (size) {
        let ui = $(window).adaptTo("foundation-ui");
		let totalCount = $(field).children('coral-multifield-item').length;
        if (totalCount >= size) {
            ui.alert("Warning", "Maximum " + size + " items are allowed!", "notice");
            return false;
        }
    }
});
});