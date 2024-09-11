package com.abbott.aem.platform.common.components.models.impl.v1;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;

import com.abbott.aem.platform.common.components.models.ErrorPage;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Image;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { ErrorPage.class, ComponentExporter.class },
	   resourceType = { ErrorPageImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ErrorPageImpl extends ComponentProxyImpl implements ErrorPage {

	protected static final String RESOURCE_TYPE = "abbott-platform/components/content/molecules/errorpage/v1/errorpage";

	@Self
	@Delegate(types = Image.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Image image;

}