package com.abbott.aem.cv.division.core.components.models;

import java.util.List;

import com.adobe.cq.wcm.core.components.models.Component;
import com.day.cq.wcm.api.Page;
import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface SideNavigation extends Component {
	public String getRootvalue();

	public String getTopmargin();

	public String getBottommargin();

	public String getDisplayrootpage();

	public String getIntegraterootpage();

	public List<Page> getSiblingItems();

	public Page getRequestedPage();
}