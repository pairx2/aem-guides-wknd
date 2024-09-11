package com.abbott.aem.platform.common.components.models.impl.v1;

import java.util.ArrayList;
import java.util.List;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;

import com.abbott.aem.platform.common.components.models.CtaSection;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Container;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;

/**
 * The Class CtaSectionImpl.
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { CtaSection.class },
	   resourceType = { CtaSectionImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class CtaSectionImpl extends ComponentProxyImpl implements CtaSection {
	/**
	 * The Constant RESOURCE_TYPE.
	 */
	public static final String RESOURCE_TYPE = "abbott-platform/components/content/organism/ctasection/v1/ctasection";

	@Self
	@Via(type = ResourceSuperType.class)
	@Delegate(types = Container.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Container container;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String backgroundColor;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String title;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String subTitle;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String description;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private int buttonCount;

	public List<String> getListOfButtons() {

		int count = getButtonCount();

		List<String> listOfButtons = new ArrayList<>();

		for (int i = 0; i < count; i++) {
			listOfButtons.add("button-" + i);
		}

		return listOfButtons;
	}

}
