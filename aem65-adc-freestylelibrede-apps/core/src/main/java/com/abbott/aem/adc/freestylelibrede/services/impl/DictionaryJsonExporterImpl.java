package com.abbott.aem.adc.freestylelibrede.services.impl;

import com.abbott.aem.adc.freestylelibrede.services.DictionaryJsonExporter;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.google.gson.JsonObject;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Iterator;
import java.util.Locale;
import java.util.Map;


@Component(service = DictionaryJsonExporter.class)
@Designate(ocd = DictionaryJsonExporterImpl.Configuration.class)
public class DictionaryJsonExporterImpl implements DictionaryJsonExporter {

	private String i18nRootPath;

	@Activate
	public void init(DictionaryJsonExporterImpl.Configuration configuration) {
		i18nRootPath = configuration.i18n_tags_root_path();

	}

	@Override
	public byte[] createJson(SlingHttpServletRequest slingHttpServletRequest, Locale locale) throws IOException {
		JsonObject jsonObject = new JsonObject();
		TagManager tagManager = slingHttpServletRequest.getResourceResolver().adaptTo(TagManager.class);
		if(StringUtils.isNotEmpty(i18nRootPath)){
			Tag rootTag = tagManager.resolve(i18nRootPath);
			Iterator<Tag> tagIterator = rootTag.listChildren();
			while(tagIterator.hasNext()){
				Tag tag =  tagIterator.next();
				Map<Locale,String> localizedTitleMap =  tag.getLocalizedTitles();
				 String localizedTitle = localizedTitleMap.get(locale);
				jsonObject.addProperty(tag.getName(),localizedTitle!=null?localizedTitle:tag.getTitle());
			}
		}
		return jsonObject.toString().getBytes(StandardCharsets.UTF_8);
	}
	@ObjectClassDefinition(name = "ADC Freestyle Libre DE - I18n Root Path")
	protected static @interface Configuration {
		@AttributeDefinition(
				name = "I18n Tags Root Path"
		)
		String i18n_tags_root_path() default "/content/cq:tags/i18n/freestylelibre";
	}

}
