package com.abbott.aem.an.division.core.components.models;

import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.abbott.aem.an.division.core.models.product.Availability;
import com.abbott.aem.an.division.core.models.product.Flavor;
import com.abbott.aem.an.division.core.models.product.Product;
import com.day.cq.commons.jcr.JcrConstants;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter; 
import lombok.experimental.Delegate;

import com.adobe.cq.wcm.core.components.models.Component;
import com.day.cq.dam.api.Asset;

import org.apache.commons.io.IOUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceUtil;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class },
        adapters = { ProductDetail.class },
        resourceType = { ProductDetail.RESOURCE_TYPE },
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ProductDetail {

    public static final String RESOURCE_TYPE = "an/division/components/content/product-detail";
    public static final String NOT_APPLICABLE = "Not Applicable";

    /**
     * The Constant LOGGER.
     */
    private static final Logger LOGGER = LoggerFactory.getLogger(ProductDetail.class);

    @Self
    private SlingHttpServletRequest request;

    @SlingObject
    private ResourceResolver resourceResolver;

    @Self
    @Delegate(types = Component.class)
    @Setter(AccessLevel.NONE)
    @Getter(AccessLevel.NONE)
    private Component component;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String productData;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String brandId;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String gratisId;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private boolean showPercentDailyValue;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private boolean showFootnotes;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String resourcesExperienceFragmentPath;

    @ChildResource
    @Setter(AccessLevel.NONE)
    private List<ProductDetailSku> skus;

    private Product product;

    private String getJSON() {
        try {
            Asset asset = resourceResolver.getResource(productData).adaptTo(Asset.class);
            if (null == asset) {
				LOGGER.info("getJSON:: Unable to resolve the Asset.");
                return "";
            }

            InputStream inputStream = asset.getOriginal().getStream();
            StringWriter stringWriter = new StringWriter();

            IOUtils.copy(inputStream, stringWriter, "UTF-8");

            return stringWriter.toString();
        } catch(IOException ex) {
            return "";
        }
    }

    public Product getProduct() {
        if (null == product) {
            try {
                product = new ObjectMapper().readValue(getJSON(), Product.class);
                return product;
            } catch (IOException ex) {
                return null;
            }
        } else {
            return product;
        }
    }

    public List<Flavor> getFilteredFlavors() {
        if (null != skus && skus.size() > 0) {
            return getFlavors();
        } else {
            return getProduct().getFlavors()
                    .stream()
                    .filter(flavor -> !flavor.getFlavorName().contains(NOT_APPLICABLE))
                    .collect(Collectors.toList());
        }
    }

    private List<Flavor> getFlavors() {
        List<Flavor> flavors = new ArrayList<>();
        for (ProductDetailSku sku : skus) {
            Optional<Availability> productAvailability = getProduct().getAvailability()
                    .stream()
                    .filter(availability -> availability.getListNumber().equals(sku.getPimSku()))
                    .findFirst();
            if (productAvailability.isPresent()) {
                String matchingDescription = productAvailability.get().getDescription();

                Optional<Flavor> optionalFilteredFlavor = getProduct().getFlavors()
                        .stream()
                        .filter(flavor -> flavor.getPackages().contains(matchingDescription))
                        .filter(flavor -> !flavor.getFlavorName().contains(NOT_APPLICABLE))
                        .findFirst();
                if (optionalFilteredFlavor.isPresent()) {
                    Flavor filteredFlavor = optionalFilteredFlavor.get();
                    if (null != sku.getFlavorNameOverride() && !sku.getFlavorNameOverride().isEmpty()) {
                        filteredFlavor.setFlavorNameOverride(sku.getFlavorNameOverride());
                    }
                    flavors.add(filteredFlavor);
                }
            }
        }
        return flavors;
    }

    public String getResourcesExperienceFragment() {
        if (null != resourcesExperienceFragmentPath) {
            Resource resource = resourceResolver.getResource(resourcesExperienceFragmentPath + "/" + JcrConstants.JCR_CONTENT);
            if (null != resource && !ResourceUtil.isNonExistingResource(resource)) {
                return resource.getPath();
            }
        }
        return null;
    }
}

