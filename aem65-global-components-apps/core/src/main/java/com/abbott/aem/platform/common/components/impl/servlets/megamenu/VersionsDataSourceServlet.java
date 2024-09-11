package com.abbott.aem.platform.common.components.impl.servlets.megamenu;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.Servlet;

import lombok.NonNull;

import com.abbott.aem.platform.common.components.models.navigation.impl.v1.MegaMenuContainerImpl;
import com.abbott.aem.platform.common.components.servlets.TextValueDataResourceSource;
import com.adobe.granite.ui.components.ds.DataSource;
import com.adobe.granite.ui.components.ds.SimpleDataSource;
import com.day.cq.commons.jcr.JcrConstants;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceUtil;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.jcr.resource.api.JcrResourceConstants;
import org.osgi.service.component.annotations.Component;

/**
 * Data source that returns all enabled versions for Mega menu.
 */
@Component(service = { Servlet.class },
		   property = { "sling.servlet.resourceTypes=" + VersionsDataSourceServlet.RESOURCE_TYPE_V1, "sling.servlet.methods=GET", "sling.servlet.extensions=html" })
public class VersionsDataSourceServlet extends SlingSafeMethodsServlet {

	public static final String RESOURCE_TYPE_V1 = "abbott-platform/components/content/molecules/megamenu/v1/datasources/megamenuversions";

	private static final long serialVersionUID = 1L;
	private static final String COMPONENT_PROPERTY_ENABLED = "enabled";
	private static final String COMPONENT_PROPERTY_ORDER = "order";

	@Override
	protected void doGet(@NonNull SlingHttpServletRequest request, @NonNull SlingHttpServletResponse response) {
		SimpleDataSource versionsDataSource = new SimpleDataSource(getMegaMenuVersions(request.getResourceResolver()).iterator());
		request.setAttribute(DataSource.class.getName(), versionsDataSource);
	}

	private List<Resource> getMegaMenuVersions(ResourceResolver resourceResolver) {
		List<Resource> megaMenuVersionResources = new ArrayList<>();
		Iterator<VersionsDescription> versions = findVersions(resourceResolver).iterator();
		while (versions.hasNext()) {
			VersionsDescription description = versions.next();
			megaMenuVersionResources.add(new VersionsDataResourceSource(description, resourceResolver));
		}
		return megaMenuVersionResources;
	}

	private Collection<VersionsDescription> findVersions(ResourceResolver resourceResolver) {
		String[] searchPaths = resourceResolver.getSearchPath();
		for (int i = 0; i < searchPaths.length; i++) {
			searchPaths[i] = searchPaths[i].substring(0, searchPaths[i].length() - 1);
		}
		final Map<String, VersionsDescription> map = new HashMap<>();
		final List<String> disabledComponents = new ArrayList<>();
		for (final String path : searchPaths) {
			final StringBuilder queryStringBuilder = new StringBuilder("/jcr:root");
			queryStringBuilder.append(path);
			queryStringBuilder.append("//* [@");
			queryStringBuilder.append(JcrResourceConstants.SLING_RESOURCE_SUPER_TYPE_PROPERTY);
			queryStringBuilder.append("='");
			queryStringBuilder.append(MegaMenuContainerImpl.RT_VERSIONS_V1);
			queryStringBuilder.append("']");
			final Iterator<Resource> resourceIterator = resourceResolver.findResources(queryStringBuilder.toString(), "xpath");
			while (resourceIterator.hasNext()) {
				final Resource versionResource = resourceIterator.next();
				final ValueMap properties = versionResource.adaptTo((ValueMap.class));
				final String resourceType = versionResource.getPath().substring(path.length() + 1);
				if (Boolean.TRUE.equals(properties.get(COMPONENT_PROPERTY_ENABLED, true))) {
					if (!map.containsKey(resourceType) && !disabledComponents.contains(resourceType)) {
						map.put(resourceType, new VersionsDescription(resourceType, versionResource.getName(), properties));
					}
				} else {
					disabledComponents.add(resourceType);
				}
			}
		}
		final List<VersionsDescription> entries = new ArrayList<>(map.values());
		Collections.sort(entries);
		return entries;
	}

	public static class VersionsDataResourceSource extends TextValueDataResourceSource {

		private final VersionsDescription description;

		VersionsDataResourceSource(VersionsDescription description, ResourceResolver resourceResolver) {
			super(resourceResolver, StringUtils.EMPTY, Resource.RESOURCE_TYPE_NON_EXISTING);
			this.description = description;
		}

		@Override
		public String getText() {
			return description.getTitle();
		}

		@Override
		public String getValue() {
			return description.getResourceType();
		}
	}

	public static class VersionsDescription implements Comparable<VersionsDescription> {

		private final String resourceType;
		private final String title;
		private final int order;

		public VersionsDescription(final String rt, final String defaultName, final ValueMap properties) {
			this.resourceType = rt;
			this.title = properties.get(JcrConstants.JCR_TITLE, defaultName);
			this.order = properties.get(COMPONENT_PROPERTY_ORDER, 0);
		}

		public String getResourceType() {
			return this.resourceType;
		}

		public String getTitle() {
			return this.title;
		}

		/**
		 * @see java.lang.Comparable#compareTo(java.lang.Object)
		 */
		@Override
		public int compareTo(
				@NonNull
				final VersionsDescription o) {
			if (this.order < o.order) {
				return -1;
			} else if (this.order == o.order) {
				return this.title.compareTo(o.title);
			}
			return 1;
		}

		@Override
		public boolean equals(Object obj) {
			if (obj == null) {
				return false;
			}
			if (this.getClass() != obj.getClass()) {
				return false;
			}
			return compareTo((VersionsDescription) obj) == 0;
		}

		@Override
		public int hashCode() {
			return this.title.hashCode() + this.title.hashCode();
		}
	}
}
