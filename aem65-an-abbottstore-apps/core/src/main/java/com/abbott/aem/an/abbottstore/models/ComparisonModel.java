package com.abbott.aem.an.abbottstore.models;

import com.abbott.aem.an.abbottstore.utils.AbbottUtils;
import lombok.Getter;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.List;

/**
 *
 * @author saikrishna.s
 * 
 *         Comparison Model
 * 
 *         Comparison is the SlingModel to get the details of Comparison List.
 * 
 *         Version Number: 1.0
 */
@Model(adaptables = {Resource.class, SlingHttpServletRequest.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ComparisonModel extends UrlServiceModel{

	/** The bg color. */
	@ValueMapValue
	private String bgColor;

	/** The title. */
	@ValueMapValue
	private String title;

	/** The title color. */
	@ValueMapValue
	private String titleColor;

	/** The sub text 1. */
	@ValueMapValue
	private String subText1;

	/** The sub text 2. */
	@ValueMapValue
	private String subText2;

	/** The sub text 3. */
	@ValueMapValue
	private String subText3;

	/** The text. */
	@ValueMapValue
	private String text;

	/** The button label. */
	@ValueMapValue
	private String buttonLabel;

	/** The button link. */
	@ValueMapValue
	private String buttonLink;

	/** The compare items. */
	@ChildResource(name = "compareItems")
	@Getter
	private List<Comparison> compareItems;

	/** The resource resolver. */
	@SlingObject
	private ResourceResolver resourceResolver;

	/**
	 * Gets the bg color.
	 *
	 * @return the bg color
	 */
	public String getBgColor() {
		return bgColor;
	}

	/**
	 * Gets the title.
	 *
	 * @return the title
	 */
	public String getTitle() {
		return title;
	}

	/**
	 * Gets the title color.
	 *
	 * @return the title color
	 */
	public String getTitleColor() {
		return titleColor;
	}

	/**
	 * Gets the sub text 1.
	 *
	 * @return the sub text 1
	 */
	public String getSubText1() {
		return subText1;
	}

	/**
	 * Gets the sub text 2.
	 *
	 * @return the sub text 2
	 */
	public String getSubText2() {
		return subText2;
	}

	/**
	 * Gets the sub text 3.
	 *
	 * @return the sub text 3
	 */
	public String getSubText3() {
		return subText3;
	}

	/**
	 * Gets the text.
	 *
	 * @return the text
	 */
	public String getText() {
		return text;
	}

	/**
	 * Gets the button label.
	 *
	 * @return the button label
	 */
	public String getButtonLabel() {
		return buttonLabel;
	}

	/**
	 * Gets the button link.
	 *
	 * @return the button link
	 */
	public String getButtonLink() {
		return AbbottUtils.getResolvedPath(resourceResolver, buttonLink, getStoreBasePaths(), StringUtils.EMPTY);
	}

}
