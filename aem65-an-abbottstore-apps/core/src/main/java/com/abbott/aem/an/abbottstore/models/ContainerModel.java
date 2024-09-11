package com.abbott.aem.an.abbottstore.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 * @author saikrishna.s
 * 
 *         ContainerModel
 * 
 *         ContainerModel is the SlingModel for content/container component
 *         which is used to provide basic functionality of container
 *         component.
 * 
 *         Version Number: 1.0
 */
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ContainerModel {

	/** The id. */
	@ValueMapValue
	private String id;

	/** The bg color. */
	@ValueMapValue
	private String bgColor;

	/**
	 * Gets the id.
	 *
	 * @return the id
	 */
	public String getId() {
		return id;
	}

	/**
	 * Gets the bg color.
	 *
	 * @return the bg color
	 */
	public String getBgColor() {
		return bgColor;
	}
}
