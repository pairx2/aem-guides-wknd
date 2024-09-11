package com.abbott.aem.adc.freestylelibrede.models;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.via.ChildResource;

/**
 * Sling model class for Rx Next Steps component.
 *
 * @author vikkaush
 */

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/checkout/rx-checkout-next-steps")
public interface RxNextStepsModel {

	@Inject
	String getImportantHeading();

	@Inject
	String getMessage();

	@Inject
	 String getIcon();

	@Inject
	 String getDownloadCtaStyle();

	@Inject
	 String getNextStepsHeading();

	@Inject
	 String getDescription();

	@Inject
	boolean isEnableAssistanceWizard();

	@Inject
	String getDownloadCtaText();

	@Inject
	String getDownloadAssetPath();

	@Inject
	@Via(type = ChildResource.class)
	List<NextSteps> getNextSteps();


	@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
	interface NextSteps {

		@Inject
		@Named("stepHeading")
		String getStepHeading();

		@Inject
		@Named("stepDescription")
		 String getStepDescription();

		@Inject
		@Named("stepIcon")
		String getStepIcon();

	}
}