package com.abbott.aem.an.similac.core.models;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.abbott.aem.an.similac.core.beans.MenuBean;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;


/**
 * @author SURAPJX Sling model for left navigation component.
 *
 */
@Model(adaptables = { Resource.class,
		SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class MenuModel {

	private static final String EXTRA_PATTERN_CHECK = "extraPatternCheck";

	private static final String LABEL_VALUE = "label";
	
	private static final String GTM_LABEL = "gtmLabel";

	private static final String AEM_URL = "aemURL";

	private static final String MAGENTO_URL = "magURL";

	private static final String HIDE_IN_VALUE = "hideInValue";

	private static final String COOKIE_KEY = "cookieKey";
	
	private static final String MAGENTO_GROUP_NAME = "magentoGroupName";

	@SlingObject
	private ResourceResolver resourceResolver;

	@ValueMapValue
	private String label;

	@ValueMapValue
	private String aemURL;

	@ValueMapValue
	private String magURL;

	@ValueMapValue
	private String cookieKey;

	@ValueMapValue
	private String hideInValue;
	
	@ValueMapValue
	private String magentoGroupName;
	
	@ValueMapValue
	private String extraPatternCheck;
	
	@ValueMapValue
	private String gtmLabel;

	@Inject
	private List<Resource> childLinks;

	@SlingObject
	private Resource resource;

	private MenuBean menuBean;

	private LinkHelperModel linkHelper;

	private List<MenuBean> childMenuList = new ArrayList<>();

	@PostConstruct
	protected void init() {
		populateMenuObject();
		populateChildLinks();
	}

	/**
	 * This method will populate the Menu object
	 */
	public void populateMenuObject() {

		menuBean = new MenuBean();
		menuBean.setLabel(label);
		menuBean.setAemURL(aemURL);
		menuBean.setCookieKey(cookieKey);
		menuBean.setMagURL(magURL);
		menuBean.setHideInGroup(hideInValue);
		menuBean.setMagentoGroupName(magentoGroupName);
	}

	/**
	 * This method iterates through the menuResource and returns child menu list
	 */
	public void populateChildLinks() {

		if (childLinks != null) {
			for (Resource menuResource : childLinks) {
				ValueMap subMenu = menuResource.getValueMap();
				linkHelper = menuResource.adaptTo(LinkHelperModel.class);
				MenuBean subMenuBean = new MenuBean();
				subMenuBean.setCookieKey(subMenu.get(COOKIE_KEY, String.class));
				String labelVal = subMenu.get(LABEL_VALUE, String.class);
				String analyticsLabel = subMenu.get(GTM_LABEL, String.class);
				String aemUrl = subMenu.get(AEM_URL, String.class);
				String magentoUrl = subMenu.get(MAGENTO_URL, String.class);
				String hideInVal = subMenu.get(HIDE_IN_VALUE, String.class);
				String extraPatternCheckSubMenu = subMenu.get(EXTRA_PATTERN_CHECK, String.class);
				subMenuBean.setMagentoGroupName(subMenu.get(MAGENTO_GROUP_NAME, String.class));
				
				subMenuBean.setLabel(labelVal);
                subMenuBean.setDataGtmLabel(analyticsLabel);
				if (labelVal != null) {
					
					subMenuBean.setAemURL(getDomainURL(aemUrl));
					subMenuBean.setMagURL(getDomainURL(magentoUrl));
				}
				else {
					subMenuBean.setAemURL(populateMenuFields(aemUrl,subMenuBean));
					subMenuBean.setMagURL(populateMenuFields(magentoUrl,subMenuBean));
					
				}
				subMenuBean.setExtraPatternCheck(extraPatternCheckSubMenu);
				subMenuBean.setHideInGroup(hideInVal);
				childMenuList.add(subMenuBean);
			}
			menuBean.setChildren(childMenuList);

		}
	}

	/**
	 * @param linkPageUrl
	 * @return this method returns the domainUrl
	 */
	private String getDomainURL(String linkPageUrl) {
		String domainUrl = null;
		if (linkPageUrl != null) {
			linkHelper.setLinkHref(linkPageUrl);
			domainUrl = linkHelper.getLinkHrefDomain();
			if (domainUrl != null) {
				return domainUrl;
			}
		}
		return linkPageUrl;

	}
	
	/**
	 * @param linkPageUrl
	 * @param subMenuBean
	 * @param subMenu
	 * @return This method populates the submenubean from valuemap
	 */
	public String populateMenuFields(String linkPageUrl, MenuBean subMenuBean) {
        
		String domainUrl = null;
		if (linkPageUrl != null) {
			Resource currentPageResource = resourceResolver.getResource(linkPageUrl);
			if (currentPageResource != null) {
				Page page = resourceResolver.adaptTo(PageManager.class).getContainingPage(currentPageResource);
				if (page != null && page.getTitle() != null) {
					subMenuBean.setLabel(page.getTitle());
					linkHelper.setLinkHref(linkPageUrl);										
					  domainUrl = linkHelper.getLinkHrefDomain();
					  if(domainUrl!=null) {
					  return domainUrl;
					  }				
				}

			}
		}
		return linkPageUrl;	
		
	}
	
	public MenuBean getMenuBean() {
		return menuBean;
	}

	public void setMenuBean(MenuBean menuBean) {
		this.menuBean = menuBean;
	}

}
