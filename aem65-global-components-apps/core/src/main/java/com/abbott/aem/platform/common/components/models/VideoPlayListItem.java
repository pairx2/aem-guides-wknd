package com.abbott.aem.platform.common.components.models;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface VideoPlayListItem {

	public String getTitle();

	public String getWistiaId();

	public String getVideoSrc();

	public String getVideoText();

	public String getButtonText();

	public String getButtonLink();

	public String getIconImage();

	public String getVideoDocumentNumber();

}