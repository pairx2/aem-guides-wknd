package com.abbott.aem.platform.common.util;

import java.util.Map;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceResolver;

public interface ConvertToDropdown {

	public Map<String,String> getDropDownList(String domain, String responseValue);

	public void constructDataSource(SlingHttpServletRequest request, ResourceResolver resolver,
			Map<String,String> dropDownMap);

}
