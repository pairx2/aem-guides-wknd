package com.abbott.aem.adc.freestylelibrede.models;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.sling.models.annotations.Default;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/account/current-order")
public interface CurrentOrderModel extends BaseComponentProperties{

    @Inject
    String getCurrentOrderHeading();
    
    @Inject
    @JsonProperty("isAccountOverviewTab")
	Boolean getTextAligmentRight();

    @Inject
    String getChangeDeliveryAccountStyle();

    @Inject
    String getTrackShipmentStyle();

    @Inject
    String getCancelAccountStyle();

    @Inject
    String getInvoiceAccountStyle();
	
	@Externalize
    String getAccountPagePath();
       
    @Inject
    String getAccountPageTab();

    @Inject
    String getChangeDeliveryOrderStyle();

    @Inject
    String getShipmentTrackingStyle();

    @Inject
    String getCancelOrderStyle();

    @Inject
    String getInvoiceOrderStyle();

    @Inject
    String getDeliveryDateHeading();

    @Inject
    String getDeliveryDateDescription();

    @Inject
    String getNoCurrentOrderHeading();

    @Inject
    String getRecentOrderHeading();

    @Inject
    String getEmptyHeading();

    @Inject
    String getEmptyInfoText();

    @Inject
    String getEmptyImage();

    @Inject
    String getOrderRecipeStyle();

    @Externalize
    String getOrderRecipeLink();

    @Inject
    String getOrderShopStyle();

    @Externalize
    String getOrderShopLink();

    @Inject
    String getCancelStyle();

    @Inject
    String getAbortStyle();

    @Inject
    String getCancelInfoText();

    @Inject
    String getReturnText();

    @Externalize
    String getCheckoutPage();

    @ChildResource
    @Named("cq:responsive")
    CQResponsiveModel getResponsiveness();
	
	@Externalize
    String getConfirmationPath();
	
	@ChildResource
    List<PaymentCheckboxModel> getCheckboxes();
	
	@Inject
    String getOrderType();
	
	@Inject
    String getTabName();

    @Inject
    @Default(values = "false")
    Boolean isHideNoOrderSection();

}
