package com.abbott.aem.corp.division.core.components.models.impl;

import java.util.Iterator;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.abbott.aem.corp.division.core.components.models.RelatedArticle;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.wcm.api.Page;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class }, adapters = { RelatedArticle.class }, resourceType = {
		RelatedArticleImpl.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class RelatedArticleImpl implements RelatedArticle {

	public static final String RESOURCE_TYPE = "corp/division/component/content/relatedcontent";

	public static final String CONTAINER = "container";

	public static final String IMAGE = "/image";

	public static final String FILE_REFERENCE = "fileReference";

	public static final String ALT = "alt";

	@SlingObject
	private ResourceResolver resourceResolver;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private Boolean enableManualArticleMethod;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private String openInNewTab;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private String relatedLabel;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private String articleType;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private String articleDescription;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private String articlePath;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private String articleImagePath;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private String altText;

	@Override
	public Boolean getEnableManualArticleMethod() {
		return enableManualArticleMethod;
	}

	@Override
	public String getRelatedLabel() {
		return relatedLabel;
	}

	@Override
	public String getArticleType() {
		return articleType;
	}

	@Override
	public String getArticlePath() {
		return articlePath;
	}

	@Override
	public String openInNewTab() {
		return openInNewTab;
	}

	@Override
	public String getArticleDescription() {
		if (Boolean.TRUE.equals(enableManualArticleMethod) && StringUtils.equals("article", articleType)
				&& StringUtils.isNotBlank(articleDescription)) {
			return articleDescription;
		} else {
			return getDescription();
		}
	}

	private String getDescription() {
		if (StringUtils.isNotEmpty(articlePath)) {
			Page pageResource = resourceResolver.getResource(articlePath).adaptTo(Page.class);
			return pageResource.getTitle();
		}
		return StringUtils.EMPTY;
	}

	@Override
	public String getArticleImagePath() {
		if (Boolean.TRUE.equals(enableManualArticleMethod)) {
			return articleImagePath;
		} else {
			return getDynamicValue(FILE_REFERENCE);
		}
	}

	private String getDynamicValue(String ref) {
		Resource pageResource = resourceResolver.getResource(articlePath + "/jcr:content/root");
		if (null != pageResource) {
			Iterator<Resource> resnodes = pageResource.listChildren();
			while (resnodes.hasNext()) {
				Resource child = resnodes.next();
				if (child.getName().contains(CONTAINER)) {
					String childPath = child.getPath() + IMAGE;
					Resource imageResource = resourceResolver.getResource(childPath);
					if (null != imageResource) {
						ValueMap imageData = imageResource.getValueMap();
						return imageData.get(ref, StringUtils.EMPTY);
					}
				}
			}
		}
		return StringUtils.EMPTY;
	}

	@Override
	public String getAltText() {
		if (Boolean.TRUE.equals(enableManualArticleMethod)) {
			return altText;
		} else {
			return getDynamicValue(ALT);
		}
	}

}
