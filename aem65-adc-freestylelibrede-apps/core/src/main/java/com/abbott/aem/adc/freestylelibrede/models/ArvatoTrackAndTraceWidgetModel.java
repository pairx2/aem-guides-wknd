package com.abbott.aem.adc.freestylelibrede.models;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;


@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/arvato-track-and-trace-widget")
public class ArvatoTrackAndTraceWidgetModel extends BaseComponentPropertiesImpl {

	 	@Inject
	    private String heading;

		@Inject
	    private String subHeading;

	    @Inject
	    private String orderIDText;

	    @Inject
	    private String orderIDValidationRegex;

	    @Inject
	    private String orderIDLength;

	    @Inject
	    private String zipCodeText;

	    @Inject
	    private String zipCodeValidationRegex;

	    @Inject
	    private String zipCodeLength;

	    @Inject
	    private String submitButtonText;

	    @Inject
	    private String zipCodePlaceHolderText;

	    @Inject
	    private String orderIdPlaceHolderText;
	    
	    @Inject
	    private String submitCtaStyle;

		@Inject
		private String successLink;
	    
		public String getHeading() {
			return heading;
		}

		public String getSubHeading(){
			return subHeading;
		}

		public String getOrderIDText() {
			return orderIDText;
		}

		public String getOrderIDValidationRegex() {
			return orderIDValidationRegex;
		}

		public String getOrderIDLength() {
			return orderIDLength;
		}

		public String getZipCodeText() {
			return zipCodeText;
		}

		public String getZipCodeValidationRegex() {
			return zipCodeValidationRegex;
		}

		public String getZipCodeLength() {
			return zipCodeLength;
		}

		public String getSubmitButtonText() {
			return submitButtonText;
		}

		public String getZipCodePlaceHolderText() {
			return zipCodePlaceHolderText;
		}

		public String getOrderIdPlaceHolderText() {
			return orderIdPlaceHolderText;
		}

		public String getSubmitCtaStyle() {
			return submitCtaStyle;
		}

		public String getSuccessLink() {
			return successLink;
		}
		
}