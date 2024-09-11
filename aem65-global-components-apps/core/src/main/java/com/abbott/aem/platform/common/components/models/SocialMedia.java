package com.abbott.aem.platform.common.components.models;

import java.util.List;

import org.apache.sling.api.resource.Resource;
import org.osgi.annotation.versioning.ConsumerType;

/**
 * The Interface SocialMedia.
 */
@ConsumerType
public interface SocialMedia {

	/**
	 * Social Media Title.
	 *
	 * @return the string
	 */
	public String getSocialMediaTitle();

	/**
	 * Social Media Icons.
	 *
	 * @return the List
	 */
	public List<Resource> getSocialMediaIcons();

	/**
	 * Is Empty.
	 *
	 * @return the boolean
	 */
	public boolean isEmpty();

}