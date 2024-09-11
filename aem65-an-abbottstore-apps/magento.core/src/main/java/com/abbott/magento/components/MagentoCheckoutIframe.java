package com.abbott.magento.components;

import com.adobe.cq.sightly.WCMUsePojo;
import com.day.cq.personalization.ContextSessionPersistence;

/**
 * Supports HML checkout component
 */
public class MagentoCheckoutIframe extends WCMUsePojo {
    private String cartId;
    private String customerToken;
    private String checkoutUrl;
    private String orderCompleteUrl;
    private static final String CONTEXT_KEY_CART_ID = "magento-cartId";
    private static final String CONTEXT_KEY_CUSTOMER_TOKEN = "magento-token";
    private static final String AEM_CHECKOUT_MODULE_PATH = "/aem-checkout/checkout";


    @Override public void activate() throws Exception {
        this.checkoutUrl = getProperties().get("checkoutUrl", String.class);
        this.orderCompleteUrl = getProperties().get("orderCompleteUrl", String.class);
        if (this.checkoutUrl.endsWith("/")) {
            this.checkoutUrl = this.checkoutUrl.substring(0, this.checkoutUrl.length() - 1);
        }
        this.cartId = ContextSessionPersistence.get(this.getRequest(), CONTEXT_KEY_CART_ID);
        this.customerToken = ContextSessionPersistence.get(this.getRequest(), CONTEXT_KEY_CUSTOMER_TOKEN);
        this.customerToken = this.customerToken.replace("Bearer ", "");
    }

    public String getCheckoutSuccessPath(){
        if(this.orderCompleteUrl == null){
            return "";
        }
        
        return this.orderCompleteUrl + ".html";
    }

    public String getMagentoCheckoutUrl() {
        return checkoutUrl + AEM_CHECKOUT_MODULE_PATH + "?cartId=" + this.cartId + "&customer=" + this.customerToken;
    }
}
