$(document).ready(function () {
    // Back to top 
    $('#ph-back-to-top').on('click',function(e) {
        e.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, 600);
    });
});