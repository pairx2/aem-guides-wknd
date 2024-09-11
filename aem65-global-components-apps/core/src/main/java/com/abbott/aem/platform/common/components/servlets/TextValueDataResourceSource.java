package com.abbott.aem.platform.common.components.servlets;

import java.util.HashMap;

import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.SyntheticResource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.wrappers.ValueMapDecorator;

public abstract class TextValueDataResourceSource extends SyntheticResource {
	public static final String PN_VALUE = "value";
	public static final String PN_TEXT = "text";
	protected static final String PN_SELECTED = "selected";

	private ValueMap valueMap;

	protected TextValueDataResourceSource(ResourceResolver resourceResolver, String path, String resourceType) {
		super(resourceResolver, path, resourceType);
	}

	@Override
	@SuppressWarnings("unchecked")
	public <T> T adaptTo(Class<T> type) {
		if (type == ValueMap.class) {
			if (valueMap == null) {
				initValueMap();
			}
			return (T) valueMap;
		} else {
			return super.adaptTo(type);
		}
	}

	private void initValueMap() {
		valueMap = new ValueMapDecorator(new HashMap<String, Object>());
		valueMap.put(PN_VALUE, getValue());
		valueMap.put(PN_TEXT, getText());
		valueMap.put(PN_SELECTED, getSelected());
	}

	public abstract String getText();

	public abstract String getValue();

	protected boolean getSelected() {
		return false;
	}
}
