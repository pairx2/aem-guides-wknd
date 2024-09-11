package com.abbott.aem.platform.common.components.models.impl.v1;

import java.util.ArrayList;
import java.util.List;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;

import com.abbott.aem.platform.common.components.models.HeroBanner;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Teaser;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;

/**
 * The Class HeroBanner Impl.
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class },
		adapters = { HeroBanner.class, ComponentExporter.class },
		resourceType = { HeroBannerImpl.RESOURCE_TYPE },
		defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public class HeroBannerImpl extends ComponentProxyImpl implements HeroBanner {

	protected static final String RESOURCE_TYPE = "abbott-platform/components/content/molecules/herobanner/v1/herobanner";

	/**
	 * The button.
	 */
	@Self
	@Via(type = ResourceSuperType.class)
	@Delegate(types = Teaser.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Teaser teaser;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String formFragmentPath;

	@ValueMapValue
	@Default(intValues = 0)
	@Setter(AccessLevel.NONE)
	private Integer numberOfButtons;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String altText;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String startColor;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String endColor;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private Integer startColorPosition;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private Integer endColorPosition;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String tabletImage;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String mobileImage;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String fileReference;
	

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String parallaxImage;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String imageAboveContent;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String subtitle;

	public List<String> getListOfButtons() {
		List<String> listOfButtons = new ArrayList<>();
		for (int i = 0; i < numberOfButtons; i++) {
			listOfButtons.add("button-" + i);
		}
		return listOfButtons;
	}

}