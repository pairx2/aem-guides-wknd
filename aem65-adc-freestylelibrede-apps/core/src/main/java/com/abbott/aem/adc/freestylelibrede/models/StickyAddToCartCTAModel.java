package com.abbott.aem.adc.freestylelibrede.models;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import com.abbott.aem.adc.freestylelibrede.services.ExternalizerService;
import com.abbott.aem.adc.freestylelibrede.services.ProductPageService;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Model class Exporter for Sticky Add To Cart CTA Component.
 *
 * @author ankitakh
 */
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/sticky-addtocart")
public class StickyAddToCartCTAModel extends BaseComponentPropertiesImpl {

	private static final Logger LOGGER = LoggerFactory.getLogger(StickyAddToCartCTAModel.class);

	@Inject
	ProductPageService productPageService;

	/** Add to Cart CTA Style. */
	@Inject
	private String addToCart;
	
	/** The Subscription Order CTA Style. */
	@Inject
	private String subsOrder;

	/** The Checkout Page URL. */
	@Inject
	private String prescriptionOrderPageUrl;

	/** The Login Page URL. */
	@Inject
	private String loginPageUrl;

	@Self
	private Resource currentResource;

	@Inject
	ResourceResolver resourceResolver;

	@Inject
	private ExternalizerService externalizerService;

	private ProductPageModel productPageModel;

	@PostConstruct
	private void init(){
		LOGGER.debug("Init");
		productPageModel = productPageService.getProductPageModel(currentResource);
		LOGGER.debug("productPageModel= {}",productPageModel);

		loginPageUrl = externalizerService.externalizeIfNecessary(loginPageUrl,resourceResolver);
		prescriptionOrderPageUrl= externalizerService.externalizeIfNecessary(prescriptionOrderPageUrl,resourceResolver);
	}

	/**
	 * Gets the Add to Cart CTA Style.
	 *
	 * @return the Add to Cart CTA Style
	 */
	public String getAddToCart() {
		return addToCart;
	}

	/**
	 * Gets the Subscription Order CTA Style.
	 *
	 * @return the Subscription Order CTA Style
	 */
	public String getSubsOrder() {
		return subsOrder;
	}

	/**
	 * Gets the Prescription Order Page URL.
	 *
	 * @return the Prescription Order Page URL
	 */
	public String getPrescriptionOrderPageUrl() {
		return prescriptionOrderPageUrl;
	}

	/**
	 * Gets the Login Page URL.
	 *
	 * @return the Login Page URL
	 */
	public String getLoginPageUrl() {
		return loginPageUrl;
	}


	public ProductPageModel getProductPageModel() {
        return productPageModel;
    }
}
