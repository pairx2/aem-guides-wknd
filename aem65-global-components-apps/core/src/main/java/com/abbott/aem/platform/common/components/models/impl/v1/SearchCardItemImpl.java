package com.abbott.aem.platform.common.components.models.impl.v1;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;

import com.abbott.aem.platform.common.constants.CommonConstants;
import com.abbott.aem.platform.common.components.models.SearchCardItem;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Component;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 * The Class SearchCardItemImpl.
 */
@Data
@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { SearchCardItem.class, ComponentExporter.class },
	   resourceType = { CommonConstants.RESOURCE_TYPE_SEARCH_CARD },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class SearchCardItemImpl implements SearchCardItem {

	
	/**
	 * The component.
	 */
	@Self
	@Delegate(types = Component.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Component component;

	/**
	 * The tag title.
	 */
	@ValueMapValue
	@Getter
	@Setter(AccessLevel.NONE)
	private String tagTitle;

	/**
	 * The field name.
	 */
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String fieldName;

	/**
	 * The tag.
	 */
	@ValueMapValue
	@Getter
	@Setter(AccessLevel.NONE)
	private String tag;

	/**
	 * The card image ref.
	 */
	@ValueMapValue
	@Getter
	@Setter(AccessLevel.NONE)
	private String fileReference;

	/**
	 * The resource resolver.
	 */
	@Inject
	private ResourceResolver resourceResolver;

	/**
	 * The current tag.
	 */
	private Tag currentTag;

	/**
	 * Inits the.
	 */
	@PostConstruct
	public void init() {
		TagManager tagManager = resourceResolver.adaptTo(TagManager.class);
		if (StringUtils.isNotEmpty(tag)) {
			currentTag = tagManager.resolve(tag);
		}
	}

	/**
	 * Gets the resolved tag title.
	 *
	 * @return the resolved tag title
	 */
	@Override
	public String getResolvedTagTitle() {
		return null != currentTag ? currentTag.getTitle() : StringUtils.EMPTY;
	}

	/**
	 * Gets the parent tag title.
	 *
	 * @return the parent tag title
	 */
	@Override
	public String getParentTagTitle() {
		return null != currentTag ? currentTag.getParent().getTitle() : StringUtils.EMPTY;

	}
}