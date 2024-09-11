$(document).ready(function () {
    function setTabsContentHeight() {
        // ph-tab-contents
        $('#ph-tab-contents, #ph-tab-contents--2').each(function() {
            let highestBox = 0;
            let getCard = $(this).find(".m-card:visible");
            
            $(getCard, this).each(function(){
				$(this).css('height','auto');
                
                if($(this).height() > highestBox) {
                    highestBox = $(this).height(); 
                }

                $(getCard, this).height(highestBox);
            }); 
        });
    }

    if($('#ph-tab-contents, #ph-tab-contents--2').length){
        function tabContents() {
            $('.tabs').each(function(){
                let windowWidth = $(window).width();

                let tabButton = $(this).find(".a-tabs__nav-link");
                let tabContent = $(this).find(".a-tabs__content");

                tabContent.css('min-height', 'auto');

                let tabContentHeight = tabContent.height();

                if(windowWidth >= 992) {
					tabContent.css('min-height', tabContentHeight);
                }
        
                $(tabButton, this).each(function(){
                    $(this).on('click', function () {
                        setTimeout(function() { 
                            setTabsContentHeight();
                        }, 100);
                    });
                });
            })
        }

        setTimeout(function() { 
            tabContents();
        }, 100);

        $(window).on('resize', function(){
            setTimeout(function() { 
                tabContents();
            }, 100);
        });
    }
	
	if($('.custom-tab-playtime').length){
		$(window).on('scroll',function() {
			if($('[data-sticky="true"]').hasClass("sticky")) {
				$('.custom-tab-playtime .a-tabs__nav').css("top",$('[data-sticky="true"]').height()+"px");
			}
		});
	}
});