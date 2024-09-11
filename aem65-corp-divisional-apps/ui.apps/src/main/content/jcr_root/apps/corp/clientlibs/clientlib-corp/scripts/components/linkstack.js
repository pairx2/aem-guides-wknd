// js code to add background color to match same look and feel as in 6.3
$(function () {
    const currentPagePath = window.location.pathname;
    if ($('.linkstack--redesign-btn').length > 0 && isOnPublish()) {
        linkStackDynamicStyle('.linkstack--redesign-btn .m-link-stack .a-link__text', 'redesign-btn-link')
    }
    if ($('.linkstack-active-tab').length > 0) {
        linkStackDynamicStyle('.linkstack-active-tab .m-link-stack .a-link__text', 'link-stack-active-tab')
    }

    if ($('.linkstack--list-type').length > 0 && isOnPublish()) {
        linkStackDynamicStyle('.linkstack--list-type .m-link-stack .a-link__text', 'type-active-tab')

        $(".linkstack--list-type .abt-icon-down-arrow").on('click', function () {
            $(this).toggleClass("rotate-arrow");
        })
    }
    //Code for linkstack tabs style changes
    if ($('.linkstack-tabs').length > 0 && isOnPublish()) {
        linkStackDynamicStyle('.linkstack-tabs .m-link-stack .a-link__text', 'active-tab')
    }

    //JS function to check class name's hierarchy and as per functionality add required class names to it
    function linkStackDynamicStyle(className, dynamicClassName) {
        $(className).each(function () {
            if ($(this).attr('href') == currentPagePath) {
                $(this).parent(".a-link").addClass(dynamicClassName);
            }
        })
    }
});