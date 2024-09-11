package com.abbott.aem.corp.division.core.components.models.impl;

import java.net.MalformedURLException;
import java.net.URL;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.PostConstruct;
import javax.inject.Inject;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.abbott.aem.corp.division.core.components.models.CorpPage;
import com.abbott.aem.platform.common.util.PageUtil;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.commons.Externalizer;
import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.wcm.api.NameConstants;
import com.day.cq.wcm.api.Page;
import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;



@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class }, adapters = { CorpPage.class,
		ComponentExporter.class }, resourceType = {
				CorpPageImpl.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class CorpPageImpl implements CorpPage {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(CorpPageImpl.class);
	private static final String LOGO_URL = "/content/dam/corp/abbott/global/logos/logo.png";
	protected static final String RESOURCE_TYPE = "abbott-platform/components/structure/page/v1/page";
	private static final String JCRCONTENT = "/jcr:content/root";
	private static final String CONTAINER = "container";
	private static final String ARTICLE_IMAGE = "articleimage";
	private static final String TAB_ITEM = "/tab_item_no_0";
	private static final String TEXT = "text";
	private static final String COLUMNCONTROL = "/columncontrol/tab_item_no_0/accordion";
	private static final String TYPE = "@type";
	private static final String CQ_PANEL_TITLE = "cq:panelTitle";
	private static final String STRUCTURED_DATA = "structuredData";
	private static final String COLUMN_CONTROL = "columncontrol";
	private static final String JCR_CONTENT = "/jcr:content";
	private static final String ARTICLE = "Article";
	private static final String FAQ = "FAQ";
	private static final String HUBRTE ="hubrte";
	
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String structuredData;
	
	@ValueMapValue(name ="authoredDate")
	@Setter(AccessLevel.NONE)
	private String lastPublished;

	@ValueMapValue(name = NameConstants.PN_PAGE_LAST_MOD)
	@Setter(AccessLevel.NONE)
	private String lastModified;

	@Getter
	private String imageUrl;

	@Getter
	private String textBody;

	@Getter
	private String parentTitle;

	@Getter
	private String url;

	@Getter
	private String logoUrl;

	List<Map<String, String>> details = new ArrayList<>();

	@SlingObject
	private ResourceResolver resourceResolver;

	@Getter
	private String questionAnswers;

	@Getter
	private String pageTitle;

	@Getter
	private String pageDescription;

	@Inject
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Page currentPage;

	@OSGiService
	private Externalizer externalizer;
	
	@Inject
	private Resource resource;

	@Self
	private SlingHttpServletRequest slingHttpServletRequest;

	@PostConstruct
	protected void init() {
		pageTitle = currentPage.getTitle();
		structuredData =setInheritedPageValues(STRUCTURED_DATA,resource);

		if (ARTICLE.equalsIgnoreCase(structuredData)) {
			parentTitle = currentPage.getParent().getTitle();
			pageDescription = currentPage.getDescription();
			url = PageUtil.getUrl(currentPage.getPath(), resourceResolver);
			logoUrl = getAssetUrl(LOGO_URL);
			try {
				lastPublished = (null != lastPublished)?getFormattedDate(lastPublished):getFormattedDate(lastModified);
				lastModified = getFormattedDate(lastModified);
			} catch (ParseException e) {
				
				LOGGER.error("Exception in DateFormat"+e);
			}
			getArticlePageValues();
		}

		if (FAQ.equalsIgnoreCase(structuredData)) {
			getFaqPageValues();
		}

	}

	private void getArticlePageValues() {
		String pagePath = currentPage.getPath() + JCRCONTENT;
		Resource pageResource = resourceResolver.getResource(pagePath);
		if (null != pageResource) {
			Iterator<Resource> resnodes = pageResource.listChildren();
			while (resnodes.hasNext()) {
				Resource child = resnodes.next();
				if (child.getName().startsWith(COLUMN_CONTROL) || child.getName().contains(HUBRTE)) {
					getTextBody(child);					
				}
			}
		}
	}

	private void getFaqPageValues() {
		Map<String, String> mainEntity = new LinkedHashMap<>();
		String pagePath = currentPage.getPath() + JCRCONTENT;
		Resource pageResource = resourceResolver.getResource(pagePath);
		if (null != pageResource) {
			Iterator<Resource> resnodes = pageResource.listChildren();
			while (resnodes.hasNext()) {
				Resource childResource = resnodes.next();
				if (childResource.getName().startsWith(CONTAINER)) {
					String childPath = childResource.getPath() + COLUMNCONTROL;
					Resource componentResource = resourceResolver.getResource(childPath);
					if (null !=componentResource) {
						getFaqValueMap(componentResource);
					}
				}
			}
			mainEntity.put("@context", "https://schema.org");
			mainEntity.put(TYPE, "FAQPage");
			mainEntity.put("mainEntity", details.toString());
			questionAnswers = mainEntity.toString();
			questionAnswers = questionAnswers.replace("\\\\", "");
			questionAnswers = questionAnswers.replace("\"{\"", "{\"");
			questionAnswers = questionAnswers.replace("\"}\"", "\"}");
			questionAnswers = questionAnswers.replaceAll("<[^>]++>", "");
			questionAnswers = questionAnswers.replace("&nbsp;", "");
		}

	}
	
	private void getTextBody(Resource resource) {		
		int index=0;
		String childPath = resource.getPath() + TAB_ITEM;
		Resource childPathResource = resourceResolver.getResource(childPath);
		if (null != childPathResource) {
			Iterator<Resource> nodes = childPathResource.listChildren();
			while (nodes.hasNext()) {
				Resource childNode = nodes.next();
				if (childNode.getName().contains(TEXT) && index == 1) {
					getTextResource(childNode);									
				}
				index++; 
			}
		}		
	}
	
	private void getTextResource(Resource resource) {
		Resource textResource = resourceResolver.getResource(resource.getPath());
		if (null != textResource) {
			ValueMap textValueMap = textResource.getValueMap();
			if (null != textValueMap) {
				textBody = textValueMap.get(TEXT, null);
				if(null != textBody) {
					textBody = textBody.replaceAll("<[^>]++>", "");
					textBody = textBody.replace("&nbsp;", ""); }
			}
		}			
	}
	 
	
	public String getImageUrl() {
		String articleImage=null;
		String pagePath = currentPage.getPath()+JCR_CONTENT;
		Resource pageResource = resourceResolver.getResource(pagePath);
		if (null != pageResource) {
			ValueMap valueMap = pageResource.getValueMap();
			if (null != valueMap) {
				 articleImage = valueMap.get(ARTICLE_IMAGE, null);
				if (null != articleImage) {
					articleImage = getAssetUrl(articleImage);
					}
				}
			}
		return articleImage;
		}
		
	
	private void getFaqValueMap(Resource resource) {
		if(resource.hasChildren()) {
		for (Resource resourceFAQ : resource.getChildren()) {
			Map<String, String> detailsMap = new LinkedHashMap<>();
			String question = resourceFAQ.getValueMap().get(CQ_PANEL_TITLE, null);
			if (null != question) {
				detailsMap.put(TYPE, "Question");
				detailsMap.put("name", question);
			}
			Map<String, String> answerMap = new LinkedHashMap<>();
			String answer = resourceFAQ.getValueMap().get(TEXT, null);
			if (null != answer) {
				answerMap.put(TYPE, "Answer");
				answerMap.put("text", answer);
				String answerString = answerMap.toString();
				detailsMap.put("acceptedAnswer", answerString);
			}
			details.add(detailsMap);
		}
		}		
	}
	
	protected String setInheritedPageValues(String name, Resource resource) {
		return setInheritedPageValues(name, resource, null);
	}

	private String setInheritedPageValues(String name, Resource resource,
			String defaultValue) {
		InheritanceValueMap inheritedProperties = new HierarchyNodeInheritanceValueMap(
				resource);
		return inheritedProperties.getInherited(name, defaultValue);
	}

	public String getFormattedDate(String dateInString) throws ParseException {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
		SimpleDateFormat output = new SimpleDateFormat("MMM.dd, yyy");
		Date date = new Date();
		try {
                         if(null !=dateInString) {
			date = dateFormat.parse(dateInString);
                            }
		} catch (ParseException e) {
			LOGGER.error("Exception in parsing date{} ", e.getMessage());
		}
		return output.format(date);
	}
	
	public String getAssetUrl(String assetPath) {				
		try {
			URL assetUrl = new URL(slingHttpServletRequest.getRequestURL().toString());
			String finalURLPath  = assetUrl.getProtocol().concat( "://").concat(assetUrl.getHost());
			assetPath = finalURLPath.concat(assetPath);
		} catch (MalformedURLException e) {
			LOGGER.error("Exception in getAssetUrl()", e.getMessage());
		}		
		return assetPath;		
	}
	
}
