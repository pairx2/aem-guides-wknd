/**
 *
 */

package com.abbott.aem.platform.common.components.models.impl.v1;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;

import com.abbott.aem.platform.common.components.models.ProductSection;
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
 * @author tadigital
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { ProductSection.class, ComponentExporter.class },
	   resourceType = { ProductSectionImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ProductSectionImpl extends ComponentProxyImpl implements ProductSection {
	public static final String RESOURCE_TYPE = "abbott-platform/components/content/organism/productsection/v1/productsection";

	@Self
	@Delegate(types = Component.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Component component;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String title;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String description;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String productSectionType;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String imageSize;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private int buttonCount;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String startColor;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String startColorPosition;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String endColor;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String endColorPosition;


	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private boolean badgeChecked;

	@Override
	public List<Integer> getButtonList() {
		if (buttonCount <= 0) {
			return Collections.emptyList();
		}
		return IntStream.rangeClosed(1, buttonCount).boxed().collect(Collectors.toList());
	}
}
