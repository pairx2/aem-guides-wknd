(function (win) {
  if(!win.ABBOTT){
      win.ABBOTT = {};
  }
  var ABBOTT = win.ABBOTT;
  ABBOTT.tab = (function(){


  var $wrapper = jQuery('.cmp-tabs.pdp-tabs');
  var tabsList = $wrapper.find('.cmp-tabs__tab');
  var panelList = $wrapper.find('.cmp-tabs__tabpanel');

  function switchMobileTab(e) {

    var $currentTabPanel = jQuery(this).parent();
    var index = $currentTabPanel.index('.cmp-tabs__tabpanel');


    // Switch tab content
    $currentTabPanel.toggleClass('cmp-tabs__tabpanel--active');

    // Make desktop tab active for current one
    $wrapper.find('.cmp-tabs__tab').eq(index).toggleClass('cmp-tabs__tab--active');
    
  }
  panelList.each(function(index, element) {
    if(jQuery(element).find('.remove').length) {
        (jQuery(tabsList[index]).addClass('d-none'));
    }
});
jQuery('.remove').parents('.cmp-tabs__tab-content').parents('.cmp-tabs__tabpanel').hide();
  $wrapper.on('click', '.cmp-tabs__tab-mobile', switchMobileTab);
})();
})(window);

