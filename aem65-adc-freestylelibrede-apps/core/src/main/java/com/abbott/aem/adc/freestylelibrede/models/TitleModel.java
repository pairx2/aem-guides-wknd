package com.abbott.aem.adc.freestylelibrede.models;

import com.adobe.cq.wcm.core.components.commons.link.Link;
import com.adobe.cq.wcm.core.components.models.Title;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.via.ResourceSuperType;

import javax.inject.Inject;

@Model(adaptables = SlingHttpServletRequest.class, adapters = Title.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/title")
public class TitleModel implements Title {

	@Inject
	@Via("resource")
	private String textColor;

	@Inject
	@Via("resource")
	private boolean cardDisplay;

	@Inject
	@Via("resource")
	private String textAlignment;

	@Self
	@Via(type = ResourceSuperType.class)
	private Title title;

	@Inject
	@Via("resource")
	private String additionalClass;

	
	public String getAdditionalClass() {
		return additionalClass;
	}

	/**
	 * @return the cardDisplay
	 */
	public boolean getCardDisplay() {
		return cardDisplay;
	}

	/**
	 * @return the textColor
	 */
	public String getTextColor() {
		return textColor;
	}

	/**
	 * @return the textAlignment
	 */
	public String getTextAlignment() {
		return textAlignment;
	}

	/**
	 * @return the text
	 */
	@Override
	public String getText() {
		return title.getText();
	}

	/**
	 * @return the link url
	 */
	@Override
	public Link getLink() {
		return title.getLink();
	}

	/**
	 * @return the type
	 */
	@Override
	public String getType() {
		return title.getType();
	}

}
