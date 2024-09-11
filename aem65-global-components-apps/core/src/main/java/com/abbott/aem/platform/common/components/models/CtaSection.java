package com.abbott.aem.platform.common.components.models;

import java.util.List;

import com.adobe.cq.wcm.core.components.models.Component;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface CtaSection extends Component {

	String getBackgroundColor();

	String getTitle();

	String getSubTitle();

	String getDescription();

	int getButtonCount();

	List<String> getListOfButtons();

}
