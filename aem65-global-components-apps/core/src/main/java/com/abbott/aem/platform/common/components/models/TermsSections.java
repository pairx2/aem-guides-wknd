package com.abbott.aem.platform.common.components.models;

import java.util.List;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface TermsSections {
	public List<TermsSection> getTermsSections();
}