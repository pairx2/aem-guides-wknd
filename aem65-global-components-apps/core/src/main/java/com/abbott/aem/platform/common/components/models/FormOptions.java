package com.abbott.aem.platform.common.components.models;

import java.util.List;
import java.util.Map;

import com.adobe.cq.wcm.core.components.models.form.Options;

import org.apache.sling.api.resource.Resource;
import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface FormOptions extends Options {

	default String getParentValue() {
		throw new UnsupportedOperationException();
	}

	default List<Resource> getItemResources() {
		throw new UnsupportedOperationException();
	}

	default String getSourceString() {
		throw new UnsupportedOperationException();
	}

	default String getOptionAlignStyle() {
		throw new UnsupportedOperationException();
	}

	default String getDropdownStyle() {
		throw new UnsupportedOperationException();
	}

	default String getFormOptionsIsRequired() {
		throw new UnsupportedOperationException();
	}

	default String getDisableDropdown() {
		throw new UnsupportedOperationException();
	}

	default String getEnableTooltip() {
		throw new UnsupportedOperationException();
	}

	default String getLookupServiceEndpoint() {
		throw new UnsupportedOperationException();
	}

	default String getDropdownPlaceholder() {
		throw new UnsupportedOperationException();
	}

	default List<CustomOptionItem> getOptionItems() {
		throw new UnsupportedOperationException();
	}

	default Map<String, String> getDropDownMap() {
		throw new UnsupportedOperationException();
	}

	default List<CustomOptionItem> getCustomItems() {
		throw new UnsupportedOperationException();
	}

	default String getRequiredMessage() {
		throw new UnsupportedOperationException();
	}
}
