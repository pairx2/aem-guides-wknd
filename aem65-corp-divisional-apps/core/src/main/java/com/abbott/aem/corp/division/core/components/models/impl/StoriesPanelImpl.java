package com.abbott.aem.corp.division.core.components.models.impl;

import javax.annotation.PostConstruct;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import com.abbott.aem.corp.division.core.components.models.StoriesPanel;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import com.abbott.aem.platform.common.components.models.utils.PlatformUtil;


@Model(adaptables = {Resource.class, SlingHttpServletRequest.class}, adapters = {StoriesPanel.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class StoriesPanelImpl implements StoriesPanel {

	@SlingObject
	private ResourceResolver resourceResolver;
	
	@Setter(AccessLevel.NONE)
    @ValueMapValue
    @Getter
    public String titleColor;

	@Setter(AccessLevel.NONE)
    @ValueMapValue
    @Getter
    public String altText;
	
	@Setter(AccessLevel.NONE)  
    @ValueMapValue
    public String storyHeadline;
	
	@Setter(AccessLevel.NONE)
    @ValueMapValue
    @Getter
    public String readMore;
	
	@Setter(AccessLevel.NONE)
    @ValueMapValue
    public String storyImage;
	
	@Setter(AccessLevel.NONE)
    @ValueMapValue
    public String storyTitle;
	
	@Setter(AccessLevel.NONE)
    @ValueMapValue
    @Getter
    public String storyType;
	
	@Setter(AccessLevel.NONE)
    @ValueMapValue
    @Getter
    public String storyLink;
	
	@Setter(AccessLevel.NONE)
    @ValueMapValue
    @Getter
    public String videoType;
	
	@Setter(AccessLevel.NONE)
    @ValueMapValue
    public String storyDescription;
	
	@Setter(AccessLevel.NONE)
	@Getter
    @ValueMapValue
    public String rootPath;
	
	@Setter(AccessLevel.NONE)
    @ValueMapValue
    @Getter
    public String mediaId;
	
	
	@Setter(AccessLevel.NONE)
    @ValueMapValue
    @Getter
    public String videoScript;
	
	
	@Setter(AccessLevel.NONE)
    @ValueMapValue
    @Getter
    public String playerId;
	
	@Setter(AccessLevel.NONE)
    @ValueMapValue
    @Getter
    public String storyDate;
		
	@Setter(AccessLevel.NONE)
    @ValueMapValue
    @Getter
    public String dynamicData;
	
	@Setter(AccessLevel.NONE)
    @ValueMapValue
    @Getter
    public String newTab;
	
	@Setter(AccessLevel.NONE)
    @ValueMapValue
    @Getter
    public String assetLink;

	@Setter(AccessLevel.NONE)
	@Getter
	public String storiesDynamicPath;

	@PostConstruct
	protected void init() {
		if(null != rootPath ) {
			storiesDynamicPath = PlatformUtil.ensureProperLink(rootPath);
			getColor();
			getStoryImage();
			getStoryTitle();
			getStoryDescription();
			getStoryHeadline();
		}
		storyLink = PlatformUtil.ensureProperLink(storyLink);

	}
	
	
	public String getDynamicValue(String path,String key) {
		Page page = resourceResolver.adaptTo(PageManager.class).getContainingPage(path);
		String value = null;
		if (null != page) {
			ValueMap pageProperties =page.getProperties();
			return pageProperties.containsKey(key) ? pageProperties.get(key,"") : null; 
			}
		return value;		
		}
	
	@Override
	public String getColor() {
		if(null !=dynamicData && dynamicData.equalsIgnoreCase("true")) {
			titleColor = getDynamicValue(rootPath,"headingColor");
			}
		return titleColor;	
	}
	
	@Override
	public String getStoryImage() {
		if(null !=dynamicData && dynamicData.equalsIgnoreCase("true")) {
			storyImage = getDynamicValue(rootPath,"articleimage");
			}
		return storyImage;		
	}
	
	@Override
	public String getStoryTitle() {
		if(null !=dynamicData && dynamicData.equalsIgnoreCase("true")) {
			storyTitle = getDynamicValue(rootPath,"categoryTitle");	
			}
		return storyTitle;		
	}
	
	@Override
	public String getStoryDescription() {
		if(null !=dynamicData && dynamicData.equalsIgnoreCase("true")) {
			storyDescription = getDynamicValue(rootPath,"articledescription");	
			}
		return storyDescription;		
	}
	
	@Override
	public String getStoryHeadline() {
		if(null !=dynamicData && dynamicData.equalsIgnoreCase("true")) {
			storyHeadline= getDynamicValue(rootPath,"articlesubtitle");	
			  if(null !=storyHeadline) {
				  storyHeadline= storyHeadline.replaceAll("<[^>]++>", "");
				  return storyHeadline;
			  }
			}
		return storyHeadline;		
	}		
}

	

