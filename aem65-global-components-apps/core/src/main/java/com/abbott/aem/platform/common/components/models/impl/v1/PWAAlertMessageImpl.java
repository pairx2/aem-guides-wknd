package com.abbott.aem.platform.common.components.models.impl.v1;

import lombok.Getter;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.abbott.aem.platform.common.components.models.PWAAlertMessage;
import com.adobe.cq.export.json.ExporterConstants;

import lombok.AccessLevel;
import lombok.Setter;

/**
 * The Class PWAAlertMessageImpl.
 */
@Model(adaptables = { SlingHttpServletRequest.class }, adapters = { PWAAlertMessage.class }, resourceType = {
		PWAAlertMessageImpl.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public class PWAAlertMessageImpl implements PWAAlertMessage {

	/**
	 * The Constant RESOURCE_TYPE.
	 */
	protected static final String RESOURCE_TYPE = "abbott-platform/components/content/molecules/pwaalertmessage/v1/pwaalertmessage";

	/**
	 * The Safari Message
	 */
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String safariMessage;

	/**
	 * The Safari Icon
	 */
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String safariIcon;

	/**
	 * The Chrome Message
	 */
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String chromeMessage;

	/**
	 * The Chrome Icon
	 */
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String chromeIcon;

	/**
	 * The Close Icon for Download Message
	 */
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String closeIcon;

	/**
	 * The Success Message
	 */
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String successMessage;

	/**
	 * The Failed Message
	 */
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String failedMessage;

	/**
	 * The Close Icon for Download Status
	 */
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String closeIconStatus;

	/**
	 * The Online Message
	 */
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String onlineMessage;

	/**
	 * The Offline Message
	 */
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String offlineMessage;

	/**
	 * The Close Icon for Internet Status
	 */
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String closeIconInternet;

}