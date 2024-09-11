package com.abbott.aem.platform.common.components.models.impl.v1;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import com.abbott.aem.platform.common.components.models.GenericList;

import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;

@EqualsAndHashCode
@ToString
@Slf4j
@Model(adaptables = { SlingHttpServletRequest.class, Resource.class },
		adapters = { GenericList.class },
		defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
		resourceType = GenericListImpl.RESOURCE_TYPE)
public class GenericListImpl implements GenericList {

	public static final String RESOURCE_TYPE = "abbott-platform/components/core/genericlist";

	static final String PN_TEXT = "text";
	static final String PN_VALUE = "value";

	public static final class ItemImpl implements Item {

		private final String text;
		private final String value;
		private final ValueMap props;

		public ItemImpl(String t, String v, ValueMap props) {
			this.text = t;
			this.value = v;
			this.props = props;
		}

		@Override
		public String getText() {
			return text;
		}

		@Override
		public String getText(Locale locale) {
			// no locale - return default text
			if (locale == null) {
				return getText();
			}

			// no language - return default text
			String language = locale.getLanguage();
			if (language.length() == 0) {
				return getText();
			}

			String localizedText = null;

			// try property name like text.de_ch
			if (locale.getCountry().length() > 0) {
				localizedText = getLocalizedText(locale);
			}
			// then just text.de
			if (localizedText == null) {
				localizedText = getLocalizedText(new Locale(language));
			}
			if (localizedText == null) {
				return getText();
			} else {
				return localizedText;
			}
		}

		private String getLocalizedText(Locale locale) {
			return props.get(PN_TEXT + "." + locale.toString().toLowerCase(), String.class);
		}

		@Override
		public String getValue() {
			return value;
		}
	}

	private final List<Item> items;

	private final Map<String, Item> valueMapping;

	public GenericListImpl(Resource dataSource) {
		log.trace("Entered the Generic List Impl");
		List<Item> tempItems = new ArrayList<>();
		Map<String, Item> tempValueMapping = new HashMap<>();

		Iterator<Resource> children = dataSource.listChildren();
		while (children.hasNext()) {
			Resource res = children.next();
			ValueMap map = res.getValueMap();
			String text = map.get(PN_TEXT, String.class);
			String value = map.get(PN_VALUE, String.class);
			if (text != null && value != null) {
				ItemImpl item = new ItemImpl(text, value, map);
				tempItems.add(item);
				tempValueMapping.put(value, item);
			}
		}
		items = Collections.unmodifiableList(tempItems);
		valueMapping = Collections.unmodifiableMap(tempValueMapping);
	}

	public List<Item> getItems() {
		return items;
	}

	public String lookupText(String value) {
		Item item = valueMapping.get(value);
		if (item != null) {
			return item.getText();
		} else {
			return null;
		}
	}

	@Override
	public String lookupText(String value, Locale locale) {
		Item item = valueMapping.get(value);
		if (item != null) {
			return item.getText(locale);
		} else {
			return null;
		}
	}
}
