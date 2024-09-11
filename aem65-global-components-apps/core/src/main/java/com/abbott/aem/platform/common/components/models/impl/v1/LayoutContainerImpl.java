package com.abbott.aem.platform.common.components.models.impl.v1;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;

import com.abbott.aem.platform.common.components.models.LayoutContainer;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Component;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 * This class implements the LayoutContainer model.
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { LayoutContainer.class, ComponentExporter.class },
	   resourceType = { LayoutContainerImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class LayoutContainerImpl extends ComponentProxyImpl implements LayoutContainer {

	public static final String RESOURCE_TYPE = "abbott-platform/components/content/molecules/layoutcontainer/v1/layoutcontainer";

	@Self
	@Delegate(types = Component.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Component component;

	/**
	 * Holds the number of columns to be included in the layout container
	 */
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private int columnCount;

	/**
	 * Returns the columns list as an array of integer values .
	 */
	@Override
	public List<Integer> getColumnList() {
		return IntStream.rangeClosed(1, columnCount).boxed().collect(Collectors.toList());
	}
}
