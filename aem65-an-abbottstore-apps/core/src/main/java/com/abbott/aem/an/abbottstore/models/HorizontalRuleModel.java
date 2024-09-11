package com.abbott.aem.an.abbottstore.models;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.PostConstruct;


@Model(adaptables = { Resource.class })
public class HorizontalRuleModel {

	@ValueMapValue(name = "margin", injectionStrategy = InjectionStrategy.OPTIONAL)
	private String margin;
	@ValueMapValue(name = "padding", injectionStrategy = InjectionStrategy.OPTIONAL)
	private String padding;
	@ValueMapValue(name = "width", injectionStrategy = InjectionStrategy.OPTIONAL)
	private String width;
	@ValueMapValue(name = "minHeight", injectionStrategy = InjectionStrategy.OPTIONAL)
	private String minHeight;
	@ValueMapValue(name = "color", injectionStrategy = InjectionStrategy.OPTIONAL)
	private String color;
	@ValueMapValue(name = "imagePath", injectionStrategy = InjectionStrategy.OPTIONAL)
	private String imagePath;

	private String inlineStyles;

	/**
	 * 
	 */
	@PostConstruct
	public void init() {
		inlineStyles = StringUtils.EMPTY;
		if (!StringUtils.isEmpty(margin)) {
			inlineStyles += " margin: " + margin + ";";
		}
		if (!StringUtils.isEmpty(padding)) {
			inlineStyles += " padding: " + padding + ";";
		}
		if (!StringUtils.isEmpty(width)) {
			inlineStyles += " width: " + width + "%;";
		}
		if (!StringUtils.isEmpty(minHeight)) {
			inlineStyles += " min-height: " + minHeight + "px;";
		}
		if (!StringUtils.isEmpty(color) && StringUtils.isEmpty(imagePath)) {
			inlineStyles += " background-color: " + color + ";";
		}
		if (!StringUtils.isEmpty(imagePath)) {
			inlineStyles += " background: url(" + imagePath + ") repeat;";
		}
	}

	/**
	 * @return the margin
	 */
	public String getMargin() {
		return margin;
	}

	/**
	 * @return the padding
	 */
	public String getPadding() {
		return padding;
	}

	/**
	 * @return the width
	 */
	public String getWidth() {
		return width;
	}

	/**
	 * @return the minHeight
	 */
	public String getMinHeight() {
		return minHeight;
	}

	/**
	 * @return the color
	 */
	public String getColor() {
		return color;
	}

	/**
	 * @return the imagePath
	 */
	public String getImagePath() {
		return imagePath;
	}

	/**
	 * @return the inlineStyles
	 */
	public String getInlineStyles() {
		return inlineStyles;
	}
}
