package com.abbott.aem.platform.common.components.models;

import com.adobe.cq.wcm.core.components.models.Accordion;

import org.osgi.annotation.versioning.ConsumerType;

/**
 * @author Pawan.Namagiri
 */
@ConsumerType
public interface CustomAccordion extends Accordion {

	public String getCollapseTitle();

	public String getExpandTitle();

	public String getIconExpand();

	public String getIconCollapse();
}
