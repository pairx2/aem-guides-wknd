//marketo javascript
let $marketoContainer = $(".js-marketo-container");
if ($marketoContainer.data("formId") > 0) {
    let marketoUrl = "//app-sj21.marketo.com/js/forms2/js/forms2.min.js";    
    $.getScript(marketoUrl, function () {
        MktoForms2.loadForm("//app-sj21.marketo.com", $marketoContainer.data("munchkinId"), $marketoContainer.data("formId"));
        MktoForms2.whenReady(function (form) {
            $(function () {
                $(window).scrollTop(0);
            });
            form.onSuccess(function () {
                form.getFormElem().hide();
                $(".js-success-message").removeClass("d-none");
                $(window).scrollTop(0);
                return false;
            });
        });
    });
}

//external frame javascript

$('iframe').each(function () {
    let _this = $(this);
    let _firstLoad = true;
    let loadRules = $(this).data("loadRules");
    if (typeof $(this).data("loadRules") !== 'undefined') {
        if ( loadRules[0]?.appendParameters && _firstLoad) {
            let query = window.location.search;
            let newSrc = _this.attr("data-src");
            if (newSrc) {
                newSrc = newSrc + query;
            }
            if (_this.hasClass('lazy')) {
                _this.attr("data-src", newSrc);
            } else {
                _this.attr("src", newSrc);
            }
            _firstLoad = false;
        }
        if (loadRules[0]?.scrollToTop) {
            $(this).on("load", function () {
                window.parent.parent.scrollTo(0, 0);
            });
        }
    }
});

