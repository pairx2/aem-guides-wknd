package com.abbott.aem.platform.common.components.models.impl.v1;

import com.abbott.aem.platform.common.components.models.ScrollInteractionsComponentProxy;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import lombok.Data;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;

@Data
@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { ScrollInteractionsComponentProxy.class, ComponentExporter.class },
	   resourceType = { ScrollInteractionsComponentProxyImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ScrollInteractionsComponentProxyImpl extends ComponentProxyImpl implements ScrollInteractionsComponentProxy {

	public static final String RESOURCE_TYPE = "abbott-platform/components/content/molecules/scrollinteractions/v1/scrollinteractions";
	
}