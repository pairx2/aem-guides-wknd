package com.abbott.aem.an.abbottstore.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class FooterSubLinks {
	private static final Logger LOG = LoggerFactory.getLogger(FooterSubLinks.class);

	/** The media trade sub list res. */
	@ChildResource(name = "footerSubLinks")
	private Resource footerSubListRes;

	/** The media trade sub list. */
	private List<LinkModel> footerSubList;

	/**
	 * Inits the.
	 */
	@PostConstruct
	public void init() {
		LOG.debug("Inside init Method");
		if (null != footerSubListRes && footerSubListRes.hasChildren()) {
			LOG.debug("Inside if footerSubListRes :: {}", footerSubListRes);

			setFooterSubList(getLinkList(footerSubListRes));
		}
	}

	/**
	 * Gets the link list.
	 *
	 * @param resource the resource
	 * @return the link list
	 */
	private static List<LinkModel> getLinkList(Resource resource) {
		return getListFromResource(resource, LinkModel.class);
	}

	/**
	 * Gets the list from resource.
	 *
	 * @param          <T> the generic type
	 * @param resource the resource
	 * @param model    the model
	 * @return the list from resource
	 */
	public static <T> List<T> getListFromResource(Resource resource, Class<T> model) {
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

	/**
	 * Gets the media trade sub list.
	 *
	 * @return the media trade sub list
	 */
	public List<LinkModel> getFooterSubList() {
		LOG.debug("Inside getFooterSubList");
		List<LinkModel> cloneFootereSubList = new LinkedList<>();
		cloneFootereSubList.addAll(footerSubList);
		LOG.debug("cloneFootereSubList ::: {}", cloneFootereSubList);
		return cloneFootereSubList;
	}

	/**
	 * Sets the media trade sub list.
	 *
	 * @param mediaTradeSubList the new media trade sub list
	 */
	public void setFooterSubList(List<LinkModel> footerSubList) {
		LOG.debug("Inside setFooterSubList Method");
		List<LinkModel> cloneFooterSubListSubList = new LinkedList<>();
		cloneFooterSubListSubList.addAll(footerSubList);
		LOG.debug("cloneFooterSubListSubList :: {}", cloneFooterSubListSubList);
		this.footerSubList = cloneFooterSubListSubList;
	}
}