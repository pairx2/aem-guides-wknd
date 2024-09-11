(function(window, $) {
    "use strict";

    /**
     * This function is used to display useful information for the ecommerce enabled checkbox
     * if the parent is enabled/disabled the messaging will display that it is enabled/disabled
     * This will also provide a link to the page properties of where this is configured
     * @param result
     * @param data
     */
    function displayEcommercePropertyMessaging (result, data) {
        try{
            const resultPath = result.substring(result.indexOf(':') + 1).replace(')','').trim();
            const resultUrl = "/mnt/overlay/wcm/core/content/sites/properties.html?item=" + encodeURIComponent(resultPath);
            const jcrContent = Granite.HTTP.eval(resultPath + "/jcr:content.json");
            if(window.location.pathname + window.location.search !== resultUrl){
                const parent = data.parentElement.parentElement;
                if (result.split(" ")[0] === "true") {
                    // remove the property as if it is present it will automatically disable commerce
                    // on saving properties which could create issues and unexpected configurations
                    data.parentElement.remove();
                }
                const commerceEnabled = (jcrContent['commerceEnabled'] === 'true') ? 'enabled' : 'disabled';
                let alert = new Coral.Alert().set({
                    header: {
                        innerHTML: "Ecommerce is currently " + commerceEnabled + "."
                    },
                });
                let aTag = document.createElement('a');
                aTag.setAttribute('href',resultUrl);
                let span = document.createElement('span');
                span.innerText = "Go to where configured";
                span.setAttribute("title","Click here to go to page properties where Ecommerce is configured");
                aTag.appendChild(span);
                alert.footer.appendChild(aTag);
                parent.appendChild(alert);
            }
        }catch(err){
            console.log(err);
        }
    }

    $(document).ready(function() {
        $(".checkParentNodesConfig").each(function(counter, data) {
            const property = data.getAttribute("name")?.split("/")?.pop();
            const pagePath = window.location.search;
            let result = "";
            const url = window.location.origin + "/apps/abbott-platform/components/structure/page/parentConfig" + pagePath + "&property=" + property;
            $.ajax({
                url: url,
                type: "get",
                async: false,
                success: function (respData) {
                    result = respData;
                },
                timeout: 2000
            });
            if (result.length > 0) {
                if (property === "commerceEnabled") {
                     if (result.split(" ")[0] === "true") {
                         displayEcommercePropertyMessaging(result, data);
                     }
                } else {
                    data.setAttribute("placeholder", result);
                }
            }
        });
    });
})(window, Granite.$);
