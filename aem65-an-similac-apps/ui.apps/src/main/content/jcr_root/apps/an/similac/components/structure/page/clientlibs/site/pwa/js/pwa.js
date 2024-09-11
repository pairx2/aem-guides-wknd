(function (document) {
    "use strict";
    var SW_PATH = "cq:sw_path";
    var pwaMetaData = document.getElementsByName(SW_PATH)[0];
    if (!pwaMetaData) {
        return;
    }
    var serviceWorker = pwaMetaData.getAttribute("content");
    
    function onLoad() {
        navigator.serviceWorker.register(serviceWorker);
    }
    // Use the window load event to keep the page load performant
    window.addEventListener("load", onLoad);

}(document));