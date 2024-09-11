$(document).ready(function(){

    function calculateSarcTotal(){
        let sarcTotal = 0;

        // Calculate total by iterating through checked radio buttons.
        $(".a-container--sarc input[type='radio']:checked").each(
            function() {
                sarcTotal += parseInt($(this).val());
            }
        )

        // Display result text based on sarcTotal.
        if(sarcTotal <= 3) {
            $(".a-container--sarc .columncontrol:last-child .columncontrol__column:first-child .a-text--base:first-child").addClass('showText');
            $(".a-container--sarc .columncontrol:last-child .columncontrol__column:first-child .a-text--base:last-child").removeClass('showText');
        } else {
            $(".a-container--sarc .columncontrol:last-child .columncontrol__column:first-child .a-text--base:first-child").removeClass('showText');
            $(".a-container--sarc .columncontrol:last-child .columncontrol__column:first-child .a-text--base:last-child").addClass('showText');
        }

        // Update total text.
        $(".a-container--sarc .columncontrol:last-child .columncontrol__column:last-child .a-text--base p span.target").text(' ' + sarcTotal);
    }

    // Add data-value dynamically to span
    $(".a-container--sarc input[type='radio']").each(
        function() {
            let ele = $(this).siblings('.a-radio__custom');
            $(ele).attr('data-value',$(this).val());
        }
    )

    // hide results section
    $(".a-container--sarc input[type='radio']").on('change', function() {
        $(".a-container--sarc .columncontrol:last-child").addClass('show-results');
        calculateSarcTotal();
    });

});
