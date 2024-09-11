package com.abbott.aem.platform.common.components.models.navigation.impl.v1;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

import lombok.NonNull;
import lombok.experimental.SuperBuilder;
import lombok.extern.slf4j.Slf4j;

import com.abbott.aem.platform.common.components.models.navigation.PlatformNavigationItem;
import com.abbott.aem.platform.common.util.PageUtil;
import com.adobe.cq.wcm.core.components.models.Component;
import com.adobe.cq.wcm.core.components.models.NavigationItem;
import com.adobe.cq.wcm.core.components.models.datalayer.ComponentData;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@SuperBuilder
@Slf4j
public class StaticNavigationItemImpl extends AbstractNavigationItemImpl implements PlatformNavigationItem {

	@NonNull
	private Resource resource;
	
	/**
	 * The Constant LOG.
	 */
	private static final Logger log = LoggerFactory.getLogger(StaticNavigationItemImpl.class);

	@NonNull
	private PageManager pageManager;

	private SlingHttpServletRequest request;

	private Component component;

	private boolean active;

	private int level;

	private boolean internalPage;
	private boolean pageChecked;
	private Page page;
	private String link;

	@Override
	public List<NavigationItem> getChildren() {
		if (!resource.hasChildren()) {
			return Collections.emptyList();
		}

		// Get the top item node this could be secondary / tertiary node
		Resource topResource = resource.getChildren().iterator().next();
		Iterator<Resource> children = topResource.getChildren().iterator();

		List<NavigationItem> items = new ArrayList<>();
		while (children.hasNext()) {
			Resource currentResource = children.next();
			NavigationUtil.addStaticPageItems(pageManager, currentResource, request, component, this, level + 1, items);
		}

		return items;
	}

	@Override
	public String getTitle() {

		String title = this.getPropertyValue(JcrConstants.JCR_TITLE, "");

		if (title.isEmpty() && isInternalPage()) {
			title = page.getNavigationTitle();

			if (title == null) {
				title = page.getPageTitle();
			}
			if (title == null) {
				title = page.getTitle();
			}
			if (title == null) {
				title = page.getName();
			}
		}

		return title;
	}

	@Override
	public boolean isActive() {
		if (this.isInternalPage()) {
			return request.getRequestURI().equals(this.getURL());
		}
		return this.active;
	}

	@Override
	public int getLevel() {
		return this.level;
	}
	@SuppressWarnings("squid:CallToDeprecatedMethod")
	@Override
	public String getURL() {
		if (isInternalPage()) {
			log.debug("getURL {}", page.getPath());
			return PageUtil.getUrl(page.getPath(), resource.getResourceResolver());
		}

		return link;
	}

	@Override
	public String getId() {
		// For first parent
		if (getParent() == null) {
			List<String> parentId = Arrays.asList(component.getId(), Integer.toString(this.getLevel()));
			return StringUtils.join(parentId, ID_SEPARATOR);
		}

		String suffix = StringUtils.substring(DigestUtils.sha256Hex(resource.getPath()), 0, 10);
		List<String> idCombination = Arrays.asList(getParent().getId(), suffix, Integer.toString(this.getLevel()));
		return StringUtils.join(idCombination, ID_SEPARATOR);
	}

	@Override
	public ComponentData getData() {
		return null;
	}

	private String getPropertyValue(String name, String defaultValue) {
		log.debug("getPropertyValue {} - {}", name, this.resource.getValueMap().get(name, defaultValue));

		return this.resource.getValueMap().get(name, defaultValue);
	}

	/**
	 * Checks if its an AEM internal page or not. If so, it assigns the Page
	 * variable and also this gets executed only once.
	 *
	 * @return
	 */
	public boolean isInternalPage() {
		if (pageChecked) {
			return internalPage;
		}

		internalPage = false;
		link = getPropertyValue("link", "");

		page = pageManager.getPage(link);

		if (page != null) {
			internalPage = true;
		}

		pageChecked = true;
		log.debug("isInternalPage ({}): {}", link, internalPage);
		return internalPage;
	}
}
