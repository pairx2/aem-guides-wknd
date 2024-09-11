package com.abbott.aem.corp.division.core.components.models.impl;

import java.util.List;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import com.abbott.aem.corp.division.core.components.models.StoriesModal;
import com.abbott.aem.corp.division.core.components.models.StoriesPanel;
import com.adobe.cq.export.json.ExporterConstants;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;


@Model(adaptables = { SlingHttpServletRequest.class }, adapters = { StoriesModal.class }, resourceType = {
		StoriesModalImpl.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class StoriesModalImpl implements StoriesModal {

	public static final String RESOURCE_TYPE = "corp/division/component/content/stories";

	
	@ChildResource
    @Setter(AccessLevel.NONE)
    @Getter
	public List<StoriesPanel> storyPanels;
	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	public String sectionTitleRequired;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	public String displayType;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	public String seeAllText;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	public String viewAllLink;

	
		
}
