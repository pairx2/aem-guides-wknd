package com.abbott.aem.an.abbottstore.models;

import com.abbott.aem.an.abbottstore.beans.HeaderLinkItemsBean;
import lombok.Getter;
import lombok.Setter;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.RepositoryException;
import java.util.List;

/**
 * The Class HeaderLinks.
 * 
 * @author MADDAMX1
 */
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class HeaderLinks {

	/** The Constant LOG. */
	private static final Logger LOG = LoggerFactory.getLogger(HeaderLinks.class);

	/** The header links res. */
	@Self
	private Resource headerLinksRes;

	/** The nav items list. */
    @Getter
	@Setter
	private List<HeaderLinkItemsBean> navItemsList;

	/**
	 * Post construct.
	 */
	@PostConstruct
	protected void postConstruct() {
		if (null != headerLinksRes) {
			Node node = headerLinksRes.adaptTo(Node.class);
			try {
				if (null != node && node.hasNode("links")) {
					Node menuItemsNode = node.getNode("links");
					if (menuItemsNode.hasNodes()) {
						NodeIterator nodeIterator = menuItemsNode.getNodes();
						while (nodeIterator.hasNext()) {
							HeaderLinkItemsBean headerLinkItemsBean = readMenuItems(nodeIterator.nextNode());
							navItemsList.add(headerLinkItemsBean);

						}
					}
				}
			} catch (RepositoryException e) {
				LOG.error("Exception is {}", e.getMessage());
			}

		}
	}

	/**
	 * Read menu items.
	 *
	 * @param nextNode the next node
	 * @return the header link items bean
	 */
	private HeaderLinkItemsBean readMenuItems(Node nextNode) {
		HeaderLinkItemsBean headerLinkItemsBean = new HeaderLinkItemsBean();
		try {
			if (nextNode.hasProperty("linkLabel")) {
				String label = nextNode.getProperty("linkLabel").getString();
				headerLinkItemsBean.setLinkLabel(label);
			}

			if (nextNode.hasProperty("linkPath")) {
				String path = nextNode.getProperty("linkPath").getString();
				headerLinkItemsBean.setLinkLabel(path);
			}
		} catch (RepositoryException e) {
			LOG.error("Exception occurred {}", e.getMessage());
		}
		return headerLinkItemsBean;
	}

}
