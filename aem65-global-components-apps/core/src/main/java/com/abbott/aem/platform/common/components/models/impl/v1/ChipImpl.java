package com.abbott.aem.platform.common.components.models.impl.v1;

import java.util.Locale;

import javax.annotation.PostConstruct;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.abbott.aem.platform.common.components.models.Chip;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.Page;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Setter;

/**
 * The Class Chip Impl.
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class }, adapters = { Chip.class }, resourceType = {
		ChipImpl.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public class ChipImpl implements Chip {
	/**
	 * The Constant RESOURCE_TYPE.
	 */
	protected static final String RESOURCE_TYPE = "abbott-platform/components/content/molecules/chip/v1/chip";

	/**
	 * The tag title.
	 */
	@ValueMapValue
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
	@Setter(AccessLevel.NONE)
	private String tag;

	/**
	 * The resource resolver.
	 */
	@SlingObject
	private ResourceResolver resourceResolver;

	/**
	 * The current tag.
	 */
	private Tag currentTag;

	/**
	 * The current page.
	 */

	@ScriptVariable
	Page currentPage;

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
		TagManager tagManager = resourceResolver.adaptTo(TagManager.class);
		if (StringUtils.isNotEmpty(tag)) {
			currentTag = tagManager.resolve(tag);
			if(currentPage!=null && currentTag !=null) { 
				Locale pageLocale = currentPage.getLanguage(false);
				return StringUtils.isNotEmpty(currentTag.getLocalizedTitle(pageLocale)) ? currentTag.getLocalizedTitle(pageLocale)
						: currentTag.getTitle();
				}
				if(currentPage==null && currentTag !=null){
					return currentTag.getTitle();	
				}
		}
				return StringUtils.EMPTY;
	}
	
	/**
	 * Gets the resolved tag parent title.
	 *
	 * @return the resolved tag parent title
	 */
	@Override
	public String getResolvedTagParentTitle() {
		return null != currentTag ? currentTag.getParent().getTitle() : StringUtils.EMPTY;
	}

	@Override
	public String getTagTitle() {
		if(this.tagTitle!=null) {
			return this.tagTitle;
		}
		return StringUtils.EMPTY;
	}

	@Override
	public String getFieldName() {
		if(this.fieldName!=null) {
			return this.fieldName;
		}
		return StringUtils.EMPTY;
	}

	/**
	 * Gets the resolved tag title without locale.
	 *
	 * @return the resolved tag title without locale
	 */
	@Override
	public String getResolvedTagTitleWithoutLocale() {
		TagManager tagManager = resourceResolver.adaptTo(TagManager.class);
		if (StringUtils.isNotEmpty(tag)) {
			currentTag = tagManager.resolve(tag);
			if(currentTag !=null) { 		
				return currentTag.getTitle();	
			}
		}
		return StringUtils.EMPTY;
	}

	@Override
	public String getResolvedTagName() {
		TagManager tagManager = resourceResolver.adaptTo(TagManager.class);
		if (StringUtils.isNotEmpty(tag)) {
			currentTag = tagManager.resolve(tag);
			if(currentTag !=null) { 		
				return currentTag.getName();	
			}
		}
		return StringUtils.EMPTY;
	}

	
}
