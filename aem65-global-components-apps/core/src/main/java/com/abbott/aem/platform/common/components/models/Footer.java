package com.abbott.aem.platform.common.components.models;

import java.util.List;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface Footer {

	public String getCopyrightText();

	public int getDisclaimerLinksCount();

	public int getLinkStackCount();

	public List<String> getListOfLinkStack();

	public List<String> getListOfDisclaimer();

}