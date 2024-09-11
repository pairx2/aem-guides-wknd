package com.abbott.aem.corp.division.core.components.models.impl;

import com.abbott.aem.corp.division.core.components.models.MostReadArticlesModal;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.inject.Named;

@Model(adaptables = {Resource.class, SlingHttpServletRequest.class}, adapters = {MostReadArticlesModal.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class MostReadArticlesModalImpl implements MostReadArticlesModal {

	public static final Logger log = LoggerFactory.getLogger(MostReadArticlesModalImpl.class);

	@SlingObject
	private ResourceResolver resourceResolver;
	
	@Setter(AccessLevel.NONE)
    @ValueMapValue
    @Getter
	@Named("articlesubtitle")
    public String articleTitle;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Getter
	@Named("articledescription")
	public String articleDescription;

	@Setter(AccessLevel.NONE)
    @ValueMapValue
    @Getter
	@Named("articleimage")
    public String articleImage;
	
	@Setter(AccessLevel.NONE)  
    @ValueMapValue
	@Getter
	@Named("articledate")
    public String articleDate;

	@SlingObject
	private Resource currentResource;

	@Setter(AccessLevel.NONE)
	@Getter
	public String parentPageTitle;

	@Setter(AccessLevel.NONE)
	@Getter
	public String articleColor;

	@Setter(AccessLevel.NONE)
	@Getter
	public String articlePath;

	@ScriptVariable
	public PageManager pageManager;

	
	@PostConstruct
	protected void init() {
		pageManager = resourceResolver.adaptTo(PageManager.class);
		articlePath = currentResource.getParent().getPath();
		Page articlePage = pageManager.getContainingPage(currentResource.getPath());
		if(articlePage != null){
			parentPageTitle = articlePage.getParent().getTitle();
			ValueMap pageProperties =articlePage.getParent().getProperties();
			articleColor = pageProperties.get("articlecolor","color-light-blue");
		}

	}

}

	

