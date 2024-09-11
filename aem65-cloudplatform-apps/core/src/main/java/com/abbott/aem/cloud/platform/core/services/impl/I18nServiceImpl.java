package com.abbott.aem.cloud.platform.core.services.impl;

import java.util.HashMap;
import java.util.IllformedLocaleException;
import java.util.Iterator;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

import com.abbott.aem.cloud.platform.core.services.I18nService;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.Page;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component(service = I18nService.class , immediate = true)
@Designate(ocd = I18nServiceImpl.Configuration.class)
public class I18nServiceImpl implements I18nService {

	@SuppressWarnings("squid:S1075")
	// Refactor your code to get this URI from a customizable parameter.
	private static final String DEFAULT_I18N_ROOT_PATH = "/content/cq:tags/i18n";
	private static final String DEFAULT_GLOBAL_FOLDER_NAME = "global";
	private static final String FORWARD_SLASH = "/";

	private static final String PATH = "path";
	private static final String KEY = "key";
	private static final String VALUE = "value";
	private static final String LOCALIZED_VALUES = "localizedValues";

	private String i18nRootPath;
	private String i18nGlobalPath;

	@Activate
	protected void activate(Configuration config) {
		this.i18nRootPath = StringUtils.trim(config.i18n_root_path());
		this.i18nRootPath = StringUtils.appendIfMissing(this.i18nRootPath, FORWARD_SLASH);

		this.i18nGlobalPath = this.i18nRootPath.concat(StringUtils.trim(config.global_folder_name()));
		this.i18nGlobalPath = StringUtils.appendIfMissing(this.i18nGlobalPath, FORWARD_SLASH);

		log.info("Activating I18N Service - i18n root path ({}); global path ({})", this.i18nRootPath,
				this.i18nGlobalPath);
	}

	public JsonArray getTagsJson(final String sitename, final String language, final ResourceResolver resolver) {
		final Map<String, Tag> tags = this.getTags(resolver, sitename);
		final JsonArray tagJson = new JsonArray();

		Locale locale = this.getLocale(language, null);
		for (Map.Entry<String, Tag> tag : tags.entrySet()) {
			tagJson.add(this.generateTagJson(tag.getValue(), locale));
		}

		return tagJson;
	}

	public Tag getTag(final String sitename, final String tagKey, final ResourceResolver resolver) {
		String tagPath = StringUtils.EMPTY;
		final TagManager tagManager = resolver.adaptTo(TagManager.class);
		Tag tag = null;

		if (Objects.nonNull(sitename) && Objects.nonNull(tagManager)) {
			tagPath = constructPath(this.i18nRootPath.concat(sitename), tagKey);
			tag = tagManager.resolve(tagPath);
		}

		// Tag can be null on two conditions
		// 1. If site name/application id is not passed or incorrect
		// 2. If the tag is not present at application level,
		// and needs to be fetched from global.
		if (Objects.isNull(tag) && Objects.nonNull(tagManager)) {
			tagPath = constructPath(this.i18nGlobalPath, tagKey);
			tag = tagManager.resolve(tagPath);
		}

		log.debug("Tag Path: {}, Tag: {}", tagPath, tag);
		return tag;
	}

	public Locale getLocale(final String language, final Page page) {
		Locale locale = null;
		if (StringUtils.isNotBlank(language)) {
			try {
				locale = new Locale.Builder().setLanguageTag(language).build();
			} catch (IllformedLocaleException e) {
				log.warn("Language ({}) is incorrect.", language);
			}
		}

		if (locale == null && page != null) {
			log.debug("Fetching the locale from the page:{}", page.getPath());
			locale = page.getLanguage(false);
		}

		return locale;
	}

	public Map<String, Tag> getTags(final ResourceResolver resolver, final String sitename) {
		Map<String, Tag> tags = new HashMap<>();

		// If application id is null this will fetch global tag path
		final Tag tag = this.getTag(sitename, null, resolver);

		if (null != tag) {
			final Iterator<Tag> subTags = tag.listAllSubTags();
			while (subTags.hasNext()) {
				final Tag subTag = subTags.next();
				tags.put(subTag.getName(), subTag);
			}
		}

		// If site name is null then the tags fetched is global tag, hence return.
		// NOTE: Recursive method break
		if (sitename == null || sitename.isEmpty()) {
			return tags;
		}

		// Otherwise, the above fetched tags are application tags and now we need to
		// fetch global tags
		// NOTE: This is a recursive call.
		Map<String, Tag> globalTags = getTags(resolver, null);

		// Override the global tags with application tags
		globalTags.putAll(tags);
		return globalTags;
	}

	/**
	 * 
	 * @param basePath - Base path
	 * @param key      - key to be suffixed
	 * @return - Returns the rootPath if the key is empty or null, otherwise key is
	 *         suffixed with the rootPath.
	 */
	private String constructPath(final String basePath, final String key) {
		if (key == null || key.isEmpty()) {
			return basePath;
		}

		return StringUtils.appendIfMissing(basePath, FORWARD_SLASH).concat(key);
	}

	/**
	 * 
	 * @param tag    - Tag object
	 * @param locale - Optional argument to fetch the tag value only for a specific
	 *               locale.
	 * @return Returns the JSON Object for the tag. If Locale is null, then it
	 *         returns all the localized values for the tag.
	 */
	private JsonObject generateTagJson(final Tag tag, final Locale locale) {
		final Gson gson = new Gson();
		final JsonObject tagData = new JsonObject();
		tagData.addProperty(PATH, tag.getPath());
		tagData.addProperty(KEY, tag.getName());

		if (locale == null) {
			tagData.addProperty(VALUE, tag.getTitle());
			if (!tag.getLocalizedTitles().isEmpty()) {
				tagData.add(LOCALIZED_VALUES, gson.toJsonTree(tag.getLocalizedTitles()).getAsJsonObject());
			}
		} else {
			tagData.addProperty(VALUE, tag.getTitle(locale));
		}

		return tagData;
	}

	@ObjectClassDefinition(name = "I18N Service Configuration")
	public @interface Configuration {

		@AttributeDefinition(name = "I18N root path",
				description = "Defaults to /content/cq:tags/i18n",
				type = AttributeType.STRING)
		String i18n_root_path() default DEFAULT_I18N_ROOT_PATH;

		@AttributeDefinition(name = "Global folder name",
				description = "Defaults to global",
				type = AttributeType.STRING)
		String global_folder_name() default DEFAULT_GLOBAL_FOLDER_NAME;
	}
}
