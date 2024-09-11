package com.abbott.aem.platform.common.components.models.impl.v1;

import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.abbott.aem.platform.common.components.models.PlaceOrder;
import com.abbott.aem.platform.common.util.PageUtil;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.commons.Externalizer;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Data
@Model(adaptables = { SlingHttpServletRequest.class, Resource.class },
	   adapters = { PlaceOrder.class, ComponentExporter.class },
	   resourceType = { PlaceOrderImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class PlaceOrderImpl  extends ComponentProxyImpl implements PlaceOrder {
	
	public static final String RESOURCE_TYPE = "abbott-platform/components/commerce/placeorder/v1/placeorder";
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String successPageUrl;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String guestPageUrl;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String errorPageUrl;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String loadingText;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
    private String purchaseAATracking;
	
	@SlingObject
	protected ResourceResolver resourceResolver;

	@Inject
    private Externalizer externalizer;

	@JsonIgnore
	@Self
	private SlingHttpServletRequest request;
	
	@Override
	public String getSuccessPageShortenedUrl(){
		return PageUtil.getUrl(successPageUrl, resourceResolver, externalizer, true, true);
	}

	@Override
	public String getGuestPageShortenedUrl(){
		return PageUtil.getUrl(guestPageUrl, resourceResolver, externalizer, true, true);
	}

	@Override
	public String getErrorPageShortenedUrl(){
		return PageUtil.getUrl(errorPageUrl, resourceResolver, externalizer, true, true);
	}
}