$(document).ready(function () {
    function setCommonBlocksHeight() {
        // ph-common-blocks
        $('#ph-common-blocks--small, #ph-common-blocks').each(function() {
            let getCard = $(this).find(".m-card");

            $(getCard, this).each(function(){
                $(this).css('height','auto');
            }); 
        });
    }

    setTimeout(function() { 
        setCommonBlocksHeight();
    }, 100);
    
    $(window).on('resize', function(){
        setTimeout(function() { 
            setCommonBlocksHeight();
        }, 100);
    });
});