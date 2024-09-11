package com.abbott.aem.platform.common.components.models.impl.v1;

import java.util.ArrayList;
import java.util.List;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Setter;

import com.abbott.aem.platform.common.components.models.Footer;
import com.adobe.cq.export.json.ExporterConstants;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { Footer.class },
	   resourceType = { FooterImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class FooterImpl extends ComponentProxyImpl implements Footer {

	public static final String RESOURCE_TYPE = "abbott-platform/components/content/organism/footer/v1/footer";

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String copyrightText;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private int disclaimerLinksCount;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private int linkStackCount;

	public List<String> getListOfLinkStack() {

		int count = getLinkStackCount();

		List<String> listOfStacks = new ArrayList<>();

		for (int i = 0; i < count; i++) {
			listOfStacks.add("linkstack-" + i);
		}

		return listOfStacks;
	}

	public List<String> getListOfDisclaimer() {

		int count = getDisclaimerLinksCount();

		List<String> listOfDisclaimers = new ArrayList<>();

		for (int i = 0; i < count; i++) {
			listOfDisclaimers.add("disclaimer-" + i);
		}

		return listOfDisclaimers;
	}

}
