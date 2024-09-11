package com.abbott.aem.an.abbottstore.services.impl;

import com.abbott.aem.an.abbottstore.beans.FeatureProductBean;
import com.abbott.aem.an.abbottstore.models.ProductPathModel;
import com.abbott.aem.an.abbottstore.services.FeatureProductService;
import com.abbott.aem.an.abbottstore.utils.AbbottUtils;
import com.day.cq.wcm.api.Page;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Iterator;
import java.util.List;

@Component(immediate = true, enabled = true, service = FeatureProductService.class)
public class FeatureProductServiceimpl implements FeatureProductService {
    /** The log. */
    private final Logger log = LoggerFactory.getLogger(FeatureProductServiceimpl.class);

    @Override
    public List <FeatureProductBean> setAndGetFeatureProductList(List<FeatureProductBean> productList, ProductPathModel path, Page page, ResourceResolver resourceResolver) {

        if (page == null) {
            return productList;
        }
        ValueMap pageProps = page.getContentResource().getValueMap();
        FeatureProductBean product = new FeatureProductBean();

        if(pageProps.containsKey("name")) {
            product.setTitle(pageProps.get("name").toString());
        }
        if(pageProps.containsKey("price")) {
            product.setPrice(pageProps.get("price").toString());
        }
        String flavourName = "";
        if (pageProps.containsKey("product_flavor")) {
            flavourName = pageProps.get("product_flavor").toString();
        }
        if ((StringUtils.isEmpty(flavourName) || StringUtils.equalsIgnoreCase(flavourName, "null")) && pageProps.containsKey("flavors")) {
            flavourName = getFlavourValue(pageProps.get("flavors").toString(),resourceResolver);
        }

        product.setFlavourName(flavourName);
        log.info("flavour Name :: {}", flavourName);

        if(pageProps.containsKey("case_of_product")) {
            product.setProductCount(pageProps.get("case_of_product").toString());
        } else if (pageProps.containsKey("size_or_weight")){
            product.setProductCount(pageProps.get("size_or_weight").toString());
        }

        setMediaGalleryEntriesData(pageProps, product,resourceResolver);

        if(pageProps.containsKey("regular_price")) {
            product.setRegularPrice(pageProps.get("regular_price").toString());
        }

        if (pageProps.containsKey("sku")) {
            product.setSku(pageProps.get("sku", String.class));
        }
        product.setPagePath( AbbottUtils.getHtmlLink(resourceResolver, path.getProductDetailPath()));
        productList.add(product);
        return productList;
    }

    /**
     * Sets the media gallery entries data.
     *
     * @param pageProps the page props
     * @param product the product
     */
    private void setMediaGalleryEntriesData(ValueMap pageProps, FeatureProductBean product, ResourceResolver resourceResolver) {
        if (pageProps.containsKey("media_gallery_entries")) {
            String[] imagesList = pageProps.get("media_gallery_entries", String[].class);
            if(imagesList.length > 0) {
                String imagePath = imagesList[0];
                if (null != resourceResolver && null != resourceResolver.resolve(imagePath)) {
                    imagePath = imagesList[0]+"/jcr:content/renditions/thumbnail-240x300.png";
                }
                product.setImagePath(imagePath);
            }
        }
    }

    /**
     * Gets the flavour value.
     *
     * @param flavour the flavour
     * @return the flavour value
     */
    public String getFlavourValue(String flavour,ResourceResolver resourceResolver) {
        Resource resource = resourceResolver.getResource("/content/cq:tags/abbott/abbott-flavors");
        if(resource.hasChildren()) {
            Iterator <Resource> resItr = resource.listChildren();
            while (resItr.hasNext()) {
                Resource nodeName = resItr.next();
                if (StringUtils.equals(nodeName.getName(), flavour)) {
                    return nodeName.getValueMap().get("label").toString();
                }
            }
        }
        return null;
    }
}
