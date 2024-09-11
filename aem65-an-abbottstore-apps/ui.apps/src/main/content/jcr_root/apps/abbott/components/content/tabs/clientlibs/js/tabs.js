(function(ABBOTT){
    ABBOTT.tabs = (function(){
        jQuery(function(){
            var $wrapper = jQuery('.cmp-tabs.pdp-tabs');
            var tabsList = $wrapper.find('.cmp-tabs__tab');
            var panelList = $wrapper.find('.cmp-tabs__tabpanel');

            function switchMobileTab(e) {
                var $currentTabPanel = jQuery(this).parent();
                var index = $currentTabPanel.index('.cmp-tabs__tabpanel');

                // No tab switch in glucerna
                if(ABBOTT.utils.isGlucerna){
                    return;
                }

                // Switch tab content
                $currentTabPanel
                    .addClass('cmp-tabs__tabpanel--active')
                    .siblings().removeClass('cmp-tabs__tabpanel--active');
                
                // Make desktop tab active for current one
                $wrapper
                    .find('.cmp-tabs__tab').eq(index).addClass('cmp-tabs__tab--active')
                    .siblings().removeClass('cmp-tabs__tab--active');
            }

           
                panelList.each(function(index, element) {
                    if(jQuery(element).find('.remove').length) {
                        (jQuery(tabsList[index]).addClass('d-none'));
                    }
                });
            

            $wrapper.on('click.tabs touchstart', '.cmp-tabs__tab-mobile', switchMobileTab);
        });
    })();
})(window.ABBOTT || (window.ABBOTT = {}));