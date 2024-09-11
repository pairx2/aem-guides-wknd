package com.abbott.aem.adc.freestylelibrede.models;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import lombok.Getter;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;
import com.abbott.aem.adc.freestylelibrede.services.SickFundService;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/wizard-insurance-display")
public class WizardInsuranceModel{
	
	@Inject
	ResourceResolver resourceResolver;
	
	@Inject
	SickFundService sickFundService;
	
	@Externalize
    private String redirectPath;	
    @Getter
	private List<SickFundService.SickFund> sickFundsPDFList;
	
	private Map<String, String> sickFundMap;
	
	/**
	 * The Field heading
	 */
	@Inject
	private String heading;

	/**
	 * The field Info Icon
	 */
	@Inject
	private String infoIcon;

	/**
	 * The field No Insurance Heading
	 */
	@Inject
	private String noInsuranceHeading;

	/**
	 * The field No Insurance Description
	 */
	@Inject
	private String noInsuranceDescription;

	/**
	 * The field No Insurance Icon
	 */
	@Inject
	private String noInsuranceIcon;

	/**
	 * The field Secure Data Message
	 */
	@Inject
	private String secureDataMessage;

	/**
	 * The field Secure Icon
	 */
	@Inject
	private String secureIcon;

	/**
	 * The Field Content Fragment Root Path
	 */
	@Inject
	private String contentFragmentRootPath;
	
	@Inject
	private String pdfRootPath;
	
	public String getRedirectPath() {
		return redirectPath;
	}

	public String getHeading() {
		return heading;
	}

	public String getInfoIcon() {
		return infoIcon;
	}

	public String getNoInsuranceHeading() {
		return noInsuranceHeading;
	}

	public String getNoInsuranceDescription() {
		return noInsuranceDescription;
	}

	public String getNoInsuranceIcon() {
		return noInsuranceIcon;
	}

	public String getSecureDataMessage() {
		return secureDataMessage;
	}

	public String getSecureIcon() {
		return secureIcon;
	}

	public String getContentFragmentRootPath() {
		return contentFragmentRootPath;
	}

	public Map<String, String> getSickFundMap() {
		return sickFundMap;
	}
	
	@PostConstruct
	public void init() {
		sickFundsPDFList = sickFundService.listSickFunds(resourceResolver, this.pdfRootPath);
		sickFundMap = sickFundService.getContentFragmentRootPath(resourceResolver, contentFragmentRootPath + "/jcr:content/data");
	}

}
