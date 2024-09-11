$(document).ready(function () {
    let anHealthTabs = $('#an-healthcondition-tabs')
    if (anHealthTabs && anHealthTabs.length > 0) {
        $("#an-healthcondition-tabs .cmp-tabs__tablist a").on('click', function () {
                $(this).addClass('active');
                let activeTabbackColor = $(this).css('background-color');
                $("#an-healthcondition-tabs .cmp-tabs__tablist a").css('border-bottom', `2px solid ${activeTabbackColor}`)
        });
    }
});