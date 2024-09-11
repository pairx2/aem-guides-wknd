package com.abbott.aem.platform.common.components.models.impl.v1;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;

import com.abbott.aem.platform.common.components.models.PlatformLanguageNavigation;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.LanguageNavigation;

import org.apache.commons.lang3.BooleanUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;


/**
 * @author Pawan.Namagiri
 */

@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { PlatformLanguageNavigation.class, ComponentExporter.class },
	   resourceType = { PlatformLanguageNavigationImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class PlatformLanguageNavigationImpl implements PlatformLanguageNavigation {

	public static final String RESOURCE_TYPE = "abbott-platform/components/content/molecules/languagenavigation/v1" + "/languagenavigation";

	@Self
	@Via(type = ResourceSuperType.class)
	@Delegate(types = LanguageNavigation.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private LanguageNavigation languageNavigation;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String placeholder;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String ascendingOrder;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String searchRequired;

	@ValueMapValue
	@Default(values = "false")
	@Setter(AccessLevel.NONE)
	@Getter
	private String hideLanguage;

	@ValueMapValue
	@Default(values = "false")
	@Setter(AccessLevel.NONE)
	@Getter
	private String hideCountry;
	
	@ValueMapValue
	@Default(values = "simple")
	@Setter(AccessLevel.NONE)
	@Getter
	private String navigatorType;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String columnHeaderRequired;

	@Override
	public Boolean getShowHyphen() {
		return !BooleanUtils.toBoolean(hideCountry) && !BooleanUtils.toBoolean(hideLanguage);
	}

	@Override
	public Boolean getShowParenthesis() {
		return !BooleanUtils.toBoolean(hideCountry) || !BooleanUtils.toBoolean(hideLanguage);
	}
}
