package com.abbott.aem.corp.division.core.components.models.impl;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import javax.inject.Inject;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import com.abbott.aem.cloud.platform.core.util.PageUtil;
import com.abbott.aem.corp.division.core.components.models.TagButtonPageList;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.commons.Externalizer;
import com.day.cq.tagging.Tag;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class }, adapters = { TagButtonPageList.class }, resourceType = {
		TagButtonPageListImpl.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class TagButtonPageListImpl implements TagButtonPageList {
	public static final String RESOURCE_TYPE = "corp/division/component/content/tagbutton";
	
	private static final String TAG_PATH = "corpnewsroom/tag/";

	private Map<String, String> tagPageMap = new LinkedHashMap<>();

	@Inject
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Page currentPage;

	@SlingObject
	private ResourceResolver resourceResolver;

	@OSGiService
	private Externalizer externalizer;
	
	private Map<String,String> tagList = new HashMap<>();
	

	@Override
	public Map<String, String> getTagUrlList() {
		Tag[] tags = currentPage.getTags();
		PageManager pageMgr = resourceResolver.adaptTo(PageManager.class);
		String language = currentPage.getLanguage().getLanguage();
		String currentPagePath = currentPage.getPath();
		String regex = "(?<=\\/" + language + "\\/).*$";
		for (Tag tag : tags) {
			String tagPagePath = currentPagePath.split(regex)[0];		
			tagPagePath = !tag.getPath().contains("/corp/abbott/corpnewsroom/category") ? ((tagPagePath + TAG_PATH) + tag.getTitle().toLowerCase().replaceAll(" ", "")) : null;
			Page page = pageMgr.getContainingPage(tagPagePath);
			if (null != page && page.isValid()) {
				tagPagePath = PageUtil.getUrl(page.getPath(), resourceResolver, externalizer, false, false);
				tagPageMap.put(tag.getTitle(), tagPagePath);
			}
			else {
				tagList.put(tag.getTitle(),tagPagePath);
			}
		}
		return tagPageMap;

	}
	
	@Override
	public Map<String, String> getTagsWithOutPages() {
		return tagList;
		
		
	}
	

}
