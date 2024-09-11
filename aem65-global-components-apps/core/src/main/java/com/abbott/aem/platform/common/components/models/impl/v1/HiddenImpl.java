package com.abbott.aem.platform.common.components.models.impl.v1;

import org.apache.commons.text.StringEscapeUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;

import com.abbott.aem.platform.common.components.models.Hidden;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.form.Field;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import lombok.experimental.Delegate;

@EqualsAndHashCode
@ToString
@Model(adaptables = { SlingHttpServletRequest.class },
		adapters = { Hidden.class },
		resourceType = { HiddenImpl.RESOURCE_TYPE },
		defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class HiddenImpl implements Hidden {

	public static final String RESOURCE_TYPE = "abbott-platform/components/form/hidden/v1/hidden";
	
	private static final String SOURCE_REQUEST = "request";
	private static final String SOURCE_STATIC = "static";

	@SlingObject
	private SlingHttpServletRequest request;

	@Self
	@Via(type = ResourceSuperType.class)
	@Delegate(excludes = DelegationExclusion.class)
	private Field field;

	@Getter
	@ValueMapValue
	private String source;

	@Getter
	@ValueMapValue
	@Default(values = "body")
	private String dataRequest;

	@ValueMapValue
	private String keepInSession;

	@Override
	public String getValue() {
		String value;

		switch (source) {
		case SOURCE_REQUEST:
			value = StringEscapeUtils.escapeEcmaScript(request.getParameter(field.getValue()));
			break;

		case SOURCE_STATIC:
			value = field.getValue();
			break;

		default:
			value = "";
		}

		return value;
	}

	public String getKey() {
		String key;

		if (SOURCE_STATIC.equals(source)) {
			key = "";
		} else {
			key = field.getValue();
		}

		return key;
	}

	public String getKeepInSession() {
		// This has been added to ensure that keep in session
		// is applied only for request source.
		if (SOURCE_REQUEST.equals(source)) {
			return this.keepInSession;
		} else {
			return null;
		}
	}

	// Here we define the methods we want to override
	private interface DelegationExclusion {
		String getValue();
	}
}
