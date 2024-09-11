$(document).ready(function () {
    let windowWidth = $(window).width();

    function setCommonTilesHeight() {
        // ph-common-tiles
        $('#ph-common-tiles').each(function() {
            let highestBox = 0;
            let getCard = $(this).find(".m-card");
            
            $(getCard, this).each(function(){
                $(this).css('height','auto');
                
                if($(this).height() > highestBox) {
                    highestBox = $(this).height(); 
                }
            });  
            
            if(windowWidth >= 768) {
                $(getCard, this).height(highestBox);
            }
        });
    }

    setTimeout(function() { 
        setCommonTilesHeight();
    }, 100);
    
    $(window).on('resize', function(){
        setTimeout(function() { 
            setCommonTilesHeight();
        }, 100);
    });
});