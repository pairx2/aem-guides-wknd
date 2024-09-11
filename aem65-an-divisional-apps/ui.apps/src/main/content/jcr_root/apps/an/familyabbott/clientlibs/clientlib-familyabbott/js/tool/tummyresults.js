let displayTemplate = function (data) {
    let title = data["@title"] || "";
    let whatYouCanDoLabel = data["whatYouCanDoLabel"] || "What you can do:";
    let whatYouCanDo = data["whatYouCanDo"] || "";
    let product = data["product"] || "";
    let switchFormula = data["HowSafelySwitchFormula"] || "";
    let needMore = data["NeedMore"] || "";
    let $wrap = jQuery("<div class=\"ph-tummy-trouble-container\"/>");
    if (title) {
        let $title = jQuery("<div class=\"title a-title--fg a-title--fg-primary ph-tummy-trouble-title\"><h2 class=\"cmp-title__text\">" + title + "</h2></div>");
        $wrap.append($title);
    }
    if(whatYouCanDoLabel){
        let $subLabel = jQuery("<div class=\"title a-title--fg a-title--fg-secondary ph-tummy-trouble-subtitle\"><h3 class=\"cmp-title__text\">" + whatYouCanDoLabel + "</h3></div>");
        $wrap.append($subLabel);
    }
    if (whatYouCanDo) {
        let $whatYouCanDo = jQuery("<div class=\"ph-tummy-trouble-do\">" + whatYouCanDo + "</div><div class=\"a-rule\"><div class=\"a-horizontal-rule\"></div></div>");
        $wrap.append($whatYouCanDo);
    }
    if (product) {
        let $product = jQuery("<div class=\"ph-tummy-trouble-products\">" + product + "</div><div class=\"a-rule\"><div class=\"a-horizontal-rule\"></div></div>");
        $wrap.append($product);
    }
    if (switchFormula) {
        let $switchFormula = jQuery("<div class=\"ph-tummy-trouble-formula\">" + switchFormula + "</div>");
        $wrap.append($switchFormula);
    }
    if (needMore) {
        let $needMore = jQuery("<div class=\"ph-tummy-trouble-need-more\">" + needMore + "</div><div class=\"a-rule\"><div class=\"a-horizontal-rule\"></div></div>");
        $wrap.append($needMore);
    }
    return $wrap;
}

$(document).ready(function () {

    let renderData = function (data) {
        let div = jQuery.map(data,function(_data){
			return displayTemplate(_data);
        })
        return div;
    };

    let tummyResults = $('#ph-tummy-trouble-results');

    function getParams(url) {
        let params = {};
        let query = url;
        let vars = query.split('&');
        for (let i in vars) {
          let pair = vars[i].split('=');
          params[pair[0]] = decodeURIComponent(pair[1]);
        }
        return params;
  	}


    if (tummyResults.length) {
        let tummyURL = $('#ph-tummy-trouble-results-json').val();
        if (tummyURL) {
            $.ajax({
                url: tummyURL,
                method: "get",
                contentType: "application/json",
                success: function (results) {
                    let getValue = sessionStorage.getItem('phTummyTroubleTool');
                    let params = getParams(getValue);

                    let ansKeys = jQuery.map(params,function(value){
                        return value;
                    })

                    let filtered = results.filter(function (q) {
                        return ansKeys.indexOf(q["@id"]) !== -1;
                    });

                    $("#ph-tummy-trouble-results").html(renderData(filtered));
                }
            })
        }
    }
});

