package com.abbott.aem.platform.common.components.models.impl.v1;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;

import com.abbott.aem.platform.common.components.models.Cards;
import com.abbott.aem.platform.common.util.PageUtil;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Teaser;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;

/**
 * The type Cards.
 *
 * @author Pawan.Namagiri
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { Cards.class, ComponentExporter.class },
	   resourceType = { CardsImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class CardsImpl extends ComponentProxyImpl implements Cards {

	/**
	 * The constant RESOURCE_TYPE.
	 */
	public static final String RESOURCE_TYPE = "abbott-platform/components/content/molecules/cards/v1/cards";

	@Self
	@Via(type = ResourceSuperType.class)
	@Delegate(types = Teaser.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Teaser teaser;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String ctaOne;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String ctaTwo;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private boolean clickable;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String cardLink;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String external;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String action;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String hoverText;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String expFragPathVideo;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String modalIcon;
	
	@SlingObject
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private ResourceResolver resolver;
	
	@Override
	public String getCardLink() {
		return PageUtil.getUrl(cardLink, resolver);
	}
}
