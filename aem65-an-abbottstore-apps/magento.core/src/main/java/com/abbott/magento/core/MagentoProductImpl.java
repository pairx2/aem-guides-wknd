/*package com.abbott.magento.core;

import com.adobe.cq.commerce.common.AbstractJcrProduct;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.abbott.magento.core.util.MagentoHelper;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;


public class MagentoProductImpl extends AbstractJcrProduct {
    public static final String PN_IDENTIFIER = "identifier";
    public static final String PN_PRICE = "price";

    protected final ResourceResolver resourceResolver;
    protected final PageManager pageManager;
    protected final Page productPage;
    protected String brand = null;
    protected Double price = null;

    public MagentoProductImpl(Resource resource) {
        super(resource);

        resourceResolver = resource.getResourceResolver();
        pageManager = resourceResolver.adaptTo(PageManager.class);
        productPage = pageManager.getContainingPage(resource);
    }

    @Override
    public String getSKU() {
        return getProperty(PN_IDENTIFIER, String.class);
    }

    @Override
    public <T> T getProperty(String name, Class<T> type) {
        if (name.equals("brand")) {
            return (T) getBrand();
        }

        return super.getProperty(name, type);
    }

    @Override
    public <T> T getProperty(String name, String selectorString, Class<T> type) {
        if (name.equals("brand")) {
            return (T) getBrand();
        }

        if (name.equals(PN_PRICE) && this.price != null) {
            return (T) price;
        }

        return super.getProperty(name, selectorString, type);
    }

    public String getBrand() {
        // A null value is considered as non-initialized
        if (brand == null) {
            // Get value from root page title
            if (productPage != null)
                brand = MagentoHelper.getPageTitle(productPage.getAbsoluteParent(2));
            // Make sure that the value is not null, to avoid initializing it again
            if (MagentoHelper.isEmpty(brand))
                brand = "";
        }
        return brand;
    }

}
*/