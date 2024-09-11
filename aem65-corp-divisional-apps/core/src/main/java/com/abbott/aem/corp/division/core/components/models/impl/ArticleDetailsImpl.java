package com.abbott.aem.corp.division.core.components.models.impl;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import com.abbott.aem.corp.division.core.components.models.ArticleDetails;
import com.adobe.cq.export.json.ExporterConstants;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

@Model(adaptables = {Resource.class, SlingHttpServletRequest.class}, adapters = {ArticleDetails.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ArticleDetailsImpl implements ArticleDetails{
	
    @Setter(AccessLevel.NONE)
	@ValueMapValue
    @Getter
    public String isiTitle;
	
	@Setter(AccessLevel.NONE)
    @ValueMapValue
    @Getter
    public String isiRichtext;

}
