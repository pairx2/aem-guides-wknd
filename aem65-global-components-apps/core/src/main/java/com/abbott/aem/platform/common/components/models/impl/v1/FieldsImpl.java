package com.abbott.aem.platform.common.components.models.impl.v1;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;

import com.abbott.aem.platform.common.components.models.Fields;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.form.Text;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;

/**
 * The type Fields.
 */

@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { Fields.class, ComponentExporter.class },
	   resourceType = { FieldsImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class FieldsImpl extends ComponentProxyImpl implements Fields {

	/**
	 * The constant RESOURCE_TYPE.
	 */
	public static final String RESOURCE_TYPE = "abbott-platform/components/form/fields/v1/fields";

	@Self
	@Via(type = ResourceSuperType.class)
	@Delegate(types = Text.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Text text;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String enableTooltip;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Getter
	private String placeholder;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Getter
	private String validationErrorMessage;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Getter
	private String fieldIcon;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Getter
	private String iconLeft;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Getter
	private String iconRight;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Getter
	private String doubleIconLeft;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Getter
	private String doubleIconRight;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Getter
	private boolean regexRequired;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Getter
	private String regexPattern;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Getter
	private String regexErrorMessage;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Getter
	private boolean confirmPassword;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Getter
	private String passwordPolicyRequired;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Getter
	private String policyType;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Getter
	private String tooltipIcon;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Getter
	private String tooltipLabel;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Getter
	private String tooltipDescription;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Getter
	private int minCharCount;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Getter
	private String minCharLabel;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Getter
	private String minCharDescription;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Getter
	private String alphabetLabel;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Getter
	private String alphabetDescription;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Getter
	private String numericLabel;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Getter
	private String numericDescription;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Getter
	private String specialCharLabel;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Getter
	private String specialCharDescription;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Getter
	private String specialCharRegex;
}
