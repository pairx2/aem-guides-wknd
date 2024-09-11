package com.abbott.aem.an.abbottstore.models;

import lombok.Getter;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.List;

/**
 *
 * @author saikrishna.s
 * 
 *         Gs Information Banner Model
 * 
 *         GsInformationBanner is the SlingModel to get the details of
 *         GsInfoBanner List.
 * 
 *         Version Number: 1.0
 */
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class GsInformationBannerModel {

	/** The bg color. */
	@ValueMapValue
	private String bgColor;

	/** The title. */
	@ValueMapValue
	private String title;

	/** The title color. */
	@ValueMapValue
	private String titleColor;

	/** The gs info items list. */
	@Getter
	@ChildResource(name = "gsInfoItems")
	private List<GsInformationBanner> gsInfoItemsList;

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


}
