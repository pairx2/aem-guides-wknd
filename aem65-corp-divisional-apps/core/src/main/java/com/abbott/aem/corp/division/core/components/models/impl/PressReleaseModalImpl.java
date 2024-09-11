package com.abbott.aem.corp.division.core.components.models.impl;

import java.util.List;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import com.abbott.aem.corp.division.core.components.models.PressReleaseModal;
import com.abbott.aem.corp.division.core.components.models.PressReleases;
import com.adobe.cq.export.json.ExporterConstants;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

@Model(adaptables = {Resource.class, SlingHttpServletRequest.class}, adapters = {PressReleaseModal.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class PressReleaseModalImpl implements PressReleaseModal {
	
	@ChildResource
	@Setter(AccessLevel.NONE)
    @Getter
    public List<PressReleases> pressItems;
	
	@Setter(AccessLevel.NONE)
    @ValueMapValue
    @Getter
    public String seeMore;
	
	@Setter(AccessLevel.NONE)
    @ValueMapValue
    @Getter
    public String articleTitle;
	
	@Setter(AccessLevel.NONE)
    @ValueMapValue
    @Getter
    public String seeMoreLink;
}
