package com.abbott.aem.ardx.division.core.components.models;

import org.osgi.annotation.versioning.ConsumerType;

import com.abbott.aem.platform.common.components.models.Cards;


@ConsumerType
public interface CardArdx extends Cards{
	public String getVideoID();

	public String getVideoDocumentNumber();

	public String getImagePath();

	public String getBackgroundColor();

	public String getPopup();
	
	public String getCardLink();
	
}
