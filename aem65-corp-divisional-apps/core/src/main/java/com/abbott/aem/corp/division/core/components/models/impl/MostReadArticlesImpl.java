package com.abbott.aem.corp.division.core.components.models.impl;

import com.abbott.aem.corp.division.core.components.models.MostReadArticles;
import com.abbott.aem.corp.division.core.components.models.MostReadArticlesModal;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.commons.jcr.JcrConstants;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;


@Model(adaptables = { SlingHttpServletRequest.class }, adapters = {
		MostReadArticles.class }, resourceType = {
				MostReadArticlesImpl.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class MostReadArticlesImpl implements MostReadArticles {

	public static final String RESOURCE_TYPE = "corp/division/component/content/mostreadarticles";

	public static final String ARTICLE_PROP = "articlePath";

	public static final String FORWARD_SLASH = "/";

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Getter
	public String mostReadArticles;

	@Setter(AccessLevel.NONE)
	@Default(values = "0")
	@ValueMapValue
	@Getter
	public String totalResults;

	@Setter(AccessLevel.NONE)
	@Default(values = "mostreadarticles")
	@ValueMapValue
	@Getter
	public String displayType;

	@SlingObject
	public ResourceResolver resourceResolver;

	@Setter(AccessLevel.NONE)
	@Getter
	public List<MostReadArticlesModal> articleList = new ArrayList<>();

	@Setter(AccessLevel.NONE)
	@Getter
	public List<MostReadArticlesModal> articleListObj = new ArrayList<>();

	@Setter(AccessLevel.NONE)
	@Getter
	public String title;

	@Setter(AccessLevel.NONE)
	@Getter
	public String hoverTitle;

	@PostConstruct
	protected void init() {


			if (null != mostReadArticles) {
				Resource corpPageResource = resourceResolver.getResource(mostReadArticles + MostReadArticlesImpl.FORWARD_SLASH + JcrConstants.JCR_CONTENT);
				ValueMap corpProperties = corpPageResource.getValueMap();
				title = corpProperties.get("mostReadTitle", "");
				hoverTitle = corpProperties.get("mostReadHoverTitle", "");
				Resource mostReadResource = resourceResolver.getResource(mostReadArticles + MostReadArticlesImpl.FORWARD_SLASH + JcrConstants.JCR_CONTENT + MostReadArticlesImpl.FORWARD_SLASH + "mostReadPaths");
				if(mostReadResource !=null){
					Iterable<Resource> mostReadChild = mostReadResource.getChildren();
					if(mostReadChild !=null){
						Iterator<Resource> childItr = mostReadChild.iterator();
						articleListObj = getTotalList(iterateArticlePages(childItr));
					}
				}

			}

	}


	/*
	 * This method is used to prepare the list for pagination.
	 * @param articleList list of the child pages
	 * @return pressPagesObj list of the pages
	 */
	public List<MostReadArticlesModal> getTotalList(List<MostReadArticlesModal> articleList) {
		int listSize = articleList.size() > 0 ? articleList.size() : 0;
		int totalResultCount = totalResults != null ? Integer.parseInt(totalResults) : 0;

		if (totalResultCount >= listSize) {
			totalResultCount = listSize;
		}

		for (int i = 0; i < totalResultCount; i++) {
			articleListObj.add(articleList.get(i));
		}

		return articleListObj;

	}

	public List<MostReadArticlesModal> iterateArticlePages(Iterator<Resource> childItr) {
		while(childItr.hasNext()){
			Resource childResource = childItr.next();
			ValueMap articleMap = childResource.getValueMap();
			String articlePath = articleMap.get(ARTICLE_PROP, "");
			if(articlePath !=null) {
					Resource pageResource = resourceResolver.getResource(articlePath + MostReadArticlesImpl.FORWARD_SLASH + JcrConstants.JCR_CONTENT);
					if(pageResource !=null){
						MostReadArticlesModal mostReadArticlesModal = pageResource.adaptTo(MostReadArticlesModalImpl.class);
						articleList.add(mostReadArticlesModal);
					}
			}
		}
		

		return articleList;

	}

}

