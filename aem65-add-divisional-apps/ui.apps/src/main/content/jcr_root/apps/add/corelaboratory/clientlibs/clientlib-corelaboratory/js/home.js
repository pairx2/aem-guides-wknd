// hash navigation
$(window).on('hashchange', function(e){
    var hashId = window.location.hash;
    navigateToSection(hashId, false, e);
    // Calling the navigation since the lazy loaded images changes the position of element
    setTimeout(function(){
        navigateToSection(hashId, true, e);
    }, 200);
});
$('a[href^="#"]:not(.a-tabs__nav-link)').click(function(e){
    var currentHash = $(this).attr('href');
    setTimeout(function(){
        navigateToSection(currentHash, true, e);
    }, 200);
});
$(window).on('load', function(){
    var hashId = window.location.hash;
    navigateToSection(hashId, false);
    // Calling the navigation since the lazy loaded images changes the position of element
    setTimeout(function(){
        navigateToSection(hashId, true);
    }, 200);
});
function navigateToSection(hashId, toAnimate, e) {
    if (hashId != '' && $(hashId).length > 0) {
        if (e) {
            e.preventDefault();
        }
        var ele = $(hashId);
        if(hashId == '#section-gallery') {
            document.location = hashId;
            return;
        }
        var headerHeight = $('.o-header__sticky-section').outerHeight();
        var topNavHeight = $('.o-header__secondary-top-nav').outerHeight();
        if (topNavHeight) {
            headerHeight += topNavHeight;
        }
        var breadcumbHeight = $('.abbott-breadcrumb').outerHeight();
        if (breadcumbHeight != null) {
            headerHeight += breadcumbHeight;
        }
        var tabsPanel = $(hashId+'.cmp-container').closest('.cmp-tabs__tabpanel');
        if(tabsPanel.length > 0) {
            var tabPanelId = tabsPanel.attr('id');
            var tabPanelButton = $('[href="#'+tabPanelId+'"]');
            $('.cmp-tabs__tabpanel.a-tabs__tab-pane.tab-pane.cmp-tabs__tabpanel--active.active').removeClass('cmp-tabs__tabpanel--active active');
            $('.cmp-tabs__tab.a-tabs__nav-link.nav-item.a-tabs__tab-pane.tab-pane.cmp-tabs__tab--active.show.active').removeClass('cmp-tabs__tab--active show active');
            tabsPanel.addClass('cmp-tabs__tabpanel--active active');
            tabPanelButton.addClass('cmp-tabs__tab--active show active');
            ele = tabPanelButton;
        }
        var elementTop = ele.offset().top;
        window.scroll({
            top: elementTop - headerHeight,
            left: 0
        });

    }
}