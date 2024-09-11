package com.abbott.aem.platform.common.components.models.impl.v1;

import lombok.AccessLevel;
import lombok.Getter;

import com.abbott.aem.platform.common.components.models.CustomOptionItem;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;

public class CustomOptionItemsImpl implements CustomOptionItem {

	private static final String PN_TEXT = "text";
	private static final String PN_SELECTED = "selected";
	private static final String PN_DISABLED = "disabled";
	private static final String PN_VALUE = "value";
	private static final String PN_INDETERMINATE = "indeterminate";
	private static final String PN_ERROR = "error";
	private static final String PN_INITIALSTATE = "optionItemtype";
	private static final String PN_DROPDOWNICON = "dropdownicon";
	@Getter(AccessLevel.PUBLIC)
	private ValueMap properties;
	private String initialState;

	public CustomOptionItemsImpl(Resource option) {

		this.properties = option.getValueMap();
		this.initialState = this.properties.get(PN_INITIALSTATE, PN_SELECTED);
	}

	@Override
	public boolean isIndeterminate() {
		return StringUtils.equalsIgnoreCase(initialState, PN_INDETERMINATE);
	}

	@Override
	public boolean isError() {
		return StringUtils.equalsIgnoreCase(initialState, PN_ERROR);
	}

	@Override
	public String getInitialState() {
		return properties.get(PN_INITIALSTATE, PN_SELECTED);
	}

	@Override
	public String getText() {
		return properties.get(PN_TEXT, String.class);
	}

	@Override
	public boolean isSelected() {
		return StringUtils.equalsIgnoreCase(initialState, PN_SELECTED);
	}

	@Override
	public boolean isDisabled() {
		return StringUtils.equalsIgnoreCase(initialState, PN_DISABLED);
	}

	@Override
	public String getValue() {
		return properties.get(PN_VALUE, String.class);
	}

	@Override
	public String getDropdownIcon() {
		return properties.get(PN_DROPDOWNICON, String.class);
	}

	public String getUniqueId() {
		return "options_" + System.nanoTime();
	}
}