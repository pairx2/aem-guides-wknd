package com.abbott.aem.platform.common.components.models.impl.v1;

import lombok.Setter;
import lombok.AccessLevel;


import com.abbott.aem.platform.common.components.models.BackToTop;
import com.adobe.cq.export.json.ExporterConstants;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;


/**
 * The Class BackToTopImpl.
 */

@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { BackToTop.class },
	   resourceType = { BackToTopImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
			extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class BackToTopImpl implements BackToTop {
	/**
	 * The Constant RESOURCE_TYPE.
	 */
	public static final String RESOURCE_TYPE = "abbott-platform/components/content/atoms/backtotop/v1/backtotop";

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String buttonType;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String title;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String onlyTextBtnTitle;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String icon;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String textOnlyIcon;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String iconWithText;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String position;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String screenSize;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private boolean isIconOnly;


	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private boolean onlyIconTextOnlyBtnMob;


	@Override
	public String getButtonType() {
		return buttonType;
	}

	@Override
	public String getTitle() {
		return title;
	}

	@Override
	public String getonlyTextBtnTitle() {
		return onlyTextBtnTitle;
	}

	@Override
	public String getIcon() {
		return icon;
	}

	@Override
	public String gettextOnlyIcon() {
		return textOnlyIcon;
	}

	@Override
	public String geticonWithText() {
		return iconWithText;
	}

	@Override
	public String getPosition() {
		return position;
	}

	@Override
	public String getScreenSize() {
		return screenSize;
	}

	@Override
	public boolean isIconOnly() {
		return isIconOnly;
	}

	@Override
	public boolean isonlyIconTextOnlyBtnMob() {
		return onlyIconTextOnlyBtnMob;
	}
}