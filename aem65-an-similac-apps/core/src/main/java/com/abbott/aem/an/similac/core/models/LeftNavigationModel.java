package com.abbott.aem.an.similac.core.models;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.ExporterOption;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.abbott.aem.an.similac.core.beans.LeftNavigationBean;
import com.abbott.aem.an.similac.core.beans.LeftNavigationBean.RecentOrder;
import com.abbott.aem.an.similac.core.beans.MenuBean;
import com.google.gson.GsonBuilder;

/**
 * @author SURAPJX
 * 
 *         This Sling model is for left navigation component.It gets the data
 *         and returns the json.
 */
@Model(adaptables = { Resource.class, SlingHttpServletRequest.class }, resourceType = {
		"an/similac/components/content/leftnavigation" }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = "jackson", extensions = "json", options = {
		@ExporterOption(name = "SerializationFeature.WRITE_DATES_AS_TIMESTAMPS", value = "true") })
public class LeftNavigationModel {

	private static final Logger LOGGER = LoggerFactory.getLogger(LeftNavigationModel.class);

	private static final String NAME = "name";

	private static final String HIDDEN_LIST_KEY = "hiddenListKey";

	private static final String URL_LIST_KEY = "urlListKey";
	
	private static final String MOBILE_ONLY_GROUP_NAME = "mobileOnlyGroupName";
	
	private static final String TITLE = "title";
	
	private static final String BUTTON = "btn";

	@SlingObject
	private Resource resource;

	@Inject
	@Named("leftNavLinks")
	@ChildResource
	public Resource menu;

	private LeftNavigationBean leftNavigationBean;
		

	private String leftNavJson;

	List<MenuBean> menuList = new ArrayList<>();

	@PostConstruct
	protected void init() {

		generateLeftNavProperties();

	}

	/**
	 * This method populates the leftnavigation object
	 */
	private void generateLeftNavProperties() {

		try {
			ValueMap leftNavProperties = resource.adaptTo(ValueMap.class);
			leftNavigationBean = new LeftNavigationBean();
			RecentOrder recentOrder = leftNavigationBean.new RecentOrder();
			generateMenuList();
			leftNavigationBean.setMenuList(menuList);
			if (leftNavProperties == null) {
				return;
			}
			leftNavigationBean.setName(leftNavProperties.get(NAME, String.class));
			leftNavigationBean.setHiddenListKey(leftNavProperties.get(HIDDEN_LIST_KEY, String.class));
			leftNavigationBean.setUrlListKey(leftNavProperties.get(URL_LIST_KEY, String.class));
			leftNavigationBean.setMobileOnlyGroupName(leftNavProperties.get(MOBILE_ONLY_GROUP_NAME, String.class));
			recentOrder.setTitle(leftNavProperties.get(TITLE, String.class));
			recentOrder.setBtn(leftNavProperties.get(BUTTON, String.class));
			leftNavigationBean.setRecentOrder(recentOrder);
			leftNavJson = new GsonBuilder().create().toJson(leftNavigationBean);
 
		}

		catch (RuntimeException e) {
			LOGGER.error("Exception in generateLeftNavProperties ::",e);
		}

	}

	/**
	 * This method returns the list from Menu Beans
	 */
	private void generateMenuList() {

		try {
			for (Resource childResource : menu.getChildren()) {
				MenuModel menuModel = childResource.adaptTo(MenuModel.class);
				if (menuModel != null) {
					MenuBean menuBean = menuModel.getMenuBean();
					menuList.add(menuBean);
				}
			}
		}

		catch (RuntimeException e) {
			LOGGER.error("Exception in generateMenuList ::",e);
		}

	}

	public LeftNavigationBean getLeftNavigationBean() {
		return leftNavigationBean;
	}

	public String getLeftNavJson() {
		return leftNavJson;
	}

}
