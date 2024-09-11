package com.abbott.aem.cloud.platform.core.redirects.models;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;
import javax.jcr.query.Query;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.featureflags.Features;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;

import com.abbott.aem.cloud.platform.core.redirects.UrlRedirectFeature;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.wcm.api.NameConstants;
import com.google.common.collect.Lists;

import lombok.NonNull;

/*
 * Model for paginated output for Redirect Rules
 */
@Model(adaptables = SlingHttpServletRequest.class)
public class Rules  {
	
	@SlingObject
	private SlingHttpServletRequest request;
	
	@OSGiService
	private Features features;

	private static final int PAGE_SIZE = 100;
	private int pageNumber = 1;
	private List<List<Resource>> pages;
	
	private String state;
	private String version;
	private String title;
	private String user;

	private boolean saveButton;
	private boolean applyButton;
	private boolean promoteButton;
	
	
	@PostConstruct
	protected void init() {
		String page = request.getParameter("page");
		String searchQuery = request.getParameter("q");

		if (page != null) {
			pageNumber = Integer.parseInt(page);
		}
		Resource configResource = request.getRequestPathInfo().getSuffixResource();
		Resource mappingsResource = configResource.getChild("jcr:content/mappings");
		getDynamicProperties(configResource);
		if (StringUtils.isNoneBlank(state)) {
			this.saveButton = ButtonStates.valueOf(state).disableSaveButton();
			this.applyButton = ButtonStates.valueOf(state).disableApplyButton();
			this.promoteButton = ButtonStates.valueOf(state).disablePromoteButton();
		}
		List<Resource> all = new ArrayList<>();

		if (mappingsResource != null) {
			if(StringUtils.isNotBlank(searchQuery)) {
				String query = "SELECT * FROM [nt:unstructured] AS node "
						+ "WHERE ISDESCENDANTNODE(node, '" + mappingsResource.getPath() + "') AND "
						+ "node.[*] like '%" + searchQuery +"%'";
				
				Iterator<Resource> children = request.getResourceResolver().findResources(query, Query.JCR_SQL2);
				Map<String, Resource> uniqueList = new HashMap<>();
				children.forEachRemaining(res -> {
					Resource tempResource = getRuleNode(res);
					if(!uniqueList.containsKey(tempResource.getPath())) {
						uniqueList.put(tempResource.getPath(), tempResource);
					}
				});
				
				all = uniqueList.values().stream().collect(Collectors.toList());
					
			} else {
				mappingsResource.listChildren().forEachRemaining(all::add);
			}
		}
		
		pages = Lists.partition(all, PAGE_SIZE);
	}
	
	private Resource getRuleNode(@NonNull Resource resource) {
		if(resource.isResourceType(Rule.RESOURCE_TYPE)) {
			return resource;
		}
		
		return getRuleNode(resource.getParent());
	}

	private void getDynamicProperties(Resource configResource) {
		ValueMap property = configResource.getChild(JcrConstants.JCR_CONTENT).adaptTo(ValueMap.class);
		state  = property.get("state", String.class);
		version = property.get("version", String.class);
		title = property.get(JcrConstants.JCR_TITLE, "");
		user = property.get(NameConstants.PN_PAGE_LAST_MOD_BY, "");
	}

	public List<Resource> getItems() {
		return pages.isEmpty() ? Collections.emptyList() : pages.get(pageNumber - 1);
	}
	
	public int getPageSize() {
		return PAGE_SIZE;
	}

	public boolean isPaginated() {
		return pages.size() > 1;
	}

	public int getPages() {
		return pages.size();
	}

	public int getPageNumber() {
		return pageNumber;
	}

	public boolean hasNext() {
		return pageNumber < pages.size();
	}

	public boolean disableSaveButton() {
		return saveButton;
	}

	public boolean disableApplyButton() {
		return applyButton;
	}

	public boolean disablePromoteButton() {
		return promoteButton;
	}

	public int getNextPage() {
		return pageNumber + 1;
	}

	public boolean hasPrevious() {
		return pageNumber > 1;
	}

	public int getPreviousPage() {
		return pageNumber - 1;
	}
	
	public String getState() {
		return state;
	}
	
	public String getUser() {
		return user;
	}
	
	public String getVersion() {
		return version;
	}
	
	public String getTitle() {
		return title;
	}
	
	public boolean isRender() {
		return features.isEnabled(UrlRedirectFeature.FEATURE_NAME);
	}

	public enum ButtonStates {
		/*
		button enabled --> false
		button disabled --> true
		since disabling is our primary necessity
		*/
		NEW(true, true, true),
		EDITED(false, true, true),
		DRAFT(true, false, true),
		APPLIED(true, true, false),
		PROMOTED(true, true, true);

		private boolean disableSaveButton;
		private boolean disableApplyButton;
		private boolean disablePromoteButton;

		public boolean disableSaveButton() {
			return disableSaveButton;
		}

		public boolean disableApplyButton() {
			return disableApplyButton;
		}

		public boolean disablePromoteButton() {
			return disablePromoteButton;
		}

		ButtonStates(Boolean b1, Boolean b2, Boolean b3) {
			this.disableSaveButton = b1;
			this.disableApplyButton = b2;
			this.disablePromoteButton = b3;
		}
	}

}
