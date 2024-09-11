package com.abbott.aem.platform.common.components.models;

import com.adobe.cq.wcm.core.components.models.Teaser;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface Cards extends Teaser {

	public String getCtaOne();

	public String getCtaTwo();

	public boolean isClickable();

	public String getCardLink();

	public String getExternal();

	public String getAction();

	public String getHoverText();

	public String getExpFragPathVideo();

	public String getModalIcon();

}
