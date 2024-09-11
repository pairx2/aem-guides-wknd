package com.abbott.aem.an.abbottstore.models;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 * The Class SpacingModel.
 */
@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class SpacingModel {

	/** The spacing. */
	@ValueMapValue
	private String spacing;

	/** The default spacing. */
	@ValueMapValue
	private String defaultSpacing;

	/** The spacing top. */
	@ValueMapValue
	String spacingTop;

	/** The spacing bottom. */
	@ValueMapValue
	String spacingBottom;

	/** The spacing left. */
	@ValueMapValue
	String spacingLeft;

	/** The spacing right. */
	@ValueMapValue
	String spacingRight;

	/** The inline styles. */
	private String inlineStyles = StringUtils.EMPTY;

	/**
	 * Gets the spacing.
	 *
	 * @return the spacing
	 */
	public String getSpacing() {
		return spacing;
	}

	/**
	 * Gets the default spacing.
	 *
	 * @return the default spacing
	 */
	public String getDefaultSpacing() {
		return defaultSpacing;
	}

	/**
	 * Gets the custom spacing.
	 *
	 * @return the custom spacing
	 */
	public String getCustomSpacing() {

		if (!StringUtils.isEmpty(spacingTop)) {
			inlineStyles = "padding-top: " + spacingTop + "rem;";
		}
		if (!StringUtils.isEmpty(spacingBottom)) {
			inlineStyles += "padding-bottom: " + spacingBottom + "rem;";
		}
		if (!StringUtils.isEmpty(spacingRight)) {
			inlineStyles += "padding-right: " + spacingRight + "rem;";
		}
		if (!StringUtils.isEmpty(spacingLeft)) {
			inlineStyles += "padding-left: " + spacingLeft + "rem;";
		}
		return inlineStyles;
	}

}
