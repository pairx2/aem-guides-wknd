(function (win) {
    if(!win.ABBOTT){
        win.ABBOTT = {};
    }
    var ABBOTT = win.ABBOTT;
    var byID = document.getElementById.bind(document);
    var tummyResults = byID("tummy-results");
    var displayTemplate = function (data) {
        var title = data["@title"] || "";
        var whatYouCanDoLabel = data["whatYouCanDoLabel"] || "What you can do:";
        var whatYouCanDo = data["whatYouCanDo"] || "";
        var product = data["product"] || "";
        var switchFormula = data["HowSafelySwitchFormula"] || "";
        var needMore = data["NeedMore"] || "";
        var $wrap = jQuery("<div/>");
        if (title) {
            var $title = jQuery("<h2 class=\"tummy-r-title\">" + title + "</h2>");
            $wrap.append($title);
        }
        if(whatYouCanDoLabel){
            var $subLabel = jQuery("<h3 class=\"sub-label\">" + whatYouCanDoLabel + "</h3>");
            $wrap.append($subLabel);
        }
        if (whatYouCanDo) {
            var $whatYouCanDo = jQuery("<div class=\"you-can-do\">" + whatYouCanDo + "</div>");
            $wrap.append($whatYouCanDo);
        }
        if (product) {
            var $product = jQuery("<div class=\"product-class greyBdr my-1_375\">" + product + "</div>");
            $wrap.append($product);
        }
        if (switchFormula) {
            var $switchFormula = jQuery("<div class=\"switchFormula\">" + switchFormula + "</div>");
            $wrap.append($switchFormula);
        }
        if (needMore) {
            var $needMore = jQuery("<div class=\"needMore\">" + needMore + "</div>");
            $wrap.append($needMore);
        }
        return $wrap;
    }

    var renderData = function (data) {
        var div = jQuery.map(data,function(_data){ 
return displayTemplate(_data);
        })
        return div;
    };

    if (tummyResults) {
        var tummyURLSelector = byID("tummyResultsJSON");
        var tummyURL = tummyURLSelector && tummyURLSelector.value;
        if (tummyURL) {
            var ajaxConfig = {
                url: tummyURL,
                method: "get",
                contentType: "application/json",
                headers:
                {
                    "Store": ABBOTT.config.storeName
                }
            };

            var success = function (results) {
                var params = ABBOTT.getParams(decodeURIComponent(window.location.href));

                var ansKeys = jQuery.map(params,function(value){
                    return value;
                })

                var filtered = results.filter(function (q) {
                    return ansKeys.indexOf(q["@id"]) !== -1;
                });              
                $("#tummy-results").html(renderData(filtered));
            }

            ABBOTT.http.makeAjaxCall(ajaxConfig).done(success);
        }
    }
})(window);

