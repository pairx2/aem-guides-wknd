package com.abbott.aem.adc.freestylelibrede.models;

import java.util.Calendar;

import javax.inject.Inject;

import com.fasterxml.jackson.annotation.JsonProperty;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

/**
 * The Class ClickToCallModel.
 *
 * @author vikkaush
 */
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/click-to-call")
public class ClickToCallModel extends BaseComponentPropertiesImpl {

	@Inject
	private String icon;

	@Inject
	private String onlineIcon;

	@Inject
	private String offlineIcon;

	@Inject
	private String label;

	@Inject
	private String serviceNumber;

	@Inject
	private String serviceText;

	@Inject
	private Calendar serviceOpeningHour;

	@Inject
	private Calendar serviceClosingHour;

	@Inject
	private boolean clickToCallHeader;

	@Inject
	private String ctaStyling;

	@Inject
	private String helpText;

	@Inject
	private String ctaText;

	@Inject
	private String ctaEmail;

	private ServiceHour openingHour = new ServiceHour();
	private ServiceHour closingHour = new ServiceHour();
	

	@JsonProperty("hasClickToCallHeader")
	public boolean isClickToCallHeader() {
		return clickToCallHeader;
	}

	public String getCtaStyling() {
		return ctaStyling;
	}	

	public String getHelpText() {
		return helpText;
	}

	public String getCtaText() {
		return ctaText;
	}

	public String getCtaEmail() {
		return ctaEmail;
	}

	public String getOnlineIcon() {
		return onlineIcon;
	}

	public String getOfflineIcon() {
		return offlineIcon;
	}

	public String getServiceNumber() {
		return serviceNumber;
	}

	public String getServiceText() {
		return serviceText;
	}

	public String getIcon() {
		return icon;
	}

	public String getLabel() {
		return label;
	}

	class ServiceHour {
		private int hours;
		private int minutes;

		public int getHours() {
			return hours;
		}

		public void setHours(int hours) {
			this.hours = hours;
		}

		public int getMinutes() {
			return minutes;
		}

		public void setMinutes(int minutes) {
			this.minutes = minutes;
		}

	}

	public ServiceHour getOpeningHour() {
		if (serviceOpeningHour != null) {
			openingHour.setHours(serviceOpeningHour.get(Calendar.HOUR_OF_DAY));
			openingHour.setMinutes(serviceOpeningHour.get(Calendar.MINUTE));

		}
		return openingHour;
	}

	public ServiceHour getClosingHour() {
		if (serviceClosingHour != null) {
			closingHour.setHours(serviceClosingHour.get(Calendar.HOUR_OF_DAY));
			closingHour.setMinutes(serviceClosingHour.get(Calendar.MINUTE));

		}
		return closingHour;
	}
}
