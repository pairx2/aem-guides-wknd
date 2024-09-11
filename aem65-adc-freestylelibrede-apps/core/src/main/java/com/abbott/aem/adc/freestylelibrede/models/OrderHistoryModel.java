package com.abbott.aem.adc.freestylelibrede.models;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

import javax.inject.Inject;
import javax.inject.Named;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/account/order-history")
public interface OrderHistoryModel extends BaseComponentProperties{

    @Inject
    String getHeading();

    @Inject
    String getReturnText();

    @Externalize
    String getCheckoutPage();

    @ChildResource
    @Named("cq:responsive")
    CQResponsiveModel getResponsiveness();
    
    @Inject
	String getNrOfViewMore();

	@Inject
	int getNrOfResults();

    @Inject
	String getorderHistoryType();

    @Inject
    boolean getOrcEnable();

    @Inject
    String getOrcWidgetJsSource();

    @Inject
    String getCountryCode();

    @Inject
    String getLanguageCode();
    
}
