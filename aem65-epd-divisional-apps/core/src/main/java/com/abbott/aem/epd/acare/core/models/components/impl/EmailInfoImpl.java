package com.abbott.aem.epd.acare.core.models.components.impl;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.abbott.aem.epd.acare.core.models.components.EmailInfo;
import com.adobe.cq.export.json.ExporterConstants;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Setter;


/**
 * The Class EmailInfoImpl.
 */

@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class }, adapters = { EmailInfo.class }, resourceType = {
		EmailTagImpl.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class EmailInfoImpl implements EmailInfo {
	
	/** The Constant RESOURCE_TYPE. */
	public static final String RESOURCE_TYPE = "epd/acare/components/email/email-info";

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	public String emailFrom;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	public String emailSubject;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String emailTo;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String emailCC;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String emailBCC;

	@Override
	public String getEmailFrom() { return emailFrom; }

	@Override
	public void setEmailFrom(String emailFrom) { this.emailFrom=emailFrom; }


	@Override
	public String getEmailSubject() { return emailSubject; }
	@Override
	public void setEmailSubject(String emailSubject) { this.emailSubject=emailSubject; }
	@Override
	public String getEmailTo() { return emailTo; }
	@Override
	public void setEmailTo(String emailTo) { this.emailTo=emailTo; }
	@Override
	public String getEmailCC() { return emailCC; }
	@Override
	public void setEmailCC(String emailCC) { this.emailCC=emailCC; }

	@Override
	public String getEmailBCC() { return emailBCC; }
	@Override
	public void setEmailBCC(String emailBCC) { this.emailBCC=emailBCC; }
}