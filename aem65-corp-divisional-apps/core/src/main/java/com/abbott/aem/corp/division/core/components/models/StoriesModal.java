package com.abbott.aem.corp.division.core.components.models;

import java.util.List;
import org.osgi.annotation.versioning.ConsumerType;
import com.adobe.cq.wcm.core.components.models.Component;

@ConsumerType
public interface  StoriesModal extends Component {

	public List<StoriesPanel> getStoryPanels();

	public String getSectionTitleRequired();

	public String getDisplayType();

	public String getSeeAllText();

	public String getViewAllLink();

}
