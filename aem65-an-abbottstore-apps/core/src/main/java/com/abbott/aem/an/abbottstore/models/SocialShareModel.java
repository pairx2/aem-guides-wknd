package com.abbott.aem.an.abbottstore.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
@Model(adaptables = { Resource.class, SlingHttpServletRequest.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class SocialShareModel {

	@ChildResource(name = "socialLinks")
	private Resource socialLinksResource;

	@ValueMapValue
	private String title;

	/**
	 * @return the title
	 */
	public String getTitle() {
		return title;
	}

	/**
	 * @return the linkList
	 */
	public List<LinkModel> getLinkList() {
		return getListFromResource(socialLinksResource, LinkModel.class);
	}

	/**
	 * Gets the list from resource.
	 *
	 * @param <T> the generic type
	 * @param resource the resource
	 * @param model the model
	 * @return the list from resource
	 */
	private <T> List<T> getListFromResource(Resource resource, Class<T> model) {
		List<T> models = new LinkedList<>();
		if (null == resource) {
			return models;
		}
		Iterator<Resource> children = resource.listChildren();
		while (children.hasNext()) {
			Resource child = children.next();
			if (null != child) {
				models.add(child.adaptTo(model));
			}
		}
		return models;
	}

}