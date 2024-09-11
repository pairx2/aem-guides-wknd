package com.abbott.aem.adc.freestylelibrede.models;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import lombok.Getter;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.via.ChildResource;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;
import com.abbott.aem.adc.freestylelibrede.services.ProductPageService;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
        resourceType = "adc/freestylelibrede/components/content/product-details")
public class ProductDetailsModel extends BaseComponentPropertiesImpl {
    @Inject
    private String shippingText;

    @Inject
    private String quantityOrder;

    @Inject
    private String errorMessage;

    @Externalize
    private String wizardSelectorUrl;

    @Externalize
    private String loginPageUrl;

    @Self
    private Resource currentResource;

    @Inject
    private ProductPageService productPageService;
  
    @Getter
    @Inject
    @Via(type = ChildResource.class)
    private List<ShippingOptionsModel.ShippingList> shippingList;

    private ProductPageModel productPageModel;
    private List<String> productImageArray;
    private List<VideoList> productVideoArray;

    @PostConstruct
    private void init() {
        this.productPageModel = productPageService.getProductPageModel(currentResource);
        productImageArray = new ArrayList<String>();
        productVideoArray = new ArrayList<VideoList>();
        if(productPageModel.getProductList()!= null) {
            for (int i = 0; i < productPageModel.getProductList().size(); i++) {
                List<ProductList> productListObj = productPageModel.getProductList();
                if (productListObj.get(i).getProductImage() != null) {
                    getProductImages(i, productListObj);
                }
                if (productListObj.get(i).getVideoList() != null) {
                    for (VideoList videoListobj : productListObj.get(i).getVideoList()) {
                        productVideoArray.add(videoListobj);
                    }
                }
            }
        }
    }

    private void getProductImages(int i, List<ProductList> productListObj) {
        String[] productImage = productListObj.get(i).getProductImage();
        for (String productImg : productImage) {
            productImageArray.add(productImg);
        }
    }

    public List<String> getProductImageArray() {
        return new ArrayList<>(productImageArray);
    }

    public List<VideoList> getProductVideoArray() {
        return new ArrayList<>(productVideoArray);
    }

    public String getShippingText() {
        return shippingText;
    }

    public String getQuantityOrder() {
        return quantityOrder;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public String getWizardSelectorUrl() {
        return wizardSelectorUrl;
    }

    public String getLoginPageUrl() {
        return loginPageUrl;
    }
  
    public ProductPageModel getProductPageModel() {
        return productPageModel;
    }
}
