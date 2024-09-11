$(document).ready(function () {
    let windowWidth = $(window).width();

    function setLifeStageHeight() {
        // ph-lifestage
        $('#ph-life-stages--left, #ph-life-stages--right').each(function() {
            let highestBox = 0;
            let getButton = $(this).find(".a-button .btn");
            
            $(getButton, this).each(function(){
                $(this).css('height','auto');
                
                if($(this).height() > highestBox) {
                    highestBox = $(this).height(); 
                }
            });  
            
            if(windowWidth >= 768) {
                $(getButton, this).height(highestBox);
            }
        });
    }

    setLifeStageHeight();
    
    $(window).on('resize', function(){
        setLifeStageHeight();
    });
});