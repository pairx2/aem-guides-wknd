package com.abbott.aem.an.abbottstore.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

/**
 * The Class FooterLinks.
 */
@Model(adaptables = { Resource.class,
		SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class FooterLinks {
	private static final Logger LOG = LoggerFactory.getLogger(FooterLinks.class);

	/** The footer links res. */
	@ChildResource(name = "footerLinks")
	private Resource footerLinksRes;

	/**
	 * Gets the media trade list.
	 *
	 * @return the media trade list
	 */
	public List<FooterSubLinks> getFooterList() {
		LOG.debug("Inside getFooterList Method");
		return getListFromResource(footerLinksRes, FooterSubLinks.class);
	}

	/**
	 * Gets the list from resource.
	 *
	 * @param          <T> the generic type
	 * @param resource the resource
	 * @param model    the model
	 * @return the list from resource
	 */
	public <T> List<T> getListFromResource(Resource resource, Class<T> model) {
		LOG.debug("Inside getListFromResource Method");
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
		LOG.debug("models :: {}", models);
		return models;
	}

}
