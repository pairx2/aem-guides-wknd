$(function() {

    const classes = {
        headerLeft0: "o-header--left0"
    }
    const header = $(".o-header");
    const headerActivity = header.find(".o-header__user-activity");
    const searchEle = header.find(".o-header__search .a-search");
    const alertBar = $(".m-alert--wrapper");
    const stickySection = header.find('[data-sticky="true"]');

    if (headerActivity) {
        headerActivity.css("margin-right", "0");
        headerActivity.removeClass(classes.headerLeft0);
    }

    if (searchEle) {
        searchEle.removeClass(classes.headerLeft0);

    }

    let utilityElements = $('.o-header__utility-nav').children();
        utilityElements.each(function(){
            const elem = `<li class="m-mega-menu__mobile-item-wrapper only-on-mobile">
                ${$(this).prop('outerHTML')}
            </li>`;
            $('#navbarCollapseWrapper > ul.navbar-nav').append(elem);
        });

    $(window).scroll(function () {
      const stickyTopPos = header.offset()?.top;
      if(alertBar && alertBar.length === 1 && alertBar.find(".need-sticky-alert").length > 0) {
        if (window.scrollY > stickyTopPos) {
          if(alertBar.hasClass("m-alert--hide")) {
            alertBar.removeClass("m-alert--sticky");
            stickySection.css('top', 0);
          } else {
            alertBar.addClass("m-alert--sticky");
            stickySection.css('top', alertBar.height());
          }
        } else if ((window.scrollY < stickyTopPos || window.scrollY === stickyTopPos)) {
          alertBar.removeClass("m-alert--sticky");
        }
      }
    });
});
