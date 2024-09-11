package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

import java.util.List;

import javax.inject.Inject;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = {"adc/freestylelibrede/components/content/product-card"})
public interface ProductCard extends BaseComponentProperties{

    @Inject
    String getProductImage();

    @Inject
    String getHeading();

    @Inject
    String getDescription();

    @ChildResource
    BaseCTAModel getCta1();

    @ChildResource
    BaseCTAModel getCta2();
    
    @Inject
    String getIcon();
	
	@Inject
    String getIconNewProduct();
	
	@Inject
	@JsonProperty("hasNewProduct")
	boolean getNewProduct();

    @Inject
    String getImportantMessageIcon();

    @Inject
    String getDisclaimerText();
	
    @Inject
    String getDeepLinkTarget();
    
	@Inject
	@Via(type = org.apache.sling.models.annotations.via.ChildResource.class)
	List<ProductSkus> getProductSkus();

	@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
	interface ProductSkus {		
		@Inject
		String getSku();
	}
}
