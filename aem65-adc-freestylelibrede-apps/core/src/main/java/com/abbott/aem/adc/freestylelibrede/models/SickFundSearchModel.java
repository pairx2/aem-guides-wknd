package com.abbott.aem.adc.freestylelibrede.models;

import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;
import com.abbott.aem.adc.freestylelibrede.services.SickFundService;

import lombok.Getter;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/sick-fund-search")
public class SickFundSearchModel extends BaseComponentPropertiesImpl {
	@Inject
	private String heading;

	@Inject
	private String subHeading;

	@Inject
	private String moreInfoLabel;

	@Externalize
	private String moreInfoPath;

	@Inject
	private String pdfRootPath;

	@Inject
	SickFundService sickFundService;

	@Inject
	ResourceResolver resourceResolver;

	@Inject
	private String backgroundImagePath;

	@Inject
	private String contentFragmentRootPath;
	@Getter
	private List<SickFundService.SickFund> sickFundsPDFList;

	private Map<String, String> sickFundMap;	

	public Map<String, String> getSickFundMap() {
		return sickFundMap;
	}

	@PostConstruct
	private void init() {
		sickFundsPDFList = sickFundService.listSickFunds(resourceResolver, this.pdfRootPath);
		sickFundMap = sickFundService.getContentFragmentRootPath(resourceResolver, contentFragmentRootPath + "/jcr:content/data");
	}

	public String getHeading() {
		return heading;
	}

	public String getSubHeading() {
		return subHeading;
	}

	public String getMoreInfoLabel() {
		return moreInfoLabel;
	}

	public String getMoreInfoPath() {
		return moreInfoPath;
	}

	public String getPdfRootPath() {
		return pdfRootPath;
	}

	public String getBackgroundImagePath() {
		return backgroundImagePath;
	}

}
