package com.abbott.aem.an.abbottstore.models;

import com.abbott.aem.an.abbottstore.services.NutritionDataService;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import lombok.Getter;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.jcr.resource.api.JcrResourceConstants;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Required;
import org.apache.sling.models.annotations.Source;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 *
 * @author saikrishna.s
 * 
 *         Tabs Model
 * 
 *         Tabs Model is the SlingModel to hold the details of individual Tabs
 *         Model.
 * 
 *         Version Number: 1.0
 */
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class TabsModel {

	/** The Constant LOGGER. */
	private static final Logger LOGGER = LoggerFactory.getLogger(TabsModel.class);

	/** The resource. */
	@Self
	private Resource resource;

	/** The resource resolver. */
	@Inject
	@Source("sling-object")
	@Required
	private ResourceResolver resourceResolver;

	/** The nutrition data service. */
	@OSGiService
	private NutritionDataService nutritionDataService;

	/** The tabs visibility flags. */
	@Getter
	private List<Boolean> tabsVisibilityFlags;

	/**
	 * Init method to get values from page and handle properties.
	 */
	@PostConstruct
	protected void init() {
		LOGGER.info("Inside init method of tabs model");
		tabsVisibilityFlags = new ArrayList<>();
		PageManager pageMgr = resourceResolver.adaptTo(PageManager.class);
		if (null != pageMgr) {
			Page currentPage = pageMgr.getContainingPage(resource);
			ValueMap pageProperties = currentPage.getProperties();
			Iterator<Resource> resItr = resource.listChildren();
			while (resItr.hasNext()) {
				Resource childResource = resItr.next();
				ValueMap vm = childResource.getValueMap();
				String slingResource = vm.get(JcrResourceConstants.SLING_RESOURCE_TYPE_PROPERTY, String.class);
				Map<String, List<String>> resourceProps = nutritionDataService.getResourceProperties();

				boolean valueExist = checkPropertyExists(pageProperties, slingResource, resourceProps);
				tabsVisibilityFlags.add(resourceProps.get(slingResource) != null && valueExist);
			}
		}
	}

	/**
	 * This method is used to Check property exists.
	 *
	 * @param pageProperties the page properties
	 * @param slingResource  the sling resource
	 * @param resourceProps  the resource props
	 * @return true, if successful
	 */
	private boolean checkPropertyExists(ValueMap pageProperties, String slingResource,
			Map<String, List<String>> resourceProps) {
		boolean valueExist = false;
		for (Map.Entry<String, List<String>> propertyEntry : resourceProps.entrySet()) {
			if (propertyEntry.getKey().equals(slingResource)) {
				for (String property : propertyEntry.getValue()) {
					if (pageProperties.containsKey(property)) {
						valueExist = true;
						break;
					}
				}
			}
		}
		return valueExist;
	}


}
