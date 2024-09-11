package com.abbott.aem.bts.cybersecurity.components.model.impl;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;

import com.abbott.aem.bts.cybersecurity.components.model.CyberSecurityLayoutContainer;
import com.abbott.aem.platform.common.components.models.LayoutContainer;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Setter;

@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class }, adapters = { CyberSecurityLayoutContainer.class,
		ComponentExporter.class }, resourceType = {
				CyberSecurityLayoutContainerImpl.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class CyberSecurityLayoutContainerImpl implements CyberSecurityLayoutContainer {

	@Self
	@Via(type = ResourceSuperType.class)
	private LayoutContainer layoutContainer;

	public static final String RESOURCE_TYPE = "bts/cybersecurity/components/content/layoutcontainer";
	/**
	 * Holds the number of columns to be included in the layout container
	 */
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private int columnCount;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String fileReference;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String containerVariation;

	/**
	*Returns the background Image for container
	*/
	@Override
	public String getFileReference() {
		return fileReference;
	}
    
	/**
	 * Returns the columns list as an array of integer values .
	 */
	@Override
	public List<Integer> getColumnList() {
		return IntStream.rangeClosed(1, columnCount).boxed().collect(Collectors.toList());
	}
	
	/**
	*Returns the variation for container
	*/
	@Override
	public String getContainerVariation() {
		return this.containerVariation;
	}
}
