$(document).ready(function () {
    handleTrustarc();
    handleFloatingBtn();
});

function handleTrustarc() {
	$('.trustarc-agree-btn').on('click', function() {
        $(this).parents('.consent-banner').hide(); 
    });
}

function handleFloatingBtn() {
    if ($('#ph-floating-btn').length > 0) {
        document.body.appendChild(document.getElementById('ph-floating-btn')); 
    }
}