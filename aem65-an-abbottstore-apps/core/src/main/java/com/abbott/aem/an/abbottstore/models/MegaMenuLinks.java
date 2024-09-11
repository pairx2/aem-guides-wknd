package com.abbott.aem.an.abbottstore.models;

import com.abbott.aem.an.abbottstore.beans.MegaMenuLinkItemsBean;
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
import java.util.ArrayList;
import java.util.List;

/**
 * The Class MegaMenuLinks gets authored menulinks fields and adds it to list.
 * @author madhurim
 */
@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class MegaMenuLinks {

	/** The Constant LOG. */
	private static final Logger LOG = LoggerFactory.getLogger(MegaMenuLinks.class);

	/** The menu links res. */
	@Self
	private Resource menuLinksRes;

	/** The menu items list. */
	@Getter
	@Setter
	private List<MegaMenuLinkItemsBean> menuItemsList = new ArrayList<>();

	/**
	 * Post construct.
	 */
	@PostConstruct
	protected void postConstruct() {
		if (null != menuLinksRes) {
			Node node = menuLinksRes.adaptTo(Node.class);
			try {
				if (null != node && node.hasNode("navLinks")) {
					Node menuItemsNode = node.getNode("navLinks");
					if (menuItemsNode.hasNodes()) {
						NodeIterator nodeIterator = menuItemsNode.getNodes();
						while (nodeIterator.hasNext()) {
							MegaMenuLinkItemsBean megaMenuLinkItemsBean = readMenuItems(nodeIterator.nextNode());
							menuItemsList.add(megaMenuLinkItemsBean);

						}
					}
				}
			} catch (RepositoryException e) {
				LOG.error("Exception occurred in getting navlinks{}", e.getMessage());
			}

		}
	}

	/**
	 * Read menu items.
	 *
	 * @param nextNode the next node
	 * @return the mega menu link items bean
	 */
	private MegaMenuLinkItemsBean readMenuItems(Node nextNode) {
		MegaMenuLinkItemsBean megaMenuLinkItemsBean = new MegaMenuLinkItemsBean();
		try {
			if (nextNode.hasProperty("megaMenuLabel")) {
				String label = nextNode.getProperty("megaMenuLabel").getString();
				megaMenuLinkItemsBean.setMegaMenuLabel(label);
			}

			if (nextNode.hasProperty("fragmentPath")) {
				String fpath = nextNode.getProperty("fragmentPath").getString();

				if (!fpath.endsWith("/master")) {
					fpath = fpath + "/master";
				}
				megaMenuLinkItemsBean.setFragmentPath(fpath);
			}
		} catch (RepositoryException e) {
			LOG.error("Exception occurred in reading menuitems{}", e.getMessage());
		}
		return megaMenuLinkItemsBean;
	}

}
