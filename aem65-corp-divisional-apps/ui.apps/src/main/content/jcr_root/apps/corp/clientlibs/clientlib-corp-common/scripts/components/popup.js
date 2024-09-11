$(window).on("load", function () {
    // open confirmation pop-up on every refresh
    const confirmMedicalProfessionPopup = function () {
        const professionalPopup = $("#section-professionalPopup");
        professionalPopup.closest("#site-section-popup-content").addClass("medical-popup-wrapper")

        if (professionalPopup.length) {
            professionalPopup.closest("#site-section-popup-content").css("display", "flex")
            $("body").css({ 'overflow': 'hidden' })
        }

        // close popup once user confirms
        $("#section_disclaimer_confirm_btn").click(function () {
            $("body").css({ 'overflow': '' })
            professionalPopup.closest("#site-section-popup-content").css("display", "none")
        });
    };
    confirmMedicalProfessionPopup();
});
