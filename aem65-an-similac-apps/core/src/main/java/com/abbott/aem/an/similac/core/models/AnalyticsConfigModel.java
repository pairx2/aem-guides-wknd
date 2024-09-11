package com.abbott.aem.an.similac.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.RequestAttribute;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;


/**
 * @author Spandana S 
 * Sling model for Analytics
 *
 */
@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class AnalyticsConfigModel {
   
	
	
	@SlingObject
	private ResourceResolver resourceResolver;

	/** Page Name */
	@RequestAttribute
	private String pageName;

	@RequestAttribute
	private String sectionTitle;

	@RequestAttribute
	private String linkName;

	private String eventLabel;

	/**
	 * @return concatenates the request parameters and returns the event label
	 */
	public String getEventLabel() {

		if (pageName != null) {
			pageName = getformattedString(pageName);
			eventLabel = pageName;
		}

		if (sectionTitle != null) {
			sectionTitle = getformattedString(sectionTitle);
			eventLabel = eventLabel != null ? (eventLabel.concat("_") + sectionTitle) : sectionTitle;
		}

		if (linkName != null) {

			linkName = getformattedString(linkName);
			eventLabel = eventLabel != null ? (eventLabel.concat("_") + linkName) : linkName;
		}

		return eventLabel;

	}

	/**
	 * @param linkName
	 * @return returns the formatted string by removing all special characters and
	 *         replace spaces with hiphen
	 */
	public String getformattedString(String linkName) {

		String[] specialChar = {"'","’","quot"};
		for(String str:specialChar) {
			if(linkName.contains(str))
			{
				linkName = linkName.replace(str, "");
			}
		}
		linkName = linkName.replaceAll("<[^>]*>", "");	
		String[] stringArray = linkName.trim().toLowerCase().split("\\W+");
		return String.join("-", stringArray);
 
	}

	public String getPageName() {
		return pageName;
	}

	public void setPageName(String pageName) {
		this.pageName = pageName;
	}

	public String getSectionTitle() {
		return sectionTitle;
	}

	public void setSectionTitle(String sectionTitle) {
		this.sectionTitle = sectionTitle;
	}

	public String getLinkName() {
		return linkName;
	}

	public void setLinkName(String linkName) {
		this.linkName = linkName;
	}

}
