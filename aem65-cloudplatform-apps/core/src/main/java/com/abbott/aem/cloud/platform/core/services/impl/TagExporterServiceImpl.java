package com.abbott.aem.cloud.platform.core.services.impl;

import java.util.HashMap;
import java.util.IllformedLocaleException;
import java.util.Iterator;
import java.util.Locale;
import java.util.Map;

import org.apache.commons.lang3.LocaleUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.metatype.annotations.Designate;

import com.abbott.aem.cloud.platform.core.config.TagExporterServletConfig;
import com.abbott.aem.cloud.platform.core.services.TagExporterService;
import com.day.cq.commons.LanguageUtil;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component(service = TagExporterService.class, immediate = true)
@Designate(ocd = TagExporterServletConfig.class)
public class TagExporterServiceImpl implements TagExporterService {

	/**
	 * The constant for tag path
	 */
	private static final String PATH = "path";

	/**
	 * The constant for tag key
	 */
	private static final String KEY = "key";

	/**
	 * The constant for tag value
	 */
	private static final String VALUE = "value";

	/**
	 * The constant for tag localized values
	 */
	private static final String LOCALIZED_VALUES = "localizedValues";

	/**
	 * The constant for iI8N
	 */
	private static final String I18N = "i18n";

	/**
	 * The constant for FORWARD SLASH SEPARATOR
	 */
	private static final char FORWARD_SLASH = '/';

	/**
	 * The config.
	 */
	protected TagExporterServletConfig config;

	/**
	 * The tag root path.
	 */
	private String tagsRootPath;

	/**
	 * The global folder name.
	 */
	private String globalFolderName;

	/**
	 * Configure.
	 *
	 * @param config the config
	 */
	@Activate
	@Modified
	protected void configure(TagExporterServletConfig config) {
		this.config = config;
		this.tagsRootPath = StringUtils.trim(config.getTagsRootPath());
		this.globalFolderName = StringUtils.trim(config.getGlobalFolderName());
	}

	public String getTagPath(String requestPath, String requestSelectorString) {
		if (requestPath.startsWith(tagsRootPath)) {
			return requestPath;
		} else if (requestPath.contains(requestSelectorString)) {
			return new StringBuilder(tagsRootPath)
					.append(requestPath.substring(0, requestPath.indexOf(requestSelectorString) - 1)).toString();
		} else {
			return new StringBuilder(tagsRootPath).append(requestPath).toString();
		}
	}

	public JsonArray getAllTags(final String tagPath, final String[] requestSelectors,
			final ResourceResolver resourceResolver) {
		final TagManager tagManager = resourceResolver.adaptTo(TagManager.class);
		final Tag tag = tagManager.resolve(tagPath);
		Map<String, Tag> applicationTags = getApplicationMap(resourceResolver, tag);
		final JsonArray tagJson = new JsonArray();
		String language = getLanguageFromRequest(requestSelectors);
		for (Map.Entry<String, Tag> applicationTag : applicationTags.entrySet()) {
			tagJson.add(generateTagJson(applicationTag.getValue(), language));
		}
		return tagJson;
	}

	private Map<String, Tag> getGlobalMap(final ResourceResolver resourceResolver) {
		Map<String, Tag> globalKeys = new HashMap<>();
		final TagManager tagManager = resourceResolver.adaptTo(TagManager.class);
		String globalTagPath = new StringBuilder(tagsRootPath).append(FORWARD_SLASH).append(I18N).append(FORWARD_SLASH)
				.append(globalFolderName).toString();
		final Tag tag = tagManager.resolve(globalTagPath);
		if (null != tag) {
			globalKeys.put(tag.getName(), tag);
			final Iterator<Tag> subTags = tag.listAllSubTags();
			while (subTags.hasNext()) {
				final Tag subTag = subTags.next();
				globalKeys.put(subTag.getName(), subTag);
			}
		}
		return globalKeys;
	}

	private Map<String, Tag> getApplicationMap(final ResourceResolver resourceResolver, final Tag tag) {
		Map<String, Tag> applicationKeys = new HashMap<>();
		if (null != tag) {
			applicationKeys.put(tag.getName(), tag);
			final Iterator<Tag> subTags = tag.listAllSubTags();
			while (subTags.hasNext()) {
				final Tag subTag = subTags.next();
				applicationKeys.put(subTag.getName(), subTag);
			}
		}
		Map<String, Tag> globalKeys = getGlobalMap(resourceResolver);
		globalKeys.putAll(applicationKeys);
		return globalKeys;
	}

	private String getLanguageFromRequest(String[] requestSelectors) {
		if (requestSelectors.length > 1 && isValidLocale(requestSelectors[1].toLowerCase())) {
			return requestSelectors[1].toLowerCase();
		}
		return null;
	}

	private boolean isValidLocale(String language) {
		try {
			Locale locale = new Locale.Builder().setLanguageTag(language).build();
			return LocaleUtils.isAvailableLocale(locale);
		} catch (IllformedLocaleException illformedLocaleException) {
			log.warn("Exception in TagExporterServiceImpl :: isValidLocale :: ", illformedLocaleException);
		}
		return false;
	}

	private JsonObject generateTagJson(final Tag tag, String language) {
		final Gson gson = new Gson();
		final JsonObject tagData = new JsonObject();
		tagData.addProperty(PATH, tag.getPath().substring(tagsRootPath.length()));
		tagData.addProperty(KEY, tag.getName());
		if (StringUtils.isBlank(language)) {
			tagData.addProperty(VALUE, tag.getTitle());
			if (!tag.getLocalizedTitles().isEmpty()) {
				tagData.add(LOCALIZED_VALUES, gson.toJsonTree(tag.getLocalizedTitles()).getAsJsonObject());
			}
		} else {
			tagData.addProperty(VALUE, tag.getTitle(LanguageUtil.getLocale(language)));
		}
		return tagData;
	}

}
