package com.abbott.aem.an.similac.core.models;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.ExporterOption;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.an.similac.core.beans.LeftNavigationBean;
import com.abbott.aem.an.similac.core.beans.MenuBean;
import com.google.gson.GsonBuilder;

/**
 * @author Cognizant
 * 
 *         This Sling model is for profile menu navigation component.It gets the data
 *         and returns the json.
 */
@Model(adaptables = { Resource.class,
		SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = "jackson", extensions = "json", options = {
		@ExporterOption(name = "SerializationFeature.WRITE_DATES_AS_TIMESTAMPS", value = "true") })
public class ProfileNavigationModel {

	private static final Logger LOGGER = LoggerFactory.getLogger(ProfileNavigationModel.class);

	private static final String NAME = "name";

	private static final String HIDDEN_LIST_KEY = "hiddenListKey";

	private static final String URL_LIST_KEY = "urlListKey";

	private LeftNavigationBean navigationBean;
	
	private String profileNavJson;
	
	List<MenuBean> menuList = new ArrayList<>();

	@Inject
	SlingHttpServletRequest request;
	
	@Inject
	private String resourcePath;
	
	@PostConstruct
	protected void init() {
		if( resourcePath != null) {
			Resource resource = request.getResourceResolver().getResource(resourcePath);
			if(resource != null) {
				generateProfileNavProperties(resource);
			}
		}
	}
 
	/**
	 * This method populates the navigation object
	 * @param resource 
	 */
	protected void generateProfileNavProperties(Resource resource) {

		try {
			ValueMap leftNavProperties = resource.adaptTo(ValueMap.class);
			navigationBean = new LeftNavigationBean();
			generateMenuList(resource);
			navigationBean.setMenuList(menuList);
			if (leftNavProperties == null) {
				return;
			}
			navigationBean.setName(leftNavProperties.get(NAME, String.class));
			navigationBean.setHiddenListKey(leftNavProperties.get(HIDDEN_LIST_KEY, String.class));
			navigationBean.setUrlListKey(leftNavProperties.get(URL_LIST_KEY, String.class));
			profileNavJson = new GsonBuilder().create().toJson(navigationBean);
		
		} catch (RuntimeException e) {
			LOGGER.error("Exception in generateProfileNavProperties :: {}",e.getMessage());
		}
	}

	/**
	 * This method returns the list from Menu Beans
	 * @param resource 
	 */
	private void generateMenuList(Resource resource) {

		try {
			for (Resource navigationResource : resource.getChildren()) {
				for (Resource childResource : navigationResource.getChildren()) {
					MenuModel menuModel = childResource.adaptTo(MenuModel.class);
					if (menuModel != null) {
						MenuBean menuBean = menuModel.getMenuBean();
						menuList.add(menuBean);
					}
				}
			}
		} catch (RuntimeException e) {
			LOGGER.error("Exception in generateMenuList ::",e);
		}
	}

	/**
	 * This methods return the profile menu navigation json
	 * @return 
	 */
	public String getProfileNavJson() {
		return profileNavJson;
	}

	public LeftNavigationBean getProfileNavigationBean() {
		return navigationBean;
	}

}
