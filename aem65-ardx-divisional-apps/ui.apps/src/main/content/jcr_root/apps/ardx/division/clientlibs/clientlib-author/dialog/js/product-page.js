/**
 * Create productImage, productTitle and productDescription properties at jcr:content level to index in Coveo for product-catalog search.
 * Content Category by default sets to FAQ on Site Properties since it is a first option in field drop-down,
 * Since this is for ardx-product-page, we need to set this to 'product' explicitly. 
 *
*/
(function(document, $) {
    "use strict";
    $(document).on("foundation-contentloaded", function(e) {
		//product-image
        var prodImageIdField = $("input[name='./id'][value='product-image']");      
        if(prodImageIdField.length > 0){
            let dialogForm = prodImageIdField.closest("form");
            let resType = dialogForm.find($("input[name='./sling:resourceType']")).val();
            if (resType.indexOf("/image") >= 0){
				//only when product-image id presnet on image component.
                let dialogActionPath = $(dialogForm).attr("action");           		
                let productImgInputField = "<input type='hidden' name='JCR_ROOT_REL_PATH../productImage@ValueFrom' value='./fileReference'>";
                let componentDepthFromJcr = dialogActionPath.split("_jcr_content")[1].split("/").length;
				//calculate the relative path of resource from jcr:cotnent node.
                let jcrRootRelPathVal = "../".repeat(componentDepthFromJcr-2);
                productImgInputField = productImgInputField.replace("JCR_ROOT_REL_PATH",jcrRootRelPathVal);
				//create a new property input field to store at jcr:content node to index in Coveo.
                $(dialogForm).append(productImgInputField);              
            }
        }
		//product-title
        var prodTitleIdField = $("input[name='./id'][value='product-title']");        
        if(prodTitleIdField.length > 0){
            let dialogForm = prodTitleIdField.closest("form");
            let resType = dialogForm.find($("input[name='./sling:resourceType']")).val();
            if (resType.indexOf("/title") >= 0){
				//only when product-title id presnet on title component.
                let dialogActionPath = $(dialogForm).attr("action");           		
                let productTitleInputField = "<input type='hidden' name='JCR_ROOT_REL_PATH../productTitle@ValueFrom' value='./jcr:title'>";
				//set contentCategory which indicates page/content type to  product for ardx-product-pages.
				let contentCategory = "<input type='hidden' name='JCR_ROOT_REL_PATH../contentCategory' value='product'>";
                let componentDepthFromJcr = dialogActionPath.split("_jcr_content")[1].split("/").length;
				//calculate the relative path of resource from jcr:cotnent node.
                let jcrRootRelPathVal = "../".repeat(componentDepthFromJcr-2);
                productTitleInputField = productTitleInputField.replace("JCR_ROOT_REL_PATH",jcrRootRelPathVal);
				contentCategory = contentCategory.replace("JCR_ROOT_REL_PATH",jcrRootRelPathVal);
				//create a new property input field to store at jcr:content node to index in Coveo.
                $(dialogForm).append(productTitleInputField);           
				$(dialogForm).append(contentCategory);
            }
        }
		//product-description
        var prodDescIdField = $("input[name='./id'][value='product-description']");        
        if(prodDescIdField.length > 0){
            let dialogForm = prodDescIdField.closest("form");
            let resType = dialogForm.find($("input[name='./sling:resourceType']")).val();
            if (resType.indexOf("/text") >= 0){
				//only when product-description id presnet on title component.
                let dialogActionPath = $(dialogForm).attr("action");           		
                let productDescInputField = "<input type='hidden' name='JCR_ROOT_REL_PATH../productDescription@ValueFrom' value='./text'>";
                let componentDepthFromJcr = dialogActionPath.split("_jcr_content")[1].split("/").length;
				//calculate the relative path of resource from jcr:cotnent node.
                let jcrRootRelPathVal = "../".repeat(componentDepthFromJcr-2);
                productDescInputField = productDescInputField.replace("JCR_ROOT_REL_PATH",jcrRootRelPathVal);
				//create a new property input field to store at jcr:content node to index in Coveo.
                $(dialogForm).append(productDescInputField);              
            }
        }		
    });
})(document, Granite.$);