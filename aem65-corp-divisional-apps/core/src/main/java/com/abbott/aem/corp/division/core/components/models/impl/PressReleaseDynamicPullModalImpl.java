package com.abbott.aem.corp.division.core.components.models.impl;

import com.abbott.aem.corp.division.core.components.models.PressReleaseDynamicPull;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.commons.jcr.JcrConstants;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import com.abbott.aem.corp.division.core.components.models.PressReleaseDynamicPullModal;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import javax.annotation.PostConstruct;
import org.apache.sling.models.annotations.Default;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.Iterator;
import java.util.List;
import java.util.ArrayList;
import java.util.Comparator;
import org.apache.commons.lang3.StringUtils;
import com.day.cq.wcm.api.NameConstants;

@Model(adaptables = { SlingHttpServletRequest.class }, adapters = {
		PressReleaseDynamicPullModal.class }, resourceType = {
				PressReleaseDynamicPullModalImpl.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class PressReleaseDynamicPullModalImpl implements PressReleaseDynamicPullModal {

	public static final String RESOURCE_TYPE = "corp/division/component/content/pressreleasesdynamicpull";

	public static final Logger log = LoggerFactory.getLogger(PressReleaseDynamicPullModalImpl.class);
	
	private static final String OUR_EXPERTS ="ourexperts";
	
	private static final String HIDE_IN_NAV ="hideInNav";
	
	private static final String MARATHON_PAGES ="marathonpages";

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Getter
	public String pressReleaseRootPath;

	@Setter(AccessLevel.NONE)
	@Default(values = "0")
	@ValueMapValue
	@Getter
	public String totalResults;
	
	@Setter(AccessLevel.NONE)
	@Default(values = "0")
	@ValueMapValue
	@Getter
	public String initialCount;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Getter
	public String showMoreText;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Getter
	public String errorMsg;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Getter
	public String paginationText;

	@Setter(AccessLevel.NONE)
	@Default(values = "pressreleasedynamic")
	@ValueMapValue
	@Getter
	public String displayType;

	@ScriptVariable
	public PageManager pageManager;

	@Getter
	@Setter(AccessLevel.NONE)
	public Page requestedPage;
	
	@Getter
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	public String tagPath;
	
	
	@Getter
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	public String expertCount;
	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	public String seeAllText;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	public String viewAllLink;
	
	@Setter(AccessLevel.NONE)
    @ValueMapValue
    @Getter
    public String readMore;
	
	
	@SlingObject
	public ResourceResolver resourceResolver;

	@Setter(AccessLevel.NONE)
	@Getter
	public List<PressReleaseDynamicPull> pressPages = new ArrayList<>();
	
	@Setter(AccessLevel.NONE)
	@Getter
	public List<PressReleaseDynamicPull> articlePagesList = new ArrayList<>();

	@Setter(AccessLevel.NONE)
	@Getter
	public List<PressReleaseDynamicPull> pressPagesObj = new ArrayList<>();

	boolean executiveFlag = false;
	
	
	@PostConstruct
	protected void init() {
		

		if(StringUtils.equalsIgnoreCase("executiveteam",displayType) || StringUtils.equalsIgnoreCase(OUR_EXPERTS,displayType) || StringUtils.equalsIgnoreCase(MARATHON_PAGES,displayType))
			executiveFlag = true;
		
		pageManager = resourceResolver.adaptTo(PageManager.class);
		if (null != pressReleaseRootPath && null != pageManager) {
			requestedPage = pageManager.getPage(pressReleaseRootPath);
			if (null != requestedPage) {			
					preparePagesList(requestedPage);
				}
			if(!executiveFlag) {
				pressPages = sortListByDate(pressPages);
				pressPagesObj = sortListByResultCount(pressPages);
			}
		} 				
	}
	
	
	public void preparePagesList(Page requestedPage) {		
		pressPages = preparePressPageList(requestedPage);
		if(null != pressPages && StringUtils.equalsIgnoreCase(OUR_EXPERTS,displayType))  {
			pressPages=sortListByTitle(pressPages);
		}
		if(null != pressPages && StringUtils.equalsIgnoreCase(MARATHON_PAGES,displayType))  {
			prepareArticlePagesList(requestedPage);
			pressPages=sortListByDate(pressPages);
			articlePagesList=sortListByResult(pressPages);
		}	
	}

	/*
	 * This method is used to sort the list by press date
	 * @param pressPages list of the child pages
	 * @return pressPagesObj list of the pages
	 */
	public List<PressReleaseDynamicPull> sortListByDate(List<PressReleaseDynamicPull> pressPages) {

		pressPages.sort(Comparator.comparing(PressReleaseDynamicPull::getPressDate).reversed());

		return pressPages;

	}
	
	/*
	 * This method is used to prepare the list for pagination.
	 * @param pressPages list of the child pages
	 * @return pressPagesObj list of the pages
	 */
	public List<PressReleaseDynamicPull> sortListByResultCount(List<PressReleaseDynamicPull> pressPages) {
		int listSize = pressPages.size() > 0 ? pressPages.size() : 0;
		int totalResultCount = totalResults != null ? Integer.parseInt(totalResults) : 0;

		if (totalResultCount >= listSize) {
			totalResultCount = listSize;
		}

		for (int i = 0; i < totalResultCount; i++) {
			pressPagesObj.add(pressPages.get(i));
		}

		return pressPagesObj;

	}
	
	/*
	 * This method is used to read the child pages from parent and add it to the page.
	 * @param pressPages root path of the hierarchy
	 * @return pressPagesObj list of the pages
	 */
	public List<PressReleaseDynamicPull> preparePressPageList(Page pressRootPage){
		
		Iterator<Page> pressChildPages = pressRootPage.listChildren();
		while (pressChildPages.hasNext()) {
			Page childPage = pressChildPages.next();
			Resource pageResource = resourceResolver
					.getResource(childPage.getPath() + "/" + JcrConstants.JCR_CONTENT);
			if (pageResource != null) {
				
				prepareChildPages(pageResource,childPage);
					
			}
		}
		return pressPages;
		}
	
	public void prepareChildPages(Resource pageResource,Page childPage) {
		
		PressReleaseDynamicPull pressReleaseDynamicPull = pageResource
				.adaptTo(PressReleaseDynamicPullImpl.class);
		ValueMap properties = childPage.getProperties();
		if(!executiveFlag){
			if (properties.get(HIDE_IN_NAV) == null && pressReleaseDynamicPull.getPressDate() != null) {
				pressPages.add(pressReleaseDynamicPull);
			}
		} else if(properties.get(HIDE_IN_NAV) == null &&  !(StringUtils.equalsIgnoreCase(OUR_EXPERTS,displayType)) && !(StringUtils.equalsIgnoreCase(MARATHON_PAGES,displayType)) ){
				pressPages.add(pressReleaseDynamicPull);					
	}
		else if(properties.get(HIDE_IN_NAV) == null && (StringUtils.equalsIgnoreCase(OUR_EXPERTS,displayType) || StringUtils.equalsIgnoreCase(MARATHON_PAGES,displayType)) && checkTagsInPage(properties)) {
				pressPages.add(pressReleaseDynamicPull);
		}	
		
		
	}
			
	/*
	 * This method is used to check if tags are authored in the page 
	 * @param properties list of the  page
	 * @return true  list if tags if tags are authored in the page 
	 */		
		public boolean checkTagsInPage(ValueMap properties ) {
	   
			String tags[] = properties.get(NameConstants.PN_TAGS,String[].class);
			if(null != tags) {			
				for (String tagValue:tags) {
					 if(tagPath.equalsIgnoreCase(tagValue)) {
						 return true;
					 }
				}
			}			
		return false;
	}

			
		/*
		 * This method is used to sort the list by title
		 * @param pressPages list of the child pages
		 * @return pressPages list of the pages
		 */
		
		public List<PressReleaseDynamicPull> sortListByTitle(List<PressReleaseDynamicPull> pressPages) {

			pressPages.sort(Comparator.comparing(PressReleaseDynamicPull::getExecTitle));

			return pressPages;

		}
		
		public void prepareArticlePagesList(Page pressRootPage) {

			Iterator<Page> ChildPages = pressRootPage.listChildren();
			while (ChildPages.hasNext()) {
				Page childPage = ChildPages.next();
				preparePressPageList(childPage);
			}
		}
		
		
		
		public List<PressReleaseDynamicPull> sortListByResult(List<PressReleaseDynamicPull> pressPages) {
			int listSize = pressPages.size() > 0 ? pressPages.size() : 0;
			int totalResultCount = expertCount != null ? Integer.parseInt(expertCount) : 0;

			if (totalResultCount >= listSize) {
				totalResultCount = listSize;
			}

			for (int i = 0; i < totalResultCount; i++) {
				pressPagesObj.add(pressPages.get(i));
			}

			return pressPagesObj;

		}		
}