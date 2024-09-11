package com.abbott.aem.platform.common.components.models.impl.v1;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.inject.Named;

import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpException;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.platform.common.components.models.CustomOptionItem;
import com.abbott.aem.platform.common.components.models.FormOptions;
import com.abbott.aem.platform.common.components.services.APILookupService;
import com.abbott.aem.platform.common.components.services.HttpMethod;
import com.abbott.aem.platform.common.util.ConvertToDropdown;
import com.abbott.aem.platform.common.util.ConvertToDropdownImpl;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.form.Options;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;

@Data
@EqualsAndHashCode(callSuper = false)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
@Model(adaptables = { SlingHttpServletRequest.class, Resource.class },
	   adapters = FormOptions.class,
	   resourceType = { FormOptionsImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class FormOptionsImpl extends ComponentProxyImpl implements FormOptions {

	public static final String RESOURCE_TYPE = "abbott-platform/components/form/options/v1/options";
	private static final Logger LOGGER = LoggerFactory.getLogger(FormOptionsImpl.class);
	private static final String OPTION_ITEMS_PATH = "items";
	private static final String SOURCE_AS_FIXED = "local";
	private static final String SOURCE_AS_LOOKUP_SERVICE = "lookupService";
	@Self
	@Via(type = ResourceSuperType.class)
	@Delegate(types = Options.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Options options;

	@ValueMapValue
	private String parentValue;

	@ChildResource(injectionStrategy = InjectionStrategy.OPTIONAL)
	@Named(OPTION_ITEMS_PATH)
	private List<Resource> itemResources;

	@ValueMapValue(name = "source")
	@Setter(AccessLevel.NONE)
	private String sourceString;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Default(values = "horizontal")
	private String optionAlignStyle;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String dropdownStyle;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String formOptionsIsRequired;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String requiredMessage;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String formOptionsSelectAll;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String formOptionsGroup;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String formOptionsGroupName;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String disableDropdown;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String enableTooltip;

	@ScriptVariable
	private Resource resource;

	@ScriptVariable
	private SlingHttpServletResponse response;

	@ScriptVariable
	private ResourceResolver resolver;

	@ValueMapValue(name = "lookupService")
	private String lookupServiceEndpoint;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String dropdownPlaceholder;

	@Self
	private SlingHttpServletRequest request;

	private List<CustomOptionItem> optionItems = new ArrayList<>();

	@OSGiService
	private APILookupService apiLookupService;

	@Getter
	@Setter
	private Map<String, String> dropDownMap = new HashMap<>();

	@Override
	public List<CustomOptionItem> getCustomItems() {
		if (optionItems.isEmpty() && StringUtils.equalsIgnoreCase(sourceString, SOURCE_AS_FIXED)) {
			populateOptionItemsFromFixedValues();
		}
		return Collections.unmodifiableList(optionItems);
	}

	private void populateOptionItemsFromFixedValues() {
		if (itemResources != null) {
			optionItems = new ArrayList<>();
			for (Resource itemResource : itemResources) {
				CustomOptionItem optionItem = new CustomOptionItemsImpl(itemResource);
				optionItems.add(optionItem);
			}
		}
	}

	@PostConstruct
	public void init() throws HttpException {
		try {
			if (itemResources != null) {
				populateOptionItemsFromFixedValues();
			}
			Page currentPage = request.getResourceResolver().adaptTo(PageManager.class).getContainingPage(resource);
			if (StringUtils.equalsIgnoreCase(sourceString, SOURCE_AS_LOOKUP_SERVICE)) {
				LOGGER.debug("endpoint url is:{}", lookupServiceEndpoint);
				String responseString = apiLookupService.processRequest(currentPage, lookupServiceEndpoint, HttpMethod.POST, null);
				LOGGER.debug("responseString {}", responseString);
				ConvertToDropdown convertTodropdown = new ConvertToDropdownImpl();
				dropDownMap = convertTodropdown.getDropDownList(StringUtils.EMPTY, responseString);
				LOGGER.debug("dropDownMap {}", dropDownMap);
			}
		} catch (IOException e) {
			LOGGER.error("Error from API", e);
		}
	}
}