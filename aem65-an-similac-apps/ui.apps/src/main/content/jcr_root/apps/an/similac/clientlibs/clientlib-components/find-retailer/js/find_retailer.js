(function (win) {
    if(!win.ABBOTT){
        win.ABBOTT = {};
    }
    var ABBOTT = win.ABBOTT;
    ABBOTT.findRetailer = (function () {
        var hashValue = window.location.href.split("#")[1];
        if (hashValue !== "" && hashValue !== undefined) {
            if (hashValue.indexOf('sku-') !== -1) {
                var sku = hashValue.split('-')[1];
                window.location.hash = "";
                $("#ps_widget").attr("ps-sku", sku);
            }
        }
    })();
})(window);
